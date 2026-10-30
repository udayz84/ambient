"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from "react";
import Link from "next/link";
import {
  gilroySemiBold,
  interMedium,
  interRegular,
} from "@/components/hero/fonts";
import { TagBadge } from "@/components/hero/TagBadge";
import { Corners } from "@/components/shared/Corners";
import { GreenCtaCorners } from "@/components/shared/GreenCtaCorners";
import { TabletScaleCanvas } from "@/components/shared/TabletScaleCanvas";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
  HERO_TITLE_GRADIENT,
  PRIMARY_CTA_SHADOW,
  PRIMARY_CTA_INSET,
} from "@/components/products-page/products-data";

export function ElectronicaWaysToBuild() {
  const [activeWaysIndex, setActiveWaysIndex] = useState(0);
  const waysCarouselRef = useRef<HTMLDivElement>(null);

  const handleWaysScroll = () => {
    if (!waysCarouselRef.current) return;
    const { scrollLeft } = waysCarouselRef.current;
    const index = Math.round(scrollLeft / 326);
    setActiveWaysIndex(Math.min(Math.max(index, 0), 1));
  };

  const scrollToWaysCard = (index: number) => {
    waysCarouselRef.current?.scrollTo({
      left: index * 326,
      behavior: "smooth",
    });
  };

  return (
    <section
      aria-label="Two ways to build on GPX10 Pro"
      className="relative flex w-full justify-center overflow-hidden bg-black text-white py-[60px] min-[600px]:py-[40px]"
    >
      {/* Background Ambient Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 60%, rgba(83, 216, 36, 0.08) 0%, rgba(0, 0, 0, 0) 60%)",
        }}
      />

      {/* =========================================================================
          DESKTOP & TABLET VIEWPORT (>= 600px)
          Canvas Width: 1440px (source of truth).
          TabletScaleCanvas auto-scales down to 600px / 768px tablet with 0px deviation.
          ========================================================================= */}
      <TabletScaleCanvas className="relative hidden h-[840px] w-[1440px] shrink-0 min-[600px]:block">
        {/* Left Vertical Guide Line (Ambient Design System Chrome) */}
        <div className="pointer-events-none absolute bottom-0 left-[95px] top-0 z-10 flex w-0 items-center justify-center">
          <div className="flex-none rotate-90">
            <div className="relative h-0 w-[840px]">
              <div className="absolute inset-[-1px_0_0_0]">
                <img
                  src="/hero/line-82.svg"
                  alt=""
                  className="block size-full max-w-none opacity-40"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Vertical Guide Line (Ambient Design System Chrome) */}
        <div className="pointer-events-none absolute bottom-0 right-[95px] top-0 z-10 flex w-0 items-center justify-center">
          <div className="flex-none rotate-90">
            <div className="relative h-0 w-[840px]">
              <div className="absolute inset-[-0.5px_0]">
                <img
                  src="/hero/line-83.svg"
                  alt=""
                  className="block size-full max-w-none opacity-40"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section Content Wrapper */}
        <div className="absolute inset-x-[100px] top-[20px] z-20 flex flex-col">
          {/* Eyebrow: Signature TagBadge (Centered) */}
          <div className="mb-[20px] flex w-full justify-center">
            <TagBadge
              label="THE ECOSYSTEM IS GROWING"
              width="max-content"
              centerLabel
            />
          </div>

          {/* Section Header: Title then Description Center-Aligned Vertically */}
          <div className="flex flex-col items-center text-center pb-[36px]">
            {/* Title with Ambient Signature Corners & Metallic Gradient */}
            <div className="relative inline-flex flex-col items-center px-[28px] py-[14px]">
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
              <h2
                className={`${gilroySemiBold.className} m-0 bg-clip-text text-center text-[44px] font-semibold leading-[50px] tracking-[-0.01em] text-transparent not-italic [word-break:break-word]`}
                style={{
                  backgroundImage: HERO_TITLE_GRADIENT,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                You don’t just get a chip.
                <br />
                You get everyone building around it.
              </h2>
            </div>

            {/* Subheading / Description on the Right */}
            <p
              className={`${interRegular.className} mt-[16px] max-w-[760px] text-center text-[16px] font-normal leading-[25px] text-[#f0f0f0] opacity-85 [word-break:break-word]`}
            >
              GPX10 Pro earned an ecosystem. Best-in-class partners are standing
              up ready-made modules, automated hardware design, and production
              support around it — so the path from “great AI” to “shipped product”
              is no longer a six-month engineering project. It’s a plug-in.
            </p>
          </div>

          {/* Two Large Spec Cards Grid */}
          <div className="grid grid-cols-2 gap-[28px]">
            {/* CARD 01: Grinn Drop-in SOMs */}
            <div className="relative flex h-[540px] flex-col justify-between overflow-hidden border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[#0d0d0d] p-[32px] transition-colors duration-300 hover:border-[#53d824]/40">
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />

              {/* Card Top: Big Number 01 + GRINN Logo (Much Bigger) */}
              <div className="flex items-center gap-[18px]">
                <span
                  className={`${gilroySemiBold.className} bg-clip-text text-[42px] leading-[44px] font-semibold text-transparent`}
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.35) 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  01
                </span>
                <img
                  src="/electronica/grinn-logo-v2.png"
                  alt="GRINN"
                  className="h-[42px] w-auto object-contain"
                />
              </div>

              {/* Card Middle: Text on Left, Hardware Board on Right */}
              <div className="relative flex items-center justify-between gap-[16px] py-[6px]">
                {/* Left Text */}
                <div className="flex w-[240px] flex-col gap-[10px]">
                  <h3
                    className={`${gilroySemiBold.className} text-[21px] font-semibold leading-[27px] text-white`}
                  >
                    Pre-engineered GPX10 Pro
                    <br />
                    System-on-Modules
                  </h3>
                  <p
                    className={`${interRegular.className} text-[13.5px] font-normal leading-[21px] text-[#f0f0f0] opacity-80`}
                  >
                    A European embedded-systems house with 20+ years putting
                    modules into shipping products. Skip the RF, power, memory,
                    and sensor-routing spin — drop in a production-grade module
                    and build only the part that makes you different.
                  </p>
                </div>

                {/* Right Hardware Visual (Much Bigger, Transparent, Well-Established) */}
                <div className="relative flex h-[255px] w-[285px] shrink-0 items-center justify-center">
                  <img
                    src="/electronica/grinn-som-board-transparent.png"
                    alt="Grinn GPX10 Pro SOM"
                    className="size-full object-contain scale-[1.12] drop-shadow-[0_16px_32px_rgba(0,0,0,0.7)]"
                  />
                </div>
              </div>

              {/* Card Bottom: Feature Tags Row + Global Green CTA Button */}
              <div className="flex flex-col gap-[18px]">
                {/* Feature Tags Row with Icons in White */}
                <div className="flex flex-wrap items-center gap-x-[18px] gap-y-[8px]">
                  <div className="flex items-center gap-[6px]">
                    <img
                      src="/navbar/dropdown-icon-som.svg"
                      alt=""
                      aria-hidden="true"
                      className="size-[15px] shrink-0 opacity-90"
                    />
                    <span
                      className={`${interMedium.className} text-[12px] font-medium uppercase tracking-[0.05em] text-white`}
                    >
                      PRE-ENGINEERED
                    </span>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <img
                      src="/partners/icons_proof/chip.svg"
                      alt=""
                      aria-hidden="true"
                      className="size-[15px] shrink-0 opacity-90"
                    />
                    <span
                      className={`${interMedium.className} text-[12px] font-medium uppercase tracking-[0.05em] text-white`}
                    >
                      PRODUCTION HARDWARE
                    </span>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <img
                      src="/developer/pipeline-icon-deploy.svg"
                      alt=""
                      aria-hidden="true"
                      className="size-[15px] shrink-0 opacity-90"
                    />
                    <span
                      className={`${interMedium.className} text-[12px] font-medium uppercase tracking-[0.05em] text-white`}
                    >
                      DROP-IN
                    </span>
                  </div>
                </div>

                {/* Global Green CTA Button */}
                <Link
                  href="/contact#som-inquiry"
                  className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[48px] w-full shrink-0 items-center justify-center overflow-hidden transition-transform duration-200 hover:scale-[1.01]`}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
                  />
                  <span className="relative text-[14px] font-semibold uppercase tracking-[0.03em] text-white not-italic">
                    Join the Grinn SOM Waitlist
                  </span>
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
                  />
                  <GreenCtaCorners />
                </Link>
              </div>
            </div>

            {/* CARD 02: Celus Custom Hardware */}
            <div className="relative flex h-[540px] flex-col justify-between overflow-hidden border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[#0d0d0d] p-[32px] transition-colors duration-300 hover:border-[#53d824]/40">
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />

              {/* Card Top: Big Number 02 + Celus Logo (Much Bigger) */}
              <div className="flex items-center gap-[18px]">
                <span
                  className={`${gilroySemiBold.className} bg-clip-text text-[42px] leading-[44px] font-semibold text-transparent`}
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.35) 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  02
                </span>
                <img
                  src="/electronica/celus-logo-v2.png"
                  alt="Celus"
                  className="h-[42px] w-auto object-contain"
                />
              </div>

              {/* Card Middle: Text on Left, Hardware Visual on Right */}
              <div className="relative flex items-center justify-between gap-[16px] py-[6px]">
                {/* Left Text */}
                <div className="flex w-[240px] flex-col gap-[10px]">
                  <h3
                    className={`${gilroySemiBold.className} text-[21px] font-semibold leading-[27px] text-white`}
                  >
                    AI-automated
                    <br />
                    hardware design
                  </h3>
                  <p
                    className={`${interRegular.className} text-[13.5px] font-normal leading-[21px] text-[#f0f0f0] opacity-80`}
                  >
                    From requirements to a GPX10 Pro schematic in minutes, not
                    months — automated component selection, schematic
                    generation, and EDA handoff. The blank page is gone.
                  </p>
                </div>

                {/* Right Hardware Visual (Much Bigger, Well-Established) */}
                <div className="relative flex h-[255px] w-[285px] shrink-0 items-center justify-center">
                  <img
                    src="/electronica/celus-laptop-clean.png"
                    alt="Celus CAD Design System"
                    className="size-full object-contain scale-[1.22] drop-shadow-[0_16px_32px_rgba(0,0,0,0.7)]"
                  />
                </div>
              </div>

              {/* Card Bottom: Feature Tags Row + Global Green CTA Button */}
              <div className="flex flex-col gap-[18px]">
                {/* Feature Tags Row with Icons in White */}
                <div className="flex flex-wrap items-center gap-x-[18px] gap-y-[8px]">
                  <div className="flex items-center gap-[6px]">
                    <img
                      src="/products/fullpicture/icon-control.svg"
                      alt=""
                      aria-hidden="true"
                      className="size-[15px] shrink-0 opacity-90"
                    />
                    <span
                      className={`${interMedium.className} text-[12px] font-medium uppercase tracking-[0.05em] text-white`}
                    >
                      REQUIREMENTS
                    </span>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <img
                      src="/partners/icons_benefits/timer-02.svg"
                      alt=""
                      aria-hidden="true"
                      className="size-[15px] shrink-0 opacity-90"
                    />
                    <span
                      className={`${interMedium.className} text-[12px] font-medium uppercase tracking-[0.05em] text-white`}
                    >
                      SCHEMATIC IN MINUTES
                    </span>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <img
                      src="/developer/pipeline-icon-integrate.svg"
                      alt=""
                      aria-hidden="true"
                      className="size-[15px] shrink-0 opacity-90"
                    />
                    <span
                      className={`${interMedium.className} text-[12px] font-medium uppercase tracking-[0.05em] text-white`}
                    >
                      BOM
                    </span>
                  </div>
                </div>

                {/* Global Green CTA Button */}
                <Link
                  href="/contact#celus-inquiry"
                  className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[48px] w-full shrink-0 items-center justify-center overflow-hidden transition-transform duration-200 hover:scale-[1.01]`}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
                  />
                  <span className="relative text-[14px] font-semibold uppercase tracking-[0.03em] text-white not-italic">
                    Get Celus Updates
                  </span>
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
                  />
                  <GreenCtaCorners />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </TabletScaleCanvas>

      {/* =========================================================================
          MOBILE VIEWPORT (< 600px, 375px baseline)
          Dedicated responsive mobile layout with Ambient global theme components.
          ========================================================================= */}
      <div className="relative flex w-full max-w-[440px] flex-col items-center px-[20px] min-[600px]:hidden">
        {/* Eyebrow */}
        <div className="mb-[20px]">
          <TagBadge
            label="THE ECOSYSTEM IS GROWING"
            width="max-content"
            centerLabel
          />
        </div>

        {/* Title Area Mobile */}
        <div className="relative mb-[16px] inline-flex flex-col items-center p-[16px]">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroySemiBold.className} w-[320px] max-w-full bg-clip-text text-center text-[28px] font-semibold leading-[34px] tracking-[-0.01em] text-transparent not-italic [word-break:break-word]`}
            style={{
              backgroundImage: HERO_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            You don’t just get a chip.
            <br />
            You get everyone building around it.
          </h2>
        </div>

        {/* Subtitle Mobile */}
        <p
          className={`${interRegular.className} mb-[32px] max-w-[340px] text-center text-[14px] font-normal leading-[22px] text-[#f0f0f0] opacity-85`}
        >
          GPX10 Pro earned an ecosystem. Best-in-class partners are standing up
          ready-made modules, automated hardware design, and production support
          around it — so the path from “great AI” to “shipped product” is no
          longer a six-month engineering project. It’s a plug-in.
        </p>

        {/* Cards Horizontal Snap Carousel (Mobile) */}
        <div
          ref={waysCarouselRef}
          onScroll={handleWaysScroll}
          className="-mx-[20px] flex w-[calc(100%+40px)] snap-x snap-mandatory gap-[16px] overflow-x-auto px-[20px] pb-[8px] pt-[2px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Card 01 Mobile: Grinn */}
          <div className="relative flex w-[310px] shrink-0 snap-center flex-col justify-between gap-[20px] overflow-hidden border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[#0d0d0d] p-[24px]">
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />

            {/* Big Number 01 + GRINN Logo (Much Bigger) */}
            <div className="flex items-center gap-[14px]">
              <span
                className={`${gilroySemiBold.className} bg-clip-text text-[36px] leading-[38px] font-semibold text-transparent`}
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.35) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                01
              </span>
              <img
                src="/electronica/grinn-logo-v2.png"
                alt="GRINN"
                className="h-[34px] w-auto object-contain"
              />
            </div>

            {/* Heading & Text */}
            <h3
              className={`${gilroySemiBold.className} text-[20px] font-semibold leading-[26px] text-white`}
            >
              Pre-engineered GPX10 Pro
              <br />
              System-on-Modules
            </h3>
            <p
              className={`${interRegular.className} text-[13px] font-normal leading-[20px] text-[#f0f0f0] opacity-80`}
            >
              A European embedded-systems house with 20+ years putting modules
              into shipping products. Skip the RF, power, memory, and
              sensor-routing spin — drop in a production-grade module and build
              only the part that makes you different.
            </p>

            {/* Hardware Visual (Much Bigger, Transparent, Well-Established) */}
            <div className="relative my-[12px] flex h-[220px] w-full items-center justify-center">
              <img
                src="/electronica/grinn-som-board-transparent.png"
                alt="Grinn GPX10 Pro SOM"
                className="h-full object-contain scale-[1.08] drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]"
              />
            </div>

            {/* Tags with Icons in White */}
            <div className="flex flex-wrap items-center gap-x-[14px] gap-y-[6px]">
              <div className="flex items-center gap-[5px]">
                <img
                  src="/navbar/dropdown-icon-som.svg"
                  alt=""
                  aria-hidden="true"
                  className="size-[13px] shrink-0 opacity-90"
                />
                <span className={`${interMedium.className} text-[11px] font-medium uppercase tracking-[0.05em] text-white`}>
                  PRE-ENGINEERED
                </span>
              </div>
              <div className="flex items-center gap-[5px]">
                <img
                  src="/partners/icons_proof/chip.svg"
                  alt=""
                  aria-hidden="true"
                  className="size-[13px] shrink-0 opacity-90"
                />
                <span className={`${interMedium.className} text-[11px] font-medium uppercase tracking-[0.05em] text-white`}>
                  PRODUCTION HARDWARE
                </span>
              </div>
              <div className="flex items-center gap-[5px]">
                <img
                  src="/developer/pipeline-icon-deploy.svg"
                  alt=""
                  aria-hidden="true"
                  className="size-[13px] shrink-0 opacity-90"
                />
                <span className={`${interMedium.className} text-[11px] font-medium uppercase tracking-[0.05em] text-white`}>
                  DROP-IN
                </span>
              </div>
            </div>

            {/* Global Green CTA Button */}
            <Link
              href="/contact#som-inquiry"
              className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[44px] w-full items-center justify-center overflow-hidden`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
              />
              <span className="relative text-[13px] font-semibold uppercase tracking-[0.02em] text-white not-italic">
                Join the Grinn SOM Waitlist
              </span>
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
              />
              <GreenCtaCorners />
            </Link>
          </div>

          {/* Card 02 Mobile: Celus */}
          <div className="relative flex w-[310px] shrink-0 snap-center flex-col justify-between gap-[20px] overflow-hidden border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[#0d0d0d] p-[24px]">
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />

            {/* Big Number 02 + Celus Logo (Much Bigger) */}
            <div className="flex items-center gap-[14px]">
              <span
                className={`${gilroySemiBold.className} bg-clip-text text-[36px] leading-[38px] font-semibold text-transparent`}
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.35) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                02
              </span>
              <img
                src="/electronica/celus-logo-v2.png"
                alt="Celus"
                className="h-[34px] w-auto object-contain"
              />
            </div>

            {/* Heading & Text */}
            <h3
              className={`${gilroySemiBold.className} text-[20px] font-semibold leading-[26px] text-white`}
            >
              AI-automated hardware design
            </h3>
            <p
              className={`${interRegular.className} text-[13px] font-normal leading-[20px] text-[#f0f0f0] opacity-80`}
            >
              From requirements to a GPX10 Pro schematic in minutes, not months
              — automated component selection, schematic generation, and EDA
              handoff. The blank page is gone.
            </p>

            {/* Hardware Visual (Much Bigger, Well-Established) */}
            <div className="relative my-[12px] flex h-[220px] w-full items-center justify-center">
              <img
                src="/electronica/celus-laptop-clean.png"
                alt="Celus CAD Design System"
                className="h-full object-contain scale-[1.15] drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]"
              />
            </div>

            {/* Tags with Icons in White */}
            <div className="flex flex-wrap items-center gap-x-[14px] gap-y-[6px]">
              <div className="flex items-center gap-[5px]">
                <img
                  src="/products/fullpicture/icon-control.svg"
                  alt=""
                  aria-hidden="true"
                  className="size-[13px] shrink-0 opacity-90"
                />
                <span className={`${interMedium.className} text-[11px] font-medium uppercase tracking-[0.05em] text-white`}>
                  REQUIREMENTS
                </span>
              </div>
              <div className="flex items-center gap-[5px]">
                <img
                  src="/partners/icons_benefits/timer-02.svg"
                  alt=""
                  aria-hidden="true"
                  className="size-[13px] shrink-0 opacity-90"
                />
                <span className={`${interMedium.className} text-[11px] font-medium uppercase tracking-[0.05em] text-white`}>
                  SCHEMATIC IN MINUTES
                </span>
              </div>
              <div className="flex items-center gap-[5px]">
                <img
                  src="/developer/pipeline-icon-integrate.svg"
                  alt=""
                  aria-hidden="true"
                  className="size-[13px] shrink-0 opacity-90"
                />
                <span className={`${interMedium.className} text-[11px] font-medium uppercase tracking-[0.05em] text-white`}>
                  BOM
                </span>
              </div>
            </div>

            {/* Global Green CTA Button */}
            <Link
              href="/contact#celus-inquiry"
              className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[44px] w-full items-center justify-center overflow-hidden`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
              />
              <span className="relative text-[13px] font-semibold uppercase tracking-[0.02em] text-white not-italic">
                Get Celus Updates
              </span>
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
              />
              <GreenCtaCorners />
            </Link>
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="mt-[14px] flex items-center justify-center gap-[6px]">
          {[0, 1].map((i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollToWaysCard(i)}
              className={`h-[4px] rounded-full transition-all duration-300 ${
                i === activeWaysIndex ? "w-[20px] bg-[#53d824]" : "w-[6px] bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

