"use client";

import Link from "next/link";
import { gilroySemiBold } from "@/components/hero/fonts";
import { Corners } from "@/components/shared/Corners";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
} from "@/components/products-page/products-data";

const QUICK_LINKS = [
  {
    label: "Browse the Model Zoo",
    href: "/model-zoo",
    icon: (
      <svg
        className="size-[20px] shrink-0 text-[#53d824]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1 4 4 4 4 0 0 1-2 3.5 4 4 0 0 1-2 5.5v1a4 4 0 0 1-4 4 4 4 0 0 1-4-4v-1a4 4 0 0 1-2-5.5 4 4 0 0 1-2-3.5 4 4 0 0 1 4-4V6a4 4 0 0 1 4-4Z" />
        <path d="M12 3v18" opacity="0.4" />
      </svg>
    ),
  },
  {
    label: "Developer Hub",
    href: "/developer",
    icon: (
      <svg
        className="size-[20px] shrink-0 text-[#53d824]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="12" y1="4" x2="12" y2="20" opacity="0.4" />
      </svg>
    ),
  },
  {
    label: "Explore Applications",
    href: "/applications",
    icon: (
      <svg
        className="size-[20px] shrink-0 text-[#53d824]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
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
        className="size-[20px] shrink-0 text-[#53d824]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <circle cx="12" cy="18" r="2.5" />
        <path d="M8.2 7.2h7.6M7.3 8.3l3.4 7.4m6-7.4-3.4 7.4" />
      </svg>
    ),
  },
  {
    label: "Talk to an FAE",
    href: "/contact",
    icon: (
      <svg
        className="size-[20px] shrink-0 text-[#53d824]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 11a9 9 0 0 1 18 0v4a3 3 0 0 1-3 3h-1.5" />
        <path d="M3 13a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3zm13 0a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3z" />
        <path d="M12 18v1.5a1.5 1.5 0 0 1-1.5 1.5H9" />
      </svg>
    ),
  },
] as const;

export function ElectronicaClose() {
  return (
    <section
      aria-label="Ambient ecosystem quick navigation"
      className="relative flex w-full justify-center overflow-hidden bg-black py-[48px] text-white md:py-[64px]"
    >
      {/* Background Soft Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(83, 216, 36, 0.08) 0%, rgba(0, 0, 0, 0) 75%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1240px] px-[20px]">
        <div className="grid grid-cols-2 gap-[14px] sm:grid-cols-3 lg:grid-cols-5 md:gap-[16px]">
          {QUICK_LINKS.map((link, idx) => (
            <Link
              key={link.label}
              href={link.href}
              className={`group relative flex h-[134px] flex-col justify-between overflow-hidden border-[0.5px] border-solid border-[rgba(240,240,240,0.18)] bg-[#0d0f0d] p-[18px] transition-all duration-300 hover:-translate-y-1 hover:border-[#53d824]/50 hover:bg-[#111611] hover:shadow-[0_12px_32px_rgba(0,0,0,0.8),0_0_24px_rgba(83,216,36,0.12)] md:p-[20px] ${
                idx === QUICK_LINKS.length - 1 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />

              {/* Top Row: Green Hardware-housing Icon on Left, Prominent Green Arrow on Right */}
              <div className="flex items-center justify-between">
                <div className="flex size-[38px] items-center justify-center rounded-[8px] border border-[#53d824]/30 bg-[#53d824]/10 text-[#53d824] transition-all duration-200 group-hover:border-[#53d824]/60 group-hover:bg-[#53d824]/20 group-hover:scale-105">
                  {link.icon}
                </div>
                <div className="flex size-[32px] items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-all duration-200 group-hover:border-[#53d824]/50 group-hover:bg-[#53d824]/15">
                  <svg
                    className="size-[16px] text-[#53d824] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </div>

              {/* Bottom: Title */}
              <div className="flex flex-col">
                <span
                  className={`${gilroySemiBold.className} text-[14px] font-semibold leading-[19px] text-white/90 transition-colors duration-200 group-hover:text-white md:text-[15px] md:leading-[20px]`}
                >
                  {link.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
