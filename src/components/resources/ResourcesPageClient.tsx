"use client";

import { useState } from "react";
import { ResourcesBuilding } from "./ResourcesBuilding";
import { ResourcesContent } from "./ResourcesContent";
import { ResourcesFeatured } from "./ResourcesFeatured";
import { ResourcesHero } from "./ResourcesHero";
import { ResourcesMobile } from "./ResourcesMobile";
import { ResourcesNewsCta } from "./ResourcesNewsCta";
import { RESOURCES_FOOTER_TOP, RESOURCES_NEWS_TOP } from "./resources-layout";

export function ResourcesPageClient() {
  const [extraHeight, setExtraHeight] = useState(0);

  return (
    <>
      {/* DESKTOP (>=1024px) — absolute canvas, untouched */}
      <div
        className="relative mx-auto -mt-[78px] hidden w-full overflow-x-clip overflow-y-visible bg-black min-[1024px]:block"
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

      {/* MOBILE (<1024px) — dedicated stacked layout */}
      <div className="relative -mt-[78px] w-full bg-black min-[1024px]:hidden">
        <ResourcesMobile />
      </div>
    </>
  );
}
