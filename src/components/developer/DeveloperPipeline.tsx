"use client";

import { useState, useEffect } from "react";
import { dmMono, gilroyMedium, interBold, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { mediaUrl } from "@/lib/strapi";
import { useFitText } from "../shared/FitText";

/* =========================================================================
   CONSTANTS
   ========================================================================= */

const PIPELINE_TITLE_GRADIENT =
  "linear-gradient(130.629deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const BADGE_LEFT = "/developer/pipeline-corner-42.svg";
const BADGE_RIGHT = "/developer/pipeline-corner-43.svg";
const CARD_CORNER_LEFT = "/developer/pipeline-card-corner-1.svg";
const CARD_CORNER_RIGHT = "/developer/pipeline-card-corner-2.svg";

const REMOVE_ICON = "/developer/pipeline-icon-remove.svg";
const ADD_ICON = "/developer/pipeline-icon-add.svg";
const ARROW_SVG = "/developer/pipeline-card-arrow.svg";

export { BADGE_LEFT, BADGE_RIGHT, REMOVE_ICON, ADD_ICON, ARROW_SVG };

const ICON_TILE_BG =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 65.123 64' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(3.7036e-14 2.3201 -4.7815 -3.0317e-15 32.561 -3.8447)'><stop stop-color='rgba(57,74,54,1)' offset='0'/><stop stop-color='rgba(43,54,41,1)' offset='0.5'/><stop stop-color='rgba(29,34,28,1)' offset='1'/></radialGradient></defs></svg>\")";

/* Figma 4945:4406 — smaller icon tile used in the expanded header bar (54.949×54). */
const ICON_TILE_BG_SMALL =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 54.949 54' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(3.125e-14 1.9576 -4.0345 -2.558e-15 27.474 -3.244)'><stop stop-color='rgba(57,74,54,1)' offset='0'/><stop stop-color='rgba(43,54,41,1)' offset='0.5'/><stop stop-color='rgba(29,34,28,1)' offset='1'/></radialGradient></defs></svg>\")";

const DEFAULT_HEADING = "The ModelForge Pipeline";
const DEFAULT_SUBTITLE =
  "From microwatt edge sensors running on coin cells to air-cooled high-performance compute arrays, the GPX architecture scales seamlessly across the physical world.";
const DEFAULT_TAG = "Real-time AI at edge";

/* Flow diagram geometry — Figma 4945:4422 (731.971×210 frame centered at
   calc(50% + 205.5px), top 98; expanded card = 335, content left / image
   right). Static images keep the exact Figma crop; CMS uploads render
   full-size and auto-size the card:
   expandedHeight = FLOW_TOP + displayHeight(image) + FLOW_BOTTOM_PAD. */
const FLOW_WIDTH = 731.971;
const FLOW_FRAME_HEIGHT = 210;
const FLOW_TOP = 98;
const FLOW_BOTTOM_PAD = 27; // 335 − 98 − 210
const CARD_MIN_EXPANDED = 335;

/* =========================================================================
   STAGE DATA  (Figma 4577:11008)
   ========================================================================= */

export type StageBullet = { title: string; description: string };

export type Stage = {
  label: string;
  subtitle: string;
  subtitleNoWrap: boolean;
  icon: string;
  cardImage: string;
  cardImage2?: string;
  cardGradient?: string;
  collapseBg?: string;
  collapseStyle?: { left: string; top: number; width: number; height: number };
  collapseGradient?: string;
  collapseImgClass?: string;
  flowImage: string;
  /** extra px added to FLOW_TOP for this stage's image (Deploy sits lower) */
  flowTopOffset?: number;
  /** true when flowImage comes from Strapi — full image, card auto-sizes */
  autoFitFlow?: boolean;
  /** header strip shown over the collapsed Train row (previous design) */
  expandedHeaderStrip?: string;
  bullets?: StageBullet[];
};

export const STAGES: Stage[] = [
  {
    label: "Train",
    subtitle: "Data Ingestion & Quantization",
    subtitleNoWrap: true,
    icon: "/developer/pipeline-icon-train.svg",
    cardImage: "/developer/pipeline-card-train.webp",
    collapseBg: "/developer/pipeline-card-train.webp",
    collapseStyle: {
      left: "calc(50% - 15.44px)",
      top: -1,
      width: 934.339,
      height: 127.041,
    },
    collapseGradient:
      "linear-gradient(90.54deg, rgba(0,0,0,0) 82.82%, rgb(0,0,0) 99.98%), linear-gradient(90deg, rgb(0,0,0) 21.64%, rgba(0,0,0,0) 62.88%)",
    collapseImgClass: "object-contain object-center",
    flowImage: "/developer/train-flow-1.webp",
    expandedHeaderStrip: "/developer/train-expanded-strip.png",
    bullets: [
      {
        title: "Native TFLite & BYOM",
        description:
          "Bring your existing model. ModelForge handles conversion, quantization, and A-Cube mapping.",
      },
      {
        title: "Direct Sensor Capture",
        description:
          "Capture real sensor data directly from the DVK and move faster from raw signals to trained models.",
      },
    ],
  },
  {
    label: "Optimize",
    subtitle: "Hardware-Aware Validation",
    subtitleNoWrap: true,
    icon: "/developer/pipeline-icon-optimize.svg",
    cardImage: "/developer/pipeline-card-optimize.webp",
    cardGradient:
      "linear-gradient(250.41302079811192deg, rgba(0,0,0,0) 59.187%, rgb(0,0,0) 75.236%)",
    collapseBg: "/developer/pipeline-collapse-bg-optimize.webp",
    collapseStyle: {
      left: "calc(50% - 15.44px)",
      top: -1,
      width: 934.339,
      height: 127.041,
    },
    collapseGradient:
      "linear-gradient(90.54deg, rgba(0,0,0,0) 82.82%, rgb(0,0,0) 99.98%), linear-gradient(90deg, rgb(0,0,0) 21.64%, rgba(0,0,0,0) 62.88%)",
    flowImage: "/developer/train-flow-2.webp",
    bullets: [
      {
        title: "Compatibility Checking",
        description:
          "Know what works before you build. ModelForge flags unsupported ops and guides the fallback path.",
      },
      {
        title: "Pre-Deployment Profiling",
        description:
          "See memory, latency, and power upfront, before the model ever reaches silicon.",
      },
    ],
  },
  {
    label: "Integrate",
    subtitle: "Embedded Application Assembly",
    subtitleNoWrap: false,
    icon: "/developer/pipeline-icon-integrate.svg",
    cardImage: "/developer/pipeline-card-integrate-a.webp",
    cardImage2: "/developer/pipeline-card-integrate-b.webp",
    collapseBg: "/developer/pipeline-collapse-bg-integrate.png",
    collapseStyle: {
      left: "calc(50% - 15.44px)",
      top: -1,
      width: 934.339,
      height: 127.041,
    },
    collapseGradient:
      "linear-gradient(90deg, rgba(0,0,0,0) 79.37%, rgb(0,0,0) 93.88%), linear-gradient(90deg, rgb(0,0,0) 29.99%, rgba(0,0,0,0) 48.39%)",
    flowImage: "/developer/train-flow-3.webp",
    bullets: [
      {
        title: "The SDK Arsenal",
        description:
          "Use pre-built APIs, drivers, and BSPs to handle the embedded work without starting from scratch.",
      },
      {
        title: "90% Portability",
        description:
          "Bring your C code with you. Most existing ARM logic ports directly into the GPX workflow.",
      },
    ],
  },
  {
    label: "Deploy",
    subtitle: "The Unified Build",
    subtitleNoWrap: true,
    icon: "/developer/pipeline-icon-deploy.svg",
    cardImage: "/developer/pipeline-card-deploy.webp",
    cardGradient:
      "linear-gradient(169.95193210377164deg, rgba(0,0,0,0) 55.52%, rgba(0,0,0,0.95) 69.775%)",
    collapseBg: "/developer/pipeline-collapse-bg-deploy.png",
    collapseStyle: {
      left: "calc(50% - 104.62px)",
      top: -97.81,
      width: 1004.046,
      height: 311.628,
    },
    collapseGradient:
      "linear-gradient(89.94deg, rgba(0,0,0,0) 79.36%, rgb(0,0,0) 98.95%), linear-gradient(90deg, rgb(0,0,0) 31.11%, rgba(0,0,0,0) 91.38%)",
    flowImage: "/developer/train-flow-4.webp",
    flowTopOffset: 20,
    bullets: [
      {
        title: "Seamless Integration",
        description:
          "Your AI model becomes a simple C-callable object. Drop it into the workflow and build.",
      },
      {
        title: "One-Click Eclipse Execution",
        description:
          "One Eclipse build. ModelForge handles the ARM-to-AI-core mapping behind the scenes.",
      },
    ],
  },
];

/* =========================================================================
   MAIN COMPONENT
   ========================================================================= */

export function DeveloperPipeline({ data }: { data?: any }) {
  const [activeIndex, setActiveIndex] = useState(0); // 0 = Train expanded
  const [flowHeights, setFlowHeights] = useState<Record<number, number>>({});

  const heading = data?.heading || DEFAULT_HEADING;
  const subtitle = data?.subtitle || DEFAULT_SUBTITLE;
  const tagText = data?.tag?.text || DEFAULT_TAG;
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 2 });

  const mergedStages = STAGES.map((stage, i) => {
    const tabData: Record<string, unknown> | undefined = data?.tabs?.[i];
    type MediaParam = Parameters<typeof mediaUrl>[0];
    const rawBullets = tabData?.bullets;
    const cmsBullets: StageBullet[] | undefined = Array.isArray(rawBullets)
      ? (rawBullets as Record<string, unknown>[])
          .map((b) => ({
            title: String(b?.title ?? b?.label ?? ""),
            description: String(b?.description ?? ""),
          }))
          .filter((b) => b.title && b.description)
      : undefined;
    const cmsFlow =
      mediaUrl(tabData?.flow_image as MediaParam) ||
      mediaUrl(tabData?.image as MediaParam) ||
      mediaUrl(tabData?.media as MediaParam);
    return {
      ...stage,
      label: (tabData?.label as string) || (tabData?.title as string) || stage.label,
      subtitle: (tabData?.subtitle as string) || (tabData?.description as string) || stage.subtitle,
      flowImage: cmsFlow || stage.flowImage,
      autoFitFlow: Boolean(cmsFlow),
      bullets:
        cmsBullets && cmsBullets.length > 0
          ? cmsBullets
          : stage.bullets,
    };
  });

  /* Measure each flow image on load → displayed height at its stage width */
  const handleFlowLoad = (index: number, displayHeight: number) => {
    if (!displayHeight) return;
    setFlowHeights((prev) => {
      const cur = prev[index];
      if (cur !== undefined && Math.abs(cur - displayHeight) < 0.5) return prev;
      return { ...prev, [index]: displayHeight };
    });
  };

  const expandedHeightFor = (i: number) => {
    const top = FLOW_TOP + (mergedStages[i].flowTopOffset ?? 0);
    const h = flowHeights[i];
    if (h === undefined) return Math.max(CARD_MIN_EXPANDED, Math.round(top + FLOW_FRAME_HEIGHT + FLOW_BOTTOM_PAD));
    return Math.max(
      CARD_MIN_EXPANDED,
      Math.round(top + h + FLOW_BOTTOM_PAD)
    );
  };

  /* Closed: 475 + 4×108 + 3×24 = 979. Open: 871 + expanded card height. */
  const pipelineHeight =
    activeIndex === -1 ? 979 : 871 + expandedHeightFor(activeIndex);
  const offset = pipelineHeight - 1291; // −312 closed; −245/+ when open at 665

  useEffect(() => {
    document.documentElement.style.setProperty("--developer-pipeline-offset", `${offset}px`);
    return () => {
      document.documentElement.style.removeProperty("--developer-pipeline-offset");
    };
  }, [offset]);

  return (
    <div
      className="absolute"
      style={{ left: 0, top: 1582, width: 1440, height: pipelineHeight, transition: "height 300ms ease-in-out" }}
      data-node-id="4577:11008"
      data-name="Model Forge - Train"
    >
      {/* ── Abstract design background ─────────────────────────────────── */}
      <div
        className="pointer-events-none absolute -translate-x-1/2"
        style={{ left: "50%", top: -69.24, width: 985.295, height: 357.632 }}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async"
          alt=""
          src="/developer/pipeline-abstract.svg"
          className="absolute inset-0 block size-full max-w-none"
        />
      </div>

      {/* ── Badge "Real-time AI at edge" ───────────────────────────────── */}
      <div
        className="absolute -translate-x-1/2 overflow-clip bg-[rgba(255,255,255,0.06)]"
        style={{ left: "50%", top: 50, width: 180, height: 26 }}
      >
        <Corners leftSrc={BADGE_LEFT} rightSrc={BADGE_RIGHT} />
        <p
          className={`${dmMono.className} absolute left-1/2 top-1/2 max-w-full -translate-x-1/2 -translate-y-1/2 text-[16px] leading-[24px] uppercase tracking-[-0.39px] whitespace-nowrap text-[#ecfae5] not-italic overflow-hidden text-ellipsis`}
        >
          {tagText}
        </p>
        <div className="absolute left-[6.48px] top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
        <div className="absolute left-[170.48px] top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
      </div>

      {/* ── Title + subtitle ───────────────────────────────────────────── */}
      <div
        className="absolute -translate-x-1/2"
        style={{ left: "calc(50% + 0.5px)", top: 100, width: 643, height: 115 }}
      >
        {/* Title frame SVG (decorative bracket around heading) */}
        <div
          className="absolute"
          style={{ left: 44, top: 0.89, width: 555.646, height: 59 }}
          aria-hidden
        >
          <div className="absolute inset-[-0.85%_0]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async"
              alt=""
              src="/developer/pipeline-title-frame.svg"
              className="block size-full max-w-none"
            />
          </div>
        </div>
        {/* Heading + subtitle text block */}
        <div
          className="absolute flex flex-col items-center gap-[20px] text-center"
          style={{ left: -0.37, top: 6, width: 650 }}
        >
          <h2
            ref={fitRef}
            className={`${gilroyMedium.className} bg-clip-text text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{ backgroundImage: PIPELINE_TITLE_GRADIENT }}
          >
            {heading}
          </h2>
          <p
            className={`${interRegular.className} text-[14px] leading-[21px] text-[#f0f0f0] not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
          >
            {subtitle}
          </p>
        </div>
      </div>

      {/* ── Stage cards row (4577:11190) ───────────────────────────────── */}
      <div
        className="absolute -translate-x-1/2 flex items-center gap-[40px]"
        style={{ left: "50%", top: 255 }}
      >
        {mergedStages.map((stage, i) => (
          <StageCard
            key={i}
            stage={stage}
            index={i}
            isActive={activeIndex === i}
            onClick={() => setActiveIndex(activeIndex === i ? -1 : i)}
          />
        ))}
        {/* Connecting arrows between cards */}
        {[0, 1, 2].map((i) => (
          <div
            key={`arrow-${i}`}
            className="absolute h-0"
            style={{
              left: (i + 1) * 220 + i * 40,
              top: i === 2 ? 65 : 65.5,
              width: 40,
            }}
            aria-hidden
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async"
              alt=""
              src={ARROW_SVG}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ width: 58.2, height: 19.8 }}
            />
          </div>
        ))}
      </div>

      {/* ── Accordion (4577:11114) ─────────────────────────────────────── */}
      <div
        className="absolute -translate-x-1/2 flex flex-col gap-[24px]"
        style={{ left: "50%", top: 475, width: 1204 }}
      >
        {mergedStages.map((stage, i) => (
          <AccordionItem
            key={i}
            stage={stage}
            index={i}
            isActive={activeIndex === i}
            onClick={() => setActiveIndex(activeIndex === i ? -1 : i)}
            onFlowLoad={handleFlowLoad}
            expandedHeight={expandedHeightFor(i)}
          />
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   STAGE CARD  (220×180 — top row of preview cards)
   ========================================================================= */

export function StageCard({
  stage,
  index,
  onClick,
}: {
  stage: Stage;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex h-[180px] w-[220px] shrink-0 cursor-pointer flex-col items-start justify-end gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-black px-[14px] py-[16px] text-left transition-colors duration-200 hover:border-[rgba(240,240,240,0.4)]"
    >
      <Corners leftSrc={CARD_CORNER_LEFT} rightSrc={CARD_CORNER_RIGHT} />

      {/* Card image — composition varies per stage */}
      <CardImage stage={stage} index={index} />

      {/* Label + subtitle */}
      <div className="relative z-10 flex w-full flex-col items-center gap-[6px] text-center">
        <p
          className={`${gilroyMedium.className} text-[22px] leading-[28px] text-white [word-break:break-word]`}
        >
          {stage.label}
        </p>
        <p
          className={`${interRegular.className} text-[12px] leading-[18px] text-[#99a1af] ${
            stage.subtitleNoWrap ? "whitespace-nowrap" : "w-full"
          }`}
        >
          {stage.subtitle}
        </p>
      </div>
    </button>
  );
}

/* =========================================================================
   CARD IMAGE — pixel-perfect composition per stage index
   ========================================================================= */

function CardImage({ stage, index }: { stage: Stage; index: number }) {
  /* --- Train (index 0): single image bleeding from top --- */
  if (index === 0) {
    return (
      <div
        className="absolute -translate-x-1/2 overflow-hidden"
        style={{ left: "50%", top: -0.5, height: 130.787, width: 220 }}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async"
          alt=""
          src={stage.cardImage}
          className="absolute h-full max-w-none"
          style={{ left: "-7.44%", top: 0, width: "108.34%" }}
        />
      </div>
    );
  }

  /* --- Optimize (index 1): rotated -90° image with gradient fade --- */
  if (index === 1) {
    return (
      <div
        className="absolute -translate-x-1/2 flex items-center justify-center"
        style={{ left: "50%", top: -0.5, height: 123, width: 194 }}
        aria-hidden
      >
        <div className="-rotate-90">
          <div className="relative" style={{ height: 194, width: 123 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async"
              alt=""
              src={stage.cardImage}
              className="absolute max-w-none"
              style={{
                height: "109.92%",
                left: "-8.24%",
                top: "-5.19%",
                width: "115.58%",
              }}
            />
            {stage.cardGradient && (
              <div
                className="pointer-events-none absolute inset-0"
                style={{ backgroundImage: stage.cardGradient }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  /* --- Integrate (index 2): rotated image + square overlay --- */
  if (index === 2) {
    return (
      <div
        className="absolute -translate-x-1/2"
        style={{ left: "50%", top: -0.5, height: 124, width: 216 }}
        aria-hidden
      >
        {/* Rotated background image */}
        <div
          className="absolute -translate-x-1/2 flex items-center justify-center"
          style={{
            left: "calc(50% - 0.96px)",
            top: -11.54,
            height: 146.256,
            width: 229.983,
          }}
        >
          <div className="-rotate-90">
            <div className="relative" style={{ height: 229.983, width: 146.256 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async"
                alt=""
                src={stage.cardImage}
                className="absolute inset-0 size-full max-w-none object-cover"
              />
            </div>
          </div>
        </div>
        {/* Square foreground image */}
        <div
          className="absolute -translate-x-1/2 overflow-hidden"
          style={{ left: "50%", top: -17, height: 162, width: 162 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            alt=""
            src={stage.cardImage2}
            className="absolute max-w-none"
            style={{
              height: "99.84%",
              left: "-41.37%",
              top: 0,
              width: "177.39%",
            }}
          />
        </div>
      </div>
    );
  }

  /* --- Deploy (index 3): rotated 3.84° image with gradient fade --- */
  return (
    <div
      className="absolute -translate-x-1/2 flex items-center justify-center"
      style={{ left: "calc(50% - 0.06px)", top: -0.5, height: 141.012, width: 221.622 }}
      aria-hidden
    >
      <div className="rotate-[3.84deg]">
        <div className="relative" style={{ height: 126.976, width: 213.589 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            alt=""
            src={stage.cardImage}
            className="absolute inset-0 size-full max-w-none object-cover"
          />
          {stage.cardGradient && (
            <div
              className="pointer-events-none absolute inset-0"
              style={{ backgroundImage: stage.cardGradient }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
    ACCORDION ITEM — Figma 4945:4391 (Train expanded) / 4945:4427 (collapsed)
    Expands to 335px (86px header bar + bullets & flow diagram) / 108px
    ========================================================================= */

function AccordionItem({
  stage,
  index,
  isActive,
  onClick,
  onFlowLoad,
  expandedHeight,
}: {
  stage: Stage;
  index: number;
  isActive: boolean;
  onClick: () => void;
  onFlowLoad: (index: number, displayHeight: number) => void;
  expandedHeight: number;
}) {
  const flowTop = FLOW_TOP + (stage.flowTopOffset ?? 0);
  const flowBoxHeight = Math.max(FLOW_FRAME_HEIGHT, expandedHeight - flowTop - FLOW_BOTTOM_PAD);
  return (
    <div
      className="relative w-[1204px] shrink-0 border border-solid border-[rgba(240,240,240,0.2)] bg-black"
      style={{
        height: isActive ? expandedHeight : 108,
        overflow: "hidden",
        transition: "height 300ms ease-in-out",
      }}
    >
      {/* Collapsed background image (fades out when expanded) */}
      {stage.collapseBg && stage.collapseStyle && (
        <div
          className="pointer-events-none absolute mix-blend-plus-lighter transition-opacity duration-300"
          style={{
            opacity: isActive ? 0 : 1,
            ...stage.collapseStyle,
            transform: "translateX(-50%)",
          }}
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            alt=""
            src={stage.collapseBg}
            className={`absolute size-full max-w-none ${stage.collapseImgClass || "object-bottom"}`}
          />
          <div
            className="absolute inset-0"
            style={{ backgroundImage: stage.collapseGradient }}
          />
        </div>
      )}

      {/* Header strip image over the collapsed Train row (previous design) */}
      {stage.expandedHeaderStrip && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 transition-opacity duration-300"
          style={{
            left: "calc(50% + 20px)",
            top: 0,
            width: 935,
            height: 108,
            opacity: isActive ? 0 : 1,
          }}
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            alt=""
            src={stage.expandedHeaderStrip}
            className="absolute inset-0 size-full max-w-none object-contain object-center"
          />
        </div>
      )}

      {/* Header separator border at 86px (visible when expanded) */}
      <div
        className="pointer-events-none absolute left-0 top-[86px] w-full border-b border-solid border-[rgba(240,240,240,0.2)] transition-opacity duration-300"
        style={{ opacity: isActive ? 1 : 0 }}
        aria-hidden
      />

      {/* Card corners (visible when collapsed) */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{ opacity: isActive ? 0 : 1 }}
        aria-hidden
      >
        <Corners leftSrc={BADGE_LEFT} rightSrc={BADGE_RIGHT} />
      </div>

      {/* Header-bar corners 0–86px (visible when expanded; bottom pair marks
          the separator line per Figma 4945:4393/4945:4396) */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-[86px] w-full transition-opacity duration-300"
        style={{ opacity: isActive ? 1 : 0 }}
        aria-hidden
      >
        <Corners leftSrc={BADGE_LEFT} rightSrc={BADGE_RIGHT} />
      </div>

      {/* Icon + Label + Subtitle — collapsed header (left 29, centered at 54) */}
      <div
        className="pointer-events-none absolute flex -translate-y-1/2 items-center gap-[12px] transition-opacity duration-300"
        style={{ left: 29, top: 54, width: 201, opacity: isActive ? 0 : 1 }}
      >
        <IconTile icon={stage.icon} />
        <p
          className={`${gilroyMedium.className} text-[22px] leading-[28px] whitespace-nowrap text-white`}
        >
          {stage.label}
        </p>
        <p
          className={`${interRegular.className} text-[14px] leading-[21px] whitespace-nowrap text-[#bbb] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
        >
          {stage.subtitle}
        </p>
      </div>

      {/* Icon + Label + Subtitle — expanded header bar (left 32, centered at 43) */}
      <div
        className="pointer-events-none absolute flex -translate-y-1/2 items-center gap-[12px] transition-opacity duration-300"
        style={{ left: 32, top: 43, opacity: isActive ? 1 : 0 }}
      >
        <IconTileSmall icon={stage.icon} />
        <p
          className={`${gilroyMedium.className} text-[22px] leading-[28px] whitespace-nowrap text-white`}
        >
          {stage.label}
        </p>
        <p
          className={`${interRegular.className} text-[14px] leading-[21px] whitespace-nowrap text-[#bbb] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
        >
          {stage.subtitle}
        </p>
      </div>

      {/* Toggle button (right side of header) */}
      <div
        className="pointer-events-none absolute right-[29px] flex size-[35px] -translate-y-1/2 items-center justify-center overflow-clip bg-[#303030]"
        style={{ top: isActive ? 43.5 : 54, transition: "top 300ms ease-in-out" }}
      >
        <Corners leftSrc={BADGE_LEFT} rightSrc={BADGE_RIGHT} />
        <div className="relative size-[24px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            alt=""
            src={isActive ? REMOVE_ICON : ADD_ICON}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={isActive ? { width: 16, height: 1.5 } : { width: 16, height: 16 }}
          />
        </div>
      </div>

      {/* Invisible click overlay for the header region */}
      <button
        type="button"
        onClick={onClick}
        className="absolute left-0 top-0 z-10 w-full cursor-pointer"
        style={{ height: isActive ? 86 : 108, transition: "height 300ms ease-in-out" }}
        aria-label={`${isActive ? "Collapse" : "Expand"} ${stage.label}`}
      />

      {/* Feature bullets — left column (fade in when expanded) */}
      {(stage.bullets ?? []).map((bullet, i) => (
        <div key={`bullet-${i}`} aria-hidden={isActive ? undefined : true}>
          <ul
            className={`absolute left-[29px] w-[341px] transition-opacity duration-300 ${interBold.className}`}
            style={{ top: 112 + i * 93, opacity: isActive ? 1 : 0 }}
          >
            <li className="list-disc ps-[25px] text-[16px] leading-[24px] font-bold not-italic text-white">
              {bullet.title}
            </li>
          </ul>
          <p
            className={`${interRegular.className} absolute left-[54px] w-[341px] text-[14px] leading-[21px] font-normal not-italic text-[#d2d2d2] transition-opacity duration-300 min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
            style={{ top: 139 + i * 93, opacity: isActive ? 1 : 0 }}
          >
            {bullet.description}
          </p>
        </div>
      ))}

      {/* Flow diagram — right column per Figma 4945:4422 (731.971×210 frame
          centered at calc(50% + 205.5px), top 98). Static images keep the
          exact Figma crop; CMS uploads render full-size and auto-size the
          card on load. */}
      <div
        className="pointer-events-none absolute -translate-x-1/2 overflow-hidden"
        style={{
          left: "calc(50% + 205.5px)",
          top: flowTop,
          width: FLOW_WIDTH,
          height: flowBoxHeight,
          opacity: isActive ? 1 : 0,
          transition: "height 300ms ease-in-out, opacity 300ms ease-in-out",
        }}
      >
        {stage.autoFitFlow ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img loading="lazy" decoding="async"
            alt=""
            src={stage.flowImage}
            onLoad={(e) => {
              const img = e.currentTarget;
              if (img.naturalWidth && img.naturalHeight) {
                onFlowLoad(
                  index,
                  (FLOW_WIDTH * img.naturalHeight) / img.naturalWidth
                );
              }
            }}
            className="block w-full max-w-none"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img loading="lazy" decoding="async"
            alt=""
            src={stage.flowImage}
            className="absolute left-0 max-w-none"
            style={{ top: "-6.86%", width: "100%", height: "116.19%" }}
          />
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   ICON TILE — radial-gradient rounded square with centered SVG icon
   ========================================================================= */

function IconTile({ icon }: { icon: string }) {
  return (
    <div
      className="flex shrink-0 items-start overflow-clip p-[9.739px]"
      style={{
        backgroundImage: ICON_TILE_BG,
        borderRadius: 16.696,
        width: 65.123,
        height: 64,
      }}
    >
      <div className="relative size-[44.522px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async"
          alt=""
          src={icon}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
}

/* ── Small icon tile — Figma 4945:4406 (54.949×54, used in expanded header) ── */

function IconTileSmall({ icon }: { icon: string }) {
  return (
    <div
      className="flex shrink-0 items-start overflow-clip p-[8.218px]"
      style={{
        backgroundImage: ICON_TILE_BG_SMALL,
        borderRadius: 14.087,
        width: 54.949,
        height: 54,
      }}
    >
      <div className="relative size-[37.565px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async"
          alt=""
          src={icon}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
}
