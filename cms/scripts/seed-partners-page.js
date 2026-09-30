/**
 * seed-partners-page.js
 * ----------------------------------------------------------------------------
 * One-time seed for the partners-page single type — all nine sections, copy
 * verbatim from src/components/partners/partners-data.ts.
 *
 * SAFE TO RUN BY MISTAKE:
 *   - Aborts if the entry already has ANY content (unless --force).
 *   - Dumps the existing entry to a JSON backup in /tmp before writing.
 *   - Writes ONLY to api::partners-page.partners-page. No other single type
 *     or collection type is read or written.
 *   - The hero image is uploaded to the Media Library only if absent
 *     (reused by name — existing media is never replaced or deleted).
 *
 * Run from the cms/ directory (requires a fresh `npm run build` so dist/
 * knows the partners-page schema):
 *   node scripts/seed-partners-page.js
 * ----------------------------------------------------------------------------
 */
const { createStrapi } = require('@strapi/strapi');
const fs = require('node:fs');
const path = require('node:path');

const PARTNERS_DIR = path.join(__dirname, '..', '..', 'public', 'partners');
const HERO_IMAGE = 'hero-constellation.png';
const FORCE = process.argv.includes('--force');

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

  const absolute = path.join(PARTNERS_DIR, fileName);
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

