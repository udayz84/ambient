"use client";

import { useEffect, useState, type ReactNode } from "react";
import { interMedium } from "../hero/fonts";
import { CornerDecor, GreenCtaButton, WhiteCtaButton } from "./contact-shared";

const HERO_FADE_MS = 700;
const RESOURCES_DELAY_MS = HERO_FADE_MS + 1000;
const HERO_FADE_IN_CLASS = "animate-hero-text-fade-in opacity-0";

export function ContactResources() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), RESOURCES_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className={`absolute top-[547px] left-1/2 z-10 flex w-[898px] -translate-x-1/2 flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.5)] bg-[rgba(0,0,0,0.2)] p-[24px] ${
        isVisible ? HERO_FADE_IN_CLASS : "translate-y-[25px] opacity-0"
      }`}
      data-node-id="2379:8413"
      data-name="Article"
    >
      <CornerDecor />
      <p
        className={`${interMedium.className} w-full shrink-0 text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
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
  );
}

function WhiteResourceCta({ children }: { children: ReactNode }) {
  return (
    <WhiteCtaButton href="#" className="w-[270px]">
      {children}
    </WhiteCtaButton>
  );
}
