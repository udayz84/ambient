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
        className="relative mx-auto -mt-[78px] w-full overflow-x-clip overflow-y-visible bg-black"
        style={{ minHeight: RESOURCES_FOOTER_TOP + extraHeight }}
        data-node-id="2379:1601"
        data-name="Resources - Option 8"
      >
        <div className="relative mx-auto h-full w-full max-w-[1440px]">
          <ResourcesHero />
          <ResourcesFeatured />
          <ResourcesBuilding />
          <ResourcesContent onExtraHeightChange={setExtraHeight} />
          <ResourcesNewsCta top={RESOURCES_NEWS_TOP + extraHeight} />
        </div>
      </div>
    </>
  );
}
