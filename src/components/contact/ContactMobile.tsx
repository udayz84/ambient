"use client";

import Image from "next/image";
import { useState } from "react";
import { dmMono, gilroyMedium, gilroySemiBold, interLight, interRegular, interSemiBold } from "../hero/fonts";
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
            src="/mobile/contact/hand.png"
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
              <span className="block leading-[36px]">Start building</span>
              <span className="block leading-[36px]">with Ambient</span>
            </h1>
          </div>
          <p
            className={`${interRegular.className} w-[308px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-80 not-italic`}
            data-node-id="3229:7787"
          >
            Skip the generic sales inbox. Get direct access to our engineering team, technical documentation, and commercial partners.
          </p>
        </div>

        {/* resources article — top 449, overlaps lower part of hand image */}
        <div
          className="absolute left-[20px] right-[20px] flex flex-col gap-[20px] overflow-clip border-[0.5px] border-solid border-white/25 bg-gradient-to-b from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.03)] p-[24px] backdrop-blur-[16px]"
          style={{ top: 449 }}
          data-node-id="3229:8713"
          data-name="Article"
        >
          <Corners />
          <p
            className={`${gilroyMedium.className} w-full text-center text-[22px] leading-[28px] font-medium text-white not-italic`}
            data-node-id="3229:8716"
          >
            Looking for immediate resources?
          </p>
          <div className="flex w-full flex-col gap-[20px]">
            <GreenCta href="#">Download Datasheets &amp; SDK</GreenCta>
            <WhiteCta href="#">Download Press Kit</WhiteCta>
            <WhiteCta href="#">Case Studies &amp; Whitepapers</WhiteCta>
          </div>
        </div>
      </div>
    </section>
  );
}

function LocationCard({ title, address, align }: { title: string, address: string, align: "left" | "right" }) {
  return (
    <div className={`relative flex items-center p-[10px] pr-[16px] gap-[16px] bg-[#0a1105] border-[0.5px] border-[rgba(255,255,255,0.15)] overflow-hidden w-[343px] h-[107px] ${align === "right" ? "flex-row-reverse text-right" : ""}`}>
      <Corners />
      <div className="relative flex w-[68px] h-[70px] shrink-0 items-center justify-center bg-gradient-to-b from-[#53d824] to-[#2c7213]">
        <Image
          src="/contact/location-icon.svg"
          alt=""
          width={24}
          height={24}
          className="size-[24px]"
          aria-hidden
        />
      </div>
      <div className={`flex flex-col gap-[4px] flex-1 ${align === "right" ? "items-end" : "items-start"}`}>
        <p className={`${gilroyMedium.className} text-[18px] leading-[22px] font-medium text-white not-italic`}>
          {title}
        </p>
        <p className={`${interRegular.className} text-[13px] leading-[18px] font-normal text-[#a4a4a4] not-italic`}>
          {address}
        </p>
      </div>
    </div>
  );
}

