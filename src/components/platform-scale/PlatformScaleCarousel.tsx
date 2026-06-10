"use client";

import { useCallback, useState } from "react";
import { interMedium, interRegular } from "../hero/fonts";
import {
  DEFAULT_GPX_INDEX,
  GPX_PRODUCTS,
  type GpxProduct,
} from "./platform-scale-data";

const cornerTr = "/platform-scale/stat-corner-tr.svg";
const cornerTl = "/platform-scale/stat-corner-tl.svg";

const chipGlassCropClass =
  "absolute top-[-79.23%] left-[-39.91%] h-[258.46%] w-[179.82%] max-w-none";

const HERO_CHIP_WIDTH = 321.7456359863281;
const HERO_CHIP_HEIGHT = 321.382080078125;
const HERO_CHIP_TOP = 65.513671875;
const HERO_TOTAL_HEIGHT = 386.8947265625;
const LABEL_GAP = 10;

const TRANSITION_MS = 700;
const TRANSITION_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

const TOTAL = GPX_PRODUCTS.length;

function wrapOffset(raw: number): number {
  const modulo = ((raw % TOTAL) + TOTAL) % TOTAL;
  if (modulo > TOTAL / 2) return modulo - TOTAL;
  return modulo;
}

type SlotKey = "-2" | "-1" | "0" | "1" | "2";

type SlotConfig = {
  offsetPx: number;
  offsetVw: number;
  topPx: number;
  scale: number;
  opacity: number;
  labelFontSize: 18 | 32;
  labelOpacity: number;
  labelPaddingX: number;
  labelPaddingY: number;
};

const SLOT_CONFIG: Record<SlotKey, SlotConfig> = {
  "-2": {
    offsetPx: -648.69,
    offsetVw: -45.14,
    topPx: 491.2,
    scale: 212.14378356933594 / HERO_CHIP_WIDTH,
    opacity: 0.25,
    labelFontSize: 18,
    labelOpacity: 0.5,
    labelPaddingX: 14,
    labelPaddingY: 4,
  },
  "-1": {
    offsetPx: -351.87,
    offsetVw: -21.88,
    topPx: 466.2,
    scale: 260.3582763671875 / HERO_CHIP_WIDTH,
    opacity: 0.5,
    labelFontSize: 32,
    labelOpacity: 0.75,
    labelPaddingX: 20,
    labelPaddingY: 10,
  },
  "0": {
    offsetPx: -3.81,
    offsetVw: -0.26,
    topPx: 375.0,
    scale: 1,
    opacity: 1,
    labelFontSize: 32,
    labelOpacity: 0,
    labelPaddingX: 20,
    labelPaddingY: 10,
  },
  "1": {
    offsetPx: 347.35,
    offsetVw: 21.36,
    topPx: 466.2,
    scale: 260.3582763671875 / HERO_CHIP_WIDTH,
    opacity: 0.5,
    labelFontSize: 32,
    labelOpacity: 0.75,
    labelPaddingX: 20,
    labelPaddingY: 10,
  },
  "2": {
    offsetPx: 644.33,
    offsetVw: 44.86,
    topPx: 491.2,
    scale: 212.14378356933594 / HERO_CHIP_WIDTH,
    opacity: 0.25,
    labelFontSize: 18,
    labelOpacity: 0.5,
    labelPaddingX: 14,
    labelPaddingY: 4,
  },
};

function getSlotKey(offset: number): SlotKey | null {
  if (offset < -2 || offset > 2) return null;
  return String(offset) as SlotKey;
}

function getTranslateX(slot: SlotConfig): string {
  const px = slot.offsetPx;
  const vw = slot.offsetVw;
  if (px < 0) {
    return `calc(min(${px}px, ${vw}vw))`;
  }
  if (px > 0) {
    return `calc(max(${px}px, ${vw}vw))`;
  }
  return `${px}px`;
}

