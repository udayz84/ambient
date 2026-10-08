"use client";

import { gilroyMedium, interRegular } from "../hero/fonts";
import { useFitText } from "../shared/FitText";
import { Corners } from "../shared/Corners";

const cornerLeft = "/hero/corner-tag-1.svg";
const cornerRight = "/hero/corner-tag-2.svg";

export function DeveloperPlatformHeader({ data }: { data?: any }) {
  const heading = data?.heading || "";
  const subtitle = data?.subtitle || "";
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 2 });
  
  return (
    <div
      className="absolute top-0 left-1/2 z-10 flex w-full max-w-[604px] -translate-x-1/2 flex-col items-center"
      data-node-id="2379:1019"
      data-name="Group 88"
    >
      <div className="relative mt-[18px] px-[12px]" data-name="Headline frame">
        <h2
          ref={fitRef}
          className={`${gilroyMedium.className} bg-clip-text text-center text-[46px] leading-[49px] font-medium text-[transparent] not-italic [word-break:break-word]`}
          style={{
            backgroundImage:
              "linear-gradient(126.324deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
          }}
          data-node-id="2379:1020"
        >
          {heading}
        </h2>
        <Corners leftSrc={cornerLeft} rightSrc={cornerRight} />
      </div>

      <p
        className={`${interRegular.className} mt-[30px] w-full text-center text-[18px] leading-[27px] font-normal text-white not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
        data-node-id="2379:1025"
      >
        {subtitle}
      </p>
    </div>
  );
}
