/**
 * seed-dvk-blueprint-board.mjs
 * ----------------------------------------------------------------------------
 * Pushes the square "Hardware Blueprint" board image to Strapi.
 *
 * Context: Figma 2761:2915 redesigned the hardware-stack section — the wide
 * cropped board_main/board_chip composite was replaced by a single square
 * (435.976px) board render inside the left feature card. This script uploads
 * public/dvk/board-blueprint.webp and writes it into
 * hardware_stack.board_image of the dvk-page single type.
 *
 * Usage
 *   node scripts/seed-dvk-blueprint-board.mjs                # upload + PUT + publish
 *   node scripts/seed-dvk-blueprint-board.mjs --skip-upload  # reuse cached file id
 *   node scripts/seed-dvk-blueprint-board.mjs --dry-run      # no PUT
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
const BOARD_ASSET = "dvk/board-blueprint.webp";

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
  console.log(`Asset:    ${BOARD_ASSET}`);
  console.log(`Dry run:  ${DRY_RUN}`);
  console.log("");

  const cache = await loadCache();
  const fileId = await resolveAsset(BOARD_ASSET, cache);

  // Strapi's REST API REPLACES a component field on PUT, so a partial
  // hardware_stack object would null out the other fields. Fetch the current
  // component first and merge board_image into it.
  console.log("\nGET /api/dvk-page  (read current hardware_stack)");
  const cur = await strapiFetch(
    "/api/dvk-page?populate[hardware_stack][populate]=*"
  );
  if (!cur.ok) {
    throw new Error(
      `GET /api/dvk-page failed (${cur.status}): ${JSON.stringify(cur.body)}`
    );
  }
  const curStack =
    (cur.body && cur.body.data && cur.body.data.hardware_stack) || {};
  const hardware_stack = {
    heading: curStack.heading,
    subtitle: curStack.subtitle,
    label: curStack.label,
    chip_image: curStack.chip_image ? curStack.chip_image.id : null,
    chip_image_alt: curStack.chip_image_alt ?? null,
    spec_cards: (curStack.spec_cards || []).map((c) => ({
      title: c.title,
      items: c.items,
      is_accent: c.is_accent === true,
    })),
  };
  console.log("  hardware_stack.label:", JSON.stringify(hardware_stack.label));
  console.log("  spec_cards preserved:", hardware_stack.spec_cards.length);

  if (DRY_RUN) {
    console.log(
      `\n[dry-run] would PUT /api/dvk-page with hardware_stack`
    );
    return;
  }

  console.log("\nPUT /api/dvk-page  (hardware_stack.board_image)");
  const upd = await strapiFetch("/api/dvk-page", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: { hardware_stack } }),
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
    body: JSON.stringify({ data: { hardware_stack } }),
  });
  if (!pub.ok) {
    console.warn(
      `  [warn] publish step returned ${pub.status}: ${JSON.stringify(pub.body)}`
    );
  } else {
    console.log("  published.");
  }

  console.log("\nDone. dvk-page hardware_stack.board_image =", fileId);
}

main().catch((err) => {
  console.error("\n[fatal]", err.message);
  process.exit(1);
});
