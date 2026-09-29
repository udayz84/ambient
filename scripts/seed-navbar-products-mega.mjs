/**
 * seed-navbar-products-mega.mjs
 * ----------------------------------------------------------------------------
 * Seeds the Products nav item's mega-menu dropdown columns
 * (shared.mega-column -> nav_items.mega_columns on the "Products" item):
 *
 *   Processors           -> GPX10PRO / GPX64 links
 *   System-on-Modules    -> description + "View all SOMs" CTA
 *   Evaluation Kits      -> description + "View Evaluation Kits" CTA
 *
 * Everything else on the navbar (brand, header CTA, all nav items and their
 * children) is fetched first and preserved unchanged.
 *
 * Usage
 *   node scripts/seed-navbar-products-mega.mjs               # live
 *   node scripts/seed-navbar-products-mega.mjs --dry-run
 * ----------------------------------------------------------------------------
 */

import { writeFile, mkdir } from "node:fs/promises";
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
// PRODUCTS MEGA MENU — mirrors ProductsMegaMenu in src/components/navbar/Navbar.tsx
// ---------------------------------------------------------------------------

const MEGA_COLUMNS = [
  {
    title: "Processors",
    links: [
      { label: "GPX10PRO", href: "/products" },
      { label: "GPX64", href: "/products" },
    ],
  },
  {
    title: "System-on-Modules",
    description: "Drop-in reference modules for rapid product development",
    cta_label: "View all SOMs",
    cta_href: "/SOM",
  },
  {
    title: "Evaluation Kits",
    description: "Plug-and-play boards to test your models quickly",
    cta_label: "View Evaluation Kits",
    cta_href: "/dvk",
  },
  {
    title: "Model Zoo",
    description: "Pre-trained models ready for deployment on Ambient AI processors.",
    cta_label: "View Model Zoo",
    cta_href: "/model-zoo",
  }
];

// ---------------------------------------------------------------------------
// HELPERS (mirrors seed-navbar-structure.mjs)
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

const mediaId = (m) => (m && typeof m === "object" ? m.id : (m ?? null));

/** Rebuild a nav_items write payload from the populated GET response. */
function navItemToWriteShape(raw) {
  const item = {
    label: raw.label,
    href: raw.href,
    has_dropdown: Boolean(raw.has_dropdown),
    highlight: Boolean(raw.highlight),
  };
  if (Array.isArray(raw.children) && raw.children.length > 0) {
    item.children = raw.children.map((child) => ({
      label: child.label,
      href: child.href,
    }));
  }
  if (Array.isArray(raw.mega_columns) && raw.mega_columns.length > 0) {
    item.mega_columns = raw.mega_columns.map((col) => ({
      title: col.title,
      ...(col.description ? { description: col.description } : {}),
      ...(Array.isArray(col.links) && col.links.length > 0
        ? { links: col.links.map((l) => ({ label: l.label, href: l.href })) }
        : {}),
      ...(col.cta_label ? { cta_label: col.cta_label } : {}),
      ...(col.cta_href ? { cta_href: col.cta_href } : {}),
    }));
  }
  return item;
}

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------

async function main() {
  if (!existsSync(LOG_DIR)) await mkdir(LOG_DIR, { recursive: true });

  console.log(`Strapi : ${STRAPI_URL}`);
  console.log(`Token  : ${STRAPI_TOKEN ? "****" + STRAPI_TOKEN.slice(-4) : "(none)"}`);
  console.log(`Mode   : ${DRY_RUN ? "DRY-RUN" : "live"}`);

  // Fetch the current entry so brand / CTA / other nav items survive the update.
  let brand = null;
  let header = {};
  let navItems = [];
  {
    const current = await strapiFetch(
      "/api/navbar?populate[brand][populate]=*" +
        "&populate[header][populate][cta_dot_icon]=true" +
        "&populate[header][populate][nav_items][populate][children][populate]=*" +
        "&populate[header][populate][nav_items][populate][mega_columns][populate][links][populate]=*"
    );
    if (current.status === 401 || current.status === 403) {
      console.error(`[fatal] token rejected (${current.status}).`);
      process.exit(1);
    }
    if (current.status === 400) {
      console.error(
        `[fatal] query rejected (400): ${JSON.stringify(current.body)}. ` +
          "Is the shared.mega-column component deployed on this Strapi?"
      );
      process.exit(1);
    }
    const data = current.body?.data;
    if (!data) {
      console.error("[fatal] navbar entry not found — seed-navbar-structure.mjs first.");
      process.exit(1);
    }
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
      navItems = (data.header.nav_items || []).map(navItemToWriteShape);
    }
    console.log(`[ok] fetched current navbar (${navItems.length} nav items)`);
  }

  const productsItem = navItems.find(
    (item) => item.label?.toLowerCase() === "products"
  );
  if (!productsItem) {
    console.error('[fatal] no "Products" nav item found — seed-navbar-structure.mjs first.');
    process.exit(1);
  }

  productsItem.has_dropdown = true;
  productsItem.mega_columns = MEGA_COLUMNS;

  const payload = {
    ...(brand ? { brand } : {}),
    header: {
      ...header,
      nav_items: navItems,
    },
  };

  await writeFile(
    join(LOG_DIR, "navbar-products-mega.json"),
    JSON.stringify(payload, null, 2),
    "utf8"
  );

  if (DRY_RUN) {
    console.log("  [dry-run] skipping PUT /api/navbar");
    console.log(`  Would attach ${MEGA_COLUMNS.length} mega columns to "Products".`);
    return;
  }

  console.log("\nSeeding products mega menu...");
  const upd = await strapiFetch("/api/navbar", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: payload }),
  });
  if (!upd.ok) {
    console.error(`[error] PUT /api/navbar failed (${upd.status}): ${JSON.stringify(upd.body)}`);
    process.exit(1);
  }
  console.log("  [done] PUT /api/navbar OK");

  const pub = await strapiFetch("/api/navbar?status=published", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: payload }),
  });
  if (!pub.ok) {
    console.warn(`  [warn] publish step returned ${pub.status}: ${JSON.stringify(pub.body)}`);
  } else {
    console.log("  [done] published");
  }

  console.log("\n=== Summary ===");
  console.log(`Mega columns   : ${MEGA_COLUMNS.length} on "Products"`);
}

main().catch((err) => {
  console.error("[fatal]", err);
  process.exit(1);
});
