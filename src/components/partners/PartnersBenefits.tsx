"use client";

import { interRegular, gilroyMedium, dmMono } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { useFadeIn } from "../shared/useFadeIn";
import { PARTNERS_BENEFITS } from "./partners-data";
import { PartnersSectionHeading, WireframeIcon } from "./partners-shared";

export function PartnersBenefits() {
  const { fadeRef, isVisible } = useFadeIn<HTMLElement>();
  const fadeCls = isVisible ? "animate-hero-text-fade-in opacity-0" : "translate-y-[25px] opacity-0";

  return (
    <section
      ref={fadeRef}
      className={`relative mx-auto flex w-full max-w-[1204px] flex-col items-center gap-[40px] px-[24px] py-[40px] min-[1024px]:py-[96px] ${fadeCls} transform-gpu`}
      aria-label="Why build with a partner"
    >
      <div className="relative flex flex-col items-center gap-[16px] px-[10px]">
        <PartnersSectionHeading deg="112.176deg">{PARTNERS_BENEFITS.heading}</PartnersSectionHeading>
        <Corners />
      </div>

      <p className={`${interRegular.className} max-w-[720px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic max-[1023px]:text-[14px] max-[1023px]:leading-[21px]`}>
        {PARTNERS_BENEFITS.subheading}
      </p>

      <div className="flex w-[calc(100%+48px)] -mx-[24px] px-[24px] snap-x snap-mandatory overflow-x-auto gap-[20px] no-scrollbar min-[1024px]:mx-0 min-[1024px]:w-full min-[1024px]:px-0 min-[1024px]:grid min-[1024px]:grid-cols-4 min-[1024px]:overflow-visible">
        {PARTNERS_BENEFITS.cards.map((card, i) => (
          <article
            key={card.title}
            className="group relative flex min-h-[300px] w-[75vw] shrink-0 snap-center flex-col items-start justify-between border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(21,21,21,0.3)] p-[28px] backdrop-blur-[8px] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-[4px] hover:border-[rgba(83,216,36,0.5)] hover:shadow-[0px_20px_48px_0px_rgba(83,216,36,0.15)] min-[500px]:w-[320px] min-[1024px]:w-auto"
          >
            <Corners />
            <div className="flex w-full items-start justify-between">
              <WireframeIcon name={card.icon} className="size-[52px]" />
              <span className={`${dmMono.className} text-[11px] leading-[16px] tracking-[1.6px] text-[#53d824] opacity-70`}>
                0{i + 1}
              </span>
            </div>
            <div className="mt-[24px] flex w-full flex-col gap-[10px]">
              <h3 className={`${gilroyMedium.className} w-full text-[22px] leading-[28px] font-medium text-white [word-break:break-word] not-italic`}>
                {card.title}
              </h3>
              <p className={`${interRegular.className} w-full text-[14px] leading-[21px] font-normal text-white opacity-65 [word-break:break-word] not-italic`}>
                {card.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* bridge line */}
      <div className="relative flex w-full max-w-[760px] items-center gap-[16px]">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[rgba(83,216,36,0.4)]" aria-hidden />
        <p className={`${gilroyMedium.className} text-center text-[18px] leading-[27px] font-medium text-[#a9e28c] not-italic min-[1024px]:shrink-0 min-[1024px]:whitespace-nowrap max-[1023px]:max-w-[280px] max-[1023px]:text-[14px] max-[1023px]:leading-[21px]`}>
          {PARTNERS_BENEFITS.bridge}
        </p>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[rgba(83,216,36,0.4)]" aria-hidden />
      </div>
    </section>
  );
}
