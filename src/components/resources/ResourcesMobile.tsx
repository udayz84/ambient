"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { gilroyMedium, interRegular, interSemiBold } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import {
  ARTICLE_IMAGE_BASE,
  FEATURED_RESOURCES,
  RESOURCE_ARTICLES,
  RESOURCE_CATEGORIES,
} from "./resources-data";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

const INITIAL_VISIBLE_COUNT = 6;
const LOAD_MORE_COUNT = 3;

function gradient(deg: string) {
  return `linear-gradient(${deg}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`;
}

function GreenCta({
  children,
  href = "#",
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <a
      href={href}
      className={`${interSemiBold.className} relative flex h-[48px] w-full items-center justify-center overflow-hidden ${GREEN_CTA_SHADOW}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
      />
      <span className="relative text-[13px] leading-[normal] font-semibold uppercase whitespace-nowrap text-white not-italic">
        {children}
      </span>
      <Corners />
    </a>
  );
}

function WhiteCta({
  children,
  href = "#",
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <a
      href={href}
      className={`${interSemiBold.className} relative flex h-[48px] w-full items-center justify-center overflow-hidden shadow-[0px_24.721px_16.129px_rgba(255,255,255,0.15)]`}
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-white" />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-plus-lighter"
        style={{
          backgroundImage: "url(/resources/news-cta-texture.png)",
          backgroundSize: "307.2px 307.2px",
        }}
      />
      <span className="relative text-[13px] leading-[normal] font-semibold uppercase whitespace-nowrap text-[#121212] not-italic">
        {children}
      </span>
      <Corners />
    </a>
  );
}

/* ---------------------------------- HERO ---------------------------------- */
function ResourcesHeroMobile() {
  return (
    <section
      className="relative flex w-full flex-col items-center px-[24px] pb-[40px] pt-[130px]"
      aria-label="Resources hero"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <Image
          src="/resources/image-102.png"
          alt=""
          fill
          className="object-cover opacity-40"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-black" />
      </div>

      <h1
        className={`${gilroyMedium.className} relative max-w-[327px] bg-clip-text text-center text-[28px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic`}
        style={{ backgroundImage: gradient("118.129deg") }}
      >
        Explore whitepapers, architectural deep-dives, and performance data
      </h1>

      <div className="relative mt-[24px] flex w-full flex-col gap-[10px]">
        <div className="flex h-[48px] items-center border-[0.5px] border-solid border-white/20 bg-[rgba(0,0,0,0.4)] px-[16px]">
          <input
            type="search"
            aria-label="Search resources"
            placeholder="Search architecture, case studies..."
            className={`${interRegular.className} h-full w-full border-0 bg-transparent p-0 text-[14px] font-normal text-white outline-none placeholder:text-white/60 not-italic`}
          />
        </div>
        <WhiteCta href="#">Search</WhiteCta>
      </div>

      <p
        className={`${interRegular.className} relative mt-[16px] text-[13px] leading-[20px] font-normal text-white/75 not-italic`}
      >
        Can&apos;t find what you&apos;re looking for?{" "}
        <Link href="/contact" className="text-[#53d824]">
          Contact Us
        </Link>
      </p>
    </section>
  );
}

/* ------------------------------- FEATURED --------------------------------- */
function ResourcesFeaturedMobile() {
  return (
    <section
      className="relative flex w-full flex-col px-[24px] py-[48px]"
      aria-label="Featured Resources"
    >
      <h2
        className={`${gilroyMedium.className} mb-[24px] text-[26px] leading-[32px] font-medium text-white not-italic`}
      >
        Featured Resources
      </h2>

      <div className="flex flex-col gap-[16px]">
        {FEATURED_RESOURCES.map((card) => (
          <article
            key={card.nodeId}
            className="relative flex flex-col gap-[14px] overflow-clip border-[0.5px] border-solid border-white/20 bg-[#191919] p-[14px]"
          >
            <div className="relative h-[170px] w-full shrink-0 overflow-hidden">
              <Image
                src={card.imageSrc}
                alt=""
                fill
                className="object-cover"
                sizes="327px"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#191919]" aria-hidden />
              <span className="absolute right-[12px] top-[12px] border-[0.5px] border-solid border-white/40 bg-white px-[10px] py-[3px] text-[10px] font-normal uppercase tracking-[0.08em] text-black not-italic">
                {card.badgeLabel}
              </span>
            </div>
            <div className="flex flex-col gap-[10px] px-[6px] pb-[6px]">
              <h3 className={`${gilroyMedium.className} text-[20px] leading-[26px] font-medium text-white opacity-90 not-italic`}>
                Re-architecting the Physics of AI Compute.
              </h3>
              <p className={`${interRegular.className} text-[13px] leading-[20px] font-normal text-[#a4a4a4] not-italic`}>
                Standard chips waste time translating AI workloads. Our
                architecture processes matrix math natively for high-density
                performance.
              </p>
              <div className="mt-[4px]">
                <GreenCta href="#">Download PDF</GreenCta>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- BUILDING --------------------------------- */
function ResourcesBuildingMobile() {
  return (
    <section
      className="relative flex w-full flex-col items-start justify-center overflow-hidden px-[24px] py-[56px]"
      aria-label="Building with Ambient"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <Image
          src="/resources/building-bg.png"
          alt=""
          fill
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
      </div>

      <h2
        className={`${gilroyMedium.className} relative max-w-[300px] bg-clip-text text-left text-[26px] leading-[32px] font-medium text-transparent [word-break:break-word] not-italic`}
        style={{ backgroundImage: gradient("122.573deg") }}
      >
        Building with Ambient?
      </h2>
      <p className={`${interRegular.className} relative mt-[14px] max-w-[320px] text-[14px] leading-[22px] font-normal text-white/70 not-italic`}>
        Access the ModelForge SDK, API references, model compilation guides, and
        hardware documentation.
      </p>
      <div className="relative mt-[24px] w-full max-w-[280px]">
        <WhiteCta href="#">Go to Developer Hub</WhiteCta>
      </div>
    </section>
  );
}

/* -------------------------------- CONTENT --------------------------------- */
function ResourcesContentMobile() {
  const [activeCategory, setActiveCategory] = useState("webinar");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const visibleArticles = RESOURCE_ARTICLES.slice(0, visibleCount);
  const canLoadMore = visibleCount < RESOURCE_ARTICLES.length;

  return (
    <section
      className="relative flex w-full flex-col px-[24px] py-[48px]"
      aria-label="Resource library"
    >
      <div className="flex snap-x snap-mandatory gap-[8px] overflow-x-auto pb-[8px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {RESOURCE_CATEGORIES.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={`${interRegular.className} shrink-0 snap-start cursor-pointer px-[14px] py-[8px] text-[12px] leading-[16px] font-normal tracking-[0.04em] whitespace-nowrap uppercase not-italic transition-colors ${
                isActive
                  ? "bg-[#f0f0f0] text-[#0e1a0e]"
                  : "border-[0.5px] border-solid border-white/15 text-white/60"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <div className="mt-[24px] flex flex-col gap-[14px]">
        {visibleArticles.map((article) => (
          <article
            key={article.nodeId}
            className="relative flex flex-col gap-[12px] overflow-clip border-[0.5px] border-solid border-white/15 bg-[#191919] p-[12px]"
          >
            <div className="relative h-[150px] w-full shrink-0 overflow-hidden">
              <Image
                src={ARTICLE_IMAGE_BASE}
                alt=""
                fill
                className="object-cover"
                sizes="327px"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={article.imageOverlaySrc}
                  alt=""
                  width={220}
                  height={150}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col gap-[8px] px-[6px] pb-[6px]">
              <span className={`${interRegular.className} w-fit border-[0.5px] border-solid border-white/20 bg-[rgba(255,255,255,0.06)] px-[8px] py-[2px] text-[10px] uppercase tracking-[0.06em] text-[#ecfae5] not-italic`}>
                {article.category}
              </span>
              <h3 className={`${gilroyMedium.className} text-[16px] leading-[22px] font-medium text-white not-italic`}>
                {article.title}
              </h3>
              <p className={`${interRegular.className} text-[12px] leading-[18px] font-normal not-italic`}>
                <span className="text-[rgba(240,240,240,0.6)]">{article.excerpt}</span>{" "}
                <a href="#" className="text-[#53d824]">read more</a>
              </p>
            </div>
          </article>
        ))}
      </div>

      {canLoadMore ? (
        <div className="mt-[24px]">
          <button
            type="button"
            onClick={() =>
              setVisibleCount((c) => Math.min(c + LOAD_MORE_COUNT, RESOURCE_ARTICLES.length))
            }
            className={`${interSemiBold.className} relative flex h-[48px] w-full items-center justify-center overflow-hidden ${GREEN_CTA_SHADOW}`}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
            />
            <span className="relative text-[13px] leading-[normal] font-semibold uppercase whitespace-nowrap text-white not-italic">
              Load More Resources
            </span>
            <Corners />
          </button>
        </div>
      ) : null}
    </section>
  );
}

/* ------------------------------- NEWS CTA --------------------------------- */
function ResourcesNewsCtaMobile() {
  return (
    <section
      className="relative flex w-full flex-col items-center gap-[24px] px-[24px] py-[64px]"
      aria-label="Latest news"
    >
      <h2
        className={`${gilroyMedium.className} max-w-[327px] bg-clip-text text-center text-[26px] leading-[34px] font-medium text-transparent [word-break:break-word] not-italic`}
        style={{ backgroundImage: gradient("115.045deg") }}
      >
        Looking for latest developments, events, and announcements?
      </h2>
      <div className="w-full max-w-[240px]">
        <WhiteCta href="#">Visit News Page</WhiteCta>
      </div>
    </section>
  );
}

/* --------------------------------- PAGE ----------------------------------- */
export function ResourcesMobile() {
  return (
    <div className="flex w-full flex-col">
      <ResourcesHeroMobile />
      <ResourcesFeaturedMobile />
      <ResourcesBuildingMobile />
      <ResourcesContentMobile />
      <ResourcesNewsCtaMobile />
    </div>
  );
}
