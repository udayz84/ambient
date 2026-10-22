"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { useFitText } from "../shared/FitText";
import { useState, useCallback, useRef, useEffect, Fragment } from "react";
import { mediaUrl } from "@/lib/strapi";
import { gilroyExtraBold, gilroyMedium, interRegular } from "../hero/fonts";
import { useFadeIn, getFadeInClass } from "../shared/useFadeIn";
import { TagBadge } from "../hero/TagBadge";
import { AnimatedDotsBackground } from "../shared/AnimatedDotsBackground";
import { Corners } from "../shared/Corners";
import { UpcomingProductsModal } from "../hero/UpcomingProductsModal";
import { TabletScaleCanvas } from "../shared/TabletScaleCanvas";
import { motion, AnimatePresence } from "framer-motion";
import { CategoryDivider } from "../applications/ApplicationsCategoryNav";
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
  USECASES_TITLE_GRADIENT,
  WATERMARK_GRADIENT,
} from "./products-data";

const tabCornerTl = "/applications/corners/tab-corner-tl.svg";
const tabCornerTr = "/applications/corners/tab-corner-tr.svg";

const FALLBACK_HEADING = "Built for always-on. \n Proven across markets.";
const FALLBACK_SUBTITLE =
  "The same chip, tuned to the job — from a wrist to a factory floor.";
const FALLBACK_PRIMARY = { label: "Explore Applications", href: "#" };
const FALLBACK_SECONDARY = { label: "Discuss Your Use Case", href: "#" };

