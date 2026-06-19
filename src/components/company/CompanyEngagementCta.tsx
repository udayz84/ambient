import { gilroySemiBold } from "../hero/fonts";
import { RepelDots } from "../shared/RepelDots";
import { CompanyStandardCorners } from "./company-corners";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

type CompanyEngagementCtaProps = {
  children: string;
  href: string;
  className?: string;
};

export function CompanyEngagementCta({
  children,
  href,
  className = "w-[231px]",
}: CompanyEngagementCtaProps) {
  return (
    <a
      href={href}
      className={`${gilroySemiBold.className} relative block h-[48px] shrink-0 ${GREEN_CTA_SHADOW} ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]">
        <RepelDots />
      </span>
      <span className="relative z-10 flex h-full items-center justify-center gap-[8px] px-[12px] text-[14px] leading-[normal] whitespace-nowrap text-white uppercase not-italic">
        {children}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/careers/cta-dot.svg"
          alt=""
          className="size-[6px] shrink-0"
          aria-hidden
        />
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)] rounded-[inherit]"
      />
      
      {/* Custom Corners that pop out slightly to avoid the inset shadow */}
      <div className="pointer-events-none absolute -top-[0.5px] right-0 z-20 flex size-[4px] items-center justify-center">
        <div className="rotate-180 flex-none">
          <div className="relative size-[4px]">
            <img src="/careers/corner-menu-tr.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute -top-[0.5px] left-0 z-20 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <img src="/careers/corner-menu-tl.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute right-0 bottom-0 z-20 flex size-[4px] items-center justify-center">
        <div className="-scale-x-100 flex-none">
          <div className="relative size-[4px]">
            <img src="/careers/corner-menu-tr.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 z-20 flex size-[4px] items-center justify-center">
        <div className="flex-none">
          <div className="relative size-[4px]">
            <img src="/careers/corner-menu-tl.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
          </div>
        </div>
      </div>
    </a>
  );
}
