/**
 * seed-hero-announcements.js
 * ----------------------------------------------------------------------------
 * Seeds the home-page hero (main slide) videos and the carousel announcement
 * slides (template slides, slides 2+). Same pattern as
 * seed-home-casestudies.js: boots Strapi programmatically, no API token.
 *
 * Desktop/mobile hero videos are uploaded from the frontend /public dir
 * (name-based reuse — newest library entry wins on re-run).
 *
 * Announcement slides ship WITHOUT images — the frontend renders static
 * news-card imagery as fallback; an image uploaded to the announcement in
 * Strapi overrides it (same "never fabricate" convention as the
 * case-studies cards).
 *
 * The full hero component is rewritten — existing fields (title, subtitle,
 * metrics, …) are passed through untouched.
 *
 * Run from the cms/ directory after `npm run build`:
 *   node scripts/seed-hero-announcements.js
 * ----------------------------------------------------------------------------
 */
const { createStrapi } = require('@strapi/strapi');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..', '..');

const VIDEOS = {
  video: { file: path.join(ROOT, 'public', 'hero', 'Ambient Hero Dummy Video.mp4'), mime: 'video/mp4' },
  mobile_video: { file: path.join(ROOT, 'public', 'mobile', 'Keep_camera_angle_202604021718.mp4'), mime: 'video/mp4' },
};

/** Upload an asset, or reuse the newest library entry with the same name. */
async function ensureMedia(app, { file, mime }) {
  const fileName = path.basename(file);
  const stat = fs.statSync(file);

  const found = await app.entityService.findMany('plugin::upload.file', {
    filters: { name: fileName },
  });
  const matches = Array.isArray(found) ? found : found ? [found] : [];
  // ponytail: size matching is impossible here — the Azure provider records a
  // size that matches neither bytes nor KB of the source file. Reuse is
  // name-based (newest wins); if a same-named asset changes on disk, delete
  // the old library entry in the admin UI before re-seeding.
  const existing = matches.length > 0
    ? matches.reduce((a, b) => (a.id > b.id ? a : b))
    : null;
  if (existing) {
    console.log(`  [reuse] ${fileName} (id ${existing.id})`);
    return existing.id;
  }

  const uploaded = await app.plugin('upload').service('upload').upload({
    data: { fileInfo: { name: fileName, alternativeText: fileName, caption: '' } },
    files: { filepath: file, originalFilename: fileName, mimetype: mime, size: stat.size },
  });
  const uploadedFile = Array.isArray(uploaded) ? uploaded[0] : uploaded;
  console.log(`  [upload] ${fileName} (id ${uploadedFile.id})`);
  return uploadedFile.id;
}

const ANNOUNCEMENTS = [
  {
    tag: 'Announcement',
    title: 'Meet us at CES 2026',
    subtitle:
      'See live demos of the GPX10 PRO running always-on AI at microwatt power. Las Vegas, January 6–9.',
    image: null,
    image_alt: 'Ambient Scientific GPX10 chip board',
    ctas: [
      { label: 'Book a meeting', href: '/contact', variant: 'primary' },
      { label: "What we're showing", href: '/news-listing', variant: 'secondary' },
    ],
  },
  {
    tag: 'New release',
    title: 'GPX10 PRO DevKit is shipping',
    subtitle:
      'Plug-and-play evaluation kits to prototype always-on AI — from wake-word to sensor fusion — in days, not months.',
    image: null,
    image_alt: 'GPX10 PRO DevKit board',
    ctas: [
      { label: 'Shop the kit', href: '/dvk', variant: 'primary' },
      { label: 'Explore the DVK', href: '/dvk', variant: 'secondary' },
    ],
  },
];

async function run() {
  const app = await createStrapi({ distDir: './dist' }).load();
  const uid = 'api::home-page.home-page';

  try {
    const existing = await app.entityService.findMany(uid, {
      populate: {
        hero: {
          populate: {
            video: true,
            mobile_video: true,
            metrics: { populate: '*' },
            announcements: { populate: '*' },
          },
        },
      },
    });
    if (!existing) {
      console.error('Home page not found. Please create it in the admin UI first.');
      process.exit(1);
    }
    const hero = existing.hero || {};

    const videoIds = {};
    for (const [field, asset] of Object.entries(VIDEOS)) {
      videoIds[field] = await ensureMedia(app, asset);
    }

    const updatedHero = {
      video: videoIds.video,
      video_alt: hero.video_alt ?? 'Ambient Scientific hero video',
      mobile_video: videoIds.mobile_video,
      mobile_video_alt: hero.mobile_video_alt ?? 'Ambient Scientific hero video (mobile)',
      title: hero.title,
      subtitle: hero.subtitle,
      scroll_text: hero.scroll_text,
      metrics: hero.metrics ?? [],
      announcements: ANNOUNCEMENTS,
    };

    await app.documents(uid).update({
      documentId: existing.documentId,
      data: { hero: updatedHero },
      status: 'published',
    });

    const check = await app.entityService.findMany(uid, {
      populate: {
        hero: {
          populate: {
            video: true,
            mobile_video: true,
            announcements: { populate: '*' },
          },
        },
      },
      publicationState: 'preview',
    });
    const slides = check?.hero?.announcements ?? [];
    console.log(`Hero videos: desktop=${check?.hero?.video?.url ?? 'MISSING'}, mobile=${check?.hero?.mobile_video?.url ?? 'MISSING'}`);
    console.log(`Seeded hero announcements: ${slides.length} slides`);
    slides.forEach((s, i) =>
      console.log(`  ${i + 1}. [${s.tag}] ${s.title} — image=${s.image ? s.image.url : 'none (static fallback)'}`)
    );
    console.log('Successfully seeded hero announcements!');
  } catch (error) {
    console.error('Error seeding:', error);
    process.exitCode = 1;
  } finally {
    process.exit();
  }
}

run();
