"use client";

import { interRegular, gilroyMedium } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { useFadeIn } from "../shared/useFadeIn";
import { PARTNER_CAPABILITIES, PARTNERS_ECOSYSTEM } from "./partners-data";
import { JourneyIcon, PartnersSectionHeading, PartnersBridgeBox } from "./partners-shared";

function CapabilityCard({
  index,
  title,
  short,
  description,
  journeyIcon,
}: {
  index: number;
  title: string;
  short: string;
  description: string;
  journeyIcon: string;
}) {
  return (
    <article className="group relative flex min-h-[280px] w-full flex-col items-start justify-between border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(21,21,21,0.3)] p-[28px] backdrop-blur-[8px] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-[4px] hover:border-[rgba(83,216,36,0.5)] hover:shadow-[0px_20px_48px_0px_rgba(83,216,36,0.15)]">
      <Corners />
      <div className="flex w-full items-start justify-between">
        <div className="flex size-[48px] items-center justify-center border-[0.5px] border-solid border-[rgba(83,216,36,0.55)] bg-[rgba(83,216,36,0.12)] text-[#a9e28c]">
          <JourneyIcon name={journeyIcon} className="size-[24px]" />
        </div>
        <span className={`${interRegular.className} text-[12px] leading-[18px] tracking-[1.2px] text-[#53d824] opacity-70`}>
          0{index + 1}
        </span>
      </div>
      <div className="mt-[24px] flex w-full flex-col gap-[10px]">
        <h3 className={`${gilroyMedium.className} text-[20px] leading-[26px] font-medium text-white [word-break:break-word] not-italic`}>
          {title}
        </h3>
        <p className={`${interRegular.className} text-[14px] leading-[22px] font-normal text-[#f0f0f0] opacity-75 [word-break:break-word] not-italic`}>
          {description}
        </p>
      </div>
    </article>
  );
}

export function PartnersCapabilities() {
  const { fadeRef, isVisible } = useFadeIn<HTMLElement>();
  const fadeCls = isVisible ? "animate-hero-text-fade-in opacity-0" : "translate-y-[25px] opacity-0";

  return (
    <section
      ref={fadeRef}
      className={`relative mx-auto flex w-full max-w-[1204px] flex-col items-center gap-[40px] px-[24px] py-[40px] min-[1024px]:py-[64px] ${fadeCls} transform-gpu`}
      aria-label="The ecosystem, by capability"
    >
      <div className="relative flex flex-col items-center gap-[16px] px-[10px]">
        <PartnersSectionHeading deg="101.272deg">{PARTNERS_ECOSYSTEM.heading}</PartnersSectionHeading>
        <Corners />
      </div>

      <p className={`${interRegular.className} max-w-[720px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic max-[1023px]:text-[14px] max-[1023px]:leading-[21px]`}>
        {PARTNERS_ECOSYSTEM.subheading}
      </p>

      <div className="grid w-full grid-cols-1 gap-[20px] min-[768px]:grid-cols-2 min-[1024px]:grid-cols-3">
        {PARTNER_CAPABILITIES.map((cap, i) => (
          <CapabilityCard
            key={cap.id}
            index={i}
            title={cap.title}
            short={cap.short}
            description={cap.description}
            journeyIcon={cap.journeyIcon}
          />
        ))}
      </div>

      {/* bridge line */}
      <PartnersBridgeBox className="mt-[16px]">
        {PARTNERS_ECOSYSTEM.bridge}
      </PartnersBridgeBox>
    </section>
  );
}
