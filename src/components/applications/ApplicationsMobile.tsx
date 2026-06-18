"use client";

import { useState } from "react";
import Image from "next/image";
import { gilroyMedium, gilroySemiBold, interRegular } from "../hero/fonts";
import { APPLICATION_TABS, FEATURE_CARDS } from "./applications-data";
import { Corners } from "../shared/Corners";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

const watermarkGradient =
  "linear-gradient(259.734deg, rgba(255, 255, 255, 0.12) 0.12143%, rgba(255, 255, 255, 0.6) 44.084%, rgba(255, 255, 255, 0) 113.37%)";

const INITIAL_ACTIVE_INDEX = 3;

export function ApplicationsMobile() {
  const [activeIndex, setActiveIndex] = useState(INITIAL_ACTIVE_INDEX);
  const activeTab = APPLICATION_TABS[activeIndex];

  return (
    <div className="relative flex flex-col items-center px-[24px] py-[48px]">
      <h2
        className={`${gilroyMedium.className} max-w-[327px] bg-clip-text text-center text-[28px] leading-[34px] font-medium text-transparent [word-break:break-word] not-italic`}
        style={{
          backgroundImage:
            "linear-gradient(126.324deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
        }}
      >
        Build the impossible today
      </h2>
      <p
        className={`${interRegular.className} mt-[16px] max-w-[327px] text-center text-[14px] leading-[22px] font-normal text-[#f0f0f0] opacity-65 not-italic`}
      >
        Don&apos;t let legacy design limit your roadmap. Discover the
        market-differentiating features of the GPX10 and what&apos;s coming next.
      </p>

      <div className="mt-[28px] flex w-full gap-[8px] overflow-x-auto pb-[8px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {APPLICATION_TABS.map((label, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`${interRegular.className} shrink-0 cursor-pointer px-[14px] py-[8px] text-[12px] leading-[16px] font-normal tracking-[0.04em] whitespace-nowrap uppercase not-italic transition-colors ${
                isActive
                  ? "bg-[#f0f0f0] text-[#0e1a0e]"
                  : "border-[0.5px] border-solid border-white/15 text-white/60"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="relative mt-[16px] flex h-[180px] w-full items-center justify-center overflow-hidden">
        <p
          className={`${gilroySemiBold.className} pointer-events-none absolute bg-clip-text text-center text-[56px] leading-[60px] font-semibold tracking-[0.5px] whitespace-nowrap text-transparent uppercase not-italic`}
          style={{ backgroundImage: watermarkGradient }}
          aria-hidden
        >
          {activeTab}
        </p>
        <Image
          src="/applications/car-hero.png"
          alt=""
          width={984}
          height={435}
          className="relative h-full w-full max-w-none object-contain object-center"
          sizes="327px"
        />
      </div>

      <div className="mt-[24px] flex w-full flex-col gap-[12px]">
        {[FEATURE_CARDS.left, FEATURE_CARDS.right].map((card) => (
          <div
            key={card.title}
            className="flex flex-col gap-[8px] border-[0.5px] border-solid border-white/10 bg-[rgba(0,0,0,0.4)] p-[20px]"
          >
            <p
              className={`${gilroyMedium.className} text-[18px] leading-[24px] font-medium text-white not-italic`}
            >
              {card.title}
            </p>
            <p
              className={`${interRegular.className} text-[13px] leading-[20px] font-normal text-[#f0f0f0] opacity-70 not-italic`}
            >
              {card.description}
            </p>
          </div>
        ))}
      </div>

      <a
        href="#"
        className={`${gilroySemiBold.className} relative mt-[28px] flex h-[48px] w-full items-center justify-center gap-[8px] overflow-hidden ${GREEN_CTA_SHADOW}`}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
        />
        <span className="relative text-[14px] leading-[normal] font-semibold whitespace-nowrap text-white uppercase not-italic">
          Explore application
        </span>
        <Image
          src="/applications/cta-dot.svg"
          alt=""
          width={6}
          height={6}
          className="relative size-[6px]"
          aria-hidden
        />
        <Corners />
      </a>
    </div>
  );
}
