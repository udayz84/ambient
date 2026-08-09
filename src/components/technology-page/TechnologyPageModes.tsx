"use client";

import { mediaUrl } from "@/lib/strapi";
import { useFadeIn, getFadeInClass } from "../shared/useFadeIn";
import { gilroyMedium, gilroySemiBold, interRegular, interSemiBold } from "../hero/fonts";
import { TagBadge } from "../hero/TagBadge";
import { GradientTitle, CornerDecor } from "../contact/contact-shared";
import { MobileCornerMark, MobileTitleCorners } from "./mobile-shared";

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

const MODES_LOOP_MOBILE = "/technology/modes-loop-mobile.png";
const MOBILE_TITLE_GRADIENT_DEG = "101.838deg";

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
  flip = false,
}: {
  badgeSrc: string;
  badgeLeft: number;
  chevrons: { src: string; left: number; width: number }[];
  delays: number[];
  flip?: boolean;
}) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={badgeSrc}
        alt=""
        className={`absolute top-[636.76px] h-[47.24px] w-[85.54px] max-w-none ${flip ? "scale-x-[-1]" : ""}`}
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
          <img src={c.src} alt="" className={`block size-full max-w-none ${flip ? "scale-x-[-1]" : ""}`} aria-hidden />
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
        delays={[0.8, 0.4, 0]} // Reverse flow <-
        flip={true}
      />
      <ChevronBadge
        badgeSrc={MODES_BADGE_RIGHT}
        badgeLeft={886.77}
        chevrons={[
          { src: MODES_CHEV_RIGHT[0], left: 900.39, width: 21.95 },
          { src: MODES_CHEV_RIGHT[1], left: 916.29, width: 21.95 },
          { src: MODES_CHEV_RIGHT[2], left: 932.94, width: 21.95 },
        ]}
        delays={[0.8, 0.4, 0]} // Reverse flow <-
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

function MobileModeCard({
  title,
  bullet,
  caption,
  topClassName,
  bgClassName,
  nodeId,
}: {
  title: string;
  bullet: string;
  caption: string;
  topClassName: string;
  bgClassName: string;
  nodeId: string;
}) {
  return (
    <div
      className={`absolute right-[119px] h-[235px] w-[254px] ${topClassName} ${bgClassName} backdrop-blur-md`}
      data-node-id={nodeId}
      data-name="Content"
    >
      <CornerDecor />
      <div
        className="absolute top-[8px] left-[12px] right-[12.3px] flex h-[33.649px] items-center justify-between border-b border-solid border-[rgba(255,255,255,0.1)] pb-[6px]"
        data-name="Container"
      >
        <p
          className={`${gilroySemiBold.className} text-[16px] leading-[16px] font-semibold tracking-[0.6px] whitespace-nowrap text-[#6fe047] uppercase not-italic [word-break:break-word]`}
        >
          {title}
        </p>
        <ModeIcon />
      </div>
      <div
        className="absolute top-[49.65px] left-[12px] h-[17px] w-[124.078px]"
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
      <div className="absolute top-[173.65px] left-[12px] right-[12.3px] h-px bg-[rgba(255,255,255,0.1)]" />
      <div
        className="absolute top-[188px] left-[12px] right-[12.3px] flex h-[33.649px] items-center justify-center border-t border-solid border-[rgba(255,255,255,0.1)] pt-[6px]"
        data-name="Container"
      >
        <p
          className={`${gilroySemiBold.className} text-[11px] leading-[16px] font-semibold tracking-[0.6px] whitespace-nowrap text-[#e2f9da] uppercase not-italic [word-break:break-word]`}
        >
          {caption}
        </p>
      </div>
    </div>
  );
}

