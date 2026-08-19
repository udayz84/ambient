"use client";

import { gilroyMedium, interRegular } from "../hero/fonts";
import { useFadeIn, getFadeInClass } from "../shared/useFadeIn";
import { Corners } from "../shared/Corners";
import { CORNER_LEFT, CORNER_RIGHT, PRIMARY_CTA_SHADOW } from "./developer-data";
import { mediaUrl } from "@/lib/strapi";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

const DEFAULT_HEADING = "Test on the metal,\nwithout the metal.";
const DEFAULT_SUBTITLE =
  "Validate your build in a virtual sandbox,\nno need to wait for hardware.";
const DEFAULT_CARD_TITLE = "Virtual Sandbox Coming Soon";
const DEFAULT_CARD_DESCRIPTION =
  "Complete virtual validation environment for testing your builds before hardware arrives.";
const DEFAULT_CTA_LABEL = "Join the Virtual Sandbox Waitlist";
const DEFAULT_IMAGE = "/developer/sandbox-image.png";

/**
 * Figma 4495:3174 — "Coming soon" section.
 * Canvas position 0,2956 / 1440×683 (inside the +100px translateY wrapper).
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
      className="absolute overflow-clip"
      style={{ left: 0, top: "calc(2941px + var(--developer-pipeline-offset, 0px))", width: 1440, height: 683, transition: "top 300ms ease-in-out" }}
      data-node-id="4495:3174"
      data-name="Coming soon"
    >
      {/* Background photo — 4495:3175 (image 250, 1440×810 centered) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: "50%", top: "calc(50% - 0.5px)", width: 1440, height: 810 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src="/developer/coming-soon-bg.png"
          className="absolute inset-0 size-full max-w-none object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1440 810' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.6899999976158142'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0.79999 43.1 -76.622 1.4222 720 405)'><stop stop-color='rgba(0,0,0,0)' offset='0'/><stop stop-color='rgba(0,0,0,1)' offset='1'/></radialGradient></defs></svg>\")",
          }}
        />
      </div>

      {/* Ellipse 16215 — 4495:3176 (black blur glow above photo, below content) */}
      <div
        aria-hidden
        className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        style={{ left: "calc(50% + 0.33px)", top: "calc(50% + 6.29px)", width: 1068.309, height: 991.864 }}
      >
        <div className="flex-none rotate-[90.41deg]">
          <div className="relative" style={{ width: 984.207, height: 1061.212 }}>
            <div className="absolute" style={{ inset: "-14.13% -15.24%" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src="/developer/coming-ellipse.svg"
                className="block size-full max-w-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content — 4495:3177 (centered) */}
      <div
        className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[24px]"
        style={{ left: "50%", top: "calc(50% - 1px)", width: 800 }}
        data-node-id="4495:3177"
      >
        {/* Section Title — 4495:3178 */}
        <div className="relative px-[10px]" data-node-id="4495:3179">
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

        {/* Description — 4495:3185 */}
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

        {/* Article card — 4495:3186 */}
        <div ref={fadeRef} className={`relative flex w-[508px] flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0)] px-[16px] pt-[16px] pb-[24px] ${getFadeInClass(isVisible)}`}>
          {/* image 140 — 4495:3187 */}
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
          {/* Text — 4495:3188 */}
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
          {/* CTA — 4495:3191 */}
          <a
            href={ctaHref}
            className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] items-start px-[20px] py-[10px]`}
            data-node-id="4495:3191"
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
