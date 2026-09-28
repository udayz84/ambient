/**
 * seed-dvk-prototype.mjs
 * ----------------------------------------------------------------------------
 * Seeds the Prototype section in the dvk-page.
 * Uploads local images to Strapi and populates the text content.
 * ----------------------------------------------------------------------------
 */

import { fileURLToPath } from "node:url";
import { dirname, join, normalize, basename } from "node:path";
import fs from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = normalize(join(__dirname, ".."));

try {
  process.loadEnvFile(join(REPO_ROOT, ".env"));
} catch {}

const STRAPI_URL = (
  process.env.STRAPI_URL || "http://localhost:1338"
).replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";

if (!STRAPI_TOKEN) {
  console.error("[fatal] STRAPI_TOKEN env var is required.");
  process.exit(1);
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

async function uploadImage(filePath) {
  const fullPath = join(REPO_ROOT, "public", filePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`[warn] Image not found: ${fullPath}`);
    return null;
  }

  const buffer = fs.readFileSync(fullPath);
  const blob = new Blob([buffer], { type: "image/webp" });
  const form = new FormData();
  form.append("files", blob, basename(fullPath));

  const res = await fetch(`${STRAPI_URL}/api/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
    body: form,
  });
  
  if (!res.ok) {
    console.warn(`[warn] Upload failed for ${filePath}: ${await res.text()}`);
    return null;
  }
  const data = await res.json();
  if (data && data[0] && data[0].id) {
    return data[0].id;
  }
  return null;
}

async function main() {
  console.log(`Strapi: ${STRAPI_URL}`);
  
  console.log("Uploading images...");
  const img1 = await uploadImage("som/prototype-mobile-1.webp");
  const img2 = await uploadImage("som/prototype-mobile-2.webp");
  console.log("Image 1 ID:", img1);
  console.log("Image 2 ID:", img2);

  const prototype = {
    heading: "Prototype to Product in a Snap",
    subtitle: "",
    cards: [
      {
        title: "The Lab",
        description: "Use the integrated breakout board for rapid prototyping. It includes a USB-C port for charging, a 10-pin JTAG connector, programmable LEDs, and headers for easy signal probing and power analysis.",
        image: img1
      },
      {
        title: "Production-Ready SOMs",
        description: "Once your software is validated, simply snap off the breakout half. The remaining 21×21mm core module embeds directly into your space-constrained product with zero hardware redesign required.",
        image: img2
      }
    ]
  };

  console.log("\nPUT /api/dvk-page  (prototype section)");
  const upd = await strapiFetch("/api/dvk-page", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: { prototype } }),
  });
  if (!upd.ok) {
    throw new Error(`PUT /api/dvk-page failed (${upd.status}): ${JSON.stringify(upd.body)}`);
  }
  console.log("  updated (draft).");

  console.log("PUT /api/dvk-page?status=published  (publish)");
  const pub = await strapiFetch("/api/dvk-page?status=published", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: { prototype } }),
  });
  if (!pub.ok) {
    console.warn(`  [warn] publish step returned ${pub.status}: ${JSON.stringify(pub.body)}`);
  } else {
    console.log("  published.");
  }

  console.log("\nDone. DVK Prototype seeded successfully.");
}

main().catch((err) => {
  console.error("\n[fatal]", err.message);
  process.exit(1);
});
