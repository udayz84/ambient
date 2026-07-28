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

const MENU_CORNER_LEFT = "/products/fp-menu-corner-left.svg"; // Figma Vector 42
const MENU_CORNER_RIGHT = "/products/fp-menu-corner-right.svg"; // Figma Vector 43
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
  const image = mediaUrl(data?.image) || "/products/architecture.png";
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
      className={`${dmMono.className} bg-[rgba(255,255,255,0.06)] flex gap-[6px] h-[27px] items-center overflow-clip px-[24px] relative shrink-0`}
      data-node-id="3712:1942"
      data-name="Menu"
    >
      <p
        className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] leading-[20.149px] not-italic relative shrink-0 text-[#ecfae5] text-[13.433px] tracking-[-0.403px] uppercase whitespace-nowrap"
        data-node-id="3712:1943"
      >
        {label}
      </p>
      <CornerTick src={MENU_CORNER_LEFT} placement="tl" nodeId="3712:1944" size={4.133} style={{ left: 0, top: 0 }} />
      <CornerTick src={MENU_CORNER_LEFT} placement="bl" nodeId="3712:1945" size={4.133} style={{ left: 0, bottom: 0 }} />
      <div
        className="absolute bg-white h-[12.399px] left-[12px] opacity-60 top-[7.3px] w-[2.067px]"
        data-node-id="3712:1946"
        aria-hidden
      />
      <div
        className="-translate-y-1/2 absolute bg-white h-[12.399px] opacity-60 right-[12px] top-1/2 w-[2.067px]"
        data-node-id="3712:1947"
        aria-hidden
      />
      <CornerTick src={MENU_CORNER_RIGHT} placement="tr" nodeId="3712:1948" size={4.133} style={{ right: 0, top: 0 }} />
      <CornerTick src={MENU_CORNER_RIGHT} placement="br" nodeId="3712:1949" size={4.133} style={{ right: 0, bottom: 0 }} />
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
  image: string;
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
              <img
                alt="GPX10 Pro architecture"
                src={image}
                className="absolute top-0 left-[-0.73%] h-full w-[100.34%] max-w-none"
              />
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
          className="relative flex shrink-0 flex-col items-center border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.1)] px-[20px]"
          style={{ width: ARCH_STATS_FRAME.width }}
          data-node-id="3529:623"
          data-name="Frame 1000003873"
        >
          <ArchStatView stat={stats[0]} variant="first" />
          <ArchGridDivider nodeId="3529:630" />
          <ArchStatView stat={stats[1]} variant="middle" />
          <ArchGridDivider nodeId="3529:640" />
          <ArchStatView stat={stats[2]} variant="last" />
          {/* Corner ticks — 3529:650-653 */}
          <CornerTick src={CORNER_RIGHT} placement="tr" nodeId="3529:650" style={{ right: 0.52, top: 0.49 }} />
          <CornerTick src={CORNER_RIGHT} placement="br" nodeId="3529:651" style={{ right: 0.52, bottom: 0.53 }} />
          <CornerTick src={CORNER_LEFT} placement="tl" nodeId="3529:652" style={{ left: 0.51, top: 0.51 }} />
          <CornerTick src={CORNER_LEFT} placement="bl" nodeId="3529:653" style={{ left: 0.51, bottom: 0.5 }} />
        </div>
      </div>
    </div>
  );
}

function ArchStatView({
  stat,
  variant,
}: {
  stat: any;
  variant: "first" | "middle" | "last";
}) {
  const spacingClass =
    variant === "first"
      ? "gap-[20px] py-[20px]"
      : variant === "middle"
        ? "gap-[20px] pb-[24px]"
        : "gap-[10px] pb-[20px]";
  return (
    <div
      className={`relative flex shrink-0 flex-col items-start ${spacingClass}`}
      data-node-id={stat.nodeId}
      data-name="Stat"
    >
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
          className={`${interRegular.className} m-0 w-full text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
        >
          {stat.description}
        </p>
      </div>
    </div>
  );
}

function ArchGridDivider({ nodeId }: { nodeId: string }) {
  return (
    <div
      className="relative h-px w-[8px] shrink-0"
      data-node-id={nodeId}
      data-name="Grid Line'"
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src={GRID_LINE}
        className="absolute inset-0 block size-full max-w-none"
      />
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
  image: string;
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
        <img
          alt="GPX10 Pro architecture"
          src={image}
          className="h-auto w-full"
        />
        <p
          className={`${gilroyMedium.className} mt-[16px] mb-[6px] ml-[6px] text-[22px] leading-[28px] font-medium text-white not-italic`}
        >
          {caption}
        </p>
      </div>

      {/* Stats */}
      <div className="mt-[32px] flex flex-col">
        {stats.map((stat, index) => (
          <div key={stat.nodeId}>
            <div className="flex flex-col gap-[12px] py-[20px]">
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
                className={`${gilroyMedium.className} text-[24px] leading-[30px] font-medium text-white not-italic`}
              >
                {stat.title}
              </h3>
              <p
                className={`${interRegular.className} text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-65 not-italic`}
              >
                {stat.description}
              </p>
            </div>
            {index < stats.length - 1 && (
              <div className="h-px w-full border-t border-dashed border-white/15" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
