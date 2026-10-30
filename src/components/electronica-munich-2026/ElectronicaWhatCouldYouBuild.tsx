"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  gilroyBold,
  gilroyMedium,
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
  PRIMARY_CTA_INSET,
  PRIMARY_CTA_SHADOW,
} from "@/components/products-page/products-data";

type TagItem = {
  label: string;
  icon: string;
};

type ConstellationItem = {
  category: string;
  highlight: string;
  body: string;
  tags: TagItem[];
  image: string;
  link: string;
  hasSlug: boolean;
};

const CONSTELLATION_ITEMS: ConstellationItem[] = [
  {
    category: "Wearables",
    highlight: "90 days on 1 charge",
    body: "Always-on biometric tracking, fall detection, and gesture recognition running continuously on standard wearable batteries.",
    tags: [
      { label: "Biomarkers", icon: "/products/fullpicture/icon-temperature.svg" },
      { label: "Activity", icon: "/products/alwayson/icon-performance.svg" },
      { label: "Safety", icon: "/products/fullpicture/icon-security.svg" },
    ],
    image: "/applications/card-center.webp",
    link: "/applications/wearables",
    hasSlug: true,
  },
  {
    category: "Hearables",
    highlight: "<100µW active listening",
    body: "Always-on wake-word detection, voice isolation, and acoustic event classification on microscopic power budgets.",
    tags: [
      { label: "Wake Word", icon: "/technology/icon-speak-ai.svg" },
      { label: "Voice Isolation", icon: "/products/fullpicture/icon-control.svg" },
      { label: "Acoustic Events", icon: "/products/fullpicture/icon-sensing.svg" },
    ],
    image: "/applications/card-right-mid.webp",
    link: "/applications/hearables",
    hasSlug: false,
  },
  {
    category: "Smart Home",
    highlight: "Zero cloud lag",
    body: "True on-device voice command processing, presence detection, and environmental sensing with zero cloud dependency.",
    tags: [
      { label: "Presence", icon: "/products/fullpicture/icon-sensing.svg" },
      { label: "Offline Voice", icon: "/technology/icon-speak-ai.svg" },
      { label: "Security", icon: "/products/fullpicture/icon-security.svg" },
    ],
    image: "/applications/card-left-far.webp",
    link: "/applications/smarthomes",
    hasSlug: true,
  },
  {
    category: "Industrial IoT",
    highlight: "2+ years battery life",
    body: "Continuous high-frequency vibration anomaly detection, leak detection, and visual inspection directly on the factory floor.",
    tags: [
      { label: "Predictive Maint.", icon: "/products/fullpicture/icon-peripherals.svg" },
      { label: "Leak Detection", icon: "/products/fullpicture/icon-sensing.svg" },
      { label: "Inspection", icon: "/som/vision-icon.svg" },
    ],
    image: "/applications/card-left-mid.webp",
    link: "/applications/industrial-iot",
    hasSlug: true,
  },
  {
    category: "Medical Devices",
    highlight: "Sub-second alerts",
    body: "Clinical-grade continuous biosignal monitoring and real-time arrhythmia anomaly detection deployed in miniaturized patches.",
    tags: [
      { label: "Continuous Monitor", icon: "/products/fullpicture/icon-temperature.svg" },
      { label: "Anomaly Detect", icon: "/products/fullpicture/icon-sensing.svg" },
      { label: "Safety Certified", icon: "/products/fullpicture/icon-security.svg" },
    ],
    image: "/applications/app-medical.webp",
    link: "/applications/medical",
    hasSlug: false,
  },
  {
    category: "Robotics",
    highlight: "Deterministic latency",
    body: "Instantaneous multi-sensor fusion, tactile feedback, and complex kinematic control operating completely untethered.",
    tags: [
      { label: "Motion", icon: "/products/alwayson/icon-performance.svg" },
      { label: "Sensor Fusion", icon: "/products/fullpicture/icon-control.svg" },
      { label: "Local Decisions", icon: "/products/fullpicture/icon-peripherals.svg" },
    ],
    image: "/applications/dvk-m-humanoid.webp",
    link: "/applications/robotics",
    hasSlug: false,
  },
  {
    category: "Automotive",
    highlight: "Safety certified",
    body: "Ultra-low latency sensor fusion, continuous in-cabin driver monitoring, and acoustic safety alert classification.",
    tags: [
      { label: "In-Cabin", icon: "/products/fullpicture/icon-sensing.svg" },
      { label: "Driver Intel", icon: "/products/alwayson/icon-performance.svg" },
      { label: "Acoustics", icon: "/products/fullpicture/icon-security.svg" },
    ],
    image: "/electronica/automotive-fixed.webp",
    link: "/applications/automotive",
    hasSlug: false,
  },
  {
    category: "Drones & Aerospace",
    highlight: "Native edge flight",
    body: "High-speed object detection, obstacle avoidance, and autonomous navigation processed natively without draining flight batteries.",
    tags: [
      { label: "Object Detection", icon: "/som/vision-icon.svg" },
      { label: "Auto Navigation", icon: "/products/fullpicture/icon-control.svg" },
      { label: "Edge Compute", icon: "/products/fullpicture/icon-peripherals.svg" },
    ],
    image: "/applications/app-drones.webp",
    link: "/applications/drones",
    hasSlug: false,
  },
  {
    category: "Agriculture & Edge",
    highlight: "100% cloud-free",
    body: "Complex visual monitoring and behavioral livestock tracking deployed in remote environments where cloud connectivity is impossible.",
    tags: [
      { label: "Remote Sensing", icon: "/products/fullpicture/icon-sensing.svg" },
      { label: "Field Telemetry", icon: "/products/fullpicture/icon-peripherals.svg" },
      { label: "Custom Edge", icon: "/products/fullpicture/icon-control.svg" },
    ],
    image: "/applications/card-right-far.webp",
    link: "/applications/agriculture",
    hasSlug: false,
  },
];

