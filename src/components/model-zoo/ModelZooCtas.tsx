import { gilroyMedium } from "../hero/fonts";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { Corners } from "../shared/Corners";
import { CORNER_LEFT, CORNER_RIGHT, PRIMARY_CTA_INSET } from "./model-zoo-data";

/**
 * Figma 5387:7844 — green primary CTA (250×48 in the hero, width varies by label).
 * Shared across the Model Zoo page sections. The glow alphas are boosted ~2.2x
 * over the raw Figma shadow values to match how the reference canvas renders
 * the ambient glow around every green CTA.
 */
export function CtaPrimary({
  label,
  href = "#",
  width,
  onClick,
  reducedShine = false,
}: {
  label: string;
  href?: string;
  width?: number;
  onClick?: () => void;
  reducedShine?: boolean;
}) {
  const shadowClass = reducedShine
    ? "shadow-[0px_42px_107px_0px_rgba(83,216,36,0.15),0px_24.721px_32.257px_0px_rgba(83,216,36,0.10),0px_10.268px_13.398px_0px_rgba(83,216,36,0.10),0px_3.714px_4.846px_0px_rgba(83,216,36,0.05)]"
    : "shadow-[0px_42px_107px_0px_rgba(83,216,36,0.45),0px_24.721px_32.257px_0px_rgba(83,216,36,0.35),0px_10.268px_13.398px_0px_rgba(83,216,36,0.35),0px_3.714px_4.846px_0px_rgba(83,216,36,0.2)]";

  return (
    <a
      href={href}
      onClick={
        onClick
          ? (e) => {
              e.preventDefault();
              onClick();
            }
          : undefined
      }
      className={`${shadowClass} ${gilroyMedium.className} relative flex h-[48px] shrink-0 items-center justify-center px-[20px]`}
      style={width ? { width } : undefined}
      data-name="Cta"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span className="relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
        {label}
      </span>
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`}
      />
      <GreenCtaCorners />
    </a>
  );
}

/**
 * Figma 5387:7855 — translucent secondary CTA (rgba(226,241,202,0.12), white corner ticks).
 */
export function CtaSecondary({
  label,
  href = "#",
  width,
  onClick,
}: {
  label: string;
  href?: string;
  width?: number;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`${gilroyMedium.className} relative flex h-[48px] shrink-0 items-center justify-center overflow-clip bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px] transition-colors hover:bg-[rgba(226,241,202,0.2)]`}
      style={width ? { width } : undefined}
      data-name="CTA - Secondary"
    >
      <p className="relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic [word-break:break-word]">
        {label}
      </p>
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </a>
  );
}
