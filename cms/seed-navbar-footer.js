/**
 * seed-navbar-footer.js
 * ----------------------------------------------------------------------------
 * Seeds the dedicated `navbar` and `footer` single types with static data.
 *
 * Loads Strapi directly via createStrapi() (like fix-perms.js / seed-global-
 * settings.js), so NO API token / HTTP server is required. Media is reused from
 * the existing media library (looked up by file name) instead of re-uploading.
 *
 * Idempotent: if a single type already exists it is updated, otherwise created.
 *
 * Static values mirror the Next.js fallback constants:
 *   - src/components/navbar/nav-items.ts        (FALLBACK_NAV_ITEMS)
 *   - src/components/site-footer/footer-data.ts (FALLBACK_FOOTER_*)
 *
 * Usage (from /cms):
 *   node seed-navbar-footer.js
 * ----------------------------------------------------------------------------
 */
const path = require('path');
const { createStrapi } = require('@strapi/strapi');

const NAVBAR_UID = 'api::navbar.navbar';
const FOOTER_UID = 'api::footer.footer';

async function main() {
  console.log('Loading Strapi ...');
  const strapi = createStrapi({
    appDir: __dirname,
    distDir: path.join(__dirname, 'dist'),
  });
  await strapi.load();

  // 1. Index existing media-library files by (lowercased) name.
  const files = await strapi.db.query('plugin::upload.file').findMany({ limit: 1000 });
  const byName = {};
  for (const f of files) {
    const key = (f.name || '').toLowerCase();
    if (key && !(key in byName)) byName[key] = f.id; // first match wins
  }
  const media = (name) => byName[(name || '').toLowerCase()] || null;
  const findMedia = async (name) => {
    const id = media(name);
    if (!id) console.warn(`  ! media not found in library: "${name}" (skipping)`);
    return id;
  };

  const logoId = media('logo.png');
  if (!logoId) {
    throw new Error('logo.png is missing from the media library. Upload it in Strapi admin first.');
  }

  // ---------- Navbar ----------
  const navbarData = {
    brand: {
      site_name: 'Ambient Scientific',
      logo: logoId,
      logo_mobile: logoId,
      favicon: logoId, // PNG placeholder; Next.js serves its own favicon.ico
    },
    header: {
      nav_items: [
        { label: 'Products', href: '/products', has_dropdown: true },
        { label: 'Technology', href: '/technology', has_dropdown: true },
        { label: 'Applications', href: '/applications', has_dropdown: true },
        { label: 'Company', href: '/company', has_dropdown: true },
        { label: 'News & Resources', href: '/news-listing', has_dropdown: true },
        { label: 'Blog', href: '/resources', has_dropdown: true },
        { label: 'Career', href: '/careers', has_dropdown: false },
      ],
      cta_label: 'GET IN TOUCH',
      cta_href: '/contact',
      cta_dot_icon: await findMedia('cta-dot.svg'),
    },
  };

  // ---------- Footer ----------
  const socialLinks = [
    { platform: 'linkedin', href: '#', icon: await findMedia('social-linkedin.svg') },
    { platform: 'x', href: '#', icon: await findMedia('social-x.svg') },
    { platform: 'youtube', href: '#', icon: await findMedia('social-youtube.svg') },
  ].filter((s) => s.icon);

  const footerData = {
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

  // 2. Create or update each single type.
  await upsertSingleType(strapi, NAVBAR_UID, navbarData, 'Navbar');
  await upsertSingleType(strapi, FOOTER_UID, footerData, 'Footer');

  console.log('Seed complete.');
  await strapi.destroy();
  process.exit(0);
}

async function upsertSingleType(strapi, uid, data, label) {
  const existing = await strapi.documents(uid).findFirst();
  if (existing) {
    await strapi.documents(uid).update({ documentId: existing.documentId, data });
    console.log(`Updated ${label} (documentId: ${existing.documentId})`);
  } else {
    const created = await strapi.documents(uid).create({ data });
    console.log(`Created ${label} (documentId: ${created.documentId})`);
  }
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
