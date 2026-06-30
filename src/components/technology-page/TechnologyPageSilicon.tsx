import { gilroyMedium, interRegular } from "../hero/fonts";
import { TagBadge } from "../hero/TagBadge";
import { GradientTitle, CornerDecor } from "../contact/contact-shared";

const SILICON_BG = "/technology/silicon-bg.png";
const CHIP_BG = "/technology/chip-bg.png";
const CHIP_OBJECT = "/technology/chip-object.png";
const INDICATOR_1 = "/technology/silicon-indicator-1.svg";
const INDICATOR_2 = "/technology/silicon-indicator-2.svg";
const STAT_CORNERS = "/technology/stat-corners.svg";
const LABEL_LINE = "/technology/graph-label-line.svg";

const TITLE_GRADIENT_DEG = "102.791deg";
const SUBTITLE_OPACITY = 0.65;
const SUBTITLE_TEXT =
  "Bridge the lab and real world. The Sparsh module offers continuous, microwatt intelligence in a 21×21mm size,";

const VIGNETTE =
  "radial-gradient(85.4% 50% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)";

const CARD_DESC =
  "Extend battery life and reduce energy costs in compute-intensive settings.";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

function StatCard({
  left,
  top,
  value,
  unit,
  unitClass,
  nodeId,
}: {
  left: number;
  top: number;
  value: string;
  unit: string;
  unitClass: string;
  nodeId: string;
}) {
  return (
    <div
      className="absolute w-[372px] h-[266px] overflow-clip"
      style={{ left, top }}
      data-node-id={nodeId}
      data-name="Lower power consumption"
    >
      <div className="absolute inset-0 border-[0.5px] border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(15,14,14,0.15)]" />
      {/* corner elements */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={STAT_CORNERS}
        alt=""
        aria-hidden
        className="absolute left-[-15.61px] top-[0.51px] block h-[264.994px] w-[387.605px] max-w-none"
      />

      {/* stat block */}
      <div className="absolute top-[30px] left-[30px] flex w-[299px] flex-col items-start gap-[12px]">
        <p
          className={`${gilroyMedium.className} whitespace-nowrap text-white not-italic`}
        >
          <span className="text-[68px] leading-[72px]">{value} </span>
          <span className={unitClass}>{unit}</span>
        </p>
        <p
          className={`${interRegular.className} text-[18px] leading-[27px] font-normal whitespace-nowrap text-[#f0f0f0] not-italic`}
        >
          LOWER POWER CONSUMPTION
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LABEL_LINE}
          alt=""
          aria-hidden
          className="block h-px w-[151.832px] max-w-none"
        />
      </div>

      {/* description */}
      <p
        className={`${interRegular.className} absolute top-[175.34px] left-[30px] w-[327.508px] text-[18px] leading-[27px] font-normal text-white not-italic [word-break:break-word]`}
        style={{ opacity: 0.9 }}
      >
        {CARD_DESC}
      </p>
    </div>
  );
}

