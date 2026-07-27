/**
 * seed-strapi-pages-2.mjs
 * ----------------------------------------------------------------------------
 * Seeds three more Strapi v5 single types — `products-page`, `technology-page`,
 * `careers-page` — for the Ambient Scientific CMS.
 *
 * Companion to seed-strapi-pages.mjs (Home / Company / Contact). Same mechanics:
 *   1. Walks the local asset manifest for PRODUCTS / TECHNOLOGY / CAREERS.
 *   2. Uploads every asset to Strapi's Media Library via POST /api/upload
 *      (SHA-1 dedupe, JSON cache so re-runs don't re-upload).
 *   3. Builds each page payload with resolved Strapi file IDs.
 *   4. PUTs each single type with ?status=published (draftAndPublish is on).
 *
 * Requirements
 *   - Strapi v5 running (default http://localhost:1337).
 *   - A "Full access" API token from Settings → API Tokens.
 *   - Node >= 18 (global fetch + FormData + Blob).
 *
 * Usage
 *   $env:STRAPI_URL="http://localhost:1337"
 *   $env:STRAPI_TOKEN="xxxx..."
 *   node scripts/seed-strapi-pages-2.mjs                       # all three
 *   node scripts/seed-strapi-pages-2.mjs --only=products        # one page
 *   node scripts/seed-strapi-pages-2.mjs --skip-upload          # reuse cached IDs
 *   node scripts/seed-strapi-pages-2.mjs --dry-run              # build payloads, no PUT
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

// ---------------------------------------------------------------------------
// CONFIG
// ---------------------------------------------------------------------------

const STRAPI_URL = (
  process.env.STRAPI_URL || "http://localhost:1337"
).replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";
const CACHE_FILE = join(__dirname, ".strapi-upload-cache.json");
const LOG_DIR = join(__dirname, ".seed-logs");

const argv = new Set(process.argv.slice(2));
const ONLY_FILTER = (process.argv.find((a) => a.startsWith("--only=")) || "")
  .replace("--only=", "")
  .toLowerCase();
const SKIP_UPLOAD = argv.has("--skip-upload");
const DRY_RUN = argv.has("--dry-run");

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
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".pdf": "application/pdf",
};

// ---------------------------------------------------------------------------
// HELPERS (mirrors seed-strapi-pages.mjs — kept duplicated intentionally
// so each script is independently runnable)
// ---------------------------------------------------------------------------

async function ensureLogDir() {
  if (!existsSync(LOG_DIR)) await mkdir(LOG_DIR, { recursive: true });
}

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

async function uploadFile(absolutePath, { folder = null } = {}) {
  const buffer = await readFile(absolutePath);
  const ext = extname(absolutePath).toLowerCase();
  const mime = MIME[ext] || "application/octet-stream";

  const form = new FormData();
  form.append("files", new Blob([buffer], { type: mime }), basename(absolutePath));
  if (folder) form.append("path", folder);

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
    ctx.stats.cacheHits += 1;
    return ctx.cache[hash].id;
  }

  if (SKIP_UPLOAD) {
    console.warn(`  [warn] --skip-upload but no cached asset for ${relPath}`);
    return null;
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
  ctx.stats.uploads += 1;
  await saveCache(ctx.cache);
  await delay(20);
  return file.id;
}

function media(relPath) {
  return { __media: relPath };
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

async function putSingleType(apiId, data, { publish = true } = {}) {
  if (DRY_RUN) {
    console.log(`  [dry-run] skipping PUT /api/${apiId}`);
    return null;
  }
  const upd = await strapiFetch(`/api/${apiId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });
  if (!upd.ok) {
    throw new Error(
      `PUT /api/${apiId} failed (${upd.status}): ${JSON.stringify(upd.body)}`
    );
  }

  if (publish) {
    const pub = await strapiFetch(`/api/${apiId}?status=published`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    if (!pub.ok) {
      console.warn(
        `  [warn] publish step returned ${pub.status}: ${JSON.stringify(pub.body)}`
      );
    }
  }
  return upd.body;
}

function banner(title) {
  const line = "─".repeat(Math.max(8, title.length + 4));
  console.log(`\n┌${line}┐`);
  console.log(`│  ${title}  │`);
  console.log(`└${line}┘`);
}

// ---------------------------------------------------------------------------
// ASSET MANIFEST — files referenced by the three pages.
// Paths are relative to /public.
// ---------------------------------------------------------------------------

const ASSETS = {
  // PRODUCTS --------------------------------------------------------
  products_hero_chipset_bg: "products/coin-chipset-2.png",
  products_hero_chipset_fg: "products/coin-chipset-1.png",

  products_features_card_image: "products/card-image.png",
  products_features_abstract: "products/abstract-design.svg",
  products_features_icon_1: "products/icon-frame-1.svg",
  products_features_icon_2: "products/icon-frame-2.svg",

  products_alwayson_image: "products/hand.png",
  products_alwayson_stat_icon: "products/stat-icon.svg",

  products_use_case_fallback: "products/use-case-image.png",
  products_use_app_hearables: "applications/app-hearables.png",
  products_use_app_smart_home: "applications/app-smart-home.png",
  products_use_app_industrial: "applications/app-industrial.png",
  products_use_app_automotive: "applications/app-automotive.png",
  products_use_app_medical: "applications/app-medical.png",
  products_use_app_agriculture: "applications/app-agriculture.png",

  products_arch_image: "products/architecture.png",
  products_arch_stat_icon: "products/arch-stat-icon.svg",

  products_modelforge_image: "products/modelforge-image.png",

  products_full_picture_image: "products/full-picture.png",
  products_full_picture_spec_icon: "products/spec-icon.svg",

  products_start_card_bg: "products/cta-card-bg.svg",

  // TECHNOLOGY -----------------------------------------------------
  tech_hero_bg: "technology/hero-bg.png",
  tech_hero_object: "technology/hero-object.png",

  tech_problem_bg: "technology/problem-bg.png",
  tech_problem_overlay: "technology/problem-overlay.png",
  tech_problem_legacy_compute: "technology/legacy-compute-new.png",
  tech_problem_legacy_memory: "technology/legacy-memory-new.png",
  tech_problem_connector_line: "technology/stat-connector-line.svg",
  tech_problem_connector_icon: "technology/connector-icon.svg",
  tech_problem_acube: "technology/acube-cube.png",

  tech_arch_image: "technology/architecture-bg.png",

  tech_pillar_cubiccore: "technology/icon-cubiccore.svg",
  tech_pillar_sensemesh: "technology/icon-sensemesh.svg",
  tech_pillar_modelforge: "technology/icon-modelforge.svg",

  tech_modes_top: "technology/modes-top.png",
  tech_modes_bottom: "technology/modes-bottom.png",
  tech_modes_icon: "technology/mode-icon.svg",

  tech_graph_bar_1: "technology/graph-bar-1.svg",
  tech_graph_bar_2: "technology/graph-bar-2.svg",
  tech_graph_bar_3: "technology/graph-bar-3.svg",
  tech_graph_bar_4: "technology/graph-bar-4.svg",
  tech_graph_bar_5: "technology/graph-bar-5.svg",

  tech_silicon_bg: "technology/silicon-bg.png",
  tech_silicon_chip_bg: "technology/chip-bg.png",
  tech_silicon_chip_object: "technology/chip-object.png",

  tech_bottom_cta_outline: "technology/cta-card-outline.svg",

  // CAREERS ---------------------------------------------------------
  careers_hero_bg: "careers/hero-bg.png",
  careers_hero_title_frame: "careers/hero-title-frame.svg",

  careers_best_work_icon_impact: "careers/icon-impact.svg",
  careers_best_work_icon_depth: "careers/icon-depth.svg",
  careers_best_work_icon_cocreation: "careers/icon-cocreation.svg",
  careers_best_work_tile: "careers/Content.png",

  careers_dna_bg: "careers/dna-section-bg.png",
  careers_dna_chip_bg: "careers/chip-bg.png",
  careers_dna_chip_object: "careers/chip-object.png",

  careers_open_roles_bg: "careers/image 107.png",
  careers_open_roles_title_frame: "careers/title-frame-roles-cta.svg",

  careers_benefits_title_frame: "careers/title-frame-benefits.svg",
  careers_benefits_icon_health: "careers/icon-health.svg",
  careers_benefits_icon_compensation: "careers/icon-compensation.svg",
  careers_benefits_icon_equipment: "careers/icon-equipment.svg",
  careers_benefits_icon_office: "careers/icon-office.svg",
  careers_benefits_icon_learning: "careers/icon-learning.svg",
  careers_benefits_icon_pto: "careers/icon-pto.svg",

  careers_bottom_cta_bg: "careers/footer-bg.png",
  careers_bottom_cta_white_texture: "careers/white-cta-texture.png",
};

// ---------------------------------------------------------------------------
// PAGE PAYLOADS — verbatim UI strings; media refs use media("path/under/public").
// ---------------------------------------------------------------------------

const PRODUCTS_PAYLOAD = {
  hero: {
    tag: { text: "Real-time AI at edge" },
    title: "Full AI inference. On a coin cell.",
    subtitle:
      "The world's first energy-aware AI processor — running real neural networks, not rule-based shortcuts, at microwatt power. Built on the A-Cube architecture.",
    primary_button: { label: "Request Evaluation Kit", href: "#", variant: "primary" },
    secondary_button: { label: "Download Product Brief", href: "#", variant: "secondary" },
    chipset_image_1: media(ASSETS.products_hero_chipset_bg),
    chipset_image_2: media(ASSETS.products_hero_chipset_fg),
  },

  features: {
    heading: "The chip that ends the power-vs-intelligence tradeoff.",
    subtitle:
      "For a decade, product makers chose: a dumb MCU that lasts months, or a smart NPU that dies by lunch. GPX10 Pro is the first that refuses to choose.",
    feature_cards: [
      {
        title: "Premium AI features in a new form.",
        description:
          "Run complex models in a hearing aid, a ring, a patch — no bulky battery, no redesign.",
        icon: media(ASSETS.products_features_icon_1),
        card_image: media(ASSETS.products_features_card_image),
      },
      {
        title: "Months on a coin cell.",
        description:
          "Always-on AI at ~80 µW. Ship the battery life your reviews live or die on.",
        icon: media(ASSETS.products_features_icon_2),
        card_image: media(ASSETS.products_features_card_image),
      },
      {
        title: "Private by default.",
        description:
          "Data never leaves the device. No cloud round-trip, no latency, no privacy liability.",
        icon: media(ASSETS.products_features_icon_2),
        card_image: media(ASSETS.products_features_card_image),
      },
      {
        title: "One chip replaces the stack.",
        description:
          "MCU + AI accelerator + sensor hub + memory you’re juggling today — and it stays aware while it sleeps.",
        icon: media(ASSETS.products_features_icon_2),
        card_image: media(ASSETS.products_features_card_image),
      },
    ],
  },

  always_on: {
    heading: "Always on. Never asleep.",
    subtitle:
      "GPX10 Pro runs AI around the clock at microwatts — and the instant something matters, it surges to full power. No reset. No waking up. It was never off.",
    image: media(ASSETS.products_alwayson_image),
    stats: [
      { title_lines: "ReflexSurge\nMode", badge: "Mode", stat_icon: media(ASSETS.products_alwayson_stat_icon) },
      { title_lines: "512 GOPS ·\ninstant", badge: "Performance", stat_icon: media(ASSETS.products_alwayson_stat_icon) },
      { title_lines: "Full power.\nNo reset.", badge: "Status", stat_icon: media(ASSETS.products_alwayson_stat_icon) },
    ],
  },

  use_cases: {
    heading: "Built for always-on. Proven across markets.",
    subtitle: "The same chip, tuned to the job — from a wrist to a factory floor.",
    tabs: [
      {
        label: "HEARABLES",
        image: media(ASSETS.products_use_app_hearables),
        watermark_text: "Hearables",
        feature_cards: [
          { title: "Tire Pressure Monitoring", description: "On-device air pressure and temperature sensors provide real-time alerts for tire health to prevent accidents and optimize maintenance and fuel expenses" },
          { title: "Battery Management", description: "Monitoring of cell utiization, charging patterns, heat generation, etc. in electric vehicle batteries to prevent mishaps and optimize battery life" },
        ],
      },
      {
        label: "SMART HOMES",
        image: media(ASSETS.products_use_app_smart_home),
        watermark_text: "Smart Home",
        feature_cards: [
          { title: "Tire Pressure Monitoring", description: "On-device air pressure and temperature sensors provide real-time alerts for tire health to prevent accidents and optimize maintenance and fuel expenses" },
          { title: "Battery Management", description: "Monitoring of cell utiization, charging patterns, heat generation, etc. in electric vehicle batteries to prevent mishaps and optimize battery life" },
        ],
      },
      {
        label: "INDUSTRIAL",
        image: media(ASSETS.products_use_app_industrial),
        watermark_text: "Industry 4.0",
        feature_cards: [
          { title: "Tire Pressure Monitoring", description: "On-device air pressure and temperature sensors provide real-time alerts for tire health to prevent accidents and optimize maintenance and fuel expenses" },
          { title: "Battery Management", description: "Monitoring of cell utiization, charging patterns, heat generation, etc. in electric vehicle batteries to prevent mishaps and optimize battery life" },
        ],
      },
      {
        label: "AUTOMOTIVE",
        image: media(ASSETS.products_use_app_automotive),
        watermark_text: "Automotive",
        feature_cards: [
          { title: "Tire Pressure Monitoring", description: "On-device air pressure and temperature sensors provide real-time alerts for tire health to prevent accidents and optimize maintenance and fuel expenses" },
          { title: "Battery Management", description: "Monitoring of cell utiization, charging patterns, heat generation, etc. in electric vehicle batteries to prevent mishaps and optimize battery life" },
        ],
      },
      {
        label: "MEDICAL",
        image: media(ASSETS.products_use_app_medical),
        watermark_text: "Medical",
        feature_cards: [
          { title: "Tire Pressure Monitoring", description: "On-device air pressure and temperature sensors provide real-time alerts for tire health to prevent accidents and optimize maintenance and fuel expenses" },
          { title: "Battery Management", description: "Monitoring of cell utiization, charging patterns, heat generation, etc. in electric vehicle batteries to prevent mishaps and optimize battery life" },
        ],
      },
      {
        label: "AGRICULTURE",
        image: media(ASSETS.products_use_app_agriculture),
        watermark_text: "Agriculture",
        feature_cards: [
          { title: "Tire Pressure Monitoring", description: "On-device air pressure and temperature sensors provide real-time alerts for tire health to prevent accidents and optimize maintenance and fuel expenses" },
          { title: "Battery Management", description: "Monitoring of cell utiization, charging patterns, heat generation, etc. in electric vehicle batteries to prevent mishaps and optimize battery life" },
        ],
      },
    ],
    primary_button: { label: "Explore Applications", href: "/applications", variant: "primary" },
    secondary_button: { label: "Discuss Your Use Case", href: "/contact", variant: "secondary" },
  },

  measured: {
    tag: { text: "Sensor-Fusion AI" },
    heading: "Not projected. Measured in silicon.",
    subtitle: "The same chip, tuned to the job — from a wrist to a factory floor.",
    comparison_metrics: [
      { label: "Peak compute" },
      { label: "Always-on power" },
      { label: "Efficiency (TOPS/W)" },
      { label: "AI model support" },
      { label: "Cloud dependency" },
      { label: "Sensor streams" },
    ],
    comparison_columns: [
      {
        label: "RISC MCU",
        values: "0.02 GOPS\n600 mW\n0.02\nRule-based only\nYes\n1–2",
        is_highlighted: false,
      },
      {
        label: "MCU + NPU",
        // Source frame ships placeholder values for this column — see extraction notes.
        values: "100 GOPS\n200 µW idle / 80 mW active\n1.2 TOPS/W\nFixed models\nYes\n2–4",
        is_highlighted: false,
      },
      {
        label: "GPX10 Pro",
        values:
          "512 GOPS\n< 100 µW\n7.3\nCNN, RNN, LSTM, GRU\nNone — fully on-device\nUp to 10 fused on-chip",
        is_highlighted: true,
      },
    ],
  },

  architecture: {
    heading: "Everything in one chip. Nothing wasted.",
    subtitle:
      "A complete edge-AI SoC — AI engine, control, sensing, memory, and security — integrated so your board doesn't have to be.",
    image: media(ASSETS.products_arch_image),
    stats: [
      {
        value: "10",
        label: "A-Cube compute",
        description: "10 MX8 cores, 2,560 MACs/cycle, replaces a separate AI accelerator.",
        stat_icon: media(ASSETS.products_arch_stat_icon),
      },
      {
        value: "2",
        label: "Two power domains",
        description: "A 5-core island sips microwatts; the rest powers down.",
        stat_icon: media(ASSETS.products_arch_stat_icon),
      },
      {
        value: "10",
        label: "Integrated sensing",
        description: "Up to 10 sensor streams fused on-chip; no external sensor hub.",
        stat_icon: media(ASSETS.products_arch_stat_icon),
      },
    ],
  },

  modelforge: {
    heading: "Your models. Your IDE. No rewrites.",
    subtitle:
      "A new architecture shouldn't mean a new way of working. With ModelForge, it doesn't.",
    image: media(ASSETS.products_modelforge_image),
    primary_button: { label: "Explore the Developer Hub", href: "/developer", variant: "primary" },
    secondary_button: { label: "Request the SDK", href: "#", variant: "secondary" },
    steps: [
      {
        step: "01 TRAIN",
        description:
          "Bring your TensorFlow, Keras, or ONNX model. Or start from our pre-trained library.",
      },
      {
        step: "02 COMPILE",
        description:
          "Push-button: ModelForge quantizes and maps it onto A-Cube. No manual translation.",
      },
      {
        step: "03 DEPLOY",
        description:
          "One unified build in standard Eclipse. Up to 90% of your existing C code ports over.",
      },
    ],
  },

  bench_to_volume: {
    chip_label: "Development",
    heading: "From bench to volume without rewriting a thing.",
    subtitle:
      "The C code, the build, the AI you validate on the kit ports straight to production silicon. This is the part competitors can't offer.",
    cards: [
      {
        title: "Cranium DVK",
        description:
          "A dev kit with sensors, camera, mics, and demos. Measure power from day one.",
        cta_label: "View Dev Kit",
        cta_href: "#",
      },
      {
        title: "Sparsh SOM",
        description:
          "Use our System-on-Module in your carrier board. Avoid RF, power, and sensor issues.",
        cta_label: "View SOMs",
        cta_href: "#",
      },
      {
        title: "GPX10 Pro Silicon",
        description: "The raw SoC for high-volume production.",
        cta_label: "Talk to Sales",
        cta_href: "/contact",
      },
    ],
  },

  full_picture: {
    heading: "The full picture",
    subtitle:
      "Bridge the lab and real world. The Sparsh module offers continuous, microwolt intelligence in a 21×21mm size, with a breakout board that snaps off for production.",
    image: media(ASSETS.products_full_picture_image),
    callouts: [
      { label: "Memory", icon: media(ASSETS.products_full_picture_spec_icon) },
      { label: "Compute", icon: media(ASSETS.products_full_picture_spec_icon) },
      { label: "Power", icon: media(ASSETS.products_full_picture_spec_icon) },
      { label: "Sensing", icon: media(ASSETS.products_full_picture_spec_icon) },
      { label: "Security", icon: media(ASSETS.products_full_picture_spec_icon) },
      { label: "Connectivity", icon: media(ASSETS.products_full_picture_spec_icon) },
      { label: "Package", icon: media(ASSETS.products_full_picture_spec_icon) },
    ],
    memory_items:
      "120 KB L0 cache\n2048 KB unified L1 SRAM\nVideo + multi-bank sensor buffers\nBoot ROM\nExternal SRAM/Flash via QSPI/SPI",
    security_items:
      "Secure boot with signed firmware\nAES-256 hardware acceleration\nTrue random number generator\nTamper-resistant key storage\nActive tamper detection",
    connectivity_items:
      "Quad-SPI / SPI\nI2C x 4\nUART x 4\nUSB 2.0 OTG\n84 programmable GPIO",
  },

  start_building: {
    heading: "Start building with GPX10 Pro.",
    subtitle:
      "A complete edge-AI SoC — AI engine, control, sensing, memory, and security — integrated so your board doesn't have to be.",
    card_background: null,
    cards: [
      {
        title_lines: "Get an\nEvaluation Kit.",
        description:
          "Explore how Ambient AI can unlock new capabilities in your wearable product. Strategic planning session with our applications team.",
        cta_label: "Request Eval Kit",
        cta_href: "#",
      },
      {
        title_lines: "Scale to increase\nthe volume.",
        description:
          "Be the first to access our upcoming Vision, Sound, and Industrial modules.",
        cta_label: "Talk to Sales",
        cta_href: "/contact",
      },
    ],
  },

  seo: {
    meta_title: "Products | Ambient Scientific",
    meta_description:
      "The world's first energy-aware AI processor — running real neural networks at microwatt power. Built on the A-Cube architecture.",
    keywords: "GPX10 Pro, edge AI processor, coin cell AI, A-Cube, microwatt AI, ModelForge",
    noindex: false,
    canonical_url: "/products",
  },
};

const TECHNOLOGY_PAYLOAD = {
  hero: {
    tag: { text: "Architecture · A-Cube" },
    title: "Meet A-Cube. AI-native, from the metal up.",
    subtitle:
      "A new architecture for AI, energy-aware at every layer, scaling from coin cell to cloud.",
    primary_button: { label: "Read the Whitepaper", href: "#", variant: "primary" },
    secondary_button: { label: "Watch the 3-min Explainer", href: "#", variant: "secondary" },
    background_image: media(ASSETS.tech_hero_bg),
    hero_object: media(ASSETS.tech_hero_object),
  },

  problem: {
    tag: { text: "The PROBLEM" },
    heading: "AI isn't a math problem.\nIt's a memory problem.",
    subtitle: "The multiply was never the expensive part. Moving the data was.",
    stat_value: "95%",
    stat_description:
      "of a neural net is matrix math. ~75% of the effort is moving it around.",
    background_image: null,
    comparison_cards: [
      {
        label: "Legacy",
        description:
          "Compute and memory sit apart. The chip spends its life shuttling numbers, not crunching them. ~75% of operations are just memory traffic.",
        image: media(ASSETS.tech_problem_legacy_compute),
      },
      {
        label: "A-Cube",
        description:
          "We put the compute inside the memory. The commute disappears. Compute where the data lives.",
        image: media(ASSETS.tech_problem_acube),
      },
    ],
  },

  architecture: {
    tag: { text: "A-Cube" },
    heading: "One architecture that thinks\nsenses, & speaks you language",
    subtitle:
      "Three breakthroughs as one: a physics-based brain, a responsive nervous system, and familiar language. Server-class AI with low power.",
    image: media(ASSETS.tech_arch_image),
  },

  pillars: {
    pillars: [
      {
        icon: media(ASSETS.tech_pillar_cubiccore),
        tag: "The Brain That think",
        title: "CubicCore™",
        subtitle: "Server-class math. Microwatt power.",
        description:
          "It runs the math on physics itself. Ohm's law multiplies, Kirchhoff's law sums - right inside the memory, almost for free. Digital keeps every result exact.",
        bullets:
          "In-memory analog compute - no data commute\n~1/100th the energy per operation vs. digital\nScales by replication - tile in more cores, from a smart ring to a server\nFully programmable · 4–32-bit precision, tuned at runtime\nBuilt in standard CMOS - no exotic process",
      },
      {
        icon: media(ASSETS.tech_pillar_sensemesh),
        tag: "The Nervous System",
        title: "SenseMesh™",
        subtitle: "Knows when to think - and how hard.",
        description:
          "Reflexes in hardware. It fuses every sensor into one clean stream, filters out the noise, and decides - in hardware - when to wake the brain and how much power it needs.",
        bullets:
          "Hardware sensor fusion - no host polling, no firmware overhead\nEvent-driven wake - compute fires only on real signals\nMultimodal by design - motion, audio, vision into one stream\n>80% less idle host power vs. legacy MCUs",
      },
      {
        icon: media(ASSETS.tech_pillar_modelforge),
        tag: "The Language",
        title: "ModelForge™",
        subtitle: "No new language to learn.",
        description:
          "Bring your own models in TensorFlow, Keras, or ONNX. A push-button compiler does the translation - no rewrites, no proprietary toolchain.",
        bullets:
          "Drop-in support for TensorFlow, Keras, ONNX\nPush-button compile - concept to silicon, no rewrites\nSpeaks matrix math natively — none of the translation tax Arm/RISC-V pay\nOne workflow that ports across every A-Cube product",
        cta: { label: "Explore the Developer Hub", href: "/developer", variant: "primary" },
      },
    ],
  },

  modes: {
    tag: { text: "Inside Sensemesh" },
    heading: "Two named modes. One continuous loop.",
    subtitle:
      "Bridge the lab and real world. The Sparsh module offers continuous, microwatt intelligence in a 21×21mm size,",
    top_image: media(ASSETS.tech_modes_top),
    bottom_image: media(ASSETS.tech_modes_bottom),
    mode_cards: [
      {
        title: "Subconscious AI",
        bullets:
          "Legacy chips switch off. A-Cube sleeps like you: the brain stays aware. Our island runs AI at microwatts while the ARM core is powered down. Always processing, never draining.",
      },
      {
        title: "Turboboost mode",
        bullets:
          "When something matters, the brain wakes instantly. The moment SenseMesh flags a real event, runtime DVFS ramps the chip from subconscious idle to full performance",
      },
      {
        title: "SETTLES",
        bullets: "Once the task is completed, the chip settles back into subconscious mode.",
      },
    ],
    mode_labels: [
      { label: "SUBCONSCIOUS MODE", sublabel: "Always on. Ultra low power" },
      { label: "Turboboost mode", sublabel: "on-demand. high performance" },
    ],
  },

  graph: {
    heading: "A unified architecture for seamless adoption and scalability.",
    subtitle: "The same chip, tuned to the job — from a wrist to a factory floor.",
    labels: [
      { label: "GPX10", sub_label: "EDGE SENSOR" },
      { label: "GPX10 Pro", sub_label: "EDGE AI SOC" },
      { label: "GPX Vision", sub_label: "ON - DEVICE VISION" },
      { label: "GPX Compute", sub_label: "ON - DEVICE VISION" },
      { label: "GPX Compute", sub_label: "ON - DEVICE VISION" },
    ],
    axis_label_left: "MICROWATT EDGE",
    axis_label_right: "HYPERSCALE CLOUD",
    center_text:
      "ONE CORE. ONE SOFTWARE STACK. From the smallest sensor to largest serve",
    primary_button: { label: "Read the Whitepaper", href: "#", variant: "primary" },
    secondary_button: { label: "Watch the 3-min Explainer", href: "#", variant: "secondary" },
  },

  silicon: {
    tag: { text: "Inside Sensemesh" },
    heading: "Proven in silicon, shipping today.",
    subtitle:
      "Bridge the lab and real world. The Sparsh module offers continuous, microwatt intelligence in a 21×21mm size,",
    background_image: null,
    chip_background: null,
    chip_object: media(ASSETS.tech_silicon_chip_object),
    stat_cards: [
      {
        value: "512",
        unit: "GOPS",
        label: "LOWER POWER CONSUMPTION",
        description:
          "Extend battery life and reduce energy costs in compute-intensive settings.",
      },
      {
        value: "~80",
        unit: "uW",
        label: "LOWER POWER CONSUMPTION",
        description:
          "Extend battery life and reduce energy costs in compute-intensive settings.",
      },
    ],
    cta: { label: "Explore GPX10", href: "#", variant: "primary" },
  },

  efficiency: {
    heading: "The efficiency gap isn’t a few\npercent. It’s a different category.",
    subtitle: "The same chip, tuned to the job — from a wrist to a factory floor.",
  },

  bottom_cta: {
    heading: "Put A-Cube to Work",
    subtitle:
      "A complete edge-AI SoC — AI engine, control, sensing, memory, and security — integrated so your board doesn't have to be.",
    card_outline: null,
    cards: [
      {
        title_lines: "Get an\nEvaluation Kit.",
        description:
          "Explore how Ambient AI can unlock new capabilities in your wearable product. Strategic planning session with our applications team.",
        cta_label: "Request Eval Kit",
        cta_href: "/contact",
      },
      {
        title_lines: "Scale to increase\nthe volume.",
        description:
          "Be the first to access our upcoming Vision, Sound, and Industrial modules.",
        cta_label: "Talk to Sales",
        cta_href: "/contact",
      },
    ],
  },

  seo: {
    meta_title: "Technology | Ambient Scientific",
    meta_description:
      "Meet A-Cube. AI-native, from the metal up. A new architecture for AI, energy-aware at every layer, scaling from coin cell to cloud.",
    keywords: "A-Cube, CubicCore, SenseMesh, ModelForge, in-memory compute, analog AI",
    noindex: false,
    canonical_url: "/technology",
  },
};

const CAREERS_PAYLOAD = {
  hero: {
    title: "Re-architect the physics of AI",
    subtitle:
      "Don't iterate on legacy silicon. Build the fundamental compute substrate for the next generation of intelligence.",
    cta_label: "VIEW OPEN ROLES",
    cta_href: "#open-roles",
    scroll_text: "SCROLL",
    background_image: media(ASSETS.careers_hero_bg),
    title_frame: null,
  },

  best_work: {
    heading: "Do the best work of your life",
    cards: [
      {
        icon: media(ASSETS.careers_best_work_icon_impact),
        title: "Unprecedented Impact",
        description:
          "Ship silicon that rewrites the power-performance frontier. Your work enables AI capabilities that were physically impossible yesterday.",
      },
      {
        icon: media(ASSETS.careers_best_work_icon_depth),
        title: "Pure Technology Depth",
        description:
          "Operate at the intersection of analog circuit design, machine learning architectures, and condensed matter physics. No abstraction layers.",
      },
      {
        icon: media(ASSETS.careers_best_work_icon_cocreation),
        title: "Unconstrained Co-Creation",
        description:
          "Build alongside the researchers who invented AIMC. Direct access to founders, zero bureaucracy, full technical autonomy.",
      },
    ],
  },

  dna: {
    heading: "Driven by physics. Defined by our DNA.",
    subtitle: "This is how we work, build, and solve at Ambient.",
    background_image: null,
    chip_background: null,
    chip_object: media(ASSETS.careers_dna_chip_object),
    panels: [
      {
        title: "Grounded in Science",
        description:
          "You work from first principles. Every decision you make is expected to be backed by data, validation, and a clear understanding of the underlying system.",
      },
      {
        title: "Stay Curious. Stay Skeptical.",
        description:
          "You are encouraged to question, challenge, and refine. Strong thinking, clear reasoning, and continuous learning are expected at every stage of the work.",
      },
      {
        title: "Chase the Impossible",
        description:
          "You take on problems that don't have predefined solutions. The expectation is not iteration, but pushing beyond accepted limits and building what doesn't yet exist.",
      },
      {
        title: "Build for Everyone",
        description:
          "Your work is not isolated. You build systems that must scale across real-world environments, constraints, and users, making advanced technology practical and usable.",
      },
      {
        title: "Protect What Powers Us",
        description:
          "You design with power as a constraint from day one. Efficiency is not an afterthought, it is a core part of how you think, build, and optimize systems.",
      },
    ],
  },

  open_roles: {
    heading: "Open Roles",
    general_app_title: "Don't See The Right Role?",
    general_app_subtitle:
      "Submit a general application and we'll reach out when a matching position opens.",
    general_app_cta_label: "SHARE YOUR PROFILE",
    apply_button_label: "APPLY NOW",
    job_type_filters: "Hardware, Software, Research",
    location_filters: "San Francisco, Remote",
  },

  benefits: {
    heading: "Benefits & Perks",
    title_frame: null,
    cards: [
      {
        icon: media(ASSETS.careers_benefits_icon_health),
        title: "Comprehensive Health Coverage",
        description:
          "Medical, dental, and vision insurance for you and your family. Mental health support included.",
      },
      {
        icon: media(ASSETS.careers_benefits_icon_compensation),
        title: "Competitive Compensation",
        description:
          "Top-of-market salary and significant equity grants. Annual performance reviews with real upside.",
      },
      {
        icon: media(ASSETS.careers_benefits_icon_equipment),
        title: "Equipment And Tools",
        description:
          "Latest MacBook Pro, external displays, and any specialized hardware or software you need.",
      },
      {
        icon: media(ASSETS.careers_benefits_icon_office),
        title: "Office Perks",
        description:
          "Daily catered lunch, premium coffee setup, and fully stocked kitchen. Relocation assistance available.",
      },
      {
        icon: media(ASSETS.careers_benefits_icon_learning),
        title: "Learning Budget",
        description:
          "$5,000 annual budget for conferences, courses, books, and professional development.",
      },
      {
        icon: media(ASSETS.careers_benefits_icon_pto),
        title: "Unlimited PTO",
        description:
          "Take the time you need. We trust you to manage your work and recharge when necessary.",
      },
    ],
  },

  bottom_cta: {
    heading: "Ready to build the future of compute?",
    buttons: [
      { label: "APPLY NOW", href: "#", variant: "primary" },
      { label: "REFER A CANDIDATE", href: "#", variant: "secondary" },
    ],
    background_texture: null,
  },

  seo: {
    meta_title: "Careers | Ambient Scientific",
    meta_description:
      "Join Ambient Scientific to re-architect the physics of AI and build the fundamental compute substrate for the next generation of intelligence.",
    keywords:
      "careers, jobs, analog circuit design, ML engineer, silicon characterization, embedded systems, Ambient Scientific",
    noindex: false,
    canonical_url: "/careers",
  },
};

const PAGES = [
  { apiId: "products-page", name: "Products", payload: PRODUCTS_PAYLOAD },
  { apiId: "technology-page", name: "Technology", payload: TECHNOLOGY_PAYLOAD },
  { apiId: "careers-page", name: "Careers", payload: CAREERS_PAYLOAD },
];

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------

async function main() {
  await ensureLogDir();
  const ctx = {
    cache: await loadCache(),
    stats: { uploads: 0, cacheHits: 0, pages: 0, failures: 0 },
  };

  console.log(`Strapi : ${STRAPI_URL}`);
  console.log(`Token  : ${STRAPI_TOKEN ? "****" + STRAPI_TOKEN.slice(-4) : "(none)"}`);
  console.log(`Mode   : ${DRY_RUN ? "DRY-RUN" : SKIP_UPLOAD ? "SKIP-UPLOAD" : "live"}`);
  if (ONLY_FILTER) console.log(`Filter : --only=${ONLY_FILTER}`);

  if (!DRY_RUN) {
    banner("Connectivity check");
    const ping = await strapiFetch("/api/global-settings");
    if (ping.status === 401 || ping.status === 403) {
      console.error(
        `[fatal] token rejected (${ping.status}). Create a Full access token in Strapi admin.`
      );
      process.exit(1);
    }
    console.log(`[ok] /api reachable (status ${ping.status})`);
  }

  for (const page of PAGES) {
    if (ONLY_FILTER && page.name.toLowerCase() !== ONLY_FILTER) {
      console.log(`\n[skip] ${page.name} (filtered out by --only=${ONLY_FILTER})`);
      continue;
    }

    banner(`Seeding ${page.name} page (${page.apiId})`);
    let hydrated;
    try {
      hydrated = await hydrate(page.payload, ctx);
    } catch (err) {
      console.error(`  [error] hydrating ${page.apiId}: ${err.message}`);
      ctx.stats.failures += 1;
      continue;
    }

    const logPath = join(LOG_DIR, `${page.apiId}.json`);
    await writeFile(logPath, JSON.stringify(hydrated, null, 2), "utf8");
    console.log(`  [wrote] ${logPath}`);

    try {
      await putSingleType(page.apiId, hydrated, { publish: true });
      console.log(`  [done] PUT /api/${page.apiId} OK`);
      ctx.stats.pages += 1;
    } catch (err) {
      console.error(`  [error] PUT /api/${page.apiId} failed: ${err.message}`);
      ctx.stats.failures += 1;
    }
  }

  banner("Summary");
  console.log(`Assets uploaded : ${ctx.stats.uploads}`);
  console.log(`Assets reused   : ${ctx.stats.cacheHits}`);
  console.log(`Pages seeded    : ${ctx.stats.pages}`);
  console.log(`Failures        : ${ctx.stats.failures}`);
  console.log(`Cache file      : ${CACHE_FILE}`);
  console.log(`Payload logs    : ${LOG_DIR}\\*.json`);
  process.exit(ctx.stats.failures ? 1 : 0);
}

main().catch((err) => {
  console.error("[fatal]", err);
  process.exit(1);
});
