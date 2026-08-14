"use client";

import { useState } from "react";
import { interLight, interRegular, gilroyMedium } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { useFadeIn } from "../shared/useFadeIn";
import {
  PARTNER_CAPABILITIES,
  PARTNER_REGIONS,
  PARTNERS_MATCH,
  isCasualEmailDomain,
} from "./partners-data";
import {
  AmbientPulse,
  PartnersDropdown,
  PartnersGreenCta,
  PartnersSectionHeading,
} from "./partners-shared";

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

export function PartnersMatchForm() {
  const { fadeRef, isVisible } = useFadeIn<HTMLElement>();
  const fadeCls = isVisible ? "animate-hero-text-fade-in opacity-0" : "translate-y-[25px] opacity-0";

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [helpAreas, setHelpAreas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
    if (isCasualEmailDomain(form.email.trim())) return PARTNERS_MATCH.emailHint;
    if (!form.region) return "Please select your region.";
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

  return (
    <section
      id="get-matched"
      ref={fadeRef}
      className={`relative mx-auto flex w-full max-w-[1204px] scroll-mt-[78px] flex-col items-center gap-[40px] px-[24px] py-[40px] min-[1024px]:py-[96px] ${fadeCls} transform-gpu`}
      aria-label="Get matched with a partner"
    >
      <div className="relative flex flex-col items-center gap-[16px] px-[10px]">
        <PartnersSectionHeading deg="119.522deg">{PARTNERS_MATCH.heading}</PartnersSectionHeading>
        <Corners />
      </div>

      <p className={`${interRegular.className} max-w-[720px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic max-[1023px]:text-[14px] max-[1023px]:leading-[21px]`}>
        {PARTNERS_MATCH.subheading}
      </p>

      <div className="relative w-full max-w-[760px] border-[1.5px] border-solid border-[rgba(83,216,36,0.2)] bg-[rgba(46,119,20,0.14)] backdrop-blur-[8px]">
        <Corners />

        {submitted ? (
          <div className="flex min-h-[420px] animate-hero-text-fade-in transform-gpu flex-col items-center justify-center gap-[20px] px-[32px] py-[56px] text-center">
            <AmbientPulse />
            <p className={`${gilroyMedium.className} max-w-[420px] text-[24px] leading-[32px] font-medium text-white [word-break:break-word] not-italic`}>
              {PARTNERS_MATCH.confirmation}
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setForm(INITIAL_FORM);
                setHelpAreas([]);
              }}
              className={`${interRegular.className} cursor-pointer border-b border-[rgba(169,226,140,0.5)] text-[13px] leading-[21px] font-normal text-[#a9e28c] transition-colors duration-200 hover:text-[#53d824]`}
            >
              Submit another request
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-[24px] p-[32px] min-[1024px]:p-[40px]">
            <div className="grid grid-cols-1 gap-[20px] min-[560px]:grid-cols-2">
              <div className="flex flex-col gap-[5px]">
                <FieldLabel htmlFor="pm-first-name">{PARTNERS_MATCH.fields.firstName}</FieldLabel>
                <div className={inputBoxClass}>
                  <input id="pm-first-name" className={inputClass} value={form.firstName} onChange={(e) => set("firstName")(e.target.value)} autoComplete="given-name" />
                </div>
              </div>
              <div className="flex flex-col gap-[5px]">
                <FieldLabel htmlFor="pm-last-name">{PARTNERS_MATCH.fields.lastName}</FieldLabel>
                <div className={inputBoxClass}>
                  <input id="pm-last-name" className={inputClass} value={form.lastName} onChange={(e) => set("lastName")(e.target.value)} autoComplete="family-name" />
                </div>
              </div>
              <div className="flex flex-col gap-[5px]">
                <FieldLabel htmlFor="pm-company">{PARTNERS_MATCH.fields.company}</FieldLabel>
                <div className={inputBoxClass}>
                  <input id="pm-company" className={inputClass} value={form.company} onChange={(e) => set("company")(e.target.value)} autoComplete="organization" />
                </div>
              </div>
              <div className="flex flex-col gap-[5px]">
                <FieldLabel htmlFor="pm-email">{PARTNERS_MATCH.fields.email}</FieldLabel>
                <div className={inputBoxClass}>
                  <input id="pm-email" type="email" className={inputClass} value={form.email} onChange={(e) => set("email")(e.target.value)} autoComplete="email" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[5px]">
              <span className={`${interLight.className} w-full shrink-0 text-[10px] leading-[15px] font-light text-white not-italic`}>
                {PARTNERS_MATCH.fields.region}
              </span>
              <PartnersDropdown
                label={PARTNERS_MATCH.fields.region}
                options={[...PARTNER_REGIONS]}
                value={form.region}
                onChange={set("region")}
                id="pm-region"
              />
            </div>

            <div className="flex flex-col gap-[10px]">
              <span className={`${interLight.className} w-full shrink-0 text-[10px] leading-[15px] font-light text-white not-italic`}>
                {PARTNERS_MATCH.fields.helpAreas}
              </span>
              <div className="flex flex-wrap gap-[8px]">
                {PARTNER_CAPABILITIES.map((cap) => {
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
              <FieldLabel htmlFor="pm-message">{PARTNERS_MATCH.fields.message}</FieldLabel>
              <div className={`${inputBoxClass} min-h-[120px]`}>
                <textarea id="pm-message" className={`${inputClass} h-full resize-none`} rows={4} value={form.message} onChange={(e) => set("message")(e.target.value)} />
              </div>
            </div>

            {error ? (
              <p className="text-[13px] leading-[19.5px] font-normal text-[#ff9d9d]" role="alert">
                {error}
              </p>
            ) : (
              <p className={`${interRegular.className} text-[12px] leading-[18px] font-normal text-[#8a8a8a]`}>
                {PARTNERS_MATCH.emailHint}
              </p>
            )}

            <PartnersGreenCta onClick={onSubmit} loading={loading} className="w-full">
              {PARTNERS_MATCH.submitLabel}
            </PartnersGreenCta>
          </div>
        )}
      </div>
    </section>
  );
}
