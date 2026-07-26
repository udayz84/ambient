"use client";

import { useState } from "react";
import { interRegular, gilroyMedium } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { mediaUrl } from "@/lib/strapi";
import { NewsArticleCard } from "./NewsArticleCard";
import { NEWS_ARTICLES, type NewsArticle } from "./news-data";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

const ROW_ONE_BG = "bg-[rgba(255,255,255,0.04)]";
const ROW_TWO_BG = "bg-[rgba(0,0,0,0.04)]";

const GREEN_GLOW_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

const FALLBACK_LOAD_MORE_LABEL = "Load More Resources";

type Pill = {
  id: string;
  label: string;
  active: boolean;
  cards: NewsArticle[];
};

const FALLBACK_CARDS: NewsArticle[] = NEWS_ARTICLES;

const FALLBACK_FILTER_PILLS: Pill[] = [
  { id: "news", label: "NEWS", active: true, cards: FALLBACK_CARDS },
  {
    id: "press-releases",
    label: "PRESS RELEASES",
    active: false,
    cards: FALLBACK_CARDS,
  },
  {
    id: "blogs",
    label: "BLOGS & ARTICLES",
    active: false,
    cards: FALLBACK_CARDS,
  },
];

type NewsGridProps = {
  data?: any;
};

function cardsToArticles(cards: unknown): NewsArticle[] {
  if (!Array.isArray(cards) || cards.length === 0) return FALLBACK_CARDS;
  return cards.map((c: any, i: number) => {
    const fallback = NEWS_ARTICLES[i] || NEWS_ARTICLES[0];
    return {
      nodeId: (c?.nodeId as string) || fallback.nodeId,
      category: (c?.category as string) || fallback.category,
      title: (c?.title as string) || fallback.title,
      titleFontSize:
        typeof c?.title_font_size === "number"
          ? c.title_font_size
          : fallback.titleFontSize,
      excerpt: (c?.excerpt as string) || fallback.excerpt,
      imageOverlaySrc:
        mediaUrl(c?.image_overlay) || fallback.imageOverlaySrc,
    };
  });
}

function buildPills(data: any): Pill[] {
  const raw = Array.isArray(data?.filter_pills) ? data.filter_pills : [];
  if (raw.length === 0) return FALLBACK_FILTER_PILLS;
  const pills: Pill[] = raw.map((p: any, i: number) => {
    const fallback = FALLBACK_FILTER_PILLS[i] || FALLBACK_FILTER_PILLS[0];
    return {
      id: (p?.category_id as string) || fallback.id,
      label: (p?.label as string) || fallback.label,
      active: Boolean(p?.is_active),
      cards: cardsToArticles(p?.cards),
    };
  });
  return pills.length > 0 ? pills : FALLBACK_FILTER_PILLS;
}

function Tick({ height, tone }: { height: number; tone: "white" | "dark" }) {
  return (
    <span
      aria-hidden
      className={`w-px shrink-0 ${tone === "white" ? "bg-white/70" : "bg-[#333333]"}`}
      style={{ height: `${height}px` }}
    />
  );
}

function NewsPill({ label }: { label: string }) {
  return (
    <div
      className="relative flex h-[44px] w-fit shrink-0 items-center justify-center overflow-clip bg-[#f0f0f0] px-[10px]"
      data-node-id="2500:1853"
      data-name="Cta"
    >
      <span
        className={`${interRegular.className} relative text-[16px] leading-[24px] font-normal whitespace-nowrap text-[#0e1a0e] not-italic`}
      >
        {label}
      </span>
      <Corners
        leftSrc="/applications/corners/tab-corner-tl.svg"
        rightSrc="/applications/corners/tab-corner-tr.svg"
      />
    </div>
  );
}

function NewsFilterBar({
  pills,
  activeId,
  onSelect,
}: {
  pills: Pill[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      className="flex w-[712px] max-w-full items-center justify-between overflow-x-auto"
      data-node-id="2500:1826"
      data-name="Options"
    >
      {pills.map((pill, index) => {
        const isActive = pill.id === activeId;
        const isLast = index === pills.length - 1;
        return (
          <div
            className={`flex shrink-0 items-center ${isActive ? "gap-[24px]" : "gap-0"}`}
            key={pill.id}
          >
            {isActive ? (
              <>
                <Tick height={7} tone="white" />
                <Tick height={8} tone="white" />
              </>
            ) : (
              <>
                <Tick height={8} tone="dark" />
                <Tick height={8} tone="dark" />
              </>
            )}

            {isActive ? (
              <NewsPill label={pill.label} />
            ) : (
              <button
                type="button"
                onClick={() => onSelect(pill.id)}
                className={`${interRegular.className} shrink-0 cursor-pointer px-[20px] py-[14px] text-[16px] leading-[24px] font-normal whitespace-nowrap text-[#666] transition-colors not-italic hover:text-[#bdbdbd]`}
              >
                {pill.label}
              </button>
            )}

            {isActive ? (
              <>
                <Tick height={8} tone="white" />
                <Tick height={7} tone="white" />
              </>
            ) : isLast ? (
              <>
                <Tick height={8} tone="dark" />
                <Tick height={8} tone="dark" />
              </>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function LoadMoreCta({ label }: { label: string }) {
  return (
    <a
      href="#"
      className={`${gilroyMedium.className} ${GREEN_GLOW_SHADOW} relative flex h-[48px] w-[225px] shrink-0 items-center justify-center`}
      data-node-id="2500:2002"
      data-name="Cta"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span className="relative z-10 text-[16px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic [word-break:break-word]">
        {label}
      </span>
      <GreenCtaCorners />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
      />
    </a>
  );
}

export function NewsGrid({ data }: NewsGridProps = {}) {
  const pills = buildPills(data);
  const loadMoreLabel =
    (data?.load_more_label as string) || FALLBACK_LOAD_MORE_LABEL;

  const initialActiveId =
    pills.find((p) => p.active)?.id || pills[0]?.id || "news";
  const [activeId, setActiveId] = useState(initialActiveId);

  const activePill = pills.find((p) => p.id === activeId) || pills[0];
  const activeCards = activePill?.cards || FALLBACK_CARDS;

  return (
    <section
      className="relative z-20 mb-0 min-[1024px]:mb-[-409px] flex w-full justify-center overflow-hidden bg-transparent"
      aria-label="News articles"
      data-node-id="2500:1825"
    >
      <div className="flex w-full min-[1024px]:w-[1236px] flex-col items-center gap-[60px] px-[24px] py-[64px] min-[1024px]:px-0">
        <NewsFilterBar pills={pills} activeId={activeId} onSelect={setActiveId} />

        <div className="relative z-10 flex w-full flex-col items-center bg-transparent">
          <div className="grid w-full grid-cols-1 gap-[36px] min-[1024px]:grid-cols-3">
            {activeCards.slice(0, 3).map((article, i) => (
              <NewsArticleCard
                key={`${article.nodeId}-${i}`}
                article={article}
                bgClass={ROW_ONE_BG}
              />
            ))}
          </div>
          <div className="grid w-full grid-cols-1 gap-[36px] min-[1024px]:grid-cols-3">
            {activeCards.slice(3, 6).map((article, i) => (
              <NewsArticleCard
                key={`${article.nodeId}-${i}`}
                article={article}
                bgClass={ROW_TWO_BG}
              />
            ))}
          </div>
          <LoadMoreCta label={loadMoreLabel} />
        </div>
      </div>
    </section>
  );
}
