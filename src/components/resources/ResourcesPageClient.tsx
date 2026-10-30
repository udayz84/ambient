"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { ResourcesBuilding } from "./ResourcesBuilding";
import { ResourcesContent } from "./ResourcesContent";
import { ResourcesFeatured } from "./ResourcesFeatured";
import { ResourcesHero } from "./ResourcesHero";
import { ResourcesMobile } from "./ResourcesMobile";
import { ResourcesNewsCta } from "./ResourcesNewsCta";
import type { ResourceArticle } from "./resources-data";
import { RESOURCES_FOOTER_TOP, RESOURCES_NEWS_TOP } from "./resources-layout";

import { TabletScaleCanvas } from "../shared/TabletScaleCanvas";

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
      {/* DESKTOP (>=600px) — absolute canvas, tablet scaled */}
      <TabletScaleCanvas
        className="relative mx-auto -mt-[78px] hidden w-[1440px] shrink-0 overflow-x-clip overflow-y-visible bg-black min-[600px]:block"
        style={{ minHeight: RESOURCES_FOOTER_TOP + extraHeight }}
        data-node-id="2379:1601"
        data-name="Resources - Option 8"
      >
        <div className="relative mx-auto h-full w-[1440px]">
          <ResourcesHero data={data?.hero} onSearch={setSearchQuery} articles={articles} />
          <ResourcesFeatured data={data?.featured} downloadForm={data?.download_form} />
          <ResourcesBuilding data={data?.building} />
          <ResourcesContent
            data={data?.content}
            articles={articles}
            onExtraHeightChange={setExtraHeight}
            searchQuery={searchQuery}
          />
          <ResourcesNewsCta top={RESOURCES_NEWS_TOP + extraHeight} data={data?.news_cta} />
        </div>
      </TabletScaleCanvas>

      {/* MOBILE (<600px) — dedicated stacked layout */}
      <div className="relative -mt-[78px] w-full bg-black min-[600px]:hidden">
        <ResourcesMobile data={data} articles={articles} />
      </div>
    </>
  );
}
