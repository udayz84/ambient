"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { dmMono, gilroyMedium, gilroySemiBold, interRegular } from "../hero/fonts";
import { mediaUrl } from "@/lib/strapi";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { useFitText } from "../shared/FitText";
import { TabletScaleCanvas } from "../shared/TabletScaleCanvas";

const TITLE_GRADIENT =
  "linear-gradient(118.011deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const SECTION_HEADING = "Run any model. Keep all four advantages";
const FALLBACK_SUBTITLE =
  "Don't spend your first day writing sensor configuration code. The Cranium board comes ready to run out of the box, allowing you to instantly test physical AI models and validate performance on the metal with zero setup required.";

const IMG_OVERLAY_1 =
  "linear-gradient(185.768deg, rgb(0, 0, 0) 6.3744%, rgba(0, 0, 0, 0) 20.894%)";

const CARD_BG = `bg-gradient-to-b from-[#0c160b] to-[rgba(12,22,11,0)] rounded-[1px] overflow-clip`;

function CardAbstractBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-[-193.36px] top-[-264.21px] flex h-[545.963px] w-[464.057px] items-center justify-center"
    >
      <div className="flex-none rotate-[56.66deg]">
        <div className="relative h-[221.394px] w-[507.857px]">
          <div className="absolute inset-[-18.07%_-20.35%_-7.18%_-20.8%]">
            <img loading="lazy" decoding="async"
              alt=""
              src="/applications/wearables/abstract-design-card.svg"
              className="block size-full max-w-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({
  label,
  width,
}: {
  label: string;
  width: number;
}) {
  return (
    <div
      className="relative flex items-center justify-center h-[26px] shrink-0 overflow-clip bg-[rgba(255,255,255,0.06)] border-[0.5px] border-[rgba(255,255,255,0.2)]"
      style={{ width }}
      data-name="Menu"
    >
      <Corners
        leftSrc="/applications/wearables/vector-47.svg"
        rightSrc="/applications/wearables/vector-46.svg"
      />
      <p
        className={`${dmMono.className} text-[13px] leading-none font-normal tracking-[-0.39px] text-[#ecfae5] uppercase whitespace-nowrap not-italic`}
      >
        {label}
      </p>
      <div className="absolute top-1/2 left-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
      <div className="absolute top-1/2 right-[7.52px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
    </div>
  );
}

/* ── Top Card 1: Health Monitoring ───────────────────────────── */
/* ── Usage Bar Segment ───────────────────────────────────────── */
/* ── Top Card 2: Power Consumption ───────────────────────────── */
/* ── Top Card 3: Workload Diagram ────────────────────────────── */
/* ── Bottom Row: ECG Cards (Figma 4016:3927) ──────────────────── */

/** Figma frames — per-card image geometry/flip/overlay (4495-series exact). */
const ECG_FRAMES = [
  {
    left: 17, top: -21.34, width: 283.436, height: 283.436, flip: false,
    overlay:
      "linear-gradient(185.76783545534857deg, rgb(0, 0, 0) 6.3744%, rgba(0, 0, 0, 0) 20.894%)",
  },
  {
    left: 99, top: 19, width: 226, height: 248, flip: false,
    overlay:
      "linear-gradient(182.2900546834888deg, rgba(0, 0, 0, 0) 92.004%, rgb(0, 0, 0) 97.525%), linear-gradient(186.32495523424234deg, rgb(0, 0, 0) 6.3744%, rgba(0, 0, 0, 0) 20.894%)",
  },
  {
    left: 119.56, top: 49.81, width: 215.806, height: 185.59,
    overlay: undefined,
  },
  {
    left: 93, top: -1, width: 250, height: 275, flip: false,
    overlay:
      "linear-gradient(182.29558921819648deg, rgba(0, 0, 0, 0) 92.004%, rgb(0, 0, 0) 97.525%), linear-gradient(186.3401330835094deg, rgb(0, 0, 0) 6.3744%, rgba(0, 0, 0, 0) 20.894%)",
  },
];

const SECTION_EYEBROW = "The on-device advantage";
const SMART_HOME_SUBTITLE =
  "Take one always-on workload — continuous wake-word + presence detection — and look at what it costs to run. This is why Ambient devices can go cordless.";

const SMART_HOME_ECG_CARDS = [
  {
    badge: "THE WORKLOAD",
    badgeWidth: 140,
    stat: "24/7",
    title: "Wake-word + presence",
    description: "Continuous, local wake-word detection + on-device presence running nonstop.",
    image: "/applications/smart-homes/empirical-card-1.jpg",
  },
  {
    badge: "AMBIENT (GPX)",
    badgeWidth: 145,
    stat: "<1mW",
    title: "Battery-powered AI",
    description: "Runs the full workload locally, enabling unplugged smart-home devices.",
    image: "/applications/smart-homes/empirical-card-2.jpg",
  },
  {
    badge: "LEGACY APP PROCESSOR",
    badgeWidth: 195,
    stat: "PLUGGED-IN",
    title: "Must stay powered",
    description: "Continuous audio and vision keep the processor awake, driving mains-powered designs.",
    image: "/applications/smart-homes/empirical-card-3.jpg",
  },
  {
    badge: "100% LOCAL",
    badgeWidth: 120,
    stat: "NO CLOUD",
    title: "Private, event-gated",
    description: "Data stays in the room. The Wi-Fi SoC wakes only on a verified command.",
    image: "/applications/smart-homes/empirical-card-4.jpg",
  },
];

