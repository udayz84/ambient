/**
 * seed-products-sticky-nav.mjs
 * ----------------------------------------------------------------------------
 * Seeds the `sticky_nav` repeatable component of the `products-page` single
 * type — the white bottom toggle on /products. Each item: label only; the
 * section target is auto-assigned by page order in src/app/products/page.tsx.
 *
 * Mechanics mirror seed-products-architecture.mjs (no media):
 *   1. PUTs only the `sticky_nav` key — all other sections stay untouched.
 *   2. Publishes with ?status=published.
 *
 * Requirements
 *   - Strapi v5 running (default http://localhost:1338, override STRAPI_URL).
 *   - STRAPI_TOKEN env var (Full access API token) — read from repo-root .env.
 *
 * Usage
 *   node scripts/seed-products-sticky-nav.mjs            # PUT + publish
 *   node scripts/seed-products-sticky-nav.mjs --dry-run  # print payload only
 * ----------------------------------------------------------------------------
 */

import { join, normalize, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = normalize(join(__dirname, ".."));

// Auto-load <repo-root>/.env if present (Node 21.7+). Silently no-op if missing.
try {
  process.loadEnvFile(join(REPO_ROOT, ".env"));
} catch {
  // env vars already set in shell, or no .env — continue.
}

const STRAPI_URL = (
  process.env.STRAPI_URL || "http://localhost:1338"
).replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";

const DRY_RUN = process.argv.includes("--dry-run");

if (!STRAPI_TOKEN && !DRY_RUN) {
  console.error(
    "[fatal] STRAPI_TOKEN env var is required (create a Full access token in Strapi admin)."
  );
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Content — current hardcoded NAV_ITEMS
// ---------------------------------------------------------------------------

const STICKY_NAV = [
  { label: "Power VS Intelligences" },
  { label: "Always On. Never asleep" },
  { label: "Built for all" },
  { label: "Metrics & Data" },
  { label: "Architecture" },
  { label: "Full Picture" },
];

// ---------------------------------------------------------------------------

async function strapiFetch(pathname, init = {}) {
  const url = pathname.startsWith("http")
    ? pathname
    : `${STRAPI_URL}${pathname}`;
  const headers = {
    Authorization: `Bearer ${STRAPI_TOKEN}`,
    ...(init.headers || {}),
  };
  const res = await fetch(url, { ...init, headers });
  const text = await res.text();
  let body = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }
  return { ok: res.ok, status: res.status, body };
}

async function main() {
  console.log(`Strapi: ${STRAPI_URL}`);

  const payload = { data: { sticky_nav: STICKY_NAV } };

  if (DRY_RUN) {
    console.log("[dry-run] PUT /api/products-page payload:");
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  // Draft update first, then publish (draftAndPublish is on).
  const upd = await strapiFetch("/api/products-page", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!upd.ok) {
    throw new Error(
      `PUT /api/products-page failed (${upd.status}): ${JSON.stringify(upd.body)}`
    );
  }
  console.log("  [put] sticky_nav updated (draft)");

  const pub = await strapiFetch("/api/products-page?status=published", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!pub.ok) {
    console.warn(
      `  [warn] publish step returned ${pub.status}: ${JSON.stringify(pub.body)}`
    );
  } else {
    console.log("  [put] sticky_nav published");
  }

  // Verify: read back the populated component.
  const check = await strapiFetch(
    "/api/products-page?populate[sticky_nav][populate]=*"
  );
  if (check.ok) {
    const items = check.body?.data?.sticky_nav ?? [];
    console.log(
      "  [verify] items:",
      items.map((i) => i.label).join(" | ")
    );
  }
  console.log("done.");
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
