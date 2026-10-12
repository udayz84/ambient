"use client";

import { ModelZooAppForge } from "../model-zoo/ModelZooAppForge";

/** Developer-page variant of the three step boxes (differs from the model-zoo page). */
const DEV_STEPS = [
  { title: "Pair over BLE", description: "Connect the app to your eval board in a tap." },
  {
    title: "Flash a model instantly",
    description:
      "Push any Model Zoo model — VAD, gesture, fall detection, etc. straight to the board.",
  },
  {
    title: "See results live",
    description: "Watch inference results stream to your phone in real time.",
  },
];

/** Shared developer-page overrides for the AppForge section (desktop + mobile). */
export const DEV_APP_FORGE_PROPS = {
  steps: DEV_STEPS,
  hideProcessChip: true,
  articleHeading: "Later, push your own builds over the air",
  bothStoresComingSoon: true,
  ctasCaption: "Everything from model to silicon, in one place — free to start.",
  ctas: [
    { label: "Download the ModelForge SDK", variant: "primary" },
    { label: "Request an Eval Kit", variant: "secondary" },
  ],
};

export function DeveloperAppForge({ data }: { data?: any }) {
  return (
    <div
      className="absolute w-[1440px] bg-transparent"
      style={{
        left: 0,
        top: "calc(3869px + var(--developer-pipeline-offset, 0px))",
        transition: "top 300ms ease-in-out",
      }}
    >
      <ModelZooAppForge data={data} {...DEV_APP_FORGE_PROPS} />
    </div>
  );
}