const ECG_FALLBACKS = [
  {
    badge: "CONTINUOUS SENSING", badgeWidth: 172, stat: "24/7",
    title: "Always-on activity recognition",
    description: "Detect steps, workouts, swim strokes and daily movements continuously on-device, with no cloud dependency.",
    image: "/applications/wearables/ecg-card-1.webp",
  },
  {
    badge: "ULTRA-LOW POWER", badgeWidth: 152, stat: "<1mW",
    title: "Multi-sensor inference",
    description: "Run advanced models for heart rate, SpO2 and temperature while keeping power consumption ultra-low for longer battery life.",
    image: "/applications/wearables/ecg-card-2.webp",
  },
  {
    badge: "EVENT-DRIVEN AI", badgeWidth: 152, stat: "Only on event",
    title: "Smart wake and alert",
    description: "The device stays in low-power mode and activates AI only when a meaningful activity, fall or health event is detected.",
    image: "/applications/wearables/ecg-card-3.webp",
  },
  {
    badge: "LOCAL & PRIVATE", badgeWidth: 152, stat: "100%",
    title: "No cloud dependency",
    description: "Your data stays on your wrist. Sensitive health and activity data is processed locally, ensuring complete privacy and low latency.",
    image: "/applications/wearables/ecg-card-4.webp",
  },
];

const INDUSTRIAL_CARD_IMAGES = [
  "/applications/industrial-iot/empirical-card-1.jpg",
  "/applications/industrial-iot/empirical-card-2.jpg",
  "/applications/industrial-iot/empirical-card-3.jpg",
  "/applications/industrial-iot/empirical-card-4.jpg",
];

const INDUSTRIAL_FALLBACKS = [
  {
    badge: "CONTINUOUS AI", badgeWidth: 133, stat: "24/7",
    title: "Always-on fault detection",
    description: "Runs bearing, vibration, and anomaly detection continuously on-node, without waiting for a cloud round trip.",
    image: "/applications/industrial-iot/empirical-card-1.jpg",
  },
  {
    badge: "POWER EFFICIENCY", badgeWidth: 150, stat: "<80 µW",
    title: "Microwatt-level inference",
    description: "Keeps industrial AI models active in the background while using a fraction of the power required by conventional edge processing.",
    image: "/applications/industrial-iot/empirical-card-2.jpg",
  },
  {
    badge: "SMART TRANSMISSION", badgeWidth: 170, stat: "Only on fault",
    title: "Event-gated radio",
    description: "The gateway wakes only when a verified anomaly is detected, reducing bandwidth, infrastructure load, and wasted transmissions.",
    image: "/applications/industrial-iot/empirical-card-3.jpg",
  },
  {
    badge: "LOCAL AI", badgeWidth: 133, stat: "100%",
    title: "No telemetry flood",
    description: "Raw vibration, acoustic, and thermal data stay local. Only classified faults are transmitted for action.",
    image: "/applications/industrial-iot/empirical-card-4.jpg",
  },
];

