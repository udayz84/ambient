"use client";

import { useState } from "react";
import { interLight, interRegular, gilroyMedium } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { useFadeIn } from "../shared/useFadeIn";
import { isCasualEmailDomain } from "./partners-data";
import type { Capability, MatchFormContent } from "./partners-content";
import {
  AmbientPulse,
  PartnersDropdown,
  PartnersGreenCta,
  PartnersSectionHeading,
} from "./partners-shared";
import { getRecaptchaToken } from "@/lib/recaptcha-client";
import { RECAPTCHA_ACTIONS } from "@/lib/recaptcha";
import { NumericCaptcha } from "../shared/NumericCaptcha";

type FormState = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  region: string;
  message: string;
};

const INITIAL_FORM: FormState = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  region: "",
  message: "",
};

const inputBoxClass =
  "flex min-h-[46px] w-full items-start border-[0.5px] border-solid border-[#4a4a4a] p-[12px] transition-colors duration-200 focus-within:border-[rgba(83,216,36,0.6)]";
const inputClass =
  "w-full border-0 bg-transparent p-0 text-[14px] leading-[21px] font-normal text-white outline-none placeholder:text-[#4a4a4a]";

function FieldLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className={`${interLight.className} w-full shrink-0 text-[10px] leading-[15px] font-light text-white not-italic`}>
      {children}
    </label>
  );
}

import { TabletScaleCanvas } from "../shared/TabletScaleCanvas";

