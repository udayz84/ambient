"use client";

import { mediaUrl } from "@/lib/strapi";
import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { useFitText } from "../shared/FitText";
import { TagBadge } from "../hero/TagBadge";
import { AnimatedDotsBackground } from "../shared/AnimatedDotsBackground";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
  MODELFORGE_CARD,
  MODELFORGE_CARD_BG,
  MODELFORGE_CARD_BORDER,
  MODELFORGE_STEPS,
  MODELFORGE_TITLE_GRADIENT,
  STEP_NUMBER_GRADIENT,
  PRIMARY_CTA_SHADOW,
  PRIMARY_CTA_INSET,
  SECONDARY_CTA_BG,
} from "./products-data";

const FALLBACK_HEADING = "Your models. Your IDE. No rewrites.";
const FALLBACK_SUBTITLE =
  "A new architecture shouldn't mean a new way of working. With ModelForge, it doesn't.";
const FALLBACK_PRIMARY = { label: "Explore the Developer Hub", href: "#" };
const FALLBACK_SECONDARY = { label: "Request the SDK", href: "#" };

const SUB_FEATURES = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M3 9h18" />
        <path d="M3 15h18" />
        <path d="M9 3v18" />
        <path d="M15 3v18" />
      </svg>
    ),
    text: "Speaks matrix math natively — none of the translation tax Arm/RISC-V pay",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
        <circle cx="2" cy="7" r="1.5" fill="currentColor"/>
        <circle cx="22" cy="7" r="1.5" fill="currentColor"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
        <circle cx="12" cy="2" r="1.5" fill="currentColor"/>
      </svg>
    ),
    text: "Pre-integrated RTOS, drivers, DSP libraries",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 4H5a1 1 0 0 0-1 1v3" />
        <path d="M16 4h3a1 1 0 0 1 1 1v3" />
        <path d="M20 16v3a1 1 0 0 1-1 1h-3" />
        <path d="M4 16v3a1 1 0 0 0 1 1h3" />
        <circle cx="11" cy="11" r="3" />
        <path d="m13.5 13.5 3.5 3.5" />
      </svg>
    ),
    text: "Simulator + profiler — validate power and accuracy before the board arrives",
  },
];

/**
 * Figma 2917:1333 (title) + 2917:1341/1359/1377 (Train/Compile/Deploy cards).
 * "Your models. Your IDE. No rewrites."
 */
export function ProductsModelForge({ data }: { data?: any }) {
  const heading = data?.heading || FALLBACK_HEADING;
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const primary = {
    label: data?.primary_button?.label ?? FALLBACK_PRIMARY.label,
    href: data?.primary_button?.href ?? FALLBACK_PRIMARY.href,
  };
  const secondary = {
    label: data?.secondary_button?.label ?? FALLBACK_SECONDARY.label,
    href: data?.secondary_button?.href ?? FALLBACK_SECONDARY.href,
  };
  const steps =
    Array.isArray(data?.steps) && data.steps.length > 0
      ? data.steps.map((s: any, i: number) => {
          const fallback = MODELFORGE_STEPS[i] || MODELFORGE_STEPS[0];
          const stepNum = s?.step || fallback.number;
          return {
            nodeId: `modelforge-step-${i}`,
            number: stepNum,
            title: fallback.title,
            description: s?.description ?? fallback.description,
            image: mediaUrl(s?.image),
            imageBox: fallback.imageBox,
            numberLeft: fallback.numberLeft,
            numberTop: fallback.numberTop,
            textTop: fallback.textTop,
            cta: s?.cta_label
              ? { label: s.cta_label, href: s.cta_href || fallback.cta?.href || "#" }
              : fallback.cta,
          };
        })
      : MODELFORGE_STEPS;
      
  const subfeatures =
    Array.isArray(data?.subfeatures) && data.subfeatures.length > 0
      ? data.subfeatures.map((sf: any, i: number) => {
          const fallback = SUB_FEATURES[i] || SUB_FEATURES[0];
          return {
            text: sf.text || fallback.text,
            icon: fallback.icon,
          };
        })
      : SUB_FEATURES;

  return (
    <>
      {/* DESKTOP (>=1024px) */}
      <section
        className="relative mx-auto hidden w-full bg-black min-[1024px]:block"
        aria-label="ModelForge workflow"
      >
        <ProductsModelForgeDesktop
          heading={heading}
          subtitle={subtitle}
          steps={steps}
          primary={primary}
          secondary={secondary}
          subfeatures={subfeatures}
        />
      </section>

      {/* MOBILE (<1024px) */}
      <ProductsModelForgeMobile
        heading={heading}
        subtitle={subtitle}
        steps={steps}
        primary={primary}
        secondary={secondary}
      />
    </>
  );
}

