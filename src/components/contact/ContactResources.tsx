"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState, type ReactNode } from "react";
import { gilroyMedium } from "../hero/fonts";
import { CornerDecor, GreenCtaButton, WhiteCtaButton } from "./contact-shared";
import { UpcomingProductsModal } from "../hero/UpcomingProductsModal";

const HERO_FADE_MS = 300;
const RESOURCES_DELAY_MS = HERO_FADE_MS + 300;
const HERO_FADE_IN_CLASS = "animate-hero-text-fade-in [animation-duration:300ms] opacity-0";

const GLASS_BACKGROUND = `
  url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E"),
  linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, rgba(10, 15, 20, 0.3) 25%, rgba(10, 15, 20, 0.4) 100%)
`;

const RESOURCE_CTA_IDS = [
  "contact_page_immediate_resources_cta_download_datasheets_sdk",
  "contact_page_immediate_resources_cta_download_press_kit",
  "contact_page_immediate_resources_cta_case_studies_whitepapers",
];

function getResourceCtaId(cta: { label?: string }, index: number): string | undefined {
  const label = (cta.label || "").toLowerCase();
  if (label.includes("datasheet") || label.includes("sdk")) {
    return "contact_page_immediate_resources_cta_download_datasheets_sdk";
  }
  if (label.includes("press")) {
    return "contact_page_immediate_resources_cta_download_press_kit";
  }
  if (label.includes("case") || label.includes("whitepaper")) {
    return "contact_page_immediate_resources_cta_case_studies_whitepapers";
  }
  return RESOURCE_CTA_IDS[index];
}

const MODEL_FORGE_ZIP_URL =
  "https://ambientwebasset.blob.core.windows.net/website-assets/Model_Forge_1.0.0.zip";
const PRESS_KIT_ZIP_FALLBACK = "/Ambient-Press-Kit.zip";

function resolveResourceHref(
  href: string | undefined,
  label: string | undefined,
  pressKitHref?: string | null
): string {
  const cleanHref = (href || "").trim();
  const l = (label || "").toLowerCase();
  const isPress = l.includes("press");
  const isSdkOrDatasheet = l.includes("datasheet") || l.includes("sdk");

  if (isPress) {
    if (cleanHref && cleanHref !== "#" && !cleanHref.startsWith("/news-listing")) return cleanHref;
    if (pressKitHref) return pressKitHref;
    return PRESS_KIT_ZIP_FALLBACK;
  }

  if (isSdkOrDatasheet) {
    if (cleanHref && cleanHref !== "#") return cleanHref;
    return MODEL_FORGE_ZIP_URL;
  }

  if (cleanHref && cleanHref !== "#") return cleanHref;
  if (l.includes("whitepaper") || l.includes("case")) return "/resources#whitepapers";
  return cleanHref || "#";
}

// Strapi shared.button variants are `primary | secondary | ghost`.
// `primary` renders the green CTA; everything else renders the white CTA.
function isPrimaryCta(variant: string | undefined): boolean {
  return variant === "primary" || variant === "green";
}

export function ContactResources({
  data,
  pressKitHref,
}: {
  data?: any;
  pressKitHref?: string | null;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSdkModalOpen, setIsSdkModalOpen] = useState(false);
  const heading = data?.heading || "";
  const ctas: ReadonlyArray<{ label: string; href: string; variant: string }> =
    Array.isArray(data?.ctas) ? data.ctas : [];

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), RESOURCES_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        className={`absolute top-[589px] left-1/2 z-10 flex w-[898px] -translate-x-1/2 flex-col items-center gap-[20px] overflow-clip border border-solid border-[rgba(255,255,255,0.15)] shadow-[0_32px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.4)] p-[24px] ${
          isVisible ? HERO_FADE_IN_CLASS : "translate-y-[25px] opacity-0"
        }`}
        style={{
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
          {heading}
        </p>
        <div className="flex shrink-0 items-start gap-[20px]" data-node-id="2379:8421">
          {ctas.map((cta, index) => {
            const ctaId = getResourceCtaId(cta, index);
            const labelLower = (cta.label || "").toLowerCase();
            const isSdk = labelLower.includes("datasheet") || labelLower.includes("sdk") || index === 0;

            if (isSdk) {
              return isPrimaryCta(cta.variant) ? (
                <GreenCtaButton
                  key={index}
                  id={ctaId}
                  width="270px"
                  onClick={() => setIsSdkModalOpen(true)}
                >
                  {cta.label}
                </GreenCtaButton>
              ) : (
                <WhiteResourceCta
                  key={index}
                  id={ctaId}
                  onClick={() => setIsSdkModalOpen(true)}
                >
                  {cta.label}
                </WhiteResourceCta>
              );
            }

            const href = resolveResourceHref(cta.href, cta.label, pressKitHref);
            const isDownload =
              href.endsWith(".pdf") ||
              href.endsWith(".zip") ||
              href.includes(".zip") ||
              href.includes("Model_Forge") ||
              href.includes("Press-Kit");

            return isPrimaryCta(cta.variant) ? (
              <GreenCtaButton
                key={index}
                id={ctaId}
                width="270px"
                href={href}
                target={isDownload ? "_blank" : undefined}
                rel={isDownload ? "noopener noreferrer" : undefined}
                download={isDownload ? true : undefined}
              >
                {cta.label}
              </GreenCtaButton>
            ) : (
              <WhiteResourceCta
                key={index}
                id={ctaId}
                href={href}
                target={isDownload ? "_blank" : undefined}
                rel={isDownload ? "noopener noreferrer" : undefined}
                download={isDownload ? true : undefined}
              >
                {cta.label}
              </WhiteResourceCta>
            );
          })}
        </div>
      </div>

      <UpcomingProductsModal
        isOpen={isSdkModalOpen}
        onClose={() => setIsSdkModalOpen(false)}
        formContext="sdk"
      />
    </>
  );
}

function WhiteResourceCta({
  children,
  href = "#",
  id,
  target,
  rel,
  download,
  onClick,
}: {
  children: ReactNode;
  href?: string;
  id?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
  onClick?: () => void;
}) {
  return (
    <WhiteCtaButton id={id} href={href} className="w-[270px]" target={target} rel={rel} download={download} onClick={onClick}>
      {children}
    </WhiteCtaButton>
  );
}
