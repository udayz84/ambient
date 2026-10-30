"use client";

/* eslint-disable @next/next/no-img-element */
import { gilroySemiBold } from "@/components/hero/fonts";
import { TagBadge } from "@/components/hero/TagBadge";
import { Corners } from "@/components/shared/Corners";
import { TabletScaleCanvas } from "@/components/shared/TabletScaleCanvas";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
  HERO_TITLE_GRADIENT,
} from "@/components/products-page/products-data";

export function ElectronicaCenterEcosystem() {
  return (
    <section
      id="ecosystem-pipeline"
      aria-label="GPX10 Pro at the center of a growing ecosystem"
      className="relative flex w-full justify-center overflow-hidden bg-black py-[40px] text-white min-[600px]:pt-[40px] min-[600px]:pb-[16px]"
    >
      {/* Background Subtle Radial Green Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 65%, rgba(83, 216, 36, 0.08) 0%, rgba(0, 0, 0, 0) 65%)",
        }}
      />

      {/* =========================================================================
          DESKTOP & TABLET VIEWPORT (>= 600px)
          Canvas Width: 1440px (source of truth).
          TabletScaleCanvas auto-scales down to 600px / 768px tablet with 0px deviation.
          ========================================================================= */}
      <TabletScaleCanvas className="relative hidden h-[500px] w-[1440px] shrink-0 min-[600px]:block">
        {/* Content Container: Title Above, Picture Downwards */}
        <div className="absolute inset-x-0 top-[24px] z-20 flex flex-col items-center">
          {/* Eyebrow: Signature TagBadge */}
          <div className="mb-[18px]">
            <TagBadge
              label="ONE CORE, MORE WAYS TO BUILD"
              width="max-content"
              centerLabel
            />
          </div>

          {/* Title Above with Ambient Signature Corners & Metallic Gradient */}
          <div className="relative inline-flex flex-col items-center p-[16px] px-[32px]">
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            <h2
              className={`${gilroySemiBold.className} m-0 bg-clip-text text-center text-[44px] font-semibold leading-[52px] tracking-[-0.01em] text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: HERO_TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              GPX10 Pro at the center of a growing ecosystem.
            </h2>
          </div>

          {/* Picture Downwards: Connected Ecosystem Pipeline Image (Compact Balanced Size) */}
          <div className="relative mt-[20px] flex h-[308px] w-[980px] select-none items-center justify-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(83, 216, 36, 0.08) 0%, rgba(0, 0, 0, 0) 70%)",
              }}
            />
            <img
              src="/electronica/ecosystem-workflow.jpg"
              alt="GPX10 Pro Ecosystem Workflow: Ambient (Model) → NuraSense (Validate) → Celus (Design) → Grinn (Integrate) → Your Application (Product) + More partners"
              className="relative z-10 size-full object-contain"
            />
          </div>
        </div>
      </TabletScaleCanvas>

      {/* =========================================================================
          MOBILE VIEWPORT (< 600px, 375px baseline)
          Dedicated responsive mobile layout with Ambient global theme components.
          ========================================================================= */}
      <div className="relative flex w-full max-w-[440px] flex-col items-center px-[20px] min-[600px]:hidden">
        {/* Eyebrow */}
        <div className="mb-[18px]">
          <TagBadge
            label="ONE CORE, MORE WAYS TO BUILD"
            width="max-content"
            centerLabel
          />
        </div>

        {/* Title Area Mobile */}
        <div className="relative mb-[20px] inline-flex flex-col items-center p-[14px]">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroySemiBold.className} w-[320px] max-w-full bg-clip-text text-center text-[28px] font-semibold leading-[34px] tracking-[-0.01em] text-transparent not-italic [word-break:break-word]`}
            style={{
              backgroundImage: HERO_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            GPX10 Pro at the center
            <br />
            of a growing ecosystem.
          </h2>
        </div>

        {/* Ecosystem Workflow Image Downwards on Mobile */}
        <div className="relative w-full overflow-hidden">
          <img
            src="/electronica/ecosystem-workflow.jpg"
            alt="GPX10 Pro Ecosystem Workflow"
            className="w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
