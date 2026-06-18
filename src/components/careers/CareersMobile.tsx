"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  dmMono,
  gilroyMedium,
  interMedium,
  interRegular,
  interSemiBold,
} from "../hero/fonts";
import { Corners } from "../shared/Corners";
import {
  CARD_GRADIENT_BG,
  GLASS_PANEL_VISIBLE_BORDER_CLASS,
} from "./careers-shared";
import {
  CAREERS_BENEFITS_CARDS,
  CAREERS_JOBS,
  CAREERS_JOB_TYPE_FILTER_OPTIONS,
  CAREERS_LOCATION_FILTER_OPTIONS,
  CAREERS_WORK_CARDS,
} from "./careers-data";

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
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
      />
      <span className="relative text-[14px] leading-[normal] font-semibold uppercase whitespace-nowrap text-white not-italic">
        {children}
      </span>
      <Corners
        leftSrc="/careers/corner-menu-tl.svg"
        rightSrc="/careers/corner-menu-tr.svg"
      />
    </a>
  );
}

function WhiteCta({ children, href = "#" }: { children: React.ReactNode; href?: string }) {
  return (
    <a
      href={href}
      className={`${interSemiBold.className} relative flex h-[48px] w-full items-center justify-center overflow-hidden shadow-[0px_24.721px_16.129px_rgba(255,255,255,0.15)]`}
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-white" />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-plus-lighter"
        style={{ backgroundImage: "url(/careers/white-cta-texture.png)", backgroundSize: "307.2px 307.2px" }}
      />
      <span className="relative text-[14px] leading-[normal] font-semibold uppercase whitespace-nowrap text-[#121212] not-italic">
        {children}
      </span>
      <Corners
        leftSrc="/careers/corner-menu-tl.svg"
        rightSrc="/careers/corner-menu-tr.svg"
      />
    </a>
  );
}

