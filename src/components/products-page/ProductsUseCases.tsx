"use client";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { useState } from "react";
import { mediaUrl } from "@/lib/strapi";
import { gilroyExtraBold, gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
  PRIMARY_CTA_INSET,
  PRIMARY_CTA_SHADOW,
  SECONDARY_CTA_BG,
  TICK_SEGMENTS,
  USECASE_CARDS,
  USECASE_TABS,
  USECASES_CANVAS_WIDTH,
  USECASES_SECTION_HEIGHT,
  USECASES_TITLE_GRADIENT,
  WATERMARK_GRADIENT,
} from "./products-data";

const FALLBACK_HEADING = "Built for always-on. \n Proven across markets.";
const FALLBACK_SUBTITLE =
  "The same chip, tuned to the job — from a wrist to a factory floor.";
const FALLBACK_PRIMARY = { label: "Explore Applications", href: "#" };
const FALLBACK_SECONDARY = { label: "Discuss Your Use Case", href: "#" };

const USE_CASE_IMAGES: Record<string, string> = {
  "HEARABLES": "/applications/app-hearables.png",
  "SMART HOMES": "/applications/app-smart-home.png",
  "INDUSTRIAL": "/applications/app-industrial.png",
  "AUTOMOTIVE": "/applications/app-automotive.png",
  "MEDICAL": "/applications/app-medical.png",
  "AGRICULTURE": "/applications/app-agriculture.png",
};

function splitLines(value: string): string[] {
  return value.split("\n");
}

/**
 * Figma 2901:2033 — "Built for always-on. Proven across markets."
 * Tabbed use-case showcase. Desktop canvas is 1448 wide / 941 tall.
 */
export function ProductsUseCases({ data }: { data?: any }) {
  const heading = data?.heading || FALLBACK_HEADING;
  const headingLines = splitLines(heading);
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const primary = {
    label: data?.primary_button?.label ?? FALLBACK_PRIMARY.label,
    href: data?.primary_button?.href ?? FALLBACK_PRIMARY.href,
  };
  const secondary = {
    label: data?.secondary_button?.label ?? FALLBACK_SECONDARY.label,
    href: data?.secondary_button?.href ?? FALLBACK_SECONDARY.href,
  };
  const tabs =
    Array.isArray(data?.tabs) && data.tabs.length > 0
      ? data.tabs.map((t: any, i: number) => {
          const fallbackTab = USECASE_TABS[i] || USECASE_TABS[0];
          const rawCards = Array.isArray(t?.feature_cards) ? t.feature_cards : [];
          const featureCards =
            rawCards.length > 0
              ? rawCards.map((c: any, ci: number) => {
                  const fb = USECASE_CARDS[ci] || USECASE_CARDS[0];
                  return {
                    nodeId: `card-${ci}`,
                    title: c?.title ?? fb.title,
                    description: c?.description ?? fb.description,
                    bg: fb.bg,
                    left: fb.left,
                    top: fb.top,
                    width: fb.width,
                    height: fb.height,
                  };
                })
              : USECASE_CARDS;
          return {
            label: t?.label ?? fallbackTab?.label ?? `Tab ${i + 1}`,
            watermark:
              t?.watermark_text || t?.label || fallbackTab?.label || `Tab ${i + 1}`,
            image:
              mediaUrl(t?.image) ||
              USE_CASE_IMAGES[t?.label] ||
              "/products/use-case-image.png",
            featureCards,
          };
        })
      : USECASE_TABS.map((t) => ({
          label: t.label,
          watermark: t.label,
          image:
            USE_CASE_IMAGES[t.label] || "/products/use-case-image.png",
          featureCards: USECASE_CARDS,
        }));

  const [activeIdx, setActiveIdx] = useState(0);
  const activeTab = tabs[activeIdx] || tabs[0];
  const activeImage = activeTab?.image || "/products/use-case-image.png";
  const cards = activeTab?.featureCards || USECASE_CARDS;

  const nextTab = () => setActiveIdx((i) => (i + 1) % tabs.length);
  const prevTab = () => setActiveIdx((i) => (i - 1 + tabs.length) % tabs.length);
  return (
    <>
      {/* DESKTOP (>=1024px) */}
      <section
        className="relative mx-auto hidden w-full bg-black min-[1024px]:block"
        aria-label="Use cases"
      >
        <div
          className="relative mx-auto"
          style={{
            height: USECASES_SECTION_HEIGHT,
            width: USECASES_CANVAS_WIDTH,
          }}
          data-node-id="2901:2033"
          data-name="Desktop - 14"
        >
          <ProductsUseCasesDesktop
            headingLines={headingLines}
            subtitle={subtitle}
            activeTab={activeTab}
            activeImage={activeImage}
            onNext={nextTab}
            onPrev={prevTab}
            onSelect={setActiveIdx}
            activeIdx={activeIdx}
            tabs={tabs}
            cards={cards}
            primary={primary}
            secondary={secondary}
          />
        </div>
      </section>

      {/* MOBILE (<1024px) */}
      <ProductsUseCasesMobile
        headingLines={headingLines}
        subtitle={subtitle}
        activeTab={activeTab}
        activeImage={activeImage}
        onSelect={setActiveIdx}
        activeIdx={activeIdx}
        tabs={tabs}
        cards={cards}
        primary={primary}
        secondary={secondary}
      />
    </>
  );
}

