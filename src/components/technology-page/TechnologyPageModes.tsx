"use client";

import { mediaUrl } from "@/lib/strapi";
import { useFadeIn, getFadeInClass } from "../shared/useFadeIn";
import { gilroySemiBold, interRegular, interSemiBold } from "../hero/fonts";
import { TagBadge } from "../hero/TagBadge";
import { GradientTitle, CornerDecor } from "../contact/contact-shared";

const MODES_TOP = "/technology/modes-top-new.png";
const MODES_BOTTOM = "/technology/modes-bottom-new.png";
const MODES_CUBE = "/technology/modes-cube.png";
const MODES_CUBE_GLOW = "/technology/modes-cube-glow.png";
const MODE_ICON = "/technology/mode-icon.svg";
const MODES_BADGE_LEFT = "/technology/modes-badge-left.png";
const MODES_BADGE_RIGHT = "/technology/modes-badge-right.png";
const MODES_CHEV_LEFT = [
  "/technology/modes-chev-left1.png",
  "/technology/modes-chev-left2.png",
  "/technology/modes-chev-left3.png",
];
const MODES_CHEV_RIGHT = [
  "/technology/modes-chev-right1.png",
  "/technology/modes-chev-right2.png",
  "/technology/modes-chev-right3.png",
];

const TITLE_GRADIENT_DEG = "106.506deg";
const SUBTITLE_OPACITY = 0.65;
const FALLBACK_TAG = "Inside Sensemesh";
const FALLBACK_HEADING = "Two named modes.\nOne continuous loop.";
const FALLBACK_SUBTITLE =
  "Bridge the lab and real world. The Sparsh module offers continuous, microwatt intelligence in a 21\u00d721mm size,";

const ICON_BG =
  "radial-gradient(80% 100% at 50% 0%, #394a36 0%, #2b3629 50%, #1d221c 100%)";

type ModeCardConfig = {
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

const MODE_CARD_CONFIG: ModeCardConfig[] = [
  {
    nodeId: "3004:1232",
    left: "left-[78px]",
    top: "top-[333px]",
    width: "w-[254px]",
    height: "h-[235px]",
    title: "Subconscious AI",
    bullet:
      "Legacy chips switch off. A-Cube sleeps like you: the brain stays aware. Our island runs AI at microwatts while the ARM core is powered down. Always processing, never draining.",
    caption: "Always processing, never draining.",
  },
  {
    nodeId: "3008:483",
    left: "left-[1127px]",
    top: "top-[333px]",
    width: "w-[254px]",
    height: "h-[235px]",
    title: "Turboboost mode",
    bullet:
      "When something matters, the brain wakes instantly. The moment SenseMesh flags a real event, runtime DVFS ramps the chip from subconscious idle to full performance",
    caption: "live, no reset \u2014 settles back down.",
  },
  {
    nodeId: "3004:1898",
    left: "left-[614px]",
    top: "top-[623px]",
    width: "w-[236px]",
    height: "h-[83px]",
    title: "",
    bullet:
      "Once the task is completed, the chip settles back into subconscious mode.",
    bulletLeft: "10px",
    bulletTop: "18px",
  },
];

type ModeLabelConfig = {
  left: string;
  top: string;
  variant: "title" | "descriptor";
  label: string;
};

const MODE_LABEL_CONFIG: ModeLabelConfig[] = [
  { left: "left-[434.57px]", top: "top-[519.48px]", variant: "title", label: "SUBCONSCIOUS MODE" },
  { left: "left-[419.57px]", top: "top-[542.48px]", variant: "descriptor", label: "Always on. Ultra low power" },
  { left: "left-[876.5px]", top: "top-[515.33px]", variant: "title", label: "Turboboost mode" },
  { left: "left-[848px]", top: "top-[538.33px]", variant: "descriptor", label: "on-demand. high performance" },
];

/**
 * Animated chevron flow overlays for the bottom loop visual.
 * The chevron badges are baked into modes-bottom.png; these overlays sit on
 * top of them (badge base with the chevrons stripped + transparent chevron
 * layers) and pulse in the direction each badge points:
 * left badge ">>>" flows left-to-right, right badge "<<<" right-to-left.
 * Positions are mapped 1:1 from the source image pixels to page coordinates
 * (container at left 150.2 / top 568, scale x 0.757, y 0.8436, offsetY 419.79).
 */
function ChevronBadge({
  badgeSrc,
  badgeLeft,
  chevrons,
  delays,
}: {
  badgeSrc: string;
  badgeLeft: number;
  chevrons: { src: string; left: number; width: number }[];
  delays: number[];
}) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={badgeSrc}
        alt=""
        className="absolute top-[636.76px] h-[47.24px] w-[85.54px] max-w-none"
        style={{ left: badgeLeft }}
        aria-hidden
      />
      {chevrons.map((c, i) => (
        <div
          key={c.src}
          className="animate-technology-chevron-flow absolute top-[641.82px] h-[37.12px]"
          style={{ left: c.left, width: c.width, animationDelay: `${delays[i]}s` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.src} alt="" className="block size-full max-w-none" aria-hidden />
        </div>
      ))}
    </>
  );
}

