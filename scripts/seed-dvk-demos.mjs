/**
 * seed-dvk-demos.mjs
 * ----------------------------------------------------------------------------
 * Pushes the demos section (Figma 2761:2791 + 4022:2671) to the dvk-page
 * single type:
 *
 *   - uploads the demo card illustrations (public/dvk/demo-voice.webp,
 *     demo-fall.webp) and links them to their demo_cards
 *   - replaces demo_cards with the designed 3 cards (Voice / IMU / Vision) —
 *     drops any stray placeholder cards
 *   - fills phone_card (Figma 5212:6941 — "Flash demos from your phone." with
 *     the ApplicationForge + Model Zoo CTAs)
 *
 * heading / subtitle are preserved from the current entry.
 *
 * Usage
 *   STRAPI_TOKEN=... node scripts/seed-dvk-demos.mjs                # upload + PUT + publish
 *   STRAPI_TOKEN=... node scripts/seed-dvk-demos.mjs --skip-upload  # reuse cached file ids
 *   STRAPI_TOKEN=... node scripts/seed-dvk-demos.mjs --dry-run      # no PUT
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
  // env vars already set in shell, or no .env — continue.
}

// ---------------------------------------------------------------------------
// CONFIG
// ---------------------------------------------------------------------------

const STRAPI_URL = (
  process.env.STRAPI_URL || "http://localhost:1338"
).replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";
const CACHE_FILE = join(__dirname, ".strapi-upload-cache.json");

const argv = new Set(process.argv.slice(2));
const SKIP_UPLOAD = argv.has("--skip-upload");
const DRY_RUN = argv.has("--dry-run");

/** Card 3 reuses the fall illustration (vision webp composites over it in code). */
const DEMO_ASSETS = {
  voice: "dvk/demo-voice.webp",
  fall: "dvk/demo-fall.webp",
};

/** Figma 2761:2799 / 2809 / 2819 — the three demo cards. */
const DEMO_CARDS = [
  {
    title_line_1: "Voice-Based",
    title_line_2: "Keyword Spotting",
    description:
      "Utilize the onboard I2S and analog microphones to instantly test offline wake-word detection and voice commands in physically noisy environments.",
    asset: "voice",
    alt: "Voice-based keyword spotting illustration",
  },
  {
    title_line_1: "IMU-Based",
    title_line_2: "Fall Detection",
    description:
      "Leverage the integrated 3-axis digital accelerometer to run continuous, microwatt-level motion analysis and instant fall detection natively on the device.",
    asset: "fall",
    alt: "IMU-based fall detection illustration",
  },
  {
    title_line_1: "Vision-Based",
    title_line_2: "Gesture Recognition",
    description:
      "Route a camera feed through the dedicated connector to validate real-time spatial awareness and gesture recognition without relying on a cloud round-trip.",
    asset: "fall",
    alt: "Vision-based gesture recognition illustration",
  },
];

/** Figma 5212:6941 — the phone/CTA card. */
const PHONE_CARD = {
  title: "Flash demos from your phone.",
  description:
    "Pair the Cranium kit with the ApplicationForge app over Bluetooth, push any demo to the board, and watch results live — including the gesture-controlled game.",
  primary_cta_label: "Get the ApplicationForge App",
  primary_cta_href: "#",
  secondary_cta_label: "Browse the Model Zoo",
  secondary_cta_href: "/model-zoo",
};

const MIME = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

if (!STRAPI_TOKEN && !DRY_RUN) {
  console.error(
    "[fatal] STRAPI_TOKEN env var is required (create a Full access token in Strapi admin)."
  );
  process.exit(1);
}

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------

