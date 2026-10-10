"use client";

import { interMedium } from "../hero/fonts";
import { RepelDots } from "../shared/RepelDots";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

export function PlatformScaleCta({ data }: { data?: any }) {
  const cta = data?.cta || {};
  const label = cta.label || "";
  const href = cta.href || "";
  const secondaryCta = data?.secondary_cta || {};
  const secLabel = secondaryCta.label;
  const secHref = secondaryCta.href || "#";

  return (
    <div
      className="absolute top-[1000px] left-1/2 z-30 flex -translate-x-1/2 items-center justify-center gap-[16px]"
      data-node-id="2379:660"
    >
      {label ? (
        <a
          href={href}
          className={`${interMedium.className} relative flex h-[60px] min-w-[320px] px-[32px] items-center justify-center shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
          />
          <span className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]">
            <RepelDots />
          </span>
          <p
            className="relative z-10 max-w-full text-[18px] leading-[32px] tracking-[0.04em] font-medium whitespace-nowrap text-white uppercase not-italic overflow-hidden text-ellipsis [word-break:break-word]"
          >
            {label}
          </p>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[2] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)] rounded-[inherit]"
          />
          <GreenCtaCorners />
        </a>
      ) : null}

      {secLabel ? (
        <a
          href={secHref}
          onClick={(e) => {
            const text = secLabel.toUpperCase();
            if (text.includes("UPCOMING") || text.includes("SIGN UP") || text.includes("SIGNUP")) {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('open-upcoming-products-modal'));
            }
          }}
          className={`${interMedium.className} relative flex h-[60px] min-w-[320px] w-auto px-[32px] shrink-0 items-center justify-center border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(226,241,202,0.12)] text-white hover:bg-[rgba(226,241,202,0.2)] transition-colors duration-200`}
        >
          <span className="text-[18px] leading-[32px] tracking-[0.04em] font-medium whitespace-nowrap uppercase not-italic">
            {secLabel}
          </span>
          <Corners leftSrc="/developer/corner-58.svg" rightSrc="/developer/corner-55.svg" />
        </a>
      ) : null}
    </div>
  );
}
