/**
 * seed-applications-death-section.mjs
 * ----------------------------------------------------------------------------
 * Targeted seed for the "Death Of Hardware Tradeoffs" section of the
 * applications-page single type.
 *
 *   - Uploads the 6 carousel images (SHA-1 dedupe via the shared upload cache).
 *   - PUTs /api/applications-page with ONLY the `death_of_hardware_tradeoffs`
 *     field (Strapi partial-updates single types, so hero/continuum/articles/
 *     wins/som/seo are left untouched).
 *
 * Usage
 *   $env:STRAPI_TOKEN="...."
 *   node scripts/seed-applications-death-section.mjs            # upload + PUT + publish
 *   node scripts/seed-applications-death-section.mjs --skip-upload  # reuse cached ids
 *   node scripts/seed-applications-death-section.mjs --dry-run
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

const STRAPI_URL = (process.env.STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";
const CACHE_FILE = join(__dirname, ".strapi-upload-cache.json");

const argv = new Set(process.argv.slice(2));
const SKIP_UPLOAD = argv.has("--skip-upload");
const DRY_RUN = argv.has("--dry-run");

if (!STRAPI_TOKEN && !DRY_RUN) {
  console.error("[fatal] STRAPI_TOKEN env var is required.");
  process.exit(1);
}

const MIME = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

const CAROUSEL_IMAGES = [
  "applications/dvk-m-watch.png",
  "applications/dvk-m-robot-arm.png",
  "applications/dvk-m-humanoid.png",
  "applications/dvk-m-headphones.png",
  "applications/dvk-m-rover.png",
  "applications/dvk-m-surgical.png",
];

const FEATURES = [
  { title: "Complex AI Model" },
  { title: "Realtime & low latency" },
  { title: "Ondevice, cloud-free" },
  { title: "Compact footprint" },
  { title: "Programmable & future proof" },
  { title: "Ultra -low power consumption" },
];

const HEADING = "The death of hardware tradeoffs.";
const SUBTITLE =
  "Legacy silicon forces you to choose. High performance or low power. Complex models or small footprint. We re-architected the physics so you can finally unleash your creativity and build with freedom.";

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
async function saveCache(cache) {
  await writeFile(CACHE_FILE, JSON.stringify(cache, null, 2), "utf8");
}

async function resolveAsset(relPath, cache) {
  const abs = join(PUBLIC_DIR, relPath);
  if (!existsSync(abs)) throw new Error(`asset not found: ${relPath}`);
  const hash = await sha1OfFile(abs);
  if (cache[hash]) return cache[hash].id;
  if (SKIP_UPLOAD) throw new Error(`--skip-upload but no cached asset for ${relPath}`);
  console.log(`  [upload] ${relPath}`);
  const file = await uploadFile(abs);
  cache[hash] = { id: file.id, documentId: file.documentId, url: file.url, name: file.name, sourcePath: relPath };
  await saveCache(cache);
  await delay(20);
  return file.id;
}

async function main() {
  console.log(`Strapi : ${STRAPI_URL}`);
  console.log(`Token  : ${STRAPI_TOKEN ? "****" + STRAPI_TOKEN.slice(-4) : "(none)"}`);
  console.log(`Mode   : ${DRY_RUN ? "DRY-RUN" : SKIP_UPLOAD ? "SKIP-UPLOAD" : "live"}`);

  const cache = await loadCache();
  const imageIds = [];
  for (const rel of CAROUSEL_IMAGES) {
    const id = await resolveAsset(rel, cache);
    imageIds.push(id);
  }
  console.log(`  carousel image ids: ${JSON.stringify(imageIds)}`);

  const data = {
    heading: HEADING,
    subtitle: SUBTITLE,
    carousel_images: imageIds,
    features: FEATURES,
  };

  if (DRY_RUN) {
    console.log("[dry-run] would PUT /api/applications-page with:", JSON.stringify({ death_of_hardware_tradeoffs: data }, null, 2));
    return;
  }

  console.log("\nPUT /api/applications-page  (death_of_hardware_tradeoffs only)");
  const upd = await strapiFetch("/api/applications-page", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: { death_of_hardware_tradeoffs: data } }),
  });
  if (!upd.ok) throw new Error(`PUT failed (${upd.status}): ${JSON.stringify(upd.body)}`);
  console.log("  [done] draft updated");

  console.log("PUT /api/applications-page?status=published  (publish)");
  const pub = await strapiFetch("/api/applications-page?status=published", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: { death_of_hardware_tradeoffs: data } }),
  });
  if (!pub.ok) console.warn(`  [warn] publish returned ${pub.status}: ${JSON.stringify(pub.body)}`);
  else console.log("  [done] published");

  console.log("\nSuccess.");
}

main().catch((err) => { console.error(err.message); process.exit(1); });
