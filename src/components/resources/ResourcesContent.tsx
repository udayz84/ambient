"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { interRegular } from "../hero/fonts";
import { GreenCtaButton } from "../contact/contact-shared";
import {
  RESOURCE_ARTICLES,
  RESOURCE_CATEGORIES,
} from "./resources-data";
import { getResourcesExtraHeight } from "./resources-layout";
import { ResourcesArticleCard } from "./ResourcesArticleCard";
const scrollArrowLeft = "/applications/nav-arrow-right.svg";
const INITIAL_VISIBLE_COUNT = 6;
const LOAD_MORE_COUNT = 3;
const LOAD_MORE_DELAY_MS = 800;

const IMAGE_107_GRADIENT =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 810 1440' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-46.009 0.0000020111 -0.000003897 -89.152 363.86 720)'><stop stop-color='rgba(0,0,0,0.6)' offset='0'/><stop stop-color='rgba(0,0,0,1)' offset='1'/></radialGradient></defs></svg>\")";

export function ResourcesContent({
  onExtraHeightChange,
}: {
  onExtraHeightChange?: (height: number) => void;
}) {
  const [activeCategory, setActiveCategory] = useState("webinar");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const visibleArticles = RESOURCE_ARTICLES.slice(0, visibleCount);
  const canLoadMore = visibleCount < RESOURCE_ARTICLES.length;

  useEffect(() => {
    onExtraHeightChange?.(getResourcesExtraHeight(visibleCount, canLoadMore));
  }, [visibleCount, canLoadMore, onExtraHeightChange]);

  const articleRows = Array.from(
    { length: Math.ceil(visibleArticles.length / 3) },
    (_, rowIndex) => visibleArticles.slice(rowIndex * 3, rowIndex * 3 + 3)
  );

  const handleLoadMore = () => {
    if (isLoadingMore || !canLoadMore) return;

    setIsLoadingMore(true);
    window.setTimeout(() => {
      setVisibleCount((current) =>
        Math.min(current + LOAD_MORE_COUNT, RESOURCE_ARTICLES.length)
      );
      setIsLoadingMore(false);
    }, LOAD_MORE_DELAY_MS);
  };

  const currentIndex = RESOURCE_CATEGORIES.findIndex((c) => c.id === activeCategory);

  const handlePrevCategory = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : RESOURCE_CATEGORIES.length - 1;
    setActiveCategory(RESOURCE_CATEGORIES[prevIndex].id);
  };

  const handleNextCategory = () => {
    const nextIndex = currentIndex < RESOURCE_CATEGORIES.length - 1 ? currentIndex + 1 : 0;
    setActiveCategory(RESOURCE_CATEGORIES[nextIndex].id);
  };

  return (
    <section
      className="absolute top-[2026px] left-1/2 flex w-[1244px] -translate-x-1/2 flex-col items-center gap-[60px]"
      aria-label="Resource library"
      data-node-id="2379:1772"
    >
      <div 
        className="pointer-events-none absolute top-[477px] left-1/2 -z-10 h-[810px] w-[1440px] -translate-x-1/2 flex items-center justify-center overflow-hidden mix-blend-screen"
        data-node-id="2379:1602"
        data-name="image 107 wrapper"
      >
        <div className="-rotate-90 flex-none">
          <div className="relative h-[1440px] w-[810px]">
            <Image
              src="/resources/image-107.png"
              alt=""
              fill
              className="max-w-none object-cover"
              sizes="810px"
              unoptimized
            />
            <div
              className="absolute inset-0"
              style={{ backgroundImage: IMAGE_107_GRADIENT }}
              aria-hidden
            />
          </div>
        </div>
      </div>
      <nav
        className="flex h-[52px] w-full items-center justify-between"
        aria-label="Resource categories"
        data-node-id="2379:1773"
      >
        <button
          type="button"
          className="relative size-[44px] shrink-0 hover:opacity-80 transition-opacity"
          aria-label="Previous category"
          onClick={handlePrevCategory}
          data-node-id="2379:1774"
        >
          <Image
            src={scrollArrowLeft}
            alt=""
            width={44}
            height={44}
            className="block size-full max-w-none rotate-180"
            aria-hidden
          />
        </button>

        <div className="flex flex-1 items-center justify-center gap-0">
          {RESOURCE_CATEGORIES.map((category, index) => {
            const isActive = activeCategory === category.id;

            if (isActive) {
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`${interRegular.className} relative h-[44px] shrink-0 overflow-clip bg-[#f0f0f0] px-[7px] text-[16px] leading-[24px] font-normal whitespace-nowrap text-[#0e1a0e] not-italic`}
                  data-node-id={category.nodeId}
                >
                  <CategoryCorner className="absolute top-0 left-0" flipY />
                  <CategoryCorner className="absolute top-0 right-0" rotate />
                  <CategoryCorner className="absolute bottom-0 left-0" />
                  <CategoryCorner
                    className="absolute right-0 bottom-0"
                    rotate
                    flipY
                  />
                  <span className="relative px-[10px] py-[10px]">{category.label}</span>
                </button>
              );
            }

            return (
              <div key={category.id} className="flex items-center">
                {index > 0 ? (
                  <span
                    className="mx-[10px] h-[8px] w-px bg-[rgba(255,255,255,0.2)]"
                    aria-hidden
                  />
                ) : null}
                <button
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`${interRegular.className} px-[20px] py-[14px] text-[16px] leading-[24px] font-normal whitespace-nowrap text-[#666] not-italic`}
                  data-node-id={category.nodeId}
                >
                  {category.label}
                </button>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="relative size-[44px] shrink-0 hover:opacity-80 transition-opacity"
          aria-label="Next category"
          onClick={handleNextCategory}
          data-node-id="2379:1825"
        >
          <Image
            src={scrollArrowLeft}
            alt=""
            width={44}
            height={44}
            className="block size-full max-w-none"
            aria-hidden
          />
        </button>
      </nav>

      <div className="flex w-[1236px] flex-col gap-[36px]" data-node-id="2379:1832">
        {articleRows.map((row, rowIndex) => (
          <div
            key={`resource-row-${rowIndex}`}
            className="flex w-full gap-[36px]"
            data-node-id={rowIndex === 0 ? "2379:1833" : "2379:1891"}
          >
            {row.map((article) => (
              <ResourcesArticleCard key={article.nodeId} {...article} />
            ))}
          </div>
        ))}
      </div>

      {canLoadMore ? (
        <GreenCtaButton
          className="w-[225px]"
          onClick={handleLoadMore}
          loading={isLoadingMore}
          disabled={isLoadingMore}
        >
          Load More Resources
        </GreenCtaButton>
      ) : null}
    </section>
  );
}

function CategoryCorner({
  className,
  flipY,
  rotate,
}: {
  className: string;
  flipY?: boolean;
  rotate?: boolean;
}) {
  const src = "/hero/corner-tag-1.svg";
  const srcRight = "/hero/corner-tag-2.svg";
  const imageSrc = rotate ? srcRight : src;

  return (
    <div className={`flex size-[4px] items-center justify-center ${className}`}>
      <div
        className={`flex-none ${flipY ? "-scale-y-100" : ""} ${rotate ? "rotate-180" : ""}`}
      >
        <div className="relative size-[4px]">
          <div className="absolute inset-[0_0_-12.5%_-12.5%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="block size-full max-w-none"
              src={imageSrc}
              aria-hidden
            />
          </div>
        </div>
      </div>
    </div>
  );
}
