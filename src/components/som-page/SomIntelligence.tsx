"use client";

import { mediaUrl } from "@/lib/strapi";
import { useFadeIn, getFadeInClass } from "../shared/useFadeIn";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { GradientTitle } from "../contact/contact-shared";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

const TITLE_GRADIENT_DEG = "128.192deg";
const FALLBACK_SUBTITLE =
  "A seamless toolchain is useless if hardware can’t integrate. Move from software validation to deployment instantly with our modular edge ecosystem.";
const FALLBACK_HEADING = "Out-of-the-Box Intelligence";
const FALLBACK_CTA_LABEL = "Download Motion SOM Brief";

const CARD_BG =
  "linear-gradient(rgba(83, 216, 36, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%), linear-gradient(90deg, rgba(21, 21, 21, 0.3) 0%, rgba(21, 21, 21, 0.3) 100%)";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

/* ----------------------------- Mobile (Figma 4059:9285) ----------------------------- */
const MOBILE_TITLE_GRADIENT_DEG = "106.228deg";
const MOBILE_CARD_BG =
  "linear-gradient(180deg, rgba(83, 216, 36, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%), linear-gradient(90deg, rgba(21, 21, 21, 0.3) 0%, rgba(21, 21, 21, 0.3) 100%)";
const MOBILE_TITLE_STYLE = {
  backgroundImage: `linear-gradient(${MOBILE_TITLE_GRADIENT_DEG}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
} as const;

function MobileIntelOverlay({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="pointer-events-none absolute right-0 top-0 h-[196px] w-[217.952px] overflow-hidden mix-blend-plus-lighter">
        <img loading="lazy" decoding="async" src="/som/motion-fall.webp" alt="" aria-hidden className="size-full object-cover" />
      </div>
    );
  }
  if (index === 1) {
    return (
      <>
        <div className="pointer-events-none absolute left-[110.57px] top-0 h-[212.867px] w-[225.429px] overflow-hidden mix-blend-plus-lighter">
          <img loading="lazy" decoding="async"
            src="/som/som-chip.webp"
            alt=""
            aria-hidden
            className="absolute left-[-16.41%] top-[-131.38%] h-[254.27%] w-[240.1%] max-w-none"
          />
        </div>
        <div className="pointer-events-none absolute left-[202.22px] top-[38.43px] h-[40.647px] w-[37.611px] rounded-tl-[682.025px] rounded-tr-[682.025px] bg-[#f0f0f0] mix-blend-plus-lighter" />
      </>
    );
  }
  if (index === 2) {
    return (
      <div className="pointer-events-none absolute left-[39.86px] top-[-35.19px] h-[264.613px] w-[280.142px] overflow-hidden mix-blend-screen">
        <img loading="lazy" decoding="async" src="/som/acoustic-anomalies.webp" alt="" aria-hidden className="size-full object-cover" />
      </div>
    );
  }
  return (
    <div className="pointer-events-none absolute left-[71.74px] top-[-15.86px] h-[238.274px] w-[252.257px] overflow-hidden mix-blend-screen">
      <img loading="lazy" decoding="async" src="/som/intelligence-card-4.webp" alt="" aria-hidden className="size-full object-cover" />
    </div>
  );
}

function MobileIntelligenceCard({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  const textSide = index < 2 ? { left: "22px", right: "42px" } : { left: "32px", right: "32px" };
  return (
    <div
      className="relative h-[336.418px] w-[320px] shrink-0 overflow-clip"
      style={{ backgroundImage: MOBILE_CARD_BG }}
      data-name="Content"
    >
      <Corners />
      <MobileIntelOverlay index={index} />
      <div
        className="absolute flex flex-col gap-[12px]"
        style={{ left: textSide.left, right: textSide.right, top: "201.42px" }}
      >
        <h3
          className={`${gilroyMedium.className} w-full text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
        >
          {title}
        </h3>
        <p
          className={`${interRegular.className} w-full text-[14px] leading-[21px] font-normal text-white opacity-65 not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

const CARDS = [
  {
    title: "Motion & Fall Detection",
    description:
      "Leverage the 6-axis IMU for microwatt-level continuous activity recognition and instant fall detection.",
    imageUrl: "/som/motion-fall.webp",
  },
  {
    title: "Voice Identity & Commands",
    description:
      "Run continuous wake-word and secure voice authentication locally via the Knowles digital mic.",
    imageUrl: "/som/voice-identity.webp",
  },
  {
    title: "Acoustic Anomalies",
    description:
      "Deploy models for health monitoring (like asthma/cough detection) or security (assault detection) entirely on-device, preserving user privacy.",
    imageUrl: "/som/acoustic-anomalies.webp",
  },
  {
    title: "Safety & Geofencing",
    description:
      "Utilize the onboard BLE and processing technology to trigger instant localized alerts when boundaries are breached.",
    imageUrl: "/som/safety-geofencing.webp",
  },
] as const;

function IntelligenceCard({
  title,
  description,
  imageUrl,
}: {
  title: string;
  description: string;
  imageUrl?: string | null;
}) {
  const { fadeRef, isVisible } = useFadeIn();

  return (
    <div
      ref={fadeRef}
      className={`relative flex w-full flex-col overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] p-[32px] min-[1024px]:h-[336.418px] min-[1024px]:w-[320px] min-[1024px]:shrink-0 min-[1024px]:justify-end ${getFadeInClass(isVisible)}`}
      style={{ backgroundImage: CARD_BG }}
      data-name="Content"
    >
      {imageUrl && (
        <div className="absolute right-[16px] top-[16px] h-[160px] w-[160px] mix-blend-screen pointer-events-none z-0">
          <img loading="lazy" decoding="async"
            src={imageUrl}
            alt={title}
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      )}
      <div className="relative z-10 flex w-full flex-col gap-[12px]">
        <h3
          className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
        >
          {title}
        </h3>
        <p
          className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-white opacity-65 not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
        >
          {description}
        </p>
      </div>
      <Corners />
    </div>
  );
}

function DownloadCta({ label, href = "#" }: { label: string; href?: string }) {
  return (
    <a
      href={href}
      className={`relative flex h-[48px] w-[281px] max-w-full shrink-0 items-center justify-center ${GREEN_CTA_SHADOW}`}
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

export function SomIntelligence({ data }: { data?: any }) {
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const heading = data?.heading || FALLBACK_HEADING;
  const ctaLabel = data?.cta_label || FALLBACK_CTA_LABEL;
  const ctaHref = data?.cta_href || "#";
  const dataCards: any[] = Array.isArray(data?.cards) ? data.cards : [];
  const cards = CARDS.map((fb, i) => {
    const c = dataCards[i];
    if (!c) return fb;
    return {
      title: c.title || fb.title,
      description: c.description || fb.description,
      imageUrl: mediaUrl(c.image) || fb.imageUrl,
    };
  });
  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="2438:5118"
      aria-label="Out-of-the-Box Intelligence"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden flex-col items-center gap-[40px] pt-[80px] pb-[80px] min-[1024px]:flex">
        <div
          className="flex flex-col items-center gap-[24px]"
          data-node-id="2438:5119"
        >
          <div className="relative px-[10px]" data-name="Title">
            <GradientTitle
              gradientDeg={TITLE_GRADIENT_DEG}
              className="text-center whitespace-nowrap"
            >
              {heading}
            </GradientTitle>
            <GreenCtaCorners />
          </div>
          <p
            className={`${interRegular.className} w-[800px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
          >
            {subtitle}
          </p>
        </div>
        <div
          className="flex items-center gap-[24px]"
          data-name="Do the best work of your life"
        >
          {cards.map((card) => (
            <IntelligenceCard
              key={card.title}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
            />
          ))}
        </div>
        <DownloadCta label={ctaLabel} href={ctaHref} />
      </div>

      {/* MOBILE (<1024px) — Figma node 4059:9285 "5th Fold" 393×1770 */}
      <div
        className="relative mx-auto h-[1770px] w-[393px] overflow-hidden bg-black min-[1024px]:hidden"
        data-node-id="4059:9285"
        data-name="5th Fold"
      >
        {/* Title block — 4059:9297 (x19, y30, 350×170.4) */}
        <div
          className="absolute left-[19px] top-[30px] flex w-[350px] flex-col items-center gap-[10px]"
          data-node-id="4059:9297"
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
            className={`${interRegular.className} w-[336px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0]/75 not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
          >
            {subtitle}
          </p>
        </div>

        {/* Cards container — 4059:9305 (y227, w320, gap 24) */}
        <div
          className="absolute left-1/2 top-[227px] flex w-[320px] -translate-x-1/2 flex-col gap-[24px]"
          data-node-id="4059:9305"
          data-name="Do the best work of your life"
        >
          {cards.map((card, i) => (
            <MobileIntelligenceCard
              key={card.title}
              index={i}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>

        {/* CTA — 4059:9286 (y1680, w280) */}
        <div className="absolute left-1/2 top-[1680px] -translate-x-1/2">
          <DownloadCta label={ctaLabel} href={ctaHref} />
        </div>
      </div>
    </section>
  );
}
