import { mediaUrl } from "@/lib/strapi";
import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { TabSwitcher } from "./TabSwitcher";
import { Corners } from "../shared/Corners";
import {
  ALWAYSON_SECTION_HEIGHT,
  ALWAYSON_STATS,
  ALWAYSON_STATS_DATA,
  ALWAYSON_TITLE,
  ALWAYSON_TITLE_GRADIENT,
  CORNER_LEFT,
  CORNER_RIGHT,
  HAND_BG,
  HAND_OVERLAY,
  ICON_TILE_BG,
} from "./products-data";

const FALLBACK_HEADING = "Always on. Never asleep.";
const FALLBACK_SUBTITLE =
  "GPX10 Pro runs AI around the clock at microwatts — and the instant something matters, it surges to full power. No reset. No waking up. It was never off.";

function splitLines(value: string): string[] {
  return value.split("\n");
}

/**
 * "Always On. Never asleep." section.
 * Combines Figma 2915:1219 (title), 2908:487 (hand background) and
 * 2915:1234 (stats row) on a 1442-wide desktop canvas.
 */
export function ProductsAlwaysOn({ data }: { data?: any }) {
  const heading = data?.heading || FALLBACK_HEADING;
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const image = mediaUrl(data?.image) || "/products/hand.png";
  const statIcon = mediaUrl(data?.stat_icon) || "/products/stat-icon.svg";
  const stats =
    Array.isArray(data?.stats) && data.stats.length > 0
      ? data.stats.map((s: any, i: number) => {
          const fallback = ALWAYSON_STATS_DATA[i] || ALWAYSON_STATS_DATA[0];
          const titleLines = splitLines(s?.title_lines || fallback.titleLines.join("\n"));
          const badge = s?.badge || fallback.badge.label;
          return {
            nodeId: `stat-${i}`,
            titleLines: [titleLines[0] || "", titleLines[1] || ""],
            badge: {
              label: badge,
              width: fallback.badge.width,
              rightBarLeft: fallback.badge.rightBarLeft,
            },
          };
        })
      : ALWAYSON_STATS_DATA;
  return (
    <>
      {/* DESKTOP (>=1024px) */}
      <section
        className="relative mx-auto hidden w-full bg-black min-[1024px]:block pb-[120px]"
        aria-label="Always on"
      >
        <div
          className="relative mx-auto w-[1442px]"
          style={{ height: ALWAYSON_SECTION_HEIGHT }}
        >
          <ProductsAlwaysOnDesktop
            heading={heading}
            subtitle={subtitle}
            image={image}
            statIcon={statIcon}
            stats={stats}
          />
        </div>
      </section>

      {/* MOBILE (<1024px) */}
      <ProductsAlwaysOnMobile
        heading={heading}
        subtitle={subtitle}
        image={image}
        statIcon={statIcon}
        stats={stats}
      />
    </>
  );
}

