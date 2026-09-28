/**
 * seed-footer-data.js
 * ----------------------------------------------------------------------------
 * Seeds the `footer` single type (api::footer.footer) by loading Strapi
 * directly — NO API token required (unlike seed-footer.js which is REST/token
 * gated). Idempotent: creates the single type if absent, otherwise updates it.
 *
 * Content mirrors the Next.js fallback constants:
 *   src/components/site-footer/footer-data.ts
 *
 * Usage (from /cms), while the Postgres DB is reachable:
 *   node seed-footer-data.js
 * ----------------------------------------------------------------------------
 */

const path = require('path');
const { createStrapi } = require('@strapi/core');

const FOOTER_UID = 'api::footer.footer';
const FILE_UID = 'plugin::upload.file';

/** Resolve a media file (numeric id) by case-insensitive name keyword,
 *  preferring the original over generated size variants. */
async function findMedia(strapi, keyword, excludeKeywords = []) {
  const files = await strapi.db.query(FILE_UID).findMany({
    where: { name: { $containsi: keyword } },
    orderBy: { id: 'asc' },
  });
  const isVariant = (name) =>
    /^(thumbnail|small|medium|large)_/i.test(name || '');
  const excluded = (f) =>
    excludeKeywords.every((k) => !(f.name || '').toLowerCase().includes(k));
  const original =
    files.find((f) => !isVariant(f.name) && excluded(f)) ||
    files.find((f) => excluded(f)) ||
    null;
  if (!original) {
    console.warn(`  ! media not found for "${keyword}" (skipping)`);
    return null;
  }
  // The Entity Service links media by the file's numeric id.
  return original.id;
}

/** Upsert the footer single type via the Entity Service (reliable media
 *  linking with numeric file ids). */
async function upsertFooter(strapi, data) {
  const existing = await strapi.db.query(FOOTER_UID).findOne({ select: ['id'] });

  if (existing?.id != null) {
    const updated = await strapi.entityService.update(FOOTER_UID, existing.id, {
      data,
    });
    console.log(`Updated Footer (id: ${existing.id})`);
    return updated;
  }

  const created = await strapi.entityService.create(FOOTER_UID, { data });
  console.log(`Created Footer (id: ${created.id})`);
  return created;
}

