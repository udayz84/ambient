"use client";

import { interRegular, gilroyMedium } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { useFadeIn } from "../shared/useFadeIn";
import { PARTNERS_PROOF } from "./partners-data";
import { PartnersSectionHeading } from "./partners-shared";

function ProofMarker() {
  return (
    <span className="relative flex size-[22px] shrink-0 items-center justify-center" aria-hidden>
      <span className="absolute inset-0 border-[0.5px] border-solid border-[rgba(83,216,36,0.6)] bg-[rgba(83,216,36,0.1)]" />
      <svg viewBox="0 0 12 12" className="size-[10px]" fill="none">
        <path d="M2.5 6.5L5 9L9.5 3.5" stroke="#53d824" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function ProofLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="group/link relative flex h-[48px] cursor-pointer items-center gap-[10px] border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(21,21,21,0.3)] px-[24px] backdrop-blur-[8px] transition-[border-color,background-color] duration-200 hover:border-[rgba(83,216,36,0.5)] hover:bg-[rgba(46,119,20,0.14)]"
    >
      <span className={`${gilroyMedium.className} text-[13px] leading-[18px] font-medium tracking-[0.39px] whitespace-nowrap text-[#ecfae5] uppercase not-italic`}>
        {label}
      </span>
      <svg
        viewBox="0 0 14 8"
        className="h-[8px] w-[14px] shrink-0 text-[#53d824] transition-transform duration-200 group-hover/link:translate-x-[4px]"
        fill="none"
        aria-hidden
      >
        <path d="M0 4H12M9 1L12.5 4L9 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <Corners />
    </a>
  );
}

export function PartnersProof() {
  const { fadeRef, isVisible } = useFadeIn<HTMLElement>();
  const fadeCls = isVisible ? "animate-hero-text-fade-in opacity-0" : "translate-y-[25px] opacity-0";

  return (
    <section
      ref={fadeRef}
      className={`relative mx-auto flex w-full max-w-[1204px] flex-col items-center gap-[40px] px-[24px] py-[40px] min-[1024px]:py-[96px] ${fadeCls} transform-gpu`}
      aria-label="GPX-native proof"
    >
      <div className="relative flex flex-col items-center gap-[16px] px-[10px]">
        <PartnersSectionHeading deg="119.522deg">{PARTNERS_PROOF.heading}</PartnersSectionHeading>
        <Corners />
      </div>

      <p className={`${interRegular.className} max-w-[720px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic max-[1023px]:text-[14px] max-[1023px]:leading-[21px]`}>
        {PARTNERS_PROOF.subheading}
      </p>

      {/* proof band */}
      <div className="relative grid w-full grid-cols-1 border-[0.5px] border-solid border-[rgba(83,216,36,0.25)] bg-[rgba(46,119,20,0.08)] backdrop-blur-[8px] min-[1024px]:grid-cols-4 min-[1024px]:divide-x min-[1024px]:divide-[rgba(83,216,36,0.2)]">
        <Corners />
        {PARTNERS_PROOF.points.map((point) => (
          <div key={point.title} className="flex min-h-[220px] flex-col items-start gap-[14px] p-[28px] max-[1023px]:border-b max-[1023px]:border-solid max-[1023px]:border-[rgba(83,216,36,0.2)] max-[1023px]:last:border-b-0">
            <ProofMarker />
            <h3 className={`${gilroyMedium.className} w-full text-[20px] leading-[26px] font-medium text-white [word-break:break-word] not-italic min-[1024px]:text-[22px] min-[1024px]:leading-[28px]`}>
              {point.title}
            </h3>
            <p className={`${interRegular.className} w-full text-[14px] leading-[21px] font-normal text-white opacity-65 [word-break:break-word] not-italic`}>
              {point.description}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-[16px]">
        {PARTNERS_PROOF.links.map((link) => (
          <ProofLink key={link.label} label={link.label} href={link.href} />
        ))}
      </div>
    </section>
  );
}
