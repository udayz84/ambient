"use client";

import { useState } from "react";
import { mediaUrl } from "@/lib/strapi";
import { useFitText } from "../shared/FitText";
import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { TagBadge } from "../hero/TagBadge";
import {
  ARCH_ARTICLE,
  ARCH_ASSETS,
  ARCH_BLOCKS,
  ARCH_CAPTION,
  ARCH_FRAME,
  ARCH_FRAME_WIDTH,
  ARCH_HIGHLIGHTS,
  ARCH_HIGHLIGHT_RECT,
  ARCH_LINES,
  ARCH_STAT,
  ARCH_STAT_ACTIVE_BG,
  ARCH_STAT_ACTIVE_BORDER,
  ARCH_STATS,
  ARCH_STATS_FRAME,
  ARCH_TITLE_GRADIENT,
  CORNER_LEFT,
  CORNER_RIGHT,
  FEATURES_TITLE_GRADIENT_MOBILE,
} from "./products-data";

const GRID_LINE = "/products/arch-grid-line.svg"; // Figma 3529:630 / 3529:640
const STAT_ICON = "/products/arch-stat-icon.svg";

const FALLBACK_LABEL = "Architecture";
const FALLBACK_HEADING = "Everything in one chip. \nNothing wasted.";
const FALLBACK_SUBTITLE =
  "A complete edge-AI SoC — AI engine, control, sensing, memory, and security — integrated so your board doesn't have to be.";
const FALLBACK_CAPTION = "The Hardware Blueprint";

function splitLines(value: string): string[] {
  return value.split("\n");
}

/**
 * Figma 3713:1965 — "Everything in one chip. Nothing wasted."
 * Menu chip + gradient title (2903:2164), then a 24px-gap row (3529:615):
 * bordered article card with the architecture blueprint (3529:616) and a
 * vertical stats column (3529:623).
 */
export function ProductsArchitecture({ data }: { data?: any }) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const label = data?.label || FALLBACK_LABEL;
  const heading = data?.heading || FALLBACK_HEADING;
  const headingLines = splitLines(heading);
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const image = mediaUrl(data?.image) || null;
  console.log("Architecture image:", image);
  const caption = data?.caption || FALLBACK_CAPTION;
  const stats =
    Array.isArray(data?.stats) && data.stats.length > 0
      ? data.stats.map((s: any, i: number) => ({
          nodeId: `arch-stat-${i}`,
          title: s?.label || s?.value || ARCH_STATS[i]?.title || "",
          description: s?.description ?? ARCH_STATS[i]?.description ?? "",
          statIcon: mediaUrl(s?.stat_icon) || STAT_ICON,
          titleWidth: ARCH_STATS[i]?.titleWidth ?? ARCH_STAT.width,
        }))
      : ARCH_STATS.map((s) => ({ ...s, statIcon: STAT_ICON }));
  return (
    <>
      {/* DESKTOP (>=1024px) */}
      <section
        className="relative mx-auto hidden w-full bg-black min-[1024px]:block pt-[32px]"
        aria-label="Architecture"
      >
        <ProductsArchitectureDesktop
          label={label}
          headingLines={headingLines}
          subtitle={subtitle}
          image={image}
          caption={caption}
          stats={stats}
          hoveredIndex={hoveredIndex}
          onHover={setHoveredIndex}
        />
      </section>

      {/* MOBILE (<1024px) */}
      <ProductsArchitectureMobile
        label={label}
        headingLines={headingLines}
        subtitle={subtitle}
        image={image}
        caption={caption}
        stats={stats}
      />
    </>
  );
}

/**
 * 4px corner tick, mirrors the Figma structure: tick box with the image
 * inset [0_0_-12.5%_-12.5%], flipped per corner.
 * tl = flipY, bl = plain, tr = rotate180, br = flipY+rotate180.
 */
