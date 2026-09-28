/**
 * seed-strapi-global.mjs
 * ----------------------------------------------------------------------------
 * Seeds the `global-settings` single type for the Ambient Scientific CMS.
 * Drives the Navbar, Footer, Newsletter, contact details, and default SEO.
 *
 * Companion to seed-strapi-pages{,-2,-3}.mjs. Same mechanics (SHA-1 dedupe,
 * shared cache, native fetch).
 *
 * Usage
 *   node scripts/seed-strapi-global.mjs               # live
 *   node scripts/seed-strapi-global.mjs --dry-run
 * ----------------------------------------------------------------------------
 */

import { createHash } from "node:crypto";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { basename, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = normalize(join(__dirname, ".."));
const PUBLIC_DIR = join(REPO_ROOT, "public");

try {
  process.loadEnvFile(join(REPO_ROOT, ".env"));
} catch {}

const STRAPI_URL = (
  process.env.STRAPI_URL || "http://localhost:1338"
).replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";
const CACHE_FILE = join(__dirname, ".strapi-upload-cache.json");
const LOG_DIR = join(__dirname, ".seed-logs");

const DRY_RUN = process.argv.includes("--dry-run");

if (!STRAPI_TOKEN && !DRY_RUN) {
  console.error("[fatal] STRAPI_TOKEN env var is required.");
  process.exit(1);
}

const MIME = {
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".gif": "image/gif", ".webp": "image/webp", ".svg": "image/svg+xml",
  ".ico": "image/x-icon", ".mp4": "video/mp4", ".webm": "video/webm",
};

// ---------------------------------------------------------------------------
// HELPERS (mirrors the page-seed scripts)
// ---------------------------------------------------------------------------

async function sha1OfFile(p) {
  return createHash("sha1").update(await readFile(p)).digest("hex");
}
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

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

async function uploadFile(absolutePath) {
  const buffer = await readFile(absolutePath);
  const ext = extname(absolutePath).toLowerCase();
  const mime = MIME[ext] || "application/octet-stream";
  const form = new FormData();
  form.append("files", new Blob([buffer], { type: mime }), basename(absolutePath));
  const res = await strapiFetch("/api/upload", { method: "POST", body: form });
  if (!res.ok) throw new Error(`Upload failed for ${absolutePath} (${res.status}): ${JSON.stringify(res.body)}`);
  const arr = Array.isArray(res.body) ? res.body : [res.body];
  return arr[0];
}

async function loadCache() {
  try { return JSON.parse(await readFile(CACHE_FILE, "utf8")); } catch { return {}; }
}
async function saveCache(c) {
  await writeFile(CACHE_FILE, JSON.stringify(c, null, 2), "utf8");
}

async function resolveAsset(relPath, ctx) {
  if (!relPath) return null;
  const abs = join(PUBLIC_DIR, relPath);
  if (!existsSync(abs)) {
    console.warn(`  [warn] asset not found, skipping: ${relPath}`);
    return null;
  }
  const hash = await sha1OfFile(abs);
  if (ctx.cache[hash]) { ctx.stats.cacheHits += 1; return ctx.cache[hash].id; }
  console.log(`  [upload] ${relPath}`);
  const file = await uploadFile(abs);
  ctx.cache[hash] = {
    id: file.id, documentId: file.documentId, url: file.url,
    name: file.name, sourcePath: relPath,
  };
  ctx.stats.uploads += 1;
  await saveCache(ctx.cache);
  await delay(20);
  return file.id;
}

const media = (p) => ({ __media: p });

async function hydrate(node, ctx) {
  if (node == null) return node;
  if (Array.isArray(node)) {
    const out = [];
    for (const v of node) {
      const r = await hydrate(v, ctx);
      if (r !== null) out.push(r);
    }
    return out;
  }
  if (typeof node === "object") {
    if (Object.prototype.hasOwnProperty.call(node, "__media")) {
      return await resolveAsset(node.__media, ctx);
    }
    const out = {};
    for (const [k, v] of Object.entries(node)) out[k] = await hydrate(v, ctx);
    return out;
  }
  return node;
}

async function putSingleType(apiId, data) {
  if (DRY_RUN) { console.log(`  [dry-run] skipping PUT /api/${apiId}`); return null; }
  // global-settings has draftAndPublish:false — no status param needed
  const upd = await strapiFetch(`/api/${apiId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });
  if (!upd.ok) {
    throw new Error(`PUT /api/${apiId} failed (${upd.status}): ${JSON.stringify(upd.body)}`);
  }
  return upd.body;
}

// ---------------------------------------------------------------------------
// ASSET MANIFEST
// ---------------------------------------------------------------------------

const ASSETS = {
  brand_logo: "navbar/logo.png",
  brand_favicon: "app/favicon.ico", // under src/, not public — see note below
  header_cta_dot: "navbar/cta-dot.svg",
  footer_linkedin: "footer/social-linkedin.svg",
  footer_youtube: "footer/social-youtube.svg",
  footer_x: "footer/social-x.svg",
  footer_crafted_by: "footer/crafted-by.svg",
  footer_bg: "footer/footer-bg.png",
  newsletter_texture: "resources/news-cta-texture.png",
};

// ---------------------------------------------------------------------------
// PAYLOAD — extracted from navbar/nav-items.ts, site-footer/footer-data.ts,
// SiteFooter.tsx, NewsletterSignup.tsx
// ---------------------------------------------------------------------------

const GLOBAL_PAYLOAD = {
  brand: {
    site_name: "Ambient Scientific",
    logo: media(ASSETS.brand_logo),
    // favicon lives under src/app/favicon.ico, not /public — left null so the
    // admin can attach the file directly. Next.js still serves it from /app.
    favicon: null,
  },

  header: {
    nav_items: [
      { label: "Products", href: "/products", has_dropdown: true },
      { label: "Technology", href: "/technology", has_dropdown: true },
      { label: "Applications", href: "/applications", has_dropdown: true },
      { label: "Company", href: "/company", has_dropdown: true },
      { label: "News & Resources", href: "/news-listing", has_dropdown: true },
      { label: "Blog", href: "/resources", has_dropdown: true },
      { label: "Career", href: "/careers", has_dropdown: false },
    ],
    cta_label: "GET IN TOUCH",
    cta_href: "/contact",
    cta_dot_icon: null,
  },

  footer: {
    nav_sections: [
      {
        title: "PRODUCTS",
        links: [
          { label: "GPX10", href: "/products" },
          { label: "GPX64", href: "/products" },
          { label: "Evaluation Kits", href: "/dvk" },
          { label: "ModelForge", href: "/developer" },
        ],
      },
      {
        title: "SOLUTIONS",
        links: [
          { label: "Medical & Wearables", href: "/applications/wearables" },
          { label: "Smart Home", href: "/applications" },
          { label: "Industrial IoT", href: "/applications" },
          { label: "Robotics", href: "/applications" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Documentation", href: "/resources" },
          { label: "Case Studies", href: "/resources" },
          { label: "Technical Papers", href: "/resources" },
          { label: "Blog", href: "/resources" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/company" },
          { label: "Careers", href: "/careers" },
          { label: "Industrial IoT", href: "/applications" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
    social_links: [
      { platform: "LinkedIn", href: "#", icon: media(ASSETS.footer_linkedin) },
      { platform: "YouTube", href: "#", icon: media(ASSETS.footer_youtube) },
      { platform: "X", href: "#", icon: media(ASSETS.footer_x) },
    ],
    legal_links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
    copyright_text: "© 2026 Ambient AI. All rights reserved.",
    crafted_by_text: "Carefully crafted by",
    crafted_by_logo: media(ASSETS.footer_crafted_by),
    background_image: null,
  },

  newsletter: {
    heading: "Want to stay in the forefront of AI tech.",
    subtitle:
      "Get the latest on Ambient's energy-aware AI processors, developer drops, and partner ecosystem news.",
    input_placeholder: "Your Email ID",
    button_label: "SUBSCRIBE",
    show_on_paths: ["/", "/company", "/technology", "/products"],
    texture_image: media(ASSETS.newsletter_texture),
  },

  contact_details: {
    email: "contact@ambientscientific.com",
    phone: "",
    locations: [
      {
        title: "USA Headquarters",
        address:
          "Ambient Scientific Inc. 4633 Old Ironsides Drive Santa Clara California 95054. USA",
      },
      {
        title: "Singapore Headquarters",
        address: "137 Telok Ayer Street, #05-02, Singapore 068602",
      },
      {
        title: "India Headquarters",
        address:
          "Ramky House, 1st Cross, Raghavendra Nagar, Kalyan Nagar, Bengaluru Karnataka, 560043, India",
      },
    ],
  },

  default_seo: {
    meta_title: "Ambient Scientific",
    meta_description:
      "Energy-aware, programmable AI processors that unlock orders-of-magnitude improvements in performance-per-watt.",
    keywords:
      "AI processor, edge AI, analog compute, in-memory compute, GPX10, low-power AI, Ambient Scientific",
    noindex: false,
    canonical_url: "/",
  },
};

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------

async function main() {
  if (!existsSync(LOG_DIR)) await mkdir(LOG_DIR, { recursive: true });
  const ctx = {
    cache: await loadCache(),
    stats: { uploads: 0, cacheHits: 0, failures: 0 },
  };

  console.log(`Strapi : ${STRAPI_URL}`);
  console.log(`Token  : ${STRAPI_TOKEN ? "****" + STRAPI_TOKEN.slice(-4) : "(none)"}`);
  console.log(`Mode   : ${DRY_RUN ? "DRY-RUN" : "live"}`);

  if (!DRY_RUN) {
    const ping = await strapiFetch("/api/home-page");
    if (ping.status === 401 || ping.status === 403) {
      console.error(`[fatal] token rejected (${ping.status}).`);
      process.exit(1);
    }
    console.log(`[ok] /api reachable (status ${ping.status})`);
  }

  console.log("\nSeeding global-settings...");
  let hydrated;
  try {
    hydrated = await hydrate(GLOBAL_PAYLOAD, ctx);
  } catch (err) {
    console.error(`  [error] hydrating: ${err.message}`);
    ctx.stats.failures += 1;
    process.exit(1);
  }
  await writeFile(join(LOG_DIR, "global-settings.json"), JSON.stringify(hydrated, null, 2), "utf8");

  try {
    await putSingleType("global-settings", hydrated);
    console.log("  [done] PUT /api/global-settings OK");
  } catch (err) {
    console.error(`  [error] ${err.message}`);
    ctx.stats.failures += 1;
  }

  console.log("\n=== Summary ===");
  console.log(`Assets uploaded : ${ctx.stats.uploads}`);
  console.log(`Assets reused   : ${ctx.stats.cacheHits}`);
  console.log(`Failures        : ${ctx.stats.failures}`);
  process.exit(ctx.stats.failures ? 1 : 0);
}

main().catch((err) => {
  console.error("[fatal]", err);
  process.exit(1);
});
