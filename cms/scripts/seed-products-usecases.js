/**
 * seed-products-usecases.js
 * ----------------------------------------------------------------------------
 * Seeds the products-page `use_cases` section.
 *
 * Run from the cms/ directory:
 *   node scripts/seed-products-usecases.js
 * ----------------------------------------------------------------------------
 */
const { createStrapi } = require('@strapi/strapi');
const fs = require('node:fs');
const path = require('node:path');

const APPLICATIONS_DIR = path.join(__dirname, '..', '..', 'public', 'applications');

const TABS = [
  { label: "HEARABLES", file: "app-hearables.png" },
  { label: "SMART HOMES", file: "app-smart-home.png" },
  { label: "INDUSTRIAL", file: "app-industrial.png" },
  { label: "AUTOMOTIVE", file: "app-automotive.png" },
  { label: "MEDICAL", file: "app-medical.png" },
  { label: "AGRICULTURE", file: "app-agriculture.png" }
];

async function ensureMedia(app, fileName) {
  const found = await app.entityService.findMany('plugin::upload.file', {
    filters: { name: fileName },
  });
  const existing = Array.isArray(found) ? found[0] : found;
  if (existing) {
    console.log(`  [reuse] ${fileName} (id ${existing.id})`);
    return existing.id;
  }

  const absolute = path.join(APPLICATIONS_DIR, fileName);
  if (!fs.existsSync(absolute)) {
    console.warn(`Warning: Image not found at ${absolute}`);
    return null;
  }
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

    const seededTabs = [];
    for (const tab of TABS) {
      const imageId = await ensureMedia(app, tab.file);
      seededTabs.push({
        label: tab.label,
        watermark_text: tab.label,
        image: imageId,
        feature_cards: [
          {
            title: `${tab.label} Feature 1`,
            description: `On-device AI processing for ${tab.label.toLowerCase()} to prevent accidents and optimize performance.`,
          },
          {
            title: `${tab.label} Feature 2`,
            description: `Monitoring and intelligent management for ${tab.label.toLowerCase()} ensuring extended battery life and efficiency.`,
          },
        ],
      });
    }

    // Explicitly overwrite the Automotive ones to match the design fallback
    const automotiveTab = seededTabs.find(t => t.label === 'AUTOMOTIVE');
    if (automotiveTab) {
      automotiveTab.feature_cards = [
        {
          title: "Tire Pressure Monitoring",
          description: "On-device air pressure and temperature sensors provide real-time alerts for tire health to prevent accidents and optimize maintenance and fuel expenses"
        },
        {
          title: "Battery Management",
          description: "Monitoring of cell utiization, charging patterns, heat generation, etc. in electric vehicle batteries to prevent mishaps and optimize battery life"
        }
      ];
    }
    const agricultureTab = seededTabs.find(t => t.label === 'AGRICULTURE');
    if (agricultureTab) {
      agricultureTab.feature_cards = [
        {
          title: "Tire Pressure Monitoring",
          description: "On-device air pressure and temperature sensors provide real-time alerts for tire health to prevent accidents and optimize maintenance and fuel expenses"
        },
        {
          title: "Battery Management",
          description: "Monitoring of cell utiization, charging patterns, heat generation, etc. in electric vehicle batteries to prevent mishaps and optimize battery life"
        }
      ]; // The user's screenshot had these under Agriculture too.
    }

    const use_cases = {
      heading: 'Built for always-on.\nProven across markets.',
      subtitle: 'The same chip, tuned to the job — from a wrist to a factory floor.',
      primary_button: { label: 'Explore Applications', href: '#' },
      secondary_button: { label: 'Discuss Your Use Case', href: '#' },
      tabs: seededTabs,
    };

    await app.documents(uid).update({
      documentId: existing.documentId,
      data: { use_cases },
      status: 'published',
    });

    console.log('Successfully seeded products use_cases section!');
  } catch (error) {
    console.error('Error seeding:', error);
    process.exitCode = 1;
  } finally {
    process.exit();
  }
}

run();
