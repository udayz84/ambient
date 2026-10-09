"use client";

import { ModelZooAppForge } from "../model-zoo/ModelZooAppForge";

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
      <ModelZooAppForge data={data} />
    </div>
  );
}
