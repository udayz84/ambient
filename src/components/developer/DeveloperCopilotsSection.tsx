"use client";

import { gilroyMedium, interRegular } from "../hero/fonts";
import { useFadeIn, getFadeInClass } from "../shared/useFadeIn";
import { Corners } from "../shared/Corners";
import {
  COPILOT_CARD_BG,
  COPILOT_ICON_BG,
  COPILOT_TITLE_GRADIENT,
  CORNER_LEFT,
  CORNER_RIGHT,
  CTA_HOVER_GLOW,
  DEVELOPER_COPILOTS,
} from "./developer-data";
import { mediaUrl } from "@/lib/strapi";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

const DEFAULT_HEADING = "Your deployment co-pilots.";
const DEFAULT_SUBTITLE =
  "A seamless toolchain is useless if hardware can&rsquo;t integrate. Move from software validation to deployment instantly with our modular edge ecosystem.";

/**
 * Figma 2438:4666 — "Your deployment co-pilots." section.
 * Positioned at 118.305,4197 / 1204×588 within the Developer canvas.
 */
export function DeveloperCopilotsSection({ data }: { data?: any }) {
  const heading = data?.heading || DEFAULT_HEADING;
  const subtitle = data?.subtitle || DEFAULT_SUBTITLE;
  const copilots =
    data?.copilots && Array.isArray(data.copilots) && data.copilots.length > 0
      ? data.copilots
      : DEVELOPER_COPILOTS;
  return (
    <div
      className="absolute flex flex-col items-center gap-[40px]"
      style={{ left: 118.3046875, top: "calc(4723px + var(--developer-pipeline-offset, 0px))", width: 1204, transition: "top 300ms ease-in-out" }}
      data-node-id="2438:4666"
    >
      {/* Header — 2438:4667 */}
      <div
        className="flex flex-col items-center gap-[24px]"
        data-node-id="2438:4667"
      >
        {/* Title frame — 2438:4668 (616×61) */}
        <div
          className="relative h-[61px] w-[616px]"
          data-node-id="2438:4668"
        >
          <div
            className="absolute"
            style={{ left: 0.83984375, top: 1.033203125, width: 614.3203125, height: 59 }}
            aria-hidden
          >
            <div className="absolute inset-[-0.85%_0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async"
                alt=""
                src="/developer/copilot-title-frame.svg"
                className="block size-full max-w-none"
              />
            </div>
          </div>
          <h2
            className={`${gilroyMedium.className} absolute left-1/2 top-[3.03px] max-w-full -translate-x-1/2 bg-clip-text text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] overflow-hidden`}
            style={{ backgroundImage: COPILOT_TITLE_GRADIENT }}
          >
            {heading}
          </h2>
        </div>

        {/* Description — 2438:4675 */}
        <p
          className={`${interRegular.className} w-[800px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic opacity-65 [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden`}
        >
          {subtitle}
        </p>
      </div>

      {/* Content row — 2438:4676 "Do the best work of your life" (1204×409) */}
      <div
        className="relative flex h-[409px] w-full items-center gap-[24px]"
        data-node-id="2438:4676"
      >
        {copilots.map((copilot: any, i: number) => (
          <CopilotCard
            key={copilot.title || i}
            copilot={copilot}
            fallback={DEVELOPER_COPILOTS[i] || DEVELOPER_COPILOTS[0]}
          />
        ))}
      </div>
    </div>
  );
}

function CopilotCard({
  copilot,
  fallback,
}: {
  copilot: any;
  fallback: (typeof DEVELOPER_COPILOTS)[number];
}) {
  const icon = mediaUrl(copilot?.icon) || fallback.icon;
  const title = copilot?.title || fallback.title;
  const description = copilot?.description || fallback.description;
  const ctaLabel = copilot?.cta_label || fallback.ctaLabel;
  const ctaHref = copilot?.cta_href || "#";
  const ctaFullWidth = fallback.ctaFullWidth;
  const { fadeRef, isVisible } = useFadeIn();

  return (
    <div
      ref={fadeRef}
      className={`group relative flex h-[409px] w-[385px] shrink-0 flex-col justify-between border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[#0A0A0A] p-[32px] ${getFadeInClass(isVisible)}`}
      style={{ backgroundImage: COPILOT_CARD_BG }}
      data-node-id="2438:4678"
    >
      {/* Icon tile — 2684:1164 (72×72, rounded 12) */}
      <div
        className="relative size-[72px] shrink-0 rounded-[12px]"
        style={{ backgroundImage: COPILOT_ICON_BG }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async"
          alt=""
          src={icon}
          aria-hidden
          className="absolute left-1/2 top-1/2 size-[48px] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain"
        />
      </div>

      {/* Content — 2438:4685 (flex col, gap 12) */}
      <div className="flex w-full flex-col gap-[12px]">
        <p
          className={`${gilroyMedium.className} w-full text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden`}
        >
          {title}
        </p>
        <p
          className={`${interRegular.className} w-full text-[14px] leading-[21px] font-normal text-white not-italic opacity-65 [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden`}
        >
          {description}
        </p>
        <CopilotCta fullWidth={ctaFullWidth} href={ctaHref}>
          {ctaLabel}
        </CopilotCta>
      </div>

      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </div>
  );
}

/** CTA - glass that transitions to green gradient when the CARD is hovered. */
function CopilotCta({
  children,
  fullWidth = false,
  href,
}: {
  children: React.ReactNode;
  fullWidth?: boolean;
  href: string;
}) {
  return (
    <a
      href={href}
      className={`${gilroyMedium.className} ${CTA_HOVER_GLOW} relative flex h-[48px] ${fullWidth ? "w-full" : "shrink-0"} items-center justify-center border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px] not-italic opacity-100 transition-[box-shadow,background-color] duration-200 group-hover:bg-transparent`}
      data-node-id="2438:4688"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)] transition-opacity duration-200 group-hover:opacity-100"
      />
      <span
        className={`relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white overflow-hidden text-ellipsis ${fullWidth ? "text-center" : ""}`}
      >
        {children}
      </span>
      <GreenCtaCorners />
    </a>
  );
}
