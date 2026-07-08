"use client";

import { useState } from "react";
import { ApplicationsCategoryNav } from "./ApplicationsCategoryNav";
import { ApplicationsCta } from "./ApplicationsCta";
import { ApplicationsFeatureCard } from "./ApplicationsFeatureCard";
import { ApplicationsHeader } from "./ApplicationsHeader";
import { ApplicationsHeroVisual } from "./ApplicationsHeroVisual";
import { ApplicationsMobile } from "./ApplicationsMobile";
import { APPLICATION_TABS, FEATURE_CARDS } from "./applications-data";

const INITIAL_ACTIVE_INDEX = 3;

export function Applications({ data }: { data?: any }) {
  const tabs: any[] = Array.isArray(data?.tabs)
    ? data.tabs
    : APPLICATION_TABS.map((label) => ({ label }));

  const activeTabValue = data?.active_tab || "AUTOMOTIVE";
  const initialIndex = Math.max(
    0,
    tabs.findIndex((t) => (t?.label || "").toUpperCase() === activeTabValue.toUpperCase())
  );
  const fallbackInitial =
    INITIAL_ACTIVE_INDEX < tabs.length ? INITIAL_ACTIVE_INDEX : 0;
  const startIndex = initialIndex >= 0 ? initialIndex : fallbackInitial;

  const [activeIndex, setActiveIndex] = useState(startIndex);
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

  const activeTab = tabs[activeIndex]?.label || APPLICATION_TABS[0];

  const featureCards: any[] = Array.isArray(data?.feature_cards)
    ? data.feature_cards
    : [FEATURE_CARDS.left, FEATURE_CARDS.right];
  const leftCard = featureCards[0] || FEATURE_CARDS.left;
  const rightCard = featureCards[1] || FEATURE_CARDS.right;

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
          <ApplicationsFeatureCard
            wrapperNodeId="2379:925"
            contentNodeId="2379:926"
            title={leftCard?.title ?? "Tire Pressure Monitoring"}
            description={
              leftCard?.description ??
              "On-device air pressure and temperature sensors provide real-time alerts for tire health to prevent accidents and optimize maintenance and fuel expenses"
            }
            background="rgba(0, 0, 0, 0.1)"
            height={198}
            position="left"
          />
          <ApplicationsFeatureCard
            wrapperNodeId="2379:917"
            contentNodeId="2379:918"
            title={rightCard?.title ?? "Battery Management"}
            description={
              rightCard?.description ??
              "Monitoring of cell utilization, charging patterns, heat generation, etc. in electric vehicle batteries to prevent mishaps and optimize battery life"
            }
            background="rgba(21, 21, 21, 0.1)"
            height={174}
            position="right"
          />
          <ApplicationsCta data={data} />
        </div>
      </div>

      {/* MOBILE (<1024px) — dedicated layout, desktop is untouched above */}
      <div className="relative w-full min-[1024px]:hidden">
        <ApplicationsMobile
          tabs={tabs}
          featureCards={featureCards}
          data={data}
          categoryActiveIndex={activeIndex}
          setCategoryActiveIndex={setActiveIndex}
        />
      </div>
    </section>
  );
}
