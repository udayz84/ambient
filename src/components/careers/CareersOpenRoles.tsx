"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { gilroyMedium, interMedium, interRegular } from "../hero/fonts";
import { CompanyCardCorners } from "../company/company-corners";
import { dmMono } from "../hero/fonts";
import { CareersRolesProfileCta } from "./careers-shared";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { CareersApplicationModal } from "./CareersApplicationModal";

const cornerTitleTl = "/careers/corner-menu-tl.svg";
const cornerTitleTr = "/careers/corner-menu-tr.svg";

const OPEN_ROLES_GRADIENT =
  "linear-gradient(107.715deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const CTA_TITLE_GRADIENT =
  "linear-gradient(125.631deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const IMAGE_107_GRADIENT =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 810 1440' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-46.009 0.0000020111 -0.000003897 -89.152 363.86 720)'><stop stop-color='rgba(0,0,0,0.6)' offset='0'/><stop stop-color='rgba(0,0,0,1)' offset='1'/></radialGradient></defs></svg>\")";

const JOB_ROW_NODE_IDS = [
  "2379:8921",
  "2379:8922",
  "2379:8923",
  "2379:8924",
  "2379:8925",
  "2379:8926",
  "2379:8927",
  "2379:8928",
] as const;

export function CareersOpenRoles({
  data,
  onHeightDiffChange,
}: {
  data?: any;
  onHeightDiffChange?: (diff: number) => void;
} = {}) {
  const [jobTypeFilter, setJobTypeFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [selectedJob, setSelectedJob] = useState<any | null>(null);

  const heading = data?.heading || "";
  const generalAppTitle = data?.general_app_title || "";
  const generalAppSubtitle = data?.general_app_subtitle || "";
  const generalAppCtaLabel = data?.general_app_cta_label || "";
  const applyButtonLabel = data?.apply_button_label || "";

  const jobs: ReadonlyArray<any> = Array.isArray(data?.fetchedJobs)
    ? data.fetchedJobs
    : [];

  // Build Job Type options from dynamic categories if available
  const dynamicJobTypeOptions = data?.fetchedCategories?.length
    ? [
        { value: "all", label: "All" },
        ...data.fetchedCategories.map((c: any) => ({
          value: c.name?.toLowerCase().replace(/\s+/g, '_') || "unknown",
          label: c.name || "Unknown",
        })),
      ]
    : [{ value: "all", label: "All" }];

  // Build location options from the jobs list dynamically
  const uniqueLocations = Array.from(new Set(jobs.map((j: any) => j.location).filter(Boolean)));
  const locationOptions = uniqueLocations.length
    ? [
        { value: "all", label: "All" },
        ...uniqueLocations.map(loc => ({
          value: String(loc).toLowerCase().replace(/\s+/g, '_'),
          label: String(loc).replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        })),
      ]
    : [{ value: "all", label: "All" }];

  const filteredJobs = useMemo(
    () =>
      jobs.filter((job: any) => {
        const jobCategory = typeof job.category === 'object' && job.category !== null 
          ? job.category.name 
          : job.category;
          
        const categoryValue = jobCategory?.toLowerCase().replace(/\s+/g, '_') || "unknown";
        if (jobTypeFilter !== "all" && categoryValue !== jobTypeFilter.toLowerCase().replace(/\s+/g, '_')) {
          return false;
        }
        
        const locValue = job.location?.toLowerCase().replace(/\s+/g, '_') || "unknown";
        if (locationFilter !== "all" && locValue !== locationFilter.toLowerCase().replace(/\s+/g, '_')) {
          return false;
        }
        return true;
      }),
    [jobTypeFilter, locationFilter, jobs],
  );

  useEffect(() => {
    // 8 jobs total initially. 8 * 153 + 7 * 10 = 1294
    const MAX_HEIGHT = 1294;
    const currentJobsCount = filteredJobs.length;
    let currentHeight = 0;
    if (currentJobsCount === 0) {
      currentHeight = 153; // "No jobs found" block height
    } else {
      currentHeight = currentJobsCount * 153 + (currentJobsCount - 1) * 10;
    }
    const diff = (MAX_HEIGHT - currentHeight) + 140; // Add 140px to pull up subsequent sections by the same amount we pulled up this section
    onHeightDiffChange?.(diff);
  }, [filteredJobs.length, onHeightDiffChange]);

  return (
    <section
      id="open-roles"
      className="absolute top-[2286px] left-1/2 z-10 flex w-[1204px] -translate-x-1/2 flex-col gap-[40px]"
      data-node-id="2379:8901"
      aria-label="Open Roles"
    >
      {/* image 107 background — extends above into previous section */}
      <div 
        className="pointer-events-none absolute left-1/2 top-[-200px] z-0 w-[1440px] -translate-x-1/2"
        style={{ height: 'calc(100% + 400px)' }}
        data-name="image 107"
      >
        <Image
          src="/careers/image 107.webp"
          alt=""
          fill
          className="object-cover opacity-25"
          sizes="1440px"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)",
          }}
          aria-hidden
        />
      </div>

      {/* 2379:8902 — header row */}
      <div
        className="sticky top-[78px] z-50 flex h-[80px] w-[1204px] shrink-0 items-end justify-between bg-black pb-[10px] pt-[10px]"
        data-node-id="2379:8902"
      >
        <OpenRolesTitle title={heading} />
        <div className="flex shrink-0 items-center gap-[20px]" data-node-id="2379:8909">
          <FilterDropdown
            label="Job Type"
            options={dynamicJobTypeOptions}
            value={jobTypeFilter}
            onChange={setJobTypeFilter}
            nodeId="2379:8910"
            innerNodeId="2379:8911"
          />
          <FilterDropdown
            label="Location"
            options={locationOptions}
            value={locationFilter}
            onChange={setLocationFilter}
            nodeId="2379:8915"
            innerNodeId="2379:8916"
          />
        </div>
      </div>

      {/* 2379:8920 — job list */}
      <div
        className="flex w-[1204px] shrink-0 flex-col gap-[10px]"
        data-node-id="2379:8920"
      >
        {filteredJobs.length === 0 ? (
          <div className="flex h-[153px] w-full items-center justify-center">
            <p
              className={`${interRegular.className} text-[18px] leading-[27px] font-normal text-white opacity-60 not-italic`}
            >
              No jobs found
            </p>
          </div>
        ) : (
          filteredJobs.map((job: any, index: number) => (
            <JobRow
              key={job.title}
              title={job.title}
              category={job.category}
              location={job.location}
              applyLabel={applyButtonLabel}
              onApply={() => setSelectedJob(job)}
              nodeId={JOB_ROW_NODE_IDS[index] ?? JOB_ROW_NODE_IDS[0]}
            />
          ))
        )}
      </div>

      {/* 2379:8929 — bottom CTA */}
      <div
        className="relative h-[262px] w-[1203px] shrink-0"
        data-node-id="2379:8929"
      >
        <RolesCtaBackground />
        <div
          className="absolute top-[calc(50%+0.5px)] left-[79.5px] flex w-[1042.932px] -translate-y-1/2 items-center justify-between overflow-visible"
          data-node-id="2379:8931"
        >
          <div
            className="relative h-[108px] w-[587px] shrink-0"
            data-node-id="2379:8932"
          >
            <p
              className={`${gilroyMedium.className} absolute top-[26.03px] left-[292.35px] max-w-[584px] -translate-x-1/2 bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden`}
              style={{
                backgroundImage: CTA_TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              data-node-id="2379:8933"
            >
              {generalAppTitle}
            </p>
            <div
              className="pointer-events-none absolute top-[1.03px] left-px h-[106px] w-[584.848px]"
              data-node-id="2379:8934"
            >
              <div className="absolute inset-[-0.47%_0]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async"
                  src="/careers/title-frame-roles-cta.svg"
                  alt=""
                  className="block size-full max-w-none"
                  aria-hidden
                />
              </div>
            </div>
          </div>

          <div
            className="relative h-[116px] w-[290.931px] shrink-0 overflow-visible"
            data-node-id="2379:8939"
          >
            <p
              className={`${interRegular.className} absolute top-0 left-0 h-[48px] w-[290.931px] text-right text-[14px] leading-[24px] font-normal tracking-[-0.3125px] text-[rgba(255,255,255,0.6)] not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden`}
              data-node-id="2379:8940"
            >
              {generalAppSubtitle}
            </p>
            <CareersRolesProfileCta href="#" label={generalAppCtaLabel} />
          </div>
        </div>
      </div>
      
      <CareersApplicationModal
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        jobTitle={selectedJob?.title || undefined}
        roles={jobs.map((j: any) => j.title).filter(Boolean)}
        jobDescription={selectedJob ? {
          about_role: selectedJob.about_role,
          responsibilities: selectedJob.responsibilities,
          perks_benefits: selectedJob.perks_benefits,
        } : undefined}
      />
    </section>
  );
}

