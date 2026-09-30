"use client";

import { useMemo, useState } from "react";
import { dmMono, gilroyMedium, interMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { useFadeIn } from "../shared/useFadeIn";
import type {
  Capability,
  DirectoryContent,
  PartnerEntry,
} from "./partners-content";
import {
  PartnersDropdown,
  PartnersGreenCta,
  PartnersSectionHeading,
  PartnersBridgeBox,
  scrollToPartnerSection,
} from "./partners-shared";

/* ------------------------------------------------------------------ */
/* Global coverage node map                                            */
/* ------------------------------------------------------------------ */

const REGION_NODES = [
  { region: "North America" as const, x: 15, y: 35, align: "right" },
  { region: "EMEA" as const, x: 45, y: 30, align: "right" },
  { region: "APAC / India" as const, x: 68, y: 46, align: "left" },
];

function CoverageMap({ onRegionSelect }: { onRegionSelect: (region: string) => void }) {
  return (
    <div className="w-full">
      <div className="relative w-full aspect-[1204/392] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-black/40 backdrop-blur-[8px]">
        <Corners />
        {/* engineering-grid world map texture (same asset family as Contact) */}
        <div className="pointer-events-none absolute inset-0 opacity-25" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            src="/contact/map-base.svg"
            alt=""
            className="absolute inset-0 block size-full max-w-none object-cover object-center"
          />
        </div>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 120%, rgba(83,216,36,0.08), transparent 60%)" }} aria-hidden />

        {REGION_NODES.map((node) => (
          <button
            key={node.region}
            type="button"
            onClick={() => {
              onRegionSelect(node.region);
              scrollToPartnerSection("partner-grid");
            }}
            title={`View partners in ${node.region}`}
            className="group/node absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <span className="relative flex size-[14px] items-center justify-center">
              <span className="absolute size-[14px] animate-partners-node-blink rounded-full bg-[rgba(83,216,36,0.35)]" aria-hidden />
              <span className="absolute size-[8px] rounded-full bg-[#53d824] shadow-[0px_0px_12px_0px_rgba(83,216,36,0.8)]" aria-hidden />
            </span>
            <span
              className={`${dmMono.className} absolute top-[calc(50%-9px)] ${node.align === "left" ? "right-[calc(50%+14px)]" : "left-[calc(50%+14px)]"} flex h-[20px] items-center border-[0.5px] border-solid border-[rgba(240,240,240,0.25)] bg-[rgba(0,0,0,0.6)] px-[8px] text-[10px] leading-[13px] tracking-[0.8px] whitespace-nowrap text-[#ecfae5] uppercase transition-colors duration-200 group-hover/node:border-[rgba(83,216,36,0.6)] group-hover/node:text-[#a9e28c]`}
            >
              {node.region}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Partner card                                                        */
/* ------------------------------------------------------------------ */

function PartnerCard({
  partner,
  capabilities,
  connectLabel,
}: {
  partner: PartnerEntry;
  capabilities: Capability[];
  connectLabel: string;
}) {
  return (
    <article className="group/card relative flex flex-col border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(21,21,21,0.3)] p-[24px] backdrop-blur-[8px] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-[3px] hover:border-[rgba(83,216,36,0.5)] hover:shadow-[0px_20px_48px_0px_rgba(83,216,36,0.15)]">
      <Corners />
      <div className="flex w-full items-start gap-[16px]">
        <span className="relative flex size-[48px] shrink-0 items-center justify-center overflow-hidden" aria-hidden>
          {partner.icon ? (
            <img loading="lazy" decoding="async" src={partner.icon} alt="" className="h-full w-full object-cover invert opacity-90" />
          ) : (
            <>
              <span className="absolute inset-0 bg-gradient-to-b from-[#53d824] to-[#2c7213]" />
              <span className={`${gilroyMedium.className} relative max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[16px] leading-[20px] font-medium tracking-[0.5px] text-[#091804]`}>
                {partner.monogram}
              </span>
            </>
          )}
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
          <h3 className={`${gilroyMedium.className} w-full text-[20px] leading-[26px] font-medium text-white [word-break:break-word] not-italic min-[1024px]:text-[22px] min-[1024px]:leading-[28px]`}>
            {partner.name}
          </h3>
          <p className={`${interRegular.className} w-full text-[13px] leading-[19.5px] font-normal text-[#a4a4a4] [word-break:break-word] not-italic min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}>
            {partner.oneLiner}
          </p>
        </div>
      </div>

      <div className="mt-[18px] flex flex-wrap items-center gap-[6px]">
        <span className={`${dmMono.className} inline-flex h-[20px] max-w-full items-center border-[0.5px] border-solid border-[rgba(240,240,240,0.25)] px-[8px] text-[10px] leading-[13px] tracking-[0.8px] whitespace-nowrap text-[#f0f0f0] opacity-80 uppercase not-italic overflow-hidden text-ellipsis`}>
          {partner.region}
        </span>
        {partner.badges.map((badge) => (
          <span
            key={badge}
            className={`${dmMono.className} inline-flex h-[20px] items-center gap-[6px] border-[0.5px] border-solid border-[rgba(83,216,36,0.35)] bg-[rgba(83,216,36,0.08)] px-[8px] text-[10px] leading-[13px] tracking-[0.8px] whitespace-nowrap text-[#a9e28c] uppercase not-italic`}
          >
            <span className="size-[3px] shrink-0 rounded-full bg-[#53d824]" aria-hidden />
            {badge}
          </span>
        ))}
      </div>

      <div className="mt-[18px] flex items-end justify-between border-t-[0.5px] border-solid border-[rgba(240,240,240,0.15)] pt-[16px]">
        <p className={`${dmMono.className} text-[10px] leading-[15px] tracking-[0.8px] text-[#8a8a8a] uppercase not-italic`}>
          {
            capabilities.find((cap) => cap.id === partner.capability)
              ?.short ?? partner.capability
          }
        </p>
        <a
          href="#get-matched"
          onClick={(e) => {
            e.preventDefault();
            scrollToPartnerSection("get-matched");
          }}
          className={`${interMedium.className} group/connect flex cursor-pointer items-center gap-[8px] text-[12px] leading-[18px] font-medium tracking-[0.36px] whitespace-nowrap text-[#a9e28c] uppercase transition-colors duration-200 hover:text-[#53d824] not-italic`}
        >
          {connectLabel}
          <svg
            viewBox="0 0 14 8"
            className="h-[8px] w-[14px] shrink-0 transition-transform duration-200 group-hover/connect:translate-x-[4px]"
            fill="none"
            aria-hidden
          >
            <path d="M0 4H12M9 1L12.5 4L9 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </article>
  );
}

function ExpandingTile({ expanding }: { expanding: DirectoryContent["expanding"] }) {
  return (
    <div className="relative flex min-h-[240px] flex-col items-center justify-center gap-[12px] border-[0.5px] border-dashed border-[rgba(240,240,240,0.25)] bg-[rgba(21,21,21,0.2)] p-[24px] text-center opacity-70 backdrop-blur-[8px]">
      <span className="relative size-[10px]" aria-hidden>
        <span className="absolute inset-0 animate-partners-node-blink rounded-full bg-[rgba(83,216,36,0.5)]" />
        <span className="absolute inset-[3px] rounded-full bg-[#53d824]" />
      </span>
      <h3 className={`${gilroyMedium.className} text-[18px] leading-[24px] font-medium text-[#f0f0f0] not-italic`}>
        {expanding.title}
      </h3>
      <p className={`${interRegular.className} max-w-[260px] text-[13px] leading-[19.5px] font-normal text-[#8a8a8a] not-italic min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}>
        {expanding.description}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Directory section                                                   */
/* ------------------------------------------------------------------ */

export function PartnersDirectory({
  content,
  capabilities,
  regions,
}: {
  content: DirectoryContent;
  capabilities: Capability[];
  regions: string[];
}) {
  const { fadeRef, isVisible } = useFadeIn<HTMLElement>();
  const fadeCls = isVisible ? "animate-hero-text-fade-in opacity-0" : "translate-y-[25px] opacity-0";
  const ALL = content.filters.all;
  const [capabilityFilter, setCapabilityFilter] = useState(ALL);
  const [regionFilter, setRegionFilter] = useState(ALL);

  const capabilityOptions = [ALL, ...capabilities.map((c) => c.short)];
  const regionOptions = [ALL, ...regions];

  const filtered = useMemo(
    () =>
      content.partners.filter((p) => {
        const capMatch =
          capabilityFilter === ALL ||
          (capabilities.find((c) => c.id === p.capability)?.short ??
            p.capability) === capabilityFilter;
        const regionMatch = regionFilter === ALL || p.region === regionFilter;
        return capMatch && regionMatch;
      }),
    [capabilityFilter, regionFilter, content.partners, capabilities, ALL],
  );

  return (
    <section
      id="directory"
      ref={fadeRef}
      className={`relative mx-auto flex w-full max-w-[1204px] scroll-mt-[78px] flex-col items-center gap-[40px] px-[24px] py-[40px] min-[1024px]:py-[64px] ${fadeCls} transform-gpu`}
      aria-label="Partner directory and global coverage"
    >
      <div className="relative flex flex-col items-center gap-[16px] px-[10px]">
        <PartnersSectionHeading deg="101.272deg">{content.heading}</PartnersSectionHeading>
        <Corners />
      </div>

      <p className={`${interRegular.className} max-w-[720px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic max-[1023px]:text-[14px] max-[1023px]:leading-[21px] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}>
        {content.subheading}
      </p>

      <CoverageMap
        onRegionSelect={(region) => setRegionFilter(region)}
      />

      {/* filters */}
      <div className="flex w-full flex-col gap-[12px] min-[1024px]:flex-row min-[1024px]:gap-[20px]">
        <PartnersDropdown
          label={content.filters.capability}
          options={capabilityOptions}
          value={capabilityFilter === ALL ? "" : capabilityFilter}
          onChange={(v) => setCapabilityFilter(v || ALL)}
          className="min-[1024px]:w-[300px]"
        />
        <PartnersDropdown
          label={content.filters.region}
          options={regionOptions}
          value={regionFilter === ALL ? "" : regionFilter}
          onChange={(v) => setRegionFilter(v || ALL)}
          className="min-[1024px]:w-[300px]"
        />
        <div className="flex flex-1 items-center justify-start min-[1024px]:justify-end">
          <p className={`${dmMono.className} text-[11px] leading-[16px] tracking-[1px] text-[#8a8a8a] uppercase not-italic`}>
            {filtered.length} of {content.partners.length} partners
          </p>
        </div>
      </div>

      {/* grid */}
      <div id="partner-grid" className="grid w-full scroll-mt-[160px] grid-cols-1 gap-[20px] min-[700px]:grid-cols-2 min-[1024px]:grid-cols-3">
        {filtered.map((partner) => (
          <PartnerCard
            key={partner.name}
            partner={partner}
            capabilities={capabilities}
            connectLabel={content.connect}
          />
        ))}

        {filtered.length === 0 ? (
          <div className="relative col-span-full flex flex-col items-center gap-[20px] border-[0.5px] border-dashed border-[rgba(240,240,240,0.25)] bg-[rgba(21,21,21,0.2)] px-[24px] py-[56px] text-center backdrop-blur-[8px]">
            <p className={`${gilroyMedium.className} max-w-[480px] text-[20px] leading-[28px] font-medium text-[#f0f0f0] [word-break:break-word] not-italic min-[1024px]:text-[22px]`}>
              {content.noMatch.message}
            </p>
            <PartnersGreenCta
              width="220px"
              href={content.noMatch.cta.href}
              onClick={() => scrollToPartnerSection("get-matched")}
            >
              {content.noMatch.cta.label}
            </PartnersGreenCta>
          </div>
        ) : (
          <ExpandingTile expanding={content.expanding} />
        )}
      </div>

      {/* bridge line */}
      <PartnersBridgeBox className="mt-[16px]">
        {content.bridge}
      </PartnersBridgeBox>
    </section>
  );
}
