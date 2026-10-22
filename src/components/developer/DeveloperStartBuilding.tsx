"use client";

import { useState } from "react";
import { UpcomingProductsModal } from "../hero/UpcomingProductsModal";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { Corners } from "../shared/Corners";
import { useFitText } from "../shared/FitText";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { CORNER_LEFT, CORNER_RIGHT } from "./developer-data";
import { START_CARD_TITLE_GRADIENT } from "../products-page/products-data";

/**
 * "Start building with Ambient." — footer CTA card for the developer page.
 * Same card design as the products page's StartBuilding cards (notched
 * Rectangle background, corner-bracketed gradient title, full-width CTAs).
 */
const HEADING = "Start building with Ambient.";
const SUBTITLE = "Everything from model to silicon, in one place — free to start.";
const CARD_BG = "/Rectangle 1618873545.png";

export function DeveloperStartBuilding() {
  const fitRef = useFitText<HTMLHeadingElement>({});
  const [modal, setModal] = useState<"sdk" | "evalkit" | null>(null);

  return (
    <section
      className="relative z-20 flex w-full justify-center bg-transparent px-[16px] sm:px-[24px] pt-[48px] pb-[48px] min-[600px]:pt-[80px] min-[600px]:pb-0 mb-0 min-[600px]:[margin-bottom:calc(-400px*var(--tablet-zoom,1))] min-[600px]:px-0"
      aria-label={HEADING}
    >
      <div className="relative flex w-full max-w-[558px] flex-col items-center justify-center px-[20px] sm:px-[36px] min-[600px]:px-[54px] py-[40px] min-[600px]:h-[320px] min-[600px]:pb-[64px]">
        {/* Card background shape — same asset as products StartBuilding cards */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={CARD_BG}
          className="pointer-events-none absolute inset-0 block size-full max-w-none"
          aria-hidden
        />

        <div className="relative flex w-full flex-col items-center gap-[12px]">
          {/* Title with bracket frame — brackets hug the text */}
          <div className="relative w-fit px-[6px] py-[2px]">
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} className="scale-[0.8]" />
            <h2
              ref={fitRef}
              className={`${gilroyMedium.className} relative bg-clip-text text-center text-[28px] leading-[34px] font-medium text-transparent not-italic [word-break:break-word] min-[1024px]:text-[36px] min-[1024px]:leading-[44px]`}
              style={{
                backgroundImage: START_CARD_TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {HEADING}
            </h2>
          </div>

          <p
            className={`${interRegular.className} w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
          >
            {SUBTITLE}
          </p>

          <div className="flex w-full max-w-[400px] flex-col gap-[12px]">
            <button
              type="button"
              onClick={() => setModal("sdk")}
              className={`${gilroyMedium.className} shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)] relative flex h-[48px] w-full items-center justify-center px-[12px] sm:px-[20px] py-[10px] cursor-pointer`}
            >
              <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
              <span aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]" />
              <span className="relative text-[12px] min-[390px]:text-[13px] sm:text-[14px] min-[1024px]:text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic tracking-[-0.01em]">
                Download the ModelForge SDK
              </span>
              <GreenCtaCorners />
            </button>
            <button
              type="button"
              onClick={() => setModal("evalkit")}
              className={`${gilroyMedium.className} relative flex h-[48px] w-full items-center justify-center border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(226,241,202,0.12)] px-[12px] sm:px-[20px] py-[10px] cursor-pointer`}
            >
              <span className="relative text-[12px] min-[390px]:text-[13px] sm:text-[14px] min-[1024px]:text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic tracking-[-0.01em]">
                Request an Eval Kit
              </span>
              <GreenCtaCorners disableDots />
            </button>
          </div>
        </div>
      </div>

      <UpcomingProductsModal
        isOpen={modal === "sdk"}
        onClose={() => setModal(null)}
        formContext="sdk"
      />
      <UpcomingProductsModal
        isOpen={modal === "evalkit"}
        onClose={() => setModal(null)}
        formContext="evalkit"
      />
    </section>
  );
}