export function TechnologyPageSilicon() {
  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="3018:489"
      data-name="Proven In Silicon"
      aria-label="Proven in silicon, shipping today"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden h-[901px] w-full max-w-[1440px] min-[1024px]:block">
        {/* 3016:485 — image 108 (background visual + vignette) */}
        <div
          className="pointer-events-none absolute top-[145.85px] left-0 z-0 h-[689.27px] w-[1444.4px] overflow-hidden"
          data-node-id="3016:485"
          data-name="image 108"
        >
          <div aria-hidden className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SILICON_BG}
              alt=""
              className="absolute inset-0 size-full max-w-none object-bottom"
            />
            <div
              className="absolute inset-0"
              style={{ backgroundImage: VIGNETTE }}
            />
            {/* Fade left/right edges into the black background on ultrawide screens */}
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 hidden w-[300px] bg-gradient-to-r from-black to-transparent min-[1441px]:block"
            />
            <div
              aria-hidden
              className="absolute inset-y-0 right-0 hidden w-[300px] bg-gradient-to-l from-black to-transparent min-[1441px]:block"
            />
          </div>
        </div>

        {/* 3015:484 — chip image */}
        <div
          className="absolute top-[247.35px] left-[525px] z-10 h-[537.28px] w-[417.67px]"
          data-node-id="3015:484"
          data-name="Chip Image"
        >
          {/* background */}
          <div className="absolute left-1/2 top-1/2 h-[536.9px] w-[417.67px] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CHIP_BG}
              alt=""
              className="absolute left-0 top-[5.31%] h-[89.37%] w-full max-w-none"
            />
          </div>
          {/* object overlay */}
          <div className="absolute top-[110.4px] left-[150px] h-[59.93px] w-[116.72px] rotate-[1.84deg] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CHIP_OBJECT}
              alt=""
              className="absolute left-[-44.69%] top-[-28.9%] h-[127.84%] w-[144.32%] max-w-none"
            />
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0px_3.858px_3.858px_0px_rgba(0,0,0,0.25)]" />
          </div>
        </div>

        {/* indicators */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={INDICATOR_1}
          alt=""
          aria-hidden
          className="absolute top-[430.7px] left-[476.54px] z-[15] block h-[14.14px] w-[76.61px] max-w-none"
          data-node-id="3015:487"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={INDICATOR_2}
          alt=""
          aria-hidden
          className="absolute top-[621.85px] left-[911.2px] z-[15] block h-[14.14px] w-[76.61px] max-w-none -scale-y-100 rotate-180"
          data-node-id="3015:598"
        />

        {/* stat cards */}
        <StatCard
          left={106}
          top={372.85}
          value="512"
          unit="GOPS"
          unitClass="text-[32px] leading-[38px]"
          nodeId="3015:538"
        />
        <StatCard
          left={978.47}
          top={474.85}
          value="~80"
          unit="uW"
          unitClass="text-[38px] leading-[47px]"
          nodeId="3015:578"
        />

        {/* 3015:519 — header */}
        <div
          className="absolute top-0 left-[calc(50%-2px)] z-30 flex w-[800px] -translate-x-1/2 flex-col items-center gap-[24px]"
          data-node-id="3015:519"
          data-name="Frame 1984079466"
        >
          <TagBadge
            label="Inside Sensemesh"
            width={168}
            labelOffsetX={0}
            rightBarLeft={158.15}
            centerLabel
            nodeId="3015:521"
          />

          <div
            className="relative flex flex-col items-center px-[10px]"
            data-node-id="3015:530"
            data-name="Title"
          >
            <GradientTitle gradientDeg={TITLE_GRADIENT_DEG} className="text-center">
              <span className="block h-[49px] leading-[49px] whitespace-nowrap">
                Proven in silicon,
              </span>
              <span className="block h-[49px] leading-[49px] whitespace-nowrap">
                shipping today.
              </span>
            </GradientTitle>
            <CornerDecor />
          </div>

          <p
            className={`${interRegular.className} w-[679.39px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
            style={{ opacity: SUBTITLE_OPACITY }}
            data-node-id="3015:536"
          >
            {SUBTITLE_TEXT}
          </p>
        </div>

        {/* description */}
        <p
          className={`${interRegular.className} absolute top-[778.63px] left-[calc(50%+11.84px)] z-30 w-[465.26px] -translate-x-1/2 text-center text-[16px] leading-[24px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
          style={{ opacity: 0.8 }}
          data-node-id="3015:604"
        >
          A new architecture for AI, energy-aware at every layer, scaling from
          coin cell to cloud.
        </p>

        {/* CTA */}
        <div
          className="absolute top-[852.63px] left-[calc(50%+11.84px)] z-30 -translate-x-1/2"
          data-node-id="3015:605"
        >
          <a
            href="#"
            className={`${gilroyMedium.className} ${GREEN_CTA_SHADOW} relative block h-[48px] w-[223px] shrink-0`}
            data-node-id="3015:606"
            data-name="Cta"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
            />
            <span className="absolute top-[calc(50%-14px)] left-1/2 -translate-x-1/2 text-[16px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic">
              Explore GPX10
            </span>
            <CornerDecor />
          </a>
        </div>
      </div>

      {/* MOBILE (<1024px) — basic responsive version */}
      <div className="flex w-full flex-col items-center gap-[28px] px-[24px] py-[56px] min-[1024px]:hidden">
        <TagBadge
          label="Inside Sensemesh"
          width={168}
          labelOffsetX={0}
          rightBarLeft={158.15}
          centerLabel
          nodeId="3015:521"
        />

        <div
          className={`${gilroyMedium.className} bg-clip-text text-center text-[32px] leading-[37px] font-medium text-transparent not-italic`}
          style={{
            backgroundImage: `linear-gradient(${TITLE_GRADIENT_DEG}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          <span className="block">Proven in silicon,</span>
          <span className="block">shipping today.</span>
        </div>

        <p
          className={`${interRegular.className} max-w-[327px] text-center text-[15px] leading-[22px] font-normal text-[#f0f0f0] not-italic`}
          style={{ opacity: SUBTITLE_OPACITY }}
        >
          {SUBTITLE_TEXT}
        </p>

        {/* chip image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CHIP_BG}
          alt=""
          className="h-auto w-full max-w-[327px] rounded-[8px] object-contain"
          aria-hidden
        />

        {/* stat cards */}
        <div className="flex w-full max-w-[327px] flex-col gap-[16px] rounded-[4px] border-[0.5px] border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(15,14,14,0.15)] p-[20px]">
          <p className={`${gilroyMedium.className} text-white not-italic`}>
            <span className="text-[44px] leading-[48px]">512 </span>
            <span className="text-[22px] leading-[26px]">GOPS</span>
          </p>
          <p className={`${interRegular.className} text-[14px] leading-[20px] font-normal text-[#f0f0f0] not-italic`}>
            LOWER POWER CONSUMPTION
          </p>
          <p className={`${interRegular.className} text-[14px] leading-[20px] font-normal text-white not-italic`} style={{ opacity: 0.9 }}>
            {CARD_DESC}
          </p>
        </div>

        <div className="flex w-full max-w-[327px] flex-col gap-[16px] rounded-[4px] border-[0.5px] border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(15,14,14,0.15)] p-[20px]">
          <p className={`${gilroyMedium.className} text-white not-italic`}>
            <span className="text-[44px] leading-[48px]">~80 </span>
            <span className="text-[24px] leading-[28px]">uW</span>
          </p>
          <p className={`${interRegular.className} text-[14px] leading-[20px] font-normal text-[#f0f0f0] not-italic`}>
            LOWER POWER CONSUMPTION
          </p>
          <p className={`${interRegular.className} text-[14px] leading-[20px] font-normal text-white not-italic`} style={{ opacity: 0.9 }}>
            {CARD_DESC}
          </p>
        </div>

        <p
          className={`${interRegular.className} max-w-[327px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic`}
          style={{ opacity: 0.8 }}
        >
          A new architecture for AI, energy-aware at every layer, scaling from
          coin cell to cloud.
        </p>

        <a
          href="#"
          className={`${gilroyMedium.className} ${GREEN_CTA_SHADOW} relative block h-[48px] w-full max-w-[327px]`}
        >
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
          <span className="absolute top-[calc(50%-14px)] left-1/2 -translate-x-1/2 text-[15px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic">
            Explore GPX10
          </span>
          <CornerDecor />
        </a>
      </div>
    </section>
  );
}
