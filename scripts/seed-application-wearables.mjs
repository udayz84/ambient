/**
 * seed-application-wearables.mjs
 * ----------------------------------------------------------------------------
 * Seeds the "wearables" application page into the new application-pages collection type.
 * ----------------------------------------------------------------------------
 */

import { createHash } from "node:crypto";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { basename, extname, join, normalize, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = normalize(join(__dirname, ".."));
const PUBLIC_DIR = join(REPO_ROOT, "public");

try {
  process.loadEnvFile(join(REPO_ROOT, ".env"));
} catch {}

const STRAPI_URL = (process.env.STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";
const CACHE_FILE = join(__dirname, ".strapi-upload-cache.json");

if (!STRAPI_TOKEN) {
  console.error("[fatal] STRAPI_TOKEN env var is required");
  process.exit(1);
}

const MIME = {
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".gif": "image/gif", ".webp": "image/webp", ".svg": "image/svg+xml",
  ".mp4": "video/mp4", ".webm": "video/webm", ".pdf": "application/pdf",
};

async function sha1OfFile(absolutePath) {
  const buf = await readFile(absolutePath);
  return createHash("sha1").update(buf).digest("hex");
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function strapiFetch(pathname, init = {}) {
  const url = pathname.startsWith("http") ? pathname : `${STRAPI_URL}${pathname}`;
  const headers = {
    Authorization: `Bearer ${STRAPI_TOKEN}`,
    ...(init.headers || {}),
  };
  const res = await fetch(url, { ...init, headers });
  const text = await res.text();
  let body = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  return { ok: res.ok, status: res.status, body };
}

async function uploadFile(absolutePath) {
  const buffer = await readFile(absolutePath);
  const ext = extname(absolutePath).toLowerCase();
  const mime = MIME[ext] || "application/octet-stream";

  const form = new FormData();
  form.append("files", new Blob([buffer], { type: mime }), basename(absolutePath));

  const res = await strapiFetch("/api/upload", { method: "POST", body: form });
  if (!res.ok) throw new Error(`Upload failed for ${absolutePath} (${res.status}): ${JSON.stringify(res.body)}`);
  const arr = Array.isArray(res.body) ? res.body : [res.body];
  if (!arr.length) throw new Error(`Empty upload response`);
  return arr[0];
}

async function loadCache() {
  try { return JSON.parse(await readFile(CACHE_FILE, "utf8")); } catch { return {}; }
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
  if (ctx.cache[hash]) return ctx.cache[hash].id;
  
  console.log(`  [upload] ${relPath}`);
  const file = await uploadFile(abs);
  ctx.cache[hash] = {
    id: file.id, documentId: file.documentId, url: file.url,
    name: file.name, sourcePath: relPath,
  };
  await saveCache(ctx.cache);
  await delay(20);
  return file.id;
}

function media(relPath) { return { __media: relPath }; }
function mediaArr(...paths) { return { __mediaArr: paths }; }

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
    if (Object.prototype.hasOwnProperty.call(node, "__media")) return await resolveAsset(node.__media, ctx);
    if (Object.prototype.hasOwnProperty.call(node, "__mediaArr")) {
      const ids = [];
      for (const p of node.__mediaArr) {
        const id = await resolveAsset(p, ctx);
        if (id !== null) ids.push(id);
      }
      return ids;
    }
    const out = {};
    for (const [k, v] of Object.entries(node)) out[k] = await hydrate(v, ctx);
    return out;
  }
  return node;
}

const ASSETS = {
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

const WEARABLES_PAYLOAD = {
  slug: "wearables",
  hero: {
    title: "Clinical precision. Coin-cell power.",
    subtitle: "Hospital-grade biometric tracking and voice processing directly to the ring, wrist, or lens. No cloud latency or battery compromise.",
    watermark: "Wearables",
    primary_button: { label: "Talk About Your Roadmap", href: "/contact", variant: "primary" },
    secondary_button: { label: "Talk a Hardware Engineer.", href: "/contact", variant: "secondary" },
    background_image_1: media(ASSETS.wbl_hero_bg_1),
    background_image_2: media(ASSETS.wbl_hero_bg_2),
    title_frame: null,
  },
  carousel: {
    images: mediaArr(ASSETS.wbl_marquee_1, ASSETS.wbl_marquee_2, ASSETS.wbl_marquee_3, ASSETS.wbl_marquee_4, ASSETS.wbl_marquee_5, ASSETS.wbl_marquee_6, ASSETS.wbl_marquee_7),
  },
  paradigm: {
    heading: "The Paradigm Shift",
    subtitle: "Bridge the lab and real world. The Sparsh module offers continuous, microwatt intelligence in a 21×21mm size, with a breakout board that snaps off for production.",
    chip_label: "Development",
    cards: [
      { title: "The Legacy Way", body: "Wake word triggers → transmit raw audio/vitals to cloud → process → return result." },
      { title: "The Ambient Way", body: "Continuous raw data ingested → processed locally via Ambient AI → actionable insight generated instantly." },
    ],
  },
  subconscious: {
    heading: "Continuous AI-native operations in subconscious mode",
    subtitle: "We eliminate the Von Neumann bottleneck by computing AI within the analog memory array. The GPX architecture allows continuous inference without waking the host processor.",
    card_title: "The Hardware Blueprint",
    card_image: media(ASSETS.wbl_hardware_blueprint),
    overlay_text: "Zzzz..",
    right_cards: [
      { title: "The Sleeping Host", description: "The host processor remains in deep sleep while the Ambient AI engine handles continuous real-time processing. No wake events. No interrupts. No battery drain." },
      { title: "Continuous Sensing", description: "ECG, motion sensors, and audio streams flow directly into the analog compute array. Raw data is processed at the source — no buffering, no transmission overhead." },
      { title: "Microwatt AI", description: "Live AI processing indicators, telemetry, and µW power consumption prove what was thought impossible: hospital-grade intelligence running on coin-cell power." },
    ],
  },
  empirical_proof: {
    heading: "The Empirical Proof",
    subtitle: "Don't spend your first day writing sensor configuration code. The Cranium board comes ready to run out of the box, allowing you to instantly test physical AI models and validate performance on the metal with zero setup required.",
    health_card: {
      badge: "The Workload",
      title: "Health Monitoring Solutions",
      body: "Continuous, on-device assault detection and biomarker analysis for early onset predictions for PCOD/PCOS to enable 24/7 women health and safety",
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
      stat: "100%", label: "On-device", description: "No cloud dependency",
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
    subtitle: "Don't spend your first day writing sensor configuration code. The Cranium board comes ready to run out of the box, allowing you to instantly test physical AI models and validate performance on the metal with zero setup required.",
    image: media(ASSETS.wbl_lab_image),
    cards: [
      { step: "01", description: "Test your TensorFlow/PyTorch models on our GPX Evaluation Kits using standard I2S, I2C, SPI sensor inputs.", cta_label: "View Evaluation Kits", cta_href: "#" },
      { step: "02", description: "Use the ModelForge SDK to seamlessly quantize and compile your models for ultra-low-power analog execution.", cta_label: "Visit Developer Hub", cta_href: "#" },
      { step: "03", description: "Drop our integrated System-on-Modules (SOMs) directly into your most constrained custom carrier boards.", cta_label: "View SoMs", cta_href: "#" },
    ],
  },
  footer_accent: {
    panels: [
      { title: "Discuss Your Product Roadmap", body: "Explore how Ambient AI can unlock new capabilities in your wearable product. Strategic planning session with our applications team.", cta_label: "Schedule Strategy Call" },
      { title: "Talk to a Hardware Engineer", body: "Be the first to access our upcoming Vision, Sound, and Industrial modules.", cta_label: "Schedule Technical Review" },
    ],
    divider_shape: null,
  },
  seo: {
    meta_title: "Wearables | Ambient Scientific",
    meta_description: "Hospital-grade biometric tracking and voice processing directly to the ring, wrist, or lens. No cloud latency or battery compromise.",
    keywords: "wearables, smart ring, smartwatch, ECG, voice AI, biomarker tracking, coin-cell AI, hospital-grade wearables",
    noindex: false,
    canonical_url: "/applications/wearables",
  },
};

async function main() {
  const ctx = { cache: await loadCache() };
  console.log(`Seeding Wearables Application Page...`);
  
  const hydrated = await hydrate(WEARABLES_PAYLOAD, ctx);
  
  // Create (POST to collection)
  const upd = await strapiFetch(`/api/application-pages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: hydrated }),
  });
  
  if (!upd.ok) {
    console.error(`[error] POST /api/application-pages failed:`, upd.body);
    process.exit(1);
  }
  
  // Publish
  const docId = upd.body.data.documentId;
  if (!docId) {
    console.warn("Could not find documentId in response.");
    process.exit(0);
  }

  const pub = await strapiFetch(`/api/application-pages/${docId}?status=published`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: hydrated }),
  });
  
  if (!pub.ok) {
    console.warn(`[warn] Publish step failed:`, pub.body);
  } else {
    console.log(`Successfully seeded and published Wearables Application Page!`);
  }
}

main().catch(console.error);
