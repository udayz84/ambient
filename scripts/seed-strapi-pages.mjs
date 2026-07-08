/**
 * seed-strapi-pages.mjs
 * ----------------------------------------------------------------------------
 * Seeds three Strapi v5 single types — `home-page`, `company-page`,
 * `contact-page` — for the Ambient Scientific CMS.
 *
 * What it does
 *   1. Walks the local asset manifest (HOME / COMPANY / CONTACT images + videos).
 *   2. Uploads every asset to Strapi's Media Library via POST /api/upload.
 *      - Dedupes by SHA-1 of file contents (a hash map is kept in memory).
 *      - Caches uploads to a local JSON file (.strapi-upload-cache.json) so
 *        re-runs don't re-upload identical bytes.
 *   3. Builds the three page payloads using the resolved Strapi file IDs.
 *   4. PUTs each single type via /api/<apiId> with ?status=published
 *      (draftAndPublish is enabled on every page schema).
 *
 * Requirements
 *   - Strapi v5 running (default http://localhost:1337).
 *   - A "Full access" API token created in Settings → API Tokens.
 *   - Node >= 18 (uses global fetch + FormData + Blob).
 *
 * Usage
 *   $env:STRAPI_URL="http://localhost:1337"
 *   $env:STRAPI_TOKEN="xxxx..."
 *   node scripts/seed-strapi-pages.mjs                # all three pages
 *   node scripts/seed-strapi-pages.mjs --only=home     # one page: home|company|contact
 *   node scripts/seed-strapi-pages.mjs --skip-upload   # reuse cached asset IDs
 *   node scripts/seed-strapi-pages.mjs --dry-run       # build payloads, no PUT
 *
 * No framework code is changed. Re-runnable & idempotent.
 * ----------------------------------------------------------------------------
 */

import { createHash } from "node:crypto";
import {
  readFile,
  writeFile,
  access,
  mkdir,
  copyFile,
} from "node:fs/promises";
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

// ---------------------------------------------------------------------------
// MIME TYPES
// ---------------------------------------------------------------------------

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
// HELPERS
// ---------------------------------------------------------------------------

async function ensureLogDir() {
  if (!existsSync(LOG_DIR)) await mkdir(LOG_DIR, { recursive: true });
}

