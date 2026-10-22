"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { interRegular, gilroyMedium } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { useFadeIn } from "../shared/useFadeIn";
import type { WhyContent } from "./partners-content";
import { PartnersSectionHeading } from "./partners-shared";

import { TabletScaleCanvas } from "../shared/TabletScaleCanvas";

const WHY_CARD_BG = "rgba(0,0,0,0.2)";
const WHY_CARD_BORDER = "rgba(240,240,240,0.2)";
const STEP_NUMBER_GRADIENT =
  "linear-gradient(to bottom, rgb(255, 255, 255), rgba(255, 255, 255, 0))";

function WhyCard({ step }: { step: any }) {
  const isFullCardBg = step.number === "03";

  return (
    <article
      className="group/card relative flex w-full flex-col overflow-hidden border border-solid px-[24px] pt-[16px] pb-[24px] h-full min-h-[430px]"
      style={{
        backgroundColor: WHY_CARD_BG,
        borderColor: WHY_CARD_BORDER,
      }}
      data-name="Article"
    >
      {/* Image box placeholder */}
      <div
        className="relative w-[140%] -ml-[20%] h-[180px] shrink-0 overflow-hidden"
        aria-hidden
      >
        {/* Soft grey radial gradient backlight for dark images */}
        <div 
          className="absolute inset-0" 
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 65%)"
          }}
          aria-hidden
        />
        {step.image && (
          <img loading="lazy" decoding="async"
            alt=""
            src={step.image}
            className={`absolute inset-0 h-full w-full opacity-75 transition-opacity duration-300 group-hover/card:opacity-100 ${
              isFullCardBg ? "object-cover" : "object-contain"
            }`}
          />
        )}
        {/* Fade overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0) 70%, #000000 100%)",
          }}
        />
      </div>

      {/* Step number — positioned overlapping the image bottom */}
      <span
        className={`${gilroyMedium.className} pointer-events-none absolute bg-clip-text text-[60px] leading-[60px] font-medium text-transparent opacity-50 not-italic whitespace-nowrap`}
        style={{
          left: 16,
          top: 155,
          backgroundImage: STEP_NUMBER_GRADIENT,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
        aria-hidden
      >
        {step.number}
      </span>

      {/* Title + description */}
      <div className="relative z-10 flex w-full flex-col items-start gap-[12px] not-italic [word-break:break-word] mt-[24px] flex-1">
        <h3
          className={`${gilroyMedium.className} w-full shrink-0 text-[22px] leading-[28px] font-medium text-white`}
        >
          {step.title}
        </h3>

        <p
          className={`${interRegular.className} w-full text-[16px] leading-[24px] font-normal text-[#99a1af] tracking-[-0.3px] [word-break:break-word]`}
        >
          {step.description}
        </p>
      </div>

      <Corners />
    </article>
  );
}

