/**
 * seed-articles.mjs
 * ----------------------------------------------------------------------------
 * Seeds the Strapi v5 `article` collection with the Resources page article
 * content (the data previously hardcoded in
 * `src/components/resources/resources-data.ts`), so the Resources "Content"
 * section renders entirely from CMS data instead of the static fallback.
 *
 * Mechanics (mirrors scripts/seed-strapi-pages-*.mjs):
 *   1. Uploads the 6 article overlay images to the Strapi Media Library via
 *      POST /api/upload (SHA-1 dedupe against the shared upload cache so
 *      re-runs don't re-upload).
 *   2. Deletes every existing article (clean slate — this is seed data).
 *   3. Creates each article (POST /api/articles) with title/slug/type/category/
 *      excerpt/date/display_order/featured_image, then publishes it
 *      (PUT /api/articles/:documentId?status=published).
 *
 * Usage
 *   node scripts/seed-articles.mjs            # seed all 12 articles
 *   node scripts/seed-articles.mjs --dry-run  # resolve uploads, no writes
 *   node scripts/seed-articles.mjs --keep     # don't delete existing articles
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
  /* env already set in shell, or no .env — continue. */
}

const STRAPI_URL = (process.env.STRAPI_URL || "http://localhost:1338").replace(
  /\/$/,
  ""
);
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";
const CACHE_FILE = join(__dirname, ".strapi-upload-cache.json");

const argv = new Set(process.argv.slice(2));
const DRY_RUN = argv.has("--dry-run");
const KEEP_EXISTING = argv.has("--keep");

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

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function sha1OfFile(absolutePath) {
  const buf = await readFile(absolutePath);
  return createHash("sha1").update(buf).digest("hex");
}

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

