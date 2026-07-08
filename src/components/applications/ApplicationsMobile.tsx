"use client";

import { useState, useCallback, useRef, useEffect, Fragment } from "react";
import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import { gilroyExtraBold, gilroyMedium, interRegular, interMedium } from "../hero/fonts";
import { APPLICATION_TABS, FEATURE_CARDS } from "./applications-data";
import { CategoryDivider } from "./ApplicationsCategoryNav";
import { Corners } from "../shared/Corners";

const tabCornerTl = "/applications/corners/tab-corner-tl.svg";
const tabCornerTr = "/applications/corners/tab-corner-tr.svg";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

const MOBILE_HERO_IMAGES: Record<string, string> = {
  WEARABLES: "/applications/app-wearables.png",
  "SMART HOMES": "/applications/app-smart-home.png",
  INDUSTRIAL: "/applications/app-industrial.png",
  AUTOMOTIVE: "/applications/car-hero-new.png",
  MEDICAL: "/applications/app-medical.png",
  AGRICULTURE: "/applications/app-agriculture.png",
  DRONES: "/applications/app-drones.png",
  HEARABLES: "/applications/app-hearables.png",
};

const MOBILE_WATERMARK_TEXTS: Record<string, string> = {
  WEARABLES: "Wearables",
  "SMART HOMES": "Smart Home",
  INDUSTRIAL: "Industry 4.0",
  AUTOMOTIVE: "Automotive",
  MEDICAL: "Medical",
  AGRICULTURE: "Agriculture",
  DRONES: "Drones",
  HEARABLES: "Hearables",
};

const mobileWatermarkGradient =
  "linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0) 100%)";

type ApplicationsMobileProps = {
  tabs?: any[];
  featureCards?: any[];
  data?: any;
  categoryActiveIndex: number;
  setCategoryActiveIndex: (index: number) => void;
};

