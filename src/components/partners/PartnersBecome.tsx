"use client";

import { useState } from "react";
import { dmMono, interLight, interRegular, gilroyMedium } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { TagBadge } from "../hero/TagBadge";
import { useFadeIn } from "../shared/useFadeIn";
import { isCasualEmailDomain } from "./partners-data";
import type { BecomeContent, Capability } from "./partners-content";
import {
  AmbientPulse,
  GhostGreenCta,
  PartnersDropdown,
  PartnersGreenCta,
  WireframeIcon,
} from "./partners-shared";

type ApplyState = {
  name: string;
  company: string;
  website: string;
  email: string;
  region: string;
  experience: string;
};

const INITIAL_APPLY: ApplyState = {
  name: "",
  company: "",
  website: "",
  email: "",
  region: "",
  experience: "",
};

const inputBox =
  "flex min-h-[46px] w-full items-start border-[0.5px] border-solid border-[#4a4a4a] bg-transparent p-[12px] transition-colors duration-200 focus-within:border-[rgba(83,216,36,0.6)]";
const inputCls =
  "w-full border-0 bg-transparent p-0 text-[14px] leading-[21px] font-normal text-white outline-none placeholder:text-[#4a4a4a]";

function FieldLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className={`${interLight.className} w-full shrink-0 text-[10px] leading-[15px] font-light text-white not-italic`}>
      {children}
    </label>
  );
}

