import { interSemiBold } from "../hero/fonts";

const cornerCtaLeft = "/hero/corner-tag-1.svg";
const cornerCtaRight = "/hero/corner-tag-2.svg";

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
      className={`${interSemiBold.className} relative block h-[48px] shrink-0 ${GREEN_CTA_SHADOW} ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span className="relative flex h-full items-center justify-center gap-[8px] px-[12px] text-[14px] leading-[normal] whitespace-nowrap text-white uppercase not-italic">
        {children}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/careers/cta-dot.svg"
          alt=""
          className="size-[6px] shrink-0"
          aria-hidden
        />
      </span>
      <CtaCorners />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
      />
    </a>
  );
}

function CtaCorners() {
  return (
    <>
      <div className="pointer-events-none absolute top-0 right-0 flex size-[4px] items-center justify-center">
        <div className="rotate-180 flex-none">
          <Corner src={cornerCtaRight} />
        </div>
      </div>
      <div className="pointer-events-none absolute top-0 left-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <Corner src={cornerCtaLeft} />
        </div>
      </div>
      <div className="pointer-events-none absolute right-0 bottom-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 rotate-180 flex-none">
          <Corner src={cornerCtaRight} />
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 size-[4px]">
        <Corner src={cornerCtaLeft} />
      </div>
    </>
  );
}

function Corner({ src }: { src: string }) {
  return (
    <div className="relative size-[4px]">
      <div className="absolute inset-[0_0_-12.5%_-12.5%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={src} aria-hidden />
      </div>
    </div>
  );
}