const USE_CASE_IMAGES: Record<string, string> = {
  "HEARABLES": "/applications/app-hearables.webp",
  "SMART HOMES": "/applications/app-smart-home.webp",
  "INDUSTRIAL": "/applications/app-industrial.webp",
  "AUTOMOTIVE": "/applications/app-automotive.webp",
  "MEDICAL": "/applications/app-medical.webp",
  "AGRICULTURE": "/applications/app-agriculture.webp",
  "DRONES": "/applications/app-drones.webp",
  "WEARABLES": "/applications/app-wearables.png",
  "ROBOTICS": "/applications/app-robotics.webp",
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
    label: (data?.primary_button?.label ?? FALLBACK_PRIMARY.label).trim(),
    href: (data?.primary_button?.href ?? FALLBACK_PRIMARY.href).trim(),
  };
  const secondary = {
    label: (data?.secondary_button?.label ?? FALLBACK_SECONDARY.label).trim(),
    href: (data?.secondary_button?.href ?? FALLBACK_SECONDARY.href).trim(),
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
              "/products/use-case-image.webp",
            featureCards,
          };
        })
      : USECASE_TABS.map((t) => ({
          label: t.label,
          watermark: t.label,
          image:
            USE_CASE_IMAGES[t.label] || "/products/use-case-image.webp",
          featureCards: USECASE_CARDS,
        }));

  const allTabs = [
    ...tabs,
    {
      label: "BUILD",
      watermark: "BUILD YOUR",
      image: "/products/build-custom-cube.png",
      featureCards: [],
      isBuild: true,
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activeTab = allTabs[activeIdx] || allTabs[0];
  const activeImage = activeTab?.image || "/products/use-case-image.webp";
  const cards = activeTab?.featureCards || USECASE_CARDS;

  const handleSelect = (idx: number) => {
    if (idx !== activeIdx) {
      setDirection(idx > activeIdx ? 1 : -1);
      setActiveIdx(idx);
    }
  };

  const nextTab = () => {
    setDirection(1);
    setActiveIdx((i) => (i + 1) % allTabs.length);
  };

  const prevTab = () => {
    setDirection(-1);
    setActiveIdx((i) => (i - 1 + allTabs.length) % allTabs.length);
  };
  return (
    <>
      {/* DESKTOP (>=600px) */}
      <section
        className="relative mx-auto hidden w-full justify-center bg-black min-[600px]:flex mt-[60px]"
        aria-label="Use cases"
      >
        <TabletScaleCanvas className="relative h-[941px] w-[1448px] shrink-0 min-[600px]:block">
          <div
            className="absolute left-0 top-0 h-[941px] w-[1448px]"
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
              onSelect={handleSelect}
              activeIdx={activeIdx}
              direction={direction}
              tabs={allTabs}
              cards={cards}
              primary={primary}
              secondary={secondary}
              onSecondaryCtaClick={() => setIsModalOpen(true)}
            />
          </div>
        </TabletScaleCanvas>
      </section>

      {/* MOBILE (<1024px) */}
      <ProductsUseCasesMobile
        headingLines={headingLines}
        subtitle={subtitle}
        activeTab={activeTab}
        activeImage={activeImage}
        onSelect={setActiveIdx}
        activeIdx={activeIdx}
        tabs={allTabs}
        cards={cards}
        primary={primary}
        secondary={secondary}
        onSecondaryCtaClick={() => setIsModalOpen(true)}
      />

      <UpcomingProductsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formContext="usecase"
      />
    </>
  );
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

function ProductsUseCasesDesktop({
  headingLines,
  subtitle,
  activeTab,
  activeImage,
  onNext,
  onPrev,
  onSelect,
  activeIdx,
  direction,
  tabs,
  cards,
  primary,
  secondary,
  onSecondaryCtaClick,
}: any) {
  const fitRef = useFitText<HTMLHeadingElement>({});
  return (
    <>
      {/* Section title — 2901:2134 */}
      <div
        className="absolute flex flex-col items-center gap-[24px]"
        style={{ left: 399, top: 0, width: 650 }}
        data-node-id="2901:2134"
        data-name="Section Title"
      >
        <TagBadge label="BEST-FIT APPLICATIONS" width={220} centerLabel />
        <div
          className="relative px-[10px]"
          style={{ width: 512, height: 98 }}
          data-node-id="2901:2135"
          data-name="Title"
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            ref={fitRef}
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
          className={`${interRegular.className} w-[650px] text-center text-[16px] leading-[24px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
          data-node-id="2901:2141"
        >
          {subtitle}
        </p>
      </div>

      {/* Options / tab ruler — 2901:2034 */}
      <TabRuler onNext={onNext} onPrev={onPrev} onSelect={onSelect} activeIdx={activeIdx} tabs={tabs} />

      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence custom={direction}>
          <motion.div
            key={activeIdx}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
            }}
            className="absolute inset-0 pointer-events-auto"
          >
            {/* BUILD Tab Custom Layout vs Standard Layout */}
            {activeTab.isBuild ? (
              <>
                <div className="absolute inset-0 pointer-events-none z-[-1] opacity-40 translate-y-[80px]">
                  <img loading="lazy" decoding="async" src="/products/build-bg.png" alt="" className="size-full object-cover" />
                </div>

                {/* Background Watermark for BUILD */}
                <h3
                  className={`${gilroyExtraBold.className} absolute m-0 text-center text-[160px] uppercase whitespace-nowrap tracking-[0.5px] leading-[150px] bg-clip-text text-transparent [word-break:break-word] not-italic z-0`}
                  style={{
                    left: 0,
                    top: 280,
                    width: USECASES_CANVAS_WIDTH,
                    height: 150,
                    backgroundImage: WATERMARK_GRADIENT,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                  aria-hidden
                >
                  BUILD YOUR
                </h3>

                <h3
                  className={`${gilroyExtraBold.className} absolute m-0 text-center text-[160px] uppercase whitespace-nowrap tracking-[0.5px] leading-[150px] bg-clip-text text-transparent [word-break:break-word] not-italic z-0`}
                  style={{
                    left: 0,
                    top: 660,
                    width: USECASES_CANVAS_WIDTH,
                    height: 150,
                    backgroundImage: WATERMARK_GRADIENT,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                  aria-hidden
                >
                  APPLICATION
                </h3>
                
                {/* Central image for BUILD */}
                <div
                  className="absolute overflow-hidden flex items-center justify-center pointer-events-none z-10"
                  style={{ left: 425.5, top: 290, width: 597, height: 500 }}
                >
                  <img loading="lazy" decoding="async"
                    alt="Build Custom Application"
                    src="/products/build-custom-cube.png"
                    className="absolute inset-0 size-full object-contain pointer-events-none"
                  />
                </div>
                
                <div 
                  className="absolute left-1/2 -translate-x-1/2 pointer-events-auto z-20"
                  style={{ top: 840 }}
                >
                  <PrimaryCta href="/model-zoo">Explore Model Zoo</PrimaryCta>
                </div>
              </>
            ) : (
              <>
                {/* Giant watermark — 2901:2103 */}
                <h3
                  className={`${gilroyExtraBold.className} absolute m-0 text-center text-[200px] uppercase whitespace-nowrap tracking-[0.5px] leading-[210px] bg-clip-text text-transparent [word-break:break-word] not-italic`}
                  style={{
                    left: 0,
                    top: 345,
                    width: USECASES_CANVAS_WIDTH,
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
                  <img loading="lazy" decoding="async"
                    alt=""
                    src={activeImage}
                    className={`absolute inset-0 size-full max-w-none ${activeTab?.label?.toUpperCase() === "AUTOMOTIVE" ? "object-contain" : "object-cover"}`}
                  />
                </div>
              </>
            )}

            {/* Connector indicators — 2901:2121 / 2901:2127 */}
            {!activeTab.isBuild && (
              <>
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
              </>
            )}

            {/* Content cards */}
            {cards.map((card: any, i: number) => (
              <UseCaseCardView key={card.nodeId || i} card={card} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA row — 2901:2143 */}
      {!activeTab.isBuild && (
        <div
          className="absolute flex items-start gap-[24px] z-50 pointer-events-auto"
          style={{ left: 487, top: 873 }}
          data-node-id="2901:2143"
          data-name="Frame 1984079464"
        >
          <PrimaryCta href={primary.href}>{primary.label}</PrimaryCta>
          <SecondaryCta href={secondary.href} onClick={(e) => { e.preventDefault(); onSecondaryCtaClick(); }}>{secondary.label}</SecondaryCta>
        </div>
      )}
    </>
  );
}

function TabRuler({ onNext, onPrev, onSelect, activeIdx, tabs }: any) {
  return (
    <div
      className="absolute flex items-center justify-between z-10"
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
      <img loading="lazy" decoding="async" alt="" src={src} className="block size-full max-w-none" />
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
        <img loading="lazy" decoding="async" alt="" src={src} className="block size-full max-w-none" />
      </div>
    </div>
  );
}

function UseCaseCardView({ card }: { card: any }) {
  const { fadeRef, isVisible } = useFadeIn();

  return (
    <div
      ref={fadeRef}
      className={`absolute flex flex-col items-start gap-[10px] p-[32px] border-[0.5px] border-solid border-[rgba(255,255,255,0.1)] ${getFadeInClass(isVisible)}`}
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
    <Link
      href={href?.trim() || "#"}
      className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-[223px] shrink-0 items-center justify-center overflow-hidden`}
      data-node-id="2901:2144"
      data-name="Cta"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <AnimatedDotsBackground />
      <span className="relative max-w-full overflow-hidden text-ellipsis text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
        {children}
      </span>
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`}
      />
      <GreenCtaCorners />
    </Link>
  );
}

function SecondaryCta({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode;
  href: string;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`${gilroyMedium.className} relative flex h-[48px] shrink-0 items-center justify-center border-[0.5px] border-solid border-[rgba(240,240,240,0.25)] min-w-[227px] w-max px-[32px]`}
      style={{ backgroundColor: SECONDARY_CTA_BG }}
      data-node-id="2901:2155"
      data-name="CTA - Secondary"
    >
      <span className="relative max-w-full overflow-hidden text-ellipsis text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
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
  onSecondaryCtaClick,
}: any) {
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 2 });
  const fitRef2 = useFitText<HTMLParagraphElement>({ maxLines: 1 });

  const goNext = useCallback(() => {
    onSelect((activeIdx + 1) % tabs.length);
  }, [activeIdx, tabs.length, onSelect]);

  const goPrev = useCallback(() => {
    onSelect((activeIdx - 1 + tabs.length) % tabs.length);
  }, [activeIdx, tabs.length, onSelect]);

  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isHorizontal = useRef<boolean | null>(null);
  const touchStartTime = useRef<number>(0);

  const mouseStartX = useRef<number | null>(null);
  const mouseStartTime = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
    isHorizontal.current = null;
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - touchStartX.current;
    const deltaY = currentY - touchStartY.current;

    if (isHorizontal.current === null) {
      if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
        isHorizontal.current = Math.abs(deltaX) > Math.abs(deltaY);
      }
    }

    if (isHorizontal.current) {
      const clampedOffset = Math.max(-120, Math.min(120, deltaX));
      setDragOffset(clampedOffset);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && isHorizontal.current) {
      const duration = Date.now() - touchStartTime.current;
      const isQuickFlick = duration < 300 && Math.abs(dragOffset) > 25;
      const passedThreshold = Math.abs(dragOffset) > 40;

      if (passedThreshold || isQuickFlick) {
        if (dragOffset < 0) {
          goNext();
        } else {
          goPrev();
        }
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
    isHorizontal.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseStartX.current = e.clientX;
    mouseStartTime.current = Date.now();
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mouseStartX.current === null) return;
    const deltaX = e.clientX - mouseStartX.current;
    const clampedOffset = Math.max(-120, Math.min(120, deltaX));
    setDragOffset(clampedOffset);
  };

  const handleMouseUp = () => {
    if (mouseStartX.current !== null) {
      const duration = Date.now() - mouseStartTime.current;
      const isQuickFlick = duration < 300 && Math.abs(dragOffset) > 25;
      const passedThreshold = Math.abs(dragOffset) > 40;

      if (passedThreshold || isQuickFlick) {
        if (dragOffset < 0) {
          goNext();
        } else {
          goPrev();
        }
      }
    }
    mouseStartX.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeTabRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeTabEl = activeTabRef.current;

      const containerWidth = container.offsetWidth;
      const activeTabLeft = activeTabEl.offsetLeft;
      const activeTabWidth = activeTabEl.offsetWidth;

      const scrollPosition = activeTabLeft - containerWidth / 2 + activeTabWidth / 2;
      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [activeIdx]);

  return (
    <section
      className="relative flex w-full max-w-full flex-col items-center overflow-hidden bg-black py-[48px] min-[600px]:hidden"
      aria-label="Use cases"
    >
      <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        @keyframes slideFadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-fade { animation: slideFadeIn 0.3s ease-out forwards; }
      `}</style>

      {/* Header Block with Brackets */}
      <div className="relative flex w-full flex-col items-center px-[16px] gap-[12px]">
        <TagBadge label="BEST-FIT APPLICATIONS" width={220} centerLabel />
        <div className="relative inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start leading-[0]">
          <h2
            ref={fitRef}
            className={`${gilroyMedium.className} relative col-start-1 row-start-1 mt-[7px] ml-[3px] w-[300px] bg-clip-text text-center text-[30px] leading-[34px] font-medium text-transparent [word-break:break-word] not-italic sm:w-[350px] sm:text-[34px]`}
            style={{
              backgroundImage: USECASES_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            {headingLines[0]} <br />
            {headingLines[1] || ""}
          </h2>

          <div className="relative col-start-1 row-start-1 mt-0 ml-[303.65px] flex size-[4px] items-center justify-center sm:ml-[353.65px]">
            <div className="rotate-180 flex-none">
              <div className="relative size-[4px]">
                <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                  <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
                </div>
              </div>
            </div>
          </div>
          <div className="relative col-start-1 row-start-1 mt-[64px] ml-[303.65px] flex size-[4px] items-center justify-center sm:mt-[70px] sm:ml-[353.65px]">
            <div className="-scale-y-100 rotate-180 flex-none">
              <div className="relative size-[4px]">
                <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                  <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
                </div>
              </div>
            </div>
          </div>
          <div className="relative col-start-1 row-start-1 mt-[64px] ml-0 size-[4px] sm:mt-[70px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
            </div>
          </div>
          <div className="relative col-start-1 row-start-1 mt-0 ml-0 flex size-[4px] items-center justify-center">
            <div className="-scale-y-100 flex-none">
              <div className="relative size-[4px]">
                <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                  <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
                </div>
              </div>
            </div>
          </div>
        </div>

        <p
          className={`${interRegular.className} mt-[6px] w-full max-w-[343px] text-center text-[14px] leading-[20px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
        >
          {subtitle}
        </p>
      </div>

      {/* Category Navigation Selector (Mobile) */}
      <div className="mt-[24px] w-full overflow-hidden flex justify-center">
        <div
          ref={scrollContainerRef}
          className="flex h-[52px] w-full max-w-full items-center overflow-x-auto px-[24px] scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {tabs.map((tab: any, index: number) => {
            const label = tab?.label ?? `Tab ${index}`;
            const isActive = index === activeIdx;
            const dividerVariant =
              index === activeIdx
                ? "before-active"
                : index === activeIdx + 1
                ? "after-active"
                : "normal";

            return (
              <Fragment key={label}>
                <CategoryDivider variant={dividerVariant} />
                <button
                  type="button"
                  ref={isActive ? activeTabRef : null}
                  onClick={() => onSelect(index)}
                  className={`${interRegular.className} relative flex h-[52px] shrink-0 cursor-pointer items-center justify-center px-[20px] text-[16px] leading-[24px] font-normal whitespace-nowrap not-italic transition-colors ${
                    isActive ? "text-[#0e1a0e]" : "text-[#666] hover:text-[#aaa]"
                  }`}
                >
                  {isActive ? (
                    <span className="pointer-events-none absolute inset-y-[4px] inset-x-[13px] overflow-clip bg-[#f0f0f0]">
                      <Corners leftSrc={tabCornerTl} rightSrc={tabCornerTr} />
                    </span>
                  ) : null}
                  <span className="relative">{label}</span>
                </button>
              </Fragment>
            );
          })}
          <CategoryDivider
            variant={
              activeIdx === tabs.length - 1
                ? "after-active"
                : "normal"
            }
          />
        </div>
      </div>

      {/* Draggable Swiper Area (Hero Visual + Feature Cards) */}
      <div
        className="relative w-full flex flex-col items-center cursor-grab active:cursor-grabbing select-none [touch-action:pan-y]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          transform: `translateX(${dragOffset * 0.35}px)`,
          transition: isDragging ? "none" : "transform 400ms cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Hero Section (Watermark + Image) */}
        <div className="relative mt-[32px] flex w-full flex-col items-center justify-start min-h-[240px] overflow-visible">
          {activeTab?.isBuild ? (
            <div className="relative flex flex-col w-full items-center justify-center px-[16px] min-h-[360px]">
              <div className="absolute inset-0 pointer-events-none z-[-1] opacity-40 translate-y-[40px]">
                <img loading="lazy" decoding="async" src="/products/build-bg.png" alt="" className="size-full object-cover" />
              </div>

              <h3
                className={`${gilroyExtraBold.className} absolute left-1/2 top-[10%] -translate-x-1/2 w-full px-[16px] text-center uppercase tracking-[0.5px] bg-clip-text text-transparent not-italic text-[13vw] sm:text-[60px] leading-[1.1] z-0 whitespace-nowrap`}
                style={{ backgroundImage: WATERMARK_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text" }}
                aria-hidden
              >
                BUILD YOUR
              </h3>
              
              <div className="relative flex items-center justify-center mt-[40px] mb-[40px] w-full z-10">
                <img loading="lazy" decoding="async"
                  alt="Build Custom Application"
                  src="/products/build-custom-cube.png"
                  className="relative z-10 h-auto w-full max-w-[360px] object-contain"
                />
              </div>

              <h3
                className={`${gilroyExtraBold.className} absolute left-1/2 bottom-[20%] -translate-x-1/2 w-full px-[16px] text-center uppercase tracking-[0.5px] bg-clip-text text-transparent not-italic text-[13vw] sm:text-[60px] leading-[1.1] z-0 whitespace-nowrap`}
                style={{ backgroundImage: WATERMARK_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text" }}
                aria-hidden
              >
                APPLICATION
              </h3>

              <div className="relative z-20 mt-[32px] mb-[24px]">
                <PrimaryCta href="/model-zoo">Explore Model Zoo</PrimaryCta>
              </div>
            </div>
          ) : (
            <>
              {/* Watermark Text */}
              <p
                ref={fitRef2}
                className={`${gilroyExtraBold.className} absolute top-0 z-0 w-full text-center text-[14.5vw] sm:text-[60px] leading-[1.1] font-extrabold tracking-[1px] whitespace-nowrap text-transparent uppercase not-italic`}
                style={{
                  backgroundImage: "linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                {activeTab?.watermark || activeTab?.label || ""}
              </p>

              {/* Hero Image */}
              <div className="relative z-10 mt-[24px] flex w-full justify-center px-[20px]">
                {activeImage ? (
                  <img loading="lazy" decoding="async"
                    alt=""
                    src={activeImage}
                    className="h-auto max-h-[360px] w-[80%] object-contain drop-shadow-2xl"
                    aria-hidden
                  />
                ) : null}
              </div>
            </>
          )}
        </div>

        {!activeTab?.isBuild && (
          /* Feature Cards */
          <div className="relative z-20 mt-[-36px] grid w-full max-w-[343px] md:max-w-[620px] grid-cols-2 gap-[12px] md:gap-[20px]">
            {cards.map((feature: any, idx: number) => (
              <div key={idx} className="relative w-full border border-white/20 bg-[#000000] p-[16px] md:p-[24px]">
                {activeTab?.label === "AUTOMOTIVE" && idx === 0 && (
                  <img loading="lazy" decoding="async"
                    src="/applications/indicator-vertical.svg"
                    alt=""
                    className="absolute -top-[92px] left-[18px] h-[92px] w-[22px] pointer-events-none z-20"
                    aria-hidden
                  />
                )}

                <Corners />

                <h4 className={`${gilroyMedium.className} text-[16px] md:text-[20px] leading-[22px] md:leading-[26px] text-white [word-break:break-word]`}>
                  {feature.title}
                </h4>
                <p className={`${interRegular.className} mt-[12px] text-[12px] md:text-[14px] leading-[18px] md:leading-[22px] text-[#f0f0f0] opacity-65 [word-break:break-word]`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {!activeTab?.isBuild && (
        <>
          {/* Navigation Arrows */}
          <div className="mt-[24px] flex items-center justify-center gap-[16px]">
            <button
              type="button"
              onClick={goPrev}
              className="size-[44px] relative"
              aria-label="Previous Feature"
            >
              <img loading="lazy" decoding="async"
                alt=""
                src="/platform-scale/nav-left.svg"
                className="absolute inset-0 block size-full max-w-none"
                aria-hidden
              />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="size-[44px] relative"
              aria-label="Next Feature"
            >
              <img loading="lazy" decoding="async"
                alt=""
                src="/platform-scale/nav-right.svg"
                className="absolute inset-0 block size-full max-w-none"
                aria-hidden
              />
            </button>
          </div>

          {/* CTAs */}
          <div className="mt-[32px] flex flex-row gap-[8px] w-full max-w-[343px] mx-auto relative z-50 pointer-events-auto">
            <Link
              href={primary.href?.trim() || "/applications"}
              className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] flex-1 items-center justify-center overflow-hidden`}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
              />
              <AnimatedDotsBackground />
              <span className="relative max-w-full overflow-hidden text-ellipsis text-[10px] sm:text-[11px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
                {primary.label}
              </span>
              <span
                aria-hidden
                className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`}
              />
              <GreenCtaCorners />
            </Link>
            <a
              href={secondary.href}
              onClick={(e) => { e.preventDefault(); onSecondaryCtaClick(); }}
              className={`${gilroyMedium.className} relative flex h-[48px] flex-1 items-center justify-center border-[0.5px] border-solid border-[rgba(240,240,240,0.25)]`}
              style={{ backgroundColor: SECONDARY_CTA_BG }}
            >
              <span className="relative max-w-full overflow-hidden text-ellipsis px-[4px] sm:px-[12px] py-[10px] text-[10px] sm:text-[11px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic text-center">
                {secondary.label}
              </span>
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            </a>
          </div>
        </>
      )}
    </section>
  );
}