const payload = {
  hero: {
    tag: { text: 'Partner Ecosystem' },
    title: 'You bring the vision.\nOur partners help you\nbuild it.',
    subtitle:
      "Building an AI product takes more than a breakthrough chip — it takes specialized algorithms, tuned firmware, custom hardware, and manufacturing at scale. Ambient’s partner ecosystem brings world-class expertise across the entire stack, already fluent in the GPX platform, wherever you build.",
    primary_cta: { label: 'Find a Partner', href: '#directory', variant: 'primary' },
    secondary_cta: { label: 'Become a Partner', href: '#become-a-partner', variant: 'secondary' },
  },
  why: {
    tag: { text: 'The Why' },
    heading: 'A breakthrough processor is the start, not the finish.',
    subheading:
      'From algorithms to manufacturing, a great AI product spans the whole stack. Bring your strengths; our partners bring theirs — so every layer moves at full speed.',
    body: "The hard part of an AI product was never just the chip. It’s the specialized model that has to run inside a microwatt budget, the firmware tuned to squeeze out every last drop of efficiency, the board designed around tight power and space constraints, and the manufacturing partner who can build it at volume without surprises. A gap in any one of these can cost a roadmap months. You shouldn’t have to master all of them to ship.",
    journey: [
      {
        number: '01',
        title: 'MODEL',
        description:
          'Specialized model development and power-optimized algorithms built for the A-Cube architecture — from custom CNNs, RNNs, and LSTMs to analog-aware quantization.',
      },
      {
        number: '02',
        title: 'FIRMWARE',
        description:
          'Embedded firmware, RTOS integration, and application software tuned to extract maximum efficiency from GPX silicon.',
      },
      {
        number: '03',
        title: 'HARDWARE / BOARD',
        description:
          'Custom board and system design around GPX10 — power, layout, sensor integration, and signal integrity.',
      },
      {
        number: '04',
        title: 'MANUFACTURING',
        description: 'Volume manufacturing and assembly, ready to build GPX-based hardware at scale.',
      },
      {
        number: '05',
        title: 'PRODUCT',
        description:
          'End-to-end product design that takes a concept to a manufacturable product built around the GPX platform.',
      },
    ],
    legend_strong: 'Your in-house strengths',
    legend_gap: 'The gaps partners fill',
  },
  benefits: {
    tag: { text: 'The Payoff' },
    heading: 'Ship faster. De-risk everything. Stay focused on what makes you, you.',
    subheading: 'A partner who already knows the GPX platform turns months of trial-and-error into a running start.',
    cards: [
      {
        title: 'Faster to market',
        description:
          'Skip the slow ramp. With GPX-ready partners already in motion, you move from concept to production much faster.',
      },
      {
        title: 'Higher success rate',
        description:
          'Cut the false starts. Proven designs and real platform experience help you avoid re-spins, delays, and expensive surprises.',
      },
      {
        title: 'Lower development risk',
        description:
          'De-risk the hard parts. From analog-aware tuning to manufacturing realities, expert partners help keep your roadmap intact.',
      },
      {
        title: 'Focus on your edge',
        description:
          'Own the part that matters. You build the differentiation. Our partners take care of the surrounding stack that gets you there.',
      },
    ],
    bridge: 'One ecosystem, engineered to get you to market — not to slow you down.',
  },
  capabilities: {
    tag: { text: 'The Ecosystem' },
    heading: 'Expertise across the entire stack.',
    subheading: 'Whatever piece you’re missing, there’s a partner who has already solved it on GPX.',
    bridge: 'Enter the ecosystem at any layer — and get the collaborative support to accelerate your roadmap.',
    cards: [
      {
        title: 'AI & Algorithm Partners',
        short: 'AI & Algorithms',
        description:
          'Specialized model development and power-optimized algorithms built for the A-Cube architecture — from custom CNNs, RNNs, and LSTMs to analog-aware quantization.',
      },
      {
        title: 'Firmware & Software Partners',
        short: 'Firmware & Software',
        description:
          'Embedded firmware, RTOS integration, and application software tuned to extract maximum efficiency from GPX silicon.',
      },
      {
        title: 'Hardware & Board Design Partners',
        short: 'Hardware & Boards',
        description:
          'Custom board and system design around GPX10 — power, layout, sensor integration, and signal integrity.',
      },
      {
        title: 'Design Houses & ODMs',
        short: 'Design Houses & ODMs',
        description:
          'End-to-end product design that takes a concept to a manufacturable product built around the GPX platform.',
      },
      {
        title: 'EMS & Manufacturing Partners',
        short: 'EMS & Manufacturing',
        description: 'Volume manufacturing and assembly, ready to build GPX-based hardware at scale.',
      },
    ],
  },
  proof: {
    tag: { text: 'GPX-Native Proof' },
    heading: 'Not generalists. GPX-native.',
    subheading:
      'These aren’t firms we found in a directory. They’ve already built on the Ambient platform — and the proof is live.',
    points: [
      {
        title: 'Reference designs, not blank pages.',
        description: 'GPX10 reference designs from partners your team can rely on instead of starting from scratch.',
      },
      {
        title: 'Models proven on A-Cube.',
        description:
          'Partner-built models ship in the Ambient Model Zoo — real, deployable networks, already running on the architecture.',
      },
      {
        title: 'Hardware built for the silicon.',
        description:
          'Partners have designed production hardware around GPX10 — boards engineered for its exact power and space envelope.',
      },
      {
        title: 'Proven at volume.',
        description:
          'That hardware has gone into volume manufacturing — GPX-based products built at scale, not just prototyped.',
      },
    ],
    links: [
      { label: 'Explore Partner Reference Designs', href: '/resources' },
      { label: 'Browse the Model Zoo', href: '/developer' },
    ],
  },
  directory: {
    tag: { text: 'Partner Directory' },
    heading: 'Find your partner.',
    subheading: 'World-class teams, experienced on GPX, across every region you build in.',
    filter_capability_label: 'Filter by Capability',
    filter_region_label: 'Filter by Region',
    filter_all_label: 'All',
    expanding_title: 'Expanding — more partners joining',
    expanding_description: 'New capability areas and regions are being added as the ecosystem grows.',
    no_match_message: 'Don’t see the right fit yet? Tell us what you need — we’ll connect you.',
    no_match_cta: { label: 'Get Matched', href: '#get-matched', variant: 'primary' },
    connect_label: 'Connect',
    bridge: 'One ecosystem. Global reach. Local support.',
    // capability values match the `short` name of the capability cards above.
    partners: [
      {
        name: 'Axiom Neural Systems',
        monogram: 'AN',
        capability: 'AI & Algorithms',
        region: 'North America',
        badges: [{ text: 'Model Zoo Contributor' }],
        one_liner: 'Custom CNNs and analog-aware quantization tuned for A-Cube.',
      },
      {
        name: 'Forge Firmware Studio',
        monogram: 'FF',
        capability: 'Firmware & Software',
        region: 'EMEA',
        badges: [],
        one_liner: 'RTOS integration and power-tuned application firmware for GPX silicon.',
      },
      {
        name: 'NorthBoard Design',
        monogram: 'NB',
        capability: 'Hardware & Boards',
        region: 'North America',
        badges: [{ text: 'Published Reference Design' }],
        one_liner: "Production board design around GPX10's exact power and space envelope.",
      },
      {
        name: 'Momentum ODM',
        monogram: 'MO',
        capability: 'Design Houses & ODMs',
        region: 'APAC / India',
        badges: [],
        one_liner: 'End-to-end product design from concept to manufacturable GPX products.',
      },
      {
        name: 'Vertex Assembly Group',
        monogram: 'VA',
        capability: 'EMS & Manufacturing',
        region: 'APAC / India',
        badges: [{ text: 'Volume Manufacturing' }],
        one_liner: 'Volume manufacturing and assembly for GPX-based hardware at scale.',
      },
      {
        name: 'Lumen Edge Works',
        monogram: 'LE',
        capability: 'AI & Algorithms',
        region: 'EMEA',
        badges: [{ text: 'Model Zoo Contributor' }, { text: 'Published Reference Design' }],
        one_liner: 'Deployable networks shipping in the Ambient Model Zoo, proven on A-Cube.',
      },
    ],
  },
  match_form: {
    tag: { text: 'Get Matched' },
    heading: 'Not sure who you need? We’ll connect you.',
    subheading: 'Tell us where you need help, and we’ll introduce you to the right partner on the GPX platform.',
    submit_label: 'Request an Introduction',
    confirmation: 'Got it. We’ll connect you with the right partner shortly.',
    email_hint: 'Personal email domains (gmail, outlook, …) are blocked — please use your work address.',
    first_name_label: 'First name',
    last_name_label: 'Last name',
    company_label: 'Company',
    email_label: 'Corporate email',
    region_label: 'Region',
    help_areas_label: 'Where do you need help?',
    message_label: 'Tell us about your project',
  },
  become: {
    tag: { text: 'Become a Partner' },
    heading: 'Build with us. Grow with the platform.',
    subheading:
      'Join a growing ecosystem building the future of AI on Ambient — and get in front of customers actively looking for your expertise.',
    benefits: [
      {
        title: 'Reach the right customers.',
        description: 'Get discovered by teams building on GPX who need exactly what you do.',
      },
      {
        title: 'Early access & enablement.',
        description: 'Get early access to Ambient silicon, tools, and hands-on technical enablement.',
      },
      {
        title: 'Showcase your work.',
        description: 'Co-develop reference designs and Model Zoo contributions that put your expertise on display.',
      },
    ],
    looking_for_title: 'Who we’re looking for',
    looking_for_description:
      'AI and algorithm teams, firmware and software houses, hardware and board designers, ODMs, EMS providers, and system integrators ready to build on the Ambient platform.',
    looking_for_chips: [
      { text: 'AI & Algorithm Teams' },
      { text: 'Firmware & Software Houses' },
      { text: 'Hardware & Board Designers' },
      { text: 'ODMs' },
      { text: 'EMS Providers' },
      { text: 'System Integrators' },
    ],
    form_title: 'Apply to the ecosystem',
    form_name_label: 'Your name',
    form_company_label: 'Company',
    form_website_label: 'Website',
    form_email_label: 'Work email',
    form_region_label: 'Region',
    form_capabilities_label: 'Capability area(s)',
    form_experience_label: 'What you’d bring / relevant experience',
    form_submit_label: 'Apply to Become a Partner',
    form_confirmation: 'Application received. Our partnerships team will be in touch.',
    secondary_cta: { label: 'Talk to Our Partnerships Team', href: '/contact', variant: 'secondary' },
  },
  footer_ctas: {
    heading: 'The vision is yours. The ecosystem is here.',
    primary_cta: { label: 'Find a Partner', href: '#directory', variant: 'primary' },
    secondary_cta: { label: 'Become a Partner', href: '#become-a-partner', variant: 'secondary' },
  },
};

