"use client";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, interRegular, interSemiBold, dmMono } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import {
  FEATURED_RESOURCES,
  filterCategoryId,
  type ResourceArticle,
} from "./resources-data";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

const INITIAL_VISIBLE_COUNT = 6;
const LOAD_MORE_COUNT = 3;

function gradient(deg: string) {
  return `linear-gradient(${deg}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`;
}

function ResourceTagBadge({
  label,
  width,
}: {
  label: string;
  width: number;
}) {
  return (
    <div
      className={`${dmMono.className} relative h-[26px] shrink-0 border-[0.5px] border-solid border-white/20 bg-white/[0.04]`}
      style={{ width }}
    >
      <Corners leftSrc="/hero/vector-57.svg" rightSrc="/hero/vector-55.svg" />
      <span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10.5px] leading-none font-normal tracking-[0.05em] whitespace-nowrap text-white/80 uppercase not-italic"
      >
        {label}
      </span>
      <div className="absolute top-1/2 left-[6.48px] h-[10px] w-px -translate-y-1/2 bg-white/30" />
      <div className="absolute top-1/2 right-[6.48px] h-[10px] w-px -translate-y-1/2 bg-white/30" />
    </div>
  );
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
      <GreenCtaCorners />
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
          backgroundImage: "url(/resources/news-cta-texture.webp)",
          backgroundSize: "307.2px 307.2px",
        }}
      />
      <span className="relative text-[13px] leading-[normal] font-semibold uppercase whitespace-nowrap text-[#121212] not-italic">
        {children}
      </span>
      <GreenCtaCorners />
    </a>
  );
}

