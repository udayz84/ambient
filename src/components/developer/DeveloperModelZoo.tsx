"use client";

import { ApplicationsPageModelZoo } from "../applications-page/ApplicationsPageModelZoo";

/**
 * Wraps the ApplicationsPageModelZoo for the Developer page's ScaledCanvas.
 * Positioned absolutely after DeveloperComingSoon.
 */
export function DeveloperModelZoo() {
  return (
    <div
      className="absolute overflow-clip bg-black"
      style={{
        left: 0,
        top: "calc(3824px + var(--developer-pipeline-offset, 0px))",
        width: 1440,
        transition: "top 300ms ease-in-out",
      }}
      data-node-id="developer-model-zoo"
    >
      <ApplicationsPageModelZoo />
    </div>
  );
}
