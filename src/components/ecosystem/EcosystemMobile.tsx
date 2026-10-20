"use client";

import Image from "next/image";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { useFitText } from "../shared/FitText";
import { EcosystemPartners } from "./EcosystemPartners";

export function EcosystemMobile({ data }: { data?: any }) {
  const heading = data?.heading || "";
  const subtitle = data?.subtitle || "";
  const cta = data?.cta || {};
  const ctaLabel = cta.label || "";
  const ctaHref = cta.href || "";
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 2 });
  return (
    <div className="relative flex flex-col items-center py-[48px]">
      <div className="relative inline-flex flex-col items-center justify-center w-fit max-w-[350px] md:max-w-[600px] px-[16px] py-[12px]">
        <div className="absolute top-0 right-0 flex size-[4px] items-center justify-center">
          <div className="rotate-180 flex-none">
            <div className="relative size-[4px]">
              <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 flex size-[4px] items-center justify-center">
          <div className="-scale-x-100 flex-none">
            <div className="relative size-[4px]">
              <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 flex size-[4px] items-center justify-center">
          <div className="flex-none">
            <div className="relative size-[4px]">
              <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 flex size-[4px] items-center justify-center">
          <div className="-scale-y-100 flex-none">
            <div className="relative size-[4px]">
              <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
            </div>
          </div>
        </div>

        <h2
          ref={fitRef}
          className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] md:text-[44px] leading-[36px] md:leading-[48px] font-medium text-transparent [word-break:break-word] not-italic pb-[10px] -mb-[10px]`}
          style={{
            backgroundImage:
              "linear-gradient(107.454deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
          }}
        >
          {heading}
        </h2>
      </div>

      <p
        className={`${interRegular.className} mt-[24px] w-[356px] md:w-[600px] max-w-[calc(100vw-48px)] text-center text-[14px] md:text-[16px] leading-[22px] md:leading-[24px] font-normal text-white opacity-80 not-italic [word-break:break-word]`}
      >
        {subtitle}
      </p>

      <a
        href={ctaHref}
        className="relative mt-[16px] flex h-[48px] w-[186px] max-w-[calc(100vw-48px)] items-center justify-center gap-[10px] shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
        />
        <p className={`${interRegular.className} relative z-10 shrink-0 whitespace-nowrap text-[14px] font-medium text-white uppercase not-italic tracking-wider`}>
          {ctaLabel}
        </p>
        <GreenCtaCorners />
      </a>

      {/* MOBILE PARTNERS CAROUSEL — matches desktop structure & styling */}
      <div className="mt-[32px] w-full">
        <EcosystemPartners data={data} />
      </div>
    </div>
  );
}
