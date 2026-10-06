"use client";

import type { CSSProperties } from "react";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { useFadeIn, getFadeInClass } from "../shared/useFadeIn";
import { PRIMARY_CTA_SHADOW } from "./developer-data";
import { mediaUrl } from "@/lib/strapi";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { useFitText } from "../shared/FitText";

const DEFAULT_HEADING = "Test on the metal,\nwithout the metal.";
const DEFAULT_SUBTITLE =
  "Validate your build in a virtual sandbox,\nno need to wait for hardware.";
const DEFAULT_CARD_TITLE = "Virtual Sandbox Coming Soon";
const DEFAULT_CARD_DESCRIPTION =
  "Complete virtual validation environment for testing your builds before hardware arrives.";
const DEFAULT_CTA_LABEL = "Join the Virtual Sandbox Waitlist";
const DEFAULT_IMAGE = "/developer/sandbox-image.webp";

const CORNER_47 = "/developer/coming-corner-47.svg";
const CORNER_48 = "/developer/coming-corner-48.svg";
const CORNER_55 = "/developer/coming-corner-55.svg";
const CORNER_56 = "/developer/coming-corner-56.svg";

/** 4px L-corner tick — matches Figma flip variants on 4495:3174. */
function CornerTick({
  src,
  placement,
  className = "",
  style,
}: {
  src: string;
  placement: "tl" | "tr" | "bl" | "br";
  className?: string;
  style?: CSSProperties;
}) {
  const flipClass =
    placement === "tl"
      ? "-scale-y-100"
      : placement === "tr"
        ? "rotate-180"
        : placement === "br"
          ? "-scale-y-100 rotate-180"
          : "";
  const inner = (
    <div className="absolute inset-[0_0_-12.5%_-12.5%]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy" decoding="async" alt="" className="block size-full max-w-none" src={src} aria-hidden />
    </div>
  );
  return (
    <div
      className={`pointer-events-none absolute flex size-[4px] items-center justify-center ${className}`}
      style={style}
      aria-hidden
    >
      {flipClass ? (
        <div className={`${flipClass} flex-none`}>
          <div className="relative size-[4px]">{inner}</div>
        </div>
      ) : (
        <div className="relative size-[4px]">{inner}</div>
      )}
    </div>
  );
}

/**
 * Figma 4495:3174 — "Coming soon" section.
 * Canvas 1440×683. Article card frames title → CTA; title/subtitle overlay the card.
 */
