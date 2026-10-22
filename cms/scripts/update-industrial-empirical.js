/**
 * update-industrial-empirical.js
 * ----------------------------------------------------------------------------
 * Updates the industrial_iot application page's empirical_proof section in
 * Strapi to match the approved Industrial IoT design (Picture 2):
 * - heading: "Run any model. Keep all four advantages"
 * - subtitle: ""
 * - 4 cards: CONTINUOUS AI, POWER EFFICIENCY, SMART TRANSMISSION, LOCAL AI
 * ----------------------------------------------------------------------------
 */
const { createStrapi } = require('@strapi/strapi');

async function run() {
  const app = await createStrapi({ distDir: './dist' }).load();
  try {
    const uid = 'api::application-page.application-page';
    const pages = await app.entityService.findMany(uid, {
      filters: { slug: 'industrial_iot' },
      populate: { empirical_proof: { populate: ['ecg_cards'] } },
    });

    const page = Array.isArray(pages) ? pages[0] : pages;
    if (!page) {
      console.error('industrial_iot page not found in Strapi.');
      process.exitCode = 1;
      return;
    }

    const updatedEmpirical = {
      ...(page.empirical_proof || {}),
      heading: 'Run any model. Keep all four advantages',
      subtitle: '',
      ecg_cards: [
        {
          badge: 'CONTINUOUS AI',
          stat: '24/7',
          title: 'Always-on fault detection',
          description:
            'Runs bearing, vibration, and anomaly detection continuously on-node, without waiting for a cloud round trip.',
        },
        {
          badge: 'POWER EFFICIENCY',
          stat: '<80 µW',
          title: 'Microwatt-level inference',
          description:
            'Keeps industrial AI models active in the background while using a fraction of the power required by conventional edge processing.',
        },
        {
          badge: 'SMART TRANSMISSION',
          stat: 'Only on fault',
          title: 'Event-gated radio',
          description:
            'The gateway wakes only when a verified anomaly is detected, reducing bandwidth, infrastructure load, and wasted transmissions.',
        },
        {
          badge: 'LOCAL AI',
          stat: '100%',
          title: 'No telemetry flood',
          description:
            'Raw vibration, acoustic, and thermal data stay local. Only classified faults are transmitted for action.',
        },
      ],
    };

    await app.documents(uid).update({
      documentId: page.documentId,
      data: {
        empirical_proof: updatedEmpirical,
      },
      status: 'published',
    });

    console.log('Successfully updated industrial_iot empirical_proof in Strapi.');
  } catch (err) {
    console.error('Error updating Strapi:', err);
    process.exitCode = 1;
  } finally {
    process.exit();
  }
}

run();
