"use client";

import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { mediaUrl } from "@/lib/strapi";
import { useFitText } from "../shared/FitText";

const TITLE_GRADIENT =
  "linear-gradient(117.952deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

/* --- Containers copied from the technology page "paradigm shift" section --- */

const CHEVRON_LARGE = "/technology/chevron-large.svg";
const CHEVRON_MID = "/technology/chevron-mid.svg";
const CHEVRON_SMALL = "/technology/chevron-small.svg";
const CHEVRON_DOT = "/technology/chevron-dot.svg";




function ChevronDecor() {
  return (
    <>
      <div
        className="animate-technology-chevron-flow absolute top-[212.42px] left-[703.88px] h-[97.26px] w-[47.33px]"
        style={{ animationDelay: "0s" }}
      >
        <div className="absolute inset-[-12.8%_-22.81%_-12.8%_-30.55%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async" src={CHEVRON_LARGE} alt="" className="block size-full max-w-none" />
        </div>
      </div>
      <div
        className="animate-technology-chevron-flow absolute top-[243.96px] left-[712.23px] h-[34.17px] w-[16.63px]"
        style={{ animationDelay: "-0.25s" }}
      >
        <div className="absolute inset-[-1.02%_-4.2%_-1.02%_-2.16%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async" src={CHEVRON_MID} alt="" className="block size-full max-w-none" />
        </div>
      </div>
      <div
        className="animate-technology-chevron-flow absolute top-[250.66px] left-[695.08px] h-[23.88px] w-[11.62px]"
        style={{ animationDelay: "-0.5s" }}
      >
        <div className="absolute inset-[-1.46%_-6.01%_-1.46%_-3.09%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async" src={CHEVRON_SMALL} alt="" className="block size-full max-w-none" />
        </div>
      </div>
      <div
        className="animate-technology-chevron-flow absolute top-[254.56px] left-[681.14px] h-[16.06px] w-[7.82px] mix-blend-luminosity"
        style={{ animationDelay: "-0.75s" }}
      >
        <div className="absolute inset-[-2.18%_-8.93%_-2.17%_-4.6%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async" src={CHEVRON_DOT} alt="" className="block size-full max-w-none" />
        </div>
      </div>
    </>
  );
}

/* --- End of copied technology page containers --- */

export function WearablesParadigm({ data }: { data?: any }) {
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 1 });
  const fitRef2 = useFitText<HTMLHeadingElement>({ maxLines: 2 });

  const subtitle = data?.subtitle || "";
  const heading = data?.heading || "";
  const leftImage = mediaUrl(data?.left_image) || "/applications/wearables/legacy-way-box.jpg";
  const rightImage = mediaUrl(data?.right_image) || "/applications/wearables/ambient-way-box.jpg";
  const leftAlt = data?.left_image?.alternativeText || "The Legacy Way";
  const rightAlt = data?.right_image?.alternativeText || "The Ambient Way";

  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="2509:469"
      data-name="The Paradigm Shift"
      aria-label="The Paradigm Shift"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden w-full max-w-[1440px] flex-col items-center gap-[48px] pt-[20px] pb-[100px] min-[1024px]:flex">
        {/* Headings */}
        <div className="flex flex-col items-center gap-[24px]">
          <div className="relative flex flex-col items-center px-[10px]">
            <h2
              ref={fitRef}
              className={`${gilroyMedium.className} bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent whitespace-nowrap not-italic [word-break:break-word]`}
              style={{
                backgroundImage: TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              data-node-id="2509:472"
            >
              {heading}
            </h2>
            <Corners
              leftSrc="/applications/wearables/vector-42.svg"
              rightSrc="/applications/wearables/vector-43.svg"
            />
          </div>
          <p
            className={`${interRegular.className} w-[679.389px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
            data-node-id="2509:477"
          >
            {subtitle}
          </p>
        </div>

        {/* Replaced with direct image inserts */}
        <div className="relative h-[548px] w-full">
          <div className="absolute left-[111px] top-[0px] w-[575px] h-[548px] flex items-center justify-center">
            <img src={leftImage} alt={leftAlt} className="w-full h-full object-contain rounded-[16px]" />
          </div>
          <ChevronDecor />
          <div className="absolute left-[754px] top-[0px] w-[575px] h-[548px] flex items-center justify-center">
            <img src={rightImage} alt={rightAlt} className="w-full h-full object-contain rounded-[16px]" />
          </div>
        </div>
      </div>

      {/* MOBILE (<1024px) */}
      <div className="relative flex w-full flex-col items-center gap-[24px] px-[20px] pt-[30px] pb-[72px] min-[1024px]:hidden">

        {/* Headings */}
        <div className="relative z-10 flex flex-col items-center gap-[10px]">
          <div className="relative h-[80px] w-[356px]">
            <h2
              ref={fitRef2}
              className={`${gilroyMedium.className} absolute inset-0 flex items-center justify-center bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: "linear-gradient(107.4537261117953deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {heading}
            </h2>
            <Corners
              leftSrc="/applications/wearables/vector-42.svg"
              rightSrc="/applications/wearables/vector-43.svg"
            />
          </div>
          <p
            className={`${interRegular.className} w-[324px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
          >
            {subtitle}
          </p>
        </div>

        {/* Replaced with direct image inserts */}
        <div className="flex w-full flex-col items-center gap-[40px]">
          <div className="w-full max-w-[575px]">
            <img src={leftImage} alt={leftAlt} className="w-full h-auto object-contain rounded-[16px]" />
          </div>
          <div className="w-full max-w-[575px]">
            <img src={rightImage} alt={rightAlt} className="w-full h-auto object-contain rounded-[16px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
