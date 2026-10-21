"use client";

import { interRegular, gilroyMedium, dmMono } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { useFadeIn } from "../shared/useFadeIn";
import type { BenefitsContent } from "./partners-content";
import { PartnersSectionHeading, WireframeIcon, PartnersBridgeBox } from "./partners-shared";

import { TabletScaleCanvas } from "../shared/TabletScaleCanvas";

export function PartnersBenefits({ content }: { content: BenefitsContent }) {
  const { fadeRef, isVisible } = useFadeIn<HTMLElement>();
  const fadeCls = isVisible ? "animate-hero-text-fade-in opacity-0" : "translate-y-[25px] opacity-0";

  return (
    <section
      ref={fadeRef}
      className={`relative mx-auto flex w-full justify-center ${fadeCls} transform-gpu overflow-hidden`}
      aria-label="Why build with a partner"
    >
      {/* Background visual — Company image-124 matrix texture */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden mix-blend-screen opacity-[0.25]"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 95%)",
        }}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          loading="lazy"
          decoding="async"
          src="/company/image-124.webp"
          alt=""
          className="absolute inset-0 size-full object-cover object-left-top"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.6) 75%, rgb(0,0,0) 92%)",
          }}
        />
      </div>

      {/* DESKTOP & TABLET (>=600px) — 1440px design canvas with proportional tablet scaling */}
      <TabletScaleCanvas className="relative hidden w-[1440px] shrink-0 flex-col items-center gap-[40px] px-[24px] py-[64px] min-[600px]:flex">
        <div className="relative flex flex-col items-center gap-[16px] px-[10px]">
          <PartnersSectionHeading deg="112.176deg" className="!whitespace-normal max-w-[720px]">
            {content.heading}
          </PartnersSectionHeading>
          <Corners />
        </div>

        <p className={`${interRegular.className} max-w-[720px] text-center text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic`}>
          {content.subheading}
        </p>

        <div className="grid w-full max-w-[1204px] grid-cols-4 gap-[20px]">
          {content.cards.map((card, i) => (
            <article
              key={card.title}
              className="group relative flex min-h-[300px] w-auto flex-col items-start justify-between border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-black/75 p-[28px] backdrop-blur-[24px] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-[4px] hover:border-[rgba(83,216,36,0.5)] hover:shadow-[0px_20px_48px_0px_rgba(83,216,36,0.15)]"
            >
              <Corners />
              <div className="flex w-full items-start justify-between">
                {card.icon.endsWith(".svg") ? (
                  <img src={card.icon} alt="" className="size-[52px]" aria-hidden />
                ) : (
                  <WireframeIcon name={card.icon} className="size-[52px]" />
                )}
                <span className={`${dmMono.className} text-[11px] leading-[16px] tracking-[1.6px] text-[#53d824] opacity-70`}>
                  0{i + 1}
                </span>
              </div>
              <div className="mt-[24px] flex w-full flex-col gap-[10px]">
                <h3 className={`${gilroyMedium.className} w-full text-[22px] leading-[28px] font-medium text-white [word-break:break-word] not-italic`}>
                  {card.title}
                </h3>
                <p className={`${interRegular.className} w-full text-[16px] leading-[24px] font-normal text-white opacity-65 [word-break:break-word] not-italic`}>
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* bridge line */}
        <PartnersBridgeBox className="mt-[16px]">
          {content.bridge}
        </PartnersBridgeBox>
      </TabletScaleCanvas>

      {/* MOBILE (<600px) */}
      <div className="relative flex w-full flex-col items-center gap-[32px] px-[20px] py-[40px] min-[600px]:hidden">
        <div className="relative flex flex-col items-center gap-[16px] px-[10px]">
          <PartnersSectionHeading deg="112.176deg">
            {content.heading}
          </PartnersSectionHeading>
          <Corners />
        </div>

        <p className={`${interRegular.className} w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic`}>
          {content.subheading}
        </p>

        <div className="flex w-[calc(100%+40px)] -mx-[20px] px-[20px] snap-x snap-mandatory overflow-x-auto gap-[16px] no-scrollbar">
          {content.cards.map((card, i) => (
            <article
              key={card.title}
              className="group relative flex min-h-[280px] w-[280px] shrink-0 snap-center flex-col items-start justify-between border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-black/75 p-[24px] backdrop-blur-[24px]"
            >
              <Corners />
              <div className="flex w-full items-start justify-between">
                {card.icon.endsWith(".svg") ? (
                  <img src={card.icon} alt="" className="size-[48px]" aria-hidden />
                ) : (
                  <WireframeIcon name={card.icon} className="size-[48px]" />
                )}
                <span className={`${dmMono.className} text-[11px] leading-[16px] tracking-[1.6px] text-[#53d824] opacity-70`}>
                  0{i + 1}
                </span>
              </div>
              <div className="mt-[20px] flex w-full flex-col gap-[8px]">
                <h3 className={`${gilroyMedium.className} w-full text-[20px] leading-[26px] font-medium text-white [word-break:break-word] not-italic`}>
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
        <PartnersBridgeBox className="mt-[12px]">
          {content.bridge}
        </PartnersBridgeBox>
      </div>
    </section>
  );
}