/** 3572:8217 — loop scene: wavy lines, cube, mode labels, cards (393×1162). */
function MobileModesScene({
  cards,
  labels,
}: {
  cards: ModeCardConfig[];
  labels: ModeLabelConfig[];
}) {
  const [card1, card2, card3] = cards;
  return (
    <div
      className="absolute top-[233px] left-[0.5px] h-[1162px] w-[393px] overflow-clip"
      data-node-id="3572:8217"
    >
      {/* 3572:8218 — right vertical loop line */}
      <div
        className="absolute top-[-1px] left-[244px] flex h-[1163px] w-[154px] items-center justify-center"
        data-node-id="3572:8218"
      >
        <div className="-rotate-90 flex-none">
          <div className="relative h-[154px] w-[1163px]" data-name="image 192">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={MODES_BOTTOM}
                alt=""
                className="absolute left-0 top-[-272.63%] h-[420.72%] w-full max-w-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3572:8219 — right-edge badge */}
      <div
        className="absolute top-[730.8px] left-[355px] flex h-[99.49px] w-[97.969px] items-center justify-center"
        data-node-id="3572:8219"
      >
        <div className="-scale-y-100 flex-none rotate-90">
          <div className="relative h-[97.969px] w-[99.49px]" data-name="image 195">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={MODES_BOTTOM}
                alt=""
                className="absolute top-[-488.78%] left-[-333.58%] h-[661.34%] w-[1168.92%] max-w-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3572:8220 — center wavy line */}
      <div
        className="absolute top-[263px] left-[calc(50%-0.5px)] flex h-[744px] w-[102px] -translate-x-1/2 items-center justify-center"
        data-node-id="3572:8220"
      >
        <div className="flex-none rotate-90">
          <div className="relative h-[102px] w-[744px]" data-name="image 196">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={MODES_LOOP_MOBILE}
                alt=""
                className="absolute top-[-95.79%] left-[0.16%] h-[277.89%] w-[99.82%] max-w-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3572:8221 — cube */}
      <div
        className="absolute top-[462px] left-1/2 h-[350px] w-[317px] -translate-x-1/2 overflow-clip"
        data-node-id="3572:8221"
        data-name="Cube"
      >
        <div
          className="absolute top-[56px] left-[calc(50%+0.5px)] h-[274px] w-[260px] -translate-x-1/2"
          data-node-id="3572:8222"
          data-name="Object"
        >
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={MODES_CUBE}
                alt=""
                className="absolute top-[-5.59%] left-[-8.08%] h-[111.18%] w-[113.85%] max-w-none"
              />
            </div>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(180.184deg, rgba(0, 0, 0, 0) 59.958%, rgb(0, 0, 0) 88.127%)",
              }}
            />
          </div>
        </div>
        <div
          className="absolute top-[89.77px] left-[147.28px] flex h-[61.525px] w-[87.575px] items-center justify-center"
          data-node-id="3572:8223"
        >
          <div className="flex-none rotate-[-13.44deg]">
            <div className="relative h-[44.265px] w-[79.462px]" data-name="Rectangle">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={MODES_CUBE_GLOW}
                  alt=""
                  className="absolute top-[-109.44%] left-[-22.33%] h-[316.18%] w-[146.26%] max-w-none"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute top-[4px] left-[calc(50%+0.5px)] h-[40px] w-[210px] -translate-x-1/2 bg-black"
          data-node-id="3572:8224"
        />
        {/* turboboost labels */}
        <p
          className={`${interRegular.className} absolute top-[283px] left-[93px] text-[13px] leading-[normal] font-normal whitespace-nowrap text-[rgba(255,255,255,0.9)] uppercase not-italic`}
          data-node-id="3572:8227"
        >
          {labels[2]?.label}
        </p>
        <p
          className={`${interSemiBold.className} absolute top-[306px] left-[64px] text-[10px] leading-[16px] font-semibold tracking-[0.6px] whitespace-nowrap text-[#6fe047] uppercase not-italic`}
          data-node-id="3572:8226"
        >
          {labels[3]?.label}
        </p>
        {/* subconscious labels */}
        <p
          className={`${interRegular.className} absolute top-[4px] left-[158.5px] -translate-x-1/2 text-[13px] leading-[normal] font-normal whitespace-nowrap text-[rgba(255,255,255,0.9)] uppercase not-italic`}
          data-node-id="3572:8230"
        >
          {labels[0]?.label}
        </p>
        <p
          className={`${interSemiBold.className} absolute top-[27px] left-[158.5px] -translate-x-1/2 text-[10px] leading-[16px] font-semibold tracking-[0.6px] whitespace-nowrap text-[#6fe047] uppercase not-italic`}
          data-node-id="3572:8229"
        >
          {labels[1]?.label}
        </p>
      </div>

      {/* cards */}
      {card1 ? (
        <MobileModeCard
          title={card1.title}
          bullet={card1.bullet}
          caption={card1.caption ?? ""}
          topClassName="top-[53px]"
          bgClassName="bg-[rgba(21,21,21,0.59)]"
          nodeId="3572:8231"
        />
      ) : null}
      {card2 ? (
        <MobileModeCard
          title={card2.title}
          bullet={card2.bullet}
          caption={card2.caption ?? ""}
          topClassName="top-[872px]"
          bgClassName="bg-[rgba(21,21,21,0.08)]"
          nodeId="3572:8250"
        />
      ) : null}

      {/* 3572:8269 — middle note card */}
      {card3 ? (
        <div
          className="absolute top-[340px] right-[26px] h-[83px] w-[236px] bg-[rgba(21,21,21,0.08)]"
          data-node-id="3572:8269"
          data-name="Content"
        >
          <div
            className="absolute top-[calc(50%+1px)] left-[10px] h-[48px] w-[215.979px] -translate-y-1/2"
            data-name="Frame 1984079529"
          >
            <p className="absolute top-[3.5px] left-0 text-[14px] leading-[normal] tracking-[-0.1504px] whitespace-nowrap text-[#3a9719] not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
              +
            </p>
            <p
              className={`${interRegular.className} absolute top-0 left-[15.08px] w-[200.9px] text-[13px] leading-[normal] font-normal whitespace-pre-wrap text-[rgba(255,255,255,0.9)] not-italic [word-break:break-word]`}
            >
              {card3.bullet}
            </p>
          </div>
          <MobileCornerMark
            src="/hero/corner-tag-2.svg"
            sizeClassName="size-[4px]"
            insetClassName="inset-[0_0_-12.5%_-12.5%]"
            positionClassName="top-[3px] right-[16px]"
            flipClassName="rotate-180"
          />
          <MobileCornerMark
            src="/hero/corner-tag-2.svg"
            sizeClassName="size-[4px]"
            insetClassName="inset-[0_0_-12.5%_-12.5%]"
            positionClassName="right-[16px] bottom-[-3px]"
            flipClassName="-scale-y-100 rotate-180"
          />
        </div>
      ) : null}
    </div>
  );
}

