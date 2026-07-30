/**
 * seed-navbar-structure.mjs
 * ----------------------------------------------------------------------------
 * Seeds the `navbar` single type with the current site navigation structure,
 * including nested submenu children (shared.nav-sub-item) per nav item:
 *
 *   Home
 *   Products      -> Product / SOM / DVK
 *   Company       -> Company / Careers
 *   Technology
 *   Developers Hub
 *   Application   -> Application / Wearables / Smart Homes / Medical Devices
 *   Resources     -> Resources Centre / Blogs / News & Media
 *   Shop          (highlight: true)
 *
 * Existing brand and header CTA fields are preserved: the current entry is
 * fetched first and merged with the new nav_items.
 *
 * Usage
 *   node scripts/seed-navbar-structure.mjs               # live
 *   node scripts/seed-navbar-structure.mjs --dry-run
 * ----------------------------------------------------------------------------
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = normalize(join(__dirname, ".."));

try {
  process.loadEnvFile(join(REPO_ROOT, ".env"));
} catch {}

const STRAPI_URL = (
  process.env.STRAPI_URL || "http://localhost:1338"
).replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";
const LOG_DIR = join(__dirname, ".seed-logs");

const DRY_RUN = process.argv.includes("--dry-run");

if (!STRAPI_TOKEN && !DRY_RUN) {
  console.error("[fatal] STRAPI_TOKEN env var is required.");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// NAV STRUCTURE — mirrors src/components/navbar/nav-items.ts
// ----------------------------------------------------------------------------

const NAV_ITEMS = [
  { label: "Home", href: "/", has_dropdown: false },
  {
    label: "Products",
    href: "/products",
    has_dropdown: true,
    children: [
      { label: "Product", href: "/products" },
      { label: "SOM", href: "/SOM" },
      { label: "DVK", href: "/dvk" },
    ],
  },
  {
    label: "Company",
    href: "/company",
    has_dropdown: true,
    children: [
      { label: "Company", href: "/company" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    label: "Technology",
    href: "/technology",
    has_dropdown: false,
  },
  {
    label: "Developers Hub",
    href: "/developer",
    has_dropdown: false,
  },
  {
    label: "Application",
    href: "/applications",
    has_dropdown: true,
    children: [
      { label: "Application", href: "/applications" },
      { label: "Wearables", href: "/applications/wearables" },
      { label: "Smart Homes", href: "/applications/smart-homes" },
      { label: "Medical Devices", href: "/applications/medical-devices" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    has_dropdown: true,
    children: [
      { label: "Resources Centre", href: "/resources" },
      { label: "Blogs", href: "/resources" },
      { label: "News & Media", href: "/news-listing" },
    ],
  },
  { label: "Shop", href: "/products", has_dropdown: false },
];

// ---------------------------------------------------------------------------
// HELPERS (mirrors the other seed scripts)
// ---------------------------------------------------------------------------

async function strapiFetch(pathname, init = {}) {
  const url = pathname.startsWith("http") ? pathname : `${STRAPI_URL}${pathname}`;
  const res = await fetch(url, {
    ...init,
    headers: { Authorization: `Bearer ${STRAPI_TOKEN}`, ...(init.headers || {}) },
  });
  const text = await res.text();
  let body = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  return { ok: res.ok, status: res.status, body };
}

/** Reduce a populated media object (or id) to the id Strapi expects on write. */
const mediaId = (m) => (m && typeof m === "object" ? m.id : (m ?? null));

/**
 * PUT a single type payload to Strapi and publish it
 * (navbar has draftAndPublish enabled).
 */
async function putSingleType(apiId, data, { publish = true } = {}) {
  if (DRY_RUN) {
    console.log(`  [dry-run] skipping PUT /api/${apiId}`);
    return null;
  }
  const upd = await strapiFetch(`/api/${apiId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });
  if (!upd.ok) {
    throw new Error(
      `PUT /api/${apiId} failed (${upd.status}): ${JSON.stringify(upd.body)}`
    );
  }

  if (publish) {
    const pub = await strapiFetch(`/api/${apiId}?status=published`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    if (!pub.ok) {
      console.warn(
        `  [warn] publish step returned ${pub.status}: ${JSON.stringify(pub.body)}`
      );
    }
  }
  return upd.body;
}

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------

async function main() {
  if (!existsSync(LOG_DIR)) await mkdir(LOG_DIR, { recursive: true });

  console.log(`Strapi : ${STRAPI_URL}`);
  console.log(`Token  : ${STRAPI_TOKEN ? "****" + STRAPI_TOKEN.slice(-4) : "(none)"}`);
  console.log(`Mode   : ${DRY_RUN ? "DRY-RUN" : "live"}`);

  // Fetch the current entry so brand / CTA fields survive the update.
  let brand = null;
  let header = {};
  if (!DRY_RUN) {
    const current = await strapiFetch(
      "/api/navbar?populate[brand][populate]=*&populate[header][populate]=*"
    );
    if (current.status === 401 || current.status === 403) {
      console.error(`[fatal] token rejected (${current.status}).`);
      process.exit(1);
    }
    const data = current.body?.data;
    if (data) {
      if (data.brand) {
        brand = {
          site_name: data.brand.site_name,
          logo: mediaId(data.brand.logo),
          logo_alt: data.brand.logo_alt ?? null,
          logo_mobile: mediaId(data.brand.logo_mobile),
          logo_mobile_alt: data.brand.logo_mobile_alt ?? null,
          favicon: mediaId(data.brand.favicon),
          favicon_alt: data.brand.favicon_alt ?? null,
        };
      }
      if (data.header) {
        header = {
          cta_label: data.header.cta_label ?? "GET IN TOUCH",
          cta_href: data.header.cta_href ?? "/contact",
          cta_dot_icon: mediaId(data.header.cta_dot_icon),
          alt: data.header.alt ?? null,
        };
      }
    }
    console.log(`[ok] fetched current navbar (brand ${brand ? "kept" : "absent"})`);
  }

  const payload = {
    ...(brand ? { brand } : {}),
    header: {
      ...header,
      nav_items: NAV_ITEMS,
    },
  };

  await writeFile(
    join(LOG_DIR, "navbar-structure.json"),
    JSON.stringify(payload, null, 2),
    "utf8"
  );

  console.log("\nSeeding navbar...");
  try {
    await putSingleType("navbar", payload);
    console.log("  [done] PUT /api/navbar OK");
  } catch (err) {
    console.error(`  [error] ${err.message}`);
    process.exit(1);
  }

  console.log("\n=== Summary ===");
  console.log(`Top-level items : ${NAV_ITEMS.length}`);
  console.log(
    `Submenu items   : ${NAV_ITEMS.reduce((n, i) => n + (i.children?.length || 0), 0)}`
  );
}

main().catch((err) => {
  console.error("[fatal]", err);
  process.exit(1);
});
