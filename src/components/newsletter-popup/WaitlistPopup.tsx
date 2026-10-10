"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { gilroySemiBold, interLight, interRegular } from "../hero/fonts";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

export function WaitlistPopup({ 
  isOpen, 
  onClose,
  title = "Join the Waitlist",
  subtitle = "Be the first to access our upcoming Vision, Sound, and Industrial modules.",
  successTitle = "Thank you for subscribing",
  successSubtitle = "We'll let you know when the modules are available."
}: { 
  isOpen: boolean; 
  onClose: () => void;
  title?: string;
  subtitle?: string;
  successTitle?: string;
  successSubtitle?: string;
}) {
  const [submitted, setSubmitted] = useState(false);

  const close = () => {
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Native email/required validation — blocks submit + shows the browser
    // message for invalid input.
    if (!e.currentTarget.reportValidity()) return;
    // Show the thank-you note, then auto-dismiss.
    setSubmitted(true);
  };

  useEffect(() => {
    if (!submitted) return;
    const timer = window.setTimeout(() => close(), 4000);
    return () => window.clearTimeout(timer);
  }, [submitted]);

  if (!isOpen) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <section
      aria-label="Newsletter signup"
      className="fixed bottom-[24px] right-[24px] z-[100] h-[196px] w-[450px] max-w-[calc(100vw-48px)] animate-popup-rise-in border-[0.5px] border-solid border-[rgba(240,240,240,0.3)] bg-[#141414] max-[767px]:right-[16px] max-[767px]:bottom-[16px] max-[767px]:w-[calc(100vw-32px)] max-[767px]:max-w-none max-[767px]:h-auto max-[767px]:py-[20px]"
      data-node-id="5558:8442"
      data-name="Newsletter popup"
    >
      <div
        className="absolute top-1/2 left-1/2 flex w-[410px] -translate-x-1/2 -translate-y-1/2 flex-col items-start gap-[12px] max-[767px]:static max-[767px]:w-full max-[767px]:translate-x-0 max-[767px]:translate-y-0 max-[767px]:px-[20px]"
        data-node-id="5558:8501"
        data-name="Frame 2147240901"
      >
        {submitted ? (
          <div className="flex w-full flex-col items-start gap-[12px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/contact/success-icon.png"
              alt=""
              aria-hidden
              className="block h-[48px] w-[48px] object-contain"
            />
            <p
              className={`${gilroySemiBold.className} w-full text-[24px] leading-[36px] text-white not-italic`}
            >
              Thank you for subscribing
            </p>
            <p
              className={`${interRegular.className} w-full text-[12px] leading-[18px] font-normal text-[#a4a4a4] not-italic [word-break:break-word]`}
            >
              {successSubtitle}
            </p>
          </div>
        ) : (
        <>
        <div
          className="flex w-[315px] max-w-full flex-col items-start"
          data-node-id="5558:8500"
          data-name="Frame 2147240900"
        >
          <p
            className={`${gilroySemiBold.className} w-full text-[24px] leading-[36px] text-white not-italic`}
            data-node-id="5558:8446"
          >
            {title}
          </p>
          <p
            className={`${interRegular.className} w-full text-[12px] leading-[18px] font-normal text-[#a4a4a4] not-italic [word-break:break-word]`}
            data-node-id="5558:8498"
          >
            {subtitle}
          </p>
        </div>

        <form
          className="flex h-[48px] w-[410px] max-w-full shrink-0 items-center gap-[10px] max-[767px]:w-full"
          data-node-id="5558:8465"
          data-name="Frame 2147240807"
          onSubmit={handleSubmit}
        >
          <label htmlFor="newsletter-popup-email" className="sr-only">
            Email address
          </label>
          <div
            className="flex h-full min-w-0 flex-1 items-start border-[0.5px] border-solid border-[#4a4a4a] p-[12px]"
            data-node-id="5558:8482"
            data-name="Input Field"
          >
            <input
              id="newsletter-popup-email"
              name="email"
              type="email"
              required
              placeholder="Enter Your Email ID"
              className={`${interRegular.className} w-full border-0 bg-transparent text-[14px] leading-[21px] text-white outline-none placeholder:text-[#4a4a4a]`}
            />
          </div>
          <button
            type="submit"
            className={`${gilroySemiBold.className} relative block h-[48px] w-[140px] shrink-0 cursor-pointer overflow-hidden text-[14px] leading-[normal] whitespace-nowrap text-white uppercase not-italic ${GREEN_CTA_SHADOW}`}
            data-node-id="5558:8469"
            data-name="Cta"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
            />
            <span
              className="absolute top-[calc(50%-9px)] left-1/2 flex w-full -translate-x-1/2 items-center justify-center"
              data-node-id="5558:8470"
            >
              Submit
            </span>
            <GreenCtaCorners disableDots />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
            />
          </button>
        </form>

        <p
          className={`${interLight.className} w-[410px] max-w-full text-[10px] leading-[15px] font-light text-[#e8e8e8] not-italic [word-break:break-word]`}
          data-node-id="5558:8485"
        >
          {`By providing your email, you consent to receive promotional emails from Ambient, and acknowledge our `}
          <a
            href="#"
            className="underline decoration-solid [text-underline-position:from-font]"
          >
            terms &amp; conditions
          </a>
          {` along with our `}
          <a
            href="#"
            className="underline decoration-solid [text-underline-position:from-font]"
          >
            privacy policy
          </a>
          {`.`}
        </p>
        </>
        )}
      </div>

      {/* cancel */}
      <button
        type="button"
        onClick={close}
        aria-label="Close"
        className="absolute top-[19.5px] right-[20.5px] block size-[40px] cursor-pointer overflow-clip"
        data-node-id="5558:8459"
        data-name="cancel-01"
      >
        <div
          className="absolute inset-[20.83%]"
          data-node-id="I5558:8459;2:3240"
          data-name="elements"
        >
          <div className="absolute inset-[-5.36%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              loading="lazy"
              decoding="async"
              alt=""
              className="block size-full max-w-none"
              src="/contact/success-cancel-icon.svg"
              aria-hidden
            />
          </div>
        </div>
      </button>
    </section>,
    document.body
  );
}
