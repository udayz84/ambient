"use client";

import { gilroyMedium, interRegular } from "../hero/fonts";
import { useFadeIn, getFadeInClass } from "../shared/useFadeIn";
import { Corners } from "../shared/Corners";
import { CORNER_LEFT, CORNER_RIGHT, PRIMARY_CTA_SHADOW } from "./developer-data";
import { mediaUrl } from "@/lib/strapi";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

/** Radial fade overlay for the duplicated background images (Figma 2438:4635). */
const BG_FADE =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1212.6 683' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-0.000002985 38.877 -54.283 -0.000004168 606.29 326.94)'><stop stop-color='rgba(0,0,0,0)' offset='0'/><stop stop-color='rgba(0,0,0,1)' offset='1'/></radialGradient></defs></svg>\")";

const DEFAULT_HEADING = "Test on the metal,\nwithout the metal.";
const DEFAULT_SUBTITLE =
  "Validate your build in a virtual sandbox,\nno need to wait for hardware.";
const DEFAULT_CARD_TITLE = "Virtual Sandbox Coming Soon";
const DEFAULT_CARD_DESCRIPTION =
  "Complete virtual validation environment for testing your builds before hardware arrives.";
const DEFAULT_CTA_LABEL = "Join the Virtual Sandbox Waitlist";
const DEFAULT_IMAGE = "/developer/sandbox-image.png";

/**
 * Figma 2438:4634 — "Coming soon" section.
 * Positioned at -6.7,2394 / 1453×683 within the Developer canvas.
 */
export function DeveloperComingSoon({ data }: { data?: any }) {
  const heading = data?.heading || DEFAULT_HEADING;
  const headingLines = heading.split("\n");
  const subtitle = data?.subtitle
    ? data.subtitle.split("\n")
    : DEFAULT_SUBTITLE.split("\n");
  const cardTitle = data?.card_title || DEFAULT_CARD_TITLE;
  const cardDescription = data?.card_description || DEFAULT_CARD_DESCRIPTION;
  const ctaLabel = data?.cta_label || DEFAULT_CTA_LABEL;
  const ctaHref = data?.cta_href || "#";
  const imgSrc = mediaUrl(data?.image) || DEFAULT_IMAGE;
  const { fadeRef, isVisible } = useFadeIn();
  return (
    <div
      className="absolute"
      style={{ left: -6.6953125, top: 2394, width: 1453, height: 683 }}
      data-node-id="2438:4634"
      data-name="Coming soon"
    >
      {/* Background images (image 147, duplicated left & right, opacity 60) */}
      <ComingBg left="calc(50% - 619.8px)" />
      <ComingBg left="calc(50% + 778.2px)" />

      {/* Content — 2438:4637 (centered) */}
      <div
        className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[24px]"
        style={{ left: "calc(50% + 0.5px)", top: "calc(50% - 1px)", width: 800 }}
        data-node-id="2438:4637"
      >
        {/* Section Title — 2438:4639 */}
        <div className="relative px-[10px]" data-node-id="2438:4639">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} text-center text-[46px] leading-[49px] font-medium text-white not-italic`}
          >
            {headingLines.map((line: string, i: number) => (
              <span key={i} className="block whitespace-nowrap">
                {line}
              </span>
            ))}
          </h2>
        </div>

        {/* Description — 2438:4645 */}
        <p
          className={`${interRegular.className} w-[406px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic opacity-85`}
        >
          {subtitle.map((line: string, i: number) => (
            <span key={i}>
              {i > 0 ? <br aria-hidden /> : null}
              {line}
            </span>
          ))}
        </p>

        {/* Article card — 2438:4646 */}
        <div ref={fadeRef} className={`relative flex w-[508px] flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0)] px-[16px] pt-[16px] pb-[24px] ${getFadeInClass(isVisible)}`}>
          {/* image 140 — 2438:4647 */}
          <div className="relative h-[173px] w-[175px] shrink-0">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={imgSrc}
                className="absolute left-[-3.1%] top-[-0.02%] h-[106.13%] w-[103.1%] max-w-none"
              />
            </div>
          </div>
          {/* Text — 2438:4648 */}
          <div className="flex w-full flex-col items-center gap-[10px] text-center">
            <p
              className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium text-white not-italic`}
            >
              {cardTitle}
            </p>
            <p
              className={`${interRegular.className} w-[406px] text-[16px] leading-[24px] font-normal text-[rgba(240,240,240,0.6)] not-italic`}
            >
              {cardDescription}
            </p>
          </div>
          {/* CTA — 2438:4651 */}
          <a
            href={ctaHref}
            className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] items-center justify-center gap-[10px] overflow-hidden px-[20px] py-[10px]`}
            data-node-id="2438:4651"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
            />
            <span className="relative flex items-center gap-[10px]">
              <span className="text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
                {ctaLabel}
              </span>
              <span className="relative size-[20px] shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src="/developer/waitlist-icon.svg"
                  className="absolute inset-0 size-full max-w-none"
                />
              </span>
            </span>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
            />
            <GreenCtaCorners />
          </a>

          {/* Card corners */}
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
        </div>
      </div>
    </div>
  );
}

function ComingBg({ left }: { left: string }) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 opacity-60"
      style={{ left, top: "50%", width: 1212.573, height: 683 }}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src="/developer/coming-bg.png"
          className="absolute inset-0 size-full max-w-none object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: BG_FADE }}
        />
      </div>
    </div>
  );
}
