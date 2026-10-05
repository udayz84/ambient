"use client";

import Image from "next/image";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { useFitText } from "../shared/FitText";

const cornerLeft = "/hero/corner-tag-1.svg";
const cornerRight = "/hero/corner-tag-2.svg";

export function PlatformScaleHeader({ data }: { data?: any }) {
  const heading = data?.heading || "";
  const subtitle = data?.subtitle || "";
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 2 });
  
  // Clean up any stray literal newlines that might be in the CMS data
  const cleanHeading = heading.replace(/\\n/g, " ").replace(/\n/g, " ");

  return (
    <div
      className="absolute top-[160px] left-1/2 z-10 h-[151px] w-[607px] -translate-x-1/2"
      data-node-id="2379:619"
      data-name="Group 87"
    >
      <div
        className="relative inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start leading-[0] w-full"
        data-name="Headline frame"
      >
        <h2
          ref={fitRef}
          className={`${gilroyMedium.className} relative col-start-1 row-start-1 mt-[16px] justify-self-center bg-clip-text text-center text-[46px] leading-[49px] font-medium text-[transparent] not-italic [word-break:break-word] w-full max-w-[580px]`}
          style={{
            backgroundImage:
              "linear-gradient(100.945deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
          }}
        >
          {cleanHeading}
        </h2>

        {/* Top Right */}
        <div className="relative col-start-1 row-start-1 mt-[4px] ml-[607px] flex size-[4px] items-center justify-center">
          <div className="rotate-180 flex-none">
            <div className="relative size-[4px]">
              <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                <Image src={cornerRight} alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Right */}
        <div className="relative col-start-1 row-start-1 mt-[70px] ml-[607px] flex size-[4px] items-center justify-center">
          <div className="-scale-y-100 rotate-180 flex-none">
            <div className="relative size-[4px]">
              <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                <Image src={cornerRight} alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Left */}
        <div className="relative col-start-1 row-start-1 mt-[70px] ml-0 size-[4px]">
          <div className="absolute inset-[0_0_-12.5%_-12.5%]">
            <Image src={cornerLeft} alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
          </div>
        </div>
        {/* Top Left */}
        <div className="relative col-start-1 row-start-1 mt-[4px] ml-0 flex size-[4px] items-center justify-center">
          <div className="-scale-y-100 flex-none">
            <div className="relative size-[4px]">
              <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                <Image src={cornerLeft} alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </div>

      <p
        className={`${interRegular.className} absolute top-[100px] left-1/2 w-[600px] -translate-x-1/2 text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
        data-node-id="2379:625"
      >
        {subtitle}
      </p>
    </div>
  );
}
