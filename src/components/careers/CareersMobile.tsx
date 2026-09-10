"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  dmMono,
  gilroyMedium,
  gilroySemiBold,
  interMedium,
  interRegular,
  interSemiBold,
} from "../hero/fonts";
import { Corners } from "../shared/Corners";
import {
  CARD_GRADIENT_BG,
  GLASS_PANEL_VISIBLE_BORDER_CLASS,
} from "./careers-shared";
import { mediaUrl } from "@/lib/strapi";
import type { CareersValueCard } from "./careers-data";
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
      className={`${interSemiBold.className} relative flex h-[48px] w-full items-center justify-center ${GREEN_CTA_SHADOW}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)] rounded-[inherit]"
      />
      <span className="relative z-10 text-[14px] leading-[normal] font-semibold uppercase whitespace-nowrap text-white not-italic">
        {children}
      </span>
      
      {/* Custom Corners that pop out slightly to avoid the inset shadow */}
      <div className="pointer-events-none absolute -top-[0.5px] right-0 z-20 flex size-[4px] items-center justify-center">
        <div className="rotate-180 flex-none">
          <div className="relative size-[4px]">
            <img loading="lazy" decoding="async" src="/careers/corner-menu-tr.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute -top-[0.5px] left-0 z-20 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <img loading="lazy" decoding="async" src="/careers/corner-menu-tl.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute right-0 bottom-0 z-20 flex size-[4px] items-center justify-center">
        <div className="-scale-x-100 flex-none">
          <div className="relative size-[4px]">
            <img loading="lazy" decoding="async" src="/careers/corner-menu-tr.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 z-20 flex size-[4px] items-center justify-center">
        <div className="flex-none">
          <div className="relative size-[4px]">
            <img loading="lazy" decoding="async" src="/careers/corner-menu-tl.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
          </div>
        </div>
      </div>
    </a>
  );
}

function WhiteCta({ children, href = "#" }: { children: React.ReactNode; href?: string }) {
  return (
    <a
      href={href}
      className={`${interSemiBold.className} relative flex h-[48px] w-full items-center justify-center shadow-[0px_24.721px_16.129px_rgba(255,255,255,0.15)]`}
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-white" />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-plus-lighter"
        style={{ backgroundImage: "url(/careers/white-cta-texture.png)", backgroundSize: "307.2px 307.2px" }}
      />
      <span className="relative z-10 text-[14px] leading-[normal] font-semibold uppercase whitespace-nowrap text-[#121212] not-italic">
        {children}
      </span>
      
      {/* Custom Corners that pop out slightly to avoid the inset shadow */}
      <div className="pointer-events-none absolute -top-[0.5px] right-0 z-20 flex size-[4px] items-center justify-center">
        <div className="rotate-180 flex-none">
          <div className="relative size-[4px]">
            <img loading="lazy" decoding="async" src="/careers/corner-menu-tr.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute -top-[0.5px] left-0 z-20 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <img loading="lazy" decoding="async" src="/careers/corner-menu-tl.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute right-0 bottom-0 z-20 flex size-[4px] items-center justify-center">
        <div className="-scale-x-100 flex-none">
          <div className="relative size-[4px]">
            <img loading="lazy" decoding="async" src="/careers/corner-menu-tr.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 z-20 flex size-[4px] items-center justify-center">
        <div className="flex-none">
          <div className="relative size-[4px]">
            <img loading="lazy" decoding="async" src="/careers/corner-menu-tl.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
          </div>
        </div>
      </div>
    </a>
  );
}

/* ---------------------------------- HERO ---------------------------------- */
function CareersHeroMobile({ data }: { data?: any }) {
  const bgImg = mediaUrl(data?.background_image);
  const title = (data?.title || "").replace(/\n/g, " ");
  const subtitle = data?.subtitle || "";
  const ctaLabel = data?.cta_label || "";
  const ctaHref = data?.cta_href || "";

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      aria-label="Careers hero"
    >
      {/* Banner (Figma 3243:333 — 393×557 source of truth). pt-[78px] clears the sticky navbar. */}
      <div className="relative mx-auto w-full pt-[78px]">
        <div className="relative mx-auto h-[557px] w-full">
          {/* image 105 (3243:3928) — full brightness, bleeds off both edges */}
          <div className="pointer-events-none absolute left-[calc(50%-76px)] top-[188px] h-[290px] w-[545px] max-w-none -translate-x-1/2 overflow-hidden">
            {bgImg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async"
                src={bgImg}
                alt={data?.alt || ""}
                className="absolute inset-0 size-full max-w-none object-cover"
              />
            ) : null}
          </div>

          {/* Content (3243:335) — title + subtitle */}
          <div className="absolute left-[20px] top-[32px] flex w-[calc(100%-40px)] flex-col items-center gap-[15px]">
            <div className="relative inline-flex flex-col items-center justify-center px-[16px] py-[8px]">
              <h1
                className={`${gilroyMedium.className} max-w-[273px] w-full bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic`}
                style={{ backgroundImage: gradient("103.779deg") }}
              >
                {title}
              </h1>
              <GreenCtaCorners />
            </div>
            <p
              className={`${interRegular.className} max-w-[308px] w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic`}
            >
              {subtitle}
            </p>
          </div>

          {/* Cta (3243:3942) */}
          <div className="absolute left-1/2 top-[489px] w-[231px] -translate-x-1/2">
            <GreenCta href={ctaHref}>
              <span className="flex items-center gap-[8px]">
                <span className="text-[12px]">{ctaLabel}</span>
                <span className="block size-[6px] rounded-full bg-white" />
              </span>
            </GreenCta>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- BEST WORK ------------------------------- */
function CareersBestWorkMobile({ data }: { data?: any }) {
  const headingRaw = data?.heading || "";
  const heading = headingRaw.split("\n").length > 1 ? headingRaw : headingRaw;
  const cards: CareersValueCard[] = (
    Array.isArray(data?.cards) ? data.cards : []
  ).map((c: any) => ({
    icon: mediaUrl(c?.icon) || "",
    title: c?.title || "",
    description: c?.description || "",
  }));

  return (
    <section
      className="relative flex w-full flex-col items-center px-[20px] py-[56px]"
      aria-label="Do the best work of your life"
    >
      <div className="relative inline-flex flex-col items-center justify-center mb-[24px]">
        <h2
          className={`${gilroyMedium.className} w-[350px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent whitespace-pre-wrap not-italic`}
          style={{ backgroundImage: gradient("107.454deg") }}
        >
          {heading}
        </h2>
        <Corners leftSrc="/careers/corner-menu-tl.svg" rightSrc="/careers/corner-menu-tr.svg" />
      </div>

      <div className="flex w-full flex-col gap-[14px]">
        {cards.map((card, index) => (
          <article
            key={`best-work-mobile-${index}`}
            className={`relative flex flex-col justify-between h-[236px] p-[32px] ${GLASS_PANEL_VISIBLE_BORDER_CLASS}`}
            style={{
              backgroundImage:
                "linear-gradient(rgba(83, 216, 36, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%), linear-gradient(90deg, rgba(21, 21, 21, 0.3) 0%, rgba(21, 21, 21, 0.3) 100%)",
            }}
          >
            <Corners leftSrc="/careers/corner-menu-tl.svg" rightSrc="/careers/corner-menu-tr.svg" />

            <div className="relative size-[36px] shrink-0">
              {card.icon ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async"
                  alt=""
                  src={card.icon}
                  className="absolute inset-0 size-full object-contain"
                />
              ) : null}
            </div>
            
            <div className="flex flex-col gap-[10px]">
              <p
                className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium text-white not-italic`}
              >
                {card.title}
              </p>
              <p
                className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-white opacity-65 not-italic`}
              >
                {card.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------- DNA ---------------------------------- */
function CareersDnaMobile({ data }: { data?: any }) {
  const heading = data?.heading || "";
  const subtitle = data?.subtitle || "";
  const bgImg = "/mobile/career/image 108.webp";
  const chipImg = mediaUrl(data?.mobile_chip_object) || mediaUrl(data?.chip_object);
  const strapiPanels: any[] =
    data?.panels && Array.isArray(data.panels) ? data.panels : [];
  const panels = strapiPanels.map((p: any) => ({
    title: p?.title || "",
    description: p?.description || "",
  }));
  // Pad panels to 5 to match designed DNA section layout (uses indices 0..4)
  while (panels.length < 5) {
    panels.push({ title: "", description: "" });
  }

  return (
    <section
      className="relative flex w-full flex-col items-center px-[19px] py-[56px] bg-black"
      aria-label="Driven by physics. Defined by our DNA."
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async"
          src={bgImg}
          alt=""
          className="absolute inset-0 size-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_100%)]" />
      </div>
      <div className="relative flex flex-col items-center justify-center mb-[47px] gap-[10px]">
        <div className="relative inline-flex flex-col items-center justify-center">
          <h2
            className={`${gilroyMedium.className} w-[350px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent whitespace-pre-wrap not-italic`}
            style={{ backgroundImage: gradient("107.454deg") }}
          >
            {heading}
          </h2>
          <Corners leftSrc="/careers/corner-menu-tl.svg" rightSrc="/careers/corner-menu-tr.svg" />
        </div>
        <p
          className={`${interRegular.className} w-[334px] text-center text-[14px] leading-[16px] font-normal text-[#f0f0f0] not-italic`}
        >
          {subtitle}
        </p>
      </div>

      <div className="relative flex w-full flex-col gap-[47px] items-center">
        <div className="flex w-full flex-col gap-[14px]">
          <GlassPanelMobile title={panels[0].title} description={panels[0].description} />
          <GlassPanelMobile title={panels[1].title} description={panels[1].description} />
        </div>

        <div className="relative flex h-[349px] w-[336px] shrink-0 items-center justify-center">
          {chipImg ? (
            <Image
              src={chipImg}
              alt={data?.mobile_chip_object_alt || data?.chip_object_alt || ""}
              fill
              className="object-contain object-center relative z-10"
              sizes="336px"
            />
          ) : null}
        </div>

        <div className="flex w-full flex-col gap-[14px]">
          <GlassPanelMobile title={panels[2].title} description={panels[2].description} />
          <GlassPanelMobile title={panels[3].title} description={panels[3].description} />
          <GlassPanelMobile title={panels[4].title} description={panels[4].description} />
        </div>
      </div>
    </section>
  );
}

function GlassPanelMobile({ title, description }: { title: string; description: string }) {
  return (
    <div
      className={`relative flex w-full flex-col gap-[10px] min-h-[156px] pt-[18px] pb-[28px] px-[20px] bg-[rgba(21,21,21,0.3)] ${GLASS_PANEL_VISIBLE_BORDER_CLASS}`}
    >
      <Corners leftSrc="/careers/corner-menu-tl.svg" rightSrc="/careers/corner-menu-tr.svg" />
      <p
        className={`${gilroyMedium.className} text-[20px] leading-[28px] font-medium text-white not-italic`}
      >
        {title}
      </p>
      <p
        className={`${interRegular.className} text-[14px] leading-[20px] font-normal text-white opacity-65 not-italic`}
      >
        {description}
      </p>
    </div>
  );
}

/* -------------------------------- OPEN ROLES ------------------------------ */
function CareersOpenRolesMobile({ data }: { data?: any }) {
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const heading = data?.heading || "";
  const generalAppTitle = data?.general_app_title || "";
  const generalAppSubtitle = data?.general_app_subtitle || "";
  const generalAppCtaLabel = data?.general_app_cta_label || "";
  const applyButtonLabel = data?.apply_button_label || "";

  const jobs: ReadonlyArray<any> = Array.isArray(data?.fetchedJobs)
    ? data.fetchedJobs
    : [];

  // Build Job Type options from dynamic categories if available
  const jobTypeOptions = data?.fetchedCategories?.length
    ? [
        { value: "all", label: "All" },
        ...data.fetchedCategories.map((c: any) => ({
          value: c.name?.toLowerCase().replace(/\s+/g, "_") || "unknown",
          label: c.name || "Unknown",
        })),
      ]
    : [{ value: "all", label: "All" }];

  // Build location options from the jobs list dynamically
  const uniqueLocations = Array.from(
    new Set(jobs.map((j: any) => j.location).filter(Boolean)),
  );
  const locationOptions = uniqueLocations.length
    ? [
        { value: "all", label: "All" },
        ...uniqueLocations.map((loc) => ({
          value: String(loc).toLowerCase().replace(/\s+/g, "_"),
          label: String(loc)
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
        })),
      ]
    : [{ value: "all", label: "All" }];

  const filteredJobs = useMemo(
    () =>
      jobs.filter((job: any) => {
        const norm = (s: string) =>
          String(s || "").toLowerCase().replace(/\s+/g, "_");
        const jobCategory =
          typeof job.category === "object" && job.category !== null
            ? job.category.name
            : job.category;
        const categoryValue = norm(jobCategory);
        if (jobTypeFilter !== "all" && categoryValue !== norm(jobTypeFilter))
          return false;
        const locValue = norm(job.location);
        if (locationFilter !== "all" && locValue !== norm(locationFilter))
          return false;
        return true;
      }),
    [jobTypeFilter, locationFilter, jobs],
  );

  return (
    <section
      id="open-roles"
      className="relative flex w-full scroll-mt-[90px] flex-col items-center px-[20px] py-[56px]"
      aria-label="Open Roles"
    >
      <div className="relative flex flex-col items-center gap-[15px] mb-[37px]">
        <div className="relative inline-flex items-center justify-center">
          <h2
            className={`${gilroyMedium.className} w-[350px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent whitespace-pre-wrap not-italic`}
            style={{ backgroundImage: gradient("129.227deg") }}
          >
            {heading}
          </h2>
          <Corners leftSrc="/careers/corner-menu-tl.svg" rightSrc="/careers/corner-menu-tr.svg" />
        </div>
        <div className="flex w-full gap-[6px] justify-center">
          <FilterSelect
            label="Job Type"
            value={jobTypeFilter}
            onChange={setJobTypeFilter}
            options={jobTypeOptions}
          />
          <FilterSelect
            label="Location"
            value={locationFilter}
            onChange={setLocationFilter}
            options={locationOptions}
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-[12px]">
        {filteredJobs.length === 0 ? (
          <div className="flex h-[120px] items-center justify-center">
            <p
              className={`${interRegular.className} text-[16px] font-normal text-white opacity-60 not-italic`}
            >
              No jobs found
            </p>
          </div>
        ) : (
          filteredJobs.map((job: any, index: number) => (
            <JobRowMobile
              key={job.title}
              title={job.title}
              category={job.category}
              location={job.location}
              applyUrl={job.apply_url}
              applyLabel={applyButtonLabel}
              isActive={index === 0}
            />
          ))
        )}
      </div>

      <div className="relative mt-[24px] w-full max-w-[353px] p-[1px]">
        {/* Outer container with clip-path and border gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[rgba(255,255,255,0.3)] to-[rgba(255,255,255,0.05)] shadow-[0px_0px_20px_0px_rgba(83,216,36,0.15)]"
          style={{ clipPath: "polygon(14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(50% - 20px), calc(100% - 10px) calc(50% - 10px), calc(100% - 10px) calc(50% + 10px), 100% calc(50% + 20px), 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px), 0 calc(50% + 20px), 10px calc(50% + 10px), 10px calc(50% - 10px), 0 calc(50% - 20px), 0 14px)" }}
        />
        
        {/* Inner container */}
        <div 
          className="relative flex w-full flex-col items-center bg-black/60 backdrop-blur-xl px-[20px] py-[40px]"
          style={{ clipPath: "polygon(14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(50% - 20px), calc(100% - 10px) calc(50% - 10px), calc(100% - 10px) calc(50% + 10px), 100% calc(50% + 20px), 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px), 0 calc(50% + 20px), 10px calc(50% + 10px), 10px calc(50% - 10px), 0 calc(50% - 20px), 0 14px)" }}
        >
          {/* Subtle green glow wash */}
          <div className="pointer-events-none absolute inset-0 bg-[rgba(83,216,36,0.06)]" aria-hidden />

          {/* Text content wrapped with Corners */}
          <div className="relative inline-flex flex-col items-center justify-center px-[8px] py-[8px]">
            <Corners leftSrc="/careers/corner-menu-tl.svg" rightSrc="/careers/corner-menu-tr.svg" />
            <p
              className={`${gilroyMedium.className} w-[280px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic`}
              style={{ backgroundImage: "linear-gradient(103.604deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)" }}
            >
              {generalAppTitle}
            </p>
          </div>

          <p
            className={`${interRegular.className} relative z-10 mt-[16px] w-full max-w-[300px] text-center text-[14px] leading-[22px] font-normal text-white opacity-65 not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden`}
          >
            {generalAppSubtitle}
          </p>

          <a
            href="#"
            className="relative z-10 mt-[32px] flex h-[37px] w-[241px] shrink-0 items-center justify-center gap-[10px] overflow-clip bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
            style={{ boxShadow: "0px 32.385px 82.505px 0px rgba(69,196,24,0.2), 0px 19.062px 24.872px 0px rgba(83,216,36,0.15), 0px 7.918px 10.331px 0px rgba(83,216,36,0.15), 0px 2.864px 3.737px 0px rgba(83,216,36,0.1)" }}
          >
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_18px_2px_rgba(217,255,240,0.6)]" />
            <span className={`${gilroyMedium.className} relative z-10 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[12px] leading-[24px] uppercase text-white not-italic`}>
              {generalAppCtaLabel}
            </span>
            <div className="relative z-10 size-[4px] shrink-0 rounded-full bg-white" />
          </a>
        </div>
      </div>
    </section>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
}) {
  return (
    <div
      className="relative flex h-[48px] w-[174px] shrink-0 items-center bg-[rgba(0,0,0,0)] border border-solid border-[rgba(240,240,240,0.2)]"
    >
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`${interRegular.className} h-full w-full cursor-pointer appearance-none bg-transparent px-[20px] pr-[36px] text-[14px] leading-[1.4] font-normal text-white not-italic`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-black text-white">
            {option.value === "all" ? `${label}` : option.label}
          </option>
        ))}
      </select>
      <Image
        src="/careers/chevron-down.svg"
        alt=""
        width={24}
        height={24}
        className="pointer-events-none absolute right-[20px] size-[24px]"
        aria-hidden
      />
    </div>
  );
}

