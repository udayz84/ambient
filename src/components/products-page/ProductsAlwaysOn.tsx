/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { dmMono, gilroyMedium, interBold, interRegular, interSemiBold } from "../hero/fonts";

/**
 * "Always on. Never asleep." section — Figma 3708:462 (1440×833).
 * The Subconscious / Reflex Surge toggle crossfades the chip visual between
 * the baseline render and the surge render, and moves the switch.
 */

const BG_SURGE = "/products/alwayson/bg-surge.png";
const BG_SUBCONSCIOUS = "/notfound/ChatGPT%20Image%20Jul%2024,%202026,%2005_14_17%20PM.png";
const AI_CORE_ICON = "/products/alwayson/ai-core-icon.png";
const HOST_CPU_IMG = "/products/alwayson/host-cpu.png";
const CORNER_42 = "/products/alwayson/corner-42.svg";
const CORNER_43 = "/products/alwayson/corner-43.svg";
const CORNER_44 = "/products/alwayson/corner-44.svg";
const CORNER_45 = "/products/alwayson/corner-45.svg";
const CORNER_55 = "/products/alwayson/corner-55.svg";
const CORNER_58 = "/products/alwayson/corner-58.svg";
const GLOW_SWOOSH = "/products/alwayson/glow-swoosh.svg";
const CARD_CORNERS = "/products/alwayson/card-corners.svg";
const CARD_ICON = "/products/alwayson/card-icon.svg";
const LINE_920 = "/products/alwayson/line-920.svg";
const DOT_GREEN = "/products/alwayson/dot-green.svg";
const BRACKET_LEFT = "/products/alwayson/bracket-left.svg";
const BRACKET_RIGHT = "/products/alwayson/bracket-right.svg";
const ON_DOT_OUTER = "/products/alwayson/on-dot-outer.svg";
const ON_DOT_INNER = "/products/alwayson/on-dot-inner.svg";
const ON_GLOW = "/products/alwayson/on-glow.svg";

const TITLE_GRADIENT =
  "linear-gradient(124.465deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const CARD_BG =
  "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgba(15, 14, 14, 0.75) 0%, rgba(15, 14, 14, 0.75) 100%)";

const ICON_TILE_BG = `url("data:image/svg+xml;utf8,<svg viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(2.2748e-14 1.4501 -2.9369 -1.8948e-15 20 -2.403)'><stop stop-color='rgba(57,74,54,1)' offset='0'/><stop stop-color='rgba(43,54,41,1)' offset='0.5'/><stop stop-color='rgba(29,34,28,1)' offset='1'/></radialGradient></defs></svg>")`;

const FALLBACK_HEADING = "Always on. Never asleep.";
const FALLBACK_SUBTITLE =
  "GPX10 Pro runs AI around the clock at microwatts — and the instant something matters, it surges to full power. No reset. No waking up. It was never off.";

