/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef } from "react";
import { interRegular } from "../hero/fonts";

/* Options bar — Figma 4574:7552 (desktop) / 4583:25149 (mobile ruler).
   Selected item: #f0f0f0 box + green corner brackets + #0e1a0e label.
   Box widths are fixed per item (as in Figma) so ticks never reflow. */
const ITEMS = [
  { label: "GPX10PRO", width: 107, nodeId: "4574:7553" },
  { label: "GPX64", width: 93, nodeId: "4574:7564" },
  { label: "GPX256", width: 102, nodeId: "4574:7571" },
  { label: "GPX2000", width: 112, nodeId: "4574:7578" },
  { label: "GPX8000", width: 113, nodeId: "4574:7585" },
];

/* Mobile ruler — Figma 4583:25149: exact chip widths + tick heights.
   Layout rhythm: flex gap-[11.18px], ticks inside groups gap-[10.18px],
   which reproduces the design x-positions exactly (Cta 55.9, GPX64 220,
   GPX256 361). */
const M_ITEMS = [
  { label: "GPX10PRO", width: 97 },
  { label: "GPX64", width: 74 },
  { label: "GPX256", width: 83 },
  { label: "GPX2000", width: 98 },
  { label: "GPX8000", width: 99 },
];
const M_LEADING_TICKS = [4, 5, 6, 7, 8];
const M_TRAILING_TICKS = [8, 8, 8, 8, 8];
const M_AFTER_ITEM_TICKS: number[][] = [
  [8, 7, 6, 5, 4],
  [8, 8, 8, 8, 8],
  [8, 8, 8, 8, 8],
  [8, 8, 8, 8, 8],
];

function MobileCornerBrackets() {
  return (
    <>
      <img loading="lazy" decoding="async"
        alt=""
        aria-hidden
        src="/applications/opt-corner-1.svg"
        className="absolute left-[-0.14px] top-0 size-[4px] max-w-none -scale-y-100"
      />
      <img loading="lazy" decoding="async"
        alt=""
        aria-hidden
        src="/applications/opt-corner-2.svg"
        className="absolute right-[-1.19px] top-0 size-[4px] max-w-none rotate-180"
      />
      <img loading="lazy" decoding="async"
        alt=""
        aria-hidden
        src="/applications/opt-corner-2.svg"
        className="absolute right-[-1.19px] bottom-0 size-[4px] max-w-none -scale-y-100 rotate-180"
      />
      <img loading="lazy" decoding="async"
        alt=""
        aria-hidden
        src="/applications/opt-corner-1.svg"
        className="absolute bottom-0 left-[-0.14px] size-[4px] max-w-none"
      />
    </>
  );
}

function TickGroup({ heights }: { heights: number[] }) {
  return (
    <div aria-hidden className="flex shrink-0 items-center gap-[10.18px]">
      {heights.map((h, j) => (
        <div
          key={j}
          className="w-px shrink-0 rounded-full bg-[#333333]"
          style={{ height: h }}
        />
      ))}
    </div>
  );
}

/* Tick groups between items: flat 8s, ascending, descending, flat 8s */
const TICKS: number[][] = [
  [8, 8, 8, 8, 8],
  [4, 5, 6, 7, 8],
  [8, 7, 6, 5, 4],
  [8, 8, 8, 8, 8],
];

function CornerBrackets() {
  return (
    <>
      <img loading="lazy" decoding="async"
        alt=""
        aria-hidden
        src="/applications/opt-corner-1.svg"
        className="absolute left-[0.81px] top-[5px] size-[4px] max-w-none -scale-y-100"
      />
      <img loading="lazy" decoding="async"
        alt=""
        aria-hidden
        src="/applications/opt-corner-2.svg"
        className="absolute left-[calc(100%-1.19px)] top-[5px] size-[4px] max-w-none rotate-180"
      />
      <img loading="lazy" decoding="async"
        alt=""
        aria-hidden
        src="/applications/opt-corner-2.svg"
        className="absolute bottom-[1px] left-[calc(100%-1.19px)] size-[4px] max-w-none -scale-y-100 rotate-180"
      />
      <img loading="lazy" decoding="async"
        alt=""
        aria-hidden
        src="/applications/opt-corner-1.svg"
        className="absolute bottom-[1px] left-[0.81px] size-[4px] max-w-none"
      />
    </>
  );
}

