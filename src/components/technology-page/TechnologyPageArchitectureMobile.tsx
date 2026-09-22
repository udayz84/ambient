"use client";

import { useState } from "react";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { TagBadge } from "../hero/TagBadge";
import { CornerDecor } from "../contact/contact-shared";
import { MobileTitleCorners } from "./mobile-shared";
import { IconBox, PillarCta, type Pillar } from "./TechnologyPageArchitecture";

/**
 * MOBILE (<1024px) — pixel-perfect from Figma node 3572:6674
 * ("3rd Fold", 393×966): header, brain visual, card carousel with
 * prev/next arrows (one pillar card at a time).
 */

const BRAIN_IMG = "/technology/architecture-brain.webp";
const ARROW_LEFT = "/technology/carousel-arrow-left.svg";
const ARROW_RIGHT = "/technology/carousel-arrow-right.svg";
const INDICATOR_LINE = "/technology/m-indicator-line.svg";
const INDICATOR_DIAMOND_OUTER = "/technology/m-indicator-diamond-outer.svg";
const INDICATOR_DIAMOND_INNER = "/technology/m-indicator-diamond-inner.svg";

const TITLE_GRADIENT_DEG = "98.481deg";

function MobileBrainVisual() {
  return (
    <>
      <div
        className="absolute top-[478.53px] right-[24.91px] h-[115.225px] w-[340.188px]"
        data-node-id="3572:7782"
        data-name="brsain 1"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            src={BRAIN_IMG}
            alt=""
            className="absolute top-[-2659.54%] left-[-0.01%] h-[6304.38%] w-[99.97%] max-w-none"
          />
        </div>
      </div>
      <div
        className="absolute top-[223px] right-[24.91px] h-[255.533px] w-[340.188px]"
        data-node-id="3572:7783"
        data-name="brsain 3"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            src={BRAIN_IMG}
            alt=""
            className="absolute top-[0.66%] left-[-0.01%] h-[235.48%] w-[99.97%] max-w-none"
          />
        </div>
      </div>
      <div
        className="absolute top-[593.76px] right-[24.91px] h-[347.242px] w-[340.188px]"
        data-node-id="3572:7784"
        data-name="brsain 2"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            src={BRAIN_IMG}
            alt=""
            className="absolute top-[-78.64%] left-[-0.01%] h-[179.66%] w-[99.97%] max-w-none"
          />
        </div>
      </div>
    </>
  );
}

/** 3572:6785 — diamond marker + vertical line between brain and card. */
function MobileIndicator() {
  return (
    <>
      <div
        className="absolute top-[418px] left-[114px] h-[103px] w-0"
        data-node-id="3572:6801"
        aria-hidden
      >
        <div className="absolute inset-[0_-0.25px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async" src={INDICATOR_LINE} alt="" className="block size-full max-w-none" />
        </div>
      </div>
      <div
        className="absolute top-[411px] left-[107.18px] flex size-[14.142px] items-center justify-center"
        data-node-id="3572:6803"
        aria-hidden
      >
        <div className="flex-none rotate-135">
          <div className="relative size-[10px]">
            <div className="absolute inset-[-40%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" src={INDICATOR_DIAMOND_OUTER} alt="" className="block size-full max-w-none" />
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute top-[413.83px] left-[109.83px] flex size-[8.485px] items-center justify-center"
        data-node-id="3572:6804"
        aria-hidden
      >
        <div className="flex-none rotate-135">
          <div className="relative size-[6px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" src={INDICATOR_DIAMOND_INNER} alt="" className="absolute inset-0 block size-full max-w-none" />
          </div>
        </div>
      </div>
    </>
  );
}

