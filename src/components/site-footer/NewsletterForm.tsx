"use client";

import { useState } from "react";
import { interRegular, gilroySemiBold } from "../hero/fonts";

/**
 * Client-side form extracted from NewsletterSignup (server component).
 * Posts the email to /api/newsletter for Mailchimp sync.
 * Preserves all existing styling exactly.
 */
export function NewsletterForm({
  isCompact = false,
  placeholder,
  buttonLabel,
}: {
  isCompact?: boolean;
  placeholder: string;
  buttonLabel: string;
}) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("newsletter-email") ?? "").trim();
    if (!email) return;

    setSubmitted(true);

    // Sync to Mailchimp via server-side API (fire-and-forget)
    fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, formKey: "newsletter" }),
    }).catch(() => { /* silently ignore */ });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${isCompact ? "mt-[20px]" : "mt-[34px]"} flex w-full max-w-[353px] md:max-w-[458px] flex-row items-center justify-center gap-0`}
    >
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <div
        className={`flex ${isCompact ? "h-[40px]" : "h-[48px]"} flex-1 shrink-0 items-center border-[0.5px] border-solid border-white/50 bg-[#6ced3f]/10 px-[20px]`}
      >
        <input
          id="newsletter-email"
          name="newsletter-email"
          type="email"
          required
          placeholder={placeholder}
          className={`${interRegular.className} w-full border-0 bg-transparent text-[14px] leading-[1.4] text-white outline-none placeholder:text-white min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
        />
      </div>
      <button
        type="submit"
        disabled={submitted}
        className={`${gilroySemiBold.className} relative flex ${isCompact ? "h-[40px]" : "h-[48px]"} w-[99px] md:w-[158px] shrink-0 items-center justify-center text-[14px] leading-[normal] font-semibold text-[#121212] uppercase shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
      >
        <span aria-hidden className="pointer-events-none absolute inset-0 bg-white" />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[length:307.2px_307.2px] bg-top-left opacity-40 mix-blend-plus-lighter"
          style={{ backgroundImage: "url(/contact/cta-texture.webp)" }}
        />
        <span className="relative">{submitted ? "Subscribed ✓" : buttonLabel}</span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
        />
      </button>
    </form>
  );
}
