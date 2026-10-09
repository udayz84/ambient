"use client";

import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, interMedium, interRegular } from "../hero/fonts";
import { useFitText } from "../shared/FitText";
import {
  DEFAULT_GPX_INDEX,
  type GpxProduct,
} from "./platform-scale-data";
import { useState, useCallback } from "react";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { Corners } from "../shared/Corners";

const EMPTY_PRODUCT: GpxProduct = {
  id: "",
  label: "",
  description: "",
  chip_image: null,
};

function getVirtualProduct(
  virtualIndex: number,
  products: GpxProduct[]
) {
  if (products.length === 0) return EMPTY_PRODUCT;
  const total = products.length;
  return products[((virtualIndex % total) + total) % total];
}

const MOBILE_TRANSITION =
  "transform 500ms cubic-bezier(0.4,0,0.2,1), opacity 500ms cubic-bezier(0.4,0,0.2,1), width 500ms cubic-bezier(0.4,0,0.2,1), height 500ms cubic-bezier(0.4,0,0.2,1)";

type MobileSlot = {
  translateX: number;
  chipTop: number;
  width: number;
  height: number;
  opacity: number;
  zIndex: number;
  isHero: boolean;
  hasLabel: boolean;
  labelTop: number;
  labelFontSize: number;
  labelOpacity: number;
  labelPaddingX: number;
  labelPaddingY: number;
  labelTracking: string;
};

const MOBILE_SLOT: Record<-2 | -1 | 0 | 1 | 2, MobileSlot> = {
  [-2]: {
    translateX: -377.5,
    chipTop: 29.6,
    width: 123.89,
    height: 128.48,
    opacity: 0.25,
    zIndex: 28,
    isHero: false,
    hasLabel: true,
    labelTop: 137.02,
    labelFontSize: 10.512,
    labelOpacity: 0.5,
    labelPaddingX: 8.176,
    labelPaddingY: 2.336,
    labelTracking: "-0.1051px",
  },
  [-1]: {
    translateX: -204,
    chipTop: 15,
    width: 152.04,
    height: 157.68,
    opacity: 0.5,
    zIndex: 29,
    isHero: false,
    hasLabel: true,
    labelTop: 149.87,
    labelFontSize: 18.687,
    labelOpacity: 0.75,
    labelPaddingX: 11.68,
    labelPaddingY: 5.84,
    labelTracking: "-0.1869px",
  },
  [0]: {
    translateX: 0,
    chipTop: 0,
    width: 187.89,
    height: 187.68,
    opacity: 1,
    zIndex: 30,
    isHero: true,
    hasLabel: false,
    labelTop: 0,
    labelFontSize: 0,
    labelOpacity: 0,
    labelPaddingX: 0,
    labelPaddingY: 0,
    labelTracking: "0px",
  },
  [1]: {
    translateX: 204,
    chipTop: 15,
    width: 152.04,
    height: 157.68,
    opacity: 0.5,
    zIndex: 29,
    isHero: false,
    hasLabel: true,
    labelTop: 149.87,
    labelFontSize: 18.687,
    labelOpacity: 0.75,
    labelPaddingX: 11.68,
    labelPaddingY: 5.84,
    labelTracking: "-0.1869px",
  },
  [2]: {
    translateX: 377.5,
    chipTop: 29.6,
    width: 123.89,
    height: 128.48,
    opacity: 0.25,
    zIndex: 28,
    isHero: false,
    hasLabel: true,
    labelTop: 137.02,
    labelFontSize: 10.512,
    labelOpacity: 0.5,
    labelPaddingX: 8.176,
    labelPaddingY: 2.336,
    labelTracking: "-0.1051px",
  },
};