export function ApplicationsMobile({
  tabs = APPLICATION_TABS.map((label) => ({ label })),
  featureCards = [FEATURE_CARDS.left, FEATURE_CARDS.right],
  data,
  categoryActiveIndex,
  setCategoryActiveIndex,
}: ApplicationsMobileProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const features = featureCards.length
    ? featureCards
    : [FEATURE_CARDS.left, FEATURE_CARDS.right];
  const activeFeature = features[activeIndex] || FEATURE_CARDS.left;

  const activeTab = tabs[categoryActiveIndex]?.label || APPLICATION_TABS[0];
  const activeTabData = tabs.find(
    (t) => (t?.label || "").toUpperCase() === activeTab.toUpperCase()
  );
  const imgSrc =
    mediaUrl(activeTabData?.hero_image) ||
    MOBILE_HERO_IMAGES[activeTab] ||
    "/applications/car-hero.png";
  const watermarkText =
    activeTabData?.watermark_text ||
    MOBILE_WATERMARK_TEXTS[activeTab] ||
    activeTab;

  const heading = data?.heading || "Build the\nimpossible today";
  const headingLines = heading.split("\n");
  const headingLine1 = headingLines[0] || "Build the";
  const headingLine2 = headingLines.slice(1).join("\n") || "impossible today";
  const subtitle =
    data?.subtitle ||
    "Don't let legacy design limit your roadmap. Discover the market-differentiating features of the GPX10 and what's coming next.";
  const cta = data?.cta || {};
  const ctaLabel = cta.label || "EXPLORE APPLICATION";
  const ctaHref = cta.href || "/applications";
  const dotIcon = mediaUrl(cta.dot_icon) || "/applications/cta-dot.svg";

  const goNext = useCallback(() => setActiveIndex((i) => (i + 1) % features.length), [features.length]);
  const goPrev = useCallback(() => setActiveIndex((i) => (i - 1 + features.length) % features.length), [features.length]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeTabRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeTab = activeTabRef.current;

      const containerWidth = container.offsetWidth;
      const activeTabLeft = activeTab.offsetLeft;
      const activeTabWidth = activeTab.offsetWidth;

      const scrollPosition = activeTabLeft - containerWidth / 2 + activeTabWidth / 2;
      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [categoryActiveIndex]);

  return (
    <div className="relative flex w-full max-w-full flex-col items-center overflow-hidden bg-black py-[48px]">
      <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        @keyframes slideFadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-fade { animation: slideFadeIn 0.3s ease-out forwards; }
      `}</style>

      {/* Header Block with Brackets */}
      <div className="relative flex w-full flex-col items-center px-[16px]">
        <div className="relative inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start leading-[0]">
          <h2
            className={`${gilroyMedium.className} relative col-start-1 row-start-1 mt-[7px] ml-[3px] w-[300px] bg-clip-text text-center text-[32px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic whitespace-pre-wrap sm:w-[350px] sm:text-[36px]`}
            style={{
              backgroundImage:
                "linear-gradient(107.454deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
            }}
          >
            {headingLine1} <br />
            {headingLine2}
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
          className={`${interRegular.className} mt-[10px] w-full max-w-[343px] text-center text-[14px] leading-[16px] font-normal text-white not-italic [word-break:break-word]`}
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
          {tabs.map((tab, index) => {
            const label = tab?.label ?? APPLICATION_TABS[index] ?? `Tab ${index}`;
            const isActive = index === categoryActiveIndex;
            const dividerVariant =
              index === categoryActiveIndex
                ? "before-active"
                : index === categoryActiveIndex + 1
                ? "after-active"
                : "normal";

            return (
              <Fragment key={label}>
                <CategoryDivider variant={dividerVariant} />
                <button
                  type="button"
                  ref={index === categoryActiveIndex ? activeTabRef : null}
                  onClick={() => setCategoryActiveIndex(index)}
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
              categoryActiveIndex === tabs.length - 1
                ? "after-active"
                : "normal"
            }
          />
        </div>
      </div>

      {/* Hero Section (Watermark + Image) */}
      <div className="relative mt-[32px] flex w-full flex-col items-center justify-start min-h-[240px] overflow-visible">
        {/* Watermark Text */}
        <p
          className={`${gilroyExtraBold.className} absolute top-0 z-0 w-full text-center text-[14.5vw] sm:text-[60px] leading-[1.1] font-extrabold tracking-[1px] whitespace-nowrap text-transparent uppercase not-italic`}
          style={{ backgroundImage: "linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0) 100%)", WebkitBackgroundClip: "text", backgroundClip: "text" }}
        >
          {watermarkText}
        </p>

        {/* Hero Image */}
        <div className="relative z-10 mt-[24px] flex w-full justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={imgSrc}
            className={`h-auto max-h-[360px] w-[130%] max-w-none object-contain drop-shadow-2xl ${
              activeTab === "AUTOMOTIVE" ? "translate-x-[4%] scale-110" : "scale-105"
            }`}
            aria-hidden
          />
        </div>
      </div>

      {/* Feature Card */}
      <div className="relative mt-[-36px] w-full max-w-[343px] border-[0.5px] border-white/20 bg-[#000000] p-[24px]">
        {activeTab === "AUTOMOTIVE" && activeIndex === 0 && (
          <img
            src="/applications/indicator-vertical.svg"
            alt=""
            className="absolute -top-[92px] left-[18px] h-[92px] w-[22px] pointer-events-none z-20"
            aria-hidden
          />
        )}

        <div className="absolute -top-[0.5px] -left-[0.5px] z-10 flex size-[6px] items-center justify-center">
          <div className="-scale-y-100 flex-none">
            <div className="relative size-[6px]">
              <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
            </div>
          </div>
        </div>

        <div className="absolute -bottom-[0.5px] -right-[0.5px] z-10 flex size-[6px] items-center justify-center">
          <div className="-scale-x-100 flex-none">
            <div className="relative size-[6px]">
              <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
            </div>
          </div>
        </div>

        <div key={activeIndex} className="flex flex-col animate-slide-fade">
          <h3 className={`${gilroyMedium.className} text-[20px] text-white leading-[28px] not-italic`}>
            {activeFeature?.title ?? "Tire Pressure Monitoring"}
          </h3>
          <p className={`${interRegular.className} mt-[16px] text-[14px] text-[#f0f0f0] opacity-65 leading-[22px] not-italic`}>
            {activeFeature?.description ??
              "On-device air pressure and temperature sensors provide real-time alerts for tire health to prevent accidents and optimize maintenance and fuel expenses"}
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="mt-[24px] flex items-center justify-center gap-[16px]">
        <button
          type="button"
          onClick={goPrev}
          className="size-[44px] relative"
          aria-label="Previous Feature"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src="/platform-scale/nav-right.svg"
            className="absolute inset-0 block size-full max-w-none"
            aria-hidden
          />
        </button>
      </div>

      <a
        href={ctaHref}
        className={`${interMedium.className} relative mt-[32px] flex h-[48px] w-[237px] items-center justify-center ${GREEN_CTA_SHADOW}`}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden z-[2] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)] rounded-[inherit]"
        />
        <p className="relative z-10 flex items-center gap-[10px] text-[12px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic [word-break:break-word]">
          {ctaLabel}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={dotIcon} alt="" className="size-[6px]" aria-hidden />
        </p>

        <div className="pointer-events-none absolute -top-[0.5px] right-0 z-20 flex size-[4px] items-center justify-center">
          <div className="rotate-180 flex-none">
            <div className="relative size-[4px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hero/corner-tag-2.svg" alt="" className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -top-[0.5px] left-0 z-20 flex size-[4px] items-center justify-center">
          <div className="-scale-y-100 flex-none">
            <div className="relative size-[4px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hero/corner-tag-1.svg" alt="" className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute right-0 bottom-0 z-20 flex size-[4px] items-center justify-center">
          <div className="-scale-x-100 flex-none">
            <div className="relative size-[4px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hero/corner-tag-2.svg" alt="" className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 z-20 flex size-[4px] items-center justify-center">
          <div className="flex-none">
            <div className="relative size-[4px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hero/corner-tag-1.svg" alt="" className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
