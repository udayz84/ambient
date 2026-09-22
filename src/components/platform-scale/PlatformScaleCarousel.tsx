"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { gilroyMedium, interRegular } from "../hero/fonts";
import {
  DEFAULT_GPX_INDEX,
  type GpxProduct,
} from "./platform-scale-data";
import { Corners } from "../shared/Corners";
import { mediaUrl } from "@/lib/strapi";

const chipGlassCropClass =
  "absolute top-[-79.23%] left-[-39.91%] h-[258.46%] w-[179.82%] max-w-none";

const SECTION_CENTER_X = 720;
const HERO_CHIP_WIDTH = 321.7456359863281;
const HERO_CHIP_HEIGHT = 321.382080078125;
const HERO_CHIP_TOP = 65.513671875;
const HERO_TOTAL_HEIGHT = 386.8947265625;
const LABEL_GAP = 10;

const TRANSITION_MS = 700;
const TRANSITION_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

const EMPTY_PRODUCT: GpxProduct = {
  id: "",
  label: "",
  description: "",
  chip_image: null,
};

function getVirtualProduct(
  virtualIndex: number,
  products: GpxProduct[]
): GpxProduct {
  if (products.length === 0) return EMPTY_PRODUCT;
  const total = products.length;
  return products[((virtualIndex % total) + total) % total];
}

type SlotKey = "-3" | "-2" | "-1" | "0" | "1" | "2" | "3";

type SlotConfig = {
  centerX: number;
  top: number;
  scale: number;
  opacity: number;
  labelFontSize: 18 | 32;
  labelOpacity: number;
  labelPaddingX: number;
  labelPaddingY: number;
};

const SLOT_CONFIG: Record<SlotKey, SlotConfig> = {
  "-3": {
    centerX: SECTION_CENTER_X - 945.51,
    top: 491.20703125,
    scale: 212.14378356933594 / HERO_CHIP_WIDTH,
    opacity: 0,
    labelFontSize: 18,
    labelOpacity: 0,
    labelPaddingX: 14,
    labelPaddingY: 4,
  },
  "-2": {
    centerX: SECTION_CENTER_X - 648.69,
    top: 491.20703125,
    scale: 212.14378356933594 / HERO_CHIP_WIDTH,
    opacity: 0.25,
    labelFontSize: 18,
    labelOpacity: 0.5,
    labelPaddingX: 14,
    labelPaddingY: 4,
  },
  "-1": {
    centerX: 237.955078125 + 260.3582763671875 / 2,
    top: 466.20703125,
    scale: 260.3582763671875 / HERO_CHIP_WIDTH,
    opacity: 0.5,
    labelFontSize: 32,
    labelOpacity: 0.75,
    labelPaddingX: 20,
    labelPaddingY: 10,
  },
  "0": {
    centerX: SECTION_CENTER_X,
    top: 375.001953125,
    scale: 1,
    opacity: 1,
    labelFontSize: 32,
    labelOpacity: 0,
    labelPaddingX: 20,
    labelPaddingY: 10,
  },
  "1": {
    centerX: 937.16796875 + 260.3582763671875 / 2,
    top: 466.20703125,
    scale: 260.3582763671875 / HERO_CHIP_WIDTH,
    opacity: 0.5,
    labelFontSize: 32,
    labelOpacity: 0.75,
    labelPaddingX: 20,
    labelPaddingY: 10,
  },
  "2": {
    centerX: SECTION_CENTER_X + 644.330078125,
    top: 491.20703125,
    scale: 212.14378356933594 / HERO_CHIP_WIDTH,
    opacity: 0.25,
    labelFontSize: 18,
    labelOpacity: 0.5,
    labelPaddingX: 14,
    labelPaddingY: 4,
  },
  "3": {
    centerX: SECTION_CENTER_X + 941.31,
    top: 491.20703125,
    scale: 212.14378356933594 / HERO_CHIP_WIDTH,
    opacity: 0,
    labelFontSize: 18,
    labelOpacity: 0,
    labelPaddingX: 14,
    labelPaddingY: 4,
  },
};

function getSlotKey(offset: number): SlotKey | null {
  if (offset < -3 || offset > 3) return null;
  return String(offset) as SlotKey;
}


