/* eslint-disable @next/next/no-img-element */
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
  HERO_TITLE_GRADIENT,
  PRIMARY_CTA_SHADOW,
} from "./developer-data";

/**
 * Figma 2438:4365 — Developer page hero.
 * Pixel-perfect from:
 *  - Image group 2438:4562 (724.277, 78.033 / 687.038×577.687)
 *  - Content frame 2438:4563 (100, 240 / 549×248)
 *
 * Content children are absolutely positioned at their exact Figma coords
 * (Title 0,0 · Description 0,122 · CTAs 0,200) so layout never depends on
 * font metrics or auto-layout rounding.
 */
export function DeveloperHero() {
  return (
    <>
      {/* Hero background image */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-visible"
        data-node-id="2438:4562"
        aria-hidden
      >
        <div className="absolute inset-0">
          <img
            src="/developer/hero-bg-1.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <img
          src="/developer/hero-bg-2.png"
          alt=""
          className="absolute inset-0 size-full max-w-none object-cover"
        />
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/developer/hero-bg-3.png"
            alt=""
            className="absolute left-[-5.54%] top-[-7%] h-[107.81%] w-[105.54%] max-w-none object-cover"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(247.952deg, rgba(0, 0, 0, 0) 62.969%, rgb(0, 0, 0) 95.031%)",
          }}
        />
      </div>

      {/* Hero content — 2438:4563 (100, 240 / 549×248). z-10 above the image. */}
      <div
        className="absolute z-10"
        style={{ left: 100, top: 240, width: 549, height: 248 }}
        data-node-id="2438:4563"
      >
        {/* Section Title — 2438:4564/4565 (0,0 / 473×98, px-10) */}
        <div
          className="absolute px-[10px]"
          style={{ left: 0, top: 0, width: 473, height: 98 }}
          data-node-id="2438:4565"
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} bg-clip-text text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{ backgroundImage: HERO_TITLE_GRADIENT }}
          >
            <span className="block">Model to deployment</span>
            <span className="block">{`in 15 Minutes `}</span>
          </h2>
        </div>

        {/* Description — 2438:4571 (0,122 / 529×54) */}
        <p
          className={`${interRegular.className} absolute text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
          style={{ left: 0, top: 122, width: 529 }}
          data-node-id="2438:4571"
        >
          ModelForge bridges training and deployment. Quantize, compile, and
          merge neural networks with your firmware.
        </p>

        {/* CTAs — 2438:4572 (0,200 / 549×48) */}
        <div
          className="absolute flex items-start gap-[24px]"
          style={{ left: 0, top: 200, width: 549 }}
          data-node-id="2438:4572"
        >
          <PrimaryCta>Download ModelForge SDK</PrimaryCta>
          <SecondaryCta>Read the Documentation</SecondaryCta>
        </div>
      </div>
    </>
  );
}

/** CTA - Primary — 2438:4573 (276×48) */
function PrimaryCta({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#"
      className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-[276px] shrink-0 items-center justify-center overflow-hidden px-[20px] py-[10px]`}
      data-node-id="2438:4573"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span className="relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
        {children}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
      />
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </a>
  );
}

/** CTA - Secondary — 2438:4580 (249×48) */
function SecondaryCta({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#"
      className={`${gilroyMedium.className} relative flex h-[48px] w-[249px] shrink-0 items-center justify-center overflow-clip bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]`}
      data-node-id="2438:4580"
    >
      <span className="relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
        {children}
      </span>
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </a>
  );
}