function ChipGlassImage() {
  return (
    <img
      alt=""
      src="/platform-scale/chip-glass.png"
      className={chipGlassCropClass}
      aria-hidden
    />
  );
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
  const tracking = slot.labelFontSize === 32 ? "-0.32px" : "-0.18px";

  return (
    <div
      className="absolute top-0 left-1/2 [backface-visibility:hidden] [transform-style:preserve-3d] [will-change:transform,opacity]"
      style={{
        width: HERO_CHIP_WIDTH,
        height: HERO_TOTAL_HEIGHT + 60,
        transform: `translateX(calc(-50% + ${getTranslateX(slot)})) translateY(${slot.topPx}px) scale(${slot.scale})`,
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
          <div className="absolute bottom-full left-[23.06201171875px] mb-[8.486328125px] h-[136.73727416992188px] w-[297.23162841796875px]">
            <img
              alt=""
              src="/platform-scale/chip-shade.svg"
              className="absolute inset-0 block size-full max-w-none"
              aria-hidden
            />
          </div>

          <div className="relative size-full shadow-[0px_21px_20px_0px_#0d2006]">
            <img
              alt=""
              src="/platform-scale/chip-hero.png"
              className="pointer-events-none absolute inset-0 size-full max-w-none object-bottom"
              aria-hidden
            />
          </div>

          <div className="absolute top-[-7.69921875px] right-[-6.900390625px] bottom-[-11.013671875px] left-[-6.900390625px]">
            <div className="absolute inset-[-0.15%]">
              <img
                alt=""
                src="/platform-scale/chip-frame.svg"
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <ChipGlassImage />
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
          className="relative overflow-hidden"
          style={{
            top: HERO_CHIP_TOP,
            width: HERO_CHIP_WIDTH,
            height: HERO_CHIP_HEIGHT,
          }}
        >
          <ChipGlassImage />
        </div>

        <div
          className="flex items-center justify-center bg-[rgba(0,0,0,0.25)]"
          style={{
            marginTop: LABEL_GAP,
            padding: `${slot.labelPaddingY}px ${slot.labelPaddingX}px`,
            opacity: slot.labelOpacity,
            transition: `opacity ${TRANSITION_MS}ms ${TRANSITION_EASING}`,
          }}
        >
          <p
            className={`${interMedium.className} text-center leading-[36px] font-medium whitespace-nowrap text-white not-italic [word-break:break-word]`}
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
      className="absolute top-[68%] left-1/2 flex w-[min(500px,90vw)] -translate-x-1/2 items-center gap-[32px] bg-[rgba(0,0,0,0.1)] px-[10px]"
      data-node-id="2379:641"
    >
      <div
        className="relative flex min-w-px flex-[1_0_0] flex-col items-center justify-center gap-[12px] py-[20px] pl-[20px]"
        data-node-id="2379:642"
        data-name="Stat"
      >
        <p
          className={`${interMedium.className} relative w-full min-w-full shrink-0 text-center text-[32px] leading-[36px] font-medium tracking-[-0.32px] whitespace-nowrap text-white not-italic [word-break:break-word]`}
          data-node-id="2379:643"
        >
          {product.label}
        </p>
        <div
          className="relative flex w-full shrink-0 flex-col items-start"
          data-node-id="2379:645"
          data-name="Content"
        >
          <p
            className={`${interRegular.className} relative w-full text-[14px] leading-[1.4] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
            data-node-id="2379:646"
          >
            {product.description}
          </p>
        </div>
      </div>

      <div className="absolute top-[0.49px] right-[0.52px] flex size-[4px] items-center justify-center">
        <div className="rotate-180 flex-none">
          <div className="relative size-[4px]" data-node-id="2379:647">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <img
                src={cornerTr}
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-[0.52px] bottom-[0.53px] flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 rotate-180 flex-none">
          <div className="relative size-[4px]" data-node-id="2379:648">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <img
                src={cornerTr}
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-[0.51px] left-[0.51px] flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]" data-node-id="2379:649">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <img
                src={cornerTl}
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[0.5px] left-[0.51px] size-[4px]">
        <div className="absolute inset-[0_0_-12.5%_-12.5%]">
          <img
            src={cornerTl}
            alt=""
            className="block size-full max-w-none"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}

export function PlatformScaleCarousel() {
  const [activeIndex, setActiveIndex] = useState(DEFAULT_GPX_INDEX);

  const activeProduct = GPX_PRODUCTS[activeIndex];

  const goPrevious = useCallback(() => {
    setActiveIndex((current) =>
      (current - 1 + GPX_PRODUCTS.length) % GPX_PRODUCTS.length
    );
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % GPX_PRODUCTS.length);
  }, []);

  return (
    <>
      <div className="absolute inset-0 [isolation:isolate]">
        {GPX_PRODUCTS.map((product, index) => {
          const offset = wrapOffset(index - activeIndex);

          return (
            <CarouselChipItem
              key={product.id}
              product={product}
              offset={offset}
            />
          );
        })}
      </div>

      <PlatformScaleStatPanel product={activeProduct} />

      <button
        type="button"
        onClick={goPrevious}
        className="absolute top-[72%] left-[26.6%] z-40 size-[44px]"
        data-node-id="2388:326"
        data-name="Menu"
        aria-label="Previous GPX product"
      >
        <img
          alt=""
          src="/platform-scale/nav-left.svg"
          className="absolute inset-0 block size-full max-w-none"
          aria-hidden
        />
      </button>
      <button
        type="button"
        onClick={goNext}
        className="absolute top-[72%] left-[calc(73.5%-44px)] z-40 size-[44px]"
        data-node-id="2388:319"
        data-name="Menu"
        aria-label="Next GPX product"
      >
        <img
          alt=""
          src="/platform-scale/nav-right.svg"
          className="absolute inset-0 block size-full max-w-none"
          aria-hidden
        />
      </button>
    </>
  );
}
