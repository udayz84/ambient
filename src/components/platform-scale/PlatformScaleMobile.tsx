"use client";

import Image from "next/image";
import { gilroyMedium, interMedium, interRegular } from "../hero/fonts";
import { GPX_PRODUCTS } from "./platform-scale-data";
import { useState, useCallback } from "react";

const TOTAL = GPX_PRODUCTS.length;

function getVirtualProduct(virtualIndex: number) {
  return GPX_PRODUCTS[((virtualIndex % TOTAL) + TOTAL) % TOTAL];
}

export function PlatformScaleMobile() {
  const [virtualIndex, setVirtualIndex] = useState(TOTAL * 10);

  const activeProduct = getVirtualProduct(virtualIndex);

  const goPrevious = useCallback(() => setVirtualIndex((c) => c - 1), []);
  const goNext = useCallback(() => setVirtualIndex((c) => c + 1), []);

  const items = [-1, 0, 1].map((offset) => ({
    offset,
    product: getVirtualProduct(virtualIndex + offset),
    key: `v-${virtualIndex + offset}`,
  }));

  return (
    <div className="relative w-full overflow-hidden bg-black pb-[48px]">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <Image
          src="/platform-scale/bg-image-69.png"
          alt=""
          fill
          className="object-cover object-bottom opacity-80"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0) 60%, rgb(0, 0, 0) 100%), linear-gradient(180deg, rgb(0, 0, 0) 10%, rgba(0, 0, 0, 0) 40%)",
          }}
        />
      </div>

      <div className="relative flex flex-col items-center px-[24px] pt-[48px] z-10 w-full">
        {/* Header Block */}
        <div className="relative flex flex-col items-center px-[20px] py-[24px] w-full max-w-[340px]">
          <div className="relative px-[16px] py-[8px]">
            <div className="absolute top-0 right-0 flex size-[6px] items-center justify-center">
              <div className="rotate-180 flex-none">
                <div className="relative size-[6px]">
                  <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 flex size-[6px] items-center justify-center">
              <div className="-scale-x-100 flex-none">
                <div className="relative size-[6px]">
                  <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 flex size-[6px] items-center justify-center">
              <div className="flex-none">
                <div className="relative size-[6px]">
                  <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
                </div>
              </div>
            </div>
            <div className="absolute top-0 left-0 flex size-[6px] items-center justify-center">
              <div className="-scale-y-100 flex-none">
                <div className="relative size-[6px]">
                  <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
                </div>
              </div>
            </div>

            <h2
              className={`${gilroyMedium.className} bg-clip-text text-center text-[30px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic`}
              style={{
                backgroundImage:
                  "linear-gradient(100.945deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
              }}
            >
              One platform,<br />infinite scale
            </h2>
          </div>
          <p
            className={`${interRegular.className} mt-[16px] text-center text-[14px] leading-[22px] font-normal text-[#f0f0f0] opacity-65 not-italic`}
          >
            A modular compute fabric for your entire product roadmap, from a
            microwatt edge array to a hyperscaler server grid, without ever
            changing your software
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full h-[280px] mt-[20px] flex items-center justify-center">
          {items.map(({ key, product, offset }) => {
            const isCenter = offset === 0;
            const translateX = offset * 130;
            const scale = isCenter ? 1 : 0.65;
            const opacity = isCenter ? 1 : 0.4;
            const zIndex = isCenter ? 10 : 0;

            return (
              <div
                key={key}
                className="absolute top-1/2 left-1/2 flex flex-col items-center transition-all duration-500 ease-in-out"
                style={{
                  transform: `translate(calc(-50% + ${translateX}px), -50%) scale(${scale})`,
                  opacity,
                  zIndex,
                }}
              >
                <div className="relative h-[170px] w-[180px] shrink-0">
                  <Image
                    src="/platform-scale/chip-hero.png"
                    alt=""
                    fill
                    className="object-contain object-bottom"
                    sizes="180px"
                  />
                  {/* Glowing frame for center chip */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{ opacity: isCenter ? 1 : 0 }}
                  >
                    <div className="absolute top-[-7.7px] right-[-6.9px] bottom-[-11px] left-[-6.9px]">
                      <div className="absolute inset-[-0.15%]">
                        <img
                          alt=""
                          src="/platform-scale/chip-frame.svg"
                          className="block w-full h-full object-fill"
                          aria-hidden
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div
                  className="mt-[16px] flex shrink-0 items-center justify-center border-[0.5px] border-solid border-white/15 bg-[rgba(0,0,0,0.4)] px-[16px] py-[6px] transition-opacity duration-500"
                  style={{ opacity: isCenter ? 0 : 1 }}
                >
                  <p
                    className={`${gilroyMedium.className} text-center text-[20px] leading-[28px] font-medium tracking-[-0.2px] whitespace-nowrap text-white not-italic`}
                  >
                    {product.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stat Panel */}
        <div className="relative mt-[24px] flex w-full max-w-[340px] flex-col items-center gap-[12px] bg-[rgba(0,0,0,0.1)] backdrop-blur-[12px] border-[0.5px] border-solid border-white/15 px-[20px] py-[24px]">
          {/* Top Right Bracket */}
          <div className="absolute -top-[0.5px] -right-[0.5px] z-10 flex size-[6px] items-center justify-center">
            <div className="rotate-180 flex-none">
              <div className="relative size-[6px]">
                <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
              </div>
            </div>
          </div>
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
          {/* Bottom Left Bracket */}
          <div className="absolute -bottom-[0.5px] -left-[0.5px] z-10 flex size-[6px] items-center justify-center">
            <div className="flex-none">
              <div className="relative size-[6px]">
                <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
              </div>
            </div>
          </div>

          <p
            className={`${gilroyMedium.className} text-center text-[24px] leading-[36px] font-medium tracking-[-0.24px] whitespace-nowrap text-white not-italic`}
          >
            {activeProduct.label}
          </p>
          <p
            className={`${interRegular.className} text-center text-[14px] leading-[1.4] font-normal text-[#f0f0f0] opacity-65 not-italic`}
          >
            {activeProduct.description}
          </p>
        </div>

        {/* Arrows */}
        <div className="mt-[24px] flex items-center gap-[20px]">
          <button
            type="button"
            onClick={goPrevious}
            className="size-[44px] relative"
            aria-label="Previous GPX product"
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
            aria-label="Next GPX product"
          >
            <img
              alt=""
              src="/platform-scale/nav-right.svg"
              className="absolute inset-0 block size-full max-w-none"
            />
          </button>
        </div>

        {/* CTA */}
        <a
          href="#"
          className={`${interMedium.className} relative mt-[40px] flex h-[48px] w-[237px] items-center justify-center shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden z-[2] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)] rounded-[inherit]"
          />
          <p className="relative z-10 text-[12px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic [word-break:break-word]">
            EXPLORE AMBIENT SILICON
          </p>
          
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
    </div>
  );
}
