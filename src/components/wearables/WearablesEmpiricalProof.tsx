"use client";

/* eslint-disable @next/next/no-img-element */
import { dmMono, gilroyMedium, gilroySemiBold, interRegular } from "../hero/fonts";
import { mediaUrl } from "@/lib/strapi";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { useFitText } from "../shared/FitText";

const TITLE_GRADIENT =
  "linear-gradient(118.011deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const SECTION_HEADING = "Run any model. Keep all four advantages";
const FALLBACK_SUBTITLE =
  "Don't spend your first day writing sensor configuration code. The Cranium board comes ready to run out of the box, allowing you to instantly test physical AI models and validate performance on the metal with zero setup required.";

const IMG_OVERLAY_1 =
  "linear-gradient(185.768deg, rgb(0, 0, 0) 6.3744%, rgba(0, 0, 0, 0) 20.894%)";

const CARD_BORDER = "";
const CARD_BG = `bg-gradient-to-b from-[#0c160b] to-[rgba(12,22,11,0)] rounded-[1px] overflow-clip`;

const GREEN_BAR_SMALL =
  "bg-gradient-to-b from-[42.377%] from-[rgba(140,230,108,0.5)] to-[150.73%] to-[rgba(27,47,20,0.5)] mix-blend-luminosity";

