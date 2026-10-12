import { ModelZooHero } from "./ModelZooHero";
import { ModelZooWatchItRun } from "./ModelZooWatchItRun";
import { ModelZooLibrary } from "./ModelZooLibrary";
import { ModelZooAppForge } from "./ModelZooAppForge";
import { ModelZooSteps } from "./ModelZooSteps";
import { ModelZooBuildIt } from "./ModelZooBuildIt";
import { ModelZooKits } from "./ModelZooKits";

/**
 * Figma 5130:8060 — Model Zoo page (1440×8384 desktop canvas).
 * Navbar + footer come from the root layout; the hero pulls up under the
 * 78px navbar like the other pages. Desktop sections stack with the exact
 * Figma vertical gaps.
 */
const MODEL_ZOO_APP_FORGE_STEPS = [
  { title: "Pair over BLE", description: "Connect the app to your eval board in a tap." },
  { title: "Flash a demo instantly", description: "Push VAD, gesture recognition, fall detection, and more to the board." },
  { title: "See it live", description: "Watch inference results stream to your phone in real time." },
];

const MODEL_ZOO_APP_FORGE_PROPS = {
  steps: MODEL_ZOO_APP_FORGE_STEPS,
  hideArticleCard: true,
  storeButtonsUnderSteps: true,
  bothStoresComingSoon: true,
};

export function ModelZoo({ forms }: { forms?: any }) {
  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      {/* DESKTOP (>=1024px) */}
      <ModelZooHero />
      {/* hero (743) → watch-it-run (779): 36px gap */}
      <div id="model-zoo-content" className="mt-[36px]" />
      <ModelZooWatchItRun />
      <ModelZooLibrary requestForm={forms?.request} />
      <ModelZooAppForge formConfig={forms?.evalkit} {...MODEL_ZOO_APP_FORGE_PROPS} />
      <ModelZooSteps formConfig={forms?.sdk} />
      <ModelZooBuildIt />
      <ModelZooKits />

      {/* MOBILE (<1024px) */}
      <ModelZooHeroMobile />
    </main>
  );
}

/**
 * Mobile hero — no Figma mobile frame exists for this page, so this mirrors
 * the DvkHeroMobile conventions (393 canvas, centered 36/36 title, 14/21 sub,
 * stacked CTAs) using the same content.
 */
function ModelZooHeroMobile() {
  return null; // added in the responsive pass
}
