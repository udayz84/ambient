"use client";

import { gilroyMedium } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { useFadeIn } from "../shared/useFadeIn";
import type { FooterCtasContent } from "./partners-content";
import { GhostGreenCta, PartnersGreenCta } from "./partners-shared";

import { TabletScaleCanvas } from "../shared/TabletScaleCanvas";

export function PartnersFooterCtas({ content }: { content: FooterCtasContent }) {
  const { fadeRef, isVisible } = useFadeIn<HTMLElement>(0.05);
  const fadeCls = isVisible ? "animate-hero-text-fade-in opacity-0" : "translate-y-[25px] opacity-0";

  return (
    <section
      ref={fadeRef}
      className={`relative z-20 mb-0 pb-[20px] min-[600px]:pb-0 min-[600px]:[margin-bottom:calc(-400px*var(--tablet-zoom,1))] mx-auto flex w-full justify-center ${fadeCls} transform-gpu bg-transparent`}
      aria-label="Partners next steps"
    >
      {/* DESKTOP (>=600px) */}
      <TabletScaleCanvas className="hidden w-[1440px] shrink-0 flex-col items-center pt-[88px] pb-[40px] min-[600px]:flex">
        <div
          className="relative flex w-full max-w-[700px] flex-col items-center gap-[36px] px-[40px] py-[40px]"
          data-name="Card Container"
        >
          <div className="absolute inset-0 -z-10 w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              loading="lazy"
              decoding="async"
              src="/home1618873545.png"
              alt=""
              className="absolute inset-0 h-full w-full object-fill"
            />
          </div>

          <div className="relative flex w-max max-w-full flex-col items-center px-[20px] py-[28px] -mx-[20px] -my-[28px]">
            <h2
              className={`${gilroyMedium.className} max-w-[560px] text-center text-[49px] leading-[60px] font-medium tracking-[-0.98px] text-transparent [word-break:break-word] not-italic`}
              style={{
                backgroundImage:
                  "linear-gradient(110.887deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {content.heading.split('. ').map((part, i, arr) => (
                <span key={i} className="block">
                  {part}{i < arr.length - 1 ? "." : ""}
                </span>
              ))}
            </h2>
            <Corners />
          </div>

          <div className="flex flex-row items-center gap-[20px]">
            <PartnersGreenCta width="204px" href={content.primary.href}>
              {content.primary.label}
            </PartnersGreenCta>
            <GhostGreenCta width="204px" href={content.secondary.href}>
              {content.secondary.label}
            </GhostGreenCta>
          </div>
        </div>
      </TabletScaleCanvas>

      {/* MOBILE (<600px) */}
      <div className="flex w-full max-w-[700px] flex-col items-center gap-[24px] px-[24px] pt-[40px] pb-0 min-[600px]:hidden">
        <div
          className="relative flex w-full flex-col items-center gap-[24px] px-[24px] py-[40px] sm:px-[40px]"
          data-name="Card Container"
        >
          <div className="absolute inset-0 -z-10 w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              loading="lazy"
              decoding="async"
              src="/home1618873545.png"
              alt=""
              className="absolute inset-0 h-full w-full object-fill"
            />
          </div>

          <div className="relative flex w-max max-w-full flex-col items-center p-[16px] -m-[16px]">
            <h2
              className={`${gilroyMedium.className} max-w-[560px] text-center text-[28px] leading-[34px] font-medium tracking-[-0.8px] text-transparent [word-break:break-word] not-italic`}
              style={{
                backgroundImage:
                  "linear-gradient(110.887deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {content.heading.split('. ').map((part, i, arr) => (
                <span key={i} className="block">
                  {part}{i < arr.length - 1 ? "." : ""}
                </span>
              ))}
            </h2>
            <Corners />
          </div>

          <div className="flex flex-col items-center gap-[12px] min-[560px]:flex-row min-[560px]:gap-[20px]">
            <PartnersGreenCta width="204px" href={content.primary.href}>
              {content.primary.label}
            </PartnersGreenCta>
            <GhostGreenCta width="204px" href={content.secondary.href}>
              {content.secondary.label}
            </GhostGreenCta>
          </div>
        </div>
      </div>
    </section>
  );
}
