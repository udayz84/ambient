/**
 * seed-products-architecture.mjs
 * ----------------------------------------------------------------------------
 * Seeds the `architecture` component of the `products-page` single type with
 * the content of the redesigned "Everything in one chip. Nothing wasted."
 * section (Figma 3713:1965):
 *
 *   label    — "ARCHITECTURE" eyebrow chip (3712:1942)
 *   heading  — two-line gradient title (2903:2166)
 *   subtitle — (2903:2171)
 *   image    — hardware blueprint diagram (3529:617)
 *   caption  — "The Hardware Blueprint" (3529:622)
 *   stats    — 3 × shared.stat: icon + label (title) + description
 *              (3529:624 / 3529:634 / 3529:644; no numeric value in this UI)
 *
 * Mechanics mirror seed-strapi-pages-2.mjs:
 *   1. Uploads assets via POST /api/upload (SHA-1 dedupe, shared JSON cache).
 *   2. PUTs only the `architecture` key — all other sections stay untouched.
 *   3. Publishes with ?status=published.
 *
 * Requirements
 *   - Strapi v5 running (default http://localhost:1338, override STRAPI_URL).
 *   - STRAPI_TOKEN env var (Full access API token) — read from repo-root .env.
 *
 * Usage
 *   node scripts/seed-products-architecture.mjs            # upload + PUT
 *   node scripts/seed-products-architecture.mjs --dry-run  # print payload only
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
const CACHE_FILE = join(__dirname, ".strapi-upload-cache.json");

const DRY_RUN = process.argv.includes("--dry-run");

if (!STRAPI_TOKEN && !DRY_RUN) {
  console.error(
    "[fatal] STRAPI_TOKEN env var is required (create a Full access token in Strapi admin)."
  );
  process.exit(1);
}

const MIME = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

// ---------------------------------------------------------------------------
// Content — straight from Figma 3713:1965
// ---------------------------------------------------------------------------

const ARCHITECTURE = {
  label: "Architecture",
  heading: "Everything in one chip. \nNothing wasted.",
  subtitle:
    "A complete edge-AI SoC — AI engine, control, sensing, memory, and security — integrated so your board doesn't have to be.",
  image: { __media: "products/architecture.png" },
  alt: "GPX10 Pro hardware blueprint",
  caption: "The Hardware Blueprint",
  stats: [
    {
      label: "A-Cube compute",
      description:
        "10 MX8 cores, 2,560 MACs/cycle, replaces a separate AI accelerator.",
      stat_icon: { __media: "products/arch-stat-icon.svg" },
    },
    {
      label: "Two power domains",
      description: "A 5-core island sips microwatts; the rest powers down.",
      stat_icon: { __media: "products/arch-stat-icon.svg" },
    },
    {
      label: "Integrated sensing",
      description:
        "Up to 10 sensor streams fused on-chip; no external sensor hub.",
      stat_icon: { __media: "products/arch-stat-icon.svg" },
    },
  ],
};

// ---------------------------------------------------------------------------
// Helpers (mirrors seed-strapi-pages-2.mjs — kept duplicated intentionally
// so each script is independently runnable)
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

  const res = await strapiFetch("/api/upload", {
    method: "POST",
    body: form,
  });

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
    const txt = await readFile(CACHE_FILE, "utf8");
    return JSON.parse(txt);
  } catch {
    return {};
  }
}
async function saveCache(cache) {
  await writeFile(CACHE_FILE, JSON.stringify(cache, null, 2), "utf8");
}

async function resolveAsset(relPath, ctx) {
  if (!relPath) return null;
  const abs = join(PUBLIC_DIR, relPath);
  if (!existsSync(abs)) {
    console.warn(`  [warn] asset not found, skipping: ${relPath}`);
    return null;
  }

  const hash = await sha1OfFile(abs);
  if (ctx.cache[hash]) {
    ctx.cacheHits += 1;
    return ctx.cache[hash].id;
  }

  console.log(`  [upload] ${relPath}`);
  const file = await uploadFile(abs);
  ctx.cache[hash] = {
    id: file.id,
    documentId: file.documentId,
    url: file.url,
    name: file.name,
    sourcePath: relPath,
  };
  await saveCache(ctx.cache);
  await delay(20);
  return file.id;
}

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
    for (const [k, v] of Object.entries(node)) {
      out[k] = await hydrate(v, ctx);
    }
    return out;
  }
  return node;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log(`Strapi: ${STRAPI_URL}`);
  const ctx = { cache: await loadCache(), cacheHits: 0 };

  const architecture = await hydrate(ARCHITECTURE, ctx);
  const payload = { data: { architecture } };

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
  console.log("  [put] architecture updated (draft)");

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
    console.log("  [put] architecture published");
  }

  // Verify: read back the populated component.
  const check = await strapiFetch(
    "/api/products-page?populate[architecture][populate][image]=true&populate[architecture][populate][stats][populate]=*"
  );
  if (check.ok) {
    const a = check.body?.data?.architecture;
    console.log("  [verify] label:", a?.label);
    console.log("  [verify] heading:", JSON.stringify(a?.heading));
    console.log("  [verify] caption:", a?.caption);
    console.log("  [verify] image:", a?.image?.url ?? "(none)");
    console.log(
      "  [verify] stats:",
      (a?.stats ?? []).map((s) => s.label).join(" | ")
    );
  }
  console.log("done.");
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
