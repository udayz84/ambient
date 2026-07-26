"use client";

import Image from "next/image";
import { useState } from "react";
import { mediaUrl } from "@/lib/strapi";
import { dmMono, gilroyMedium, gilroySemiBold, interLight, interRegular, interSemiBold } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

function gradient(deg: string) {
  return `linear-gradient(${deg}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`;
}

function SectionTitle({
  children,
  deg,
  className = "",
}: {
  children: React.ReactNode;
  deg: string;
  className?: string;
}) {
  return (
    <h2
      className={`${gilroyMedium.className} max-w-[327px] bg-clip-text text-center text-[28px] leading-[34px] font-medium text-transparent [word-break:break-word] not-italic ${className}`}
      style={{ backgroundImage: gradient(deg) }}
    >
      {children}
    </h2>
  );
}

function GreenCta({
  children,
  href = "#",
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <a
      href={href}
      className={`${interSemiBold.className} relative flex h-[48px] w-full items-center justify-center overflow-hidden ${GREEN_CTA_SHADOW}`}
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
      <span aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]" />
      <span className="relative text-[13px] leading-[normal] font-semibold uppercase whitespace-nowrap text-white not-italic">
        {children}
      </span>
      <GreenCtaCorners />
    </a>
  );
}

function WhiteCta({
  children,
  href = "#",
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <a
      href={href}
      className={`${interSemiBold.className} relative flex h-[48px] w-full items-center justify-center overflow-hidden shadow-[0px_24.721px_16.129px_rgba(255,255,255,0.15)]`}
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-white" />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-plus-lighter"
        style={{ backgroundImage: "url(/contact/cta-texture.png)", backgroundSize: "307.2px 307.2px" }}
      />
      <span className="relative text-[13px] leading-[normal] font-semibold uppercase whitespace-nowrap text-[#121212] not-italic">
        {children}
      </span>
      <GreenCtaCorners />
    </a>
  );
}