function CornerTick({
  src,
  placement,
  nodeId,
  size = 4,
  style,
}: {
  src: string;
  placement: "tl" | "tr" | "bl" | "br";
  nodeId?: string;
  size?: number;
  style?: React.CSSProperties;
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
      <img loading="lazy" decoding="async" alt="" className="block max-w-none size-full" src={src} aria-hidden />
    </div>
  );
  return (
    <div
      className={`pointer-events-none absolute ${flipClass ? "flex items-center justify-center" : ""}`}
      style={{ width: size, height: size, ...style }}
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

/** Figma 3712:1942 — "Architecture" eyebrow chip. */
function MenuChip({ label }: { label: string }) {
  return (
    <div
      className={`${dmMono.className} bg-[rgba(255,255,255,0.06)] flex gap-[6px] h-[27px] items-center overflow-clip px-[24px] relative shrink-0 border-[0.5px] border-solid border-[rgba(240,240,240,0.25)]`}
      data-node-id="3710:1910"
      data-name="Menu"
    >
      <Corners leftSrc="/hero/vector-57.svg" rightSrc="/hero/vector-55.svg" />
      <p
        className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] leading-[24px] not-italic relative shrink-0 text-[#ecfae5] text-[16px] tracking-[-0.403px] uppercase whitespace-nowrap"
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

/**
 * Figma 4443:7622 — layered chip "Architecture" frame (821×556), rendered
 * from the exact Figma assets at native size so the per-stat highlight
 * rects land at exact pixel coordinates. Default layers sit underneath;
 * the green hover layers (base + lines + blocks) cross-fade in on any
 * hover, and each stat's highlight rects fade in for the active stat.
 */
function ArchDiagram({ hoveredIndex }: { hoveredIndex: number }) {
  const hovering = hoveredIndex !== -1;
  const fade = "transition-opacity duration-500 ease-in-out";
  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left: ARCH_FRAME.left,
        top: ARCH_FRAME.top,
        width: ARCH_FRAME.width,
        height: ARCH_FRAME.height,
      }}
      data-node-id="4443:7622"
      data-name="Architecture"
    >
      {/* Default layers */}
      <div className={`absolute inset-0 ${fade} ${hovering ? "opacity-0" : "opacity-100"}`}>
        {/* Base — 4443:7623 */}
        <div className="absolute left-[10px] top-[20px] h-[536px] w-[811px]">
          <div className="absolute inset-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" alt="" aria-hidden src={ARCH_ASSETS.baseDefault} className="absolute left-[-3.08%] top-[-1.1%] h-[107.25%] w-[106.33%] max-w-none" />
          </div>
        </div>
        {/* Blocks (default texture) */}
        {ARCH_BLOCKS.map((b, i) => (
          <div key={i} className="absolute overflow-hidden" style={{ left: b.left, top: b.top, width: b.width, height: b.height }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" alt="" aria-hidden src={ARCH_ASSETS.blockDefault} className="absolute max-w-none" style={{ height: b.defaultInsetImg.height, left: b.defaultInsetImg.left, top: b.defaultInsetImg.top, width: b.defaultInsetImg.width }} />
          </div>
        ))}
        {/* Lines (default) */}
        {ARCH_LINES.map((l, i) => (
          <ArchLine key={i} line={l} src={l.defaultSrc} />
        ))}
      </div>

      {/* Hover layers (green) */}
      <div className={`absolute inset-0 ${fade} ${hovering ? "opacity-100" : "opacity-0"}`}>
        {/* Base hover — 4444:7876 */}
        <div className="absolute left-[10px] top-[20px] h-[536px] w-[811px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async" alt="" aria-hidden src={ARCH_ASSETS.baseHover} className="absolute inset-0 size-full max-w-none object-bottom" />
        </div>
        {/* Blocks (hover) */}
        {ARCH_BLOCKS.map((b, i) => (
          <div key={i} className="absolute overflow-hidden" style={{ left: b.left, top: b.top, width: b.width, height: b.height }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" alt="" aria-hidden src={b.hoverSrc} className="absolute inset-0 size-full max-w-none object-bottom" />
          </div>
        ))}
        {/* Lines (hover) */}
        {ARCH_LINES.map((l, i) => (
          <ArchLine key={i} line={l} src={l.hoverSrc} />
        ))}
      </div>

      {/* Per-stat highlight rects — Figma 4444:7896/7897, 7920/7921, 8006/8007 */}
      {ARCH_HIGHLIGHTS.map((rects, statIndex) => (
        <div key={statIndex} className={`absolute inset-0 ${fade} ${hoveredIndex === statIndex ? "opacity-100" : "opacity-0"}`}>
          {rects.map((rect, rectIndex) => (
            <div key={rectIndex} className={`absolute ${ARCH_HIGHLIGHT_RECT}`} style={{ left: rect.left, top: rect.top, width: rect.width, height: rect.height }}>
              <div className="absolute inset-0 overflow-hidden rounded-[6px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async" alt="" aria-hidden src={ARCH_ASSETS.blockDefault} className="absolute max-w-none" style={{ height: rect.fillImg.height, left: rect.fillImg.left, top: rect.fillImg.top, width: rect.fillImg.width }} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function ArchLine({ line, src }: { line: (typeof ARCH_LINES)[number]; src: string }) {
  if (line.rotate) {
    return (
      <div className="absolute flex items-center justify-center" style={{ left: line.left, top: line.top, width: line.width, height: line.height }}>
        <div className={`flex-none ${line.rotate}`}>
          <div className="relative" style={{ width: line.innerWidth, height: line.innerHeight ?? 0 }}>
            <div className={`absolute ${line.inset}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" alt="" aria-hidden src={src} className="block size-full max-w-none" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="absolute" style={{ left: line.left, top: line.top, width: line.width, height: line.height }}>
      <div className={`absolute ${line.inset}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async" alt="" aria-hidden src={src} className="block size-full max-w-none" />
      </div>
    </div>
  );
}

function ProductsArchitectureDesktop({
  label,
  headingLines,
  subtitle,
  caption,
  stats,
  hoveredIndex,
  onHover,
}: {
  label: string;
  headingLines: string[];
  subtitle: string;
  image: string | null;
  caption: string;
  stats: any[];
  hoveredIndex: number;
  onHover: (i: number) => void;
}) {
  const fitRef = useFitText<HTMLHeadingElement>({});
  return (
    <div
      className="mx-auto flex w-full flex-col items-center gap-[49px] pb-0"
      style={{ maxWidth: ARCH_FRAME_WIDTH }}
      data-node-id="3713:1965"
    >
      {/* Section title — 2903:2164 (centered, w=650) */}
      <div
        className="flex flex-col items-center justify-center gap-[24px]"
        data-node-id="2903:2164"
        data-name="Section Title"
      >
        <MenuChip label={label} />
        <div
          className="relative flex flex-col items-center px-[10px]"
          data-node-id="2903:2165"
          data-name="Title"
        >
          <h2
            ref={fitRef}
            className={`${gilroyMedium.className} m-0 bg-clip-text text-center text-[46px] leading-[0] font-medium text-transparent not-italic whitespace-nowrap`}
            style={{
              backgroundImage: ARCH_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2903:2166"
          >
            {headingLines.map((line, i) => (
              <span key={i} className="block leading-[49px] whitespace-pre">{line}</span>
            ))}
          </h2>
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
        </div>
        <p
          className={`${interRegular.className} w-[650px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
          data-node-id="2903:2171"
        >
          {subtitle}
        </p>
      </div>

      {/* Content row — 3529:615 */}
      <div className="flex w-full items-start gap-[24px]" data-node-id="3529:615">
        {/* Article — 3529:616 */}
        <div
          className="relative shrink-0 overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)]"
          style={{ width: ARCH_ARTICLE.width, height: ARCH_ARTICLE.height }}
          data-node-id="3529:616"
          data-name="Article"
        >
          <ArchDiagram hoveredIndex={hoveredIndex} />
          {/* Corner ticks — 3529:618-621 (right/bottom ones clipped per design) */}
          <CornerTick src={CORNER_LEFT} placement="tl" nodeId="3529:618" style={{ left: -0.5, top: -0.5 }} />
          <CornerTick src={CORNER_RIGHT} placement="tr" nodeId="3529:619" style={{ right: -40.5, top: -0.5 }} />
          <CornerTick src={CORNER_RIGHT} placement="br" nodeId="3529:620" style={{ right: -40.5, bottom: -19.5 }} />
          <CornerTick src={CORNER_LEFT} placement="bl" nodeId="3529:621" style={{ left: -0.5, bottom: -19.5 }} />
          <p
            className={`${gilroyMedium.className} absolute m-0 text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
            style={{ left: ARCH_CAPTION.left, top: ARCH_CAPTION.top, right: -24.5 }}
            data-node-id="3529:622"
          >
            {caption}
          </p>
        </div>

        {/* Stats column — 3529:623 */}
        <div
          className="relative flex shrink-0 flex-col gap-[16px]"
          style={{ width: ARCH_STATS_FRAME.width, height: ARCH_ARTICLE.height }}
          data-node-id="3529:623"
          data-name="Frame 1000003873"
          onMouseLeave={() => onHover(-1)}
        >
          {stats.map((stat, index) => (
            <ArchStatView
              key={stat.nodeId}
              stat={stat}
              isActive={hoveredIndex === index}
              onHover={() => onHover(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ArchStatView({
  stat,
  isActive = false,
  onHover,
}: {
  stat: any;
  isActive?: boolean;
  onHover?: () => void;
}) {
  return (
    <div
      className="relative flex flex-1 w-full flex-col items-start justify-center gap-[12px] px-[28px] py-[16px] border-[0.5px] border-solid overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: isActive ? ARCH_STAT_ACTIVE_BG : "rgba(0,0,0,0.1)",
        borderColor: isActive ? ARCH_STAT_ACTIVE_BORDER : "rgba(240,240,240,0.2)",
      }}
      onMouseEnter={onHover}
      data-node-id={stat.nodeId}
      data-name="Stat"
    >
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      {/* Icon */}
      <div
        className="relative shrink-0"
        style={{ width: ARCH_STAT.iconWidth, height: ARCH_STAT.iconHeight }}
        data-name="Vector"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async"
          alt=""
          src={stat.statIcon || STAT_ICON}
          className="absolute inset-0 block size-full max-w-none"
          aria-hidden
        />
      </div>

      {/* Title */}
      <h3
        className={`${gilroyMedium.className} m-0 text-[32px] leading-[38px] font-medium text-white not-italic [word-break:break-word]`}
        style={{ width: stat.titleWidth }}
      >
        {stat.title}
      </h3>

      {/* Description */}
      <div
        className="relative flex shrink-0 flex-col items-start"
        style={{ width: ARCH_STAT.width }}
        data-name="Content"
      >
        <p
          className={`${interRegular.className} m-0 w-full text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
        >
          {stat.description}
        </p>
      </div>
    </div>
  );
}



function ProductsArchitectureMobile({
  label,
  headingLines,
  subtitle,
  image,
  caption,
  stats,
}: {
  label: string;
  headingLines: string[];
  subtitle: string;
  image: string | null;
  caption: string;
  stats: any[];
}) {
  const fitRef = useFitText<HTMLHeadingElement>({});
  return (
    <section
      className="relative w-full overflow-hidden bg-black min-[1024px]:hidden pt-[80px]"
      aria-label="Architecture"
      data-node-id="3568:4644"
    >
      <div className="relative mx-auto w-full" style={{ maxWidth: 393 }}>

        {/* ── Header — 3568:4704 (top=30, centred, 350 wide, gap=10) ── */}
        <div className="flex flex-col items-center gap-[10px] px-[21px] pt-[40px]">
          <TagBadge
            label={label}
            width={120}
            height={27}
            centerLabel
            leftBarLeft={5.7}
            rightBarLeft={111.16}
            labelClassName="text-[12px] leading-[20.149px] tracking-[-0.36px]"
          />
          {/* Title — 3568:4705 */}
          <div className="relative">
            <h2
              ref={fitRef}
              className={`${gilroyMedium.className} w-[350px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: FEATURES_TITLE_GRADIENT_MOBILE,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {headingLines.map((line, i) => (
                <span key={i} className="block leading-[36px]">{line.trim()}</span>
              ))}
            </h2>
            <Corners leftSrc="/hero/vector-57.svg" rightSrc="/hero/vector-55.svg" />
          </div>
          {/* Description */}
          <p
            className={`${interRegular.className} w-[350px] text-center text-[14px] leading-[16px] font-normal text-[#f0f0f0] not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
          >
            {subtitle}
          </p>
        </div>

        {/* ── Article card — 3568:4713 (responsive) ── */}
        <div className="mx-auto mt-[15px] w-full max-w-[353px] px-[20px] min-[393px]:px-0 pb-[40px]">
          <div
            className="relative w-full border border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] flex flex-col pt-[14px] pb-[16px]"
            data-name="Article"
          >
            {/* Architecture diagram — horizontal, responsive */}
            <div className="relative w-full px-[14px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async"
                alt="GPX10 Pro architecture"
                src={image || "/products/architecture.webp"}
                className="w-full h-auto object-contain"
              />
            </div>
            {/* Corner ticks */}
            <CornerTick src="/hero/vector-57.svg" placement="tl" style={{ left: -1, top: -1 }} />
            <CornerTick src="/hero/vector-55.svg" placement="tr" style={{ right: -1, top: -1 }} size={3} />
            <CornerTick src="/hero/vector-55.svg" placement="br" style={{ right: -1, bottom: -1 }} size={3} />
            <CornerTick src="/hero/vector-57.svg" placement="bl" style={{ left: -1, bottom: -1 }} />
            {/* Caption */}
            <p
              className={`${gilroyMedium.className} mt-[16px] px-[14px] whitespace-nowrap text-[14px] leading-[28px] font-medium text-white not-italic`}
            >
              {caption}
            </p>
          </div>

          {/* ── Stats cards ── */}
          <div className="mt-[5px] flex flex-col items-center w-full gap-[12px]">
            {stats.map((stat) => (
              <div
                key={stat.nodeId}
                className="relative flex w-full flex-col items-start bg-[rgba(0,0,0,0.1)] p-[20px]"
              >
                <div className="flex w-full flex-col gap-[7px]">
                  {/* Icon + title */}
                  <div className="flex items-center gap-[8px]">
                    <div className="h-[32px] w-[32px] shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img loading="lazy" decoding="async" alt="" src={stat.statIcon || STAT_ICON} className="block size-full max-w-none" aria-hidden />
                    </div>
                    <h3
                      className={`${gilroyMedium.className} whitespace-nowrap text-[20px] sm:text-[24px] leading-[38px] font-medium text-white not-italic [word-break:break-word]`}
                    >
                      {stat.title}
                    </h3>
                  </div>
                  {/* Description */}
                  <p
                    className={`${interRegular.className} w-full text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
                  >
                    {stat.description}
                  </p>
                </div>
                <Corners leftSrc="/hero/vector-57.svg" rightSrc="/hero/vector-55.svg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