const RED_DUAL =
  "linear-gradient(180deg, rgb(230, 108, 108) 42.377%, rgb(58, 19, 30) 150.73%), linear-gradient(180deg, rgb(230, 108, 141) 42.377%, rgb(58, 19, 30) 150.73%)";

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
function HealthCard({ data }: { data?: any }) {
  const badge = data?.badge || "The Workload";
  const title = data?.title || "Health Monitoring Solutions";
  const body =
    data?.body ||
    "Continuous, on-device assault detection and biomarker analysis for early onset predictions for PCOD/PCOS to enable 24/7 women health and safety";
  const ctaLabel = data?.cta_label || "Download Case Study";
  const footer =
    data?.footer || "Up to 2 weeks of continuous tracking with on-device AI.";
  return (
    <div
      className={`relative h-[364px] w-[575px] shrink-0 ${CARD_BG}`}
      data-node-id="2701:3885"
      data-name="Card"
    >
      <CardAbstractBg />
      {/* Badge */}
      <div className="absolute left-[35px] top-[33.74px] flex items-center gap-[27.778px]">
        <Badge label={badge} width={137} />
      </div>
      {/* Title + body */}
      <div
        className={`${gilroyMedium.className} absolute left-[35px] top-[87px] flex w-[477px] flex-col gap-[12px] items-start tracking-[-0.4539px] not-italic`}
        data-name="NewsSection"
      >
        <p className="w-[477px] text-[24px] leading-[28.295px] text-white [word-break:break-word]">
          {title}
        </p>
        <p
          className={`${interRegular.className} min-w-full w-[min-content] text-[16px] leading-[24px] text-[rgba(255,255,255,0.6)] [word-break:break-word]`}
        >
          {body}
        </p>
      </div>
      {/* CTA */}
      <a
        href="#"
        className={`${gilroyMedium.className} absolute left-[35px] top-[238.74px] flex h-[48px] w-[251px] items-center justify-center gap-[8px] cursor-pointer overflow-hidden shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
        data-name="Cta"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
        />
        <GreenCtaCorners />
        <span className="relative z-10 max-w-full whitespace-nowrap text-[16px] leading-[28px] font-medium text-white uppercase not-italic overflow-hidden text-ellipsis">
          {ctaLabel}
        </span>
        <img loading="lazy" decoding="async"
          alt=""
          src="/applications/wearables/cta-icon.svg"
          className="relative z-10 size-[20px] max-w-none"
          aria-hidden
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
        />
      </a>
      {/* Footer text */}
      <p
        className={`${interRegular.className} absolute left-[35px] top-[315.12px] w-[458.152px] text-[14px] leading-[21px] text-[#a4a4a4] not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
      >
        {footer}
      </p>
    </div>
  );
}

/* ── Usage Bar Segment ───────────────────────────────────────── */
function SidePanel({
  title,
  segments,
  statValue,
  statLabel,
}: {
  title: string;
  segments: { h: number; variant: "green" | "red" | "redDual" }[];
  statValue: string;
  statLabel: string;
}) {
  return (
    <div
      className="absolute flex w-[115px] flex-col items-center justify-center gap-[15px]"
      data-name="Side Panel"
    >
      <p
        className={`${gilroyMedium.className} min-w-full w-[min-content] text-center text-[22px] leading-[28px] tracking-[-0.4539px] text-white whitespace-nowrap not-italic`}
      >
        {title}
      </p>
      <div className="flex w-[52.119px] flex-col gap-[6px] items-start" data-name="Usage Bar">
        {segments.map((seg, i) => {
          let cls = "rounded-[1px] w-[52px]";
          let style: React.CSSProperties | undefined;
          if (seg.variant === "green") {
            cls += ` ${GREEN_BAR_SMALL} mix-blend-luminosity`;
          } else if (seg.variant === "red") {
            cls += " bg-gradient-to-b from-[#e66c6c] from-[42.377%] to-[#3a131e] to-[150.73%]";
          } else {
            style = { backgroundImage: RED_DUAL };
          }
          return (
            <div
              key={i}
              className={`${cls} relative shrink-0`}
              style={{ height: seg.h, ...style }}
              data-name="Progress Segment"
            />
          );
        })}
      </div>
      <div
        className="flex w-full flex-col items-center justify-center gap-[8px] whitespace-nowrap not-italic"
        data-name="Energy Info"
      >
        <p className={`${gilroySemiBold.className} text-[30px] leading-[normal] text-white`}>
          {statValue}
        </p>
        <p
          className={`${interRegular.className} text-[12px] leading-[18px] text-[#f0f0f0]`}
        >
          {statLabel}
        </p>
      </div>
    </div>
  );
}

/* ── Top Card 2: Power Consumption ───────────────────────────── */
function PowerCard({ data }: { data?: any }) {
  const badge = data?.badge || "Power Consumption";
  const dataPanels: any[] = Array.isArray(data?.panels) ? data.panels : [];
  const ambient =
    dataPanels[0] || { label: "Ambient", value: "<1mW", description: "Lower energy usage" };
  const legacy =
    dataPanels[1] || { label: "Legacy", value: "10mW", description: "Higher energy usage" };
  return (
    <div
      className={`relative h-[364px] w-[341px] shrink-0 ${CARD_BG}`}
      data-node-id="2701:3923"
      data-name="Card"
    >
      <CardAbstractBg />
      {/* Badge centered */}
      <div className="absolute left-1/2 top-[26.75px] -translate-x-1/2">
        <Badge label={badge} width={176} />
      </div>
      {/* Ambient side panel */}
      <div className="absolute left-[27.36px] top-[82.62px]">
        <SidePanel
          title={ambient.label}
          segments={[
            { h: 15, variant: "green" },
            { h: 15, variant: "green" },
            { h: 15, variant: "green" },
            { h: 15, variant: "green" },
            { h: 15, variant: "green" },
            { h: 30, variant: "green" },
          ]}
          statValue={ambient.value}
          statLabel={ambient.description}
        />
      </div>
      {/* Legacy side panel */}
      <div className="absolute left-[204.36px] top-[82.62px]">
        <SidePanel
          title={legacy.label}
          segments={[
            { h: 15, variant: "green" },
            { h: 15, variant: "red" },
            { h: 15, variant: "redDual" },
            { h: 15, variant: "redDual" },
            { h: 15, variant: "redDual" },
            { h: 30, variant: "red" },
          ]}
          statValue={legacy.value}
          statLabel={legacy.description}
        />
      </div>
    </div>
  );
}

/* ── Top Card 3: Workload Diagram ────────────────────────────── */
function WorkloadDiagram() {
  return (
    <div
      className="absolute left-1/2 top-[calc(50%-28.72px)] h-[146.551px] w-[266.798px] -translate-x-1/2 -translate-y-1/2 overflow-clip"
      data-name="Abstract Design"
    >
      <div className="absolute inset-[48.41%_27.95%_0_27.68%]">
        <img loading="lazy" decoding="async" alt="" src="/applications/wearables/diagram-group.svg" className="absolute inset-0 block size-full max-w-none" />
      </div>
      <div className="absolute inset-[0_0.01%_16.83%_0]">
        <img loading="lazy" decoding="async" alt="" src="/applications/wearables/diagram-group1.svg" className="absolute inset-0 block size-full max-w-none" />
      </div>
      <div className="absolute inset-[63.08%_11.92%_33.22%_87.28%]">
        <img loading="lazy" decoding="async" alt="" src="/applications/wearables/diagram-group2.svg" className="absolute inset-0 block size-full max-w-none" />
      </div>
      <div className="absolute left-[26.51px] top-[26.52px] h-[92.489px] w-[213.78px]">
        <div className="absolute inset-[0.02%_0.01%_0_0]">
          <img loading="lazy" decoding="async" alt="" src="/applications/wearables/diagram-vector.svg" className="absolute inset-0 block size-full max-w-none" />
        </div>
        <div className="absolute inset-[0_14.25%_35.2%_37.77%]">
          <img loading="lazy" decoding="async" alt="" src="/applications/wearables/diagram-vector1.svg" className="absolute inset-0 block size-full max-w-none" />
        </div>
        <div className="absolute inset-[78.59%_83.09%_0.02%_0]">
          <img loading="lazy" decoding="async" alt="" src="/applications/wearables/diagram-vector2.svg" className="absolute inset-0 block size-full max-w-none" />
        </div>
        <div className="absolute inset-[0.04%_50.51%_48.39%_20.63%]">
          <img loading="lazy" decoding="async" alt="" src="/applications/wearables/diagram-vector3.svg" className="absolute inset-0 block size-full max-w-none" />
        </div>
        <div className="absolute inset-[22.38%_2.23%_9.18%_70.27%]">
          <img loading="lazy" decoding="async" alt="" src="/applications/wearables/diagram-vector4.svg" className="absolute inset-0 block size-full max-w-none" />
        </div>
        <div className="absolute inset-[78.65%_0_0_83.23%]">
          <img loading="lazy" decoding="async" alt="" src="/applications/wearables/diagram-vector5.svg" className="absolute inset-0 block size-full max-w-none" />
        </div>
        <div className="absolute inset-[0.02%_0.01%_0_0] mix-blend-multiply">
          <img loading="lazy" decoding="async" alt="" src="/applications/wearables/diagram-vector6.svg" className="absolute inset-0 block size-full max-w-none" />
        </div>
      </div>
      <div className="absolute inset-[41.01%_21.89%_21.49%_21.77%]">
        <img loading="lazy" decoding="async" alt="" src="/applications/wearables/diagram-vector7.svg" className="absolute inset-0 block size-full max-w-none" />
      </div>
      <div
        className="absolute inset-[46.63%_26.1%_-5.24%_44.37%] flex items-center justify-center"
        style={{ containerType: "size" }}
      >
        <div className="flex-none rotate-[24.05deg]" style={{ height: "hypot(-35.8988cqw,73.7653cqh)", width: "hypot(64.1012cqw,26.2347cqh)" }}>
          <div className="relative size-full">
            <img loading="lazy" decoding="async" alt="" src="/applications/wearables/diagram-group3.svg" className="absolute inset-0 block size-full max-w-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkloadCard({ data }: { data?: any }) {
  const badge = data?.badge || "The Workload";
  const stat = data?.stat || "100%";
  const label = data?.label || "On-device";
  const description = data?.description || "No cloud dependency";
  return (
    <div
      className={`relative h-[364px] w-[311px] shrink-0 ${CARD_BG}`}
      data-node-id="2701:3961"
      data-name="Card"
    >
      <CardAbstractBg />
      {/* Badge centered */}
      <div className="absolute left-1/2 top-[26.75px] -translate-x-1/2">
        <Badge label={badge} width={137} />
      </div>
      {/* Diagram */}
      <WorkloadDiagram />
      {/* Stats */}
      <p
        className={`${gilroySemiBold.className} absolute left-1/2 top-[240.34px] -translate-x-1/2 text-[40px] leading-[normal] text-white whitespace-nowrap not-italic`}
      >
        {stat}
      </p>
      <p
        className={`${interRegular.className} absolute left-1/2 top-[295.69px] -translate-x-1/2 text-[14px] leading-[21px] text-[#f0f0f0] whitespace-nowrap not-italic min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
      >
        {label}
      </p>
      <p
        className={`${interRegular.className} absolute left-1/2 top-[317.69px] -translate-x-1/2 text-[12px] leading-[18px] text-white whitespace-nowrap not-italic`}
      >
        {description}
      </p>
    </div>
  );
}

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
const INDUSTRIAL_EYEBROW = "Measured, Not Projected";
const INDUSTRIAL_HEADING = "The difference between a low-power DSP and low-power AI.";
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
    badge: "CONTINUOUS AI", badgeWidth: 133, stat: "24/7",
    title: "Always-on safety detection",
    description: "Runs assault, anomaly, and motion-event detection continuously on-device, without waiting for a cloud round trip.",
    image: "/applications/wearables/ecg-card-1.webp",
  },
  {
    badge: "POWER EFFICIENCY", badgeWidth: 150, stat: "<1mW",
    title: "Microwatt-level inference",
    description: "Keeps AI models active in the background while consuming a fraction of the power required by conventional edge processing.",
    image: "/applications/wearables/ecg-card-2.webp",
  },
  {
    badge: "SMART TRANSMISSION", badgeWidth: 170, stat: "Only on event",
    title: "BLE/LTE wakes only when needed",
    description: "The device processes locally first, then activates communication only when a meaningful safety or health event is detected.",
    image: "/applications/wearables/ecg-card-3.webp",
  },
  {
    badge: "LOCAL AI", badgeWidth: 133, stat: "100%",
    title: "No cloud dependency",
    description: "Sensitive health and safety signals are processed locally, improving reliability, latency, and user privacy.",
    image: "/applications/wearables/ecg-card-4.webp",
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
      className="relative flex flex-col w-full shrink-0 rounded-[2px] overflow-hidden border border-[rgba(255,255,255,0.08)] bg-gradient-to-b from-[#0c160b] to-[#040804] pb-[18px]"
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
  tags,
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
  tags?: { icon: string; label: string }[];
}) {
  const frame = ECG_FRAMES[index];
  const statLeft = isSmartHome ? 18 : (index === 2 ? 19 : 26);
  const statTop = isSmartHome ? 180 : (index === 2 ? 219 : 216);
  const descWidth = isSmartHome ? 265 : (index === 2 || index === 3 ? 260 : 258);
  const textBottom = isSmartHome ? 16 : (index === 2 ? 14 : 21);
  return (
    <div
      className="relative min-h-[370px] w-[301px] shrink-0 overflow-clip rounded-[1px] bg-gradient-to-b from-[#0c160b] to-[rgba(12,22,11,0)]"
      data-name="Card"
    >
      <CardAbstractBg />
      {/* Image — 4016:3933 / 4016:3954 / 4016:3975 / 4016:3997 */}
      {isIndustrial ? (
        /* Full-width photo (CMS photos are 4:3 renders, not framed chips) */
        <div className="pointer-events-none absolute left-0 top-0 h-[185px] w-full overflow-hidden" aria-hidden>
          <img loading="lazy" decoding="async" alt="" src={imageSrc} className="absolute inset-0 size-full max-w-none object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#091208] via-transparent to-transparent" />
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
      {!isSmartHome && !isIndustrial && index === 2 ? (
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
        className="absolute flex items-center"
        style={{ left: 14, top: index === 0 ? 16 : 16.1 }}
      >
        <Badge label={badge} width={badgeWidth} />
      </div>
      {/* Circular progress — only for wearables */}
      {!isSmartHome && (
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
}: {
  imageSrc: string;
  badge: string;
  badgeWidth: number;
  stat: string;
  title: string;
  description: string;
  isSmartHome?: boolean;
  isIndustrial?: boolean;
}) {
  return (
    <div className={`relative min-h-[290px] w-full shrink-0 ${CARD_BG}`}>
      <CardAbstractBg />
      <Corners
        leftSrc="/applications/wearables/vector-47.svg"
        rightSrc="/applications/wearables/vector-46.svg"
      />
      {isIndustrial ? (
        /* Full-width photo for CMS-rendered 4:3 images */
        <div className="pointer-events-none absolute left-0 top-0 h-[150px] w-full overflow-hidden" aria-hidden>
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
      <div className="absolute left-[14px] top-[14px] flex items-center">
        <Badge label={badge} width={badgeWidth} />
      </div>
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
    </div>
  );
}

export function WearablesEmpiricalProof({ data, slug }: { data?: any; slug?: string }) {
  const isSmartHome = Boolean(
    (slug && (slug === "smarthomes" || slug === "smart-homes" || slug.includes("home"))) ||
    data?.heading?.includes("plugged-in")
  );
  const isIndustrial = Boolean(
    slug && (slug === "industrial_iot" || slug === "industrial-iot" || slug.includes("industrial"))
  );
  const eyebrow = isIndustrial ? INDUSTRIAL_EYEBROW : SECTION_EYEBROW;
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 1 });
  const fitRef2 = useFitText<HTMLHeadingElement>({ maxLines: 2 });

  const heading = isIndustrial ? INDUSTRIAL_HEADING : SECTION_HEADING;
  const subtitle = isSmartHome ? SMART_HOME_SUBTITLE : (data?.subtitle || FALLBACK_SUBTITLE);
  const healthData = data?.health_card;
  const powerData = data?.power_card;
  const workloadData = data?.workload_card;
  const dataEcgCards: any[] = Array.isArray(data?.ecg_cards) ? data.ecg_cards : [];
  const ecgCards = Array.from({ length: 4 }).map((_, i) => {
    const c = dataEcgCards[i];
    const fb = ECG_FALLBACKS[i];
    return {
      imageSrc: mediaUrl(c?.image) || fb.image,
      badge: c?.badge || fb.badge,
      badgeWidth: fb.badgeWidth,
      stat: c?.stat || fb.stat,
      title: c?.title || fb.title,
      description: c?.description || fb.description,
    };
  });

  const healthBadge = healthData?.badge || "The Workload";
  const healthTitle = healthData?.title || "Health Monitoring Solutions";
  const healthBody =
    healthData?.body ||
    "Continuous, on-device assault detection and biomarker analysis for early onset predictions for PCOD/PCOS to enable 24/7 women health and safety";
  const healthCta = healthData?.cta_label || "Download Case Study";
  const healthFooter =
    healthData?.footer || "Up to 2 weeks of continuous tracking with on-device AI.";

  const powerBadge = powerData?.badge || "Power Consumption";
  const powerPanels: any[] = Array.isArray(powerData?.panels) ? powerData.panels : [];
  const ambientPanel =
    powerPanels[0] || { label: "Ambient", value: "<1mW", description: "Lower energy usage" };
  const legacyPanel =
    powerPanels[1] || { label: "Legacy", value: "10mW", description: "Higher energy usage" };

  const workloadBadge = workloadData?.badge || "The Workload";
  const workloadStat = workloadData?.stat || "100%";
  const workloadLabel = workloadData?.label || "On-device";
  const workloadDescription = workloadData?.description || "No cloud dependency";

  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="2701:3790"
      data-name="The Empirical Proof"
      aria-label="The Empirical Proof"
    >
      {/* DESKTOP (>=1024px) */}
      {isSmartHome ? (
        <div className="relative hidden w-full max-w-[1440px] flex-col items-center pt-[44px] pb-[56px] min-[1024px]:flex">
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
        </div>
      ) : (
        <div className="relative hidden w-full max-w-[1440px] min-[1024px]:block h-[790px]">
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
            <p
              className={`${interRegular.className} text-center text-[14px] leading-[22px] text-[#f0f0f0] not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px] w-[650px]`}
            >
              {subtitle}
            </p>
          </div>

          {/* Bottom row — 4 cards */}
          <div className="absolute left-1/2 flex -translate-x-1/2 gap-[20.67px] top-[345px]">
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
              />
            ))}
          </div>

          {/* Industrial CTAs */}
          {isIndustrial && (
            <div className="absolute left-1/2 top-[742px] z-10 flex -translate-x-1/2 items-center gap-[16px]">
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
        </div>
      )}

      {/* MOBILE (<1024px) */}
      <div className={`relative flex w-full flex-col items-center gap-[24px] px-[21px] pt-[30px] ${isSmartHome ? "pb-[36px]" : "pb-[72px]"} min-[1024px]:hidden`}>

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
          <p
            className={`${interRegular.className} w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
          >
            {subtitle}
          </p>
        </div>

        {/* Cards (mobile) */}
        <div className="flex w-full flex-col gap-[16px]">
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
                />
              ))}
        </div>

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
