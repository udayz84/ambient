/**
 * update-partners-directory.js
 * ----------------------------------------------------------------------------
 * Replaces ONLY directory.partners on the partners-page single type with the
 * new partner cards (CELUS, Zalmotek, Grinn, FAE Technology, TSMC,
 * Edge AI Foundation). All other directory fields (heading, filter labels,
 * bridge, …) and all other sections are left untouched.
 *
 * Dumps the current full entry to the Ambient Backup folder before writing.
 *
 * Run from the cms/ directory:  node scripts/update-partners-directory.js
 * ----------------------------------------------------------------------------
 */
const { createStrapi } = require('@strapi/strapi');
const fs = require('node:fs');
const path = require('node:path');

const BACKUP_DIR = path.join(
  process.env.HOME, 'Desktop', 'Ambient Backup'
);

const NEW_PARTNERS = [
  {
    name: 'CELUS',
    monogram: 'CE',
    capability: 'EDA & Design Platform',
    region: 'EMEA',
    badges: [{ text: 'Design Automation' }],
    one_liner:
      'AI-powered electronics design platform that turns requirements into reference schematics and BOMs, streamlining handoff into major EDA tools.',
  },
  {
    name: 'Zalmotek',
    monogram: 'ZA',
    capability: 'Design & Prototyping',
    region: 'EMEA',
    badges: [{ text: 'Hardware Provider' }],
    one_liner:
      'Embedded systems consultancy delivering custom hardware, firmware, edge AI, and production-ready prototypes for connected products.',
  },
  {
    name: 'Grinn',
    monogram: 'GR',
    capability: 'IoT Engineering',
    region: 'EMEA',
    badges: [{ text: 'System-on-Modules' }],
    one_liner:
      'IoT engineering partner spanning hardware, embedded software, and production management, plus ready-to-use SoMs for edge products.',
  },
  {
    name: 'FAE Technology',
    monogram: 'FA',
    capability: 'Electronics & Manufacturing',
    region: 'EMEA',
    badges: [{ text: 'EMS / ODM' }],
    one_liner:
      'Industrial electronics group offering engineering, embedded solutions, and contract manufacturing for complex electronic systems.',
  },
  {
    name: 'TSMC',
    monogram: 'TS',
    capability: 'Silicon Manufacturing',
    region: 'APAC',
    badges: [{ text: 'Foundry Partner' }],
    one_liner:
      'World-leading foundry partner enabling advanced semiconductor manufacturing, prototyping, and production at scale.',
  },
  {
    name: 'Edge AI Foundation',
    monogram: 'EA',
    capability: 'Community & Education',
    region: 'GLOBAL',
    badges: [{ text: 'Ecosystem Partner' }],
    one_liner:
      'Global foundation for edge AI collaboration, advocacy, education, and ecosystem development across industry and academia.',
  },
];

async function run() {
  const app = await createStrapi({ distDir: './dist' }).load();
  try {
    const uid = 'api::partners-page.partners-page';
    const existing = await app.entityService.findMany(uid, { populate: '*' });
    if (!existing) {
      console.error('partners-page entry not found — nothing to update.');
      process.exitCode = 1;
      return;
    }

    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    const backupPath = path.join(
      BACKUP_DIR,
      `partners-page-entry-backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`
    );
    fs.writeFileSync(backupPath, JSON.stringify(existing, null, 2));
    console.log(`[backup] current entry dumped to ${backupPath}`);

    const directory = {
      ...existing.directory,
      partners: NEW_PARTNERS,
    };
    delete directory.id;

    await app.documents(uid).update({
      documentId: existing.documentId,
      data: { directory },
      status: 'published',
    });

    const check = await app.entityService.findMany(uid, {
      populate: { directory: { populate: { partners: { populate: 'badges' } } } },
    });
    const partners = check?.directory?.partners ?? [];
    console.log(`[verify] ${partners.length} partners now on the page:`);
    partners.forEach((p) =>
      console.log(`  - ${p.name} | ${p.region} | ${p.capability} | ${(p.badges ?? []).map((b) => b.text).join(', ')}`)
    );
    console.log('Done.');
  } catch (error) {
    console.error('Error updating partners directory:', error);
    process.exitCode = 1;
  } finally {
    process.exit();
  }
}

run();
