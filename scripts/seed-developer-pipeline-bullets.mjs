/**
 * seed-developer-pipeline-bullets.mjs
 * ----------------------------------------------------------------------------
 * Seeds ONLY the `developer-page` → pipeline section with the accordion
 * content (tab subtitles + feature bullets), per Figma 4819:5310.
 *
 * IMPORTANT: requires the new component schemas (one-time, already on disk):
 *   - cms/src/components/developer/pipeline-bullet.json (title, description)
 *   - cms/src/components/developer/pipeline-tab.json (+ subtitle, bullets)
 * Restart `strapi develop` once so cms/dist is regenerated before running.
 *
 * Tabs are a repeatable component — the payload replaces the whole array, so
 * label / flow_image / logo are re-sent (media is SHA-1 deduped via the
 * shared upload cache; nothing is re-uploaded if unchanged).
 *
 * Usage
 *   node scripts/seed-developer-pipeline-bullets.mjs            # seed
 *   node scripts/seed-developer-pipeline-bullets.mjs --dry-run  # payload only
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

const media = (relPath) => ({ __media: relPath });

// ---------------------------------------------------------------------------
// Content — mirrors the static fallbacks in
// src/components/developer/DeveloperPipeline.tsx (Figma 4577:11008 / 4819:5310)
// ---------------------------------------------------------------------------

const PIPELINE = {
  heading: "The ModelForge Pipeline",
  tag: { text: "Real-time AI at edge" },
  tabs: [
    {
      label: "Train",
      subtitle: "Data Ingestion & Quantization",
      flow_image: media("developer/train-flow-1.png"),
      logo: media("developer/pipeline-logo-1.png"),
      bullets: [
        {
          title: "Native TFLite & BYOM",
          description:
            "Bring your existing model. ModelForge handles conversion, quantization, and A-Cube mapping.",
        },
        {
          title: "Direct Sensor Capture",
          description:
            "Capture real sensor data directly from the DVK and move faster from raw signals to trained models.",
        },
      ],
    },
    {
      label: "Optimize",
      subtitle: "Hardware-Aware Validation",
      flow_image: media("developer/train-flow-2.png"),
      logo: media("developer/pipeline-logo-2.png"),
      bullets: [
        {
          title: "Compatibility Checking",
          description:
            "Know what works before you build. ModelForge flags unsupported ops and guides the fallback path.",
        },
        {
          title: "Pre-Deployment Profiling",
          description:
            "See memory, latency, and power upfront, before the model ever reaches silicon.",
        },
      ],
    },
    {
      label: "Integrate",
      subtitle: "Embedded Application Assembly",
      flow_image: media("developer/train-flow-3.png"),
      logo: media("developer/pipeline-logo-3.png"),
      bullets: [
        {
          title: "The SDK Arsenal",
          description:
            "Use pre-built APIs, drivers, and BSPs to handle the embedded work without starting from scratch.",
        },
        {
          title: "90% Portability",
          description:
            "Bring your C code with you. Most existing ARM logic ports directly into the GPX workflow.",
        },
      ],
    },
    {
      label: "Deploy",
      subtitle: "The Unified Build",
      flow_image: media("developer/train-flow-4.png"),
      logo: media("developer/pipeline-logo-1.png"),
      bullets: [
        {
          title: "Seamless Integration",
          description:
            "Your AI model becomes a simple C-callable object. Drop it into the workflow and build.",
        },
        {
          title: "One-Click Eclipse Execution",
          description:
            "One Eclipse build. ModelForge handles the ARM-to-AI-core mapping behind the scenes.",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Helpers (same mechanics as seed-developer-page-direct.mjs)
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
    console.log("[dry-run] developer-page pipeline payload (media paths unresolved):");
    console.log(JSON.stringify(PIPELINE, null, 2));
    return;
  }

  const require = createRequire(join(CMS_DIR, "package.json"));
  const { createStrapi } = require("@strapi/strapi");

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
    const payload = await hydrate(strapi, PIPELINE, ctx);

    const docService = strapi.documents("api::developer-page.developer-page");
    const existing = await docService.findFirst({});
    if (!existing) {
      throw new Error("developer-page single-type has no document — seed the page first.");
    }

    await docService.update({
      documentId: existing.documentId,
      data: { pipeline: payload },
    });
    console.log("  [update] developer-page.pipeline written (draft)");

    await docService.publish({ documentId: existing.documentId });
    console.log("  [publish] developer-page published");

    const check = await docService.findFirst({
      status: "published",
      populate: { pipeline: { populate: { tag: true, tabs: { populate: "*" } } } },
    });
    for (const tab of check?.pipeline?.tabs ?? []) {
      console.log(
        `  [verify] ${tab.label} — subtitle: ${tab.subtitle ?? "MISSING"} | bullets: ${
          (tab.bullets ?? []).map((b) => b.title).join(" / ") || "NONE"
        }${tab.flow_image ? " | [img]" : " | [NO IMG]"}`
      );
    }
    console.log(`done. (${ctx.cacheHits} cached asset(s) reused)`);
  } finally {
    await strapi.destroy();
  }
}

main().catch((err) => {
  console.error(err?.message ?? err);
  process.exit(1);
});
