/* eslint-disable @next/next/no-img-element */
import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, gilroySemiBold, interRegular, dmMono } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { GradientTitle } from "../contact/contact-shared";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

const TITLE_GRADIENT_DEG = "116.213deg";
const SUBTITLE =
  "Start building with the Sparsh module today, or secure your place in line for our upcoming vertical-specific SOMs.";
const DEFAULT_PRIMARY_TITLE = "Get the Sparsh\nAI Module";
const DESCRIPTION =
  "Start testing motion and audio models on the metal immediately.";
const CTA_LABEL = "Request Sparsh Module";
const FALLBACK_CHIP = "/som/sparsh-chip.webp";
const CONNECTOR_LINE = "/som/ready-connector.svg";

/* ----------------------------- Mobile (Figma 4046:8112) ----------------------------- */
const MOBILE_TITLE_GRADIENT_DEG = "134.992deg";
const MOBILE_CONNECTOR = "/som/ready-mobile-connector.svg";
const MOBILE_TITLE_STYLE = {
  backgroundImage: `linear-gradient(${MOBILE_TITLE_GRADIENT_DEG}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
} as const;

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

/** Green CTA — Figma 2438:5362 (262×48). */
function RequestCta({ label, href }: { label: string; href?: string }) {
  return (
    <a
      href={href || "#"}
      className={`relative flex h-[48px] w-[262px] shrink-0 items-center justify-center ${GREEN_CTA_SHADOW}`}
      data-node-id="2438:5362"
      data-name="Cta"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span
        className={`relative ${gilroyMedium.className} text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic`}
      >
        {label}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
      />
      <GreenCtaCorners />
    </a>
  );
}

function SecondaryCta({ label, href, className }: { label: string; href?: string; className?: string }) {
  return (
    <a
      href={href || "#"}
      className={`relative flex h-[48px] shrink-0 items-center justify-center border border-[#99a1af] bg-transparent hover:bg-white/10 transition-colors ${className || "w-[262px]"}`}
    >
      <span
        className={`relative ${gilroyMedium.className} text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic`}
      >
        {label}
      </span>
    </a>
  );
}

