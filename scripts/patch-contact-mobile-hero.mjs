/**
 * patch-contact-mobile-hero.mjs
 * ---------------------------------------------------------------------------
 * One-shot patcher: re-link contact-page.hero.mobile_background_image.
 *
 * Background
 *   The canonical seed (seed-strapi-pages.mjs) doesn't include this field, so
 *   every time it runs, the previously-manually-uploaded mobile hero (Strapi
 *   file id 179 — a 393x518 cropped version of hand.png) gets unlinked. The
 *   file itself still exists in Strapi's media library; we just need to
 *   re-attach it.
 *
 * Strategy
 *   1. Deep-GET current published payload (so every other field round-trips).
 *   2. Normalize: strip meta + convert media → ids.
 *   3. Force hero.mobile_background_image = 179.
 *   4. PUT draft + published.
 */

import { readFile } from "node:fs/promises";
import { join, normalize as pathNormalize } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = pathNormalize(join(__dirname, ".."));

try { process.loadEnvFile(join(REPO_ROOT, ".env")); } catch {}

const STRAPI_URL = (process.env.STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";

if (!STRAPI_TOKEN) {
  console.error("[fatal] STRAPI_TOKEN env var is required.");
  process.exit(1);
}

const MOBILE_HERO_FILE_ID = 179;

async function sf(path, init = {}) {
  const u = path.startsWith("http") ? path : `${STRAPI_URL}${path}`;
  const h = { Authorization: `Bearer ${STRAPI_TOKEN}`, ...(init.headers || {}) };
  const r = await fetch(u, { ...init, headers: h });
  const t = await r.text();
  let b = null;
  try { b = t ? JSON.parse(t) : null; } catch { b = t; }
  return { ok: r.ok, status: r.status, body: b };
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

async function main() {
  console.log(`Strapi : ${STRAPI_URL}`);
  console.log(`Token  : ****${STRAPI_TOKEN.slice(-4)}\n`);

  // Verify file 179 exists.
  const fileRes = await sf(`/api/upload/files/${MOBILE_HERO_FILE_ID}`);
  if (!fileRes.ok) {
    console.error(`[fatal] mobile hero file id ${MOBILE_HERO_FILE_ID} not found in Strapi.`);
    console.error("        Re-upload /public/contact/hand.png (mobile crop) manually first.");
    process.exit(1);
  }
  console.log(`[ok] mobile hero file: ${fileRes.body.url}`);

  // Deep-GET current published contact-page so all fields round-trip.
  const parts = [
    `status=published`,
    `populate[hero][populate]=*`,
    `populate[map][populate][locations][populate]=*`,
    `populate[schedule][populate][cards][populate]=*`,
    `populate[schedule][populate][icon]=true`,
    `populate[map][populate][globe_image]=true`,
    `populate[map][populate][map_base]=true`,
    `populate[form][populate][tracks][populate][icon]=true`,
    `populate[form][populate][tracks][populate][form][populate]=*`,
    `populate[resources][populate][ctas][populate]=*`,
  ];
  const getRes = await sf(`/api/contact-page?${parts.join("&")}`);
  if (!getRes.ok) {
    console.error(`[fail] GET (${getRes.status}): ${JSON.stringify(getRes.body).slice(0, 400)}`);
    process.exit(1);
  }
  const page = getRes.body?.data;
  if (!page) {
    console.error("[fail] no published data");
    process.exit(1);
  }
  console.log("[ok] fetched current contact-page");

  const payload = normalize(page);
  payload.hero.mobile_background_image = MOBILE_HERO_FILE_ID;

  for (const draft of [false, true]) {
    const path = `/api/contact-page${draft ? "?status=published" : ""}`;
    console.log(`PUT ${path}`);
    const r = await sf(path, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: payload }),
    });
    if (!r.ok) {
      console.error(`  [fail] PUT (${r.status}): ${JSON.stringify(r.body).slice(0, 600)}`);
      process.exit(1);
    }
    console.log(`  [ok] ${draft ? "published" : "draft"}`);
  }

  console.log("\nDone. (Strapi v5 publishes asynchronously — wait ~5s before verifying.)");
}

main().catch((e) => { console.error(e.message); process.exit(1); });
