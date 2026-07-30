/**
 * seed-strapi-pages-3.mjs
 * ----------------------------------------------------------------------------
 * Seeds the remaining seven Strapi v5 single types for the Ambient Scientific
 * CMS:
 *   - applications-page
 *   - developer-page
 *   - dvk-page
 *   - news-listing-page
 *   - resources-page
 *   - som-page
 *   - wearables-page
 *
 * Companion to seed-strapi-pages.mjs (Home/Company/Contact) and
 * seed-strapi-pages-2.mjs (Products/Technology/Careers). Same mechanics:
 *   1. Walks the local asset manifest.
 *   2. Uploads every asset to Strapi's Media Library via POST /api/upload
 *      (SHA-1 dedupe, JSON cache so re-runs don't re-upload).
 *   3. Builds each page payload with resolved Strapi file IDs.
 *   4. PUTs each single type with ?status=published (draftAndPublish is on).
 *
 * Usage
 *   $env:STRAPI_URL="http://localhost:1337"
 *   $env:STRAPI_TOKEN="xxxx..."
 *   node scripts/seed-strapi-pages-3.mjs                        # all seven
 *   node scripts/seed-strapi-pages-3.mjs --only=applications     # one page
 *   node scripts/seed-strapi-pages-3.mjs --skip-upload           # reuse cached IDs
 *   node scripts/seed-strapi-pages-3.mjs --dry-run               # build payloads, no PUT
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
// HELPERS — same as companion scripts (kept duplicated for standalone use)
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

/** media array resolver — for `multiple: true` fields (Strapi expects an array of ids). */
function mediaArr(...paths) {
  return { __mediaArr: paths };
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
    if (Object.prototype.hasOwnProperty.call(node, "__mediaArr")) {
      const ids = [];
      for (const p of node.__mediaArr) {
        const id = await resolveAsset(p, ctx);
        if (id !== null) ids.push(id);
      }
      return ids;
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
// ASSET MANIFEST
// ---------------------------------------------------------------------------

const ASSETS = {
  // APPLICATIONS ----------------------------------------------------
  apps_hero_bg: "applications/hero-bg.png",
  apps_title_frame: "applications/title-frame.svg",
  apps_dvk_bg: "applications/dvk-bg.png",
  apps_dvk_bottom: "applications/dvk-bottom.png",
  apps_orbit: "applications/orbit.svg",
  apps_card_center: "applications/card-center.png",
  apps_card_left_mid: "applications/card-left-mid.png",
  apps_card_right_mid: "applications/card-right-mid.png",
  apps_card_left_far: "applications/card-left-far.png",
  apps_card_right_far: "applications/card-right-far.png",
  apps_dvk_m_watch: "applications/dvk-m-watch.png",
  apps_dvk_m_robot_arm: "applications/dvk-m-robot-arm.png",
  apps_dvk_m_humanoid: "applications/dvk-m-humanoid.png",
  apps_dvk_m_headphones: "applications/dvk-m-headphones.png",
  apps_dvk_m_rover: "applications/dvk-m-rover.png",
  apps_dvk_m_surgical: "applications/dvk-m-surgical.png",
  apps_continuum: "applications/continuum.png",
  apps_medical: "applications/app-medical.png",
  apps_drones: "applications/app-drones.png",
  apps_robotics: "applications/app-robotics.png",
  apps_automotive: "applications/app-automotive.png",
  apps_wins_bg: "applications/wins-bg.png",
  apps_wins_img_1: "applications/wins-img-1.png",
  apps_wins_img_2: "applications/wins-img-2.png",
  apps_wins_img_3: "applications/wins-img-3.png",
  apps_som_img_a: "applications/som-img-a.png",
  apps_som_img_b: "applications/som-img-b.png",

  // DEVELOPER -------------------------------------------------------
  dev_hero_bg_1: "developer/hero-bg-1.png",
  dev_hero_bg_2: "developer/hero-bg-2.png",
  dev_hero_bg_3: "developer/hero-bg-3.png",
  dev_article_icon_1: "developer/article-icon-1.svg",
  dev_article_icon_2: "developer/article-icon-2.svg",
  dev_article_icon_3: "developer/article-icon-3.svg",
  dev_train_flow_1: "developer/train-flow-1.png",
  dev_train_flow_2: "developer/train-flow-2.png",
  dev_train_flow_3: "developer/train-flow-3.png",
  dev_train_flow_4: "developer/train-flow-4.png",
  dev_pipeline_logo_1: "developer/pipeline-logo-1.png",
  dev_pipeline_logo_2: "developer/pipeline-logo-2.png",
  dev_pipeline_logo_3: "developer/pipeline-logo-3.png",
  dev_sandbox_image: "developer/sandbox-image.png",
  dev_coming_bg: "developer/coming-bg.png",
  dev_module_dvk: "developer/module-dvk.png",
  dev_module_som: "developer/module-som.png",
  dev_copilot_icon_1: "developer/copilot-icon-1.svg",
  dev_copilot_icon_2: "developer/copilot-icon-2.svg",
  dev_copilot_icon_3: "developer/copilot-icon-3.svg",

  // DVK -------------------------------------------------------------
  dvk_hero_bg_1: "dvk/hero-bg-1.png",
  dvk_hero_bg_2: "dvk/hero-bg-2.png",
  dvk_board_main: "dvk/board-main.png",
  dvk_board_chip: "dvk/board-chip.png",
  dvk_demo_voice: "dvk/demo-voice.png",
  dvk_demo_fall: "dvk/demo-fall.png",
  dvk_demo_vision: "dvk/demo-vision.png",
  dvk_card_glow: "dvk/card-glow.png",

  // NEWS LISTING ----------------------------------------------------
  news_hero_bg: "news-listing/hero-bg.png",
  news_press_title_frame: "news-listing/press-title-frame.svg",
  news_press_icon: "news-listing/press-icon.svg",
  news_backdrop: "careers/image 107.png",
  news_card_overlay_1: "resources/article-1-overlay.png",
  news_card_overlay_2: "resources/article-2-overlay.png",
  news_card_overlay_3: "resources/article-3-overlay.png",
  news_card_overlay_4: "resources/article-4-overlay.png",
  news_card_overlay_5: "resources/article-5-overlay.png",
  news_card_overlay_6: "resources/article-6-overlay.png",
  res_news_cta_texture: "resources/news-cta-texture.png",

  // RESOURCES -------------------------------------------------------
  res_hero_title_frame: "resources/hero-title-frame.svg",
  res_hero_image: "resources/image-102.png",
  res_featured_1: "resources/featured-1.png",
  res_featured_2: "resources/featured-2.png",
  res_featured_3: "resources/featured-3.png",
  res_building_bg: "resources/building-bg.png",
  res_building_title_frame: "resources/building-title-frame.svg",
  res_content_bg: "resources/image-107.png",

  // SOM -------------------------------------------------------------
  som_hero_bg: "som/hero-bg.png",
  som_title_frame: "som/title-frame.svg",
  som_icon_bg: "som/icon-bg.svg",
  som_icon_card_1: "som/icon-card-1.svg",
  som_icon_card_2: "som/icon-card-2.svg",
  som_icon_card_3: "som/icon-card-3.svg",
  som_ecosystem_bg: "som/ecosystem-bg.png",
  som_chip: "som/som-chip.png",
  som_ecosystem_abstract: "som/ecosystem-abstract.svg",
  som_motion_icon: "som/motion-icon.svg",
  som_vision_icon: "som/vision-icon.svg",
  som_module_photo: "som/module-photo.png",
  som_ready_image: "som/sparsh-chip.png",
  som_footer_merge: "som/footer-merge.svg",

  // WEARABLES -------------------------------------------------------
  wbl_hero_bg_1: "applications/wearables/hero-bg-162.png",
  wbl_hero_bg_2: "applications/wearables/hero-bg-163.png",
  wbl_title_frame: "applications/wearables/title-frame.svg",
  wbl_hardware_blueprint: "applications/wearables/hardware-blueprint.png",
  wbl_lab_image: "applications/wearables/img-168.png",
  wbl_img_187: "applications/wearables/img-187.png",
  wbl_img_188: "applications/wearables/img-188.png",
  wbl_rectangle_divider: "applications/wearables/rectangle-divider.svg",
  wbl_marquee_1: "wearables-marquee/w1.png",
  wbl_marquee_2: "wearables-marquee/w2.png",
  wbl_marquee_3: "wearables-marquee/w3.png",
  wbl_marquee_4: "wearables-marquee/w4.png",
  wbl_marquee_5: "wearables-marquee/w5.png",
  wbl_marquee_6: "wearables-marquee/w6.png",
  wbl_marquee_7: "wearables-marquee/w7.png",
};

// ---------------------------------------------------------------------------
// PAGE PAYLOADS — verbatim UI strings; media refs use media() / mediaArr().
// ---------------------------------------------------------------------------

const APPLICATIONS_PAYLOAD = {
  hero: {
    tag: { text: "The Full Spectrum" },
    title: "Intelligence in Every Environment",
    subtitle:
      "From microwatt edge sensors running on coin cells to air-cooled high-performance compute arrays, the GPX architecture scales seamlessly across the physical world.",
    background_image: media(ASSETS.apps_hero_bg),
  },

  death_of_hardware_tradeoffs: {
    heading: "The death of hardware tradeoffs.",
    subtitle:
      "Legacy silicon forces you to choose. High performance or low power. Complex models or small footprint. We re-architected the physics so you can finally unleash your creativity and build with freedom.",
    carousel_images: mediaArr(
      ASSETS.apps_dvk_m_watch,
      ASSETS.apps_dvk_m_robot_arm,
      ASSETS.apps_dvk_m_humanoid,
      ASSETS.apps_dvk_m_headphones,
      ASSETS.apps_dvk_m_rover,
      ASSETS.apps_dvk_m_surgical,
    ),
    features: [
      { title: "Complex AI Model" },
      { title: "Realtime & low latency" },
      { title: "Ondevice, cloud-free" },
      { title: "Compact footprint" },
      { title: "Programmable & future proof" },
      { title: "Ultra -low power consumption" },
    ],
  },

  continuum: {
    heading: "The Ambient Continuum.",
    subtitle:
      "A unified analog architecture, scaled for your exact power and performance needs.",
    image: media(ASSETS.apps_continuum),
    cards: [
      { title: "GPX10PRO", body: "Always-on intelliegence for wearabes, audio & battery IoT." },
      { title: "GPX64", body: "Real-time perception & control for robots, drones & smart machines" },
      { title: "GPX256", body: "Private, local AI compute for creators, developers & businesses" },
      { title: "GPX2000", body: "Private, local AI compute for creators, developers & businesses" },
      { title: "GPX8000", body: "Always-on intelliegence for wearabes, audio & battery IoT." },
    ],
  },

  articles: {
    heading: "Intelligence without boundaries.",
    articles: [
      {
        title: "Wearables",
        body:
          "Always-on biometric tracking and complex activity recognition running continuously on standard wearable batteries.",
        image: media(ASSETS.apps_card_center),
        cta_label: "Learn More",
      },
      {
        title: "Hearables",
        body:
          "Always-on wake-word detection and real-time audio enhancement running continuously on microscopic power budgets.",
        image: media(ASSETS.apps_card_right_mid),
        cta_label: "Learn More",
      },
      {
        title: "Smart Home",
        body:
          "True on-device voice processing and presence detection without sacrificing consumer privacy to the cloud.",
        image: media(ASSETS.apps_card_left_far),
        cta_label: "Learn More",
      },
      {
        title: "Industry 4.0",
        body:
          "High-frequency predictive maintenance and visual defect detection directly on the factory floor.",
        image: media(ASSETS.apps_card_left_mid),
        cta_label: "Learn More",
      },
      {
        title: "Medical Devices",
        body:
          "Clinical-grade monitoring and real-time anomaly detection deployed in miniaturized form factors.",
        image: media(ASSETS.apps_medical),
        cta_label: "Learn More",
      },
      {
        title: "Agriculture & Livestock",
        body:
          "Complex visual monitoring and behavioral tracking deployed in remote environments where cloud connectivity is impossible.",
        image: media(ASSETS.apps_card_right_far),
        cta_label: "Learn More",
      },
      {
        title: "Drones",
        body:
          "High-speed object detection and autonomous navigation processed natively without sacrificing critical flight time.",
        image: media(ASSETS.apps_drones),
        cta_label: "Learn More",
      },
      {
        title: "Robotics",
        body:
          "Instantaneous multi-sensor fusion and complex kinematic control operating completely untethered from the cloud.",
        image: media(ASSETS.apps_robotics),
        cta_label: "Learn More",
      },
      {
        title: "Automotive",
        body:
          "Ultra-low latency sensor fusion and continuous in-cabin monitoring executing natively for next-generation safety.",
        image: media(ASSETS.apps_automotive),
        cta_label: "Learn More",
      },
    ],
  },

  wins: {
    heading: "The empirical advantage.",
    body:
      "On-device assault and anomaly detection for women's health without battery drain. This innovative approach ensures safety while maintaining device efficiency.",
    background_image: null,
    cards: [
      { label: "The Wearable Wins", stat: "99%", stat_label: "Accurate", image: media(ASSETS.apps_wins_img_1) },
      { label: "The Medical/Safety Wins", stat: "6months", stat_label: "Battery", image: media(ASSETS.apps_wins_img_2) },
      { label: "The AR/Vision Wins", stat: "Zero", stat_label: "Latency", image: media(ASSETS.apps_wins_img_3) },
    ],
  },

  som: {
    heading: "Don't start from scratch.",
    subtitle:
      "Accelerate your time-to-market. Our System-on-Modules (SOMs) provide fully integrated, production-ready AI hardware that drops directly into your carrier board.",
    primary_button: { label: "View SOMs", href: "/SOM", variant: "primary" },
    secondary_button: { label: "Discuss Your Use Case", href: "/contact", variant: "secondary" },
    status_pill: "LAUNCHING SOON",
    data_labels: [
      { value: "<1mW", label: "GPX-Edge Micro", sublabel: "Wearables & Hearables" },
    ],
    images: mediaArr(ASSETS.apps_som_img_a, ASSETS.apps_som_img_b),
  },

  seo: {
    meta_title: "Applications | Ambient Scientific",
    meta_description:
      "Intelligence in every environment — from microwatt edge sensors on coin cells to air-cooled high-performance compute arrays.",
    keywords:
      "edge AI applications, wearables, hearables, smart home, industrial AI, automotive AI, medical AI, drones, robotics",
    noindex: false,
    canonical_url: "/applications",
  },
};

const DEVELOPER_PAYLOAD = {
  hero: {
    heading: "Model to deployment in 15 Minutes",
    subtitle:
      "ModelForge bridges training and deployment. Quantize, compile, and merge neural networks with your firmware.",
    primary_button: { label: "Download ModelForge SDK", href: "#", variant: "primary" },
    secondary_button: { label: "Read the Documentation", href: "#", variant: "secondary" },
    background_image: media(ASSETS.dev_hero_bg_3),
  },

  code: {
    heading: "Hello world in three lines",
    subtitle:
      "We invisibly map AI cores to your host drop your model straight into your existing application.",
    code_snippet: `main.c

#include "sys_clk.h"
#include "FreeRTOS.h"

void main()

{
APP_Start();
}

static void APP_Start()
{

	xTaskCreate(application_read_task_entry,
				"DataTask",
				1024,
				(void *)0,
				tskIDLE_PRIORITY + 4,
				NULL );

	xTaskCreate(application_process_task_entry,
				"ProcessTask",
				1024,
				(void *)0,
				tskIDLE_PRIORITY + 3,
				NULL );


	xTaskCreate(application_LCD_DISPLAY_task_entry,
				"PrintTask",
				1024,
				(void *)0,
				tskIDLE_PRIORITY + 2,
				NULL );

}`,
    articles: [
      {
        icon: media(ASSETS.dev_article_icon_1),
        title: "No Proprietary IDEs",
        description:
          "Everything happens within the standard Eclipse IDE you already know with easy-to-use APIs.",
      },
      {
        icon: media(ASSETS.dev_article_icon_2),
        title: "A Single Line of Inference",
        description:
          "Your heavy, quantized neural network is distilled into a highly optimized object file. You call it just like any other standard C function.",
      },
      {
        icon: media(ASSETS.dev_article_icon_3),
        title: "The End of Glue Code",
        description:
          "ModelForge's dual-compiler architecture natively links your embedded DSP/sensor code with the AI execution in one seamless build.",
      },
    ],
  },

  pipeline: {
    heading: "The ModelForge Pipeline",
    tag: { text: "Real-time AI at edge" },
    tabs: [
      {
        label: "Train",
        flow_image: media(ASSETS.dev_train_flow_1),
        logo: media(ASSETS.dev_pipeline_logo_1),
      },
      {
        label: "Optimize",
        flow_image: media(ASSETS.dev_train_flow_2),
        logo: media(ASSETS.dev_pipeline_logo_2),
      },
      {
        label: "Integrate",
        flow_image: media(ASSETS.dev_train_flow_3),
        logo: media(ASSETS.dev_pipeline_logo_3),
      },
      {
        label: "Deploy",
        flow_image: media(ASSETS.dev_train_flow_4),
        logo: media(ASSETS.dev_pipeline_logo_1),
      },
    ],
  },

  coming_soon: {
    heading: "Test on the metal, without the metal.",
    subtitle:
      "Validate your build in a virtual sandbox,\nno need to wait for hardware.",
    card_title: "Virtual Sandbox Coming Soon",
    card_description:
      "Complete virtual validation environment for testing your builds before hardware arrives.",
    cta_label: "Join the Virtual Sandbox Waitlist",
    cta_href: "#",
    image: media(ASSETS.dev_sandbox_image),
    background: null,
  },

  modules: {
    heading: "From bench validation to volume production.",
    subtitle:
      "A seamless toolchain is useless if hardware can't integrate. Move from software validation to deployment instantly with our modular edge ecosystem.",
    modules: [
      {
        image: media(ASSETS.dev_module_dvk),
        title: "GPX Evaluation Kits (DVKs)",
        description:
          "Stop fighting with breakout boards. Our fully integrated Evaluation Kits come equipped with standard interfaces, allowing you to plug in your cameras, microphones, and industrial sensors out-of-the-box for immediate physical validation.",
        cta_label: "View Evaluation Kits",
        cta_href: "#",
      },
      {
        image: media(ASSETS.dev_module_som),
        title: "Production-Ready SOMs",
        description:
          "Skip the nightmare of custom RF and power routing. Drop our high-density System-on-Modules (SOMs) directly into your custom carrier boards. They're engineered for extreme space-constrained environments, radically accelerating your time-to-market.",
        cta_label: "View System-on-Modules",
        cta_href: "#",
      },
    ],
  },

  copilots: {
    heading: "Your deployment co-pilots.",
    subtitle:
      "A seamless toolchain is useless if hardware can't integrate. Move from software validation to deployment instantly with our modular edge ecosystem.",
    copilots: [
      {
        icon: media(ASSETS.dev_copilot_icon_1),
        title: "Exhaustive Documentation",
        description:
          "No disorganized wikis. Access the fully searchable ModelForge deployment guide, comprehensive DSP/Pre-processing C-libraries, and lower-level hardware API references.",
        cta_label: "Browse Developer Docs",
        cta_href: "#",
      },
      {
        icon: media(ASSETS.dev_copilot_icon_2),
        title: "10 Minutes to Mastery",
        description:
          "Get up and running visually. Access our self-serve library of YouTube masterclasses walking you step-by-step through everything from model porting to integrated compilation.",
        cta_label: "View Training Playlist",
        cta_href: "#",
      },
      {
        icon: media(ASSETS.dev_copilot_icon_3),
        title: "Your Technical Copilots",
        description:
          "Skip the generic help desk. Get direct, architectural-level support from our Field Application Engineers. We will handhold your team to help optimize your specific neural network and heterogeneous build.",
        cta_label: "Schedule Technical Consultation",
        cta_href: "#",
      },
    ],
  },

  seo: {
    meta_title: "Developer Platform | Ambient Scientific",
    meta_description:
      "ModelForge bridges training and deployment. Quantize, compile, and merge neural networks with your firmware.",
    keywords: "ModelForge SDK, edge AI SDK, Eclipse, TensorFlow, ONNX, developer hub, edge AI compiler",
    noindex: false,
    canonical_url: "/developer",
  },
};

const DVK_PAYLOAD = {
  hero: {
    title: "The physical launchpad for microwatt Edge AI.",
    subtitle:
      "Validate real-time AI at microwatt power levels out of the box. The Cranium Development Kit comes fully loaded with onboard sensors, rich I/O, and pre-integrated drivers so you can stop breadboarding and start testing inferences in minutes.",
    cta_label: "Request Evaluation Kit",
    background_image: media(ASSETS.dvk_hero_bg_2),
  },

  hardware_stack: {
    heading: "The complete Edge AI hardware stack in a single footprint",
    subtitle:
      "An exhaustive suite of sensors, interfaces, and debug tools pre-integrated with the GPX-10 Pro AI Processor.",
    label: "The Hardware Blueprint",
    board_image: media(ASSETS.dvk_board_main),
    chip_image: media(ASSETS.dvk_board_chip),
    spec_cards: [
      {
        title: "Memory",
        items: "64Mb Flash\nExternal Flash connection via SPI, QPI",
        is_accent: false,
      },
      {
        title: "Wireless",
        items: "UART-Based: Micro chip BLE",
        is_accent: false,
      },
      {
        title: "Sensors",
        items: "I²C-Based: MC3419, MXC6655\nADC-Based: Optical, Humidity, and Temperature Sensors\nI²S-Based: Microphone (Audio Pipeline)\nADC-Based: Microphone (Audio Pipeline)\nDVP-Based: Camera",
        is_accent: true,
      },
      {
        title: "Debug Ports",
        items: "20 Pin JTAG for debug\nUART-Based: TTL for debug prints\nGPIO-Based: LEDs",
        is_accent: false,
      },
      {
        title: "Interfaces",
        items: "SPI0\nSPI1\nI2C Master\nI2C Slave\nDVP Interface\nI2S\nADC\nUART\nQPI",
        is_accent: false,
      },
      {
        title: "MCU",
        items: "GPX10PRO",
        is_accent: false,
      },
      {
        title: "Booting",
        items: "Chip_ID Switches",
        is_accent: false,
      },
    ],
  },

  demos: {
    heading: "Pre-loaded demos. Instant AI validation.",
    subtitle:
      "Don't spend your first day writing sensor configuration code. The Cranium board comes ready to run out of the box, allowing you to instantly test physical AI models and validate performance on the metal with zero setup required.",
    demo_cards: [
      {
        title_line_1: "Voice-Based",
        title_line_2: "Keyword Spotting",
        description:
          "Utilize the onboard I2S and analog microphones to instantly test offline wake-word detection and voice commands in physically noisy environments.",
        image: media(ASSETS.dvk_demo_voice),
      },
      {
        title_line_1: "IMU-Based",
        title_line_2: "Fall Detection",
        description:
          "Leverage the integrated 3-axis digital accelerometer to run continuous, microwatt-level motion analysis and instant fall detection natively on the device.",
        image: media(ASSETS.dvk_demo_fall),
      },
      {
        title_line_1: "Vision-Based",
        title_line_2: "Gesture Recognition",
        description:
          "Route a camera feed through the dedicated connector to validate real-time spatial awareness and gesture recognition without relying on a cloud round-trip.",
        image: media(ASSETS.dvk_demo_fall),
      },
    ],
  },

  modelforge: {
    heading: "Powered by ModelForge.",
    subtitle:
      "Don't let software be the bottleneck. The Cranium DVK is fully supported by our unified software toolchain, designed to take you from a standard TensorFlow model to on-silicon inference in under 15 minutes.",
    card_glow_image: null,
    toolchain_labels: "RTOS\nDRIVERS\nCOMPILER",
    descriptions:
      "Your Model\nAutomated TFLite conversion &\nquantization\n\nModelForge SDK\nPre-integrated RTOS & Eclipse-based Unified Build\n\nCranium DVK\n15 minutes to on-silicon execution",
  },

  integrated_modules: {
    heading: "From Cranium to Integrated Modules.",
    subtitle:
      "The exact C-code, hardware configurations, and unified build you validate on the Cranium DVK ports directly to our production-ready System-on-Modules (SOMs).",
    cards: [
      {
        title: "Cranium DVK",
        description:
          "Validate your logic on the Cranium kit today with full debug capabilities and rich I/O.",
      },
      {
        title: "SOM Module",
        description:
          "Drop our high-density SOM directly into your product without rewriting your application software.",
      },
    ],
    primary_button: { label: "Explore SOMs", href: "/SOM", variant: "primary" },
    secondary_button: {
      label: "Schedule Technical Consultation",
      href: "/contact",
      variant: "secondary",
    },
  },

  seo: {
    meta_title: "Cranium Development Kit | Ambient Scientific",
    meta_description:
      "Validate real-time AI at microwatt power out of the box. The Cranium Development Kit comes fully loaded with sensors, rich I/O, and pre-integrated drivers.",
    keywords: "Cranium DVK, development kit, edge AI evaluation, GPX-10 Pro, sensors, JTAG",
    noindex: false,
    canonical_url: "/dvk",
  },
};

// Shared card set for every news filter pill. Each section will eventually
// hold its own cards; for now all three reuse the same existing articles.
const NEWS_CARDS = [
  {
    category: "Blog",
    title: "GP Singh interviewed by SemiWiki founder Daniel Nenni",
    title_font_size: 22,
    excerpt: "Our CEO discusses Ambient Scientific’s ultra low power edge AI, DigAn archi.... ",
    image_overlay: media(ASSETS.news_card_overlay_1),
  },
  {
    category: "PRODUCT UPDATE",
    title: "Beyond the Bit Episode 02 The Truth About India’s Chip Industry",
    title_font_size: 22,
    excerpt: "Episode 02 of Beyond the Bit is now live, featuring Saharsh Singhania an... ",
    image_overlay: media(ASSETS.news_card_overlay_2),
  },
  {
    category: "Press Release",
    title: "PyTorch vs TensorFlow for Production and Edge AI Deployment",
    title_font_size: 21,
    excerpt: "This article compares PyTorch and TensorFlow from a real-world de... ",
    image_overlay: media(ASSETS.news_card_overlay_3),
  },
  {
    category: "EVENT",
    title: "Breaking the Von Neumann Bottleneck Coin Cell AI at the Edge",
    title_font_size: 21,
    excerpt: "In this session, Ambient Scientific explores a new approach to edge AI by a... ",
    image_overlay: media(ASSETS.news_card_overlay_4),
  },
  {
    category: "Blog",
    title: "Ambient Scientific and Dimension NXG Introduce MAI",
    title_font_size: 22,
    excerpt: "Ambient Scientific, in collaboration with Dimension NXG, introduces MA... ",
    image_overlay: media(ASSETS.news_card_overlay_5),
  },
  {
    category: "WEBINAR",
    title: "Boot Blink and Believe Edge AI from Prototype to Production",
    title_font_size: 22,
    excerpt: "The recording of our webinar Boot Blink and Believe Edge AI from Prototy... ",
    image_overlay: media(ASSETS.news_card_overlay_6),
  },
];

const NEWS_LISTING_PAYLOAD = {
  hero: {
    tag: { text: "Product Launch" },
    title: "Re-architecting the Physics of AI Compute.",
    subtitle:
      "Standard chips waste time. Our architecture processes matrix math for high performance.",
    pagination_text: "NEXT 01/03",
    cta_label: "Read documentation",
    background_image: media(ASSETS.news_hero_bg),
  },

  press_kit: {
    heading: "Writing about Ambient?",
    subtitle:
      "Download official brand assets, executive bios, and high-resolution hardware photography.",
    menus: [
      { label: "Logos & Marks" },
      { label: "Executive Photos" },
      { label: "Product Renders" },
    ],
    cta_label: "Download Press Kit (.ZIP)",
    cta_file: null,
    file_info: "2.3 MB • Last updated May 2026",
    icon: media(ASSETS.news_press_icon),
  },

  grid: {
    filter_pills: [
      {
        label: "NEWS",
        category_id: "news",
        is_active: true,
        cards: NEWS_CARDS,
      },
      {
        label: "PRESS RELEASES",
        category_id: "press-releases",
        is_active: false,
        cards: NEWS_CARDS,
      },
      {
        label: "BLOGS & ARTICLES",
        category_id: "blogs",
        is_active: false,
        cards: NEWS_CARDS,
      },
    ],
    load_more_label: "Load More Resources",
    backdrop_image: media(ASSETS.news_backdrop),
  },

  seo: {
    meta_title: "News & Press | Ambient Scientific",
    meta_description:
      "The latest news, press releases, and articles from Ambient Scientific. Download the official press kit for brand assets and product renders.",
    keywords: "Ambient Scientific news, press releases, AI chips news, media, press kit",
    noindex: false,
    canonical_url: "/news-listing",
  },
};

const RESOURCES_PAYLOAD = {
  hero: {
    title: "Explore whitepapers, architectural deep-dives, and performance data",
    search_placeholder: "Search architecture, case studies, or GPX metrics...",
    search_button_label: "Search",
    contact_link_text: "Contact Us",
    contact_link_href: "/contact",
    title_frame: null,
    background_image: media(ASSETS.res_hero_image),
  },

  featured: {
    heading: "Featured Resources",
    cards: [
      {
        image: media(ASSETS.res_featured_1),
        badge_label: "WHITEPAPER",
        badge_variant: "white",
        title: "Re-architecting the Physics of AI Compute.",
        description:
          "Standard chips waste time translating AI workloads. Our architecture processes matrix math natively for high-density performance.",
        cta_label: "Download PDF",
        cta_href: "#",
      },
      {
        image: media(ASSETS.res_featured_2),
        badge_label: "WHITEPAPER",
        badge_variant: "white",
        title: "Re-architecting the Physics of AI Compute.",
        description:
          "Standard chips waste time translating AI workloads. Our architecture processes matrix math natively for high-density performance.",
        cta_label: "Download PDF",
        cta_href: "#",
      },
      {
        image: media(ASSETS.res_featured_3),
        badge_label: "WHITEPAPER",
        badge_variant: "stacked",
        title: "Re-architecting the Physics of AI Compute.",
        description:
          "Standard chips waste time translating AI workloads. Our architecture processes matrix math natively for high-density performance.",
        cta_label: "Download PDF",
        cta_href: "#",
      },
    ],
  },

  building: {
    heading: "Building with Ambient?",
    subtitle:
      "Access the ModelForge SDK, API references, model compilation guides, and hardware documentation.",
    cta_label: "Go to Developer Hub",
    cta_href: "/developer",
    background: null,
    title_frame: null,
  },

  content: {
    categories: [
      { category_id: "case-studies", label: "CASE STUDIES", is_active: false },
      { category_id: "videos", label: "VIDEOS", is_active: false },
      { category_id: "webinar", label: "WEBINAR & PODCASTS", is_active: true },
      { category_id: "press", label: "PRESS RELEASES", is_active: false },
      { category_id: "blogs", label: "BLOGS & ARTICLES", is_active: false },
    ],
    initial_visible: 6,
    load_more_count: 3,
    load_more_label: "Load More Resources",
    background_image: null,
  },

  news_cta: {
    heading: "Looking for latest developments, events, and announcements?",
    cta_label: "Visit News Page",
    cta_href: "/news-listing",
    texture: null,
  },

  seo: {
    meta_title: "Resources | Ambient Scientific",
    meta_description:
      "Explore whitepapers, architectural deep-dives, case studies, and performance data from Ambient Scientific.",
    keywords: "whitepapers, case studies, webinars, edge AI, GPX, A-Cube, ModelForge documentation",
    noindex: false,
    canonical_url: "/resources",
  },
};

const SOM_PAYLOAD = {
  hero: {
    title: "The shortest path to volume production.",
    subtitle:
      "Avoid custom RF and power management. Use our pre-engineered System-on-Modules (SOMs) for your edge AI deployments.",
    primary_button: { label: "Pre-Order / Register Interest", href: "/contact", variant: "primary" },
    secondary_button: { label: "Talk to the Sales Team", href: "/contact", variant: "secondary" },
  },

  features: {
    heading: "Stop Routing. Start Shipping.",
    subtitle:
      "Spinning a custom PCB with extreme space and power constraints takes months of trial and error. We solved the hardware physics so you can focus entirely on your application logic.",
    cards: [
      {
        icon: media(ASSETS.som_icon_card_1),
        tag: "PRE-ENGINEERED HARDWARE",
        title: "Microwatt AI in a Micro Footprint",
        description:
          "We pre-routed the GPX10 AI processor and wireless stacks into high-density footprints. Skip RF certification nightmares and achieve scale.",
      },
      {
        icon: media(ASSETS.som_icon_card_2),
        tag: "Vertical-Specific Integration",
        title: "Purpose-Built Peripherals",
        description:
          "Simplify sourcing and driver integration. Each SOM is pre-integrated with the sensors and interfaces your vertical needs—vision, telemetry, or acoustics.",
      },
      {
        icon: media(ASSETS.som_icon_card_3),
        tag: "Ecosystem Portability",
        title: "1:1 Code Portability",
        description:
          "The exact C-code, AI object files, and unified Eclipse build you validated on the Cranium Evaluation Kit ports directly to any of our production SOMs with zero rewrites.",
      },
    ],
  },

  ecosystem: {
    heading: "The Ambient SOM Ecosystem",
    subtitle:
      "Purpose-built edge modules. Validate your software on our evaluation kits today, and drop our SOMs directly into your final product tomorrow.",
    cards: [
      {
        title: "Motion SOM",
        subtitle: "Motion & Audio",
        status: "Available",
        cta_label: "VIEW MORE",
      },
      {
        title: "Vision SOM",
        subtitle: "Motion & Audio",
        status: "Under-development",
        cta_label: "Coming soon",
      },
      {
        title: "Sound SOM",
        subtitle: "Motion & Audio",
        status: "Under-development",
        cta_label: "Coming soon",
      },
      {
        title: "Predictive & Maintenance SOM",
        subtitle: "Motion & Audio",
        status: "Under-development",
        cta_label: "Coming soon",
      },
      {
        title: "Pet & Livestock SOM",
        subtitle: "Motion & Audio",
        status: "Under-development",
        cta_label: "Coming soon",
      },
    ],
  },

  inside_module: {
    heading: "Inside the Sparsh AI Module",
    subtitle:
      "Bridge the lab and real world. The Sparsh module offers continuous, microwatt intelligence in a 21×21mm size, with a breakout board that snaps off for production.",
    label: "The Hardware Blueprint",
    image: media(ASSETS.som_module_photo),
    specs: [
      { label: "Footprint", value: "21×21mm (Core) | 42×21mm (With Breakout)" },
      { label: "Power", value: "Optimized for months of inference on a CR2032 coin-cell." },
      { label: "Sensors", value: "Integrated 6-axis IMU & Digital Mic" },
      { label: "Comms & I/O", value: "Onboard BLE, SPI, I2C, and UART interfaces" },
    ],
  },

  prototype: {
    heading: "Prototype to Product in a Snap",
    cards: [
      {
        title: "The Lab",
        description:
          "Use the integrated breakout board for rapid prototyping. It includes a USB-C port for charging, a 10-pin JTAG connector, programmable LEDs, and headers for easy signal probing and power analysis.",
      },
      {
        title: "Production-Ready SOMs",
        description:
          "Once your software is validated, simply snap off the breakout half. The remaining 21×21mm core module embeds directly into your space-constrained product with zero hardware redesign required.",
      },
    ],
  },

  intelligence: {
    heading: "Out-of-the-Box Intelligence",
    subtitle:
      "A seamless toolchain is useless if hardware can't integrate. Move from software validation to deployment instantly with our modular edge ecosystem.",
    cta_label: "Download Motion SOM Brief",
    cards: [
      {
        title: "Motion & Fall Detection",
        description:
          "Leverage the 6-axis IMU for microwatt-level continuous activity recognition and instant fall detection.",
      },
      {
        title: "Voice Identity & Commands",
        description:
          "Run continuous wake-word and secure voice authentication locally via the Knowles digital mic.",
      },
      {
        title: "Acoustic Anomalies",
        description:
          "Deploy models for health monitoring (like asthma/cough detection) or security (assault detection) entirely on-device, preserving user privacy.",
      },
      {
        title: "Safety & Geofencing",
        description:
          "Utilize the onboard BLE and processing technology to trigger instant localized alerts when boundaries are breached.",
      },
    ],
  },

  ready_to_deploy: {
    heading: "Ready to deploy?",
    subtitle:
      "Start building with the Sparsh module today, or secure your place in line for our upcoming vertical-specific SOMs.",
    primary_title: "Get the Sparsh\nAI Module",
    primary_cta_label: "Request Sparsh Module",
    secondary_text: "Start testing motion and audio models on the metal immediately.",
    image: media(ASSETS.som_ready_image),
  },

  footer_merge: {
    heading: "Join the SOM Waitlist",
    subtitle:
      "Be the first to access our upcoming Vision, Sound, and Industrial modules.",
    cta_label: "Join the Waitlist",
  },

  seo: {
    meta_title: "System-on-Modules (SOM) | Ambient Scientific",
    meta_description:
      "Avoid custom RF and power management. Use our pre-engineered System-on-Modules (SOMs) for your edge AI deployments.",
    keywords:
      "SOM, system on module, Sparsh, edge AI module, production-ready, BLE, GPX10, microwatt AI",
    noindex: false,
    canonical_url: "/SOM",
  },
};

const WEARABLES_PAYLOAD = {
  hero: {
    title: "Clinical precision. Coin-cell power.",
    subtitle:
      "Hospital-grade biometric tracking and voice processing directly to the ring, wrist, or lens. No cloud latency or battery compromise.",
    watermark: "Wearables",
    primary_button: { label: "Talk About Your Roadmap", href: "/contact", variant: "primary" },
    secondary_button: { label: "Talk a Hardware Engineer.", href: "/contact", variant: "secondary" },
    background_image_1: media(ASSETS.wbl_hero_bg_1),
    background_image_2: media(ASSETS.wbl_hero_bg_2),
    title_frame: null,
  },

  carousel: {
    images: mediaArr(
      ASSETS.wbl_marquee_1,
      ASSETS.wbl_marquee_2,
      ASSETS.wbl_marquee_3,
      ASSETS.wbl_marquee_4,
      ASSETS.wbl_marquee_5,
      ASSETS.wbl_marquee_6,
      ASSETS.wbl_marquee_7
    ),
  },

  paradigm: {
    heading: "The Paradigm Shift",
    subtitle:
      "Bridge the lab and real world. The Sparsh module offers continuous, microwatt intelligence in a 21×21mm size, with a breakout board that snaps off for production.",
    chip_label: "Development",
    cards: [
      {
        title: "The Legacy Way",
        body:
          "Wake word triggers → transmit raw audio/vitals to cloud → process → return result.",
      },
      {
        title: "The Ambient Way",
        body:
          "Continuous raw data ingested → processed locally via Ambient AI → actionable insight generated instantly.",
      },
    ],
  },

  subconscious: {
    heading: "Continuous AI-native operations in subconscious mode",
    subtitle:
      "We eliminate the Von Neumann bottleneck by computing AI within the analog memory array. The GPX architecture allows continuous inference without waking the host processor.",
    card_title: "The Hardware Blueprint",
    card_image: media(ASSETS.wbl_hardware_blueprint),
    overlay_text: "Zzzz..",
    right_cards: [
      {
        title: "The Sleeping Host",
        description:
          "The host processor remains in deep sleep while the Ambient AI engine handles continuous real-time processing. No wake events. No interrupts. No battery drain.",
      },
      {
        title: "Continuous Sensing",
        description:
          "ECG, motion sensors, and audio streams flow directly into the analog compute array. Raw data is processed at the source — no buffering, no transmission overhead.",
      },
      {
        title: "Microwatt AI",
        description:
          "Live AI processing indicators, telemetry, and µW power consumption prove what was thought impossible: hospital-grade intelligence running on coin-cell power.",
      },
    ],
  },

  empirical_proof: {
    heading: "The Empirical Proof",
    subtitle:
      "Don't spend your first day writing sensor configuration code. The Cranium board comes ready to run out of the box, allowing you to instantly test physical AI models and validate performance on the metal with zero setup required.",
    health_card: {
      badge: "The Workload",
      title: "Health Monitoring Solutions",
      body:
        "Continuous, on-device assault detection and biomarker analysis for early onset predictions for PCOD/PCOS to enable 24/7 women health and safety",
      cta_label: "Download Case Study",
      footer: "Up to 2 weeks of continuous tracking with on-device AI.",
    },
    power_card: {
      badge: "Power Consumption",
      panels: [
        { label: "Ambient", value: "<1mW", description: "Lower energy usage" },
        { label: "Legacy", value: "10mW", description: "Higher energy usage" },
      ],
    },
    workload_card: {
      stat: "100%",
      label: "On-device",
      description: "No cloud dependency",
    },
    ecg_cards: [
      { stat: "99.7%", label: "clinical graded" },
      { stat: "99.7%", label: "clinical graded" },
      { stat: "99.7%", label: "clinical graded" },
      { stat: "99.7%", label: "clinical graded" },
    ],
  },

  lab_to_product: {
    heading: "From lab to product in months, not years.",
    subtitle:
      "Don't spend your first day writing sensor configuration code. The Cranium board comes ready to run out of the box, allowing you to instantly test physical AI models and validate performance on the metal with zero setup required.",
    image: media(ASSETS.wbl_lab_image),
    cards: [
      {
        step: "01",
        description:
          "Test your TensorFlow/PyTorch models on our GPX Evaluation Kits using standard I2S, I2C, SPI sensor inputs.",
        cta_label: "View Evaluation Kits",
        cta_href: "#",
      },
      {
        step: "02",
        description:
          "Use the ModelForge SDK to seamlessly quantize and compile your models for ultra-low-power analog execution.",
        cta_label: "Visit Developer Hub",
        cta_href: "#",
      },
      {
        step: "03",
        description:
          "Drop our integrated System-on-Modules (SOMs) directly into your most constrained custom carrier boards.",
        cta_label: "View SoMs",
        cta_href: "#",
      },
    ],
  },

  footer_accent: {
    panels: [
      {
        title: "Discuss Your Product Roadmap",
        body:
          "Explore how Ambient AI can unlock new capabilities in your wearable product. Strategic planning session with our applications team.",
        cta_label: "Schedule Strategy Call",
      },
      {
        title: "Talk to a Hardware Engineer",
        body:
          "Be the first to access our upcoming Vision, Sound, and Industrial modules.",
        cta_label: "Schedule Technical Review",
      },
    ],
    divider_shape: null,
  },

  seo: {
    meta_title: "Wearables | Ambient Scientific",
    meta_description:
      "Hospital-grade biometric tracking and voice processing directly to the ring, wrist, or lens. No cloud latency or battery compromise.",
    keywords:
      "wearables, smart ring, smartwatch, ECG, voice AI, biomarker tracking, coin-cell AI, hospital-grade wearables",
    noindex: false,
    canonical_url: "/applications/wearables",
  },
};

const PAGES = [
  { apiId: "applications-page", name: "Applications", payload: APPLICATIONS_PAYLOAD },
  { apiId: "developer-page", name: "Developer", payload: DEVELOPER_PAYLOAD },
  { apiId: "dvk-page", name: "DVK", payload: DVK_PAYLOAD },
  { apiId: "news-listing-page", name: "News Listing", payload: NEWS_LISTING_PAYLOAD },
  { apiId: "resources-page", name: "Resources", payload: RESOURCES_PAYLOAD },
  { apiId: "som-page", name: "SOM", payload: SOM_PAYLOAD },
  { apiId: "wearables-page", name: "Wearables", payload: WEARABLES_PAYLOAD },
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
    const pageSlug = page.name.toLowerCase().replace(/\s+/g, "-");
    if (
      ONLY_FILTER &&
      pageSlug !== ONLY_FILTER &&
      page.apiId !== ONLY_FILTER &&
      page.apiId !== `${ONLY_FILTER}-page`
    ) {
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
