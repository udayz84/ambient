"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  gilroySemiBold,
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
  PRIMARY_CTA_INSET,
  PRIMARY_CTA_SHADOW,
  SECONDARY_CTA_BG,
} from "@/components/products-page/products-data";

const STEP_NUMBER_GRADIENT =
  "linear-gradient(to bottom, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 100%)";

const PROOF_BLOCKS = [
  {
    num: "01",
    tag: "ALWAYS ON",
    title: "24/7 AI.",
    body: "Run meaningful inference continuously, instead of waking the system periodically to check.",
    image: "/electronica/what-changes-1.jpg",
  },
  {
    num: "02",
    tag: "MICROWATT POWER",
    title: "AI that fits the battery.",
    body: "Keep models running where conventional processors force you to duty-cycle, recharge, or plug in.",
    image: "/electronica/what-changes-2.jpg",
  },
  {
    num: "03",
    tag: "LOCAL FIRST",
    title: "Data stays where it belongs.",
    body: "Process sensitive audio, motion, vision, and health signals directly on the device.",
    image: "/electronica/what-changes-3.jpg",
  },
  {
    num: "04",
    tag: "PROGRAMMABLE",
    title: "Your model. Your application.",
    body: "Start from a ready model or bring your own TensorFlow, Keras, or ONNX network.",
    image: "/electronica/what-changes-4.jpg",
  },
] as const;

