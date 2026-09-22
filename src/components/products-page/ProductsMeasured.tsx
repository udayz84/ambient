"use client";

import { mediaUrl } from "@/lib/strapi";
import { useFadeIn, getFadeInClass } from "../shared/useFadeIn";
import { useFitText } from "../shared/FitText";
import { AnimatedDotsBackground } from "../shared/AnimatedDotsBackground";
import { Corners } from "../shared/Corners";
import { TagBadge } from "../hero/TagBadge";
import { dmMono, gilroyBold, gilroyMedium, interRegular } from "../hero/fonts";
import {
  MEASURED_TITLE_GRADIENT,
  PRIMARY_CTA_INSET,
  PRIMARY_CTA_SHADOW,
  SECONDARY_CTA_BG,
} from "./products-data";

/**
 * Figma 3309:1912 "Desktop - 15" (1440×1043) — "Not projected. Measured in silicon."
 * Eyebrow chip + gradient title + three spec cards (GPX10 Pro / RISC MCU / MCU + NPU)
 * over aurora backgrounds, with datasheet / whitepaper CTAs.
 */

/* ---- Assets (exported from Figma) ---- */
const AURORA = "/products/measured-aurora.webp"; // 3309:1913/1914 footer image
const CARD_CORNERS = "/products/measured-card-corners.svg"; // 3468:2233 "Cornor Elements"
const CHIP_GLOW = "/products/measured-chip-glow.svg"; // 3468:2238 Vector 94
const CHIP_GPX10 = "/products/measured-chip-gpx10.webp"; // 3468:2258 image 76
const CHIP_RISC = "/products/measured-chip-risc.webp"; // 3468:2285 image 76
const CHIP_MCU_NPU = "/products/measured-chip-mcu-npu.webp"; // 3468:2312 image 77
const ICON_SPEED = "/products/measured-icon-speed.svg"; // dashboard-speed-01 elements
const ICON_ENERGY = "/products/measured-icon-energy.svg"; // energy-rectangle elements
const ICON_ECO = "/products/measured-icon-eco.svg"; // eco-energy elements
const LINE_88 = "/products/measured-line-88.svg"; // 3468:2257 Line 88
const CTA_CORNER_L = "/products/measured-cta-corner-left.svg"; // 3712:1929/1932 Vector 47
const CTA_CORNER_R = "/products/measured-cta-corner-right.svg"; // 3712:1928/1931 Vector 46
/* Identical to the FullPicture section's exports (verified byte-for-byte). */
const MENU_CORNER_L = "/products/fp-menu-corner-left.svg"; // 3710:1912/1913 Vector 42
const MENU_CORNER_R = "/products/fp-menu-corner-right.svg"; // 3710:1916/1917 Vector 43
const TITLE_CORNER_L = "/products/fp-title-corner-left.svg"; // 3309:1918/1920 Vector 58
const TITLE_CORNER_R = "/products/fp-title-corner-right.svg"; // 3309:1919/1921 Vector 55

const GREEN = "#53d824"; // Colors/Primary/600
const GREY = "#f0f0f0"; // Grey Color
const STAT_BORDER = "rgba(255,255,255,0.1)";

const FALLBACK_HEADING = "Not projected. \nMeasured in silicon.";
const FALLBACK_SUBTITLE =
  "Here's GPX10 Pro against the alternatives a design team actually weighs.";
const FALLBACK_MENU = "Measured proof";
const FALLBACK_PRIMARY = { label: " Download the Full Datasheet", href: "#" };
const FALLBACK_SECONDARY = { label: " Read the Architecture Whitepaper", href: "#" };

function splitLines(value: string): string[] {
  return value.split("\n");
}

/* ---- Card data (values straight from Figma) ---- */

type IconSpec = {
  src: string;
  name: string;
  /** Inner "elements" box inset within the 36px icon instance. */
  boxInset: string;
  /** Exported-SVG bleed inset (drop-shadow padding) within the elements box. */
  imgInset: string;
};

