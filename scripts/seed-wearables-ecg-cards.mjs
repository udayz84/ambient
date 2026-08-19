/**
 * seed-wearables-ecg-cards.mjs
 * ----------------------------------------------------------------------------
 * Seeds the wearables `empirical_proof` component from Figma 4016:3927.
 *
 * Sends the FULL component payload (heading / subtitle / health_card /
 * power_card / workload_card / ecg_cards) because Strapi replaces a
 * component wholesale on update. ECG card images (already uploaded via the
 * admin) are re-connected by media id — resolved with an explicit
 * `populate: image` (component media is NOT reached by `populate: *`).
 *
 * Usage
 *   node scripts/seed-wearables-ecg-cards.mjs
 * ----------------------------------------------------------------------------
 */

import { createRequire } from "node:module";
import { join, dirname, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CMS_DIR = normalize(join(__dirname, "..", "cms"));

const ECG_CARDS = [
  {
    badge: "CONTINUOUS AI",
    stat: "24/7",
    title: "Always-on safety detection",
    description:
      "Runs assault, anomaly, and motion-event detection continuously on-device, without waiting for a cloud round trip.",
  },
  {
    badge: "POWER EFFICIENCY",
    stat: "<1mW",
    title: "Microwatt-level inference",
    description:
      "Keeps AI models active in the background while consuming a fraction of the power required by conventional edge processing.",
  },
  {
    badge: "SMART TRANSMISSION",
    stat: "Only on event",
    title: "BLE/LTE wakes only when needed",
    description:
      "The device processes locally first, then activates communication only when a meaningful safety or health event is detected.",
  },
  {
    badge: "LOCAL AI",
    stat: "100%",
    title: "No cloud dependency",
    description:
      "Sensitive health and safety signals are processed locally, improving reliability, latency, and user privacy.",
  },
];

const EP_POPULATE = {
  empirical_proof: {
    populate: { ecg_cards: { populate: { image: true } } },
  },
};

/** Canonical values from scripts/seed-application-wearables.mjs (Figma). */
const HEALTH_CARD = {
  badge: "The Workload",
  title: "Health Monitoring Solutions",
  body: "Continuous, on-device assault detection and biomarker analysis for early onset predictions for PCOD/PCOS to enable 24/7 women health and safety",
  cta_label: "Download Case Study",
  footer: "Up to 2 weeks of continuous tracking with on-device AI.",
};

const POWER_CARD = {
  badge: "Power Consumption",
  panels: [
    { label: "Ambient", value: "<1mW", description: "Lower energy usage" },
    { label: "Legacy", value: "10mW", description: "Higher energy usage" },
  ],
};

const WORKLOAD_CARD = {
  stat: "100%",
  label: "On-device",
  description: "No cloud dependency",
};

async function main() {
  const require = createRequire(join(CMS_DIR, "package.json"));
  const { createStrapi } = require("@strapi/strapi");

  try {
    process.loadEnvFile(join(CMS_DIR, ".env"));
  } catch {
    /* rely on shell env */
  }
  process.env.NODE_ENV ??= "development";

  console.log("Loading Strapi runtime (appDir: cms/) ...");
  const strapi = await createStrapi({
    appDir: CMS_DIR,
    distDir: join(CMS_DIR, "dist"),
  }).load();

  try {
    const docService = strapi.documents("api::application-page.application-page");
    const published = await docService.findFirst({
      filters: { slug: "wearables" },
      status: "published",
      populate: EP_POPULATE,
    });
    if (!published) throw new Error("wearables application-page (published) not found.");

    const ep = published.empirical_proof ?? {};
    const currentCards = ep.ecg_cards ?? [];
    if (currentCards.length < 4) {
      throw new Error(`expected 4 published ecg cards, found ${currentCards.length}`);
    }

    const payload = {
      empirical_proof: {
        heading: ep.heading,
        subtitle: ep.subtitle,
        health_card: { ...HEALTH_CARD },
        power_card: {
          badge: POWER_CARD.badge,
          panels: POWER_CARD.panels.map((p) => ({ ...p })),
        },
        workload_card: { ...WORKLOAD_CARD },
        ecg_cards: ECG_CARDS.map((card, i) => ({
          ...card,
          label: "",
          ...(currentCards[i]?.image ? { image: currentCards[i].image.id } : {}),
        })),
      },
    };

    await docService.update({
      documentId: published.documentId,
      data: payload,
    });
    console.log("  [update] empirical_proof written (draft)");

    await docService.publish({ documentId: published.documentId });
    console.log("  [publish] wearables application page published");

    const check = await docService.findFirst({
      filters: { slug: "wearables" },
      status: "published",
      populate: EP_POPULATE,
    });
    const c = check?.empirical_proof ?? {};
    console.log(
      `  [verify] heading: ${JSON.stringify(c.heading)} | health: ${c.health_card?.title ?? "MISSING"} | power panels: ${(c.power_card?.panels ?? []).length} | workload: ${c.workload_card?.stat ?? "MISSING"}`
    );
    for (const card of c.ecg_cards ?? []) {
      console.log(
        `  [verify] ${card.badge} | stat: ${card.stat} | title: ${card.title} | desc: ${
          card.description ? "yes" : "NO"
        } | image: ${card.image?.name ?? "MISSING"}`
      );
    }
  } finally {
    await strapi.destroy();
  }
}

main().catch((err) => {
  console.error(err?.message ?? err);
  process.exit(1);
});