/** Hash a file with SHA-1 so duplicate bytes don't get re-uploaded. */
async function sha1OfFile(absolutePath) {
  const buf = await readFile(absolutePath);
  return createHash("sha1").update(buf).digest("hex");
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
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

/**
 * Upload a single file to Strapi's Media Library.
 * Returns the Strapi file object: { id, documentId, url, name, ... }
 */
async function uploadFile(absolutePath, { folder = null } = {}) {
  const buffer = await readFile(absolutePath);
  const ext = extname(absolutePath).toLowerCase();
  const mime = MIME[ext] || "application/octet-stream";

  const form = new FormData();
  // Strapi v5 expects the raw file under the `files` field.
  form.append("files", new Blob([buffer], { type: mime }), basename(absolutePath));
  if (folder) form.append("path", folder);

  const res = await strapiFetch("/api/upload", {
    method: "POST",
    body: form,
    // NOTE: do not set Content-Type manually — fetch + FormData set the
    // multipart boundary for us.
  });

  if (!res.ok) {
    throw new Error(
      `Upload failed for ${absolutePath} (${res.status}): ${JSON.stringify(
        res.body
      )}`
    );
  }

  // /api/upload returns an array of files.
  const arr = Array.isArray(res.body) ? res.body : [res.body];
  if (!arr.length) throw new Error(`Empty upload response for ${absolutePath}`);
  return arr[0];
}

/** Cache helpers — keyed by sha1 to dedupe across runs. */
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

/**
 * Resolve an asset (by relative-to-public path) to a Strapi file id.
 * Uploads if not present in cache, deduped by sha1.
 * Returns the numeric file id used to populate media fields in payloads.
 */
async function resolveAsset(relPath, ctx) {
  // Allow empty / optional media references.
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
  await delay(20); // tiny breather for SQLite
  return file.id;
}

/** Convenience wrapper for nested payloads. Resolves to a media id or null. */
function media(relPath) {
  return { __media: relPath };
}

/** Walk a payload tree, replacing every `{ __media: '...' }` with a real id. */
async function hydrate(node, ctx) {
  if (node == null) return node;
  if (Array.isArray(node)) {
    const out = [];
    for (const v of node) {
      const r = await hydrate(v, ctx);
      // Drop array slots that resolved to null (missing assets, etc.)
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
      const r = await hydrate(v, ctx);
      // For non-array fields, keep nulls only if the schema requires the
      // presence of the key. Strapi tolerates null on optional fields.
      out[k] = r;
    }
    return out;
  }
  return node;
}

/**
 * PUT a single type payload to Strapi and (optionally) publish it.
 * `apiId` is the singular API ID, e.g. "home-page".
 */
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

/** Pretty-print a section banner. */
function banner(title) {
  const line = "─".repeat(Math.max(8, title.length + 4));
  console.log(`\n┌${line}┐`);
  console.log(`│  ${title}  │`);
  console.log(`└${line}┘`);
}

// ---------------------------------------------------------------------------
// ASSET MANIFEST — every file referenced by the three pages.
// Paths are relative to /public. Empty/stub files (19 bytes) are omitted.
// ---------------------------------------------------------------------------

const ASSETS = {
  // HOME -------------------------------------------------------------
  home_hero_video: "hero/Ambient Hero Dummy Video.mp4",
  home_hero_video_webm: "hero/Ambient Hero Dummy Video.webm",

  home_measured_bg: "measured-proof/bg-image-90.png",
  home_measured_grad_top: "measured-proof/gradient-top.png",
  home_measured_grad_bot: "measured-proof/gradient-bottom.png",
  home_measured_card_power: "measured-proof/card-power.png",
  home_measured_card_ai: "measured-proof/card-ai.png",
  home_measured_card_density: "measured-proof/card-density.png",
  home_measured_card_programmable: "measured-proof/card-programmable.png",

  home_tech_bg: "technology/bg-image-29.png",
  home_tech_chip: "technology/chip-visual.png",
  home_tech_icon_speak_ai: "technology/icon-speak-ai.svg",
  home_tech_icon_compute: "technology/icon-compute.svg",
  home_tech_icon_tools: "technology/icon-tools.svg",

  home_platform_bg: "platform-scale/bg-image-69.png",
  home_platform_chip_hero: "platform-scale/chip-hero.png",

  home_app_car: "applications/car-hero.png",
  home_app_medical: "applications/app-medical.png",
  home_app_industrial: "applications/app-industrial.png",
  home_app_smart_home: "applications/app-smart-home.png",
  home_app_wearables: "applications/app-wearables.png",
  home_app_drones: "applications/app-drones.png",
  home_app_agriculture: "applications/app-agriculture.png",
  home_app_hearables: "applications/app-hearables.png",
  home_app_cta_dot: "applications/cta-dot.svg",

  home_dev_model_forge: "developer-platform/card-image-model-forge.png",
  home_dev_modules: "developer-platform/card-image-modules.png",
  home_dev_bg: "contact/Fractal Glass.png",

  home_eco_logo_1: "ecosystem/logo-partner-1.svg",
  home_eco_logo_2: "ecosystem/logo-partner-2.svg",
  home_eco_logo_3: "ecosystem/logo-partner-3.svg",
  home_eco_logo_tezos: "ecosystem/logo-partner-4.svg",
  home_eco_logo_octane: "ecosystem/logo-octane.svg",

  home_news_article_partnership: "latest-news/article-partnership.png",
  home_news_article_physics: "latest-news/article-physics.png",
  home_news_article_gpx10: "latest-news/article-gpx10.png",

  // COMPANY ----------------------------------------------------------
  company_hero_bg: "company/hero-bg.png",
  company_mission_bg: "resources/image-107.png",
  company_dna_bg: "company/image 137.png",
  company_ecosystem_map: "company/Map.png",
  company_ecosystem_icon_footprint: "company/ecosystem-icon-footprint.svg",
  company_ecosystem_icon_distribution: "company/ecosystem-icon-distribution.svg",

  company_leader_gp: "company/leadership/gp-singh.png",
  company_leader_madanjit: "company/leadership/madanjit-singh.jpg",
  company_leader_swapnil: "company/leadership/swapnil-sapre.jpg",

  company_articles_featured: "company/Image 2.png",
  company_articles_compact_1: "company/image 3.png",
  company_articles_compact_2: "company/Image 4.png",

  company_engagement_join: "company/image 105.png",
  company_engagement_partner: "company/98410 1.png",
  company_engagement_validate: "company/98410 2.png",
  company_join_team_bg: "company/image-124.png",

  // CONTACT ----------------------------------------------------------
  contact_hero_bg: "contact/hand.png",
  contact_cta_texture: "contact/cta-texture.png",
  contact_globe: "contact/Globe image.png",
  contact_map_base: "contact/map-base.svg",
  contact_location_us: "contact/map-indicator-us.svg",
  contact_location_sg: "contact/map-indicator-sg.svg",
  contact_location_in: "contact/map-indicator-in.svg",
  contact_location_icon: "contact/location-icon.svg",
  contact_calendar_icon: "contact/calendar-icon.svg",
  contact_schedule_fae: "contact/schedule-fae.png",
  contact_schedule_commercial: "contact/schedule-commercial.png",
  contact_track_sales: "contact/track-sales.svg",
  contact_track_developer: "contact/track-developer.svg",
  contact_track_media: "contact/track-media.svg",
};

// ---------------------------------------------------------------------------
// PAGE PAYLOADS
//   - Strings are quoted verbatim from the UI components.
//   - media references use media("path/under/public").
//   - Field keys mirror the Strapi component schemas exactly.
// ---------------------------------------------------------------------------

const HOME_PAYLOAD = {
  hero: {
    title: "Limitless AI, reimagined with Ambient efficiency",
    subtitle:
      "A new class of AI chips that unlocks richer intelligence from microwatt to hyperscaler cloud, once constrained by power, space and legacy design tradeoffs",
    scroll_text: "SCROLL",
    video: media(ASSETS.home_hero_video),
    mobile_video: media(ASSETS.home_hero_video_webm),
    metrics: [
      {
        tag: "Real-time AI at edge",
        value: "100%",
        title: "Programmability",
        description:
          "AI cores with 4 to 32 bit resolution for control in applications.",
      },
      {
        tag: "Scalable arch.",
        value: "512 GOPs",
        title: "Peak Performance",
        description:
          "Unmatched AI throughput far exceeds typical low-power MCUs.",
      },
    ],
  },

  measured_proof: {
    tag: { text: "Real-time AI at edge" },
    heading: "Measured proof in silicon",
    background_image: null,
    gradient_top: null,
    gradient_bottom: null,
    stat_cards: [
      {
        metric: "100x",
        label: "LOWER POWER CONSUMPTION",
        description:
          "Extend battery life at the edge and lower energy Opex in more compute-intensive environments",
        image: media(ASSETS.home_measured_card_power),
      },
      {
        metric: "25x",
        label: "AI PERFORMANCE",
        description:
          "Unlock richer models, faster local inference, and more capable intelligence in constrained systems",
        image: media(ASSETS.home_measured_card_ai),
      },
      {
        metric: "10x",
        label: "COMPUTE DENSITY",
        description:
          "Pack more intelligence into the same footprint without scaling power and system complexity the old way",
        image: media(ASSETS.home_measured_card_density),
      },
      {
        metric: "100%",
        label: "PROGRAMMABLE DESIGN",
        description:
          "Preserve the freedom to build differentiated AI systems without locking into rigid fixed-function tradeoffs",
        image: media(ASSETS.home_measured_card_programmable),
      },
    ],
    ctas: [
      { label: "SEE WHAT WE CAN DO", href: "/technology", variant: "primary" },
      { label: "Explore ambient store", href: "/products", variant: "secondary" },
    ],
  },

  technology: {
    heading: "Re-architecting the physics of AI compute",
    tag: { text: "Real-time AI at edge" },
    background_visual: null,
    features: [
      {
        icon: media(ASSETS.home_tech_icon_speak_ai),
        title: "Speak AI natively",
        description:
          "Standard chips waste time translating AI workloads. Our architecture processes matrix math natively for high-density performance.",
      },
      {
        icon: media(ASSETS.home_tech_icon_compute),
        title: "Compute where the data lives",
        description:
          "We built our analog processing engine in memory. Processing in place eliminates data commute, saving battery life.",
      },
      {
        icon: media(ASSETS.home_tech_icon_tools),
        title: "Standard tools. zero friction",
        description:
          "Our platform adapts to your software. Compile your PyTorch or TensorFlow models in minutes, no coding needed.",
      },
    ],
  },

  platform_scale: {
    heading: "One platform, infinite scale",
    subtitle:
      "A modular compute fabric for your entire product roadmap, from a microwatt edge array to a hyperscaler server grid, without ever changing your software",
    chip_image: media(ASSETS.home_platform_chip_hero),
    default_index: 2,
    products: [
      {
        product_id: "gpx-1",
        label: "GPX 1",
        description:
          "GPX1 delivers ultra-efficient AI inference for the smallest edge devices, enabling always-on sensing and microwatt-class intelligence in space-constrained products.",
      },
      {
        product_id: "gpx-5",
        label: "GPX 5",
        description:
          "GPX5 scales embedded AI performance for mid-tier edge systems, balancing power efficiency with richer on-device models for voice, vision, and sensor fusion.",
      },
      {
        product_id: "gpx-10",
        label: "GPX 10",
        description:
          "GPX10 is the best-in-class processor for always-on embedded AI applications on power constrained edge devices for sensor-fusion, always-on voice detection and low frequency vision applications.",
      },
      {
        product_id: "gpx-32",
        label: "GPX 32",
        description:
          "GPX32 extends Ambient compute density for high-throughput edge and near-cloud workloads, packing more intelligence into the same footprint without legacy power tradeoffs.",
      },
      {
        product_id: "gpx-64",
        label: "GPX 64",
        description:
          "GPX64 is built for hyperscaler-scale AI fabric, delivering programmable high-density compute for datacenter and server-grid deployments across your product roadmap.",
      },
    ],
    cta: { label: "EXPLORE AMBIENT SILICON", href: "/technology" },
  },

  applications: {
    heading: "Build the impossible today",
    subtitle:
      "Don't let legacy design limit your roadmap. Discover the market-differentiating features of the GPX10 and what's coming next.",
    active_tab: "AUTOMOTIVE",
    tabs: [
      { label: "WEARABLES", hero_image: media(ASSETS.home_app_wearables), watermark_text: "Wearables" },
      { label: "SMART HOMES", hero_image: media(ASSETS.home_app_smart_home), watermark_text: "Smart Home" },
      { label: "INDUSTRIAL", hero_image: media(ASSETS.home_app_industrial), watermark_text: "Industry 4.0" },
      { label: "AUTOMOTIVE", hero_image: media(ASSETS.home_app_car), watermark_text: "AUTOMOTIVE" },
      { label: "MEDICAL", hero_image: media(ASSETS.home_app_medical), watermark_text: "MEDICAL" },
      { label: "AGRICULTURE", hero_image: media(ASSETS.home_app_agriculture), watermark_text: "Agriculture" },
      { label: "DRONES", hero_image: media(ASSETS.home_app_drones), watermark_text: "Drones" },
      { label: "HEARABLES", hero_image: media(ASSETS.home_app_hearables), watermark_text: "Hearables" },
    ],
    feature_cards: [
      {
        title: "Tire Pressure Monitoring",
        description:
          "On-device air pressure and temperature sensors provide real-time alerts for tire health to prevent accidents and optimize maintenance and fuel expenses",
      },
      {
        title: "Battery Management",
        description:
          "Monitoring of cell utilization, charging patterns, heat generation, etc. in electric vehicle batteries to prevent mishaps and optimize battery life",
      },
    ],
    cta: {
      label: "EXPLORE APPLICATION",
      href: "/applications",
      dot_icon: media(ASSETS.home_app_cta_dot),
    },
  },

  developer_platform: {
    heading: "Build the impossible today",
    subtitle:
      "Don't let legacy design limit your roadmap. Discover the market-differentiating features of the GPX10 and what's coming next.",
    background: media(ASSETS.home_dev_bg),
    cards: [
      {
        title: "Explore silicon",
        body:
          "Start with Ambient's AI-native compute products and see how platform advantages translate into real hardware",
      },
      {
        title: "Evaluate with development kits",
        body:
          "Get hands-on with the platform through development kits designed to accelerate validation and shorten time to first insight",
      },
      {
        title: "Develop with ModelForge",
        body:
          "Train, deploy, and optimize through a development workflow designed to help teams build with Ambient without starting from scratch",
        image: media(ASSETS.home_dev_model_forge),
      },
      {
        title: "Prototype with application-focused modules",
        body:
          "Move faster with modules designed around real-world verticals and product categories",
        image: media(ASSETS.home_dev_modules),
      },
    ],
  },

  ecosystem: {
    heading: "Supported by a growing ecosystem",
    subtitle:
      "Ambient works with partners across silicon, development, distribution, and system integration, helping teams move from evaluation to deployment with confidence",
    silicon_partners: [
      { name: "Partner 1", logo: media(ASSETS.home_eco_logo_1) },
      { name: "Partner 2", logo: media(ASSETS.home_eco_logo_2) },
      { name: "Partner 3", logo: media(ASSETS.home_eco_logo_3) },
    ],
    development_partners: [
      { name: "Tezos", logo: media(ASSETS.home_eco_logo_tezos) },
      { name: "Octane", logo: media(ASSETS.home_eco_logo_octane) },
    ],
    cta: { label: "WORK WITH US", href: "/contact" },
  },

  latest_news: {
    heading: "Latest from Ambient",
    subtitle:
      "Ambient works with partners across silicon, development, distribution, and system integration, helping teams move from evaluation to deployment with confidence",
    cta_label: "Explore more",
    cta_href: "/news-listing",
    // NOTE: article cards themselves are pulled from the related `article`
    // collection at render time per the home schema — only heading/subtitle/
    // CTA are stored on the single type.
  },

  seo: {
    meta_title: "Ambient Scientific — Limitless AI",
    meta_description:
      "A new class of AI chips unlocking richer intelligence from microwatt to hyperscaler cloud — engineered for orders-of-magnitude gains in performance-per-watt.",
    keywords:
      "AI processor, edge AI, analog compute, in-memory compute, GPX10, low-power AI, Ambient Scientific",
    noindex: false,
    canonical_url: "/",
  },
};

const COMPANY_PAYLOAD = {
  hero: {
    title: "A new paradigm for efficient AI compute",
    body:
      "We build energy-aware, programmable, mixed-signal AI processors that unlock orders-of-magnitude improvements in performance-per-watt, enabling scalable intelligence across edge, enterprise, and cloud.",
    background_image: media(ASSETS.company_hero_bg),
  },

  mission: {
    heading: "A mission dictated by physics",
    body_paragraph_1:
      "The era of patching legacy compute is over. Forcing next-generation AI through decades-old digital bottlenecks only guarantees massive power drain and wrecked economics. Ambient Scientific is confronting this physical wall by re-architecting compute from the metal up, reinventing analog circuits, native instruction sets, and developer frameworks.",
    body_paragraph_2:
      "The result is an architecture that unlocks breakthrough AI performance while requiring a fraction of the power consumption and silicon area. We exist to make intelligence truly ambient: an invisible, ubiquitous foundation built to endure for as long as the era of AI lasts, from the smallest edge sensor to the largest hyperscale cloud server.",
    background_image: null,
    stats: [
      {
        value: "100+",
        label: "Employees",
        description:
          "A passionate team of engineers, scientists and innovators.",
      },
      {
        value: "100+",
        label: "Patents",
        description:
          "Driving innovation with deep IP and proprietary breakthroughs.",
      },
      {
        value: "50+",
        label: "Active Customer Projects",
        description:
          "Partnering with industry leaders to build intelligent solutions at the edge.",
      },
    ],
  },

  leadership: {
    heading: "Our minds powering the revolution",
    subtitle:
      "We're building programmable AI processors that deliver breakthrough performance and power efficiency from edge to cloud.",
    prev_arrow_icon: null,
    next_arrow_icon: null,
    team: [
      {
        name: "GP Singh",
        title: "Founder, CEO",
        linkedin_url: "https://www.linkedin.com/in/gp-singh-340732/",
        bio_paragraphs:
          "An engineer and semiconductor innovator with 50+ chip tape-outs and 50+ patents, with deep experience across hardware and software from executive leadership to hands-on engineering.\n\nHe founded Ambient Scientific in 2017 to pioneer DigAn™ technology for ultra-low-power, programmable AI processors that scale from edge devices to high-performance systems.",
        photo: media(ASSETS.company_leader_gp),
      },
      {
        name: "Madanjit Singh",
        title: "VP Software",
        linkedin_url: "https://www.linkedin.com/in/madanjit-singh-ambient/",
        bio_paragraphs:
          "Co-founder and VP of Software leading Ambient Scientific's software stack, tools, and India R&D operations with a focus on production-ready edge-AI firmware.\n\nHe drives development of programmable software that brings DigAn™ processors to customer products, from bring-up through deployment at scale.",
        photo: media(ASSETS.company_leader_madanjit),
      },
      {
        name: "Swapnil Sapre",
        title: "AVP Hardware",
        linkedin_url: "https://www.linkedin.com/in/swapnil-sapre/",
        bio_paragraphs:
          "AVP of Hardware Engineering overseeing silicon design, validation, board engineering, mixed-signal integration, and systems bring-up for Ambient's AI processors.\n\nHis career spans Intel, AMD, NXP, and Western Digital—covering the full lifecycle from first power-on through high-volume manufacturing and deployed edge systems.",
        photo: media(ASSETS.company_leader_swapnil),
      },
    ],
  },

  dna: {
    heading: "Driven by physics. Defined by our DNA.",
    subtitle: "We build from first principles and validate everything in silicon.",
    background_image: null,
    value_cards: [
      {
        title: "Grounded in Science",
        description:
          "Our work is based on physics, not assumption. Every decision, from design to architecture, follows measurable truth and validation. Our technology extends beyond niche applications, enabling accessible and adaptable intelligence.",
      },
      {
        title: "Stay Curious. Stay Skeptical.",
        description:
          "We question assumptions, challenge conventions, and continuously refine our understanding. Progress comes from disciplined curiosity grounded in first principles.",
      },
      {
        title: "Chase the Impossible",
        description:
          "We focus on constraints others accept as permanent. Limits in power, performance, and scalability are not trade-offs to manage, but problems to fundamentally solve.",
      },
      {
        title: "Protect What Powers Us",
        description:
          "Energy is the defining constraint of AI. We design systems that deliver exponentially higher performance while consuming a fraction of the power, making intelligence sustainable at scale.",
      },
    ],
  },

  ecosystem: {
    heading: "A globally resilient ecosystem",
    subtitle:
      "Backed by Tier-1 foundries and integrated with the world's leading technology distributors and platforms.",
    map_image: media(ASSETS.company_ecosystem_map),
    columns: [
      {
        title: "Global Footprint",
        description:
          "Headquartered in Santa Clara, CA with dedicated R&D and hardware labs in Bangalore and Singapore.",
        icon: media(ASSETS.company_ecosystem_icon_footprint),
      },
      {
        title: "Distribution & Supply Chain",
        description:
          "Authorized global distribution through trusted enterprise partners ensuring secure, high-volume silicon delivery.",
        icon: media(ASSETS.company_ecosystem_icon_distribution),
      },
    ],
  },

  tech_partners: {
    title: "TECHNOLOGY PARTNERS",
    partners: [
      { name: "Partner 1", logo: media(ASSETS.home_eco_logo_1) },
      { name: "Partner 2", logo: media(ASSETS.home_eco_logo_2) },
      { name: "Partner 3", logo: media(ASSETS.home_eco_logo_3) },
      { name: "Tezos", logo: media(ASSETS.home_eco_logo_tezos) },
      { name: "Octane", logo: media(ASSETS.home_eco_logo_octane) },
    ],
  },

  articles: {
    featured_article: {
      category: "RECOGNITION",
      title: "$45M Series B led by Khosla Ventures",
      excerpt:
        "Funding announcement following successful deployment of GPX-1 silicon in production devices. Participation from Founders Fund, Andreessen Horowitz, and In-Q-Tel. Capital allocated to scale manufacturing and expand developer ecosystem.",
      date: "March 2026",
      metadata:
        "March 2026  •  Total funding: $72M  •  4 funding rounds",
      image: media(ASSETS.company_articles_featured),
    },
    compact_articles: [
      {
        title: "Best Paper Award at ISSCC 2026",
        image: media(ASSETS.company_articles_compact_1),
      },
      {
        title: "10,000+ Devices in Production",
        image: media(ASSETS.company_articles_compact_2),
      },
    ],
  },

  engagement: {
    background_image: null,
    cards: [
      {
        title: "Join Our Team",
        description:
          "Help us build the physical foundation of AI. Work alongside researchers who invented AIMC to design analog arrays, write physics-aware compilers, and ship silicon that rewrites compute economics.",
        cta_label: "VIEW OPEN ROLES",
        cta_href: "/careers#open-roles",
        image: media(ASSETS.company_engagement_join),
      },
      {
        title: "Partner with Ambient.",
        description:
          "Co-engineer the next generation of intelligent edge devices. Integrate GPX processors into your hardware with full design support, reference implementations, and production backing.",
        cta_label: "CONTACT BUSINESS DEV",
        cta_href: "/contact",
        image: media(ASSETS.company_engagement_partner),
      },
      {
        title: "Validate your architecture.",
        description:
          "Book a technical deep-dive with our Field Application Engineers. Get evaluation boards, characterization data, and measure real power on your workload — not simulations.",
        cta_label: "SCHEDULE CONSULTATION",
        cta_href: "/contact",
        image: media(ASSETS.company_engagement_validate),
      },
    ],
  },

  join_team: {
    title: "Ready to build the future of compute?",
    description:
      "We're hiring across silicon, software, and systems — join us building the physical foundation of AI.",
    cta_label: "APPLY NOW",
    cta_href: "/careers",
    image: media(ASSETS.company_join_team_bg),
  },

  seo: {
    meta_title: "Company | Ambient Scientific",
    meta_description:
      "A new paradigm for efficient AI compute — energy-aware, programmable, mixed-signal processors delivering orders-of-magnitude gains in performance-per-watt.",
    keywords:
      "Ambient Scientific, AI compute, mixed-signal processors, analog compute, edge to cloud",
    noindex: false,
    canonical_url: "/company",
  },
};

const CONTACT_PAYLOAD = {
  hero: {
    title: "Start building with Ambient",
    subtitle:
      "Skip the generic sales inbox. Get direct access to our engineering team, technical documentation, and commercial partners.",
    background_image: media(ASSETS.contact_hero_bg),
  },

  resources: {
    heading: "Looking for immediate resources?",
    ctas: [
      { label: "Download Datasheets & SDK", href: "#", variant: "primary" },
      { label: "Download Press Kit", href: "#", variant: "secondary" },
      { label: "Case Studies & Whitepapers", href: "#", variant: "secondary" },
    ],
  },

  map: {
    heading: "Global scale. Local support.",
    subtitle:
      "From our research labs to your production line, we maintain direct engineering presence across three continents to ensure rapid deployment and ongoing support.",
    globe_image: media(ASSETS.contact_globe),
    map_base: media(ASSETS.contact_map_base),
    locations: [
      {
        title: "USA Headquarters",
        address:
          "Ambient Scientific Inc. 4633 Old Ironsides Drive Santa Clara California 95054. USA",
        indicator_icon: media(ASSETS.contact_location_us),
      },
      {
        title: "Singapore Headquarters",
        address: "137 Telok Ayer Street, #05-02, Singapore 068602",
        indicator_icon: media(ASSETS.contact_location_sg),
      },
      {
        title: "India Headquarters",
        address:
          "Ramky House, 1st Cross, Raghavendra Nagar, Kalyan Nagar, Bengaluru Karnataka, 560043, India",
        indicator_icon: media(ASSETS.contact_location_in),
      },
    ],
  },

  schedule: {
    heading: "Schedule a Consultation",
    subtitle:
      "Book a direct meeting with our engineering or commercial teams.",
    icon: media(ASSETS.contact_calendar_icon),
    cards: [
      {
        tag: "Technical",
        title: "Talk to an FAE (Field Application Engineer)",
        description:
          "Book a 30-minute session with our engineers. Discuss power profiling, model quantization, or deployment architecture for your use case.",
        cta_label: "View FAE Calendar",
        image: media(ASSETS.contact_schedule_fae),
      },
      {
        tag: "Commercial",
        title: "Commercial Scaling & Enterprise",
        description:
          "Connect with Business Development to discuss pricing, ASIC development, timelines, licensing, or supply partnerships.",
        cta_label: "View Commercial Calendar",
        image: media(ASSETS.contact_schedule_commercial),
      },
    ],
  },

  form: {
    heading: "Prefer to write to us?",
    subtitle:
      "Select your track below to ensure your message reaches the right desk immediately.",
    message_heading: "Drop Us a Message",
    checkbox_label: "Sign up for news & updates",
    submit_label: "Send Message",
    tracks: [
      {
        label: "Sales & Enterprise",
        description:
          "Request a quote, discuss volume licensing, or inquire about custom ASIC development.",
        icon: media(ASSETS.contact_track_sales),
      },
      {
        label: "Developer Support",
        description:
          "Report a bug, request documentation, or get help compiling your model via the Nebula SDK.",
        icon: media(ASSETS.contact_track_developer),
      },
      {
        label: "Media & Press",
        description:
          "Request an interview with our leadership team, access press materials, or coordinate coverage.",
        icon: media(ASSETS.contact_track_media),
      },
    ],
    fields: [
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
    ],
  },

  seo: {
    meta_title: "Contact | Ambient Scientific",
    meta_description:
      "Get in touch with Ambient Scientific engineering, commercial, and support teams.",
    keywords: "contact Ambient Scientific, FAE, business development, press, support",
    noindex: false,
    canonical_url: "/contact",
  },
};

const PAGES = [
  { apiId: "home-page", name: "Home", payload: HOME_PAYLOAD },
  { apiId: "company-page", name: "Company", payload: COMPANY_PAYLOAD },
  { apiId: "contact-page", name: "Contact", payload: CONTACT_PAYLOAD },
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

  // Optional connectivity probe.
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

    // Persist the resolved payload to disk so it can be inspected/audited.
    const logPath = join(LOG_DIR, `${page.apiId}.json`);
    await writeFile(logPath, JSON.stringify(hydrated, null, 2), "utf8");
    console.log(`  [wrote] ${logPath}`);

    try {
      const result = await putSingleType(page.apiId, hydrated, {
        publish: true,
      });
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
