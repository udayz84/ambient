"use client";

import { useEffect, useRef, useState } from "react";
import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { RepelDots } from "../shared/RepelDots";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

/* ------------------------------------------------------------------ */
/* Smooth in-page anchor scrolling (Locomotive-compatible)             */
/* ------------------------------------------------------------------ */

export function scrollToPartnerSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function handlePartnerAnchor(e: React.MouseEvent, id: string) {
  e.preventDefault();
  scrollToPartnerSection(id);
}

/* ------------------------------------------------------------------ */
/* Corner brackets — tinted variants for the daylight (white) section */
/* ------------------------------------------------------------------ */

function TintedCorner({ className = "", flip = "" }: { className?: string; flip?: string }) {
  return (
    <div className={`pointer-events-none absolute size-[4px] ${className}`}>
      <div className={flip}>
        <svg viewBox="0 0 4.5 4.5" fill="none" className="block size-full max-w-none" aria-hidden>
          <path d="M0.5 0L0.5 4H4.5" stroke="#151515" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}

export function LightCorners() {
  return (
    <>
      <TintedCorner className="top-0 right-0" flip="rotate-180" />
      <TintedCorner className="top-0 left-0" flip="-scale-y-100" />
      <TintedCorner className="right-0 bottom-0" flip="-scale-x-100" />
      <TintedCorner className="bottom-0 left-0" />
    </>
  );
}

function GreenTintedCorner({ className = "", flip = "" }: { className?: string; flip?: string }) {
  return (
    <div className={`pointer-events-none absolute size-[4px] ${className}`}>
      <div className={flip}>
        <svg viewBox="0 0 4.5 4.5" fill="none" className="block size-full max-w-none" aria-hidden>
          <path d="M0.5 0L0.5 4H4.5" stroke="#53d824" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}

export function GreenOutlineCorners() {
  return (
    <>
      <GreenTintedCorner className="top-0 right-0" flip="rotate-180" />
      <GreenTintedCorner className="top-0 left-0" flip="-scale-y-100" />
      <GreenTintedCorner className="right-0 bottom-0" flip="-scale-x-100" />
      <GreenTintedCorner className="bottom-0 left-0" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Secondary CTA — same construction as SecondaryCta site-wide         */
/* ------------------------------------------------------------------ */

export function GhostGreenCta({
  children,
  href = "#",
  className = "",
  width,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  width?: string;
  onClick?: () => void;
}) {
  const cls = `${gilroyMedium.className} relative flex h-[48px] shrink-0 cursor-pointer items-center justify-center overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.25)] bg-[rgba(226,241,202,0.12)] transition-colors duration-200 hover:bg-[rgba(226,241,202,0.2)] ${className}`;
  const style = width ? { width } : undefined;
  const onAnchorClick = (e: React.MouseEvent) => {
    if (href.startsWith("#")) handlePartnerAnchor(e, href.slice(1));
  };
  const content = (
    <>
      <span className="relative px-[20px] py-[10px] text-[16px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic">
        {children}
      </span>
      <Corners />
    </>
  );
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cls} style={style}>
        {content}
      </button>
    );
  }
  return (
    <a href={href} onClick={onAnchorClick} className={cls} style={style}>
      {content}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Green CTA — same construction as GreenCtaButton on the site         */
/* ------------------------------------------------------------------ */

export function PartnersGreenCta({
  children,
  href = "#",
  className = "",
  width,
  onClick,
  disabled = false,
  loading = false,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  width?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}) {
  const cls = `${gilroyMedium.className} relative block h-[48px] shrink-0 cursor-pointer overflow-hidden ${GREEN_CTA_SHADOW} disabled:cursor-not-allowed disabled:opacity-70 ${className}`;
  const style = width ? { width } : undefined;
  const onAnchorClick = (e: React.MouseEvent) => {
    if (href.startsWith("#")) handlePartnerAnchor(e, href.slice(1));
  };
  const content = (
    <>
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
      <RepelDots />
      <span className="relative flex h-full items-center justify-center gap-[10px] px-[20px] text-[16px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic">
        {loading ? (
          <span className="relative size-[18px] shrink-0 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden />
        ) : null}
        {loading ? "Loading..." : children}
      </span>
      <span aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]" />
      <GreenCtaCorners />
    </>
  );
  if (onClick) {
    return (
      <button type="button" onClick={onClick} disabled={disabled || loading} aria-busy={loading} className={cls} style={style}>
        {content}
      </button>
    );
  }
  return (
    <a href={href} onClick={onAnchorClick} className={cls} style={style}>
      {content}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Light tag badge — for the daylight section                          */
/* ------------------------------------------------------------------ */

export function LightTagBadge({ label, width }: { label: string; width: number }) {
  return (
    <div
      className={`${dmMono.className} relative shrink-0 overflow-hidden border-[0.5px] border-solid border-[rgba(21,21,21,0.2)] bg-[rgba(21,21,21,0.03)]`}
      style={{ width, height: 26 }}
    >
      <LightCorners />
      <p className="absolute top-[calc(50%-4.5px)] left-1/2 max-w-[calc(100%-16px)] overflow-hidden text-ellipsis font-normal whitespace-nowrap text-[13px] leading-[19.5px] tracking-[-0.39px] text-[#1c3a12] uppercase not-italic -translate-x-1/2">
        {label}
      </p>
      <div className="absolute top-1/2 left-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-[#53d824]" />
      <div className="absolute top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-[#53d824]" style={{ left: width - 8.48 }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* GPX-native badge chip                                               */
/* ------------------------------------------------------------------ */

export function BadgeChip({ label }: { label: string }) {
  return (
    <span
      className={`${dmMono.className} inline-flex h-[22px] shrink-0 items-center gap-[6px] border-[0.5px] border-solid border-[rgba(83,216,36,0.35)] bg-[rgba(83,216,36,0.08)] px-[8px] text-[10px] leading-[15px] font-normal tracking-[0.4px] whitespace-nowrap text-[#a9e28c] uppercase not-italic`}
    >
      <span className="size-[3px] shrink-0 rounded-full bg-[#53d824]" aria-hidden />
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Generic dropdown (filters + form selects)                           */
/* ------------------------------------------------------------------ */

function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className={`shrink-0 transition-transform duration-200 ${className}`} aria-hidden>
      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PartnersDropdown({
  label,
  options,
  value,
  onChange,
  className = "",
  buttonClassName = "",
  id,
  tone = "dark",
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  buttonClassName?: string;
  id?: string;
  tone?: "dark" | "light";
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const isLight = tone === "light";

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
        className={`relative flex h-[48px] w-full cursor-pointer items-center justify-between gap-[10px] border-[0.5px] border-solid px-[20px] transition-colors duration-200 ${
          isLight
            ? `border-[rgba(21,21,21,0.25)] bg-white hover:border-[#53d824] ${open ? "border-[#53d824]" : ""}`
            : `border-[rgba(240,240,240,0.2)] bg-[rgba(21,21,21,0.3)] backdrop-blur-[8px] hover:border-[rgba(83,216,36,0.4)] ${open ? "border-[rgba(83,216,36,0.4)]" : ""}`
        } ${buttonClassName}`}
      >
        <span className={`${interRegular.className} truncate text-[14px] leading-[21px] font-normal ${value ? (isLight ? "text-[#151515]" : "text-white") : isLight ? "text-[#8a9083]" : "text-[#8a8a8a]"}`}>
          {value || label}
        </span>
        <ChevronDownIcon className={isLight ? "text-[#151515]/70" : "text-white/60"} />
        {isLight ? <LightCorners /> : <Corners />}
      </button>
      <div
        role="listbox"
        aria-label={label}
        className={`absolute top-[calc(100%+8px)] left-0 z-40 w-full origin-top border-[0.5px] border-solid py-[8px] transition-all duration-200 ${
          isLight ? "border-[rgba(21,21,21,0.15)] bg-white" : "border-[rgba(255,255,255,0.1)] bg-[#0f0e0e]"
        } ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        {options.map((option) => {
          const selected = option === value;
          return (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={selected}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`${interRegular.className} flex w-full cursor-pointer items-center justify-between px-[20px] py-[9px] text-left text-[14px] leading-[21px] font-normal transition-colors duration-150 ${
                isLight
                  ? selected
                    ? "text-[#2c7213]"
                    : "text-[#444] hover:bg-[rgba(83,216,36,0.07)]"
                  : selected
                    ? "text-[#a9e28c]"
                    : "text-[#ccc] hover:bg-[rgba(83,216,36,0.08)]"
              }`}
            >
              <span className="truncate">{option}</span>
              {selected ? <span className="ml-[10px] size-[5px] shrink-0 rounded-full bg-[#53d824]" aria-hidden /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Minimalist geometric wireframe icons (Section 2 + Section 7)        */
/* ------------------------------------------------------------------ */

const ICON_GREEN = "#53d824";

export function WireframeIcon({
  name,
  className = "size-[48px]",
  tone = "dark",
}: {
  name: string;
  className?: string;
  tone?: "dark" | "light";
}) {
  const common = {
    fill: "none" as const,
    stroke: tone === "light" ? "rgba(21,21,21,0.85)" : "rgba(255,255,255,0.85)",
    strokeWidth: 1,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      {name === "speed" && (
        <g {...common}>
          <circle cx="24" cy="24" r="17" />
          <path d="M24 24L31 17" stroke={ICON_GREEN} />
          <path d="M24 10V14M24 34V38M10 24H14M34 24H38" />
          <circle cx="24" cy="24" r="2" fill={ICON_GREEN} stroke="none" />
        </g>
      )}
      {name === "target" && (
        <g {...common}>
          <circle cx="24" cy="24" r="17" />
          <circle cx="24" cy="24" r="10" />
          <circle cx="24" cy="24" r="3" fill={ICON_GREEN} stroke="none" />
          <path d="M24 3V9M24 39V45M3 24H9M39 24H45" stroke={ICON_GREEN} />
        </g>
      )}
      {name === "shield" && (
        <g {...common}>
          <path d="M24 5L38 11V24C38 33 32 39.5 24 43C16 39.5 10 33 10 24V11L24 5Z" />
          <path d="M17 24L22 29L31 19" stroke={ICON_GREEN} />
        </g>
      )}
      {name === "focus" && (
        <g {...common}>
          <path d="M24 6L42 24L24 42L6 24L24 6Z" />
          <path d="M24 14L34 24L24 34L14 24L24 14Z" />
          <circle cx="24" cy="24" r="2.5" fill={ICON_GREEN} stroke="none" />
        </g>
      )}
      {name === "signal" && (
        <g {...common}>
          <circle cx="24" cy="34" r="3" fill={ICON_GREEN} stroke="none" />
          <path d="M15 25C18.5 21.5 29.5 21.5 33 25" stroke={ICON_GREEN} />
          <path d="M10 20C16.5 13.5 31.5 13.5 38 20" />
          <path d="M5 15C13.5 5.5 34.5 5.5 43 15" />
        </g>
      )}
      {name === "chip" && (
        <g {...common}>
          <rect x="14" y="14" width="20" height="20" />
          <rect x="20" y="20" width="8" height="8" stroke={ICON_GREEN} />
          <path d="M19 14V8M29 14V8M19 40V34M29 40V34M14 19H8M14 29H8M40 19H34M40 29H34" />
        </g>
      )}
      {name === "showcase" && (
        <g {...common}>
          <path d="M8 42V24L24 12L40 24V42" />
          <path d="M16 42V30H32V42" stroke={ICON_GREEN} />
          <path d="M8 42H40" />
        </g>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Journey node icons (Section 1)                                      */
/* ------------------------------------------------------------------ */

export function JourneyIcon({ name, className = "size-[26px]" }: { name: string; className?: string }) {
  const common = {
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 26 26" className={className} aria-hidden>
      {name === "model" && (
        <g {...common}>
          <circle cx="13" cy="5.5" r="2.5" />
          <circle cx="5.5" cy="20" r="2.5" />
          <circle cx="20.5" cy="20" r="2.5" />
          <path d="M11.4 7.7L7.4 17.8M14.6 7.7L18.6 17.8M8 20H18" />
        </g>
      )}
      {name === "firmware" && (
        <g {...common}>
          <path d="M8 8L3 13L8 18M18 8L23 13L18 18" />
          <path d="M15 5L11 21" />
        </g>
      )}
      {name === "hardware" && (
        <g {...common}>
          <rect x="6" y="6" width="14" height="14" />
          <path d="M10 6V3M16 6V3M10 23V20M16 23V20M6 10H3M6 16H3M23 10H20M23 16H20" />
        </g>
      )}
      {name === "manufacturing" && (
        <g {...common}>
          <path d="M3 22V10L9 14V10L15 14V10L21 14V6H23V22H3Z" />
          <path d="M7 18H10" />
        </g>
      )}
      {name === "product" && (
        <g {...common}>
          <path d="M13 3L22 8V18L13 23L4 18V8L13 3Z" />
          <path d="M13 13L22 8M13 13L4 8M13 13V23" />
        </g>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Ambient pulse — confirmation dot with expanding rings               */
/* ------------------------------------------------------------------ */

export function AmbientPulse() {
  return (
    <span className="relative flex size-[18px] shrink-0 items-center justify-center" aria-hidden>
      <span className="absolute size-[10px] rounded-full bg-[#53d824]" />
      <span className="absolute size-[18px] rounded-full border border-[rgba(83,216,36,0.7)] animate-partners-pulse-ring" />
      <span className="absolute size-[18px] rounded-full border border-[rgba(83,216,36,0.45)] animate-partners-pulse-ring [animation-delay:0.6s]" />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Section heading helper                                              */
/* ------------------------------------------------------------------ */

export function PartnersSectionHeading({
  children,
  className = "",
  deg = "101.272deg",
}: {
  children: React.ReactNode;
  className?: string;
  deg?: string;
}) {
  return (
    <h2
      className={`${gilroyMedium.className} bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent [word-break:break-word] not-italic min-[1024px]:whitespace-nowrap max-[1023px]:text-[28px] max-[1023px]:leading-[34px] ${className}`}
      style={{
        backgroundImage: `linear-gradient(${deg}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
      }}
    >
      {children}
    </h2>
  );
}

/* ------------------------------------------------------------------ */
/* Bridge text box                                                    */
/* ------------------------------------------------------------------ */

export function PartnersBridgeBox({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative inline-flex items-center justify-center bg-[rgba(83,216,36,0.05)] px-[32px] py-[16px] backdrop-blur-[8px] ${className}`}>
      <Corners />
      <p className={`${gilroyMedium.className} text-center text-[18px] leading-[27px] font-medium text-white not-italic [word-break:break-word] max-[1023px]:text-[14px] max-[1023px]:leading-[21px]`}>
        {children}
      </p>
    </div>
  );
}