export function ElectronicaWhatChanges() {
  const [activeChangeIndex, setActiveChangeIndex] = useState(0);
  const changeCarouselRef = useRef<HTMLDivElement>(null);

  const handleChangeScroll = () => {
    if (!changeCarouselRef.current) return;
    const { scrollLeft } = changeCarouselRef.current;
    const index = Math.round(scrollLeft / 296);
    setActiveChangeIndex(Math.min(Math.max(index, 0), PROOF_BLOCKS.length - 1));
  };

  const scrollToChangeCard = (index: number) => {
    changeCarouselRef.current?.scrollTo({
      left: index * 296,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="why-ambient"
      aria-label="The on-device advantage: What GPX changes"
      className="relative flex w-full justify-center overflow-hidden bg-black py-[50px] text-white min-[600px]:py-[40px]"
    >
      {/* Background Subtle Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(83, 216, 36, 0.05) 0%, rgba(0, 0, 0, 0) 65%)",
        }}
      />

      {/* =========================================================================
          DESKTOP & TABLET VIEWPORT (>= 600px)
          Canvas Width: 1440px (source of truth).
          TabletScaleCanvas scales down to tablet with 0px deviation.
          ========================================================================= */}
      <TabletScaleCanvas className="relative hidden w-[1440px] shrink-0 min-[600px]:flex min-[600px]:flex-col min-[600px]:px-[100px]">
        {/* Content Container */}
        <div className="relative z-20 flex w-full flex-col">
          {/* Eyebrow (Centered) */}
          <div className="mb-[18px] flex w-full justify-center">
            <TagBadge
              label="THE ON-DEVICE ADVANTAGE"
              width="max-content"
              centerLabel
            />
          </div>

          {/* Header: Title then Subtitle Center-Aligned Vertically */}
          <div className="flex flex-col items-center text-center pb-[32px]">
            <div className="relative inline-flex flex-col items-center px-[28px] py-[14px]">
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
              <h2
                className={`${gilroySemiBold.className} m-0 bg-clip-text text-center text-[44px] font-semibold leading-[50px] tracking-[-0.01em] text-transparent not-italic`}
                style={{
                  backgroundImage: HERO_TITLE_GRADIENT,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                More intelligence.
                <br />
                Less of everything that usually comes with it.
              </h2>
            </div>

            <p
              className={`${interRegular.className} mt-[16px] max-w-[700px] text-center text-[16px] font-normal leading-[25px] text-[#f0f0f0] opacity-85`}
            >
              No cloud dependency. No constant host processing. No oversized
              power budget. No redesigning your workflow just to add AI.
            </p>
          </div>

          {/* 4 Cards Grid — Modeled after Application Slug Page / WhyCard */}
          <div className="grid grid-cols-4 gap-[24px]">
            {PROOF_BLOCKS.map((item) => (
              <article
                key={item.num}
                className="group/card relative flex h-[340px] flex-col overflow-hidden border border-solid border-[rgba(240,240,240,0.18)] bg-[#0d0d0d] px-[24px] pb-[20px] pt-0 transition-all duration-300 hover:border-[#53d824]/50 hover:shadow-[0_0_30px_rgba(83,216,36,0.12)]"
              >
                {/* Top Image Box with Radial Backlight and Bottom Gradient Fade */}
                <div
                  className="relative -ml-[20%] h-[170px] w-[140%] shrink-0 overflow-hidden"
                  aria-hidden="true"
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 65%)",
                    }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 size-full object-cover opacity-80 transition-all duration-500 group-hover/card:scale-105 group-hover/card:opacity-100"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0) 55%, #0d0d0d 100%)",
                    }}
                  />
                </div>

                {/* Large Gradient Step Number overlapping bottom of image */}
                <span
                  className={`${gilroySemiBold.className} pointer-events-none absolute bg-clip-text text-[52px] font-semibold leading-[52px] text-transparent not-italic`}
                  style={{
                    left: 20,
                    top: 138,
                    backgroundImage: STEP_NUMBER_GRADIENT,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                  aria-hidden="true"
                >
                  {item.num}
                </span>

                {/* Content: Title & Description */}
                <div className="relative z-10 mt-[18px] flex flex-1 flex-col items-start gap-[8px] [word-break:break-word]">
                  <h3
                    className={`${gilroySemiBold.className} w-full text-[18px] font-semibold uppercase leading-[23px] tracking-[0.03em] text-white`}
                  >
                    {item.tag}
                  </h3>
                  <p
                    className={`${interRegular.className} w-full text-[13px] font-normal leading-[20px] text-[#99a1af]`}
                  >
                    <strong className="font-medium text-white">{item.title} </strong>
                    {item.body}
                  </p>
                </div>

                {/* Ambient signature corners */}
                <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
              </article>
            ))}
          </div>

          {/* Primary & Secondary CTA Buttons Row — Center Aligned */}
          <div className="mt-[24px] flex items-center justify-center gap-[18px]">
            {/* Primary CTA: How A-Cube Works */}
            <Link
              href="/technology"
              target="_blank"
              rel="noopener noreferrer"
              className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[48px] shrink-0 items-center justify-center overflow-hidden px-[28px] transition-transform duration-200 hover:scale-[1.01]`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
              />
              <span className="relative text-[14px] font-semibold uppercase tracking-[0.02em] text-white not-italic">
                How A-Cube Works
              </span>
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
              />
              <GreenCtaCorners />
            </Link>

            {/* Secondary CTA: Explore GPX10 Pro */}
            <Link
              href="/products"
              target="_blank"
              rel="noopener noreferrer"
              className={`${gilroySemiBold.className} relative flex h-[48px] shrink-0 items-center justify-center overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.25)] px-[28px] transition-all duration-200 hover:border-white/40 hover:bg-[rgba(226,241,202,0.18)]`}
              style={{ backgroundColor: SECONDARY_CTA_BG }}
            >
              <span className="relative text-[14px] font-semibold uppercase tracking-[0.02em] text-white not-italic">
                Explore GPX10 Pro
              </span>
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            </Link>
          </div>
        </div>
      </TabletScaleCanvas>

      {/* =========================================================================
          MOBILE VIEWPORT (< 600px)
          ========================================================================= */}
      <div className="relative flex w-full max-w-[440px] flex-col items-center px-[20px] min-[600px]:hidden">
        {/* Eyebrow */}
        <div className="mb-[18px]">
          <TagBadge
            label="THE ON-DEVICE ADVANTAGE"
            width="max-content"
            centerLabel
          />
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
            More intelligence.
            <br />
            Less of everything that usually comes with it.
          </h2>
        </div>

        {/* Subtitle */}
        <p
          className={`${interRegular.className} mb-[26px] max-w-[340px] text-center text-[14px] font-normal leading-[22px] text-[#f0f0f0] opacity-85`}
        >
          No cloud dependency. No constant host processing. No oversized power
          budget. No redesigning your workflow just to add AI.
        </p>

        {/* 4 Cards Horizontal Snap Carousel (Mobile) */}
        <div
          ref={changeCarouselRef}
          onScroll={handleChangeScroll}
          className="-mx-[20px] flex w-[calc(100%+40px)] snap-x snap-mandatory gap-[16px] overflow-x-auto px-[20px] pb-[8px] pt-[2px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {PROOF_BLOCKS.map((item) => (
            <article
              key={item.num}
              className="group/card relative flex min-h-[320px] w-[280px] shrink-0 snap-center flex-col justify-between overflow-hidden border border-solid border-[rgba(240,240,240,0.18)] bg-[#0d0d0d] px-[20px] pb-[18px] pt-0"
            >
              {/* Top Image Box */}
              <div
                className="relative -ml-[20%] h-[155px] w-[140%] shrink-0 overflow-hidden"
                aria-hidden="true"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 65%)",
                  }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 size-full object-cover opacity-80"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0) 55%, #0d0d0d 100%)",
                  }}
                />
              </div>

              {/* Large Gradient Step Number */}
              <span
                className={`${gilroySemiBold.className} pointer-events-none absolute bg-clip-text text-[46px] font-semibold leading-[46px] text-transparent not-italic`}
                style={{
                  left: 16,
                  top: 125,
                  backgroundImage: STEP_NUMBER_GRADIENT,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
                aria-hidden="true"
              >
                {item.num}
              </span>

              {/* Title & Body */}
              <div className="relative z-10 mt-[16px] flex flex-1 flex-col items-start gap-[8px]">
                <h3
                  className={`${gilroySemiBold.className} text-[18px] font-semibold uppercase leading-[24px] tracking-[0.03em] text-white`}
                >
                  {item.tag}
                </h3>
                <p
                  className={`${interRegular.className} text-[13px] font-normal leading-[20px] text-[#99a1af]`}
                >
                  <strong className="font-medium text-white">{item.title} </strong>
                  {item.body}
                </p>
              </div>

              {/* Ambient corners */}
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            </article>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="mt-[14px] flex items-center justify-center gap-[6px]">
          {PROOF_BLOCKS.map((item, i) => (
            <button
              key={item.num}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollToChangeCard(i)}
              className={`h-[4px] rounded-full transition-all duration-300 ${
                i === activeChangeIndex ? "w-[20px] bg-[#53d824]" : "w-[6px] bg-white/25"
              }`}
            />
          ))}
        </div>

        {/* Mobile Primary & Secondary CTA Buttons */}
        <div className="mt-[20px] flex w-full flex-col gap-[12px]">
          {/* Primary CTA */}
          <Link
            href="/technology"
            target="_blank"
            rel="noopener noreferrer"
            className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[48px] w-full items-center justify-center overflow-hidden`}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
            />
            <span className="relative text-[14px] font-semibold uppercase tracking-[0.02em] text-white not-italic">
              How A-Cube Works
            </span>
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
            />
            <GreenCtaCorners />
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/products"
            target="_blank"
            rel="noopener noreferrer"
            className={`${gilroySemiBold.className} relative flex h-[48px] w-full items-center justify-center overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.25)]`}
            style={{ backgroundColor: SECONDARY_CTA_BG }}
          >
            <span className="relative text-[14px] font-semibold uppercase tracking-[0.02em] text-white not-italic">
              Explore GPX10 Pro
            </span>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </Link>
        </div>
      </div>
    </section>
  );
}