function CarouselChipItem({
  product,
  offset,
}: {
  product: GpxProduct;
  offset: number;
}) {
  const slotKey = getSlotKey(offset);

  if (!slotKey) {
    return null;
  }

  const slot = SLOT_CONFIG[slotKey];
  const isHero = offset === 0;
  const translateX = slot.centerX - SECTION_CENTER_X;
  const tracking =
    slot.labelFontSize === 32 ? "-0.32px" : "-0.18px";

  return (
    <div
      className="absolute top-0 left-1/2 [backface-visibility:hidden] [transform-style:preserve-3d] [will-change:transform,opacity]"
      style={{
        width: HERO_CHIP_WIDTH,
        height: HERO_TOTAL_HEIGHT + 60,
        transform: `translateX(calc(-50% + ${translateX}px)) translateY(${slot.top}px) scale(${slot.scale})`,
        transformOrigin: "top center",
        opacity: slot.opacity,
        zIndex: 30 - Math.abs(offset),
        transition: `transform ${TRANSITION_MS}ms ${TRANSITION_EASING}, opacity ${TRANSITION_MS}ms ${TRANSITION_EASING}`,
      }}
      aria-hidden={!isHero}
    >
      <div
        className="absolute inset-x-0 top-0 [backface-visibility:hidden]"
        style={{
          height: HERO_TOTAL_HEIGHT,
          transition: `opacity ${TRANSITION_MS}ms ${TRANSITION_EASING}`,
          opacity: isHero ? 1 : 0,
          pointerEvents: isHero ? "auto" : "none",
        }}
      >
        <div
          className="relative"
          style={{
            top: HERO_CHIP_TOP,
            width: HERO_CHIP_WIDTH,
            height: HERO_CHIP_HEIGHT,
          }}
        >
          <div className="relative size-full">
            {mediaUrl(product.chip_image) ? (
              <Image
                alt=""
                src={mediaUrl(product.chip_image) as string}
                fill
                className="pointer-events-none object-bottom max-w-none"
                aria-hidden
              />
            ) : null}
          </div>
        </div>
      </div>

      <div
        className="absolute inset-x-0 top-0 flex flex-col items-center [backface-visibility:hidden]"
        style={{
          transition: `opacity ${TRANSITION_MS}ms ${TRANSITION_EASING}`,
          opacity: isHero ? 0 : 1,
          pointerEvents: isHero ? "none" : "auto",
        }}
      >
        <div
          className="relative"
          style={{
            top: HERO_CHIP_TOP,
            width: HERO_CHIP_WIDTH,
            height: HERO_CHIP_HEIGHT,
          }}
        >
          <div className="relative size-full">
            {mediaUrl(product.chip_image) ? (
              <Image
                alt=""
                src={mediaUrl(product.chip_image) as string}
                fill
                className="pointer-events-none object-bottom max-w-none"
                aria-hidden
              />
            ) : null}
          </div>
        </div>

        <div
          className="flex items-center justify-center bg-[rgba(0,0,0,0.4)] border-[0.5px] border-solid border-[rgba(255,255,255,0.15)]"
          style={{
            marginTop: LABEL_GAP,
            padding: `${slot.labelPaddingY}px ${slot.labelPaddingX}px`,
            opacity: slot.labelOpacity,
            transition: `opacity ${TRANSITION_MS}ms ${TRANSITION_EASING}`,
          }}
        >
          <p
            className={`${gilroyMedium.className} max-w-full text-center leading-[36px] font-medium whitespace-nowrap text-white not-italic overflow-hidden text-ellipsis [word-break:break-word]`}
            style={{
              fontSize: `${slot.labelFontSize}px`,
              letterSpacing: tracking,
            }}
          >
            {product.label}
          </p>
        </div>
      </div>
    </div>
  );
}

function PlatformScaleStatPanel({ product }: { product: GpxProduct }) {
  return (
    <div
      className="absolute top-[813px] left-1/2 flex w-[500px] max-md:w-[calc(100%-32px)] -translate-x-1/2 items-center gap-[32px] backdrop-blur-[6px] bg-white/[0.02] border-[0.5px] border-solid border-[rgba(255,255,255,0.15)] px-[10px]"
      data-node-id="2379:641"
    >
      <div
        className="relative flex min-w-px flex-[1_0_0] flex-col items-center justify-center gap-[12px] max-md:gap-[4px] py-[20px] pl-[20px]"
        data-node-id="2379:642"
        data-name="Stat"
      >
        <p
          className={`${gilroyMedium.className} relative w-full min-w-full shrink-0 text-center text-[32px] leading-[36px] font-medium tracking-[-0.32px] text-white not-italic [word-break:break-word]`}
          data-node-id="2379:643"
        >
          {product.label}
        </p>
        <div
          className="relative flex w-full shrink-0 flex-col items-center"
          data-node-id="2379:645"
          data-name="Content"
        >
          <p
            className={`${interRegular.className} relative w-full text-center text-[14px] leading-[1.4] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
            data-node-id="2379:646"
          >
            {product.description}
          </p>
        </div>
      </div>

      <Corners
        leftSrc="/platform-scale/stat-corner-tl.svg"
        rightSrc="/platform-scale/stat-corner-tr.svg"
      />
    </div>
  );
}

export function PlatformScaleCarousel({ data }: { data?: any }) {
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

  const [virtualIndex, setVirtualIndex] = useState(defaultIndex + TOTAL);

  const activeProduct = getVirtualProduct(virtualIndex, products);

  const goPrevious = useCallback(() => {
    setVirtualIndex((current: number) => current - 1);
  }, []);

  const goNext = useCallback(() => {
    setVirtualIndex((current: number) => current + 1);
  }, []);

  const items: { key: string; product: GpxProduct; offset: number }[] = [];
  for (let offset = -3; offset <= 3; offset++) {
    const vi = virtualIndex + offset;
    items.push({
      key: `v-${vi}`,
      product: getVirtualProduct(vi, products),
      offset,
    });
  }

  return (
    <>
      <div className="absolute inset-0 [isolation:isolate]">
        {items.map(({ key, product, offset }) => (
          <CarouselChipItem
            key={key}
            product={product}
            offset={offset}
          />
        ))}
      </div>

      <PlatformScaleStatPanel product={activeProduct} />

      <button
        type="button"
        onClick={goPrevious}
        className="absolute top-[865px] left-[384.11279296875px] z-40 size-[44px]"
        data-node-id="2388:326"
        data-name="Menu"
        aria-label="Previous GPX product"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async"
          alt=""
          src="/platform-scale/nav-left.svg"
          className="absolute inset-0 block size-full max-w-none"
          aria-hidden
        />
      </button>
      <button
        type="button"
        onClick={goNext}
        className="absolute top-[865px] left-[1011.11279296875px] z-40 size-[44px]"
        data-node-id="2388:319"
        data-name="Menu"
        aria-label="Next GPX product"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async"
          alt=""
          src="/platform-scale/nav-right.svg"
          className="absolute inset-0 block size-full max-w-none"
          aria-hidden
        />
      </button>
    </>
  );
}