function WhyCardsMobileCarousel({ journey }: { journey: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToStep = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const clamped = Math.max(0, Math.min(index, journey.length - 1));
    const card = container.children[clamped] as HTMLElement | undefined;
    if (!card) return;
    const target = card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2;
    container.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [journey.length]);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const center = container.scrollLeft + container.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    for (let i = 0; i < container.children.length; i++) {
      const el = container.children[i] as HTMLElement;
      const cardCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(cardCenter - center);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    }
    setActiveIndex(closest);
  }, []);

  return (
    <div className="flex w-full flex-col items-center">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-[calc(100%+40px)] -mx-[20px] px-[calc((100%+40px-300px)/2)] snap-x snap-mandatory overflow-x-auto gap-[16px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-[8px] scroll-smooth"
      >
        {journey.map((step) => (
          <div key={step.title} className="w-[300px] shrink-0 snap-center h-full">
            <WhyCard step={step} />
          </div>
        ))}
      </div>

      {/* Navigation Arrows & Indicators */}
      <div className="mt-[20px] flex items-center justify-center gap-[16px]">
        <button
          type="button"
          aria-label="Previous step"
          onClick={() => scrollToStep(activeIndex - 1)}
          disabled={activeIndex <= 0}
          className="relative size-[40px] transition-opacity enabled:cursor-pointer enabled:hover:opacity-80 disabled:opacity-30"
        >
          <Image
            src="/applications/nav-arrow-left.svg"
            alt=""
            width={40}
            height={40}
            className="block size-full max-w-none"
            aria-hidden
          />
        </button>
        <div className="flex items-center gap-[6px]">
          {journey.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to step ${idx + 1}`}
              onClick={() => scrollToStep(idx)}
              className={`h-[4px] rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-[24px] bg-[#53d824]" : "w-[8px] bg-white/20"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next step"
          onClick={() => scrollToStep(activeIndex + 1)}
          disabled={activeIndex >= journey.length - 1}
          className="relative size-[40px] transition-opacity enabled:cursor-pointer enabled:hover:opacity-80 disabled:opacity-30"
        >
          <Image
            src="/applications/nav-arrow-right.svg"
            alt=""
            width={40}
            height={40}
            className="block size-full max-w-none"
            aria-hidden
          />
        </button>
      </div>
    </div>
  );
}

export function PartnersWhy({ content }: { content: WhyContent }) {
  const { fadeRef, isVisible } = useFadeIn<HTMLElement>();
  const fadeCls = isVisible
    ? "animate-hero-text-fade-in opacity-0"
    : "translate-y-[25px] opacity-0";

  const journey = content.journey;

  return (
    <section
      ref={fadeRef}
      className={`relative mx-auto flex w-full justify-center ${fadeCls} transform-gpu overflow-hidden`}
      aria-label="A production AI product is a full-stack challenge"
    >
      {/* Background visual — concentric wave rings */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          loading="lazy"
          decoding="async"
          src="/image-108.png"
          alt=""
          className="absolute inset-0 size-full object-cover object-center opacity-80"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 15%, rgba(0,0,0,0) 85%, rgba(0,0,0,0.6) 100%)",
          }}
        />
      </div>

      {/* DESKTOP & TABLET (>=600px) — 1440px design canvas with proportional tablet scaling */}
      <TabletScaleCanvas className="relative hidden w-[1440px] shrink-0 flex-col items-center gap-[36px] pb-[64px] pt-0 -mt-[60px] min-[600px]:flex">
        <div className="relative flex flex-col items-center gap-[16px] px-[24px]">
          <PartnersSectionHeading
            deg="124.568deg"
            className="flex flex-col items-center !whitespace-normal"
          >
            <span className="block">A breakthrough processor is the start,</span>
            <span className="block">not the finish.</span>
          </PartnersSectionHeading>
          <Corners />
        </div>

        <p
          className={`${interRegular.className} max-w-[860px] px-[24px] text-center text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic`}
        >
          {content.subheading}
        </p>

        {/* Cards container — 5 in a row on desktop & tablet */}
        <div className="relative w-full py-[32px] px-[64px]">
          <div className="flex w-full flex-nowrap justify-center gap-[24px]">
            {journey.map((step) => (
              <div
                key={step.title}
                className="w-[calc(20%-19.2px)] max-w-none"
              >
                <WhyCard step={step} />
              </div>
            ))}
          </div>
        </div>

        <p
          className={`${interRegular.className} max-w-[980px] px-[24px] text-center text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic`}
        >
          {content.body}
        </p>
      </TabletScaleCanvas>

      {/* MOBILE (<600px) */}
      <div className="relative flex w-full flex-col items-center gap-[28px] pb-[40px] pt-[36px] px-[20px] min-[600px]:hidden">
        <div className="relative flex flex-col items-center px-[16px] py-[8px]">
          <PartnersSectionHeading
            deg="124.568deg"
            className="flex flex-col items-center !whitespace-normal text-center"
          >
            <span className="block">A breakthrough processor is the start,</span>
            <span className="block">not the finish.</span>
          </PartnersSectionHeading>
          <Corners />
        </div>

        <p
          className={`${interRegular.className} w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic`}
        >
          {content.subheading}
        </p>

        {/* 5 Cards horizontal carousel on mobile */}
        <WhyCardsMobileCarousel journey={journey} />

        <p
          className={`${interRegular.className} w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic`}
        >
          {content.body}
        </p>
      </div>
    </section>
  );
}
