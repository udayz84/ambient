import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const strapiUrlStr = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1338";

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

  try {
    // Look up any entry where either oldPath or newPath matches the current pathname
    const queryUrl = new URL(`${strapiUrlStr}/api/redirects`);
    queryUrl.searchParams.set('filters[$or][0][oldPath][$eq]', pathname);
    queryUrl.searchParams.set('filters[$or][1][newPath][$eq]', pathname);
    queryUrl.searchParams.set('filters[enabled][$eq]', 'true');
    queryUrl.searchParams.set('populate', '*');

    const res = await fetch(queryUrl.toString(), {
      next: { revalidate: 60 },
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
