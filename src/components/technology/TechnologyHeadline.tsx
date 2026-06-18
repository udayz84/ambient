import Image from "next/image";
import { gilroyMedium } from "../hero/fonts";

export function TechnologyHeadline() {
  return (
    <div
      className="absolute top-[48.5px] left-[468.88720703125px] z-20 h-[126px] w-[497px]"
      data-name="Headline frame"
    >
      <div
        className="relative inline-grid w-full grid-cols-[max-content] grid-rows-[max-content] place-items-start leading-[0]"
        data-node-id="2379:1413"
      >
        <div className="relative col-start-1 row-start-1 mt-[14.5px] ml-[20.5px]">
          <h1
            className={`${gilroyMedium.className} bg-clip-text text-center text-[46px] leading-[0] font-medium text-[transparent] whitespace-nowrap [word-break:break-word] not-italic`}
            style={{
              backgroundImage:
                "linear-gradient(106.923deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
            }}
          >
            <p className="mb-0 leading-[49px] whitespace-pre">
              {`Re-architecting the `}
            </p>
            <p className="leading-[49px] whitespace-pre">physics of AI compute</p>
          </h1>
        </div>

        <div className="relative col-start-1 row-start-1 mt-0 ml-[493px] flex size-[4px] items-center justify-center">
          <div className="rotate-180 flex-none">
            <div className="relative size-[4px]" data-node-id="2379:1430">
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
        <div className="relative col-start-1 row-start-1 mt-[122px] ml-[493px] flex size-[4px] items-center justify-center">
          <div className="-scale-y-100 rotate-180 flex-none">
            <div className="relative size-[4px]" data-node-id="2379:1431">
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
        <div className="relative col-start-1 row-start-1 mt-[122px] ml-0 size-[4px]">
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
            <div className="relative size-[4px]" data-node-id="2379:1429">
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
