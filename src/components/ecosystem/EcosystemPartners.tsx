"use client";

import { gilroySemiBold } from "../hero/fonts";
import { CAROUSEL_ALL_SLOTS, type CarouselSlot } from "./ecosystem-data";

/**
 * Single "PARTNERS" carousel — one full-bleed strip with every partner card
 * (silicon + development merged), panning right→left continuously and
 * seamlessly. Track = two identical halves so the -50% marquee loop never
 * shows a seam, and the strip spans the whole page width (no edge cut).
 */

const TITLE_GRADIENT =
  "linear-gradient(119.414deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

// ~100px/s — matches the pan speed of the previous frame carousel.
const MARQUEE_DURATION_S = 40;

/**
 * The carousel always renders the current partner set from
 * ecosystem-data.ts (CAROUSEL_ALL_SLOTS — the real, recently added partner
 * logos in /public/ecosystem/partners/). The Strapi placeholder entries
 * ("Partner 1–5", generic white SVGs) are intentionally NOT used.
 */
function resolveSlots(_data: any): readonly CarouselSlot[] {
  void _data; // intentionally unused: CMS placeholders not rendered
  return CAROUSEL_ALL_SLOTS;
}

function PartnerCard({ slot }: { slot: CarouselSlot }) {
  const isEdgeAi = slot.src?.includes("edgeai");
  // CMS-uploaded logos are white SVGs → dark box. Local fallback assets
  // (designed dark logos) keep the white box.
  const isCmsUpload = /^https?:\/\//.test(slot.src ?? "");
  return (
    <div className="flex h-[225px] shrink-0 items-center px-[28px]">
      <div
        className={`relative flex h-[112px] w-[224px] shrink-0 items-center justify-center rounded-[8px] p-[10px] shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-transform duration-200 hover:scale-105 ${
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
      <div className="mx-auto w-full max-w-[1204px] px-[24px]">
        <p
          className={`${gilroySemiBold.className} relative shrink-0 bg-clip-text text-[56px] leading-[60px] font-semibold tracking-[-1.12px] whitespace-nowrap text-[transparent] opacity-90 not-italic`}
          style={{ backgroundImage: TITLE_GRADIENT }}
          data-node-id="2379:1048"
        >
          PARTNERS
        </p>
      </div>

      {/* Full-bleed continuous marquee — cards flow edge to edge */}
      <div className="relative mt-[20px] w-full overflow-hidden border-y border-white/20 bg-[rgba(255,255,255,0.04)]">
        <div
          className="flex w-max animate-dvk-marquee-left items-center"
          style={{ animationDuration: `${MARQUEE_DURATION_S}s` }}
        >
          {halves.map((half) => (
            <div key={half} className="flex shrink-0 items-center" aria-hidden={half === 1}>
              {slots.map((slot, i) => (
                <div key={`${half}-${i}`} className="flex shrink-0 items-center">
                  <PartnerCard slot={slot} />
                  <div
                    aria-hidden
                    className="h-[140px] w-[0.5px] shrink-0 bg-white/20"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