function ProductsModelForgeDesktop({
  heading,
  subtitle,
  steps,
  primary,
  secondary,
  subfeatures,
}: {
  heading: string;
  subtitle: string;
  steps: any[];
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  subfeatures: any[];
}) {
  const fitRef = useFitText<HTMLHeadingElement>({});
  return (
    <div className="mx-auto flex w-full max-w-[1256px] flex-col items-center pt-[120px] pb-[120px]">
      {/* Section title — 2917:1333 (centered, w=739) */}
      <div
        className="flex flex-col items-center gap-[24px]"
        style={{ width: 739 }}
        data-node-id="2917:1333"
        data-name="Section Title"
      >
        <MenuChip label="BUILD WITH GPX10PRO" />
        <div
          className="relative px-[10px]"
          style={{ width: 739, height: 49 }}
          data-node-id="2917:1334"
          data-name="Title"
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            ref={fitRef}
            className={`${gilroyMedium.className} absolute m-0 w-[719px] bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              left: 10,
              top: 0,
              backgroundImage: MODELFORGE_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2917:1335"
          >
            {heading}
          </h2>
        </div>
        <p
          className={`${interRegular.className} w-[650px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
          data-node-id="2917:1340"
        >
          {subtitle}
        </p>
      </div>

      {/* Cards row — 2917:1341 / 1359 / 1377 */}
      <div
        className="mt-[46px] flex items-start"
        style={{ gap: MODELFORGE_CARD.gap }}
      >
        {steps.map((step) => (
          <ModelForgeCard key={step.nodeId} step={step} />
        ))}
      </div>

      {/* Sub-features row */}
      <div
        className="mt-[28px] flex items-stretch"
        style={{ gap: MODELFORGE_CARD.gap }}
      >
        {subfeatures.map((feat, i) => (
          <div 
            key={i} 
            className="relative flex flex-col p-[24px] border border-solid"
            style={{ 
              width: MODELFORGE_CARD.width,
              borderColor: MODELFORGE_CARD_BORDER,
              background: "linear-gradient(90deg, rgba(21,43,14,0.6) 0%, rgba(5,10,3,0.3) 100%)"
            }}
          >
            <div className="text-[#d4e9bc] mb-[16px]">
              {feat.icon}
            </div>
            <p className={`${interRegular.className} text-[14px] leading-[21px] text-[#f0f0f0]`}>{feat.text}</p>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </div>
        ))}
      </div>

      {/* CTAs row — 2917:1396 */}
      <div className="mt-[64px] flex items-center justify-center gap-[24px]">
        {/* Primary CTA */}
        <a
          href={primary.href}
          className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-[251px] shrink-0 items-center justify-center overflow-hidden uppercase bg-transparent border-0 cursor-pointer text-white text-[16px] leading-[28px]`}
        >
          <div aria-hidden className="absolute bg-gradient-to-b from-[#6ced3f] inset-0 pointer-events-none to-[#38a612]" />
          <AnimatedDotsBackground />
          <span className="relative z-10">{primary.label}</span>
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <div className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`} />
        </a>

        {/* Secondary CTA */}
        <a
          href={secondary.href}
          className={`${gilroyMedium.className} relative flex h-[48px] w-[174px] shrink-0 items-center justify-center overflow-hidden uppercase bg-[rgba(226,241,202,0.12)] border-0 cursor-pointer text-white text-[16px] leading-[28px]`}
        >
          <span className="relative z-10">{secondary.label}</span>
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
        </a>
      </div>
    </div>
  );
}

function ModelForgeCard({ step }: { step: any }) {

  return (
    <article
      className="relative flex flex-col overflow-hidden border border-solid px-[32px] pt-[16px] pb-[24px]"
      style={{
        width: MODELFORGE_CARD.width,
        height: MODELFORGE_CARD.height,
        backgroundColor: MODELFORGE_CARD_BG,
        borderColor: MODELFORGE_CARD_BORDER,
      }}
      data-node-id={step.nodeId}
      data-name="Article"
    >
      {/* NewsSection (content area) */}
      <div className="relative w-full flex-1" data-name="NewsSection">
        {/* Image box — per-step (Figma 2917:1343/1360/1378) */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: step.imageBox.left,
            top: step.imageBox.top,
            width: step.imageBox.width,
            height: step.imageBox.height,
          }}
          data-name="image 168"
          aria-hidden
        >
          {step.image && (
            <img loading="lazy" decoding="async"
              alt=""
              src={step.image}
              className="absolute inset-0 h-full w-full object-contain"
            />
          )}
          {/* Fade overlay — transparent until 88%, then to black */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0) 88.146%, #000000 100%)",
            }}
          />
        </div>

        {/* Title + description (+ CTA on card 01 — Figma 5212:6997) */}
        <div
          className="absolute left-0 flex flex-col items-start gap-[12px] not-italic [word-break:break-word]"
          style={{ top: step.textTop }}
          data-name="Frame 1618875841"
        >
          <h3
            className={`${gilroyMedium.className} w-[333.991px] shrink-0 text-[32px] leading-[38px] font-medium text-white`}
          >
            {step.title}
          </h3>

          <p
            className={`${interRegular.className} w-[333.99px] shrink-0 text-[16px] leading-[26px] font-normal text-[#99a1af] tracking-[-0.3125px] [word-break:break-word]`}
          >
            {step.description}
          </p>

          {step.cta ? (
            <a
              href={step.cta.href}
              className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative mt-[2px] flex h-[48px] w-[251px] shrink-0 items-center justify-center overflow-hidden text-[16px] leading-[28px] text-white uppercase not-italic`}
              data-node-id="5212:6997"
              data-name="Cta"
            >
              <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612] pointer-events-none" />
              <span className="relative whitespace-nowrap">{step.cta.label}</span>
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
              <div className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`} />
            </a>
          ) : null}
        </div>
      </div>

      {/* Step number — per-step position (Figma) */}
      <span
        className={`${gilroyMedium.className} pointer-events-none absolute bg-clip-text text-[70px] leading-[70px] font-medium text-transparent opacity-50 not-italic whitespace-nowrap`}
        style={{
          left: step.numberLeft,
          top: step.numberTop,
          backgroundImage: STEP_NUMBER_GRADIENT,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
        aria-hidden
      >
        {step.number.split(" ")[0]}
      </span>

      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </article>
  );
}

