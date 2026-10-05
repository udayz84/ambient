"use client";

import { interRegular, gilroyMedium } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { useFadeIn } from "../shared/useFadeIn";
import type { ProofContent } from "./partners-content";
import { GhostGreenCta, PartnersGreenCta, PartnersSectionHeading } from "./partners-shared";

function ProofMarker({ icon }: { icon?: string }) {
  return (
    <span className="relative flex size-[48px] shrink-0 items-center justify-center" aria-hidden>
      <span className="absolute inset-0 border-[0.5px] border-solid border-[rgba(83,216,36,0.6)] bg-[rgba(83,216,36,0.1)]" />
      <img loading="lazy" decoding="async" src={icon} alt="" className="size-[28px] object-contain" />
    </span>
  );
}

export function PartnersProof({ content }: { content: ProofContent }) {
  const { fadeRef, isVisible } = useFadeIn<HTMLElement>();
  const fadeCls = isVisible ? "animate-hero-text-fade-in opacity-0" : "translate-y-[25px] opacity-0";

  return (
    <section
      ref={fadeRef}
      className={`relative mx-auto flex w-full max-w-[1204px] flex-col items-center gap-[40px] px-[24px] py-[40px] min-[1024px]:py-[64px] ${fadeCls} transform-gpu`}
      aria-label="GPX-native proof"
    >
      <div className="relative flex flex-col items-center gap-[16px] px-[10px]">
        <PartnersSectionHeading deg="119.522deg">{content.heading}</PartnersSectionHeading>
        <Corners />
      </div>

      <p className={`${interRegular.className} max-w-[720px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic max-[1023px]:text-[14px] max-[1023px]:leading-[21px] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}>
        {content.subheading}
      </p>

      {/* proof band */}
      <div className="relative grid w-full grid-cols-1 border-[0.5px] border-solid border-[rgba(83,216,36,0.25)] bg-[rgba(46,119,20,0.08)] backdrop-blur-[8px] min-[1024px]:grid-cols-4 min-[1024px]:divide-x min-[1024px]:divide-[rgba(83,216,36,0.2)]">
        <Corners />
        {content.points.map((point) => (
          <div key={point.title} className="flex min-h-[220px] flex-col items-start gap-[14px] p-[28px] max-[1023px]:border-b max-[1023px]:border-solid max-[1023px]:border-[rgba(83,216,36,0.2)] max-[1023px]:last:border-b-0">
            <ProofMarker icon={point.icon} />
            <h3 className={`${gilroyMedium.className} w-full text-[20px] leading-[26px] font-medium text-white [word-break:break-word] not-italic min-[1024px]:text-[22px] min-[1024px]:leading-[28px]`}>
              {point.title}
            </h3>
            <p className={`${interRegular.className} w-full text-[14px] leading-[21px] font-normal text-white opacity-65 [word-break:break-word] not-italic min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}>
              {point.description}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-[16px]">
        <PartnersGreenCta href={content.links[0].href}>
          {content.links[0].label}
        </PartnersGreenCta>
        <GhostGreenCta href={content.links[1].href}>
          {content.links[1].label}
        </GhostGreenCta>
      </div>
    </section>
  );
}
