import { gilroyMedium } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

type GreenCtaProps = {
  label: string;
  href?: string;
  nodeId?: string;
  widthClass?: string;
  textSizeClass?: string;
  disableDots?: boolean;
};

export function GreenCta({
  label,
  href = "#",
  nodeId,
  widthClass = "w-[231px]",
  textSizeClass = "text-[16px]",
  disableDots,
}: GreenCtaProps) {
  return (
    <a
      href={href}
      className={`${gilroyMedium.className} drop-shadow-[0px_42px_53.5px_rgba(69,196,24,0.2)] relative flex h-[48px] ${widthClass} shrink-0 items-center justify-center`}
      data-node-id={nodeId}
      data-name="Cta"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span className={`relative z-10 ${textSizeClass} leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic [word-break:break-word]`}>
        {label}
      </span>
      <GreenCtaCorners disableDots={disableDots} />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
      />
    </a>
  );
}
