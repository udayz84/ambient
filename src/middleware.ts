import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const strapiUrlStr = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1338";

// When AZURE_ASSETS_PUBLIC_URL is set, static assets (images, PDFs, fonts,
// videos) are served from Azure Blob Storage instead of /public. Every path
// keeps its exact URL — the middleware 308-redirects to the same blob path.
// Leave the env var unset to keep serving everything from /public.
const azureAssetsPublicUrl = process.env.AZURE_ASSETS_PUBLIC_URL?.replace(/\/+$/, '') || null;

// Only true static-asset extensions are redirected. Deliberately excludes
// html/json/xml/txt because the app serves real routes at those extensions
// (robots.txt, sitemap.xml).
const ASSET_FILE_EXTENSIONS = new Set([
  'avif', 'bin', 'bmp', 'doc', 'docx', 'eot', 'gif', 'ico', 'jpeg', 'jpg',
  'mid', 'mov', 'mp3', 'mp4', 'oga', 'ogg', 'ogv', 'otf', 'pdf', 'png',
  'ppt', 'pptx', 'psd', 'svg', 'tif', 'tiff', 'ttf', 'wav', 'webm',
  'webp', 'woff', 'woff2', 'xls', 'xlsx', 'zip',
]);

function isStaticAssetPath(pathname: string): boolean {
  const ext = pathname.match(/\.([A-Za-z0-9]+)$/)?.[1]?.toLowerCase();
  return !!ext && ASSET_FILE_EXTENSIONS.has(ext);
}

function toAzureAssetUrl(pathname: string): string | null {
  try {
    // Decode then re-encode each segment so filenames with spaces, @, ()
    // map 1:1 onto their blob names without double-encoding.
    const encoded = pathname
      .split('/')
      .map((segment) => encodeURIComponent(decodeURIComponent(segment)))
      .join('/');
    return `${azureAssetsPublicUrl}${encoded}`;
  } catch {
    return null;
  }
}

/**
 * Extract a clean pathname from a string that could be a relative path or full URL.
 * Strips trailing slashes for consistent comparison.
 */
function extractPathname(raw: string): string {
  try {
    if (raw.startsWith('http://') || raw.startsWith('https://')) {
      return new URL(raw).pathname.replace(/\/+$/, '') || '/';
    }
  } catch { /* fall through */ }
  return raw.replace(/\/+$/, '') || '/';
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets and internal routes — no need to hit Strapi for these
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Serve /public assets from Azure Blob Storage when configured.
  // Redirects preserve the exact path (e.g. /footer/dot-separator.svg →
  // https://<account>.blob.core.windows.net/assets/footer/dot-separator.svg).
  if (azureAssetsPublicUrl && isStaticAssetPath(pathname)) {
    const target = toAzureAssetUrl(pathname);
    if (target) {
      const redirectResponse = NextResponse.redirect(target, 308);
      redirectResponse.headers.set('Cache-Control', 'public, max-age=86400');
      return redirectResponse;
    }
  }

  try {
    // Look up any entry where either oldPath or newPath matches the current pathname
    const queryUrl = new URL(`${strapiUrlStr}/api/redirects`);
    queryUrl.searchParams.set('filters[$or][0][oldPath][$eq]', pathname);
    queryUrl.searchParams.set('filters[$or][1][newPath][$eq]', pathname);
    queryUrl.searchParams.set('filters[enabled][$eq]', 'true');
    queryUrl.searchParams.set('populate', '*');
    queryUrl.searchParams.set('t', Date.now().toString());

    const res = await fetch(queryUrl.toString(), {
      cache: 'no-store',
    });

    if (!res.ok) return NextResponse.next();

    const json = await res.json();
    const entries: any[] = json?.data;

    if (!entries || entries.length === 0) return NextResponse.next();

    // Find the exact entry that matches our condition
    const currentNorm = extractPathname(pathname);
    
    // Case 1: User visited the old URL (e.g. /products). We need to REDIRECT them to the new URL (e.g. /new).
    const redirectMatch = entries.find(item => extractPathname(item.oldPath) === currentNorm);
    if (redirectMatch) {
      const newUrl = redirectMatch.newPath;
      if (!newUrl) return NextResponse.next();
      
      const destination = new URL(newUrl, request.url);
      
      // If it's explicitly marked as a pure rewrite, rewrite it. Otherwise, redirect it.
      if (String(redirectMatch.redirectType).includes('200') || String(redirectMatch.redirectType).includes('rewrite')) {
        return NextResponse.rewrite(destination);
      }
      
      const isPermanent = String(redirectMatch.redirectType).includes('301');
      return NextResponse.redirect(destination, isPermanent ? 301 : 302);
    }

    // Case 2: User is already AT the new URL (e.g. /new). We need to REWRITE them internally to the old URL (e.g. /products) so the content loads.
    const rewriteMatch = entries.find(item => extractPathname(item.newPath) === currentNorm);
    if (rewriteMatch) {
      const oldUrl = rewriteMatch.oldPath;
      if (!oldUrl) return NextResponse.next();
      
      const destination = new URL(oldUrl, request.url);
      return NextResponse.rewrite(destination);
    }

    return NextResponse.next();

  } catch (err) {
    // On any network/parse error, let the request through normally
    console.error('[Middleware] Strapi redirect lookup failed:', err);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // Run on all paths except static assets
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
