"use client";

import Image from "next/image";
import { Fragment, useState, useRef, useEffect } from "react";
import { interRegular, gilroyMedium } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { mediaUrl } from "@/lib/strapi";
import { NewsArticleCard } from "./NewsArticleCard";
import { type NewsArticle } from "./news-data";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { CompanySectionTitle } from "../company/CompanySectionTitle";

const ROW_ONE_BG = "bg-[rgba(255,255,255,0.04)]";
const ROW_TWO_BG = "bg-[rgba(0,0,0,0.04)]";

const GREEN_GLOW_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

type Pill = {
  id: string;
  label: string;
  active: boolean;
  cards: NewsArticle[];
};

type NewsGridProps = {
  data?: any;
  articles?: NewsArticle[];
};

function cardsToArticles(cards: unknown): NewsArticle[] {
  if (!Array.isArray(cards) || cards.length === 0) return [];
  return cards.map((c: any, i: number) => {
    return {
      nodeId: (c?.nodeId as string) || `news-card-${i}`,
      category: (c?.category as string) || "",
      title: (c?.title as string) || "",
      titleFontSize:
        typeof c?.title_font_size === "number"
          ? c.title_font_size
          : undefined,
      excerpt: (c?.excerpt as string) || "",
      imageOverlaySrc: mediaUrl(c?.image_overlay) || "",
      href: c?.slug ? `/article/${c.slug}` : undefined,
    };
  });
}

function buildPills(data: any, allArticles: NewsArticle[] = []): Pill[] {
  const raw = Array.isArray(data?.filter_pills) ? data.filter_pills : [];
  return raw.map((p: any) => {
    const pillId = (p?.category_id as string) || "";
    
    // Fall back to hardcoded cards if no matching dynamic articles found
    // (useful for a mixed content strategy where some pills are manual)
    let matchingCards = allArticles.filter(
      (a) => !pillId || a.categoryId === pillId
    );
    
    if (matchingCards.length === 0) {
      matchingCards = cardsToArticles(p?.cards);
    }

    return {
      id: pillId,
      label: (p?.label as string) || "",
      active: Boolean(p?.is_active),
      cards: matchingCards,
    };
  });
}

function CategoryDivider({
  variant = "normal",
}: {
  variant?: "normal" | "before-active" | "after-active";
}) {
  const segments =
    variant === "before-active"
      ? [
          { height: 4, color: "bg-[#333333]" },
          { height: 5, color: "bg-[#333333]" },
          { height: 6, color: "bg-[#333333]" },
          { height: 7, color: "bg-white/70" },
          { height: 8, color: "bg-white" },
        ]
      : variant === "after-active"
      ? [
          { height: 8, color: "bg-white" },
          { height: 7, color: "bg-white/70" },
          { height: 6, color: "bg-[#333333]" },
          { height: 5, color: "bg-[#333333]" },
          { height: 4, color: "bg-[#333333]" },
        ]
      : [
          { height: 8, color: "bg-[#333333]" },
          { height: 8, color: "bg-[#333333]" },
          { height: 8, color: "bg-[#333333]" },
          { height: 8, color: "bg-[#333333]" },
          { height: 8, color: "bg-[#333333]" },
        ];

  return (
    <div className="flex shrink-0 items-center gap-[8.36px]" aria-hidden>
      {segments.map((seg, i) => (
        <span
          key={i}
          className={`w-px ${seg.color}`}
          style={{ height: `${seg.height}px` }}
        />
      ))}
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
  const currentIndex = pills.findIndex((p) => p.id === activeId);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const activeEl = navRef.current?.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [activeId]);

  return (
    <nav
      ref={navRef}
      className="-mx-[20px] px-[20px] max-w-[100vw] w-screen min-[1024px]:mx-0 min-[1024px]:px-0 min-[1024px]:max-w-none min-[1024px]:w-full flex h-[52px] items-center gap-[9.61px] overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [scrollbar-width:none] min-[1024px]:justify-center min-[1024px]:overflow-visible min-[1024px]:snap-none"
      aria-label="News categories"
    >

      {pills.map((pill, index) => {
        const isActive = activeId === pill.id;
        const dividerVariant =
          index === currentIndex
            ? "before-active"
            : index === currentIndex + 1
            ? "after-active"
            : "normal";

        return (
          <Fragment key={`${pill.id}-${index}`}>
            <CategoryDivider variant={dividerVariant} />
            <button
              type="button"
              data-active={isActive}
              onClick={(e) => {
                onSelect(pill.id);
                e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
              }}
              className={`${interRegular.className} snap-center relative flex h-[52px] shrink-0 cursor-pointer items-center justify-center px-[20px] text-[16px] leading-[24px] font-normal whitespace-nowrap not-italic transition-colors ${
                isActive ? "text-[#0e1a0e]" : "text-[#666] hover:text-white"
              }`}
            >
              {isActive ? (
                <span className="pointer-events-none absolute inset-y-[4px] inset-x-[13px] overflow-clip bg-[#f0f0f0]">
                  <Corners />
                </span>
              ) : null}
              <span className="relative">{pill.label}</span>
            </button>
          </Fragment>
        );
      })}
      <CategoryDivider
        variant={
          currentIndex === pills.length - 1
            ? "after-active"
            : "normal"
        }
      />
    </nav>
  );
}

