/**
 * seed-developer-platform-rest.mjs
 * ----------------------------------------------------------------------------
 * Aligns the home-page `developer_platform` section ("Build the impossible
 * today", Figma 2379:964) with the design via the REST API of the RUNNING
 * Strapi (no programmatic boot, safe while the dev server is up):
 *   - card order restored to Figma (ModelForge middle, Evaluate right/tall)
 *   - laptop placeholders replaced with Figma exports (chipset, dev kit,
 *     modules)
 *   - subtitle corrected: GPX10 -> GPX10PRO
 *
 * Reads STRAPI_URL / STRAPI_TOKEN from the repo-root .env (seed token).
 * Run from anywhere:  node cms/scripts/seed-developer-platform-rest.mjs
 * ----------------------------------------------------------------------------
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

// Parse root .env without printing secrets.
const env = Object.fromEntries(
  fs.readFileSync(path.join(root, '.env'), 'utf8')
    .split('\n')
    .filter((line) => /^[A-Z_]+=/.test(line))
    .map((line) => {
      const idx = line.indexOf('=');
      return [line.slice(0, idx), line.slice(idx + 1).trim().replace(/^["']|["']$/g, '')];
    }),
);

const STRAPI_URL = (env.STRAPI_URL || env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1338').replace(/\/$/, '');
const TOKEN = process.env.STRAPI_TOKEN || env.STRAPI_TOKEN;
if (!TOKEN) {
  console.error('STRAPI_TOKEN missing from root .env');
  process.exit(1);
}

const headers = { Authorization: `Bearer ${TOKEN}` };

const IMAGES = [
  ['chipset-1.png', '/tmp/chipset-1.png'],
  ['card-image-devkits.png', '/tmp/card-image-devkits.png'],
  ['card-image-modules-figma.png', '/tmp/card-image-modules-figma.png'],
];

async function ensureMedia(name, filepath) {
  const res = await fetch(
    `${STRAPI_URL}/api/upload/files?filters[name][$eq]=${encodeURIComponent(name)}`,
    { headers },
  );
  const found = await res.json();
  if (Array.isArray(found) && found.length > 0) {
    console.log(`  [reuse] ${name} (id ${found[0].id})`);
    return found[0].id;
  }
  const form = new FormData();
  form.append('fileInfo', JSON.stringify({ name, alternativeText: name }));
  form.append('files', new Blob([fs.readFileSync(filepath)], { type: 'image/png' }), name);
  const up = await fetch(`${STRAPI_URL}/api/upload`, { method: 'POST', headers, body: form });
  if (!up.ok) throw new Error(`upload ${name} failed: ${up.status} ${await up.text()}`);
  const uploaded = await up.json();
  const file = Array.isArray(uploaded) ? uploaded[0] : uploaded;
  console.log(`  [upload] ${name} (id ${file.id})`);
  return file.id;
}

const imageIds = {};
for (const [name, filepath] of IMAGES) {
  imageIds[name] = await ensureMedia(name, filepath);
}

const developer_platform = {
  heading: 'Build the impossible today',
  subtitle:
    "Don't let legacy design limit your roadmap. Discover the market-differentiating features of the GPX10PRO and what's coming next.",
  cards: [
    {
      title: 'Explore silicon',
      body:
        "Start with Ambient's AI-native compute products and see how platform advantages translate into real hardware",
      image: imageIds['chipset-1.png'],
    },
    {
      title: 'Develop with ModelForge',
      body:
        'Train, deploy, and optimize through a development workflow designed to help teams build with Ambient without starting from scratch',
    },
    {
      title: 'Evaluate with evaluation kits',
      body:
        'Get hands-on with the platform through evaluation kits designed to accelerate validation and shorten time to first insight',
      image: imageIds['card-image-devkits.png'],
    },
    {
      title: 'Prototype with application-focused modules',
      body:
        'Move faster with modules designed around real-world verticals and product categories',
      image: imageIds['card-image-modules-figma.png'],
    },
  ],
};

// Update the draft, then publish.
const put = await fetch(`${STRAPI_URL}/api/home-page`, {
  method: 'PUT',
  headers: { ...headers, 'Content-Type': 'application/json' },
  body: JSON.stringify({ data: { developer_platform } }),
});
if (!put.ok) throw new Error(`PUT home-page failed: ${put.status} ${await put.text()}`);
const updated = await put.json();

const pub = await fetch(`${STRAPI_URL}/api/home-page/actions/publish`, {
  method: 'POST',
  headers: { ...headers, 'Content-Type': 'application/json' },
  body: JSON.stringify({ documentId: updated.data.documentId }),
});
if (!pub.ok) throw new Error(`publish failed: ${pub.status} ${await pub.text()}`);

console.log('developer_platform updated + published:');
for (const card of developer_platform.cards) {
  console.log(`  - ${card.title} (image #${card.image ?? 'none'})`);
}
