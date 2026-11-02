"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import Link from "next/link";
import { ProductsUseCases } from "@/components/products-page/ProductsUseCases";
import { Corners } from "@/components/shared/Corners";
import { GreenCtaCorners } from "@/components/shared/GreenCtaCorners";
import { gilroyBold, gilroySemiBold, interRegular } from "@/components/hero/fonts";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
  PRIMARY_CTA_INSET,
  PRIMARY_CTA_SHADOW,
} from "@/components/products-page/products-data";
import { ModelZooRequestForm } from "@/components/model-zoo/ModelZooRequestForm";

export function ElectronicaWhatCouldYouBuild({
  data,
  formConfig,
}: {
  data?: any;
  formConfig?: any;
}) {
  const [isModelZooOpen, setIsModelZooOpen] = useState(false);

  return (
    <div id="applications" className="relative scroll-mt-[90px] bg-black text-white">
      <ProductsUseCases data={data} formConfig={formConfig} />

      {/* =========================================================================
          GESTURE RECOGNITION LIVE DEMO VIDEO SHOWCASE
          Replaces the thin payoff strip with an auto-playing YouTube video card.
          ========================================================================= */}
      <div className="relative z-10 mx-auto mt-[40px] flex w-full max-w-[1080px] flex-col items-center px-[20px] md:mt-[60px]">
        {/* Eyebrow / Tag */}
        <div className="mb-[14px] flex items-center gap-[12px]">
          <span className={`${gilroyBold.className} rounded border border-[#53d824]/40 bg-[#53d824]/10 px-[12px] py-[5px] text-[11px] font-bold uppercase tracking-[0.08em] text-[#53d824]`}>
            Gesture Payoff
          </span>
        </div>

        {/* Title & Description */}
        <p className={`${interRegular.className} mb-[24px] max-w-[760px] text-center text-[14px] leading-[22px] text-[#f0f0f0] opacity-85 sm:text-[15px]`}>
          <strong className="font-semibold text-white">Control a live demo with a flick of your wrist.</strong>{" "}
          See gesture recognition — and VAD, fall detection, and more — running on our silicon at Electronica.
        </p>

        {/* Video Box */}
        <div className="relative w-full overflow-hidden border-[0.5px] border-solid border-[#53d824]/40 bg-[#0d0d0d] shadow-[0_0_32px_rgba(83,216,36,0.14)]">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <div className="relative aspect-video w-full overflow-hidden bg-black">
            <iframe
              src="https://www.youtube-nocookie.com/embed/kEq5GBnBhWc?autoplay=1&mute=1&loop=1&playlist=kEq5GBnBhWc&playsinline=1"
              title="Ambient Silicon Gesture Recognition Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="size-full border-0"
            />
          </div>
        </div>

        {/* CTA to Book Meeting */}
        <div className="mt-[24px] flex w-full justify-center px-[16px]">
          <Link
            href="/contact#calendar"
            className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative inline-flex h-[48px] w-auto items-center justify-center overflow-hidden px-[32px] sm:px-[44px] transition-transform duration-200 hover:scale-[1.02]`}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
            />
            <span className="relative whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.03em] text-white not-italic sm:text-[14px]">
              Book a Meeting to See It Live
            </span>
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
            />
            <GreenCtaCorners />
          </Link>
        </div>
      </div>

      {/* =========================================================================
          30+ AI MODELS MARQUEE CAROUSEL (FULL-WIDTH ACROSS ALL VIEWPORTS)
          Placed as a direct child of the full-width section to ensure it bleeds
          100% edge-to-edge from 0px to viewport width with zero gaps or cutoffs.
          ========================================================================= */}
      <div className="relative z-10 mt-[48px] flex w-full flex-col items-center overflow-hidden border-t border-white/10 pt-[40px] text-center md:mt-[64px] md:pt-[48px]">
        {/* Header */}
        <div className="relative mb-[14px] inline-flex flex-col items-center px-[20px] py-[6px]">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h3
            className={`${gilroyBold.className} m-0 bg-clip-text text-center text-[28px] font-bold leading-[34px] tracking-[-0.01em] text-transparent not-italic sm:text-[36px] sm:leading-[42px] md:text-[42px] md:leading-[48px]`}
            style={{
              backgroundImage:
                "linear-gradient(124.568deg, rgb(255, 255, 255) 1.35%, rgb(212, 233, 188) 55.16%, rgb(255, 255, 255) 111.67%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            30+ AI Models
          </h3>
        </div>

        {/* Subtitle */}
        <p
          className={`${interRegular.className} max-w-[720px] px-[20px] text-center text-[13px] font-normal leading-[20px] text-[#f0f0f0] opacity-75 sm:text-[15px] sm:leading-[24px]`}
        >
          Every open-source and Ambient-built model across audio, vision, and motion — 30+ and growing.
        </p>

        {/* Infinite Marquee Track: Full Width */}
        <div className="relative mt-[24px] w-full overflow-hidden py-[12px]">
          <div
            className="flex w-max animate-dvk-marquee-left items-start will-change-transform"
            style={{ animationDuration: "40s" }}
          >
            {[...Array(6)].map((_, i) => (
              <img
                key={i}
                alt={
                  i === 0
                    ? "AI models: Presence Detection, Wake Word Detection, Face Locator, Fall Detection, Air Gestures"
                    : ""
                }
                aria-hidden={i !== 0}
                src="/model-zoo/strip-loop.webp"
                className="h-[140px] w-[830px] max-w-none shrink-0 object-fill sm:h-[170px] sm:w-[1007px] md:h-[200px] md:w-[1185px]"
                loading="eager"
                decoding="async"
              />
            ))}
          </div>
        </div>

        {/* Global Green 'DOWNLOAD MODEL ZOO' CTA Button */}
        <div className="mt-[28px] flex w-full justify-center px-[20px] pb-[32px] sm:pb-[48px]">
          <button
            type="button"
            onClick={() => setIsModelZooOpen(true)}
            className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative inline-flex h-[48px] w-auto cursor-pointer items-center justify-center overflow-hidden px-[36px] transition-transform duration-200 hover:scale-[1.02]`}
            aria-label="Download Model Zoo"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
            />
            <span className="relative whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.03em] text-white not-italic sm:text-[14px]">
              Download Model Zoo
            </span>
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
            />
            <GreenCtaCorners />
          </button>
        </div>
      </div>

      {/* Model Zoo Request Drawer Form */}
      {isModelZooOpen ? (
        <ModelZooRequestForm
          onClose={() => setIsModelZooOpen(false)}
          config={formConfig}
        />
      ) : null}
    </div>
  );
}
