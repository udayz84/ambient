/**
 * seed-footer.js
 * ----------------------------------------------------------------------------
 * Rebuilds and seeds the `footer` single type (api::footer.footer) from scratch.
 *
 * What it does
 *   1. Boots Strapi programmatically via createStrapi(). The load() step runs
 *      the DB schema synchronisation, which (re)creates every footer-related
 *      table that is missing — so this script is safe to run on a fresh DB.
 *   2. Resolves media (icons / logos / background) by file name from the
 *      existing Strapi media library. Missing media is skipped gracefully.
 *   3. Upserts the footer single type with the full content:
 *        - footer.nav_sections  (4 columns of links)
 *        - footer.social_links  (linkedin / x / youtube)
 *        - footer.legal_links   (privacy / terms / cookie)
 *        - footer.copyright_text / crafted_by_text / crafted_by_logo / background_image
 *        - newsletter           (heading / subtitle / placeholder / button / show_on_paths)
 *        - contact_details      (email / phone / locations)
 *        - default_seo          (meta title / description)
 *   4. Grants the Public role read access to api::footer.footer.find so the
 *      Next.js frontend can fetch it without a token.
 *
 * Idempotent: re-running updates the existing entry (does not duplicate).
 *
 * Usage (from /cms):
 *   node seed-footer.js
 *
 * Static values mirror the Next.js fallback constants:
 *   src/components/site-footer/footer-data.ts
 * ----------------------------------------------------------------------------
 */
const path = require('path');
const { createStrapi } = require('@strapi/strapi');

const FOOTER_UID = 'api::footer.footer';

async function main() {
  console.log('Loading Strapi (this also synchronises the DB schema) ...');
  const strapi = createStrapi({
    appDir: __dirname,
    distDir: path.join(__dirname, 'dist'),
  });
  await strapi.load();
  console.log('Strapi loaded.');

  // -- 0. Sanity check: the footer content type + table must be available now.
  const ct = strapi.contentType(FOOTER_UID);
  if (!ct) {
    throw new Error(`Content type ${FOOTER_UID} is not registered. Check src/api/footer.`);
  }
  try {
    await strapi.documents(FOOTER_UID).count();
    console.log('Footer table is present.');
  } catch (e) {
    throw new Error(
      `Footer table is still missing after schema sync: ${e.message}\n` +
      `Run "npm run build" inside /cms first, then re-run this script.`
    );
  }

  // -- 1. Index media library by (lowercased) name for icon/logo lookups.
  const files = await strapi.db.query('plugin::upload.file').findMany({ limit: 1000 });
  const byName = {};
  for (const f of files) {
    const key = (f.name || '').toLowerCase();
    if (key && !(key in byName)) byName[key] = f.id; // first match wins
  }
  const findMedia = async (name) => {
    const id = byName[(name || '').toLowerCase()] || null;
    if (!id) console.warn(`  ! media not found in library: "${name}" (skipping)`);
    return id;
  };

  // -- 2. Build the payload.
  //     (media ids are attached when available; the schema marks them optional)
  const socialLinks = [
    { platform: 'linkedin', href: '#', icon: await findMedia('social-linkedin.svg') },
    { platform: 'x', href: '#', icon: await findMedia('social-x.svg') },
    { platform: 'youtube', href: '#', icon: await findMedia('social-youtube.svg') },
  ];

  const data = {
    footer: {
      nav_sections: [
        {
          title: 'PRODUCTS',
          links: [
            { label: 'GPX10', href: '#' },
            { label: 'GPX64', href: '#' },
            { label: 'Development Kits', href: '#' },
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
      social_links: socialLinks,
      legal_links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Cookie Policy', href: '#' },
      ],
      copyright_text: '© 2026 Ambient AI. All rights reserved.',
      crafted_by_text: 'Carefully crafted by',
      crafted_by_logo: await findMedia('crafted-by.svg'),
      background_image: await findMedia('footer-bg.png'),
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

  // -- 3. Upsert the footer single type.
  const existing = await strapi.documents(FOOTER_UID).findFirst();
  let docId;
  if (existing) {
    const updated = await strapi.documents(FOOTER_UID).update({
      documentId: existing.documentId,
      data,
    });
    docId = updated.documentId;
    console.log(`Updated Footer (documentId: ${docId})`);
  } else {
    const created = await strapi.documents(FOOTER_UID).create({ data });
    docId = created.documentId;
    console.log(`Created Footer (documentId: ${docId})`);
  }

  // -- 4. Grant the Public role read access (so the frontend can fetch it).
  await grantPublicRead(strapi, 'api::footer.footer.find');

  // -- 5. Verify by reading the fully-populated entry back.
  const verify = await strapi.documents(FOOTER_UID).findFirst({
    populate: {
      footer: { populate: { nav_sections: { populate: { links: true } }, social_links: true, legal_links: true, crafted_by_logo: true, background_image: true } },
      newsletter: true,
      contact_details: { populate: { locations: true } },
      default_seo: true,
    },
  });
  const navCount = verify?.footer?.nav_sections?.length || 0;
  const linkTotal = (verify?.footer?.nav_sections || []).reduce(
    (n, s) => n + (s.links?.length || 0), 0
  );
  const socialCount = verify?.footer?.social_links?.length || 0;
  const legalCount = verify?.footer?.legal_links?.length || 0;
  console.log('\n--- Verification ---');
  console.log(`documentId       : ${verify.documentId}`);
  console.log(`nav_sections     : ${navCount} columns, ${linkTotal} links`);
  console.log(`social_links     : ${socialCount}`);
  console.log(`legal_links      : ${legalCount}`);
  console.log(`copyright_text   : ${verify?.footer?.copyright_text}`);
  console.log(`newsletter       : ${verify?.newsletter?.heading}`);
  console.log(`contact email    : ${verify?.contact_details?.email}`);
  console.log(`default_seo      : ${verify?.default_seo?.meta_title}`);
  console.log('--------------------');

  await strapi.destroy();
  console.log('\nFooter seed complete.');
  process.exit(0);
}

async function grantPublicRead(strapi, action) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });
  if (!publicRole) {
    console.warn('  ! Public role not found — skipping permission grant.');
    return;
  }
  const exists = await strapi.db
    .query('plugin::users-permissions.permission')
    .findOne({ where: { role: publicRole.id, action } });
  if (exists) {
    console.log(`Public already has ${action}`);
  } else {
    await strapi.db.query('plugin::users-permissions.permission').create({
      data: { action, role: publicRole.id },
    });
    console.log(`Granted Public access to ${action}`);
  }
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