export function PartnersMatchForm({
  content,
  capabilities,
  regions,
  config,
}: {
  content: MatchFormContent;
  capabilities: Capability[];
  regions: string[];
  /** Popup entry (recipients). Copy here already comes from the partners-page sections. */
  config?: any;
}) {
  const { fadeRef, isVisible } = useFadeIn<HTMLElement>();
  const fadeCls = isVisible ? "animate-hero-text-fade-in opacity-0" : "translate-y-[25px] opacity-0";

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [helpAreas, setHelpAreas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");

  const set = (key: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleHelpArea = (short: string) =>
    setHelpAreas((prev) =>
      prev.includes(short) ? prev.filter((s) => s !== short) : [...prev, short],
    );

  const validate = (): string => {
    if (!form.firstName.trim() || !form.lastName.trim()) return "Please enter your first and last name.";
    if (!form.company.trim()) return "Please enter your company.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return "Please enter a valid email address.";
    if (isCasualEmailDomain(form.email.trim())) return content.emailHint;
    if (!form.region) return "Please select your region.";
    if (!captchaCode || captchaCode.length !== 4) return "Please enter the 4-digit security code.";
    return "";
  };

  const onSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setLoading(true);
    try {
      const recaptchaToken = await getRecaptchaToken(
        RECAPTCHA_ACTIONS.PARTNER_INQUIRY
      );
      const res = await fetch("/api/partner-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          company: form.company.trim(),
          email: form.email.trim(),
          region: form.region,
          helpAreas,
          message: form.message.trim(),
          popupId: config?.documentId,
          recaptchaToken,
          captchaCode,
          captchaToken,
        }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || "Submission failed.");
      }
      setSubmitted(true);
    } catch {
      setError("Could not submit right now. Please try again, or email us directly via the contact page.");
    } finally {
      setLoading(false);
    }
  };

  const renderFormContent = (idPrefix = "") => {
    if (submitted) {
      return (
        <div className="flex min-h-[420px] animate-hero-text-fade-in transform-gpu flex-col items-center justify-center gap-[20px] px-[32px] py-[56px] text-center">
          <AmbientPulse />
          <p className={`${gilroyMedium.className} max-w-[420px] text-[24px] leading-[32px] font-medium text-white [word-break:break-word] not-italic`}>
            {content.confirmation}
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setForm(INITIAL_FORM);
              setHelpAreas([]);
            }}
            className={`${interRegular.className} cursor-pointer border-b border-[rgba(169,226,140,0.5)] text-[14px] leading-[21px] font-normal text-[#a9e28c] transition-colors duration-200 hover:text-[#53d824]`}
          >
            Submit another request
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-[24px] p-[24px] sm:p-[40px]">
        <div className="grid grid-cols-1 gap-[20px] min-[560px]:grid-cols-2">
          <div className="flex flex-col gap-[5px]">
            <FieldLabel htmlFor={`${idPrefix}pm-first-name`}>{content.fields.firstName}</FieldLabel>
            <div className={inputBoxClass}>
              <input id={`${idPrefix}pm-first-name`} className={inputClass} value={form.firstName} onChange={(e) => set("firstName")(e.target.value)} autoComplete="given-name" />
            </div>
          </div>
          <div className="flex flex-col gap-[5px]">
            <FieldLabel htmlFor={`${idPrefix}pm-last-name`}>{content.fields.lastName}</FieldLabel>
            <div className={inputBoxClass}>
              <input id={`${idPrefix}pm-last-name`} className={inputClass} value={form.lastName} onChange={(e) => set("lastName")(e.target.value)} autoComplete="family-name" />
            </div>
          </div>
          <div className="flex flex-col gap-[5px]">
            <FieldLabel htmlFor={`${idPrefix}pm-company`}>{content.fields.company}</FieldLabel>
            <div className={inputBoxClass}>
              <input id={`${idPrefix}pm-company`} className={inputClass} value={form.company} onChange={(e) => set("company")(e.target.value)} autoComplete="organization" />
            </div>
          </div>
          <div className="flex flex-col gap-[5px]">
            <FieldLabel htmlFor={`${idPrefix}pm-email`}>{content.fields.email}</FieldLabel>
            <div className={inputBoxClass}>
              <input id={`${idPrefix}pm-email`} type="email" className={inputClass} value={form.email} onChange={(e) => set("email")(e.target.value)} autoComplete="email" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[5px]">
          <span className={`${interLight.className} w-full shrink-0 text-[10px] leading-[15px] font-light text-white not-italic [word-break:break-word]`}>
            {content.fields.region}
          </span>
          <PartnersDropdown
            label={content.fields.region}
            options={[...regions]}
            value={form.region}
            onChange={set("region")}
            id={`${idPrefix}pm-region`}
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <span className={`${interLight.className} w-full shrink-0 text-[10px] leading-[15px] font-light text-white not-italic [word-break:break-word]`}>
            {content.fields.helpAreas}
          </span>
          <div className="flex flex-wrap gap-[8px]">
            {capabilities.map((cap) => {
              const active = helpAreas.includes(cap.short);
              return (
                <button
                  key={cap.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleHelpArea(cap.short)}
                  className={`relative h-[36px] cursor-pointer border-[0.5px] border-solid px-[14px] text-[13px] leading-[18px] font-normal transition-[border-color,background-color,color] duration-200 ${
                    active
                      ? "border-[rgba(83,216,36,0.55)] bg-[rgba(46,119,20,0.3)] text-[#a9e28c]"
                      : "border-[rgba(240,240,240,0.2)] text-[#ccc] hover:border-[rgba(83,216,36,0.35)] hover:text-white"
                  } ${interRegular.className}`}
                >
                  {cap.short}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-[5px]">
          <FieldLabel htmlFor={`${idPrefix}pm-message`}>{content.fields.message}</FieldLabel>
          <div className={`${inputBoxClass} min-h-[120px]`}>
            <textarea id={`${idPrefix}pm-message`} className={`${inputClass} h-full resize-none`} rows={4} value={form.message} onChange={(e) => set("message")(e.target.value)} />
          </div>
        </div>

        <div className="w-full max-w-[340px] py-[4px]">
          <NumericCaptcha
            value={captchaCode}
            onChange={setCaptchaCode}
            onTokenChange={setCaptchaToken}
          />
        </div>

        {error ? (
          <p className="text-[13px] leading-[19.5px] font-normal text-[#ff9d9d]" role="alert">
            {error}
          </p>
        ) : (
          <p className={`${interRegular.className} text-[12px] leading-[18px] font-normal text-[#8a8a8a] [word-break:break-word]`}>
            {content.emailHint}
          </p>
        )}

        <PartnersGreenCta onClick={onSubmit} loading={loading} className="w-full">
          {content.submitLabel}
        </PartnersGreenCta>
      </div>
    );
  };

  return (
    <section
      id="get-matched"
      ref={fadeRef}
      className={`relative mx-auto flex w-full justify-center scroll-mt-[78px] ${fadeCls} transform-gpu overflow-hidden`}
      aria-label="Get matched with a partner"
    >
      {/* Background visual — Company image-124 matrix texture */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden mix-blend-screen opacity-[0.25]"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 95%)",
        }}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          loading="lazy"
          decoding="async"
          src="/company/image-124.webp"
          alt=""
          className="absolute inset-0 size-full object-cover object-left-top"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.6) 75%, rgb(0,0,0) 92%)",
          }}
        />
      </div>

      {/* DESKTOP & TABLET (>=600px) — 1440px design canvas with proportional tablet scaling */}
      <TabletScaleCanvas className="relative hidden w-[1440px] shrink-0 flex-col items-center gap-[40px] px-[24px] py-[64px] min-[600px]:flex">
        <div className="relative flex flex-col items-center gap-[16px] px-[10px]">
          <PartnersSectionHeading deg="119.522deg">{content.heading}</PartnersSectionHeading>
          <Corners />
        </div>

        <p className={`${interRegular.className} max-w-[720px] text-center text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic`}>
          {content.subheading}
        </p>

        <div className="relative w-full max-w-[760px] border-[1.5px] border-solid border-[rgba(83,216,36,0.2)] bg-black backdrop-blur-[8px]">
          <Corners />
          {renderFormContent("")}
        </div>
      </TabletScaleCanvas>

      {/* MOBILE (<600px) */}
      <div className="relative flex w-full flex-col items-center gap-[32px] px-[20px] py-[40px] min-[600px]:hidden">
        <div className="relative flex flex-col items-center gap-[16px] px-[10px]">
          <PartnersSectionHeading deg="119.522deg">{content.heading}</PartnersSectionHeading>
          <Corners />
        </div>

        <p className={`${interRegular.className} w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic`}>
          {content.subheading}
        </p>

        <div className="relative w-full border-[1.5px] border-solid border-[rgba(83,216,36,0.2)] bg-black backdrop-blur-[8px]">
          <Corners />
          {renderFormContent("m-")}
        </div>
      </div>
    </section>
  );
}