export function DeveloperComingSoon({ data }: { data?: any }) {
  let heading = data?.heading || DEFAULT_HEADING;
  if (!heading.includes("\n")) {
    heading = heading.replace(", without", ",\nwithout");
  }
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
  const fitRef = useFitText<HTMLHeadingElement>({});

  return (
    <div
      className="absolute overflow-clip bg-black"
      style={{
        left: 0,
        top: "calc(3669px + var(--developer-pipeline-offset, 0px))",
        width: 1440,
        height: 683,
        transition: "top 300ms ease-in-out",
      }}
      data-node-id="4495:3174"
      data-name="Coming soon"
    >
      {/* Background photo — 4495:3175 (image 250, 1440×810 centered) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: "50%", top: "calc(50% - 0.5px)", width: 1440, height: 810 }}
        data-node-id="4495:3175"
        data-name="image 250"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async"
          alt=""
          src="/developer/coming-soon-bg.webp"
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

      {/* Ellipse 16215 — 4495:3176 */}
      <div
        aria-hidden
        className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        style={{
          left: "calc(50% + 2.82px)",
          top: "calc(50% - 358.31px)",
          width: 1487.963,
          height: 664.961,
        }}
        data-node-id="4495:3176"
      >
        <div className="flex-none rotate-[90.41deg]">
          <div className="relative h-[1483.266px] w-[654.24px]">
            <div className="absolute inset-[-10.11%_-22.93%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async"
                alt=""
                src="/developer/coming-ellipse-top.svg"
                className="block size-full max-w-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Ellipse 16216 — 4917:4389 */}
      <div
        aria-hidden
        className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        style={{
          left: "calc(50% + 2.82px)",
          top: "calc(50% + 470.98px)",
          width: 2062.854,
          height: 669.123,
        }}
        data-node-id="4917:4389"
      >
        <div className="flex-none rotate-[90.41deg]">
          <div className="relative h-[2058.171px] w-[654.24px]">
            <div className="absolute inset-[-7.29%_-22.93%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async"
                alt=""
                src="/developer/coming-ellipse-bottom.svg"
                className="block size-full max-w-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Full-width frosted glass panel overlaying background */}
      <div 
        ref={fadeRef}
        className={`absolute inset-0 bg-[rgba(0,0,0,0.04)] backdrop-blur-[12px] ${getFadeInClass(isVisible)}`}
      />

      {/* Content — 4495:3177 (800×587 centered) */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          left: "50%",
          top: "calc(50% - 1px)",
          width: 800,
          height: 587,
        }}
        data-node-id="4495:3177"
      >
        {/* Article card container (no longer frosted itself) */}
        <div
          className="absolute overflow-clip"
          style={{ left: 146, top: -36, width: 508, height: 634 }}
          data-node-id="4495:3186"
          data-name="Article"
        >
          {/* Lock image — 4495:3187 */}
          <div
            className="absolute"
            style={{ left: 166, top: 262.5, width: 175, height: 173 }}
            data-node-id="4495:3187"
            data-name="image 140"
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async"
                alt=""
                src={imgSrc}
                className="absolute left-[-3.1%] top-[-0.02%] h-[106.13%] w-[103.1%] max-w-none"
              />
            </div>
          </div>

          {/* Card text — 4495:3188 */}
          <div
            className="absolute flex flex-col items-center justify-center gap-[10px] text-center not-italic"
            style={{ left: 15.5, right: 15.5, top: 455.5 }}
            data-node-id="4495:3188"
          >
            <p
              className={`${gilroyMedium.className} w-full max-w-full text-[22px] leading-[28px] font-medium text-white [word-break:break-word]`}
              data-node-id="4495:3189"
            >
              {cardTitle}
            </p>
            <p
              className={`${interRegular.className} w-full max-w-[406px] text-[16px] leading-[24px] font-normal text-[rgba(240,240,240,0.6)] [word-break:break-word]`}
              data-node-id="4495:3190"
            >
              {cardDescription}
            </p>
          </div>

          {/* CTA — 4495:3191 */}
          <a
            href={ctaHref}
            className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} absolute flex h-[48px] max-w-[calc(100%-40px)] items-start gap-[10px] overflow-hidden px-[20px] py-[10px]`}
            style={{ left: 77.5, top: 561.5 }}
            data-node-id="4495:3191"
            data-name="CTA - Primary"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
            />
            <span className="relative flex min-w-0 shrink items-center justify-center gap-[10px]">
              <span className="truncate text-[16px] leading-[28px] font-medium uppercase text-white not-italic">
                {ctaLabel}
              </span>
              <span className="relative size-[20px] shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async"
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

          {/* Article corners — mid sides + bottom (Figma 4495:3202–3205) */}
          <CornerTick
            src={CORNER_55}
            placement="tl"
            className="left-[-0.5px] top-[246.5px]"
          />
          <CornerTick
            src={CORNER_56}
            placement="tr"
            className="right-[-0.5px] top-[246.5px]"
          />
          <CornerTick
            src={CORNER_56}
            placement="br"
            className="bottom-[-0.5px] right-[-0.5px]"
          />
          <CornerTick
            src={CORNER_55}
            placement="bl"
            className="bottom-[-0.5px] left-[-0.5px]"
          />
        </div>

        {/* Section Title — 4495:3178 (centered over article; constrained to card width) */}
        <div
          className="absolute left-1/2 flex w-[488px] max-w-[488px] -translate-x-1/2 flex-col items-center justify-center gap-[24px]"
          style={{ top: 13 }}
          data-node-id="4495:3178"
          data-name="Section Title"
        >
          <div
            className="relative flex w-fit max-w-full shrink-0 flex-col items-center px-[10px]"
            data-node-id="4495:3179"
            data-name="Title"
          >
            <h2
              ref={fitRef}
              className={`${gilroyMedium.className} max-w-full text-center text-[46px] font-medium text-white not-italic`}
              data-node-id="4495:3180"
            >
              {headingLines.map((line: string, i: number) => (
                <span
                  key={i}
                  className="block leading-[49px] [overflow-wrap:anywhere]"
                >
                  {line}
                </span>
              ))}
            </h2>
            <CornerTick src={CORNER_47} placement="tl" className="left-[2px] top-0" />
            <CornerTick src={CORNER_48} placement="tr" className="right-[2px] top-0" />
            <CornerTick src={CORNER_47} placement="bl" className="bottom-0 left-[2px]" />
            <CornerTick src={CORNER_48} placement="br" className="right-[2px] bottom-0" />
          </div>
        </div>

        {/* Subtitle — 4495:3185 */}
        <p
          className={`${interRegular.className} absolute left-1/2 w-[406px] max-w-[calc(100%-40px)] -translate-x-1/2 text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic opacity-85 [overflow-wrap:anywhere] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
          style={{ top: 135 }}
          data-node-id="4495:3185"
        >
          {subtitle.map((line: string, i: number) => (
            <span key={i}>
              {i > 0 ? <br aria-hidden /> : null}
              {line}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
