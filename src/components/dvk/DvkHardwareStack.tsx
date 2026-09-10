"use client";

/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
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

const DEFAULT_HEADING =
  "The complete Edge AI hardware stack in a single footprint";
const DEFAULT_SUBTITLE =
  "An exhaustive suite of sensors, interfaces, and debug tools pre-integrated with the GPX-10 Pro AI Processor.";
const DEFAULT_LABEL = "The Hardware Blueprint";

const BOARD_IMAGE = "/dvk/inside-module/dvk-board.webp";
const COLORFUL_BOARD = "/dvk/board-stack.webp";
const HIGHLIGHT_FILL = "/dvk/inside-module/dvk-fill.webp";
const SENSORS_VECTOR = "/dvk/inside-module/dvk-v101.webp";
const INTERFACES_VECTOR = "/dvk/inside-module/dvk-v102.png";

const RECT_BORDER =
  "border-[1.09px] border-[#47b81f] border-solid shadow-[0px_7px_7.1px_0px_rgba(111,224,71,0.3)]";

export function DvkHardwareStack({ data }: { data?: any }) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const heading = data?.heading || DEFAULT_HEADING;
  const subtitle = data?.subtitle || DEFAULT_SUBTITLE;
  const label = data?.label || DEFAULT_LABEL;
  const source: any[] = Array.isArray(data?.spec_cards) ? data.spec_cards : [];
  const cards: SpecCardType[] = SPEC_CARDS.map((def, i) => {
    const c = source[i];
    if (!c) return def;
    return {
      title: c?.title || def.title,
      items:
        c?.items && c.items.length > 0
          ? c.items.split("\n").filter(Boolean)
          : def.items,
      accent: c?.is_accent === true,
    };
  });

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
            {heading}
          </h2>
        </div>

        <p
          className={`${interRegular.className} text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic`}
          style={{ width: 618.2734375, opacity: 0.65 }}
        >
          {subtitle}
        </p>
      </div>

      {/* Content (Figma 2761:2915) */}
      <div className="flex w-full items-center justify-center gap-[24px]">
        {/* Feature card (Board Image) */}
        <div
          className="relative flex min-w-px flex-1 flex-col items-center justify-center gap-[20px] self-stretch overflow-clip border-[0.5px] border-solid p-[16px]"
          style={{
            backgroundColor: FEATURE_CARD_BG,
            borderColor: CARD_BORDER,
          }}
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          {/* Figma 4049:8277 — DVK Board 1 (605x566) */}
          <div className="relative h-[566px] w-[605px] shrink-0 overflow-hidden">
            <div className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out ${hoveredIndex === -1 ? "opacity-100" : "opacity-0"}`}>
              <img loading="lazy" decoding="async"
                alt=""
                src={COLORFUL_BOARD}
                className="absolute inset-0 size-full max-w-none object-bottom"
              />
            </div>
            <div className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out ${hoveredIndex !== -1 ? "opacity-100" : "opacity-0"}`}>
              <img loading="lazy" decoding="async"
                alt=""
                src={BOARD_IMAGE}
                className="absolute inset-0 size-full max-w-none object-bottom"
              />
            </div>

            {/* Memory (cards[0]) — variant 4448:8597 / A. */}
            <div
              className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out ${hoveredIndex === 0 ? "opacity-100" : "opacity-0"}`}
            >
              <div
                className={`absolute left-[62px] top-[225px] h-[58px] w-[56px] ${RECT_BORDER}`}
              >
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <img loading="lazy" decoding="async"
                    alt=""
                    aria-hidden
                    src={HIGHLIGHT_FILL}
                    className="absolute h-[1015.28%] left-[-117.41%] top-[-408.32%] w-[1128.65%] max-w-none"
                  />
                </div>
              </div>
            </div>

            {/* Wireless (cards[1]) — variant 4448:8595 / B. */}
            <div
              className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out ${hoveredIndex === 1 ? "opacity-100" : "opacity-0"}`}
            >
              <div
                className={`absolute left-[147px] top-[484px] h-[78px] w-[76px] ${RECT_BORDER}`}
              >
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <img loading="lazy" decoding="async"
                    alt=""
                    aria-hidden
                    src={HIGHLIGHT_FILL}
                    className="absolute h-[795.76%] left-[-220.03%] top-[-689.18%] w-[877.84%] max-w-none"
                  />
                </div>
              </div>
            </div>

            {/* Sensors (cards[2]) — variant 4448:8596 / C. */}
            <div
              className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out ${hoveredIndex === 2 ? "opacity-100" : "opacity-0"}`}
            >
              <div
                className={`absolute left-[168px] top-[95px] h-[104px] w-[65px] ${RECT_BORDER}`}
              >
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <img loading="lazy" decoding="async"
                    alt=""
                    aria-hidden
                    src={HIGHLIGHT_FILL}
                    className="absolute h-[605.21%] left-[-300.38%] top-[-100.65%] w-[1038.72%] max-w-none"
                  />
                </div>
              </div>
              <div className="absolute left-[268px] top-[34px] h-[249px] w-[253px]">
                <div className="absolute inset-[-0.48%_-3.24%_-6.1%_-3.24%]">
                  <img loading="lazy" decoding="async"
                    alt=""
                    aria-hidden
                    src={SENSORS_VECTOR}
                    className="block size-full max-w-none"
                  />
                </div>
              </div>
            </div>

            {/* Debug Ports (cards[3]) — variant 4448:8598 / D. */}
            <div
              className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out ${hoveredIndex === 3 ? "opacity-100" : "opacity-0"}`}
            >
              <div
                className={`absolute left-[543px] top-[298px] h-[185px] w-[51px] ${RECT_BORDER}`}
              >
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <img loading="lazy" decoding="async"
                    alt=""
                    aria-hidden
                    src={HIGHLIGHT_FILL}
                    className="absolute h-[322.44%] left-[-1132.84%] top-[-174.81%] w-[1254.67%] max-w-none"
                  />
                </div>
              </div>
              <div
                className={`absolute left-[74px] top-[16px] h-[49px] w-[62px] ${RECT_BORDER}`}
              >
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <img loading="lazy" decoding="async"
                    alt=""
                    aria-hidden
                    src={HIGHLIGHT_FILL}
                    className="absolute h-[1325.6%] left-[-142.11%] top-[-38.17%] w-[1122.6%] max-w-none"
                  />
                </div>
              </div>
            </div>

            {/* Interfaces (cards[4]) — variant 4448:8599 / E. */}
            <div
              className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out ${hoveredIndex === 4 ? "opacity-100" : "opacity-0"}`}
            >
              <div
                className={`absolute left-[245px] top-[493px] h-[36px] w-[68px] ${RECT_BORDER}`}
              >
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <img loading="lazy" decoding="async"
                    alt=""
                    aria-hidden
                    src={HIGHLIGHT_FILL}
                    className="absolute h-[1657%] left-[-384.86%] top-[-1446.74%] w-[941%] max-w-none"
                  />
                </div>
              </div>
              <div
                className={`absolute left-[10px] top-[420px] h-[55px] w-[47px] ${RECT_BORDER}`}
              >
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <img loading="lazy" decoding="async"
                    alt=""
                    aria-hidden
                    src={HIGHLIGHT_FILL}
                    className="absolute h-[1125.51%] left-[-25.72%] top-[-838.53%] w-[1421.96%] max-w-none"
                  />
                </div>
              </div>
              <div className="absolute left-[17.5px] top-[228.5px] h-[156.5px] w-[83px]">
                <div className="absolute inset-[-0.35%_-0.66%]">
                  <img loading="lazy" decoding="async"
                    alt=""
                    aria-hidden
                    src={INTERFACES_VECTOR}
                    className="block size-full max-w-none"
                  />
                </div>
              </div>
            </div>

            {/* MCU (cards[5]) — variant 4638:4404 / node 4638:4408 */}
            <div
              className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out ${hoveredIndex === 5 ? "opacity-100" : "opacity-0"}`}
            >
              <div
                className={`absolute left-[218px] top-[313px] h-[72px] w-[70px] ${RECT_BORDER}`}
              >
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <img loading="lazy" decoding="async"
                    alt=""
                    aria-hidden
                    src={HIGHLIGHT_FILL}
                    className="absolute h-[920.56%] left-[-371.89%] top-[-515.29%] w-[1011.36%] max-w-none"
                  />
                </div>
              </div>
            </div>

            {/* Booting (cards[6]) — variant 4638:7055 (Variant8) / nodes 4638:7059 + 4638:7153 */}
            <div
              className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out ${hoveredIndex === 6 ? "opacity-100" : "opacity-0"}`}
            >
              <div
                className={`absolute left-[60px] top-[228px] h-[57px] w-[58px] ${RECT_BORDER}`}
              >
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <img loading="lazy" decoding="async"
                    alt=""
                    aria-hidden
                    src={HIGHLIGHT_FILL}
                    className="absolute h-[1162.81%] left-[-129.73%] top-[-472.71%] w-[1220.61%] max-w-none"
                  />
                </div>
              </div>
              <div
                className={`absolute left-[474px] top-[311px] h-[76px] w-[60px] ${RECT_BORDER}`}
              >
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <img loading="lazy" decoding="async"
                    alt=""
                    aria-hidden
                    src={HIGHLIGHT_FILL}
                    className="absolute h-[872.1%] left-[-933.29%] top-[-487.42%] w-[1179.92%] max-w-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <p
            className={`${gilroyMedium.className} min-w-full w-[min-content] shrink-0 text-center text-[22px] leading-[28px] text-white not-italic`}
          >
            {label}
          </p>
        </div>

        {/* Spec cards column */}
        <div
          className="flex w-[571px] shrink-0 flex-col gap-[8px]"
          onMouseLeave={() => setHoveredIndex(-1)}
        >
          <div className="flex w-full gap-[8px]">
            <SpecCard
              card={cards[0]}
              isActive={hoveredIndex === 0}
              onHover={() => setHoveredIndex(0)}
            />
            <SpecCard
              card={cards[1]}
              isActive={hoveredIndex === 1}
              onHover={() => setHoveredIndex(1)}
            />
          </div>
          <div className="flex w-full gap-[8px]">
            <SpecCard
              card={cards[2]}
              isActive={hoveredIndex === 2}
              onHover={() => setHoveredIndex(2)}
            />
            <SpecCard
              card={cards[3]}
              isActive={hoveredIndex === 3}
              onHover={() => setHoveredIndex(3)}
            />
          </div>
          {/* Row 3 (Figma 4022:2660) — Interfaces + stacked MCU/Booting */}
          <div className="flex w-full gap-[8px]">
            <SpecCard
              card={cards[4]}
              isActive={hoveredIndex === 4}
              onHover={() => setHoveredIndex(4)}
            />
            <div className="flex min-w-px flex-1 flex-col items-start justify-center gap-[8px] self-stretch">
              <SpecCard
                card={cards[5]}
                stacked
                isActive={hoveredIndex === 5}
                onHover={() => setHoveredIndex(5)}
              />
              <SpecCard
                card={cards[6]}
                stacked
                isActive={hoveredIndex === 6}
                onHover={() => setHoveredIndex(6)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecCard({
  card,
  stacked = false,
  isActive = false,
  onHover,
}: {
  card: SpecCardType;
  stacked?: boolean;
  isActive?: boolean;
  onHover?: () => void;
}) {
  if (!card) return null;
  const active = isActive;
  return (
    <div
      onMouseEnter={onHover}
      className={`relative flex flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid px-[16px] pt-[16px] pb-[24px] transition-colors duration-300 ${
        stacked ? "min-h-px w-full flex-1" : "min-w-px flex-1"
      }`}
      style={{
        backgroundColor: active ? ACCENT_CARD_BG : CARD_BG,
        borderColor: active ? ACCENT_CARD_BORDER : CARD_BORDER,
      }}
    >
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      <div className="flex w-full flex-col items-start">
        <div className="flex w-full flex-col gap-[10px]">
          <p
            className={`${gilroyMedium.className} w-full shrink-0 text-[22px] leading-[28px] text-white not-italic overflow-hidden text-ellipsis whitespace-nowrap`}
          >
            {card.title}
          </p>
          <ul
            className={`${interRegular.className} list-disc text-[16px] leading-[0] font-normal text-[rgba(240,240,240,0.6)]`}
          >
            {card.items.map((item) => (
              <li key={item} className="ms-[24px]">
                <span className="leading-[24px] [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