function ContactMapMobile() {
  return (
    <SectionWrap aria-label="Global offices" className="!px-0 !py-0 h-[939px] w-full max-w-[393px] mx-auto overflow-hidden bg-black relative">
      {/* Background Globe Image */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 w-[1440px] h-[1002px] -translate-x-1/2" aria-hidden>
        <Image
          src="/contact/Globe image.png"
          alt=""
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
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
              Global scale.<br />Local support.
            </h2>
          </div>
          <p className={`${interRegular.className} w-[316px] text-center text-[14px] leading-[16px] font-normal text-[#f0f0f0] opacity-65 not-italic`}>
            From our research labs to your production line, we maintain direct
            engineering presence across three continents to ensure rapid
            deployment and ongoing support.
          </p>
        </div>

        {/* Lines and Cards Container */}
        <div className="absolute top-[0px] left-0 w-full h-full pointer-events-none">
          {/* USA Line */}
          <div className="absolute top-[259px] left-[21px] w-[1.5px] h-[381px] bg-gradient-to-b from-[rgba(83,216,36,0.6)] to-transparent">
            <div className="absolute bottom-0 left-1/2 size-[8px] -translate-x-1/2 rotate-45 bg-[#53d824] shadow-[0_0_12px_#53d824]" />
          </div>

          {/* Singapore Line */}
          <div className="absolute top-[479px] left-[354px] w-[1.5px] h-[202px] bg-gradient-to-b from-[rgba(83,216,36,0.6)] to-transparent">
            <div className="absolute bottom-0 left-1/2 size-[8px] -translate-x-1/2 rotate-45 bg-[#53d824] shadow-[0_0_12px_#53d824]" />
          </div>

          {/* India Line */}
          <div className="absolute top-[760px] left-[312px] w-[1.5px] h-[119px] bg-gradient-to-b from-[rgba(83,216,36,0.6)] to-transparent">
            <div className="absolute bottom-0 left-1/2 size-[8px] -translate-x-1/2 rotate-45 bg-[#53d824] shadow-[0_0_12px_#53d824]" />
          </div>

          {/* USA Card */}
          <div className="absolute top-[240px] left-[20px] pointer-events-auto">
            <LocationCard
              title="USA Headquarters"
              address="Ambient Scientific Inc. 4633 Old Ironsides Drive Santa Clara California 95054. USA"
              align="left"
            />
          </div>

          {/* Singapore Card */}
          <div className="absolute top-[380px] left-[29px] pointer-events-auto">
            <LocationCard
              title="Singapore Headquarters"
              address="137 Telok Ayer Street, #05-02, Singapore 068602"
              align="right"
            />
          </div>

          {/* India Card */}
          <div className="absolute top-[740px] left-[20px] pointer-events-auto">
            <LocationCard
              title="India Headquarters"
              address="Ramky House, 1st Cross, Raghavendra Nagar, Kalyan Nagar, Bengaluru Karnataka, 560043, India"
              align="left"
            />
          </div>
        </div>
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
      <div className="flex flex-col items-center gap-[10px] w-[350px]">
        <div className="relative flex w-full items-center justify-center py-[7px]">
          <Corners />
          <h2
            className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic`}
            style={{ backgroundImage: "linear-gradient(107.454deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)" }}
          >
            Schedule a Consultation
          </h2>
        </div>
        <p className={`${interRegular.className} w-[min-content] min-w-full text-center text-[14px] leading-[16px] font-normal text-[#f0f0f0] opacity-65 not-italic`}>
          Book a direct meeting with our engineering or commercial teams.
        </p>
      </div>

      <div className="mt-[24px] flex w-[353px] flex-col gap-[24px]">
        {SCHEDULE_CARDS.map((card) => {
          const isCommercial = card.tag === "Commercial";
          return (
            <article
              key={card.title}
              className="relative flex flex-col h-[361px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.2)] pt-[16px] px-[16px] pb-[24px]"
            >
              <Corners />

              {isCommercial ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={card.imageSrc}
                  alt=""
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "101%",
                    left: "33px",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    color: "transparent",
                  }}
                  className="z-0 pointer-events-none object-contain object-right-bottom"
                />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={card.imageSrc}
                  alt=""
                  style={{
                    position: "absolute",
                    height: "69%",
                    width: "98%",
                    left: 0,
                    top: "113px",
                  }}
                  className="z-0 pointer-events-none object-contain object-right-bottom"
                />
              )}

              <div className="flex flex-col items-start gap-[20px] w-full relative z-10 pointer-events-none">
                <div className="relative flex h-[26px] w-[180px] items-center justify-center overflow-clip bg-[rgba(255,255,255,0.06)] pointer-events-auto">
                  <Corners />
                  <span className={`${dmMono.className} text-[13px] leading-[19.5px] uppercase tracking-[-0.03em] text-[#ecfae5] not-italic`}>
                    {card.tag}
                  </span>
                  <div className="absolute left-[6.48px] top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
                  <div className="absolute left-[170.48px] top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
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
                href="#"
                className={`mt-[24px] relative flex items-center justify-center gap-[8px] px-[31px] py-[14px] drop-shadow-[0px_24.721px_16.129px_rgba(255,255,255,0.15),0px_10.268px_6.699px_rgba(255,255,255,0.15),0px_3.714px_2.423px_rgba(255,255,255,0.1)] z-10 ${isCommercial ? "w-[218px]" : "w-[178px]"}`}
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
      <ContactScheduleMobile />
      <ContactMapMobile />
      <ContactFormMobile />
    </div>
  );
}
