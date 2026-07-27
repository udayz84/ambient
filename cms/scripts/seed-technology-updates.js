const { createStrapi } = require('@strapi/strapi');

async function run() {
  const app = await createStrapi({ distDir: './dist' }).load();

  try {
    const existing = await app.entityService.findMany('api::technology-page.technology-page', {
      populate: {
        problem: { populate: '*' },
        modes: { populate: '*' }
      }
    });

    if (!existing) {
      console.log("Technology page not found. Please create it in the admin UI first.");
      process.exit(1);
    }
    
    const WHITE = "#ffffff";
    const RED = "#fb3748";
    const GREEN = "#1fc16b";
    
    const legacyStats = [
      { __component: "tech.stat-row", label: "Where compute happens", value: "Outside Memory", valueColor: WHITE },
      { __component: "tech.stat-row", label: "Data Movement", value: "High", valueColor: WHITE },
      { __component: "tech.stat-row", label: "Efforts spent on moving data", value: "High", valueColor: RED },
      { __component: "tech.stat-row", label: "Efficiency", value: "Low", valueColor: RED },
    ];

    const acubeStats = [
      { __component: "tech.stat-row", label: "Where compute happens", value: "Inside Memory", valueColor: WHITE },
      { __component: "tech.stat-row", label: "Data Movement", value: "Minimal", valueColor: WHITE },
      { __component: "tech.stat-row", label: "Efforts spent on moving data", value: "Low", valueColor: GREEN },
      { __component: "tech.stat-row", label: "Efficiency", value: "High", valueColor: GREEN },
    ];
    
    const modeCards = [
      {
        __component: "tech.mode-card",
        title: "Subconscious AI",
        bullets: "Legacy chips switch off. A-Cube sleeps like you: the brain stays aware. Our island runs AI at microwatts while the ARM core is powered down. Always processing, never draining.",
        caption: "Always processing, never draining.",
      },
      {
        __component: "tech.mode-card",
        title: "Turboboost mode",
        bullets: "When something matters, the brain wakes instantly. The moment SenseMesh flags a real event, runtime DVFS ramps the chip from subconscious idle to full performance",
        caption: "live, no reset — settles back down.",
      },
      {
        __component: "tech.mode-card",
        title: "SETTLES",
        bullets: "Once the task is completed, the chip settles back into subconscious mode.",
        caption: "",
      },
    ];

    const problem = existing.problem || {};
    problem.legacy_stats = legacyStats;
    problem.acube_stats = acubeStats;

    const modes = existing.modes || {};
    modes.mode_cards = modeCards;

    await app.entityService.update('api::technology-page.technology-page', existing.id, {
      data: {
        problem: problem,
        modes: modes
      }
    });

    console.log("Successfully seeded technology page updates!");
  } catch (error) {
    console.error("Error seeding:", error);
  } finally {
    process.exit(0);
  }
}

run();
