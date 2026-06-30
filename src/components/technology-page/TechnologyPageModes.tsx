import { gilroySemiBold, interRegular, interSemiBold } from "../hero/fonts";
import { TagBadge } from "../hero/TagBadge";
import { GradientTitle, CornerDecor } from "../contact/contact-shared";

const MODES_TOP = "/technology/modes-top.png";
const MODES_BOTTOM = "/technology/modes-bottom.png";
const MODE_ICON = "/technology/mode-icon.svg";

const TITLE_GRADIENT_DEG = "106.506deg";
const SUBTITLE_OPACITY = 0.65;
const SUBTITLE_TEXT =
  "Bridge the lab and real world. The Sparsh module offers continuous, microwatt intelligence in a 21×21mm size,";

const ICON_BG =
  "radial-gradient(80% 100% at 50% 0%, #394a36 0%, #2b3629 50%, #1d221c 100%)";

function ModeIcon() {
  return (
    <div
      className="flex size-[27.65px] shrink-0 items-center justify-center rounded-[5.895px] p-[4px]"
      style={{ background: ICON_BG }}
      data-name="Icon"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={MODE_ICON}
        alt=""
        className="block size-[19.65px] max-w-none"
        aria-hidden
      />
    </div>
  );
}

type ModeCardProps = {
  nodeId: string;
  left: string;
  top: string;
  width: string;
  height: string;
  title: string;
  bullet: string;
  caption?: string;
  bulletLeft?: string;
  bulletTop?: string;
};

