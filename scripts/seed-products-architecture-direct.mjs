/**
 * seed-products-architecture-direct.mjs
 * ----------------------------------------------------------------------------
 * Direct-runtime variant of seed-products-architecture.mjs.
 *
 * Use this when the STRAPI_TOKEN in .env is expired/invalid (the REST seed
 * returns 401). Instead of going through the HTTP API, it loads the Strapi
 * app programmatically (same cms/ directory, same Postgres database) and
 * writes through the document service + upload service — no API token
 * required.
 *
 * Seeds the `architecture` component of the `products-page` single type with
 * the redesigned "Everything in one chip. Nothing wasted." section content
 * (Figma 3713:1965). Only the `architecture` key is written; every other
 * section of the page is left untouched.
 *
 * Safe to run while `strapi develop` is running (Postgres handles the second
 * connection; uploads are SHA-1 deduped against the shared cache).
 *
 * Usage
 *   node scripts/seed-products-architecture-direct.mjs            # seed
 *   node scripts/seed-products-architecture-direct.mjs --dry-run  # payload only
 * ----------------------------------------------------------------------------
 */

import { createRequire } from "node:module";
import { createHash } from "node:crypto";
import { existsSync, statSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { basename, extname, join, normalize, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = normalize(join(__dirname, ".."));
const CMS_DIR = join(REPO_ROOT, "cms");
const PUBLIC_DIR = join(REPO_ROOT, "public");
const CACHE_FILE = join(__dirname, ".strapi-upload-cache.json");

const DRY_RUN = process.argv.includes("--dry-run");

const MIME = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

// ---------------------------------------------------------------------------
// Content — straight from Figma 3713:1965 (same as the REST variant)
// ---------------------------------------------------------------------------

const ARCHITECTURE = {
  label: "Architecture",
  heading: "Everything in one chip. \nNothing wasted.",
  subtitle:
    "A complete edge-AI SoC — AI engine, control, sensing, memory, and security — integrated so your board doesn't have to be.",
  image: { __media: "products/architecture.png", __alt: "GPX10 Pro hardware blueprint" },
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
// Helpers
// ---------------------------------------------------------------------------

async function sha1OfFile(absolutePath) {
  const buf = await readFile(absolutePath);
  return createHash("sha1").update(buf).digest("hex");
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

/** Upload via the upload plugin service, with SHA-1 dedupe against the
 *  shared cache. Cached ids are re-validated against the database. */
async function resolveAsset(strapi, relPath, ctx, { alt = null } = {}) {
  if (!relPath) return null;
  const abs = join(PUBLIC_DIR, relPath);
  if (!existsSync(abs)) {
    console.warn(`  [warn] asset not found, skipping: ${relPath}`);
    return null;
  }

  const hash = await sha1OfFile(abs);
  if (ctx.cache[hash]) {
    const cached = ctx.cache[hash];
    const exists = await strapi.db
      .query("plugin::upload.file")
      .findOne({ where: { id: cached.id } });
    if (exists) {
      ctx.cacheHits += 1;
      return cached.id;
    }
    console.warn(`  [warn] cached id ${cached.id} no longer in DB, re-uploading`);
    delete ctx.cache[hash];
  }

  console.log(`  [upload] ${relPath}`);
  const name = basename(abs);
  const mime = MIME[extname(abs).toLowerCase()] || "application/octet-stream";
  const uploaded = await strapi
    .plugin("upload")
    .service("upload")
    .upload({
      data: { fileInfo: { name, alternativeText: alt ?? name } },
      files: {
        filepath: abs,
        originalFilename: name,
        mimetype: mime,
        size: statSync(abs).size,
      },
    });
  const file = Array.isArray(uploaded) ? uploaded[0] : uploaded;
  if (!file?.id) throw new Error(`Upload returned no file for ${relPath}`);

  ctx.cache[hash] = {
    id: file.id,
    documentId: file.documentId,
    url: file.url,
    name: file.name,
    sourcePath: relPath,
  };
  await saveCache(ctx.cache);
  return file.id;
}

async function hydrate(strapi, node, ctx) {
  if (node == null) return node;
  if (Array.isArray(node)) {
    const out = [];
    for (const v of node) {
      const r = await hydrate(strapi, v, ctx);
      if (r !== null) out.push(r);
    }
    return out;
  }
  if (typeof node === "object") {
    if (Object.prototype.hasOwnProperty.call(node, "__media")) {
      return await resolveAsset(strapi, node.__media, ctx, { alt: node.__alt });
    }
    const out = {};
    for (const [k, v] of Object.entries(node)) {
      if (k === "__alt") continue;
      out[k] = await hydrate(strapi, v, ctx);
    }
    return out;
  }
  return node;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  if (DRY_RUN) {
    console.log("[dry-run] architecture payload (media paths unresolved):");
    console.log(JSON.stringify(ARCHITECTURE, null, 2));
    return;
  }

  const require = createRequire(join(CMS_DIR, "package.json"));
  const { createStrapi } = require("@strapi/strapi");

  // The `strapi develop` CLI loads cms/.env for us; a programmatic load does
  // not — pull it in so DATABASE_URL / credentials resolve.
  try {
    process.loadEnvFile(join(CMS_DIR, ".env"));
  } catch {
    // no cms/.env — rely on shell env
  }
  process.env.NODE_ENV ??= "development";

  console.log("Loading Strapi runtime (appDir: cms/) ...");
  const strapi = await createStrapi({
    appDir: CMS_DIR,
    distDir: join(CMS_DIR, "dist"),
  }).load();

  try {
    const ctx = { cache: await loadCache(), cacheHits: 0 };
    const architecture = await hydrate(strapi, ARCHITECTURE, ctx);

    const docService = strapi.documents("api::products-page.products-page");
    const existing = await docService.findFirst({});
    if (!existing) {
      throw new Error("products-page single type has no document — seed the page first.");
    }

    await docService.update({
      documentId: existing.documentId,
      data: { architecture },
    });
    console.log("  [update] architecture written (draft)");

    await docService.publish({ documentId: existing.documentId });
    console.log("  [publish] architecture published");

    // Verify: read back with populated media.
    const check = await docService.findFirst({
      status: "published",
      populate: { architecture: { populate: { image: true, stats: { populate: "*" } } } },
    });
    const a = check?.architecture;
    console.log("  [verify] label:", a?.label);
    console.log("  [verify] heading:", JSON.stringify(a?.heading));
    console.log("  [verify] caption:", a?.caption);
    console.log("  [verify] image:", a?.image?.url ?? "(none)");
    console.log(
      "  [verify] stats:",
      (a?.stats ?? []).map((s) => s.label).join(" | ")
    );
    console.log(`done. (${ctx.cacheHits} cached asset(s) reused)`);
  } finally {
    await strapi.destroy();
  }
}

main().catch((err) => {
  console.error(err?.message ?? err);
  process.exit(1);
});
