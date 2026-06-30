import { gilroyMedium, gilroySemiBold, interRegular } from "../hero/fonts";
import { TagBadge } from "../hero/TagBadge";
import { GradientTitle, CornerDecor } from "../contact/contact-shared";

const CENTER_BG = "/technology/problem-bg.png";
const CENTER_OVERLAY = "/technology/problem-overlay.png";
const LEGACY_COMPUTE = "/technology/legacy-compute.png";
const LEGACY_MEMORY = "/technology/legacy-memory.png";
const ACUBE_DIAGRAM = "/technology/acube-diagram.png";
const CONNECTOR_LINE = "/technology/connector-line.svg";
const CONNECTOR_ICON = "/technology/connector-icon.svg";

const TITLE_GRADIENT_DEG = "108.194deg";
const SUBTITLE_OPACITY = 0.65;

const SUBTITLE_TEXT =
  "The multiply was never the expensive part. Moving the data was.";

const VIGNETTE =
  "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)";

function CenterVisual() {
  return (
    <div
      className="pointer-events-none absolute left-[283px] top-[295px] z-0 h-[577px] w-[829px] overflow-hidden"
      data-node-id="3056:1182"
      data-name="image 29"
    >
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CENTER_BG}
            alt=""
            className="absolute left-[-19.5%] top-[-11.27%] h-[111.27%] w-[137.68%] max-w-none"
          />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CENTER_OVERLAY}
          alt=""
          className="absolute inset-0 size-full max-w-none object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundImage: VIGNETTE }} />
      </div>
    </div>
  );
}

