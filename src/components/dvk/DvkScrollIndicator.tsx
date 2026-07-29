"use client";

import Image from "next/image";
import { interRegular } from "../hero/fonts";

const NEXT_SECTION_ID = "dvk-content";

/**
 * Figma 2761:3005 — mouse scroll indicator.
 * Position: 1335.387, 616.033 (18×75) within the 1442-wide hero canvas.
 */
export function DvkScrollIndicator() {
  const handleScroll = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    document.getElementById(NEXT_SECTION_ID)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <button
      type="button"
      onClick={handleScroll}
      className={`${interRegular.className} absolute flex h-[75px] w-[18px] cursor-pointer flex-col content-stretch items-center gap-[10px] border-0 bg-transparent p-0 z-50`}
      style={{
        bottom: 40,
        right: "max(24px, calc(50% - 633px))"
      }}
      data-node-id="2761:3005"
      data-name="Frame 1000003871"
      aria-label="Scroll to next section"
    >
      <div
        className="relative size-[18px] shrink-0 overflow-clip"
        data-node-id="2761:3006"
        data-name="mouse-01"
      >
        <div className="absolute inset-[8.33%_18.75%]" data-name="elements">
          <div className="absolute inset-[-5%_-6.67%]">
            <Image
              src="/hero/mouse-scroll.svg"
              alt=""
              width={18}
              height={18}
              className="block size-full max-w-none"
            />
          </div>
        </div>
      </div>
      <div
        className="relative flex h-[47px] min-w-full w-[min-content] shrink-0 items-center justify-center"
        style={{ containerType: "size" }}
      >
        <div className="h-[100cqw] flex-none rotate-90">
          <p
            className="relative h-full w-[47px] text-[12px] leading-[1.4] font-normal text-[#505f4b] [word-break:break-word] not-italic"
            data-node-id="2761:3007"
          >
            SCROLL
          </p>
        </div>
      </div>
    </button>
  );
}