/** Chip image — Figma 2438:5330 (430.321×446.196, image vertically centered in inner rect). */
function ChipImage({ className, src }: { className?: string; src: string }) {
  return (
    <div
      className={`relative ${className}`}
      data-node-id="2438:5330"
      data-name="Chip Image"
    >
      <div
        className="absolute left-[13.448px] top-[13.159px] h-[433.25px] w-[417.835px] max-[1023px]:left-0 max-[1023px]:top-0 max-[1023px]:h-full max-[1023px]:w-full overflow-hidden"
        data-node-id="2438:5331"
        data-name="Background"
      >
        <img loading="lazy" decoding="async"
          src={src}
          alt="Sparsh AI Module"
          className="absolute inset-0 size-full object-contain opacity-90 brightness-75 blur-[2px]"
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center border border-[#E2A740] bg-black/90 px-[16px] py-[12px] shadow-lg">
          <span className={`${dmMono?.className || "font-mono"} flex items-center gap-[16px] whitespace-nowrap text-[14px] uppercase tracking-[0.1em] text-[#E2A740]`}>
            <span>|</span>
            <span>LAUNCHING SOON</span>
            <span>|</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function SomReadyToDeploy({ data }: { data?: any }) {
  const subtitle = data?.subtitle || SUBTITLE;
  const heading = data?.heading || "Ready to deploy?";
  const ctaLabel = data?.primary_cta_label || CTA_LABEL;
  const description = data?.secondary_text || DESCRIPTION;
  const chipSrc = mediaUrl(data?.image);
  const secondaryCtaLabel = data?.secondary_cta_label;
  const secondaryCtaLink = data?.secondary_cta_link;
  const primaryTitleLines = (
    data?.primary_title || DEFAULT_PRIMARY_TITLE
  ).split("\n");
  return (
    <section
      className="relative z-30 flex w-full justify-center overflow-hidden bg-[linear-gradient(to_bottom,black_0%,black_85%,transparent_100%)]"
      aria-label="Ready to deploy?"
    >
      {/* DESKTOP (>=1024px) — 1204 container, Figma absolute geometry.
          Bottom padding 145.2px: SomFooterMerge's -mb-[400px] pulls the opaque
          site footer 189px up over this section; this keeps all content clear. */}
      <div className="relative hidden w-[1204px] flex-col items-center pt-[80px] pb-[60px] min-[1024px]:flex">
        {/* Title block — 2438:5194 (800 wide, gap 24) */}
        <div
          className="flex w-[800px] flex-col items-center gap-[24px]"
          data-node-id="2438:5194"
        >
          <div className="relative px-[10px]" data-node-id="2438:5196">
            <GradientTitle
              gradientDeg={TITLE_GRADIENT_DEG}
              className="text-center whitespace-nowrap"
              nodeId="2438:5197"
            >
              {heading}
            </GradientTitle>
            <GreenCtaCorners />
          </div>
          <p
            className={`${interRegular.className} w-[800px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
            data-node-id="2438:5202"
          >
            {subtitle}
          </p>
        </div>

        {/* Body — chip top sits 28.89px below the title block; 446.196 tall */}
        <div className="relative mt-[10px] h-[446.196px] w-full">
          {(chipSrc || FALLBACK_CHIP) && (
            <ChipImage
              className="absolute left-[401.108px] top-0 h-[446.196px] w-[430.321px]"
              src={chipSrc || FALLBACK_CHIP}
            />
          )}

          {/* Heading — 2438:5334 (left 75.44, top 140.41 rel. to body) */}
          <h3
            className={`${gilroyMedium.className} absolute left-[75.44px] top-[140.41px] w-[222px] text-[32px] leading-[38px] font-medium text-white not-italic [word-break:break-word]`}
            data-node-id="2438:5334"
          >
            {primaryTitleLines.map((line: string, i: number) => (
              <p key={i} className="leading-[38px] [word-break:break-word]">
                {line}
              </p>
            ))}
          </h3>

          {/* Description + CTA column — 2438:5360 (left 76, top 249.11, gap 20) */}
          <div
            className="absolute left-[76px] top-[249.11px] flex w-[290.93px] flex-col items-start gap-[20px]"
            data-node-id="2438:5360"
          >
            <p
              className={`${interRegular.className} h-[48px] w-full text-[14px] leading-[24px] font-normal tracking-[-0.3125px] text-[rgba(255,255,255,0.6)] not-italic [word-break:break-word]`}
              data-node-id="2438:5361"
            >
              {description}
            </p>
            <div className="flex flex-col gap-[12px]">
              <RequestCta label={ctaLabel} />
              {secondaryCtaLabel && (
                <SecondaryCta label={secondaryCtaLabel} href={secondaryCtaLink} />
              )}
            </div>
          </div>

          {/* Connector Line */}
          <div
            className="pointer-events-none absolute left-[80px] top-[215px] h-[23.24px] w-[320.82px]"
            data-node-id="2438:5333"
            aria-hidden
          >
            <div className="absolute inset-[-2.15%_0_-11.88%_-0.86%]">
              <img loading="lazy" decoding="async"
                src={CONNECTOR_LINE}
                alt=""
                className="block size-full max-w-none rotate-180"
                aria-hidden
              />
            </div>
          </div>

        </div>
      </div>

      {/* MOBILE (<1024px) — Figma node 4046:8112 "6th Fold" 393×750 */}
      <div
        className="relative mx-auto h-[750px] w-[393px] overflow-hidden min-[1024px]:hidden"
        data-node-id="4046:8112"
        data-name="6th Fold"
      >
        {/* Title block — 4046:8115 (x19, y30, 350×119) */}
        <div
          className="absolute left-[19px] top-[30px] flex w-[350px] flex-col items-center gap-[10px]"
          data-node-id="4046:8115"
        >
          <div className="relative flex w-[356px] justify-center py-[4px]" data-name="Title">
            <Corners />
            <h2
              className={`${gilroyMedium.className} w-[324px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={MOBILE_TITLE_STYLE}
            >
              {heading}
            </h2>
          </div>
          <p
            className={`${interRegular.className} w-[336px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0]/75 not-italic [word-break:break-word]`}
          >
            {subtitle}
          </p>
        </div>

        {/* Content — 4059:9185 (y189, w355, gap 24) */}
        <div
          className="absolute left-1/2 top-[189px] flex w-[355px] -translate-x-1/2 flex-col items-center gap-[24px]"
          data-node-id="4059:9185"
          data-name="Do the best work of your life"
        >
          {/* Chip Image — 4059:9358 (355×300) */}
          <div className="relative h-[300px] w-[355px] shrink-0" data-name="Chip Image">
            <div
              className="absolute left-1/2 top-[calc(50%+4.71px)] h-[357.417px] w-[344.7px] -translate-x-1/2 -translate-y-1/2 overflow-hidden"
              data-name="Background"
            >
              {(chipSrc || FALLBACK_CHIP) && (
                <>
                  <img loading="lazy" decoding="async"
                    src={chipSrc || FALLBACK_CHIP}
                    alt="Sparsh AI Module"
                    className="absolute left-0 top-[10.17%] h-[79.67%] w-full max-w-none object-contain opacity-90 brightness-75 blur-[2px]"
                  />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center border border-[#E2A740] bg-black/90 px-[12px] py-[10px] shadow-lg">
                    <span className={`${dmMono?.className || "font-mono"} flex items-center gap-[12px] whitespace-nowrap text-[12px] uppercase tracking-[0.1em] text-[#E2A740]`}>
                      <span>|</span>
                      <span>LAUNCHING SOON</span>
                      <span>|</span>
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Frame — 4059:9361 (gap 10) */}
          <div
            className="flex w-full flex-col items-center gap-[10px]"
            data-node-id="4059:9361"
          >
            <h3
              className={`${gilroyMedium.className} w-[200.641px] text-center text-[28px] leading-[33.725px] font-medium text-white not-italic [word-break:break-word]`}
            >
              {primaryTitleLines.map((line: string, i: number) => (
                <span key={i} className="block [word-break:break-word]">
                  {line}
                </span>
              ))}
            </h3>
            <p
              className={`${interRegular.className} w-[296.416px] text-center text-[14px] leading-[23.075px] font-normal tracking-[-0.2773px] text-[#99a1af] not-italic [word-break:break-word]`}
            >
              {description}
            </p>

            {/* CTA — 4059:9373 (231×48) */}
            <div className="flex flex-col gap-[12px] items-center">
              <a
                href="#"
                className={`relative flex h-[48px] w-[231px] shrink-0 items-center justify-center ${GREEN_CTA_SHADOW}`}
                data-name="Cta"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
                />
                <span
                  className={`relative ${gilroySemiBold.className} text-[14px] font-medium uppercase whitespace-nowrap text-white not-italic`}
                >
                  {ctaLabel}
                </span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
                />
                <GreenCtaCorners />
              </a>
              {secondaryCtaLabel && (
                <SecondaryCta 
                  label={secondaryCtaLabel} 
                  href={secondaryCtaLink} 
                  className="w-[231px]" 
                />
              )}
            </div>
          </div>

          {/* Connector line — 4059:9387 (vertical, centered, y268) */}
          <img loading="lazy" decoding="async"
            src={MOBILE_CONNECTOR}
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-[177.5px] top-[268px] h-[70px] w-[5.7735px] max-w-none -translate-x-1/2"
          />
        </div>
      </div>
    </section>
  );
}
