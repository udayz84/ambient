"use client";

import { useState, useId } from "react";
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

const INTEREST_OPTIONS = [
  "I'd like to meet the Ambient team in Munich.",
  "Keep me updated on Grinn SOM availability.",
  "Keep me updated on Celus GPX10 Pro support.",
] as const;

export function ElectronicaStayUpdated() {
  const formId = useId();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [role, setRole] = useState("");
  const [region, setRegion] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "I'd like to meet the Ambient team in Munich.",
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleInterest = (item: string) => {
    setSelectedInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section
      aria-label="Stay updated on Ambient at Electronica 2026"
      className="relative flex w-full justify-center overflow-hidden bg-black py-[50px] text-white min-[600px]:py-[40px]"
    >
      {/* Background Subtle Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 65% 50%, rgba(83, 216, 36, 0.07) 0%, rgba(0, 0, 0, 0) 60%)",
        }}
      />

      {/* =========================================================================
          DESKTOP & TABLET VIEWPORT (>= 600px)
          Canvas Width: 1440px (source of truth).
          TabletScaleCanvas scales down to tablet viewports with 0px deviation.
          ========================================================================= */}
      <TabletScaleCanvas className="relative hidden h-[660px] w-[1440px] shrink-0 min-[600px]:block">
        {/* Left Vertical Guide Line (Ambient Design System Chrome) */}
        <div className="pointer-events-none absolute bottom-0 left-[95px] top-0 z-10 flex w-0 items-center justify-center">
          <div className="flex-none rotate-90">
            <div className="relative h-0 w-[660px]">
              <div className="absolute inset-[-1px_0_0_0]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
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
            <div className="relative h-0 w-[660px]">
              <div className="absolute inset-[-0.5px_0]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
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

        {/* Left Column: Eyebrow, Title, Description */}
        <div className="absolute left-[100px] top-[70px] z-20 flex w-[520px] flex-col items-start">
          {/* Eyebrow: Signature TagBadge */}
          <div className="mb-[20px]">
            <TagBadge label="BUILD IT YOURSELF" width="max-content" centerLabel />
          </div>

          {/* Title Area with Corners & Metallic Pearl Gradient */}
          <div className="relative inline-flex flex-col items-start p-[16px] pl-[20px] pr-[20px]">
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            <h2
              className={`${gilroySemiBold.className} m-0 bg-clip-text text-[42px] font-semibold leading-[48px] tracking-[-0.01em] text-transparent not-italic`}
              style={{
                backgroundImage: HERO_TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              <span className="whitespace-nowrap">Excited to build with us?</span>
              <br />
              <span className="whitespace-nowrap">Start with real</span>
              <br />
              <span>silicon.</span>
            </h2>
          </div>

          {/* Subheading / Description */}
          <div className="mt-[20px] pl-[20px]">
            <p
              className={`${interRegular.className} max-w-[420px] text-[16px] font-normal leading-[25px] text-[#f0f0f0] opacity-85`}
            >
              Register for evaluation access and tell us what you&apos;re
              building. Five selected engineers will receive a NuraSense
              Evaluation Kit free.
            </p>
          </div>
        </div>

        {/* Right Column: Lead Form Card with Green Border */}
        <div className="absolute left-[640px] top-[40px] z-20 w-[660px]">
          <div className="relative rounded-[16px] border border-[#53d824]/40 bg-[#0a0d0a] p-[32px] shadow-[0_0_35px_rgba(83,216,36,0.06)]">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-[60px] text-center">
                <div className="mb-[16px] flex size-[52px] items-center justify-center rounded-full border border-[#53d824] bg-[#53d824]/10 text-[#53d824]">
                  <svg
                    className="size-[28px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3
                  className={`${gilroySemiBold.className} text-[24px] font-semibold text-white`}
                >
                  You&apos;re on the list!
                </h3>
                <p
                  className={`${interRegular.className} mt-[10px] max-w-[400px] text-[15px] leading-[22px] text-[#d1d5db]`}
                >
                  Thank you for registering your interest. We&apos;ll be in touch
                  with details before Electronica opens.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col">
                {/* 2-Column Inputs Grid */}
                <div className="grid grid-cols-2 gap-x-[16px] gap-y-[18px]">
                  {/* First Name */}
                  <div>
                    <label
                      htmlFor={`${formId}-desktop-first-name`}
                      className={`${interMedium.className} mb-[6px] block text-[13px] font-medium text-[#e0e0e0]`}
                    >
                      First name <span className="text-[#ef4444]">*</span>
                    </label>
                    <input
                      id={`${formId}-desktop-first-name`}
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      className={`${interRegular.className} h-[44px] w-full rounded-[8px] border border-white/10 bg-[#121612] px-[14px] text-[14px] text-white outline-none placeholder:text-[#525a52] transition-colors focus:border-[#53d824] focus:bg-[#141a14]`}
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label
                      htmlFor={`${formId}-desktop-last-name`}
                      className={`${interMedium.className} mb-[6px] block text-[13px] font-medium text-[#e0e0e0]`}
                    >
                      Last name <span className="text-[#ef4444]">*</span>
                    </label>
                    <input
                      id={`${formId}-desktop-last-name`}
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Hao"
                      className={`${interRegular.className} h-[44px] w-full rounded-[8px] border border-white/10 bg-[#121612] px-[14px] text-[14px] text-white outline-none placeholder:text-[#525a52] transition-colors focus:border-[#53d824] focus:bg-[#141a14]`}
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label
                      htmlFor={`${formId}-desktop-company`}
                      className={`${interMedium.className} mb-[6px] block text-[13px] font-medium text-[#e0e0e0]`}
                    >
                      Company <span className="text-[#ef4444]">*</span>
                    </label>
                    <input
                      id={`${formId}-desktop-company`}
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Ambient"
                      className={`${interRegular.className} h-[44px] w-full rounded-[8px] border border-white/10 bg-[#121612] px-[14px] text-[14px] text-white outline-none placeholder:text-[#525a52] transition-colors focus:border-[#53d824] focus:bg-[#141a14]`}
                    />
                  </div>

                  {/* Work Email */}
                  <div>
                    <label
                      htmlFor={`${formId}-desktop-work-email`}
                      className={`${interMedium.className} mb-[6px] block text-[13px] font-medium text-[#e0e0e0]`}
                    >
                      Work email <span className="text-[#ef4444]">*</span>
                    </label>
                    <input
                      id={`${formId}-desktop-work-email`}
                      type="email"
                      required
                      value={workEmail}
                      onChange={(e) => setWorkEmail(e.target.value)}
                      placeholder="you@company.com"
                      className={`${interRegular.className} h-[44px] w-full rounded-[8px] border border-white/10 bg-[#121612] px-[14px] text-[14px] text-white outline-none placeholder:text-[#525a52] transition-colors focus:border-[#53d824] focus:bg-[#141a14]`}
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label
                      htmlFor={`${formId}-desktop-role`}
                      className={`${interMedium.className} mb-[6px] block text-[13px] font-medium text-[#e0e0e0]`}
                    >
                      Role <span className="text-[#ef4444]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id={`${formId}-desktop-role`}
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className={`${interRegular.className} h-[44px] w-full appearance-none rounded-[8px] border border-white/10 bg-[#121612] pl-[14px] pr-[36px] text-[14px] text-white outline-none transition-colors focus:border-[#53d824] focus:bg-[#141a14]`}
                      >
                        <option value="" disabled className="bg-[#121612] text-[#525a52]">
                          Select role
                        </option>
                        <option value="hardware-engineer" className="bg-[#121612] text-white">
                          Hardware Engineer
                        </option>
                        <option value="embedded-engineer" className="bg-[#121612] text-white">
                          Embedded Software Engineer
                        </option>
                        <option value="system-architect" className="bg-[#121612] text-white">
                          System Architect
                        </option>
                        <option value="product-manager" className="bg-[#121612] text-white">
                          Product Manager
                        </option>
                        <option value="executive" className="bg-[#121612] text-white">
                          Executive / Management
                        </option>
                        <option value="procurement" className="bg-[#121612] text-white">
                          Procurement / Sourcing
                        </option>
                        <option value="other" className="bg-[#121612] text-white">
                          Other
                        </option>
                      </select>
                      <div className="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2 text-white/50">
                        <svg
                          className="size-[14px]"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Region */}
                  <div>
                    <label
                      htmlFor={`${formId}-desktop-region`}
                      className={`${interMedium.className} mb-[6px] block text-[13px] font-medium text-[#e0e0e0]`}
                    >
                      Region <span className="text-[#ef4444]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id={`${formId}-desktop-region`}
                        required
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className={`${interRegular.className} h-[44px] w-full appearance-none rounded-[8px] border border-white/10 bg-[#121612] pl-[14px] pr-[36px] text-[14px] text-white outline-none transition-colors focus:border-[#53d824] focus:bg-[#141a14]`}
                      >
                        <option value="" disabled className="bg-[#121612] text-[#525a52]">
                          Select region
                        </option>
                        <option value="europe-emea" className="bg-[#121612] text-white">
                          Europe / EMEA
                        </option>
                        <option value="north-america" className="bg-[#121612] text-white">
                          North America
                        </option>
                        <option value="asia-pacific" className="bg-[#121612] text-white">
                          Asia-Pacific
                        </option>
                        <option value="latin-america" className="bg-[#121612] text-white">
                          Latin America
                        </option>
                        <option value="other" className="bg-[#121612] text-white">
                          Other
                        </option>
                      </select>
                      <div className="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2 text-white/50">
                        <svg
                          className="size-[14px]"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Checkboxes: "I'm interested in:" */}
                <div className="mt-[22px]">
                  <p
                    className={`${interMedium.className} text-[14px] text-[#f0f0f0]`}
                  >
                    I&apos;m interested in:
                  </p>
                  <div className="mt-[12px] flex flex-col gap-[10px]">
                    {INTEREST_OPTIONS.map((option) => {
                      const isChecked = selectedInterests.includes(option);
                      return (
                        <label
                          key={option}
                          className="group flex cursor-pointer items-center gap-[12px]"
                        >
                          <div
                            onClick={(e) => {
                              e.preventDefault();
                              toggleInterest(option);
                            }}
                            className={`flex size-[18px] shrink-0 items-center justify-center rounded-[3px] border transition-colors ${
                              isChecked
                                ? "border-[#53d824] bg-[#53d824]/20 text-[#53d824]"
                                : "border-[#53d824]/60 bg-transparent group-hover:border-[#53d824]"
                            }`}
                          >
                            {isChecked && (
                              <svg
                                className="size-[12px] stroke-current"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  d="M2.5 7.5L5.5 10.5L11.5 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>
                          <span
                            onClick={(e) => {
                              e.preventDefault();
                              toggleInterest(option);
                            }}
                            className={`${interRegular.className} select-none text-[14px] leading-[20px] text-[#e5e5e5]`}
                          >
                            {option}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Primary Green CTA Button (without arrow per user requirements) */}
                <div className="mt-[24px]">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[48px] w-full shrink-0 cursor-pointer items-center justify-center overflow-hidden transition-transform duration-200 hover:scale-[1.005] disabled:opacity-60`}
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
                    />
                    <span className="relative text-[15px] font-semibold uppercase tracking-[0.02em] text-white not-italic">
                      {isSubmitting ? "Submitting..." : "Register Free"}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
                    />
                    <GreenCtaCorners />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </TabletScaleCanvas>

      {/* =========================================================================
          MOBILE VIEWPORT (< 600px)
          Mobile-first responsive vertical stacking.
          ========================================================================= */}
      <div className="flex w-full flex-col px-[20px] min-[600px]:hidden">
        {/* Eyebrow */}
        <div className="mb-[16px]">
          <TagBadge label="BUILD IT YOURSELF" width="max-content" centerLabel />
        </div>

        {/* Title */}
        <div className="relative inline-flex flex-col items-start p-[14px] pl-[16px]">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroySemiBold.className} m-0 bg-clip-text text-[32px] font-semibold leading-[38px] tracking-[-0.01em] text-transparent not-italic`}
            style={{
              backgroundImage: HERO_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            Excited to build with us?
            <br />
            Start with real silicon.
          </h2>
        </div>

        {/* Subtitle */}
        <p
          className={`${interRegular.className} mt-[14px] text-[14px] font-normal leading-[21px] text-[#f0f0f0] opacity-85`}
        >
          Register for evaluation access and tell us what you&apos;re building.
          Five selected engineers will receive a NuraSense Evaluation Kit free.
        </p>

        {/* Form Card on Mobile */}
        <div className="mt-[24px] rounded-[14px] border border-[#53d824]/40 bg-[#0a0d0a]/95 p-[20px] shadow-[0_0_25px_rgba(83,216,36,0.06)]">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-[40px] text-center">
              <div className="mb-[14px] flex size-[46px] items-center justify-center rounded-full border border-[#53d824] bg-[#53d824]/10 text-[#53d824]">
                <svg
                  className="size-[24px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3
                className={`${gilroySemiBold.className} text-[20px] font-semibold text-white`}
              >
                You&apos;re on the list!
              </h3>
              <p
                className={`${interRegular.className} mt-[8px] text-[14px] leading-[20px] text-[#d1d5db]`}
              >
                Thank you for registering your interest. We&apos;ll be in touch
                with details before Electronica opens.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-[14px]">
              <div>
                <label
                  htmlFor={`${formId}-mobile-first-name`}
                  className={`${interMedium.className} mb-[5px] block text-[13px] font-medium text-[#e0e0e0]`}
                >
                  First name <span className="text-[#ef4444]">*</span>
                </label>
                <input
                  id={`${formId}-mobile-first-name`}
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  className={`${interRegular.className} h-[44px] w-full rounded-[8px] border border-white/10 bg-[#121612] px-[14px] text-[14px] text-white outline-none placeholder:text-[#525a52] focus:border-[#53d824]`}
                />
              </div>

              <div>
                <label
                  htmlFor={`${formId}-mobile-last-name`}
                  className={`${interMedium.className} mb-[5px] block text-[13px] font-medium text-[#e0e0e0]`}
                >
                  Last name <span className="text-[#ef4444]">*</span>
                </label>
                <input
                  id={`${formId}-mobile-last-name`}
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Hao"
                  className={`${interRegular.className} h-[44px] w-full rounded-[8px] border border-white/10 bg-[#121612] px-[14px] text-[14px] text-white outline-none placeholder:text-[#525a52] focus:border-[#53d824]`}
                />
              </div>

              <div>
                <label
                  htmlFor={`${formId}-mobile-company`}
                  className={`${interMedium.className} mb-[5px] block text-[13px] font-medium text-[#e0e0e0]`}
                >
                  Company <span className="text-[#ef4444]">*</span>
                </label>
                <input
                  id={`${formId}-mobile-company`}
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Ambient"
                  className={`${interRegular.className} h-[44px] w-full rounded-[8px] border border-white/10 bg-[#121612] px-[14px] text-[14px] text-white outline-none placeholder:text-[#525a52] focus:border-[#53d824]`}
                />
              </div>

              <div>
                <label
                  htmlFor={`${formId}-mobile-work-email`}
                  className={`${interMedium.className} mb-[5px] block text-[13px] font-medium text-[#e0e0e0]`}
                >
                  Work email <span className="text-[#ef4444]">*</span>
                </label>
                <input
                  id={`${formId}-mobile-work-email`}
                  type="email"
                  required
                  value={workEmail}
                  onChange={(e) => setWorkEmail(e.target.value)}
                  placeholder="you@company.com"
                  className={`${interRegular.className} h-[44px] w-full rounded-[8px] border border-white/10 bg-[#121612] px-[14px] text-[14px] text-white outline-none placeholder:text-[#525a52] focus:border-[#53d824]`}
                />
              </div>

              <div>
                <label
                  htmlFor={`${formId}-mobile-role`}
                  className={`${interMedium.className} mb-[5px] block text-[13px] font-medium text-[#e0e0e0]`}
                >
                  Role <span className="text-[#ef4444]">*</span>
                </label>
                <div className="relative">
                  <select
                    id={`${formId}-mobile-role`}
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={`${interRegular.className} h-[44px] w-full appearance-none rounded-[8px] border border-white/10 bg-[#121612] pl-[14px] pr-[36px] text-[14px] text-white outline-none focus:border-[#53d824]`}
                  >
                    <option value="" disabled className="bg-[#121612] text-[#525a52]">
                      Select role
                    </option>
                    <option value="hardware-engineer" className="bg-[#121612] text-white">
                      Hardware Engineer
                    </option>
                    <option value="embedded-engineer" className="bg-[#121612] text-white">
                      Embedded Software Engineer
                    </option>
                    <option value="system-architect" className="bg-[#121612] text-white">
                      System Architect
                    </option>
                    <option value="product-manager" className="bg-[#121612] text-white">
                      Product Manager
                    </option>
                    <option value="executive" className="bg-[#121612] text-white">
                      Executive / Management
                    </option>
                    <option value="procurement" className="bg-[#121612] text-white">
                      Procurement / Sourcing
                    </option>
                    <option value="other" className="bg-[#121612] text-white">
                      Other
                    </option>
                  </select>
                  <div className="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2 text-white/50">
                    <svg className="size-[14px]" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor={`${formId}-mobile-region`}
                  className={`${interMedium.className} mb-[5px] block text-[13px] font-medium text-[#e0e0e0]`}
                >
                  Region <span className="text-[#ef4444]">*</span>
                </label>
                <div className="relative">
                  <select
                    id={`${formId}-mobile-region`}
                    required
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className={`${interRegular.className} h-[44px] w-full appearance-none rounded-[8px] border border-white/10 bg-[#121612] pl-[14px] pr-[36px] text-[14px] text-white outline-none focus:border-[#53d824]`}
                  >
                    <option value="" disabled className="bg-[#121612] text-[#525a52]">
                      Select region
                    </option>
                    <option value="europe-emea" className="bg-[#121612] text-white">
                      Europe / EMEA
                    </option>
                    <option value="north-america" className="bg-[#121612] text-white">
                      North America
                    </option>
                    <option value="asia-pacific" className="bg-[#121612] text-white">
                      Asia-Pacific
                    </option>
                    <option value="latin-america" className="bg-[#121612] text-white">
                      Latin America
                    </option>
                    <option value="other" className="bg-[#121612] text-white">
                      Other
                    </option>
                  </select>
                  <div className="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2 text-white/50">
                    <svg className="size-[14px]" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Checkboxes on mobile */}
              <div className="mt-[10px]">
                <p className={`${interMedium.className} text-[14px] text-[#f0f0f0]`}>
                  I&apos;m interested in:
                </p>
                <div className="mt-[10px] flex flex-col gap-[10px]">
                  {INTEREST_OPTIONS.map((option) => {
                    const isChecked = selectedInterests.includes(option);
                    return (
                      <label
                        key={option}
                        className="group flex cursor-pointer items-start gap-[12px]"
                      >
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            toggleInterest(option);
                          }}
                          className={`mt-[2px] flex size-[18px] shrink-0 items-center justify-center rounded-[3px] border transition-colors ${
                            isChecked
                              ? "border-[#53d824] bg-[#53d824]/20 text-[#53d824]"
                              : "border-[#53d824]/60 bg-transparent group-hover:border-[#53d824]"
                          }`}
                        >
                          {isChecked && (
                            <svg
                              className="size-[12px] stroke-current"
                              viewBox="0 0 14 14"
                              fill="none"
                            >
                              <path
                                d="M2.5 7.5L5.5 10.5L11.5 3.5"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                        <span
                          onClick={(e) => {
                            e.preventDefault();
                            toggleInterest(option);
                          }}
                          className={`${interRegular.className} select-none text-[13px] leading-[18px] text-[#e5e5e5]`}
                        >
                          {option}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* CTA button */}
              <div className="mt-[14px]">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} relative flex h-[46px] w-full cursor-pointer items-center justify-center overflow-hidden transition-transform duration-200 hover:scale-[1.005] disabled:opacity-60`}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
                  />
                  <span className="relative text-[14px] font-semibold uppercase tracking-[0.02em] text-white not-italic">
                    {isSubmitting ? "Submitting..." : "Register Free"}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 ${PRIMARY_CTA_INSET}`}
                  />
                  <GreenCtaCorners />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

