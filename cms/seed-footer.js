/**
 * seed-footer.js
 * ----------------------------------------------------------------------------
 * Seeds the `footer` single type (api::footer.footer) via the Strapi REST API.
 *
 * What it does
 *   1. Resolves media (icons / logos / background) by file name from the
 *      Strapi media library via /api/upload/files. Missing media is skipped
 *      gracefully (the schema marks all media fields optional).
 *   2. Upserts the footer single type:
 *        - footer.nav_sections   (4 columns of links)
 *        - footer.social_links   (linkedin / x / youtube)
 *        - footer.legal_links    (privacy / terms / cookie)
 *        - footer.copyright_text / crafted_by_text / crafted_by_logo / background_image
 *        - newsletter            (heading / subtitle / placeholder / button / show_on_paths)
 *        - contact_details       (email / phone / locations)
 *        - default_seo           (meta title / description)
 *   3. Reads the fully-populated entry back and prints a verification summary.
 *
 * Idempotent: re-running updates the existing entry (does not duplicate).
 *
 * Usage (from /cms):
 *   node seed-footer.js
 *   # or override the URL / token inline:
 *   STRAPI_URL=http://127.0.0.1:1338 STRAPI_TOKEN=xxx node seed-footer.js
 *
 * Static values mirror the Next.js fallback constants:
 *   src/components/site-footer/footer-data.ts
 * ----------------------------------------------------------------------------
 */

const STRAPI_URL = (process.env.STRAPI_URL || 'http://127.0.0.1:1338').replace(/\/$/, '');
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || '';
const FOOTER_PATH = '/api/footer';

if (!STRAPI_TOKEN) {
  console.error('Missing STRAPI_TOKEN. Set it inline or in cms/.env');
  process.exit(1);
}

/** JSON fetch helper that attaches the API token. */
async function api(path, { method = 'GET', body, expect404 = false } = {}) {
  const res = await fetch(`${STRAPI_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch { /* non-JSON body */ }

  if (!res.ok) {
    if (expect404 && res.status === 404) return null;
    const msg = json?.error?.message || text || res.statusText;
    throw new Error(`${method} ${path} -> ${res.status}: ${msg}`);
  }
  return json;
}

/** Look up a media file id by exact (case-insensitive) name. */
async function findMediaByName(name) {
  if (!name) return null;
  const json = await api(
    `/api/upload/files?filters[name][$eq]=${encodeURIComponent(name)}&pageSize=1`
  );
  const id = json?.results?.[0]?.id ?? json?.[0]?.id ?? null;
  if (!id) console.warn(`  ! media not found in library: "${name}" (skipping)`);
  return id;
}

async function main() {
  console.log(`Seeding footer at ${STRAPI_URL}${FOOTER_PATH}`);

  // -- 1. Resolve media from the library (skips gracefully if absent).
  console.log('Resolving media by name...');
  const [
    socialLinkedin, socialX, socialYoutube, craftedByLogo, backgroundImage,
  ] = await Promise.all([
    findMediaByName('social-linkedin.svg'),
    findMediaByName('social-x.svg'),
    findMediaByName('social-youtube.svg'),
    findMediaByName('crafted-by.svg'),
    findMediaByName('footer-bg.png'),
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
        { platform: 'linkedin', href: '#', icon: socialLinkedin },
        { platform: 'x', href: '#', icon: socialX },
        { platform: 'youtube', href: '#', icon: socialYoutube },
      ].filter((s) => s.icon),
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

  // -- 3. Upsert the footer single type (singleType auto-creates on PUT in v5).
  const existing = await api(FOOTER_PATH, { expect404: true });
  let docId;
  if (existing?.data?.documentId) {
    const updated = await api(FOOTER_PATH, { method: 'PUT', body: { data } });
    docId = updated?.data?.documentId;
    console.log(`Updated Footer (documentId: ${docId})`);
  } else {
    const created = await api(FOOTER_PATH, { method: 'POST', body: { data } });
    docId = created?.data?.documentId;
    console.log(`Created Footer (documentId: ${docId})`);
  }

  // -- 4. Verify by reading the fully-populated entry back.
  const verify = await api(
    `${FOOTER_PATH}?populate[footer][populate][nav_sections][populate][links]=true` +
    `&populate[footer][populate][social_links]=true` +
    `&populate[footer][populate][legal_links]=true` +
    `&populate[footer][populate][crafted_by_logo]=true` +
    `&populate[footer][populate][background_image]=true` +
    `&populate[newsletter]=true` +
    `&populate[contact_details][populate][locations]=true` +
    `&populate[default_seo]=true`
  );
  const f = verify?.data?.footer || {};
  const navSections = f.nav_sections || [];
  const linkTotal = navSections.reduce((n, s) => n + (s.links?.length || 0), 0);
  console.log('\n--- Verification ---');
  console.log(`documentId       : ${verify?.data?.documentId}`);
  console.log(`nav_sections     : ${navSections.length} columns, ${linkTotal} links`);
  console.log(`social_links     : ${f.social_links?.length || 0}`);
  console.log(`legal_links      : ${f.legal_links?.length || 0}`);
  console.log(`copyright_text   : ${f.copyright_text}`);
  console.log(`crafted_by_logo  : ${f.crafted_by_logo ? 'present' : 'none'}`);
  console.log(`background_image : ${f.background_image ? 'present' : 'none'}`);
  console.log(`newsletter       : ${verify?.data?.newsletter?.heading}`);
  console.log(`contact email    : ${verify?.data?.contact_details?.email}`);
  console.log(`default_seo      : ${verify?.data?.default_seo?.meta_title}`);
  console.log('--------------------');

  console.log('\nFooter seed complete.');
  process.exit(0);
}

main().catch((err) => {
  console.error('Seed failed:', err.message || err);
  process.exit(1);
});
