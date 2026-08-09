/* eslint-disable @next/next/no-img-element */

import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

const CORNER_LEFT = "/hero/corner-tag-1.svg";
const CORNER_RIGHT = "/hero/corner-tag-2.svg";
const PRIMARY_CTA_SHADOW = "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";
const PRIMARY_CTA_INSET = "shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]";

const FALLBACK_IMAGE = "/som/footer-merge.png";
const FALLBACK_HEADING = "Join the SOM Waitlist";
const FALLBACK_SUBTITLE =
  "Be the first to access our upcoming Vision, Sound, and Industrial modules.";
const FALLBACK_CTA_LABEL = "Join the Waitlist";

export function SomFooterMerge({ data }: { data?: any }) {
  const image = FALLBACK_IMAGE;
  const heading = data?.heading || FALLBACK_HEADING;
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const ctaLabel = data?.cta_label || FALLBACK_CTA_LABEL;
  return (
    <div
      className="relative z-20 mb-0 min-[1024px]:-mb-[400px] flex w-full justify-center px-[24px]"
      data-node-id="2438:5337"
    >
      <div className="relative flex h-[211px] max-[1023px]:h-auto w-full max-w-[1203px] items-center justify-center">
        {/* Desktop Background */}
        <img
          src={image}
          alt=""
          className="pointer-events-none absolute inset-0 size-full brightness-[1.15] opacity-80 max-[1023px]:hidden"
        />
        {/* Mobile Background */}
        <img
          src="/footer/footer%20mobile.png"
          alt=""
          className="pointer-events-none absolute inset-0 size-full object-cover brightness-[1.15] opacity-80 min-[1024px]:hidden"
          style={{
            maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
          }}
        />

        {/* DESKTOP (>=1024px) — original layout, unchanged */}
        <div className="relative z-10 hidden w-full max-w-[1043px] items-center justify-between min-[1024px]:flex">
          {/* Left Side */}
          <div className="relative px-[24px] py-[8px] w-fit">
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            <h2
              className={`${gilroyMedium.className} relative m-0 bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic whitespace-nowrap`}
              style={{
                backgroundImage: "linear-gradient(120.822deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {heading}
            </h2>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-end gap-[20px] w-[291px]">
            <p className={`${interRegular.className} text-[14px] leading-[24px] text-right text-white tracking-[-0.3px]`}>
              {subtitle}
            </p>
            <a
              href="#"
              className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-[231px] shrink-0 items-center justify-center`}
            >
              <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
              <span className="relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
                {ctaLabel}
              </span>
              <span aria-hidden className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`} />
              <GreenCtaCorners />
            </a>
          </div>
        </div>

        {/* MOBILE (<1024px) — stacked layout */}
        <div className="relative z-10 flex w-full max-w-[332px] flex-col items-center justify-center gap-[16px] py-[20px] min-[1024px]:hidden">
          <div className="relative px-[10px] py-[4px] w-fit">
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            <h2
              className={`${gilroyMedium.className} relative m-0 bg-clip-text text-center text-[28px] leading-[34px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: "linear-gradient(120.822deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {heading}
            </h2>
          </div>
          <p className={`${interRegular.className} max-w-full text-center text-[13px] leading-[20px] font-normal text-white/80 tracking-[-0.3px] [word-break:break-word]`}>
            {subtitle}
          </p>
          <a
            href="#"
            className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-full shrink-0 items-center justify-center`}
          >
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
            <span className="relative text-[14px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
              {ctaLabel}
            </span>
            <span aria-hidden className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`} />
            <GreenCtaCorners />
          </a>
        </div>
      </div>
    </div>
  );
}
