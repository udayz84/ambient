"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { CornerDecor } from "../contact/contact-shared";
import { gilroyMedium } from "../hero/fonts";
import { CareersGreenCta, CareersWhiteCta } from "./careers-shared";

const FALLBACK_HEADING = "Ready to build the future of compute?";
const FALLBACK_BUTTONS = [
  { label: "APPLY NOW", href: "#open-roles", variant: "primary" },
  { label: "REFER A CANDIDATE", href: "#open-roles", variant: "secondary" },
];

function resolveJobsHref(href?: string): string {
  if (!href || href === "#" || href === "/careers" || href === "/careers/") {
    return "#open-roles";
  }
  return href;
}

export function CareersBottomCta({
  data,
  offsetY = 0,
}: {
  data?: any;
  offsetY?: number;
}) {
  const heading = data?.heading || FALLBACK_HEADING;
  const buttons: Array<{ label: string; href: string; variant: string }> =
    Array.isArray(data?.buttons) && data.buttons.length > 0
      ? data.buttons.map((b: any) => ({
          label: b?.label || "",
          href: resolveJobsHref(b?.href),
          variant: b?.variant || "primary",
        }))
      : FALLBACK_BUTTONS;

  const handleScrollToJobs = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("open-roles") || document.getElementById("jobs");
    if (el) {
      const ls = (window as unknown as { locomotiveScroll?: any }).locomotiveScroll;
      if (ls && typeof ls.scrollTo === "function") {
        ls.scrollTo(el, { offset: -90 });
      } else {
        const top = el.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top, behavior: "smooth" });
      }
      window.history.pushState(null, "", "#open-roles");
    }
  };

  const formattedHeading = (() => {
    if (!heading) return null;
    if (heading.includes("\n")) {
      return heading.split("\n").map((line: string, i: number) => (
        <span key={i} className="block">
          {line}
        </span>
      ));
    }
    if (heading.includes("future of compute?")) {
      const parts = heading.split("future of compute?");
      return (
        <>
          <span className="block">{parts[0]}future of</span>
          <span className="block">compute?</span>
        </>
      );
    }
    return heading;
  })();

  return (
    <section
      className="absolute top-[5097px] left-1/2 z-20 flex w-[580px] flex-col items-center transition-transform duration-300 ease-out"
      style={{ transform: `translate(-50%, ${-offsetY}px)` }}
      data-node-id="2379:8821"
      aria-label="Ready to build the future of compute"
    >
      <div
        className="relative flex h-[320px] w-[580px] flex-col items-center justify-center gap-[22px] px-[36px] pt-[26px] pb-[34px]"
        data-name="Card Container"
      >
        <div className="absolute inset-0 -z-10 h-full w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            loading="lazy"
            decoding="async"
            src="/home1618873545.png"
            alt=""
            className="absolute inset-0 h-full w-full object-fill"
          />
        </div>

        <div className="relative flex w-max max-w-full flex-col items-center px-[20px] py-[10px]">
          <h2
            className={`${gilroyMedium.className} max-w-[480px] text-center text-[34px] leading-[42px] font-medium tracking-[-0.68px] text-transparent not-italic [word-break:break-word] sm:text-[38px] sm:leading-[46px] sm:tracking-[-0.76px]`}
            style={{
              backgroundImage:
                "linear-gradient(110.887deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2379:8822"
          >
            {formattedHeading}
          </h2>
          <CornerDecor />
        </div>

        <div className="mt-[6px] flex items-center gap-[18px]">
          {buttons.map((btn, i) => {
            const isJobsAnchor = btn.href === "#open-roles" || btn.href === "#jobs";
            return btn.variant === "secondary" || btn.variant === "ghost" ? (
              <CareersWhiteCta
                key={i}
                href={btn.href}
                onClick={isJobsAnchor ? handleScrollToJobs : undefined}
                width="w-auto px-5"
              >
                {btn.label}
              </CareersWhiteCta>
            ) : (
              <CareersGreenCta
                key={i}
                href={btn.href}
                onClick={isJobsAnchor ? handleScrollToJobs : undefined}
                width="w-auto px-5"
              >
                {btn.label}
              </CareersGreenCta>
            );
          })}
        </div>
      </div>
    </section>
  );
}
