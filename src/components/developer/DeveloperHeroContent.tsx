import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
  HERO_TITLE_GRADIENT,
  PRIMARY_CTA_SHADOW,
} from "./developer-data";

const DEFAULT_HEADING = "Model to deployment\nin 15 Minutes ";
const DEFAULT_SUBTITLE =
  "ModelForge bridges training and deployment. Quantize, compile, and merge neural networks with your firmware.";
const DEFAULT_PRIMARY_LABEL = "Download ModelForge SDK";
const DEFAULT_SECONDARY_LABEL = "Read the Documentation";

/**
 * Figma 2438:4563 — Developer hero text content.
 * Vertical stack (gap 24px): Section Title · Description · CTA row.
 */
export function DeveloperHeroContent({ data }: { data?: any }) {
  const heading = data?.heading || DEFAULT_HEADING;
  const headingLines = heading.split("\n");
  const subtitle = data?.subtitle || DEFAULT_SUBTITLE;
  const primaryLabel =
    data?.primary_button?.label || DEFAULT_PRIMARY_LABEL;
  const primaryHref = data?.primary_button?.href || "#";
  const secondaryLabel =
    data?.secondary_button?.label || DEFAULT_SECONDARY_LABEL;
  const secondaryHref = data?.secondary_button?.href || "#";
  return (
    <div
      className="relative flex shrink-0 flex-col items-start gap-[24px]"
      data-node-id="2438:4563"
    >
      {/* Section Title — 2438:4564 */}
      <div
        className="relative flex shrink-0 flex-col items-center justify-center gap-[0px]"
        data-node-id="2438:4564"
      >
        {/* Title — 2438:4565 */}
        <div
          className="relative flex shrink-0 flex-col items-center px-[10px]"
          data-node-id="2438:4565"
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} not-italic [word-break:break-word] relative bg-clip-text text-[46px] font-medium leading-[49px] text-transparent`}
            style={{ backgroundImage: HERO_TITLE_GRADIENT }}
          >
            {headingLines.map((line: string, i: number) => (
              <span key={i} className="block leading-[49px]">
                {line}
              </span>
            ))}
          </h2>
        </div>
      </div>

      {/* Description — 2438:4571 */}
      <p
        className={`${interRegular.className} not-italic [word-break:break-word] relative w-[529px] shrink-0 text-[18px] font-normal leading-[27px] text-[#f0f0f0]`}
        data-node-id="2438:4571"
      >
        {subtitle}
      </p>

      {/* CTAs — 2438:4572 */}
      <div
        className="relative flex shrink-0 items-start justify-center gap-[24px]"
        data-node-id="2438:4572"
      >
        <PrimaryCta href={primaryHref}>{primaryLabel}</PrimaryCta>
        <SecondaryCta href={secondaryHref}>{secondaryLabel}</SecondaryCta>
      </div>
    </div>
  );
}

/** CTA - Primary — 2438:4573 (276×48) */
function PrimaryCta({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-[276px] shrink-0 items-center justify-center overflow-hidden px-[20px] py-[10px]`}
      data-node-id="2438:4573"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span className="relative not-italic text-[16px] font-medium uppercase whitespace-nowrap leading-[28px] text-white">
        {children}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
      />
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </a>
  );
}

/** CTA - Secondary — 2438:4580 (249×48) */
function SecondaryCta({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className={`${gilroyMedium.className} relative flex h-[48px] w-[249px] shrink-0 items-center justify-center overflow-clip bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]`}
      data-node-id="2438:4580"
    >
      <span className="relative not-italic text-[16px] font-medium uppercase whitespace-nowrap leading-[28px] text-white">
        {children}
      </span>
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </a>
  );
}