function ModeCard({
  nodeId,
  left,
  top,
  width,
  height,
  title,
  bullet,
  caption,
  bulletLeft = "12px",
  bulletTop = "49.65px",
}: ModeCardProps) {
  return (
    <div
      className={`absolute ${left} ${top} ${width} ${height} z-20 bg-[rgba(21,21,21,0.08)] backdrop-blur-sm border border-white/10`}
      data-node-id={nodeId}
      data-name="Content"
    >
      <CornerDecor />

      {/* top container — title + icon */}
      <div
        className="absolute top-[8px] left-[12px] right-[12.3px] flex h-[33.65px] items-center justify-between border-b border-solid border-[rgba(255,255,255,0.1)] pb-[6px]"
        data-name="Container"
      >
        <p
          className={`${gilroySemiBold.className} text-[16px] leading-[16px] font-semibold tracking-[0.6px] whitespace-nowrap text-[#6fe047] uppercase not-italic`}
        >
          {title}
        </p>
        <ModeIcon />
      </div>

      {/* bullet */}
      <div
        className="absolute"
        style={{ left: bulletLeft, top: bulletTop }}
        data-name="Frame 1984079529"
      >
        <p className="absolute top-[3.5px] left-0 text-[14px] tracking-[-0.1504px] whitespace-nowrap text-[#3a9719] not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
          +
        </p>
        <p
          className={`${interRegular.className} absolute top-0 left-[15.08px] w-[200.9px] text-[13px] leading-[normal] font-normal text-[rgba(255,255,255,0.9)] not-italic [word-break:break-word]`}
        >
          {bullet}
        </p>
      </div>

      {/* divider + bottom caption (side cards only) */}
      {caption ? (
        <>
          <div className="absolute top-[173.65px] left-[12px] right-[12.3px] h-px bg-[rgba(255,255,255,0.1)]" />
          <div
            className="absolute top-[188px] left-[12px] right-[12.3px] flex h-[33.65px] items-center justify-center border-t border-solid border-[rgba(255,255,255,0.1)] pt-[6px]"
            data-name="Container"
          >
            <p
              className={`${gilroySemiBold.className} text-[11px] leading-[16px] font-semibold tracking-[0.6px] whitespace-nowrap text-[#e2f9da] uppercase not-italic`}
            >
              {caption}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}

function ModeLabel({
  left,
  top,
  children,
  variant,
}: {
  left: string;
  top: string;
  children: React.ReactNode;
  variant: "title" | "descriptor";
}) {
  if (variant === "title") {
    return (
      <p
        className={`${interRegular.className} absolute ${left} ${top} z-30 text-[13px] leading-[normal] font-normal whitespace-nowrap text-[rgba(255,255,255,0.9)] uppercase not-italic`}
      >
        {children}
      </p>
    );
  }
  return (
    <p
      className={`${interSemiBold.className} absolute ${left} ${top} z-30 text-[10px] leading-[16px] font-semibold tracking-[0.6px] whitespace-nowrap text-[#6fe047] uppercase not-italic`}
    >
      {children}
    </p>
  );
}

export function TechnologyPageModes() {
  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="3003:497"
      data-name="Hero Section"
      aria-label="Two named modes, one continuous loop"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden h-[787px] w-full max-w-[1440px] min-[1024px]:block">
        {/* 3004:1231 — image 194 (top center visual) */}
        <div
          className="pointer-events-none absolute top-[315.32px] left-[320px] z-0 h-[219.17px] w-[823.35px] overflow-hidden"
          data-node-id="3004:1231"
          data-name="image 194"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={MODES_TOP}
            alt=""
            className="absolute top-[-38.49%] left-[-8.37%] h-[217.12%] w-[116.37%] max-w-none"
            aria-hidden
          />
        </div>

        {/* 3003:494 — image 192 (bottom wide visual) */}
        <div
          className="pointer-events-none absolute top-[568px] left-[150.2px] z-0 h-[228.06px] w-[1162.96px] overflow-hidden"
          data-node-id="3003:494"
          data-name="image 192"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={MODES_BOTTOM}
            alt=""
            className="absolute top-[-184.09%] left-0 h-[284.09%] w-full max-w-none"
            aria-hidden
          />
        </div>

        {/* 3003:540 — header */}
        <div
          className="absolute top-[41px] left-[320px] z-10 flex w-[800px] flex-col items-center gap-[24px]"
          data-node-id="3003:540"
          data-name="Frame 1984079432"
        >
          <TagBadge
            label="Inside Sensemesh"
            width={168}
            labelOffsetX={0}
            rightBarLeft={158.15}
            centerLabel
            nodeId="3003:542"
          />

          <div
            className="relative flex flex-col items-center px-[10px]"
            data-node-id="3003:551"
            data-name="Title"
          >
            <GradientTitle gradientDeg={TITLE_GRADIENT_DEG} className="text-center">
              <span className="block h-[49px] leading-[49px] whitespace-nowrap">
                Two named modes.
              </span>
              <span className="block h-[49px] leading-[49px] whitespace-nowrap">
                One continuous loop.
              </span>
            </GradientTitle>
            <CornerDecor />
          </div>

          <p
            className={`${interRegular.className} w-[679.39px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
            style={{ opacity: SUBTITLE_OPACITY }}
            data-node-id="3003:557"
          >
            {SUBTITLE_TEXT}
          </p>
        </div>

        {/* content cards */}
        <ModeCard
          nodeId="3004:1232"
          left="left-[78px]"
          top="top-[333px]"
          width="w-[254px]"
          height="h-[235px]"
          title="Subconscious AI"
          bullet="Legacy chips switch off. A-Cube sleeps like you: the brain stays aware. Our island runs AI at microwatts while the ARM core is powered down. Always processing, never draining."
          caption="Always processing, never draining."
        />
        <ModeCard
          nodeId="3008:483"
          left="left-[1127px]"
          top="top-[333px]"
          width="w-[254px]"
          height="h-[235px]"
          title="Turboboost mode"
          bullet="When something matters, the brain wakes instantly. The moment SenseMesh flags a real event, runtime DVFS ramps the chip from subconscious idle to full performance"
          caption="live, no reset — settles back down."
        />
        <ModeCard
          nodeId="3004:1898"
          left="left-[614px]"
          top="top-[623px]"
          width="w-[236px]"
          height="h-[116px]"
          title="SETTLES"
          bullet="Once the task is completed, the chip settles back into subconscious mode."
          bulletLeft="10px"
          bulletTop="49.48px"
        />

        {/* mode labels */}
        <ModeLabel left="left-[434.57px]" top="top-[519.48px]" variant="title">
          SUBCONSCIOUS MODE
        </ModeLabel>
        <ModeLabel left="left-[419.57px]" top="top-[542.48px]" variant="descriptor">
          Always on. Ultra low power
        </ModeLabel>
        <ModeLabel left="left-[876.5px]" top="top-[515.33px]" variant="title">
          Turboboost mode
        </ModeLabel>
        <ModeLabel left="left-[848px]" top="top-[538.33px]" variant="descriptor">
          on-demand. high performance
        </ModeLabel>
      </div>

      {/* MOBILE (<1024px) — basic responsive version */}
      <div className="flex w-full flex-col items-center gap-[28px] px-[24px] py-[56px] min-[1024px]:hidden">
        <TagBadge
          label="Inside Sensemesh"
          width={168}
          labelOffsetX={0}
          rightBarLeft={158.15}
          centerLabel
          nodeId="3003:542"
        />

        <div
          className={`${gilroySemiBold.className} bg-clip-text text-center text-[32px] leading-[37px] font-semibold text-transparent not-italic`}
          style={{
            backgroundImage: `linear-gradient(${TITLE_GRADIENT_DEG}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          <span className="block">Two named modes.</span>
          <span className="block">One continuous loop.</span>
        </div>

        <p
          className={`${interRegular.className} max-w-[327px] text-center text-[15px] leading-[22px] font-normal text-[#f0f0f0] not-italic`}
          style={{ opacity: SUBTITLE_OPACITY }}
        >
          {SUBTITLE_TEXT}
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={MODES_TOP}
          alt=""
          className="h-auto w-full max-w-[327px] rounded-[4px] object-cover"
          aria-hidden
        />

        <div className="flex w-full max-w-[327px] flex-col gap-[14px] rounded-[4px] bg-[rgba(21,21,21,0.08)] backdrop-blur-sm border border-white/10 p-[16px]">
          <div className="flex items-center justify-between border-b border-solid border-[rgba(255,255,255,0.1)] pb-[8px]">
            <span className={`${gilroySemiBold.className} text-[14px] font-semibold tracking-[0.6px] text-[#6fe047] uppercase not-italic`}>
              Subconscious AI
            </span>
            <ModeIcon />
          </div>
          <p className={`${interRegular.className} text-[13px] leading-[normal] font-normal text-[rgba(255,255,255,0.9)] not-italic`}>
            <span className="text-[#3a9719]">+ </span>
            Legacy chips switch off. A-Cube sleeps like you: the brain stays aware. Our island runs AI at microwatts while the ARM core is powered down.
          </p>
          <p className={`${interSemiBold.className} border-t border-solid border-[rgba(255,255,255,0.1)] pt-[8px] text-center text-[10px] font-semibold tracking-[0.6px] text-[#e2f9da] uppercase not-italic`}>
            Always processing, never draining.
          </p>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={MODES_BOTTOM}
          alt=""
          className="h-auto w-full max-w-[327px] rounded-[4px] object-cover"
          aria-hidden
        />

        <div className="flex w-full max-w-[327px] flex-col gap-[14px] rounded-[4px] bg-[rgba(21,21,21,0.08)] backdrop-blur-sm border border-white/10 p-[16px]">
          <div className="flex items-center justify-between border-b border-solid border-[rgba(255,255,255,0.1)] pb-[8px]">
            <span className={`${gilroySemiBold.className} text-[14px] font-semibold tracking-[0.6px] text-[#6fe047] uppercase not-italic`}>
              Turboboost mode
            </span>
            <ModeIcon />
          </div>
          <p className={`${interRegular.className} text-[13px] leading-[normal] font-normal text-[rgba(255,255,255,0.9)] not-italic`}>
            <span className="text-[#3a9719]">+ </span>
            When something matters, the brain wakes instantly. SenseMesh flags real events and ramps the chip to full performance, then settles back down.
          </p>
          <p className={`${interSemiBold.className} border-t border-solid border-[rgba(255,255,255,0.1)] pt-[8px] text-center text-[10px] font-semibold tracking-[0.6px] text-[#e2f9da] uppercase not-italic`}>
            live, no reset — settles back down.
          </p>
        </div>
      </div>
    </section>
  );
}
