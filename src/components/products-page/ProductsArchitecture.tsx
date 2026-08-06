import { mediaUrl } from "@/lib/strapi";
import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import {
  ARCH_ARTICLE,
  ARCH_CAPTION,
  ARCH_FRAME_WIDTH,
  ARCH_IMAGE,
  ARCH_STAT,
  ARCH_STATS,
  ARCH_STATS_FRAME,
  ARCH_TITLE_GRADIENT,
  CORNER_LEFT,
  CORNER_RIGHT,
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
        className="relative mx-auto hidden w-full bg-black min-[1024px]:block"
        aria-label="Architecture"
      >
        <ProductsArchitectureDesktop
          label={label}
          headingLines={headingLines}
          subtitle={subtitle}
          image={image}
          caption={caption}
          stats={stats}
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
      <img alt="" className="block max-w-none size-full" src={src} aria-hidden />
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

function ProductsArchitectureDesktop({
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
  return (
    <div
      className="mx-auto flex w-full flex-col items-center gap-[49px] pb-[120px]"
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
          className={`${interRegular.className} w-[650px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
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
          <div
            className="absolute"
            style={{
              left: ARCH_IMAGE.left,
              top: ARCH_IMAGE.top,
              width: ARCH_IMAGE.width,
              height: ARCH_IMAGE.height,
            }}
            data-node-id="3529:617"
            data-name="Architecture 1"
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {image && (
                <img
                  alt="GPX10 Pro architecture"
                  src={image}
                  className="absolute inset-0 size-full object-contain object-center"
                />
              )}
            </div>
          </div>
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
        >
          {stats.map((stat) => (
            <ArchStatView key={stat.nodeId} stat={stat} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ArchStatView({ stat }: { stat: any }) {
  return (
    <div
      className="relative flex flex-1 w-full flex-col items-start justify-center gap-[12px] px-[28px] py-[16px] border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.1)] overflow-hidden"
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
        <img
          alt=""
          src={stat.statIcon || STAT_ICON}
          className="absolute inset-0 block size-full max-w-none"
          aria-hidden
        />
      </div>

      {/* Title */}
      <h3
        className={`${gilroyMedium.className} m-0 text-[32px] leading-[38px] font-medium text-white not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden`}
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
          className={`${interRegular.className} m-0 w-full text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden`}
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
  return (
    <section
      className="relative w-full bg-black px-[24px] pt-[64px] pb-[80px] min-[1024px]:hidden"
      aria-label="Architecture"
    >
      {/* Title */}
      <div className="flex flex-col items-center gap-[16px]">
        <MenuChip label={label} />
        <h2
          className={`${gilroyMedium.className} max-w-full bg-clip-text text-center text-[30px] leading-[34px] font-medium text-transparent not-italic [word-break:break-word]`}
          style={{
            backgroundImage: ARCH_TITLE_GRADIENT,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {headingLines.join(" ")}
        </h2>
        <p
          className={`${interRegular.className} max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0]`}
        >
          {subtitle}
        </p>
      </div>

      {/* Architecture image + caption */}
      <div className="mt-[24px] border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] p-[10px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {image && (
          <img
            alt="GPX10 Pro architecture"
            src={image}
            className="h-auto w-full"
          />
        )}
        <p
          className={`${gilroyMedium.className} mt-[16px] mb-[6px] ml-[6px] text-[22px] leading-[28px] font-medium text-white not-italic`}
        >
          {caption}
        </p>
      </div>

      {/* Stats */}
      <div className="mt-[32px] flex flex-col gap-[16px]">
        {stats.map((stat) => (
          <div
            key={stat.nodeId}
            className="relative flex flex-col gap-[12px] px-[24px] py-[20px] border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.1)]"
          >
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            <div className="flex items-center gap-[16px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={stat.statIcon || STAT_ICON}
                className="h-[36px] w-[36px] shrink-0"
                aria-hidden
              />
            </div>
            <h3
              className={`${gilroyMedium.className} text-[24px] leading-[30px] font-medium text-white not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden`}
            >
              {stat.title}
            </h3>
            <p
              className={`${interRegular.className} text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden`}
            >
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
