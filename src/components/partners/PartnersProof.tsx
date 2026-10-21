"use client";

import { interRegular, gilroyMedium } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { useFadeIn } from "../shared/useFadeIn";
import type { ProofContent } from "./partners-content";
import { GhostGreenCta, PartnersGreenCta, PartnersSectionHeading } from "./partners-shared";

import { TabletScaleCanvas } from "../shared/TabletScaleCanvas";

function ProofMarker({ icon }: { icon?: string }) {
  return (
    <span className="relative flex size-[48px] shrink-0 items-center justify-center" aria-hidden>
      <span className="absolute inset-0 border-[0.5px] border-solid border-[rgba(83,216,36,0.6)] bg-black" />
      <img loading="lazy" decoding="async" src={icon} alt="" className="relative size-[28px] object-contain" />
    </span>
  );
}

function CornerTags() {
  return (
    <>
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
    </>
  );
}

export function PartnersProof({ content }: { content: ProofContent }) {
  const { fadeRef, isVisible } = useFadeIn<HTMLElement>();
  const fadeCls = isVisible ? "animate-hero-text-fade-in opacity-0" : "translate-y-[25px] opacity-0";

  return (
    <section
      ref={fadeRef}
      className={`relative mx-auto flex w-full justify-center overflow-hidden ${fadeCls} transform-gpu`}
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

      {/* DESKTOP & TABLET (>=600px) — 1440px design canvas with proportional tablet scaling */}
      <TabletScaleCanvas className="relative hidden w-[1440px] shrink-0 flex-col items-center gap-[40px] px-[24px] py-[64px] min-[600px]:flex">
        <div className="relative flex flex-col items-center gap-[16px] px-[10px]">
          <PartnersSectionHeading deg="119.522deg">{content.heading}</PartnersSectionHeading>
          <Corners />
        </div>

        <p className={`${interRegular.className} max-w-[720px] text-center text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic`}>
          {content.subheading}
        </p>

        {/* proof band — 4 columns desktop */}
        <div className="relative grid w-full max-w-[1204px] grid-cols-4 divide-x divide-[rgba(10,51,21,0.2)] border-[1.5px] border-solid border-[rgba(255,255,255,0)] bg-[#dbe8c8]">
          <CornerTags />
          {content.points.map((point) => (
            <div key={point.title} className="flex min-h-[220px] flex-col items-start gap-[14px] p-[28px]">
              <ProofMarker icon={point.icon} />
              <h3 className={`${gilroyMedium.className} w-full text-[22px] leading-[28px] font-medium text-[#0a3315] [word-break:break-word] not-italic`}>
                {point.title}
              </h3>
              <p className={`${interRegular.className} w-full text-[16px] leading-[24px] font-normal text-[#0a3315] opacity-80 [word-break:break-word] not-italic`}>
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
      </TabletScaleCanvas>

      {/* MOBILE (<600px) */}
      <div className="relative flex w-full flex-col items-center gap-[32px] px-[20px] py-[40px] min-[600px]:hidden">
        <div className="relative flex flex-col items-center gap-[16px] px-[10px]">
          <PartnersSectionHeading deg="119.522deg">{content.heading}</PartnersSectionHeading>
          <Corners />
        </div>

        <p className={`${interRegular.className} w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic`}>
          {content.subheading}
        </p>

        <div className="relative grid w-full grid-cols-1 border-[1.5px] border-solid border-[rgba(255,255,255,0)] bg-[#dbe8c8]">
          <CornerTags />
          {content.points.map((point) => (
            <div key={point.title} className="flex flex-col items-start gap-[14px] p-[24px] border-b border-solid border-[rgba(10,51,21,0.2)] last:border-b-0">
              <ProofMarker icon={point.icon} />
              <h3 className={`${gilroyMedium.className} w-full text-[20px] leading-[26px] font-medium text-[#0a3315] [word-break:break-word] not-italic`}>
                {point.title}
              </h3>
              <p className={`${interRegular.className} w-full text-[14px] leading-[21px] font-normal text-[#0a3315] opacity-80 [word-break:break-word] not-italic`}>
                {point.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col w-full gap-[12px] items-center">
          <PartnersGreenCta href={content.links[0].href} className="w-full">
            {content.links[0].label}
          </PartnersGreenCta>
          <GhostGreenCta href={content.links[1].href} className="w-full">
            {content.links[1].label}
          </GhostGreenCta>
        </div>
      </div>
    </section>
  );
}
