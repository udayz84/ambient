"use client";

import { Fragment } from "react";
import { useFadeIn, getFadeInClass } from "../shared/useFadeIn";
import { Corners } from "../shared/Corners";
import { mediaUrl } from "@/lib/strapi";
import { dmMono, gilroyMedium, gilroySemiBold, interRegular } from "../hero/fonts";

/**
 * Figma 3713:1975 inside 3309:2368 "Desktop - 16" (1440×930) — "The full picture."
 * Eyebrow chip + gradient title + 9 light spec cards over flipped aurora images.
 * Self-contained: all layout data derived directly from the Figma frame.
 */

/* ---- Assets (exported from Figma) ---- */
const AURORA = "/products/fullpicture-aurora.png"; // 1024×855, used by both footer layers
const LINE = "/products/spec-line.svg"; // same white 4% 1px rule as the design's Line assets
const ICON_GLYPH = "/products/fp-spec-icon.svg";
const TITLE_CORNER_L = "/products/fp-title-corner-left.svg"; // Vector 58
const TITLE_CORNER_R = "/products/fp-title-corner-right.svg"; // Vector 55

/* ---- Tokens ---- */
const TITLE_GRADIENT =
  "linear-gradient(112.899deg, rgb(255,255,255) 1.3527%, rgb(212,233,188) 55.161%, rgb(255,255,255) 111.67%)";
const ICON_TILE_BG =
  "radial-gradient(60% 75% at 50% 0%, rgba(57,74,54,1) 0%, rgba(43,54,41,1) 50%, rgba(29,34,28,1) 100%)";
const HEADER_COLOR = "#21570e"; // Colors/Primary/1000
const PLUS_GREEN = "#3a9719"; // Colors/Primary/800
const BORDER_LIGHT = "rgba(255,255,255,0.1)";
const BORDER_DARK = "rgba(51,51,51,0.1)"; // Colors/Neutral/Alpha/10
const patternGreen = (deg: number) =>
  `linear-gradient(${deg}deg, rgba(188,229,174,0) 30.174%, rgb(188,229,174) 76.687%)`;

const FALLBACK_HEADING = "The full picture.";
const FALLBACK_MENU = "Specs & resources";

/* ---- Card geometry (all values straight from Figma) ---- */
type LineSpec = {
  top: number;
  left: number;
  width: number;
  variant?: "rotate" | "skew";
};
type ItemSpec = { text: string; top: number; plusTop: number; left?: number; plusLeft?: number };
type SpecCard = {
  nodeId: string;
  title: string;
  left: number;
  top: number;
  height: number;
  borderColor: string;
  face: { height: number; left: number; top: number };
  pattern: {
    height: number;
    gradient: string;
    style: Record<string, string | number>;
  };
  header: { left: number; top: number; width: number };
  itemsLeft: number;
  plusLeft: number;
  plusColor: string;
  items: ItemSpec[];
  lines: LineSpec[];
  icon: { left: number; top: number };
};

const item = (text: string, top: number, left?: number, plusLeft?: number): ItemSpec => ({
  text,
  top,
  plusTop: +(top + 3.5).toFixed(2),
  ...(left !== undefined ? { left } : {}),
  ...(plusLeft !== undefined ? { plusLeft } : {}),
});

