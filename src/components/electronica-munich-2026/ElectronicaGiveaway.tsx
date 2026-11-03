"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import {
  gilroySemiBold,
  interRegular,
} from "@/components/hero/fonts";
import { TagBadge } from "@/components/hero/TagBadge";
import { Corners } from "@/components/shared/Corners";
import { GreenCtaCorners } from "@/components/shared/GreenCtaCorners";
import { TabletScaleCanvas } from "@/components/shared/TabletScaleCanvas";
import { UpcomingProductsModal } from "@/components/hero/UpcomingProductsModal";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
  HERO_TITLE_GRADIENT,
  PRIMARY_CTA_INSET,
  PRIMARY_CTA_SHADOW,
} from "@/components/products-page/products-data";

export function ElectronicaGiveaway() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      aria-label="Win a GPX10 Pro Evaluation Kit Giveaway"
      className="relative flex w-full justify-center overflow-hidden bg-black text-white"
    >
      {/* Background Subtle Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 25% 45%, rgba(83, 216, 36, 0.08) 0%, rgba(0, 0, 0, 0) 55%)",
        }}
      />

      {/* =========================================================================
          DESKTOP & TABLET VIEWPORT (>= 600px)
          Canvas Width: 1440px (source of truth).
          TabletScaleCanvas auto-scales down to 600px / 768px tablet with 0px deviation.
          ========================================================================= */}
      <TabletScaleCanvas className="relative hidden h-[580px] w-[1440px] shrink-0 min-[600px]:block">
        {/* Left Vertical Guide Line (Ambient Design System Chrome) */}
        <div className="pointer-events-none absolute bottom-0 left-[95px] top-0 z-10 flex w-0 items-center justify-center">
          <div className="flex-none rotate-90">
            <div className="relative h-0 w-[580px]">
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
            <div className="relative h-0 w-[580px]">
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

        {/* Left Column: Form & Content */}
        <div className="absolute left-[100px] top-[75px] z-20 flex w-[540px] flex-col items-start">
          {/* Eyebrow: Signature TagBadge */}
          <div className="mb-[20px]">
            <TagBadge
              label="FREE GIVEAWAY"
              width="max-content"
              centerLabel
            />
          </div>

          {/* Title Area with Corners */}
          <div className="relative inline-flex flex-col items-start p-[16px] pl-[20px] pr-[28px]">
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            <h2
              className={`${gilroySemiBold.className} m-0 bg-clip-text text-[44px] font-semibold leading-[48px] tracking-[-0.01em] text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: HERO_TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              Win a GPX10 Pro
              <br />
              Evaluation Kit.
            </h2>
          </div>

          {/* Description */}
          <div className="mt-[18px] pl-[20px]">
            <p
              className={`${interRegular.className} max-w-[480px] text-[16px] font-normal leading-[25px] text-[#f0f0f0] opacity-85`}
            >
              We&apos;re giving away [N] NuraSense Evaluation Kits to engineers
              at Electronica. Enter to win and put real GPX10 Pro silicon on your
              bench to run real AI and measure the microwatt power yourself.
            </p>
          </div>

          {/* Giveaway CTA */}
          <div className="mt-[28px] pl-[20px] w-full">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[48px] w-max shrink-0 cursor-pointer items-center justify-center overflow-hidden px-[28px] transition-transform duration-200 hover:scale-[1.01]`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
              />
              <span className="relative text-[14px] font-semibold uppercase tracking-[0.02em] text-white not-italic">
                Enter the Giveaway
              </span>
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
              />
              <GreenCtaCorners />
            </button>
          </div>

          {/* Subtext */}
          <div className="mt-[18px] pl-[20px]">
            <p
              className={`${interRegular.className} text-[13px] font-normal leading-[18px] text-[#f0f0f0]/60`}
            >
              Winners drawn live during the show, Nov 10-13.
            </p>
          </div>
        </div>

        {/* Right Column: Hardware Photo with Pointers */}
        <div className="pointer-events-none absolute right-[80px] top-[40px] z-20 flex h-[500px] w-[670px] select-none items-center justify-center">
          <img
            src="/electronica/nurasense-eval-kit-hardware.jpg"
            alt="NuraSense Evaluation Kit with GPX10 Pro Silicon"
            className="size-full rounded-[14px] object-contain shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
          />
        </div>
      </TabletScaleCanvas>

      {/* =========================================================================
          MOBILE VIEWPORT (< 600px, 375px baseline)
          Dedicated responsive mobile layout matching the dark background.
          ========================================================================= */}
      <div className="relative flex w-full max-w-[440px] flex-col items-center px-[20px] py-[44px] min-[600px]:hidden">
        {/* Eyebrow */}
        <div className="mb-[18px]">
          <TagBadge
            label="FREE GIVEAWAY"
            width="max-content"
            centerLabel
          />
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
            Win a GPX10 Pro
            <br />
            Evaluation Kit.
          </h2>
        </div>

        {/* Description Mobile */}
        <p
          className={`${interRegular.className} mb-[24px] max-w-[340px] text-center text-[14px] font-normal leading-[22px] text-[#f0f0f0] opacity-85`}
        >
          We&apos;re giving away [N] NuraSense Evaluation Kits to engineers at
          Electronica. Enter to win and put real GPX10 Pro silicon on your bench
          to run real AI and measure the microwatt power yourself.
        </p>

        {/* Hardware Photo Mobile */}
        <div className="relative mb-[24px] w-full overflow-hidden rounded-[12px] shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
          <img
            src="/electronica/nurasense-eval-kit-hardware.jpg"
            alt="NuraSense Evaluation Kit with GPX10 Pro Silicon"
            className="w-full object-contain"
          />
        </div>

        {/* Form Mobile */}
        <div className="w-full">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[46px] w-full cursor-pointer items-center justify-center overflow-hidden`}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
            />
            <span className="relative text-[14px] font-semibold uppercase tracking-[0.02em] text-white not-italic">
              Enter the Giveaway
            </span>
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
            />
            <GreenCtaCorners />
          </button>

          {/* Subtext Mobile */}
          <div className="mt-[16px] text-center">
            <p className={`${interRegular.className} text-[12px] text-[#f0f0f0]/60`}>
              Winners drawn live during the show, Nov 10-13.
            </p>
          </div>
        </div>
      </div>

      {/* Giveaway Lead Capture Modal */}
      <UpcomingProductsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formContext="evalkit"
        title="Win a GPX10 Pro Evaluation Kit"
        productVariant="NuraSense GPX10 Pro Evaluation Kit"
        hideVariantDropdown
        closeLabel="Close"
        tags={["electronica-2026", "electronica-giveaway", "evalkit"]}
      />
    </section>
  );
}
