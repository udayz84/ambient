"use client";

import { interRegular, gilroyMedium } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { useFadeIn } from "../shared/useFadeIn";
import { PARTNERS_WHY } from "./partners-data";
import { PartnersSectionHeading } from "./partners-shared";

const WHY_CARD_BG = "rgba(0,0,0,0.2)";
const WHY_CARD_BORDER = "rgba(240,240,240,0.2)";
const STEP_NUMBER_GRADIENT =
  "linear-gradient(to bottom, rgb(255, 255, 255), rgba(255, 255, 255, 0))";

function WhyCard({ step }: { step: any }) {
  const isFullCardBg = step.number === "03";

  return (
    <article
      className="group/card relative flex w-full flex-col overflow-hidden border border-solid px-[24px] pt-[16px] pb-[24px] h-full min-h-[430px]"
      style={{
        backgroundColor: WHY_CARD_BG,
        borderColor: WHY_CARD_BORDER,
      }}
      data-name="Article"
    >
      {/* Image box placeholder */}
      <div
        className="relative w-[140%] -ml-[20%] h-[180px] shrink-0 overflow-hidden"
        aria-hidden
      >
        {/* Soft grey radial gradient backlight for dark images */}
        <div 
          className="absolute inset-0" 
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 65%)"
          }}
          aria-hidden
        />
        {step.image && (
          <img loading="lazy" decoding="async"
            alt=""
            src={step.image}
            className={`absolute inset-0 h-full w-full opacity-75 transition-opacity duration-300 group-hover/card:opacity-100 ${
              isFullCardBg ? "object-cover" : "object-contain"
            }`}
          />
        )}
        {/* Fade overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0) 70%, #000000 100%)",
          }}
        />
      </div>

      {/* Step number — positioned overlapping the image bottom */}
      <span
        className={`${gilroyMedium.className} pointer-events-none absolute bg-clip-text text-[50px] leading-[50px] font-medium text-transparent opacity-50 not-italic whitespace-nowrap min-[1280px]:text-[60px] min-[1280px]:leading-[60px]`}
        style={{
          left: 16,
          top: 155,
          backgroundImage: STEP_NUMBER_GRADIENT,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
        aria-hidden
      >
        {step.number}
      </span>

      {/* Title + description */}
      <div className="relative z-10 flex w-full flex-col items-start gap-[12px] not-italic [word-break:break-word] mt-[24px] flex-1">
        <h3
          className={`${gilroyMedium.className} w-full shrink-0 text-[18px] leading-[24px] font-medium text-white min-[1280px]:text-[20px] min-[1280px]:leading-[26px]`}
        >
          {step.title}
        </h3>

        <p
          className={`${interRegular.className} w-full text-[13px] leading-[20px] font-normal text-[#99a1af] tracking-[-0.3px] [word-break:break-word] min-[1280px]:text-[14px] min-[1280px]:leading-[21px]`}
        >
          {step.description}
        </p>
      </div>

      <Corners />
    </article>
  );
}

export function PartnersWhy() {
  const { fadeRef, isVisible } = useFadeIn<HTMLElement>();
  const fadeCls = isVisible
    ? "animate-hero-text-fade-in opacity-0"
    : "translate-y-[25px] opacity-0";

  const journey = PARTNERS_WHY.journey;

  return (
    <section
      ref={fadeRef}
      className={`relative mx-auto flex w-full max-w-[1440px] flex-col items-center gap-[36px] pb-[40px] pt-0 -mt-[20px] min-[1024px]:pb-[64px] min-[1024px]:pt-0 min-[1024px]:-mt-[60px] ${fadeCls} transform-gpu overflow-hidden`}
      aria-label="A production AI product is a full-stack challenge"
    >
      <div className="relative flex flex-col items-center gap-[16px] px-[24px]">
        <PartnersSectionHeading
          deg="124.568deg"
          className="flex flex-col items-center !whitespace-normal"
        >
          <span className="block">A breakthrough processor is the start,</span>
          <span className="block">not the finish.</span>
        </PartnersSectionHeading>
        <Corners />
      </div>

      <p
        className={`${interRegular.className} max-w-[860px] px-[24px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic max-[1023px]:text-[14px] max-[1023px]:leading-[21px]`}
      >
        {PARTNERS_WHY.subheading}
      </p>

      {/* Cards container — 5 in a row on desktop */}
      <div className="relative w-full py-[24px] px-[24px] min-[1024px]:px-[64px] min-[1024px]:py-[32px]">
        <div className="flex w-full flex-wrap min-[1024px]:flex-nowrap justify-center gap-[16px] sm:gap-[24px]">
          {journey.map((step) => (
            <div
              key={step.title}
              className="w-full sm:w-[calc(50%-12px)] min-[1024px]:w-[calc(20%-19.2px)] max-w-[400px] min-[1024px]:max-w-none"
            >
              <WhyCard step={step} />
            </div>
          ))}
        </div>
      </div>

      <p
        className={`${interRegular.className} max-w-[980px] px-[24px] text-center text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic max-[1023px]:text-[14px] max-[1023px]:leading-[21px]`}
      >
        {PARTNERS_WHY.body}
      </p>
    </section>
  );
}
