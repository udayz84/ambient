/**
 * seed-footer.mjs
 * ----------------------------------------------------------------------------
 * Seeds the `footer` single type with the exact content the site currently
 * renders from the hardcoded fallbacks in
 * src/components/site-footer/footer-data.ts, so the CMS-driven render is
 * pixel-identical to the fallback render.
 *
 * What is seeded:
 *
 *   footer (shared.footer)
 *     - nav_sections      PRODUCTS / SOLUTIONS / Resources / Company
 *                         (order matters — SiteFooter.tsx maps column widths
 *                          from FALLBACK_FOOTER_NAV_SECTIONS by index)
 *     - social_links      linkedin / x / youtube with the same SVG icons
 *                         uploaded from public/footer/
 *     - legal_links       Privacy Policy / Terms of Service / Cookie Policy
 *     - copyright_text    "© 2026 Ambient AI. All rights reserved."
 *     - crafted_by_text   "Carefully crafted by"
 *     - crafted_by_logo   public/footer/3minds.png
 *     - background_image  public/footer/footer-bg.png
 *
 *   newsletter (shared.newsletter)
 *     heading "Want to stay in the forefront of AI tech." — NewsletterSignup
 *     splits it into the same two rendered lines ("Want to stay in the" /
 *     "forefront of AI tech.") via splitHeading().
 *
 *   contact_details (shared.contact-details)
 *     email only (schema default) — not rendered in the footer today.
 *
 *   default_seo (shared.seo)
 *     preserved when already present (component is required); seeded with the
 *     site defaults from src/app/layout.tsx metadata when empty.
 *
 * The footer single type has draftAndPublish DISABLED, so there is no
 * publish step (unlike seed-navbar-structure.mjs).
 *
 * Run AFTER granting public read (node cms/_setperms-footer.cjs) if the
 * frontend should consume the seeded content.
 *
 * Usage
 *   node scripts/seed-footer.mjs               # live
 *   node scripts/seed-footer.mjs --dry-run
 *   node scripts/seed-footer.mjs --skip-upload # reuse cached media ids
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

// ---------------------------------------------------------------------------
// CONFIG
// ---------------------------------------------------------------------------

const STRAPI_URL = (
  process.env.STRAPI_URL || "http://localhost:1338"
).replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";
const CACHE_FILE = join(__dirname, ".strapi-upload-cache.json");
const LOG_DIR = join(__dirname, ".seed-logs");

const argv = new Set(process.argv.slice(2));
const SKIP_UPLOAD = argv.has("--skip-upload");
const DRY_RUN = argv.has("--dry-run");

const MIME = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

if (!STRAPI_TOKEN && !DRY_RUN) {
  console.error(
    "[fatal] STRAPI_TOKEN env var is required (create a Full access token in Strapi admin or via cms/_mktoken.cjs)."
  );
  process.exit(1);
}

// ---------------------------------------------------------------------------
// CONTENT — mirrors src/components/site-footer/footer-data.ts exactly.
// Do not edit without updating the fallbacks (or the render will drift).
// ---------------------------------------------------------------------------

const NAV_SECTIONS = [
  {
    title: "PRODUCTS",
    links: [
      { label: "GPX10", href: "#" },
      { label: "GPX64", href: "#" },
      { label: "Evaluation Kits", href: "#" },
      { label: "ModelForge", href: "#" },
    ],
  },
  {
    title: "SOLUTIONS",
    links: [
      { label: "Medical & Wearables", href: "#" },
      { label: "Smart Home", href: "#" },
      { label: "Industrial IoT", href: "#" },
      { label: "Robotics", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Case Studies", href: "#" },
      { label: "Technical Papers", href: "#" },
      { label: "News", href: "/news-listing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Industrial IoT", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    platform: "linkedin",
    href: "#",
    asset: "footer/social-linkedin.svg",
    alt: "LinkedIn",
  },
  {
    platform: "x",
    href: "#",
    asset: "footer/social-x.svg",
    alt: "X",
  },
  {
    platform: "youtube",
    href: "#",
    asset: "footer/social-youtube.svg",
    alt: "YouTube",
  },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

const COPYRIGHT_TEXT = "© 2026 Ambient AI. All rights reserved.";
const CRAFTED_BY_TEXT = "Carefully crafted by";

const CRAFTED_BY_LOGO_ASSET = "footer/3minds.png";
const CRAFTED_BY_LOGO_ALT = "3minds";

const BACKGROUND_ASSET = "footer/footer-bg.png";
const BACKGROUND_ALT = "Ambient Scientific footer background";

const NEWSLETTER = {
  heading: "Want to stay in the forefront of AI tech.",
  subtitle: "Sign up to receive regular updates.",
  input_placeholder: "Your Email ID",
  button_label: "SUBSCRIBE",
  // Mirrors SiteFooterWrapper.tsx (pathname === "/" || "/company"). Not read
  // by the frontend yet — documents intent only.
  show_on_paths: ["/", "/company"],
};

const CONTACT_DETAILS = {
  email: "contact@ambientscientific.com",
};

/** Fallback when default_seo is empty (layout.tsx description, truncated to
 *  the schema's 160-char limit at a word boundary — SEO field, not rendered). */
