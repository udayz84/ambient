"use client";

import { interRegular, gilroyMedium } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { useFadeIn } from "../shared/useFadeIn";
import type { ProofContent } from "./partners-content";
import { GhostGreenCta, PartnersGreenCta, PartnersSectionHeading } from "./partners-shared";

function ProofMarker({ icon }: { icon?: string }) {
  return (
    <span className="relative flex size-[48px] shrink-0 items-center justify-center" aria-hidden>
      <span className="absolute inset-0 border-[0.5px] border-solid border-[rgba(83,216,36,0.6)] bg-black" />
      <img loading="lazy" decoding="async" src={icon} alt="" className="relative size-[28px] object-contain" />
    </span>
  );
}

export function PartnersProof({ content }: { content: ProofContent }) {
  const { fadeRef, isVisible } = useFadeIn<HTMLElement>();
  const fadeCls = isVisible ? "animate-hero-text-fade-in opacity-0" : "translate-y-[25px] opacity-0";

  return (
    <section
      ref={fadeRef}
      className={`relative mx-auto flex w-full flex-col items-center overflow-hidden py-[40px] min-[1024px]:py-[64px] ${fadeCls} transform-gpu`}
      aria-label="GPX-native proof"
    >
      {/* Background visual — Fractal Glass */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          loading="lazy"
          decoding="async"
          src="/contact/Fractal%20Glass.png"
          alt=""
          className="absolute inset-0 size-full object-cover object-center opacity-75"
        />
        {/* Top and bottom gradient fades to blend seamlessly into black */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 18%, rgba(0,0,0,0) 82%, rgba(0,0,0,0.85) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1204px] flex-col items-center gap-[40px] px-[24px]">
        <div className="relative flex flex-col items-center gap-[16px] px-[10px]">
          <PartnersSectionHeading deg="119.522deg">{content.heading}</PartnersSectionHeading>
          <Corners />
        </div>

        <p className={`${interRegular.className} max-w-[720px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic max-[1023px]:text-[14px] max-[1023px]:leading-[21px] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}>
          {content.subheading}
        </p>

        {/* proof band — corner marks match the homepage button construction (1:1 svg mapping) */}
        <div className="relative grid w-full grid-cols-1 border-[1.5px] border-solid border-[rgba(255,255,255,0)] bg-[#dbe8c8] min-[1024px]:grid-cols-4 min-[1024px]:divide-x min-[1024px]:divide-[rgba(10,51,21,0.2)]">
          <span className="pointer-events-none absolute top-0 right-0 flex size-[4px] items-center justify-center" aria-hidden>
            <span className="rotate-180 flex-none">
              <span className="relative block size-[4px]">
                <span className="absolute inset-[0_0_-12.5%_-12.5%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" src="/developer-platform/corner-tag-black.svg" className="block size-full max-w-none" />
                </span>
              </span>
            </span>
          </span>
          <span className="pointer-events-none absolute top-0 left-0 flex size-[4px] items-center justify-center" aria-hidden>
            <span className="-scale-y-100 flex-none">
              <span className="relative block size-[4px]">
                <span className="absolute inset-[0_0_-12.5%_-12.5%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" src="/developer-platform/corner-tag-black.svg" className="block size-full max-w-none" />
                </span>
              </span>
            </span>
          </span>
          <span className="pointer-events-none absolute right-0 bottom-0 flex size-[4px] items-center justify-center" aria-hidden>
            <span className="-scale-x-100 flex-none">
              <span className="relative block size-[4px]">
                <span className="absolute inset-[0_0_-12.5%_-12.5%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" src="/developer-platform/corner-tag-black.svg" className="block size-full max-w-none" />
                </span>
              </span>
            </span>
          </span>
          <span className="pointer-events-none absolute bottom-0 left-0 flex size-[4px] items-center justify-center" aria-hidden>
            <span className="flex-none">
              <span className="relative block size-[4px]">
                <span className="absolute inset-[0_0_-12.5%_-12.5%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" src="/developer-platform/corner-tag-black.svg" className="block size-full max-w-none" />
                </span>
              </span>
            </span>
          </span>
          {content.points.map((point) => (
            <div key={point.title} className="flex min-h-[220px] flex-col items-start gap-[14px] p-[28px] max-[1023px]:border-b max-[1023px]:border-solid max-[1023px]:border-[rgba(10,51,21,0.2)] max-[1023px]:last:border-b-0">
              <ProofMarker icon={point.icon} />
              <h3 className={`${gilroyMedium.className} w-full text-[20px] leading-[26px] font-medium text-[#0a3315] [word-break:break-word] not-italic min-[1024px]:text-[22px] min-[1024px]:leading-[28px]`}>
                {point.title}
              </h3>
              <p className={`${interRegular.className} w-full text-[14px] leading-[21px] font-normal text-[#0a3315] opacity-80 [word-break:break-word] not-italic min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}>
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
      </div>
    </section>
  );
}
