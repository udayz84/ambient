import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, gilroySemiBold, interRegular } from "../hero/fonts";
import { TagBadge } from "../hero/TagBadge";
import { GradientTitle, CornerDecor } from "../contact/contact-shared";

const LEGACY_COMPUTE = "/technology/legacy-compute-new.png";
const LEGACY_MEMORY = "/technology/legacy-memory-new.png";
const ACUBE_CUBE = "/technology/acube-cube.png";
const ACUBE_GRID = "/technology/acube-card-grid.png";
const CONNECTOR_LINE_DIM = "/technology/stat-connector-line-dim.svg";
const CONNECTOR_LINE_BRIGHT = "/technology/stat-connector-line-bright.svg";
const FILLER_LINER = "/technology/acube-filler-liner.svg";
const FILLER_LINER_1 = "/technology/acube-filler-liner-1.svg";
const CHEVRON_LARGE = "/technology/chevron-large.svg";
const CHEVRON_MID = "/technology/chevron-mid.svg";
const CHEVRON_SMALL = "/technology/chevron-small.svg";
const CHEVRON_DOT = "/technology/chevron-dot.svg";

const CORNER_LEFT = "/hero/corner-tag-1.svg";
const CORNER_RIGHT = "/hero/corner-tag-2.svg";

const TITLE_GRADIENT_DEG = "108.194deg";
const SUBTITLE_OPACITY = 0.65;

const ACUBE_CARD_BG = `linear-gradient(90deg, rgba(63, 160, 43, 0.04) 0%, rgba(63, 160, 43, 0.04) 100%), linear-gradient(142.2deg, rgba(14, 15, 17, 0) 0.8302%, rgb(14, 15, 17) 56.9%), url("${ACUBE_GRID}"), linear-gradient(90deg, rgb(19, 47, 13) 0%, rgb(19, 47, 13) 100%)`;
const ACUBE_PANEL_BG = `linear-gradient(90deg, rgba(63, 160, 43, 0.04) 0%, rgba(63, 160, 43, 0.04) 100%), linear-gradient(177.72deg, rgb(14, 15, 17) 75.004%, rgba(14, 15, 17, 0) 183.08%), url("${ACUBE_GRID}"), linear-gradient(90deg, rgb(19, 47, 13) 0%, rgb(19, 47, 13) 100%)`;
const ACUBE_BG_SIZE = "auto, auto, 12.6px 12.6px, auto";

const FALLBACK_TAG = "The PROBLEM";
const FALLBACK_HEADING = "AI isn't a math problem.\nIt's a memory problem.";
const FALLBACK_SUBTITLE =
  "The multiply was never the expensive part. Moving the data was.";
const FALLBACK_STAT_VALUE = "95%";
const FALLBACK_STAT_DESC =
  "of a neural net is matrix math. ~75% of the effort is moving it around.";

const FALLBACK_CARDS = [
  {
    label: "Legacy",
    description:
      "Compute and memory sit apart. The chip spends its life shuttling numbers, not crunching them. ~75% of operations are just memory traffic.",
    image: LEGACY_COMPUTE,
  },
  {
    label: "A-Cube",
    description:
      "We put the compute inside the memory. The commute disappears. Compute where the data lives.",
    image: ACUBE_CUBE,
  },
];

const WHITE = "#ffffff";
const RED = "#fb3748";
const GREEN = "#1fc16b";

type StatRow = {
  label: string;
  value: string;
  valueColor: string;
  top: number;
  valueTop?: number;
  valueWidth?: number;
};

const FALLBACK_LEGACY_ROWS: StatRow[] = [
  { label: "Where compute happens", value: "Outside Memory", valueColor: WHITE, top: 26.28 },
  { label: "Data Movement", value: "High", valueColor: WHITE, top: 59.01 },
  { label: "Efforts spent on moving data", value: "High", valueColor: RED, top: 91.74 },
  { label: "Efficiency", value: "Low", valueColor: RED, top: 123.72, valueTop: 123 },
];

const FALLBACK_ACUBE_ROWS: StatRow[] = [
  { label: "Where compute happens", value: "Inside Memory", valueColor: WHITE, top: 26.2, valueWidth: 129 },
  { label: "Data Movement", value: "Minimal", valueColor: WHITE, top: 59.2 },
  { label: "Efforts spent on moving data", value: "Low", valueColor: GREEN, top: 92.2 },
  { label: "Efficiency", value: "High", valueColor: GREEN, top: 124.2, valueTop: 122.95, valueWidth: 43 },
];

