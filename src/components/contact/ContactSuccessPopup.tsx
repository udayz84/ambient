"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { gilroyBold, gilroySemiBold, interRegular } from "../hero/fonts";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

const handOverlayStyle = {
  backgroundImage:
    "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 663.79 337.89' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(2.0323e-15 16.894 -33.19 1.0345e-15 331.9 168.94)'><stop stop-color='rgba(20,20,20,0)' offset='0'/><stop stop-color='rgba(20,20,20,1)' offset='1'/></radialGradient></defs></svg>\")",
} as const;

function CtaCorners() {
  return (
    <>
      <div className="pointer-events-none absolute right-0 top-0 flex size-[4px] items-center justify-center" data-node-id="4751:4395">
        <div className="flex-none rotate-180">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src="/contact/success-cta-corner-tr.svg" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute top-0 left-0 flex size-[4px] items-center justify-center" data-node-id="4751:4396">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src="/contact/success-cta-corner-tl.svg" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute right-0 bottom-0 flex size-[4px] items-center justify-center" data-node-id="4751:4398">
        <div className="-scale-x-100 flex-none rotate-180">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src="/contact/success-cta-corner-tr.svg" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 size-[4px]" data-node-id="4751:4399">
        <div className="absolute inset-[0_0_-12.5%_-12.5%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src="/contact/success-cta-corner-tl.svg" aria-hidden />
        </div>
      </div>
    </>
  );
}

export function ContactSuccessPopup({
  open,
  dateLabel,
  onClose,
}: {
  open: boolean;
  dateLabel: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(0,0,0,0.7)]"
      role="dialog"
      aria-modal="true"
      aria-label="Thanks for reaching out"
      onClick={onClose}
    >
      <div
        className="relative h-[609px] w-[700px] max-w-[calc(100vw-32px)] border-[0.5px] border-solid border-[rgba(240,240,240,0.3)] bg-[#141414]"
        data-node-id="4751:4382"
        data-name="Success state"
        onClick={(e) => e.stopPropagation()}
      >
        {/* hand image — blurred, radial dark vignette */}
        <div
          className="absolute top-[calc(50%-113.56px)] left-1/2 h-[337.89px] w-[663.794px] -translate-x-1/2 -translate-y-1/2 blur-[2px]"
          data-node-id="4763:4387"
          data-name="hand"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                className="absolute top-[0.06%] left-[-0.12%] h-[104.74%] w-[100.24%] max-w-none"
                src="/contact/success-hand.jpg"
              />
            </div>
            <div className="absolute inset-0" style={handOverlayStyle} />
          </div>
        </div>

        {/* content column */}
        <div
          className="absolute top-[calc(50%-22.5px)] left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[20px]"
          data-node-id="4751:4384"
        >
          <div className="relative size-[250px] shrink-0" data-node-id="4751:4385">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
              src="/contact/success-icon.png"
            />
          </div>
          <p
            className={`${gilroyBold.className} relative shrink-0 text-[38px] leading-[47px] whitespace-nowrap text-white not-italic`}
            data-node-id="4751:4386"
          >
            Thanks for reaching out!
          </p>
          <p
            className={`${interRegular.className} relative h-[36px] w-[540px] shrink-0 text-center text-[18px] leading-[27px] font-normal text-[#a4a4a4] not-italic [word-break:break-word]`}
            data-node-id="4751:4387"
          >
            {`We’re looking forward to connecting with you on ${dateLabel}`}
          </p>
          <Link
            href="/"
            className={`relative block h-[48px] w-[200px] shrink-0 cursor-pointer overflow-hidden ${GREEN_CTA_SHADOW}`}
            data-node-id="4751:4389"
            data-name="Cta"
          >
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
            <span
              className={`${gilroySemiBold.className} absolute top-[calc(50%-9px)] left-[calc(50%-67px)] text-[14px] leading-[normal] whitespace-nowrap text-white uppercase not-italic`}
              data-node-id="4751:4390"
            >
              Back to Homepage
            </span>
            <CtaCorners />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
            />
          </Link>
        </div>

        {/* cancel */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-[39.5px] left-[619.5px] block size-[40px] cursor-pointer overflow-clip"
          data-node-id="4751:4400"
          data-name="cancel-01"
        >
          <div className="absolute inset-[20.83%]" data-node-id="I4751:4400;2:3240" data-name="elements">
            <div className="absolute inset-[-5.36%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                className="block size-full max-w-none"
                src="/contact/success-cancel-icon.svg"
                aria-hidden
              />
            </div>
          </div>
        </button>
      </div>
    </div>,
    document.body
  );
}
