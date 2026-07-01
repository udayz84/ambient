"use client";

import { Fragment } from "react";
import { interRegular } from "../hero/fonts";
import { APPLICATION_TABS } from "./applications-data";
import { Corners } from "../shared/Corners";

const tabCornerTl = "/applications/corners/tab-corner-tl.svg";
const tabCornerTr = "/applications/corners/tab-corner-tr.svg";

type ApplicationsCategoryNavProps = {
  activeIndex: number;
  onTabClick: (index: number) => void;
  onShift: (dir: -1 | 1) => void;
};

export function CategoryDivider({
  variant = "normal",
}: {
  variant?: "normal" | "before-active" | "after-active";
}) {
  const segments =
    variant === "before-active"
      ? [
          { height: 4, color: "bg-[#333333]" },
          { height: 5, color: "bg-[#333333]" },
          { height: 6, color: "bg-[#333333]" },
          { height: 7, color: "bg-white/70" },
          { height: 8, color: "bg-white" },
        ]
      : variant === "after-active"
      ? [
          { height: 8, color: "bg-white" },
          { height: 7, color: "bg-white/70" },
          { height: 6, color: "bg-[#333333]" },
          { height: 5, color: "bg-[#333333]" },
          { height: 4, color: "bg-[#333333]" },
        ]
      : [
          { height: 8, color: "bg-[#333333]" },
          { height: 8, color: "bg-[#333333]" },
          { height: 8, color: "bg-[#333333]" },
          { height: 8, color: "bg-[#333333]" },
          { height: 8, color: "bg-[#333333]" },
        ];

  return (
    <div className="flex shrink-0 items-center gap-[8.36px]" aria-hidden>
      {segments.map((seg, i) => (
        <span
          key={i}
          className={`w-px ${seg.color}`}
          style={{ height: `${seg.height}px` }}
        />
      ))}
    </div>
  );
}

export function ApplicationsCategoryNav({
  activeIndex,
  onTabClick,
  onShift,
}: ApplicationsCategoryNavProps) {
  return (
    <div
      className="absolute top-[199.7783203125px] left-1/2 flex h-[52px] w-max -translate-x-1/2 items-center gap-[12px]"
      data-node-id="2379:851"
      data-name="Options"
    >
      <button
        type="button"
        onClick={() => onShift(-1)}
        className="relative size-[44px] shrink-0 cursor-pointer transition-opacity hover:opacity-80"
        data-node-id="2379:852"
        data-name="Menu"
        aria-label="Scroll categories left"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src="/applications/nav-arrow-left.svg"
          className="absolute inset-0 block size-full max-w-none"
        />
      </button>

      {APPLICATION_TABS.map((label, index) => {
        const isActive = index === activeIndex;
        const dividerVariant =
          index === activeIndex
            ? "before-active"
            : index === activeIndex + 1
            ? "after-active"
            : "normal";

        return (
          <Fragment key={label}>
            <CategoryDivider variant={dividerVariant} />
            <button
              type="button"
              onClick={() => onTabClick(index)}
              className={`${interRegular.className} relative flex h-[52px] shrink-0 cursor-pointer items-center justify-center px-[12px] text-[16px] leading-[24px] font-normal whitespace-nowrap not-italic transition-colors ${
                isActive ? "text-[#0e1a0e]" : "text-[#666] hover:text-[#aaa]"
              }`}
            >
              {isActive ? (
                <span className="pointer-events-none absolute inset-y-[4px] inset-x-[6px] bg-[#f0f0f0]">
                  <Corners leftSrc={tabCornerTl} rightSrc={tabCornerTr} />
                </span>
              ) : null}
              <span className="relative">{label}</span>
            </button>
          </Fragment>
        );
      })}
      <CategoryDivider
        variant={
          activeIndex === APPLICATION_TABS.length - 1
            ? "after-active"
            : "normal"
        }
      />

      <button
        type="button"
        onClick={() => onShift(1)}
        className="relative size-[44px] shrink-0 cursor-pointer transition-opacity hover:opacity-80"
        data-node-id="2379:910"
        data-name="Menu"
        aria-label="Scroll categories right"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src="/applications/nav-arrow-right.svg"
          className="absolute inset-0 block size-full max-w-none"
        />
      </button>
    </div>
  );
}
