"use client";

import Image from "next/image";
import { TagBadge } from "../hero/TagBadge";
import { Corners } from "../shared/Corners";
import { gilroyMedium, interRegular } from "../hero/fonts";
import type { HeroContent } from "./partners-content";
import { GhostGreenCta, PartnersGreenCta } from "./partners-shared";

/**
 * Ecosystem constellation visual (static image, 4:3 — 1700x1275 source).
 * Served from Strapi when the hero image is set there; otherwise the local
 * hardcoded asset (visually identical upload).
 */
function Constellation({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt="GPX partner ecosystem constellation — AI, firmware, hardware, ODM, EMS and SI partners connected to the central CubicCore chip"
      width={1480}
      height={1110}
      priority
      className={`h-auto w-full ${className}`}
      sizes="(max-width: 1023px) 115vw, 740px"
    />
  );
}

export function PartnersHero({ content }: { content: HeroContent }) {
  const { tag, title, subtitle, primaryCta, secondaryCta, image } = content;
  const constellationSrc = image ?? "/partners/hero-constellation.png";

  return (
    <section
      className="relative -mt-[78px] flex w-full justify-center overflow-hidden bg-black"
      aria-label="Partners — The Promise"
    >
      {/* ambient glow backdrop */}
      <div
        className="pointer-events-none absolute top-[150px] left-1/2 -translate-x-1/2 h-[720px] w-[920px] opacity-70 min-[1024px]:top-[-120px] min-[1024px]:left-auto min-[1024px]:right-[-160px] min-[1024px]:translate-x-0"
        style={{
          background:
            "radial-gradient(closest-side, rgba(83,216,36,0.10), rgba(83,216,36,0.03) 55%, transparent 75%)",
        }}
        aria-hidden
      />

      {/* DESKTOP — 1442px design canvas, scaled down proportionally on
          1024–1442px viewports (same approach as the Contact map). */}
      <div className="relative hidden w-full min-[1024px]:block">
        <div className="relative h-[820px] w-full">
          <div
            className="absolute top-0 left-1/2 h-[820px] w-[1442px] origin-top"
            style={{
              transform:
                "translateX(-50%) scale(min(1, calc((100vw - 40px) / 1442px)))",
            }}
          >

            <div className="absolute z-10 top-1/2 left-[100px] w-[620px] -translate-y-1/2">
              <div className="flex animate-hero-text-fade-in transform-gpu flex-col items-start gap-[24px]">
                <TagBadge label={tag} width={196} labelOffsetX={0} rightBarLeft={187} centerLabel />
                <div className="relative p-[16px] -m-[16px] w-max max-w-full">
                  <Corners />
                  <h1
                    className={`${gilroyMedium.className} bg-clip-text text-[46px] leading-[52px] font-medium text-transparent [word-break:break-word] not-italic`}
                    style={{
                      backgroundImage:
                        "linear-gradient(101.005deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  >
                    {title.split('\n').map((part, i) => (
                      <span key={i} className="block">
                        {part}
                      </span>
                    ))}
                  </h1>
                </div>
                <p className={`${interRegular.className} w-[500px] text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-80 [word-break:break-word] not-italic`}>
                  {subtitle}
                </p>
                <div className="mt-[12px] flex items-center gap-[20px]">
                  <PartnersGreenCta width="204px" href={primaryCta.href}>
                    {primaryCta.label}
                  </PartnersGreenCta>
                  <GhostGreenCta width="204px" href={secondaryCta.href}>
                    {secondaryCta.label}
                  </GhostGreenCta>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute top-1/2 right-[24px] w-[640px] -translate-y-1/2">
              <div className="animate-hero-text-fade-in transform-gpu [animation-delay:0.15s]">
                <Constellation src={constellationSrc} className="h-auto w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="relative flex w-full flex-col px-[24px] pt-[100px] pb-[48px] min-[1024px]:hidden">
        <div className="relative z-10 flex animate-hero-text-fade-in transform-gpu flex-col items-center gap-[15px]">
          <TagBadge label={tag} width={196} labelOffsetX={0} rightBarLeft={187} centerLabel />
          <div className="relative p-[16px] -m-[16px]">
            <Corners />
            <h1
              className={`${gilroyMedium.className} w-[332px] max-w-full bg-clip-text text-center text-[36px] leading-[38px] font-medium text-transparent [word-break:break-word] not-italic`}
              style={{
                backgroundImage:
                  "linear-gradient(100.849deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {title}
            </h1>
          </div>
          <p className={`${interRegular.className} w-[332px] max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-80 not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}>
            {subtitle}
          </p>
        </div>

        <div className="pointer-events-none relative z-0 mt-[8px] w-full animate-hero-text-fade-in transform-gpu [animation-delay:0.15s]">
          <div className="mx-auto w-full max-w-[520px]">
            <Constellation src={constellationSrc} />
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-[12px]">
          <PartnersGreenCta href={primaryCta.href}>{primaryCta.label}</PartnersGreenCta>
          <GhostGreenCta href={secondaryCta.href} className="w-full">
            {secondaryCta.label}
          </GhostGreenCta>
        </div>
      </div>
    </section>
  );
}
