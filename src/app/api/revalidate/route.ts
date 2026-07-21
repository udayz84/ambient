import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

/**
 * src/app/api/revalidate/route.ts
 * ----------------------------------------------------------------------------
 * Level 3 automation: on-demand ISR revalidation endpoint for Strapi webhooks.
 *
 * Configure Strapi (Settings → Webhooks) to POST here on `entry.publish` and
 * `entry.unpublish`. Default Strapi webhook body shape:
 *
 *   {
 *     "event": "entry.publish",
 *     "createdAt": "...",
 *     "model": "articles",
 *     "entry": { "id": 12, "slug": "..." },
 *     ...
 *   }
 *
 * Auth: shared secret via REVALIDATE_SECRET env var. Send it from Strapi
 * either as the `x-revalidate-secret` request header or as `?secret=...`.
 *
 * Effect:
 *   - Always revalidates /sitemap.xml so new/removed entries are picked up.
 *   - If `model` is recognised in MODEL_TO_LIST_PATH, also revalidates that
 *     list page so the new entry shows up immediately.
 *
 * Note: POST route handlers are never cached by Next.js, so this endpoint is
 * always evaluated at request time — exactly what a webhook needs.
 * ----------------------------------------------------------------------------
 */

/**
 * Map a Strapi collection apiId to the Next.js list page that renders it.
 * Extend as new dynamic sources are added to DYNAMIC_SOURCES in sitemap.ts.
 */
const MODEL_TO_LIST_PATH: Record<string, string> = {
  articles: "/news-listing",
  jobs: "/careers",
};

function isAuthorized(req: Request): boolean {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) return false;
  const headerSecret = req.headers.get("x-revalidate-secret");
  if (headerSecret && headerSecret === expected) return true;
  try {
    const url = new URL(req.url);
    const querySecret = url.searchParams.get("secret");
    return !!querySecret && querySecret === expected;
  } catch {
    return false;
  }
}

export async function POST(req: Request): Promise<Response> {
  if (!process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { revalidated: false, error: "REVALIDATE_SECRET is not set on the server" },
      { status: 500 }
    );
  }
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { revalidated: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  let body: { model?: unknown } = {};
  try {
    body = (await req.json()) as { model?: unknown };
  } catch {
    // Body is optional — sitemap revalidation still works without it.
  }

  // Always refresh the sitemap so any add/remove is reflected.
  revalidatePath("/sitemap.xml", "layout");

  // Refresh the matching list page if the webhook names a known model.
  const model = typeof body.model === "string" ? body.model : undefined;
  if (model && MODEL_TO_LIST_PATH[model]) {
    revalidatePath(MODEL_TO_LIST_PATH[model], "page");
  }

  return NextResponse.json({
    revalidated: true,
    sitemap: true,
    listPath: model && MODEL_TO_LIST_PATH[model] ? MODEL_TO_LIST_PATH[model] : null,
    model: model ?? null,
  });
}
