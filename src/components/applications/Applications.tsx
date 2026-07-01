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

export function Applications() {
  const [activeIndex, setActiveIndex] = useState(INITIAL_ACTIVE_INDEX);

  const handleShift = (dir: -1 | 1) => {
    setActiveIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return APPLICATION_TABS.length - 1;
      if (next > APPLICATION_TABS.length - 1) return 0;
      return next;
    });
  };

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
          <ApplicationsHeader />
          <ApplicationsCategoryNav
            activeIndex={activeIndex}
            onTabClick={setActiveIndex}
            onShift={handleShift}
          />
          <ApplicationsHeroVisual activeTab={APPLICATION_TABS[activeIndex]} />
          <ApplicationsFeatureCard {...FEATURE_CARDS.left} />
          <ApplicationsFeatureCard {...FEATURE_CARDS.right} />
          <ApplicationsCta />
        </div>
      </div>

      {/* MOBILE (<1024px) — dedicated layout, desktop is untouched above */}
      <div className="relative w-full min-[1024px]:hidden">
        <ApplicationsMobile
          categoryActiveIndex={activeIndex}
          setCategoryActiveIndex={setActiveIndex}
        />
      </div>
    </section>
  );
}
