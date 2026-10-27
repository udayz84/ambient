"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { gilroySemiBold } from "../hero/fonts";
import { mediaUrl } from "@/lib/strapi";
import { CAROUSEL_ALL_SLOTS, type CarouselSlot } from "./ecosystem-data";

/**
 * Single "PARTNERS" carousel — one full-bleed strip with every partner card
 * (silicon + development merged), panning right→left continuously and
 * seamlessly. Track = two identical halves so the -50% marquee loop never
 * shows a seam, and the strip spans the whole page width (no edge cut).
 */

const TITLE_GRADIENT =
  "linear-gradient(119.414deg, rgba(255, 255, 255, 0.35) 1.3527%, rgba(212, 233, 188, 0.22) 55.161%, rgba(255, 255, 255, 0.1) 111.67%)";

// ~100px/s — matches the pan speed of the previous frame carousel.
const MARQUEE_DURATION_S = 40;

/**
 * Renders partners from Strapi if populated with valid logos.
 * Falls back to CAROUSEL_ALL_SLOTS from ecosystem-data.ts when empty.
 */
function resolveSlots(data: any): readonly CarouselSlot[] {
  const partners = Array.isArray(data?.partners) && data.partners.length > 0 ? data.partners : null;
  if (partners) {
    const cmsSlots = partners
      .map((p: any) => {
        const src = mediaUrl(p.logo) || (typeof p.logo === "string" ? p.logo : null);
        if (!src) return null;
        return {
          name: p.name || "",
          src,
          width: p.width || 120,
          height: p.height || 40,
        };
      })
      .filter(Boolean) as CarouselSlot[];

    if (cmsSlots.length > 0) {
      return cmsSlots;
    }
  }
  return CAROUSEL_ALL_SLOTS;
}

function MarqueeDivider() {
  return (
    <div
      aria-hidden
      className="relative h-[180px] md:h-[225px] w-[8px] shrink-0 flex flex-col items-center justify-between"
    >
      {/* Top arrow cap */}
      <div className="h-[4.5px] w-[8px] shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ecosystem/grid-cap.svg"
          alt=""
          className="block size-full max-w-none rotate-180"
        />
      </div>

      {/* Connecting vertical line */}
      <div className="w-[1px] flex-1 bg-white/20" />

      {/* Bottom arrow cap */}
      <div className="h-[4.5px] w-[8px] shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ecosystem/grid-cap.svg"
          alt=""
          className="block size-full max-w-none"
        />
      </div>
    </div>
  );
}

function PartnerCard({ slot }: { slot: CarouselSlot }) {
  const isEdgeAi = slot.src?.includes("edgeai");
  // CMS-uploaded logos are white SVGs → dark box. Local fallback assets
  // (designed dark logos) keep the white box.
  const isCmsUpload = /^https?:\/\//.test(slot.src ?? "");
  return (
    <div className="flex h-[180px] md:h-[225px] shrink-0 items-center px-[20px] md:px-[28px]">
      <div
        className={`relative flex h-[92px] w-[184px] md:h-[112px] md:w-[224px] shrink-0 items-center justify-center rounded-[8px] p-[8px] md:p-[10px] shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-transform duration-200 hover:scale-105 ${
          isEdgeAi
            ? "bg-[#014C52]"
            : isCmsUpload
              ? "border border-[#2a332b] bg-[#0f1410]"
              : "bg-white"
        }`}
      >
        {slot.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={slot.src}
            alt={slot.name || "Partner"}
            className="block max-h-full max-w-full object-contain"
          />
        ) : null}
      </div>
    </div>
  );
}

export function EcosystemPartners({ data }: { data?: any }) {
  const slots = resolveSlots(data);
  const halves = [0, 1]; // two identical halves for the seamless -50% loop

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      data-node-id="2379:1047"
    >
      {/* Title — aligned with the site grid */}
      <div className="relative z-10 mx-auto w-full max-w-[1204px] px-[16px] md:px-[24px]">
        <p
          className={`${gilroySemiBold.className} relative -translate-y-[2px] md:-translate-y-[4px] shrink-0 bg-clip-text text-[36px] leading-[40px] md:text-[56px] md:leading-[60px] font-semibold tracking-[-0.72px] md:tracking-[-1.12px] whitespace-nowrap text-[transparent] opacity-80 not-italic`}
          style={{ backgroundImage: TITLE_GRADIENT }}
          data-node-id="2379:1048"
        >
          PARTNERS
        </p>
      </div>

      {/* Full-bleed continuous marquee — cards flow edge to edge */}
      <div className="relative -mt-[12px] md:-mt-[16px] w-full overflow-hidden border-y border-white/20 bg-[rgba(255,255,255,0.04)]">
        <div
          className="flex w-max animate-dvk-marquee-left items-center"
          style={{ animationDuration: `${MARQUEE_DURATION_S}s` }}
        >
          {halves.map((half) => (
            <div key={half} className="flex shrink-0 items-center" aria-hidden={half === 1}>
              {slots.map((slot, i) => (
                <div key={`${half}-${i}`} className="flex shrink-0 items-center">
                  <PartnerCard slot={slot} />
                  <MarqueeDivider />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
