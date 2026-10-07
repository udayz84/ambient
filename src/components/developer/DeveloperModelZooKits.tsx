"use client";

import { HomeModelZooKits } from "../home-model-zoo-kits/HomeModelZooKits";

export function DeveloperModelZooKits({ data }: { data?: any }) {
  return (
    <div
      className="absolute w-[1440px] bg-transparent"
      style={{
        left: 0,
        top: "calc(3669px + var(--developer-pipeline-offset, 0px))",
        transition: "top 300ms ease-in-out",
      }}
    >
      <HomeModelZooKits data={data} />
    </div>
  );
}
