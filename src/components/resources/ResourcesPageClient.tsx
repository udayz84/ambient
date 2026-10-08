"use client";

import { useState } from "react";
import { ResourcesBuilding } from "./ResourcesBuilding";
import { ResourcesContent } from "./ResourcesContent";
import { ResourcesFeatured } from "./ResourcesFeatured";
import { ResourcesHero } from "./ResourcesHero";
import { ResourcesMobile } from "./ResourcesMobile";
import { ResourcesNewsCta } from "./ResourcesNewsCta";
import type { ResourceArticle } from "./resources-data";
import { RESOURCES_FOOTER_TOP, RESOURCES_NEWS_TOP } from "./resources-layout";

type ResourcesPageClientProps = {
  data?: any;
  articles?: ResourceArticle[];
};

export function ResourcesPageClient({
  data,
  articles,
}: ResourcesPageClientProps = {}) {
  const [extraHeight, setExtraHeight] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

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
          <ResourcesHero data={data?.hero} onSearch={setSearchQuery} articles={articles} />
          <ResourcesFeatured data={data?.featured} />
          <ResourcesBuilding data={data?.building} />
          <ResourcesContent
            data={data?.content}
            articles={articles}
            onExtraHeightChange={setExtraHeight}
            searchQuery={searchQuery}
          />
          <ResourcesNewsCta top={RESOURCES_NEWS_TOP + extraHeight} data={data?.news_cta} />
        </div>
      </div>

      {/* MOBILE (<1024px) — dedicated stacked layout */}
      <div className="relative -mt-[78px] w-full bg-black min-[1024px]:hidden">
        <ResourcesMobile data={data} articles={articles} />
      </div>
    </>
  );
}