function ProductsModelForgeMobile({
  heading,
  subtitle,
  steps,
  primary,
  secondary,
}: {
  heading: string;
  subtitle: string;
  steps: any[];
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}) {
  const fitRef = useFitText<HTMLHeadingElement>({});
  return (
    <section
      className="relative w-full overflow-hidden bg-black min-[1024px]:hidden"
      aria-label="ModelForge workflow"
      data-node-id="3568:4778"
    >
      <div className="relative mx-auto w-full" style={{ maxWidth: 393 }}>

        {/* ── Header ── */}
        <div className="flex flex-col items-center gap-[10px] px-[21px] pt-[40px]">
          <TagBadge
            label="Build with GPX10PRO"
            width={160}
            height={27}
            centerLabel
            leftBarLeft={5.7}
            rightBarLeft={151.16}
            labelClassName="text-[12px] leading-[20.149px] tracking-[-0.36px]"
          />
          {/* Title */}
          <div className="relative">
            <h2
              ref={fitRef}
              className={`${gilroyMedium.className} w-[350px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage:
                  "linear-gradient(107.454deg, rgb(255,255,255) 1.3527%, rgb(212,233,188) 55.161%, rgb(255,255,255) 111.67%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {heading}
            </h2>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </div>
          {/* Description */}
          <p
            className={`${interRegular.className} w-[350px] text-center text-[14px] leading-[16px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
          >
            {subtitle}
          </p>
        </div>

        {/* ── Cards ── */}
        <div className="mx-auto mt-[26px] flex w-full flex-col items-center gap-[24px]">
          {steps.map((step) => (
            <div
              key={step.nodeId}
              className="relative shrink-0 flex items-start justify-center"
              style={{
                transform: "scale(0.9)",
                transformOrigin: "top center",
                height: `${(step.cta ? 480 : 400) * 0.9}px`,
                width: `${354 * 0.9}px`,
              }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2"
                style={{ width: 354, height: step.cta ? 480 : 400 }}
              >
                <MobileModelForgeCard step={step} />
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA row ── */}
        <div className="mx-auto mt-[32px] flex w-full max-w-[343px] flex-row gap-[8px] px-[12px] pb-[40px]">
          {/* Primary */}
          <a
            href={primary.href}
            className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] flex-1 items-center justify-center overflow-hidden`}
          >
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
            <AnimatedDotsBackground />
            <span className="relative text-[9px] sm:text-[11px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
              {primary.label}
            </span>
            <span aria-hidden className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`} />
            <GreenCtaCorners />
          </a>
          {/* Secondary */}
          <a
            href={secondary.href}
            className={`${gilroyMedium.className} relative flex h-[48px] flex-1 items-center justify-center overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.25)]`}
            style={{ backgroundColor: SECONDARY_CTA_BG }}
          >
            <span className="relative text-[9px] sm:text-[11px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
              {secondary.label}
            </span>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Mobile ModelForge card — Figma 3572:8993 (354×400; card 01 grows to 480 for the CTA) ── */
function MobileModelForgeCard({ step }: { step: any }) {
  return (
    <article
      className="relative w-[354px] shrink-0 overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.2)]"
      style={{ height: step.cta ? 480 : 400 }}
      data-node-id={step.nodeId}
      data-name="Article"
    >
      {/* NewsSection — content area at (32, 16) */}
      <div className="absolute left-[32px] top-[16px] w-[290px]" data-name="NewsSection">
        {/* Image */}
        {step.image && (
          <div className="absolute left-[-16px] top-0 h-[210px] w-[322px] overflow-hidden" data-name="image" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" alt="" src={step.image} className="absolute inset-0 size-full object-cover" />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0) 88.146%, #000000 100%)" }}
            />
          </div>
        )}
        {/* Step number — 70px watermark */}
        <span
          className={`${gilroyMedium.className} pointer-events-none absolute left-[15px] top-[215px] bg-clip-text text-[70px] leading-[64px] font-medium text-transparent opacity-50 not-italic whitespace-nowrap`}
          style={{
            backgroundImage: STEP_NUMBER_GRADIENT,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
          aria-hidden
        >
          {step.number.split(" ")[0]}
        </span>
        {/* Title + description (+ CTA on card 01) */}
        <div className="absolute left-[-16px] top-[259px] flex w-[322px] flex-col gap-[5px]">
          <h3
            className={`${gilroyMedium.className} text-[24px] leading-[38px] font-medium text-white not-italic [word-break:break-word]`}
          >
            {step.title}
          </h3>
          <p
            className={`${interRegular.className} text-[14px] leading-[22px] font-normal tracking-[-0.3125px] text-[#99a1af] not-italic [word-break:break-word]`}
          >
            {step.description}
          </p>
          {step.cta ? (
            <a
              href={step.cta.href}
              className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative mt-[7px] flex h-[48px] w-[251px] shrink-0 items-center justify-center overflow-hidden text-[16px] leading-[28px] text-white uppercase not-italic`}
              data-node-id="5212:6997"
              data-name="Cta"
            >
              <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
              <span className="relative whitespace-nowrap">{step.cta.label}</span>
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
              <span aria-hidden className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`} />
            </a>
          ) : null}
        </div>
      </div>
      {/* Corner ticks */}
      <Corners leftSrc="/hero/vector-57.svg" rightSrc="/hero/vector-55.svg" />
    </article>
  );
}

function MenuChip({ label }: { label: string }) {
  return (
    <div
      className={`${dmMono.className} bg-[rgba(255,255,255,0.06)] flex gap-[6px] h-[27px] items-center overflow-clip px-[24px] relative shrink-0 border-[0.5px] border-solid border-[rgba(240,240,240,0.25)]`}
      data-name="Menu"
    >
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] leading-[20px] not-italic relative shrink-0 text-[#ecfae5] text-[13px] tracking-[-0.4px] uppercase whitespace-nowrap">
        {label}
      </p>
      <div
        className="absolute bg-white h-[12px] left-[12px] opacity-60 top-1/2 -translate-y-1/2 w-[2px]"
        aria-hidden
      />
      <div
        className="absolute bg-white h-[12px] opacity-60 right-[12px] top-1/2 -translate-y-1/2 w-[2px]"
        aria-hidden
      />
    </div>
  );
}
