/* eslint-disable @next/next/no-img-element */
"use client";

import { interRegular } from "../hero/fonts";

/* Options bar — Figma 4574:7552.
   Selected item: #f0f0f0 box + green corner brackets + #0e1a0e label.
   Box widths are fixed per item (as in Figma) so ticks never reflow. */
const ITEMS = [
  { label: "GPX10PRO", width: 107, nodeId: "4574:7553" },
  { label: "GPX64", width: 93, nodeId: "4574:7564" },
  { label: "GPX256", width: 102, nodeId: "4574:7571" },
  { label: "GPX2000", width: 112, nodeId: "4574:7578" },
  { label: "GPX8000", width: 113, nodeId: "4574:7585" },
];

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
      <img
        alt=""
        aria-hidden
        src="/applications/opt-corner-1.svg"
        className="absolute left-[0.81px] top-[5px] size-[4px] max-w-none -scale-y-100"
      />
      <img
        alt=""
        aria-hidden
        src="/applications/opt-corner-2.svg"
        className="absolute left-[calc(100%-1.19px)] top-[5px] size-[4px] max-w-none rotate-180"
      />
      <img
        alt=""
        aria-hidden
        src="/applications/opt-corner-2.svg"
        className="absolute bottom-[1px] left-[calc(100%-1.19px)] size-[4px] max-w-none -scale-y-100 rotate-180"
      />
      <img
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
}: {
  selected: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div
      className="absolute left-[98px] top-[166px] flex h-[52px] w-[1244px] items-center justify-between"
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
              className={`relative flex h-[52px] shrink-0 cursor-pointer items-center justify-center transition-colors duration-200 ${
                isSelected ? "bg-[#f0f0f0]" : "bg-transparent"
              }`}
              style={{ width: item.width }}
              data-node-id={item.nodeId}
            >
              <span
                className={`${interRegular.className} whitespace-nowrap text-[16px] font-normal leading-[24px] not-italic transition-colors duration-200 ${
                  isSelected ? "text-[#0e1a0e]" : "text-[#666666]"
                }`}
              >
                {item.label}
              </span>
              {isSelected && <CornerBrackets />}
            </button>
            {i < TICKS.length &&
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
