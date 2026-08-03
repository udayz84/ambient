/**
 * seed-contact-careers-media.mjs
 * ---------------------------------------------------------------------------
 * Targeted media seed for the contact-page and careers-page single types.
 *
 * Background
 *   An earlier refactor made every Strapi-backed field fully dynamic. Most
 *   media was already uploaded, but a handful of nested-component media
 *   fields were never seeded (and one buggy re-seed wiped a few icon arrays).
 *   This script restores ALL of them deterministically.
 *
 * What it touches
 *   contact-page:
 *     - map.locations[*].indicator_icon      (US / SG / IN map pins)
 *     - schedule.cards[*].image              (FAE + Commercial photos)
 *     - form.tracks[*].icon                  (sales / developer / media)
 *     - form.tracks[*].form                  (7 field rows per track — restored
 *                                              from seed-strapi-pages.mjs
 *                                              because a prior PUT wiped them)
 *
 *   careers-page:
 *     - best_work.cards[*].icon              (impact / depth / cocreation)
 *     - benefits.cards[*].icon               (6 benefit icons)
 *     - dna.chip_object                      (desktop chip render)
 *     - dna.mobile_chip_object               (mobile chip render)
 *
 * Strategy
 *   Strapi v5 PUT replaces the whole single type. Merging media into a
 *   previously-fetched payload is fragile because Strapi's populate=*
 *   wildcard only goes one level deep — nested card media comes back null
 *   and PUTting null wipes it. To sidestep that, this script defines each
 *   affected component array FULLY (text + media refs) from known-good
 *   source-of-truth content (mirrors seed-strapi-pages*.mjs), GETs the rest
 *   of the page with shallow populate (text-only fields survive a shallow
 *   GET because they live at depth 0), then overlays the full component
 *   arrays before PUT.
 *
 *   1. Upload the missing local assets via POST /api/upload (SHA-1 dedupe
 *      against the shared .strapi-upload-cache.json).
 *   2. GET each page's current published payload (shallow populate — only
 *      the top-level + section text is needed; component arrays are rebuilt).
 *   3. Overlay the rebuilt component arrays at the right paths.
 *   4. PUT each single type twice — draft then ?status=published.
 *
 * Usage
 *   node scripts/seed-contact-careers-media.mjs
 *   node scripts/seed-contact-careers-media.mjs --dry-run
 *   node scripts/seed-contact-careers-media.mjs --skip-upload   # cache only
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

try { process.loadEnvFile(join(REPO_ROOT, ".env")); } catch {}

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

// --- tiny helpers ---------------------------------------------------------
async function sha1(p) {
  const b = await readFile(p);
  return createHash("sha1").update(b).digest("hex");
}
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function sf(path, init = {}) {
  const u = path.startsWith("http") ? path : `${STRAPI_URL}${path}`;
  const h = { Authorization: `Bearer ${STRAPI_TOKEN}`, ...(init.headers || {}) };
  const r = await fetch(u, { ...init, headers: h });
  const t = await r.text();
  let b = null;
  try { b = t ? JSON.parse(t) : null; } catch { b = t; }
  return { ok: r.ok, status: r.status, body: b };
}

async function upload(p) {
  const buf = await readFile(p);
  const ext = extname(p).toLowerCase();
  const mime = MIME[ext] || "application/octet-stream";
  const f = new FormData();
  f.append("files", new Blob([buf], { type: mime }), basename(p));
  const r = await sf("/api/upload", { method: "POST", body: f });
  if (!r.ok) throw new Error(`upload ${p} ${r.status}: ${JSON.stringify(r.body)}`);
  const a = Array.isArray(r.body) ? r.body : [r.body];
  return a[0];
}

async function loadCache() {
  try { return JSON.parse(await readFile(CACHE_FILE, "utf8")); }
  catch { return {}; }
}
async function saveCache(c) {
  await writeFile(CACHE_FILE, JSON.stringify(c, null, 2), "utf8");
}

// Resolve a /public-relative path to a Strapi file id (with cache + dedupe).
async function resolve(rel, c) {
  const abs = join(PUBLIC_DIR, rel);
  if (!existsSync(abs)) throw new Error(`missing: ${rel}`);
  const h = await sha1(abs);
  if (c[h]) return c[h].id;
  if (SKIP_UPLOAD) throw new Error(`no cache for ${rel}`);
  console.log(`  [upload] ${rel}`);
  const f = await upload(abs);
  c[h] = { id: f.id, documentId: f.documentId, url: f.url, name: f.name, sourcePath: rel };
  await saveCache(c);
  await delay(20);
  return f.id;
}

// --- asset manifest (relative to /public) ---------------------------------
const ASSETS = {
  contact_location_us: "contact/map-indicator-us.svg",
  contact_location_sg: "contact/map-indicator-sg.svg",
  contact_location_in: "contact/map-indicator-in.svg",
  contact_schedule_fae: "contact/schedule-fae.png",
  contact_schedule_commercial: "contact/schedule-commercial.png",
  contact_track_sales: "contact/track-sales.svg",
  contact_track_developer: "contact/track-developer.svg",
  contact_track_media: "contact/track-media.svg",
  careers_dna_chip_object: "careers/chip-object.png",
  careers_dna_mobile_chip_object: "mobile/career/Chip Image.png",
  careers_best_work_icon_impact: "careers/icon-impact.svg",
  careers_best_work_icon_depth: "careers/icon-depth.svg",
  careers_best_work_icon_cocreation: "careers/icon-cocreation.svg",
  careers_benefits_icon_health: "careers/icon-health.svg",
  careers_benefits_icon_compensation: "careers/icon-compensation.svg",
  careers_benefits_icon_equipment: "careers/icon-equipment.svg",
  careers_benefits_icon_office: "careers/icon-office.svg",
  careers_benefits_icon_learning: "careers/icon-learning.svg",
  careers_benefits_icon_pto: "careers/icon-pto.svg",
};

// --- rebuilt component arrays (source of truth: seed-strapi-pages*.mjs) ---
// Each entry references a resolved Strapi file id via media("key").
function media(key) { return { __media: key }; }

const CONTACT_FORM_FIELDS = [
  { label: "First Name", placeholder: "Enter Your First Name", field_type: "text" },
  { label: "Last Name", placeholder: "Enter Your Last Name", field_type: "text" },
  { label: "Company Name", placeholder: "Enter Your Company Name", field_type: "text" },
  { label: "Job Title", placeholder: "Enter Your Job Title", field_type: "text" },
  { label: "Corporate Email", placeholder: "Enter Your Corporate Email", field_type: "email" },
  { label: "Phone Number", placeholder: "Enter Your Phone Number", field_type: "phone" },
  {
    label: "How can we help?",
    placeholder: "Describe your use case, technical requirements, or business needs...",
    field_type: "textarea",
  },
];

// Rebuilt nested arrays. These will REPLACE whatever is currently in Strapi
// for those paths — that's intentional: they're the source of truth.
const CONTACT_OVERLAYS = {
  map: {
    locations: [
      {
        title: "USA Headquarters",
        address: "Ambient Scientific Inc. 4633 Old Ironsides Drive Santa Clara California 95054. USA",
        indicator_icon: media("contact_location_us"),
      },
      {
        title: "Singapore Headquarters",
        address: "137 Telok Ayer Street, #05-02, Singapore 068602",
        indicator_icon: media("contact_location_sg"),
      },
      {
        title: "India Headquarters",
        address: "Ramky House, 1st Cross, Raghavendra Nagar, Kalyan Nagar, Bengaluru Karnataka, 560043, India",
        indicator_icon: media("contact_location_in"),
      },
    ],
  },
  schedule: {
    cards: [
      {
        tag: "Technical",
        title: "Talk to an FAE (Field Application Engineer)",
        description: "Book a 30-minute session with our engineers. Discuss power profiling, model quantization, or deployment architecture for your use case.",
        cta_label: "View FAE Calendar",
        cta_href: "https://calendly.com/ambientscientific/fae",
        image: media("contact_schedule_fae"),
      },
      {
        tag: "Commercial",
        title: "Commercial Scaling & Enterprise",
        description: "Connect with Business Development to discuss pricing, ASIC development, timelines, licensing, or supply partnerships.",
        cta_label: "View Commercial Calendar",
        cta_href: "https://calendly.com/ambientscientific/commercial",
        image: media("contact_schedule_commercial"),
      },
    ],
  },
  form: {
    tracks: [
      {
        label: "Sales & Enterprise",
        description: "Request a quote, discuss volume licensing, or inquire about custom ASIC development.",
        icon: media("contact_track_sales"),
        form: CONTACT_FORM_FIELDS,
      },
      {
        label: "Developer Support",
        description: "Report a bug, request documentation, or get help compiling your model via the Nebula SDK.",
        icon: media("contact_track_developer"),
        form: CONTACT_FORM_FIELDS,
      },
      {
        label: "Media & Press",
        description: "Request an interview with our leadership team, access press materials, or coordinate coverage.",
        icon: media("contact_track_media"),
        form: CONTACT_FORM_FIELDS,
      },
    ],
  },
};

const CAREERS_OVERLAYS = {
  best_work: {
    cards: [
      {
        icon: media("careers_best_work_icon_impact"),
        title: "Unprecedented Impact",
        description: "Ship silicon that rewrites the power-performance frontier. Your work enables AI capabilities that were physically impossible yesterday.",
      },
      {
        icon: media("careers_best_work_icon_depth"),
        title: "Pure Technology Depth",
        description: "Operate at the intersection of analog circuit design, machine learning architectures, and condensed matter physics. No abstraction layers.",
      },
      {
        icon: media("careers_best_work_icon_cocreation"),
        title: "Unconstrained Co-Creation",
        description: "Build alongside the researchers who invented AIMC. Direct access to founders, zero bureaucracy, full technical autonomy.",
      },
    ],
  },
  benefits: {
    cards: [
      {
        icon: media("careers_benefits_icon_health"),
        title: "Comprehensive Health Coverage",
        description: "Medical, dental, and vision insurance for you and your family. Mental health support included.",
      },
      {
        icon: media("careers_benefits_icon_compensation"),
        title: "Competitive Compensation",
        description: "Top-of-market salary and significant equity grants. Annual performance reviews with real upside.",
      },
      {
        icon: media("careers_benefits_icon_equipment"),
        title: "Equipment And Tools",
        description: "Latest MacBook Pro, external displays, and any specialized hardware or software you need.",
      },
      {
        icon: media("careers_benefits_icon_office"),
        title: "Office Perks",
        description: "Daily catered lunch, premium coffee setup, and fully stocked kitchen. Relocation assistance available.",
      },
      {
        icon: media("careers_benefits_icon_learning"),
        title: "Learning Budget",
        description: "$5,000 annual budget for conferences, courses, books, and professional development.",
      },
      {
        icon: media("careers_benefits_icon_pto"),
        title: "Unlimited PTO",
        description: "Take the time you need. We trust you to manage your work and recharge when necessary.",
      },
    ],
  },
  dna: {
    chip_object: media("careers_dna_chip_object"),
    mobile_chip_object: media("careers_dna_mobile_chip_object"),
  },
};

// --- shallow GET (text-only is enough; overlays rebuild nested arrays) ----
async function getCurrent(apiId) {
  // populate=* at top level gives us section text + the documentId-bound
  // nested arrays' TEXT (we won't trust their media — overlays replace it).
  const url = `/api/${apiId}?status=published&populate=*`;
  const r = await sf(url);
  if (!r.ok) throw new Error(`GET ${apiId} (${r.status}): ${JSON.stringify(r.body).slice(0, 300)}`);
  return r.body?.data || null;
}

// Recursively:
//   - resolve {__media:"key"} markers to file IDs
//   - convert any existing Strapi media object (depth-1 from populate=*) to
//     just its numeric id, so the PUT is accepted cleanly
//   - strip Strapi meta keys (id, documentId, timestamps) so nested
//     components don't trigger "not related to entity" errors
async function hydrate(node, ids) {
  if (Array.isArray(node)) {
    const out = [];
    for (const v of node) {
      const r = await hydrate(v, ids);
      if (r !== null) out.push(r);
    }
    return out;
  }
  if (node && typeof node === "object") {
    // {__media:"key"} → resolved file id from the upload step.
    if (Object.prototype.hasOwnProperty.call(node, "__media")) {
      const id = ids[node.__media];
      if (!id) throw new Error(`missing media id for ${node.__media}`);
      return id;
    }
    // Existing Strapi media object (came back populated from GET) → keep id.
    if (isMediaObject(node)) {
      return node.id;
    }
    const out = {};
    for (const [k, v] of Object.entries(node)) {
      if (META_KEYS.has(k)) continue;
      out[k] = await hydrate(v, ids);
    }
    return out;
  }
  return node;
}

// Detect a Strapi media object: has numeric `id` + `url` + `mime`/`ext`.
function isMediaObject(node) {
  return (
    node &&
    typeof node === "object" &&
    typeof node.id === "number" &&
    typeof node.url === "string" &&
    (typeof node.mime === "string" || typeof node.ext === "string")
  );
}

// Shallow-merge: start from fetched payload (stripped of meta + media), then
// overlay rebuilt arrays on top so they fully replace what Strapi had.
function mergeSection(fetched, overlays) {
  const out = { ...fetched };
  for (const [sectionKey, sectionOverlay] of Object.entries(overlays)) {
    if (fetched[sectionKey] == null) {
      // Section didn't exist; just take the overlay whole.
      out[sectionKey] = sectionOverlay;
      continue;
    }
    // Merge at field level — overlay fields win, but we keep any fetched
    // fields the overlay doesn't touch (e.g. schedule.heading stays).
    out[sectionKey] = { ...fetched[sectionKey], ...sectionOverlay };
  }
  return out;
}

const META_KEYS = new Set([
  "id", "documentId", "createdAt", "updatedAt", "publishedAt",
  "createdBy", "updatedBy",
]);

async function putPage(apiId, data) {
  const clean = await hydrate(data, {});
  for (const draft of [false, true]) {
    const path = `/api/${apiId}${draft ? "?status=published" : ""}`;
    console.log(`  PUT ${path}`);
    const r = await sf(path, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: clean }),
    });
    if (!r.ok) {
      console.error(`  [fail] PUT ${apiId} (${r.status}): ${JSON.stringify(r.body).slice(0, 600)}`);
      process.exit(1);
    }
    console.log(`        [ok] ${draft ? "published" : "draft"}`);
  }
}

async function main() {
  console.log(`Strapi : ${STRAPI_URL}`);
  console.log(`Token  : ${STRAPI_TOKEN ? "****" + STRAPI_TOKEN.slice(-4) : "(none)"}`);
  console.log(`Mode   : ${DRY_RUN ? "DRY-RUN" : SKIP_UPLOAD ? "SKIP-UPLOAD" : "live"}\n`);

  const cache = await loadCache();

  // 1) Resolve all assets to Strapi file ids.
  console.log("[1/3] Resolving assets:");
  const ids = {};
  for (const [key, rel] of Object.entries(ASSETS)) {
    try {
      ids[key] = await resolve(rel, cache);
      console.log(`        ${key} → ${ids[key]}`);
    } catch (e) {
      console.error(`        [fail] ${key}: ${e.message}`);
      process.exit(1);
    }
  }

  // 2) Hydrate the overlay trees (replace media refs with real ids).
  const contactOverlay = await hydrate(CONTACT_OVERLAYS, ids);
  const careersOverlay = await hydrate(CAREERS_OVERLAYS, ids);

  if (DRY_RUN) {
    console.log("\n[DRY-RUN] contact overlay:");
    console.log(JSON.stringify(contactOverlay, null, 2).slice(0, 1500));
    console.log("\n[DRY-RUN] careers overlay:");
    console.log(JSON.stringify(careersOverlay, null, 2).slice(0, 1500));
    return;
  }

  // 3) GET each page, overlay rebuilt arrays, PUT.
  console.log("\n[2/3] Patching contact-page:");
  let contact;
  try { contact = await getCurrent("contact-page"); }
  catch (e) { console.error(`  [fail] ${e.message}`); process.exit(1); }
  if (!contact) {
    console.error("  [fail] contact-page has no published data; aborting.");
    process.exit(1);
  }
  const contactMerged = mergeSection(contact, contactOverlay);
  await putPage("contact-page", contactMerged);

  console.log("\n[3/3] Patching careers-page:");
  let careers;
  try { careers = await getCurrent("careers-page"); }
  catch (e) { console.error(`  [fail] ${e.message}`); process.exit(1); }
  if (!careers) {
    console.error("  [fail] careers-page has no published data; aborting.");
    process.exit(1);
  }
  const careersMerged = mergeSection(careers, careersOverlay);
  await putPage("careers-page", careersMerged);

  console.log("\nDone.");
}

main().catch((e) => { console.error(e.message); process.exit(1); });
