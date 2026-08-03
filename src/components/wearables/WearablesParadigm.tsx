import { gilroyMedium, gilroySemiBold, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { CornerDecor } from "../contact/contact-shared";
import { mediaUrl } from "@/lib/strapi";

const TITLE_GRADIENT =
  "linear-gradient(117.952deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

/* --- Containers copied from the technology page "paradigm shift" section --- */

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

const ACUBE_CARD_BG = `linear-gradient(90deg, rgba(63, 160, 43, 0.04) 0%, rgba(63, 160, 43, 0.04) 100%), linear-gradient(142.2deg, rgba(14, 15, 17, 0) 0.8302%, rgb(14, 15, 17) 56.9%), url("${ACUBE_GRID}"), linear-gradient(90deg, rgb(19, 47, 13) 0%, rgb(19, 47, 13) 100%)`;
const ACUBE_PANEL_BG = `linear-gradient(90deg, rgba(63, 160, 43, 0.04) 0%, rgba(63, 160, 43, 0.04) 100%), linear-gradient(177.72deg, rgb(14, 15, 17) 75.004%, rgba(14, 15, 17, 0) 183.08%), url("${ACUBE_GRID}"), linear-gradient(90deg, rgb(19, 47, 13) 0%, rgb(19, 47, 13) 100%)`;
const ACUBE_BG_SIZE = "auto, auto, 12.6px 12.6px, auto";

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

const LEGACY_ROWS: StatRow[] = [
  { label: "Where compute happens", value: "Outside Memory", valueColor: WHITE, top: 26.28 },
  { label: "Data Movement", value: "High", valueColor: WHITE, top: 59.01 },
  { label: "Efforts spent on moving data", value: "High", valueColor: RED, top: 91.74 },
  { label: "Efficiency", value: "Low", valueColor: RED, top: 123.72, valueTop: 123 },
];

const ACUBE_ROWS: StatRow[] = [
  { label: "Where compute happens", value: "Inside Memory", valueColor: WHITE, top: 26.2, valueWidth: 129 },
  { label: "Data Movement", value: "Minimal", valueColor: WHITE, top: 59.2 },
  { label: "Efforts spent on moving data", value: "Low", valueColor: GREEN, top: 92.2 },
  { label: "Efficiency", value: "High", valueColor: GREEN, top: 124.2, valueTop: 122.95, valueWidth: 43 },
];

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
      className="absolute left-[134px] top-[0px] h-[380px] w-[500px] bg-[rgba(128,128,128,0.1)]"
      data-name="Frame 1984079539"
    >
      <CornerDecor />
      <div
        className="absolute left-[20.5px] top-[16.05px] h-[346px] w-[459px]"
        data-name="Stat"
      >
        <div
          className="absolute top-[8px] right-0 left-0 flex flex-col items-start gap-[8px] border-b border-solid border-[rgba(255,255,255,0.1)] pb-[11px]"
        >
          <p
            className={`${gilroyMedium.className} w-[279px] text-[32px] leading-[38px] font-medium text-white not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden`}
          >
            {label}
          </p>
          <p
            className={`${interRegular.className} w-full text-[13px] leading-[normal] font-normal text-[#8e8e8e] not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden`}
          >
            {description}
          </p>
        </div>

        <p
          className={`${gilroyMedium.className} absolute left-[48.35px] top-[128.7px] text-[18px] leading-[28px] font-medium whitespace-nowrap text-white not-italic [word-break:break-word]`}
        >
          Compute
        </p>
        <p
          className={`${gilroyMedium.className} absolute left-[331.26px] top-[128.7px] text-[18px] leading-[28px] font-medium whitespace-nowrap text-white not-italic [word-break:break-word]`}
        >
          Memory
        </p>

        {/* image 208 — compute chip */}
        <div
          className="absolute left-[5.89px] top-[164.7px] h-[160.61px] w-[162.91px]"
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
      className="absolute left-[754px] top-[0.05px] h-[380px] w-[575px] overflow-clip border border-solid border-[rgba(255,247,247,0.16)] bg-top-left"
      style={{ backgroundImage: ACUBE_CARD_BG, backgroundSize: ACUBE_BG_SIZE }}
      data-name="card"
    >
      {/* filler liner — top right */}
      <div
        className="absolute bottom-[106.76px] left-[334.91px] flex h-[237.39px] w-[411.17px] items-center justify-center"
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
      >
        <p
          className={`${gilroyMedium.className} text-center text-[32px] leading-[38px] font-medium whitespace-nowrap text-white not-italic [word-break:break-word] overflow-hidden text-ellipsis`}
        >
          {label}
        </p>
        <p
          className={`${interRegular.className} w-full text-[13px] leading-[normal] font-normal text-[#8e8e8e] not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden`}
        >
          {description}
        </p>
      </div>

      <p
        className={`${gilroySemiBold.className} absolute top-[232.05px] left-[29px] w-[195px] bg-clip-text text-[50px] leading-[1.2] font-semibold text-transparent not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden`}
        style={{
          backgroundImage:
            "linear-gradient(146.757deg, rgb(255, 255, 255) 29.352%, rgba(115, 115, 115, 0.5) 98.158%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        {statValue}
      </p>
      <p
        className={`${interRegular.className} absolute top-[297.43px] left-[26.1px] w-[197.9px] text-[14px] leading-[18px] font-normal text-[#e2f9da] not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden`}
      >
        {statDesc}
      </p>

      {/* cube visual */}
      <div
        className="absolute top-[76.95px] left-[239px] h-[277px] w-[299px]"
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
        className="animate-technology-chevron-flow absolute top-[212.42px] left-[688.88px] h-[97.26px] w-[47.33px]"
        style={{ animationDelay: "0s" }}
      >
        <div className="absolute inset-[-12.8%_-22.81%_-12.8%_-30.55%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={CHEVRON_LARGE} alt="" className="block size-full max-w-none" />
        </div>
      </div>
      <div
        className="animate-technology-chevron-flow absolute top-[243.96px] left-[697.23px] h-[34.17px] w-[16.63px]"
        style={{ animationDelay: "-0.25s" }}
      >
        <div className="absolute inset-[-1.02%_-4.2%_-1.02%_-2.16%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={CHEVRON_MID} alt="" className="block size-full max-w-none" />
        </div>
      </div>
      <div
        className="animate-technology-chevron-flow absolute top-[250.66px] left-[680.08px] h-[23.88px] w-[11.62px]"
        style={{ animationDelay: "-0.5s" }}
      >
        <div className="absolute inset-[-1.46%_-6.01%_-1.46%_-3.09%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={CHEVRON_SMALL} alt="" className="block size-full max-w-none" />
        </div>
      </div>
      <div
        className="animate-technology-chevron-flow absolute top-[254.56px] left-[666.14px] h-[16.06px] w-[7.82px] mix-blend-luminosity"
        style={{ animationDelay: "-0.75s" }}
      >
        <div className="absolute inset-[-2.18%_-8.93%_-2.17%_-4.6%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={CHEVRON_DOT} alt="" className="block size-full max-w-none" />
        </div>
      </div>
    </>
  );
}

function LegacyStatsPanel() {
  return (
    <div
      className="absolute top-[378px] left-[134px] h-[170px] w-[500px] bg-[rgba(128,128,128,0.1)]"
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
      <StatRows rows={LEGACY_ROWS} valueRight={463.73} />
    </div>
  );
}

function ACubeStatsPanel() {
  return (
    <div
      className="absolute top-[380.05px] left-[754px] h-[164px] w-[575px] border border-solid border-[rgba(255,247,247,0.16)] bg-top-left"
      style={{ backgroundImage: ACUBE_PANEL_BG, backgroundSize: ACUBE_BG_SIZE }}
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
      <StatRows rows={ACUBE_ROWS} valueRight={540.81} />
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

/* --- End of copied technology page containers --- */

const FALLBACK_HEADING = "The Paradigm Shift";
const FALLBACK_SUBTITLE =
  "Bridge the lab and real world. The Sparsh module offers continuous, microwatt intelligence in a 21×21mm size, with a breakout board that snaps off for production.";

export function WearablesParadigm({ data }: { data?: any }) {
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const heading = data?.heading || FALLBACK_HEADING;
  const legacy = {
    label: data?.cards?.[0]?.title || FALLBACK_CARDS[0].label,
    description: data?.cards?.[0]?.body || FALLBACK_CARDS[0].description,
    image: mediaUrl(data?.cards?.[0]?.background_image) || FALLBACK_CARDS[0].image,
  };
  const acube = {
    label: data?.cards?.[1]?.title || FALLBACK_CARDS[1].label,
    description: data?.cards?.[1]?.body || FALLBACK_CARDS[1].description,
    image: mediaUrl(data?.cards?.[1]?.background_image) || FALLBACK_CARDS[1].image,
  };

  const statValue = data?.cards?.[1]?.stat_value || FALLBACK_STAT_VALUE;
  const statDesc = data?.cards?.[1]?.stat_desc || FALLBACK_STAT_DESC;
  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="2509:469"
      data-name="The Paradigm Shift"
      aria-label="The Paradigm Shift"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden w-full max-w-[1440px] flex-col items-center gap-[48px] pt-[20px] pb-[100px] min-[1024px]:flex">
        {/* Headings */}
        <div className="flex flex-col items-center gap-[24px]">
          <div className="relative flex flex-col items-center px-[10px]">
            <h2
              className={`${gilroyMedium.className} bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent whitespace-nowrap not-italic [word-break:break-word]`}
              style={{
                backgroundImage: TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              data-node-id="2509:472"
            >
              {heading}
            </h2>
            <Corners
              leftSrc="/applications/wearables/vector-42.svg"
              rightSrc="/applications/wearables/vector-43.svg"
            />
          </div>
          <p
            className={`${interRegular.className} w-[679.389px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
            data-node-id="2509:477"
          >
            {subtitle}
          </p>
        </div>

        {/* Containers copied from the technology page paradigm shift section */}
        <div className="relative h-[548px] w-full">
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
          <LegacyStatsPanel />
          <ACubeStatsPanel />
        </div>
      </div>

      {/* MOBILE (<1024px) */}
      <div className="relative flex w-full flex-col items-center gap-[40px] px-[24px] pt-[24px] pb-[72px] min-[1024px]:hidden">
        {/* Headings */}
        <div className="flex flex-col items-center gap-[20px]">
          <div className="relative flex flex-col items-center px-[10px]">
            <h2
              className={`${gilroyMedium.className} bg-clip-text text-center text-[34px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {heading}
            </h2>
            <Corners
              leftSrc="/applications/wearables/vector-42.svg"
              rightSrc="/applications/wearables/vector-43.svg"
            />
          </div>
          <p
            className={`${interRegular.className} max-w-[327px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-65 not-italic`}
          >
            {subtitle}
          </p>
        </div>

        {/* Containers copied from the technology page paradigm shift section */}
        <div className="flex w-full flex-col items-center gap-[32px]">
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
            <MobileStatRows rows={LEGACY_ROWS} />
          </div>

          {/* A-Cube stats */}
          <div
            className="relative w-full max-w-[500px] border border-solid border-[rgba(255,247,247,0.16)] bg-top-left px-[20px] py-[24px]"
            style={{ backgroundImage: ACUBE_PANEL_BG, backgroundSize: ACUBE_BG_SIZE }}
          >
            <MobileStatRows rows={ACUBE_ROWS} />
          </div>
        </div>
      </div>
    </section>
  );
}
