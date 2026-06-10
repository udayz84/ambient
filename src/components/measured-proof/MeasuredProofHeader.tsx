import Image from "next/image";
import { TagBadge } from "../hero/TagBadge";
import { gilroyMedium } from "../hero/fonts";

export function MeasuredProofHeader() {
  return (
    <div
      className="absolute top-[30px] left-1/2 flex w-[748px] -translate-x-1/2 flex-col content-stretch items-center gap-[16px]"
      data-node-id="2379:1470"
    >
      <TagBadge
        label="Real-time AI at edge"
        width={180}
        labelOffsetX={74.5}
        rightBarLeft={170.48046875}
      />

      <div
        className="relative inline-grid shrink-0 grid-cols-[max-content] grid-rows-[max-content] place-items-start leading-[0]"
        data-node-id="2379:1479"
        data-name="Group 78"
      >
        <h2
          className={`${gilroyMedium.className} relative col-start-1 row-start-1 mt-[7px] ml-[39.5px] bg-clip-text text-center text-[46px] leading-[49px] font-medium whitespace-nowrap text-[transparent] [word-break:break-word] not-italic`}
          style={{
            backgroundImage:
              "linear-gradient(124.568deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
          }}
          data-node-id="2379:1480"
        >
          Measured proof in silicon
        </h2>

        <div className="relative col-start-1 row-start-1 mt-0 ml-[603px] flex size-[4px] items-center justify-center">
          <div className="rotate-180 flex-none">
            <div className="relative size-[4px]">
              <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                <Image
                  src="/hero/corner-tag-2.svg"
                  alt=""
                  width={4}
                  height={4}
                  className="block size-[4px] max-w-none"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative col-start-1 row-start-1 mt-[70px] ml-[603px] flex size-[4px] items-center justify-center">
          <div className="-scale-y-100 rotate-180 flex-none">
            <div className="relative size-[4px]">
              <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                <Image
                  src="/hero/corner-tag-2.svg"
                  alt=""
                  width={4}
                  height={4}
                  className="block size-[4px] max-w-none"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative col-start-1 row-start-1 mt-[70px] ml-0 size-[4px]">
          <div className="absolute inset-[0_0_-12.5%_-12.5%]">
            <Image
              src="/hero/corner-tag-1.svg"
              alt=""
              width={4}
              height={4}
              className="block size-[4px] max-w-none"
              aria-hidden
            />
          </div>
        </div>
        <div className="relative col-start-1 row-start-1 mt-0 ml-0 flex size-[4px] items-center justify-center">
          <div className="-scale-y-100 flex-none">
            <div className="relative size-[4px]">
              <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                <Image
                  src="/hero/corner-tag-1.svg"
                  alt=""
                  width={4}
                  height={4}
                  className="block size-[4px] max-w-none"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