export function ElectronicaWhatCouldYouBuild() {
  const [activeBuildIndex, setActiveBuildIndex] = useState(0);
  const buildCarouselRef = useRef<HTMLDivElement>(null);

  const handleBuildScroll = () => {
    if (!buildCarouselRef.current) return;
    const { scrollLeft } = buildCarouselRef.current;
    const index = Math.round(scrollLeft / 306);
    setActiveBuildIndex(Math.min(Math.max(index, 0), CONSTELLATION_ITEMS.length - 1));
  };

  const scrollToBuildCard = (index: number) => {
    buildCarouselRef.current?.scrollTo({
      left: index * 306,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="applications"
      aria-label="What could you build: One chip across products that listen, see, move, and react"
      className="relative flex w-full flex-col items-center overflow-hidden bg-black py-[60px] text-white min-[600px]:py-[50px]"
    >
      {/* Background Subtle Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(83, 216, 36, 0.05) 0%, rgba(0, 0, 0, 0) 65%)",
        }}
      />

      {/* =========================================================================
          DESKTOP & TABLET VIEWPORT (>= 600px)
          Canvas Width: 1440px (source of truth).
          TabletScaleCanvas scales down to tablet with 0px deviation.
          ========================================================================= */}
      <TabletScaleCanvas className="relative hidden w-[1440px] shrink-0 min-[600px]:flex min-[600px]:flex-col min-[600px]:px-[100px]">
        {/* Eyebrow (Centered) */}
        <div className="mb-[18px] flex w-full justify-center">
          <TagBadge
            label="ONE CHIP. MANY PRODUCTS."
            width="max-content"
            centerLabel
          />
        </div>

        {/* Header: Title then Subtitle Center-Aligned Vertically */}
        <div className="flex flex-col items-center text-center pb-[36px]">
          <div className="relative inline-flex flex-col items-center px-[28px] py-[16px]">
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            <h2
              className={`${gilroyBold.className} m-0 text-center text-[46px] font-bold leading-[52px] tracking-[-0.01em] text-white not-italic`}
            >
              If it can sense the world,
              <br />
              GPX can make it smarter.
            </h2>
          </div>

          <p
            className={`${interRegular.className} mt-[16px] max-w-[640px] text-center text-[16px] font-normal leading-[25px] text-[#f0f0f0] opacity-85`}
          >
            One programmable architecture, across products that listen, see,
            move, monitor, and react.
          </p>
        </div>

        {/* 3 Cards Per Row Grid — Minimal Hover, Clean Architecture */}
        <div className="grid grid-cols-3 gap-[26px]">
          {CONSTELLATION_ITEMS.map((item) => (
            <article
              key={item.category}
              className="relative flex min-h-[460px] flex-col justify-between overflow-hidden border-[0.5px] border-solid border-[rgba(240,240,240,0.18)] bg-[#0d0d0d] p-[24px] pt-[20px]"
            >
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />

              {/* Product Visual Area with Backlight Glow */}
              <div className="relative flex h-[180px] w-full shrink-0 items-center justify-center overflow-hidden">
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(83, 216, 36, 0.08) 0%, rgba(0, 0, 0, 0) 70%)",
                  }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.category}
                  className="relative z-10 max-h-[160px] max-w-[270px] object-contain"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[24px]"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(13,13,13,0) 0%, #0d0d0d 100%)",
                  }}
                />
              </div>

              {/* Content Block */}
              <div className="relative z-10 flex flex-1 flex-col justify-between pt-[14px]">
                <div>
                  {/* Category Title + Highlight Badge */}
                  <div className="flex items-center justify-between gap-[8px]">
                    <h3
                      className={`${gilroyMedium.className} text-[22px] font-medium leading-[28px] text-white`}
                    >
                      {item.category}
                    </h3>
                    <span
                      className={`${interMedium.className} shrink-0 rounded-[3px] border border-[#53d824]/40 bg-[#53d824]/10 px-[8px] py-[2px] text-[11px] font-medium tracking-[0.02em] text-[#53d824]`}
                    >
                      {item.highlight}
                    </span>
                  </div>

                  {/* Body Paragraph */}
                  <p
                    className={`${interRegular.className} mt-[10px] text-[14px] font-normal leading-[22px] text-[#c8d0db]`}
                  >
                    {item.body}
                  </p>

                  {/* Tags with Project Icons */}
                  <div className="mt-[16px] flex flex-wrap items-center gap-x-[16px] gap-y-[8px]">
                    {item.tags.map((tag) => (
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

                {/* Bottom Center-Aligned Global Green CTA Button */}
                <div className="mt-[22px] flex w-full justify-center">
                  {item.hasSlug ? (
                    <Link
                      href={item.link}
                      className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[38px] w-full max-w-[280px] items-center justify-center overflow-hidden transition-transform duration-200 hover:scale-[1.01]`}
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
                      />
                      <span className="relative text-[12px] font-semibold uppercase tracking-[0.03em] text-white not-italic">
                        Explore Application
                      </span>
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
                      />
                      <GreenCtaCorners />
                    </Link>
                  ) : (
                    <div
                      role="button"
                      tabIndex={0}
                      className={`${PRIMARY_CTA_SHADOW} group/btn relative flex h-[38px] w-full max-w-[280px] cursor-pointer items-center justify-center overflow-hidden transition-transform duration-200 hover:scale-[1.01]`}
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
                      />

                      {/* Default text */}
                      <span
                        className={`${gilroySemiBold.className} relative text-[12px] font-semibold uppercase tracking-[0.03em] text-white not-italic transition-all duration-200 group-hover/btn:opacity-0 group-hover/btn:scale-95`}
                      >
                        Explore Application
                      </span>

                      {/* Hover Coming Soon in Gothic */}
                      <span
                        className="pointer-events-none absolute inset-0 flex items-center justify-center text-[12px] font-bold uppercase tracking-[0.1em] text-white opacity-0 transition-all duration-200 group-hover/btn:opacity-100 group-hover/btn:scale-100 [font-family:'Century_Gothic','Gilroy-Bold',sans-serif]"
                      >
                        Coming Soon
                      </span>

                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
                      />
                      <GreenCtaCorners />
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Gesture Payoff Banner */}
        <div className="relative mt-[28px] flex items-center justify-between border-[0.5px] border-[#53d824]/50 bg-[#0a120a]/80 px-[28px] py-[16px]">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <div className="flex items-center gap-[14px]">
            <span
              className={`${interMedium.className} rounded-[3px] border border-[#53d824]/60 bg-[#53d824]/15 px-[8px] py-[2px] text-[11px] font-medium uppercase tracking-[0.05em] text-[#53d824]`}
            >
              GESTURE PAYOFF
            </span>
            <p
              className={`${interRegular.className} text-[14px] text-[#f0f0f0]`}
            >
              <strong
                className={`${gilroyMedium.className} font-medium text-white`}
              >
                Control a live demo with a flick of your wrist.
              </strong>{" "}
              See gesture recognition — and VAD, fall detection, and more —
              running on our silicon at Electronica.
            </p>
          </div>
          <div className="flex items-center gap-[16px]">
            <Link
              href="/contact#calendar"
              className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[40px] shrink-0 items-center justify-center overflow-hidden px-[22px] transition-transform duration-200 hover:scale-[1.01]`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
              />
              <span className="relative text-[12px] font-semibold uppercase tracking-[0.02em] text-white not-italic">
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
      </TabletScaleCanvas>

      {/* =========================================================================
          MOBILE VIEWPORT (< 600px)
          ========================================================================= */}
      <div className="relative flex w-full max-w-[440px] flex-col items-center px-[16px] min-[600px]:hidden">
        {/* Eyebrow */}
        <div className="mb-[18px]">
          <TagBadge
            label="ONE CHIP. MANY PRODUCTS."
            width="max-content"
            centerLabel
          />
        </div>

        {/* Title */}
        <div className="relative mb-[14px] inline-flex max-w-[340px] flex-col items-center p-[12px] px-[16px]">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyBold.className} m-0 w-full text-center text-[26px] font-bold leading-[32px] tracking-[-0.01em] text-white not-italic`}
          >
            If it can sense the world,
            <br />
            GPX can make it smarter.
          </h2>
        </div>

        {/* Subtitle */}
        <p
          className={`${interRegular.className} mb-[24px] max-w-[340px] text-center text-[14px] font-normal leading-[22px] text-[#f0f0f0] opacity-85`}
        >
          One programmable architecture, across products that listen, see, move,
          monitor, and react.
        </p>

        {/* Mobile Horizontal Snap Carousel */}
        <div
          ref={buildCarouselRef}
          onScroll={handleBuildScroll}
          className="-mx-[20px] flex w-[calc(100%+40px)] snap-x snap-mandatory gap-[16px] overflow-x-auto px-[20px] pb-[8px] pt-[2px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CONSTELLATION_ITEMS.map((item) => (
            <article
              key={item.category}
              className="relative flex w-[290px] shrink-0 snap-center flex-col justify-between overflow-hidden border border-solid border-[rgba(240,240,240,0.18)] bg-[#0d0d0d] p-[18px]"
            >
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />

              {/* Mobile Image */}
              <div className="relative flex h-[140px] w-full shrink-0 items-center justify-center overflow-hidden">
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(83, 216, 36, 0.08) 0%, rgba(0, 0, 0, 0) 70%)",
                  }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.category}
                  className="relative z-10 max-h-[130px] max-w-[210px] object-contain"
                />
              </div>

              {/* Text */}
              <div className="relative z-10 mt-[12px] flex flex-1 flex-col justify-between gap-[8px]">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-[8px]">
                    <h3
                      className={`${gilroyMedium.className} text-[18px] font-medium text-white`}
                    >
                      {item.category}
                    </h3>
                    <span
                      className={`${interMedium.className} shrink-0 rounded-[3px] border border-[#53d824]/40 bg-[#53d824]/10 px-[7px] py-[2px] text-[10px] font-medium text-[#53d824]`}
                    >
                      {item.highlight}
                    </span>
                  </div>
                  <p
                    className={`${interRegular.className} mt-[6px] text-[13px] leading-[20px] text-[#c8d0db]`}
                  >
                    {item.body}
                  </p>

                  {/* Mobile Tags with Icons */}
                  <div className="mt-[10px] flex flex-wrap items-center gap-x-[12px] gap-y-[6px]">
                    {item.tags.map((tag) => (
                      <div key={tag.label} className="flex items-center gap-[5px]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={tag.icon}
                          alt=""
                          aria-hidden="true"
                          className="size-[12px] shrink-0 opacity-80"
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

                {/* Mobile Button */}
                <div className="mt-[16px] flex w-full justify-center">
                  {item.hasSlug ? (
                    <Link
                      href={item.link}
                      className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[38px] w-full items-center justify-center overflow-hidden`}
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
                      />
                      <span className="relative text-[12px] font-semibold uppercase tracking-[0.03em] text-white not-italic">
                        Explore Application
                      </span>
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
                      />
                      <GreenCtaCorners />
                    </Link>
                  ) : (
                    <div
                      role="button"
                      tabIndex={0}
                      className={`${PRIMARY_CTA_SHADOW} group/mbtn relative flex h-[38px] w-full items-center justify-center overflow-hidden`}
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
                      />
                      <span
                        className={`${gilroySemiBold.className} relative text-[12px] font-semibold uppercase tracking-[0.03em] text-white not-italic transition-all duration-200 group-hover/mbtn:opacity-0`}
                      >
                        Explore Application
                      </span>
                      <span
                        className="pointer-events-none absolute inset-0 flex items-center justify-center text-[12px] font-bold uppercase tracking-[0.1em] text-white opacity-0 transition-all duration-200 group-hover/mbtn:opacity-100 [font-family:'Century_Gothic','Gilroy-Bold',sans-serif]"
                      >
                        Coming Soon
                      </span>
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
                      />
                      <GreenCtaCorners />
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="mt-[14px] flex items-center justify-center gap-[5px]">
          {CONSTELLATION_ITEMS.map((item, i) => (
            <button
              key={item.category}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollToBuildCard(i)}
              className={`h-[4px] rounded-full transition-all duration-300 ${
                i === activeBuildIndex ? "w-[18px] bg-[#53d824]" : "w-[5px] bg-white/20"
              }`}
            />
          ))}
        </div>

        {/* Mobile Gesture Payoff */}
        <div className="relative mt-[24px] flex w-full flex-col gap-[12px] border border-[#53d824]/40 bg-[#0d140d] p-[18px]">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <span
            className={`${interMedium.className} w-max rounded-[3px] border border-[#53d824]/60 bg-[#53d824]/15 px-[8px] py-[2px] text-[10px] font-medium uppercase tracking-[0.05em] text-[#53d824]`}
          >
            GESTURE PAYOFF
          </span>
          <p className={`${interRegular.className} text-[13px] leading-[20px] text-[#f0f0f0]`}>
            <strong
              className={`${gilroyMedium.className} font-medium text-white`}
            >
              Control a live demo with a flick of your wrist.
            </strong>{" "}
            See gesture recognition running on silicon at Electronica.
          </p>
          <Link
            href="/contact#calendar"
            className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[44px] w-full items-center justify-center overflow-hidden`}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
            />
            <span className="relative text-[13px] font-semibold uppercase tracking-[0.02em] text-white not-italic">
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
            {[...Array(4)].map((_, i) => (
              // eslint-disable-next-line @next/next/no-img-element
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

        {/* Global Green 'Explore Models Zoo' CTA Button */}
        <div className="mt-[28px] flex w-full justify-center px-[20px] pb-[16px]">
          <Link
            href="/model-zoo"
            className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[46px] w-full max-w-[280px] sm:w-auto sm:min-w-[240px] items-center justify-center overflow-hidden px-[36px] transition-transform duration-200 hover:scale-[1.02]`}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
            />
            <span className="relative text-[13px] sm:text-[14px] font-semibold uppercase tracking-[0.03em] text-white not-italic">
              Explore Models Zoo
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
