/**
 * patch-careers-page.mjs
 * ---------------------------------------------------------------------------
 * Surgical patcher for the careers-page single type.
 *
 * Background
 *   The canonical seed (seed-strapi-pages-2.mjs) is stale — it still writes
 *   a removed `title_frame` field and aborts the PUT with a ValidationError.
 *   An earlier media-seed attempt accidentally wiped hero.background_image,
 *   dna.panels, and bottom_cta.buttons while trying to populate icon fields.
 *   This script restores all of those without depending on the broken
 *   canonical seed.
 *
 * What it restores
 *   - hero.background_image            (file id resolved from cache)
 *   - best_work.cards[*].icon          (3 icons)
 *   - benefits.cards[*].icon           (6 icons)
 *   - dna.chip_object                  (desktop chip render)
 *   - dna.mobile_chip_object           (mobile chip render)
 *   - dna.panels                       (5 text rows — canonical content)
 *   - bottom_cta.buttons               (2 buttons — canonical content)
 *
 * Strategy
 *   1. Deep-GET current published payload so all OTHER fields (text, panels
 *      that survived, hero text, bottom_cta heading, etc.) come back
 *      populated and round-trip untouched.
 *   2. Normalize: strip Strapi meta keys + convert media objects → ids.
 *   3. Overlay the missing/known-canonical pieces listed above.
 *   4. PUT draft + published.
 */

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, normalize as pathNormalize } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = pathNormalize(join(__dirname, ".."));
const PUBLIC_DIR = join(REPO_ROOT, "public");

try { process.loadEnvFile(join(REPO_ROOT, ".env")); } catch {}

