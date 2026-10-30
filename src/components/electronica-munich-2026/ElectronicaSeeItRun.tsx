"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
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

export function ElectronicaSeeItRun() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsVideoModalOpen(false);
    }
    if (isVideoModalOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isVideoModalOpen]);

  return (
    <section
      aria-label="See GPX10 Pro Run"
      className="relative flex w-full justify-center overflow-hidden bg-black py-[40px] text-white min-[600px]:pt-[16px] min-[600px]:pb-[40px]"
    >
      {/* Background Subtle Radial Green Glow behind Video */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 25% 50%, rgba(83, 216, 36, 0.10) 0%, rgba(0, 0, 0, 0) 55%)",
        }}
      />

      {/* =========================================================================
          DESKTOP & TABLET VIEWPORT (>= 600px)
          Canvas Width: 1440px (source of truth).
          TabletScaleCanvas auto-scales down to 600px / 768px tablet with 0px deviation.
          ========================================================================= */}
      <TabletScaleCanvas className="relative hidden h-[450px] w-[1440px] shrink-0 min-[600px]:block">
        {/* Left Vertical Guide Line (Ambient Design System Chrome) */}
        <div className="pointer-events-none absolute bottom-0 left-[95px] top-0 z-10 flex w-0 items-center justify-center">
          <div className="flex-none rotate-90">
            <div className="relative h-0 w-[450px]">
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
            <div className="relative h-0 w-[450px]">
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

        {/* Left Column: Video Preview Card */}
        <div className="absolute left-[100px] top-[20px] z-20 flex h-[385px] w-[580px] items-center justify-center">
          <div
            onClick={() => setIsVideoModalOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setIsVideoModalOpen(true);
            }}
            aria-label="Play GPX10 Pro ecosystem demo video"
            className="group relative flex size-full cursor-pointer overflow-hidden border-[0.5px] border-solid border-[#53d824]/40 bg-[#0d0d0d] shadow-[0_0_30px_rgba(83,216,36,0.12)] transition-all duration-300 hover:border-[#53d824] hover:shadow-[0_0_40px_rgba(83,216,36,0.25)]"
          >
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            <img
              src="/electronica/see-it-run-video.png"
              alt="Ambient GPX10 Pro silicon running in production"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* Right Column: Eyebrow, Title, Description, and CTA (Right-Aligned) */}
        <div className="absolute right-[100px] top-[20px] z-20 flex w-[540px] flex-col items-end text-right">
          {/* Eyebrow: Signature TagBadge */}
          <div className="mb-[20px]">
            <TagBadge
              label="SEE IT RUN"
              width="max-content"
              centerLabel
            />
          </div>

          {/* Title Area with Ambient Signature Corners & Metallic Gradient */}
          <div className="relative inline-flex flex-col items-end p-[16px] pl-[28px] pr-[20px]">
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            <h2
              className={`${gilroySemiBold.className} m-0 bg-clip-text text-right text-[46px] font-semibold leading-[52px] tracking-[-0.01em] text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: HERO_TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              One chip.
              <br />
              The whole ecosystem.
            </h2>
          </div>

          {/* Description */}
          <div className="mt-[18px] pr-[20px] flex justify-end">
            <p
              className={`${interRegular.className} max-w-[480px] text-right text-[16px] font-normal leading-[25px] text-[#f0f0f0] opacity-85`}
            >
              Watch GPX10 Pro run across Grinn, Celus, and Embedder designs —
              real AI at microwatt power, on real silicon, from drop-in modules
              to custom boards.
            </p>
          </div>

          {/* CTA Button without Arrow */}
          <div className="mt-[32px] pr-[20px] flex justify-end">
            <Link
              href="/contact#calendar"
              className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[48px] shrink-0 items-center justify-center overflow-hidden px-[28px] transition-transform duration-200 hover:scale-[1.01]`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
              />
              <span className="relative text-[14px] font-semibold uppercase tracking-[0.02em] text-white not-italic">
                Book a Meeting to See It Live
              </span>
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
              />
              <GreenCtaCorners />
            </Link>
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
          <TagBadge label="SEE IT RUN" width="max-content" centerLabel />
        </div>

        {/* Title Area Mobile */}
        <div className="relative mb-[16px] inline-flex flex-col items-center p-[16px]">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroySemiBold.className} w-[320px] max-w-full bg-clip-text text-center text-[30px] font-semibold leading-[36px] tracking-[-0.01em] text-transparent not-italic [word-break:break-word]`}
            style={{
              backgroundImage: HERO_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            One chip.
            <br />
            The whole ecosystem.
          </h2>
        </div>

        {/* Description Mobile */}
        <p
          className={`${interRegular.className} mb-[24px] max-w-[340px] text-center text-[14px] font-normal leading-[22px] text-[#f0f0f0] opacity-85`}
        >
          Watch GPX10 Pro run across Grinn, Celus, and Embedder designs — real
          AI at microwatt power, on real silicon, from drop-in modules to custom
          boards.
        </p>

        {/* Video Preview Card Mobile */}
        <div
          onClick={() => setIsVideoModalOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setIsVideoModalOpen(true);
          }}
          aria-label="Play GPX10 Pro ecosystem demo video"
          className="group relative mb-[24px] flex w-full cursor-pointer overflow-hidden border-[0.5px] border-solid border-[#53d824]/40 bg-[#0d0d0d] shadow-[0_0_24px_rgba(83,216,36,0.12)]"
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <img
            src="/electronica/see-it-run-video.png"
            alt="Ambient GPX10 Pro silicon running in production"
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
            Book a Meeting to See It Live
          </span>
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
          />
          <GreenCtaCorners />
        </Link>
      </div>

      {/* Video Modal Popup */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-[16px] backdrop-blur-md">
          <div className="relative w-full max-w-[800px] overflow-hidden border border-white/20 bg-[#0d0d0d] p-[8px]">
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            <div className="flex items-center justify-between pb-[8px] px-[8px]">
              <span className={`${gilroySemiBold.className} text-[15px] font-semibold text-white`}>
                GPX10 Pro Ecosystem Demonstration
              </span>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="text-[20px] text-white/70 hover:text-white"
                aria-label="Close video"
              >
                ✕
              </button>
            </div>
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <iframe
                src="https://www.youtube-nocookie.com/embed/7lBZ3cqqvE8?autoplay=1"
                title="GPX10 Pro Ecosystem Demonstration"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="size-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

