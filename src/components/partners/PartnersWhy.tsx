"use client";

import { interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { useFadeIn } from "../shared/useFadeIn";
import { PARTNERS_WHY } from "./partners-data";
import { JourneyIcon, PartnersSectionHeading } from "./partners-shared";

function JourneyNode({ label, icon }: { label: string; icon: string }) {
  return (
    <div className="flex min-[1024px]:w-[128px] flex-col items-center gap-[14px]">
      <div className="relative flex size-[84px] shrink-0 items-center justify-center border-[0.5px] border-solid border-[rgba(83,216,36,0.55)] bg-[rgba(83,216,36,0.1)] shadow-[0px_0px_28px_0px_rgba(83,216,36,0.22)] text-[#a9e28c]">
        <JourneyIcon name={icon} className="size-[28px]" />
        <Corners />
      </div>
      <p className="text-center text-[13px] leading-[19.5px] font-normal tracking-[0.39px] whitespace-nowrap text-[#f0f0f0] opacity-80 uppercase">
        {label}
      </p>
    </div>
  );
}

function JourneyConnector() {
  return (
    <div className="relative hidden h-[1px] w-[72px] shrink self-center min-[1024px]:block" aria-hidden>
      <div className="absolute inset-0 bg-[rgba(83,216,36,0.45)]" />
      <div className="absolute top-[-2px] left-0 h-[5px] w-[1px] bg-[rgba(169,226,140,0.7)]" />
      <div className="absolute top-[-2px] right-0 h-[5px] w-[1px] bg-[rgba(169,226,140,0.7)]" />
    </div>
  );
}

function JourneyConnectorMobile() {
  return (
    <div className="relative h-[36px] w-[1px] min-[1024px]:hidden" aria-hidden>
      <div className="absolute inset-0 bg-[rgba(83,216,36,0.45)]" />
      <div className="absolute top-0 left-[-2px] h-[1px] w-[5px] bg-[rgba(169,226,140,0.7)]" />
      <div className="absolute bottom-0 left-[-2px] h-[1px] w-[5px] bg-[rgba(169,226,140,0.7)]" />
    </div>
  );
}

export function PartnersWhy() {
  const { fadeRef, isVisible } = useFadeIn<HTMLElement>();
  const fadeCls = isVisible ? "animate-hero-text-fade-in opacity-0" : "translate-y-[25px] opacity-0";

  const journey = PARTNERS_WHY.journey;
  const iconFor = (label: string) => {
    switch (label) {
      case "Model":
        return "model";
      case "Firmware":
        return "firmware";
      case "Hardware / Board":
        return "hardware";
      case "Manufacturing":
        return "manufacturing";
      default:
        return "product";
    }
  };

  return (
    <section
      ref={fadeRef}
      className={`relative mx-auto flex w-full max-w-[1204px] flex-col items-center gap-[36px] px-[24px] py-[40px] min-[1024px]:py-[64px] ${fadeCls} transform-gpu`}
      aria-label="A production AI product is a full-stack challenge"
    >
      <div className="relative flex flex-col items-center gap-[16px] px-[10px]">
        <PartnersSectionHeading deg="124.568deg">{PARTNERS_WHY.heading}</PartnersSectionHeading>
        <Corners />
      </div>

      <p className={`${interRegular.className} max-w-[860px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic max-[1023px]:text-[14px] max-[1023px]:leading-[21px]`}>
        {PARTNERS_WHY.subheading}
      </p>

      {/* Journey band — static, all nodes glowing */}
      <div className="relative flex w-full flex-col items-center border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(21,21,21,0.3)] px-[32px] py-[48px] backdrop-blur-[8px] min-[1024px]:px-[64px] max-[1023px]:px-[24px] max-[1023px]:py-[36px]">
        <Corners />

        {/* desktop chain */}
        <div className="hidden w-full items-center justify-center min-[1024px]:flex">
          {journey.map((step, i) => (
            <div key={step.label} className="flex items-center">
              {i > 0 ? <JourneyConnector /> : null}
              <JourneyNode label={step.label} icon={iconFor(step.label)} />
            </div>
          ))}
        </div>

        {/* mobile chain */}
        <div className="flex w-full flex-col items-center min-[1024px]:hidden">
          {journey.map((step, i) => (
            <div key={step.label} className="flex w-full flex-col items-center">
              {i > 0 ? <JourneyConnectorMobile /> : null}
              <JourneyNode label={step.label} icon={iconFor(step.label)} />
            </div>
          ))}
        </div>
      </div>

      <p className={`${interRegular.className} max-w-[980px] text-center text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic max-[1023px]:text-[14px] max-[1023px]:leading-[21px]`}>
        {PARTNERS_WHY.body}
      </p>
    </section>
  );
}
