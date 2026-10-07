"use client";

import { useState } from "react";
import { ApplicationsCategoryNav } from "./ApplicationsCategoryNav";
import { ApplicationsCta } from "./ApplicationsCta";
import { ApplicationsFeatureCard } from "./ApplicationsFeatureCard";
import { ApplicationsHeader } from "./ApplicationsHeader";
import { ApplicationsHeroVisual } from "./ApplicationsHeroVisual";
import { ApplicationsMobile } from "./ApplicationsMobile";

const INITIAL_ACTIVE_INDEX = 0;

export function Applications({ data }: { data?: any }) {
  const baseTabs: any[] = Array.isArray(data?.tabs) ? data.tabs : [];
  const tabs = [
    ...baseTabs,
    {
      label: "BUILD",
      watermark_text: "BUILD YOUR OWN APPLICATION",
      isBuild: true,
      feature_cards: [],
      hero_image: null,
    }
  ];

  // NOTE: `active_tab` is NOT a field in the Strapi `home.applications` schema,
  // so it is intentionally ignored here. The initial tab falls back to the
  // hardcoded default (AUTOMOTIVE / index 3).
  const fallbackInitial =
    INITIAL_ACTIVE_INDEX < tabs.length ? INITIAL_ACTIVE_INDEX : 0;

  const [activeIndex, setActiveIndex] = useState(fallbackInitial);
  const [direction, setDirection] = useState(1);

  const handleTabClick = (newIndex: number) => {
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
  };

  const handleShift = (dir: -1 | 1) => {
    setDirection(dir);
    setActiveIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return tabs.length - 1;
      if (next > tabs.length - 1) return 0;
      return next;
    });
  };

  const activeTab = tabs[activeIndex]?.label || "";
  const isBuild = activeTab === "BUILD";

  // feature_cards are nested INSIDE each tab in the schema (home.app-tab).
  const activeTabData = tabs[activeIndex];
  const strapiFeatureCards: any[] = Array.isArray(activeTabData?.feature_cards)
    ? activeTabData.feature_cards
    : [];
  const leftCard = strapiFeatureCards[0] || {};
  const rightCard = strapiFeatureCards[1] || {};

  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      aria-label="Build the impossible today"
    >
      <div className="relative mx-auto hidden h-[868px] w-full max-w-[1440px] min-[1024px]:block">
        <div
          className="absolute top-0 left-1/2 h-[868px] w-[1321px] -translate-x-1/2"
          data-node-id="2379:844"
          data-name="Build the impoosible"
        >
          <ApplicationsHeader data={data} />
          <ApplicationsCategoryNav
            tabs={tabs}
            activeIndex={activeIndex}
            onTabClick={handleTabClick}
            onShift={handleShift}
          />
          <div className="absolute inset-0 pointer-events-none">
            <ApplicationsHeroVisual
              tabs={tabs}
              activeTab={activeTab}
              direction={direction}
            />
          </div>
          {!isBuild && (
            <>
              <ApplicationsFeatureCard
                wrapperNodeId="2379:925"
                contentNodeId="2379:926"
                title={leftCard?.title ?? ""}
                description={leftCard?.description ?? ""}
                background="rgba(0, 0, 0, 0.1)"
                height={198}
                position="left"
              />
              <ApplicationsFeatureCard
                wrapperNodeId="2379:917"
                contentNodeId="2379:918"
                title={rightCard?.title ?? ""}
                description={rightCard?.description ?? ""}
                background="rgba(21, 21, 21, 0.1)"
                height={174}
                position="right"
              />
              <ApplicationsCta data={data} />
            </>
          )}
        </div>
      </div>

      {/* MOBILE (<1024px) — dedicated layout, desktop is untouched above */}
      <div className="relative w-full min-[1024px]:hidden">
        <ApplicationsMobile
          tabs={tabs}
          featureCards={strapiFeatureCards}
          data={data}
          categoryActiveIndex={activeIndex}
          setCategoryActiveIndex={setActiveIndex}
        />      </div>
    </section>
  );
}