const DEFAULT_SEO = {
  meta_title: "Ambient Scientific",
  meta_description:
    "Ambient Scientific builds energy-aware, programmable, mixed-signal AI processors that deliver orders-of-magnitude improvements in performance-per-watt — from",
};

// ---------------------------------------------------------------------------
// HELPERS (same pattern as seed-company-hero-bg.mjs / seed-navbar-structure.mjs)
// ---------------------------------------------------------------------------

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

async function sha1OfFile(absolutePath) {
  const buf = await readFile(absolutePath);
  return createHash("sha1").update(buf).digest("hex");
}

async function uploadFile(absolutePath) {
  const buffer = await readFile(absolutePath);
  const ext = extname(absolutePath).toLowerCase();
  const mime = MIME[ext] || "application/octet-stream";

  const form = new FormData();
  form.append("files", new Blob([buffer], { type: mime }), basename(absolutePath));

  const res = await strapiFetch("/api/upload", { method: "POST", body: form });
  if (!res.ok) {
    throw new Error(
      `Upload failed for ${absolutePath} (${res.status}): ${JSON.stringify(res.body)}`
    );
  }
  const arr = Array.isArray(res.body) ? res.body : [res.body];
  if (!arr.length) throw new Error(`Empty upload response for ${absolutePath}`);
  return arr[0];
}

async function loadCache() {
  try {
    return JSON.parse(await readFile(CACHE_FILE, "utf8"));
  } catch {
    return {};
  }
}
async function saveCache(cache) {
  await writeFile(CACHE_FILE, JSON.stringify(cache, null, 2), "utf8");
}

/** Upload (or reuse cached) asset and return its Strapi file id. */
async function resolveAsset(relPath, cache) {
  const abs = join(PUBLIC_DIR, relPath);
  if (!existsSync(abs)) {
    throw new Error(`Asset not found: ${relPath} (expected at ${abs})`);
  }
  const hash = await sha1OfFile(abs);
  if (cache[hash]) {
    console.log(`  [cache-hit] ${relPath} -> file id ${cache[hash].id}`);
    return cache[hash].id;
  }
  if (SKIP_UPLOAD) {
    throw new Error(
      `--skip-upload set but no cached asset for ${relPath}; remove the flag.`
    );
  }
  console.log(`  [upload] ${relPath}`);
  const file = await uploadFile(abs);
  cache[hash] = {
    id: file.id,
    documentId: file.documentId,
    url: file.url,
    name: file.name,
    sourcePath: relPath,
  };
  await saveCache(cache);
  await delay(20);
  console.log(`  [uploaded] ${relPath} -> file id ${file.id} (${file.url})`);
  return file.id;
}

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------