function SectionHeader({
  tagText,
  headingLines,
  subtitle,
}: {
  tagText: string;
  headingLines: string[];
  subtitle: string;
}) {
  return (
    <div
      className="absolute left-[320px] top-[28px] z-10 flex h-[200px] w-[800px] flex-col items-center justify-start gap-[24px]"
      data-node-id="2976:1208"
      data-name="Frame 1984079432"
    >
      <TagBadge
        label={tagText}
        width={131}
        labelOffsetX={0}
        rightBarLeft={121.16}
        centerLabel
        nodeId="2976:1226"
      />

      <div
        className="relative flex flex-col items-center px-[10px]"
        data-node-id="2976:1210"
        data-name="Title"
      >
        <GradientTitle gradientDeg={TITLE_GRADIENT_DEG} className="text-center">
          <span className="block h-[49px] leading-[49px] whitespace-nowrap">
            {headingLines[0] ?? ""}
          </span>
          <span className="block h-[49px] leading-[49px] whitespace-nowrap">
            {headingLines[1] ?? ""}
          </span>
        </GradientTitle>
        <CornerDecor />
      </div>

      <p
        className={`${interRegular.className} w-[679.39px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
        style={{ opacity: SUBTITLE_OPACITY }}
        data-node-id="2976:1216"
      >
        {subtitle}
      </p>
    </div>
  );
}

function BottomCorners() {
  return (
    <>
      <div className="pointer-events-none absolute bottom-0 left-0 size-[4px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={CORNER_LEFT} alt="" className="block size-full max-w-none" />
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 size-[4px] -scale-x-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={CORNER_RIGHT} alt="" className="block size-full max-w-none" />
      </div>
    </>
  );
}

function UsageBar({
  left,
  top,
  progressHeight,
  progressGradient,
  nodeId,
}: {
  left: number;
  top: number;
  progressHeight: number;
  progressGradient: string;
  nodeId?: string;
}) {
  return (
    <div
      className="absolute flex h-[12px] w-[95px] items-center justify-center"
      style={{ left, top }}
      data-node-id={nodeId}
    >
      <div className="-rotate-90 -scale-y-100 flex-none">
        <div
          className="flex h-[95px] w-[12px] flex-col items-center justify-end bg-gradient-to-b from-[#535353] to-[#313131]"
          data-name="Usage Bar"
        >
          <div
            className="w-full shrink-0 rounded-[0.384px]"
            style={{ height: progressHeight, backgroundImage: progressGradient }}
            data-name="Progress Segment"
          />
        </div>
      </div>
    </div>
  );
}

function StatRows({ rows, valueRight }: { rows: StatRow[]; valueRight: number }) {
  return (
    <>
      {rows.map((row) => (
        <div key={row.label}>
          <p
            className={`${interRegular.className} absolute left-[21.81px] text-[14px] leading-[normal] font-normal whitespace-nowrap text-[#8e8e8e] uppercase not-italic [word-break:break-word]`}
            style={{ top: row.top }}
          >
            {row.label}
          </p>
          <p
            className={`${interRegular.className} absolute -translate-x-full text-right text-[14px] leading-[normal] font-normal whitespace-nowrap not-italic [word-break:break-word]`}
            style={{
              left: valueRight,
              top: row.valueTop ?? row.top,
              color: row.valueColor,
              width: row.valueWidth,
            }}
          >
            {row.value}
          </p>
        </div>
      ))}
    </>
  );
}