const STRAPI_URL = (process.env.STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";
const CACHE_FILE = join(__dirname, ".strapi-upload-cache.json");

if (!STRAPI_TOKEN) {
  console.error("[fatal] STRAPI_TOKEN env var is required.");
  process.exit(1);
}

// --- helpers --------------------------------------------------------------
async function sha1(p) {
  const b = await readFile(p);
  return createHash("sha1").update(b).digest("hex");
}

async function sf(path, init = {}) {
  const u = path.startsWith("http") ? path : `${STRAPI_URL}${path}`;
  const h = { Authorization: `Bearer ${STRAPI_TOKEN}`, ...(init.headers || {}) };
  const r = await fetch(u, { ...init, headers: h });
  const t = await r.text();
  let b = null;
  try { b = t ? JSON.parse(t) : null; } catch { b = t; }
  return { ok: r.ok, status: r.status, body: b };
}

async function loadCache() {
  try { return JSON.parse(await readFile(CACHE_FILE, "utf8")); }
  catch { return {}; }
}

async function resolve(rel, c) {
  const abs = join(PUBLIC_DIR, rel);
  if (!existsSync(abs)) throw new Error(`missing: ${rel}`);
  const h = await sha1(abs);
  if (!c[h]) throw new Error(`no cache entry for ${rel} — run canonical seed first`);
  return c[h].id;
}

function isMediaObject(node) {
  return (
    node &&
    typeof node === "object" &&
    typeof node.id === "number" &&
    typeof node.url === "string" &&
    (typeof node.mime === "string" || typeof node.ext === "string")
  );
}

const META_KEYS = new Set([
  "id", "documentId", "createdAt", "updatedAt", "publishedAt",
  "createdBy", "updatedBy",
]);

function normalize(node) {
  if (Array.isArray(node)) return node.map(normalize);
  if (node && typeof node === "object") {
    if (isMediaObject(node)) return node.id;
    const out = {};
    for (const [k, v] of Object.entries(node)) {
      if (META_KEYS.has(k)) continue;
      out[k] = normalize(v);
    }
    return out;
  }
  return node;
}

// --- canonical content (mirrors seed-strapi-pages-2.mjs) ------------------
const DNA_PANELS = [
  {
    title: "Grounded in Science",
    description: "You work from first principles. Every decision you make is expected to be backed by data, validation, and a clear understanding of the underlying system.",
  },
  {
    title: "Stay Curious. Stay Skeptical.",
    description: "You are encouraged to question, challenge, and refine. Strong thinking, clear reasoning, and continuous learning are expected at every stage of the work.",
  },
  {
    title: "Chase the Impossible",
    description: "You take on problems that don't have predefined solutions. The expectation is not iteration, but pushing beyond accepted limits and building what doesn't yet exist.",
  },
  {
    title: "Build for Everyone",
    description: "Your work is not isolated. You build systems that must scale across real-world environments, constraints, and users, making advanced technology practical and usable.",
  },
  {
    title: "Protect What Powers Us",
    description: "You design with power as a constraint from day one. Efficiency is not an afterthought, it is a core part of how you think, build, and optimize systems.",
  },
];

const BOTTOM_CTA_BUTTONS = [
  { label: "APPLY NOW", href: "#", variant: "primary" },
  { label: "REFER A CANDIDATE", href: "#", variant: "secondary" },
];

const ASSET_RELS = {
  hero_bg: "careers/hero-bg.png",
  best_work_impact: "careers/icon-impact.svg",
  best_work_depth: "careers/icon-depth.svg",
  best_work_cocreation: "careers/icon-cocreation.svg",
  benefits_health: "careers/icon-health.svg",
  benefits_compensation: "careers/icon-compensation.svg",
  benefits_equipment: "careers/icon-equipment.svg",
  benefits_office: "careers/icon-office.svg",
  benefits_learning: "careers/icon-learning.svg",
  benefits_pto: "careers/icon-pto.svg",
  dna_chip_object: "careers/chip-object.png",
  dna_mobile_chip_object: "mobile/career/Chip Image.png",
};

async function main() {
  console.log(`Strapi : ${STRAPI_URL}`);
  console.log(`Token  : ****${STRAPI_TOKEN.slice(-4)}\n`);

  const cache = await loadCache();

  // 1) Resolve all asset ids from cache.
  console.log("[1/3] Resolving asset ids:");
  const ids = {};
  for (const [key, rel] of Object.entries(ASSET_RELS)) {
    try {
      ids[key] = await resolve(rel, cache);
      console.log(`        ${key} → ${ids[key]}`);
    } catch (e) {
      console.error(`        [fail] ${key}: ${e.message}`);
      process.exit(1);
    }
  }

  // 2) Deep-GET current published careers-page.
  console.log("\n[2/3] GET current careers-page:");
  const parts = [
    `status=published`,
    `populate[hero][populate]=*`,
    `populate[best_work][populate][cards][populate]=*`,
    `populate[dna][populate][chip_object]=true`,
    `populate[dna][populate][mobile_chip_object]=true`,
    `populate[dna][populate][panels][populate]=*`,
    `populate[benefits][populate][cards][populate]=*`,
    `populate[open_roles][populate]=*`,
    `populate[bottom_cta][populate][buttons][populate]=*`,
  ];
  const getRes = await sf(`/api/careers-page?${parts.join("&")}`);
  if (!getRes.ok) {
    console.error(`  [fail] GET (${getRes.status}): ${JSON.stringify(getRes.body).slice(0, 400)}`);
    process.exit(1);
  }
  const page = getRes.body?.data;
  if (!page) {
    console.error("  [fail] no published data");
    process.exit(1);
  }
  console.log("  [ok] fetched");

  // Normalize: strip meta + convert media → ids.
  const payload = normalize(page);

  // 3) Overlay missing fields with canonical content + resolved ids.
  console.log("\n[3/3] Overlaying fields + PUT:");
  payload.hero.background_image = ids.hero_bg;

  if (Array.isArray(payload.best_work?.cards)) {
    const iconIds = [ids.best_work_impact, ids.best_work_depth, ids.best_work_cocreation];
    payload.best_work.cards.forEach((c, i) => { if (i < iconIds.length) c.icon = iconIds[i]; });
  }
  if (Array.isArray(payload.benefits?.cards)) {
    const iconIds = [
      ids.benefits_health, ids.benefits_compensation, ids.benefits_equipment,
      ids.benefits_office, ids.benefits_learning, ids.benefits_pto,
    ];
    payload.benefits.cards.forEach((c, i) => { if (i < iconIds.length) c.icon = iconIds[i]; });
  }

  if (payload.dna) {
    payload.dna.chip_object = ids.dna_chip_object;
    payload.dna.mobile_chip_object = ids.dna_mobile_chip_object;
    // Restore panels (canonical content) — only if currently empty or short.
    if (!Array.isArray(payload.dna.panels) || payload.dna.panels.length < DNA_PANELS.length) {
      payload.dna.panels = DNA_PANELS;
    }
  }

  if (payload.bottom_cta) {
    if (!Array.isArray(payload.bottom_cta.buttons) || payload.bottom_cta.buttons.length === 0) {
      payload.bottom_cta.buttons = BOTTOM_CTA_BUTTONS;
    }
  }

  // 4) PUT draft + published.
  for (const draft of [false, true]) {
    const path = `/api/careers-page${draft ? "?status=published" : ""}`;
    console.log(`  PUT ${path}`);
    const r = await sf(path, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: payload }),
    });
    if (!r.ok) {
      console.error(`  [fail] PUT (${r.status}): ${JSON.stringify(r.body).slice(0, 600)}`);
      process.exit(1);
    }
    console.log(`        [ok] ${draft ? "published" : "draft"}`);
  }

  console.log("\nDone. (Strapi v5 publishes asynchronously — wait ~5s before verifying.)");
}

main().catch((e) => { console.error(e.message); process.exit(1); });
