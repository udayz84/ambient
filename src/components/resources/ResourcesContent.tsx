"use client";

import Image from "next/image";
import { useState } from "react";
import { interRegular } from "../hero/fonts";
import { GreenCtaButton } from "../contact/contact-shared";
import {
  RESOURCE_ARTICLES,
  RESOURCE_CATEGORIES,
} from "./resources-data";
import { ResourcesArticleCard } from "./ResourcesArticleCard";

const scrollArrowLeft = "/applications/nav-arrow-right.svg";

export function ResourcesContent() {
  const [activeCategory, setActiveCategory] = useState("webinar");

  return (
    <section
      className="absolute top-[2026px] left-[98px] flex w-[1244px] flex-col items-center gap-[60px]"
      aria-label="Resource library"
      data-node-id="2379:1772"
    >
      <nav
        className="flex h-[52px] w-full items-center justify-between"
        aria-label="Resource categories"
        data-node-id="2379:1773"
      >
        <button
          type="button"
          className="relative size-[44px] shrink-0"
          aria-label="Scroll categories left"
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
            const isActive =
              ("active" in category && category.active) ||
              activeCategory === category.id;

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
          className="relative size-[44px] shrink-0"
          aria-label="Scroll categories right"
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
        <div className="flex w-full gap-[36px]" data-node-id="2379:1833">
          {RESOURCE_ARTICLES.slice(0, 3).map((article) => (
            <ResourcesArticleCard key={article.nodeId} {...article} />
          ))}
        </div>
        <div className="flex w-full gap-[36px]" data-node-id="2379:1891">
          {RESOURCE_ARTICLES.slice(3, 6).map((article) => (
            <ResourcesArticleCard key={article.nodeId} {...article} />
          ))}
        </div>
      </div>

      <GreenCtaButton className="w-[225px]" href="#">
        Load More Resources
      </GreenCtaButton>
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
