/**
 * seed-dvk-intelligence.mjs
 * ----------------------------------------------------------------------------
 * Seeds the "Out-of-the-Box Intelligence" section content onto the dvk-page
 * single type in Strapi.
 *
 * The component field moved schemas (dvk-page gained `intelligence` ->
 * som.intelligence; som-page lost it). Because the field is gone from
 * som-page, its API can no longer serve the old content — the content below
 * is the exact last-known state read from som-page.intelligence before the
 * schema change (fetched 2026-09-28). Nothing to clear on som-page: the field
 * no longer exists there.
 *
 * Usage
 *   node scripts/seed-dvk-intelligence.mjs
 * ----------------------------------------------------------------------------
 */

import { join, normalize, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
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

/** Last-known som-page.intelligence content (no card images were set). */
const INTELLIGENCE = {
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
};

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

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

/** Retry a JSON fetch through the Strapi restart window. */
async function retrying(fetcher, label, tries = 15) {
  for (let i = 1; i <= tries; i++) {
    try {
      const res = await fetcher();
      const invalidKey =
        res.status === 400 &&
        typeof res.body?.error?.message === "string" &&
        res.body.error.message.includes("Invalid key intelligence");
      if (res.ok) return res;
      if (invalidKey && i < tries) {
        console.log(`  [retry ${i}/${tries}] ${label}: schema not reloaded yet, waiting 5s…`);
        await delay(5000);
        continue;
      }
      throw new Error(`${label} failed (${res.status}): ${JSON.stringify(res.body)}`);
    } catch (err) {
      if (i < tries && (err.cause?.code === "ECONNREFUSED" || err.name === "TypeError")) {
        console.log(`  [retry ${i}/${tries}] ${label}: Strapi restarting, waiting 5s…`);
        await delay(5000);
        continue;
      }
      throw err;
    }
  }
}

async function main() {
  console.log(`Strapi: ${STRAPI_URL}`);
  console.log(`Seeding dvk-page.intelligence (${INTELLIGENCE.cards.length} cards)`);

  const body = JSON.stringify({ data: { intelligence: INTELLIGENCE } });

  console.log("\nPUT /api/dvk-page  (intelligence)");
  await retrying(
    () =>
      strapiFetch("/api/dvk-page", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body,
      }),
    "PUT dvk-page"
  );
  console.log("  updated (draft).");

  console.log("PUT /api/dvk-page?status=published  (publish)");
  await retrying(
    () =>
      strapiFetch("/api/dvk-page?status=published", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body,
      }),
    "publish dvk-page"
  );
  console.log("  published.");

  console.log("\nDone. Intelligence content now lives on dvk-page.");
}

main().catch((err) => {
  console.error("\n[fatal]", err.message);
  process.exit(1);
});
