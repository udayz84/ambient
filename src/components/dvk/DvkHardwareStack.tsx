"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import {
  ACCENT_CARD_BG,
  ACCENT_CARD_BORDER,
  CARD_BG,
  CARD_BORDER,
  CORNER_LEFT,
  CORNER_RIGHT,
  FEATURE_CARD_BG,
  SECTION_TITLE_GRADIENT,
  SPEC_CARDS,
  type SpecCardType,
} from "./dvk-data";

// Refined coordinates (in percentages) for the highlight box on the board image
const HIGHLIGHT_REGIONS = [
  { left: "16%", top: "25%", width: "16%", height: "55%" }, // Memory (left chip clusters)
  { left: "68%", top: "12%", width: "10%", height: "15%" }, // Wireless (top right antenna area)
  { left: "34%", top: "15%", width: "12%", height: "15%" }, // Sensors (small components top middle-left)
  { left: "82%", top: "75%", width: "8%", height: "15%" }, // Debug Ports (bottom right headers/ports)
  { left: "91%", top: "15%", width: "6%", height: "70%" }, // Interfaces (far right edge pin rows)
];

export function DvkHardwareStack() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className="relative flex w-full flex-col items-center gap-[48px]"
      data-node-id="2761:2905"
    >
      {/* Header */}
      <div className="flex w-[800px] flex-col items-center gap-[24px]">
        <div
          className="relative px-[10px]"
          style={{ width: 729.6640625 }}
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} m-0 bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic`}
            style={{
              width: 709.6640625,
              backgroundImage: SECTION_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            The complete Edge AI hardware stack in a single footprint
          </h2>
        </div>

        <p
          className={`${interRegular.className} text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic`}
          style={{ width: 618.2734375, opacity: 0.65 }}
        >
          An exhaustive suite of sensors, interfaces, and debug tools
          pre-integrated with the GPX-10 Pro AI Processor.
        </p>
      </div>

      {/* Content */}
      <div className="flex w-full flex-col items-center justify-center gap-[24px]">
        {/* Feature card (Board Image) */}
        <div
          className="relative flex w-full flex-col items-center justify-center gap-[20px] overflow-clip border-[0.5px] border-solid p-[16px]"
          style={{
            backgroundColor: FEATURE_CARD_BG,
            borderColor: CARD_BORDER,
          }}
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <p
            className={`${gilroyMedium.className} min-w-full w-[min-content] shrink-0 text-center text-[22px] leading-[28px] text-white not-italic`}
          >
            The Hardware Blueprint
          </p>

          {/* Circuit board container */}
          <div className="relative h-[300px] w-[739.724px] shrink-0 overflow-hidden rounded-[7.572px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src="/dvk/board-main.png"
              className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[7.572px] object-bottom"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src="/dvk/board-chip.png"
              className="pointer-events-none absolute max-w-none rounded-[7.572px] object-bottom"
              style={{
                left: 263.37890625,
                top: 55.32421875,
                width: 221.3364715576172,
                height: 197.49679565429688,
              }}
            />

            {/* Dynamic Highlight Box */}
            <AnimatePresence>
              {hoveredIndex !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    left: HIGHLIGHT_REGIONS[hoveredIndex].left,
                    top: HIGHLIGHT_REGIONS[hoveredIndex].top,
                    width: HIGHLIGHT_REGIONS[hoveredIndex].width,
                    height: HIGHLIGHT_REGIONS[hoveredIndex].height,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="pointer-events-none absolute z-10 border border-[#a8ed90]/50 rounded-md"
                  style={{
                    boxShadow:
                      "0 0 0 9999px rgba(0, 0, 0, 0.75), 0 0 20px 2px rgba(168, 237, 144, 0.3), inset 0 0 12px 0 rgba(168, 237, 144, 0.2)",
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Spec cards row */}
        <div className="flex w-full items-stretch gap-[8px]">
          {SPEC_CARDS.map((card, idx) => (
            <SpecCard
              key={card.title}
              card={card}
              isHovered={hoveredIndex === idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SpecCard({
  card,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: {
  card: SpecCardType;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative flex min-w-px flex-1 flex-col items-center gap-[20px] self-stretch overflow-clip border-[0.5px] border-solid px-[16px] pt-[16px] pb-[24px] cursor-default transition-colors duration-300 ${
        isHovered
          ? "bg-[rgba(68,120,7,0.2)] border-[#a8ed90]"
          : "bg-[rgba(0,0,0,0.2)] border-[rgba(240,240,240,0.2)]"
      }`}
    >
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      <div className="flex w-full flex-col items-start">
        <div className="flex w-full flex-col gap-[10px]">
          <p
            className={`${gilroyMedium.className} w-full shrink-0 text-[22px] leading-[28px] text-white not-italic`}
          >
            {card.title}
          </p>
          <ul
            className={`${interRegular.className} list-disc text-[16px] leading-[0] font-normal text-[rgba(240,240,240,0.6)]`}
          >
            {card.items.map((item) => (
              <li key={item} className="ms-[24px]">
                <span className="leading-[24px]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
