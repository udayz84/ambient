/**
 * One-shot content update: replace the applications-page `continuum.cards`
 * with the 5 GPX cards from Figma "Desktop - 11" (3974:612), preserving
 * heading/subtitle/image. Loads STRAPI_URL/STRAPI_TOKEN from .env.
 *
 * Usage: node scripts/update-continuum-cards.mjs
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Minimal .env loader (no values are printed)
for (const line of readFileSync(resolve(".env"), "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}

const STRAPI_URL = (process.env.STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";
if (!STRAPI_TOKEN) {
  console.error("[fatal] STRAPI_TOKEN missing (set it in .env)");
  process.exit(1);
}

const CARDS = [
  { title: "GPX10PRO", body: "Always-on intelliegence for wearabes, audio & battery IoT." },
  { title: "GPX64", body: "Real-time perception & control for robots, drones & smart machines" },
  { title: "GPX256", body: "Private, local AI compute for creators, developers & businesses" },
  { title: "GPX2000", body: "Private, local AI compute for creators, developers & businesses" },
  { title: "GPX8000", body: "Always-on intelliegence for wearabes, audio & battery IoT." },
];

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${STRAPI_TOKEN}`,
};

async function main() {
  // 1. Read current continuum component to preserve heading/subtitle
  const getRes = await fetch(
    `${STRAPI_URL}/api/applications-page?populate[continuum][populate]=*`,
    { headers },
  );
  if (!getRes.ok) {
    console.error(`[fatal] GET failed (${getRes.status})`);
    process.exit(1);
  }
  const current = (await getRes.json())?.data?.continuum ?? {};

  // 2. PUT updated cards, keeping the other fields untouched
  const continuum = {
    heading: current.heading ?? null,
    subtitle: current.subtitle ?? null,
    cards: CARDS,
  };
  const putRes = await fetch(`${STRAPI_URL}/api/applications-page?status=published`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: { continuum } }),
  });
  const putBody = await putRes.json().catch(() => ({}));
  if (!putRes.ok) {
    console.error(`[fatal] PUT failed (${putRes.status}): ${JSON.stringify(putBody)}`);
    process.exit(1);
  }
  console.log("[done] continuum.cards updated:", CARDS.map((c) => c.title).join(", "));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