async function main() {
  console.log('Loading Strapi...');
  const strapi = createStrapi({
    appDir: path.resolve(__dirname),
    distDir: path.resolve(__dirname, 'dist'),
  });
  await strapi.load();

  // -- 1. Resolve media from the library.
  console.log('Resolving media by name...');
  const [
    socialLinkedin,
    socialX,
    socialYoutube,
    craftedByLogo,
    backgroundImage,
  ] = await Promise.all([
    findMedia(strapi, 'linkedin'),
    findMedia(strapi, 'social_x'),
    findMedia(strapi, 'youtube'),
    findMedia(strapi, 'crafted_by'),
    findMedia(strapi, 'footer_bg', ['merge']),
  ]);

  // -- 2. Build the payload (mirrors src/components/site-footer/footer-data.ts).
  const data = {
    footer: {
      nav_sections: [
        {
          title: 'PRODUCTS',
          links: [
            { label: 'GPX10', href: '#' },
            { label: 'GPX64', href: '#' },
            { label: 'Evaluation Kits', href: '#' },
            { label: 'ModelForge', href: '#' },
          ],
        },
        {
          title: 'SOLUTIONS',
          links: [
            { label: 'Medical & Wearables', href: '#' },
            { label: 'Smart Home', href: '#' },
            { label: 'Industrial IoT', href: '#' },
            { label: 'Robotics', href: '#' },
          ],
        },
        {
          title: 'Resources',
          links: [
            { label: 'Documentation', href: '#' },
            { label: 'Case Studies', href: '#' },
            { label: 'Technical Papers', href: '#' },
            { label: 'Blog', href: '#' },
          ],
        },
        {
          title: 'Company',
          links: [
            { label: 'About', href: '#' },
            { label: 'Careers', href: '#' },
            { label: 'Industrial IoT', href: '#' },
            { label: 'Contact', href: '#' },
          ],
        },
      ],
      social_links: [
        { platform: 'linkedin', href: '#', icon: socialLinkedin, alt: 'LinkedIn' },
        { platform: 'x', href: '#', icon: socialX, alt: 'X' },
        { platform: 'youtube', href: '#', icon: socialYoutube, alt: 'YouTube' },
      ],
      legal_links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Cookie Policy', href: '#' },
      ],
      copyright_text: '© 2026 Ambient AI. All rights reserved.',
      crafted_by_text: 'Carefully crafted by',
      crafted_by_logo: craftedByLogo,
      crafted_by_logo_alt: 'Crafted by 3minds',
      background_image: backgroundImage,
      background_image_alt: 'Footer background',
    },
    newsletter: {
      heading: 'Want to stay in the forefront of AI tech.',
      subtitle: 'Sign up to receive regular updates.',
      input_placeholder: 'Your Email ID',
      button_label: 'SUBSCRIBE',
      show_on_paths: ['/', '/company'],
    },
    contact_details: {
      email: 'contact@ambientscientific.com',
      phone: '',
      locations: [],
    },
    default_seo: {
      meta_title: 'Ambient Scientific',
      meta_description: 'Ambient Scientific default SEO configuration',
      keywords: '',
      noindex: false,
      canonical_url: '',
    },
  };

  // -- 3. Try with media; if Strapi rejects the media reference shape, fall
  //        back to a text-only seed so the footer is never left empty.
  let saved;
  try {
    saved = await upsertFooter(strapi, data);
  } catch (err) {
    console.warn(`Seed with media failed (${err.message}); retrying text-only.`);
    const stripMedia = (obj) => {
      const clone = { ...obj };
      ['icon', 'crafted_by_logo', 'background_image', 'indicator_icon'].forEach(
        (k) => delete clone[k]
      );
      if (Array.isArray(clone.social_links)) {
        clone.social_links = clone.social_links.map((s) => {
          const { icon, ...rest } = s;
          return rest;
        });
      }
      return clone;
    };
    const textOnly = {
      ...data,
      footer: stripMedia(data.footer),
    };
    saved = await upsertFooter(strapi, textOnly);
  }

  // -- 4. Verify (populate media fields so presence is reported correctly).
  const verify = await strapi.entityService.findOne(FOOTER_UID, saved.id, {
    populate: {
      footer: {
        populate: {
          nav_sections: { populate: { links: true } },
          social_links: { populate: { icon: true } },
          legal_links: true,
          crafted_by_logo: true,
          background_image: true,
        },
      },
      newsletter: true,
      contact_details: { populate: { locations: true } },
      default_seo: true,
    },
  });
  const f = verify?.footer || {};
  const navSections = f.nav_sections || [];
  const linkTotal = navSections.reduce((n, s) => n + (s.links?.length || 0), 0);
  console.log('\n--- Verification ---');
  console.log(`documentId       : ${verify?.documentId}`);
  console.log(`nav_sections     : ${navSections.length} columns, ${linkTotal} links`);
  console.log(`social_links     : ${f.social_links?.length || 0}`);
  console.log(`legal_links      : ${f.legal_links?.length || 0}`);
  console.log(`copyright_text   : ${f.copyright_text}`);
  console.log(`crafted_by_logo  : ${f.crafted_by_logo ? 'present' : 'none'}`);
  console.log(`background_image : ${f.background_image ? 'present' : 'none'}`);
  console.log(`newsletter       : ${verify?.newsletter?.heading}`);
  console.log(`contact email    : ${verify?.contact_details?.email}`);
  console.log(`default_seo      : ${verify?.default_seo?.meta_title}`);
  console.log('--------------------');

  await strapi.destroy();
  console.log('\nFooter seed complete.');
  process.exit(0);
}

main().catch((err) => {
  console.error('Seed failed:', err?.message || err);
  process.exit(1);
});