export function ContinuumOptionsBar({
  selected,
  onSelect,
  isMobile = false,
}: {
  selected: number;
  onSelect: (index: number) => void;
  isMobile?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile && containerRef.current) {
      const activeBtn = containerRef.current.querySelector('[aria-selected="true"]');
      if (activeBtn) {
        // Scroll the parent container smoothly
        const parent = containerRef.current.parentElement;
        if (parent) {
          const parentRect = parent.getBoundingClientRect();
          const btnRect = activeBtn.getBoundingClientRect();
          const scrollLeft = parent.scrollLeft + (btnRect.left - parentRect.left) - (parentRect.width / 2) + (btnRect.width / 2);
          parent.scrollTo({ left: scrollLeft, behavior: "smooth" });
        }
      }
    }
  }, [selected, isMobile]);

  /* Mobile ruler — Figma 4583:25149 */
  if (isMobile) {
    return (
      <div
        ref={containerRef}
        className="relative flex h-[36px] w-max items-center gap-[11.18px]"
        data-node-id="4583:25149"
        data-name="Options"
        role="tablist"
        aria-label="Continuum options"
      >
        <TickGroup heights={M_LEADING_TICKS} />
        {M_ITEMS.map((item, i) => {
          const isSelected = i === selected;
          return (
            <div key={item.label} className="contents">
              <button
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => onSelect(i)}
                className={`relative flex h-[36px] shrink-0 cursor-pointer items-center justify-center transition-colors duration-200 ${
                  isSelected ? "bg-[#f0f0f0]" : "bg-transparent px-[14px]"
                }`}
                style={{ width: isSelected ? item.width : undefined }}
              >
                <span
                  className={`${interRegular.className} text-[14px] leading-[21px] font-normal whitespace-nowrap not-italic transition-colors duration-200 ${
                    isSelected ? "text-[#0e1a0e]" : "text-[#666666]"
                  }`}
                >
                  {item.label}
                </span>
                {isSelected && <MobileCornerBrackets />}
              </button>
              {i < M_AFTER_ITEM_TICKS.length && <TickGroup heights={M_AFTER_ITEM_TICKS[i]} />}
            </div>
          );
        })}
        <TickGroup heights={M_TRAILING_TICKS} />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center ${
        isMobile
          ? "w-max h-[40px] justify-start gap-[14px] px-[20px]"
          : "h-[52px] w-[1244px] justify-between"
      }`}
      data-node-id="4574:7552"
      data-name="Options"
      role="tablist"
      aria-label="Continuum options"
    >
      {ITEMS.map((item, i) => {
        const isSelected = i === selected;
        return (
          <div key={item.nodeId} className="contents">
            <button
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelect(i)}
              className={`relative flex shrink-0 cursor-pointer items-center justify-center transition-colors duration-200 ${
                isSelected ? "bg-[#f0f0f0]" : "bg-transparent"
              } ${isMobile ? "h-[36px] px-[16px] rounded-[4px]" : "h-[52px]"}`}
              style={!isMobile ? { width: item.width } : {}}
              data-node-id={item.nodeId}
            >
              <span
                className={`${interRegular.className} whitespace-nowrap font-normal not-italic transition-colors duration-200 ${
                  isMobile ? "text-[14px] leading-[20px]" : "text-[16px] leading-[24px]"
                } ${isSelected ? "text-[#0e1a0e]" : "text-[#666666]"}`}
              >
                {item.label}
              </span>
              {isSelected && !isMobile && <CornerBrackets />}
            </button>
            {!isMobile && i < TICKS.length &&
              TICKS[i].map((h, j) => (
                <div
                  key={`${i}-${j}`}
                  aria-hidden
                  className="w-px shrink-0 rounded-full bg-[#333333]"
                  style={{ height: h }}
                />
              ))}
          </div>
        );
      })}
    </div>
  );
}
