/* eslint-disable @next/next/no-img-element */
import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, interRegular } from "../hero/fonts";
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
const FALLBACK_CHIP = "/som/sparsh-chip.png";
const CONNECTOR_LINE = "/som/ready-connector.svg";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

/** Green CTA — Figma 2438:5362 (262×48). */
function RequestCta({ label }: { label: string }) {
  return (
    <a
      href="#"
      className={`relative flex h-[48px] w-[262px] shrink-0 items-center justify-center overflow-clip ${GREEN_CTA_SHADOW}`}
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
        <img
          src={src}
          alt="Sparsh AI Module"
          className="absolute left-0 top-[10.17%] h-[79.67%] w-full max-w-none"
        />
      </div>
    </div>
  );
}

export function SomReadyToDeploy({ data }: { data?: any }) {
  const subtitle = data?.subtitle || SUBTITLE;
  const heading = data?.heading || "Ready to deploy?";
  const ctaLabel = data?.primary_cta_label || CTA_LABEL;
  const description = data?.secondary_text || DESCRIPTION;
  const chipSrc = mediaUrl(data?.image) || FALLBACK_CHIP;
  const primaryTitleLines = (
    data?.primary_title || DEFAULT_PRIMARY_TITLE
  ).split("\n");
  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      aria-label="Ready to deploy?"
    >
      {/* DESKTOP (>=1024px) — 1204 container, Figma absolute geometry.
          Bottom padding 145.2px: SomFooterMerge's -mb-[400px] pulls the opaque
          site footer 189px up over this section; this keeps all content clear. */}
      <div className="relative hidden w-[1204px] flex-col items-center pt-[80px] pb-[145.2px] min-[1024px]:flex">
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
        <div className="relative mt-[28.89px] h-[446.196px] w-full">
          <ChipImage
            className="absolute left-[401.108px] top-0 h-[446.196px] w-[430.321px]"
            src={chipSrc}
          />

          {/* Heading — 2438:5334 (left 75.44, top 140.41 rel. to body) */}
          <h3
            className={`${gilroyMedium.className} absolute left-[75.44px] top-[140.41px] w-[222px] text-[32px] leading-[38px] font-medium text-white not-italic [word-break:break-word]`}
            data-node-id="2438:5334"
          >
            {primaryTitleLines.map((line: string, i: number) => (
              <p key={i} className="leading-[38px]">
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
            <RequestCta label={ctaLabel} />
          </div>

          {/* Connector line — 2438:5333 (left 402.44, top 234.72) */}
          <div
            className="absolute left-[402.439px] top-[234.72px] h-[23.245px] w-[320.82px]"
            data-node-id="2438:5333"
            aria-hidden
          >
            <div className="absolute inset-[-2.15%_0_-11.88%_-0.86%]">
              <img
                alt=""
                src={CONNECTOR_LINE}
                className="block size-full max-w-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE (<1024px) */}
      <div className="relative flex w-full flex-col items-center gap-[40px] px-[24px] pt-[72px] pb-[80px] min-[1024px]:hidden">
        <div className="flex w-full flex-col items-center gap-[20px]">
          <div className="relative px-[10px]">
            <div
              className={`${gilroyMedium.className} bg-clip-text text-center text-[34px] leading-[37px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: `linear-gradient(${TITLE_GRADIENT_DEG}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {heading}
            </div>
            <Corners />
          </div>
          <p
            className={`${interRegular.className} max-w-[332px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0]/80 not-italic`}
          >
            {subtitle}
          </p>
        </div>

        <ChipImage className="h-[300px] w-full max-w-[290px]" src={chipSrc} />

        <div className="flex w-full flex-col items-center gap-[20px]">
          <h3
            className={`${gilroyMedium.className} text-center text-[26px] leading-[32px] font-medium text-white not-italic [word-break:break-word]`}
          >
            {primaryTitleLines.map((line: string, i: number) => (
              <p key={i} className="leading-[32px]">
                {line}
              </p>
            ))}
          </h3>
          <p
            className={`${interRegular.className} max-w-[290px] text-center text-[14px] leading-[24px] font-normal tracking-[-0.3125px] text-[rgba(255,255,255,0.6)] not-italic [word-break:break-word]`}
          >
            {description}
          </p>
          <RequestCta label={ctaLabel} />
        </div>
      </div>
    </section>
  );
}
