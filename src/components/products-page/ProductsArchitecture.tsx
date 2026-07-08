import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import {
  ARCH_IMAGE,
  ARCH_STAT,
  ARCH_STATS,
  ARCH_STATS_FRAME,
  ARCH_TITLE_GRADIENT,
  CORNER_LEFT,
  CORNER_RIGHT,
} from "./products-data";

const FALLBACK_HEADING = "Everything in one chip. \nNothing wasted.";
const FALLBACK_SUBTITLE =
  "A complete edge-AI SoC — AI engine, control, sensing, memory, and security — integrated so your board doesn't have to be.";

function splitLines(value: string): string[] {
  return value.split("\n");
}

/**
 * Figma 2903:2164 (title) + 2903:2163 (architecture image) + 2903:2204 (stats).
 * "Everything in one chip. Nothing wasted."
 */
export function ProductsArchitecture({ data }: { data?: any }) {
  const heading = data?.heading || FALLBACK_HEADING;
  const headingLines = splitLines(heading);
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const image = mediaUrl(data?.image) || "/products/architecture.png";
  const statIcon = mediaUrl(data?.stat_icon) || "/products/arch-stat-icon.svg";
  const stats =
    Array.isArray(data?.stats) && data.stats.length > 0
      ? data.stats.map((s: any, i: number) => ({
          nodeId: `arch-stat-${i}`,
          title: s?.value || s?.label || ARCH_STATS[i]?.title || "",
          description: s?.description ?? ARCH_STATS[i]?.description ?? "",
        }))
      : ARCH_STATS;
  return (
    <>
      {/* DESKTOP (>=1024px) */}
      <section
        className="relative mx-auto hidden w-full bg-black min-[1024px]:block"
        aria-label="Architecture"
      >
        <ProductsArchitectureDesktop
          headingLines={headingLines}
          subtitle={subtitle}
          image={image}
          statIcon={statIcon}
          stats={stats}
        />
      </section>

      {/* MOBILE (<1024px) */}
      <ProductsArchitectureMobile
        headingLines={headingLines}
        subtitle={subtitle}
        image={image}
        statIcon={statIcon}
        stats={stats}
      />
    </>
  );
}

function ProductsArchitectureDesktop({
  headingLines,
  subtitle,
  image,
  statIcon,
  stats,
}: {
  headingLines: string[];
  subtitle: string;
  image: string;
  statIcon: string;
  stats: any[];
}) {
  return (
    <div className="mx-auto flex w-full max-w-[1205.594px] flex-col items-center pb-[120px]">
      {/* Section title — 2903:2164 (centered, w=650) */}
      <div
        className="flex flex-col items-center gap-[24px]"
        style={{ width: 650 }}
        data-node-id="2903:2164"
        data-name="Section Title"
      >
        <div
          className="relative px-[10px]"
          style={{ width: 504, height: 98 }}
          data-node-id="2903:2165"
          data-name="Title"
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} absolute m-0 w-[484px] bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              left: 10,
              top: 0,
              backgroundImage: ARCH_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2903:2166"
          >
            {headingLines.map((line, i) => (
              <span key={i} className="block leading-[49px]">{line}</span>
            ))}
          </h2>
        </div>
        <p
          className={`${interRegular.className} w-[650px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
          data-node-id="2903:2171"
        >
          {subtitle}
        </p>
      </div>

      {/* Architecture image — 2903:2163 */}
      <div
        className="relative mt-[6px]"
        style={{ width: ARCH_IMAGE.width, height: ARCH_IMAGE.height }}
        data-node-id="2903:2163"
        data-name="Architecture 1"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="GPX10 Pro architecture"
          src={image}
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
        />
      </div>

      {/* Stats frame — 2903:2204 */}
      <div
        className="relative mt-[2.67px] flex items-start justify-center gap-[32px] px-[20px] border border-white/10 rounded-sm"
        style={{
          width: ARCH_STATS_FRAME.width,
          height: ARCH_STATS_FRAME.height,
          backgroundColor: "rgba(0,0,0,0.1)",
        }}
        data-node-id="2903:2204"
        data-name="Frame 1000003873"
      >
        <ArchStatView stat={stats[0]} statIcon={statIcon} />
        <ArchGridDivider />
        <ArchStatView stat={stats[1]} statIcon={statIcon} />
        <ArchGridDivider />
        <ArchStatView stat={stats[2]} statIcon={statIcon} />

        <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      </div>
    </div>
  );
}

function ArchStatView({ stat, statIcon }: { stat: any; statIcon: string }) {
  return (
    <div
      className="relative shrink-0"
      style={{ width: ARCH_STAT.width, height: ARCH_STAT.height }}
      data-node-id={stat.nodeId}
      data-name="Stat"
    >
      {/* Icon */}
      <div
        className="absolute"
        style={{
          left: 0.40625,
          top: 20,
          width: ARCH_STAT.iconWidth,
          height: ARCH_STAT.iconHeight,
        }}
        data-name="Vector"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={statIcon}
          className="block size-full max-w-none"
          aria-hidden
        />
      </div>

      {/* Title */}
      <h3
        className={`${gilroyMedium.className} absolute m-0 text-[32px] leading-[38px] font-medium text-white not-italic whitespace-nowrap`}
        style={{ left: 0.40625, top: 84, width: "100%" }}
      >
        {stat.title}
      </h3>

      {/* Description */}
      <p
        className={`${interRegular.className} absolute text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
        style={{ left: 0.40625, top: 134, width: ARCH_STAT.width }}
      >
        {stat.description}
      </p>
    </div>
  );
}

function ArchGridDivider() {
  return (
    <div
      className="relative w-[8px] shrink-0 overflow-clip"
      style={{ height: ARCH_STATS_FRAME.height }}
      data-name="Grid Line'"
      aria-hidden
    >
      {/* Top cap */}
      <div className="absolute left-0 top-[0.46px] flex h-[4px] w-[8px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative h-[4px] w-[8px]">
            <div className="absolute inset-[0_0_-12.5%_0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src="/products/grid-line-cap.svg"
                className="block size-full max-w-none"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Vertical line */}
      <div className="absolute left-[3.5px] top-[4px] flex h-[259px] w-0 items-center justify-center">
        <div className="flex-none rotate-90">
          <div className="relative h-0 w-[259px]">
            <div className="absolute inset-[-1px_0_0_0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src="/products/grid-line-87.svg"
                className="block size-full max-w-none"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Bottom cap */}
      <div className="absolute bottom-[0.5px] left-0 h-[4px] w-[8px]">
        <div className="absolute inset-[0_0_-12.5%_0]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src="/products/grid-line-cap.svg"
            className="block size-full max-w-none"
          />
        </div>
      </div>
    </div>
  );
}

function ProductsArchitectureMobile({
  headingLines,
  subtitle,
  image,
  statIcon,
  stats,
}: {
  headingLines: string[];
  subtitle: string;
  image: string;
  statIcon: string;
  stats: any[];
}) {
  return (
    <section
      className="relative w-full bg-black px-[24px] pt-[64px] pb-[80px] min-[1024px]:hidden"
      aria-label="Architecture"
    >
      {/* Title */}
      <div className="flex flex-col items-center gap-[16px]">
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

      {/* Architecture image */}
      <div className="mt-[24px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="GPX10 Pro architecture"
          src={image}
          className="h-auto w-full"
        />
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
                  src={statIcon}
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