/** Upload a file (SHA-1 deduped against the shared cache). Returns Strapi file id. */
async function resolveAsset(relPath, cache, stats) {
  const abs = join(PUBLIC_DIR, relPath);
  if (!existsSync(abs)) {
    console.warn(`  [warn] asset not found, skipping: ${relPath}`);
    return null;
  }
  const hash = await sha1OfFile(abs);
  if (cache[hash]) {
    stats.cacheHits += 1;
    return cache[hash].id;
  }
  if (DRY_RUN) {
    console.log(`  [dry-run] would upload ${relPath}`);
    return null;
  }
  console.log(`  [upload] ${relPath}`);
  const buffer = await readFile(abs);
  const ext = extname(abs).toLowerCase();
  const mime = MIME[ext] || "application/octet-stream";
  const form = new FormData();
  form.append("files", new Blob([buffer], { type: mime }), basename(abs));
  const res = await strapiFetch("/api/upload", { method: "POST", body: form });
  if (!res.ok) {
    throw new Error(
      `Upload failed for ${relPath} (${res.status}): ${JSON.stringify(res.body)}`
    );
  }
  const arr = Array.isArray(res.body) ? res.body : [res.body];
  const file = arr[0];
  cache[hash] = {
    id: file.id,
    documentId: file.documentId,
    url: file.url,
    name: file.name,
    sourcePath: relPath,
  };
  stats.uploads += 1;
  await saveCache(cache);
  await delay(20);
  return file.id;
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ---------------------------------------------------------------------------
// SEED DATA — derived from the previous static fallback list. Each entry maps
// onto the `article` collection schema (title/slug/type/category/excerpt/date/
// display_order). featured_image is wired to one of the 6 overlay images by
// (index % 6), matching the prior fallback composition.
// ---------------------------------------------------------------------------
const ARTICLES = [
  {
    title: "GP Singh interviewed by SemiWiki founder Daniel Nenni",
    category: "podcast",
    excerpt:
      "Our CEO discusses Ambient Scientific's ultra low power edge AI, the DigAn architecture, and what programmable analog compute means for battery-powered devices.",
  },
  {
    title: "Beyond the Bit Episode 02: The Truth About India's Chip Industry",
    category: "product_update",
    excerpt:
      "Episode 02 of Beyond the Bit is now live, featuring Saharsh Singhania and a candid look at the realities of building silicon in India.",
  },
  {
    title: "PyTorch vs TensorFlow for Production and Edge AI Deployment",
    category: "product_update",
    excerpt:
      "This article compares PyTorch and TensorFlow from a real-world deployment perspective, including tooling, inference, and edge AI workflows.",
  },
  {
    title: "Breaking the Von Neumann Bottleneck: Coin Cell AI at the Edge",
    category: "event",
    excerpt:
      "In this session, Ambient Scientific explores a new approach to edge AI by attacking the memory bottleneck that limits conventional architectures.",
  },
  {
    title: "Ambient Scientific and Dimension NXG Introduce MAI",
    category: "press_release",
    excerpt:
      "Ambient Scientific, in collaboration with Dimension NXG, introduces MAI — a modular AI platform built on the GPX architecture.",
  },
  {
    title: "Boot Blink and Believe: Edge AI from Prototype to Production",
    category: "webinar",
    excerpt:
      "The recording of our webinar Boot Blink and Believe — Edge AI from Prototype to Production — is now available to stream.",
  },
  {
    title: "Deploying Always-On Voice at Microwatt Power Budgets",
    category: "case_study",
    excerpt:
      "How teams are shipping voice-first edge products with GPX silicon and Ambient tooling while staying within microwatt power budgets.",
  },
  {
    title: "Designing Sensor Fusion Pipelines for Battery-Powered Devices",
    category: "blog",
    excerpt:
      "A practical walkthrough of fusing vision, audio, and IMU signals on constrained edge hardware without draining the battery.",
  },
  {
    title: "Inside Ambient ModelForge: From Training to On-Device Inference",
    category: "video",
    excerpt:
      "See how ModelForge compresses and deploys models tuned for Ambient GPX processors, from training to on-device inference.",
  },
  {
    title: "Ambient Scientific Expands Developer Ecosystem Partnerships",
    category: "press_release",
    excerpt:
      "New collaborations bring reference designs, dev kits, and production support to edge AI builders working with the Ambient platform.",
  },
  {
    title: "Scaling Edge AI from Prototype to Millions of Units",
    category: "webinar",
    excerpt:
      "Engineering leaders share lessons on power, cost, and software continuity across product lines scaling from prototype to volume.",
  },
  {
    title: "The Future of Programmable AI Silicon at the Edge",
    category: "podcast",
    excerpt:
      "Ambient executives discuss programmable compute density and the roadmap for GPX platforms in next-generation edge products.",
  },
];

const OVERLAY_IMAGES = Array.from({ length: 6 }, (_, i) => `resources/article-${i + 1}-overlay.png`);

// Dates descend so sort by display_order (then date desc) is stable.
const BASE_DATE = new Date("2026-07-11T00:00:00Z");
function dateFor(index) {
  const d = new Date(BASE_DATE.getTime() - index * 3 * 24 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 10);
}

async function deleteAllArticles() {
  let deleted = 0;
  let page = 1;
  while (true) {
    const res = await strapiFetch(
      `/api/articles?pagination[pageSize]=100&pagination[page]=${page}`
    );
    if (!res.ok) throw new Error(`GET articles failed (${res.status})`);
    const rows = res.body.data || [];
    if (!rows.length) break;
    for (const row of rows) {
      const dr = await strapiFetch(`/api/articles/${row.documentId}`, {
        method: "DELETE",
      });
      if (dr.ok) deleted += 1;
      else console.warn(`  [warn] delete failed for ${row.documentId}: ${dr.status}`);
      await delay(15);
    }
    const total = res.body.meta?.pagination?.pageCount || 1;
    if (page >= total) break;
    page += 1;
  }
  return deleted;
}

async function createArticle(article, featuredImageId) {
  const type = article.category === "press_release" ? "news" : "resource";
  const payload = {
    data: {
      title: article.title,
      slug: slugify(article.title),
      type,
      category: article.category,
      excerpt: article.excerpt,
      date: dateFor(article.index),
      display_order: article.index,
      external_url: "",
      is_featured: false,
      show_on_homepage: false,
      ...(featuredImageId ? { featured_image: featuredImageId } : {}),
    },
  };

  const created = await strapiFetch("/api/articles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!created.ok) {
    throw new Error(
      `CREATE failed for "${article.title}" (${created.status}): ${JSON.stringify(created.body)}`
    );
  }
  const documentId = created.body?.data?.documentId;
  if (!documentId) {
    throw new Error(`CREATE ok but no documentId for "${article.title}"`);
  }

  // Publish (draftAndPublish is on for this collection).
  const pub = await strapiFetch(`/api/articles/${documentId}?status=published`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!pub.ok) {
    console.warn(
      `  [warn] publish returned ${pub.status} for "${article.title}": ${JSON.stringify(pub.body)}`
    );
  }
  return documentId;
}

async function main() {
  console.log(`Strapi: ${STRAPI_URL}  | dry-run: ${DRY_RUN}`);
  const cache = await loadCache();
  const stats = { uploads: 0, cacheHits: 0, created: 0 };

  console.log("\n— Resolving article images —");
  const imageIds = [];
  for (const rel of OVERLAY_IMAGES) {
    const id = await resolveAsset(rel, cache, stats);
    imageIds.push(id);
  }
  await saveCache(cache);

  if (!KEEP_EXISTING) {
    console.log("\n— Clearing existing articles —");
    if (DRY_RUN) {
      console.log("  [dry-run] skipping delete");
    } else {
      const deleted = await deleteAllArticles();
      console.log(`  deleted ${deleted} existing article(s)`);
    }
  }

  console.log("\n— Creating articles —");
  for (let i = 0; i < ARTICLES.length; i++) {
    const article = { ...ARTICLES[i], index: i };
    const imgId = imageIds[i % imageIds.length];
    if (DRY_RUN) {
      console.log(`  [dry-run] would create #${i} [${article.category}] "${article.title}"`);
      continue;
    }
    try {
      const docId = await createArticle(article, imgId);
      stats.created += 1;
      console.log(`  created #${i} [${article.category}] ${docId}  "${article.title}"`);
    } catch (err) {
      console.error(`  ${err.message}`);
    }
  }

  console.log(
    `\nDone. uploads=${stats.uploads} cacheHits=${stats.cacheHits} created=${stats.created}`
  );
}

main().catch((err) => {
  console.error("[fatal]", err);
  process.exit(1);
});
