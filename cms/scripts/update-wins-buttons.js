/**
 * update-wins-buttons.js
 * ----------------------------------------------------------------------------
 * Sets the CTA label to "Coming Soon" on the 1st and 3rd wins cards
 * (The Safety Win, The Industrial Win) of the applications-page single type.
 * Everything else on the entry is written back unchanged.
 *
 * Run from the cms/ directory:  node scripts/update-wins-buttons.js
 * ----------------------------------------------------------------------------
 */
const { createStrapi } = require('@strapi/strapi');

const TARGET_LABELS = ['The Safety Win', 'The Industrial Win'];

async function run() {
  const app = await createStrapi({ distDir: './dist' }).load();
  try {
    const uid = 'api::applications-page.applications-page';
    const deepWins = { wins: { populate: { cards: { populate: ['buttons', 'image'] } } } };
    const existing = await app.entityService.findMany(uid, { populate: deepWins });
    if (!existing?.wins?.cards) {
      console.error('applications-page wins cards not found — nothing to update.');
      process.exitCode = 1;
      return;
    }

    const cards = existing.wins.cards.map((c) => ({
      ...c,
      image: c.image?.id ?? c.image,
      buttons: (c.buttons ?? []).map((b) => ({
        ...b,
        label: TARGET_LABELS.includes(c.label) && /case study/i.test(b.label)
          ? 'Coming Soon'
          : b.label,
      })),
    }));

    await app.documents(uid).update({
      documentId: existing.documentId,
      data: { wins: { ...existing.wins, cards } },
      status: 'published',
    });

    const check = await app.entityService.findMany(uid, {
      populate: { wins: { populate: { cards: { populate: 'buttons' } } } },
    });
    (check?.wins?.cards ?? []).forEach((c) =>
      console.log(`  - ${c.label} | ${(c.buttons ?? []).map((b) => b.label).join(', ')}`)
    );
    console.log('Done.');
  } catch (error) {
    console.error('Error updating wins buttons:', error);
    process.exitCode = 1;
  } finally {
    process.exit();
  }
}

run();
