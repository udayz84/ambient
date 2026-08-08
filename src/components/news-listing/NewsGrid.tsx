"use client";

import Image from "next/image";
import { Fragment, useState, useRef, useEffect } from "react";
import { interRegular, gilroyMedium } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { mediaUrl } from "@/lib/strapi";
import { NewsArticleCard } from "./NewsArticleCard";
import { type NewsArticle } from "./news-data";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

const scrollArrowLeft = "/applications/nav-arrow-right.svg";

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
    };
  });
}

function buildPills(data: any): Pill[] {
  const raw = Array.isArray(data?.filter_pills) ? data.filter_pills : [];
  return raw.map((p: any) => {
    return {
      id: (p?.category_id as string) || "",
      label: (p?.label as string) || "",
      active: Boolean(p?.is_active),
      cards: cardsToArticles(p?.cards),
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
      if (activeEl && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const activeRect = (activeEl as HTMLElement).getBoundingClientRect();
        const scrollLeft =
          activeRect.left - navRect.left - (navRect.width - activeRect.width) / 2;
        navRef.current.scrollLeft += scrollLeft;
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [activeId]);

  const handlePrevCategory = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : pills.length - 1;
    onSelect(pills[prevIndex].id);
  };

  const handleNextCategory = () => {
    const nextIndex = currentIndex < pills.length - 1 ? currentIndex + 1 : 0;
    onSelect(pills[nextIndex].id);
  };

  return (
    <nav
      ref={navRef}
      className="flex h-[52px] w-full items-center gap-[9.61px] overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] min-[1024px]:justify-between min-[1024px]:overflow-visible"
      aria-label="News categories"
    >
      <button
        type="button"
        className="relative size-[44px] hidden shrink-0 cursor-pointer transition-opacity hover:opacity-80 border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(255,255,255,0.03)] min-[1024px]:flex"
        aria-label="Previous category"
        onClick={handlePrevCategory}
      >
        <Corners />
        <Image
          src={scrollArrowLeft}
          alt=""
          width={44}
          height={44}
          className="block size-full max-w-none rotate-180"
          aria-hidden
        />
      </button>

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
              onClick={() => onSelect(pill.id)}
              className={`${interRegular.className} relative flex h-[52px] shrink-0 cursor-pointer items-center justify-center px-[20px] text-[16px] leading-[24px] font-normal whitespace-nowrap not-italic transition-colors ${
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

      <button
        type="button"
        className="relative size-[44px] hidden shrink-0 cursor-pointer transition-opacity hover:opacity-80 border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(255,255,255,0.03)] min-[1024px]:flex"
        aria-label="Next category"
        onClick={handleNextCategory}
      >
        <Corners />
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
  );
}

function LoadMoreCta({ label }: { label: string }) {
  return (
    <a
      href="#"
      className={`${gilroyMedium.className} ${GREEN_GLOW_SHADOW} relative flex h-[48px] w-[231px] min-[1024px]:w-[225px] shrink-0 items-center justify-center`}
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
  const loadMoreLabel = (data?.load_more_label as string) || "";

  const initialActiveId =
    pills.find((p) => p.active)?.id || pills[0]?.id || "";
  const [activeId, setActiveId] = useState(initialActiveId);

  const activePill = pills.find((p) => p.id === activeId) || pills[0];
  const activeCards: NewsArticle[] = activePill?.cards || [];

  return (
    <section
      className="relative z-20 mb-0 min-[1024px]:mb-[-409px] flex w-full justify-center overflow-hidden bg-transparent"
      aria-label="News articles"
      data-node-id="2500:1825"
    >
      <div className="flex w-full min-[1024px]:w-[1236px] flex-col items-center gap-[24px] px-[20px] pt-[27px] pb-[30px] min-[1024px]:gap-[60px] min-[1024px]:px-0 min-[1024px]:pt-[64px] min-[1024px]:pb-[64px]">
        <NewsFilterBar pills={pills} activeId={activeId} onSelect={setActiveId} />

        <div className="relative z-10 flex w-full flex-col items-center gap-[19px] bg-transparent min-[1024px]:gap-[36px]">
          <div className="grid w-full grid-cols-1 gap-[19px] min-[1024px]:grid-cols-3 min-[1024px]:gap-[36px]">
            {activeCards.slice(0, 3).map((article, i) => (
              <NewsArticleCard
                key={`${article.nodeId}-${i}`}
                article={article}
                bgClass={ROW_ONE_BG}
              />
            ))}
          </div>
          <div className="grid w-full grid-cols-1 gap-[19px] min-[1024px]:grid-cols-3 min-[1024px]:gap-[36px]">
            {activeCards.slice(3, 6).map((article, i) => (
              <NewsArticleCard
                key={`${article.nodeId}-${i}`}
                article={article}
                bgClass={ROW_TWO_BG}
              />
            ))}
          </div>
          <div className="mt-[11px] flex justify-center min-[1024px]:mt-0">
            <LoadMoreCta label={loadMoreLabel} />
          </div>
        </div>
      </div>
    </section>
  );
}
