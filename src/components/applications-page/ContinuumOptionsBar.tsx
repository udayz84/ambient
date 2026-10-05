/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef } from "react";
import { interRegular } from "../hero/fonts";

/* Options bar — Figma 4574:7552 (desktop) / 4583:25149 (mobile ruler).
   Selected item: #f0f0f0 box + green corner brackets + #0e1a0e label.
   Labels come from the Strapi continuum cards (defaults below when the CMS
   has none). Buttons auto-size to their label so any product name fits. */
const DEFAULT_ITEMS = [
  { label: "GPX10PRO", nodeId: "4574:7553" },
  { label: "GPX64", nodeId: "4574:7564" },
  { label: "GPX256", nodeId: "4574:7571" },
  { label: "GPX2000", nodeId: "4574:7578" },
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
  labels,
}: {
  selected: number;
  onSelect: (index: number) => void;
  isMobile?: boolean;
  labels?: string[];
}) {
  const items = (labels?.length ? labels : DEFAULT_ITEMS.map((i) => i.label)).map(
    (label, i) => ({ label, nodeId: DEFAULT_ITEMS[i]?.nodeId ?? `item-${i}` })
  );
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
        {items.map((item, i) => {
          const isSelected = i === selected;
          return (
            <div key={item.label} className="contents">
              <button
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => onSelect(i)}
                className={`relative flex h-[36px] shrink-0 cursor-pointer items-center justify-center px-[14px] transition-colors duration-200 ${
                  isSelected ? "bg-[#f0f0f0]" : "bg-transparent"
                }`}
              >
                <span
                  className={` min-[1024px]:text-[16px] min-[1024px]:leading-[24px]${interRegular.className} text-[14px] leading-[21px] font-normal whitespace-nowrap not-italic transition-colors duration-200 ${
                    isSelected ? "text-[#0e1a0e]" : "text-[#666666]"
                  }`}
                >
                  {item.label}
                </span>
                {isSelected && <MobileCornerBrackets />}
              </button>
              {i < M_AFTER_ITEM_TICKS.length && i < items.length - 1 && (
                <TickGroup heights={M_AFTER_ITEM_TICKS[i]} />
              )}
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
      {items.map((item, i) => {
        const isSelected = i === selected;
        return (
          <div key={item.nodeId} className="contents">
            <button
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelect(i)}
              className={`relative flex h-[52px] shrink-0 cursor-pointer items-center justify-center px-[24px] transition-colors duration-200 ${
                isSelected ? "bg-[#f0f0f0]" : "bg-transparent"
              }`}
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
            {!isMobile && i < TICKS.length && i < items.length - 1 &&
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