function JobRowMobile({
  title,
  category,
  location,
  applyUrl,
  applyLabel,
  isActive = false,
}: {
  title: string;
  category: string;
  location: string;
  applyUrl?: string;
  applyLabel: string;
  isActive?: boolean;
}) {
  return (
    <article className="relative flex h-[191px] w-full flex-col justify-center gap-[15px] border border-[rgba(240,240,240,0.2)] bg-black px-[17px]">
      <div className="flex flex-col gap-[11px] w-full">
        <div className="relative inline-flex h-[26px] w-fit items-center justify-center overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.5)] bg-[rgba(255,255,255,0.06)] px-[12px]">
          <GreenCtaCorners />
          <div className="absolute left-[6px] top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
          <div className="absolute right-[6px] top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
          <span
            className={`${dmMono.className} text-[13px] leading-[19.5px] uppercase text-[#ecfae5] not-italic`}
          >
            {category}
          </span>
        </div>
        <div className="flex flex-col w-full">
          <p
            className={`${gilroyMedium.className} text-[16px] leading-[28px] text-white not-italic mb-[-4px]`}
          >
            {title}
          </p>
          <p
            className={`${interRegular.className} text-[14px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic`}
          >
            {location}
          </p>
        </div>
      </div>
      
      <a
        href={applyUrl || "#"}
        className="relative flex h-[48px] w-[161px] shrink-0 items-center justify-center gap-[8px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] px-[20px] py-[10px]"
      >
        <Corners leftSrc="/careers/corner-menu-tl.svg" rightSrc="/careers/corner-menu-tr.svg" />
        
        {isActive ? (
          <>
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
              style={{ boxShadow: "0px 42px 107px 0px rgba(69,196,24,0.2), 0px 24.721px 32.257px 0px rgba(83,216,36,0.15), 0px 10.268px 13.398px 0px rgba(83,216,36,0.15), 0px 3.714px 4.846px 0px rgba(83,216,36,0.1)" }}
            />
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_1px_18px_2px_rgba(217,255,240,0.6)]" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[rgba(226,241,202,0.12)]" />
        )}

        <span className={`${gilroyMedium.className} relative z-10 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[14px] leading-[28px] uppercase text-white not-italic`}>
          {applyLabel}
        </span>
        <div className="relative z-10 flex h-[6px] w-[12px] items-center justify-center shrink-0">
          <Image
            src="/careers/chevron-apply.svg"
            alt=""
            fill
            className="object-contain"
            aria-hidden
          />
        </div>
      </a>
    </article>
  );
}