export function PartnersBecome({
  content,
  capabilities,
  regions,
}: {
  content: BecomeContent;
  capabilities: Capability[];
  regions: string[];
}) {
  const { fadeRef, isVisible } = useFadeIn<HTMLDivElement>();
  const fadeCls = isVisible ? "animate-hero-text-fade-in opacity-0" : "translate-y-[25px] opacity-0";

  const [form, setForm] = useState<ApplyState>(INITIAL_APPLY);
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof ApplyState) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleCapability = (short: string) =>
    setSelectedCapabilities((prev) =>
      prev.includes(short) ? prev.filter((s) => s !== short) : [...prev, short],
    );

  const onSubmit = async () => {
    if (!form.name.trim()) return setError("Please enter your name.");
    if (!form.company.trim()) return setError("Please enter your company.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return setError("Please enter a valid work email address.");
    if (isCasualEmailDomain(form.email.trim())) return setError("Please use your work email — personal email domains are blocked.");
    if (!form.region) return setError("Please select your region.");
    if (selectedCapabilities.length === 0) return setError("Please select at least one capability area.");
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/partner-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          company: form.company.trim(),
          website: form.website.trim(),
          email: form.email.trim(),
          region: form.region,
          capabilities: selectedCapabilities,
          experience: form.experience.trim(),
        }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || "Submission failed.");
      }
      setSubmitted(true);
    } catch {
      setError("Could not submit right now. Please try again, or reach us via the contact page.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="become-a-partner"
      className="relative w-full scroll-mt-[78px] overflow-clip bg-black"
      aria-label="Become a partner"
    >
      {/* dark backdrop: engineering grid + green glows + side rules */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(240,240,240,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(240,240,240,0.035) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 90% 80% at 50% 40%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 40%, black 30%, transparent 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-[-180px] left-[-160px] size-[620px] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(83,216,36,0.10), rgba(83,216,36,0.03) 55%, transparent 75%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[-140px] bottom-[-200px] size-[680px] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(83,216,36,0.08), transparent 70%)" }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(83,216,36,0.35)] to-transparent" aria-hidden />

      <div
        ref={fadeRef}
        className={`relative mx-auto flex w-full max-w-[1204px] flex-col items-center gap-[48px] px-[24px] py-[40px] min-[1024px]:py-[64px] ${fadeCls} transform-gpu`}
      >
        {/* ---------- header ---------- */}
        <div className="flex flex-col items-center gap-[24px]">
          <TagBadge label={content.tag} width={176} labelOffsetX={0} rightBarLeft={167} centerLabel />
          <h2
            className={`${gilroyMedium.className} max-w-[760px] bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent [word-break:break-word] not-italic max-[1023px]:text-[28px] max-[1023px]:leading-[34px]`}
            style={{
              backgroundImage:
                "linear-gradient(110.887deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            {content.heading}
          </h2>
          <p className={`${interRegular.className} max-w-[660px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic max-[1023px]:text-[14px] max-[1023px]:leading-[21px] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}>
            {content.subheading}
          </p>
        </div>

        {/* ---------- what partners get ---------- */}
        <div className="grid w-full grid-cols-1 gap-[20px] min-[1024px]:grid-cols-3">
          {content.benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="group relative flex min-h-[250px] flex-col items-start justify-between border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(21,21,21,0.3)] p-[28px] backdrop-blur-[8px] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-[4px] hover:border-[rgba(83,216,36,0.5)] hover:shadow-[0px_20px_48px_0px_rgba(83,216,36,0.15)]"
            >
              <Corners />
              <div className="relative flex size-[56px] shrink-0 items-center justify-center border-[0.5px] border-solid border-[rgba(83,216,36,0.4)] bg-[rgba(83,216,36,0.08)]">
                {benefit.icon.endsWith(".svg") ? (
                  <img src={benefit.icon} alt="" className="size-[34px]" aria-hidden />
                ) : (
                  <WireframeIcon name={benefit.icon} className="size-[34px]" />
                )}
              </div>
              <div className="mt-[24px] flex w-full flex-col gap-[10px]">
                <h3 className={`${gilroyMedium.className} w-full text-[22px] leading-[28px] font-medium text-white [word-break:break-word] not-italic`}>
                  {benefit.title}
                </h3>
                <p className={`${interRegular.className} w-full text-[14px] leading-[21px] font-normal text-white opacity-65 [word-break:break-word] not-italic min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}>
                  {benefit.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* ---------- who we're looking for ---------- */}
        <div className="relative flex w-full max-w-[900px] flex-col items-center gap-[18px] border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(21,21,21,0.3)] px-[32px] py-[28px] text-center backdrop-blur-[8px]">
          <Corners />
          <h3 className={`${gilroyMedium.className} text-[20px] leading-[26px] font-medium text-white not-italic [word-break:break-word] min-[1024px]:text-[22px] min-[1024px]:leading-[28px]`}>
            {content.lookingFor.title}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-[8px]">
            {content.lookingFor.chips.map((chip) => (
              <span
                key={chip}
                className={`${dmMono.className} inline-flex h-[26px] items-center gap-[7px] border-[0.5px] border-solid border-[rgba(83,216,36,0.35)] bg-[rgba(83,216,36,0.08)] px-[10px] text-[11px] leading-[16px] tracking-[0.44px] whitespace-nowrap text-[#a9e28c] uppercase not-italic`}
              >
                <span className="size-[3px] shrink-0 rounded-full bg-[#53d824]" aria-hidden />
                {chip}
              </span>
            ))}
          </div>
          <p className={`${interRegular.className} max-w-[720px] text-[13px] leading-[19.5px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}>
            {content.lookingFor.description}
          </p>
        </div>

        {/* ---------- application: pitch + form ---------- */}
        <div className="grid w-full grid-cols-1 gap-[28px] min-[1024px]:grid-cols-[400px_1fr] min-[1024px]:items-start min-[1024px]:gap-[40px]">
          {/* pitch panel */}
          <div className="relative flex flex-col gap-[20px] border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(21,21,21,0.3)] p-[32px] backdrop-blur-[8px] min-[1024px]:sticky min-[1024px]:top-[110px]">
            <Corners />
            <h3 className={`${gilroyMedium.className} text-[26px] leading-[34px] font-medium text-white [word-break:break-word] not-italic`}>
              {content.form.title}
            </h3>
            <p className={`${interRegular.className} text-[15px] leading-[24px] font-normal text-[#f0f0f0] opacity-75 [word-break:break-word] not-italic min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}>
              Frictionless by design — share a few details and our partnerships
              team will take it from there.
            </p>
            <div className="flex flex-col gap-[14px] border-t-[0.5px] border-solid border-[rgba(240,240,240,0.15)] pt-[20px]">
              {[
                { step: "01", text: "Tell us who you are and what you build." },
                { step: "02", text: "We review fit against the GPX roadmap." },
                { step: "03", text: "Enablement begins — silicon, tools, ecosystem." },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-[14px]">
                  <span className={`${dmMono.className} mt-[2px] shrink-0 text-[12px] leading-[18px] tracking-[1px] text-[#53d824]`}>
                    {s.step}
                  </span>
                  <p className={`${interRegular.className} text-[13px] leading-[19.5px] font-normal text-[#f0f0f0] opacity-75 min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}>
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
            <GhostGreenCta href={content.secondaryCta.href} className="w-full">
              {content.secondaryCta.label}
            </GhostGreenCta>
          </div>

          {/* form panel */}
          <div className="relative w-full border-[1.5px] border-solid border-[rgba(83,216,36,0.2)] bg-[rgba(46,119,20,0.14)] backdrop-blur-[8px]">
            <Corners />
            {submitted ? (
              <div className="flex min-h-[420px] animate-hero-text-fade-in transform-gpu flex-col items-center justify-center gap-[20px] px-[32px] py-[56px] text-center">
                <AmbientPulse />
                <p className={`${gilroyMedium.className} max-w-[420px] text-[24px] leading-[32px] font-medium text-white [word-break:break-word] not-italic`}>
                  {content.form.confirmation}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm(INITIAL_APPLY);
                    setSelectedCapabilities([]);
                  }}
                  className={`${interRegular.className} cursor-pointer border-b border-[rgba(169,226,140,0.5)] text-[13px] leading-[21px] font-normal text-[#a9e28c] transition-colors duration-200 hover:text-[#53d824] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-[24px] p-[32px] min-[1024px]:p-[40px]">
                <div className="grid grid-cols-1 gap-[20px] min-[560px]:grid-cols-2">
                  <div className="flex flex-col gap-[5px]">
                    <FieldLabel htmlFor="pa-name">{content.form.name}</FieldLabel>
                    <div className={inputBox}>
                      <input id="pa-name" className={inputCls} value={form.name} onChange={(e) => set("name")(e.target.value)} autoComplete="name" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[5px]">
                    <FieldLabel htmlFor="pa-company">{content.form.company}</FieldLabel>
                    <div className={inputBox}>
                      <input id="pa-company" className={inputCls} value={form.company} onChange={(e) => set("company")(e.target.value)} autoComplete="organization" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[5px]">
                    <FieldLabel htmlFor="pa-website">{content.form.website}</FieldLabel>
                    <div className={inputBox}>
                      <input id="pa-website" type="url" placeholder="https://" className={inputCls} value={form.website} onChange={(e) => set("website")(e.target.value)} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[5px]">
                    <FieldLabel htmlFor="pa-email">{content.form.email}</FieldLabel>
                    <div className={inputBox}>
                      <input id="pa-email" type="email" className={inputCls} value={form.email} onChange={(e) => set("email")(e.target.value)} autoComplete="email" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[5px]">
                  <span className={`${interLight.className} w-full shrink-0 text-[10px] leading-[15px] font-light text-white not-italic`}>
                    {content.form.region}
                  </span>
                  <PartnersDropdown
                    label={content.form.region}
                    options={[...regions]}
                    value={form.region}
                    onChange={set("region")}
                    id="pa-region"
                  />
                </div>

                <div className="flex flex-col gap-[10px]">
                  <span className={`${interLight.className} w-full shrink-0 text-[10px] leading-[15px] font-light text-white not-italic`}>
                    {content.form.capabilities}
                  </span>
                  <div className="flex flex-wrap gap-[8px]">
                    {capabilities.map((cap) => {
                      const active = selectedCapabilities.includes(cap.short);
                      return (
                        <button
                          key={cap.id}
                          type="button"
                          aria-pressed={active}
                          onClick={() => toggleCapability(cap.short)}
                          className={`h-[36px] cursor-pointer border-[0.5px] border-solid px-[14px] text-[13px] leading-[18px] font-normal transition-[border-color,background-color,color] duration-200 ${
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
                  <FieldLabel htmlFor="pa-experience">{content.form.experience}</FieldLabel>
                  <div className={`${inputBox} min-h-[120px]`}>
                    <textarea id="pa-experience" className={`${inputCls} h-full resize-none`} rows={4} value={form.experience} onChange={(e) => set("experience")(e.target.value)} />
                  </div>
                </div>

                {error ? (
                  <p className="text-[13px] leading-[19.5px] font-normal text-[#ff9d9d]" role="alert">
                    {error}
                  </p>
                ) : null}

                <PartnersGreenCta onClick={onSubmit} loading={loading} className="w-full min-[560px]:w-[280px]">
                  {content.form.submit}
                </PartnersGreenCta>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