function SectionWrap({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative flex w-full flex-col items-center px-[24px] py-[56px] ${className}`}>
      {children}
    </section>
  );
}

/* ---------------------------------- HERO ---------------------------------- */
const HERO_DEFAULT_TITLE = "Start building\nwith Ambient";
const HERO_DEFAULT_SUBTITLE =
  "Skip the generic sales inbox. Get direct access to our engineering team, technical documentation, and commercial partners.";
const RESOURCES_DEFAULT_HEADING = "Looking for immediate resources?";
const RESOURCES_DEFAULT_CTAS = [
  { label: "Download Datasheets & SDK", href: "#", variant: "primary" },
  { label: "Download Press Kit", href: "#", variant: "secondary" },
  { label: "Case Studies & Whitepapers", href: "#", variant: "secondary" },
] as const;

function ContactHeroMobile({ data }: { data?: any }) {
  const heroData = data?.hero;
  const resourcesData = data?.resources;
  const bg = mediaUrl(heroData?.mobile_background_image) || mediaUrl(heroData?.background_image) || "/mobile/contact/hand.png";
  const titleLines = (heroData?.title || HERO_DEFAULT_TITLE).split("\n");
  const subtitle = heroData?.subtitle || HERO_DEFAULT_SUBTITLE;
  const heading = resourcesData?.heading || RESOURCES_DEFAULT_HEADING;
  const ctas: ReadonlyArray<{ label: string; href: string; variant: string }> =
    Array.isArray(resourcesData?.ctas) && resourcesData.ctas.length > 0
      ? resourcesData.ctas
      : RESOURCES_DEFAULT_CTAS;

  return (
    <section
      className="relative w-full overflow-hidden bg-black pt-[100px]"
      aria-label="Contact hero"
      data-node-id="3229:7781"
      data-name="Banner"
    >
      <div className="relative mx-auto w-full" style={{ height: 761 }}>
        {/* hand image background — full width, height 518, top 60 */}
        <div
          className="pointer-events-none absolute left-0 right-0 overflow-hidden"
          style={{ top: 60, height: 518 }}
          aria-hidden
        >
          <Image
            src={bg}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ backgroundImage: "linear-gradient(177.572deg, rgba(0, 0, 0, 0) 74.733%, rgb(0, 0, 0) 100.97%)" }}
          />
        </div>

        {/* section title — top 0, left/right 20, title + subtitle */}
        <div
          className="absolute left-[20px] right-[20px] top-0 flex flex-col items-center justify-center gap-[15px]"
          data-node-id="3229:7785"
        >
          <div
            className="relative flex w-full items-center justify-center py-[7px]"
            data-node-id="3229:8704"
          >
            <Corners />
            <h1
              className={`${gilroyMedium.className} w-[241.258px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic`}
              style={{ backgroundImage: "linear-gradient(102.228deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)" }}
              data-node-id="3229:8705"
            >
              {titleLines[0] && <span className="block leading-[36px]">{titleLines[0]}</span>}
              {titleLines[1] && <span className="block leading-[36px]">{titleLines[1]}</span>}
            </h1>
          </div>
          <p
            className={`${interRegular.className} w-[308px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-80 not-italic`}
            data-node-id="3229:7787"
          >
            {subtitle}
          </p>
        </div>

        {/* resources article — top 449, overlaps lower part of hand image */}
        <div
          className="absolute left-[20px] right-[20px] flex flex-col gap-[20px] overflow-clip border-[0.5px] border-solid border-white/20 bg-transparent p-[24px]"
          style={{ top: 449 }}
          data-node-id="3229:8713"
          data-name="Article"
        >
          <Corners />
          <p
            className={`${gilroyMedium.className} w-full text-center text-[22px] leading-[28px] font-medium text-white not-italic`}
            data-node-id="3229:8716"
          >
            {heading}
          </p>
          <div className="flex w-full flex-col gap-[20px]">
            {ctas.map((cta, index) =>
              cta.variant === "primary" || cta.variant === "green" ? (
                <GreenCta key={index} href={cta.href || "#"}>{cta.label}</GreenCta>
              ) : (
                <WhiteCta key={index} href={cta.href || "#"}>{cta.label}</WhiteCta>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function LocationCard({ title, address, iconPosition }: { title: string; address: React.ReactNode; iconPosition: "left" | "right" }) {
  const isRight = iconPosition === "right";
  return (
    <div
      className={`relative flex h-[107px] w-[343px] items-center bg-[rgba(0,0,0,0.5)] border-[0.474px] border-solid border-[rgba(240,240,240,0.2)] ${isRight ? "justify-center gap-[9px]" : "gap-[4px] pl-[4.019px] pr-[9.981px]"}`}
    >
      {/* Location icon tile (83x85) — gradient square 67.587x69.5 + 24.806 pin */}
      <div className={`relative h-[85px] w-[83px] shrink-0 ${isRight ? "order-2" : "order-1"}`}>
        <div
          className="absolute bg-gradient-to-b from-[#53d824] to-[#2c7213]"
          style={{ left: 7.98, top: 7.5, width: 67.587, height: 69.5 }}
        />
        <div className="absolute left-1/2 top-1/2 h-[24.806px] w-[24.806px] -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/contact/location-icon.svg"
            alt=""
            width={25}
            height={25}
            className="h-[24.806px] w-[24.806px]"
            aria-hidden
          />
        </div>
      </div>
      {/* Title + address */}
      <div className={`flex flex-col items-start ${isRight ? "order-1 w-[214px]" : "order-2 w-[242px]"}`}>
        <p className={`${gilroyMedium.className} text-[18px] leading-[26.545px] font-medium text-white not-italic`}>
          {title}
        </p>
        <div className={`${interRegular.className} text-[14px] leading-[18px] font-normal text-[#a4a4a4] not-italic`}>
          {address}
        </div>
      </div>
    </div>
  );
}

/* ----------------------- MAP CONNECTOR INDICATOR -------------------------- */
// Recreates the Figma connector (Group 93/94/95): a 1.5px solid #6FE047 line
// ending in a layered diamond marker (20px #53D824 @40% blur glow + 6px #DEF5C0
// core). The diamond bbox (28.284) sits with a 4px glow margin from the edge,
// so its center is 18.142px from the indicator edge.
function MapIndicator({
  centerX,
  top,
  height,
  diamondAt,
}: {
  centerX: number;
  top: number;
  height: number;
  diamondAt: "top" | "bottom";
}) {
  const centerFromEdge = 18.142;
  return (
    <div
      className="pointer-events-none absolute"
      style={{ left: centerX, top, width: 28.284, height, transform: "translateX(-50%)" }}
      aria-hidden
    >
      <div
        className="absolute left-1/2 w-[1.5px] -translate-x-1/2 bg-[#6FE047]"
        style={
          diamondAt === "top"
            ? { top: centerFromEdge, bottom: 0 }
            : { top: 0, bottom: centerFromEdge }
        }
      />
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          width: 28.284,
          height: 28.284,
          ...(diamondAt === "top" ? { top: 4 } : { bottom: 4 }),
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 size-[20px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#53D824]/40"
          style={{ filter: "blur(2px)" }}
        />
        <div className="absolute left-1/2 top-1/2 size-[6px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#DEF5C0]" />
      </div>
    </div>
  );
}

const MAP_DEFAULT_HEADING = "Global scale.\nLocal support.";
const MAP_DEFAULT_SUBTITLE =
  "From our research labs to your production line, we maintain direct engineering presence across three continents to ensure rapid deployment and ongoing support.";

const MAP_LOCATIONS = [
  {
    title: "USA Headquarters",
    address: "Ambient Scientific Inc. 4633 Old Ironsides Drive Santa Clara California 95054. USA",
    iconPosition: "left" as const,
    cardTop: 240,
    connector: { centerX: 24.14, top: 260, height: 381.28, diamondAt: "bottom" as const },
  },
  {
    title: "Singapore Headquarters",
    address: "137 Telok Ayer Street, #05-02, Singapore 068602",
    iconPosition: "right" as const,
    cardTop: 380,
    cardLeft: 29,
    connector: { centerX: 357.14, top: 480, height: 202.28, diamondAt: "bottom" as const },
  },
  {
    title: "India Headquarters",
    address: "Ramky House, 1st Cross, Raghavendra Nagar, Kalyan Nagar, Bengaluru Karnataka, 560043, India",
    iconPosition: "left" as const,
    cardTop: 740,
    connector: { centerX: 282.43, top: 638, height: 155, diamondAt: "top" as const },
  },
];

function ContactMapMobile({ data }: { data?: any }) {
  const globeImage = mediaUrl(data?.globe_image) || "/contact/Globe image.png";
  const mapBase = mediaUrl(data?.map_base) || "/contact/map-base.svg";
  const headingText = data?.heading || MAP_DEFAULT_HEADING;
  const headingLines = headingText.includes("\n") 
    ? headingText.split("\n") 
    : headingText.replace(/\.\s+/, ".\n").split("\n");
  const subtitle = data?.subtitle || MAP_DEFAULT_SUBTITLE;
  const strapiLocations: ReadonlyArray<any> = Array.isArray(data?.locations)
    ? data.locations
    : [];
  // Render every CMS location. Layout metadata cycles through the designed
  // 3-slot templates so any count is supported while preserving the layout.
  const mergedLocations = (
    strapiLocations.length > 0 ? strapiLocations : MAP_LOCATIONS
  ).map((remote: any, index: number) => {
    const layout = MAP_LOCATIONS[index] || MAP_LOCATIONS[index % MAP_LOCATIONS.length];
    const fallback = MAP_LOCATIONS[index] || {};
    return {
      ...layout,
      title: remote.title || fallback.title,
      address: remote.address || fallback.address,
    };
  });

  return (
    <SectionWrap aria-label="Global offices" className="!px-0 !py-0 h-[939px] w-full max-w-[393px] mx-auto overflow-hidden bg-black relative">
      {/* Background Globe Image — mobile crop per Figma (1365.19x692.08 placed at left -485.6, top 692) */}
      <div
        className="pointer-events-none absolute left-[-485.6px] top-[692px] h-[692.08px] w-[1365.19px] overflow-hidden"
        aria-hidden
      >
        <Image
          src={globeImage}
          alt=""
          fill
          className="object-cover object-top"
          sizes="393px"
        />
      </div>

      {/* Dotted map-base grid (background mapping) per Figma — at section (-38, 587), 497.39x162.35 */}
      <div
        className="pointer-events-none absolute left-[-38px] top-[587px] h-[162.353px] w-[497.388px] opacity-20"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={mapBase} alt="" className="block size-full max-w-none object-cover" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full pt-[30px] h-full">
        <div className="relative flex flex-col items-center gap-[10px] w-full">
          <div className="relative flex w-[350px] items-center justify-center py-[7px]">
            <Corners />
            <h2
              className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic`}
              style={{
                backgroundImage: "linear-gradient(107.454deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {headingLines[0]}
              {headingLines[1] && (<><br />{headingLines[1]}</>)}
            </h2>
          </div>
          <p className={`${interRegular.className} w-[316px] text-center text-[14px] leading-[16px] font-normal text-[#f0f0f0] opacity-65 not-italic`}>
            {subtitle}
          </p>
        </div>

        {/* Lines and Cards Container */}
        <div className="absolute top-[0px] left-0 w-full h-full pointer-events-none">
          {mergedLocations.map((loc, index) => (
            <MapIndicator key={`indicator-${index}`} {...loc.connector} />
          ))}

          {mergedLocations.map((loc, index) => (
            <div
              key={`card-${index}`}
              className="absolute pointer-events-auto"
              style={{
                top: loc.cardTop,
                left: loc.cardLeft !== undefined ? loc.cardLeft : 20,
              }}
            >
              <LocationCard
                title={loc.title}
                address={loc.address}
                iconPosition={loc.iconPosition}
              />
            </div>
          ))}
        </div>
      </div>
    </SectionWrap>
  );
}

/* -------------------------------- SCHEDULE -------------------------------- */
const SCHEDULE_DEFAULT_HEADING = "Schedule a Consultation";
const SCHEDULE_DEFAULT_SUBTITLE =
  "Book a direct meeting with our engineering or commercial teams.";

const SCHEDULE_CARDS = [
  {
    tag: "Technical",
    title: "Talk to an FAE (Field Application Engineer)",
    description:
      "Book a 30-minute session with our engineers. Discuss power profiling, model quantization, or deployment architecture for your use case.",
    ctaLabel: "View FAE Calendar",
    imageSrc: "/contact/schedule-fae.png",
    widthClass: "w-[178px]",
  },
  {
    tag: "Commercial",
    title: "Commercial Scaling & Enterprise",
    description:
      "Connect with Business Development to discuss pricing, ASIC development, timelines, licensing, or supply partnerships.",
    ctaLabel: "View Commercial Calendar",
    imageSrc: "/contact/schedule-commercial.png",
    widthClass: "w-[218px]",
  },
];

function ContactScheduleMobile({ data }: { data?: any }) {
  const heading = data?.heading || SCHEDULE_DEFAULT_HEADING;
  const subtitle = data?.subtitle || SCHEDULE_DEFAULT_SUBTITLE;
  const strapiCards: ReadonlyArray<any> = Array.isArray(data?.cards)
    ? data.cards
    : [];
  // Render every CMS card. Layout metadata (image scaling, widths) cycles
  // through the designed 2-card templates so any count is supported.
  const mergedCards = (
    strapiCards.length > 0 ? strapiCards : SCHEDULE_CARDS
  ).map((remote: any, index: number) => {
    const layout = SCHEDULE_CARDS[index] || SCHEDULE_CARDS[index % SCHEDULE_CARDS.length];
    const fallback = SCHEDULE_CARDS[index] || {};
    return {
      ...layout,
      tag: remote.tag || fallback.tag,
      title: remote.title || fallback.title,
      description: remote.description || fallback.description,
      ctaLabel: remote.cta_label || fallback.ctaLabel,
      ctaHref: remote.cta_href || "#",
      remoteImage: mediaUrl(remote.image),
    };
  });

  return (
    <SectionWrap aria-label="Schedule a Consultation">
      <div className="flex flex-col items-center gap-[10px] w-[350px]">
        <div className="relative flex w-full items-center justify-center py-[7px]">
          <Corners />
          <h2
            className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic`}
            style={{ backgroundImage: "linear-gradient(107.454deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)" }}
          >
            {heading}
          </h2>
        </div>
        <p className={`${interRegular.className} w-[min-content] min-w-full text-center text-[14px] leading-[16px] font-normal text-[#f0f0f0] opacity-65 not-italic`}>
          {subtitle}
        </p>
      </div>

      <div className="mt-[24px] flex w-[353px] flex-col gap-[24px]">
        {mergedCards.map((card) => {
          const isCommercial = card.tag === "Commercial";
          const imageFinal = card.remoteImage || card.imageSrc;
          return (
            <article
              key={card.title}
              className="relative flex flex-col h-[361px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-transparent pt-[16px] px-[16px] pb-[24px]"
            >
              <Corners />

              {/* Image Container Wrapper to match desktop scaling exactly */}
              <div className="pointer-events-none absolute bottom-0 right-0 z-0 h-[242px] w-[227px] overflow-hidden">
                {isCommercial ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={imageFinal}
                    alt=""
                    className="absolute h-[80%] left-[5%] top-[20%] w-[125%] max-w-none"
                  />
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={imageFinal}
                    alt=""
                    className="absolute h-[151%] left-[-15.13%] top-[-10%] w-[110.37%] max-w-none"
                  />
                )}
              </div>

              <div className="flex flex-col items-start gap-[20px] w-full relative z-10 pointer-events-none">
                <div className="relative flex h-[26px] w-[180px] items-center justify-center border-[0.5px] border-solid border-white/20 bg-[rgba(255,255,255,0.06)] pointer-events-auto">
                  <Corners />
                  <span className={`${dmMono.className} text-[13px] leading-[19.5px] uppercase tracking-[-0.03em] text-[#ecfae5] not-italic`}>
                    {card.tag}
                  </span>
                  <div className="absolute left-[6.48px] top-1/2 h-[12px] w-px -translate-y-1/2 bg-white opacity-30" />
                  <div className="absolute left-[170.48px] top-1/2 h-[12px] w-px -translate-y-1/2 bg-white opacity-30" />
                </div>
                
                <div className="flex flex-col items-start gap-[10px] w-full pointer-events-auto">
                  <h3 className={`${gilroyMedium.className} text-[16px] leading-[18px] font-medium text-white not-italic`}>
                    {card.title}
                  </h3>
                  <p className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-[rgba(240,240,240,0.6)] not-italic`}>
                    {card.description}
                  </p>
                </div>
              </div>

              <a
                href={card.ctaHref}
                className={`mt-[24px] relative flex items-center justify-center gap-[8px] px-[31px] py-[14px] drop-shadow-[0px_24.721px_16.129px_rgba(255,255,255,0.15),0px_10.268px_6.699px_rgba(255,255,255,0.15),0px_3.714px_2.423px_rgba(255,255,255,0.1)] z-10 ${card.widthClass}`}
              >
                <span aria-hidden className="pointer-events-none absolute inset-0 bg-white" />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[length:307.2px_307.2px] bg-top-left opacity-40 mix-blend-plus-lighter"
                  style={{ backgroundImage: "url(/contact/cta-texture.png)" }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_18px_0px_rgba(255,255,255,0.6)]"
                />
                <Image src="/contact/calendar-icon.svg" alt="" width={20} height={20} className="relative z-10 size-[20px] shrink-0" aria-hidden />
                <span className={`${gilroySemiBold.className} relative z-10 text-[12px] leading-[normal] font-semibold uppercase whitespace-nowrap text-[#151515] not-italic`}>
                  {card.ctaLabel}
                </span>
              </a>
            </article>
          );
        })}
      </div>
    </SectionWrap>
  );
}

/* ---------------------------------- FORM ---------------------------------- */
type TrackId = "sales" | "developer" | "media";

const FORM_DEFAULT_HEADING = "Prefer to write to us?";
const FORM_DEFAULT_SUBTITLE =
  "Select your track below to ensure your message reaches the right desk immediately.";
const FORM_DEFAULT_MESSAGE_HEADING = "Drop Us a Message";
const FORM_DEFAULT_CHECKBOX_LABEL = "Sign up for news & updates";
const FORM_DEFAULT_SUBMIT_LABEL = "Send Message";

const TRACKS: { id: TrackId; title: string; description: string; icon: string }[] = [
  {
    id: "sales",
    title: "Sales & Enterprise",
    description:
      "Request a quote, discuss volume licensing, or inquire about custom ASIC development.",
    icon: "/contact/track-sales.svg",
  },
  {
    id: "developer",
    title: "Developer Support",
    description:
      "Report a bug, request documentation, or get help compiling your model via the Nebula SDK.",
    icon: "/contact/track-developer.svg",
  },
  {
    id: "media",
    title: "Media & Press",
    description:
      "Request an interview with our leadership team, access press materials, or coordinate coverage.",
    icon: "/contact/track-media.svg",
  },
];

const FORM_FIELDS = [
  { label: "First Name", placeholder: "Enter Your First Name", type: "text" },
  { label: "Last Name", placeholder: "Enter Your Last Name", type: "text" },
  { label: "Company Name", placeholder: "Enter Your Company Name", type: "text" },
  { label: "Job Title", placeholder: "Enter Your Job Title", type: "text" },
  { label: "Corporate Email", placeholder: "Enter Your Corporate Email", type: "email" },
  { label: "Phone Number", placeholder: "Enter Your Phone Number", type: "tel" },
];

function mapInputTypeMobile(fieldType: string | undefined | null): string {
  switch (fieldType) {
    case "email":
      return "email";
    case "phone":
      return "tel";
    default:
      return "text";
  }
}

function ContactFormMobile({ data }: { data?: any }) {
  const [activeTrackId, setActiveTrackId] = useState<TrackId>("sales");
  const [subscribed, setSubscribed] = useState(false);

  const heading = data?.heading || FORM_DEFAULT_HEADING;
  const subtitle = data?.subtitle || FORM_DEFAULT_SUBTITLE;
  const messageHeading = data?.message_heading || FORM_DEFAULT_MESSAGE_HEADING;
  const checkboxLabel = data?.checkbox_label || FORM_DEFAULT_CHECKBOX_LABEL;
  const submitLabel = data?.submit_label || FORM_DEFAULT_SUBMIT_LABEL;
  const submitHref = data?.submit_href || "#";

  const strapiTracks: ReadonlyArray<any> = Array.isArray(data?.tracks)
    ? data.tracks
    : [];
  const mergedTracks = TRACKS.map((track, index) => {
    const remote = strapiTracks[index];
    if (!remote) return { ...track, remoteIcon: null, strapiFields: [] };
    return {
      ...track,
      title: remote.label || track.title,
      description: remote.description || track.description,
      remoteIcon: mediaUrl(remote.icon),
      strapiFields: Array.isArray(remote.form) ? remote.form : [],
    };
  });

  const activeMergedTrack = mergedTracks.find((t) => t.id === activeTrackId);
  const currentStrapiFields: ReadonlyArray<any> =
    activeMergedTrack?.strapiFields || [];

  // Separate Strapi fields: textarea fields go to the bottom section, others to the inputs
  const strapiInputFields = currentStrapiFields.filter(
    (f: any) => f.field_type !== "textarea",
  );
  const strapiTextareaField = currentStrapiFields.find(
    (f: any) => f.field_type === "textarea",
  );

  // Build input fields — Strapi data where available, fallback for the rest
  const mergedFields = FORM_FIELDS.map((fallback, index) => {
    const remote = strapiInputFields[index];
    if (!remote) return { ...fallback };
    return {
      label: remote.label || fallback.label,
      placeholder: remote.placeholder || fallback.placeholder,
      type: mapInputTypeMobile(remote.field_type),
    };
  });

  // Bottom textarea: use Strapi data if available, otherwise fallback
  const textareaLabel = strapiTextareaField?.label || "How can we help?";
  const textareaPlaceholder =
    strapiTextareaField?.placeholder ||
    "Describe your use case, technical requirements, or business needs...";

  return (
    <SectionWrap aria-label="Contact form" className="!pb-[20px] relative z-10 -mb-[266px]">
      <div className="flex flex-col items-center gap-[12px] relative z-10">
        <SectionTitle deg="119.522deg">{heading}</SectionTitle>
        <p className={`${interRegular.className} max-w-[327px] text-center text-[14px] leading-[22px] font-normal text-[#f0f0f0] opacity-70 not-italic`}>
          {subtitle}
        </p>
      </div>

      {/* Track selector */}
      <div className="mt-[24px] flex w-full flex-col gap-[10px] relative z-10">
        {mergedTracks.map((track) => {
          const selected = activeTrackId === track.id;
          const iconSrc = track.remoteIcon || track.icon;
          return (
            <button
              key={track.id}
              type="button"
              onClick={() => setActiveTrackId(track.id)}
              aria-pressed={selected}
              className={`relative flex items-start gap-[14px] p-[16px] text-left transition-colors ${
                selected
                  ? "border-[1.5px] border-solid border-[rgba(83,216,36,0.4)] bg-transparent"
                  : "border-[0.5px] border-solid border-white/15 bg-transparent"
              }`}
            >
              <Corners />
              <div className="relative size-[28px] shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={iconSrc}
                  className={`absolute inset-0 size-full object-contain ${selected ? "opacity-100" : "opacity-70 brightness-0 invert"}`}
                  aria-hidden
                />
              </div>
              <div className="flex flex-1 flex-col gap-[4px]">
                <p className={`${gilroyMedium.className} text-[16px] leading-[20px] font-medium text-white not-italic`}>
                  {track.title}
                </p>
                <p className={`${interRegular.className} text-[12px] leading-[18px] font-normal text-[#a4a4a4] not-italic`}>
                  {track.description}
                </p>
              </div>
              <span
                className={`relative mt-[2px] size-[18px] shrink-0 overflow-clip rounded-full ${
                  selected ? "bg-[#53d824]" : "bg-[#e2f9da] opacity-50"
                }`}
                aria-hidden
              >
                <span className="absolute top-1/2 left-1/2 size-[8px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#091804]" />
              </span>
            </button>
          );
        })}
      </div>

      {/* Form */}
      <div className="relative mt-[48px] w-full overflow-clip border-[1.5px] border-solid border-[rgba(83,216,36,0.25)] bg-transparent p-[20px] z-10">
        <Corners />
        <p className={`${gilroyMedium.className} mb-[16px] text-[20px] leading-[26px] font-medium text-white not-italic`}>
          {messageHeading}
        </p>

        <div className="flex flex-col gap-[14px]">
          {mergedFields.map((field, index) => (
            <div key={`field-${index}`} className="flex flex-col gap-[6px]">
              <label className={`${interLight.className} text-[11px] leading-[15px] font-light text-white not-italic`}>
                {field.label}
              </label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                className={`${interRegular.className} h-[44px] w-full border-[0.5px] border-solid border-[#4a4a4a] bg-transparent px-[12px] text-[14px] font-normal text-white outline-none placeholder:text-[#4a4a4a] not-italic`}
              />
            </div>
          ))}

          <div className="flex flex-col gap-[6px]">
            <label className={`${interLight.className} text-[11px] leading-[15px] font-light text-white not-italic`}>
              {textareaLabel}
            </label>
            <textarea
              placeholder={textareaPlaceholder}
              className={`${interRegular.className} h-[110px] w-full resize-none border-[0.5px] border-solid border-[#4a4a4a] bg-transparent p-[12px] text-[14px] font-normal text-white outline-none placeholder:text-[#4a4a4a] not-italic`}
            />
          </div>

          <label className="flex cursor-pointer items-center gap-[12px] py-[4px]">
            <input
              type="checkbox"
              checked={subscribed}
              onChange={(event) => setSubscribed(event.target.checked)}
              className="sr-only"
            />
            <span
              className={`relative size-[20px] shrink-0 border-[0.5px] border-solid ${
                subscribed ? "border-[#53d824] bg-[#53d824]" : "border-[#4a4a4a]"
              }`}
            >
              {subscribed ? (
                <svg className="absolute inset-0 size-full p-[2px] text-[#091804]" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : null}
            </span>
            <span className={`${interRegular.className} text-[13px] leading-[18px] font-normal text-white not-italic`}>
              {checkboxLabel}
            </span>
          </label>

          <GreenCta href={submitHref}>{submitLabel}</GreenCta>
        </div>
      </div>
    </SectionWrap>
  );
}

/* --------------------------------- PAGE ----------------------------------- */
export function ContactMobile({ data }: { data?: any }) {
  return (
    <div className="flex w-full flex-col">
      <ContactHeroMobile data={data} />
      <ContactScheduleMobile data={data?.schedule} />
      <ContactMapMobile data={data?.map} />
      <ContactFormMobile data={data?.form} />
    </div>
  );
}