async function run() {
  const app = await createStrapi({ distDir: './dist' }).load();

  try {
    const uid = 'api::partners-page.partners-page';
    const existing = await app.entityService.findMany(uid, { populate: '*' });

    if (existing) {
      const backupPath = path.join('/tmp', `partners-page-backup-${Date.now()}.json`);
      fs.writeFileSync(backupPath, JSON.stringify(existing, null, 2));
      console.log(`  [backup] existing entry dumped to ${backupPath}`);

      const sections = ['hero', 'why', 'benefits', 'capabilities', 'proof', 'directory', 'match_form', 'become', 'footer_ctas'];
      const hasContent = sections.some((key) => {
        const value = existing[key];
        return Array.isArray(value) ? value.length > 0 : Boolean(value);
      });
      if (hasContent && !FORCE) {
        console.error('partners-page already has content — aborting. Re-run with --force to overwrite.');
        process.exit(1);
      }
    }

    const heroImageId = await ensureMedia(app, HERO_IMAGE);
    const data = { ...payload, hero: { ...payload.hero, image: heroImageId } };

    if (!existing) {
      await app.documents(uid).create({ data, status: 'published' });
      console.log('  [create] partners-page entry created and published');
    } else {
      await app.documents(uid).update({ documentId: existing.documentId, data, status: 'published' });
      console.log('  [update] partners-page entry updated and published');
    }

    // Verify: re-read the entry and summarize what landed.
    const check = await app.entityService.findMany(uid, { populate: '*' });
    const summary = {
      hero: Boolean(check?.hero),
      hero_image: check?.hero?.image?.name ?? null,
      journey_steps: check?.why?.journey?.length ?? 0,
      benefit_cards: check?.benefits?.cards?.length ?? 0,
      capability_cards: check?.capabilities?.cards?.length ?? 0,
      proof_points: check?.proof?.points?.length ?? 0,
      proof_links: check?.proof?.links?.length ?? 0,
      partners: check?.directory?.partners?.length ?? 0,
      become_benefits: check?.become?.benefits?.length ?? 0,
      looking_for_chips: check?.become?.looking_for_chips?.length ?? 0,
      footer_ctas: Boolean(check?.footer_ctas),
      published_at: check?.publishedAt ? 'published' : 'draft',
    };
    console.log('Seeded partners-page:', JSON.stringify(summary, null, 2));
    console.log('Successfully seeded partners page!');
  } catch (error) {
    console.error('Error seeding:', error);
    process.exitCode = 1;
  } finally {
    process.exit();
  }
}

run();
