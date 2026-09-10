"use client";

import Image from "next/image";
import { interRegular } from "./fonts";

const NEXT_SECTION_ID = "measured-proof";

export function HeroScrollIndicator({ scrollText = "SCROLL" }: { scrollText?: string }) {
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
      className={`${interRegular.className} absolute top-[696px] left-[1335.5px] flex h-[75px] w-[18px] flex-col content-stretch items-center gap-[10px] cursor-pointer border-0 bg-transparent p-0`}
      data-node-id="2379:777"
      data-name="Frame 1000003871"
      aria-label="Scroll to next section"
    >
      <div
        className="relative size-[18px] shrink-0 overflow-clip"
        data-node-id="2379:778"
        data-name="mouse-01"
      >
        <div
          className="absolute inset-[8.33%_18.75%]"
          data-name="elements"
        >
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
            className="relative h-full w-[47px] text-[12px] leading-[1.4] font-normal text-[#505f4b] [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden not-italic"
            data-node-id="2379:779"
          >
            {scrollText}
          </p>
        </div>
      </div>
    </button>
  );
}