async function sha1OfFile(absolutePath) {
  const buf = await readFile(absolutePath);
  return createHash("sha1").update(buf).digest("hex");
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function strapiFetch(pathname, init = {}, attempt = 1) {
  const url = pathname.startsWith("http")
    ? pathname
    : `${STRAPI_URL}${pathname}`;
  const headers = {
    Authorization: `Bearer ${STRAPI_TOKEN}`,
    ...(init.headers || {}),
  };
  let res;
  try {
    res = await fetch(url, { ...init, headers });
  } catch (err) {
    // undici against the busy dev server drops keep-alive connections
    // occasionally — retry with a fresh connection.
    if (attempt < 4) {
      await delay(500 * attempt);
      return strapiFetch(pathname, init, attempt + 1);
    }
    throw err;
  }
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

/** Upload (or reuse cached) asset and return its Strapi file id. */
async function resolveAsset(relPath, cache) {
  const abs = join(PUBLIC_DIR, relPath);
  if (!existsSync(abs)) {
    throw new Error(`Asset not found: ${relPath} (expected at ${abs})`);
  }
  const hash = await sha1OfFile(abs);
  if (cache[hash]) {
    console.log(`  [cache-hit] ${relPath} -> file id ${cache[hash].id}`);
    return cache[hash].id;
  }
  if (SKIP_UPLOAD) {
    throw new Error(
      `--skip-upload set but no cached asset for ${relPath}; remove the flag.`
    );
  }
  console.log(`  [upload] ${relPath}`);
  const file = await uploadFile(abs);
  cache[hash] = {
    id: file.id,
    documentId: file.documentId,
    url: file.url,
    name: file.name,
    sourcePath: relPath,
  };
  await saveCache(cache);
  await delay(20);
  console.log(`  [uploaded] ${relPath} -> file id ${file.id} (${file.url})`);
  return file.id;
}

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------

async function main() {
  console.log(`Strapi:   ${STRAPI_URL}`);
  console.log(`Dry run:  ${DRY_RUN}`);
  console.log("");

  const cache = await loadCache();
  const fileIds = {};
  for (const [key, rel] of Object.entries(DEMO_ASSETS)) {
    fileIds[key] = await resolveAsset(rel, cache);
  }

  // Strapi's REST API REPLACES a component field on PUT, so a partial demos
  // object would null out heading/subtitle. Fetch the current component first
  // and merge the new demo_cards + phone_card into it.
  console.log("\nGET /api/dvk-page  (read current demos)");
  const cur = await strapiFetch("/api/dvk-page?populate[demos][populate]=*");
  if (!cur.ok) {
    throw new Error(
      `GET /api/dvk-page failed (${cur.status}): ${JSON.stringify(cur.body)}`
    );
  }
  const curDemos = (cur.body && cur.body.data && cur.body.data.demos) || {};
  const demos = {
    heading: curDemos.heading || "Pre-loaded demos. Instant AI validation.",
    subtitle:
      curDemos.subtitle ||
      "Don't spend your first day writing sensor configuration code. The Cranium board comes ready to run out of the box, allowing you to instantly test physical AI models and validate performance on the metal with zero setup required.",
    demo_cards: DEMO_CARDS.map((c) => ({
      title_line_1: c.title_line_1,
      title_line_2: c.title_line_2,
      description: c.description,
      image: fileIds[c.asset],
      alt: c.alt,
    })),
    phone_card: PHONE_CARD,
  };
  console.log("  demos.heading:", JSON.stringify(demos.heading));
  console.log("  demo_cards replaced:", demos.demo_cards.length, "cards");
  console.log("  phone_card.title:", JSON.stringify(demos.phone_card.title));

  if (DRY_RUN) {
    console.log(`\n[dry-run] would PUT /api/dvk-page with demos`);
    return;
  }

  console.log("\nPUT /api/dvk-page  (demos)");
  const upd = await strapiFetch("/api/dvk-page", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: { demos } }),
  });
  if (!upd.ok) {
    throw new Error(
      `PUT /api/dvk-page failed (${upd.status}): ${JSON.stringify(upd.body)}`
    );
  }
  console.log("  updated (draft).");

  console.log("PUT /api/dvk-page?status=published  (publish)");
  const pub = await strapiFetch("/api/dvk-page?status=published", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: { demos } }),
  });
  if (!pub.ok) {
    console.warn(
      `  [warn] publish step returned ${pub.status}: ${JSON.stringify(pub.body)}`
    );
  } else {
    console.log("  published.");
  }

  console.log(
    `\nDone. dvk-page demos: ${demos.demo_cards.length} demo cards + phone_card`
  );
}

main().catch((err) => {
  console.error("\n[fatal]", err.message);
  process.exit(1);
});