export function PlatformScaleMobile({ data }: { data?: any }) {
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 2 });
  const products: GpxProduct[] =
    Array.isArray(data?.products)
      ? data.products.map((p: any) => ({
          id: p?.product_id || "",
          label: p?.label || "",
          description: p?.description || "",
          chip_image: p?.chip_image || null,
        }))
      : [];

  const TOTAL = products.length || 1;
  const defaultIndex =
    typeof data?.default_index === "number" ? data.default_index : DEFAULT_GPX_INDEX;

  const heading = data?.heading || "";
  const headingLines = heading.split("\n");
  const headingLine1 = headingLines[0] || "";
  const headingLine2 = headingLines.slice(1).join("\n") || "";
  const subtitle = data?.subtitle || "";
  const cta = data?.cta || {};
  const ctaLabel = cta.label || "";
  const ctaHref = cta.href || "";

  const [virtualIndex, setVirtualIndex] = useState(TOTAL * 10 + defaultIndex);

  const activeProduct = getVirtualProduct(virtualIndex, products);

  const goPrevious = useCallback(() => setVirtualIndex((c: number) => c - 1), []);
  const goNext = useCallback(() => setVirtualIndex((c: number) => c + 1), []);

  const items = ([-2, -1, 0, 1, 2] as const).map((offset) => ({
    offset,
    product: getVirtualProduct(virtualIndex + offset, products),
    key: `v-${virtualIndex + offset}`,
  }));

  return (
    <div className="relative w-full overflow-hidden bg-black pb-[48px]">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-x-0 top-0 w-full" style={{ aspectRatio: "393 / 628" }}>
          <Image
            src="/mobile/image 69.webp"
            alt=""
            fill
            className="object-cover object-center !h-[125%] -translate-x-[13px] scale-[1.05]"
            sizes="100vw"
          />
          <div
            className="absolute inset-x-0 top-0 w-full !h-[125%]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0) 70%, rgb(0, 0, 0) 95%), linear-gradient(180deg, rgb(0, 0, 0) 17.653%, rgba(0, 0, 0, 0) 55.299%)",
            }}
          />
        </div>
      </div>

      <div className="relative flex flex-col items-center px-[24px] pt-[48px] z-10 w-full">
        {/* Header Block */}
        <div className="relative flex flex-col items-center py-[24px] w-full">
          <div className="relative flex w-[354px] max-w-full flex-col items-center justify-center py-[10px]">
            <div className="absolute top-0 right-0 flex size-[6px] items-center justify-center scale-[0.6] origin-top-right">
              <div className="rotate-180 flex-none">
                <div className="relative size-[6px]">
                  <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 flex size-[6px] items-center justify-center scale-[0.6] origin-bottom-right">
              <div className="-scale-x-100 flex-none">
                <div className="relative size-[6px]">
                  <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 flex size-[6px] items-center justify-center scale-[0.6] origin-bottom-left">
              <div className="flex-none">
                <div className="relative size-[6px]">
                  <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
                </div>
              </div>
            </div>
            <div className="absolute top-0 left-0 flex size-[6px] items-center justify-center scale-[0.6] origin-top-left">
              <div className="-scale-y-100 flex-none">
                <div className="relative size-[6px]">
                  <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
                </div>
              </div>
            </div>

            <h2
              ref={fitRef}
              className={`${gilroyMedium.className} relative z-10 bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic`}
              style={{
                backgroundImage:
                  "linear-gradient(100.945deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
              }}
            >
              {headingLine1}<br />{headingLine2}
            </h2>
          </div>
          <p
            className={`${interRegular.className} mt-[16px] max-w-[340px] px-[20px] text-center text-[14px] leading-[22px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
          >
            {subtitle}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative mt-[40px] h-[200px] w-full">
          {items.map(({ key, product, offset }) => {
            const slot = MOBILE_SLOT[offset];

            return (
              <div
                key={key}
                className="absolute left-1/2 top-0"
                style={{
                  transform: `translateX(${slot.translateX}px)`,
                  opacity: slot.opacity,
                  zIndex: slot.zIndex,
                  transition: MOBILE_TRANSITION,
                }}
                aria-hidden={!slot.isHero}
              >
                {/* Chip */}
                <div
                  className="absolute left-0 top-0"
                  style={{
                    width: slot.width,
                    height: slot.height,
                    transform: `translate(-50%, ${slot.chipTop}px)`,
                    transition: MOBILE_TRANSITION,
                  }}
                >
                  {/* Hero layer (image 77 + frame) */}
                  <div
                    className="absolute inset-0"
                    style={{
                      opacity: slot.isHero ? 1 : 0,
                      transition: "opacity 500ms cubic-bezier(0.4,0,0.2,1)",
                    }}
                  >
                    <div className="relative size-full">
                      {mediaUrl(product.chip_image) ? (
                        <Image
                          src={mediaUrl(product.chip_image) as string}
                          alt=""
                          fill
                          className="object-bottom"
                          sizes="188px"
                        />
                      ) : null}
                    </div>
                  </div>
                  {/* Side layer (image 81) */}
                  <div
                    className="absolute inset-0"
                    style={{
                      opacity: slot.isHero ? 0 : 1,
                      transition: "opacity 500ms cubic-bezier(0.4,0,0.2,1)",
                    }}
                  >
                    <div className="relative size-full">
                      {mediaUrl(product.chip_image) ? (
                        <Image
                          src={mediaUrl(product.chip_image) as string}
                          alt=""
                          fill
                          className="object-contain object-bottom"
                          sizes={`${slot.width}px`}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* Label */}
                {slot.hasLabel && (
                  <div
                    className="absolute left-0 top-0 flex items-center justify-center bg-[rgba(0,0,0,0.25)]"
                    style={{
                      transform: `translate(-50%, ${slot.labelTop}px)`,
                      padding: `${slot.labelPaddingY}px ${slot.labelPaddingX}px`,
                      opacity: slot.labelOpacity,
                      transition: MOBILE_TRANSITION,
                    }}
                  >
                    <p
                      className={`${gilroyMedium.className} max-w-full text-center whitespace-nowrap text-white not-italic overflow-hidden text-ellipsis [word-break:break-word]`}
                      style={{
                        fontSize: `${slot.labelFontSize}px`,
                        lineHeight: "21.023px",
                        letterSpacing: slot.labelTracking,
                      }}
                    >
                      {product.label}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Stat Panel */}
        <div className="relative mt-[58px] flex w-full max-w-[340px] flex-col items-center gap-[12px] backdrop-blur-[6px] bg-white/[0.02] border-[0.5px] border-solid border-white/15 px-[20px] py-[24px]">
          {/* Top Right Bracket */}
          <div className="absolute -top-[0.5px] -right-[0.5px] z-10 flex size-[6px] items-center justify-center scale-[0.6] origin-top-right">
            <div className="rotate-180 flex-none">
              <div className="relative size-[6px]">
                <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
              </div>
            </div>
          </div>
          {/* Top Left Bracket */}
          <div className="absolute -top-[0.5px] -left-[0.5px] z-10 flex size-[6px] items-center justify-center scale-[0.6] origin-top-left">
            <div className="-scale-y-100 flex-none">
              <div className="relative size-[6px]">
                <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
              </div>
            </div>
          </div>
          {/* Bottom Right Bracket */}
          <div className="absolute -bottom-[0.5px] -right-[0.5px] z-10 flex size-[6px] items-center justify-center scale-[0.6] origin-bottom-right">
            <div className="-scale-x-100 flex-none">
              <div className="relative size-[6px]">
                <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
              </div>
            </div>
          </div>
          {/* Bottom Left Bracket */}
          <div className="absolute -bottom-[0.5px] -left-[0.5px] z-10 flex size-[6px] items-center justify-center scale-[0.6] origin-bottom-left">
            <div className="flex-none">
              <div className="relative size-[6px]">
                <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
              </div>
            </div>
          </div>

          <p
            className={`${gilroyMedium.className} text-center text-[24px] leading-[36px] font-medium tracking-[-0.24px] whitespace-nowrap text-white not-italic overflow-hidden text-ellipsis [word-break:break-word]`}
          >
            {activeProduct.label}
          </p>
          <p
            className={`${interRegular.className} max-w-[340px] text-center text-[14px] leading-[1.4] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
          >
            {activeProduct.description}
          </p>
        </div>

        {/* Arrows */}
        <div className="mt-[34px] flex items-center gap-[20px]">
          <button
            type="button"
            onClick={goPrevious}
            className="size-[44px] relative"
            aria-label="Previous GPX product"
          >
            <img loading="lazy" decoding="async"
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
            <img loading="lazy" decoding="async"
              alt=""
              src="/platform-scale/nav-right.svg"
              className="absolute inset-0 block size-full max-w-none"
            />
          </button>
        </div>

        {/* CTA */}
        <div className="relative mt-[31px] flex flex-col items-center gap-[12px] w-full max-w-[340px]">
          {ctaLabel ? (
            <a
              href={ctaHref}
              className={`${interMedium.className} relative flex h-[48px] w-full min-w-[237px] items-center justify-center shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 overflow-hidden z-[2] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)] rounded-[inherit]"
              />
              <p className="relative z-10 max-w-full text-[12px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic overflow-hidden text-ellipsis [word-break:break-word]">
                {ctaLabel}
              </p>
              <GreenCtaCorners />
            </a>
          ) : null}

          {data?.secondary_cta?.label ? (
            <a
              href={data.secondary_cta.href || "#"}
              className={`${interMedium.className} relative flex h-[48px] w-full min-w-[237px] shrink-0 items-center justify-center border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(226,241,202,0.12)] text-white hover:bg-[rgba(226,241,202,0.2)] transition-colors duration-200`}
            >
              <span className="text-[12px] leading-[28px] font-medium whitespace-nowrap uppercase not-italic">
                {data.secondary_cta.label}
              </span>
              <Corners leftSrc="/developer/corner-58.svg" rightSrc="/developer/corner-55.svg" />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
