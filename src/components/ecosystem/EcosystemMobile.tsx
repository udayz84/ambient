"use client";

import Image from "next/image";
import { gilroyMedium, gilroySemiBold, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { useFitText } from "../shared/FitText";

import { EcosystemPartnerRow, DEV_LOGO_STAT_NODES } from "./EcosystemPartnerRow";
import { SILICON_PARTNER_ROW, DEVELOPMENT_PARTNER_ROW } from "./ecosystem-data";

function PartnerSectionMobile({
  title,
  isSilicon,
  siliconPartners,
  developmentPartners,
}: {
  title: string;
  isSilicon: boolean;
  siliconPartners?: readonly any[];
  developmentPartners?: readonly any[];
}) {
  const gradient = isSilicon
    ? "linear-gradient(119.414deg, rgb(22, 22, 22) 9.0248%, rgb(39, 39, 39) 37.884%, rgb(18, 18, 18) 111.41%)"
    : "linear-gradient(126.723deg, rgb(22, 22, 22) 9.0248%, rgb(39, 39, 39) 37.884%, rgb(18, 18, 18) 111.41%)";

  return (
    <div className="flex flex-col shrink-0 w-[1204px]">
      <p
        className={`${gilroySemiBold.className} bg-clip-text text-[40.281px] leading-[43.158px] tracking-[-0.8056px] font-semibold text-transparent opacity-90 not-italic px-[40px] whitespace-nowrap overflow-hidden text-ellipsis max-w-full`}
        style={{ backgroundImage: gradient }}
      >
        {title}
      </p>
      {isSilicon ? (
        <EcosystemPartnerRow
          config={SILICON_PARTNER_ROW}
          partners={siliconPartners}
          isDevelopment={false}
        />
      ) : (
        <EcosystemPartnerRow
          config={DEVELOPMENT_PARTNER_ROW}
          logoStatNodeIds={DEV_LOGO_STAT_NODES}
          partners={developmentPartners}
          isDevelopment={true}
        />
      )}
    </div>
  );
}

export function EcosystemMobile({ data }: { data?: any }) {
  const heading = data?.heading || "";
  const subtitle = data?.subtitle || "";
  const cta = data?.cta || {};
  const ctaLabel = cta.label || "";
  const ctaHref = cta.href || "";
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 2 });
  return (
    <div className="relative flex flex-col items-center py-[48px]">
      <div className="relative inline-flex flex-col items-center justify-center w-fit max-w-[350px] px-[16px] py-[12px]">
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
          className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic pb-[10px] -mb-[10px]`}
          style={{
            backgroundImage:
              "linear-gradient(107.454deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
          }}
        >
          {heading}
        </h2>
      </div>

      <p
        className={`${interRegular.className} mt-[24px] w-[356px] max-w-[calc(100vw-48px)] text-center text-[14px] leading-[22px] font-normal text-white opacity-80 not-italic [word-break:break-word]`}
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
        <Image
          src="/navbar/cta-dot.svg"
          alt=""
          width={6}
          height={6}
          className="relative z-10 size-[6px]"
          aria-hidden
        />
        <GreenCtaCorners />
      </a>

      <div className="mt-[24px] flex w-full overflow-hidden">
        <div className="flex w-max gap-[32px] animate-[ecosystem-scroll-mobile_25s_linear_infinite]">
          <PartnerSectionMobile title="SILICON PARTNERS" isSilicon={true} siliconPartners={data?.silicon_partners} developmentPartners={data?.development_partners} />
          <PartnerSectionMobile title="DEVELOPMENT PARTNERS" isSilicon={false} siliconPartners={data?.silicon_partners} developmentPartners={data?.development_partners} />
          <PartnerSectionMobile title="SILICON PARTNERS" isSilicon={true} siliconPartners={data?.silicon_partners} developmentPartners={data?.development_partners} />
          <PartnerSectionMobile title="DEVELOPMENT PARTNERS" isSilicon={false} siliconPartners={data?.silicon_partners} developmentPartners={data?.development_partners} />
        </div>
      </div>
    </div>
  );
}
