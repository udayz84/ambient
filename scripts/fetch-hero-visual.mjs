/**
 * Export hero center animation from Figma Dev Mode (node 2379:737).
 *
 * Prerequisites:
 *   1. Figma Desktop open on "Ambient - Dev File"
 *   2. Dev Mode: select node 2379:737 (Rectangle inside Mask group)
 *   3. Asset server at http://127.0.0.1:3845
 *
 * Usage:
 *   node scripts/fetch-hero-visual.mjs
 *   node scripts/fetch-hero-visual.mjs <40-char-hash> [mp4|webm|png]
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";

const BASE = process.env.FIGMA_ASSET_BASE ?? "http://127.0.0.1:3845/assets";
const OUT_DIR = resolve("public/hero");
const HASH_ARG = process.argv[2];
const EXT_ARG = process.argv[3] ?? "mp4";

const EXT_TARGETS = {
  mp4: "hero-visual.mp4",
  webm: "hero-visual.webm",
  png: "hero-visual-poster.png",
};

async function download(hash, ext) {
  const outName = EXT_TARGETS[ext] ?? `hero-visual.${ext}`;
  const url = `${BASE}/${hash}.${ext}`;
  const dest = resolve(OUT_DIR, outName);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 1000) {
    throw new Error(`File too small (${buf.length} bytes) — wrong hash or Figma not ready`);
  }
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, buf);
  console.log(`Wrote ${dest} (${buf.length} bytes)`);
}

function extractAssetHashes(text) {
  const re = /localhost:3845\/assets\/([a-f0-9]{40})\.(mp4|webm|png|webp)/gi;
  const found = new Map();
  let match;
  while ((match = re.exec(text)) !== null) {
    found.set(`${match[1]}.${match[2]}`, match[1]);
  }
  return [...found.entries()];
}

async function fetchDesignContext() {
  const res = await fetch("http://127.0.0.1:3845/mcp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: {
        name: "get_design_context",
        arguments: { nodeId: "2379:737", forceCode: true },
      },
    }),
  });
  if (!res.ok) {
    throw new Error(`MCP HTTP ${res.status}`);
  }
  const text = await res.text();
  return text;
}

async function main() {
  if (HASH_ARG) {
    await download(HASH_ARG, EXT_ARG);
    return;
  }

  let contextText = "";
  try {
    contextText = await fetchDesignContext();
  } catch (err) {
    console.warn("MCP get_design_context failed:", err.message);
  }

  const assets = extractAssetHashes(contextText);
  const videoAssets = assets.filter(([name]) =>
    name.endsWith(".mp4") || name.endsWith(".webm"),
  );
  const pngAssets = assets.filter(([name]) => name.endsWith(".png"));

  if (videoAssets.length === 0 && pngAssets.length === 0) {
    console.error(
      "No hero visual asset URLs found.\n" +
        "Open Figma → Ambient Dev File → Dev Mode → select node 2379:737,\n" +
        "then run: node scripts/fetch-hero-visual.mjs <hash> mp4\n" +
        "Hash appears in get_design_context as localhost:3845/assets/<hash>.mp4",
    );
    process.exit(1);
  }

  for (const [name, hash] of videoAssets) {
    const ext = name.split(".").pop();
    await download(hash, ext);
  }
  for (const [name, hash] of pngAssets) {
    await download(hash, "png");
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