async function main() {
  if (!existsSync(LOG_DIR)) await mkdir(LOG_DIR, { recursive: true });

  console.log(`Strapi : ${STRAPI_URL}`);
  console.log(`Token  : ${STRAPI_TOKEN ? "****" + STRAPI_TOKEN.slice(-4) : "(none)"}`);
  console.log(`Mode   : ${DRY_RUN ? "DRY-RUN" : "live"}`);

  const cache = await loadCache();

  // 1. Media ---------------------------------------------------------------

  console.log("\nResolving media assets...");
  const iconIds = {};
  for (const social of SOCIAL_LINKS) {
    iconIds[social.platform] = DRY_RUN ? null : await resolveAsset(social.asset, cache);
  }
  const craftedByLogoId = DRY_RUN ? null : await resolveAsset(CRAFTED_BY_LOGO_ASSET, cache);
  const backgroundId = DRY_RUN ? null : await resolveAsset(BACKGROUND_ASSET, cache);

  // 2. Fetch current entry (preserve default_seo — component is required) --

  let currentSeo = null;
  if (!DRY_RUN) {
    const current = await strapiFetch(
      "/api/footer?populate[footer][populate]=*&populate[newsletter][populate]=*&populate[contact_details][populate]=*&populate[default_seo][populate]=*"
    );
    if (current.status === 401 || current.status === 403) {
      console.error(`[fatal] token rejected (${current.status}).`);
      process.exit(1);
    }
    if (current.ok) {
      currentSeo = current.body?.data?.default_seo ?? null;
    } else if (current.status !== 404) {
      console.warn(
        `  [warn] GET /api/footer returned ${current.status}: ${JSON.stringify(current.body)}`
      );
    }
    console.log(
      `[ok] fetched current footer (default_seo ${currentSeo ? "kept" : "absent -> will seed site defaults"})`
    );
  }

  // 3. Payload ---------------------------------------------------------------

  const payload = {
    footer: {
      nav_sections: NAV_SECTIONS,
      social_links: SOCIAL_LINKS.map((s) => ({
        platform: s.platform,
        href: s.href,
        ...(iconIds[s.platform] ? { icon: iconIds[s.platform] } : {}),
        alt: s.alt,
      })),
      legal_links: LEGAL_LINKS,
      copyright_text: COPYRIGHT_TEXT,
      crafted_by_text: CRAFTED_BY_TEXT,
      ...(craftedByLogoId ? { crafted_by_logo: craftedByLogoId } : {}),
      crafted_by_logo_alt: CRAFTED_BY_LOGO_ALT,
      ...(backgroundId ? { background_image: backgroundId } : {}),
      background_image_alt: BACKGROUND_ALT,
    },
    newsletter: { ...NEWSLETTER },
    contact_details: { ...CONTACT_DETAILS },
    default_seo: currentSeo
      ? {
          meta_title: currentSeo.meta_title ?? null,
          meta_description: currentSeo.meta_description ?? null,
          keywords: currentSeo.keywords ?? null,
          noindex: currentSeo.noindex ?? false,
          canonical_url: currentSeo.canonical_url ?? null,
        }
      : { ...DEFAULT_SEO },
  };

  await writeFile(
    join(LOG_DIR, "footer.json"),
    JSON.stringify(payload, null, 2),
    "utf8"
  );

  // 4. PUT (footer single type: draftAndPublish disabled -> no publish step)

  console.log("\nSeeding footer...");
  if (DRY_RUN) {
    console.log("  [dry-run] skipping PUT /api/footer");
    console.log(`  [dry-run] payload written to ${join(LOG_DIR, "footer.json")}`);
    return;
  }

  const upd = await strapiFetch("/api/footer", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: payload }),
  });
  if (!upd.ok) {
    console.error(
      `  [error] PUT /api/footer failed (${upd.status}): ${JSON.stringify(upd.body)}`
    );
    process.exit(1);
  }
  console.log("  [done] PUT /api/footer OK");

  // 5. Verify with the exact query the frontend uses (src/lib/strapi.ts) ----

  const verify = await strapiFetch(
    "/api/footer?populate[footer][populate][crafted_by_logo]=true&populate[footer][populate][background_image]=true&populate[footer][populate][social_links][populate]=*&populate[footer][populate][nav_sections][populate][links][populate]=*&populate[footer][populate][legal_links][populate]=*&populate[newsletter][populate]=*&populate[contact_details][populate]=*&populate[default_seo][populate]=*"
  );
  if (verify.ok) {
    const d = verify.body?.data ?? {};
    const f = d.footer ?? {};
    console.log("\n=== Verification (frontend populate query) ===");
    console.log(`nav_sections   : ${f.nav_sections?.length ?? 0} (${(f.nav_sections ?? []).map((s) => s.title).join(" | ")})`);
    console.log(`social_links   : ${f.social_links?.length ?? 0} (icons populated: ${(f.social_links ?? []).every((s) => s.icon?.url)})`);
    console.log(`legal_links    : ${f.legal_links?.length ?? 0}`);
    console.log(`copyright_text : ${JSON.stringify(f.copyright_text)}`);
    console.log(`crafted_by     : ${JSON.stringify(f.crafted_by_text)} (logo ${f.crafted_by_logo?.url ? f.crafted_by_logo.url : "—"})`);
    console.log(`background     : ${f.background_image?.url ?? "—"}`);
    console.log(`newsletter     : ${JSON.stringify(d.newsletter?.heading)} / ${JSON.stringify(d.newsletter?.button_label)}`);
    console.log(`contact_email  : ${JSON.stringify(d.contact_details?.email)}`);
  } else {
    console.warn(`  [warn] verify GET returned ${verify.status}`);
  }

  console.log(
    "\nDone. Footer renders via CMS with values identical to the fallbacks in footer-data.ts."
  );
}

main().catch((err) => {
  console.error("[fatal]", err);
  process.exit(1);
});
