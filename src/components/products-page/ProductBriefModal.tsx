"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { BOX_BORDER } from "../careers/careers-shared";

const SUCCESS_IMG = "/careers/apply-success.webp";

const FIELD_BOX =
  "h-[42px] w-full border-[0.5px] border-solid border-[#4a4a4a] bg-transparent px-[12px] text-[14px] leading-[21px] text-white outline-none placeholder:text-[#4a4a4a] focus:border-[rgba(255,255,255,0.5)]";

type Step = "form" | "confirmation";

export function ProductBriefModal({
  isOpen,
  title,
  onClose,
}: {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      <div
        className={`absolute inset-0 transition-all duration-300 ${isAnimating ? "opacity-100 backdrop-blur-sm" : "opacity-0 backdrop-blur-none"}`}
        onClick={onClose}
        aria-hidden="true"
        style={{ background: "rgba(0,0,0,0.4)" }}
      />

      <div
        ref={modalRef}
        className={`relative w-[calc(100%-32px)] md:w-full max-w-[500px] mx-auto h-auto shrink-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-visible border-[0.5px] border-solid border-[#4a4a4a] bg-gradient-to-br from-[#121212] via-[#0a0f0a] to-[#0d140d] shadow-[0px_0px_50px_rgba(69,196,24,0.1)] ${
          isAnimating ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        <div className="absolute inset-0 z-0 opacity-20 overflow-hidden" style={{ backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        
        <Corners leftSrc="/hero/corner-tag-1.svg" rightSrc="/hero/corner-tag-2.svg" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-[16px] right-[16px] z-50 text-white hover:opacity-70 transition-opacity p-[4px]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>

        <div className="relative z-10 p-[40px] pt-[48px] flex flex-col">
          {step === "form" && <FormStep title={title} onClose={onClose} onSuccess={() => setStep("confirmation")} />}
          {step === "confirmation" && <ConfirmationStep onClose={onClose} />}
        </div>
      </div>
    </div>,
    document.body
  );
}

function FormStep({ title, onClose, onSuccess }: { title?: string; onClose: () => void; onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, formKey: "product-brief" }),
      }).catch(() => { /* Mailchimp sync failure is non-blocking */ });

      onSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative flex items-center justify-center mb-[24px]">
        <h2 className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium text-white not-italic text-center uppercase tracking-wide`}>
          {title || "Request Information"}
        </h2>
      </div>

      <div className="h-px w-full bg-[rgba(255,255,255,0.1)] mb-[32px]" />

      <form onSubmit={handleSubmit} className={`${interRegular.className} flex flex-col gap-[24px] font-normal not-italic`}>
        <div className="flex flex-col items-start gap-[8px]">
          <label className="text-[14px] leading-[21px] text-[#a4a4a4]">
            Please provide your email to receive the requested information.
          </label>
          <input
            type="email"
            className={FIELD_BOX}
            placeholder="Enter Your Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="pt-[16px] pb-[8px] flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${gilroyMedium.className} relative flex h-[48px] w-[180px] shrink-0 items-center justify-center text-[16px] leading-[28px] font-medium uppercase text-white shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)] transition-opacity hover:opacity-90 disabled:opacity-70`}
          >
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
            <span aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]" />
            <span className="relative z-10">{isSubmitting ? "Submitting..." : "Submit"}</span>
            <Corners leftSrc="/hero/corner-tag-1.svg" rightSrc="/hero/corner-tag-2.svg" className="z-20" />
          </button>
        </div>
      </form>
    </div>
  );
}

function ConfirmationStep({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="flex flex-col items-center justify-center py-[20px] gap-[16px] text-center">
      <div className="relative size-[150px] shrink-0">
        <img loading="lazy" decoding="async"
          src={SUCCESS_IMG}
          alt="Success"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />
      </div>

      <h2 className={`${gilroyMedium.className} text-[28px] leading-[36px] font-medium whitespace-nowrap text-white not-italic`}>
        Thank you!
      </h2>

      <p className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-[#a4a4a4] not-italic`}>
        We've received your request. The information has been sent to your email.
      </p>
    </div>
  );
}
