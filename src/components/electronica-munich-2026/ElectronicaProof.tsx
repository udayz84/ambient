"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  gilroySemiBold,
  gilroyBold,
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

interface ProofTag {
  label: string;
  icon: string;
}

interface ProofCardData {
  tag: string;
  metric: string;
  metricSub: string;
  body: string;
  tags: readonly ProofTag[];
  ctaLabel: string;
  href: string;
  image: string;
}

const PROOF_CARDS: readonly ProofCardData[] = [
  {
    tag: "THE SAFETY WIN",
    metric: "90 DAYS",
    metricSub: "on a single charge",
    body: "Fall detection and SOS voice recognition running continuously on-device in a safety pendant.",
    tags: [
      { label: "Continuous AI", icon: "/technology/icon-compute.svg" },
      { label: "Fall Detect", icon: "/som/motion-icon.svg" },
      { label: "SOS Voice", icon: "/technology/icon-speak-ai.svg" },
    ],
    ctaLabel: "Explore Application",
    href: "/applications",
    image: "/applications/wins-img-1.webp",
  },
  {
    tag: "THE WOMEN'S-HEALTH WIN",
    metric: ">98%",
    metricSub: "fall & assault recognition",
    body: "GPX10 Pro identifies fall and assault patterns locally in DimensionNXG's MAI wearable — 14 days on a 200 mAh cell.",
    tags: [
      { label: "14 Days Battery", icon: "/products/alwayson/icon-power.svg" },
      { label: "200 mAh Cell", icon: "/navbar/dropdown-icon-chip.svg" },
      { label: "Local AI", icon: "/technology/icon-compute.svg" },
    ],
    ctaLabel: "Read Case Study",
    href: "/case-studies/MAI-case-study.pdf",
    image: "/applications/wins-img-2.webp",
  },
  {
    tag: "THE INDUSTRIAL WIN",
    metric: "2+ YEARS",
    metricSub: "on one cell",
    body: "Continuous vibration and acoustic analysis detects machine anomalies at the edge, transmitting alerts instead of raw telemetry.",
    tags: [
      { label: "Predictive Maint.", icon: "/products/fullpicture/icon-peripherals.svg" },
      { label: "Acoustic Anomaly", icon: "/products/fullpicture/icon-sensing.svg" },
      { label: "Edge Alerts", icon: "/developer/pipeline-icon-deploy.svg" },
    ],
    ctaLabel: "Explore Industrial AI",
    href: "/applications",
    image: "/applications/wins-img-3.webp",
  },
] as const;

