import { NextResponse } from "next/server";
import { STRAPI_CACHE_TAG } from "@/lib/strapi";

/**
 * src/app/api/popup-config/route.ts
 * ----------------------------------------------------------------------------
 * Proxies CMS-editable form copy (Strapi "popup" entries) to the browser.
 *
 * Modals fetch this instead of Strapi directly because the popups endpoint
 * needs an API token that must stay server-side. Returns the entry for
 * `?key=...` or null — modals fall back to their hardcoded copy on null, so
 * an unreachable/empty CMS never breaks a form.
 * ----------------------------------------------------------------------------
 */

const STRAPI_URL = (
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1338"
).replace(/\/$/, "");

export async function GET(req: Request): Promise<Response> {
  const key = new URL(req.url).searchParams.get("key");
  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${STRAPI_URL}/api/popups?filters[key][$eq]=${encodeURIComponent(key)}&populate[0]=fields`,
      {
        headers: process.env.STRAPI_TOKEN
          ? { Authorization: `Bearer ${process.env.STRAPI_TOKEN}` }
          : {},
        next: {
          revalidate: 60, // same TTL as src/lib/strapi.ts
          tags: [STRAPI_CACHE_TAG],
        },
        signal: AbortSignal.timeout(5_000),
      },
    );
    if (!res.ok) throw new Error(`Strapi ${res.status}`);

    const json = (await res.json()) as { data?: unknown[] };
    return NextResponse.json(json.data?.[0] ?? null);
  } catch {
    // CMS unreachable — client falls back to hardcoded copy.
    return NextResponse.json(null);
  }
}