/** 3572:7868 — card inner content ("Stat" frame, 319 wide). */
function MobilePillarStat({ pillar }: { pillar: Pillar }) {
  return (
    <div
      className="relative flex w-[319px] shrink-0 flex-col items-start gap-[16px] py-[12px]"
      data-node-id="3572:7868"
      data-name="Stat"
    >
      <IconBox pillar={pillar} />

      {/* tag — absolutely placed beside the icon */}
      <div
        className="absolute top-[18px] left-[56px]"
        data-node-id="3572:7872"
        data-name="Logo and Menu"
      >
        <TagBadge
          label={pillar.tag}
          width={107}
          height={26}
          centerLabel
          leftBarLeft={6.48}
          rightBarLeft={98.48}
          nodeId="3572:7878"
        />
      </div>

      <div
        className="flex w-full flex-col items-start gap-[6px] not-italic"
        data-node-id="3572:7886"
      >
        <p
          className={`${gilroyMedium.className} w-[279px] shrink-0 text-[24px] leading-[38px] font-medium text-white [word-break:break-word]`}
          data-node-id="3572:7887"
        >
          {pillar.title}
        </p>
        <p
          className={`${interRegular.className} shrink-0 text-[12px] leading-[normal] font-normal whitespace-nowrap text-[#6fe047] [word-break:break-word]`}
          data-node-id="3572:7888"
        >
          {pillar.subtitle}
        </p>
        <p
          className={`${interRegular.className} w-full shrink-0 text-[12px] leading-[normal] font-normal text-[#8e8e8e] [word-break:break-word]`}
          data-node-id="3572:7889"
        >
          {pillar.desc}
        </p>
      </div>

      <div
        className={`${interRegular.className} flex w-full flex-col items-start gap-[12px] text-[12px] leading-[normal] font-normal not-italic`}
        data-node-id="3572:7890"
      >
        {pillar.bullets.map((b, i) => (
          <div key={i} className="flex w-full items-start gap-[5px]">
            <p className="shrink-0 text-[14px] tracking-[-0.1504px] whitespace-nowrap text-[#3a9719] not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
              +
            </p>
            <p className="min-w-px flex-1 text-[rgba(255,255,255,0.9)] not-italic [word-break:break-word]">
              {b}
            </p>
          </div>
        ))}
      </div>

      {pillar.cta ? <PillarCta pillar={pillar} /> : null}
    </div>
  );
}

export function TechnologyPageArchitectureMobile({
  heading,
  subtitle,
  pillars,
}: {
  heading: string;
  subtitle: string;
  pillars: Pillar[];
}) {
  const [index, setIndex] = useState(0);
  const count = pillars.length;
  const pillar = pillars[index] ?? pillars[0];

  return (
    <div className="relative w-full overflow-hidden min-[1024px]:hidden">
      <div className="relative mx-auto min-h-[966px] pb-[60px] w-full max-w-[393px]">
        <MobileBrainVisual />

        {/* 3572:6743 — header */}
        <div
          className="absolute top-[30px] left-[calc(50%+1.5px)] flex w-[350px] -translate-x-1/2 flex-col items-center justify-center gap-[10px]"
          data-node-id="3572:6743"
        >
          <div className="relative h-[151px] w-[356px]" data-node-id="3572:6744">
            <div
              className={`${gilroyMedium.className} absolute top-[7px] left-[12px] w-[332px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: `linear-gradient(${TITLE_GRADIENT_DEG}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              data-node-id="3572:6745"
            >
              {heading.split("\n").join(" ")}
            </div>
            <MobileTitleCorners />
          </div>
          <p
            className={`${interRegular.className} w-full text-center text-[14px] leading-[16px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
            data-node-id="3572:6750"
          >
            {subtitle}
          </p>
        </div>

        <MobileIndicator />

        {/* 3572:7866 — carousel */}
        <div
          className="relative pt-[521px] mx-auto flex w-[353.001px] flex-col items-center gap-[34px]"
          data-node-id="3572:7866"
        >
          <div
            className="relative flex w-[353px] flex-col items-center bg-[rgba(0,0,0,0.1)] backdrop-blur-md px-[20px]"
            data-node-id="3572:7867"
          >
            <MobilePillarStat pillar={pillar} />
            <CornerDecor />
          </div>

          {/* 3572:6751 — prev/next */}
          <div className="flex w-[108px] items-center gap-[20px]" data-node-id="3572:6751">
            <button
              type="button"
              aria-label="Previous pillar"
              onClick={() => setIndex((i) => (i - 1 + count) % count)}
              className="relative size-[44px] shrink-0 cursor-pointer"
              data-node-id="3572:6752"
              data-name="Menu"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" src={ARROW_LEFT} alt="" className="absolute inset-0 block size-full max-w-none" />
            </button>
            <button
              type="button"
              aria-label="Next pillar"
              onClick={() => setIndex((i) => (i + 1) % count)}
              className="relative size-[44px] shrink-0 cursor-pointer"
              data-node-id="3572:6759"
              data-name="Menu"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" src={ARROW_RIGHT} alt="" className="absolute inset-0 block size-full max-w-none" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
