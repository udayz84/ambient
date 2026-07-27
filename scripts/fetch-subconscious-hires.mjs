/**
 * Fetch the hidden "subconscious" chip render (node 5085:27) from the Figma
 * REST API at high scale, to replace the pixelated 1024x576 asset.
 *
 * Usage: node scripts/fetch-subconscious-hires.mjs [scale]
 * Requires FIGMA_TOKEN in .env
 */
import { writeFileSync } from "node:fs";
import { join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = normalize(join(__dirname, ".."));

try {
  process.loadEnvFile(join(REPO_ROOT, ".env"));
} catch {
  // env already set in shell
}

const TOKEN = process.env.FIGMA_TOKEN || "";
if (!TOKEN) {
  console.error("[fatal] FIGMA_TOKEN env var required");
  process.exit(1);
}

const FILE_KEY = "xwsTDujqZsHTQtJL7G8qW0";
const NODE_ID = "5085:27";
const SCALE = process.argv[2] || "2";
const OUT = join(REPO_ROOT, "scripts/.figma-cache/subconscious-hires.png");

const api = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(NODE_ID)}&scale=${SCALE}&format=png`;

const res = await fetch(api, { headers: { "X-Figma-Token": TOKEN } });
if (!res.ok) {
  console.error(`[fatal] images API HTTP ${res.status}: ${await res.text()}`);
  process.exit(1);
}
const json = await res.json();
if (json.err) {
  console.error("[fatal] images API error:", json.err);
  process.exit(1);
}
const url = json.images?.[NODE_ID];
if (!url) {
  console.error("[fatal] no image URL returned for", NODE_ID, JSON.stringify(json));
  process.exit(1);
}
console.log("image url received; downloading...");
const img = await fetch(url);
if (!img.ok) {
  console.error(`[fatal] download HTTP ${img.status}`);
  process.exit(1);
}
const buf = Buffer.from(await img.arrayBuffer());
writeFileSync(OUT, buf);
console.log(`wrote ${OUT} (${buf.length} bytes)`);
