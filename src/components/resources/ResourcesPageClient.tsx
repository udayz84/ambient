"use client";

import { useState } from "react";
import { ResourcesBuilding } from "./ResourcesBuilding";
import { ResourcesContent } from "./ResourcesContent";
import { ResourcesFeatured } from "./ResourcesFeatured";
import { ResourcesHero } from "./ResourcesHero";
import { ResourcesNewsCta } from "./ResourcesNewsCta";
import { RESOURCES_FOOTER_TOP, RESOURCES_NEWS_TOP } from "./resources-layout";

export function ResourcesPageClient() {
  const [extraHeight, setExtraHeight] = useState(0);

  return (
    <>
      <div
        className="relative -mt-[78px] mx-auto w-full max-w-[1440px] min-w-[1440px] overflow-hidden bg-black"
        style={{ minHeight: RESOURCES_FOOTER_TOP + extraHeight }}
        data-node-id="2379:1601"
        data-name="Resources - Option 8"
      >
        <ResourcesHero />
        <ResourcesFeatured />
        <ResourcesBuilding />
        <ResourcesContent onExtraHeightChange={setExtraHeight} />
        <ResourcesNewsCta top={RESOURCES_NEWS_TOP + extraHeight} />
      </div>
    </>
  );
}