const ICONS: Record<"speed" | "energy" | "eco", IconSpec> = {
  speed: {
    src: ICON_SPEED,
    name: "dashboard-speed-01",
    boxInset: "inset-[10.42%]",
    imgInset: "inset-[-74.03%_-74.04%_-74.04%_-74.03%]",
  },
  energy: {
    src: ICON_ENERGY,
    name: "energy-rectangle",
    boxInset: "inset-[10.42%]",
    imgInset: "inset-[-74.04%]",
  },
  eco: {
    src: ICON_ECO,
    name: "eco-energy",
    boxInset: "inset-[8.33%]",
    imgInset: "inset-[-70.33%]",
  },
};

type MeasuredStat = {
  icon: IconSpec;
  label: string;
  value: string;
  /** Green value text (GPX10 Pro card); grey otherwise. */
  green?: boolean;
  /** Figma renders MCU + NPU "100" in Gilroy Medium, the rest in Bold. */
  medium?: boolean;
};

const stat = (
  icon: IconSpec,
  label: string,
  value: string,
  opts: { green?: boolean; medium?: boolean } = {},
): MeasuredStat => ({ icon, label, value, ...opts });

type MeasuredVariant = "gpx10" | "risc_mcu" | "mcu_npu";

type MeasuredCard = {
  nodeId: string;
  name: string;
  /** 3468:2238 green blur behind the chip (GPX10 Pro only). */
  glow?: boolean;
  imageSrc: string;
  /** Geometry of the absolutely-positioned, centered chip image box. */
  imageBoxClass: string;
  /** mix-blend-luminosity on competitor chip images. */
  luminosity?: boolean;
  /** RISC MCU: image cropped inside an inner overflow-hidden frame. */
  cropped?: boolean;
  stats: MeasuredStat[];
};

/** Per-variant visuals straight from Figma; also the fallback when Strapi is empty. */
const FALLBACK_CARDS: Record<MeasuredVariant, MeasuredCard> = {
  gpx10: {
    nodeId: "3468:2231",
    name: "GPX10 Pro",
    glow: true,
    imageSrc: CHIP_GPX10,
    imageBoxClass:
      "left-[calc(50%-10.58px)] top-[calc(50%-60px)] h-[255.188px] w-[401.15px]",
    stats: [
      stat(ICONS.speed, "Peak Compute (GOPS)", "512", { green: true }),
      stat(ICONS.energy, "Active Power", "40 - 120 µW", { green: true }),
      stat(ICONS.eco, "Efficiency (TOPS/W)", "7.3", { green: true }),
    ],
  },
  risc_mcu: {
    nodeId: "3468:2259",
    name: "RISC MCU",
    imageSrc: CHIP_RISC,
    imageBoxClass:
      "left-[calc(50%-10.58px)] top-[calc(50%-60px)] h-[255.188px] w-[401.15px]",
    luminosity: true,
    cropped: true,
    stats: [
      stat(ICONS.speed, "Peak Compute (GOPS)", "0.02"),
      stat(ICONS.energy, "Active Power", "600 mW"),
      stat(ICONS.eco, "Efficiency (TOPS/W)", "0.02"),
    ],
  },
  mcu_npu: {
    nodeId: "3468:2286",
    name: "MCU + NPU",
    imageSrc: CHIP_MCU_NPU,
    imageBoxClass:
      "left-[calc(50%-10.9px)] top-[calc(50%-64.16px)] h-[198.985px] w-[312.801px]",
    luminosity: true,
    stats: [
      stat(ICONS.speed, "Peak Compute (GOPS)", "100", { medium: true }),
      stat(ICONS.energy, "Active Power", "200 mW"),
      stat(ICONS.eco, "Efficiency (TOPS/W)", "1.2"),
    ],
  },
};

const CARD_ORDER: MeasuredVariant[] = ["gpx10", "risc_mcu", "mcu_npu"];

