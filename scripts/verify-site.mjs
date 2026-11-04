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

// Step 2: Test Live Strapi Endpoints (if running)
console.log("\n--- Step 2: Testing Live Strapi Server (if active) ---");

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

// Step 3: Run Next.js Production Build
console.log("\n--- Step 3: Running Next.js Production Build Verification ---");
try {
  execSync("npm run build", { stdio: "inherit" });
  console.log("✓ Next.js build completed successfully.");
} catch {
  console.error("❌ Next.js build failed!");
  errorCount++;
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