function SmartHomeCard({
  index,
  badge,
  badgeWidth,
  stat,
  title,
  description,
  imageSrc,
}: {
  index: number;
  badge: string;
  badgeWidth: number;
  stat: string;
  title: string;
  description: string;
  imageSrc: string;
}) {
  return (
    <div
      className="relative flex flex-col h-[370px] w-[301px] shrink-0 rounded-[2px] overflow-hidden border border-[rgba(255,255,255,0.08)] bg-gradient-to-b from-[#0c160b] to-[#040804]"
      data-name="Card"
    >
      <CardAbstractBg />

      {/* Top Image */}
      <div className="relative w-full h-[185px] shrink-0 overflow-hidden bg-black">
        <img
          loading="lazy"
          decoding="async"
          alt={title}
          src={imageSrc}
          className="size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#091208] via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Badge overlaid top left */}
      <div className="absolute left-[14px] top-[14px] z-10 flex items-center">
        <Badge label={badge} width={badgeWidth} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col items-start px-[20px] pt-[24px] pb-[18px]">
        <p
          className={`${gilroySemiBold.className} ${
            index === 2 ? "text-[26px] leading-[32px]" : index === 3 ? "text-[28px] leading-[34px]" : "text-[36px] leading-[40px]"
          } tracking-[-0.5px] text-white not-italic`}
        >
          {stat}
        </p>

        <p
          className={`${gilroyMedium.className} text-[17px] leading-[22px] text-white not-italic mt-[8px]`}
        >
          {title}
        </p>

        <p
          className={`${interRegular.className} text-[12.5px] leading-[18px] text-[#a1a89f] not-italic mt-[6px] [word-break:break-word]`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

function SmartHomeCardMobile({
  index,
  badge,
  badgeWidth,
  stat,
  title,
  description,
  imageSrc,
}: {
  index: number;
  badge: string;
  badgeWidth: number;
  stat: string;
  title: string;
  description: string;
  imageSrc: string;
}) {
  return (
    <div
      className="relative flex flex-col w-[290px] max-w-[85vw] shrink-0 snap-center rounded-[2px] overflow-hidden border border-[rgba(255,255,255,0.08)] bg-gradient-to-b from-[#0c160b] to-[#040804] pb-[18px]"
      data-name="Card"
    >
      <CardAbstractBg />

      {/* Top Image */}
      <div className="relative w-full h-[190px] shrink-0 overflow-hidden bg-black">
        <img
          loading="lazy"
          decoding="async"
          alt={title}
          src={imageSrc}
          className="size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#091208] via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Badge overlaid top left */}
      <div className="absolute left-[14px] top-[14px] z-10 flex items-center">
        <Badge label={badge} width={badgeWidth} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start px-[18px] pt-[20px]">
        <p
          className={`${gilroySemiBold.className} ${
            index === 2 ? "text-[26px] leading-[32px]" : index === 3 ? "text-[28px] leading-[34px]" : "text-[34px] leading-[40px]"
          } text-white`}
        >
          {stat}
        </p>
        <p className={`${gilroyMedium.className} text-[17px] leading-[22px] text-white mt-[8px]`}>
          {title}
        </p>
        <p className={`${interRegular.className} text-[12.5px] leading-[18px] text-[#a1a89f] mt-[6px]`}>
          {description}
        </p>
      </div>
    </div>
  );
}

function EcgCard({
  index,
  imageSrc,
  badge,
  badgeWidth,
  stat,
  title,
  description,
  isSmartHome,
  isIndustrial,
  isHearables,
  isWearablesOnly,
}: {
  index: number;
  imageSrc: string;
  badge: string;
  badgeWidth: number;
  stat: string;
  title: string;
  description: string;
  isSmartHome?: boolean;
  isIndustrial?: boolean;
  isHearables?: boolean;
  isWearablesOnly?: boolean;
  tags?: { icon: string; label: string }[];
}) {
  const frame = ECG_FRAMES[index];
  const statLeft = isSmartHome ? 18 : isIndustrial ? 18 : (index === 2 ? 19 : 26);
  const statTop = isSmartHome ? 180 : (index === 2 ? 219 : 216);
  const descWidth = isSmartHome ? 265 : (index === 2 || index === 3 ? 260 : 258);
  const textBottom = isSmartHome ? 16 : (index === 2 ? 14 : 21);
  return (
    <div
      className={`relative ${isIndustrial ? "min-h-[378px]" : "min-h-[370px]"} w-[301px] shrink-0 overflow-clip rounded-[1px] bg-gradient-to-b from-[#0c160b] to-[rgba(12,22,11,0)]`}
      data-name="Card"
    >
      <CardAbstractBg />
      {/* Image — 4016:3933 / 4016:3954 / 4016:3975 / 4016:3997 */}
      {isIndustrial || isHearables || isWearablesOnly ? (
        /* Full-width photo */
        <div className="pointer-events-none absolute left-0 top-0 h-[185px] w-full overflow-hidden" aria-hidden>
          <img loading="lazy" decoding="async" alt="" src={imageSrc} className="absolute inset-0 size-full max-w-none object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c160b] via-transparent to-transparent" />
        </div>
      ) : (
        <div
          className="pointer-events-none absolute mix-blend-lighten"
          style={{ left: frame.left, top: frame.top, width: frame.width, height: frame.height }}
          aria-hidden
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img loading="lazy" decoding="async" alt="" src={imageSrc} className="absolute inset-0 size-full max-w-none object-contain" />
          </div>
          {frame.overlay ? (
            <div className="absolute inset-0" style={{ backgroundImage: frame.overlay }} />
          ) : null}
        </div>
      )}
      {/* Accent image (card 3 only) — 4016:3991 */}
      {!isSmartHome && !isIndustrial && !isHearables && !isWearablesOnly && index === 2 ? (
        <div className="pointer-events-none absolute left-[43px] top-[63px] h-[70px] w-[73px]" aria-hidden>
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img loading="lazy" decoding="async"
              alt=""
              src="/applications/wearables/ecg-card-3-accent.webp"
              className="absolute inset-0 size-full max-w-none object-cover"
            />
          </div>
        </div>
      ) : null}
      {/* Badge — 4016:3934 */}
      <div
        className="absolute flex items-center z-10"
        style={{ left: 14, top: 16 }}
      >
        <Badge label={badge} width={badgeWidth} />
      </div>
      {/* Circular progress — only for wearables */}
      {isWearablesOnly && (
        <>
          <div className="absolute left-[18px] top-[182px] flex size-[36px] items-center justify-center">
            <div className="-rotate-90 flex-none">
              <div className="relative size-[36px]">
                <img loading="lazy" decoding="async" alt="" src="/applications/wearables/ellipse-1.svg" className="absolute inset-0 block size-full max-w-none" />
              </div>
            </div>
          </div>
          <div className="absolute left-[18px] top-[182px] flex size-[36px] items-center justify-center">
            <div className="-rotate-90 flex-none">
              <div className="relative size-[36px]">
                <img loading="lazy" decoding="async" alt="" src="/applications/wearables/ellipse-2.svg" className="absolute inset-0 block size-full max-w-none" />
              </div>
            </div>
          </div>
        </>
      )}
      {!isSmartHome && !isWearablesOnly && (
        <>
          <div className="absolute left-[16px] top-[164px] flex size-[40px] items-center justify-center">
            <div className="-rotate-90 flex-none">
              <div className="relative size-[40px]">
                <img loading="lazy" decoding="async" alt="" src="/applications/wearables/ellipse-1.svg" className="absolute inset-0 block size-full max-w-none" />
              </div>
            </div>
          </div>
          <div className="absolute left-[16px] top-[164px] flex size-[40px] items-center justify-center">
            <div className="-rotate-90 flex-none">
              <div className="relative size-[40px]">
                <img loading="lazy" decoding="async" alt="" src="/applications/wearables/ellipse-2.svg" className="absolute inset-0 block size-full max-w-none" />
              </div>
            </div>
          </div>
        </>
      )}
      {isIndustrial ? (
        <div className="absolute left-[18px] top-[208px] flex w-[265px] flex-col items-start">
          <p
            className={`${gilroySemiBold.className} text-white whitespace-nowrap not-italic ${
              index === 2 ? "text-[28px] leading-[34px]" : "text-[36px] leading-[40px]"
            }`}
          >
            {stat}
          </p>
          <p className={`${gilroyMedium.className} w-full text-[16px] leading-[22px] text-white whitespace-nowrap overflow-hidden text-ellipsis mt-[6px]`}>
            {title}
          </p>
          <p
            className={`${interRegular.className} text-[12px] leading-[17px] text-[rgba(255,255,255,0.6)] [word-break:break-word] mt-[5px]`}
            style={{ width: descWidth }}
          >
            {description}
          </p>
        </div>
      ) : isWearablesOnly ? (
        <>
          {/* Stat */}
          <p
            className={`${gilroySemiBold.className} absolute text-white whitespace-nowrap not-italic ${
              index === 2 ? "text-[28px] leading-[36px]" : "text-[36px] leading-[36px]"
            }`}
            style={{ left: 64, top: 182 }}
          >
            {stat}
          </p>
          {/* Title & Description */}
          <div
            className={`${interRegular.className} absolute left-[18px] flex w-[265px] flex-col items-start gap-[4px] font-normal not-italic`}
            style={{ bottom: 16 }}
          >
            <p className="w-full text-[16px] leading-[22px] font-medium text-white [word-break:break-word]">{title}</p>
            <p className="w-full text-[12px] leading-[17px] text-[rgba(255,255,255,0.6)] [word-break:break-word]">
              {description}
            </p>
          </div>
        </>
      ) : (
        <>
          {/* Stat — 4016:3946 */}
          <p
            className={`${gilroySemiBold.className} absolute text-white whitespace-nowrap not-italic ${
              isSmartHome
                ? (index === 2 ? "text-[26px]" : index === 3 ? "text-[30px]" : "text-[38px]")
                : (index === 2 ? "text-[30px]" : "text-[40px]")
            }`}
            style={{ left: statLeft, top: statTop }}
          >
            {stat}
          </p>
          {/* Description — 4016:3943 */}
          <div
            className={`${interRegular.className} absolute left-[18px] flex w-[265px] flex-col items-start gap-[6px] font-normal not-italic`}
            style={{ bottom: textBottom }}
          >
            <p className="w-full text-[16px] leading-[24px] text-white whitespace-nowrap overflow-hidden text-ellipsis">{title}</p>
            <p className="text-[12px] leading-[18px] text-[rgba(255,255,255,0.6)] [word-break:break-word]" style={{ width: descWidth }}>
              {description}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

/* ── Mobile variants ─────────────────────────────────────────── */
function EcgCardMobile({
  imageSrc,
  badge,
  badgeWidth,
  stat,
  title,
  description,
  isSmartHome,
  isIndustrial,
  isHearables,
  isWearablesOnly,
}: {
  imageSrc: string;
  badge: string;
  badgeWidth: number;
  stat: string;
  title: string;
  description: string;
  isSmartHome?: boolean;
  isIndustrial?: boolean;
  isHearables?: boolean;
  isWearablesOnly?: boolean;
}) {
  return (
    <div className={`relative min-h-[340px] w-[290px] max-w-[85vw] shrink-0 snap-center ${CARD_BG}`}>
      <CardAbstractBg />
      <Corners
        leftSrc="/applications/wearables/vector-47.svg"
        rightSrc="/applications/wearables/vector-46.svg"
      />
      {isIndustrial || isHearables || isWearablesOnly ? (
        /* Full-width photo for CMS-rendered 4:3 images */
        <div className="pointer-events-none absolute left-0 top-0 h-[160px] w-full overflow-hidden" aria-hidden>
          <img loading="lazy" decoding="async" alt="" src={imageSrc} className="absolute inset-0 size-full max-w-none object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c160b] via-transparent to-transparent" />
        </div>
      ) : (
        <div
          className="pointer-events-none absolute left-1/2 top-[-12px] flex w-[220px] -translate-x-1/2 items-center justify-center mix-blend-lighten"
          aria-hidden
        >
          <div className="relative h-[220px] w-full scale-85">
            <img loading="lazy" decoding="async" alt="" src={imageSrc} className="absolute inset-0 size-full max-w-none object-contain" />
            <div className="absolute inset-0" style={{ backgroundImage: IMG_OVERLAY_1 }} />
          </div>
        </div>
      )}
      <div className="absolute left-[14px] top-[14px] flex items-center z-10">
        <Badge label={badge} width={badgeWidth} />
      </div>
      {isWearablesOnly ? (
        <>
          <div className="absolute left-[14px] top-[168px] flex size-[32px] items-center justify-center">
            <div className="-rotate-90 flex-none">
              <div className="relative size-[32px]">
                <img loading="lazy" decoding="async" alt="" src="/applications/wearables/ellipse-1.svg" className="absolute inset-0 block size-full max-w-none" />
              </div>
            </div>
          </div>
          <div className="absolute left-[14px] top-[168px] flex size-[32px] items-center justify-center">
            <div className="-rotate-90 flex-none">
              <div className="relative size-[32px]">
                <img loading="lazy" decoding="async" alt="" src="/applications/wearables/ellipse-2.svg" className="absolute inset-0 block size-full max-w-none" />
              </div>
            </div>
          </div>
          <p
            className={`${gilroySemiBold.className} absolute left-[56px] top-[168px] text-[28px] leading-[32px] text-white whitespace-nowrap not-italic`}
          >
            {stat}
          </p>
          <div
            className={`${interRegular.className} absolute left-[14px] flex w-[calc(100%-28px)] flex-col items-start gap-[6px] pb-[16px] pt-[212px] font-normal not-italic`}
          >
            <p className="w-full text-[16px] leading-[22px] font-medium text-white">{title}</p>
            <p className="w-full text-[12px] leading-[18px] text-[rgba(255,255,255,0.6)]">
              {description}
            </p>
          </div>
        </>
      ) : isIndustrial ? (
        <div className="relative z-10 flex flex-col items-start px-[14px] pt-[166px] pb-[16px]">
          <p className={`${gilroySemiBold.className} text-[28px] leading-[34px] text-white whitespace-nowrap not-italic`}>
            {stat}
          </p>
          <p className={`${gilroyMedium.className} w-full text-[16px] leading-[22px] text-white mt-[6px]`}>
            {title}
          </p>
          <p className={`${interRegular.className} w-full text-[12px] leading-[18px] text-[rgba(255,255,255,0.6)] mt-[6px]`}>
            {description}
          </p>
        </div>
      ) : (
        <>
          {!isSmartHome && (
            <>
              <div className="absolute left-[14px] top-[124px] flex size-[32px] items-center justify-center">
                <div className="-rotate-90 flex-none">
                  <div className="relative size-[32px]">
                    <img loading="lazy" decoding="async" alt="" src="/applications/wearables/ellipse-1.svg" className="absolute inset-0 block size-full max-w-none" />
                  </div>
                </div>
              </div>
              <div className="absolute left-[14px] top-[124px] flex size-[32px] items-center justify-center">
                <div className="-rotate-90 flex-none">
                  <div className="relative size-[32px]">
                    <img loading="lazy" decoding="async" alt="" src="/applications/wearables/ellipse-2.svg" className="absolute inset-0 block size-full max-w-none" />
                  </div>
                </div>
              </div>
            </>
          )}
          <p
            className={`${gilroySemiBold.className} absolute left-[14px] top-[124px] text-[28px] leading-[normal] text-white whitespace-nowrap not-italic`}
          >
            {stat}
          </p>
          <div
            className={`${interRegular.className} absolute left-[14px] flex w-[calc(100%-28px)] flex-col items-start gap-[6px] pb-[14px] pt-[170px] font-normal not-italic`}
          >
            <p className="w-full text-[16px] leading-[24px] text-white">{title}</p>
            <p className="w-full text-[12px] leading-[18px] text-[rgba(255,255,255,0.6)]">
              {description}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

const HEARABLES_CARD_IMAGES = [
  "/applications/hearables/1.jpeg",
  "/applications/hearables/2.jpeg",
  "/applications/hearables/3.jpeg",
  "/applications/hearables/4.jpeg",
];

const WEARABLES_CARD_IMAGES = [
  "/applications/wearables/wearables-advantage-1.webp",
  "/applications/wearables/wearables-advantage-2.webp",
  "/applications/wearables/wearables-advantage-3.webp",
  "/applications/wearables/wearables-advantage-4.webp",
];

export function WearablesEmpiricalProof({ data, slug }: { data?: any; slug?: string }) {
  const isSmartHome = Boolean(
    (slug && (slug === "smarthomes" || slug === "smart-homes" || slug.includes("home"))) ||
    data?.heading?.includes("plugged-in")
  );
  const isIndustrial = Boolean(
    slug && (slug === "industrial_iot" || slug === "industrial-iot" || slug.includes("industrial"))
  );
  const isHearables = Boolean(
    (slug && (slug === "hearables" || slug.includes("hearable"))) ||
    data?.heading?.includes("audio") ||
    data?.subtitle?.includes("audio")
  );
  const isWearablesOnly = !isSmartHome && !isIndustrial && !isHearables;
  const eyebrow = SECTION_EYEBROW;
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 1 });
  const fitRef2 = useFitText<HTMLHeadingElement>({ maxLines: 2 });

  const heading = SECTION_HEADING;
  const subtitle = isSmartHome ? SMART_HOME_SUBTITLE : isIndustrial ? "" : (data?.subtitle || FALLBACK_SUBTITLE);
  const dataEcgCards: any[] = Array.isArray(data?.ecg_cards) ? data.ecg_cards : [];

  const [activeMobileCard, setActiveMobileCard] = useState(0);

  const mobileCardsCount = isSmartHome ? SMART_HOME_ECG_CARDS.length : 4;

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const cardWidth = 290 + 16;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveMobileCard(Math.max(0, Math.min(index, mobileCardsCount - 1)));
  };
  const fallbackList = isIndustrial ? INDUSTRIAL_FALLBACKS : ECG_FALLBACKS;
  const ecgCards = Array.from({ length: 4 }).map((_, i) => {
    const c = dataEcgCards[i];
    const fb = fallbackList[i];
    if (isIndustrial) {
      return {
        imageSrc: INDUSTRIAL_CARD_IMAGES[i],
        badge: fb.badge,
        badgeWidth: fb.badgeWidth,
        stat: fb.stat,
        title: fb.title,
        description: fb.description,
      };
    }
    if (isWearablesOnly) {
      return {
        imageSrc: WEARABLES_CARD_IMAGES[i],
        badge: fb.badge,
        badgeWidth: fb.badgeWidth,
        stat: fb.stat,
        title: fb.title,
        description: fb.description,
      };
    }
    return {
      imageSrc: isHearables ? HEARABLES_CARD_IMAGES[i] : (mediaUrl(c?.image) || fb.image),
      badge: c?.badge || fb.badge,
      badgeWidth: fb.badgeWidth,
      stat: c?.stat || fb.stat,
      title: c?.title || fb.title,
      description: c?.description || fb.description,
    };
  });

  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="2701:3790"
      data-name="The Empirical Proof"
      aria-label="The Empirical Proof"
    >
      {/* DESKTOP (>=600px) */}
      {isSmartHome ? (
        <TabletScaleCanvas className="relative hidden w-[1440px] shrink-0 flex-col items-center pt-[44px] pb-[56px] min-[600px]:flex">
          {/* Top decorative SVG */}
          <div
            className="pointer-events-none absolute top-[-26.9px] left-1/2 h-[320px] w-[881.616px] -translate-x-1/2"
            data-name="Abstract Design"
          >
            <img loading="lazy" decoding="async"
              alt=""
              src="/applications/wearables/abstract-design-top.svg"
              className="absolute inset-0 block size-full max-w-none"
              aria-hidden
            />
          </div>

          {/* Section title */}
          <div className="flex flex-col items-center justify-center gap-[16px] w-full max-w-[1100px] px-[20px] z-10">
            <div className="relative flex items-center justify-center h-[26px] shrink-0 overflow-clip bg-[rgba(255,255,255,0.06)] border-[0.5px] border-[rgba(255,255,255,0.2)] px-[18px]">
              <Corners
                leftSrc="/applications/wearables/vector-47.svg"
                rightSrc="/applications/wearables/vector-46.svg"
              />
              <p className={`${dmMono.className} text-[13px] leading-none font-normal tracking-[-0.39px] text-[#ecfae5] uppercase whitespace-nowrap not-italic`}>
                {eyebrow}
              </p>
              <div className="absolute top-1/2 left-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
              <div className="absolute top-1/2 right-[7.52px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
            </div>

            <div className="relative flex flex-col items-center px-[16px] py-[6px] w-fit" data-name="Title">
              <h2
                className={`${gilroyMedium.className} bg-clip-text text-center font-medium text-transparent not-italic [word-break:break-word] text-[34px] min-[1280px]:text-[42px] leading-[1.25]`}
                style={{
                  backgroundImage: TITLE_GRADIENT,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                {heading}
              </h2>
              <Corners
                leftSrc="/applications/wearables/vector-42.svg"
                rightSrc="/applications/wearables/vector-43.svg"
              />
            </div>
            <p
              className={`${interRegular.className} text-center text-[15px] leading-[24px] text-[#c5cdc3] not-italic [word-break:break-word] max-w-[760px]`}
            >
              {subtitle}
            </p>
          </div>

          {/* Bottom row — 4 cards */}
          <div className="flex gap-[20px] mt-[36px] z-10">
            {SMART_HOME_ECG_CARDS.map((card, i) => (
              <SmartHomeCard
                key={i}
                index={i}
                badge={card.badge}
                badgeWidth={card.badgeWidth}
                stat={card.stat}
                title={card.title}
                description={card.description}
                imageSrc={card.image}
              />
            ))}
          </div>
        </TabletScaleCanvas>
      ) : (
        <TabletScaleCanvas className={`relative hidden w-[1440px] shrink-0 min-[600px]:block ${isWearablesOnly ? "h-[675px]" : isIndustrial ? "h-[715px]" : "h-[790px]"}`}>
          {/* Top decorative SVG */}
          <div
            className="pointer-events-none absolute top-[-26.9px] left-1/2 h-[320px] w-[881.616px] -translate-x-1/2"
            data-name="Abstract Design"
          >
            <img loading="lazy" decoding="async"
              alt=""
              src="/applications/wearables/abstract-design-top.svg"
              className="absolute inset-0 block size-full max-w-none"
              aria-hidden
            />
          </div>

          {/* Section title */}
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-[20px] top-[103.1px]">
            {/* Eyebrow */}
            <div className="relative flex items-center justify-center h-[26px] shrink-0 overflow-clip bg-[rgba(255,255,255,0.06)] border-[0.5px] border-[rgba(255,255,255,0.2)] px-[18px]">
              <Corners
                leftSrc="/applications/wearables/vector-47.svg"
                rightSrc="/applications/wearables/vector-46.svg"
              />
              <p className={`${dmMono.className} text-[13px] leading-none font-normal tracking-[-0.39px] text-[#ecfae5] uppercase whitespace-nowrap not-italic`}>
                {eyebrow}
              </p>
              <div className="absolute top-1/2 left-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
              <div className="absolute top-1/2 right-[7.52px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
            </div>
            <div className="relative flex flex-col items-center px-[10px]" data-name="Title">
              <h2
                ref={fitRef}
                className={`${gilroyMedium.className} bg-clip-text text-center font-medium text-transparent not-italic [word-break:break-word] text-[46px] leading-[49px] whitespace-nowrap`}
                style={{
                  backgroundImage: TITLE_GRADIENT,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                {heading}
              </h2>
              <Corners
                leftSrc="/applications/wearables/vector-42.svg"
                rightSrc="/applications/wearables/vector-43.svg"
              />
            </div>
            {!isWearablesOnly && !isIndustrial && (
              <p
                className={`${interRegular.className} text-center text-[16px] leading-[24px] text-[#f0f0f0] not-italic [word-break:break-word] w-[650px]`}
              >
                {subtitle}
              </p>
            )}
          </div>

          {/* Bottom row — 4 cards */}
          <div className={`absolute left-1/2 flex -translate-x-1/2 gap-[20.67px] ${isWearablesOnly || isIndustrial ? "top-[230px]" : "top-[345px]"}`}>
            {ecgCards.map((card, i) => (
              <EcgCard
                key={i}
                index={i}
                imageSrc={card.imageSrc}
                badge={card.badge}
                badgeWidth={card.badgeWidth}
                stat={card.stat}
                title={card.title}
                description={card.description}
                isSmartHome={false}
                isIndustrial={isIndustrial}
                isHearables={isHearables}
                isWearablesOnly={isWearablesOnly}
              />
            ))}
          </div>

          {/* Industrial CTAs */}
          {isIndustrial && (
            <div className="absolute left-1/2 top-[632px] z-10 flex -translate-x-1/2 items-center gap-[16px]">
              <a
                href="#"
                className={`${gilroyMedium.className} relative flex h-[44px] items-center justify-center px-[20px] cursor-pointer overflow-hidden shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
              >
                <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
                <GreenCtaCorners />
                <span className="relative z-10 whitespace-nowrap text-[13px] leading-[28px] font-medium text-white uppercase not-italic">
                  Download the Power Benchmark
                </span>
                <span aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]" />
              </a>
              <a
                href="#"
                className={`${gilroyMedium.className} relative flex h-[44px] items-center justify-center overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(226,241,202,0.12)] px-[20px]`}
              >
                <span className="relative z-10 whitespace-nowrap text-[13px] leading-[28px] font-medium text-white uppercase not-italic">
                  How A-Cube Works
                </span>
                <Corners
                  leftSrc="/applications/wearables/vector-47.svg"
                  rightSrc="/applications/wearables/vector-46.svg"
                />
              </a>
            </div>
          )}
        </TabletScaleCanvas>
      )}

      {/* MOBILE (<600px) */}
      <div className={`relative flex w-full flex-col items-center gap-[24px] px-[21px] pt-[30px] ${isSmartHome ? "pb-[36px]" : "pb-[72px]"} min-[600px]:hidden`}>

        {/* Title */}
        <div className="relative z-10 flex w-full max-w-[420px] flex-col items-center gap-[12px]">
          <div className="relative flex items-center justify-center h-[26px] shrink-0 overflow-clip bg-[rgba(255,255,255,0.06)] border-[0.5px] border-[rgba(255,255,255,0.2)] px-[18px]">
            <Corners
              leftSrc="/applications/wearables/vector-47.svg"
              rightSrc="/applications/wearables/vector-46.svg"
            />
            <p className={`${dmMono.className} text-[13px] leading-none font-normal tracking-[-0.39px] text-[#ecfae5] uppercase whitespace-nowrap not-italic`}>
              {eyebrow}
            </p>
            <div className="absolute top-1/2 left-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
            <div className="absolute top-1/2 right-[7.52px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
          </div>
          <div className="relative w-fit px-[12px] py-[6px]">
            <h2
              {...(!isSmartHome ? { ref: fitRef2 } : {})}
              className={`${gilroyMedium.className} flex items-center justify-center bg-clip-text text-center text-[26px] sm:text-[30px] leading-[34px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: "linear-gradient(107.4537261117953deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {heading}
            </h2>
            <Corners
              leftSrc="/applications/wearables/vector-42.svg"
              rightSrc="/applications/wearables/vector-43.svg"
            />
          </div>
          {!isWearablesOnly && !isIndustrial && (
            <p
              className={`${interRegular.className} w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic`}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Cards Carousel (mobile) */}
        <div
          onScroll={handleMobileScroll}
          className="relative z-10 flex w-[calc(100%+42px)] -mx-[21px] snap-x snap-mandatory gap-[16px] overflow-x-auto px-[21px] pb-[16px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {isSmartHome
            ? SMART_HOME_ECG_CARDS.map((card, i) => (
                <SmartHomeCardMobile
                  key={i}
                  index={i}
                  badge={card.badge}
                  badgeWidth={card.badgeWidth}
                  stat={card.stat}
                  title={card.title}
                  description={card.description}
                  imageSrc={card.image}
                />
              ))
            : ecgCards.map((card, i) => (
                <EcgCardMobile
                  key={i}
                  imageSrc={card.imageSrc}
                  badge={card.badge}
                  badgeWidth={card.badgeWidth}
                  stat={card.stat}
                  title={card.title}
                  description={card.description}
                  isSmartHome={false}
                  isIndustrial={isIndustrial}
                  isHearables={isHearables}
                  isWearablesOnly={isWearablesOnly}
                />
              ))}
        </div>

        {/* Carousel Pagination Dots */}
        {mobileCardsCount > 1 && (
          <div className="flex items-center justify-center gap-[6px] -mt-[8px]">
            {Array.from({ length: mobileCardsCount }).map((_, i) => (
              <div
                key={i}
                className={`h-[4px] rounded-full transition-all duration-300 ${
                  activeMobileCard === i ? "w-[20px] bg-[#6ced3f]" : "w-[6px] bg-white/20"
                }`}
              />
            ))}
          </div>
        )}

        {/* Industrial CTAs */}
        {isIndustrial && (
          <div className="relative z-10 flex w-full max-w-[352px] flex-col items-center gap-[12px]">
            <a
              href="#"
              className={`${gilroyMedium.className} relative flex h-[44px] w-full items-center justify-center cursor-pointer overflow-hidden shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
            >
              <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
              <GreenCtaCorners />
              <span className="relative z-10 whitespace-nowrap text-[13px] leading-[28px] font-medium text-white uppercase not-italic">
                Download the Power Benchmark
              </span>
              <span aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]" />
            </a>
            <a
              href="#"
              className={`${gilroyMedium.className} relative flex h-[44px] w-full items-center justify-center overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(226,241,202,0.12)] px-[20px]`}
            >
              <span className="relative z-10 whitespace-nowrap text-[13px] leading-[28px] font-medium text-white uppercase not-italic">
                How A-Cube Works
              </span>
              <Corners
                leftSrc="/applications/wearables/vector-47.svg"
                rightSrc="/applications/wearables/vector-46.svg"
              />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
