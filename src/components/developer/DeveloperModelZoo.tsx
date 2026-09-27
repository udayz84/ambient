"use client";

import { Fragment } from "react";
import type { CSSProperties } from "react";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { useFadeIn, getFadeInClass } from "../shared/useFadeIn";
import { PRIMARY_CTA_SHADOW } from "./developer-data";
import { mediaUrl } from "@/lib/strapi";

/**
 * Figma 5212:6804 — "model zoo" section (1440×656).
 * Title/subtitle → 3 stats with grid-line dividers → primary CTA.
 */

const TITLE = "Start from a model that works.";
const SUBTITLE =
  "Don’t start from a blank file. Begin with a pre-trained model from the Ambient Model Zoo and adapt it to your data.";
const CTA_LABEL = "Browse the Model Zoo";
const CTA_HREF = "/model-zoo";

// Same gradient family as SECTION_TITLE_GRADIENT but at this section's 106.33° angle.
const TITLE_GRADIENT =
  "linear-gradient(106.33242104960644deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const CORNER = "/developer/corner-58.svg";
const GRID_CAP = "/developer/model-zoo-grid-cap.svg";

const STATS = [
  {
    icon: "/developer/model-zoo-icon-1.svg",
    iconWidth: 42.11,
    text: "A growing library of open-source and Ambient-built models, all tuned for GPX.",
  },
  {
    icon: "/developer/model-zoo-icon-2.svg",
    iconWidth: 42.02,
    text: "One-click deploy to your dev or eval kit.",
  },
  {
    icon: "/developer/model-zoo-icon-3.svg",
    iconWidth: 42,
    text: "Retrain or transfer-learn on your own data when you’re ready.",
  },
];

export const MODEL_ZOO_TITLE = TITLE;
export const MODEL_ZOO_SUBTITLE = SUBTITLE;
export const MODEL_ZOO_CTA_LABEL = CTA_LABEL;
export const MODEL_ZOO_CTA_HREF = CTA_HREF;
export const MODEL_ZOO_STATS = STATS;
export const MODEL_ZOO_TITLE_GRADIENT = TITLE_GRADIENT;

/** 4px L-corner tick — matches Figma flip variants on 5212:6818–6821. */
function CornerTick({
  placement,
  className = "",
  style,
}: {
  placement: "tl" | "tr" | "bl" | "br";
  className?: string;
  style?: CSSProperties;
}) {
  const flipClass =
    placement === "tl"
      ? "-scale-y-100"
      : placement === "tr"
        ? "rotate-180"
        : placement === "br"
          ? "-scale-y-100 rotate-180"
          : "";
  const inner = (
    <div className="absolute inset-[0_0_-12.5%_-12.5%]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy" decoding="async" alt="" className="block size-full max-w-none" src={CORNER} aria-hidden />
    </div>
  );
  return (
    <div
      className={`pointer-events-none absolute flex size-[4px] items-center justify-center ${className}`}
      style={style}
      aria-hidden
    >
      {flipClass ? (
        <div className={`${flipClass} flex-none`}>
          <div className="relative size-[4px]">{inner}</div>
        </div>
      ) : (
        <div className="relative size-[4px]">{inner}</div>
      )}
    </div>
  );
}

/** Vertical grid divider with T-caps — Figma 5212:6830/6840 "Grid Line'". */
function GridLine() {
  return (
    <div className="relative w-[8px] shrink-0 self-stretch overflow-clip">
      {/* Line 87 — 1px white/10, clipped to divider height */}
      <div className="absolute left-[3.5px] top-[4px] h-[259px] w-px bg-white/10" />
      {/* Vector 43 caps */}
      <div className="absolute left-0 top-[0.46px] flex h-[4px] w-[8px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative h-[4px] w-[8px]">
            <div className="absolute inset-[0_0_-12.5%_0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" alt="" className="block size-full max-w-none" src={GRID_CAP} aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[0.5px] left-0 h-[4px] w-[8px]">
        <div className="absolute inset-[0_0_-12.5%_0]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async" alt="" className="block size-full max-w-none" src={GRID_CAP} aria-hidden />
        </div>
      </div>
    </div>
  );
}

/** Merge CMS (developer.model-zoo) data over the hardcoded Figma defaults. */
export function resolveModelZooContent(data: any): {
  heading: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  stats: { icon: string; iconWidth: number; text: string }[];
} {
  const stats =
    data?.stats && Array.isArray(data.stats) && data.stats.length > 0
      ? data.stats.map((stat: any, i: number) => ({
          icon: mediaUrl(stat.icon) || STATS[i % STATS.length].icon,
          iconWidth: STATS[i]?.iconWidth ?? 42,
          text: stat.text,
        }))
      : STATS;
  return {
    heading: data?.heading || TITLE,
    subtitle: data?.subtitle || SUBTITLE,
    ctaLabel: data?.cta_label || CTA_LABEL,
    ctaHref: data?.cta_href || CTA_HREF,
    stats,
  };
}

