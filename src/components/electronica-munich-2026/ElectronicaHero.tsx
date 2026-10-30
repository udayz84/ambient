"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  gilroySemiBold,
  interRegular,
  interMedium,
} from "@/components/hero/fonts";
import { TagBadge } from "@/components/hero/TagBadge";
import { Corners } from "@/components/shared/Corners";
import { GreenCtaCorners } from "@/components/shared/GreenCtaCorners";
import { TabletScaleCanvas } from "@/components/shared/TabletScaleCanvas";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
  HERO_TITLE_GRADIENT,
  PRIMARY_CTA_INSET,
  PRIMARY_CTA_SHADOW,
  SECONDARY_CTA_BG,
} from "@/components/products-page/products-data";
import { ElectronicaCountdown } from "./ElectronicaCountdown";

export function ElectronicaHero() {
  return (
    <section
      aria-label="Electronica Munich 2026 Hero"
      className="relative flex w-full justify-center overflow-hidden bg-black text-white"
    >
      {/* =========================================================================
          DESKTOP & TABLET VIEWPORT (>= 600px)
          Canvas Width: 1440px (source of truth).
          TabletScaleCanvas auto-scales proportionately down to 600px / 768px tablet
          with exact ±0px deviation from desktop Figma specifications.
          ========================================================================= */}
      <TabletScaleCanvas className="relative hidden h-[710px] w-[1440px] shrink-0 min-[600px]:block">
        {/* Top Countdown Bar (Desktop - Centered) */}
        <div className="absolute inset-x-0 top-[32px] z-30 flex justify-center">
          <ElectronicaCountdown />
        </div>

        {/* Hero Left Content Container */}
        <div className="absolute left-[100px] top-[128px] z-20 flex w-[580px] flex-col items-start">
          {/* Eyebrow: Signature Ambient TagBadge */}
          <div className="mb-[24px]">
            <TagBadge
              label="THE AMBIENT ECOSYSTEM IS EXPANDING"
              width="max-content"
              centerLabel
            />
          </div>

          {/* Title Area with Ambient Signature Corners & Gradient */}
          <div className="relative inline-flex flex-col items-start p-[16px] pl-[20px] pr-[28px]">
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            <h1
              className={`${gilroySemiBold.className} m-0 bg-clip-text text-[48px] font-semibold leading-[54px] tracking-[-0.01em] text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: HERO_TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              The industry is building
              <br />
              around{" "}
              <span
                className="text-[#53d824]"
                style={{
                  WebkitTextFillColor: "#53d824",
                }}
              >
                microwatt AI.
              </span>
            </h1>
          </div>

          {/* Subheading / Description */}
          <div className="mt-[20px] pl-[20px]">
            <p
              className={`${interRegular.className} max-w-[520px] text-[16px] font-normal leading-[25px] text-[#f0f0f0] opacity-85 [word-break:break-word]`}
            >
              Ambient Scientific makes fully programmable AI processors that run
              real AI on-device, at microwatt power. Now Grinn and Celus are
              building a whole ecosystem around GPX10 Pro - making it radically
              easier to put that AI into your product. See it running at
              Electronica.
            </p>
          </div>

          {/* Credibility Line (inline directly under subhead) */}
          <div className="mt-[14px] flex items-center gap-[8px] pl-[20px]">
            <span
              className={`${interMedium.className} text-[12px] font-medium uppercase tracking-[0.06em] text-[#53d824]`}
            >
              BUILDING ON GPX10 PRO:
            </span>
            <span
              className={`${interRegular.className} text-[13px] font-normal text-white/80`}
            >
              Grinn · Celus
            </span>
          </div>

          {/* CTA Row (Ambient Global Theme Buttons) */}
          <div className="mt-[28px] flex items-center gap-[20px] pl-[20px]">
            {/* Primary CTA Button */}
            <Link
              href="/contact#calendar"
              className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[48px] shrink-0 items-center justify-center overflow-hidden px-[26px] transition-transform duration-200 hover:scale-[1.01]`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
              />
              <span className="relative text-[14px] font-semibold uppercase tracking-[0.02em] text-white not-italic">
                Book a Meeting at Electronica
              </span>
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
              />
              <GreenCtaCorners />
            </Link>

            {/* Secondary CTA Button */}
            <Link
              href="/dvk#evalkit-form"
              className={`${gilroySemiBold.className} relative flex h-[48px] shrink-0 items-center justify-center overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.25)] px-[24px] transition-all duration-200 hover:border-white/40 hover:bg-[rgba(226,241,202,0.18)]`}
              style={{ backgroundColor: SECONDARY_CTA_BG }}
            >
              <span className="relative text-[14px] font-semibold uppercase tracking-[0.02em] text-white not-italic">
                Win a Free Eval Kit
              </span>
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            </Link>
          </div>

          {/* Subtext */}
          <p
            className={`${interRegular.className} mt-[18px] pl-[20px] text-[13px] font-normal leading-[18px] text-[#f0f0f0] opacity-60`}
          >
            Booth meeting slots are limited — book yours before the floor fills.
          </p>
        </div>

        {/* Hero Right Visual (Hardware Ecosystem & Chips - positioned up for perfect headline alignment) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[20px] top-[85px] z-10 flex h-[480px] w-[750px] select-none items-start justify-center"
        >
          <img
            src="/electronica/hero-visual-apps.jpg"
            alt="Ambient GPX10 Pro Microwatt AI Applications: Wearables, Hearables, Smart Home, Industrial, Medical, Robotics, and Automotive"
            className="size-full object-contain object-top"
          />
        </div>
      </TabletScaleCanvas>

      {/* =========================================================================
          MOBILE VIEWPORT (< 600px, 375px baseline)
          Dedicated responsive mobile layout with Ambient global theme components.
          ========================================================================= */}
      <div className="relative flex w-full max-w-[440px] flex-col items-center px-[20px] pb-[56px] pt-[32px] min-[600px]:hidden">
        {/* Top Countdown Bar (Mobile - Centered) */}
        <div className="relative z-10 mb-[24px] flex w-full justify-center">
          <ElectronicaCountdown />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 flex w-full flex-col items-center">
          {/* Tag Badge */}
          <div className="mb-[24px]">
            <TagBadge
              label="THE AMBIENT ECOSYSTEM IS EXPANDING"
              width="max-content"
              centerLabel
            />
          </div>

          {/* Title Area with Corners */}
          <div className="relative mb-[14px] inline-flex flex-col items-center p-[16px]">
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            <h1
              className={`${gilroySemiBold.className} w-[320px] max-w-full bg-clip-text text-center text-[34px] font-semibold leading-[40px] tracking-[-0.01em] text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: HERO_TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              The industry is building
              <br />
              around{" "}
              <span
                className="text-[#53d824]"
                style={{
                  WebkitTextFillColor: "#53d824",
                }}
              >
                microwatt AI.
              </span>
            </h1>
          </div>

          {/* Subheading Mobile */}
          <p
            className={`${interRegular.className} max-w-[340px] text-center text-[14px] font-normal leading-[22px] text-[#f0f0f0] opacity-85`}
          >
            Ambient Scientific makes fully programmable AI processors that run
            real AI on-device, at microwatt power. Now Grinn and Celus are
            building a whole ecosystem around GPX10 Pro - making it radically
            easier to put that AI into your product. See it running at
            Electronica.
          </p>

          {/* Credibility Line Mobile */}
          <div className="mt-[12px] flex items-center justify-center gap-[6px]">
            <span
              className={`${interMedium.className} text-[11px] font-medium uppercase tracking-[0.05em] text-[#53d824]`}
            >
              BUILDING ON GPX10 PRO:
            </span>
            <span
              className={`${interRegular.className} text-[12px] font-normal text-white/80`}
            >
              Grinn · Celus
            </span>
          </div>

          {/* Hardware Visual Mobile */}
          <div className="relative my-[28px] w-full overflow-hidden">
            <img
              src="/electronica/hero-visual-apps.jpg"
              alt="Ambient GPX10 Pro Microwatt AI Applications: Wearables, Hearables, Smart Home, Industrial, Medical, Robotics, and Automotive"
              className="relative z-10 w-full object-contain mix-blend-screen"
            />
          </div>

          {/* Mobile CTA Buttons */}
          <div className="flex w-full flex-col gap-[14px]">
            <Link
              href="/contact#calendar"
              className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[48px] w-full shrink-0 items-center justify-center overflow-hidden`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
              />
              <span className="relative text-[14px] font-semibold uppercase tracking-[0.02em] text-white not-italic">
                Book a Meeting at Electronica
              </span>
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
              />
              <GreenCtaCorners />
            </Link>

            <Link
              href="/dvk#evalkit-form"
              className={`${gilroySemiBold.className} relative flex h-[48px] w-full shrink-0 items-center justify-center overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.25)]`}
              style={{ backgroundColor: SECONDARY_CTA_BG }}
            >
              <span className="relative text-[14px] font-semibold uppercase tracking-[0.02em] text-white not-italic">
                Win a Free Eval Kit
              </span>
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            </Link>
          </div>

          {/* Subtext Mobile */}
          <p
            className={`${interRegular.className} mt-[14px] text-center text-[12px] font-normal leading-[17px] text-[#f0f0f0] opacity-60`}
          >
            Booth meeting slots are limited — book yours before the floor fills.
          </p>
        </div>
      </div>
    </section>
  );
}
