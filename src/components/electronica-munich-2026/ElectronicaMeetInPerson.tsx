"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  gilroySemiBold,
  interRegular,
} from "@/components/hero/fonts";
import { TagBadge } from "@/components/hero/TagBadge";
import { Corners } from "@/components/shared/Corners";
import { GreenCtaCorners } from "@/components/shared/GreenCtaCorners";
import { TabletScaleCanvas } from "@/components/shared/TabletScaleCanvas";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
  HERO_TITLE_GRADIENT,
  PRIMARY_CTA_INSET,
  PRIMARY_CTA_SHADOW,
} from "@/components/products-page/products-data";

export function ElectronicaMeetInPerson() {
  return (
    <section
      aria-label="Meet the ecosystem in person at Electronica 2026"
      className="relative flex w-full justify-center overflow-hidden bg-black py-[50px] text-white min-[600px]:py-[40px]"
    >
      {/* Background Subtle Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 75% 45%, rgba(83, 216, 36, 0.08) 0%, rgba(0, 0, 0, 0) 55%)",
        }}
      />

      {/* =========================================================================
          DESKTOP & TABLET VIEWPORT (>= 600px)
          Canvas Width: 1440px (source of truth).
          TabletScaleCanvas auto-scales down to 600px / 768px tablet with 0px deviation.
          ========================================================================= */}
      <TabletScaleCanvas className="relative hidden h-[540px] w-[1440px] shrink-0 min-[600px]:block">
        {/* Left Vertical Guide Line (Ambient Design System Chrome) */}
        <div className="pointer-events-none absolute bottom-0 left-[95px] top-0 z-10 flex w-0 items-center justify-center">
          <div className="flex-none rotate-90">
            <div className="relative h-0 w-[540px]">
              <div className="absolute inset-[-1px_0_0_0]">
                <img
                  src="/hero/line-82.svg"
                  alt=""
                  className="block size-full max-w-none opacity-40"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Vertical Guide Line (Ambient Design System Chrome) */}
        <div className="pointer-events-none absolute bottom-0 right-[95px] top-0 z-10 flex w-0 items-center justify-center">
          <div className="flex-none rotate-90">
            <div className="relative h-0 w-[540px]">
              <div className="absolute inset-[-0.5px_0]">
                <img
                  src="/hero/line-83.svg"
                  alt=""
                  className="block size-full max-w-none opacity-40"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Left Column: Eyebrow, Title, Description, and CTA */}
        <div className="absolute left-[100px] top-[70px] z-20 flex w-[500px] flex-col items-start">
          {/* Eyebrow: Signature TagBadge */}
          <div className="mb-[20px]">
            <TagBadge
              label="NOW TOUCH THE HARDWARE"
              width="max-content"
              centerLabel
            />
          </div>

          {/* Title Area with Corners */}
          <div className="relative inline-flex flex-col items-start p-[16px] pl-[20px] pr-[28px]">
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            <h2
              className={`${gilroySemiBold.className} m-0 bg-clip-text text-[46px] font-semibold leading-[52px] tracking-[-0.01em] text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: HERO_TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              See the ecosystem
              <br />
              running in Munich.
            </h2>
          </div>

          {/* Description */}
          <div className="mt-[18px] pl-[20px]">
            <p
              className={`${interRegular.className} max-w-[480px] text-[16px] font-normal leading-[25px] text-[#f0f0f0] opacity-85`}
            >
              Bring us your model, your product idea, your power budget, or the
              application you&apos;ve been waiting to build. We&apos;ll show you
              the shortest path from idea to running AI.
            </p>
          </div>

          {/* CTA Button without Arrow */}
          <div className="mt-[32px] pl-[20px]">
            <Link
              href="https://calendly.com/saharsh-ambientscientific/electronica-2026"
              target="_blank"
              rel="noopener noreferrer"
              className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[48px] shrink-0 items-center justify-center overflow-hidden px-[28px] transition-transform duration-200 hover:scale-[1.01]`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
              />
              <span className="relative text-[14px] font-semibold uppercase tracking-[0.02em] text-white not-italic">
                Book a 1:1 at Electronica
              </span>
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
              />
              <GreenCtaCorners />
            </Link>
          </div>
        </div>

        {/* Right Column: 3D Exhibition Hall Map */}
        <div className="pointer-events-none absolute right-[80px] top-[40px] z-20 flex h-[460px] w-[670px] select-none items-center justify-center">
          <img
            src="/electronica/booth-map-3d.jpg"
            alt="Messe München Exhibition Floor Plan with Grinn, Celus, and Embedder Booths"
            className="size-full object-contain"
          />
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
            label="NOW TOUCH THE HARDWARE"
            width="max-content"
            centerLabel
          />
        </div>

        {/* Title Area Mobile */}
        <div className="relative mb-[16px] inline-flex flex-col items-center p-[16px]">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroySemiBold.className} w-[320px] max-w-full bg-clip-text text-center text-[28px] font-semibold leading-[34px] tracking-[-0.01em] text-transparent not-italic [word-break:break-word]`}
            style={{
              backgroundImage: HERO_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            See the ecosystem
            <br />
            running in Munich.
          </h2>
        </div>

        {/* Description Mobile */}
        <p
          className={`${interRegular.className} mb-[24px] max-w-[340px] text-center text-[14px] font-normal leading-[22px] text-[#f0f0f0] opacity-85`}
        >
          Bring us your model, your product idea, your power budget, or the
          application you&apos;ve been waiting to build. We&apos;ll show you the
          shortest path from idea to running AI.
        </p>

        {/* 3D Map Mobile */}
        <div className="relative mb-[24px] w-full overflow-hidden rounded-[8px] border-[0.5px] border-solid border-[rgba(240,240,240,0.18)] bg-[#0d0d0d]/90 p-[8px]">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <img
            src="/electronica/booth-map-3d.jpg"
            alt="Messe München Exhibition Floor Plan with Grinn, Celus, and Embedder Booths"
            className="w-full object-contain"
          />
        </div>

        {/* CTA Button Mobile */}
        <Link
          href="https://calendly.com/saharsh-ambientscientific/electronica-2026"
          target="_blank"
          rel="noopener noreferrer"
          className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[48px] w-full items-center justify-center overflow-hidden`}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
          />
          <span className="relative text-[14px] font-semibold uppercase tracking-[0.02em] text-white not-italic">
            Book a 1:1 at Electronica
          </span>
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
          />
          <GreenCtaCorners />
        </Link>
      </div>
    </section>
  );
}

