"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  gilroySemiBold,
  interRegular,
  interMedium,
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
      <TabletScaleCanvas className="relative hidden h-[680px] w-[1440px] shrink-0 min-[600px]:block">
        {/* Left Vertical Guide Line (Ambient Design System Chrome) */}
        <div className="pointer-events-none absolute bottom-0 left-[95px] top-0 z-10 flex w-0 items-center justify-center">
          <div className="flex-none rotate-90">
            <div className="relative h-0 w-[680px]">
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
            <div className="relative h-0 w-[680px]">
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
              href="/contact#calendar"
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

        {/* Bottom Information Strip */}
        <div className="absolute inset-x-[100px] bottom-[25px] z-20 flex h-[64px] items-center justify-between border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[#0d0d0d] px-[28px]">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />

          {/* Block 1: Date */}
          <div className="flex items-center gap-[10px]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/80"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className={`${interMedium.className} text-[14px] font-medium tracking-[-0.01em] text-white`}>
              Nov 10–13, 2026
            </span>
          </div>

          <div className="h-[24px] w-[1px] bg-white/15" />

          {/* Block 2: Location */}
          <div className="flex items-center gap-[10px]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#53d824"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className={`${interMedium.className} text-[14px] font-medium tracking-[-0.01em] text-white`}>
              Messe München
            </span>
          </div>

          <div className="h-[24px] w-[1px] bg-white/15" />

          {/* Block 3: Booths List */}
          <div className="flex items-center gap-[12px]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/80"
              aria-hidden="true"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            <div className="flex items-center gap-[8px] text-[13px]">
              <span className={`${interMedium.className} text-white/70`}>
                Booths:
              </span>
              <span className={`${interRegular.className} text-white/90`}>
                Grinn: Hall C5 · Booth 459
              </span>
              <span className="text-[#53d824]/40">|</span>
              <span className={`${interRegular.className} text-white/90`}>
                Celus: Booth [TBC]
              </span>
            </div>
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
          href="/contact#calendar"
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

        {/* Mobile Info Strip Cards */}
        <div className="mt-[24px] flex w-full flex-col gap-[10px]">
          {/* Date & Location Card */}
          <div className="relative flex items-center justify-between border-[0.5px] border-white/10 bg-[#0d0d0d] px-[16px] py-[12px]">
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            <div className="flex items-center gap-[8px]">
              <span className="text-[14px]">📅</span>
              <span className={`${interMedium.className} text-[13px] tracking-[-0.01em] text-white`}>
                Nov 10–13, 2026
              </span>
            </div>
            <div className="flex items-center gap-[8px]">
              <span className="text-[14px]">📍</span>
              <span className={`${interMedium.className} text-[13px] tracking-[-0.01em] text-[#53d824]`}>
                Messe München
              </span>
            </div>
          </div>

          {/* Booths Card */}
          <div className="relative flex flex-col gap-[6px] border-[0.5px] border-white/10 bg-[#0d0d0d] px-[16px] py-[12px]">
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            <span className={`${interMedium.className} text-[12px] text-white/70`}>
              Booths:
            </span>
            <div className="flex flex-col gap-[3px] text-[12px]">
              <span className={`${interRegular.className} text-white/90`}>
                Grinn: Hall C5 · Booth 459
              </span>
              <span className={`${interRegular.className} text-white/90`}>
                Celus: Booth [TBC]
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