/* ── Four corner ticks (left pair / right pair) ──────────────── */
function FrameCorners({
  leftSrc,
  rightSrc,
  size = 4,
}: {
  leftSrc: string;
  rightSrc: string;
  size?: number;
}) {
  const dim = { width: size, height: size } as const;
  return (
    <>
      <div className="absolute flex items-center justify-center left-0 top-0" style={dim} aria-hidden>
        <div className="-scale-y-100 flex-none">
          <div className="relative" style={dim}>
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <img alt="" className="block max-w-none size-full" src={leftSrc} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center right-0 top-0" style={dim} aria-hidden>
        <div className="flex-none rotate-180">
          <div className="relative" style={dim}>
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <img alt="" className="block max-w-none size-full" src={rightSrc} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0" style={dim} aria-hidden>
        <div className="absolute inset-[0_0_-12.5%_-12.5%]">
          <img alt="" className="block max-w-none size-full" src={leftSrc} />
        </div>
      </div>
      <div className="absolute bottom-0 flex items-center justify-center right-0" style={dim} aria-hidden>
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="relative" style={dim}>
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <img alt="" className="block max-w-none size-full" src={rightSrc} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── "The signature mode" badge ──────────────────────────────── */
function SectionBadge() {
  return (
    <div
      className="bg-[rgba(255,255,255,0.06)] h-[27px] overflow-clip relative shrink-0 w-[170px]"
      data-node-id="3710:1859"
      data-name="Menu"
    >
      <FrameCorners leftSrc={CORNER_42} rightSrc={CORNER_43} size={4.133} />
      <p
        className={`${dmMono.className} [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute leading-[20.149px] left-[calc(50%-69.5px)] not-italic text-[#ecfae5] text-[13.433px] top-[calc(50%-4.5px)] tracking-[-0.403px] uppercase whitespace-nowrap`}
        data-node-id="3710:1864"
      >
        The signature mode
      </p>
      <div className="-translate-y-1/2 absolute bg-white h-[12.399px] left-[6.7px] opacity-60 top-1/2 w-[2.067px]" data-name="Indicator" />
      <div className="-translate-y-1/2 absolute bg-white h-[12.399px] opacity-60 right-[7px] top-1/2 w-[2.067px]" data-name="Indicator" />
    </div>
  );
}

/* ── Card badge ("power" / "Performance") ────────────────────── */
function CardBadge({ label, width }: { label: string; width: number }) {
  return (
    <div
      className="bg-[rgba(255,255,255,0.06)] h-[26px] overflow-clip relative shrink-0"
      style={{ width }}
      data-name="Menu"
    >
      <FrameCorners leftSrc={CORNER_44} rightSrc={CORNER_45} />
      <p
        className={`${dmMono.className} -translate-x-1/2 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute leading-[19.5px] left-[calc(50%-0.5px)] not-italic text-[#ecfae5] text-[13px] text-center top-[calc(50%-4.5px)] tracking-[-0.39px] uppercase whitespace-nowrap`}
      >
        {label}
      </p>
      <div className="-translate-y-1/2 absolute bg-white h-[12px] left-[6.48px] opacity-60 top-1/2 w-[2px]" data-name="Secondary Menu Indicator" />
      <div className="-translate-y-1/2 absolute bg-white h-[12px] opacity-60 right-[7.52px] top-1/2 w-[2px]" data-name="Menu Indicator" />
    </div>
  );
}

/* ── Glow swoosh shared by cards and the toggle frame ────────── */
function GlowSwoosh({ top = -25.66 }: { top?: number }) {
  return (
    <div
      className="pointer-events-none absolute h-[168.649px] left-[90px] w-[234.951px]"
      style={{ top }}
      aria-hidden
    >
      <div className="absolute inset-[-119.54%_-85.81%]">
        <img alt="" className="block max-w-none size-full" src={GLOW_SWOOSH} />
      </div>
    </div>
  );
}

/* ── Stat card (power / performance) ─────────────────────────── */
function StatCard({
  badgeLabel,
  badgeWidth,
  stat,
  sub,
  footerLabel,
  className = "",
}: {
  badgeLabel: string;
  badgeWidth: number;
  stat: string;
  sub: string;
  footerLabel: string;
  className?: string;
}) {
  return (
    <div
      className={`h-[218px] overflow-clip w-[364px] ${className}`}
      data-name="Lower power consumption"
    >
      <div
        className="absolute border-[0.5px] border-[rgba(255,255,255,0.1)] border-solid h-[217.5px] left-0 top-0 w-[364px]"
        style={{ backgroundImage: CARD_BG }}
      />
      <GlowSwoosh />
      <div
        className="pointer-events-none absolute h-[216.994px] left-[-23.61px] top-[0.51px] w-[387.605px]"
        data-name="Cornor Elements"
        aria-hidden
      >
        <div className="absolute inset-[-0.23%_-0.13%]">
          <img alt="" className="block max-w-none size-full" src={CARD_CORNERS} />
        </div>
      </div>
      <div
        className="absolute left-[29px] rounded-[6.667px] size-[40px] top-[21px]"
        style={{ backgroundImage: ICON_TILE_BG }}
        data-name="Icon"
      >
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[26.667px] left-1/2 top-1/2 w-[28.148px]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={CARD_ICON} />
        </div>
      </div>
      <div className="absolute flex gap-[27.778px] items-center left-[85px] top-[27.67px]" data-name="Logo and Menu">
        <CardBadge label={badgeLabel} width={badgeWidth} />
      </div>
      <p
        className={`${gilroyMedium.className} [word-break:break-word] absolute leading-[38px] left-[32.75px] not-italic text-[32px] text-white top-[73.28px] whitespace-nowrap`}
      >
        {stat}
      </p>
      <p
        className={`${gilroyMedium.className} [word-break:break-word] absolute leading-[28px] left-[34.01px] not-italic text-[22px] text-white top-[116.99px] whitespace-nowrap`}
      >
        {sub}
      </p>
      <p
        className={`${interRegular.className} [word-break:break-word] absolute font-normal leading-[24px] left-[53.69px] not-italic text-[14px] text-white top-[166.76px] uppercase whitespace-nowrap`}
      >
        {footerLabel}
      </p>
      <div className="-translate-x-1/2 absolute h-0 left-1/2 top-[157.48px] w-[300px]" aria-hidden>
        <div className="absolute inset-[-1px_0_0_0]">
          <img alt="" className="block max-w-none size-full" src={LINE_920} />
        </div>
      </div>
      <div className="absolute left-[34.01px] size-[8px] top-[174.76px]" aria-hidden>
        <div className="absolute inset-[-12.5%]">
          <img alt="" className="block max-w-none size-full" src={DOT_GREEN} />
        </div>
      </div>
    </div>
  );
}

/* ── "ON" chips (AI CORE / HOST CPU) ─────────────────────────── */
function OnChip({
  label,
  width,
  icon,
  active = true,
  className = "",
}: {
  label: string;
  width: number;
  icon: "ai" | "cpu";
  active?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`h-[50px] overflow-clip transition-colors duration-[1200ms] ease-in-out ${
        active ? "bg-[rgba(56,99,41,0.31)]" : "bg-[rgba(58,58,58,0.7)]"
      } ${className}`}
      style={{ width }}
      data-name="ON"
    >
      <div className="-translate-y-1/2 absolute left-[6.53px] size-[10.656px] top-1/2" aria-hidden>
        <img alt="" className={`absolute block inset-0 max-w-none size-full transition-all duration-[1200ms] ease-in-out ${active ? "grayscale-0 opacity-100" : "grayscale opacity-50"}`} src={ON_DOT_OUTER} />
      </div>
      <div
        className={`-translate-x-1/2 pointer-events-none absolute h-[110.447px] top-[-25.66px] w-[126.547px] transition-opacity duration-[1200ms] ease-in-out ${
          active ? "opacity-100" : "opacity-0"
        }`}
        style={{ left: `calc(50% + ${icon === "ai" ? 16.27 : 17.77}px)` }}
        aria-hidden
      >
        <div className="absolute inset-[-182.53%_-159.31%]">
          <img alt="" className="block max-w-none size-full" src={ON_GLOW} />
        </div>
      </div>
      {icon === "ai" ? (
        <div className={`-translate-y-1/2 absolute h-[36px] left-[24.62px] top-1/2 w-[37.756px] transition-all duration-[1200ms] ease-in-out ${active ? "grayscale-0 opacity-100" : "grayscale opacity-50"}`} aria-hidden>
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={AI_CORE_ICON} />
        </div>
      ) : (
        <div
          className={`-translate-x-1/2 -translate-y-1/2 absolute h-[40.126px] left-[calc(50%-40.43px)] top-1/2 w-[63.077px] transition-all duration-[1200ms] ease-in-out ${
            active ? "mix-blend-luminosity opacity-100 grayscale-0" : "mix-blend-normal opacity-50 grayscale"
          }`}
          data-name="image 76"
          aria-hidden
        >
          <img alt="" className="absolute inset-0 max-w-none object-bottom pointer-events-none size-full" src={HOST_CPU_IMG} />
        </div>
      )}
      <p
        className={`${interSemiBold.className} -translate-x-1/2 [word-break:break-word] absolute font-semibold leading-[24px] not-italic text-[16px] text-center top-[13px] whitespace-pre transition-colors duration-[1200ms] ease-in-out ${
          active ? "text-[#63da38]" : "text-[#aaaaaa]"
        }`}
        style={{ left: icon === "ai" ? 103.02 : 103.52 }}
      >
        {label}
      </p>
      <div className="-translate-y-1/2 absolute left-[8.29px] size-[7.129px] top-1/2" aria-hidden>
        <img alt="" className={`absolute block inset-0 max-w-none size-full transition-all duration-[1200ms] ease-in-out ${active ? "grayscale-0 opacity-100" : "grayscale opacity-50"}`} src={ON_DOT_INNER} />
      </div>
    </div>
  );
}

/* ── Toggle switch ───────────────────────────────────────────── */
function SurgeSwitch({
  surge,
  onToggle,
}: {
  surge: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={surge}
      aria-label="Toggle Reflex Surge"
      onClick={onToggle}
      className={`-translate-x-1/2 absolute block cursor-pointer h-[40px] left-[calc(50%+5.25px)] rounded-[100px] top-[19px] w-[73.333px] transition-colors duration-[1200ms] ease-in-out ${
        surge ? "bg-[#6fe047]" : "bg-[#3a3a3a]"
      }`}
      data-name="Switch"
    >
      <div
        className="absolute bg-[#112f06] rounded-[100px] shadow-[0px_3.333px_6.667px_0px_rgba(39,39,39,0.1)] size-[33.333px] left-[3.33px] top-[3.33px] transition-transform duration-[1200ms] ease-in-out will-change-transform"
        style={{ transform: surge ? "translateX(33.34px)" : "translateX(0px)" }}
        data-name="Switch"
      />
    </button>
  );
}

/* ── Toggle frame (desktop absolute / mobile static) ─────────── */
function ToggleFrame({
  surge,
  onToggle,
  className = "",
}: {
  surge: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <div
      className={`bg-[rgba(0,0,0,0.1)] h-[80px] overflow-clip w-[410px] ${className}`}
      data-name="Lower power consumption"
    >
      <GlowSwoosh top={-25.16} />
      <SurgeSwitch surge={surge} onToggle={onToggle} />
      <p
        className={`${interBold.className} -translate-x-1/2 [word-break:break-word] absolute font-bold leading-[21px] left-[calc(50%-115.41px)] not-italic text-[18px] text-white text-center top-[calc(50%-11.5px)] whitespace-nowrap transition-all duration-[1200ms] ease-in-out origin-right ${
          surge ? "opacity-70 scale-[0.85]" : "opacity-100 scale-100"
        }`}
      >
        Subconscious
      </p>
      <p
        className={`${interBold.className} [word-break:break-word] absolute font-bold leading-[21px] left-[calc(50%+67.23px)] not-italic text-[18px] text-white top-[calc(50%-11.5px)] whitespace-nowrap transition-all duration-[1200ms] ease-in-out origin-left ${
          surge ? "opacity-100 scale-100" : "opacity-70 scale-[0.85]"
        }`}
      >
        Reflex Surge
      </p>
      <FrameCorners leftSrc={CORNER_44} rightSrc={CORNER_45} />
    </div>
  );
}

/* ── Section title block ─────────────────────────────────────── */
function SectionTitle({ heading, subtitle }: { heading: string; subtitle: string }) {
  return (
    <>
      <SectionBadge />
      <div className="flex flex-col items-center px-[10px] relative shrink-0" data-name="Title">
        <h2
          className={`${gilroyMedium.className} [word-break:break-word] bg-clip-text leading-[49px] not-italic relative shrink-0 text-[46px] text-center text-transparent whitespace-nowrap`}
          style={{
            backgroundImage: TITLE_GRADIENT,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {heading}
        </h2>
        <FrameCorners leftSrc={CORNER_58} rightSrc={CORNER_55} />
      </div>
      <p
        className={`${interRegular.className} [word-break:break-word] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[#f0f0f0] text-center w-[540px]`}
      >
        {subtitle}
      </p>
    </>
  );
}

export function ProductsAlwaysOn({ data }: { data?: any }) {
  const heading = data?.heading || FALLBACK_HEADING;
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const [surge, setSurge] = useState(true);
  const toggle = () => setSurge((v) => !v);

  return (
    <>
      {/* DESKTOP (>=1024px) — Figma 3708:462, 1440×833 */}
      <section
        className="relative mx-auto hidden w-full bg-black min-[1024px]:block"
        aria-label="Always on"
      >
        <div
          className="bg-black h-[833px] overflow-clip relative mx-auto w-[1440px]"
          data-node-id="3708:462"
        >
          {/* Chip visual — subconscious (baseline) render, always underneath */}
          <div
            className="-translate-x-1/2 absolute h-[810.43px] left-1/2 top-[32.55px] w-[1440px]"
            data-name="ChatGPT Image Jul 2, 2026, 12_54_47 PM 1"
          >
            <img
              alt=""
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={BG_SUBCONSCIOUS}
            />
          </div>
          {/* Chip visual — surge render, fades smoothly over the baseline */}
          <div
            className="-translate-x-1/2 absolute h-[832.553px] left-1/2 top-0 w-[1440px] transition-opacity duration-[1200ms] ease-in-out will-change-[opacity]"
            style={{ opacity: surge ? 1 : 0 }}
            data-name="ChatGPT Image Jul 2, 2026, 12_54_47 PM 2"
            aria-hidden={!surge}
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                alt=""
                className="absolute h-[99.93%] left-[0.02%] max-w-none top-[0.07%] w-[99.97%]"
                src={BG_SURGE}
              />
            </div>
          </div>

          {/* Section Title */}
          <div
            className="-translate-x-1/2 absolute flex flex-col gap-[12px] items-center justify-center left-1/2 top-[37.55px]"
            data-name="Section Title"
          >
            <SectionTitle heading={heading} subtitle={subtitle} />
          </div>

          {/* Caption */}
          <p
            className={`${interRegular.className} -translate-x-1/2 [word-break:break-word] absolute font-normal leading-[18px] left-1/2 not-italic text-[12px] text-[#bbbbbb] text-center top-[768.96px] uppercase w-[540px]`}
          >
            Return to the baseline
          </p>

          {/* Stat cards */}
          <StatCard
            className="absolute left-[990px] top-[535.55px]"
            badgeLabel="Performance"
            badgeWidth={137}
            stat="512 GOPS "
            sub="instant"
            footerLabel="REFLEX SURGE"
          />
          <StatCard
            className="absolute left-[86px] top-[535.55px]"
            badgeLabel="power"
            badgeWidth={97}
            stat="< 100 uW"
            sub="always on AI"
            footerLabel="Continuous pulse"
          />

          {/* Toggle */}
          <ToggleFrame surge={surge} onToggle={toggle} className="absolute left-[515px] top-[671.05px]" />

          {/* Brackets under the cards */}
          <div className="absolute h-[52.627px] left-[491.15px] top-[724.84px] w-[164.886px]" data-name="Vector" aria-hidden>
            <div className="absolute inset-[-5.49%_0_-0.95%_-0.3%]">
              <img alt="" className="block max-w-none size-full" src={BRACKET_LEFT} />
            </div>
          </div>
          <div className="absolute flex h-[52.627px] items-center justify-center left-[784.23px] top-[724.84px] w-[164.886px]" aria-hidden>
            <div className="-scale-y-100 flex-none rotate-180">
              <div className="h-[52.627px] relative w-[164.886px]" data-name="Vector">
                <div className="absolute inset-[-5.07%_0_-0.95%_-0.3%]">
                  <img alt="" className="block max-w-none size-full" src={BRACKET_RIGHT} />
                </div>
              </div>
            </div>
          </div>

          {/* ON chips */}
          <OnChip label="AI CORE" width={144} icon="ai" className="absolute left-[552px] top-[207.55px]" />
          <OnChip label={`HOST  CPU`} width={157} icon="cpu" active={surge} className="absolute left-[715px] top-[207.55px]" />
        </div>
      </section>

      {/* MOBILE (<1024px) */}
      <section
        className="relative w-full overflow-hidden bg-black min-[1024px]:hidden"
        aria-label="Always on"
      >
        <div className="flex flex-col items-center gap-[16px] px-[24px] pt-[64px]">
          <SectionBadge />
          <div className="relative flex flex-col items-center px-[10px]">
            <h2
              className={`${gilroyMedium.className} bg-clip-text text-center text-[30px] leading-[34px] font-medium text-transparent not-italic`}
              style={{
                backgroundImage: TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {heading}
            </h2>
            <FrameCorners leftSrc={CORNER_58} rightSrc={CORNER_55} />
          </div>
          <p className={`${interRegular.className} text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic`}>
            {subtitle}
          </p>
        </div>

        {/* ON chips */}
        <div className="mt-[24px] flex flex-wrap items-center justify-center gap-[12px] px-[24px]">
          <OnChip label="AI CORE" width={144} icon="ai" className="relative" />
          <OnChip label={`HOST  CPU`} width={157} icon="cpu" active={surge} className="relative" />
        </div>

        {/* Chip visual */}
        <div className="relative mt-[16px] aspect-[1440/832.55] w-full overflow-hidden">
          <img
            alt=""
            src={BG_SUBCONSCIOUS}
            className="absolute inset-0 size-full object-cover"
          />
          <img
            alt=""
            src={BG_SURGE}
            className="absolute inset-0 size-full object-cover transition-opacity duration-[1200ms] ease-in-out will-change-[opacity]"
            style={{ opacity: surge ? 1 : 0 }}
            aria-hidden={!surge}
          />
        </div>

        {/* Stat cards — 364px design scaled down proportionally on narrow screens */}
        <div className="mt-[24px] flex w-full flex-col items-center gap-[20px] px-[24px]">
          <div className="relative aspect-[364/218] w-full max-w-[364px]">
            <div className="absolute left-0 top-0 origin-top-left scale-[min(1,calc((100vw_-_48px)/364))]">
              <StatCard
                className="relative"
                badgeLabel="power"
                badgeWidth={97}
                stat="< 100 uW"
                sub="always on AI"
                footerLabel="Continuous pulse"
              />
            </div>
          </div>
          <div className="relative aspect-[364/218] w-full max-w-[364px]">
            <div className="absolute left-0 top-0 origin-top-left scale-[min(1,calc((100vw_-_48px)/364))]">
              <StatCard
                className="relative"
                badgeLabel="Performance"
                badgeWidth={137}
                stat="512 GOPS "
                sub="instant"
                footerLabel="REFLEX SURGE"
              />
            </div>
          </div>
        </div>

        {/* Toggle — 410px design scaled down proportionally on narrow screens */}
        <div className="mt-[24px] flex justify-center px-[24px]">
          <div className="relative aspect-[410/80] w-full max-w-[410px]">
            <div className="absolute left-0 top-0 origin-top-left scale-[min(1,calc((100vw_-_48px)/410))]">
              <ToggleFrame surge={surge} onToggle={toggle} className="relative" />
            </div>
          </div>
        </div>

        <p
          className={`${interRegular.className} mt-[16px] px-[24px] pb-[64px] text-center text-[12px] leading-[18px] font-normal uppercase text-[#bbbbbb] not-italic`}
        >
          Return to the baseline
        </p>
      </section>
    </>
  );
}
