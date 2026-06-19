"use client";

import { useEffect, useState, type ReactNode } from "react";
import { gilroyMedium } from "../hero/fonts";
import { CornerDecor, GreenCtaButton, WhiteCtaButton } from "./contact-shared";

const HERO_FADE_MS = 700;
const RESOURCES_DELAY_MS = HERO_FADE_MS + 1000;
const HERO_FADE_IN_CLASS = "animate-hero-text-fade-in opacity-0";

const GLASS_BACKGROUND = `
  url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E"),
  linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, rgba(10, 15, 20, 0.3) 25%, rgba(10, 15, 20, 0.4) 100%)
`;

export function ContactResources() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), RESOURCES_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <svg style={{ width: 0, height: 0, position: "absolute" }} aria-hidden>
        <filter id="architectural-glass" x="-20%" y="-20%" width="140%" height="140%">
          {/* Layer 1: Live optical background distortion (gentle, broad curves) */}
          <feTurbulence type="fractalNoise" baseFrequency="0.0015" numOctaves="2" result="warpNoise" />
          <feDisplacementMap in="SourceGraphic" in2="warpNoise" scale="12" xChannelSelector="R" yChannelSelector="G" result="warped" />
          {/* Layer 2: Backdrop blur (5-8px) */}
          <feGaussianBlur in="warped" stdDeviation="6" result="blurred" />
        </filter>
      </svg>
      <div
        className={`absolute top-[589px] left-1/2 z-10 flex w-[898px] -translate-x-1/2 flex-col items-center gap-[20px] overflow-clip border border-solid border-[rgba(255,255,255,0.15)] shadow-[0_32px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.4)] p-[24px] ${
          isVisible ? HERO_FADE_IN_CLASS : "translate-y-[25px] opacity-0"
        }`}
        style={{
          backdropFilter: "url(#architectural-glass)",
          WebkitBackdropFilter: "url(#architectural-glass)",
          background: GLASS_BACKGROUND,
        }}
        data-node-id="2379:8413"
        data-name="Article"
      >
      <CornerDecor />
      <p
        className={`${gilroyMedium.className} w-full shrink-0 text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
        data-node-id="2379:8416"
      >
        Looking for immediate resources?
      </p>
      <div className="flex shrink-0 items-start gap-[20px]" data-node-id="2379:8421">
        <GreenCtaButton width="270px" href="#">
          Download Datasheets & SDK
        </GreenCtaButton>
        <WhiteResourceCta>Download Press Kit</WhiteResourceCta>
        <WhiteResourceCta>Case Studies & Whitepapers</WhiteResourceCta>
      </div>
    </div>
    </>
  );
}

function WhiteResourceCta({ children }: { children: ReactNode }) {
  return (
    <WhiteCtaButton href="#" className="w-[270px]">
      {children}
    </WhiteCtaButton>
  );
}