const CARDS: SpecCard[] = [
  {
    nodeId: "3309:2459",
    title: "Control",
    left: 0,
    top: 0.84,
    height: 99,
    borderColor: BORDER_DARK,
    face: { height: 99, left: -1, top: -0.84 },
    pattern: {
      height: 99,
      gradient: patternGreen(140.837),
      style: { left: "50%", top: -0.84, transform: "translateX(-50%)" },
    },
    header: { left: 15, top: 14.16, width: 345 },
    itemsLeft: 33,
    plusLeft: 15,
    plusColor: HEADER_COLOR,
    items: [item("ARM Cortex-M4F (32-bit, FPU)", 57.33)],
    lines: [],
    icon: { left: 332.44, top: 5 },
  },
  {
    nodeId: "3309:2381",
    title: "Sensing & Analog",
    left: 0,
    top: 120.84,
    height: 231,
    borderColor: BORDER_LIGHT,
    face: { height: 230.757, left: -1, top: -0.87 },
    pattern: {
      height: 230.991,
      gradient:
        "linear-gradient(14.3795deg, rgba(255,255,255,0) 13.463%, rgb(255,255,255) 71.165%)",
      style: { right: -1, top: "50%", transform: "translateY(-50%)", opacity: 0.24 },
    },
    header: { left: 15, top: 15.16, width: 342 },
    itemsLeft: 33,
    plusLeft: 15,
    plusColor: PLUS_GREEN,
    items: [
      item("16-bit ADC, 8 simultaneous analog inputs", 57.33),
      item("16-bit audio ADC", 100.97),
      item("Sensor-fusion DMA up to 10 streams", 144.44),
      item("Battery-low detection", 188.08),
    ],
    lines: [
      { top: 87.33, left: 17.12, width: 233.885, variant: "rotate" },
      { top: 130.97, left: 17.12, width: 233.885, variant: "rotate" },
      { top: 174.61, left: 17.12, width: 233.885, variant: "rotate" },
    ],
    icon: { left: 330.44, top: 5 },
  },
  {
    nodeId: "3309:2485",
    title: "Temperature",
    left: 0,
    top: 372.84,
    height: 99,
    borderColor: BORDER_DARK,
    face: { height: 98.899, left: -1, top: -1 },
    pattern: {
      height: 99,
      gradient: patternGreen(160.745),
      style: { left: "50%", top: -1, transform: "translateX(-50%)" },
    },
    header: { left: 15, top: 14.16, width: 344 },
    itemsLeft: 33,
    plusLeft: 15,
    plusColor: PLUS_GREEN,
    items: [item("0–85 °C (junction)", 57.33)],
    lines: [],
    icon: { left: 331.44, top: 5 },
  },
  {
    nodeId: "3309:2511",
    title: "Package",
    left: 422,
    top: 0.84,
    height: 167,
    borderColor: BORDER_DARK,
    face: { height: 167, left: -0.5, top: -1 },
    pattern: {
      height: 167,
      gradient: patternGreen(149.492),
      style: { left: "calc(50% + 0.5px)", top: -1, transform: "translateX(-50%)" },
    },
    header: { left: 14.5, top: 14.16, width: 344 },
    itemsLeft: 32.5,
    plusLeft: 14.5,
    plusColor: PLUS_GREEN,
    items: [
      item("ARM Cortex-M4F (32-bit, FPU)", 57.33),
      item("CSP 3.2×3.2 mm (on demand)", 106.25),
    ],
    lines: [{ top: 92.07, left: 14.5, width: 329.877 }],
    icon: { left: 330.94, top: 5 },
  },
  {
    nodeId: "3309:2498",
    title: "Security",
    left: 422,
    top: 188.84,
    height: 99,
    borderColor: BORDER_DARK,
    face: { height: 98.899, left: -0.5, top: -0.84 },
    pattern: {
      height: 99,
      gradient: patternGreen(160.745),
      style: { left: "calc(50% + 0.5px)", top: -0.84, transform: "translateX(-50%)" },
    },
    header: { left: 15, top: 14.16, width: 344 },
    itemsLeft: 33,
    plusLeft: 15,
    plusColor: PLUS_GREEN,
    items: [item("AES-128", 57.33)],
    lines: [],
    icon: { left: 331.44, top: 5 },
  },
  {
    nodeId: "3309:2403",
    title: "Peripherals",
    left: 422,
    top: 308.84,
    height: 162.84,
    borderColor: BORDER_DARK,
    face: { height: 162.84, left: -1, top: -0.84 },
    pattern: {
      height: 162.84,
      gradient: patternGreen(129.172),
      style: { left: "50%", top: -0.84, transform: "translateX(-50%)" },
    },
    header: { left: 15, top: 15.16, width: 338 },
    itemsLeft: 33.5,
    plusLeft: 15.5,
    plusColor: PLUS_GREEN,
    items: [
      item("OSPI (XIP)", 57.33, 33.5, 15.5),
      item("I²S Master", 57.33, 130, 112),
      item("SPI", 57.33, 220, 202),
      item("I²C", 57.33, 290, 272),
      item("UART", 100.97, 33.5, 15.5),
      item("GPIO", 100.97, 130, 112),
    ],
    lines: [
      { top: 87.57, left: 17.62, width: 329.877 },
    ],
    icon: { left: 326.94, top: 5 },
  },
  {
    nodeId: "3309:2527",
    title: "Memory",
    left: 844,
    top: 1,
    height: 276,
    borderColor: BORDER_LIGHT,
    face: { height: 275.72, left: -1, top: -1 },
    pattern: {
      height: 276,
      gradient: patternGreen(135.759),
      style: { left: "50%", top: -1, transform: "translateX(-50%)" },
    },
    header: { left: 15, top: 15, width: 342 },
    itemsLeft: 33,
    plusLeft: 15,
    plusColor: PLUS_GREEN,
    items: [
      item("120 KB L0 cache", 57.18),
      item("2048 KB unified L1 SRAM", 100.82),
      item("Video + multi-bank sensor buffers", 144.29),
      item("Boot ROM", 187.93),
      item("External SRAM/Flash via QSPI/SPI", 233.28),
    ],
    lines: [
      { top: 87.42, left: 17.12, width: 339.885, variant: "skew" },
      { top: 131.05, left: 17.12, width: 339.885, variant: "skew" },
      { top: 174.69, left: 17.12, width: 339.885, variant: "skew" },
      { top: 220.05, left: 17.12, width: 339.885, variant: "skew" },
    ],
    icon: { left: 330.44, top: 4.84 },
  },
  {
    nodeId: "3309:2437",
    title: "Power",
    left: 844,
    top: 298,
    height: 173.84,
    borderColor: BORDER_DARK,
    face: { height: 173.84, left: -1, top: -0.84 },
    pattern: {
      height: 173.84,
      gradient: patternGreen(140.837),
      style: { left: "50%", top: -0.84, transform: "translateX(-50%)" },
    },
    header: { left: 15, top: 15.16, width: 342 },
    itemsLeft: 33,
    plusLeft: 15,
    plusColor: HEADER_COLOR,
    items: [
      item("Core 1.2 V (0.9–1.3 V)", 57.33, 33, 15),
      item("Analog/IO 3.3 V", 57.33, 200, 182),
      item("~80 µW always-on", 100.97, 33, 15),
      item("Two power domains", 100.97, 200, 182),
    ],
    lines: [
      { top: 87.33, left: 17.12, width: 339.885, variant: "rotate" },
    ],
    icon: { left: 330.44, top: 5 },
  },
];

