import { gilroySemiBold } from "../hero/fonts";
import { RepelDots } from "../shared/RepelDots";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

type CompanyEngagementCtaProps = {
  children: string;
  href: string;
  className?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export function CompanyEngagementCta({
  children,
  href,
  className = "w-[231px]",
  download,
  target,
  rel,
  onClick,
}: CompanyEngagementCtaProps) {
  return (
    <a
      href={href}
      download={download}
      target={target}
      rel={rel}
      onClick={onClick}
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
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)] rounded-[inherit]"
      />
      
      <GreenCtaCorners />
    </a>
  );
}