/** Map a Strapi measured-card onto the Figma-driven view model for its variant. */
function strapiCardToView(c: any): MeasuredCard {
  const variant: MeasuredVariant =
    c?.variant === "risc_mcu" || c?.variant === "mcu_npu"
      ? c.variant
      : "gpx10";
  const fallback = FALLBACK_CARDS[variant];
  const stats: MeasuredStat[] =
    Array.isArray(c?.stats) && c.stats.length > 0
      ? c.stats.map((s: any) => ({
          icon: ICONS[s?.icon as keyof typeof ICONS] ?? ICONS.speed,
          label: s?.label ?? "",
          value: s?.value ?? "",
          green: !!s?.is_green,
          medium: !!s?.is_medium,
        }))
      : fallback.stats;
  return {
    ...fallback,
    name: c?.name || fallback.name,
    imageSrc: mediaUrl(c?.chip_image) || fallback.imageSrc,
    stats,
  };
}

/* ---- Small building blocks ---- */

function CornerTick({
  src,
  placement,
  size = 4,
  nodeId,
}: {
  src: string;
  placement: "tl" | "tr" | "bl" | "br";
  size?: number;
  nodeId?: string;
}) {
  // Mirrors the Figma structure: tick box, image inset [0_0_-12.5%_-12.5%],
  // flipped per corner. tl = flipY, bl = plain, tr = rotate180, br = flipY+rotate180.
  const posClass =
    placement === "tl"
      ? "left-0 top-0"
      : placement === "tr"
        ? "right-0 top-0"
        : placement === "bl"
          ? "bottom-0 left-0"
          : "bottom-0 right-0";
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
      <img loading="lazy" decoding="async" alt="" className="block max-w-none size-full" src={src} aria-hidden />
    </div>
  );
  return (
    <div
      className={`absolute ${posClass} ${flipClass ? "flex items-center justify-center" : ""}`}
      style={{ width: size, height: size }}
      data-node-id={nodeId}
      aria-hidden
    >
      {flipClass ? (
        <div className={`${flipClass} flex-none`}>
          <div className="relative" style={{ width: size, height: size }}>
            {inner}
          </div>
        </div>
      ) : (
        inner
      )}
    </div>
  );
}

function MenuChip({ label }: { label: string }) {
  return (
    <div
      className={`${dmMono.className} bg-[rgba(255,255,255,0.06)] flex gap-[6px] h-[27px] items-center overflow-clip px-[24px] relative shrink-0 border-[0.5px] border-solid border-[rgba(240,240,240,0.25)]`}
      data-node-id="3710:1910"
      data-name="Menu"
    >
      <Corners leftSrc="/hero/vector-57.svg" rightSrc="/hero/vector-55.svg" />
      <p
        className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] leading-[20.149px] not-italic relative shrink-0 text-[#ecfae5] text-[13.433px] tracking-[-0.403px] uppercase whitespace-nowrap"
        data-node-id="3710:1911"
      >
        {label}
      </p>
      <div
        className="absolute bg-white h-[12.399px] left-[12px] opacity-60 top-1/2 -translate-y-1/2 w-[2.067px]"
        data-node-id="3710:1914"
        aria-hidden
      />
      <div
        className="absolute bg-white h-[12.399px] opacity-60 right-[12px] top-1/2 -translate-y-1/2 w-[2.067px]"
        data-node-id="3710:1915"
        aria-hidden
      />
    </div>
  );
}