function ProductsAlwaysOnDesktop({
  heading,
  subtitle,
  image,
  statIcon,
  stats,
}: {
  heading: string;
  subtitle: string;
  image: string;
  statIcon: string;
  stats: any[];
}) {
  return (
    <>
      {/* Hand background — 2908:487 */}
      <div
        className="pointer-events-none absolute overflow-hidden"
        style={{
          left: HAND_BG.left,
          top: HAND_BG.top,
          width: HAND_BG.width,
          height: HAND_BG.height,
        }}
        data-node-id="2908:487"
        data-name="hand"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={image}
          className="absolute inset-0 size-full max-w-none object-bottom"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: HAND_OVERLAY }}
        />
      </div>

      {/* Section title — 2915:1219 */}
      <div
        className="absolute flex flex-col items-center gap-[24px]"
        style={{
          left: ALWAYSON_TITLE.left,
          top: ALWAYSON_TITLE.top,
          width: ALWAYSON_TITLE.width,
        }}
        data-node-id="2915:1219"
        data-name="Section Title"
      >
        <div
          className="relative px-[10px]"
          style={{ width: 540, height: 49 }}
          data-node-id="2915:1220"
          data-name="Title"
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} absolute m-0 w-[520px] bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              left: 10,
              top: 0,
              backgroundImage: ALWAYSON_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2915:1221"
          >
            {heading}
          </h2>
        </div>
        <p
          className={`${interRegular.className} w-[650px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
          data-node-id="2915:1226"
        >
          {subtitle}
        </p>
        <TabSwitcher className="mt-[8px]" />
      </div>

      {/* Stats frame — 2915:1234 */}
      <div
        className="absolute flex items-start gap-[32px] px-[20px] border border-white/10 rounded-sm"
        style={{
          left: ALWAYSON_STATS.left,
          top: ALWAYSON_STATS.top,
          width: ALWAYSON_STATS.width,
          height: ALWAYSON_STATS.height,
          backgroundColor: "rgba(0,0,0,0.1)",
        }}
        data-node-id="2915:1234"
        data-name="Frame 1984079438"
      >
        <Stat stat={stats[0]} statIcon={statIcon} />
        <GridDivider />
        <Stat stat={stats[1]} statIcon={statIcon} />
        <GridDivider />
        <Stat stat={stats[2]} statIcon={statIcon} />

        {/* Frame corner marks */}
        <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      </div>
    </>
  );
}

function Stat({ stat, statIcon }: { stat: any; statIcon: string }) {
  const { badge } = stat;
  return (
    <div
      className="relative flex h-[181px] w-[340px] shrink-0 flex-col justify-between py-[12px]"
      data-node-id={stat.nodeId}
      data-name="Stat"
    >
      {/* Icon tile */}
      <div
        className="relative size-[40px] shrink-0 overflow-clip"
        style={{ borderRadius: 6.667, backgroundImage: ICON_TILE_BG }}
        data-name="Icon"
        aria-hidden
      >
        <div className="absolute left-1/2 top-1/2 h-[26.667px] w-[28.148px] -translate-x-1/2 -translate-y-1/2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={statIcon}
            className="block size-full max-w-none"
          />
        </div>
      </div>

      {/* Badge (next to icon) */}
      <div
        className="absolute left-[56px] top-[18.39px]"
        data-name="Logo and Menu"
      >
        <StatBadge label={badge.label} width={badge.width} rightBarLeft={badge.rightBarLeft} />
      </div>

      {/* Title */}
      <h3
        className={`${gilroyMedium.className} w-[279px] shrink-0 text-[32px] leading-[38px] font-medium text-white not-italic [word-break:break-word]`}
        data-name="Title"
      >
        <span className="block leading-[38px]">{stat.titleLines[0]}</span>
        <span className="block leading-[38px]">{stat.titleLines[1]}</span>
      </h3>
    </div>
  );
}

function StatBadge({
  label,
  width,
  rightBarLeft,
}: {
  label: string;
  width: number;
  rightBarLeft: number;
}) {
  return (
    <div
      className={`${dmMono.className} relative h-[26px] shrink-0 overflow-clip bg-[rgba(255,255,255,0.06)] border-[0.5px] border-white/20 rounded-[4px]`}
      style={{ width }}
      data-name="Menu"
    >
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      <p
        className="absolute left-1/2 top-[calc(50%-4.5px)] -translate-x-1/2 text-[13px] leading-[19.5px] font-normal tracking-[-0.39px] whitespace-nowrap text-[#ecfae5] uppercase not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word]"
        data-name="Menu Text"
      >
        {label}
      </p>
      <div className="absolute top-1/2 left-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
      <div
        className="absolute top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60"
        style={{ left: rightBarLeft }}
      />
    </div>
  );
}

function GridDivider() {
  return (
    <div
      className="relative h-[181px] w-[8px] shrink-0 overflow-clip"
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

function ProductsAlwaysOnMobile({
  heading,
  subtitle,
  image,
  statIcon,
  stats,
}: {
  heading: string;
  subtitle: string;
  image: string;
  statIcon: string;
  stats: any[];
}) {
  return (
    <section
      className="relative w-full overflow-hidden bg-black min-[1024px]:hidden"
      aria-label="Always on"
    >
      {/* Hand background */}
      <div className="pointer-events-none absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={image}
          className="absolute inset-0 size-full object-cover object-center opacity-50"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.95) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-[20px] px-[24px] pt-[80px] pb-[16px]">
        <h2
          className={`${gilroyMedium.className} max-w-full bg-clip-text text-center text-[30px] leading-[34px] font-medium text-transparent not-italic [word-break:break-word]`}
          style={{
            backgroundImage: ALWAYSON_TITLE_GRADIENT,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {heading}
        </h2>
        <p
          className={`${interRegular.className} max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0]`}
        >
          {subtitle}
        </p>
        <TabSwitcher className="mt-[8px]" />
      </div>

      {/* Stats */}
      <div className="relative z-10 flex flex-col px-[24px] pb-[80px]">
        {stats.map((stat, index) => (
          <div key={stat.nodeId}>
            <div className="flex flex-col gap-[16px] py-[20px]">
              <div className="flex items-center gap-[16px]">
                <div
                  className="flex size-[40px] shrink-0 items-center justify-center overflow-clip"
                  style={{ borderRadius: 6.667, backgroundImage: ICON_TILE_BG }}
                  aria-hidden
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src={statIcon}
                    className="block h-[26.667px] w-[28.148px]"
                  />
                </div>
                <StatBadge
                  label={stat.badge.label}
                  width={stat.badge.width}
                  rightBarLeft={stat.badge.rightBarLeft}
                />
              </div>
              <h3
                className={`${gilroyMedium.className} text-[26px] leading-[32px] font-medium text-white not-italic`}
              >
                {stat.titleLines[0]} {stat.titleLines[1]}
              </h3>
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