const ROLES_CTA_MASK_STYLE = {
  maskImage: "url(/careers/roles-cta-mask.svg)",
  WebkitMaskImage: "url(/careers/roles-cta-mask.svg)",
  maskSize: "100% 100%",
  WebkitMaskSize: "100% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
} as const;

function RolesCtaBackground() {
  return (
    <div
      className="pointer-events-none absolute top-0 left-0 h-[262px] w-[1203px]"
      data-node-id="2379:8930"
      aria-hidden
    >
      <Image
        src="/careers/Rectangle 1618873545.png"
        alt=""
        fill
        className="object-cover"
        sizes="1203px"
      />
    </div>
  );
}

function OpenRolesTitle({ title }: { title: string }) {
  return (
    <div
      className="relative h-[60px] w-[289px] shrink-0"
      data-node-id="2379:8903"
    >
      <p
        className={`${gilroyMedium.className} absolute top-0 left-[20px] max-w-[249px] bg-clip-text text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] overflow-hidden`}
        style={{
          backgroundImage: OPEN_ROLES_GRADIENT,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
        data-node-id="2379:8904"
      >
        {title}
      </p>
      <TitleCorner className="top-0 left-0" src={cornerTitleTl} flipY />
      <TitleCorner className="top-0 left-[285px]" src={cornerTitleTr} rotate180 />
      <TitleCorner className="top-[56px] left-0" src={cornerTitleTl} />
      <TitleCorner className="top-[56px] left-[285px]" src={cornerTitleTr} flipY rotate180 />
    </div>
  );
}

function TitleCorner({
  className,
  src,
  flipY,
  rotate180,
}: {
  className: string;
  src: string;
  flipY?: boolean;
  rotate180?: boolean;
}) {
  return (
    <div className={`pointer-events-none absolute flex size-[4px] items-center justify-center ${className}`}>
      <div
        className={`flex-none ${flipY ? "-scale-y-100" : ""} ${rotate180 ? "rotate-180" : ""}`}
      >
        <div className="relative size-[4px]">
          <div className="absolute inset-[0_0_-12.5%_-12.5%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" alt="" className="block size-full max-w-none" src={src} aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterDropdown({
  label,
  options,
  value,
  onChange,
  nodeId,
  innerNodeId,
}: {
  label: string;
  options: readonly { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  nodeId: string;
  innerNodeId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);
  const triggerLabel =
    value === "all" ? label : (selectedOption?.label ?? label);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={rootRef}
      className="relative flex w-[200px] shrink-0 items-center border border-[rgba(240,240,240,0.2)]"
      data-node-id={nodeId}
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`${label} filter`}
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-[48px] min-w-px w-full cursor-pointer items-center gap-[10px] bg-transparent px-[20px] text-left"
        data-node-id={innerNodeId}
      >
        <span
          className={`${interRegular.className} min-w-px flex-[1_0_0] text-[14px] leading-[1.4] font-normal text-white not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] overflow-hidden`}
        >
          {triggerLabel}
        </span>
        <Image
          src="/careers/chevron-down.svg"
          alt=""
          width={24}
          height={24}
          className={`size-[24px] shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {isOpen ? (
        <ul
          role="listbox"
          aria-label={label}
          className="absolute top-[calc(100%+4px)] left-0 z-30 w-[200px] border border-solid border-[rgba(240,240,240,0.2)] bg-black py-[4px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.6)]"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`${interRegular.className} flex h-[40px] w-full cursor-pointer items-center px-[20px] text-left text-[14px] leading-[1.4] font-normal not-italic transition-colors duration-150 ${
                    isSelected
                      ? "bg-[rgba(83,216,36,0.15)] text-[#ecfae5]"
                      : "bg-transparent text-white hover:bg-[rgba(255,255,255,0.06)]"
                  }`}
                >
                  {option.value === "all" ? `All ${label}s` : option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function JobRow({
  title,
  category,
  location,
  applyLabel,
  onApply,
  nodeId,
}: {
  title: string;
  category: string;
  location: string;
  applyLabel: string;
  onApply: () => void;
  nodeId: string;
}) {
  return (
    <article
      className="group relative h-[153px] w-[1204px] shrink-0 border border-solid border-[rgba(240,240,240,0.2)] bg-black"
      data-node-id={nodeId}
      data-name="Job Details"
    >
      <CategoryBadge label={category} />
      <p
        className={`${gilroyMedium.className} absolute top-[75px] left-[19px] text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] overflow-hidden`}
      >
        {title}
      </p>
      <p
        className={`${interRegular.className} absolute top-[105px] left-[19px] w-[350px] text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] overflow-hidden`}
      >
        {location}
      </p>
      <ApplyButton label={applyLabel} onClick={onApply} />
    </article>
  );
}

function CategoryBadge({ label }: { label: string }) {
  return (
    <div
      className={`${dmMono.className} absolute top-[19.34px] left-[calc(50%-492px)] h-[26px] w-[180px] -translate-x-1/2 border-[0.5px] border-solid border-[rgba(240,240,240,0.5)] bg-[rgba(0,0,0,0.3)]`}
      data-name="Menu"
    >
      <Corners leftSrc={cornerTitleTl} rightSrc={cornerTitleTr} />
      <p
        className={`absolute top-[calc(50%-4.5px)] left-1/2 max-w-full -translate-x-1/2 text-[13px] leading-[19.5px] font-normal tracking-[-0.39px] whitespace-nowrap text-[#ecfae5] uppercase not-italic overflow-hidden text-ellipsis [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word]`}
      >
        {label}
      </p>
      <div className="absolute top-1/2 left-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
      <div className="absolute top-1/2 left-[170.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
    </div>
  );
}

function ApplyButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`${interMedium.className} absolute top-[51px] right-[49px] flex h-[48px] items-center justify-center gap-[20px] border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-transparent px-[20px] py-[10px] text-[16px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic transition-[box-shadow,background-color] duration-200 group-hover:bg-[rgba(255,255,255,0.05)] group-hover:shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)] transition-opacity duration-200 group-hover:opacity-100"
      />
      <span className="relative z-10 flex min-w-0 max-w-full items-center gap-[20px] overflow-hidden">
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">{label}</span>
        <Image
          src="/careers/chevron-apply.svg"
          alt=""
          width={12}
          height={6}
          className="h-[6px] w-[12px] shrink-0"
          aria-hidden
        />
      </span>
      <ApplyButtonCorners />
    </button>
  );
}

function ApplyButtonCorners() {
  return (
    <>
      <div className="pointer-events-none absolute right-0 top-0 z-20 flex size-[4px] items-center justify-center">
        <div className="-scale-x-100 -scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src="/hero/corner-tag-1.svg" alt="" fill className="block max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute left-0 top-0 z-20 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src="/hero/corner-tag-1.svg" alt="" fill className="block max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 z-20 flex size-[4px] items-center justify-center">
        <div className="-scale-x-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src="/hero/corner-tag-1.svg" alt="" fill className="block max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 z-20 size-[4px]">
        <div className="absolute inset-[0_0_-12.5%_-12.5%]">
          <Image src="/hero/corner-tag-1.svg" alt="" fill className="block max-w-none" aria-hidden />
        </div>
      </div>
    </>
  );
}
