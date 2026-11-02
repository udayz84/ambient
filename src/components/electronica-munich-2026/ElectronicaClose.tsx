"use client";

import Link from "next/link";
import { gilroyMedium } from "@/components/hero/fonts";

const QUICK_LINKS = [
  {
    label: "Browse the Model Zoo",
    href: "/model-zoo",
    icon: (
      <svg
        className="size-[17px] shrink-0 text-[#53d824] transition-transform duration-200 group-hover:scale-110"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1 4 4 4 4 0 0 1-2 3.5 4 4 0 0 1-2 5.5v1a4 4 0 0 1-4 4 4 4 0 0 1-4-4v-1a4 4 0 0 1-2-5.5 4 4 0 0 1-2-3.5 4 4 0 0 1 4-4V6a4 4 0 0 1 4-4Z" />
        <path d="M12 2v20" opacity="0.4" />
      </svg>
    ),
  },
  {
    label: "Developer Hub",
    href: "/developer",
    icon: (
      <svg
        className="size-[17px] shrink-0 text-[#53d824] transition-transform duration-200 group-hover:scale-110"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="12" y1="2" x2="12" y2="22" opacity="0.3" />
      </svg>
    ),
  },
  {
    label: "Explore Applications",
    href: "/applications",
    icon: (
      <svg
        className="size-[17px] shrink-0 text-[#53d824] transition-transform duration-200 group-hover:scale-110"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    label: "Partner Ecosystem",
    href: "/partners",
    icon: (
      <svg
        className="size-[17px] shrink-0 text-[#53d824] transition-transform duration-200 group-hover:scale-110"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="12" cy="18" r="3" />
        <line x1="8.5" y1="7.5" x2="15.5" y2="7.5" />
        <line x1="7.5" y1="8.5" x2="10.5" y2="15.5" />
        <line x1="16.5" y1="8.5" x2="13.5" y2="15.5" />
      </svg>
    ),
  },
  {
    label: "Talk to an FAE",
    href: "/contact",
    icon: (
      <svg
        className="size-[17px] shrink-0 text-[#53d824] transition-transform duration-200 group-hover:scale-110"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M3 11V9a9 9 0 0 1 18 0v2" />
        <path d="M21 16a3 3 0 0 1-3 3h-2" />
        <path d="M5 19H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1" />
        <path d="M19 11h1a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-1" />
        <circle cx="12" cy="19" r="1" />
      </svg>
    ),
  },
] as const;

export function ElectronicaClose() {
  return (
    <section
      aria-label="Ambient ecosystem quick navigation"
      className="relative flex w-full justify-center overflow-hidden bg-black pt-[36px] pb-[48px] text-white md:pt-[44px] md:pb-[64px]"
    >
      {/* Background Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(83, 216, 36, 0.08) 0%, rgba(0, 0, 0, 0) 70%)",
        }}
      />

      {/* =========================================================================
          DESKTOP VIEWPORT (>= 900px)
          Horizontal unified glass capsule bar with icons, dividers, and hover glow
          ========================================================================= */}
      <div className="relative z-10 hidden min-[900px]:inline-flex items-center rounded-full border border-white/20 bg-[#0a0e0a]/90 px-[28px] py-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.8),0_0_24px_rgba(83,216,36,0.08)] backdrop-blur-xl transition-all duration-300 hover:border-[#53d824]/40 hover:shadow-[0_8px_36px_rgba(0,0,0,0.9),0_0_30px_rgba(83,216,36,0.14)]">
        <div className="flex items-center gap-[20px]">
          {QUICK_LINKS.map((link, idx) => (
            <div key={link.label} className="flex items-center gap-[20px]">
              <Link
                href={link.href}
                className={`${gilroyMedium.className} group flex items-center gap-[8px] text-[14px] font-medium text-white/80 transition-all duration-200 hover:text-white`}
              >
                {link.icon}
                <span className="whitespace-nowrap">{link.label}</span>
                <span className="text-[12px] text-[#53d824]/80 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#53d824]">
                  ↗
                </span>
              </Link>
              {idx < QUICK_LINKS.length - 1 && (
                <span className="h-[14px] w-[1px] bg-white/15 select-none" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          MOBILE & TABLET VIEWPORT (< 900px)
          Stacked touch-friendly glass card with relevant icons and smooth active state
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-[460px] px-[16px] min-[900px]:hidden">
        <div className="flex flex-col rounded-[20px] border border-white/20 bg-[#0a0e0a]/90 p-[6px] shadow-[0_8px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(83,216,36,0.08)] backdrop-blur-xl">
          {QUICK_LINKS.map((link, idx) => (
            <Link
              key={link.label}
              href={link.href}
              className={`group flex h-[48px] items-center justify-between px-[16px] rounded-[14px] transition-colors duration-150 hover:bg-white/[0.05] active:bg-[#53d824]/10 ${
                idx < QUICK_LINKS.length - 1 ? "border-b border-white/[0.06]" : ""
              }`}
            >
              <div className="flex items-center gap-[12px]">
                {link.icon}
                <span
                  className={`${gilroyMedium.className} text-[14px] font-medium text-white/85 transition-colors group-hover:text-white`}
                >
                  {link.label}
                </span>
              </div>
              <span className="flex size-[24px] items-center justify-center rounded-full bg-white/[0.04] text-[11px] text-[#53d824] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-[#53d824]/15">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