function ModesChevronFlow() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
      <ChevronBadge
        badgeSrc={MODES_BADGE_LEFT}
        badgeLeft={490.85}
        chevrons={[
          { src: MODES_CHEV_LEFT[0], left: 506.75, width: 21.95 },
          { src: MODES_CHEV_LEFT[1], left: 523.4, width: 21.95 },
          { src: MODES_CHEV_LEFT[2], left: 539.3, width: 22.71 },
        ]}
        delays={[-0.5, -0.25, 0]}
      />
      <ChevronBadge
        badgeSrc={MODES_BADGE_RIGHT}
        badgeLeft={886.77}
        chevrons={[
          { src: MODES_CHEV_RIGHT[0], left: 900.39, width: 21.95 },
          { src: MODES_CHEV_RIGHT[1], left: 916.29, width: 21.95 },
          { src: MODES_CHEV_RIGHT[2], left: 932.94, width: 21.95 },
        ]}
        delays={[0, -0.25, -0.5]}
      />
    </div>
  );
}

function ModeIcon() {  return (
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
  const { fadeRef, isVisible } = useFadeIn();

  return (
    <div
      ref={fadeRef}
      className={`absolute ${left} ${top} ${width} ${height} z-20 bg-[rgba(21,21,21,0.08)] backdrop-blur-sm border border-white/10 ${getFadeInClass(isVisible)}`}
      data-node-id={nodeId}
      data-name="Content"
    >
      <CornerDecor />

      {/* top container — title + icon */}
      {title ? (
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
      ) : null}

      {/* bullet */}
      <div
        className="absolute"
        style={{ left: bulletLeft, top: bulletTop, transform: bulletTop === "50%" ? "translateY(-50%)" : "none" }}
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

export function TechnologyPageModes({ data }: { data?: any } = {}) {
  const tagText = data?.tag?.text || FALLBACK_TAG;
  const heading = data?.heading || FALLBACK_HEADING;
  const headingLines = heading.split("\n");
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const topImg = MODES_TOP;
  const bottomImg = MODES_BOTTOM;

  const strapiCards = Array.isArray(data?.mode_cards) ? data.mode_cards : [];
  const renderCards: ModeCardConfig[] = MODE_CARD_CONFIG.map((cfg, i) => {
    const mc = strapiCards[i];
    return {
      ...cfg,
      title: i === 2 ? "" : ((mc?.title as string) || cfg.title),
      bullet: (mc?.bullets as string) || cfg.bullet,
      caption: i === 2 ? "" : ((mc?.caption as string) || cfg.caption),
    };
  });

  const strapiLabels = Array.isArray(data?.mode_labels) ? data.mode_labels : [];
  const renderLabels: ModeLabelConfig[] = MODE_LABEL_CONFIG.map((cfg, i) => {
    const pairIndex = Math.floor(i / 2);
    const isTitle = i % 2 === 0;
    const ml = strapiLabels[pairIndex];
    const text = isTitle
      ? (ml?.label as string) || cfg.label
      : (ml?.sublabel as string) || cfg.label;
    return { ...cfg, label: text };
  });

  const sideCard0 = renderCards[0];
  const sideCard1 = renderCards[1];

  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="3003:497"
      data-name="Hero Section"
      aria-label="Two named modes, one continuous loop"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden h-[787px] w-full max-w-[1440px] min-[1024px]:block">
        {/* Top wavy lines (image 196 in Figma) */}
        <div
          className="-translate-x-1/2 absolute h-[114.649px] left-[calc(50%+9.1px)] top-[313px] w-[838.264px] pointer-events-none z-0"
          data-name="image 196"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="absolute h-[277.89%] left-[0.16%] max-w-none top-[-95.79%] w-[99.82%]" src={topImg} />
          </div>
        </div>

        {/* The new 3D Cube */}
        <div className="-translate-x-1/2 absolute h-[304.921px] left-[calc(50%+10px)] overflow-clip top-[350.73px] w-[317.216px] z-10" data-name="Cube">
          <div className="absolute h-[299.208px] left-0 top-[10.85px] w-[322.463px]" data-name="Object">
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="absolute max-w-none object-cover size-full" src={MODES_CUBE} />
              <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(180.162deg, rgba(0, 0, 0, 0) 59.958%, rgb(0, 0, 0) 88.127%)" }} />
            </div>
          </div>
          <div className="absolute flex h-[61.525px] items-center justify-center left-[147.28px] top-[44.96px] w-[87.575px]">
            <div className="flex-none rotate-[-13.44deg]">
              <div className="h-[44.265px] relative w-[79.462px]" data-name="Rectangle">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="absolute h-[316.18%] left-[-22.33%] max-w-none top-[-109.44%] w-[146.26%]" src={MODES_CUBE_GLOW} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3003:494 — image 192 (bottom wide visual) */}
        <div
          className="pointer-events-none absolute h-[228.063px] left-[150.2px] top-[558px] w-[1162.959px] z-0"
          data-node-id="3003:494"
          data-name="image 192"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bottomImg}
              alt=""
              className="absolute h-[284.09%] left-0 max-w-none top-[-184.09%] w-full"
              aria-hidden
            />
          </div>
        </div>

        {/* flowing chevron overlays for the loop badges */}
        <ModesChevronFlow />

        {/* 3003:540 — header */}
        <div
          className="absolute top-[41px] left-[320px] z-10 flex w-[800px] flex-col items-center gap-[24px]"
          data-node-id="3003:540"
          data-name="Frame 1984079432"
        >
          <TagBadge
            label={tagText}
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
            data-node-id="3003:557"
          >
            {subtitle}
          </p>
        </div>

        {/* content cards */}
        {renderCards.map((c) => (
          <ModeCard
            key={c.nodeId}
            nodeId={c.nodeId}
            left={c.left}
            top={c.top}
            width={c.width}
            height={c.height}
            title={c.title}
            bullet={c.bullet}
            caption={c.caption}
            bulletLeft={c.bulletLeft}
            bulletTop={c.bulletTop}
          />
        ))}

        {/* mode labels */}
        {renderLabels.map((l, i) => (
          <ModeLabel
            key={i}
            left={l.left}
            top={l.top}
            variant={l.variant}
          >
            {l.label}
          </ModeLabel>
        ))}
      </div>

      {/* MOBILE (<1024px) — basic responsive version */}
      <div className="flex w-full flex-col items-center gap-[28px] px-[24px] py-[56px] min-[1024px]:hidden">
        <TagBadge
          label={tagText}
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
          <span className="block">{headingLines[0] ?? ""}</span>
          <span className="block">{headingLines[1] ?? ""}</span>
        </div>

        <p
          className={`${interRegular.className} max-w-[327px] text-center text-[15px] leading-[22px] font-normal text-[#f0f0f0] not-italic`}
          style={{ opacity: SUBTITLE_OPACITY }}
        >
          {subtitle}
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={topImg}
          alt=""
          className="h-auto w-full max-w-[327px] rounded-[4px] object-cover"
          aria-hidden
        />

        {/* Mobile 3D Cube (Added for mobile view) */}
        <div className="relative h-[240px] w-full max-w-[327px] overflow-hidden flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="absolute max-w-[80%] object-contain" src={MODES_CUBE} />
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(180.162deg, rgba(0, 0, 0, 0) 59.958%, rgb(0, 0, 0) 88.127%)" }} />
        </div>

        <ModeCardMobile
          title={sideCard0?.title ?? "Subconscious AI"}
          bullet={
            sideCard0?.bullet ??
            "Legacy chips switch off. A-Cube sleeps like you: the brain stays aware. Our island runs AI at microwatts while the ARM core is powered down."
          }
          caption={sideCard0?.caption ?? "Always processing, never draining."}
        />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bottomImg}
          alt=""
          className="h-auto w-full max-w-[327px] rounded-[4px] object-cover"
          aria-hidden
        />

        <ModeCardMobile
          title={sideCard1?.title ?? "Turboboost mode"}
          bullet={
            sideCard1?.bullet ??
            "When something matters, the brain wakes instantly. SenseMesh flags real events and ramps the chip to full performance, then settles back down."
          }
          caption={sideCard1?.caption ?? "live, no reset \u2014 settles back down."}
        />
      </div>
    </section>
  );
}

