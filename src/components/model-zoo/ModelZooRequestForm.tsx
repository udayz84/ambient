/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { gilroyMedium, gilroySemiBold, interRegular } from "../hero/fonts";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { PRIMARY_CTA_INSET, PRIMARY_CTA_SHADOW } from "./model-zoo-data";
import { popupField, type PopupConfig } from "@/lib/popup";

const MODEL_FORGE_ZIP_URL =
  "https://ambientwebasset.blob.core.windows.net/website-assets/Model_Forge_1.0.0.zip";
const MODEL_FORGE_ZIP_NAME = "Model_Forge_1.0.0.zip";

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

export function ModelZooRequestForm({ onClose, config }: { onClose: () => void; /** CMS form entry (model-zoo-page request_form relation). Null = hardcoded fallback copy. */ config?: PopupConfig }) {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    applications: "",
  });
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
      const fullName = `${values.firstName.trim()} ${values.lastName.trim()}`.trim();

      const res = await fetch("/api/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          track: "sales",
          popupId: config?.documentId,
          email: values.email.trim(),
          message: values.applications.trim(),
          subscribed: consent,
          fields: {
            "Full name": fullName,
            "First name": values.firstName.trim(),
            "Last name": values.lastName.trim(),
            "Company Email ID": values.email.trim(),
            Company: values.company.trim(),
            "What are the applications are you looking for?": values.applications.trim(),
            Source: "Model Zoo request",
          },
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Submission failed. Please try again.");
      }

      // Trigger the 1.55 GB file download from blob storage upon submission
      const a = document.createElement("a");
      a.href = MODEL_FORGE_ZIP_URL;
      a.download = MODEL_FORGE_ZIP_NAME;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      a.remove();

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
        className="animate-popup-slide-in-right absolute inset-y-0 right-0 flex w-full max-w-[700px] flex-col overflow-y-auto bg-[#141414]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Panel background — 5428:8537 (#141414, notched left edge, 0.3 stroke) */}
        <img
          alt=""
          src="/model-zoo/form-bg.svg"
          className="pointer-events-none absolute inset-0 size-full max-w-none object-fill hidden min-[560px]:block"
          aria-hidden
        />

        {/* Header with Back button — 5428:8538 */}
        <div className="relative z-10 flex h-[72px] shrink-0 items-center border-b-[0.5px] border-solid border-[rgba(240,240,240,0.3)] px-[20px] min-[560px]:h-[104px] min-[560px]:px-[40px]">
          <button
            type="button"
            onClick={onClose}
            className="flex cursor-pointer items-center gap-[16px] min-[560px]:gap-[25px]"
            aria-label="Back"
            data-node-id="5428:8538"
          >
            <span className="block size-[36px] shrink-0 min-[560px]:size-[44px]" data-node-id="5428:8539" data-name="Menu">
              <img alt="" src="/model-zoo/form-back.svg" className="size-full" />
            </span>
            <p className={`${gilroyMedium.className} text-[18px] leading-[24px] font-medium text-white not-italic whitespace-nowrap min-[560px]:text-[22px] min-[560px]:leading-[28px]`} data-node-id="5428:8546">
              Back
            </p>
          </button>
        </div>

        {/* Form content — natural top alignment directly beneath divider */}
        <div className="relative z-10 flex flex-1 flex-col px-[20px] pt-[28px] pb-[36px] min-[560px]:px-[40px] min-[560px]:pt-[32px] min-[560px]:pb-[48px]">
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-[620px] flex-col gap-[20px] min-[560px]:gap-[24px]"
            data-node-id="5428:8547"
          >
            {/* First Name + Last Name */}
            <div className="flex w-full flex-col gap-[16px] min-[560px]:flex-row min-[560px]:gap-[18px]">
              <Field label={popupField(config, "first_name")?.label ?? "First Name*"} htmlFor="mz-first-name" className="min-[560px]:flex-1">
                <input
                  id="mz-first-name"
                  type="text"
                  required
                  value={values.firstName}
                  onChange={set("firstName")}
                  placeholder={popupField(config, "first_name")?.placeholder ?? "Enter First Name"}
                  className={`${INPUT_CLS} ${interRegular.className} h-[42px] w-full text-[14px] leading-[21px] text-white outline-none placeholder:text-[#4a4a4a] not-italic`}
                />
              </Field>
              <Field label={popupField(config, "last_name")?.label ?? "Last Name*"} htmlFor="mz-last-name" className="min-[560px]:flex-1">
                <input
                  id="mz-last-name"
                  type="text"
                  required
                  value={values.lastName}
                  onChange={set("lastName")}
                  placeholder={popupField(config, "last_name")?.placeholder ?? "Enter Last Name"}
                  className={`${INPUT_CLS} ${interRegular.className} h-[42px] w-full text-[14px] leading-[21px] text-white outline-none placeholder:text-[#4a4a4a] not-italic`}
                />
              </Field>
            </div>

            {/* Company Email ID + Company */}
            <div className="flex w-full flex-col gap-[16px] min-[560px]:flex-row min-[560px]:gap-[18px]">
              <Field label={popupField(config, "email")?.label ?? "Company Email ID*"} htmlFor="mz-email" className="min-[560px]:flex-1">
                <input
                  id="mz-email"
                  type="email"
                  required
                  value={values.email}
                  onChange={set("email")}
                  placeholder={popupField(config, "email")?.placeholder ?? "Enter Company Email ID"}
                  className={`${INPUT_CLS} ${interRegular.className} h-[42px] w-full text-[14px] leading-[21px] text-white outline-none placeholder:text-[#4a4a4a] not-italic`}
                />
              </Field>
              <Field label={popupField(config, "company")?.label ?? "Company*"} htmlFor="mz-company" className="min-[560px]:flex-1">
                <input
                  id="mz-company"
                  type="text"
                  required
                  value={values.company}
                  onChange={set("company")}
                  placeholder={popupField(config, "company")?.placeholder ?? "Enter Company Name"}
                  className={`${INPUT_CLS} ${interRegular.className} h-[42px] w-full text-[14px] leading-[21px] text-white outline-none placeholder:text-[#4a4a4a] not-italic`}
                />
              </Field>
            </div>

            {/* What are the applications are you looking for? */}
            <Field label={popupField(config, "notes")?.label ?? "What are the applications are you looking for?*"} htmlFor="mz-applications">
              <textarea
                id="mz-applications"
                rows={3}
                required
                value={values.applications}
                onChange={set("applications")}
                placeholder={popupField(config, "notes")?.placeholder ?? "Enter the applications you are looking for"}
                className={`${INPUT_CLS} ${interRegular.className} h-[80px] min-[560px]:h-[90px] w-full resize-none text-[14px] leading-[21px] text-white outline-none placeholder:text-[#4a4a4a] not-italic`}
              />
            </Field>

            {/* Consent + Submit — 5428:8638 */}
            <div className="flex w-full flex-col gap-[16px] min-[560px]:flex-row min-[560px]:items-center min-[560px]:justify-between" data-node-id="5428:8638">
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
                className={`relative block h-[48px] w-full min-[560px]:w-[140px] shrink-0 cursor-pointer disabled:opacity-60 ${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className}`}
                aria-label="Submit"
                data-node-id="5428:8642"
                data-name="Cta"
              >
                <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
                <span className="absolute inset-0 flex items-center justify-center text-[14px] leading-[normal] font-semibold text-white uppercase not-italic whitespace-nowrap" data-node-id="5428:8643">
                  {loading ? "Submitting…" : config?.cta_label ?? "submit"}
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
  );
}
