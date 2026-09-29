/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useFitText } from "../shared/FitText";
import { mediaUrl } from "@/lib/strapi";
import { dmMono, gilroyMedium, interBold, interRegular, interSemiBold } from "../hero/fonts";
import { TagBadge } from "../hero/TagBadge";
import { Corners } from "../shared/Corners";

/**
 * "Always on. Never asleep." section — Figma 3708:462 (1440×833).
 * The Subconscious / Reflex Surge toggle crossfades the chip visual between
 * the baseline render and the surge render, and moves the switch.
 */

const BG_SURGE = "/products/alwayson/bg-surge-new.webp";
const BG_SUBCONSCIOUS = "/products/alwayson/bg-subconscious-new.webp";
const AI_CORE_ICON = "/products/alwayson/ai-core-icon.webp";
const HOST_CPU_IMG = "/products/alwayson/host-cpu.webp";
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

/* Mobile-only assets — Figma 3565:3127 (393×1050) */
const CARD_CORNERS_MOBILE = "/products/alwayson/card-corners-mobile.svg";
const BRACKET_LEFT_MOBILE = "/products/alwayson/bracket-left-mobile.svg";
const BRACKET_RIGHT_MOBILE = "/products/alwayson/bracket-right-mobile.svg";

const TITLE_GRADIENT =
  "linear-gradient(124.465deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";
const TITLE_GRADIENT_MOBILE =
  "linear-gradient(107.4537261117953deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

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
              <img loading="lazy" decoding="async" alt="" className="block max-w-none size-full" src={leftSrc} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center right-0 top-0" style={dim} aria-hidden>
        <div className="flex-none rotate-180">
          <div className="relative" style={dim}>
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <img loading="lazy" decoding="async" alt="" className="block max-w-none size-full" src={rightSrc} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0" style={dim} aria-hidden>
        <div className="absolute inset-[0_0_-12.5%_-12.5%]">
          <img loading="lazy" decoding="async" alt="" className="block max-w-none size-full" src={leftSrc} />
        </div>
      </div>
      <div className="absolute bottom-0 flex items-center justify-center right-0" style={dim} aria-hidden>
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="relative" style={dim}>
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <img loading="lazy" decoding="async" alt="" className="block max-w-none size-full" src={rightSrc} />
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
    <TagBadge
      label="The signature mode"
      width={170}
      centerLabel
      labelOffsetX={0}
      rightBarLeft={160}
    />
  );
}