function splitLinesFilter(value: string | undefined | null): string[] {
  if (!value) return [];
  return value
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

/* ---- Small building blocks ---- */

function CornerTick({
  src,
  placement,
  nodeId,
}: {
  src: string;
  placement: "tl" | "tr" | "bl" | "br";
  nodeId?: string;
}) {
  // Mirrors the Figma structure: 4px tick box, image inset [0_0_-12.5%_-12.5%],
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
      <img alt="" className="block max-w-none size-full" src={src} aria-hidden />
    </div>
  );
  return (
    <div
      className={`absolute ${posClass} size-[4px] ${flipClass ? "flex items-center justify-center" : ""}`}
      data-node-id={nodeId}
      aria-hidden
    >
      {flipClass ? (
        <div className={`${flipClass} flex-none`}>
          <div className="relative size-[4px]">{inner}</div>
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

function GradientTitleBlock({ heading }: { heading: string }) {
  return (
    <div
      className="flex flex-col items-center px-[10px] relative shrink-0"
      data-node-id="3309:2373"
      data-name="Title"
    >
      <h2
        className={`${gilroyMedium.className} [word-break:break-word] bg-clip-text m-0 leading-[49px] not-italic relative shrink-0 text-[46px] text-center text-transparent whitespace-nowrap`}
        style={{
          backgroundImage: TITLE_GRADIENT,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
        data-node-id="3309:2374"
      >
        {heading}
      </h2>
      <CornerTick src={TITLE_CORNER_L} placement="tl" nodeId="3309:2375" />
      <CornerTick src={TITLE_CORNER_R} placement="tr" nodeId="3309:2376" />
      <CornerTick src={TITLE_CORNER_L} placement="bl" nodeId="3309:2377" />
      <CornerTick src={TITLE_CORNER_R} placement="br" nodeId="3309:2378" />
    </div>
  );
}

function CardLine({ line }: { line: LineSpec }) {
  const img = (
    <div className="absolute inset-[-1px_0_0_0]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" className="block max-w-none size-full" src={LINE} aria-hidden />
    </div>
  );
  if (line.variant === "rotate") {
    return (
      <div
        className="absolute flex h-[0.482px] items-center justify-center"
        style={{ left: line.left, top: line.top, width: line.width }}
        aria-hidden
      >
        <div className="flex-none rotate-[0.12deg]">
          <div className="h-0 relative" style={{ width: line.width }}>
            {img}
          </div>
        </div>
      </div>
    );
  }
  if (line.variant === "skew") {
    return (
      <div
        className="absolute flex h-0 items-center justify-center"
        style={{ left: line.left, top: line.top, width: line.width }}
        aria-hidden
      >
        <div className="flex-none skew-x-[-0.09deg]">
          <div className="h-0 relative" style={{ width: line.width }}>
            {img}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className="absolute h-0"
      style={{ left: line.left, top: line.top, width: line.width }}
      aria-hidden
    >
      {img}
    </div>
  );
}

type RenderCard = SpecCard & { iconSrc: string };

function SpecCardView({ card }: { card: RenderCard }) {
  const { fadeRef, isVisible } = useFadeIn();

  return (
    <div
      ref={fadeRef}
      className={`absolute bg-[#1d201d] border border-solid overflow-clip rounded-[12px] ${getFadeInClass(isVisible)}`}
      style={{
        left: card.left,
        top: card.top,
        height: card.height,
        width: 378,
        borderColor: card.borderColor,
      }}
      data-node-id={card.nodeId}
      data-name="COntainer"
    >
      {/* Light face */}
      <div
        className="absolute bg-[#dbe8c8] border-[1.5px] border-[rgba(255,255,255,0)] border-solid"
        style={{
          height: card.face.height,
          left: card.face.left,
          top: card.face.top,
          width: 378,
        }}
        aria-hidden
      />
      {/* Pattern gradient overlay */}
      <div
        className="absolute w-[378px]"
        style={{
          height: card.pattern.height,
          backgroundImage: card.pattern.gradient,
          ...card.pattern.style,
        }}
        data-name="Pattern"
        aria-hidden
      />
      {/* Header */}
      <div
        className="absolute border-b border-solid flex flex-col items-start pb-[13px]"
        style={{
          left: card.header.left,
          top: card.header.top,
          width: card.header.width,
          borderColor: BORDER_DARK,
        }}
        data-name="Container"
      >
        <p
          className={`${gilroySemiBold.className} [word-break:break-word] leading-[16px] not-italic relative shrink-0 text-[18px] tracking-[0.6px] uppercase whitespace-nowrap`}
          style={{ color: HEADER_COLOR }}
        >
          {card.title}
        </p>
      </div>
      {/* Items with "+" markers */}
      {card.items.map((it, i) => (
        <Fragment key={i}>
          <p
            className={`${interRegular.className} [word-break:break-word] absolute font-normal leading-[normal] not-italic text-[14px] text-black tracking-[-0.1504px] whitespace-nowrap`}
            style={{ left: it.left ?? card.itemsLeft, top: it.top }}
          >
            {it.text}
          </p>
          <p
            className={`${interRegular.className} [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute font-normal leading-[normal] not-italic text-[14px] tracking-[-0.1504px] whitespace-nowrap`}
            style={{ left: it.plusLeft ?? card.plusLeft, top: it.plusTop, color: card.plusColor }}
          >
            +
          </p>
        </Fragment>
      ))}
      {/* Divider lines (white 4% — imperceptible on the light face, kept per design) */}
      {card.lines.map((l, i) => (
        <CardLine key={i} line={l} />
      ))}
      {/* Icon tile */}
      <div
        className="absolute overflow-clip rounded-[5.895px] size-[32px]"
        style={{
          left: card.icon.left,
          top: card.icon.top,
          backgroundImage: ICON_TILE_BG,
        }}
        data-name="Icon"
        aria-hidden
      >
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex items-center left-1/2 size-[22px] top-1/2">
          <div className="relative shrink-0 size-[22px]" data-name="Frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={card.iconSrc}
              aria-hidden
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductsFullPicture({ data }: { data?: any }) {
  const heading = data?.heading || FALLBACK_HEADING;
  const menuLabel = data?.menu_text || FALLBACK_MENU;

  const strapiCallouts: Record<string, { items: string[] }> = {};
  if (Array.isArray(data?.callouts)) {
    for (const c of data.callouts) {
      if (c?.label) {
        strapiCallouts[c.label] = {
          items: splitLinesFilter(c?.items),
        };
      }
    }
  }

  const cards: RenderCard[] = CARDS.map((c) => {
    let items = c.items;
    let lines = c.lines;
    const strapiData = strapiCallouts[c.title];
    if (strapiData && strapiData.items.length > 0) {
      items = strapiData.items.map((text, i) => {
        if (i < c.items.length) {
          return { ...c.items[i], text };
        }
        // Generate new top coordinate dynamically
        const lastBaseTop = c.items.length > 0 ? c.items[c.items.length - 1].top : 14;
        const newTop = lastBaseTop + (i - c.items.length + 1) * 43.64;
        return { text, top: newTop, plusTop: +(newTop + 3.5).toFixed(2) };
      });
      
      // Also adjust lines to match the number of items - 1
      if (items.length > 1) {
        const numLinesNeeded = items.length - 1;
        lines = Array.from({ length: numLinesNeeded }).map((_, i) => {
          if (i < c.lines.length) return c.lines[i];
          const lastLine = c.lines[c.lines.length - 1] || { top: 40, left: 17, width: 233 };
          const newLineTop = lastLine.top + (i - c.lines.length + 1) * 43.64;
          return { ...lastLine, top: newLineTop };
        });
      } else {
        lines = [];
      }
    }
    const iconMap: Record<string, string> = {
      "Power": "/products/measured-icon-energy.svg",
      "Control": "/products/measured-icon-speed.svg",
      "Temperature": "/products/measured-icon-eco.svg",
    };
    return { ...c, items, lines, iconSrc: iconMap[c.title] || ICON_GLYPH };
  });

  return (
    <>
      {/* DESKTOP (>=1024px) — 3309:2368 "Desktop - 16" (1440×930) */}
      <section
        className="relative flex w-full justify-center bg-black overflow-hidden"
        aria-label="The full picture"
      >
        <div
          className="relative hidden h-[930px] w-full max-w-[1440px] min-[1024px]:block"
          data-node-id="3309:2368"
          data-name="Desktop - 16"
        >
          {/* 3309:2369 — bottom aurora (rotated 180°) */}
          <div
            className="absolute flex h-[486px] items-center justify-center left-1/2 -translate-x-1/2 top-[444px] w-[100vw] min-w-[1440px]"
            data-node-id="3309:2369"
          >
            <div className="flex-none rotate-180 w-full h-full">
              <div className="h-[486px] relative w-full" data-name="footer">
                <img
                  alt=""
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  src={AURORA}
                  style={{ objectFit: "fill" }}
                  aria-hidden
                />
              </div>
            </div>
          </div>

          {/* 3309:2370 — top aurora (mirrored) */}
          <div
            className="absolute flex h-[463px] items-center justify-center left-1/2 -translate-x-1/2 top-[-18.5px] w-[100vw] min-w-[1440px]"
            data-node-id="3309:2370"
          >
            <div className="-scale-y-100 flex-none rotate-180 w-full h-full">
              <div className="h-[463px] relative w-full" data-name="footer">
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  <div className="absolute bg-black inset-0" />
                  <img
                    alt=""
                    className="absolute w-full h-full"
                    src={AURORA}
                    style={{ objectFit: "fill" }}
                    aria-hidden
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3713:1975 — content frame (centered) */}
          <div
            className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col gap-[42px] items-center left-1/2 top-1/2 w-[1222px]"
            data-node-id="3713:1975"
          >
            {/* Heading */}
            <div
              className="flex flex-col gap-[24px] items-center relative shrink-0 w-[800px]"
              data-node-id="3309:2371"
              data-name="Heading"
            >
              <MenuChip label={menuLabel} />
              <div
                className="flex flex-col gap-[24px] items-center justify-center relative shrink-0"
                data-node-id="3309:2372"
                data-name="Section Title"
              >
                <GradientTitleBlock heading={heading} />
              </div>
            </div>

            {/* Card container */}
            <div
              className="h-[603px] relative shrink-0 w-full"
              data-node-id="3309:2380"
              data-name="Container"
            >
              {cards.map((c) => (
                <SpecCardView key={c.nodeId} card={c} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE (<1024px) */}
      <section
        className="relative w-full overflow-hidden bg-black px-[24px] pt-[80px] pb-[80px] min-[1024px]:hidden"
        aria-label="The full picture"
      >
        <div className="flex flex-col items-center gap-[20px]">
          <MenuChip label={menuLabel} />
          <h2
            className={`${gilroyMedium.className} [word-break:break-word] bg-clip-text m-0 max-w-full text-center text-[30px] leading-[34px] font-medium text-transparent not-italic`}
            style={{
              backgroundImage: TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            {heading}
          </h2>
        </div>

        <div className="mt-[32px] grid grid-cols-1 gap-[16px]">
          {cards.map((c) => (
            <SpecCardMobileView key={c.nodeId} card={c} />
          ))}
        </div>
      </section>
    </>
  );
}

function SpecCardMobileView({ card: c }: { card: RenderCard }) {
  const { fadeRef, isVisible } = useFadeIn();

  return (
    <div
      ref={fadeRef}
      className={`relative overflow-clip rounded-[12px] bg-[#dbe8c8] px-[15px] pt-[15px] pb-[16px] ${getFadeInClass(isVisible)}`}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: c.pattern.gradient }}
        aria-hidden
      />
      <div
        className="relative flex w-full items-center justify-between border-b border-solid pb-[10px]"
        style={{ borderColor: BORDER_DARK }}
      >
        <p
          className={`${gilroySemiBold.className} text-[16px] leading-[16px] not-italic tracking-[0.6px] uppercase whitespace-nowrap`}
          style={{ color: HEADER_COLOR }}
        >
          {c.title}
        </p>
        <div
          className="flex size-[28px] items-center justify-center overflow-clip rounded-[5.895px]"
          style={{ backgroundImage: ICON_TILE_BG }}
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={c.iconSrc} className="block size-[19px] max-w-none" />
        </div>
      </div>
      <div className="relative mt-[10px] flex flex-col gap-[10px]">
        {c.items.map((it, i) => (
          <p
            key={i}
            className={`${interRegular.className} text-[14px] font-normal leading-[normal] tracking-[-0.1504px] text-black not-italic`}
          >
            <span className="mr-[6px]" style={{ color: c.plusColor }}>
              +
            </span>
            {it.text}
          </p>
        ))}
      </div>
    </div>
  );
}
