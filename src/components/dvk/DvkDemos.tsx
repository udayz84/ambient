"use client";

import { gilroyMedium, interRegular, dmMono } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { useFitText } from "../shared/FitText";
import { DvkDemosCards } from "./DvkDemosCards";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
  DEMOS_TITLE_GRADIENT,
  PRIMARY_CTA_INSET,
  PRIMARY_CTA_SHADOW,
} from "./dvk-data";

const DEFAULT_HEADING = "Pre-loaded demos. Instant AI validation.";
const DEFAULT_SUBTITLE =
  "A curated set of AI models you can push to the NuraSense kit and see working in seconds";

/**
 * Figma 2761:2791 (+ 2799/2809/2819) — demos section.
 * Title frame (872 wide) sits above the three-card row (1256 wide); both are
 * centered. The 53px gap mirrors the Figma canvas spacing between the title
 * frame bottom (y=1705) and the cards top (y=1758.5).
 */
export function DvkDemos({ data }: { data?: any }) {
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 1 });
  const heading = data?.heading || DEFAULT_HEADING;
  const rawSubtitle = data?.subtitle || DEFAULT_SUBTITLE;
  const subtitle = rawSubtitle.replace(
    /The Cranium( board)? comes ready to run out of the box/g,
    "The NuraSense board comes ready to run out of the box",
  );
  const ctaLabel = data?.cta_label || "EXPLORE TARGET APPLICATIONS →";
  const ctaHref = data?.cta_href || "/applications";
  return (
    <div className="relative flex w-full flex-col items-center gap-[53px]">
      {/* Section title — 2761:2791 (872×136) */}
      <div
        className="relative flex w-[872px] flex-col items-center justify-center gap-[24px]"
        data-node-id="2761:2791"
        data-name="Section Title"
      >
        <p className={`${dmMono.className} m-0 text-[12px] leading-[19.5px] font-normal tracking-[-0.36px] whitespace-nowrap text-[#a9e28c] uppercase not-italic`}>
          Demo Ready
        </p>
        {/* Title — 2761:2792 (872×49, px-10 corners frame) */}
        <div
          className="relative px-[10px]"
          style={{ width: 872 }}
          data-node-id="2761:2792"
          data-name="Title"
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            ref={fitRef}
            className={`${gilroyMedium.className} relative m-0 bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic whitespace-nowrap`}
            style={{
              width: 852,
              backgroundImage: DEMOS_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2761:2793"
          >
            {heading}
          </h2>
        </div>

        {/* Description — 2761:2798 (650 wide) */}
        <p
          className={`${interRegular.className} text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
          style={{ width: 650 }}
          data-node-id="2761:2798"
        >
          {subtitle}
        </p>
      </div>

      {/* Demo cards row — 1256 wide */}
      <DvkDemosCards data={data} />

      {/* Explore CTA */}
      <a
        href={ctaHref}
        className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative mt-[11px] flex h-[48px] shrink-0 items-center justify-center px-[32px]`}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
        />
        <span className="relative text-[15px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
          {ctaLabel}
        </span>
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`}
        />
        <GreenCtaCorners />
      </a>
    </div>
  );
}
