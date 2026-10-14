/**
 * seed-products-measured.js
 * ----------------------------------------------------------------------------
 * Seeds the products-page `measured` section ("Not projected. Measured in
 * silicon." — three spec cards + CTAs, Figma 3309:1912) without an API token:
 * boots Strapi programmatically (same pattern as seed-technology-updates.js),
 * uploads the three chip images from /public/products (reused by name when
 * already in the Media Library), then replaces the `measured` component and
 * publishes it.
 *
 * Run from the cms/ directory:
 *   node scripts/seed-products-measured.js
 * ----------------------------------------------------------------------------
 */
const { createStrapi } = require('@strapi/strapi');
const fs = require('node:fs');
const path = require('node:path');

const PRODUCTS_DIR = path.join(__dirname, '..', '..', 'public', 'products');

const CHIP_IMAGES = {
  gpx10: 'measured-chip-gpx10.png',
  risc_mcu: 'measured-chip-risc.png',
  mcu_npu: 'measured-chip-mcu-npu.png',
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

  const absolute = path.join(PRODUCTS_DIR, fileName);
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
    const uid = 'api::products-page.products-page';
    const existing = await app.entityService.findMany(uid);
    if (!existing) {
      console.error('Products page not found. Please create it in the admin UI first.');
      process.exit(1);
    }

    const chipIds = {};
    for (const [variant, fileName] of Object.entries(CHIP_IMAGES)) {
      chipIds[variant] = await ensureMedia(app, fileName);
    }

    const measured = {
      tag: { text: 'Measured proof' },
      heading: 'Not projected.\nMeasured in silicon.',
      subtitle:
        "Here's GPX10 Pro against the alternatives a design team actually weighs.",
      cards: [
        {
          name: 'GPX10 Pro',
          variant: 'gpx10',
          chip_image: chipIds.gpx10,
          stats: [
            { icon: 'speed', label: 'Peak Compute (GOPS)', value: '512', is_green: true },
            { icon: 'energy', label: 'Active Power', value: '40 - 120 µW', is_green: true },
            { icon: 'eco', label: 'Efficiency (TOPS/W)', value: '7.3', is_green: true },
          ],
        },
        {
          name: 'RISC MCU',
          variant: 'risc_mcu',
          chip_image: chipIds.risc_mcu,
          stats: [
            { icon: 'speed', label: 'Peak Compute (GOPS)', value: '0.02' },
            { icon: 'energy', label: 'Active Power', value: '600 mW' },
            { icon: 'eco', label: 'Efficiency (TOPS/W)', value: '0.02' },
          ],
        },
        {
          name: 'MCU + NPU',
          variant: 'mcu_npu',
          chip_image: chipIds.mcu_npu,
          stats: [
            // Figma renders this card's "100" in Gilroy Medium, the rest in Bold.
            { icon: 'speed', label: 'Peak Compute (GOPS)', value: '100', is_medium: true },
            { icon: 'energy', label: 'Active Power', value: '200 mW' },
            { icon: 'eco', label: 'Efficiency (TOPS/W)', value: '1.2' },
          ],
        },
      ],
      // Labels are Figma-verbatim (leading space is part of the design text).
      primary_button: { label: ' Download the Full Datasheet', href: '#', variant: 'primary' },
      secondary_button: { label: ' Read the Architecture Whitepaper', href: '#', variant: 'secondary' },
    };

    await app.documents(uid).update({
      documentId: existing.documentId,
      data: { measured },
      status: 'published',
    });

    // Verify: re-read the published section with cards populated.
    const check = await app.entityService.findMany(uid, {
      populate: { measured: { populate: { cards: { populate: '*' } } } },
      publicationState: 'preview',
    });
    const cards = check?.measured?.cards ?? [];
    console.log(
      `Seeded measured section: ${cards.length} cards — ${cards
        .map((c) => `${c.name} (${(c.stats || []).length} stats, image #${c.chip_image?.id ?? '?'})`)
        .join(', ')}`
    );
    console.log('Successfully seeded products measured section!');
  } catch (error) {
    console.error('Error seeding:', error);
    process.exitCode = 1;
  } finally {
    process.exit();
  }
}

run();
