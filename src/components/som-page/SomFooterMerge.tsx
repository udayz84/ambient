/* eslint-disable @next/next/no-img-element */

import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";

const CORNER_LEFT = "/hero/corner-tag-1.svg";
const CORNER_RIGHT = "/hero/corner-tag-2.svg";
const PRIMARY_CTA_SHADOW = "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";
const PRIMARY_CTA_INSET = "shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]";

export function SomFooterMerge() {
  return (
    <div
      className="relative z-20 mb-0 min-[1024px]:-mb-[400px] flex w-full justify-center px-[24px]"
      data-node-id="2438:5337"
    >
      <div className="relative flex h-[211px] w-full max-w-[1203px] items-center justify-center">
        <img
          src="/som/footer-merge.svg"
          alt=""
          className="pointer-events-none absolute inset-0 size-full brightness-[1.15] opacity-80"
        />
        
        {/* Actual Content (2438:5338) */}
        <div className="relative z-10 flex w-full max-w-[1043px] items-center justify-between">
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
              Join the SOM Waitlist
            </h2>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-end gap-[20px] w-[291px]">
            <p className={`${interRegular.className} text-[14px] leading-[24px] text-right text-white tracking-[-0.3px]`}>
              Be the first to access our upcoming Vision, Sound, and Industrial modules.
            </p>
            <a
              href="#"
              className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-[231px] shrink-0 items-center justify-center overflow-hidden`}
            >
              <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
              <span className="relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
                Join the Waitlist
              </span>
              <span aria-hidden className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`} />
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