function ProductsUseCasesDesktop({
  headingLines,
  subtitle,
  activeTab,
  activeImage,
  onNext,
  onPrev,
  onSelect,
  activeIdx,
  tabs,
  cards,
  primary,
  secondary,
}: any) {
  return (
    <>
      {/* Section title — 2901:2134 */}
      <div
        className="absolute flex flex-col items-center gap-[24px]"
        style={{ left: 399, top: 0, width: 650 }}
        data-node-id="2901:2134"
        data-name="Section Title"
      >
        <div
          className="relative px-[10px]"
          style={{ width: 512, height: 98 }}
          data-node-id="2901:2135"
          data-name="Title"
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} absolute m-0 w-[492px] bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              left: 10,
              top: 0,
              backgroundImage: USECASES_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2901:2136"
          >
            {headingLines.map((line: string, i: number) => (
              <span key={i} className="block leading-[49px]">{line}</span>
            ))}
          </h2>
        </div>
        <p
          className={`${interRegular.className} w-[650px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
          data-node-id="2901:2141"
        >
          {subtitle}
        </p>
      </div>

      {/* Options / tab ruler — 2901:2034 */}
      <TabRuler onNext={onNext} onPrev={onPrev} onSelect={onSelect} activeIdx={activeIdx} tabs={tabs} />

      {/* Giant watermark — 2901:2103 */}
      <h3
        className={`${gilroyExtraBold.className} absolute m-0 text-center text-[200px] uppercase whitespace-nowrap tracking-[0.5px] leading-[210px] bg-clip-text text-transparent [word-break:break-word] not-italic`}
        style={{
          left: 184.69921875,
          top: 345,
          width: 1079,
          height: 210,
          backgroundImage: WATERMARK_GRADIENT,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
        data-node-id="2901:2103"
        aria-hidden
      >
        {activeTab.watermark}
      </h3>

      {/* Central image — 2901:2104 */}
      <div
        className="absolute overflow-hidden"
        style={{ left: 407.759765625, top: 305.032958984375, width: 632.8800659179688, height: 500 }}
        data-node-id="2901:2104"
        data-name="image 145"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={activeImage}
          className="absolute inset-0 size-full max-w-none object-cover"
        />
      </div>

      {/* Connector indicators — 2901:2121 / 2901:2127 */}
      <Indicator
        src="/products/indicator-1.svg"
        left={490.24}
        top={653.06}
        width={88.18}
        height={14.14}
        flipY
      />
      <Indicator
        src="/products/indicator-2.svg"
        left={843.43}
        top={618.8}
        width={87.659}
        height={76.623}
      />

      {/* Content cards */}
      {cards.map((card: any, i: number) => (
        <UseCaseCardView key={card.nodeId || i} card={card} />
      ))}

      {/* CTA row — 2901:2143 */}
      <div
        className="absolute flex items-start gap-[24px]"
        style={{ left: 487, top: 873 }}
        data-node-id="2901:2143"
        data-name="Frame 1984079464"
      >
        <PrimaryCta href={primary.href}>{primary.label}</PrimaryCta>
        <SecondaryCta href={secondary.href}>{secondary.label}</SecondaryCta>
      </div>
    </>
  );
}

function TabRuler({ onNext, onPrev, onSelect, activeIdx, tabs }: any) {
  return (
    <div
      className="absolute flex items-center justify-between"
      style={{ left: 64.19921875, top: 212.2783203125, width: 1320, height: 52 }}
      data-node-id="2901:2034"
      data-name="Options"
    >
      {/* Left arrow */}
      <ArrowButton src="/products/tab-arrow-left.svg" nodeId="2901:2035" onClick={onPrev} />

      {/* Interleave tick segments and tabs */}
      {tabs.map((tab: any, i: number) => (
        <div key={tab.label}
            onClick={() => onSelect(i)}
            role="button"
            tabIndex={0} className="contents">
          <TickSegment heights={TICK_SEGMENTS[i] || TICK_SEGMENTS[0]} />
          <TabButton tab={tab} active={activeIdx === i} onClick={() => onSelect(i)} />
        </div>
      ))}
      <TickSegment heights={TICK_SEGMENTS[TICK_SEGMENTS.length - 1]} />

      {/* Right arrow */}
      <ArrowButton src="/products/tab-arrow-right.svg" nodeId="2901:2089" onClick={onNext} />
    </div>
  );
}

function ArrowButton({
  onClick,
  src,
  nodeId,
  flip = false,
}: {
  src: string;
  nodeId: string;
  flip?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={`relative size-[44px] shrink-0 cursor-pointer border-0 bg-transparent p-0 ${flip ? "-scale-x-100" : ""}`}
      data-node-id={nodeId}
      data-name="Menu"
      onClick={onClick}
      aria-label="Scroll tabs"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={src} className="block size-full max-w-none" />
    </button>
  );
}

function TickSegment({ heights }: { heights: number[] }) {
  return (
    <div className="contents">
      {heights.map((h, i) => (
        <div
          key={i}
          className="relative w-0 shrink-0 self-center"
          style={{ height: h }}
          aria-hidden
        >
          <div className="absolute left-1/2 top-1/2 w-px -translate-x-1/2 -translate-y-1/2 bg-[#333333]" style={{ height: h }} />
        </div>
      ))}
    </div>
  );
}

function TabButton({ tab, active, onClick }: any) {
  
  return (
    <button
      type="button"
      className={`${interRegular.className} flex shrink-0 cursor-pointer items-center justify-center border-0 whitespace-nowrap not-italic ${
        active
          ? "bg-[#f0f0f0] px-[12px] py-[14px] text-[16px] text-black"
          : "bg-transparent px-[20px] py-[14px] text-[16px] text-[#666]"
      }`}
      data-node-id={active ? "2901:2047" : undefined}
      onClick={onClick}
    >
      {tab.label}
    </button>
  );
}

function Indicator({
  src,
  left,
  top,
  width,
  height,
  flipY = false,
}: {
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  flipY?: boolean;
}) {
  return (
    <div
      className="pointer-events-none absolute flex items-center justify-center"
      style={{ left, top, width, height }}
      aria-hidden
    >
      <div
        className={`flex-none -rotate-90 ${flipY ? "-scale-y-100" : ""}`}
        style={{ width: height, height: width }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={src} className="block size-full max-w-none" />
      </div>
    </div>
  );
}

function UseCaseCardView({ card }: { card: any }) {
  return (
    <div
      className="absolute flex flex-col items-start gap-[10px] p-[32px]"
      style={{
        left: card.left,
        top: card.top,
        width: card.width,
        height: card.height,
        backgroundColor: card.bg,
      }}
      data-node-id={card.nodeId}
      data-name="Content"
    >
      <h4
        className={`${gilroyMedium.className} min-w-full w-[min-content] text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
      >
        {card.title}
      </h4>
      <p
        className={`${interRegular.className} min-w-full w-[min-content] text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
      >
        {card.description}
      </p>
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </div>
  );
}

function PrimaryCta({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-[223px] shrink-0 items-center justify-center overflow-hidden`}
      data-node-id="2901:2144"
      data-name="Cta"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span className="relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
        {children}
      </span>
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`}
      />
      <GreenCtaCorners />
    </a>
  );
}

function SecondaryCta({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className={`${gilroyMedium.className} relative flex h-[48px] shrink-0 items-center justify-center overflow-clip`}
      style={{ backgroundColor: SECONDARY_CTA_BG, width: 227 }}
      data-node-id="2901:2155"
      data-name="CTA - Secondary"
    >
      <span className="relative px-[20px] py-[10px] text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
        {children}
      </span>
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </a>
  );
}

function ProductsUseCasesMobile({
  activeTab,
  activeImage,
  onSelect,
  activeIdx,
  headingLines,
  subtitle,
  tabs,
  cards,
  primary,
  secondary,
}: any) {
  return (
    <section
      className="relative w-full overflow-hidden bg-black px-[24px] pt-[64px] pb-[80px] min-[1024px]:hidden"
      aria-label="Use cases"
    >
      {/* Title */}
      <div className="flex flex-col items-center gap-[16px]">
        <h2
          className={`${gilroyMedium.className} max-w-full bg-clip-text text-center text-[30px] leading-[34px] font-medium text-transparent not-italic [word-break:break-word]`}
          style={{
            backgroundImage: USECASES_TITLE_GRADIENT,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {headingLines.join(" ").trim()}
        </h2>
        <p
          className={`${interRegular.className} max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0]`}
        >
          {subtitle}
        </p>
      </div>

      {/* Tabs (scrollable row) */}
      <div className="mt-[32px] -mx-[24px] flex items-center gap-[16px] overflow-x-auto px-[24px] pb-[8px]">
        {tabs.map((tab: any, idx: number) => (
          <span
            key={tab.label}
            className={`${interRegular.className} shrink-0 whitespace-nowrap text-[13px] tracking-[0.02em] not-italic ${
              idx === activeIdx
                ? "bg-[#f0f0f0] px-[12px] py-[8px] text-black"
                : "px-[8px] py-[8px] text-[#666]"
            }`}
          >
            {tab.label}
          </span>
        ))}
      </div>

      {/* Image */}
      <div className="relative mt-[24px] flex justify-center">
        <h3
          className={`${gilroyExtraBold.className} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[64px] uppercase tracking-[0.5px] leading-[64px] bg-clip-text text-transparent not-italic`}
          style={{
            backgroundImage: WATERMARK_GRADIENT,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
          aria-hidden
        >
          {activeTab.watermark}
        </h3>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={activeImage}
          className="relative z-10 h-auto w-full max-w-[360px] object-cover"
        />
      </div>

      {/* Cards */}
      <div className="mt-[32px] flex flex-col gap-[16px]">
        {cards.map((card: any) => (
          <div
            key={card.nodeId}
            className="relative flex flex-col gap-[8px] p-[20px]"
            style={{ backgroundColor: card.bg }}
          >
            <h4
              className={`${gilroyMedium.className} text-[20px] leading-[26px] font-medium text-white not-italic`}
            >
              {card.title}
            </h4>
            <p
              className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-65 not-italic`}
            >
              {card.description}
            </p>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="mt-[32px] flex flex-col gap-[16px]">
        <a
          href={primary.href}
          className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-full items-center justify-center overflow-hidden`}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
          />
          <span className="relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
            {primary.label}
          </span>
          <span
            aria-hidden
            className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`}
          />
          <GreenCtaCorners />
        </a>
        <a
          href={secondary.href}
          className={`${gilroyMedium.className} relative flex h-[48px] w-full items-center justify-center overflow-clip`}
          style={{ backgroundColor: SECONDARY_CTA_BG }}
        >
          <span className="relative px-[20px] py-[10px] text-[14px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
            {secondary.label}
          </span>
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
        </a>
      </div>
    </section>
  );
}