function SectionHeader() {
  return (
    <div
      className="absolute left-[320px] top-[28px] z-10 flex h-[200px] w-[800px] flex-col items-center justify-start gap-[24px]"
      data-node-id="2976:1208"
      data-name="Frame 1984079432"
    >
      <TagBadge
        label="The PROBLEM"
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
            AI isn&apos;t a math problem.
          </span>
          <span className="block h-[49px] leading-[49px] whitespace-nowrap">
            It&apos;s a memory problem.
          </span>
        </GradientTitle>
        <CornerDecor />
      </div>

      <p
        className={`${interRegular.className} w-[679.39px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
        style={{ opacity: SUBTITLE_OPACITY }}
        data-node-id="2976:1216"
      >
        {SUBTITLE_TEXT}
      </p>
    </div>
  );
}

function LegacyDiagram() {
  return (
    <div
      className="relative h-[392px] w-[275px] shrink-0"
      data-node-id="3064:1450"
      data-name="Frame 1984079540"
    >
      {/* image 208 — compute (top) */}
      <div
        className="absolute left-1/2 top-[-3px] h-[199px] w-[275px] -translate-x-1/2 overflow-hidden"
        data-node-id="3064:1451"
        data-name="image 208"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LEGACY_COMPUTE}
          alt=""
          className="absolute left-0 top-[-40.34%] h-[187.21%] w-full max-w-none"
        />
      </div>

      {/* image 206 — memory (bottom) */}
      <div
        className="absolute left-1/2 top-[244px] h-[154px] w-[195px] -translate-x-1/2 overflow-hidden"
        data-node-id="3064:1485"
        data-name="image 206"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LEGACY_MEMORY}
          alt=""
          className="absolute inset-0 size-full max-w-none object-cover"
        />
      </div>

      {/* connector line (vertical) */}
      <div
        className="absolute left-1/2 top-[190px] h-[56px] w-0 -translate-x-1/2"
        data-node-id="3064:1453"
        data-name="Line 125"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CONNECTOR_LINE}
          alt=""
          className="absolute left-1/2 top-1/2 h-[1px] w-[56px] -translate-x-1/2 -translate-y-1/2 rotate-90"
        />
      </div>

      {/* connector icon (+) */}
      <div
        className="absolute left-[128px] top-[210px] h-[16px] w-[16px]"
        data-node-id="3064:1454"
        data-name="Vector"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CONNECTOR_ICON}
          alt=""
          className="block size-full max-w-none"
        />
      </div>
    </div>
  );
}

function LegacyStatCard() {
  return (
    <div
      className="absolute left-[100px] top-[255px] z-20 h-[657px] w-[380px] bg-[rgba(0,0,0,0.1)] border border-white/10"
      data-node-id="3064:1443"
      data-name="Frame 1984079438"
    >
      <CornerDecor />
      <div
        className="flex h-full w-full flex-col items-center justify-center gap-[32px] px-[20px] py-[20px]"
        data-node-id="3064:1444"
        data-name="Stat"
      >
        <div
          className="flex w-full flex-col items-start gap-[8px] border-b border-solid border-[rgba(255,255,255,0.1)] pb-[11px]"
          data-node-id="3064:1446"
        >
          <p
            className={`${gilroyMedium.className} w-[279px] text-[32px] leading-[38px] font-medium text-white not-italic`}
            data-node-id="3064:1447"
          >
            Legacy
          </p>
          <p
            className={`${interRegular.className} w-full text-[13px] leading-[normal] font-normal text-[#8e8e8e] not-italic [word-break:break-word]`}
            data-node-id="3064:1448"
          >
            Compute and memory sit apart. The chip spends its life shuttling
            numbers, not crunching them. ~75% of operations are just memory
            traffic.
          </p>
        </div>

        <div
          className="flex flex-col items-center gap-[16px]"
          data-node-id="3064:1487"
        >
          <p
            className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium whitespace-nowrap text-[#6fe047] not-italic`}
            data-node-id="3064:1449"
          >
            Compute
          </p>
          <LegacyDiagram />
          <p
            className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium whitespace-nowrap text-[#6fe047] not-italic`}
            data-node-id="3064:1455"
          >
            Memory
          </p>
        </div>
      </div>
    </div>
  );
}

function ACubeStatCard() {
  return (
    <div
      className="absolute left-[960px] top-[310px] z-20 h-[547px] w-[380px] bg-[rgba(0,0,0,0.1)] border border-white/10"
      data-node-id="3064:1511"
      data-name="Frame 1984079539"
    >
      <CornerDecor />
      <div
        className="flex h-full w-full flex-col items-center justify-center gap-[32px] px-[20px] py-[20px]"
        data-node-id="3064:1512"
        data-name="Stat"
      >
        <div
          className="flex w-full flex-col items-end gap-[8px] border-b border-solid border-[rgba(255,255,255,0.1)] pb-[11px] text-right"
          data-node-id="3064:1514"
        >
          <p
            className={`${gilroyMedium.className} w-[279px] text-[32px] leading-[38px] font-medium text-white not-italic`}
            data-node-id="3064:1515"
          >
            A-Cube
          </p>
          <p
            className={`${interRegular.className} w-full text-[13px] leading-[normal] font-normal text-[#8e8e8e] not-italic [word-break:break-word]`}
            data-node-id="3064:1516"
          >
            We put the compute inside the memory. The commute disappears. Compute
            where the data lives.
          </p>
        </div>

        <div
          className="flex flex-col items-center gap-[16px]"
          data-node-id="3064:1517"
        >
          <div
            className={`${gilroyMedium.className} text-center text-[22px] leading-[28px] font-medium whitespace-nowrap text-[#6fe047] not-italic`}
            data-node-id="3064:1518"
          >
            <span className="block leading-[28px]">Compute</span>
            <span className="block leading-[28px]">+</span>
            <span className="block leading-[28px]">Memory</span>
          </div>
          <div
            className="h-[286px] w-[295px] shrink-0 overflow-hidden"
            data-node-id="3064:1519"
            data-name="image 203"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ACUBE_DIAGRAM}
              alt=""
              className="size-full max-w-none object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat95Overlay() {
  return (
    <div
      className="absolute left-[593px] top-[380px] z-30 flex h-[91px] w-[254px] flex-col items-center text-center"
      data-node-id="3059:1185"
      data-name="Frame 1984079538"
    >
      <p
        className={`${gilroySemiBold.className} w-full text-[40px] leading-[normal] font-semibold text-[#6fe047] not-italic`}
        data-node-id="3056:1151"
      >
        95%
      </p>
      <div
        className={`${interRegular.className} w-full whitespace-pre-wrap text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic`}
        data-node-id="3056:1150"
      >
        <span className="block leading-[21px]">
          {`of a neural net is matrix math. `}
        </span>
        <span className="block leading-[21px]">
          ~75% of the effort is moving it around.
        </span>
      </div>
    </div>
  );
}

export function TechnologyPageProblem() {
  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="3060:1222"
      data-name="Frame 1984079539"
      aria-label="The problem: AI is a memory problem"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden h-[950px] w-full max-w-[1440px] min-[1024px]:block">
        <CenterVisual />
        <SectionHeader />
        <LegacyStatCard />
        <ACubeStatCard />
        <Stat95Overlay />
      </div>

      {/* MOBILE (<1024px) — basic responsive version */}
      <div className="relative flex w-full flex-col items-center gap-[32px] px-[24px] py-[64px] min-[1024px]:hidden">
        <TagBadge
          label="The PROBLEM"
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
          <span className="block">AI isn&apos;t a math problem.</span>
          <span className="block">It&apos;s a memory problem.</span>
        </div>

        <p
          className={`${interRegular.className} max-w-[327px] text-center text-[15px] leading-[22px] font-normal text-[#f0f0f0] not-italic`}
          style={{ opacity: SUBTITLE_OPACITY }}
        >
          {SUBTITLE_TEXT}
        </p>

        <div
          className={`${gilroySemiBold.className} text-center text-[36px] leading-[normal] font-semibold text-[#6fe047] not-italic`}
        >
          95%
        </div>
        <p
          className={`${interRegular.className} -mt-[16px] max-w-[300px] text-center text-[13px] leading-[20px] font-normal text-[#f0f0f0] not-italic`}
        >
          of a neural net is matrix math. ~75% of the effort is moving it around.
        </p>

        {/* Legacy block */}
        <div className="flex w-full max-w-[380px] flex-col items-center gap-[16px] rounded-[2px] bg-[rgba(0,0,0,0.1)] border border-white/10 px-[20px] py-[24px]">
          <div className="flex w-full flex-col items-start gap-[6px] border-b border-solid border-[rgba(255,255,255,0.1)] pb-[11px]">
            <p className={`${gilroyMedium.className} text-[26px] leading-[32px] font-medium text-white not-italic`}>
              Legacy
            </p>
            <p className={`${interRegular.className} text-[13px] leading-[normal] font-normal text-[#8e8e8e] not-italic`}>
              Compute and memory sit apart. The chip spends its life shuttling
              numbers, not crunching them. ~75% of operations are just memory
              traffic.
            </p>
          </div>
          <p className={`${gilroyMedium.className} text-[20px] leading-[26px] font-medium text-[#6fe047] not-italic`}>
            Compute
          </p>
          <div className="h-[160px] w-[200px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LEGACY_COMPUTE} alt="" className="size-full object-cover" />
          </div>
          <p className={`${gilroyMedium.className} text-[20px] leading-[26px] font-medium text-[#6fe047] not-italic`}>
            Memory
          </p>
        </div>

        {/* A-Cube block */}
        <div className="flex w-full max-w-[380px] flex-col items-center gap-[16px] rounded-[2px] bg-[rgba(0,0,0,0.1)] border border-white/10 px-[20px] py-[24px]">
          <div className="flex w-full flex-col items-end gap-[6px] border-b border-solid border-[rgba(255,255,255,0.1)] pb-[11px] text-right">
            <p className={`${gilroyMedium.className} text-[26px] leading-[32px] font-medium text-white not-italic`}>
              A-Cube
            </p>
            <p className={`${interRegular.className} text-[13px] leading-[normal] font-normal text-[#8e8e8e] not-italic`}>
              We put the compute inside the memory. The commute disappears.
              Compute where the data lives.
            </p>
          </div>
          <p className={`${gilroyMedium.className} text-center text-[20px] leading-[26px] font-medium text-[#6fe047] not-italic`}>
            Compute + Memory
          </p>
          <div className="h-[180px] w-[220px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ACUBE_DIAGRAM} alt="" className="size-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
