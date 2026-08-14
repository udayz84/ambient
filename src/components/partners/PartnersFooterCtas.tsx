"use client";

import { gilroyMedium } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { useFadeIn } from "../shared/useFadeIn";
import { PARTNERS_FOOTER_CTAS } from "./partners-data";
import { GhostGreenCta, PartnersGreenCta } from "./partners-shared";

export function PartnersFooterCtas() {
  const { fadeRef, isVisible } = useFadeIn<HTMLElement>();
  const fadeCls = isVisible ? "animate-hero-text-fade-in opacity-0" : "translate-y-[25px] opacity-0";

  return (
    <section
      ref={fadeRef}
      className={`relative z-20 mb-[-250px] min-[1024px]:mb-[-400px] mx-auto flex w-full max-w-[1204px] flex-col items-center gap-[24px] min-[1024px]:gap-[40px] px-[24px] pt-[40px] min-[1024px]:pt-[120px] pb-0 min-[1024px]:pb-[40px] ${fadeCls} transform-gpu bg-transparent`}
      aria-label="Partners — next steps"
    >
      <div className="relative flex w-max max-w-full flex-col items-center p-[16px] -m-[16px] min-[1024px]:px-[20px] min-[1024px]:py-[28px] min-[1024px]:-mx-[20px] min-[1024px]:-my-[28px]">
        <h2
          className={`${gilroyMedium.className} max-w-[560px] text-center text-[40px] leading-[48px] font-medium tracking-[-0.8px] text-transparent [word-break:break-word] not-italic min-[1024px]:text-[49px] min-[1024px]:leading-[60px] min-[1024px]:tracking-[-0.98px] max-[1023px]:text-[28px] max-[1023px]:leading-[34px]`}
          style={{
            backgroundImage:
              "linear-gradient(110.887deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {PARTNERS_FOOTER_CTAS.heading.split('. ').map((part, i, arr) => (
            <span key={i} className="block">
              {part}{i < arr.length - 1 ? "." : ""}
            </span>
          ))}
        </h2>
        <Corners />
      </div>

      <div className="flex flex-col items-center gap-[12px] min-[560px]:flex-row min-[560px]:gap-[20px]">
        <PartnersGreenCta width="204px" href={PARTNERS_FOOTER_CTAS.primary.href}>
          {PARTNERS_FOOTER_CTAS.primary.label}
        </PartnersGreenCta>
        <GhostGreenCta width="204px" href={PARTNERS_FOOTER_CTAS.secondary.href}>
          {PARTNERS_FOOTER_CTAS.secondary.label}
        </GhostGreenCta>
      </div>
    </section>
  );
}
