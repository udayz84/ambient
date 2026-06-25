"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { gilroyMedium, interRegular, interMedium } from "../hero/fonts";
import { FEATURE_CARDS } from "./applications-data";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

export function ApplicationsMobile() {
  const [activeIndex, setActiveIndex] = useState(0);
  const features = [FEATURE_CARDS.left, FEATURE_CARDS.right];
  const activeFeature = features[activeIndex];

  const goNext = useCallback(() => setActiveIndex((i) => (i + 1) % features.length), [features.length]);
  const goPrev = useCallback(() => setActiveIndex((i) => (i - 1 + features.length) % features.length), [features.length]);

  return (
    <div className="relative flex flex-col items-center py-[48px] bg-black overflow-hidden">
      {/* Header Block with Brackets */}
      <div className="relative flex flex-col items-center w-full">
        <div className="relative inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start leading-[0]">
          <h2
            className={`${gilroyMedium.className} relative col-start-1 row-start-1 mt-[7px] ml-[3px] w-[350px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic whitespace-pre-wrap`}
            style={{
              backgroundImage:
                "linear-gradient(107.454deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
            }}
          >
            Build the <br />
            impossible today
          </h2>
          
          <div className="relative col-start-1 row-start-1 mt-0 ml-[353.65px] flex size-[4px] items-center justify-center">
            <div className="rotate-180 flex-none">
              <div className="relative size-[4px]">
                <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                  <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
                </div>
              </div>
            </div>
          </div>
          <div className="relative col-start-1 row-start-1 mt-[70px] ml-[353.65px] flex size-[4px] items-center justify-center">
            <div className="-scale-y-100 rotate-180 flex-none">
              <div className="relative size-[4px]">
                <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                  <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
                </div>
              </div>
            </div>
          </div>
          <div className="relative col-start-1 row-start-1 mt-[70px] ml-0 size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
            </div>
          </div>
          <div className="relative col-start-1 row-start-1 mt-0 ml-0 flex size-[4px] items-center justify-center">
            <div className="-scale-y-100 flex-none">
              <div className="relative size-[4px]">
                <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                  <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
                </div>
              </div>
            </div>
          </div>
        </div>

        <p
          className={`${interRegular.className} mt-[10px] w-[350px] text-center text-[14px] leading-[16px] font-normal text-white not-italic [word-break:break-word] px-[12px]`}
        >
          Don&apos;t let legacy design limit your roadmap. Discover the
          market-differentiating features of the GPX10 and what&apos;s coming next.
        </p>
      </div>

      {/* Embedded Feature Image Block edge-to-edge */}
      <div className="relative mt-[32px] w-full flex justify-center">
        {/* Original image containing the car and baked-in text box */}
        <Image
          src="/mobile/Group-97.png"
          alt=""
          width={391}
          height={372}
          className="w-full h-auto object-cover"
          sizes="100vw"
        />

        {/* Blackout overlay to hide the baked-in text box */}
        <div className="absolute bottom-0 w-full h-[48%] bg-black" />

        {/* Dynamic Feature Slider overlay */}
        <div className="absolute bottom-0 w-full max-w-[340px] border-[0.5px] border-white/20 bg-[#000000] p-[24px] flex flex-col justify-center">
          

          {/* Top Left Bracket */}
          <div className="absolute -top-[0.5px] -left-[0.5px] z-10 flex size-[6px] items-center justify-center">
            <div className="-scale-y-100 flex-none">
              <div className="relative size-[6px]">
                <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
              </div>
            </div>
          </div>

          {/* Bottom Right Bracket */}
          <div className="absolute -bottom-[0.5px] -right-[0.5px] z-10 flex size-[6px] items-center justify-center">
            <div className="-scale-x-100 flex-none">
              <div className="relative size-[6px]">
                <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
              </div>
            </div>
          </div>

          <style>{`
            @keyframes slideFadeIn {
              0% { opacity: 0; transform: translateY(10px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            .animate-slide-fade {
              animation: slideFadeIn 0.3s ease-out forwards;
            }
          `}</style>

          <div key={activeIndex} className="flex flex-col animate-slide-fade">
            <h3 className={`${gilroyMedium.className} text-[20px] text-white leading-[28px] not-italic`}>
              {activeFeature.title}
            </h3>
            <p className={`${interRegular.className} text-[14px] text-[#f0f0f0] opacity-65 leading-[22px] mt-[16px] not-italic`}>
              {activeFeature.description}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="mt-[32px] flex items-center justify-center gap-[16px]">
        <button
          type="button"
          onClick={goPrev}
          className="size-[44px] relative"
          aria-label="Previous Feature"
        >
          <img
            alt=""
            src="/platform-scale/nav-left.svg"
            className="absolute inset-0 block size-full max-w-none"
          />
        </button>
        <button
          type="button"
          onClick={goNext}
          className="size-[44px] relative"
          aria-label="Next Feature"
        >
          <img
            alt=""
            src="/platform-scale/nav-right.svg"
            className="absolute inset-0 block size-full max-w-none"
          />
        </button>
      </div>

      <a
        href="#"
        className={`${interMedium.className} relative mt-[40px] flex h-[48px] w-[237px] items-center justify-center ${GREEN_CTA_SHADOW}`}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden z-[2] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)] rounded-[inherit]"
        />
        <p className="relative z-10 flex items-center gap-[10px] text-[12px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic [word-break:break-word]">
          EXPLORE APPLICATION
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/applications/cta-dot.svg" alt="" className="size-[6px]" aria-hidden />
        </p>
        
        {/* Custom Corners that pop out slightly to avoid the inset shadow */}
        <div className="pointer-events-none absolute -top-[0.5px] right-0 z-20 flex size-[4px] items-center justify-center">
          <div className="rotate-180 flex-none">
            <div className="relative size-[4px]">
              <img src="/hero/corner-tag-2.svg" alt="" className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -top-[0.5px] left-0 z-20 flex size-[4px] items-center justify-center">
          <div className="-scale-y-100 flex-none">
            <div className="relative size-[4px]">
              <img src="/hero/corner-tag-1.svg" alt="" className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute right-0 bottom-0 z-20 flex size-[4px] items-center justify-center">
          <div className="-scale-x-100 flex-none">
            <div className="relative size-[4px]">
              <img src="/hero/corner-tag-2.svg" alt="" className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 z-20 flex size-[4px] items-center justify-center">
          <div className="flex-none">
            <div className="relative size-[4px]">
              <img src="/hero/corner-tag-1.svg" alt="" className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