export function DeveloperModelZoo({ data }: { data?: any }) {
  const { fadeRef, isVisible } = useFadeIn();
  const { heading, subtitle, ctaLabel, ctaHref, stats } = resolveModelZooContent(data);

  return (
    <div
      className="absolute overflow-clip bg-black"
      style={{
        left: 0,
        top: "calc(3013px + var(--developer-pipeline-offset, 0px))",
        width: 1440,
        height: 656,
        transition: "top 300ms ease-in-out",
      }}
      data-node-id="5212:6804"
      data-name="model zoo"
    >
      {/* Ellipse 177 glow — 5212:6805 "No Rewrite. No Friction." */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{ left: 32, top: 76, width: 1310, height: 413 }}
        data-node-id="5212:6805"
      >
        <div className="absolute inset-[-48.43%_-15.27%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async" alt="" src="/developer/model-zoo-bg-glow.svg" className="block size-full max-w-none" />
        </div>
      </div>

      {/* Ellipse 16209 — 5212:6813 */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{ left: 216, top: 96, width: 1007, height: 471 }}
        data-node-id="5212:6813"
      >
        <div className="absolute inset-[-26.45%_-12.37%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async" alt="" src="/developer/model-zoo-ellipse.svg" className="block size-full max-w-none" />
        </div>
      </div>

      {/* Content */}
      <div
        ref={fadeRef}
        className={`absolute inset-0 ${getFadeInClass(isVisible)}`}
      >
        {/* Header — 5212:6814 */}
        <div
          className="absolute left-1/2 flex w-[800px] -translate-x-1/2 flex-col items-center gap-[24px]"
          style={{ top: 60 }}
          data-node-id="5212:6814"
        >
          {/* Section Title — 5212:6815/6816 */}
          <div className="flex flex-col items-center justify-center" data-node-id="5212:6815">
            <div
              className="relative flex flex-col items-center px-[10px]"
              data-node-id="5212:6816"
              data-name="Title"
            >
              <h2
                className={`${gilroyMedium.className} w-[444px] bg-clip-text text-center text-[46px] font-medium not-italic leading-[49px] text-transparent [word-break:break-word]`}
                style={{ backgroundImage: TITLE_GRADIENT }}
                data-node-id="5212:6817"
              >
                {heading}
              </h2>
              <CornerTick placement="tl" className="left-0 top-0" />
              <CornerTick placement="tr" className="right-0 top-0" />
              <CornerTick placement="bl" className="bottom-0 left-0" />
              <CornerTick placement="br" className="bottom-0 right-0" />
            </div>
          </div>
          <p
            className={`${interRegular.className} w-[552px] text-center text-[18px] font-normal not-italic leading-[27px] text-[#f0f0f0] opacity-65 [word-break:break-word]`}
            data-node-id="5212:6822"
          >
            {subtitle}
          </p>
        </div>

        {/* Stats row — 5212:6823 */}
        <div
          className="absolute left-[calc(50%-13.68px)] flex -translate-x-1/2 items-start justify-center gap-[32px] bg-[rgba(0,0,0,0.1)] px-[20px]"
          style={{ top: 286 }}
          data-node-id="5212:6823"
        >
          {stats.map((stat, i) => (
            <Fragment key={i}>
              <div
                className="flex h-[203px] w-[340px] flex-col items-start gap-[40px] py-[20px]"
                data-node-id={i === 0 ? "5212:6824" : i === 1 ? "5212:6834" : "5212:6844"}
                data-name="Stat"
              >
                <div
                  className="relative h-[42px] shrink-0"
                  style={{ width: stat.iconWidth }}
                  data-name="Vector"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" alt="" src={stat.icon} className="absolute inset-0 block size-full max-w-none" />
                </div>
                <p
                  className={`${interRegular.className} w-full text-[18px] font-normal not-italic leading-[27px] text-white opacity-90 [word-break:break-word]`}
                >
                  {stat.text}
                </p>
              </div>
              {i < STATS.length - 1 ? <GridLine /> : null}
            </Fragment>
          ))}
          <CornerTick placement="tl" className="left-[0.51px] top-[0.51px]" />
          <CornerTick placement="tr" className="right-[0.52px] top-[0.49px]" />
          <CornerTick placement="bl" className="bottom-[0.5px] left-[0.51px]" />
          <CornerTick placement="br" className="bottom-[0.53px] right-[0.52px]" />
        </div>

        {/* CTA - Primary — 5212:6854 */}
        <a
          href={ctaHref}
          className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} absolute flex h-[48px] w-[250px] items-center justify-center gap-[10px] overflow-hidden px-[20px] py-[10px]`}
          style={{ left: "50%", top: 539, transform: "translateX(-50%)" }}
          data-node-id="5212:6854"
          data-name="CTA - Primary"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
          />
          <span className="relative whitespace-nowrap text-[16px] font-medium uppercase not-italic leading-[28px] text-white">
            {ctaLabel}
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
          />
          <CornerTick placement="tl" className="left-0 top-0" />
          <CornerTick placement="tr" className="right-[0.5px] top-0" />
          <CornerTick placement="bl" className="bottom-0 left-[-0.5px]" />
          <CornerTick placement="br" className="bottom-0 right-[0.5px]" />
        </a>
      </div>
    </div>
  );
}
