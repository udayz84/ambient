"use client";

/* eslint-disable @next/next/no-img-element */
import { useFadeIn, getFadeInClass } from "../shared/useFadeIn";
import { mediaUrl } from "@/lib/strapi";
import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { GradientTitle } from "../contact/contact-shared";

const TITLE_GRADIENT_DEG = "101.672deg";
const FALLBACK_SUBTITLE =
  "Spinning a custom PCB with extreme space and power constraints takes months of trial and error. We solved the hardware physics so you can focus entirely on your application logic.";
const FALLBACK_HEADING = "Stop Routing.\nStart Shipping.";
const ICON_BACKGROUND = "/som/icon-bg.svg";
const MOBILE_SECTION_GLOW = "/som/features-mobile-glow.png";
const MOBILE_TITLE_GRADIENT_DEG = "112.264deg";

// Per-card mobile metrics sourced from Figma node 4054:8302
const MOBILE_CARD_META = [
  { iconSize: 42.71, tagWidth: 240 },
  { iconSize: 37.454, tagWidth: 240 },
  { iconSize: 37.454, tagWidth: 200 },
];



type FeatureCardProps = {
  iconSrc: string;
  iconSize: number;
  tag: string;
  title: string;
  body: string;
  glowPosition?: string;
};

function CardTag({ label }: { label: string }) {
  return (
    <div
      className="relative h-[26px] w-full shrink-0 overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(255,255,255,0.06)] backdrop-blur-[10px]"
      data-name="Menu"
    >
      <Corners />
      <p
        className={`${dmMono.className} absolute left-1/2 top-[calc(50%-4.5px)] -translate-x-1/2 text-[13px] leading-[19.5px] font-normal tracking-[-0.39px] whitespace-nowrap text-[#ecfae5] uppercase not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
      >
        {label}
      </p>
      <div className="absolute top-1/2 left-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
      <div className="absolute top-1/2 right-[7.52px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
    </div>
  );
}

function FeatureCard({
  iconSrc,
  iconSize,
  tag,
  title,
  body,
  glowPosition = "at 50% 50%",
}: FeatureCardProps) {
  const { fadeRef, isVisible } = useFadeIn();

  return (
    <div
      ref={fadeRef}
      className={`relative flex w-full flex-col items-start gap-[24px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] px-[16px] pt-[16px] pb-[24px] min-[1024px]:h-[400px] min-[1024px]:w-[377px] min-[1024px]:gap-[36px] transition-all duration-300 hover:-translate-y-[10px] hover:shadow-[0px_94px_94px_-80px_#6fe047] min-[1024px]:hover:-translate-y-[30px] ${getFadeInClass(isVisible)}`}
      style={{
        backgroundImage: `radial-gradient(circle ${glowPosition}, rgba(111,224,71,0.12) 0%, rgba(0,0,0,0) 70%)`
      }}
      data-name="Article"
    >
      {/* Icon */}
      <div
        className="relative h-[65px] w-[66.14px] shrink-0 overflow-clip rounded-[13.684px]"
        style={{ backgroundImage: `url(${ICON_BACKGROUND})` }}
        data-name="Icon"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {iconSrc && (
            <img loading="lazy" decoding="async"
              src={iconSrc}
              alt=""
              width={iconSize}
              height={iconSize}
              className="max-w-none"
              aria-hidden
            />
          )}
        </div>
      </div>

      {/* News section */}
      <div className="flex w-full flex-col gap-[20px] min-[1024px]:flex-1 min-[1024px]:justify-end">
        <CardTag label={tag} />
        <div className="flex flex-col gap-[10px]">
          <h3
            className={`${gilroyMedium.className} text-[18px] leading-[24px] font-medium text-white not-italic min-[1024px]:text-[22px] min-[1024px]:leading-[28px] min-[1024px]:tracking-[-0.4539px]`}
          >
            {title}
          </h3>
          <p
            className={`${interRegular.className} text-[14px] leading-[21px] font-normal tracking-[-0.3158px] text-[rgba(240,240,240,0.6)] not-italic min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
          >
            {body}
          </p>
        </div>
      </div>

      <Corners />
    </div>
  );
}

type MobileFeatureCardProps = {
  iconSrc: string;
  iconSize: number;
  tagWidth: number;
  tag: string;
  title: string;
  body: string;
};

function MobileFeatureCard({
  iconSrc,
  iconSize,
  tagWidth,
  tag,
  title,
  body,
}: MobileFeatureCardProps) {
  return (
    <article
      className="relative flex h-auto w-[353px] shrink-0 flex-col items-start gap-[24px] overflow-clip border-[0.468px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] px-[14px] pt-[14px] pb-[22px]"
      data-name="Article"
    >
      <Corners />

      {/* Icon — 61.93×60.862, rounded-[12.813px] */}
      <div
        className="relative h-[60.862px] w-[61.93px] shrink-0 overflow-clip rounded-[12.813px]"
        style={{ backgroundImage: `url(${ICON_BACKGROUND})` }}
        data-name="Icon"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {iconSrc && (
            <img loading="lazy" decoding="async"
              src={iconSrc}
              alt=""
              width={iconSize}
              height={iconSize}
              className="max-w-none"
              aria-hidden
            />
          )}
        </div>
      </div>

      {/* NewsSection */}
      <div className="flex w-full flex-col justify-start" data-name="NewsSection">
        <div className="flex w-full flex-col gap-[18px]">
          {/* Tag pill */}
          <div
            className="relative h-[24px] w-[240px] shrink-0 overflow-clip bg-[rgba(255,255,255,0.06)]"
            style={{ width: `${tagWidth}px` }}
            data-name="Menu"
          >
            <Corners />
            <p
              className={`${dmMono.className} absolute left-1/2 top-[calc(50%-4.09px)] -translate-x-1/2 text-[12px] leading-[18.259px] tracking-[-0.36px] font-normal text-[#ecfae5] uppercase whitespace-nowrap not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word]`}
            >
              {tag}
            </p>
            <div className="absolute left-[6.07px] top-1/2 h-[11.236px] w-[1.873px] -translate-y-1/2 bg-white opacity-60" />
            <div className="absolute right-[7.27px] top-1/2 h-[11.236px] w-[1.873px] -translate-y-1/2 bg-white opacity-60" />
          </div>

          {/* Title + body */}
          <div className="flex w-full flex-col gap-[9.363px]">
            <h3
              className={`${gilroyMedium.className} text-[18px] leading-[26.493px] tracking-[-0.425px] font-medium text-white not-italic [word-break:break-word]`}
            >
              {title}
            </h3>
            <p
              className={`${interRegular.className} text-[14px] leading-[24.601px] tracking-[-0.2957px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
            >
              {body}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

const CARDS: FeatureCardProps[] = [
  {
    iconSrc: "/som/icon-card-1.svg",
    iconSize: 45.614,
    tag: "PRE-ENGINEERED HARDWARE",
    title: "Microwatt AI in a Micro Footprint",
    body: "We pre-routed the GPX10 AI processor and wireless stacks into high-density footprints. Skip RF certification nightmares and achieve scale.",
    glowPosition: "at 100% 40%",
  },
  {
    iconSrc: "/som/icon-card-2.svg",
    iconSize: 40,
    tag: "Vertical-Specific Integration",
    title: "Purpose-Built Peripherals",
    body: "Simplify sourcing and driver integration. Each SOM is pre-integrated with the sensors and interfaces your vertical needs—vision, telemetry, or acoustics.",
    glowPosition: "at 0% 40%",
  },
  {
    iconSrc: "/som/icon-card-3.svg",
    iconSize: 40,
    tag: "Ecosystem Portability",
    title: "1:1 Code Portability",
    body: "The exact C-code, AI object files, and unified Eclipse build you validated on the Cranium Evaluation Kit ports directly to any of our production SOMs with zero rewrites.",
    glowPosition: "at 0% 40%",
  },
];

export function SomFeatures({ data }: { data?: any }) {
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const rawHeading = data?.heading || FALLBACK_HEADING;
  const processedHeading = rawHeading === "Stop Routing. Start Shipping."
    ? "Stop Routing.\nStart Shipping."
    : rawHeading;
  const headingLines = processedHeading.split("\n");
  const dataCards: any[] = Array.isArray(data?.cards) ? data.cards : [];
  const cards: FeatureCardProps[] = CARDS.map((fb, i) => {
    const c = dataCards[i];
    if (!c) return fb;
    return {
      iconSrc: mediaUrl(c?.icon) || fb.iconSrc,
      iconSize: fb.iconSize,
      tag: c?.tag || fb.tag,
      title: c?.title || fb.title,
      body: c?.description || fb.body,
      glowPosition: fb.glowPosition,
    };
  });
  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="2438:4878"
      data-name="Stop Routing. Start Shipping."
      aria-label="Stop Routing. Start Shipping."
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden w-[1203px] flex-col items-center gap-[48px] pt-[20px] pb-[80px] min-[1024px]:flex">
        {/* Section title */}
        <div
          className="flex w-[650px] flex-col items-center gap-[24px]"
          data-node-id="2438:4879"
          data-name="Section Title"
        >
          <div
            className="relative px-[10px]"
            data-node-id="2438:4880"
            data-name="Title"
          >
            <GradientTitle gradientDeg={TITLE_GRADIENT_DEG} className="text-center">
              {headingLines.map((line: string, i: number) => (
                <span
                  key={i}
                  className="block h-[49px] leading-[49px] whitespace-nowrap"
                >
                  {line}
                </span>
              ))}
            </GradientTitle>
            <Corners />
          </div>
          <p
            className={`${interRegular.className} w-[650px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
            data-node-id="2438:4886"
          >
            {subtitle}
          </p>
        </div>

        {/* Cards row */}
        <div
          className="flex w-full items-center gap-[36px] pt-[30px]"
          data-node-id="2438:4887"
        >
          {cards.map((card, i) => (
            <FeatureCard key={i} {...card} />
          ))}
        </div>
      </div>

      {/* MOBILE (<1024px) — Figma node 4054:8302 "2nd Fold" 393×1400 */}
      <div
        className="relative mx-auto h-auto w-[393px] overflow-hidden bg-black pb-[60px] pt-[30px] min-[1024px]:hidden"
        data-node-id="4054:8302"
        data-name="2nd Fold"
      >
        {/* Background glow — 4054:8306 (1441×341 at y1132) */}
        <img loading="lazy" decoding="async"
          src={MOBILE_SECTION_GLOW}
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/2 h-[341px] w-[1441px] max-w-none -translate-x-1/2"
        />

        {/* Content column — 4054:8307 (x20, y30, 353×1338) */}
        <div
          className="relative mx-auto flex w-[353px] flex-col items-end gap-[24px]"
          data-node-id="4054:8307"
        >
          {/* Title block — 4054:8357 (352×180) */}
          <div
            className="flex w-[352px] flex-col items-center gap-[15px]"
            data-node-id="4054:8357"
          >
            {/* Title group — 4054:8358 (352×81) */}
            <div
              className="relative flex w-[352px] justify-center py-[5px]"
              data-node-id="4054:8358"
            >
              <Corners />
              <h2
                className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
                style={{
                  backgroundImage: `linear-gradient(${MOBILE_TITLE_GRADIENT_DEG}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
                data-node-id="4054:8359"
              >
                {headingLines.map((line: string, i: number) => (
                  <span key={i} className="block [word-break:break-word]">
                    {line}
                  </span>
                ))}
              </h2>
            </div>

            {/* Subtitle — 4054:8364 (336×84) */}
            <p
              className={`${interRegular.className} w-[336px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0]/75 not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
              data-node-id="4054:8364"
            >
              {subtitle}
            </p>
          </div>

          {/* Cards container — 4054:8467 (353×1134, gap 12) */}
          <div
            className="flex w-[353px] flex-col gap-[12px]"
            data-node-id="4054:8467"
          >
            {cards.map((card, i) => {
              const meta = MOBILE_CARD_META[i] ?? MOBILE_CARD_META[0];
              return (
                <MobileFeatureCard
                  key={i}
                  iconSrc={card.iconSrc}
                  iconSize={meta.iconSize}
                  tagWidth={meta.tagWidth}
                  tag={card.tag}
                  title={card.title}
                  body={card.body}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
