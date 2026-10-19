"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { gilroySemiBold, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import {
  COOKIE_CONSENT_OPEN_EVENT,
  getHasCookieConsentSnapshot,
  subscribeCookieConsent,
  writeCookieConsent,
  type CookieConsentChoice,
} from "@/lib/cookie-consent";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

export function CookieConsent({
  policyHref = "/privacy-policy",
}: {
  policyHref?: string;
}) {
  const hasChosen = useSyncExternalStore(
    subscribeCookieConsent,
    getHasCookieConsentSnapshot,
    () => true
  );
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const onOpen = () => setReopened(true);
    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, onOpen);
  }, []);

  const choose = useCallback((choice: CookieConsentChoice) => {
    writeCookieConsent(choice);
    setReopened(false);
  }, []);

  if (hasChosen && !reopened) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <section
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      className="animate-popup-rise-in fixed bottom-[16px] left-[16px] z-[110] w-[calc(100vw-32px)] max-w-[480px] md:bottom-[24px] md:left-[24px] md:w-[480px]"
      data-node-id="cookie-consent"
      data-name="Cookie consent banner"
    >
      <div className="relative flex w-full flex-col gap-[14px] border-[0.5px] border-solid border-[rgba(240,240,240,0.3)] bg-[#141414] px-[20px] py-[18px] shadow-[0px_24px_64px_0px_rgba(0,0,0,0.65)]">
        <Corners />

        <div className="flex flex-col gap-[4px]">
          <p
            className={`${gilroySemiBold.className} text-[16px] leading-[22px] text-white not-italic`}
          >
            We value your privacy
          </p>
          <p
            className={`${interRegular.className} text-[12px] leading-[18px] font-normal text-[#a4a4a4] not-italic [word-break:break-word]`}
          >
            {`We use cookies to enhance your experience, analyse site traffic, and personalise content. See our `}
            <a
              href={policyHref}
              className="text-[#6ced3f] underline decoration-solid [text-underline-position:from-font]"
            >
              Cookie Policy
            </a>
            {`.`}
          </p>
        </div>

        <div className="flex items-center gap-[10px]">
          <button
            type="button"
            onClick={() => choose("rejected")}
            className={`${gilroySemiBold.className} relative flex h-[40px] flex-1 cursor-pointer items-center justify-center border-[0.5px] border-solid border-[rgba(240,240,240,0.3)] px-[16px] text-[13px] leading-[normal] font-medium whitespace-nowrap text-white uppercase not-italic hover:bg-white/5`}
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className={`${gilroySemiBold.className} relative flex h-[40px] flex-1 cursor-pointer items-center justify-center overflow-hidden px-[16px] text-[13px] leading-[normal] font-medium whitespace-nowrap text-white uppercase not-italic ${GREEN_CTA_SHADOW}`}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
            />
            <span className="relative">Accept All</span>
            <GreenCtaCorners disableDots />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
            />
          </button>
        </div>
      </div>
    </section>,
    document.body
  );
}