/* ── Card badge ("power" / "Performance") ────────────────────── */
function CardBadge({
  label,
  width,
  labelClassName,
}: {
  label: string;
  width: number;
  labelClassName?: string;
}) {
  return (
    <TagBadge
      label={label}
      width={width}
      height={26}
      centerLabel
      labelOffsetX={0}
      rightBarLeft={width - 9.52}
      labelClassName={labelClassName}
    />
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
        <img loading="lazy" decoding="async" alt="" className="block max-w-none size-full" src={GLOW_SWOOSH} />
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
          <img loading="lazy" decoding="async" alt="" className="block max-w-none size-full" src={CARD_CORNERS} />
        </div>
      </div>
      <div
        className="absolute left-[29px] rounded-[6.667px] size-[40px] top-[21px]"
        style={{ backgroundImage: ICON_TILE_BG }}
        data-name="Icon"
      >
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[26.667px] left-1/2 top-1/2 w-[28.148px]">
          <img loading="lazy" decoding="async" alt="" className="absolute block inset-0 max-w-none size-full" src={CARD_ICON} />
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
        className={`${interRegular.className} [word-break:break-word] absolute font-normal leading-[24px] left-[53.69px] not-italic text-[14px] text-white top-[166.76px] uppercase whitespace-nowrap min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
      >
        {footerLabel}
      </p>
      <div className="-translate-x-1/2 absolute h-0 left-1/2 top-[157.48px] w-[300px]" aria-hidden>
        <div className="absolute inset-[-1px_0_0_0]">
          <img loading="lazy" decoding="async" alt="" className="block max-w-none size-full" src={LINE_920} />
        </div>
      </div>
      <div className="absolute left-[34.01px] size-[8px] top-[174.76px]" aria-hidden>
        <div className="absolute inset-[-12.5%]">
          <img loading="lazy" decoding="async" alt="" className="block max-w-none size-full" src={DOT_GREEN} />
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
  aiCoreSrc = AI_CORE_ICON,
  hostCpuSrc = HOST_CPU_IMG,
}: {
  label: string;
  width: number;
  icon: "ai" | "cpu";
  active?: boolean;
  className?: string;
  aiCoreSrc?: string;
  hostCpuSrc?: string;
}) {
  return (
    <div
      className={`h-[50px] overflow-clip transition-colors duration-[400ms] ease-in-out ${
        active ? "bg-[rgba(56,99,41,0.31)]" : "bg-[rgba(58,58,58,0.7)]"
      } ${className}`}
      style={{ width }}
      data-name="ON"
    >
      <div className="-translate-y-1/2 absolute left-[6.53px] size-[10.656px] top-1/2" aria-hidden>
        <img loading="lazy" decoding="async" alt="" className={`absolute block inset-0 max-w-none size-full transition-all duration-[400ms] ease-in-out ${active ? "grayscale-0 opacity-100" : "grayscale opacity-50"}`} src={ON_DOT_OUTER} />
      </div>
      <div
        className={`-translate-x-1/2 pointer-events-none absolute h-[110.447px] top-[-25.66px] w-[126.547px] transition-opacity duration-[400ms] ease-in-out ${
          active ? "opacity-100" : "opacity-0"
        }`}
        style={{ left: `calc(50% + ${icon === "ai" ? 16.27 : 17.77}px)` }}
        aria-hidden
      >
        <div className="absolute inset-[-182.53%_-159.31%]">
          <img loading="lazy" decoding="async" alt="" className="block max-w-none size-full" src={ON_GLOW} />
        </div>
      </div>
      {icon === "ai" ? (
        <div className={`-translate-y-1/2 absolute h-[36px] left-[24.62px] top-1/2 w-[37.756px] transition-all duration-[400ms] ease-in-out ${active ? "grayscale-0 opacity-100" : "grayscale opacity-50"}`} aria-hidden>
          <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={aiCoreSrc} />
        </div>
      ) : (
        <div
          className={`-translate-x-1/2 -translate-y-1/2 absolute h-[40.126px] left-[calc(50%-40.43px)] top-1/2 w-[63.077px] transition-all duration-[400ms] ease-in-out ${
            active ? "mix-blend-luminosity opacity-100 grayscale-0" : "mix-blend-normal opacity-50 grayscale"
          }`}
          data-name="image 76"
          aria-hidden
        >
          <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-bottom pointer-events-none size-full" src={hostCpuSrc} />
        </div>
      )}
      <p
        className={`${interSemiBold.className} -translate-x-1/2 [word-break:break-word] absolute font-semibold leading-[24px] not-italic text-[16px] text-center top-[13px] whitespace-pre transition-colors duration-[400ms] ease-in-out ${
          active ? "text-[#63da38]" : "text-[#aaaaaa]"
        }`}
        style={{ left: icon === "ai" ? 103.02 : 103.52 }}
      >
        {label}
      </p>
      <div className="-translate-y-1/2 absolute left-[8.29px] size-[7.129px] top-1/2" aria-hidden>
        <img loading="lazy" decoding="async" alt="" className={`absolute block inset-0 max-w-none size-full transition-all duration-[400ms] ease-in-out ${active ? "grayscale-0 opacity-100" : "grayscale opacity-50"}`} src={ON_DOT_INNER} />
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
      className={`-translate-x-1/2 absolute block cursor-pointer h-[40px] left-[calc(50%+5.25px)] rounded-[100px] top-[19px] w-[73.333px] transition-colors duration-[400ms] ease-in-out ${
        surge ? "bg-[#6fe047]" : "bg-[#3a3a3a]"
      }`}
      data-name="Switch"
    >
      <div
        className="absolute bg-[#112f06] rounded-[100px] shadow-[0px_3.333px_6.667px_0px_rgba(39,39,39,0.1)] size-[33.333px] left-[3.33px] top-[3.33px] transition-transform duration-[400ms] ease-in-out will-change-transform"
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
      className={`bg-[rgba(0,0,0,0.1)] border-[0.5px] border-solid border-[rgba(240,240,240,0.25)] h-[80px] overflow-clip w-[410px] max-md:w-[382px] ${className}`}
      data-name="Lower power consumption"
    >
      <GlowSwoosh top={-25.16} />
      <SurgeSwitch surge={surge} onToggle={onToggle} />
      <p
        className={`${interBold.className} -translate-x-1/2 [word-break:break-word] absolute font-bold leading-[21px] left-[calc(50%-115.41px)] not-italic text-[18px] text-white text-center top-[calc(50%-11.5px)] whitespace-nowrap transition-all duration-[400ms] ease-in-out origin-right ${
          surge ? "opacity-70 scale-[0.85]" : "opacity-100 scale-100"
        }`}
      >
        Subconscious
      </p>
      <p
        className={`${interBold.className} [word-break:break-word] absolute font-bold leading-[21px] left-[calc(50%+67.23px)] not-italic text-[18px] text-white top-[calc(50%-11.5px)] whitespace-nowrap transition-all duration-[400ms] ease-in-out origin-left ${
          surge ? "opacity-100 scale-100" : "opacity-70 scale-[0.85]"
        }`}
      >
        Reflex Surge
      </p>
      <Corners leftSrc="/hero/vector-57.svg" rightSrc="/hero/vector-55.svg" />
    </div>
  );
}

/* ── MOBILE: section badge — Figma 4081:8446 (160×27) ────────── */
function MobileSectionBadge() {
  return (
    <TagBadge
      label="The signature mode"
      width={160}
      height={27}
      centerLabel
      labelOffsetX={0}
      leftBarLeft={5.7}
      rightBarLeft={152.16}
      labelClassName="text-[12px] leading-[19.5px] tracking-[-0.36px]"
    />
  );
}

/* ── MOBILE: stat card — Figma 3567:4035 (353×165) ───────────── */
function MobileStatCard({
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
      className={`h-[165px] w-[353px] overflow-clip ${className}`}
      data-name="Lower power consumption"
    >
      <div
        className="absolute left-0 top-0 h-[217.5px] w-[364px] border-[0.5px] border-[rgba(255,255,255,0.1)] border-solid"
        style={{ backgroundImage: CARD_BG }}
      />
      <GlowSwoosh />
      <div
        className="pointer-events-none absolute left-0 top-[0.51px] h-[164.494px] w-[353px]"
        data-name="Cornor Elements"
        aria-hidden
      >
        <div className="absolute inset-[-0.3%_-0.14%]">
          <img loading="lazy" decoding="async" alt="" className="block max-w-none size-full" src={CARD_CORNERS_MOBILE} />
        </div>
      </div>
      <div
        className="absolute left-[19px] top-[21px] size-[40px] rounded-[6.667px]"
        style={{ backgroundImage: ICON_TILE_BG }}
        data-name="Icon"
      >
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[26.667px] left-1/2 top-1/2 w-[28.148px]">
          <img loading="lazy" decoding="async" alt="" className="absolute block inset-0 max-w-none size-full" src={CARD_ICON} />
        </div>
      </div>
      <div className="absolute left-[75px] top-[27.67px] flex items-center gap-[27.778px]" data-name="Logo and Menu">
        <CardBadge
          label={badgeLabel}
          width={badgeWidth}
          labelClassName="text-[12px] leading-[19.5px] tracking-[-0.36px]"
        />
      </div>
      <p
        className={`${gilroyMedium.className} [word-break:break-word] absolute left-[22.75px] leading-[38px] not-italic text-[24px] text-white top-[73.28px] whitespace-nowrap`}
      >
        {stat}
      </p>
      <p
        className={`${gilroyMedium.className} [word-break:break-word] absolute left-[132.01px] leading-[28px] not-italic text-[14px] text-white top-[81.99px] whitespace-nowrap`}
      >
        {sub}
      </p>
      <p
        className={`${interRegular.className} [word-break:break-word] absolute font-normal left-[43.69px] leading-[24px] not-italic text-[14px] text-white top-[127.76px] uppercase whitespace-nowrap min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
      >
        {footerLabel}
      </p>
      <div className="-translate-x-1/2 absolute h-0 left-[calc(50%-9.5px)] top-[118.48px] w-[300px]" aria-hidden>
        <div className="absolute inset-[-1px_0_0_0]">
          <img loading="lazy" decoding="async" alt="" className="block max-w-none size-full" src={LINE_920} />
        </div>
      </div>
      <div className="absolute left-[24.01px] size-[8px] top-[135.76px]" aria-hidden>
        <div className="absolute inset-[-12.5%]">
          <img loading="lazy" decoding="async" alt="" className="block max-w-none size-full" src={DOT_GREEN} />
        </div>
      </div>
    </div>
  );
}

/* ── MOBILE: toggle strip — Figma 4087:8465 (331×69) ─────────── */
function MobileToggleFrame({
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
      className={`h-[69px] w-[331px] overflow-clip bg-[rgba(0,0,0,0.1)] ${className}`}
      data-name="Lower power consumption"
    >
      <GlowSwoosh top={-25.16} />
      <div className="-translate-x-1/2 absolute flex gap-[10px] items-center left-[calc(50%-0.33px)] top-[19px]">
        <p
          className={`${interBold.className} [word-break:break-word] font-bold leading-[21px] not-italic text-[16px] text-white whitespace-nowrap transition-all duration-[400ms] ease-in-out origin-right ${
            surge ? "opacity-70 scale-[0.85]" : "opacity-100 scale-100"
          }`}
        >
          Subconscious
        </p>
        <button
          type="button"
          role="switch"
          aria-checked={surge}
          aria-label="Toggle Reflex Surge"
          onClick={onToggle}
          className={`relative block h-[34px] w-[62.333px] shrink-0 cursor-pointer rounded-[100px] transition-colors duration-[400ms] ease-in-out ${
            surge ? "bg-[#6fe047]" : "bg-[#3a3a3a]"
          }`}
          data-name="Switch"
        >
          <div
            className="absolute bg-[#112f06] rounded-[100px] shadow-[0px_2.833px_5.667px_0px_rgba(39,39,39,0.1)] size-[28.333px] left-[2.83px] top-[2.83px] transition-transform duration-[400ms] ease-in-out will-change-transform"
            style={{ transform: surge ? "translateX(28.34px)" : "translateX(0px)" }}
            data-name="Switch"
          />
        </button>
        <p
          className={`${interBold.className} [word-break:break-word] font-bold leading-[21px] not-italic text-[16px] text-white whitespace-nowrap transition-all duration-[400ms] ease-in-out origin-left ${
            surge ? "opacity-100 scale-100" : "opacity-70 scale-[0.85]"
          }`}
        >
          Reflex Surge
        </p>
      </div>
      <Corners leftSrc={CORNER_42} rightSrc={CORNER_43} />
    </div>
  );
}

/* ── Section title block ─────────────────────────────────────── */
function SectionTitle({ heading, subtitle }: { heading: string; subtitle: string }) {
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 1 });
  return (
    <>
      <SectionBadge />
      <div className="flex flex-col items-center px-[10px] relative shrink-0" data-name="Title">
        <h2
          ref={fitRef}
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
        className={`${interRegular.className} [word-break:break-word] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[#f0f0f0] text-center w-[540px] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
      >
        {subtitle}
      </p>
    </>
  );
}

export function ProductsAlwaysOn({ data }: { data?: any }) {
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 2 });
  const heading = data?.heading || FALLBACK_HEADING;
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const bgSurge = mediaUrl(data?.bg_surge_image) || BG_SURGE;
  const bgSubconscious = mediaUrl(data?.bg_subconscious_image) || BG_SUBCONSCIOUS;
  const aiCoreIcon = mediaUrl(data?.ai_core_icon) || AI_CORE_ICON;
  const hostCpuImg = mediaUrl(data?.host_cpu_image) || HOST_CPU_IMG;
  const [surge, setSurge] = useState(true);
  const toggle = () => setSurge((v) => !v);
  /* Mobile defaults to the baseline (subconscious) render — matches the
     visible picture in Figma 3565:3127. */
  const [surgeMobile, setSurgeMobile] = useState(false);
  const toggleMobile = () => setSurgeMobile((v) => !v);

  return (
    <>
      {/* DESKTOP (>=1024px) — Figma 3708:462, 1440×833 */}
      <section
        className="relative mx-auto hidden w-full bg-black min-[1024px]:block overflow-hidden"
        aria-label="Always on"
      >
        <div
          className="bg-black h-[833px] relative mx-auto w-[1440px]"
          data-node-id="3708:462"
        >
          {/* Chip visual — subconscious (baseline) render, always underneath.
              Calibrated via structural (edge-map) correlation of the two
              source images: baseline maps onto the surge canvas at uniform
              scale 0.992 with offset (-12, +120) full-res px. Derived CSS
              from the surge layer box (1450 x 832.553 at left -5, top 0):
              the crossfade reads as one chip changing state. */}
          <img loading="lazy" decoding="async"
            alt=""
            src={bgSubconscious}
            className="absolute max-w-none pointer-events-none"
            style={{ left: "-11.04px", top: "59.95px", width: "1438.35px", height: "749.22px" }}
          />
          {/* Chip visual — surge render, fades smoothly over the baseline */}
          <div
            className="-translate-x-1/2 absolute h-[832.553px] left-1/2 top-0 w-[1450px] max-w-[120vw] transition-opacity duration-[800ms] ease-in-out will-change-[opacity]"
            style={{ opacity: surge ? 1 : 0 }}
            data-name="ChatGPT Image Jul 2, 2026, 12_54_47 PM 2"
            aria-hidden={!surge}
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img loading="lazy" decoding="async"
                alt=""
                className="absolute h-[99.93%] left-[0.02%] max-w-none top-[0.07%] w-[99.97%]"
                src={bgSurge}
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
            className={`${interRegular.className} -translate-x-1/2 [word-break:break-word] absolute font-normal leading-[24px] left-1/2 not-italic text-[16px] text-[#bbbbbb] text-center top-[768.96px] uppercase w-[540px]`}
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
              <img loading="lazy" decoding="async" alt="" className="block max-w-none size-full" src={BRACKET_LEFT} />
            </div>
          </div>
          <div className="absolute flex h-[52.627px] items-center justify-center left-[784.23px] top-[724.84px] w-[164.886px]" aria-hidden>
            <div className="-scale-y-100 flex-none rotate-180">
              <div className="h-[52.627px] relative w-[164.886px]" data-name="Vector">
                <div className="absolute inset-[-5.07%_0_-0.95%_-0.3%]">
                  <img loading="lazy" decoding="async" alt="" className="block max-w-none size-full" src={BRACKET_RIGHT} />
                </div>
              </div>
            </div>
          </div>

          {/* ON chips */}
          <OnChip label="AI CORE" width={144} icon="ai" className="absolute left-[552px] top-[207.55px]" aiCoreSrc={aiCoreIcon} hostCpuSrc={hostCpuImg} />
          <OnChip label={`HOST  CPU`} width={157} icon="cpu" active={surge} className="absolute left-[715px] top-[207.55px]" aiCoreSrc={aiCoreIcon} hostCpuSrc={hostCpuImg} />
        </div>
      </section>

      {/* MOBILE (<1024px) — Figma 3565:3127 (393×1050) */}
      <section
        className="relative w-full overflow-hidden bg-black min-[1024px]:hidden"
        aria-label="Always on"
      >
        <div className="relative mx-auto h-[1050px] w-[393px]" data-node-id="3565:3127">

          {/* Header — Figma 3565:3129 (x23 y30, 350×174, gap 10) */}
          <div
            className="absolute left-[23px] top-[30px] flex w-[350px] flex-col items-center gap-[10px]"
            data-node-id="3565:3129"
          >
            <MobileSectionBadge />
            {/* Title group — Figma 3565:3130 (356×79, text at +3/+7, 36px/36px, 2 lines).
                pb-[8px] extends the gradient paint box below the 72px line boxes so
                Gilroy descenders ("p" in "asleep") aren't clipped by bg-clip-text;
                -mb-[8px] cancels the layout shift, mb-[6px] adds breathing room
                before the subtitle. */}
            <div className="relative mb-[6px] h-[79px] w-[356px]" data-node-id="3565:3130">
              <h2
                ref={fitRef}
                className={`${gilroyMedium.className} absolute left-[3px] top-[7px] -mb-[8px] w-[350px] bg-clip-text pb-[8px] text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
                style={{
                  backgroundImage: TITLE_GRADIENT_MOBILE,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                {heading}
              </h2>
              <div className="absolute inset-x-0 top-[4px] h-[70px]" aria-hidden>
                <FrameCorners leftSrc={CORNER_58} rightSrc={CORNER_55} />
              </div>
            </div>
            <p
              className={`${interRegular.className} w-[350px] text-center text-[14px] leading-[16px] font-normal text-[#f0f0f0] not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
              data-node-id="3565:3136"
            >
              {subtitle}
            </p>
          </div>

          {/* Chip visual — Figma 3567:4017 (924×513 centered, y136). Uses the same
              correlation-registered desktop pair (scale 0.992, offset (-12, +120)
              full-res px) scaled by 924/1450 into the mobile box, so the two renders
              are pixel-registered and the crossfade doesn't jump. Baseline underneath,
              surge crossfades on top, Figma fade overlay above both. */}
          <div
            className="-translate-x-1/2 absolute h-[513px] left-[calc(50%+0.5px)] top-[136px] w-[924px] overflow-clip"
            data-node-id="3567:4017"
            data-name="ChatGPT Image Jul 2, 2026, 12_54_47 PM 2"
          >
            <img loading="lazy" decoding="async"
              alt=""
              src={bgSubconscious}
              className="absolute max-w-none pointer-events-none"
              style={{ left: "-3.85px", top: "29.44px", width: "916.57px", height: "477.44px" }}
            />
            <img loading="lazy" decoding="async"
              alt=""
              src={bgSurge}
              className="absolute max-w-none pointer-events-none transition-opacity duration-[800ms] ease-in-out will-change-[opacity]"
              style={{ left: "0px", top: "-8.77px", width: "924px", height: "530.53px", opacity: surgeMobile ? 1 : 0 }}
              aria-hidden={!surgeMobile}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0) 85.312%, rgb(0, 0, 0) 100%), linear-gradient(180deg, rgb(0, 0, 0) 2.6875%, rgba(0, 0, 0, 0) 14.375%)",
              }}
            />
          </div>

          {/* ON chips — Figma 3567:4004 / 3567:4010 (y232) */}
          <OnChip label="AI CORE" width={144} icon="ai" className="absolute left-[36px] top-[232px]" aiCoreSrc={aiCoreIcon} hostCpuSrc={hostCpuImg} />
          <OnChip label={`HOST  CPU`} width={157} icon="cpu" active={surgeMobile} className="absolute left-[199px] top-[232px]" aiCoreSrc={aiCoreIcon} hostCpuSrc={hostCpuImg} />

          {/* Stat cards — Figma 3567:4035 (y560) / 3567:4066 (y741) */}
          <MobileStatCard
            className="absolute left-[20px] top-[560px]"
            badgeLabel="power"
            badgeWidth={97}
            stat="< 100 uW"
            sub="always on AI"
            footerLabel="Continuous pulse"
          />
          <MobileStatCard
            className="absolute left-[20px] top-[741px]"
            badgeLabel="Performance"
            badgeWidth={116}
            stat="512 GOPS "
            sub="instant"
            footerLabel="REFLEX SURGE"
          />

          {/* Toggle strip — Figma 4087:8465 (x31 y927, 331×69) */}
          <MobileToggleFrame surge={surgeMobile} onToggle={toggleMobile} className="absolute left-[31px] top-[927px]" />

          {/* Brackets — Figma 4087:8475 / 4087:8476 */}
          <div className="absolute left-[20px] top-[973px] h-[46px] w-[132px]" data-name="Vector" aria-hidden>
            <div className="absolute inset-[-6.28%_0_-1.09%_-0.38%]">
              <img loading="lazy" decoding="async" alt="" className="block max-w-none size-full" src={BRACKET_LEFT_MOBILE} />
            </div>
          </div>
          <div className="absolute left-[241.12px] top-[973.13px] flex h-[45.63px] w-[131.965px] items-center justify-center" aria-hidden>
            <div className="-scale-y-100 flex-none rotate-180">
              <div className="relative h-[45.63px] w-[131.965px]" data-name="Vector">
                <div className="absolute inset-[-5.84%_0_-1.1%_-0.38%]">
                  <img loading="lazy" decoding="async" alt="" className="block max-w-none size-full" src={BRACKET_RIGHT_MOBILE} />
                </div>
              </div>
            </div>
          </div>

          {/* Caption — Figma 4087:8464 */}
          <p
            className={`${interRegular.className} -translate-x-1/2 [word-break:break-word] absolute font-normal left-1/2 leading-[24px] not-italic text-[16px] text-[#bbbbbb] text-center top-[1011.39px] uppercase whitespace-nowrap`}
            data-node-id="4087:8464"
          >
            Return to the baseline
          </p>
        </div>
      </section>
    </>
  );
}
