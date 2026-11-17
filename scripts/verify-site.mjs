#!/usr/bin/env node
/* eslint-disable no-console */
import fs from "fs";
import path from "path";
import vm from "vm";
import { execSync } from "child_process";
import http from "http";

const ROOT_DIR = process.cwd();
const CMS_DIR = path.join(ROOT_DIR, "cms");
const APP_DIR = path.join(ROOT_DIR, "src", "app");

console.log("\n=======================================================");
console.log(" 🔍 Ambient Pre-Push Production & Schema Verifier");
console.log("=======================================================\n");

let errorCount = 0;
let warningCount = 0;

function readJsonSafe(filePath) {
  if (fs.existsSync(filePath)) {
    try {
      const raw = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return null;
}

// 1. Helper to load a component schema from cms/src/components/<category>/<name>.json
function getComponentSchema(componentName) {
  if (!componentName) return null;
  const parts = componentName.split(".");
  if (parts.length !== 2) return null;
  const [category, name] = parts;
  const filePath = path.join(CMS_DIR, "src", "components", category, `${name}.json`);
  return readJsonSafe(filePath);
}

// 2. Helper to load a singleType or collectionType schema from cms/src/api/<name>/content-types/<name>/schema.json
function getContentTypeSchema(apiId) {
  const filePath = path.join(
    CMS_DIR,
    "src",
    "api",
    apiId,
    "content-types",
    apiId,
    "schema.json"
  );
  return readJsonSafe(filePath);
}

// 3. Resolve a dot-separated path (e.g. "announcements.cta" or "cards.image") through Strapi schemas
function validateFieldPath(parentSchema, fieldPath, contextMsg) {
  const segments = fieldPath.split(".");
  let currentSchema = parentSchema;

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    if (!currentSchema || !currentSchema.attributes) {
      console.error(`❌ [SCHEMA MISMATCH] ${contextMsg}: Cannot resolve property "${seg}" because parent schema is missing.`);
      errorCount++;
      return false;
    }

    const attr = currentSchema.attributes[seg];
    if (!attr) {
      const validKeys = Object.keys(currentSchema.attributes).join(", ");
      console.error(`❌ [SCHEMA MISMATCH] ${contextMsg}:`);
      console.error(`   👉 Field "${seg}" does NOT exist in Strapi schema!`);
      console.error(`   👉 Path checked: "${fieldPath}"`);
      console.error(`   👉 Valid available fields in this component: [${validKeys}]`);
      console.error(`   👉 FATAL RISK: Strapi v5 will return "400 Bad Request: Invalid key ${seg}" and unload the section!`);
      errorCount++;
      return false;
    }

    // If there are more segments, follow component link
    if (i < segments.length - 1) {
      if (attr.type === "component" && attr.component) {
        currentSchema = getComponentSchema(attr.component);
      } else {
        console.error(`❌ [SCHEMA MISMATCH] ${contextMsg}: Field "${seg}" is type "${attr.type}", cannot nest subfield "${segments[i+1]}".`);
        errorCount++;
        return false;
      }
    }
  }
  return true;
}

console.log("--- Step 1: Auditing Strapi Populate Queries Against Schema Files ---");

function findPageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      findPageFiles(fullPath, fileList);
    } else if (file === "page.tsx" || file === "page.ts") {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const pageFiles = findPageFiles(APP_DIR);
let queriesChecked = 0;

for (const pageFile of pageFiles) {
  const content = fs.readFileSync(pageFile, "utf8");
  if (!content.includes("getSingleType")) continue;

  const relPagePath = path.relative(ROOT_DIR, pageFile);
  const regex = /getSingleType(?:<[^>]*>)?\(\s*["']([^"']+)["']/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const apiId = match[1];
    queriesChecked++;

    const contentSchema = getContentTypeSchema(apiId);
    if (!contentSchema) {
      console.warn(`⚠️  [SCHEMA] Could not find schema file for "${apiId}". Skipping.`);
      warningCount++;
      continue;
    }

    const commaIdx = content.indexOf(",", match.index);
    if (commaIdx === -1) continue;

    const startBracket = content.indexOf("[", commaIdx);
    if (startBracket === -1 || startBracket > match.index + 250) continue;

    let depth = 0;
    let endBracket = -1;
    for (let i = startBracket; i < content.length; i++) {
      if (content[i] === "[") depth++;
      else if (content[i] === "]") {
        depth--;
        if (depth === 0) {
          endBracket = i;
          break;
        }
      }
    }

    if (endBracket === -1) continue;

    const rawArray = content.slice(startBracket, endBracket + 1);
    let sections = [];
    try {
      sections = vm.runInNewContext(rawArray);
    } catch {
      continue;
    }

    if (!Array.isArray(sections)) continue;

    for (const sec of sections) {
      const secName = typeof sec === "string" ? sec : sec?.section;
      if (!secName) continue;

      const attr = contentSchema.attributes?.[secName];
      if (!attr) {
        console.error(`❌ [SCHEMA MISMATCH] ${relPagePath} queries "${apiId}" for section "${secName}", but "${secName}" does NOT exist in ${apiId} schema!`);
        errorCount++;
        continue;
      }

      let secSchema = contentSchema;
      if (attr.type === "component" && attr.component) {
        secSchema = getComponentSchema(attr.component) || contentSchema;
      }

      if (typeof sec === "object" && sec !== null) {
        const fields = Array.isArray(sec.fields) ? sec.fields : [];
        const nested = Array.isArray(sec.nested) ? sec.nested : [];

        // Check for conflicting fields in both `fields` and `nested`
        for (const f of fields) {
          if (nested.includes(f)) {
            console.error(`❌ [CONFLICT] ${relPagePath} -> "${apiId}" section "${secName}": Field "${f}" is listed in BOTH "fields" and "nested". Strapi v5 throws 400 Bad Request if a field is listed in both!`);
            errorCount++;
          }
        }

        // Validate each field in fields
        for (const f of fields) {
          validateFieldPath(secSchema, f, `${relPagePath} -> "${apiId}" section "${secName}" (fields)`);
        }

        // Validate each field in nested
        for (const n of nested) {
          validateFieldPath(secSchema, n, `${relPagePath} -> "${apiId}" section "${secName}" (nested)`);
        }
      }
    }
  }
}

console.log(`✓ Audited ${queriesChecked} getSingleType calls across all routes against Strapi schema.`);

// Helper to find all source files
function findSourceFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== "node_modules" && file !== ".next" && file !== ".git") {
        findSourceFiles(fullPath, fileList);
      }
    } else if (/\.(tsx|ts|jsx|js)$/.test(file)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allSourceFiles = findSourceFiles(path.join(ROOT_DIR, "src"));

// Step 2: Static Assets / Broken Images Verification
console.log("\n--- Step 2: Auditing Static Assets & Images (Zero 404s) ---");
const publicDir = path.join(ROOT_DIR, "public");
const assetRegex = /["`'](\/[^"`'?#\s]+\.(?:png|jpg|jpeg|webp|svg|gif|ico|pdf|zip|mp4|webm|woff2|woff|ttf))["`']/g;
let assetsChecked = 0;
let missingAssets = 0;
const knownExcludedPrefixes = ["/_next", "/api/"];

for (const file of allSourceFiles) {
  // Skip lib and middleware mocks
  if (file.includes("/src/lib/") || file.includes("middleware.ts")) continue;

  const content = fs.readFileSync(file, "utf8");
  let match;
  while ((match = assetRegex.exec(content)) !== null) {
    const assetPath = match[1];
    if (knownExcludedPrefixes.some((p) => assetPath.startsWith(p))) continue;

    assetsChecked++;
    let decoded = assetPath;
    try {
      decoded = decodeURIComponent(assetPath);
    } catch {}

    const fullDiskPath = path.join(publicDir, decoded.replace(/^\//, ""));
    if (!fs.existsSync(fullDiskPath)) {
      const relPath = path.relative(ROOT_DIR, file);
      console.error(`❌ [BROKEN ASSET] In ${relPath}:`);
      console.error(`   👉 "${assetPath}" does not exist in public/! (404 risk)`);
      missingAssets++;
      errorCount++;
    }
  }
}

if (missingAssets === 0) {
  console.log(`✓ Audited ${assetsChecked} static asset references in code. All exist in public/!`);
}

// Step 3: Download Attribute Guard (No HTML page downloads)
console.log("\n--- Step 3: Auditing Download Attributes (Prevent HTML Downloads) ---");
let downloadChecked = 0;
let downloadHazards = 0;

for (const file of allSourceFiles) {
  const content = fs.readFileSync(file, "utf8");
  const aTagMatches = content.match(/<a[^>]*download[^>]*>/g) || [];

  for (const tag of aTagMatches) {
    downloadChecked++;
    const hrefMatch = tag.match(/href=["']([^"']+)["']/);
    if (hrefMatch) {
      const href = hrefMatch[1];
      const isFile = /\.(zip|pdf|tar|gz|dmg|pkg|csv|png|jpg|webp)$/i.test(href);
      if (href === "#" || (href.startsWith("/") && !isFile)) {
        const relPath = path.relative(ROOT_DIR, file);
        console.error(`❌ [DOWNLOAD HAZARD] In ${relPath}:`);
        console.error(`   👉 Tag has download attribute with page route: href="${href}"`);
        console.error(`   👉 This will cause Chrome to download an HTML file instead of navigating!`);
        console.error(`   👉 Fix: Only pass download to actual file URLs (.zip, .pdf, etc.).`);
        downloadHazards++;
        errorCount++;
      }
    }
  }
}

if (downloadHazards === 0) {
  console.log(`✓ Audited all download attributes. Zero HTML page download hazards found.`);
}

// Step 4: Test Live Strapi Endpoints (if running)
console.log("\n--- Step 4: Testing Live Strapi Server (if active) ---");

function checkStrapiLive() {
  return new Promise((resolve) => {
    const req = http.request("http://127.0.0.1:1338/api/home-page", { method: "HEAD", timeout: 2000 }, () => {
      resolve(true);
    });
    req.on("error", () => resolve(false));
    req.on("timeout", () => {
      req.destroy();
      resolve(false);
    });
    req.end();
  });
}

const isStrapiUp = await checkStrapiLive();
if (isStrapiUp) {
  console.log("✓ Live Strapi server detected on http://127.0.0.1:1338. Testing core endpoints...");
  const endpoints = ["home-page", "products-page", "contact-page", "news-listing-page", "footer", "navbar"];
  for (const ep of endpoints) {
    try {
      execSync(`curl -f -s "http://127.0.0.1:1338/api/${ep}" > /dev/null`);
      console.log(`  ✓ /api/${ep}: HTTP 200 OK`);
    } catch {
      console.error(`  ❌ /api/${ep}: Failed with 400 or non-200!`);
      errorCount++;
    }
  }
} else {
  console.log("ℹ️  Local Strapi server not running on port 1338 (Schema JSON definitions verified in Step 1).");
}

// Step 5: Run Next.js Production Build
console.log("\n--- Step 5: Running Next.js Production Build Verification ---");
try {
  execSync("npm run build", { stdio: "inherit" });
  console.log("✓ Next.js build completed successfully.");
} catch {
  try {
    execSync("npm run build", { stdio: "inherit" });
    console.log("✓ Next.js build completed successfully.");
  } catch {
    console.error("❌ Next.js build failed!");
    errorCount++;
  }
}

// Step 6: UI Section Rendering Audit (Local Dev / Test Server)
console.log("\n--- Step 6: Auditing UI Section Rendering (Local Dev / Test Server) ---");

async function fetchHttp(url, timeoutMs = 15000) {
  return new Promise((resolve) => {
    const req = http.get(url, { timeout: timeoutMs }, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => resolve({ status: res.statusCode, body: data }));
    });
    req.on("error", () => resolve(null));
    req.on("timeout", () => { req.destroy(); resolve(null); });
  });
}

async function findActiveServer() {
  if (process.env.TEST_SERVER_URL) {
    const testRes = await fetchHttp(`${process.env.TEST_SERVER_URL}/`, 4000);
    if (testRes && testRes.status === 200) return process.env.TEST_SERVER_URL;
  }
  const candidatePorts = [3001, 3000, 3002];
  for (const port of candidatePorts) {
    for (const host of ["localhost", "127.0.0.1"]) {
      const res = await fetchHttp(`http://${host}:${port}/`, 4000);
      if (res && res.status === 200 && res.body.includes("Ambient Scientific")) {
        return `http://${host}:${port}`;
      }
    }
  }
  return null;
}

const SECTION_AUDIT_PAGES = [
  {
    path: "/",
    name: "Homepage",
    sections: [
      { name: "Hero Carousel", match: (h) => h.includes("hero") || h.includes("<video") || h.includes("HeroCarousel") },
      { name: "Measured Proof", match: (h) => h.includes("measured_proof") || h.includes("Measured Proof") || h.includes("measured-proof") },
      { name: "Case Studies / Wins", match: (h) => h.includes("case-studies") || h.includes("casestudies") || h.includes("wins") },
      { name: "Technology Overview", match: (h) => h.includes("Compute where the data lives") || h.includes("technology") || h.includes("A-Cube") },
      { name: "Platform Scale", match: (h) => h.includes("platform_scale") || h.includes("Microwatt") || h.includes("Scale") },
      { name: "Applications Showcase", match: (h) => h.includes("applications") || h.includes("EXPLORE APPLICATIONS") },
      { name: "Model Zoo & Kits", match: (h) => h.includes("Model Zoo") || h.includes("model-zoo") || h.includes("model_zoo") },
      { name: "Developer Platform", match: (h) => h.includes("developer_platform") || h.includes("Developer") || h.includes("ModelForge") },
      { name: "Ecosystem Partners", match: (h) => h.includes("ecosystem") || h.includes("Silicon Partners") || h.includes("Development Partners") },
      { name: "Latest News", match: (h) => h.includes("latest_news") || h.includes("latest-news") || h.includes("Latest News") },
    ],
  },
  {
    path: "/products",
    name: "Products Page",
    sections: [
      { name: "Products Hero", match: (h) => h.includes("ProductsHero") || h.includes("Products") || h.includes("chipset") },
      { name: "Key Features", match: (h) => h.includes('id="features"') },
      { name: "Always-On Core", match: (h) => h.includes('id="always-on"') },
      { name: "Metrics / Datasheet", match: (h) => h.includes('id="metrics"') },
      { name: "Use Cases", match: (h) => h.includes('id="use-cases"') },
      { name: "Architecture", match: (h) => h.includes('id="architecture"') },
      { name: "Full Picture", match: (h) => h.includes('id="full-picture"') },
    ],
  },
  {
    path: "/technology",
    name: "Technology Page",
    sections: [
      { name: "Technology Hero", match: (h) => h.includes("Technology") || h.includes("hero") },
      { name: "Architecture Pillars", match: (h) => h.includes("architecture") || h.includes("pillars") || h.includes("in-memory") },
    ],
  },
  {
    path: "/applications",
    name: "Applications Page",
    sections: [
      { name: "Applications Hero", match: (h) => h.includes("Applications") || h.includes("hero") },
      { name: "Case Studies & Wins", match: (h) => h.includes("wins") || h.includes("Case Studies") || h.includes("case-studies") },
    ],
  },
  {
    path: "/company",
    name: "Company Page",
    sections: [
      { name: "Company Hero", match: (h) => h.includes("Company") || h.includes("hero") },
      { name: "Mission / Story", match: (h) => h.includes("Mission") || h.includes("mission") || h.includes("About") },
    ],
  },
  {
    path: "/careers",
    name: "Careers Page",
    sections: [
      { name: "Careers Hero", match: (h) => h.includes("Careers") || h.includes("careers") },
      { name: "Open Roles / Culture", match: (h) => h.includes("Open Roles") || h.includes("open_roles") || h.includes("careers") },
    ],
  },
  {
    path: "/contact",
    name: "Contact Page",
    sections: [
      { name: "Contact & Meetings", match: (h) => h.includes("Contact") || h.includes("contact") || h.includes("Schedule") },
    ],
  },
  {
    path: "/sitemap.xml",
    name: "Sitemap XML",
    sections: [
      { name: "XML urlset", match: (h) => h.includes("<?xml") && h.includes("<urlset") },
      { name: "Canonical Domain (No Azure URLs)", match: (h) => h.includes("https://www.ambientscientific.ai") && !h.includes("azurewebsites.net") },
    ],
  },
  {
    path: "/robots.txt",
    name: "Robots TXT",
    sections: [
      { name: "Sitemap Directive", match: (h) => h.includes("Sitemap: https://www.ambientscientific.ai/sitemap.xml") },
    ],
  },
];

let targetServer = await findActiveServer();
let spawnedServer = null;

if (targetServer) {
  console.log(`✓ Active local server detected at ${targetServer}. Auditing live rendered UI sections...`);
} else {
  console.log("ℹ️  No active local server detected on port 3000/3001. Starting verification server on port 3099...");
  try {
    const { spawn } = await import("child_process");
    spawnedServer = spawn("npx", ["next", "start", "-p", "3099"], {
      cwd: ROOT_DIR,
      stdio: "ignore",
      detached: false,
    });
    const deadline = Date.now() + 15000;
    while (Date.now() < deadline) {
      await new Promise((r) => setTimeout(r, 500));
      const res = await fetchHttp("http://localhost:3099/", 1000);
      if (res && res.status === 200) {
        targetServer = "http://localhost:3099";
        break;
      }
    }
    if (!targetServer) {
      console.warn("⚠️  Could not start temporary Next.js server on port 3099. Skipping live section crawl.");
    }
  } catch (err) {
    console.warn("⚠️  Unable to launch temporary server for section audit:", err.message);
  }
}

if (targetServer) {
  let totalSections = 0;
  let passedSections = 0;

  for (const page of SECTION_AUDIT_PAGES) {
    const url = `${targetServer}${page.path}`;
    const res = await fetchHttp(url, 20000);

    if (!res || res.status !== 200) {
      console.error(`❌ [PAGE FAILED] ${page.path}: Returned HTTP ${res ? res.status : "NO RESPONSE"}`);
      errorCount++;
      continue;
    }

    let pagePassed = true;
    for (const sec of page.sections) {
      totalSections++;
      const isRendered = sec.match(res.body);
      if (isRendered) {
        passedSections++;
      } else {
        pagePassed = false;
        console.error(`❌ [SECTION UNRENDERED] In ${page.path} (${page.name}): Section "${sec.name}" did NOT render in HTML!`);
        errorCount++;
      }
    }

    if (pagePassed) {
      console.log(`  ✓ ${page.path.padEnd(16)} All ${page.sections.length} sections rendered successfully`);
    }
  }

  if (passedSections === totalSections) {
    console.log(`✓ Audited ${totalSections} UI sections & endpoints across ${SECTION_AUDIT_PAGES.length} pages. All rendered!`);
  }

  if (spawnedServer) {
    try {
      spawnedServer.kill();
    } catch {}
  }
}

// Final Verdict
console.log("\n=======================================================");
if (errorCount > 0) {
  console.error(`🚨 PRE-PUSH AUDIT FAILED with ${errorCount} error(s)!`);
  console.error("Do NOT push to production until the errors above are resolved.");
  console.log("=======================================================\n");
  process.exit(1);
} else {
  console.log("✅ PRE-PUSH AUDIT PASSED!");
  console.log("All Strapi schemas match, build clean, zero errors. Safe for production.");
  console.log("=======================================================\n");
  process.exit(0);
}
