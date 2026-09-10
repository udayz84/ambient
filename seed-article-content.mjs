/**
 * seed-article-content.mjs
 * ----------------------------------------------------------------------------
 * Seeds rich HTML sample content into the FIRST existing Article in Strapi.
 *
 * - Reads STRAPI_TOKEN from .env and sends it as a Bearer token.
 * - GET  /api/articles                → first article's documentId + title.
 * - PUT  /api/articles/<documentId>   → { data: { body: <rich html> } }.
 *
 * Only the `body` field is sent in the update payload, so every other field
 * on the article (title, slug, seo, media, ...) is left untouched.
 *
 * Usage: node seed-article-content.mjs
 * ----------------------------------------------------------------------------
 */

import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const STRAPI_URL = "http://localhost:1338";

/** Load STRAPI_TOKEN from the project-root .env without any dependencies. */
function loadStrapiToken() {
  const envPath = join(dirname(fileURLToPath(import.meta.url)), ".env");
  const envSrc = readFileSync(envPath, "utf8");
  const match = envSrc.match(/^\s*STRAPI_TOKEN\s*=\s*(.+)\s*$/m);
  if (!match) {
    throw new Error("STRAPI_TOKEN not found in .env");
  }
  return match[1].trim().replace(/^["']|["']$/g, "");
}

/** Small JSON fetch helper that always attaches the Bearer token. */
async function strapiFetch(pathname, init = {}) {
  const res = await fetch(`${STRAPI_URL}${pathname}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${loadStrapiToken()}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  const text = await res.text();
  let body = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }
  return { ok: res.ok, status: res.status, body };
}

/** Rich HTML sample body used to exercise every frontend article style. */
function buildSampleBody() {
  return [
    "<p>Ambient Scientific was founded on a simple observation: the future of AI will not be written in the cloud alone. Every lamp, sensor, wearable, and robot deserves intelligence that is instant, private, and measured in microwatts rather than megawatts.</p>",

    "<h2>Why Edge AI Needed a New Kind of Silicon</h2>",
    "<p>For a decade, the industry answered every AI question with bigger GPUs and bigger data centers. That approach collapses at the edge, where a coin-cell battery and a few square millimeters of silicon set the budget. Traditional architectures burn most of their energy just moving data between memory and compute.</p>",
    "<p>Our mixed-signal, energy-aware compute eliminates that data movement entirely at the point of computation, delivering orders-of-magnitude better performance per watt.</p>",

    "<h3>The Measured Proof</h3>",
    "<ul>",
    "  <li>Sub-microwatt always-on inference for keyword spotting and sensor fusion</li>",
    "  <li>Milliwatt-scale conversational AI that runs fully offline</li>",
    "  <li>Programmable NPU cores that scale from hearables to humanoid robots</li>",
    "  <li>A developer platform that ships models from bench to volume</li>",
    "</ul>",

    "<blockquote>“We believe intelligence should be as ambient as light — always on, everywhere, and essentially free to power.” — Ambient Scientific founding team</blockquote>",

    "<h2>From Bench to Volume</h2>",
    "<p>Hardware alone is not a platform. Model Forge compiles, quantizes, and optimizes networks for our NPUs automatically, so teams spend their time on products instead of porting. The full story — silicon, tools, and reference designs — is available to early partners <a href=\"#\">through our developer program</a>.</p>",

    "<h3>What Comes Next</h3>",
    "<p>Over the coming months we will publish measured benchmarks, reference designs, and integration guides for the first generation of Ambient-powered devices. Check back soon, or reach out through our partner program to get early access.</p>",
  ].join("\n");
}

async function main() {
  console.log("Seeding article content...");

  // Step 1 — fetch the articles and take the first one.
  const list = await strapiFetch("/api/articles");
  if (!list.ok) {
    throw new Error(`Failed to fetch articles: ${list.status} ${JSON.stringify(list.body)}`);
  }
  const articles = list.body?.data ?? [];
  if (articles.length === 0) {
    throw new Error("No articles found in Strapi — nothing to seed.");
  }

  const article = articles[0];
  const { documentId, title } = article;
  console.log(`Target article: "${title}" (documentId: ${documentId})`);

  // Step 2 — generate the rich HTML sample content.
  const body = buildSampleBody();

  // Step 3 — update ONLY the body field of the article.
  const put = await strapiFetch(`/api/articles/${documentId}`, {
    method: "PUT",
    body: JSON.stringify({ data: { body } }),
  });

  // Step 4 — report.
  if (put.ok) {
    console.log(`✅ Success — article "${title}" (documentId: ${documentId}) body updated.`);
  } else {
    throw new Error(`PUT failed: ${put.status} ${JSON.stringify(put.body)}`);
  }
}

main().catch((err) => {
  console.error("❌ Failure:", err.message);
  process.exit(1);
});
