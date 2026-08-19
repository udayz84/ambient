/* eslint-disable @next/next/no-img-element */
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
  PRIMARY_CTA_INSET,
  PRIMARY_CTA_SHADOW,
} from "./dvk-data";

const BG_IMAGE = "/dvk/dvk-coming-bg.png";
const ELLIPSE_GLOW = "/dvk/dvk-coming-ellipse.svg";
const SANDBOX_IMAGE = "/dvk/dvk-coming-sandbox.png";
const ARROW_ICON = "/dvk/dvk-coming-arrow.svg";

const DEFAULT_HEADING_LINE_1 = "Test on the metal,";
const DEFAULT_HEADING_LINE_2 = "without the metal.";
const DEFAULT_SUBTITLE =
  "Validate your build in a virtual sandbox,\nno need to wait for hardware.";
const DEFAULT_CARD_TITLE = "Virtual Sandbox Coming Soon";
const DEFAULT_CARD_DESC =
  "Complete virtual validation environment for testing your builds before hardware arrives.";
const DEFAULT_CTA = "Join the Virtual Sandbox Waitlist";

/** Radial gradient overlay matching Figma 4497:2939 (opacity 0.69). */
const BG_RADIAL_OVERLAY =
  "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)";

export function DvkComingSoon({ data }: { data?: any }) {
  return null;
}

function DvkComingSoonMobile({
  headingLines,
  subtitleLines,
  cardTitle,
  cardDescription,
  ctaLabel,
  ctaHref,
}: {
  headingLines: string[];
  subtitleLines: string[];
  cardTitle: string;
  cardDescription: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <section
      className="relative flex w-full flex-col items-center overflow-hidden bg-black min-[1024px]:hidden"
      aria-label="Test on the metal, without the metal"
    >
      <div className="relative mx-auto flex w-full max-w-[393px] flex-col items-center px-[19px] pt-[30px]">
        {/* Background image */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[calc(50%+24px)] top-0 h-full w-[639px] max-w-none -translate-x-1/2 opacity-60">
            <img
              alt=""
              src={BG_IMAGE}
              className="absolute inset-0 size-full object-cover object-bottom"
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse at 50% 47.9%, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
              }}
            />
          </div>
        </div>

        {/* Title + subtitle */}
        <div className="flex w-full flex-col items-center gap-[10px]">
          <div className="relative flex w-full justify-center">
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            <h2
              className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage:
                  "linear-gradient(107.45deg, rgb(255, 255, 255) 1.35%, rgb(212, 233, 188) 55.16%, rgb(255, 255, 255) 111.67%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {headingLines.map((line: string, i: number) => (
                <span key={i} className="block leading-[36px]">
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <p
            className={`${interRegular.className} w-[336px] max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic`}
          >
            {subtitleLines.map((line: string, i: number) => (
              <span key={i}>
                {i > 0 ? <br aria-hidden /> : null}
                {line}
              </span>
            ))}
          </p>
        </div>

        {/* Article card */}
        <div className="relative mt-[20px] flex w-full flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0)] px-[16px] pt-[16px] pb-[24px]">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />

          {/* Image */}
          <div className="relative size-[140px] shrink-0 overflow-hidden">
            <img
              alt=""
              src={SANDBOX_IMAGE}
              className="absolute left-[-3.1%] top-[-0.02%] h-[106.13%] w-[103.1%] max-w-none object-cover"
            />
          </div>

          {/* Text */}
          <div className="flex w-full flex-col items-center gap-[10px] text-center">
            <p
              className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
            >
              {cardTitle}
            </p>
            <p
              className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}
            >
              {cardDescription}
            </p>
          </div>

          {/* CTA */}
          <a
            href={ctaHref}
            className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-full items-center overflow-hidden py-[10px]`}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
            />
            <div className="relative mx-auto flex w-[306px] items-center justify-between">
              <span className="text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
                {ctaLabel}
              </span>
              <span className="size-[20px] shrink-0">
                <img
                  alt=""
                  src={ARROW_ICON}
                  className="size-full max-w-none object-contain"
                />
              </span>
            </div>
            <span
              aria-hidden
              className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`}
            />
            <GreenCtaCorners />
          </a>
        </div>
      </div>
    </section>
  );
}