function ModeCardMobile({ title, bullet, caption }: { title: string; bullet: string; caption: string }) {
  const { fadeRef, isVisible } = useFadeIn();

  return (
    <div
      ref={fadeRef}
      className={`flex w-full max-w-[327px] flex-col gap-[14px] rounded-[4px] bg-[rgba(21,21,21,0.08)] backdrop-blur-sm border border-white/10 p-[16px] ${getFadeInClass(isVisible)}`}
    >
      <div className="flex items-center justify-between border-b border-solid border-[rgba(255,255,255,0.1)] pb-[8px]">
        <span className={`${gilroySemiBold.className} text-[14px] font-semibold tracking-[0.6px] text-[#6fe047] uppercase not-italic`}>
          {title}
        </span>
        <ModeIcon />
      </div>
      <p className={`${interRegular.className} text-[13px] leading-[normal] font-normal text-[rgba(255,255,255,0.9)] not-italic`}>
        <span className="text-[#3a9719]">+ </span>
        {bullet}
      </p>
      <p className={`${interSemiBold.className} border-t border-solid border-[rgba(255,255,255,0.1)] pt-[8px] text-center text-[10px] font-semibold tracking-[0.6px] text-[#e2f9da] uppercase not-italic`}>
        {caption}
      </p>
    </div>
  );
}