function LoadMoreCta({ label, onClick }: { label: string; onClick?: (e: React.MouseEvent) => void }) {
  return (
    <a
      href="#"
      onClick={onClick}
      className={`${gilroyMedium.className} ${GREEN_GLOW_SHADOW} relative flex h-[48px] w-[231px] min-[1024px]:w-[225px] shrink-0 items-center justify-center`}
      data-node-id="2500:2002"
      data-name="Cta"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span className="relative z-10 max-w-full text-[16px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic overflow-hidden text-ellipsis [word-break:break-word]">
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

export function NewsGrid({ data, articles = [] }: NewsGridProps = {}) {
  const pills = buildPills(data, articles);
  const loadMoreLabel = (data?.load_more_label as string) || "";
  const gridTitle = (data?.title as string) || "Latest Scoop from Ambient";

  const initialActiveId =
    pills.find((p) => p.active)?.id || pills[0]?.id || "";
  const [activeId, setActiveId] = useState(initialActiveId);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    setVisibleCount(6);
  }, [activeId]);

  const activePill = pills.find((p) => p.id === activeId) || pills[0];
  const activeCards: NewsArticle[] = activePill?.cards || [];

  const handleLoadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    setVisibleCount((prev) => prev + 6);
  };

  const visibleCards = activeCards.slice(0, visibleCount);
  const chunkedCards = [];
  for (let i = 0; i < visibleCards.length; i += 3) {
    chunkedCards.push(visibleCards.slice(i, i + 3));
  }

  return (
    <section
      className="relative z-20 mb-0 min-[1024px]:mb-[-409px] flex w-full justify-center overflow-hidden bg-transparent"
      aria-label="News articles"
      data-node-id="2500:1825"
    >
      <div className="flex w-full min-[1024px]:w-[1236px] flex-col items-center gap-[24px] px-[20px] pt-[27px] pb-[30px] min-[1024px]:gap-[60px] min-[1024px]:px-0 min-[1024px]:pt-[64px] min-[1024px]:pb-[64px]">
        {/* Section title */}
        <div className="flex w-full justify-center">
          <CompanySectionTitle
            width="max-content"
            height={50}
            fontSize={46}
            lineHeight={50}
            textCenter
          >
            {gridTitle}
          </CompanySectionTitle>
        </div>
        <NewsFilterBar pills={pills} activeId={activeId} onSelect={setActiveId} />

        <div className="relative z-10 flex w-full flex-col items-center gap-[19px] bg-transparent min-[1024px]:gap-[36px]">
          {chunkedCards.map((chunk, chunkIndex) => (
            <div key={chunkIndex} className="grid w-full grid-cols-1 gap-[19px] min-[1024px]:grid-cols-3 min-[1024px]:gap-[36px]">
              {chunk.map((article, i) => (
                <NewsArticleCard
                  key={`${article.nodeId}-${i}`}
                  article={article}
                  bgClass={chunkIndex % 2 === 0 ? ROW_ONE_BG : ROW_TWO_BG}
                />
              ))}
            </div>
          ))}

          {activeCards.length > visibleCount && (
            <div className="mt-[11px] flex justify-center min-[1024px]:mt-0">
              <LoadMoreCta label={loadMoreLabel} onClick={handleLoadMore} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
