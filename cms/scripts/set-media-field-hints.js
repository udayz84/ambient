/**
 * set-media-field-hints.js
 * ----------------------------------------------------------------------------
 * Writes the recommended-image-size hint into the Content Manager VIEW
 * CONFIGURATION (admin "Configure the view") for every media field, so it
 * renders under the field label in the edit view.
 *
 * Why not schema.json `description`: Strapi v5's edit view takes its field
 * hint from core-store metadatas (useDocumentLayout: hint =
 * metadatas[field].edit.description), NOT from the schema attribute. The
 * schema descriptions are kept too (visible in the Content-Type Builder),
 * but this script makes them visible where editors work.
 *
 * Boots Strapi programmatically (same pattern as seed-developer-platform.js),
 * syncs all configurations first (so full default metadatas/layouts exist),
 * then read-modify-writes each model's config through the CM's own services.
 * Survives restarts: bootstrap re-syncs with stored metadatas winning.
 *
 * Spec source: /tmp/media_spec_uid.json (uid -> {field -> description}).
 * Run from the cms/ directory:  node scripts/set-media-field-hints.js
 * ----------------------------------------------------------------------------
 */
const { createStrapi } = require('@strapi/strapi');
const fs = require('node:fs');

const SPEC = JSON.parse(fs.readFileSync('/tmp/media_spec_uid.json', 'utf8'));

async function run() {
  const app = await createStrapi({ distDir: './dist' }).load();
  const componentsSvc = app.plugin('content-manager').service('components');
  const contentTypesSvc = app.plugin('content-manager').service('content-types');

  // Ensure every model has a full, synced config in the core store first.
  await componentsSvc.syncConfigurations();
  await contentTypesSvc.syncConfigurations();

  let ok = 0;
  const failed = [];

  for (const [uid, fields] of Object.entries(SPEC)) {
    try {
      const isComponent = !uid.startsWith('api::');
      const svc = isComponent ? componentsSvc : contentTypesSvc;
      const model = isComponent ? svc.findComponent(uid) : svc.findContentType(uid);
      if (!model) throw new Error('model not found');

      const config = await svc.findConfiguration(model);
      for (const [field, description] of Object.entries(fields)) {
        const meta = (config.metadatas[field] = config.metadatas[field] || { edit: {}, list: {} });
        meta.edit = meta.edit || {};
        meta.edit.description = description;
      }
      await svc.updateConfiguration(model, {
        settings: config.settings,
        metadatas: config.metadatas,
        layouts: config.layouts,
      });
      ok++;
    } catch (err) {
      failed.push(`${uid}: ${err.message}`);
    }
  }

  console.log(`view configs updated: ${ok}/${Object.keys(SPEC).length}`);
  if (failed.length) {
    console.error('FAILED:\n' + failed.join('\n'));
    process.exitCode = 1;
  }
  process.exit();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
