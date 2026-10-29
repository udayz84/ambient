"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { BOX_BORDER } from "../careers/careers-shared";
import { popupField, type PopupConfig } from "@/lib/popup";

const PANEL_BG = "/form.png";
const SUCCESS_IMG = "/careers/apply-success.webp";

const MODEL_FORGE_ZIP_URL =
  "https://ambientwebasset.blob.core.windows.net/website-assets/Model_Forge_1.0.0.zip";
const MODEL_FORGE_ZIP_NAME = "Model_Forge_1.0.0.zip";

const FIELD_BOX =
  "h-[42px] w-full border-[0.5px] border-solid border-[#4a4a4a] bg-transparent px-[12px] text-[14px] leading-[21px] text-white outline-none placeholder:text-[#4a4a4a] focus:border-[rgba(255,255,255,0.5)]";

type Step = "form" | "confirmation";

// CHIP_OPTIONS removed as per request for free text input

export function UpcomingProductsModal({
  isOpen,
  onClose,
  formContext = "upcoming",
  config,
  pdfUrl,
  pdfName,
  closeLabel,
  title,
  productVariant,
}: {
  isOpen: boolean;
  onClose: () => void;
  formContext?: "upcoming" | "usecase" | "evalkit" | "sdk" | "som" | "som-ble" | "som-lte" | "som-waitlist" | "waitlist" | "case-study";
  /** CMS form entry (page relation). Null = hardcoded fallback copy. */
  config?: PopupConfig;
  /** Optional PDF to download on successful submit. */
  pdfUrl?: string;
  pdfName?: string;
  /** Confirmation close-button label (defaults to "Back to Homepage"). */
  closeLabel?: string;
  title?: string;
  productVariant?: string;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [submittedVariant, setSubmittedVariant] = useState<string | undefined>(undefined);
  const [fetchedConfig, setFetchedConfig] = useState<PopupConfig | null>(null);
  const activeConfig = config || fetchedConfig;

  useEffect(() => {
    if (!isOpen || config) return;
    const strapiBase = (process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1338").replace(/\/+$/, "");
    fetch(`${strapiBase}/api/popups?populate=*`)
      .then((r) => r.json())
      .then((res) => {
        const list = res?.data || [];
        const match = list.find((p: any) => {
          const t = (p.title || "").toLowerCase();
          if (formContext === "usecase") return t.includes("use case");
          if (formContext === "evalkit") return t.includes("eval kit");
          if (formContext === "sdk") return t.includes("sdk");
          if (formContext === "waitlist" || formContext === "som-waitlist") return t.includes("waitlist");
          if (formContext?.startsWith("som")) return t.includes("som");
          if (formContext === "case-study") return t.includes("case study");
          if (formContext === "upcoming") return t.includes("upcoming");
          return false;
        });
        if (match) setFetchedConfig(match);
      })
      .catch(() => {});
  }, [isOpen, config, formContext]);

  const effectiveDownloadUrl =
    pdfUrl ?? (formContext === "sdk" ? MODEL_FORGE_ZIP_URL : undefined);
  const effectiveDownloadName =
    pdfName ?? (formContext === "sdk" ? MODEL_FORGE_ZIP_NAME : undefined);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStep("form");
      setSubmittedVariant(undefined);
      setShouldRender(true);
      timeoutId = setTimeout(() => setIsAnimating(true), 50);
    } else {
      setIsAnimating(false);
      timeoutId = setTimeout(() => setShouldRender(false), 300);
    }
    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    // Lock <html> as well: iOS Safari ignores body-level overflow:hidden for touch panning.
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!mounted || !shouldRender) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-end overflow-hidden">
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${isAnimating ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
        aria-hidden="true"
        style={{ background: "rgba(0,0,0,0.6)" }}
      />

      <div
        ref={modalRef}
        className={`relative h-full w-full md:w-[700px] shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isAnimating ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="absolute left-[10px] right-[10px] top-[10px] bottom-[10px] md:inset-0">
          <img loading="lazy" decoding="async"
            src={PANEL_BG}
            alt=""
            className="pointer-events-none absolute inset-0 block size-full max-w-none"
            aria-hidden
          />
        </div>

        {step === "form" && (
          <FormStep
            onClose={onClose}
            onSuccess={(variant) => {
              if (variant) setSubmittedVariant(variant);
              setStep("confirmation");
            }}
            formContext={formContext}
            config={activeConfig}
            pdfUrl={effectiveDownloadUrl}
            pdfName={effectiveDownloadName}
            title={title}
            productVariant={productVariant}
          />
        )}
        {step === "confirmation" && (
          <ConfirmationStep
            onClose={onClose}
            config={activeConfig}
            downloadStarted={Boolean(effectiveDownloadUrl)}
            downloadUrl={effectiveDownloadUrl}
            downloadName={effectiveDownloadName}
            closeLabel={closeLabel}
            formContext={formContext}
            productVariant={submittedVariant ?? productVariant}
          />
        )}
      </div>
    </div>,
    document.body
  );
}

function FormStep({
  onClose,
  onSuccess,
  formContext,
  config,
  pdfUrl,
  pdfName,
  title,
  productVariant,
}: {
  onClose: () => void;
  onSuccess: (variant?: string) => void;
  formContext: "upcoming" | "usecase" | "evalkit" | "sdk" | "som" | "som-ble" | "som-lte" | "som-waitlist" | "waitlist" | "case-study";
  config?: PopupConfig;
  pdfUrl?: string;
  pdfName?: string;
  title?: string;
  productVariant?: string;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [chip, setChip] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSom =
    formContext === "som" ||
    formContext === "som-ble" ||
    formContext === "som-lte" ||
    formContext === "som-waitlist";
  const initialSomVariant: "BLE" | "LTE" =
    productVariant?.includes("LTE") || formContext === "som-lte" ? "LTE" : "BLE";
  const [somVariant, setSomVariant] = useState<"BLE" | "LTE">(initialSomVariant);

  const resolvedVariant = isSom
    ? (somVariant === "LTE" ? "SOM (LTE)" : "SOM (BLE)")
    : productVariant;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    // If a PDF is provided, open it in a new tab immediately within the user gesture context
    if (pdfUrl) {
      const isZip = pdfUrl.endsWith(".zip");
      if (isZip) {
        const a = document.createElement("a");
        a.href = pdfUrl;
        a.download = pdfName ?? "";
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        try {
          const opened = window.open(pdfUrl, "_blank", "noopener,noreferrer");
          if (!opened) {
            const a = document.createElement("a");
            a.href = pdfUrl;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            document.body.appendChild(a);
            a.click();
            a.remove();
          }
        } catch {
          const a = document.createElement("a");
          a.href = pdfUrl;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          document.body.appendChild(a);
          a.click();
          a.remove();
        }
      }
    }

    try {
      // Map formContext to Mailchimp form key
      const formKeyMap: Record<string, string> = {
        upcoming: "upcoming-products",
        usecase: "upcoming-usecase",
        evalkit: "upcoming-evalkit",
        sdk: "upcoming-sdk",
        som: "upcoming-som",
        "som-ble": "upcoming-som-ble",
        "som-lte": "upcoming-som-lte",
        "som-waitlist": "upcoming-som-waitlist",
        waitlist: "upcoming-waitlist",
        "case-study": "case-study",
      };
      let formKey = formKeyMap[formContext] || "upcoming-products";
      if (isSom) {
        if (formContext === "som-waitlist") {
          formKey = somVariant === "LTE" ? "upcoming-som-waitlist-lte" : "upcoming-som-waitlist-ble";
        } else {
          formKey = somVariant === "LTE" ? "upcoming-som-lte" : "upcoming-som-ble";
        }
      }

      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          formKey,
          firstName: firstName || undefined,
          lastName: lastName || undefined,
          company: company || undefined,
          details: chip || undefined,
          product: resolvedVariant,
          variant: isSom ? somVariant : undefined,
          popupId: config?.documentId,
        }),
      }).catch(() => { /* Mailchimp sync failure is non-blocking */ });

      onSuccess(resolvedVariant);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="absolute left-[20px] top-[20px] md:left-[40px] md:top-[30px] flex h-[48px] items-center gap-[15px] md:gap-[25px]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Back"
          className={`relative flex size-[44px] shrink-0 cursor-pointer items-center justify-center ${BOX_BORDER}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          <Corners leftSrc="/careers/corner-menu-tl.svg" rightSrc="/careers/corner-menu-tr.svg" />
        </button>
        <h2 className={`${gilroyMedium.className} text-[16px] md:text-[22px] leading-[normal] font-medium text-white not-italic`}>
          {title ?? config?.title ?? (
            formContext === "usecase"
              ? "Discuss Your Use Case"
              : formContext === "evalkit"
              ? "Request An Eval Kit"
              : formContext === "sdk"
              ? "Request The SDK"
              : formContext === "som"
              ? "Register SOM Interest"
              : formContext === "som-ble"
              ? "Register SOM (BLE) Interest"
              : formContext === "som-lte"
              ? "Register SOM (LTE) Interest"
              : formContext === "som-waitlist"
              ? "Join the SOM Waitlist"
              : formContext === "waitlist"
              ? "Join The Waitlist"
              : formContext === "case-study"
              ? "Read The Case Study"
              : "Sign Up For Upcoming Products"
          )}
        </h2>
      </div>

      <div className="absolute left-0 top-[80px] md:top-[108px] h-px w-full bg-[rgba(255,255,255,0.1)]" />

      <form
        onSubmit={handleSubmit}
        className={`${interRegular.className} absolute bottom-[40px] left-[20px] right-[20px] top-[100px] md:bottom-[40px] md:left-[40px] md:right-[40px] md:top-[138px] flex flex-col gap-[24px] overflow-y-auto pr-[8px] font-normal not-italic`}
      >
        {resolvedVariant && (
          <div className="flex items-center gap-2">
            <span className="text-[12px] uppercase tracking-wider text-[#a8ed90]">
              [ Module: {resolvedVariant} ]
            </span>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-[18px]">
          <Field label={popupField(config, "first_name")?.label ?? "First Name*"} className="min-w-0 flex-1">
            <input
              className={FIELD_BOX}
              placeholder={popupField(config, "first_name")?.placeholder ?? "Enter First Name"}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Field>
          <Field label={popupField(config, "last_name")?.label ?? "Last Name*"} className="min-w-0 flex-1">
            <input
              className={FIELD_BOX}
              placeholder={popupField(config, "last_name")?.placeholder ?? "Enter Last Name"}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Field>
        </div>

        <div className="flex flex-col md:flex-row gap-[18px]">
          <Field label={popupField(config, "email")?.label ?? "Email ID*"} className="min-w-0 flex-1">
            <input
              type="email"
              className={FIELD_BOX}
              placeholder={popupField(config, "email")?.placeholder ?? "Enter Your Email ID"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>
          <Field label={popupField(config, "company")?.label ?? "Company*"} className="min-w-0 flex-1">
            <input
              className={FIELD_BOX}
              placeholder={popupField(config, "company")?.placeholder ?? "Enter Company Name"}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </Field>
        </div>

        {isSom && (
          <Field label="Module Variant*" className="w-full">
            <div className="relative h-[42px] w-full border-[0.5px] border-solid border-[#4a4a4a] bg-transparent focus-within:border-[rgba(255,255,255,0.5)]">
              <select
                className={`${interRegular.className} h-full w-full appearance-none bg-transparent px-[12px] pr-[40px] text-[14px] leading-[21px] font-normal text-white outline-none not-italic cursor-pointer`}
                value={somVariant}
                onChange={(e) => setSomVariant(e.target.value as "BLE" | "LTE")}
                required
              >
                <option value="BLE" className="bg-[#121212] text-white">
                  BLE
                </option>
                <option value="LTE" className="bg-[#121212] text-white">
                  LTE
                </option>
              </select>
              <img
                loading="lazy"
                decoding="async"
                src="/careers/chevron-down.svg"
                alt=""
                width={24}
                height={24}
                className="pointer-events-none absolute right-[9px] top-1/2 size-[24px] -translate-y-1/2"
                aria-hidden
              />
            </div>
          </Field>
        )}

        <Field
          label={
            popupField(config, "details")?.label ??
            (formContext === "usecase"
              ? "Please briefly describe your use case*"
              : isSom
              ? "Please describe your intended application*"
              : formContext === "case-study"
              ? "Please describe your use case*"
              : formContext === "waitlist"
              ? "Tell Us About Your Project Or Interest*"
              : "Which chip are you looking for?*")
          }
        >
          <p className="text-[12px] leading-[18px] text-[#a4a4a4] mb-[8px]">
            {popupField(config, "details")?.helper_text ??
              (formContext === "usecase"
                ? "Explain your use case and our team will get in touch with you."
                : formContext === "evalkit"
                ? "Tell us a bit about your project or use case for the evaluation kit."
                : formContext === "sdk"
                ? "Tell us about the project you're building with our SDK."
                : isSom
                ? `Tell us about the project you're building with our SOM (${somVariant}).`
                : formContext === "case-study"
                ? "Tell us what you're building the full case study PDF downloads right after you submit."
                : formContext === "waitlist"
                ? "Share a few details about what you're building or hoping to deploy."
                : "These are the upcoming chips we are providing. We just want to know which chip you are looking for.")}
          </p>
          <input
            className={FIELD_BOX}
            placeholder={
              popupField(config, "details")?.placeholder ??
              (formContext === "usecase"
                ? "Enter your use case"
                : isSom
                ? "Describe your intended application"
                : formContext === "case-study"
                ? "Describe your use case"
                : formContext === "waitlist"
                ? "Describe your project or use case"
                : "Enter chip name")
            }
            value={chip}
            onChange={(e) => setChip(e.target.value)}
            required
          />
        </Field>

        <div className="pt-[8px]">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${gilroyMedium.className} relative flex h-[48px] w-[140px] shrink-0 items-center justify-center text-[16px] leading-[28px] font-medium uppercase text-white shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)] transition-opacity hover:opacity-90 disabled:opacity-70`}
          >
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
            <span aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]" />
            <span className="relative z-10">{isSubmitting ? "Submitting..." : config?.cta_label ?? "Submit"}</span>
            <Corners leftSrc="/hero/corner-tag-1.svg" rightSrc="/hero/corner-tag-2.svg" className="z-20" />
          </button>
        </div>
      </form>
    </>
  );
}

function ConfirmationStep({
  onClose,
  config,
  downloadStarted,
  downloadUrl,
  downloadName,
  closeLabel,
  formContext,
  productVariant,
}: {
  onClose: () => void;
  config?: PopupConfig;
  downloadStarted?: boolean;
  downloadUrl?: string;
  downloadName?: string;
  closeLabel?: string;
  formContext?: string;
  productVariant?: string;
}) {
  const resolvedVariant =
    productVariant ??
    (formContext === "som-ble" ? "SOM (BLE)" : formContext === "som-lte" ? "SOM (LTE)" : undefined);

  return (
    <>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-[20px] top-[20px] md:right-[40px] md:top-[30px] flex size-[44px] items-center justify-center text-white"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>

      <div className="absolute left-1/2 top-[calc(50%-27.5px)] flex w-full px-[20px] md:px-0 md:w-[620px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[24px]">
        <div className="relative size-[250px] shrink-0">
          <img loading="lazy" decoding="async"
            src={SUCCESS_IMG}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            aria-hidden
          />
        </div>

        <h2 className={`${gilroyMedium.className} text-center text-[30px] md:text-[38px] leading-[40px] md:leading-[47px] font-medium whitespace-nowrap text-white not-italic`}>
          {config?.success_title ?? (formContext === "sdk" ? "Your download is ready!" : "Thank you for signing up!")}
        </h2>

        <p className={`${interRegular.className} w-full md:w-[540px] text-center text-[12px] leading-[18px] font-normal text-[#a4a4a4] not-italic`}>
          {config?.success_text ?? (downloadStarted
            ? (formContext === "sdk"
                ? "Your download has started. ModelForge SDK (1.55 GB) is downloading to your device."
                : "Your case study PDF is opening in a new tab.")
            : resolvedVariant
            ? `We’ve received your interest in ${resolvedVariant}. Our team will keep you updated on availability and news.`
            : "We’ve received your interest. Our team will keep you updated on the latest news and availability for our upcoming products.")}
        </p>

        <p className={`${gilroyMedium.className} w-full md:w-[540px] text-center text-[22px] leading-[28px] font-medium text-white not-italic`}>
          {downloadStarted ? (formContext === "sdk" ? "Happy building!" : "Enjoy the read!") : "Stay tuned!"}
        </p>

        {downloadStarted && downloadUrl && (
          <a
            href={downloadUrl}
            target={downloadUrl.endsWith(".pdf") ? "_blank" : undefined}
            rel={downloadUrl.endsWith(".pdf") ? "noopener noreferrer" : undefined}
            download={downloadUrl.endsWith(".pdf") ? undefined : downloadName}
            className="text-[13px] text-[#86efac] underline underline-offset-4 hover:text-[#bbf7d0] transition-colors cursor-pointer"
          >
            {downloadUrl.endsWith(".pdf")
              ? "Click here if the PDF didn't open automatically"
              : "Click here if the download didn't start automatically"}
          </a>
        )}

        <button
          onClick={onClose}
          type="button"
          className={`${gilroyMedium.className} relative flex h-[48px] w-[200px] shrink-0 items-center justify-center text-[16px] leading-[28px] font-medium uppercase text-white shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)] transition-opacity hover:opacity-90`}
        >
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
          <span aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]" />
          <span className="relative z-10">{closeLabel ?? "Back to Homepage"}</span>
          <Corners leftSrc="/hero/corner-tag-1.svg" rightSrc="/hero/corner-tag-2.svg" className="z-20" />
        </button>
      </div>
    </>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-start gap-[8px] ${className}`}>
      <label className="text-[14px] leading-[21px] text-white">
        {label}
      </label>
      {children}
    </div>
  );
}
