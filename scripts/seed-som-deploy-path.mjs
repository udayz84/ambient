/**
 * seed-som-deploy-path.mjs
 * ----------------------------------------------------------------------------
 * Completes the SOM page "Validate on NuraSense. Deploy on a SOM" section
 * (som-page.deploy_path) in Strapi.
 *
 * The text content was already seeded, but both deploy-path cards have
 * image = null, so the frontend renders its hardcoded /som/*.webp fallbacks.
 * This script uploads the two card images and attaches them:
 *   card 1 (NuraSense EVK)   <- public/som/sparsh-chip.webp
 *   card 2 (GPX10 Pro SOM)   <- public/som/som-chip.webp
 *
 * Strapi's REST API REPLACES a component field on PUT, so the current
 * deploy_path (heading, subheading, buttons, card texts) is fetched first
 * and merged — only the card image ids change.
 *
 * Usage
 *   node scripts/seed-som-deploy-path.mjs                # upload + PUT + publish
 *   node scripts/seed-som-deploy-path.mjs --skip-upload  # reuse cached file ids
 *   node scripts/seed-som-deploy-path.mjs --dry-run      # no PUT
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

try {
  process.loadEnvFile(join(REPO_ROOT, ".env"));
} catch {}

const STRAPI_URL = (
  process.env.STRAPI_URL || "http://localhost:1338"
).replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";
const CACHE_FILE = join(__dirname, ".strapi-upload-cache.json");

const argv = new Set(process.argv.slice(2));
const SKIP_UPLOAD = argv.has("--skip-upload");
const DRY_RUN = argv.has("--dry-run");

/** Card 1 (index 0) -> EVK board photo; card 2 (index 1) -> SOM board photo. */
const CARD_ASSETS = ["som/sparsh-chip.webp", "som/som-chip.webp"];

const MIME = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

if (!STRAPI_TOKEN && !DRY_RUN) {
  console.error("[fatal] STRAPI_TOKEN env var is required.");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// HELPERS (same shape as seed-dvk-hero-bg.mjs)
// ---------------------------------------------------------------------------

async function sha1OfFile(absolutePath) {
  const buf = await readFile(absolutePath);
  return createHash("sha1").update(buf).digest("hex");
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function strapiFetch(pathname, init = {}) {
  const url = pathname.startsWith("http") ? pathname : `${STRAPI_URL}${pathname}`;
  const headers = { Authorization: `Bearer ${STRAPI_TOKEN}`, ...(init.headers || {}) };
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
    throw new Error(`Upload failed for ${absolutePath} (${res.status}): ${JSON.stringify(res.body)}`);
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
  if (!existsSync(abs)) throw new Error(`Asset not found: ${relPath} (expected at ${abs})`);
  const hash = await sha1OfFile(abs);
  if (cache[hash]) {
    console.log(`  [cache-hit] ${relPath} -> file id ${cache[hash].id}`);
    return cache[hash].id;
  }
  if (SKIP_UPLOAD) {
    throw new Error(`--skip-upload set but no cached asset for ${relPath}; remove the flag.`);
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
  console.log(`Strapi: ${STRAPI_URL}  (dry run: ${DRY_RUN})`);

  const cache = await loadCache();
  const imageIds = [];
  for (const rel of CARD_ASSETS) {
    imageIds.push(await resolveAsset(rel, cache));
  }

  console.log("\nGET /api/som-page  (read current deploy_path)");
  const cur = await strapiFetch(
    "/api/som-page?populate[deploy_path][populate][cards][populate]=*&populate[deploy_path][populate][primary_button]=*"
  );
  if (!cur.ok) {
    throw new Error(`GET /api/som-page failed (${cur.status}): ${JSON.stringify(cur.body)}`);
  }
  const current = cur.body?.data?.deploy_path;
  if (!current) {
    throw new Error("som-page has no deploy_path component yet — seed the text content first.");
  }

  // Rebuild the full component (PUT replaces it wholesale) — everything kept
  // from the CMS, only the card image ids are filled in.
  const cardCount = Math.max(current.cards?.length || 0, CARD_ASSETS.length);
  const deployPath = {
    heading: current.heading,
    subheading: current.subheading ?? null,
    primary_button: current.primary_button
      ? {
          label: current.primary_button.label,
          href: current.primary_button.href ?? null,
          variant: current.primary_button.variant ?? "primary",
        }
      : null,
    secondary_button_label: current.secondary_button_label ?? null,
    secondary_button_link: current.secondary_button_link ?? null,
    cards: Array.from({ length: cardCount }, (_, i) => {
      const c = current.cards?.[i] || {};
      return {
        title: c.title,
        description: c.description ?? null,
        badge_label: c.badge_label ?? "Available",
        is_available: c.is_available ?? true,
        image_overlay_label: c.image_overlay_label ?? null,
        image: imageIds[i] ?? c.image?.id ?? null,
      };
    }),
  };

  console.log(`  cards: ${deployPath.cards.map((c) => `${c.title} (image id ${c.image})`).join(" | ")}`);

  if (DRY_RUN) {
    console.log("\n[dry-run] would PUT /api/som-page with deploy_path as above.");
    return;
  }

  console.log("\nPUT /api/som-page  (deploy_path card images)");
  const upd = await strapiFetch("/api/som-page", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: { deploy_path: deployPath } }),
  });
  if (!upd.ok) {
    throw new Error(`PUT /api/som-page failed (${upd.status}): ${JSON.stringify(upd.body)}`);
  }
  console.log("  updated (draft).");

  console.log("PUT /api/som-page?status=published  (publish)");
  const pub = await strapiFetch("/api/som-page?status=published", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: { deploy_path: deployPath } }),
  });
  if (!pub.ok) {
    console.warn(`  [warn] publish step returned ${pub.status}: ${JSON.stringify(pub.body)}`);
  } else {
    console.log("  published.");
  }

  console.log("\nDone. som-page deploy_path cards now use Strapi media.");
}

main().catch((err) => {
  console.error("\n[fatal]", err.message);
  process.exit(1);
});