/* ---------------------------------- HERO ---------------------------------- */
function CareersHeroMobile() {
  return (
    <section
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden px-[24px] py-[120px]"
      aria-label="Careers hero"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/careers/hero-bg.png"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black" />
      </div>

      <div className="relative flex flex-col items-start gap-[20px]">
        <h1
          className={`${gilroyMedium.className} max-w-[327px] bg-clip-text text-left text-[34px] leading-[40px] font-medium text-transparent [word-break:break-word] not-italic`}
          style={{ backgroundImage: gradient("102.971deg") }}
        >
          Re-architect the physics of AI
        </h1>
        <p
          className={`${interRegular.className} max-w-[327px] text-left text-[15px] leading-[23px] font-normal text-[#f0f0f0] opacity-85 not-italic`}
        >
          Don&apos;t iterate on legacy silicon. Build the fundamental compute
          substrate for the next generation of intelligence.
        </p>
        <div className="mt-[8px] w-full max-w-[260px]">
          <GreenCta href="#open-roles">View open roles</GreenCta>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- BEST WORK ------------------------------- */
function CareersBestWorkMobile() {
  return (
    <section
      className="relative flex w-full flex-col items-center gap-[28px] px-[24px] py-[56px]"
      aria-label="Do the best work of your life"
    >
      <SectionTitle deg="127.769deg">Do the best work of your life</SectionTitle>

      <div className="flex w-full flex-col gap-[14px]">
        {CAREERS_WORK_CARDS.map((card) => (
          <article
            key={card.title}
            className="relative flex flex-col gap-[14px] overflow-clip p-[24px]"
            style={{ backgroundImage: CARD_GRADIENT_BG }}
          >
            <div className="relative size-[36px] shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={card.icon}
                className="absolute inset-0 size-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <p
                className={`${gilroyMedium.className} text-[20px] leading-[26px] font-medium text-white not-italic`}
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
function CareersDnaMobile() {
  const panels = [
    {
      title: "Grounded in Science",
      description:
        "You work from first principles. Every decision you make is expected to be backed by data, validation, and a clear understanding of the underlying system.",
    },
    {
      title: "Stay Curious. Stay Skeptical.",
      description:
        "You are encouraged to question, challenge, and refine. Strong thinking, clear reasoning, and continuous learning are expected at every stage of the work.",
    },
    {
      title: "Chase the Impossible",
      description:
        "You take on problems that don't have predefined solutions. The expectation is not iteration, but pushing beyond accepted limits and building what doesn't yet exist.",
    },
    {
      title: "Build for Everyone",
      description:
        "Your work is not isolated. You build systems that must scale across real-world environments, constraints, and users, making advanced technology practical and usable.",
    },
  ];

  return (
    <section
      className="relative flex w-full flex-col items-center gap-[28px] px-[24px] py-[56px]"
      aria-label="Driven by physics. Defined by our DNA."
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/careers/dna-section-bg.png"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative flex flex-col items-center gap-[12px]">
        <SectionTitle deg="105.739deg">
          Driven by physics. Defined by our DNA.
        </SectionTitle>
        <p
          className={`${interRegular.className} max-w-[327px] text-center text-[14px] leading-[22px] font-normal text-[#f0f0f0] opacity-70 not-italic`}
        >
          This is how we work, build, and solve at Ambient.
        </p>
      </div>

      <div className="relative flex w-full flex-col gap-[14px]">
        <GlassPanelMobile title={panels[0].title} description={panels[0].description} />
        <GlassPanelMobile title={panels[1].title} description={panels[1].description} />

        <div className="relative my-[8px] flex h-[180px] w-full items-center justify-center">
          <Image
            src="/careers/chip-object.png"
            alt=""
            fill
            className="object-contain object-center"
            sizes="327px"
          />
        </div>

        <GlassPanelMobile title={panels[2].title} description={panels[2].description} />
        <GlassPanelMobile title={panels[3].title} description={panels[3].description} />

        <GlassPanelMobile
          title="Protect What Powers Us"
          description="You design with power as a constraint from day one. Efficiency is not an afterthought, it is a core part of how you think, build, and optimize systems."
        />
      </div>
    </section>
  );
}

function GlassPanelMobile({ title, description }: { title: string; description: string }) {
  return (
    <div
      className={`relative flex flex-col gap-[10px] p-[24px] bg-[rgba(21,21,21,0.5)] ${GLASS_PANEL_VISIBLE_BORDER_CLASS}`}
    >
      <p
        className={`${gilroyMedium.className} text-[18px] leading-[24px] font-medium text-white not-italic`}
      >
        {title}
      </p>
      <p
        className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-white opacity-65 not-italic`}
      >
        {description}
      </p>
    </div>
  );
}

/* -------------------------------- OPEN ROLES ------------------------------ */
function CareersOpenRolesMobile() {
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const filteredJobs = useMemo(
    () =>
      CAREERS_JOBS.filter((job) => {
        if (jobTypeFilter !== "all" && job.category !== jobTypeFilter) return false;
        if (locationFilter !== "all" && job.location !== locationFilter) return false;
        return true;
      }),
    [jobTypeFilter, locationFilter],
  );

  return (
    <section
      id="open-roles"
      className="relative flex w-full scroll-mt-[90px] flex-col gap-[24px] px-[24px] py-[56px]"
      aria-label="Open Roles"
    >
      <SectionTitle deg="107.715deg" className="self-center">
        Open Roles
      </SectionTitle>

      <div className="flex gap-[12px]">
        <FilterSelect
          label="Job Type"
          value={jobTypeFilter}
          onChange={setJobTypeFilter}
          options={CAREERS_JOB_TYPE_FILTER_OPTIONS}
        />
        <FilterSelect
          label="Location"
          value={locationFilter}
          onChange={setLocationFilter}
          options={CAREERS_LOCATION_FILTER_OPTIONS}
        />
      </div>

      <div className="flex flex-col gap-[12px]">
        {filteredJobs.length === 0 ? (
          <div className="flex h-[120px] items-center justify-center">
            <p
              className={`${interRegular.className} text-[16px] font-normal text-white opacity-60 not-italic`}
            >
              No jobs found
            </p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <JobRowMobile
              key={job.title}
              title={job.title}
              category={job.category}
              location={job.location}
            />
          ))
        )}
      </div>

      <div className="relative mt-[12px] flex flex-col items-center gap-[16px] border-[0.5px] border-solid border-white/10 bg-[rgba(83,216,36,0.06)] p-[24px]">
        <p
          className={`${gilroyMedium.className} max-w-[280px] bg-clip-text text-center text-[22px] leading-[28px] font-medium text-transparent not-italic`}
          style={{ backgroundImage: gradient("125.631deg") }}
        >
          Don&apos;t see the right role?
        </p>
        <p
          className={`${interRegular.className} max-w-[300px] text-center text-[13px] leading-[20px] font-normal text-white opacity-65 not-italic`}
        >
          Submit a general application and we&apos;ll reach out when a matching
          position opens.
        </p>
        <div className="w-full">
          <GreenCta href="#">Share your profile</GreenCta>
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
      className={`relative flex flex-1 items-center bg-[rgba(21,21,21,0.5)] ${GLASS_PANEL_VISIBLE_BORDER_CLASS}`}
    >
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`${interRegular.className} h-[44px] w-full cursor-pointer appearance-none bg-transparent px-[14px] pr-[36px] text-[13px] font-normal text-white not-italic`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-black text-white">
            {option.value === "all" ? `All ${label}s` : option.label}
          </option>
        ))}
      </select>
      <Image
        src="/careers/chevron-down.svg"
        alt=""
        width={20}
        height={20}
        className="pointer-events-none absolute right-[10px] size-[20px]"
        aria-hidden
      />
    </div>
  );
}

function JobRowMobile({
  title,
  category,
  location,
}: {
  title: string;
  category: string;
  location: string;
}) {
  return (
    <article className="relative flex flex-col gap-[10px] border-[0.5px] border-solid border-white/15 bg-black p-[20px]">
      <span
        className={`${dmMono.className} inline-flex w-fit border-[0.5px] border-solid border-white/20 bg-[rgba(255,255,255,0.06)] px-[10px] py-[3px] text-[11px] tracking-[-0.22px] uppercase text-[#ecfae5] not-italic`}
      >
        {category}
      </span>
      <p
        className={`${gilroyMedium.className} text-[18px] leading-[24px] font-medium text-white not-italic`}
      >
        {title}
      </p>
      <p
        className={`${interRegular.className} text-[14px] leading-[20px] font-normal text-[#f0f0f0] opacity-65 not-italic`}
      >
        {location}
      </p>
      <a
        href="#"
        className={`${interMedium.className} group relative mt-[6px] flex h-[42px] items-center justify-center gap-[12px] overflow-hidden border-[0.5px] border-solid border-white/20 bg-[rgba(226,241,202,0.12)] px-[18px] text-[13px] leading-[normal] font-medium uppercase whitespace-nowrap text-white not-italic`}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        />
        <span className="relative z-10 flex items-center gap-[12px]">
          Apply now
          <Image
            src="/careers/chevron-apply.svg"
            alt=""
            width={12}
            height={6}
            className="h-[6px] w-[12px]"
            aria-hidden
          />
        </span>
      </a>
    </article>
  );
}

/* -------------------------------- BENEFITS -------------------------------- */
function CareersBenefitsMobile() {
  return (
    <section
      className="relative flex w-full flex-col items-center gap-[28px] px-[24px] py-[56px]"
      aria-label="Benefits and Perks"
    >
      <SectionTitle deg="112.176deg">Benefits &amp; Perks</SectionTitle>

      <div className="flex w-full flex-col gap-[14px]">
        {CAREERS_BENEFITS_CARDS.map((card) => (
          <article
            key={card.title}
            className="relative flex flex-col gap-[14px] overflow-clip p-[24px]"
            style={{ backgroundImage: CARD_GRADIENT_BG }}
          >
            <div className="relative size-[36px] shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={card.icon}
                className="absolute inset-0 size-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <p
                className={`${gilroyMedium.className} text-[18px] leading-[24px] font-medium text-white not-italic`}
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

/* ------------------------------- BOTTOM CTA ------------------------------- */
function CareersBottomCtaMobile() {
  return (
    <section
      className="relative flex w-full flex-col items-center gap-[28px] overflow-hidden px-[24px] py-[72px]"
      aria-label="Ready to build the future of compute"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/careers/footer-bg.png"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
      </div>

      <h2
        className={`${gilroyMedium.className} relative max-w-[327px] bg-clip-text text-center text-[26px] leading-[34px] font-medium tracking-[-0.26px] text-transparent [word-break:break-word] not-italic`}
        style={{ backgroundImage: gradient("110.887deg") }}
      >
        Ready to build the future of compute?
      </h2>

      <div className="relative flex w-full flex-col gap-[12px]">
        <GreenCta href="#">Apply now</GreenCta>
        <WhiteCta href="#">Refer a candidate</WhiteCta>
      </div>
    </section>
  );
}

/* --------------------------------- PAGE ----------------------------------- */
export function CareersMobile() {
  return (
    <div className="flex w-full flex-col">
      <CareersHeroMobile />
      <CareersBestWorkMobile />
      <CareersDnaMobile />
      <CareersOpenRolesMobile />
      <CareersBenefitsMobile />
      <CareersBottomCtaMobile />
    </div>
  );
}
