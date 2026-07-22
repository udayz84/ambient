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
    // Build the Strapi query: look for an entry whose old_url matches
    // the current pathname exactly (with or without trailing slash).
    const queryUrl = new URL(`${strapiUrlStr}/api/redirects`);
    queryUrl.searchParams.set('filters[old_url][$eq]', pathname);
    queryUrl.searchParams.set('populate', '*');

    const res = await fetch(queryUrl.toString(), {
      next: { revalidate: 60 }, // cache for 60s so we don't slam Strapi
    });

    if (!res.ok) return NextResponse.next();

    const json = await res.json();
    const entries: any[] = json?.data;

    if (!entries || entries.length === 0) return NextResponse.next();

    // Use the first matching entry (Strapi v4 nests under .attributes; v5 is flat)
    const item = entries[0];
    const redirectData = item.attributes || item;

    const newUrl: string | undefined =
      redirectData.new_url || redirectData.newUrl || redirectData.destination;

    if (!newUrl) return NextResponse.next();

    // ── Loop protection ────────────────────────────────────────────────
    // Only redirect when the current pathname is EXACTLY the old_url.
    // If the current pathname already matches the new_url, do nothing.
    const currentNorm = extractPathname(pathname);
    const targetNorm = extractPathname(newUrl);

    if (currentNorm === targetNorm) {
      // We are already on the target URL — do NOT redirect again.
      return NextResponse.next();
    }

    // Determine status code (301 permanent vs 307 temporary)
    const isPermanent = String(redirectData.status_code).includes('301');
    const status = isPermanent ? 301 : 307;

    // Build the destination URL (handles both relative and absolute new_url values)
    const destination = new URL(newUrl, request.url);
    return NextResponse.redirect(destination, status);

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