export function ElectronicaProof() {
  const [activeProofIndex, setActiveProofIndex] = useState(0);
  const proofCarouselRef = useRef<HTMLDivElement>(null);

  const handleProofScroll = () => {
    if (!proofCarouselRef.current) return;
    const { scrollLeft } = proofCarouselRef.current;
    const index = Math.round(scrollLeft / 316);
    setActiveProofIndex(Math.min(Math.max(index, 0), PROOF_CARDS.length - 1));
  };

  const scrollToProofCard = (index: number) => {
    proofCarouselRef.current?.scrollTo({
      left: index * 316,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="proof"
      aria-label="Proven in production: Case studies and real-world results"
      className="relative flex w-full justify-center overflow-hidden bg-black py-[50px] text-white min-[600px]:py-[40px]"
    >
      {/* Background Subtle Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(83, 216, 36, 0.06) 0%, rgba(0, 0, 0, 0) 60%)",
        }}
      />

      {/* =========================================================================
          DESKTOP & TABLET VIEWPORT (>= 600px)
          Canvas Width: 1440px (source of truth).
          ========================================================================= */}
      <TabletScaleCanvas className="relative hidden h-[840px] w-[1440px] shrink-0 min-[600px]:block">
        {/* Left Guide Line */}
        <div className="pointer-events-none absolute bottom-0 left-[95px] top-0 z-10 flex w-0 items-center justify-center">
          <div className="flex-none rotate-90">
            <div className="relative h-0 w-[840px]">
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

        {/* Right Guide Line */}
        <div className="pointer-events-none absolute bottom-0 right-[95px] top-0 z-10 flex w-0 items-center justify-center">
          <div className="flex-none rotate-90">
            <div className="relative h-0 w-[840px]">
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

        {/* Main Content */}
        <div className="absolute inset-x-[100px] top-[16px] z-20 flex flex-col">
          {/* Eyebrow (Centered) */}
          <div className="mb-[16px] flex w-full justify-center">
            <TagBadge label="PROVEN IN PRODUCTION" width="max-content" centerLabel />
          </div>

          {/* Header: Title then Subtitle Center-Aligned Vertically */}
          <div className="flex flex-col items-center pb-[24px] text-center">
            <div className="relative inline-flex flex-col items-center px-[28px] py-[12px]">
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
              <h2
                className={`${gilroySemiBold.className} m-0 bg-clip-text text-center text-[44px] font-semibold leading-[50px] tracking-[-0.01em] text-transparent not-italic`}
                style={{
                  backgroundImage: HERO_TITLE_GRADIENT,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                The numbers only matter
                <br />
                with the AI running.
              </h2>
            </div>

            <p
              className={`${interRegular.className} mt-[14px] max-w-[620px] text-center text-[16px] font-normal leading-[25px] text-[#f0f0f0] opacity-85`}
            >
              Real products. Real workloads. Real power budgets.
            </p>
          </div>

          {/* 3 Case Study Cards Grid */}
          <div className="grid grid-cols-3 gap-[24px]">
            {PROOF_CARDS.map((card) => (
              <article
                key={card.tag}
                className="group/card relative flex h-[510px] flex-col justify-between overflow-hidden border border-solid border-[rgba(240,240,240,0.18)] bg-[#0d0d0d] transition-all duration-300 hover:border-[#53d824]/50 hover:shadow-[0_0_35px_rgba(83,216,36,0.12)]"
              >
                <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />

                {/* Top Section: Spread Image Edge-to-Edge with Green Glow + Gradient Fade */}
                <div className="relative h-[200px] w-full shrink-0 overflow-hidden bg-black">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-0"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 50%, rgba(83, 216, 36, 0.12) 0%, rgba(0, 0, 0, 0) 70%)",
                    }}
                  />

                  {/* Spread Image across card */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.image}
                    alt={card.tag}
                    className="relative z-10 size-full object-cover object-center transition-transform duration-500 group-hover/card:scale-105"
                  />

                  {/* Smooth Gradient Fade to card background */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[48px]"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(13, 13, 13, 0) 0%, rgba(13, 13, 13, 0.8) 60%, #0d0d0d 100%)",
                    }}
                  />
                </div>

                {/* Content Block */}
                <div className="relative z-10 flex flex-1 flex-col justify-between px-[24px] pb-[22px] pt-[8px]">
                  <div>
                    {/* Category Label (No box, green indicator dot) */}
                    <div className="flex items-center gap-[6px]">
                      <span className="size-[5px] rounded-full bg-[#53d824]" />
                      <span
                        className={`${interMedium.className} text-[11px] font-semibold uppercase tracking-[0.08em] text-[#53d824]`}
                      >
                        {card.tag}
                      </span>
                    </div>

                    {/* Big Metric Display */}
                    <div className="mt-[8px] flex flex-col">
                      <div
                        className={`${gilroyBold.className} text-[44px] font-bold leading-[48px] tracking-[-0.01em] text-white`}
                      >
                        {card.metric}
                      </div>
                      <div
                        className={`${interMedium.className} mt-[2px] text-[12px] font-medium uppercase tracking-[0.06em] text-[#c5f3b5]`}
                      >
                        {card.metricSub}
                      </div>
                    </div>

                    {/* Description */}
                    <p
                      className={`${interRegular.className} mt-[10px] text-[13px] font-normal leading-[21px] text-[#9ca3af]`}
                    >
                      {card.body}
                    </p>

                    {/* Feature Tags with Relevant Icons (No Box) */}
                    <div className="mt-[14px] flex flex-wrap items-center gap-x-[16px] gap-y-[8px]">
                      {card.tags.map((tag) => (
                        <div key={tag.label} className="flex items-center gap-[6px]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={tag.icon}
                            alt=""
                            aria-hidden="true"
                            className="size-[14px] shrink-0 opacity-80"
                          />
                          <span
                            className={`${interRegular.className} text-[12px] text-[#9ba5b4]`}
                          >
                            {tag.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Center-Aligned Green CTA Button */}
                  <div className="mt-[18px] flex w-full justify-center">
                    <Link
                      href={card.href}
                      target={card.href.endsWith(".pdf") ? "_blank" : undefined}
                      rel={card.href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
                      className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[40px] w-full max-w-[280px] items-center justify-center overflow-hidden transition-transform duration-200 hover:scale-[1.01]`}
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
                      />
                      <span className="relative text-[12px] font-semibold uppercase tracking-[0.03em] text-white not-italic">
                        {card.ctaLabel}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
                      />
                      <GreenCtaCorners />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Mid-page Giveaway Nudge Banner */}
          <div className="relative mt-[24px] flex h-[68px] items-center justify-between overflow-hidden border border-[#53d824]/40 bg-gradient-to-r from-[#0d140d] via-[#101b10] to-[#0d140d] px-[32px] shadow-[0_0_30px_rgba(83,216,36,0.08)]">
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />

            <div className="flex items-center gap-[16px]">
              <span className="flex size-[8px] rounded-full bg-[#53d824] animate-pulse" />
              <p
                className={`${interRegular.className} text-[14px] text-[#f0f0f0]`}
              >
                <strong className={`${gilroySemiBold.className} text-[15px] font-semibold text-white`}>
                  Convinced? Put it on your own bench.
                </strong>{" "}
                Five engineers win a free NuraSense kit at Electronica.
              </p>
            </div>

            <Link
              href="#eval-kit-form"
              className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[40px] shrink-0 items-center justify-center overflow-hidden px-[22px] transition-transform duration-200 hover:scale-[1.01]`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
              />
              <span className="relative text-[13px] font-semibold uppercase tracking-[0.02em] text-white not-italic">
                Enter the Giveaway
              </span>
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
              />
              <GreenCtaCorners />
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
          <TagBadge label="PROVEN IN PRODUCTION" width="max-content" centerLabel />
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
            The numbers only matter
            <br />
            with the AI running.
          </h2>
        </div>

        {/* Subtitle */}
        <p
          className={`${interRegular.className} mb-[26px] max-w-[340px] text-center text-[14px] font-normal leading-[22px] text-[#f0f0f0] opacity-85`}
        >
          Real products. Real workloads. Real power budgets.
        </p>

        {/* Cards Horizontal Carousel (Mobile) */}
        <div
          ref={proofCarouselRef}
          onScroll={handleProofScroll}
          className="-mx-[20px] flex w-[calc(100%+40px)] snap-x snap-mandatory gap-[16px] overflow-x-auto px-[20px] pb-[8px] pt-[2px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {PROOF_CARDS.map((card) => (
            <article
              key={card.tag}
              className="group/card relative flex w-[300px] shrink-0 snap-center flex-col justify-between overflow-hidden border border-solid border-[rgba(240,240,240,0.18)] bg-[#0d0d0d]"
            >
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />

              {/* Mobile Spread Image */}
              <div className="relative h-[180px] w-full shrink-0 overflow-hidden bg-black">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(83, 216, 36, 0.12) 0%, rgba(0, 0, 0, 0) 70%)",
                  }}
                />

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image}
                  alt={card.tag}
                  className="relative z-10 size-full object-cover object-center"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[36px]"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(13, 13, 13, 0) 0%, rgba(13, 13, 13, 0.8) 60%, #0d0d0d 100%)",
                  }}
                />
              </div>

              {/* Mobile Card Content */}
              <div className="flex flex-1 flex-col justify-between p-[18px] pt-[8px]">
                <div>
                  {/* Category Label (No box) */}
                  <div className="flex items-center gap-[6px]">
                    <span className="size-[5px] rounded-full bg-[#53d824]" />
                    <span
                      className={`${interMedium.className} text-[11px] font-semibold uppercase tracking-[0.08em] text-[#53d824]`}
                    >
                      {card.tag}
                    </span>
                  </div>

                  <div className="mt-[6px] flex flex-col">
                    <span
                      className={`${gilroyBold.className} text-[36px] font-bold leading-[40px] text-white`}
                    >
                      {card.metric}
                    </span>
                    <span
                      className={`${interMedium.className} mt-[2px] text-[12px] font-medium uppercase tracking-[0.04em] text-[#c5f3b5]`}
                    >
                      {card.metricSub}
                    </span>
                  </div>

                  <p
                    className={`${interRegular.className} mt-[8px] text-[13px] font-normal leading-[19px] text-[#9ca3af]`}
                  >
                    {card.body}
                  </p>

                  {/* Mobile Feature Tags with Icons (No Box) */}
                  <div className="mt-[12px] flex flex-wrap items-center gap-x-[12px] gap-y-[6px]">
                    {card.tags.map((tag) => (
                      <div key={tag.label} className="flex items-center gap-[5px]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={tag.icon}
                          alt=""
                          aria-hidden="true"
                          className="size-[13px] shrink-0 opacity-80"
                        />
                        <span
                          className={`${interRegular.className} text-[11px] text-[#9ba5b4]`}
                        >
                          {tag.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile Center-Aligned Green CTA Button */}
                <div className="mt-[16px] flex w-full justify-center">
                  <Link
                    href={card.href}
                    target={card.href.endsWith(".pdf") ? "_blank" : undefined}
                    rel={card.href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
                    className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[40px] w-full max-w-[280px] items-center justify-center overflow-hidden`}
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
                    />
                    <span className="relative text-[12px] font-semibold uppercase tracking-[0.03em] text-white not-italic">
                      {card.ctaLabel}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
                    />
                    <GreenCtaCorners />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="mt-[14px] flex items-center justify-center gap-[6px]">
          {PROOF_CARDS.map((card, i) => (
            <button
              key={card.tag}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollToProofCard(i)}
              className={`h-[4px] rounded-full transition-all duration-300 ${
                i === activeProofIndex ? "w-[20px] bg-[#53d824]" : "w-[6px] bg-white/25"
              }`}
            />
          ))}
        </div>

        {/* Mobile Giveaway Nudge Banner */}
        <div className="relative mt-[24px] flex w-full flex-col gap-[12px] border border-[#53d824]/40 bg-[#0d140d] p-[18px]">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <p className={`${interRegular.className} text-[13px] text-[#f0f0f0]`}>
            <strong className={`${gilroySemiBold.className} block font-semibold text-white`}>
              Convinced? Put it on your own bench.
            </strong>{" "}
            Five engineers win a free NuraSense kit at Electronica.
          </p>
          <Link
            href="#eval-kit-form"
            className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[44px] w-full items-center justify-center overflow-hidden`}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
            />
            <span className="relative text-[13px] font-semibold uppercase tracking-[0.02em] text-white not-italic">
              Enter the Giveaway
            </span>
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
            />
            <GreenCtaCorners />
          </Link>
        </div>
      </div>
    </section>
  );
}