function LegacyCard({
  label,
  description,
  computeSrc,
}: {
  label: string;
  description: string;
  computeSrc: string;
}) {
  return (
    <div
      className="absolute left-[134px] top-[272px] h-[380px] w-[500px] bg-[rgba(128,128,128,0.1)]"
      data-node-id="3322:2581"
      data-name="Frame 1984079539"
    >
      <CornerDecor />
      <div
        className="absolute left-[20.5px] top-[16.05px] h-[346px] w-[459px]"
        data-node-id="3322:2582"
        data-name="Stat"
      >
        <div
          className="absolute top-[8px] right-0 left-0 flex flex-col items-start gap-[8px] border-b border-solid border-[rgba(255,255,255,0.1)] pb-[11px]"
          data-node-id="3322:2583"
        >
          <p
            className={`${gilroyMedium.className} w-[279px] text-[32px] leading-[38px] font-medium text-white not-italic [word-break:break-word]`}
            data-node-id="3322:2584"
          >
            {label}
          </p>
          <p
            className={`${interRegular.className} w-full text-[13px] leading-[normal] font-normal text-[#8e8e8e] not-italic [word-break:break-word]`}
            data-node-id="3322:2585"
          >
            {description}
          </p>
        </div>

        <p
          className={`${gilroyMedium.className} absolute left-[48.35px] top-[128.7px] text-[18px] leading-[28px] font-medium whitespace-nowrap text-white not-italic [word-break:break-word]`}
          data-node-id="3322:2587"
        >
          Compute
        </p>
        <p
          className={`${gilroyMedium.className} absolute left-[331.26px] top-[128.7px] text-[18px] leading-[28px] font-medium whitespace-nowrap text-white not-italic [word-break:break-word]`}
          data-node-id="3322:2592"
        >
          Memory
        </p>

        {/* image 208 — compute chip */}
        <div
          className="absolute left-[5.89px] top-[164.7px] h-[160.61px] w-[162.91px]"
          data-node-id="3322:2589"
          data-name="image 208"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={computeSrc}
              alt=""
              className="absolute left-[-13.52%] top-[-40.34%] h-[187.21%] w-[136.24%] max-w-none"
            />
          </div>
        </div>

        {/* image 206 — memory chip */}
        <div
          className="absolute left-[272.44px] top-[172.09px] h-[145.82px] w-[184.65px]"
          data-node-id="3322:2590"
          data-name="image 206"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LEGACY_MEMORY}
            alt=""
            className="absolute inset-0 size-full max-w-none object-cover pointer-events-none"
          />
        </div>

        {/* connector line — bright pulse flows left to right */}
        <div
          className="absolute left-[165.12px] top-[250.17px] h-0 w-[114.69px]"
          data-node-id="3322:2591"
        >
          <div className="absolute inset-[-20px_0_0_0]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CONNECTOR_LINE_DIM}
              alt=""
              className="block size-full max-w-none"
            />
            <div
              className="animate-technology-connector-flow absolute inset-0 [mask-image:linear-gradient(90deg,transparent,black_25%,black_75%,transparent)] [mask-size:40%_100%] [mask-repeat:no-repeat] [-webkit-mask-image:linear-gradient(90deg,transparent,black_25%,black_75%,transparent)] [-webkit-mask-size:40%_100%] [-webkit-mask-repeat:no-repeat]"
              aria-hidden
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={CONNECTOR_LINE_BRIGHT}
                alt=""
                className="block size-full max-w-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ACubeCard({
  label,
  description,
  cubeSrc,
  statValue,
  statDesc,
}: {
  label: string;
  description: string;
  cubeSrc: string;
  statValue: string;
  statDesc: string;
}) {
  return (
    <div
      className="absolute left-[754px] top-[272.05px] h-[380px] w-[575px] overflow-clip border border-solid border-[rgba(255,247,247,0.16)] bg-top-left"
      style={{ backgroundImage: ACUBE_CARD_BG, backgroundSize: ACUBE_BG_SIZE }}
      data-node-id="3328:978"
      data-name="card"
    >
      {/* filler liner — top right */}
      <div
        className="absolute bottom-[106.76px] left-[334.91px] flex h-[237.39px] w-[411.17px] items-center justify-center"
        data-node-id="3328:1000"
      >
        <div className="-rotate-150 -skew-x-30 flex-none scale-y-87">
          <div className="relative h-[271.67px] w-[203.11px]" data-name="Filler Liner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={FILLER_LINER}
              alt=""
              className="absolute inset-0 block size-full max-w-none"
            />
          </div>
        </div>
      </div>

      {/* filler liner — bottom left */}
      <div
        className="absolute bottom-[-102.33px] left-[6.26px] flex h-[224.48px] w-[388.81px] items-center justify-center"
        data-node-id="3328:987"
      >
        <div className="-skew-x-30 flex-none rotate-30 scale-y-87">
          <div className="relative h-[245.85px] w-[203.11px]" data-name="Filler Liner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={FILLER_LINER_1}
              alt=""
              className="absolute inset-0 block size-full max-w-none"
            />
          </div>
        </div>
      </div>

      <div
        className="absolute top-[24px] left-[29px] flex w-[234px] flex-col items-start justify-center gap-[8px] border-b border-solid border-[rgba(255,255,255,0.1)] pb-[11px]"
        data-node-id="3064:1514"
      >
        <p
          className={`${gilroyMedium.className} text-center text-[32px] leading-[38px] font-medium whitespace-nowrap text-white not-italic [word-break:break-word]`}
          data-node-id="3064:1515"
        >
          {label}
        </p>
        <p
          className={`${interRegular.className} w-full text-[13px] leading-[normal] font-normal text-[#8e8e8e] not-italic [word-break:break-word]`}
          data-node-id="3064:1516"
        >
          {description}
        </p>
      </div>

      <p
        className={`${gilroySemiBold.className} absolute top-[232.05px] left-[29px] w-[195px] bg-clip-text text-[50px] leading-[1.2] font-semibold text-transparent not-italic [word-break:break-word]`}
        style={{
          backgroundImage:
            "linear-gradient(146.757deg, rgb(255, 255, 255) 29.352%, rgba(115, 115, 115, 0.5) 98.158%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
        data-node-id="3328:1019"
      >
        {statValue}
      </p>
      <p
        className={`${interRegular.className} absolute top-[297.43px] left-[26.1px] w-[197.9px] text-[14px] leading-[18px] font-normal text-[#e2f9da] not-italic [word-break:break-word]`}
        data-node-id="3328:1024"
      >
        {statDesc}
      </p>

      {/* cube visual */}
      <div
        className="absolute top-[76.95px] left-[239px] h-[277px] w-[299px]"
        data-node-id="3328:504"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cubeSrc}
          alt=""
          className="absolute inset-0 size-full max-w-none object-bottom pointer-events-none"
        />
      </div>

      <CornerDecor />
    </div>
  );
}

function ChevronDecor() {
  return (
    <>
      <div
        className="animate-technology-chevron-flow absolute top-[484.42px] left-[688.88px] h-[97.26px] w-[47.33px]"
        style={{ animationDelay: "0s" }}
        data-node-id="3329:1028"
      >
        <div className="absolute inset-[-12.8%_-22.81%_-12.8%_-30.55%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={CHEVRON_LARGE} alt="" className="block size-full max-w-none" />
        </div>
      </div>
      <div
        className="animate-technology-chevron-flow absolute top-[515.96px] left-[697.23px] h-[34.17px] w-[16.63px]"
        style={{ animationDelay: "-0.25s" }}
        data-node-id="3329:1030"
      >
        <div className="absolute inset-[-1.02%_-4.2%_-1.02%_-2.16%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={CHEVRON_MID} alt="" className="block size-full max-w-none" />
        </div>
      </div>
      <div
        className="animate-technology-chevron-flow absolute top-[522.66px] left-[680.08px] h-[23.88px] w-[11.62px]"
        style={{ animationDelay: "-0.5s" }}
        data-node-id="3329:1031"
      >
        <div className="absolute inset-[-1.46%_-6.01%_-1.46%_-3.09%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={CHEVRON_SMALL} alt="" className="block size-full max-w-none" />
        </div>
      </div>
      <div
        className="animate-technology-chevron-flow absolute top-[526.56px] left-[666.14px] h-[16.06px] w-[7.82px] mix-blend-luminosity"
        style={{ animationDelay: "-0.75s" }}
        data-node-id="3329:1228"
      >
        <div className="absolute inset-[-2.18%_-8.93%_-2.17%_-4.6%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={CHEVRON_DOT} alt="" className="block size-full max-w-none" />
        </div>
      </div>
    </>
  );
}

function LegacyStatsPanel({ rows }: { rows: StatRow[] }) {
  return (
    <div
      className="absolute top-[650px] left-[134px] h-[170px] w-[500px] bg-[rgba(128,128,128,0.1)]"
      data-node-id="3329:1036"
      data-name="Frame 1984079540"
    >
      <UsageBar
        left={319}
        top={126}
        progressHeight={23.527}
        progressGradient="linear-gradient(rgb(255, 77, 0) 42.377%, rgb(58, 19, 30) 121.45%)"
        nodeId="3329:1058"
      />
      <BottomCorners />
      <StatRows rows={rows} valueRight={463.73} />
    </div>
  );
}

function ACubeStatsPanel({ rows }: { rows: StatRow[] }) {
  return (
    <div
      className="absolute top-[652.05px] left-[754px] h-[164px] w-[575px] border border-solid border-[rgba(255,247,247,0.16)] bg-top-left"
      style={{ backgroundImage: ACUBE_PANEL_BG, backgroundSize: ACUBE_BG_SIZE }}
      data-node-id="3329:1079"
      data-name="card"
    >
      <UsageBar
        left={387.81}
        top={126.2}
        progressHeight={89.238}
        progressGradient="linear-gradient(#8ce66c, #1b2f14)"
        nodeId="3329:1217"
      />
      <BottomCorners />
      <StatRows rows={rows} valueRight={540.81} />
    </div>
  );
}

function MobileStatRows({ rows }: { rows: StatRow[] }) {
  return (
    <div className="flex w-full flex-col gap-[14px]">
      {rows.map((row) => (
        <div key={row.label} className="flex w-full items-baseline justify-between gap-[16px]">
          <p
            className={`${interRegular.className} text-[12px] leading-[normal] font-normal text-[#8e8e8e] uppercase not-italic`}
          >
            {row.label}
          </p>
          <p
            className={`${interRegular.className} shrink-0 text-right text-[13px] leading-[normal] font-normal whitespace-nowrap not-italic`}
            style={{ color: row.valueColor }}
          >
            {row.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export function TechnologyPageProblem({ data }: { data?: any } = {}) {
  const tagText = data?.tag?.text || FALLBACK_TAG;
  const heading = data?.heading || FALLBACK_HEADING;
  const headingLines = heading.split("\n");
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const statValue = data?.stat_value || FALLBACK_STAT_VALUE;
  const statDesc = (data?.stat_description || FALLBACK_STAT_DESC)
    .split("\n")
    .join(" ");

  const strapiCards = Array.isArray(data?.comparison_cards)
    ? data.comparison_cards
    : null;
  const cards =
    strapiCards && strapiCards.length > 0
      ? strapiCards.map((c: any, i: number) => {
          const fb =
            FALLBACK_CARDS[i] ?? FALLBACK_CARDS[FALLBACK_CARDS.length - 1];
          return {
            label: (c?.label as string) || fb.label,
            description: (c?.description as string) || fb.description,
            image: mediaUrl(c?.image) || fb.image,
          };
        })
      : FALLBACK_CARDS;

  const legacy = cards[0] ?? FALLBACK_CARDS[0];
  const acube = cards[1] ?? FALLBACK_CARDS[1];

  const strapiLegacyStats = Array.isArray(data?.legacy_stats) ? data.legacy_stats : null;
  const legacyRows = (strapiLegacyStats && strapiLegacyStats.length > 0 ? strapiLegacyStats : FALLBACK_LEGACY_ROWS).map((r: any, i: number) => {
    const fallback = FALLBACK_LEGACY_ROWS[i] || FALLBACK_LEGACY_ROWS[0];
    return {
      label: r?.label || fallback.label,
      value: r?.value || fallback.value,
      valueColor: r?.valueColor || fallback.valueColor,
      top: fallback.top,
      valueTop: fallback.valueTop,
      valueWidth: fallback.valueWidth,
    };
  });

  const strapiACubeStats = Array.isArray(data?.acube_stats) ? data.acube_stats : null;
  const acubeRows = (strapiACubeStats && strapiACubeStats.length > 0 ? strapiACubeStats : FALLBACK_ACUBE_ROWS).map((r: any, i: number) => {
    const fallback = FALLBACK_ACUBE_ROWS[i] || FALLBACK_ACUBE_ROWS[0];
    return {
      label: r?.label || fallback.label,
      value: r?.value || fallback.value,
      valueColor: r?.valueColor || fallback.valueColor,
      top: fallback.top,
      valueTop: fallback.valueTop,
      valueWidth: fallback.valueWidth,
    };
  });

  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="3060:1222"
      data-name="Frame 1984079539"
      aria-label="The problem: AI is a memory problem"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden h-[939px] w-full max-w-[1440px] min-[1024px]:block">
        <SectionHeader
          tagText={tagText}
          headingLines={headingLines}
          subtitle={subtitle}
        />
        <LegacyCard
          label={legacy.label}
          description={legacy.description}
          computeSrc={legacy.image}
        />
        <ACubeCard
          label={acube.label}
          description={acube.description}
          cubeSrc={acube.image}
          statValue={statValue}
          statDesc={statDesc}
        />
        <ChevronDecor />
        <LegacyStatsPanel rows={legacyRows} />
        <ACubeStatsPanel rows={acubeRows} />
      </div>

      {/* MOBILE (<1024px) — basic responsive version */}
      <div className="relative flex w-full flex-col items-center gap-[32px] px-[24px] py-[64px] min-[1024px]:hidden">
        <TagBadge
          label={tagText}
          width={131}
          labelOffsetX={0}
          rightBarLeft={121.16}
          centerLabel
          nodeId="2976:1226"
        />

        <div
          className={`${gilroyMedium.className} bg-clip-text text-center text-[34px] leading-[39px] font-medium text-transparent not-italic`}
          style={{
            backgroundImage: `linear-gradient(${TITLE_GRADIENT_DEG}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          <span className="block">{headingLines[0] ?? ""}</span>
          <span className="block">{headingLines[1] ?? ""}</span>
        </div>

        <p
          className={`${interRegular.className} max-w-[327px] text-center text-[15px] leading-[22px] font-normal text-[#f0f0f0] not-italic`}
          style={{ opacity: SUBTITLE_OPACITY }}
        >
          {subtitle}
        </p>

        {/* Legacy card */}
        <div className="relative flex w-full max-w-[500px] flex-col items-start gap-[16px] bg-[rgba(128,128,128,0.1)] px-[20px] py-[24px]">
          <CornerDecor />
          <div className="flex w-full flex-col items-start gap-[8px] border-b border-solid border-[rgba(255,255,255,0.1)] pb-[11px]">
            <p className={`${gilroyMedium.className} text-[26px] leading-[32px] font-medium text-white not-italic`}>
              {legacy.label}
            </p>
            <p className={`${interRegular.className} text-[13px] leading-[normal] font-normal text-[#8e8e8e] not-italic`}>
              {legacy.description}
            </p>
          </div>
          <p className={`${gilroyMedium.className} text-[18px] leading-[28px] font-medium text-white not-italic`}>
            Compute
          </p>
          <div className="h-[160px] w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={legacy.image} alt="" className="size-full object-contain" />
          </div>
          <p className={`${gilroyMedium.className} text-[18px] leading-[28px] font-medium text-white not-italic`}>
            Memory
          </p>
          <div className="h-[140px] w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LEGACY_MEMORY} alt="" className="size-full object-contain" />
          </div>
        </div>

        {/* A-Cube card */}
        <div
          className="relative flex w-full max-w-[500px] flex-col items-start gap-[16px] overflow-clip border border-solid border-[rgba(255,247,247,0.16)] bg-top-left px-[20px] py-[24px]"
          style={{ backgroundImage: ACUBE_CARD_BG, backgroundSize: ACUBE_BG_SIZE }}
        >
          <CornerDecor />
          <div className="flex w-full flex-col items-start gap-[8px] border-b border-solid border-[rgba(255,255,255,0.1)] pb-[11px]">
            <p className={`${gilroyMedium.className} text-[26px] leading-[32px] font-medium text-white not-italic`}>
              {acube.label}
            </p>
            <p className={`${interRegular.className} text-[13px] leading-[normal] font-normal text-[#8e8e8e] not-italic`}>
              {acube.description}
            </p>
          </div>
          <div className="h-[220px] w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={acube.image} alt="" className="size-full object-contain" />
          </div>
          <p
            className={`${gilroySemiBold.className} bg-clip-text text-[40px] leading-[1.2] font-semibold text-transparent not-italic`}
            style={{
              backgroundImage:
                "linear-gradient(146.757deg, rgb(255, 255, 255) 29.352%, rgba(115, 115, 115, 0.5) 98.158%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            {statValue}
          </p>
          <p className={`${interRegular.className} -mt-[16px] text-[13px] leading-[18px] font-normal text-[#e2f9da] not-italic`}>
            {statDesc}
          </p>
        </div>

        {/* Legacy stats */}
        <div className="relative w-full max-w-[500px] bg-[rgba(128,128,128,0.1)] px-[20px] py-[24px]">
          <MobileStatRows rows={legacyRows} />
        </div>

        {/* A-Cube stats */}
        <div
          className="relative w-full max-w-[500px] border border-solid border-[rgba(255,247,247,0.16)] bg-top-left px-[20px] py-[24px]"
          style={{ backgroundImage: ACUBE_PANEL_BG, backgroundSize: ACUBE_BG_SIZE }}
        >
          <MobileStatRows rows={acubeRows} />
        </div>
      </div>
    </section>
  );
}
