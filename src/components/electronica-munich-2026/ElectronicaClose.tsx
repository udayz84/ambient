"use client";

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
} from "@/components/products-page/products-data";

const QUICK_LINKS = [
  {
    label: "Browse the Model Zoo",
    href: "/model-zoo",
  },
  {
    label: "Developer Hub",
    href: "/developer",
  },
  {
    label: "Explore Applications",
    href: "/applications",
  },
  {
    label: "Partner Ecosystem",
    href: "/partners",
  },
  {
    label: "Talk to an FAE",
    href: "/contact",
  },
] as const;

export function ElectronicaClose() {
  return (
    <section
      aria-label="One connected path: From idea to product without starting over"
      className="relative flex w-full justify-center overflow-hidden bg-black pt-[40px] pb-[10px] text-white min-[600px]:pt-[36px] min-[600px]:pb-0"
    >
      {/* Background Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(83, 216, 36, 0.08) 0%, rgba(0, 0, 0, 0) 70%)",
        }}
      />

      {/* =========================================================================
          DESKTOP & TABLET VIEWPORT (>= 600px)
          Canvas Width: 1440px
          ========================================================================= */}
      <TabletScaleCanvas className="relative hidden h-[490px] w-[1440px] shrink-0 min-[600px]:block">
        {/* Left Vertical Guide Line */}
        <div className="pointer-events-none absolute bottom-0 left-[95px] top-0 z-10 flex w-0 items-center justify-center">
          <div className="flex-none rotate-90">
            <div className="relative h-0 w-[490px]">
              <div className="absolute inset-[-1px_0_0_0]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
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

        {/* Right Vertical Guide Line */}
        <div className="pointer-events-none absolute bottom-0 right-[95px] top-0 z-10 flex w-0 items-center justify-center">
          <div className="flex-none rotate-90">
            <div className="relative h-0 w-[490px]">
              <div className="absolute inset-[-0.5px_0]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
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

        {/* Center Container */}
        <div className="absolute inset-x-[100px] top-[24px] z-20 flex flex-col items-center text-center">
          {/* Eyebrow */}
          <div className="mb-[16px]">
            <TagBadge label="ONE CONNECTED PATH" width="max-content" centerLabel />
          </div>

          {/* Heading */}
          <div className="relative inline-flex flex-col items-center p-[14px] px-[28px]">
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            <h2
              className={`${gilroySemiBold.className} m-0 bg-clip-text text-[44px] font-semibold leading-[50px] tracking-[-0.01em] text-transparent not-italic`}
              style={{
                backgroundImage: HERO_TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              From idea to product,
              <br />
              without starting over.
            </h2>
          </div>

          {/* Body */}
          <p
            className={`${interRegular.className} mt-[14px] max-w-[620px] text-[15px] font-normal leading-[23px] text-[#f0f0f0] opacity-85`}
          >
            Ambient is more than a processor. It&apos;s a connected path from the
            model in your head to AI running inside a real product — Model Zoo to
            ModelForge to silicon to the ecosystem to shipping, with the blank
            pages removed.
          </p>

          {/* Closing Statement */}
          <p
            className={`${interMedium.className} mt-[10px] text-[14px] text-white/90`}
          >
            Less engineering drag. Fewer blank pages.{" "}
            <span className="text-[#53d824]">«Real AI at microwatt power.»</span>{" "}
            Welcome to the Ambient Ecosystem.
          </p>

          {/* Primary CTA Button */}
          <div className="mt-[24px]">
            <Link
              href="/contact#calendar"
              className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[48px] shrink-0 items-center justify-center overflow-hidden px-[32px] transition-transform duration-200 hover:scale-[1.01]`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
              />
              <span className="relative text-[14px] font-semibold uppercase tracking-[0.02em] text-white not-italic">
                Start Building with Ambient
              </span>
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
              />
              <GreenCtaCorners />
            </Link>
          </div>

          {/* Secondary Quick Links: Clean Unified Glass Capsule Bar */}
          <div className="mt-[22px] inline-flex items-center rounded-full border border-white/15 bg-[#0a0e0a]/85 px-[24px] py-[9px] shadow-[0_4px_25px_rgba(0,0,0,0.6)] backdrop-blur-md">
            <div className="flex items-center gap-[18px]">
              {QUICK_LINKS.map((link, idx) => (
                <div key={link.label} className="flex items-center gap-[18px]">
                  <Link
                    href={link.href}
                    className={`${interMedium.className} group flex items-center gap-[4px] text-[13px] font-medium text-white/75 transition-colors duration-200 hover:text-[#53d824]`}
                  >
                    <span>{link.label}</span>
                    <span className="text-[11px] text-[#53d824]/70 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#53d824]">
                      ↗
                    </span>
                  </Link>
                  {idx < QUICK_LINKS.length - 1 && (
                    <span className="text-white/20 select-none">·</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </TabletScaleCanvas>

      {/* =========================================================================
          MOBILE VIEWPORT (< 600px)
          ========================================================================= */}
      <div className="relative flex w-full max-w-[440px] flex-col items-center px-[20px] text-center min-[600px]:hidden">
        {/* Eyebrow */}
        <div className="mb-[18px]">
          <TagBadge label="ONE CONNECTED PATH" width="max-content" centerLabel />
        </div>

        {/* Title */}
        <div className="relative mb-[14px] inline-flex flex-col items-center p-[14px]">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroySemiBold.className} w-[320px] max-w-full bg-clip-text text-center text-[28px] font-semibold leading-[34px] tracking-[-0.01em] text-transparent not-italic`}
            style={{
              backgroundImage: HERO_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            From idea to product,
            <br />
            without starting over.
          </h2>
        </div>

        {/* Body */}
        <p
          className={`${interRegular.className} mb-[16px] text-[14px] font-normal leading-[22px] text-[#f0f0f0] opacity-85`}
        >
          Ambient is more than a processor. It&apos;s a connected path from the
          model in your head to AI running inside a real product — Model Zoo to
          ModelForge to silicon to the ecosystem to shipping, with the blank
          pages removed.
        </p>

        {/* Closing statement */}
        <p className={`${interMedium.className} mb-[24px] text-[13px] text-white/90`}>
          Less engineering drag. Fewer blank pages.{" "}
          <span className="text-[#53d824]">«Real AI at microwatt power.»</span>
        </p>

        {/* Primary CTA Button */}
        <Link
          href="/contact#calendar"
          className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[48px] w-full items-center justify-center overflow-hidden`}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
          />
          <span className="relative text-[14px] font-semibold uppercase tracking-[0.02em] text-white not-italic">
            Start Building with Ambient
          </span>
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
          />
          <GreenCtaCorners />
        </Link>

        {/* Mobile secondary links: Clean Unified Capsule */}
        <div className="mt-[20px] inline-flex flex-wrap items-center justify-center gap-[10px] rounded-[16px] border border-white/15 bg-[#0a0e0a]/90 px-[16px] py-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-[4px] px-[6px] py-[3px] text-[12px] font-medium text-white/80 transition-colors active:text-[#53d824]"
            >
              <span className={`${interMedium.className}`}>{link.label}</span>
              <span className="text-[10px] text-[#53d824]">↗</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

