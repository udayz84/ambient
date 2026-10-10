"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { BOX_BORDER } from "../careers/careers-shared";

const PANEL_BG = "/form.png";
const SUCCESS_IMG = "/careers/apply-success.webp";

const FIELD_BOX =
  "h-[42px] w-full border-[0.5px] border-solid border-[#4a4a4a] bg-transparent px-[12px] text-[14px] leading-[21px] text-white outline-none placeholder:text-[#4a4a4a] focus:border-[rgba(255,255,255,0.5)]";

type Step = "form" | "confirmation";

// CHIP_OPTIONS removed as per request for free text input

export function UpcomingProductsModal({
  isOpen,
  onClose,
  formContext = "upcoming",
}: {
  isOpen: boolean;
  onClose: () => void;
  formContext?: "upcoming" | "usecase" | "evalkit" | "sdk" | "som" | "waitlist";
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>("form");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStep("form");
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
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
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

        {step === "form" && <FormStep onClose={onClose} onSuccess={() => setStep("confirmation")} formContext={formContext} />}
        {step === "confirmation" && <ConfirmationStep onClose={onClose} />}
      </div>
    </div>,
    document.body
  );
}

function FormStep({ onClose, onSuccess, formContext }: { onClose: () => void; onSuccess: () => void; formContext: "upcoming" | "usecase" | "evalkit" | "sdk" | "som" | "waitlist" }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [chip, setChip] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 1000);
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
          {formContext === "usecase" ? "Discuss Your Use Case" : formContext === "evalkit" ? "Request An Eval Kit" : formContext === "sdk" ? "Request The SDK" : formContext === "som" ? "Register SOM Interest" : formContext === "waitlist" ? "Join The Waitlist" : "Sign Up For Upcoming Products"}
        </h2>
      </div>

      <div className="absolute left-0 top-[80px] md:top-[108px] h-px w-full bg-[rgba(255,255,255,0.1)]" />

      <form
        onSubmit={handleSubmit}
        className={`${interRegular.className} absolute bottom-[40px] left-[20px] right-[20px] top-[100px] md:bottom-[40px] md:left-[40px] md:right-[40px] md:top-[138px] flex flex-col gap-[24px] overflow-y-auto pr-[8px] font-normal not-italic`}
      >
        {formContext !== "waitlist" && (
          <div className="flex flex-col md:flex-row gap-[18px]">
            <Field label="First Name*" className="min-w-0 flex-1">
              <input
                className={FIELD_BOX}
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Field>
            <Field label="Last Name*" className="min-w-0 flex-1">
              <input
                className={FIELD_BOX}
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Field>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-[18px]">
          <Field label="Email ID*" className="min-w-0 flex-1">
            <input
              type="email"
              className={FIELD_BOX}
              placeholder="Enter Your Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>
          {formContext !== "waitlist" && (
            <Field label="Company*" className="min-w-0 flex-1">
              <input
                className={FIELD_BOX}
                placeholder="Enter Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </Field>
          )}
        </div>

        {formContext !== "waitlist" && (
          <Field label={formContext === "usecase" ? "Please briefly describe your use case*" : (formContext === "evalkit" || formContext === "sdk" || formContext === "som") ? "Please describe your intended application*" : "Which chip are you looking for?*"}>
            <p className="text-[12px] leading-[18px] text-[#a4a4a4] mb-[8px]">
              {formContext === "usecase"
                ? "Explain your use case and our team will get in touch with you."
                : formContext === "evalkit"
                ? "Tell us a bit about your project or use case for the evaluation kit."
                : formContext === "sdk"
                ? "Tell us about the project you're building with our SDK."
                : formContext === "som"
                ? "Tell us about the project you're building with our SOM."
                : "These are the upcoming chips we are providing. We just want to know which chip you are looking for."}
            </p>
            <input
              className={FIELD_BOX}
              placeholder={formContext === "usecase" ? "Enter your use case" : (formContext === "evalkit" || formContext === "sdk" || formContext === "som") ? "Describe your intended application" : "Enter chip name"}
              value={chip}
              onChange={(e) => setChip(e.target.value)}
              required
            />
          </Field>
        )}

        <div className="pt-[8px]">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${gilroyMedium.className} relative flex h-[48px] w-[140px] shrink-0 items-center justify-center text-[16px] leading-[28px] font-medium uppercase text-white shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)] transition-opacity hover:opacity-90 disabled:opacity-70`}
          >
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
            <span aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]" />
            <span className="relative z-10">{isSubmitting ? "Submitting..." : "Submit"}</span>
            <Corners leftSrc="/hero/corner-tag-1.svg" rightSrc="/hero/corner-tag-2.svg" className="z-20" />
          </button>
        </div>
      </form>
    </>
  );
}

function ConfirmationStep({ onClose }: { onClose: () => void }) {
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
          Thank you for signing up!
        </h2>

        <p className={`${interRegular.className} w-full md:w-[540px] text-center text-[12px] leading-[18px] font-normal text-[#a4a4a4] not-italic`}>
          We&apos;ve received your interest. Our team will keep you updated on the latest news and availability for our upcoming products.
        </p>

        <p className={`${gilroyMedium.className} w-full md:w-[540px] text-center text-[22px] leading-[28px] font-medium text-white not-italic`}>
          Stay tuned!
        </p>

        <button
          onClick={onClose}
          type="button"
          className={`${gilroyMedium.className} relative flex h-[48px] w-[200px] shrink-0 items-center justify-center text-[16px] leading-[28px] font-medium uppercase text-white shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)] transition-opacity hover:opacity-90`}
        >
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
          <span aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]" />
          <span className="relative z-10">Back to Homepage</span>
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
