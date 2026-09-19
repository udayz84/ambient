"use client";

import { gilroyMedium, interRegular } from "../hero/fonts";
import { useFadeIn, getFadeInClass } from "../shared/useFadeIn";
import { Corners } from "../shared/Corners";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
  CTA_HOVER_GLOW,
  DEVELOPER_MODULES,
  MODULE_IMAGE_OVERLAY,
} from "./developer-data";
import { mediaUrl } from "@/lib/strapi";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

const DEFAULT_HEADING = "From first board to full production.";
const DEFAULT_SUBTITLE =
  "Start on an evaluation kit, scale on a production module — the same software carries across.";

const DEFAULT_CARDS = [
  {
    value: "Evaluate",
    title: "NuraSense Evaluation Kit",
    description: "Run real models on real silicon, day one.",
    image: "/applications/som-img-a.webp",
    cta_label: "View Evaluation Kits",
    cta_href: "/evaluation-kits",
  },
  {
    value: "Scale",
    title: "Production SOMs",
    description: "Drop a pre-engineered System-on-Module into your carrier board.",
    image: "/applications/som-img-b.webp",
    cta_label: "View SOMs",
    cta_href: "/products#som",
  },
];

export function DeveloperModulesSection({ data }: { data?: any }) {
  // Override CMS data with the requested text for the new 2-card layout
  const heading = DEFAULT_HEADING;
  const subtitle = DEFAULT_SUBTITLE;
  const modules = data?.modules && Array.isArray(data.modules) && data.modules.length > 0 ? data.modules : DEFAULT_CARDS;

  return (
    <div
      className="absolute flex flex-col items-center gap-[36px]"
      style={{ left: 118.3046875, top: "calc(4600px + var(--developer-pipeline-offset, 0px))", width: 1204, transition: "top 300ms ease-in-out" }}
      data-node-id="2438:4587"
    >
      {/* Header */}
      <div className="flex w-[800px] flex-col items-center gap-[24px]">
        <div className="relative px-[10px]">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2 className={`${gilroyMedium.className} text-center text-[46px] leading-[49px] font-medium text-white not-italic`}>
            {heading}
          </h2>
        </div>
        <p className={`${interRegular.className} w-[800px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic opacity-65`}>
          {subtitle}
        </p>
      </div>

      {/* Content row - 2 cards */}
      <div className="relative flex w-full justify-center gap-[60px]">
        {modules.slice(0, 2).map((module: any, i: number) => (
          <ModuleCard
            key={i}
            module={module}
            fallback={DEFAULT_CARDS[i] || DEFAULT_CARDS[0]}
          />
        ))}
      </div>

      {/* Secondary CTA */}
      <div className="mt-8 flex items-center justify-center">
        <a
          href="/contact"
          className={`${gilroyMedium.className} relative flex h-[48px] shrink-0 items-center justify-center bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px] text-[16px] leading-[28px] font-medium uppercase text-white transition-[background-color] hover:bg-[rgba(226,241,202,0.2)]`}
        >
          Discuss Your Use Case
          <GreenCtaCorners />
        </a>
      </div>
    </div>
  );
}

function ModuleCard({ module, fallback }: { module: any; fallback: typeof DEFAULT_CARDS[number] }) {
  const image = mediaUrl(module?.image) || fallback.image;
  const value = module?.value || fallback.value;
  const title = module?.title || fallback.title;
  const description = module?.description || fallback.description;
  const ctaLabel = module?.cta_label || fallback.cta_label;
  const ctaHref = module?.cta_href || fallback.cta_href;
  const { fadeRef, isVisible } = useFadeIn();

  return (
    <div
      ref={fadeRef}
      className={`group relative flex w-[450px] shrink-0 flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] px-[24px] pt-[24px] pb-[32px] ${getFadeInClass(isVisible)}`}
    >
      {/* Image Container */}
      <div className="relative h-[280px] w-full shrink-0">
        <div className="pointer-events-none absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            alt=""
            src={image}
            className="absolute inset-0 size-full max-w-none object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex w-full flex-col items-center gap-[16px] text-center">
        <p className={`${gilroyMedium.className} w-full text-[38px] leading-[47px] font-medium text-white`}>
          {value}
        </p>
        <p className={`${interRegular.className} w-full text-[18px] leading-[26px] font-normal uppercase text-[#f0f0f0]`}>
          {title}
        </p>
        <div className="flex items-center justify-center">
          <div className="rotate-180">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" alt="" aria-hidden src="/applications/som-line.svg" className="block h-[1px] w-[191px] max-w-none" />
          </div>
        </div>
        <p className={`${interRegular.className} max-w-[320px] text-[16px] leading-[24px] font-normal tracking-[-0.3px] text-[rgba(255,255,255,0.6)]`}>
          {description}
        </p>
        
        <div className="mt-4 w-full">
          <ModuleCta href={ctaHref}>{ctaLabel}</ModuleCta>
        </div>
      </div>

      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </div>
  );
}

function ModuleCta({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className={`${gilroyMedium.className} ${CTA_HOVER_GLOW} relative mx-auto flex h-[48px] w-full max-w-[240px] items-center justify-center gap-[10px] border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px] not-italic transition-[box-shadow,background-color] duration-200 group-hover:bg-transparent`}
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)] transition-opacity duration-200 group-hover:opacity-100" />
      <span className="relative not-italic text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white">
        {children}
      </span>
      <span className="relative size-[18px] shrink-0" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async" alt="" src="/applications/som-arrow.svg" className="absolute inset-0 size-full max-w-none" />
      </span>
      <GreenCtaCorners />
    </a>
  );
}
