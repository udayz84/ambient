import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const STRAPI_URL = "http://localhost:1338";
const STRAPI_TOKEN = "1d5c010a3e4363bf0f5a361b24ce8c7583b1188acc7794a92b619b4e317715aea732c5226b56134d00a59785bf751855cd0dca441524883913313c5e1468722fe175ebff615d39f3a6211ec7a8490690345c6aa6c68fed2c3a5369da70c347ce340df75bcf915ab237793c2cfa0fead11a1bd78b2767f2561b686ef7cd9a99f8";

async function main() {
  console.log("Fetching roles...");
  const res = await fetch(`${STRAPI_URL}/api/users-permissions/roles`, {
    headers: { Authorization: `Bearer ${STRAPI_TOKEN}` }
  });
  
  if (!res.ok) {
    console.error("Failed to fetch roles:", await res.text());
    return;
  }
  
  const roles = await res.json();
  const publicRole = roles.roles ? roles.roles.find(r => r.type === 'public' || r.name === 'Public') : null;
  
  if (!publicRole) {
    console.error("Could not find public role", roles);
    return;
  }

  console.log("Found public role:", publicRole.id);

  // Note: the Strapi v4/v5 users-permissions/roles endpoint doesn't let you just patch permissions easily via REST API unless you fetch the full role, modify it, and PUT it back.
  // Alternatively, I can just write a script that boots Strapi programmatically and uses `strapi.db`.
}

main().catch(console.error);
