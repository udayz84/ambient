/**
 * seed-advisory-board.mjs
 * ----------------------------------------------------------------------------
 * Seeds advisory board members into the company-page leadership component.
 *
 * What it does:
 *   1. Uploads a photo for each advisory board member (reuses existing
 *      leadership photos as placeholders — update via Strapi admin).
 *   2. GETs the current company-page leadership data (preserves heading,
 *      subtitle, and existing team members).
 *   3. PUTs the leadership component back with advisory_board added.
 *
 * Prerequisites:
 *   - Strapi running with the advisory_board schema field applied.
 *   - STRAPI_TOKEN set in .env (Full access token).
 *
 * Usage:
 *   node scripts/seed-advisory-board.mjs
 * ----------------------------------------------------------------------------
 */

import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { basename, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = normalize(join(__dirname, ".."));
const PUBLIC_DIR = join(REPO_ROOT, "public");

try {
  process.loadEnvFile(join(REPO_ROOT, ".env"));
} catch {
  // env already set in shell
}

const STRAPI_URL = (
  process.env.STRAPI_URL || "http://localhost:1338"
).replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";

if (!STRAPI_TOKEN) {
  console.error(
    "[fatal] STRAPI_TOKEN env var required (create a Full access token in Strapi admin)."
  );
  process.exit(1);
}

const MIME = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

async function strapiFetch(pathname, init = {}) {
  const url = pathname.startsWith("http")
    ? pathname
    : `${STRAPI_URL}${pathname}`;
  const headers = {
    Authorization: `Bearer ${STRAPI_TOKEN}`,
    ...(init.headers || {}),
  };
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

async function uploadFile(relPath) {
  const abs = join(PUBLIC_DIR, relPath);
  if (!existsSync(abs)) {
    throw new Error(`Photo not found: ${relPath} (looked at ${abs})`);
  }
  const buffer = await readFile(abs);
  const ext = extname(abs).toLowerCase();
  const mime = MIME[ext] || "application/octet-stream";
  const form = new FormData();
  form.append(
    "files",
    new Blob([buffer], { type: mime }),
    basename(abs),
  );
  const res = await strapiFetch("/api/upload", { method: "POST", body: form });
  if (!res.ok) {
    throw new Error(
      `Upload failed for ${relPath} (${res.status}): ${JSON.stringify(res.body)}`
    );
  }
  const arr = Array.isArray(res.body) ? res.body : [res.body];
  return arr[0];
}

/**
 * Advisory board members.
 *
 * These are PLACEHOLDER entries — update names, titles, bios, LinkedIn URLs,
 * and photos via the Strapi admin panel (Content Manager → Company Page →
 * Leadership → Advisory Board).
 */
const ADVISORY_MEMBERS = [
  {
    name: "Dr. Rajeev Mantri",
    title: "Strategic Advisor",
    bio_paragraphs: "",
    linkedin_url: "",
    photo: "company/leadership/gp-singh.png",
  },
  {
    name: "Dr. Anand Chandrasekher",
    title: "Technical Advisor",
    bio_paragraphs: "",
    linkedin_url: "",
    photo: "company/leadership/madanjit-singh.jpg",
  },
  {
    name: "Dr. Preethi Kasireddy",
    title: "Industry Advisor",
    bio_paragraphs: "",
    linkedin_url: "",
    photo: "company/leadership/swapnil-sapre.jpg",
  },
  {
    name: "Dr. Subramanian Iyer",
    title: "Board Member",
    bio_paragraphs: "",
    linkedin_url: "",
    photo: "company/leadership/gp-singh.png",
  },
];

async function main() {
  console.log(`\nSeeding advisory board → ${STRAPI_URL}\n`);

  // 1. Upload photos
  console.log("Uploading advisor photos...");
  const photoIds = [];
  for (const member of ADVISORY_MEMBERS) {
    const file = await uploadFile(member.photo);
    photoIds.push(file.id);
    console.log(`  [OK] ${member.photo} → file id ${file.id}`);
  }

  // 2. GET current leadership data (preserve heading, subtitle, team)
  console.log("\nFetching current company-page leadership...");
  const getRes = await strapiFetch(
    "/api/company-page?populate[leadership][populate][team][populate]=*"
  );
  if (!getRes.ok) {
    throw new Error(
      `GET company-page failed (${getRes.status}): ${JSON.stringify(getRes.body)}`
    );
  }
  const leadership = getRes.body.data?.leadership;
  if (!leadership) {
    throw new Error("No leadership component found on company-page.");
  }
  console.log(
    `  Current team: ${(leadership.team || []).length} members, heading: "${leadership.heading}"`
  );

  // 3. Build leadership payload with advisory_board
  const leadershipPayload = {
    heading: leadership.heading,
    subtitle: leadership.subtitle,
    team: (leadership.team || []).map((t) => ({
      name: t.name,
      title: t.title,
      bio_paragraphs: t.bio_paragraphs || "",
      linkedin_url: t.linkedin_url || "",
      photo: t.photo?.id ?? null,
    })),
    advisory_board: ADVISORY_MEMBERS.map((m, i) => ({
      name: m.name,
      title: m.title,
      bio_paragraphs: m.bio_paragraphs,
      linkedin_url: m.linkedin_url,
      photo: photoIds[i],
    })),
  };

  // 4. PUT (publish immediately)
  console.log(`\nPUTting ${ADVISORY_MEMBERS.length} advisory board members...`);
  const putRes = await strapiFetch("/api/company-page?status=published", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: { leadership: leadershipPayload } }),
  });
  if (!putRes.ok) {
    throw new Error(
      `PUT company-page failed (${putRes.status}): ${JSON.stringify(putRes.body)}`
    );
  }

  console.log("\n✓ Advisory board seeded successfully!");
  console.log(
    `  ${ADVISORY_MEMBERS.length} advisors added. Existing team (${leadershipPayload.team.length} members) preserved.`
  );
  console.log(
    "\n  → Update names, photos, bios, and LinkedIn URLs via Strapi admin:"
  );
  console.log("    Content Manager → Company Page → Leadership → Advisory Board\n");
}

main().catch((err) => {
  console.error("\n✗ Seed failed:", err.message);
  process.exit(1);
});
