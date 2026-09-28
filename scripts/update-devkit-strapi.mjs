import { readFile } from "node:fs/promises";
import { join, normalize, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = normalize(join(__dirname, ".."));

try {
  process.loadEnvFile(join(REPO_ROOT, ".env"));
} catch {}

const STRAPI_URL = (process.env.STRAPI_URL || "http://localhost:1338").replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";

if (!STRAPI_TOKEN) {
  console.error("No STRAPI_TOKEN found! Make sure it is set in .env");
  process.exit(1);
}

async function strapiFetch(pathname, method = "GET", body = null) {
  const url = `${STRAPI_URL}${pathname}`;
  const init = {
    method,
    headers: { 
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      "Content-Type": "application/json"
    }
  };
  if (body) init.body = JSON.stringify(body);
  
  const res = await fetch(url, init);
  const text = await res.text();
  let parsed = null;
  try { parsed = text ? JSON.parse(text) : null; } catch { parsed = text; }
  return { ok: res.ok, status: res.status, body: parsed };
}

function replaceText(obj) {
  if (typeof obj === 'string') {
    return obj
      .replace(/Evaluation Kit/g, 'Evaluation Kit')
      .replace(/evaluation kit/g, 'evaluation kit');
  }
  if (Array.isArray(obj)) {
    return obj.map(replaceText);
  }
  if (obj !== null && typeof obj === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      // Don't modify media IDs or document IDs
      if (k === 'id' || k === 'documentId') {
        out[k] = v;
      } else {
        out[k] = replaceText(v);
      }
    }
    return out;
  }
  return obj;
}

// Complex populate queries to ensure we fetch the nested components where text lives
const ENDPOINTS = [
  {
    apiId: "dvk-page",
    query: "populate[hero]=*&populate[seo]=*"
  },
  {
    apiId: "developer-platform",
    query: "populate[features][populate]=*"
  },
  {
    apiId: "global-settings",
    // Deep populate for navbar and footer links
    query: "populate[header][populate][nav_items][populate]=*&populate[footer][populate][nav_sections][populate]=*"
  }
];

async function processEndpoint(apiId, query) {
  console.log(`Processing ${apiId}...`);
  const getRes = await strapiFetch(`/api/${apiId}?${query}`);
  
  if (!getRes.ok) {
    console.error(`Failed to GET ${apiId}: ${getRes.status}`, getRes.body);
    return;
  }
  
  const originalData = getRes.body.data;
  if (!originalData) return;

  const updatedData = replaceText(originalData);

  // Remove system fields before PUT
  delete updatedData.id;
  delete updatedData.documentId;
  delete updatedData.createdAt;
  delete updatedData.updatedAt;
  delete updatedData.publishedAt;

  const putRes = await strapiFetch(`/api/${apiId}`, "PUT", { data: updatedData });
  if (putRes.ok) {
    console.log(`✅ Successfully updated ${apiId} in Strapi!`);
  } else {
    console.error(`❌ Failed to PUT ${apiId}:`, putRes.body);
  }
}

async function main() {
  for (const ep of ENDPOINTS) {
    await processEndpoint(ep.apiId, ep.query);
  }
  console.log("Finished updating Strapi!");
}

main();