/* ---------------------------------- HERO ---------------------------------- */
function ResourcesHeroMobile({ data }: { data?: any } = {}) {
  const titleRaw = (data?.title as string) || "";
  const titleLines = titleRaw.split("\n");
  const placeholder = (data?.search_placeholder as string) || "";
  const searchLabel = (data?.search_button_label as string) || "";
  const contactText = (data?.contact_link_text as string) || "";
  const contactHref = (data?.contact_link_href as string) || "";
  const heroBgSrc =
    mediaUrl(data?.mobile_background_image) ||
    mediaUrl(data?.background_image) ||
    "";

  return (
    <section
      className="relative flex w-full flex-col items-center px-[24px] pb-[60px] pt-[240px]"
      aria-label="Resources hero"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {heroBgSrc ? (
          <Image
            src={heroBgSrc}
            alt={data?.mobile_background_image_alt || data?.background_image_alt || ""}
            fill
            className="object-cover object-top opacity-100 brightness-125"
            sizes="100vw"
            priority
          />
        ) : null}
      </div>

      <h1
        className={`${gilroyMedium.className} relative w-full bg-clip-text text-left text-[36px] leading-[40px] font-medium text-transparent [word-break:break-word] not-italic pt-[45px] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden`}
        style={{ backgroundImage: gradient("118.129deg") }}
      >
        {titleLines.map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
      </h1>

      <div className="relative mt-[32px] flex h-[48px] w-full flex-row items-stretch border-[0.5px] border-solid border-[rgba(255,255,255,0.4)] bg-[rgba(0,0,0,0.3)]">
        <div className="flex min-w-px flex-[1_0_0] items-center px-[16px]">
          <input
            type="search"
            aria-label="Search resources"
            placeholder={placeholder}
            className={`${interRegular.className} h-full w-full border-0 bg-transparent p-0 text-[12px] font-normal text-white outline-none placeholder:text-white/70 not-italic`}
          />
        </div>
        <button
          type="button"
          className="relative flex w-[90px] shrink-0 items-center justify-center bg-white bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.15)_100%)] shadow-[0px_24.721px_16.129px_rgba(255,255,255,0.15),0px_10.268px_6.699px_rgba(255,255,255,0.15),0px_3.714px_2.423px_rgba(255,255,255,0.1)] transition-opacity hover:opacity-90"
        >
          <span className={`${interSemiBold.className} max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[14px] leading-[normal] font-semibold text-[#121212] not-italic`}>
            {searchLabel}
          </span>
        </button>
      </div>

      <div className="mt-[20px] flex w-full justify-start">
        <p
          className={`${interRegular.className} text-[13px] leading-[20px] font-normal text-white/90 not-italic`}
        >
          Can&apos;t find what you&apos;re looking for?{" "}
          <Link href={contactHref} className="text-[#53d824]">
            {contactText}
          </Link>
        </p>
      </div>

      <div className="relative mt-[120px] flex w-full flex-col">
        {/* Background gradient behind the stat cards */}
        <div className="pointer-events-none absolute inset-0 -mx-[24px] -top-[60px] bg-gradient-to-b from-transparent via-black/90 to-black" />
        
        <div className="relative z-10 flex w-full flex-col">
          {/* Stat Card 1 */}
        <div className="relative flex w-full flex-col gap-[20px] pb-[32px]">
          <div className="flex items-center">
            <ResourceTagBadge
              label="Real-time AI at edge"
              width={180}
            />
          </div>
          <div className="flex w-full flex-row items-center gap-[24px]">
            <div className={`${gilroyMedium.className} flex w-[110px] shrink-0 flex-row items-baseline text-[56px] leading-[1] font-medium text-white not-italic`}>
              100<span className="text-[28px] text-white/50">%</span>
            </div>
            <div className="flex flex-col gap-[6px]">
              <h3 className={`${gilroyMedium.className} text-[20px] leading-[24px] font-medium text-white not-italic`}>
                Programmability
              </h3>
              <p className={`${interRegular.className} text-[12px] leading-[18px] font-normal text-white/60 not-italic`}>
                AI cores with 4 to 32 bit resolution for control in applications.
              </p>
            </div>
          </div>
        </div>

        {/* Divider with vertical ticks */}
        <div className="relative flex h-[1px] w-full items-center justify-center bg-white/10">
          <div className="absolute left-0 top-1/2 h-[6px] w-px -translate-y-1/2 bg-white/40" />
          <div className="absolute right-0 top-1/2 h-[6px] w-px -translate-y-1/2 bg-white/40" />
        </div>

        {/* Stat Card 2 */}
        <div className="relative flex w-full flex-col gap-[20px] pt-[32px]">
          <div className="flex items-center">
            <ResourceTagBadge
              label="Scalable arch."
              width={129}
            />
          </div>
          <div className="flex w-full flex-row items-center gap-[24px]">
            <div className={`${gilroyMedium.className} flex w-[120px] shrink-0 flex-row items-baseline gap-[4px] text-[56px] leading-[1] font-medium text-white not-italic`}>
              <span>512</span>
              <span className="text-[16px] text-white/50 tracking-wide">GOPs</span>
            </div>
            <div className="flex flex-col gap-[6px]">
              <h3 className={`${gilroyMedium.className} text-[20px] leading-[24px] font-medium text-white not-italic`}>
                Peak Performance
              </h3>
              <p className={`${interRegular.className} text-[12px] leading-[18px] font-normal text-white/60 not-italic`}>
                Unmatched AI throughput far exceeds typical low-power MCUs.
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- FEATURED --------------------------------- */
function ResourcesFeaturedMobile({ data }: { data?: any } = {}) {
  const heading = (data?.heading as string) || "";
  const strapiCards = Array.isArray(data?.cards) ? data.cards : [];
  const cards = strapiCards.map((card: any, i: number) => {
    const layout = FEATURED_RESOURCES[i] || FEATURED_RESOURCES[0];
    return {
      ...layout,
      imageSrc: mediaUrl(card?.image) || "",
      badgeLabel: (card?.badge_label as string) || "",
      title: (card?.title as string) || "",
      description: (card?.description as string) || "",
      ctaLabel: (card?.cta_label as string) || "",
      ctaHref: (card?.cta_href as string) || "",
      pdfUrl: mediaUrl(card?.pdf_file) || undefined,
    };
  });

  return (
    <section
      className="relative flex w-full flex-col py-[48px]"
      aria-label="Featured Resources"
    >
      <h2
        className={`${gilroyMedium.className} px-[24px] mb-[28px] text-[36px] leading-[36px] font-medium text-white not-italic text-center`}
      >
        {heading}
      </h2>

      <div className="flex w-full snap-x snap-mandatory gap-[10px] overflow-x-auto px-[calc(50%-124px)] pb-[32px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {cards.map((card: any, index: number) => (
          <a
            href={card.pdfUrl || card.ctaHref || "#"}
            key={`featured-card-${index}`}
            className="group relative block w-[248px] shrink-0 snap-center bg-[#191919] border-[0.5px] border-solid border-[rgba(255,255,255,0.3)] p-[10px] hover:border-[#53d824]/50 transition-colors cursor-pointer"
          >
            <div className="flex flex-col">
            <Corners />
            <div className="relative flex h-[215px] w-[228px] shrink-0 flex-col items-end overflow-clip p-[12px]">
              <div aria-hidden className="pointer-events-none absolute inset-0">
                {card.imageSrc ? (
                  <Image
                    src={card.imageSrc}
                    alt=""
                    fill
                    className={card.imageClassName || "object-cover"}
                    sizes="228px"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-b from-[rgba(25,25,25,0)] from-[79.181%] to-[#191919]" />
              </div>

              <div className="relative flex h-[26px] w-[87px] shrink-0 items-center justify-center overflow-clip bg-white">
                <Corners />
                <span className="font-mono text-[12px] uppercase leading-[19.5px] text-black">
                  {card.badgeLabel}
                </span>
              </div>
            </div>

            <div className="flex w-full flex-col items-start gap-[24px] p-[16px]">
              <div className="flex w-full flex-col items-start gap-[12px]">
                <h3 className={`${gilroyMedium.className} w-[195px] text-[16px] leading-[21px] text-white opacity-90`}>
                  {card.title}
                </h3>
                <p className={`${interRegular.className} w-[195px] text-[12px] font-normal leading-[15px] text-[#a4a4a4] opacity-90`}>
                  {card.description}
                </p>
              </div>

              <div className="relative flex h-[48px] w-full shrink-0 items-center justify-center shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]">
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]" />
                <GreenCtaCorners />
                <span className={`${gilroyMedium.className} relative text-[12px] uppercase leading-[28px] text-white`}>
                  {card.ctaLabel}
                </span>
              </div>
            </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}


/* ------------------------------- BUILDING --------------------------------- */
function ResourcesBuildingMobile({ data }: { data?: any } = {}) {
  const headingRaw = (data?.heading as string) || "";
  const headingLines = headingRaw.split("\n");
  const subtitle = (data?.subtitle as string) || "";
  const ctaLabel = (data?.cta_label as string) || "";
  const ctaHref = (data?.cta_href as string) || "";

  return (
    <section
      className="relative flex w-full flex-col items-center justify-center overflow-hidden px-[24px] py-[64px]"
      aria-label="Building with Ambient"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <Image
          src="/mobile/resources/09b798d5-3755-454c-9ebe-8db35323ff84 1.png"
          alt=""
          fill
          className="object-cover object-bottom brightness-[1.75]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)]" />
      </div>

      <div className="relative inline-flex items-center justify-center p-[10px]">
        <GreenCtaCorners />
        <h2
          className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] leading-[40px] font-medium text-transparent [word-break:break-word] not-italic`}
          style={{ backgroundImage: gradient("107.454deg") }}
        >
          {headingLines.map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </h2>
      </div>

      <p className={`${interRegular.className} relative mt-[16px] max-w-[320px] text-center text-[14px] leading-[22px] font-normal text-white/60 not-italic`}>
        {subtitle}
      </p>

      <div className="relative mt-[32px] w-[231px]">
        <a
          href={ctaHref}
          className="relative flex h-[48px] w-full items-center justify-center overflow-hidden shadow-[0px_10px_20px_rgba(255,255,255,0.15)]"
        >
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-white" />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40 mix-blend-plus-lighter"
            style={{
              backgroundImage: "url(/resources/news-cta-texture.webp)",
              backgroundSize: "307.2px 307.2px",
            }}
          />
          <span className={`${gilroyMedium.className} relative text-[14px] leading-[28px] font-medium uppercase whitespace-nowrap text-[#151515] not-italic`}>
            {ctaLabel}
          </span>
        </a>
      </div>
    </section>
  );
}

const CategoryConnector = ({ isBeforeActive, isAfterActive }: { isBeforeActive: boolean; isAfterActive: boolean }) => {
  let heights = [8, 8, 8, 8, 8];
  if (isBeforeActive) heights = [4, 5, 6, 7, 8];
  if (isAfterActive) heights = [8, 7, 6, 5, 4];

  return (
    <div className="flex shrink-0 items-center gap-[8px] px-[8px]">
      {heights.map((h, i) => (
        <div key={i} className="w-[2px] bg-white/20" style={{ height: `${h}px` }} />
      ))}
    </div>
  );
};

/* -------------------------------- CONTENT --------------------------------- */
type MobileCategory = {
  id: string;
  label: string;
  active: boolean;
};

function ResourcesContentMobile({
  data,
  articles,
}: {
  data?: any;
  articles?: ResourceArticle[];
} = {}) {
  const strapiCats = Array.isArray(data?.categories) ? data.categories : [];
  const categories: MobileCategory[] = strapiCats.map((c: any) => {
    return {
      id: (c?.category_id as string) || "",
      label: (c?.label as string) || "",
      active: Boolean(c?.is_active),
    };
  });
  const initialActiveId =
    categories.find((c) => c.active)?.id || categories[0]?.id || "";
  const initialVisible: number =
    typeof data?.initial_visible === "number"
      ? data.initial_visible
      : INITIAL_VISIBLE_COUNT;
  const loadMoreCount =
    typeof data?.load_more_count === "number"
      ? data.load_more_count
      : LOAD_MORE_COUNT;
  const loadMoreLabel = (data?.load_more_label as string) || "";
  void loadMoreCount;

  const allArticles = Array.isArray(articles) ? articles : [];

  const [activeCategory, setActiveCategory] = useState(initialActiveId);
  const [visibleCount, setVisibleCount] = useState(initialVisible);

  const activeCanon = filterCategoryId(activeCategory);
  const filteredArticles = allArticles.filter(
    (a) => Boolean(a.categoryId) && a.categoryId === activeCanon
  );
  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredArticles.length;

  const selectCategory = (id: string, e?: React.MouseEvent<HTMLButtonElement>) => {
    setActiveCategory(id);
    setVisibleCount(initialVisible);
    if (e) {
      e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  return (
    <section
      className="relative flex w-full flex-col px-[24px] py-[48px]"
      aria-label="Resource library"
    >
      <div className="-mx-[24px] mt-[5px] flex w-screen max-w-[100vw] snap-x snap-mandatory scroll-smooth items-center overflow-x-auto px-[24px] pb-[16px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <CategoryConnector isBeforeActive={activeCategory === categories[0]?.id} isAfterActive={false} />
        {categories.map((category, index) => {
          const isActive = activeCategory === category.id;
          const isAfterActive = isActive;
          const isBeforeNextActive = index < categories.length - 1 && activeCategory === categories[index + 1].id;

          return (
            <React.Fragment key={`${category.id}-${index}`}>
              <button
                type="button"
                onClick={(e) => selectCategory(category.id, e)}
                className={`relative flex h-[36px] shrink-0 snap-center items-center justify-center px-[20px] transition-colors ${isActive ? "bg-[#f0f0f0]" : ""
                  }`}
              >
                {isActive && <Corners />}
                <span
                  className={`${interRegular.className} whitespace-nowrap text-[14px] not-italic ${isActive ? "text-[#0e1a0e]" : "text-[#666]"
                    }`}
                >
                  {category.label}
                </span>
              </button>
              <CategoryConnector isBeforeActive={isBeforeNextActive} isAfterActive={isAfterActive} />
            </React.Fragment>
          );
        })}
      </div>

      <div className="mt-[32px] flex flex-col gap-[24px]">
        {visibleArticles.map((article) => (
          <a
            href={article.href || "#"}
            key={article.nodeId}
            className="group relative block overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.1)] bg-black px-[12px] pb-[24px] pt-[9px] hover:border-[#53d824]/50 transition-colors cursor-pointer"
          >
            <div className="flex flex-col gap-[20px]">
            <Corners />
            <div className="relative h-[244px] w-full shrink-0 overflow-hidden bg-[#151515]">
              {article.imageSrc ? (
                <Image
                  src={article.imageSrc}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 335px"
                />
              ) : null}
              {article.imageOverlaySrc ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={article.imageOverlaySrc}
                    alt=""
                    width={335}
                    height={244}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ) : null}
            </div>

            <div className="flex flex-col items-start gap-[20px]">
              <div className="relative flex h-[26px] shrink-0 items-center justify-center border-[0.5px] border-solid border-white/20 bg-[rgba(255,255,255,0.06)] px-[12px]">
                <Corners leftSrc="/hero/vector-57.svg" rightSrc="/hero/vector-55.svg" />
                <div className="absolute left-[6.48px] top-1/2 h-[10px] w-px -translate-y-1/2 bg-white/30" />
                <div className="absolute right-[6.48px] top-1/2 h-[10px] w-px -translate-y-1/2 bg-white/30" />
                <span className="font-mono text-[10.5px] uppercase tracking-[0.05em] text-[#ecfae5]">
                  {article.category}
                </span>
              </div>

              <div className="flex flex-col items-start gap-[10px]">
                <h3 className={`${gilroyMedium.className} text-[16px] leading-[18px] text-white not-italic`}>
                  {article.title}
                </h3>
                <p className={`${interRegular.className} text-[14px] leading-[21px] font-normal not-italic`}>
                  <span className="text-[rgba(240,240,240,0.6)]">{article.excerpt}</span>{" "}
                  <span className="text-[#53d824] transition-opacity group-hover:opacity-80">read more</span>
                </p>
              </div>
            </div>
            </div>
          </a>
        ))}
      </div>

      {/* Load more button removed per user request */}
    </section>
  );
}

/* ------------------------------- NEWS CTA --------------------------------- */
function ResourcesNewsCtaMobile({ data }: { data?: any } = {}) {
  const heading = (data?.heading as string) || "";
  const ctaLabel = (data?.cta_label as string) || "";
  const ctaHref = (data?.cta_href as string) || "";

  return (
    <section
      className="relative z-10 flex w-full flex-col items-center gap-[21px] px-[24px] pt-[110px] overflow-visible bg-transparent -mb-[226px]"
      aria-label="Latest news"
    >
      {/* Background image and gradient removed to make it fully transparent */}

      <div className="relative inline-flex items-center justify-center p-[8px] z-10">
        <GreenCtaCorners />
        <h2
          className={`${gilroyMedium.className} w-[313px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic`}
          style={{ backgroundImage: gradient("98.0026deg") }}
        >
          {heading}
        </h2>
      </div>

      <div className="relative w-[158px] z-10">
        <a
          href={ctaHref}
          className={`relative flex h-[48px] w-full items-center justify-center overflow-hidden ${GREEN_CTA_SHADOW}`}
        >
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-white" />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40 mix-blend-plus-lighter"
            style={{
              backgroundImage: "url(/resources/news-cta-texture.webp)",
              backgroundSize: "307.2px 307.2px",
            }}
          />
          <span className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]" />
          <span className={`${gilroyMedium.className} relative text-[14px] leading-[28px] font-medium uppercase whitespace-nowrap text-[#121212] not-italic`}>
            {ctaLabel}
          </span>
        </a>
      </div>
    </section>
  );
}

/* --------------------------------- PAGE ----------------------------------- */
export function ResourcesMobile({
  data,
  articles,
}: {
  data?: any;
  articles?: ResourceArticle[];
} = {}) {
  return (
    <div className="flex w-full flex-col">
      <ResourcesHeroMobile data={data?.hero} />
      <ResourcesFeaturedMobile data={data?.featured} />
      <ResourcesBuildingMobile data={data?.building} />
      <ResourcesContentMobile data={data?.content} articles={articles} />
      <ResourcesNewsCtaMobile data={data?.news_cta} />
    </div>
  );
}
