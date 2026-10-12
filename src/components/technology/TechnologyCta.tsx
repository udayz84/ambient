"use client";

import { gilroySemiBold } from "../hero/fonts";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { RepelDots } from "../shared/RepelDots";
import { Corners } from "../shared/Corners";

const FALLBACK_CTA_LABEL = "Explore Technology";
const FALLBACK_CTA_HREF = "/technology";

export function TechnologyCta({
  data,
  className,
}: {
  data?: any;
  className?: string;
}) {
  const cta = data?.cta;
  const label = cta?.label || FALLBACK_CTA_LABEL;
  const href = cta?.href || FALLBACK_CTA_HREF;
  const isSecondary = cta?.variant === "secondary";

  if (!label) return null;

  const containerClasses =
    className ?? "absolute top-[936px] left-1/2 z-20 -translate-x-1/2";

  if (isSecondary) {
    return (
      <div className={containerClasses}>
        <a
          href={href}
          className={`${gilroySemiBold.className} relative flex h-[48px] min-w-[204px] px-[28px] items-center justify-center border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(226,241,202,0.12)] text-white hover:bg-[rgba(226,241,202,0.2)] transition-colors duration-200`}
        >
          <span className="text-[14px] leading-[24px] tracking-[0.02em] font-semibold whitespace-nowrap uppercase not-italic">
            {label}
          </span>
          <Corners />
        </a>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <a
        href={href}
        className={`${gilroySemiBold.className} relative flex h-[48px] min-w-[204px] px-[28px] items-center justify-center shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
        data-name="Technology CTA"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
        />
        <span className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
          <RepelDots />
        </span>
        <span className="relative z-10 text-[14px] leading-[24px] tracking-[0.02em] font-semibold whitespace-nowrap text-white uppercase not-italic">
          {label}
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
        />
        <GreenCtaCorners />
      </a>
    </div>
  );
}
