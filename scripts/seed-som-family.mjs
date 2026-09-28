/**
 * seed-som-family.mjs
 * ----------------------------------------------------------------------------
 * Seeds the GPX10 PRO SOM FAMILY section in the som-page.
 * Text content is pushed as per the UI placeholders. Images are intentionally
 * left blank as the user will upload them manually.
 * ----------------------------------------------------------------------------
 */

import { fileURLToPath } from "node:url";
import { dirname, join, normalize } from "node:path";

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

async function main() {
  console.log(`Strapi: ${STRAPI_URL}`);

  const family = {
    tag: "THE GPX10 PRO SOM FAMILY",
    title: "One core.\nTwo ways to connect.",
    subtitle: "Both modules share the same GPX10 Pro compute core and software.\nThe difference is the radio — short-range Bluetooth LE or wide-area LTE.",
    cards: [
      {
        tag: "COMING SOON",
        title: "SOM (BLE)",
        description: "For products that connect over short range — to a phone, hub, or gateway.",
        image: null,
        features: [
          { icon: null, text: "GPX10 Pro\ncompute core" },
          { icon: null, text: "6-axis\nIMU" },
          { icon: null, text: "NOR\nflash" },
          { icon: null, text: "Bluetooth LE\n(Nordic nRF54)" }
        ],
        footerText: "RF is available on a u.FL connector and on an LGA RF pad, so you can use an external antenna or design one into your PCB."
      },
      {
        tag: "COMING SOON",
        title: "SOM (LTE)",
        description: "For products that need to connect anywhere, with no local gateway — remote, mobile, or wide-area deployments.",
        image: null,
        features: [
          { icon: null, text: "GPX10 Pro\ncompute core" },
          { icon: null, text: "6-axis\nIMU" },
          { icon: null, text: "NOR\nflash" },
          { icon: null, text: "LTE\ncellular modem" }
        ],
        footerText: ""
      }
    ]
  };

  console.log("\nPUT /api/som-page  (family section)");
  const upd = await strapiFetch("/api/som-page", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: { family } }),
  });
  if (!upd.ok) {
    throw new Error(`PUT /api/som-page failed (${upd.status}): ${JSON.stringify(upd.body)}`);
  }
  console.log("  updated (draft).");

  console.log("PUT /api/som-page?status=published  (publish)");
  const pub = await strapiFetch("/api/som-page?status=published", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: { family } }),
  });
  if (!pub.ok) {
    console.warn(`  [warn] publish step returned ${pub.status}: ${JSON.stringify(pub.body)}`);
  } else {
    console.log("  published.");
  }

  console.log("\nDone. GPX10 PRO SOM FAMILY seeded successfully.");
}

main().catch((err) => {
  console.error("\n[fatal]", err.message);
  process.exit(1);
});