/* -------------------------------- BENEFITS -------------------------------- */
function CareersBenefitsMobile({ data }: { data?: any }) {
  const heading = data?.heading || "";
  const cards: CareersValueCard[] = (
    Array.isArray(data?.cards) ? data.cards : []
  ).map((c: any) => ({
    icon: mediaUrl(c?.icon) || "",
    title: c?.title || "",
    description: c?.description || "",
  }));

  return (
    <section
      className="relative flex w-full flex-col items-center gap-[24px] px-[20px] py-[56px]"
      aria-label="Benefits and Perks"
    >
      <div className="relative inline-flex items-center justify-center p-[8px]">
        <h2
          className={`${gilroyMedium.className} w-[350px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic`}
          style={{ backgroundImage: gradient("122.163deg") }}
        >
          {heading}
        </h2>
        <GreenCtaCorners />
      </div>

      <div className="flex w-full flex-col gap-[14px]">
        {cards.map((card, index) => (
          <article
            key={`benefit-mobile-${index}`}
            className={`relative flex h-[222px] w-full max-w-[353px] flex-col justify-between items-start p-[32px] mx-auto overflow-clip ${GLASS_PANEL_VISIBLE_BORDER_CLASS}`}
            style={{
              backgroundImage:
                "linear-gradient(rgba(83, 216, 36, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%), linear-gradient(90deg, rgba(21, 21, 21, 0.3) 0%, rgba(21, 21, 21, 0.3) 100%)",
            }}
          >
            <Corners leftSrc="/careers/corner-menu-tl.svg" rightSrc="/careers/corner-menu-tr.svg" />

            <div className="relative size-[36px] shrink-0">
              {card.icon ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async"
                  alt=""
                  src={card.icon}
                  className="absolute inset-0 size-full object-contain"
                />
              ) : null}
            </div>
            
            <div className="flex flex-col gap-[10px] w-full mt-auto">
              <p
                className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium text-white not-italic`}
              >
                {card.title}
              </p>
              <p
                className={`${interRegular.className} text-[14px] leading-[20px] font-normal text-white opacity-65 not-italic`}
              >
                {card.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- BOTTOM CTA ------------------------------- */
function CareersBottomCtaMobile({ data }: { data?: any }) {
  const heading = data?.heading || "";
  const buttons: Array<{ label: string; href: string; variant: string }> =
    Array.isArray(data?.buttons)
      ? data.buttons.map((b: any) => ({
          label: b?.label || "",
          href: b?.href || "",
          variant: b?.variant || "primary",
        }))
      : [];

  return (
    <section
      className="relative z-10 flex w-full flex-col items-center gap-[42px] overflow-visible bg-transparent px-[17.5px] pt-[110px] -mb-[226px]"
      aria-label="Ready to build the future of compute"
    >
      <div className="relative z-10 inline-flex items-center justify-center p-[8px]">
        <h2
          className={`${gilroyMedium.className} w-[319px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic`}
          style={{ backgroundImage: "linear-gradient(105.99deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)" }}
        >
          {heading}
        </h2>
        <Corners leftSrc="/careers/corner-menu-tl.svg" rightSrc="/careers/corner-menu-tr.svg" />
      </div>

      <div className="relative z-10 flex w-full max-w-[354px] flex-row justify-center gap-[14px]">
        {buttons.map((btn, i) =>
          btn.variant === "secondary" || btn.variant === "ghost" ? (
            <a
              key={i}
              href={btn.href}
              className={`${gilroySemiBold.className} relative flex h-[48px] w-[170px] shrink-0 items-center justify-center overflow-clip bg-white`}
              style={{ boxShadow: "0px 42px 107px 0px rgba(69,196,24,0.2), 0px 24.721px 32.257px 0px rgba(83,216,36,0.15), 0px 10.268px 13.398px 0px rgba(83,216,36,0.15), 0px 3.714px 4.846px 0px rgba(83,216,36,0.1)" }}
            >
              <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-plus-lighter" style={{ backgroundImage: "url(/careers/white-cta-texture.png)", backgroundSize: "307.2px 307.2px" }} />
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]" />
              <span className="relative z-10 max-w-full overflow-hidden text-ellipsis text-[14px] uppercase text-[#121212] not-italic whitespace-nowrap font-semibold">
                {btn.label}
              </span>
            </a>
          ) : (
            <a
              key={i}
              href={btn.href}
              className={`${gilroySemiBold.className} relative flex h-[48px] w-[170px] shrink-0 items-center justify-center gap-[10px] overflow-clip bg-gradient-to-b from-[#6ced3f] to-[#38a612]`}
              style={{ boxShadow: "0px 42px 107px 0px rgba(69,196,24,0.2), 0px 24.721px 32.257px 0px rgba(83,216,36,0.15), 0px 10.268px 13.398px 0px rgba(83,216,36,0.15), 0px 3.714px 4.846px 0px rgba(83,216,36,0.1)" }}
            >
              <GreenCtaCorners />
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]" />
              <span className="relative z-10 max-w-full overflow-hidden text-ellipsis text-[14px] uppercase text-white not-italic whitespace-nowrap font-semibold">
                {btn.label}
              </span>
              <div className="relative z-10 size-[6px] shrink-0 rounded-full bg-white" />
            </a>
          ),
        )}
      </div>
    </section>
  );
}

/* --------------------------------- PAGE ----------------------------------- */
export function CareersMobile({ data }: { data?: any }) {
  return (
    <div className="flex w-full flex-col">
      {data?.hero ? <CareersHeroMobile data={data.hero} /> : null}
      {data?.best_work ? <CareersBestWorkMobile data={data.best_work} /> : null}
      {data?.dna ? <CareersDnaMobile data={data.dna} /> : null}
      {data?.open_roles ? <CareersOpenRolesMobile data={data.open_roles} /> : null}
      {data?.benefits ? <CareersBenefitsMobile data={data.benefits} /> : null}
      {data?.bottom_cta ? <CareersBottomCtaMobile data={data.bottom_cta} /> : null}
    </div>
  );
}
