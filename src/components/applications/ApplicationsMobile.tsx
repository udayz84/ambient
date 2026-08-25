"use client";

import { useState, useCallback, useRef, useEffect, Fragment } from "react";
import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import { gilroyExtraBold, gilroyMedium, interRegular, interMedium } from "../hero/fonts";
import { CategoryDivider } from "./ApplicationsCategoryNav";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

const tabCornerTl = "/applications/corners/tab-corner-tl.svg";
const tabCornerTr = "/applications/corners/tab-corner-tr.svg";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

const MOBILE_HERO_IMAGES: Record<string, string> = {};

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
  tabs = [],
  featureCards = [],
  data,
  categoryActiveIndex,
  setCategoryActiveIndex,
}: ApplicationsMobileProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const features = featureCards.length ? featureCards : [];
  const activeFeature = features[activeIndex] || {};

  const activeTab = tabs[categoryActiveIndex]?.label || "";
  const activeTabData = tabs.find(
    (t) => (t?.label || "").toUpperCase() === activeTab.toUpperCase()
  );
  const imgSrc =
    mediaUrl(activeTabData?.mobile_hero_image) ||
    mediaUrl(activeTabData?.hero_image) ||
    MOBILE_HERO_IMAGES[activeTab] ||
    "";
  const watermarkText =
    activeTabData?.watermark_text || "";

  const heading = data?.heading || "";
  const headingLines = heading.split("\n");
  const headingLine1 = headingLines[0] || "";
  const headingLine2 = headingLines.slice(1).join("\n") || "";
  const subtitle = data?.subtitle || "";
  const cta = data?.cta || {};
  const ctaLabel = cta.label || "";
  const ctaHref = cta.href || "";
  const dotIcon = mediaUrl(cta.dot_icon) || "/applications/cta-dot.svg";

  const goNext = useCallback(() => {
    setCategoryActiveIndex((categoryActiveIndex + 1) % tabs.length);
    setActiveIndex(0);
  }, [categoryActiveIndex, tabs.length, setCategoryActiveIndex]);
  const goPrev = useCallback(() => {
    setCategoryActiveIndex((categoryActiveIndex - 1 + tabs.length) % tabs.length);
    setActiveIndex(0);
  }, [categoryActiveIndex, tabs.length, setCategoryActiveIndex]);

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
            const label = tab?.label ?? `Tab ${index}`;
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
          {imgSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt=""
              src={imgSrc}
              className="h-auto max-h-[360px] w-full object-contain drop-shadow-2xl"
              aria-hidden
            />
          ) : null}
        </div>
      </div>

      {/* Feature Cards */}
      <div className="relative z-20 mt-[-36px] grid w-full max-w-[343px] grid-cols-2 gap-[12px]">
        {features.map((feature, idx) => (
          <div key={idx} className="relative w-full border border-white/20 bg-[#000000] p-[16px]">
            {activeTab === "AUTOMOTIVE" && idx === 0 && (
              <img
                src="/applications/indicator-vertical.svg"
                alt=""
                className="absolute -top-[92px] left-[18px] h-[92px] w-[22px] pointer-events-none z-20"
                aria-hidden
              />
            )}

            <Corners />

            <h4 className={`${gilroyMedium.className} text-[16px] leading-[22px] text-white`}>
              {feature.title}
            </h4>
            <p className={`${interRegular.className} mt-[12px] text-[12px] leading-[18px] text-[#f0f0f0] opacity-65`}>
              {feature.description}
            </p>
          </div>
        ))}
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
        <GreenCtaCorners />
      </a>
    </div>
  );
}
