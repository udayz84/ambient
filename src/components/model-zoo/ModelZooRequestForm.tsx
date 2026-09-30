/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { gilroyMedium, gilroySemiBold, interRegular } from "../hero/fonts";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { PRIMARY_CTA_INSET, PRIMARY_CTA_SHADOW } from "./model-zoo-data";

/**
 * Figma 5428:8536 — "Model zoo form" (700×800 panel), opened by the
 * "Request Model Zoo" CTA in ModelZooLibrary. Dark #141414 panel with the
 * notched-left shape (form-bg.svg), Back button 5428:8539, divider 5428:8653,
 * 620-wide form column 5428:8547 centered with a 24px upward nudge.
 */

const INPUT_CLS =
  "border-[0.5px] border-solid border-[#4a4a4a] bg-transparent p-[12px]";

/** Figma I5428:8548 — label (12/18 white) + control, 5px gap, 65px tall. */
function Field({
  label,
  htmlFor,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex w-full flex-col gap-[5px] ${className}`}>
      <label
        htmlFor={htmlFor}
        className={`${interRegular.className} text-[12px] leading-[18px] font-normal text-[#fafafa] not-italic`}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export function ModelZooRequestForm({ onClose }: { onClose: () => void }) {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    purpose: "Testing",
    notes: "",
  });
  const [fileName, setFileName] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          track: "sales",
          email: values.email,
          message: values.notes,
          subscribed: consent,
          fields: {
            "Full name": values.fullName,
            "Phone number": `+91 ${values.phone}`,
            Purpose: values.purpose,
            "Upload ideas": fileName,
            Source: "Model Zoo request",
          },
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Submission failed. Please try again.");
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 animate-popup-backdrop-in bg-black/80"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Request Model Zoo"
      data-node-id="5428:8536"
      data-name="Model zoo form"
    >
      <div
        className="animate-popup-slide-in-right absolute inset-y-0 right-0 w-full max-w-[700px] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-full min-h-[800px]">
        {/* Panel background — 5428:8537 (#141414, notched left edge, 0.3 stroke) */}
        <img
          alt=""
          src="/model-zoo/form-bg.svg"
          className="pointer-events-none absolute inset-0 size-full max-w-none"
          aria-hidden
        />

        {/* Back — 5428:8538 (menu icon 44×44 + label, 40/30, 25px gap). Whole row closes the drawer. */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-[30px] left-[24px] flex cursor-pointer items-center gap-[25px] min-[560px]:left-[40px]"
          aria-label="Back"
          data-node-id="5428:8538"
        >
          <span className="block size-[44px] shrink-0" data-node-id="5428:8539" data-name="Menu">
            <img alt="" src="/model-zoo/form-back.svg" className="size-full" />
          </span>
          <p className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium text-white not-italic whitespace-nowrap`} data-node-id="5428:8546">
            Back
          </p>
        </button>

        {/* Divider — 5428:8653 (0.5px, rgba(240,240,240,0.3), y=104) */}
        <div className="absolute top-[104px] left-0 w-full border-t-[0.5px] border-solid border-[rgba(240,240,240,0.3)]" data-node-id="5428:8653" />

        {/* Form column — 5428:8547 (620 wide, 24px gaps, centered, -24px nudge).
            pointer-events-none so the full-size wrapper never covers the Back
            button / backdrop clicks; re-enabled on the form column itself. */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-[24px] min-[560px]:px-[40px]">
          <form
            onSubmit={handleSubmit}
            className="pointer-events-auto flex w-full max-w-[620px] flex-col gap-[24px] -translate-y-[24px]"
            data-node-id="5428:8547"
          >
            {/* Full name — 5428:8548 */}
            <Field label="Full name*" htmlFor="mz-full-name">
              <input
                id="mz-full-name"
                type="text"
                required
                value={values.fullName}
                onChange={set("fullName")}
                placeholder="Enter Your Full Name"
                className={`${INPUT_CLS} ${interRegular.className} h-[42px] w-full text-[14px] leading-[21px] text-white outline-none placeholder:text-[#4a4a4a] not-italic`}
              />
            </Field>

            {/* Email + Phone — 5428:8549 */}
            <div className="flex w-full flex-col gap-[24px] min-[560px]:flex-row min-[560px]:gap-[18px]">
              <Field label="Email ID*" htmlFor="mz-email" className="min-[560px]:flex-1">
                <input
                  id="mz-email"
                  type="email"
                  required
                  value={values.email}
                  onChange={set("email")}
                  placeholder="Enter Your Email ID"
                  className={`${INPUT_CLS} ${interRegular.className} h-[42px] w-full text-[14px] leading-[21px] text-white outline-none placeholder:text-[#4a4a4a] not-italic`}
                />
              </Field>
              <Field label="Phone Number*" htmlFor="mz-phone" className="min-[560px]:flex-1">
                <div className={`${INPUT_CLS} flex h-[42px] min-h-0 w-full items-center gap-[6px]`}>
                  <span className="flex shrink-0 items-center gap-[2px]" data-node-id="5428:8554">
                    <img alt="" src="/model-zoo/form-chevron-down.svg" className="block h-[7.81px] w-[14.12px]" aria-hidden />
                    <img alt="India" src="/model-zoo/form-flag-india.svg" className="mx-[2px] block h-[16px] w-[23px]" />
                    <span className={`${interRegular.className} text-[14px] leading-[21px] text-white not-italic`}>+91</span>
                  </span>
                  <span className="h-[18px] w-px shrink-0 bg-white" aria-hidden />
                  <input
                    id="mz-phone"
                    type="tel"
                    required
                    value={values.phone}
                    onChange={set("phone")}
                    placeholder="Enter Your Phone Number"
                    className={`${interRegular.className} h-full w-full min-w-0 flex-1 bg-transparent text-[14px] leading-[21px] text-white outline-none placeholder:text-[#4a4a4a] not-italic`}
                  />
                </div>
              </Field>
            </div>

            {/* Purpose + Upload — 5428:8617 */}
            <div className="flex w-full flex-col gap-[24px] min-[560px]:flex-row min-[560px]:gap-[18px]">
              <Field label="Purpose*" htmlFor="mz-purpose" className="min-[560px]:flex-1">
                <div className="relative w-full">
                  <select
                    id="mz-purpose"
                    required
                    value={values.purpose}
                    onChange={set("purpose")}
                    className={`${INPUT_CLS} ${interRegular.className} h-[42px] w-full appearance-none text-[14px] leading-[21px] text-[#4a4a4a] outline-none not-italic`}
                  >
                    <option value="Testing">Testing</option>
                    <option value="Evaluation">Evaluation</option>
                    <option value="Development">Development</option>
                    <option value="Research">Research</option>
                    <option value="Other">Other</option>
                  </select>
                  <img alt="" src="/model-zoo/form-chevron-down.svg" className="pointer-events-none absolute top-1/2 right-[12px] h-[7.81px] w-[14.12px] -translate-y-1/2" aria-hidden />
                </div>
              </Field>
              <Field label="Upload Ideas*" htmlFor="mz-upload" className="min-[560px]:flex-1">
                <label
                  htmlFor="mz-upload"
                  className={`${INPUT_CLS} flex h-[42px] w-full cursor-pointer items-center justify-between gap-[12px]`}
                  data-node-id="5428:8671"
                >
                  <span className={`${interRegular.className} truncate text-[14px] leading-[21px] ${fileName ? "text-white" : "text-[#4a4a4a]"} not-italic`} data-node-id="5428:8672">
                    {fileName || "Upload File here"}
                  </span>
                  <img alt="" src="/model-zoo/form-icon-upload.svg" className="h-[16.5px] w-[17.5px] shrink-0" aria-hidden />
                </label>
                <input
                  id="mz-upload"
                  type="file"
                  required
                  className="sr-only"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                />
              </Field>
            </div>

            {/* Notes — 5428:8634 */}
            <Field label="Notes" htmlFor="mz-notes">
              <textarea
                id="mz-notes"
                rows={3}
                value={values.notes}
                onChange={set("notes")}
                placeholder="Enter your notes (if any)"
                className={`${INPUT_CLS} ${interRegular.className} h-[90px] w-full resize-none text-[14px] leading-[21px] text-white outline-none placeholder:text-[#4a4a4a] not-italic`}
              />
            </Field>

            {/* Consent + Submit — 5428:8638 */}
            <div className="flex w-full flex-col-reverse items-start gap-[16px] min-[560px]:flex-row min-[560px]:items-center min-[560px]:justify-between" data-node-id="5428:8638">
              <label className="flex w-full max-w-[480px] cursor-pointer items-center gap-[12px]" data-node-id="5428:8639" data-name="Check Box">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="sr-only"
                />
                <span
                  className={`relative size-[20px] shrink-0 border-[0.5px] border-solid ${
                    consent ? "border-[#53d824] bg-[#53d824]" : "border-[#4a4a4a] bg-[#212121]"
                  }`}
                  data-node-id="1793:6402"
                >
                  {consent ? (
                    <svg className="absolute inset-0 size-full p-[2px] text-[#091804]" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : null}
                </span>
                <span className={`${interRegular.className} text-[12px] leading-[18px] font-normal text-white not-italic`} data-node-id="5428:8641">
                  By submitting the above form, you consent to our{" "}
                  <a href="#" className="underline">terms and conditions</a>
                  .
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className={`relative block h-[48px] w-[140px] shrink-0 cursor-pointer disabled:opacity-60 ${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className}`}
                aria-label="Submit"
                data-node-id="5428:8642"
                data-name="Cta"
              >
                <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
                <span className="absolute inset-0 flex items-center justify-center text-[14px] leading-[normal] font-semibold text-white uppercase not-italic whitespace-nowrap" data-node-id="5428:8643">
                  {loading ? "Submitting…" : "submit"}
                </span>
                <span aria-hidden className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`} />
                <GreenCtaCorners disableDots />
              </button>
            </div>

            {error ? (
              <p className={`${interRegular.className} text-[12px] leading-[18px] text-red-500 not-italic`} role="alert">
                {error}
              </p>
            ) : null}
          </form>
        </div>
        </div>
      </div>
    </div>
  );
}
