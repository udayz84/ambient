"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { gilroySemiBold } from "../hero/fonts";
import {
  CAROUSEL_1_SLOTS,
  CAROUSEL_2_SLOTS,
  DEVELOPMENT_PARTNER_ROW,
  SILICON_PARTNER_ROW,
  type CarouselSlot,
  type PartnerRowConfig,
} from "./ecosystem-data";
import { DEV_LOGO_STAT_NODES, EcosystemPartnerRow } from "./EcosystemPartnerRow";

const TITLE_GRADIENT_SILICON =
  "linear-gradient(119.414deg, rgb(22, 22, 22) 9.0248%, rgb(39, 39, 39) 37.884%, rgb(18, 18, 18) 111.41%)";

const TITLE_GRADIENT_DEVELOPMENT =
  "linear-gradient(127.267deg, rgb(22, 22, 22) 9.0248%, rgb(39, 39, 39) 37.884%, rgb(18, 18, 18) 111.41%)";

const FRAME_WIDTH_PX = 1204;
const FRAME_GAP_PX = 24;
const STRIDE_PX = FRAME_WIDTH_PX + FRAME_GAP_PX;
const AUTOPLAY_MS = 5000;
const TRANSITION_DURATION_MS = 700;

function PartnerCategoryTitle({
  children,
  nodeId,
  gradient,
}: {
  children: string;
  nodeId: string;
  gradient: string;
}) {
  return (
    <p
      className={`${gilroySemiBold.className} relative shrink-0 bg-clip-text text-[56px] leading-[60px] font-semibold tracking-[-1.12px] whitespace-nowrap text-[transparent] opacity-90 not-italic [word-break:break-word]`}
      style={{ backgroundImage: gradient }}
      data-node-id={nodeId}
    >
      {children}
    </p>
  );
}

function PartnerSection({
  title,
  titleNodeId,
  gradient,
  cardsNodeId,
  config,
  slots,
  logoStatNodeIds,
  isDevelopment,
}: {
  title: string;
  titleNodeId: string;
  gradient: string;
  cardsNodeId: string;
  config: PartnerRowConfig;
  slots: readonly CarouselSlot[];
  logoStatNodeIds?: readonly [string, string, string];
  isDevelopment?: boolean;
}) {
  return (
    <div
      className="relative h-[285px] w-[1204px] shrink-0 overflow-hidden"
      style={{ width: FRAME_WIDTH_PX }}
    >
      <div
        className="relative flex h-full w-full flex-col items-start"
        data-node-id={cardsNodeId}
      >
        <PartnerCategoryTitle nodeId={titleNodeId} gradient={gradient}>
          {title}
        </PartnerCategoryTitle>

        <div className="relative mt-[0px] h-[225px] w-full shrink-0 overflow-hidden">
          <EcosystemPartnerRow
            config={config}
            slotsOverride={slots}
            logoStatNodeIds={logoStatNodeIds}
            isDevelopment={isDevelopment}
          />
        </div>
      </div>
    </div>
  );
}

export function EcosystemPartners({ data }: { data?: any }) {
  void data;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(isTransitioning);
  isTransitioningRef.current = isTransitioning;

  const totalOriginalSlides = 2;

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    if (currentSlide === 0) {
      // Snap to clone (index 2) without transition, then transition to index 1
      setIsTransitioning(false);
      setCurrentSlide(totalOriginalSlides);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          setCurrentSlide(totalOriginalSlides - 1);
        });
      });
    } else {
      setIsTransitioning(true);
      setCurrentSlide((prev) => prev - 1);
    }
  }, [currentSlide]);

  const goToSlide = useCallback((index: number) => {
    setIsTransitioning(true);
    setCurrentSlide(index);
  }, []);

  // Handle seamless loop after forward transition to clone
  const handleTransitionEnd = useCallback(() => {
    if (currentSlide >= totalOriginalSlides) {
      setIsTransitioning(false);
      setCurrentSlide(0);
    }
  }, [currentSlide]);

  // Autoplay timer
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, nextSlide]);

  const activeIndex = currentSlide % totalOriginalSlides;

  return (
    <div
      ref={containerRef}
      className="relative mx-auto h-[285px] w-full max-w-[1204px] overflow-hidden select-none"
      data-node-id="2379:1047"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Top right carousel controls */}
      <div className="absolute top-[16px] right-0 z-30 flex items-center gap-[12px]">
        {/* Prev Button */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous partner slide"
          className="flex size-[28px] items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/70 transition-all hover:border-white/50 hover:bg-white/10 hover:text-white"
        >
          <svg
            className="size-[14px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Indicators */}
        <div className="flex items-center gap-[6px]">
          {Array.from({ length: totalOriginalSlides }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToSlide(i)}
              className={`h-[4px] rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-[24px] bg-[#39ff14]"
                  : "w-[10px] bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next partner slide"
          className="flex size-[28px] items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/70 transition-all hover:border-white/50 hover:bg-white/10 hover:text-white"
        >
          <svg
            className="size-[14px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Frame track */}
      <div
        className="flex h-full will-change-transform"
        style={{
          width: FRAME_WIDTH_PX * 3 + FRAME_GAP_PX * 2,
          gap: FRAME_GAP_PX,
          transform: `translateX(-${currentSlide * STRIDE_PX}px)`,
          transition: isTransitioning
            ? `transform ${TRANSITION_DURATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
            : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
        data-node-id="2379:1051"
      >
        {/* Slide 0: Silicon Partners */}
        <PartnerSection
          title="PARTNERS"
          titleNodeId="2379:1048"
          gradient={TITLE_GRADIENT_SILICON}
          cardsNodeId="2379:1051-silicon"
          config={SILICON_PARTNER_ROW}
          slots={CAROUSEL_1_SLOTS}
          isDevelopment={false}
        />

        {/* Slide 1: Development Partners */}
        <PartnerSection
          title="PARTNERS"
          titleNodeId="2379:1049"
          gradient={TITLE_GRADIENT_DEVELOPMENT}
          cardsNodeId="2379:1051-dev"
          config={DEVELOPMENT_PARTNER_ROW}
          slots={CAROUSEL_2_SLOTS}
          logoStatNodeIds={DEV_LOGO_STAT_NODES}
          isDevelopment={true}
        />

        {/* Slide 2: Clone of Slide 0 for seamless forward looping */}
        <PartnerSection
          title="PARTNERS"
          titleNodeId="2379:1048-clone"
          gradient={TITLE_GRADIENT_SILICON}
          cardsNodeId="2379:1051-silicon-clone"
          config={SILICON_PARTNER_ROW}
          slots={CAROUSEL_1_SLOTS}
          isDevelopment={false}
        />
      </div>
    </div>
  );
}