export function TechnologyPageModes({ data }: { data?: any } = {}) {
  const tagText = data?.tag?.text || FALLBACK_TAG;
  const heading = data?.heading || FALLBACK_HEADING;
  const headingLines = heading.split("\n");
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const topImg = MODES_TOP;
  const bottomImg = MODES_BOTTOM;

  // Mobile title reflows the first desktop line's last word onto the second
  // block ("Two named" / "modes. One continuous loop.") per Figma 3572:8007.
  const mobileHeadingLines = (() => {
    const [l1 = "", l2 = ""] = headingLines;
    const words = l1.trim().split(" ");
    if (words.length < 2) return [l1, l2];
    return [words.slice(0, -1).join(" "), [words[words.length - 1], l2].filter(Boolean).join(" ")];
  })();

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
                {heading.split(". ")[0]}{heading.includes(". ") ? "." : ""}
              </span>
              <span className="block h-[49px] leading-[49px] whitespace-nowrap">
                {heading.split(". ")[1] || ""}
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

      {/* MOBILE (<1024px) — pixel-perfect from Figma node 3572:7989 (4th Fold, 393x1366) */}
      <div className="relative w-full overflow-hidden min-[1024px]:hidden">
        <div className="relative mx-auto h-[1366px] w-full max-w-[393px]">
          {/* 3572:7996 — header */}
          <div
            className="absolute top-[39px] left-[20px] flex w-[354px] flex-col items-center justify-center gap-[10px]"
            data-node-id="3572:7996"
          >
            <TagBadge
              label={tagText}
              width={146}
              height={27}
              labelOffsetX={55.5}
              leftBarLeft={6.7}
              rightBarLeft={136.16}
              labelClassName="text-[12px] leading-[20.149px] tracking-[-0.36px]"
              nodeId="3572:7998"
            />
            <div className="relative h-[117px] w-[356px]" data-node-id="3572:8006">
              <div
                className={`${gilroyMedium.className} absolute top-[7px] left-[3px] w-[350px] bg-clip-text text-center text-[36px] leading-[36px] font-medium whitespace-pre-wrap text-transparent not-italic [word-break:break-word]`}
                style={{
                  backgroundImage: `linear-gradient(${MOBILE_TITLE_GRADIENT_DEG}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
                data-node-id="3572:8007"
              >
                <span className="block">{mobileHeadingLines[0] ?? ""}</span>
                <span className="block">{mobileHeadingLines[1] ?? ""}</span>
              </div>
              <MobileTitleCorners />
            </div>
            <p
              className={`${interRegular.className} w-[324px] text-center text-[14px] leading-[16px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
              data-node-id="3572:8012"
            >
              {subtitle}
            </p>
          </div>

          <MobileModesScene cards={renderCards} labels={renderLabels} />
        </div>
      </div>
    </section>
  );
}
