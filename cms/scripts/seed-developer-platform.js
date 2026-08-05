/**
 * seed-developer-platform.js
 * ----------------------------------------------------------------------------
 * Aligns the home-page `developer_platform` section ("Build the impossible
 * today", Figma 2379:964) with the design:
 *   - card order restored to Figma (ModelForge middle, Evaluate right/tall)
 *   - laptop placeholders replaced with Figma exports (chipset, dev kit,
 *     modules) uploaded from /public/developer-platform
 *   - subtitle corrected: GPX10 -> GPX10PRO
 * Boots Strapi programmatically (same pattern as seed-products-measured.js).
 *
 * Run from the cms/ directory:
 *   node scripts/seed-developer-platform.js
 * ----------------------------------------------------------------------------
 */
const { createStrapi } = require('@strapi/strapi');
const fs = require('node:fs');
const path = require('node:path');

const ASSETS_DIR = '/tmp';

const IMAGES = {
  chipset: 'chipset-1.png',
  devkits: 'card-image-devkits.png',
  modules: 'card-image-modules-figma.png',
};

/** Upload a public/ asset to the Media Library, reusing an existing entry by name. */
async function ensureMedia(app, fileName) {
  const found = await app.entityService.findMany('plugin::upload.file', {
    filters: { name: fileName },
  });
  const existing = Array.isArray(found) ? found[0] : found;
  if (existing) {
    console.log(`  [reuse] ${fileName} (id ${existing.id})`);
    return existing.id;
  }

  const absolute = path.join(ASSETS_DIR, fileName);
  const stat = fs.statSync(absolute);
  const uploaded = await app.plugin('upload').service('upload').upload({
    data: { fileInfo: { name: fileName, alternativeText: fileName, caption: '' } },
    files: {
      filepath: absolute,
      originalFilename: fileName,
      mimetype: 'image/png',
      size: stat.size,
    },
  });
  const file = Array.isArray(uploaded) ? uploaded[0] : uploaded;
  console.log(`  [upload] ${fileName} (id ${file.id})`);
  return file.id;
}

async function run() {
  const app = await createStrapi({ distDir: './dist' }).load();

  try {
    const uid = 'api::home-page.home-page';
    const existing = await app.entityService.findMany(uid);
    if (!existing) {
      console.error('Home page not found. Please create it in the admin UI first.');
      process.exit(1);
    }

    const imageIds = {};
    for (const [variant, fileName] of Object.entries(IMAGES)) {
      imageIds[variant] = await ensureMedia(app, fileName);
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
          image: imageIds.chipset,
        },
        {
          title: 'Develop with ModelForge',
          body:
            'Train, deploy, and optimize through a development workflow designed to help teams build with Ambient without starting from scratch',
        },
        {
          title: 'Evaluate with development kits',
          body:
            'Get hands-on with the platform through development kits designed to accelerate validation and shorten time to first insight',
          image: imageIds.devkits,
        },
        {
          title: 'Prototype with application-focused modules',
          body:
            'Move faster with modules designed around real-world verticals and product categories',
          image: imageIds.modules,
        },
      ],
    };

    await app.documents(uid).update({
      documentId: existing.documentId,
      data: { developer_platform },
      status: 'published',
    });

    const check = await app.entityService.findMany(uid, {
      populate: { developer_platform: { populate: { cards: { populate: '*' } } } },
      publicationState: 'preview',
    });
    const dp = check?.developer_platform ?? {};
    console.log(`subtitle: ${dp.subtitle}`);
    console.log(
      `Seeded developer_platform: ${(dp.cards || [])
        .map((c) => `${c.title} (image #${c.image?.id ?? 'none'})`)
        .join(', ')}`
    );
    console.log('Successfully seeded developer platform section!');
  } catch (error) {
    console.error('Error seeding:', error);
    process.exitCode = 1;
  } finally {
    process.exit();
  }
}

run();
