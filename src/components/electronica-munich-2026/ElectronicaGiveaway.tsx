"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import {
  gilroySemiBold,
  interRegular,
  interMedium,
  dmMono,
} from "@/components/hero/fonts";
import { Corners } from "@/components/shared/Corners";
import { GreenCtaCorners } from "@/components/shared/GreenCtaCorners";
import { TabletScaleCanvas } from "@/components/shared/TabletScaleCanvas";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
  PRIMARY_CTA_INSET,
  PRIMARY_CTA_SHADOW,
} from "@/components/products-page/products-data";

export function ElectronicaGiveaway() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    // Submit to newsletter / giveaway endpoint
    fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        formKey: "electronica-giveaway-2026",
      }),
    }).catch(() => {
      /* silently ignore */
    });
  };

  return (
    <section
      aria-label="Win a GPX10 Pro Evaluation Kit Giveaway"
      className="relative flex w-full justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #f0f4f8 0%, #e9edf3 45%, #d6dde7 100%)",
      }}
    >
      {/* =========================================================================
          DESKTOP & TABLET VIEWPORT (>= 600px)
          Canvas Width: 1440px (source of truth).
          TabletScaleCanvas auto-scales down to 600px / 768px tablet with 0px deviation.
          ========================================================================= */}
      <TabletScaleCanvas className="relative hidden h-[580px] w-[1440px] shrink-0 min-[600px]:block">
        {/* Left Column: Form & Content */}
        <div className="absolute left-[100px] top-[75px] z-20 flex w-[540px] flex-col items-start">
          {/* Eyebrow: Light Mode Ambient TagBadge */}
          <div className="mb-[20px]">
            <div
              className={`${dmMono.className} relative shrink-0 overflow-hidden border-[0.5px] border-solid border-black/15 bg-white/70 px-[16px] py-[4px] backdrop-blur-md`}
              style={{ width: "max-content", height: 26 }}
            >
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
              <div className="flex h-full items-center justify-center">
                <p className="whitespace-nowrap text-[13px] font-normal uppercase tracking-[0.04em] text-[#0f2912]">
                  FREE GIVEAWAY
                </p>
              </div>
              <div className="absolute left-[6.5px] top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-[#53d824]" />
              <div className="absolute right-[6.5px] top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-[#53d824]" />
            </div>
          </div>

          {/* Title Area with Corners */}
          <div className="relative inline-flex flex-col items-start p-[16px] pl-[20px] pr-[28px]">
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            <h2
              className={`${gilroySemiBold.className} m-0 text-[44px] font-semibold leading-[48px] tracking-[-0.01em] text-[#090b0e] not-italic [word-break:break-word]`}
            >
              Win a GPX10 Pro
              <br />
              Evaluation Kit.
            </h2>
          </div>

          {/* Description */}
          <div className="mt-[18px] pl-[20px]">
            <p
              className={`${interRegular.className} max-w-[480px] text-[16px] font-normal leading-[25px] text-[#374151]`}
            >
              We&apos;re giving away [N] NuraSense Evaluation Kits to engineers
              at Electronica. Enter to win and put real GPX10 Pro silicon on your
              bench — run real AI and measure the microwatt power yourself.
            </p>
          </div>

          {/* Giveaway Submission Form */}
          <div className="mt-[28px] pl-[20px] w-full">
            {submitted ? (
              <div className="relative inline-flex items-center gap-[12px] border border-[#53d824]/60 bg-white/90 px-[20px] py-[14px] shadow-sm">
                <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
                <span className={`${interMedium.className} text-[14px] text-[#1b4317] font-medium`}>
                  ✓ You&apos;re entered! We&apos;ll notify winners during Electronica.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-[12px]"
              >
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Work email (company email only)"
                    className={`${interRegular.className} h-[48px] w-[290px] border border-black/20 bg-white px-[18px] text-[14px] text-black outline-none placeholder:text-gray-500 focus:border-[#38a612] focus:ring-1 focus:ring-[#38a612] shadow-sm`}
                  />
                  <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
                </div>

                {/* Primary Green CTA Button without Arrow */}
                <button
                  type="submit"
                  className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[48px] shrink-0 items-center justify-center overflow-hidden px-[24px] transition-transform duration-200 hover:scale-[1.01]`}
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
              </form>
            )}
          </div>

          {/* Subtext & Terms */}
          <div className="mt-[18px] pl-[20px] flex flex-col gap-[4px]">
            <p
              className={`${interRegular.className} text-[13px] font-normal leading-[18px] text-[#4b5563]`}
            >
              Winners drawn live during the show, Nov 10-13.
            </p>
            <a
              href="/terms-conditions"
              className={`${interRegular.className} text-[13px] font-medium text-[#1b4317] hover:underline`}
            >
              Entry terms
            </a>
          </div>
        </div>

        {/* Right Column: Hardware Photo with Pointers */}
        <div className="pointer-events-none absolute right-[80px] top-[40px] z-20 flex h-[500px] w-[670px] select-none items-center justify-center">
          <img
            src="/electronica/nurasense-kit-clean.png"
            alt="NuraSense Evaluation Kit with GPX10 Pro Silicon"
            className="size-full object-contain"
          />
        </div>
      </TabletScaleCanvas>

      {/* =========================================================================
          MOBILE VIEWPORT (< 600px, 375px baseline)
          Dedicated responsive mobile layout matching the light background.
          ========================================================================= */}
      <div className="relative flex w-full max-w-[440px] flex-col items-center px-[20px] py-[44px] min-[600px]:hidden">
        {/* Eyebrow */}
        <div className="mb-[18px]">
          <div
            className={`${dmMono.className} relative shrink-0 overflow-hidden border-[0.5px] border-solid border-black/15 bg-white/70 px-[16px] py-[4px] backdrop-blur-md`}
            style={{ width: "max-content", height: 26 }}
          >
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            <div className="flex h-full items-center justify-center">
              <p className="whitespace-nowrap text-[12px] font-normal uppercase tracking-[0.04em] text-[#0f2912]">
                FREE GIVEAWAY
              </p>
            </div>
            <div className="absolute left-[6.5px] top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-[#53d824]" />
            <div className="absolute right-[6.5px] top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-[#53d824]" />
          </div>
        </div>

        {/* Title Area Mobile */}
        <div className="relative mb-[16px] inline-flex flex-col items-center p-[16px]">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroySemiBold.className} w-[320px] max-w-full text-center text-[30px] font-semibold leading-[36px] tracking-[-0.01em] text-[#090b0e] not-italic [word-break:break-word]`}
          >
            Win a GPX10 Pro
            <br />
            Evaluation Kit.
          </h2>
        </div>

        {/* Description Mobile */}
        <p
          className={`${interRegular.className} mb-[24px] max-w-[340px] text-center text-[14px] font-normal leading-[22px] text-[#374151]`}
        >
          We&apos;re giving away [N] NuraSense Evaluation Kits to engineers at
          Electronica. Enter to win and put real GPX10 Pro silicon on your bench
          — run real AI and measure the microwatt power yourself.
        </p>

        {/* Hardware Photo Mobile */}
        <div className="relative mb-[24px] w-full overflow-hidden rounded-[8px]">
          <img
            src="/electronica/nurasense-kit-clean.png"
            alt="NuraSense Evaluation Kit with GPX10 Pro Silicon"
            className="w-full object-contain"
          />
        </div>

        {/* Form Mobile */}
        <div className="w-full">
          {submitted ? (
            <div className="relative w-full border border-[#53d824]/60 bg-white/90 p-[16px] text-center shadow-sm">
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
              <span className={`${interMedium.className} text-[13px] text-[#1b4317] font-medium`}>
                ✓ You&apos;re entered! We&apos;ll notify winners during Electronica.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-[12px]">
              <div className="relative w-full">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Work email (company email only)"
                  className={`${interRegular.className} h-[46px] w-full border border-black/20 bg-white px-[16px] text-[14px] text-black outline-none placeholder:text-gray-500 focus:border-[#38a612] shadow-sm`}
                />
                <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
              </div>

              <button
                type="submit"
                className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[46px] w-full items-center justify-center overflow-hidden`}
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
            </form>
          )}

          {/* Subtext & Terms Mobile */}
          <div className="mt-[16px] flex flex-col items-center gap-[4px] text-center">
            <p className={`${interRegular.className} text-[12px] text-[#4b5563]`}>
              Winners drawn live during the show, Nov 10-13.
            </p>
            <a
              href="/terms-conditions"
              className={`${interRegular.className} text-[12px] font-medium text-[#1b4317] hover:underline`}
            >
              Entry terms
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

