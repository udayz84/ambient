/**
 * seed-news-backdrop.mjs
 * ----------------------------------------------------------------------------
 * Uploads the corrected news-listing dotted backdrop
 * (public/news-listing/backdrop-dots.png — Figma node 2500:1654 "image 107",
 * rotated per the node's rotate(-90) scaleY(-1) transform into 1440x810 @2x)
 * and points the news-listing-page `grid.backdrop_image` at it.
 *
 * Replaces the previous flattened/dark export; the bright source + the
 * component's DOM vignette overlay reproduces the Figma render exactly.
 *
 * Usage
 *   node scripts/seed-news-backdrop.mjs                # upload + PUT
 *   node scripts/seed-news-backdrop.mjs --skip-upload  # reuse cached file id
 *   node scripts/seed-news-backdrop.mjs --dry-run      # no PUT
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
} catch {
  // env vars already set in shell, or no .env — continue.
}

const STRAPI_URL = (
  process.env.STRAPI_URL || "http://localhost:1338"
).replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";
const CACHE_FILE = join(__dirname, ".strapi-upload-cache.json");

const argv = new Set(process.argv.slice(2));
const SKIP_UPLOAD = argv.has("--skip-upload");
const DRY_RUN = argv.has("--dry-run");

const BACKDROP_ASSET = "news-listing/backdrop-dots.png";

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

async function sha1OfFile(absolutePath) {
  const buf = await readFile(absolutePath);
  return createHash("sha1").update(buf).digest("hex");
}

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
  console.log(`  [uploaded] ${relPath} -> file id ${file.id} (${file.url})`);
  return file.id;
}

async function main() {
  console.log(`Strapi:   ${STRAPI_URL}`);
  console.log(`Asset:    ${BACKDROP_ASSET}`);
  console.log(`Token:    ${STRAPI_TOKEN ? "****" + STRAPI_TOKEN.slice(-4) : "(none)"}`);
  console.log(`Dry run:  ${DRY_RUN}`);
  console.log("");

  const cache = await loadCache();
  const fileId = await resolveAsset(BACKDROP_ASSET, cache);

  // PUT replaces component fields, so fetch the current grid and merge.
  console.log("\nGET /api/news-listing-page  (read current grid)");
  const cur = await strapiFetch(
    "/api/news-listing-page?populate[grid][populate]=*"
  );
  if (!cur.ok) {
    throw new Error(
      `GET /api/news-listing-page failed (${cur.status}): ${JSON.stringify(cur.body)}`
    );
  }
  const curGrid = (cur.body && cur.body.data && cur.body.data.grid) || {};
  const grid = {
    load_more_label: curGrid.load_more_label ?? null,
    alt: curGrid.alt ?? null,
    filter_pills: Array.isArray(curGrid.filter_pills)
      ? curGrid.filter_pills.map((p) => ({
          id: p.id,
          label: p.label ?? null,
          category_id: p.category_id ?? null,
          is_active: p.is_active ?? null,
        }))
      : [],
    backdrop_image: fileId,
  };
  console.log(
    "  filter_pills:",
    grid.filter_pills.map((p) => p.label).join(", ")
  );

  if (DRY_RUN) {
    console.log("\n[dry-run] would PUT grid with backdrop_image =", fileId);
    return;
  }

  console.log("\nPUT /api/news-listing-page  (update grid.backdrop_image)");
  const put = await strapiFetch("/api/news-listing-page", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: { grid } }),
  });
  if (!put.ok) {
    throw new Error(
      `PUT failed (${put.status}): ${JSON.stringify(put.body)}`
    );
  }
  console.log("  updated (draft).");

  console.log("PUT /api/news-listing-page?status=published  (publish)");
  const pub = await strapiFetch("/api/news-listing-page?status=published", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: { grid } }),
  });
  if (!pub.ok) {
    console.warn(
      `  [warn] publish step returned ${pub.status}: ${JSON.stringify(pub.body)}`
    );
  } else {
    console.log("  published.");
  }

  console.log(`\nDone. grid.backdrop_image=${fileId}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
