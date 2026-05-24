/**
 * Export contact hero background (2379:4951) from Figma Dev Mode asset server.
 * Do NOT use get_screenshot — it bakes in live copy (4954, 8416, nav, CTAs).
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

const ASSET_URL =
  "http://localhost:3845/assets/0fb5fd6de31517c3b2ec7bdb9bd5800d0f34b4d8.png";
const RAW = resolve("public/contact/hand-raw.png");
const OUT = resolve("public/contact/hand.png");

execSync(`curl -sf "${ASSET_URL}" -o "${RAW}"`, { stdio: "inherit" });
execSync(`sips -z 1466 2880 "${RAW}" --out "${OUT}"`, { stdio: "inherit" });

const stat = execSync(`file "${OUT}"`).toString().trim();
console.log(`Wrote ${OUT}\n${stat}`);
