/**
 * seed-dvk-hero-bg.mjs
 * ----------------------------------------------------------------------------
 * Pushes the correct DVK hero background image to Strapi.
 *
 * Context: the dvk-page hero schema was reduced from TWO media fields
 * (background_image_1, background_image_2) to ONE (background_image).
 * The rendered UI (src/components/dvk/DvkHero.tsx) treats hero-bg-2.png as
 * the single source-of-truth background, so this script uploads that file and
 * writes it into the hero.background_image field of the dvk-page single type.
 *
 * Run AFTER restarting Strapi so the schema change (single background_image
 * field) has been applied — otherwise the PUT will be rejected as
 * "Invalid key background_image".
 *
 * Usage
 *   node scripts/seed-dvk-hero-bg.mjs                # upload + PUT + publish
 *   node scripts/seed-dvk-hero-bg.mjs --skip-upload  # reuse cached file id
 *   node scripts/seed-dvk-hero-bg.mjs --dry-run      # no PUT
 * ----------------------------------------------------------------------------
 */

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { basename, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = normalize(join(__dirname, ".."));
const PUBLIC_DIR = join(REPO_ROOT, "public");

// Auto-load <repo-root>/.env if present (Node 21.7+).
try {
  process.loadEnvFile(join(REPO_ROOT, ".env"));
} catch {
  // env vars already set in shell, or no .env — continue.
}

// ---------------------------------------------------------------------------
// CONFIG
// ---------------------------------------------------------------------------

const STRAPI_URL = (
  process.env.STRAPI_URL || "http://localhost:1338"
).replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";
const CACHE_FILE = join(__dirname, ".strapi-upload-cache.json");

const argv = new Set(process.argv.slice(2));
const SKIP_UPLOAD = argv.has("--skip-upload");
const DRY_RUN = argv.has("--dry-run");

/** The single asset this script manages. */
const HERO_BG_ASSET = "dvk/hero-bg-2.png";

/** Fallbacks if the CMS hero is missing fields. */
const DEFAULT_HERO = {
  title: "The physical launchpad for microwatt Edge AI.",
  subtitle:
    "Validate real-time AI at microwatt power levels out of the box. The Cranium Development Kit comes fully loaded with onboard sensors, rich I/O, and pre-integrated drivers so you can stop breadboarding and start testing inferences in minutes.",
  cta_label: "Request Evaluation Kit",
};

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
    "[fatal] STRAPI_TOKEN env var is required (create a Full access token in Strapi admin)."
  );
  process.exit(1);
}

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------

async function sha1OfFile(absolutePath) {
  const buf = await readFile(absolutePath);
  return createHash("sha1").update(buf).digest("hex");
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

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
  console.log(`Strapi:   ${STRAPI_URL}`);
  console.log(`Asset:    ${HERO_BG_ASSET}`);
  console.log(`Dry run:  ${DRY_RUN}`);
  console.log("");

  const cache = await loadCache();
  const fileId = await resolveAsset(HERO_BG_ASSET, cache);

  // Strapi's REST API REPLACES a component field on PUT, so a partial hero
  // object would null out required fields (hero.title). Fetch the current hero
  // first and merge background_image into it.
  console.log("\nGET /api/dvk-page  (read current hero)");
  const cur = await strapiFetch("/api/dvk-page?populate[hero][populate]=*");
  if (!cur.ok) {
    throw new Error(
      `GET /api/dvk-page failed (${cur.status}): ${JSON.stringify(cur.body)}`
    );
  }
  const curHero = (cur.body && cur.body.data && cur.body.data.hero) || {};
  const hero = {
    title: curHero.title || DEFAULT_HERO.title,
    subtitle: curHero.subtitle ?? DEFAULT_HERO.subtitle,
    cta_label: curHero.cta_label || DEFAULT_HERO.cta_label,
    background_image: fileId,
  };
  console.log("  hero.title:", JSON.stringify(hero.title));

  if (DRY_RUN) {
    console.log(`\n[dry-run] would PUT /api/dvk-page with hero.background_image=${fileId}`);
    return;
  }

  console.log("\nPUT /api/dvk-page  (hero.background_image)");
  const upd = await strapiFetch("/api/dvk-page", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: { hero } }),
  });
  if (!upd.ok) {
    throw new Error(
      `PUT /api/dvk-page failed (${upd.status}): ${JSON.stringify(upd.body)}`
    );
  }
  console.log("  updated (draft).");

  console.log("PUT /api/dvk-page?status=published  (publish)");
  const pub = await strapiFetch("/api/dvk-page?status=published", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: { hero } }),
  });
  if (!pub.ok) {
    console.warn(
      `  [warn] publish step returned ${pub.status}: ${JSON.stringify(pub.body)}`
    );
  } else {
    console.log("  published.");
  }

  console.log("\nDone. dvk-page hero.background_image =", fileId);
}

main().catch((err) => {
  console.error("\n[fatal]", err.message);
  process.exit(1);
});
