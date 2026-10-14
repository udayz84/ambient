/**
 * update-wearables-hero-images.js
 * ----------------------------------------------------------------------------
 * Replaces the /applications/wearables hero background images with the correct
 * Figma 2509:372 exports:
 *   - background_image_1 (image 162): full scene — ring, watch, earbuds on podiums
 *   - background_image_2 (image 163): transparent product cutout overlay
 * The previously seeded images were old watch-only renders, so the ring and
 * earbuds (left/right photo sections) were missing on the page.
 *
 * Boots Strapi programmatically (no API token needed), uploads the two files
 * from /public/applications/wearables (reused only when name AND byte size
 * match, so stale same-name uploads are not picked), updates the hero
 * component, and publishes.
 *
 * Run from the cms/ directory:
 *   node scripts/update-wearables-hero-images.js
 * ----------------------------------------------------------------------------
 */
const { createStrapi } = require('@strapi/strapi');
const fs = require('node:fs');
const path = require('node:path');

const ASSETS_DIR = path.join(__dirname, '..', '..', 'public', 'applications', 'wearables');

const IMAGES = {
  background_image_1: 'hero-bg-162.png',
  background_image_2: 'hero-bg-163.png',
};

/** Upload an asset, reusing a library entry only when name AND byte size match. */
async function ensureMedia(app, fileName) {
  const absolute = path.join(ASSETS_DIR, fileName);
  const stat = fs.statSync(absolute);

  const found = await app.entityService.findMany('plugin::upload.file', {
    filters: { name: fileName },
  });
  const matches = Array.isArray(found) ? found : found ? [found] : [];
  const existing = matches.find((f) => Math.abs(f.size * 1000 - stat.size) < 1024);
  if (existing) {
    console.log(`  [reuse] ${fileName} (id ${existing.id})`);
    return existing.id;
  }

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

const cleanButton = (btn) =>
  btn ? { label: btn.label, href: btn.href, variant: btn.variant } : null;

async function run() {
  const app = await createStrapi({ distDir: './dist' }).load();

  try {
    const uid = 'api::application-page.application-page';
    const found = await app.entityService.findMany(uid, {
      filters: { slug: 'wearables' },
      populate: { hero: { populate: '*' } },
    });
    const page = Array.isArray(found) ? found[0] : found;
    if (!page) {
      console.error('application-page with slug "wearables" not found.');
      process.exit(1);
    }
    const hero = page.hero || {};

    const imageIds = {};
    for (const [field, fileName] of Object.entries(IMAGES)) {
      imageIds[field] = await ensureMedia(app, fileName);
    }

    const updatedHero = {
      title: hero.title,
      subtitle: hero.subtitle,
      watermark: hero.watermark,
      primary_button: cleanButton(hero.primary_button),
      secondary_button: cleanButton(hero.secondary_button),
      background_image_1: imageIds.background_image_1,
      background_image_1_alt: hero.background_image_1_alt,
      background_image_2: imageIds.background_image_2,
      background_image_2_alt: hero.background_image_2_alt,
      title_frame: hero.title_frame?.id ?? null,
      title_frame_alt: hero.title_frame_alt,
    };

    await app.documents(uid).update({
      documentId: page.documentId,
      data: { hero: updatedHero },
      status: 'published',
    });

    // Verify: re-read with hero populated.
    const check = await app.entityService.findMany(uid, {
      filters: { slug: 'wearables' },
      populate: { hero: { populate: '*' } },
      publicationState: 'preview',
    });
    const checkPage = Array.isArray(check) ? check[0] : check;
    console.log(
      `Hero images updated: bg1=${checkPage?.hero?.background_image_1?.url}, bg2=${checkPage?.hero?.background_image_2?.url}`
    );
    console.log('Successfully updated wearables hero images!');
  } catch (error) {
    console.error('Error updating:', error);
    process.exitCode = 1;
  } finally {
    process.exit();
  }
}

run();
