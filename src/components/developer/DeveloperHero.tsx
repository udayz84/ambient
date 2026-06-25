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
 * Background image group 2438:4562 (right, 724.277,78.033 / 687.038×577.687)
 * + content frame 2438:4563 (left, 100,240 / 549×248).
 */
export function DeveloperHero() {
  return (
    <>
      {/* Hero background — image group 2438:4562 */}
      <div
        className="pointer-events-none absolute overflow-hidden"
        style={{ left: 724.277, top: 78.033, width: 687.038, height: 577.687 }}
        data-node-id="2438:4562"
        aria-hidden
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src="/developer/hero-bg-1.png"
            className="absolute left-0 top-[0.03%] h-[99.97%] w-full max-w-none object-cover"
          />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src="/developer/hero-bg-2.png"
          className="absolute inset-0 size-full max-w-none object-cover"
        />
        <div className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src="/developer/hero-bg-3.png"
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

      {/* Hero content — frame 2438:4563 */}
      <div
        className="absolute flex flex-col items-start gap-[24px]"
        style={{ left: 100, top: 240, width: 549 }}
        data-node-id="2438:4563"
      >
        {/* Section Title — 2438:4564/4565 (473×98) */}
        <div className="relative w-[473px] px-[10px]" data-node-id="2438:4565">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} bg-clip-text text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{ backgroundImage: HERO_TITLE_GRADIENT }}
          >
            <span className="block">Model to deployment</span>
            <span className="block">{`in 15 Minutes `}</span>
          </h2>
        </div>

        {/* Description — 2438:4571 */}
        <p
          className={`${interRegular.className} w-[529px] text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
          data-node-id="2438:4571"
        >
          ModelForge bridges training and deployment. Quantize, compile, and
          merge neural networks with your firmware.
        </p>

        {/* CTAs — 2438:4572 */}
        <div
          className="flex items-start justify-center gap-[24px]"
          data-node-id="2438:4572"
        >
          <PrimaryCta>Download ModelForge SDK</PrimaryCta>
          <SecondaryCta>Read the Documentation</SecondaryCta>
        </div>
      </div>
    </>
  );
}

function PrimaryCta({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#"
      className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] shrink-0 items-center justify-center px-[20px] py-[10px] overflow-hidden`}
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

function SecondaryCta({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#"
      className={`${gilroyMedium.className} relative flex h-[48px] shrink-0 items-center justify-center overflow-clip bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]`}
      data-node-id="2438:4580"
    >
      <span className="relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
        {children}
      </span>
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </a>
  );
}
