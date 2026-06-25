"use client";

import Image from "next/image";
import { useState } from "react";
import { dmMono, gilroyMedium, interLight, interRegular, interSemiBold } from "../hero/fonts";
import { Corners } from "../shared/Corners";

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
      <Corners />
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
      <Corners />
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
function ContactHeroMobile() {
  return (
    <section
      className="relative flex w-full flex-col justify-start overflow-hidden px-[20px] pt-[100px] pb-[135px]"
      aria-label="Contact hero"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/mobile/contact/hand.png"
          alt=""
          fill
          className="object-cover object-top"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(132.908deg, rgb(0, 0, 0) 31.15%, rgba(0, 0, 0, 0) 76.987%), linear-gradient(187.815deg, rgba(0, 0, 0, 0) 49.061%, rgb(0, 0, 0) 90.541%)" }} />
      </div>

      <div className="relative flex flex-col items-center gap-[15px]">
        <div className="relative flex w-[352px] items-center justify-center py-[7px]">
          <Corners />
          <h1
            className={`${gilroyMedium.className} w-[321px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic`}
            style={{ backgroundImage: "linear-gradient(100.882deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)" }}
          >
            A new paradigm for efficient AI compute
          </h1>
        </div>
        <p className={`${interRegular.className} w-[336px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic`}>
          We build energy-aware, programmable, mixed-signal AI processors that unlock orders-of-magnitude improvements in performance-per-watt, enabling scalable intelligence across edge, enterprise, and cloud.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------- RESOURCES -------------------------------- */
function ContactResourcesMobile() {
  return (
    <SectionWrap aria-label="Immediate resources" className="!py-[32px]">
      <div className="relative flex w-full flex-col gap-[20px] overflow-clip border-[0.5px] border-solid border-white/25 bg-gradient-to-b from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.03)] p-[24px] backdrop-blur-[16px]">
        <Corners />
        <p className={`${gilroyMedium.className} w-full text-center text-[22px] leading-[28px] font-medium text-white not-italic`}>
          Looking for immediate resources?
        </p>
        <div className="flex w-full flex-col gap-[20px]">
          <GreenCta href="#">Download Datasheets &amp; SDK</GreenCta>
          <WhiteCta href="#">Download Press Kit</WhiteCta>
          <WhiteCta href="#">Case Studies &amp; Whitepapers</WhiteCta>
        </div>
      </div>
    </SectionWrap>
  );
}

/* ---------------------------------- MAP ----------------------------------- */
const LOCATIONS = [
  {
    title: "USA Headquarters",
    address:
      "Ambient Scientific Inc. 4633 Old Ironsides Drive Santa Clara California 95054. USA",
  },
  {
    title: "Singapore Headquarters",
    address: "137 Telok Ayer Street, #05-02, Singapore 068602",
  },
  {
    title: "India Headquarters",
    address:
      "Ramky House, 1st Cross, Raghavendra Nagar, Kalyan Nagar, Bengaluru Karnataka, 560043, India",
  },
];

function ContactMapMobile() {
  return (
    <SectionWrap aria-label="Global offices">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <Image
          src="/contact/map-globe-bg.png"
          alt=""
          fill
          className="object-cover object-center opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative flex flex-col items-center gap-[12px]">
        <SectionTitle deg="101.272deg">Global scale. Local support.</SectionTitle>
        <p className={`${interRegular.className} max-w-[327px] text-center text-[14px] leading-[22px] font-normal text-[#f0f0f0] opacity-70 not-italic`}>
          From our research labs to your production line, we maintain direct
          engineering presence across three continents to ensure rapid
          deployment and ongoing support.
        </p>
      </div>

      <div className="relative mt-[28px] flex w-full flex-col gap-[14px]">
        {LOCATIONS.map((loc) => (
          <div
            key={loc.title}
            className="relative flex items-start gap-[14px] border-[0.5px] border-solid border-white/15 bg-[rgba(0,0,0,0.5)] p-[18px]"
          >
            <div className="relative flex size-[40px] shrink-0 items-center justify-center bg-gradient-to-b from-[#53d824] to-[#2c7213]">
              <Image
                src="/contact/location-icon.svg"
                alt=""
                width={22}
                height={22}
                className="size-[22px]"
                aria-hidden
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <p className={`${gilroyMedium.className} text-[17px] leading-[22px] font-medium text-white not-italic`}>
                {loc.title}
              </p>
              <p className={`${interRegular.className} text-[13px] leading-[19px] font-normal text-[#a4a4a4] not-italic`}>
                {loc.address}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrap>
  );
}

/* -------------------------------- SCHEDULE -------------------------------- */
const SCHEDULE_CARDS = [
  {
    tag: "Technical",
    title: "Talk to an FAE (Field Application Engineer)",
    description:
      "Book a 30-minute session with our engineers. Discuss power profiling, model quantization, or deployment architecture for your use case.",
    ctaLabel: "View FAE Calendar",
    imageSrc: "/contact/schedule-fae.png",
  },
  {
    tag: "Commercial",
    title: "Commercial Scaling & Enterprise",
    description:
      "Connect with Business Development to discuss pricing, ASIC development, timelines, licensing, or supply partnerships.",
    ctaLabel: "View Commercial Calendar",
    imageSrc: "/contact/schedule-commercial.png",
  },
];

function ContactScheduleMobile() {
  return (
    <SectionWrap aria-label="Schedule a Consultation">
      <div className="flex flex-col items-center gap-[12px]">
        <div className="relative flex w-[352px] items-center justify-center py-[7px]">
          <Corners />
          <h2
            className={`${gilroyMedium.className} w-[241px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic`}
            style={{ backgroundImage: "linear-gradient(100.882deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)" }}
          >
            Schedule a<br />Consultation
          </h2>
        </div>
        <p className={`${interRegular.className} w-[308px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-80 not-italic`}>
          Book a direct meeting with our engineering or commercial teams.
        </p>
      </div>

      <div className="mt-[28px] flex w-full flex-col gap-[14px]">
        {SCHEDULE_CARDS.map((card) => (
          <article
            key={card.title}
            className="relative flex flex-col gap-[14px] overflow-clip border-[0.5px] border-solid border-white/20 bg-[rgba(0,0,0,0.3)] p-[20px]"
          >
            <Corners />
            <div className="relative h-[130px] w-full overflow-hidden">
              <Image
                src={card.imageSrc}
                alt=""
                fill
                className="object-contain object-center"
                sizes="279px"
              />
            </div>
            <span className={`${dmMono.className} w-fit border-[0.5px] border-solid border-[rgba(240,240,240,0.5)] bg-[rgba(255,255,255,0.06)] px-[10px] py-[3px] text-[11px] uppercase tracking-[0.06em] text-[#ecfae5] not-italic`}>
              {card.tag}
            </span>
            <h3 className={`${gilroyMedium.className} text-[18px] leading-[24px] font-medium text-white not-italic`}>
              {card.title}
            </h3>
            <p className={`${interRegular.className} text-[13px] leading-[20px] font-normal text-white opacity-65 not-italic`}>
              {card.description}
            </p>
            <div className="relative flex items-center gap-[8px]">
              <Image src="/contact/calendar-icon.svg" alt="" width={18} height={18} className="size-[18px]" aria-hidden />
              <a
                href="#"
                className={`${interSemiBold.className} text-[13px] leading-[normal] font-semibold uppercase whitespace-nowrap text-[#53d824] not-italic`}
              >
                {card.ctaLabel}
              </a>
            </div>
          </article>
        ))}
      </div>
    </SectionWrap>
  );
}

/* ---------------------------------- FORM ---------------------------------- */
type TrackId = "sales" | "developer" | "media";

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

function ContactFormMobile() {
  const [activeTrackId, setActiveTrackId] = useState<TrackId>("sales");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <SectionWrap aria-label="Contact form" className="!pb-[80px]">
      <div className="flex flex-col items-center gap-[12px]">
        <SectionTitle deg="119.522deg">Prefer to write to us?</SectionTitle>
        <p className={`${interRegular.className} max-w-[327px] text-center text-[14px] leading-[22px] font-normal text-[#f0f0f0] opacity-70 not-italic`}>
          Select your track below to ensure your message reaches the right desk
          immediately.
        </p>
      </div>

      {/* Track selector */}
      <div className="mt-[24px] flex w-full flex-col gap-[10px]">
        {TRACKS.map((track) => {
          const selected = activeTrackId === track.id;
          return (
            <button
              key={track.id}
              type="button"
              onClick={() => setActiveTrackId(track.id)}
              aria-pressed={selected}
              className={`relative flex items-start gap-[14px] p-[16px] text-left transition-colors ${
                selected
                  ? "border-[1.5px] border-solid border-[rgba(83,216,36,0.4)] bg-[rgba(46,119,20,0.2)]"
                  : "border-[0.5px] border-solid border-white/15 bg-[rgba(0,0,0,0.25)]"
              }`}
            >
              <div className="relative size-[28px] shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={track.icon}
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
      <div className="relative mt-[20px] w-full overflow-clip border-[1.5px] border-solid border-[rgba(83,216,36,0.25)] bg-[rgba(46,119,20,0.15)] p-[20px]">
        <Corners />
        <p className={`${gilroyMedium.className} mb-[16px] text-[20px] leading-[26px] font-medium text-white not-italic`}>
          Drop Us a Message
        </p>

        <div className="flex flex-col gap-[14px]">
          {FORM_FIELDS.map((field) => (
            <div key={field.label} className="flex flex-col gap-[6px]">
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
              How can we help?
            </label>
            <textarea
              placeholder="Describe your use case, technical requirements, or business needs..."
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
              Sign up for news &amp; updates
            </span>
          </label>

          <GreenCta href="#">Send Message</GreenCta>
        </div>
      </div>
    </SectionWrap>
  );
}

/* --------------------------------- PAGE ----------------------------------- */
export function ContactMobile() {
  return (
    <div className="flex w-full flex-col">
      <ContactHeroMobile />
      <ContactResourcesMobile />
      <ContactMapMobile />
      <ContactScheduleMobile />
      <ContactFormMobile />
    </div>
  );
}
