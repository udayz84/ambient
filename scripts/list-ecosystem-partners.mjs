#!/usr/bin/env node
/**
 * list-ecosystem-partners.mjs
 *
 * Diagnostic script: fetches the home-page ecosystem section from Strapi and
 * prints every partner (silicon + development) with its name, logo URL, and
 * dimensions. Also tests the provided API tokens.
 *
 * Usage:
 *   node scripts/list-ecosystem-partners.mjs
 */

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFileSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const envPath = join(__dirname, "..", ".env");
try {
  const raw = readFileSync(envPath, "utf-8");
  for (const line of raw.split("\n")) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.+)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
} catch {
}

const STRAPI_URL = (process.env.STRAPI_URL || "http://localhost:1338").replace(/\/$/, "");
const ENV_TOKEN = process.env.STRAPI_TOKEN || "";
const PROVIDED_TOKEN =
  "1d5c010a3e4363bf0f5a361b24ce8c7583b1188acc7794a92b619b4e317715aea732c5226b56134d00a59785bf751855cd0dca441524883913313c5e1468722fe175ebff615d39f3a6211ec7a8490690345c6aa6c68fed2c3a5369da70c347ce340df75bcf915ab237793c2cfa0fead11a1bd78b2767f2561b686ef7cd9a99f8";

const SEP = "=".repeat(80);
const SUB = "-".repeat(80);

async function fetchJson(url, token, label) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  try {
    const res = await fetch(url, { headers });
    const status = `${res.status} ${res.statusText}`;
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.log(`  [${label}] FAIL  ${status}`);
      console.log(`           ${body.slice(0, 200)}`);
      return null;
    }
    console.log(`  [${label}] OK    ${status}`);
    return res.json();
  } catch (e) {
    console.log(`  [${label}] ERROR ${e.message}`);
    return null;
  }
}

async function main() {
  console.log(`\n${SEP}`);
  console.log("  ECOSYSTEM PARTNERS — STRAPI DIAGNOSTIC");
  console.log(`${SEP}`);
  console.log(`  Strapi URL : ${STRAPI_URL}`);

  // ── 1. Token tests ────────────────────────────────────────────────
  console.log(`\n${SUB}`);
  console.log("  STEP 1 — Token validation");
  console.log(SUB);

  const tokenTestUrl = `${STRAPI_URL}/api/home-page?fields[0]=documentId`;
  console.log("\n  Testing tokens against /api/home-page …");
  await fetchJson(tokenTestUrl, ENV_TOKEN, ".env STRAPI_TOKEN");
  await fetchJson(tokenTestUrl, PROVIDED_TOKEN, "Provided token");
  // Public read (no token) — this Strapi allows it
  await fetchJson(tokenTestUrl, null, "No token (public read)");

  // ── 2. Fetch ecosystem partners ───────────────────────────────────
  console.log(`\n${SUB}`);
  console.log("  STEP 2 — Fetching ecosystem partners");
  console.log(SUB);

  const query =
    "populate[ecosystem][populate][silicon_partners][populate]=*" +
    "&populate[ecosystem][populate][development_partners][populate]=*";
  const url = `${STRAPI_URL}/api/home-page?${query}`;
  let json = await fetchJson(url, PROVIDED_TOKEN, "Ecosystem fetch");
  if (!json) json = await fetchJson(url, null, "Ecosystem fetch (public)");

  if (!json || !json.data) {
    console.log("\n  No data returned. Is Strapi running?");
    process.exit(1);
  }

  const eco = json.data.ecosystem;
  if (!eco) {
    console.log("\n  No ecosystem section found on home-page.");
    process.exit(0);
  }

  // ── 3. Print summary ──────────────────────────────────────────────
  console.log(`\n${SUB}`);
  console.log("  STEP 3 — Ecosystem summary");
  console.log(SUB);

  console.log(`\n  Heading   : ${eco.heading || "(empty)"}`);
  console.log(`  Subtitle  : ${(eco.subtitle || "(empty)").slice(0, 80)}…`);
  console.log(`\n  Silicon partners     : ${eco.silicon_partners?.length ?? 0}`);
  console.log(`  Development partners : ${eco.development_partners?.length ?? 0}`);

  const printPartners = (label, partners) => {
    console.log(`\n  ┌─ ${label} (${partners?.length ?? 0}) ─────────────────────────────`);
    if (!partners || partners.length === 0) {
      console.log("  │  (none)");
    }
    partners?.forEach((p, i) => {
      const name = p.name || "(unnamed)";
      const logo = p.logo;
      const logoUrl = logo ? `${STRAPI_URL}${logo.url}` : "(no logo)";
      const dims = logo ? `${logo.width}×${logo.height}` : "—";
      console.log(`  │  ${i + 1}. name="${name}"  logo=${logo.name ?? "—"}  ${dims}  ${logoUrl}`);
    });
    console.log("  └──────────────────────────────────────────────────");
  };

  printPartners("SILICON PARTNERS", eco.silicon_partners);
  printPartners("DEVELOPMENT PARTNERS", eco.development_partners);

  // ── 4. Schema check ───────────────────────────────────────────────
  console.log(`\n${SUB}`);
  console.log("  STEP 4 — Schema vs Figma comparison");
  console.log(SUB);

  const figmaCategories = ["SILICON PARTNERS", "DEVELOPMENT PARTNERS", "DISTRIBUTION PARTNERS"];
  const strapiFields = Object.keys(eco).filter((k) => k.includes("partner"));
  console.log(`\n  Figma design categories : ${figmaCategories.join(", ")}`);
  console.log(`  Strapi partner fields   : ${strapiFields.join(", ") || "(none)"}`);

  const missing = figmaCategories.filter((c) => {
    const field = c.toLowerCase().replace(" partners", "_partners").replace(" ", "_");
    return !strapiFields.includes(field);
  });
  if (missing.length > 0) {
    console.log(`\n  ⚠  MISSING in Strapi schema: ${missing.join(", ")}`);
  }

  // ── 5. Name placeholders ──────────────────────────────────────────
  console.log(`\n${SUB}`);
  console.log("  STEP 5 — Placeholder name detection");
  console.log(SUB);

  const allPartners = [
    ...(eco.silicon_partners || []),
    ...(eco.development_partners || []),
  ];
  const placeholders = allPartners.filter(
    (p) => !p.name || /^partner\s*\d+$/i.test(p.name),
  );
  if (placeholders.length > 0) {
    console.log(`\n  ⚠  ${placeholders.length} partner(s) have generic/placeholder names:`);
    placeholders.forEach((p, i) => {
      console.log(`     ${i + 1}. name="${p.name}"  (needs real company name)`);
    });
  } else {
    console.log("\n  All partners have real names.");
  }

  console.log(`\n${SEP}\n`);
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