function GradientTitleBlock({ headingLines }: { headingLines: string[] }) {
  const fitRef = useFitText<HTMLHeadingElement>({});
  return (
    <div
      className="flex flex-col items-center px-[10px] relative shrink-0"
      data-node-id="3309:1916"
      data-name="Title"
    >
      <h2
        ref={fitRef}
        className={`${gilroyMedium.className} [word-break:break-word] bg-clip-text font-medium leading-[0] m-0 not-italic relative shrink-0 text-[46px] text-center text-transparent whitespace-nowrap`}
        style={{
          backgroundImage: MEASURED_TITLE_GRADIENT,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
        data-node-id="3309:1917"
      >
        {headingLines.map((line, i) => (
          <span key={i} className="block leading-[49px] [word-break:break-word]">
            {line}
          </span>
        ))}
      </h2>
      <CornerTick src={TITLE_CORNER_L} placement="tl" nodeId="3309:1918" />
      <CornerTick src={TITLE_CORNER_R} placement="tr" nodeId="3309:1919" />
      <CornerTick src={TITLE_CORNER_L} placement="bl" nodeId="3309:1920" />
      <CornerTick src={TITLE_CORNER_R} placement="br" nodeId="3309:1921" />
    </div>
  );
}

function StatRow({ stat, bordered }: { stat: MeasuredStat; bordered: boolean }) {
  return (
    <div
      className={`flex items-center justify-between pb-[14px] relative shrink-0 w-full ${
        bordered ? "border-b border-solid" : ""
      }`}
      style={bordered ? { borderColor: STAT_BORDER } : undefined}
    >
      <div className="flex gap-[8px] items-center relative shrink-0">
        <div className="relative shrink-0 size-[36px]" data-name={stat.icon.name}>
          <div className={`absolute ${stat.icon.boxInset}`} data-name="elements">
            <div className={`absolute ${stat.icon.imgInset}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" alt="" className="block max-w-none size-full" src={stat.icon.src} aria-hidden />
            </div>
          </div>
        </div>
        <p
          className={`${interRegular.className} [word-break:break-word] font-normal leading-[24px] not-italic opacity-90 relative shrink-0 text-[16px] text-white whitespace-nowrap`}
        >
          {stat.label}
        </p>
      </div>
      <p
        className={`${stat.medium ? gilroyMedium.className : gilroyBold.className} [word-break:break-word] leading-[28px] not-italic opacity-90 relative shrink-0 text-[22px] whitespace-nowrap`}
        style={{ color: stat.green ? GREEN : GREY }}
      >
        {stat.value}
      </p>
    </div>
  );
}

function MeasuredCardView({ card }: { card: MeasuredCard }) {
  const { fadeRef, isVisible } = useFadeIn();

  return (
    <div
      ref={fadeRef}
      className={`h-[600px] overflow-clip relative shrink-0 w-[388px] max-w-full ${getFadeInClass(isVisible)}`}
      data-node-id={card.nodeId}
      data-name="Lower power consumption"
    >
      {/* 3468:2232 — surface */}
      <div
        className="absolute border-[0.5px] border-[rgba(255,255,255,0.1)] border-solid h-[600px] left-0 top-0 w-[388px] max-w-full"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgba(15, 14, 14, 0.75) 0%, rgba(15, 14, 14, 0.75) 100%)",
        }}
        aria-hidden
      />
      {/* 3468:2233 — corner elements */}
      <div
        className="absolute h-[598.994px] left-[0.39px] top-[0.51px] w-[387.605px]"
        data-name="Cornor Elements"
        aria-hidden
      >
        <div className="absolute inset-[0_-0.13%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async" alt="" className="block max-w-none size-full" src={CARD_CORNERS} />
        </div>
      </div>
      {/* 3468:2238 — green glow behind the chip (GPX10 Pro only) */}
      {card.glow && (
        <div
          className="absolute h-[168.649px] left-[89.88px] top-[159.43px] w-[234.951px]"
          data-node-id="3468:2238"
          aria-hidden
        >
          <div className="absolute inset-[-119.54%_-85.81%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" alt="" className="block max-w-none size-full" src={CHIP_GLOW} />
          </div>
        </div>
      )}
      {/* Stats — 3468:2239 (bottom-30, centered, w-328) */}
      <div className="-translate-x-1/2 absolute bottom-[30px] flex flex-col gap-[10px] items-start left-1/2 w-[328px] max-w-[calc(100%-30px)]">
        {card.stats.map((s, i) => (
          <StatRow key={s.label} stat={s} bordered={i < card.stats.length - 1} />
        ))}
      </div>
      {/* Card title — 3468:2255 (left-30, top-30, w-299) */}
      <div className="absolute flex flex-col gap-[12px] items-center left-[30px] top-[30px] w-[299px]">
        <p
          className={`${gilroyMedium.className} [word-break:break-word] leading-[47px] not-italic relative shrink-0 text-[38px] text-white whitespace-nowrap`}
        >
          {card.name}
        </p>
        <div className="h-0 relative shrink-0 w-[151.832px]" aria-hidden>
          <div className="absolute inset-[-1px_0_0_0]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" alt="" className="block max-w-none size-full" src={LINE_88} />
          </div>
        </div>
      </div>
      {/* Chip image */}
      <div
        className={`-translate-x-1/2 -translate-y-1/2 absolute ${card.imageBoxClass} ${card.luminosity ? "mix-blend-luminosity" : ""}`}
        data-name={card.cropped ? "image 76" : undefined}
        aria-hidden
      >
        {card.cropped ? (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async"
              alt=""
              className="absolute h-[85.93%] left-[18.48%] max-w-none top-[7.03%] w-[65.81%]"
              src={card.imageSrc}
            />
          </div>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img loading="lazy" decoding="async"
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={card.imageSrc}
          />
        )}
      </div>
    </div>
  );
}

/* ── Mobile stat row — Figma 4087:8894 (24px icon, 12px label, 14px value) ── */
function MobileStatRow({ stat, bordered }: { stat: MeasuredStat; bordered: boolean }) {
  return (
    <div
      className={`relative flex w-full shrink-0 items-center justify-between pb-[9.659px] ${
        bordered ? "border-b-[0.69px] border-solid" : ""
      }`}
      style={bordered ? { borderColor: STAT_BORDER } : undefined}
    >
      <div className="relative flex shrink-0 items-center gap-[5.52px]">
        <div className="relative size-[24px] shrink-0" data-name={stat.icon.name}>
          <div className={`absolute ${stat.icon.boxInset}`} data-name="elements">
            <div className={`absolute ${stat.icon.imgInset}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" alt="" className="block size-full max-w-none" src={stat.icon.src} aria-hidden />
            </div>
          </div>
        </div>
        <p
          className={`${interRegular.className} whitespace-nowrap text-[12px] leading-[16.559px] font-normal text-white opacity-90 not-italic [word-break:break-word]`}
        >
          {stat.label}
        </p>
      </div>
      <p
        className={`${stat.medium ? gilroyMedium.className : gilroyBold.className} whitespace-nowrap text-[14px] leading-[19.318px] opacity-90 not-italic [word-break:break-word]`}
        style={{ color: stat.green ? GREEN : GREY }}
      >
        {stat.value}
      </p>
    </div>
  );
}

/* ── Mobile measured card — Figma 4087:8884 (248×385) ── */
function MobileMeasuredCard({ card }: { card: MeasuredCard }) {
  return (
    <div
      className="relative h-[385px] w-[248px] shrink-0 overflow-clip"
      data-node-id={card.nodeId}
      data-name="Lower power consumption"
    >
      {/* Surface */}
      <div
        className="absolute left-0 top-0 h-[385px] w-[248.967px] border border-solid border-white/20"
        style={{ backgroundColor: "rgba(15,14,14,0.75)" }}
      />
      {/* Corner elements */}
      <div
        className="pointer-events-none absolute left-[-0.75px] top-[0.32px] h-[384.355px] w-[248.713px]"
        aria-hidden
      >
        <div className="absolute inset-[0_-0.13%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async" alt="" className="block size-full max-w-none" src={CARD_CORNERS} />
        </div>
      </div>
      {/* Glow (GPX10 Pro only) */}
      {card.glow && (
        <div
          className="pointer-events-none absolute left-1/2 top-[calc(50%-27.5px)] h-[114px] w-[125.5px] -translate-x-1/2"
          aria-hidden
        >
          <div className="absolute inset-[-176.84%_-160.64%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" alt="" className="block size-full max-w-none" src={CHIP_GLOW} />
          </div>
        </div>
      )}
      {/* Title + underline — top-[19.25px], centred */}
      <div className="absolute left-1/2 top-[19.25px] flex -translate-x-1/2 flex-col items-center">
        <p
          className={`${gilroyMedium.className} whitespace-nowrap text-[24px] leading-[47px] text-white not-italic [word-break:break-word]`}
        >
          {card.name}
        </p>
        <div className="relative h-0 w-[151.832px]" aria-hidden>
          <div className="absolute inset-[-1px_0_0_0]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" alt="" className="block size-full max-w-none" src={LINE_88} />
          </div>
        </div>
      </div>
      {/* Chip image — centred, top-[88px], 212×140 (MCU+NPU: 240×140 at top-[94px]) */}
      <div
        className={`absolute left-1/2 top-[88px] h-[140px] w-[212px] -translate-x-1/2 ${card.luminosity ? "mix-blend-luminosity" : ""}`}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async"
          alt=""
          src={card.imageSrc}
          className="absolute inset-0 size-full object-cover"
        />
      </div>
      {/* Stats — bottom-[13px], centred, w-[226px], gap-[6.899px] */}
      <div className="absolute bottom-[13px] left-1/2 flex w-[226px] -translate-x-1/2 flex-col gap-[6.899px]">
        {card.stats.map((s, i) => (
          <MobileStatRow key={s.label} stat={s} bordered={i < card.stats.length - 1} />
        ))}
      </div>
    </div>
  );
}

function PrimaryCta({
  label,
  href,
  centered = false,
}: {
  label: string;
  href: string;
  centered?: boolean;
}) {
  return (
    <a
      href={href}
      className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] shrink-0 overflow-hidden ${
        centered ? "w-full max-w-[293px] items-center justify-center" : "w-[293px]"
      }`}
      data-node-id="3712:1922"
      data-name="Cta"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <AnimatedDotsBackground />
      <span
        className={`[word-break:break-word] leading-[28px] not-italic text-[16px] text-white uppercase whitespace-nowrap ${
          centered ? "relative" : "absolute left-[16.5px] top-[calc(50%-14px)]"
        }`}
        data-node-id="3712:1923"
      >
        {label}
      </span>
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`}
      />
      <CornerTick src={CTA_CORNER_R} placement="tr" nodeId="3712:1928" />
      <CornerTick src={CTA_CORNER_L} placement="tl" nodeId="3712:1929" />
      <CornerTick src={CTA_CORNER_R} placement="br" nodeId="3712:1931" />
      <CornerTick src={CTA_CORNER_L} placement="bl" nodeId="3712:1932" />
    </a>
  );
}

function SecondaryCta({
  label,
  href,
  centered = false,
}: {
  label: string;
  href: string;
  centered?: boolean;
}) {
  return (
    <a
      href={href}
      className={`${gilroyMedium.className} relative flex h-[48px] shrink-0 overflow-clip px-[20px] py-[10px] border-[0.5px] border-solid border-[rgba(240,240,240,0.25)] ${
        centered ? "w-full max-w-[331px] items-center justify-center" : "w-[331px] items-start"
      }`}
      style={{ backgroundColor: SECONDARY_CTA_BG }}
      data-node-id="3712:1933"
      data-name="CTA - Secondary"
    >
      <span
        className={`${gilroyMedium.className} [word-break:break-word] leading-[28px] not-italic relative shrink-0 text-[16px] text-white uppercase whitespace-nowrap`}
        data-node-id="3712:1935"
      >
        {label}
      </span>
      <Corners leftSrc="/hero/vector-57.svg" rightSrc="/hero/vector-55.svg" />
    </a>
  );
}

/* ---- Section ---- */

export function ProductsMeasured({ data }: { data?: any }) {
  const heading = data?.heading || FALLBACK_HEADING;
  const headingLines = splitLines(heading);
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const aurora = mediaUrl(data?.background_image) || AURORA;
  const menuLabel = data?.tag?.text || FALLBACK_MENU;
  const primary = {
    label: data?.primary_button?.label ?? FALLBACK_PRIMARY.label,
    href: data?.primary_button?.href ?? FALLBACK_PRIMARY.href,
  };
  const secondary = {
    label: data?.secondary_button?.label ?? FALLBACK_SECONDARY.label,
    href: data?.secondary_button?.href ?? FALLBACK_SECONDARY.href,
  };
  const cards: MeasuredCard[] =
    Array.isArray(data?.cards) && data.cards.length > 0
      ? data.cards.map(strapiCardToView)
      : CARD_ORDER.map((v) => FALLBACK_CARDS[v]);

  return (
    <>
      {/* DESKTOP (>=1024px) — 3309:1912 "Desktop - 15" (1440×1043) */}
      <section
        className="relative flex w-full justify-center bg-black overflow-hidden mt-[60px]"
        aria-label="Measured in silicon"
      >
        <div
          className="relative hidden h-[1043px] w-full max-w-[1440px] min-[1024px]:block"
          data-node-id="3309:1912"
          data-name="Desktop - 15"
        >
          {/* 3309:1913 — bottom aurora (rotated 180°) */}
          <div
            className="absolute flex h-[553.005px] items-center justify-center left-1/2 -translate-x-1/2 top-[399.91px] w-[100vw] min-w-[1513.931px]"
            data-node-id="3309:1913"
            aria-hidden
          >
            <div className="flex-none rotate-180 w-full h-full">
              <div className="h-full relative w-full" data-name="footer">
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute bg-black inset-0" />
                  <div className="absolute inset-0 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img loading="lazy" decoding="async"
                      alt=""
                      className="absolute h-[279.02%] left-[-0.02%] max-w-none top-[-26.76%] w-[100.04%] object-cover"
                      src={aurora}
                    />
                  </div>
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(to bottom, rgb(0,0,0) 29.711%, rgba(0,0,0,0) 42.418%)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3309:1914 — top aurora (mirrored + rotated 180°) */}
          <div
            className="absolute flex h-[551.954px] items-center justify-center left-1/2 -translate-x-1/2 top-[-152.05px] w-[100vw] min-w-[1513.931px]"
            data-node-id="3309:1914"
            aria-hidden
          >
            <div className="-scale-y-100 flex-none rotate-180 w-full h-full">
              <div className="h-full relative w-full" data-name="footer">
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute bg-black inset-0" />
                  <div className="absolute inset-0 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img loading="lazy" decoding="async"
                      alt=""
                      className="absolute h-[279.02%] left-[-0.02%] max-w-none top-[-26.76%] w-[100.04%] object-cover"
                      src={aurora}
                    />
                  </div>
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(to bottom, rgb(0,0,0) 15.366%, rgba(0,0,0,0) 63.608%)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3309:1915 — section title */}
          <div
            className="-translate-x-1/2 absolute flex flex-col gap-[12px] items-center justify-center left-1/2 top-[15.75px]"
            data-node-id="3309:1915"
            data-name="Section Title"
          >
            <MenuChip label={menuLabel} />
            <GradientTitleBlock headingLines={headingLines} />
            <p
              className={`${interRegular.className} [word-break:break-word] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-center whitespace-nowrap`}
              style={{ color: GREY }}
              data-node-id="3309:1922"
            >
              {subtitle}
            </p>
          </div>

          {/* 3468:2230 — cards row */}
          <div
            className="-translate-x-1/2 absolute flex items-center justify-between left-[calc(50%-11.5px)] top-[241px] w-[1247px]"
            data-node-id="3468:2230"
          >
            {cards.map((card) => (
              <MeasuredCardView key={card.nodeId} card={card} />
            ))}
          </div>

          {/* 3712:1921 — CTA row */}
          <div
            className="-translate-x-1/2 absolute bottom-[104px] flex gap-[24px] items-start left-[calc(50%+4px)]"
            data-node-id="3712:1921"
          >
            <PrimaryCta label={primary.label} href={primary.href} />
            <SecondaryCta label={secondary.label} href={secondary.href} />
          </div>
        </div>
      </section>

      {/* MOBILE (<1024px) — Figma 3567:4246 (393×780) */}
      <section
        className="relative w-full overflow-hidden bg-black min-[1024px]:hidden"
        aria-label="Measured in silicon"
        data-node-id="3567:4246"
      >
        <div className="relative mx-auto w-full" style={{ maxWidth: 393 }}>

          {/* ── Header — 3567:4337 (top=30, centred, 350 wide, gap=10) ── */}
          <div className="flex flex-col items-center gap-[10px] px-[21px] pt-[16px]">
            <TagBadge
              label={menuLabel}
              width={130}
              height={27}
              centerLabel
              leftBarLeft={5.7}
              rightBarLeft={121.16}
              labelClassName="text-[12px] leading-[20.149px] tracking-[-0.36px]"
            />
            {/* Title — 3567:4338 */}
            <div className="relative">
              <h2
                className={`${gilroyMedium.className} w-[350px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
                style={{
                  backgroundImage:
                    "linear-gradient(107.454deg, rgb(255,255,255) 1.3527%, rgb(212,233,188) 55.161%, rgb(255,255,255) 111.67%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                {headingLines.map((line, i) => (
                  <span key={i} className="block leading-[36px]">{line.trim()}</span>
                ))}
              </h2>
              <CornerTick src={TITLE_CORNER_L} placement="tl" />
              <CornerTick src={TITLE_CORNER_R} placement="tr" />
              <CornerTick src={TITLE_CORNER_L} placement="bl" />
              <CornerTick src={TITLE_CORNER_R} placement="br" />
            </div>
            {/* Description — 3567:4344 */}
            <p
              className={`${interRegular.className} w-[350px] text-center text-[14px] leading-[16px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
            >
              {subtitle}
            </p>
          </div>

          {/* ── Cards carousel — 4087:8883 (cards 248×385, gap=15) ── */}
          <div
            className="mt-[33px] overflow-x-auto pb-[8px] [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
            style={{ scrollPaddingInline: "calc((100% - 248px) / 2)" }}
          >
            <div className="flex w-max gap-[15px] px-[calc((100%-248px)/2)]">
              {cards.map((card) => (
                <div key={card.nodeId} className="snap-center shrink-0">
                  <MobileMeasuredCard card={card} />
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA column — 4087:9003 (240 wide, gap=14) ── */}
          <div className="mx-auto mt-[32px] flex w-[240px] flex-col gap-[14px] pb-[16px]">
            {/* Primary — 240×48 */}
            <a
              href={primary.href}
              className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-[240px] shrink-0 items-center justify-center overflow-hidden`}
            >
              <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
              <AnimatedDotsBackground />
              <span className="relative max-w-full overflow-hidden text-ellipsis text-[12px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
                {primary.label}
              </span>
              <span aria-hidden className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`} />
              <CornerTick src={CTA_CORNER_L} placement="tl" />
              <CornerTick src={CTA_CORNER_R} placement="tr" />
              <CornerTick src={CTA_CORNER_R} placement="br" />
              <CornerTick src={CTA_CORNER_L} placement="bl" />
            </a>
            {/* Secondary — 240×48 */}
            <a
              href={secondary.href}
              className={`${gilroyMedium.className} relative flex h-[48px] w-[240px] shrink-0 items-center justify-center overflow-clip px-[20px] py-[10px]`}
              style={{ backgroundColor: SECONDARY_CTA_BG }}
            >
              <span className="relative max-w-full overflow-hidden text-ellipsis text-[12px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
                {secondary.label}
              </span>
              <Corners leftSrc="/hero/vector-57.svg" rightSrc="/hero/vector-55.svg" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
