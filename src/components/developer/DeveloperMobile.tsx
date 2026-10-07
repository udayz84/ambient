"use client";

import { Fragment, useRef, useState } from "react";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { useFitText } from "../shared/FitText";
import { dmMono, gilroyMedium, interBold, interRegular } from "../hero/fonts";
import { TagBadge } from "../hero/TagBadge";
import { Corners } from "../shared/Corners";
import { mediaUrl } from "@/lib/strapi";
import {
  ADD_ICON,
  ARROW_SVG,
  BADGE_LEFT,
  BADGE_RIGHT,
  REMOVE_ICON,
  STAGES,
  StageCard,
  type Stage,
  type StageBullet,
} from "./DeveloperPipeline";
import { DEFAULT_CODE_LINES } from "./DeveloperCodeSection";
import {
  ARTICLE_ICON_BG,
  CORNER_LEFT,
  CORNER_RIGHT,
  COPILOT_CARD_BG,
  COPILOT_ICON_BG,
  DeveloperArticle,
  DEVELOPER_ARTICLES,
  DEVELOPER_COPILOTS,
  DEVELOPER_MODULES,
} from "./developer-data";
import {
  MODEL_ZOO_TITLE_GRADIENT,
  resolveModelZooContent,
} from "./DeveloperModelZoo";
import { HomeModelZooKits } from "../home-model-zoo-kits/HomeModelZooKits";

/**
 * Mobile (<1024px) stacked adaptation of the Developer page.
 * Built responsive from the same Figma content (no dedicated mobile frame supplied).
 * Order: hero → code → pipeline → model-zoo → coming-soon → modules → copilots.
 */
export function DeveloperMobile({ data }: { data?: any }) {
  return (
    <div className="flex w-full flex-col">
      <DeveloperHeroMobile data={data?.hero} />
      <DeveloperCodeSectionMobile data={data?.code} />
      <DeveloperPipelineMobile data={data?.pipeline} />
      <DeveloperModelZooMobile data={data?.model_zoo} />
      <HomeModelZooKits data={data?.model_zoo_kits} />
      <DeveloperComingSoonMobile data={data?.coming_soon} />
      <DeveloperModulesMobile data={data?.modules} />
      <DeveloperCopilotsMobile data={data?.copilots} />
    </div>
  );
}

/** Pipeline steps — derived from desktop STAGES (Train/Optimize/Integrate/Deploy). */

/** Title gradient for the pipeline section (Figma 4502:8331 — 108.656°). */
const PIPELINE_TITLE_GRADIENT =
  "linear-gradient(108.6565279812398deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const PIPELINE_SUBTITLE =
  "From microwatt edge sensors running on coin cells to air-cooled high-performance compute arrays, the GPX architecture scales seamlessly across the physical world.";

/**
 * Collapsed-header background strips (Figma 4502:8244 / 4502:8270 / 4502:8292) —
 * mix-blend-plus-lighter images with per-stage geometry + gradient masks.
 */
type MobileCollapse = {
  img: string;
  left: string;
  top: number;
  width: number;
  height: number;
  gradient: string;
};
const MOBILE_COLLAPSE: Record<number, MobileCollapse> = {
  1: {
    img: "/developer/pipeline-mobile-collapse-optimize.webp",
    left: "calc(50% + 48.5px)",
    top: 0,
    width: 574,
    height: 79,
    gradient:
      "linear-gradient(90.929deg, rgba(0,0,0,0) 43.346%, rgb(0,0,0) 69.775%), linear-gradient(86.967deg, rgb(0,0,0) 35.062%, rgba(0,0,0,0) 55.961%)",
  },
  2: {
    img: "/developer/pipeline-mobile-collapse-integrate.png",
    left: "calc(50% + 35px)",
    top: -1,
    width: 583,
    height: 80,
    gradient:
      "linear-gradient(90.532deg, rgba(0,0,0,0) 43.332%, rgb(0,0,0) 71%), linear-gradient(87.623deg, rgb(0,0,0) 39.785%, rgba(0,0,0,0) 54.136%)",
  },
  3: {
    img: "/developer/pipeline-mobile-collapse-deploy.png",
    left: "calc(50% - 68px)",
    top: -52,
    width: 627,
    height: 194,
    gradient:
      "linear-gradient(89.650deg, rgba(0,0,0,0) 62.881%, rgb(0,0,0) 88.989%), linear-gradient(88.898deg, rgb(0,0,0) 56.491%, rgba(0,0,0,0) 81.234%)",
  },
};

/** 40×40 radial icon tile — Figma 4502:8220. */
const ICON_TILE_BG_40 =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(2.2748e-14 1.4501 -2.9369 -1.8948e-15 20 -2.403)'><stop stop-color='rgba(57,74,54,1)' offset='0'/><stop stop-color='rgba(43,54,41,1)' offset='0.5'/><stop stop-color='rgba(29,34,28,1)' offset='1'/></radialGradient></defs></svg>\")";

/** Train expanded portrait diagram — Figma 4502:8242 (353×1247, object-cover). */
const MOBILE_TRAIN_FLOW = "/developer/pipeline-mobile-train-expanded.webp";

const HERO_DEFAULT_HEADING = "Model to deployment\nin 15 Minutes ";
const HERO_DEFAULT_SUBTITLE =
  "ModelForge bridges training and deployment. Quantize, compile, and merge neural networks with your firmware.";
const HERO_DEFAULT_PRIMARY = "Download ModelForge SDK";
const HERO_DEFAULT_SECONDARY = "Read the Documentation";

/**
 * Figma 4032:19041 — Developer hero (mobile, 393×700 frame).
 * Layout: title+subtitle content (gap 15px) → hero image (360px) → CTAs (gap 16px).
 */
function DeveloperHeroMobile({ data }: { data?: any }) {
  const heading = data?.heading || HERO_DEFAULT_HEADING;
  const headingLines = heading.split("\n");
  const subtitle = data?.subtitle || HERO_DEFAULT_SUBTITLE;
  const primaryLabel = data?.primary_button?.label || HERO_DEFAULT_PRIMARY;
  const primaryHref = data?.primary_button?.href || "#";
  const secondaryLabel = data?.secondary_button?.label || HERO_DEFAULT_SECONDARY;
  const secondaryHref = data?.secondary_button?.href || "#";
  const bgImg = mediaUrl(data?.background_image) || "/developer/hero-bg-3.webp";
  const fitRef = useFitText<HTMLHeadingElement>({});
  return (
    <section className="relative flex w-full flex-col items-center pt-[20px]">
      {/* Content block — 4032:21985 (x20 y0 w352 h193) */}
      <div className="flex w-full flex-col items-center gap-[15px] px-[20px]">
        {/* Title group — 4032:21986 (w352 h115) */}
        <div className="relative flex w-full justify-center">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            ref={fitRef}
            className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              backgroundImage:
                "linear-gradient(100.88deg, rgb(255, 255, 255) 1.35%, rgb(212, 233, 188) 55.16%, rgb(255, 255, 255) 111.67%)",
            }}
          >
            {headingLines.map((line: string, i: number) => (
              <span key={i} className="block leading-[36px]">
                {line}
              </span>
            ))}
          </h2>
        </div>
        {/* Subtitle — 4032:21992 (x8 y130 w336 h63) */}
        <p
          className={`${interRegular.className} w-[336px] max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic [word-break:break-word]`}
        >
          {subtitle}
        </p>
      </div>

      {/* Background hero image — 4032:21994 (x-17 y208 w428 h360) */}
      <div className="relative mt-[15px] h-[360px] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async"
          alt=""
          src={bgImg}
          className="absolute inset-0 size-full object-cover"
          aria-hidden
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgb(0, 0, 0) 1.53%, rgba(0, 0, 0, 0) 19.44%), linear-gradient(184.76deg, rgba(0, 0, 0, 0) 65.85%, rgb(0, 0, 0) 99.32%)",
          }}
        />
      </div>

      {/* CTA block — 4032:21996 (x65 y588 w263 h112) */}
      <div className="mt-[20px] flex w-[263px] flex-col gap-[16px] pb-[24px]">
        {/* Primary CTA — 4032:21997 (w263 h48) */}
        <a
          href={primaryHref}
          className={`${gilroyMedium.className} relative flex h-[48px] w-full items-center justify-center overflow-hidden px-[20px] py-[10px] shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
          />
          <span className="relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
            {primaryLabel}
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
          />
          <GreenCtaCorners />
        </a>
        {/* Secondary CTA — 4032:22008 (w263 h48) */}
        <a
          href={secondaryHref}
          className={`${gilroyMedium.className} relative flex h-[48px] w-full items-center justify-center overflow-clip bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]`}
        >
          <span className="relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
            {secondaryLabel}
          </span>
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
        </a>
      </div>
    </section>
  );
}

/**
 * Figma 4666:10180 / 4666:10186 — "Hello world in three lines" section
 * (mobile, 393×1110 frame). Layout: title+subtitle (top 30, w 350, gap 10)
 * → code editor (top 182, 355×640) → article carousel (top 840, horizontal,
 * gap 8) → prev/next buttons (top 1036, 44×44, gap 20).
 */
function DeveloperCodeSectionMobile({ data }: { data?: any }) {
  const heading = data?.heading || "Hello world in\nthree lines";
  const headingLines = heading.split("\n");
  const subtitle =
    data?.subtitle ||
    "We invisibly map AI cores to your host drop your model straight into your existing application.";
  const rawArticles: any[] = Array.isArray(data?.articles) ? data.articles : [];
  const articles: DeveloperArticle[] =
    rawArticles.length > 0
      ? rawArticles.map((a: any, i: number) => ({
          icon: mediaUrl(a?.icon) || DEVELOPER_ARTICLES[i]?.icon || "",
          title: a?.title || DEVELOPER_ARTICLES[i]?.title || "",
          description:
            a?.description || DEVELOPER_ARTICLES[i]?.description || "",
        }))
      : DEVELOPER_ARTICLES;
  const carouselRef = useRef<HTMLDivElement>(null);
  const fitRef = useFitText<HTMLHeadingElement>({});
  /** Step = 355px card + 8px gap (Figma 4666:9680). */
  const scrollCarousel = (direction: 1 | -1) => {
    carouselRef.current?.scrollBy({ left: direction * 363, behavior: "smooth" });
  };
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden pt-[30px]">
      {/* Background — top wave (Rectangle 1618873535) + circuit texture with gradient overlays */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[260px] w-[1441px] max-w-none -translate-x-1/2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            alt=""
            src="/developer/pipeline-mobile-wave-top.png"
            className="size-full object-cover"
          />
        </div>
        {/* Gemini_Generated_Image_6dyqpp6dyqpp6dyq 5 — 4666:9655 (top 2, 664×1435) */}
        <div className="absolute left-1/2 top-[2px] h-[1435px] w-[664px] max-w-none -translate-x-1/2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            alt=""
            src="/developer/Gemini_Generated_Image_6dyqpp6dyqpp6dyq 5.webp"
            className="size-full object-cover object-bottom"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 25.145%), linear-gradient(180deg, rgba(0, 0, 0, 0) 39.823%, rgb(0, 0, 0) 64.806%)",
            }}
          />
        </div>
      </div>

      {/* Content block — 4666:9671 (top 30, w 350, gap 10) */}
      <div className="flex w-[350px] max-w-full flex-col items-center gap-[10px]">
        {/* Title group — 4666:9672 (corners bound the 79px group; text offset mt 7) */}
        <div className="relative flex w-full justify-center">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            ref={fitRef}
            className={`${gilroyMedium.className} mt-[7px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              backgroundImage:
                "linear-gradient(107.45deg, rgb(255, 255, 255) 1.35%, rgb(212, 233, 188) 55.16%, rgb(255, 255, 255) 111.67%)",
            }}
          >
            {headingLines.map((line: string, i: number) => (
              <span key={i} className="block leading-[36px]">
                {line}
              </span>
            ))}
          </h2>
        </div>
        {/* Subtitle — 4666:9678 (w 336, Inter Regular 14/21, 75% opacity) */}
        <p
          className={`${interRegular.className} w-[336px] max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic [word-break:break-word]`}
        >
          {subtitle}
        </p>
      </div>

      {/* Connector — 4666:9679 (decorative vertical trace behind the editor glass) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[calc(50%+0.5px)] top-[326px] flex h-[87.093px] w-0 -translate-x-1/2 items-center justify-center"
      >
        <div className="-rotate-90 -scale-y-100 flex-none">
          <div className="relative h-0 w-[87.093px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async"
              alt=""
              src="/developer/connector-vector.svg"
              className="absolute inset-[-2.89px_-3.31%_-2.89px_0] block size-full max-w-none"
            />
          </div>
        </div>
      </div>

      {/* Code editor — 4666:9730 (top 182 → mt 21 below content block, 355×640) */}
      <div className="relative mt-[21px] w-full max-w-[355px] overflow-clip rounded-[16px] border border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] backdrop-blur-[9.5px]">
        {/* Header — 4666:9731 (px 24, pt 8, pb 9, border-b) */}
        <div className="flex w-full items-center gap-[24px] border-b border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-[24px] pt-[8px] pb-[9px]">
          <div className="flex items-center gap-[8px]">
            <span className="size-[12px] rounded-full bg-[rgba(251,44,54,0.6)]" />
            <span className="size-[12px] rounded-full bg-[rgba(240,177,0,0.6)]" />
            <span className="size-[12px] rounded-full bg-[rgba(0,201,80,0.6)]" />
          </div>
          <span
            className={`${interRegular.className} text-[16px] leading-[24px] font-normal tracking-[-0.3125px] whitespace-nowrap text-[rgba(255,255,255,0.6)] not-italic`}
          >
            main.c
          </span>
        </div>
        {/* Code body — 4666:9738 (left 20, top 51 → pt 8 below the 43px header, DM Mono 11/15, white) */}
        <div className="h-[596px] overflow-x-auto px-[20px] pt-[8px] no-scrollbar">
          <pre
            className={`${dmMono.className} whitespace-pre text-[11px] leading-[15px] font-normal text-white not-italic`}
          >
            {DEFAULT_CODE_LINES.map((line, i) => (
              <span key={i} className="block">
                {line.text || "\u00A0"}
              </span>
            ))}
          </pre>
        </div>
      </div>

      {/* Articles — 4666:9680 (top 840 → mt 18 below editor; horizontal carousel, gap 8) */}
      <div
        ref={carouselRef}
        className="relative mt-[18px] w-full max-w-[393px] snap-x snap-mandatory overflow-x-auto scroll-smooth no-scrollbar"
      >
        <div className="flex items-stretch gap-[8px] px-[19px] after:w-[11px] after:shrink-0 after:content-['']">
          {articles.map((article, i) => (
            <div
              key={article.title}
              className="relative flex w-[355px] shrink-0 snap-center items-center gap-[16px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.2)] p-[14px]"
            >
              {/* Icon — 50×49 rounded-12 with radial gradient bg */}
              <div
                className="relative h-[49px] w-[50px] shrink-0 overflow-clip rounded-[12px]"
                style={{
                  backgroundImage: ARTICLE_ICON_BG,
                  backgroundColor: "#1d221c",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async"
                  alt=""
                  aria-hidden
                  src={article.icon}
                  className="absolute left-[13px] top-[13px] size-[24px] max-w-none object-contain"
                />
              </div>
              {/* Text — gap 6px; card 2 title is 26px/29px per Figma 4666:9710 */}
              <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
                <p
                  className={`${gilroyMedium.className} font-medium text-white not-italic [word-break:break-word] text-[22px] leading-[28px]`}
                >
                  {article.title}
                </p>
                <p
                  className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}
                >
                  {article.description}
                </p>
              </div>
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            </div>
          ))}
        </div>
      </div>

      {/* Prev/next — 4666:9656 (top 1036, centered, gap 20, 44×44) */}
      <div className="relative mt-[18px] flex items-center gap-[20px] pb-[30px]">
        <button
          type="button"
          aria-label="Previous article"
          onClick={() => scrollCarousel(-1)}
          className="relative size-[44px] shrink-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            alt=""
            src="/developer/article-nav-prev.svg"
            className="absolute inset-0 size-full"
          />
        </button>
        <button
          type="button"
          aria-label="Next article"
          onClick={() => scrollCarousel(1)}
          className="relative size-[44px] shrink-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            alt=""
            src="/developer/article-nav-next.svg"
            className="absolute inset-0 size-full"
          />
        </button>
      </div>
    </section>
  );
}

/**
 * Figma 4502:8123 — Developer "3rd Fold" / ModelForge Pipeline (mobile, 393×2232).
 * Layout: header (badge/title/subtitle, top 30) → stage-card strip (top 277,
 * starts x80, scrollable, prev/next buttons top 487) → accordion (top 571,
 * x18 w355, gap 12; Train expanded with diagram + feature text).
 * Text inside the expanded panel is laid out with maintained spacing (20px
 * insets) since the Figma panel holds only the diagram image.
 */
function DeveloperPipelineMobile({ data }: { data?: any }) {
  const tagText = data?.tag?.text || "Real-time AI at edge";
  const heading = data?.heading || "The ModelForge Pipeline";
  const subtitle = data?.subtitle || PIPELINE_SUBTITLE;
  const rawTabs: any[] = Array.isArray(data?.tabs) ? data.tabs : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 2 });

  /* Merge CMS tabs with the desktop STAGES fallback (bullets, images, copy) */
  const stages: (Stage & { autoFitFlow: boolean })[] = STAGES.map((stage, i) => {
    const tab = rawTabs[i];
    const cmsFlow =
      mediaUrl(tab?.flow_image) || mediaUrl(tab?.image) || mediaUrl(tab?.media);
    const cmsBullets: StageBullet[] | undefined = Array.isArray(tab?.bullets)
      ? tab.bullets
          .map((b: { title?: string; label?: string; description?: string }) => ({
            title: b?.title || b?.label || "",
            description: b?.description || "",
          }))
          .filter((b: { title: string; description: string }) => b.title && b.description)
      : undefined;
    return {
      ...stage,
      label: tab?.label || stage.label,
      subtitle: tab?.subtitle || tab?.description || stage.subtitle,
      flowImage: cmsFlow || stage.flowImage,
      autoFitFlow: Boolean(cmsFlow),
      bullets: cmsBullets && cmsBullets.length > 0 ? cmsBullets : stage.bullets ?? [],
    };
  });

  /** Step = 220px card + 40px gap (Figma 4502:8337). */
  const scrollStrip = (direction: 1 | -1) => {
    stripRef.current?.scrollBy({ left: direction * 260 });
  };

  return (
    <section
      className="relative w-full overflow-x-clip bg-black"
      data-node-id="4502:8123"
      data-name="3rd Fold"
    >
      {/* === BACKGROUND LAYER (absolute) === */}
      {/* Abstract Design — 4502:8124 (682.04×247.56, centered, y=36) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[36px] h-[247.56px] w-[682.04px] max-w-none -translate-x-1/2"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async"
          alt=""
          src="/developer/pipeline-mobile-abstract.svg"
          className="block size-full"
        />
      </div>
      {/* Top wave — Rectangle 1618873535 (1441×260, centered, y=0) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[260px] w-[1441px] max-w-none -translate-x-1/2"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async"
          alt=""
          src="/developer/pipeline-mobile-wave-top.png"
          className="size-full object-cover"
        />
      </div>

      {/* === HEADER — 4502:8320 (y=30, w=352, gap 15) === */}
      <div className="relative mx-auto flex w-[352px] max-w-full flex-col items-center gap-[15px] pt-[30px]">
        {/* Title block — 4502:8321 (w=350, gap 10 between badge and title) */}
        <div className="flex w-[350px] max-w-full flex-col items-center gap-[10px]">
          {/* Badge "Real-time AI at edge" — 4502:8322 (200×26) */}
          <TagBadge
            label={tagText}
            width={200}
            height={26}
            leftBarLeft={6.48}
            rightBarLeft={191.48}
            centerLabel
            nodeId="4502:8322"
          />
          {/* Title — 4502:8331 (Gilroy Medium 36px, gradient 108.656°;
              mt/mb 5px reproduce the 82px title group inside the 118px block) */}
          <h2
            ref={fitRef}
            className={`${gilroyMedium.className} mt-[5px] mb-[5px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{ backgroundImage: PIPELINE_TITLE_GRADIENT }}
          >
            {heading}
          </h2>
        </div>
        {/* Subtitle — 4502:8336 (Inter Regular 14px/21px, opacity 75, w=336) */}
        <p
          className={`${interRegular.className} w-[336px] max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic [word-break:break-word]`}
        >
          {subtitle}
        </p>
      </div>

      {/* === STAGE-CARD STRIP — 4502:8337 (y=277, row starts x80, gap 40) === */}
      <div
        ref={stripRef}
        className="relative mt-[30px] w-full overflow-x-auto no-scrollbar"
      >
        <div className="relative flex w-max items-center gap-[40px] pl-[80px] pr-[80px]">
          {stages.map((stage, i) => (
            <StageCard
              key={i}
              stage={stage}
              index={i}
              isActive={activeIndex === i}
              onClick={() => setActiveIndex(activeIndex === i ? -1 : i)}
            />
          ))}
          {/* Connecting arrows between cards — 4502:8376/8377/8378 */}
          {[0, 1, 2].map((i) => (
            <div
              key={`arrow-${i}`}
              className="pointer-events-none absolute h-0"
              style={{
                left: 80 + (i + 1) * 220 + i * 40,
                top: i === 2 ? 65 : 65.5,
                width: 40,
              }}
              aria-hidden
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async"
                alt=""
                src={ARROW_SVG}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ width: 58.2, height: 19.8 }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* === PREV/NEXT — 4502:8379 (y=487, centered, gap 20, 44×44) === */}
      <div className="relative mt-[30px] flex items-center justify-center gap-[20px]">
        <button
          type="button"
          aria-label="Scroll pipeline left"
          onClick={() => scrollStrip(-1)}
          className="relative size-[44px] shrink-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            alt=""
            src="/developer/article-nav-prev.svg"
            className="absolute inset-0 size-full"
          />
        </button>
        <button
          type="button"
          aria-label="Scroll pipeline right"
          onClick={() => scrollStrip(1)}
          className="relative size-[44px] shrink-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            alt=""
            src="/developer/article-nav-next.svg"
            className="absolute inset-0 size-full"
          />
        </button>
      </div>

      {/* === ACCORDION — 4502:8211 (y=571, x=18, w=355, gap 12) === */}
      <div className="relative mt-[40px] pl-[18px] pr-[20px] pb-[30px]">
        {/* Bottom wave — Rectangle 1618873536 (1441×341, mirrored, behind cards) */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[551px] left-1/2 h-[341px] w-[1441px] max-w-none -translate-x-1/2 -scale-y-100"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            alt=""
            src="/developer/pipeline-mobile-wave-bottom.png"
            className="size-full object-cover"
          />
        </div>
        <div className="relative flex w-full flex-col gap-[12px]">
          {stages.map((stage, i) => (
            <PipelineAccordionItemMobile
              key={i}
              stage={stage}
              index={i}
              isActive={activeIndex === i}
              onClick={() => setActiveIndex(activeIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Accordion row — Figma 4502:8213 header (355×80) + 4502:8239 expanded panel.
 * Header: 40×40 radial icon tile + 18px Gilroy label + 35×35 #303030 toggle.
 * Expanded panel: black card with the stage text (maintained 20px spacing)
 * and the stage diagram (Train: 353×1247 object-cover).
 */
function PipelineAccordionItemMobile({
  stage,
  index,
  isActive,
  onClick,
}: {
  stage: Stage & { autoFitFlow: boolean };
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const strip = MOBILE_COLLAPSE[index];
  const expandedImage = stage.flowImage;
  return (
    <div className="flex w-full flex-col">
      {/* Header — 4502:8213 (h=80, bg-black, border rgba(240,240,240,0.2)) */}
      <div className="relative h-[80px] w-full shrink-0 border border-solid border-[rgba(240,240,240,0.2)] bg-black">
        {/* Collapsed strip image (hidden when expanded) */}
        {strip && !isActive ? (
          <div
            className="pointer-events-none absolute -translate-x-1/2 mix-blend-plus-lighter"
            style={{
              left: strip.left,
              top: strip.top,
              width: strip.width,
              height: strip.height,
            }}
            aria-hidden
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async"
              alt=""
              src={strip.img}
              className="absolute size-full max-w-none object-bottom"
            />
            <div
              className="absolute inset-0"
              style={{ backgroundImage: strip.gradient }}
            />
          </div>
        ) : null}
        <Corners leftSrc={BADGE_LEFT} rightSrc={BADGE_RIGHT} />
        {/* Content row — 4502:8218 (w=315, justify-between) */}
        <div
          className={`absolute flex h-[40px] w-[315px] items-center justify-between ${
            index >= 2 ? "left-1/2 -translate-x-1/2" : "left-[19px]"
          } ${index === 3 ? "top-1/2 -translate-y-1/2" : "top-[19px]"}`}
        >
          <div className="flex items-center gap-[12px]">
            {/* Icon tile — 4502:8220 (40×40, rounded 6.667, radial gradient) */}
            <div
              className="relative size-[40px] shrink-0 rounded-[6.667px]"
              style={{ backgroundImage: ICON_TILE_BG_40 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async"
                alt=""
                aria-hidden
                src={stage.icon}
                className="absolute left-1/2 top-[calc(50%-0.39px)] size-[24px] -translate-x-1/2 -translate-y-1/2 object-contain"
              />
            </div>
            {/* Label — 4502:8230 (Gilroy Medium 18px/28px, white) */}
            <p
              className={`${gilroyMedium.className} max-w-full text-[18px] leading-[28px] font-medium whitespace-nowrap text-white not-italic overflow-hidden text-ellipsis`}
            >
              {stage.label}
            </p>
          </div>
          {/* Toggle — 4502:8231 (35×35, bg #303030, remove/add icon) */}
          <div className="relative flex size-[35px] shrink-0 items-center justify-center overflow-clip bg-[#303030]">
            <Corners leftSrc={BADGE_LEFT} rightSrc={BADGE_RIGHT} />
            <div className="relative size-[24px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async"
                alt=""
                src={isActive ? REMOVE_ICON : ADD_ICON}
                aria-hidden
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={
                  isActive ? { width: 16, height: 1.5 } : { width: 16, height: 16 }
                }
              />
            </div>
          </div>
        </div>
        {/* Click layer */}
        <button
          type="button"
          onClick={onClick}
          className="absolute inset-0 z-10 cursor-pointer"
          aria-label={`${isActive ? "Collapse" : "Expand"} ${stage.label}`}
        />
      </div>
      {/* Expanded panel — 4502:8239 (Train content card, bottom corners only) */}
      {isActive ? (
        <div className="relative w-full border border-solid border-[rgba(240,240,240,0.2)] bg-black">
          {/* Bottom-left corner — 4502:8240 */}
          <div
            className="pointer-events-none absolute bottom-[-1px] left-[-0.49px] size-[4px]"
            aria-hidden
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async"
              alt=""
              src={BADGE_LEFT}
              className="block size-full max-w-none"
            />
          </div>
          {/* Bottom-right corner — 4502:8241 */}
          <div
            className="pointer-events-none absolute bottom-[-1px] right-[-0.5px] flex size-[4px] items-center justify-center"
            aria-hidden
          >
            <div className="-scale-x-100 flex-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async"
                alt=""
                src={BADGE_RIGHT}
                className="block size-full max-w-none"
              />
            </div>
          </div>
          {/* Textual content — maintained space (20px insets) and alignment */}
          <div className="flex flex-col gap-[16px] px-[20px] pt-[20px]">
            {/* Stage subtitle — desktop accordion header copy */}
            <p
              className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-[#bbb] not-italic [word-break:break-word]`}
            >
              {stage.subtitle}
            </p>
            {/* Feature bullets — desktop accordion typography */}
            <ul className="flex flex-col gap-[16px]">
              {(stage.bullets ?? []).map((bullet, i) => (
                <li key={i} className="flex gap-[10px]">
                  <span
                    aria-hidden
                    className="mt-[9px] block size-[6px] shrink-0 rounded-full bg-white"
                  />
                  <div className="flex min-w-0 flex-col gap-[4px]">
                    <p
                      className={`${interBold.className} text-[16px] leading-[24px] font-bold not-italic text-white`}
                    >
                      {bullet.title}
                    </p>
                    <p
                      className={`${interRegular.className} text-[14px] leading-[21px] font-normal not-italic text-[#d2d2d2]`}
                    >
                      {bullet.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Stage diagram — Train portrait 353×1247 object-cover (4502:8242);
              other stages render their flow diagram at 353px wide */}
          <div className="pb-[14px] pt-[20px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async"
              alt={`${stage.label} flow diagram`}
              src={expandedImage}
              className="mx-auto block w-[353px] max-w-full"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

const COMING_DEFAULT_HEADING_LINE_1 = "Test on the metal,";
const COMING_DEFAULT_HEADING_LINE_2 = "without the metal.";
const COMING_DEFAULT_SUBTITLE =
  "Validate your build in a virtual sandbox,\nno need to wait for hardware.";
const COMING_DEFAULT_CARD_TITLE = "Virtual Sandbox Coming Soon";
const COMING_DEFAULT_CARD_DESC =
  "Complete virtual validation environment for testing your builds before hardware arrives.";
const COMING_DEFAULT_CTA = "Join the Virtual Sandbox Waitlist";
const COMING_DEFAULT_IMG = "/developer/sandbox-image.webp";

/**
 * Figma 4035:25438 — Developer "Coming soon" section (mobile, 393×610 frame).
 * Layout: title+subtitle (gap 10px) → article card (image, text, CTA).
 */
/**
 * Model zoo section (mobile) — responsive adaptation of desktop Figma 5212:6804.
 * Title/subtitle → stacked stats with 1px dividers → full-width primary CTA.
 */
function DeveloperModelZooMobile({ data }: { data?: any }) {
  const { heading: cmsHeading, subtitle, ctaLabel, ctaHref, stats } =
    resolveModelZooContent(data);
  let heading = cmsHeading;
  if (!heading.includes("\n")) {
    heading = heading.replace(" that works.", "\nthat works.");
  }
  const headingLines = heading.split("\n");
  const fitRef = useFitText<HTMLHeadingElement>({});
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-black px-[19px] pt-[40px] pb-[40px]">
      {/* Green glow — mobile adaptation of Ellipse 177 (5212:6805) */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-[240px] h-[420px] w-[560px] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#53D824] opacity-[0.09] blur-[80px]" />
      </div>

      {/* Header — title + subtitle (gap 10px) */}
      <div className="flex w-full flex-col items-center gap-[10px]">
        <div className="relative flex w-fit max-w-full justify-center px-[10px]">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            ref={fitRef}
            className={`${gilroyMedium.className} max-w-full bg-clip-text text-center text-[clamp(28px,9vw,36px)] leading-[1.1] font-medium text-transparent not-italic [overflow-wrap:anywhere]`}
            style={{ backgroundImage: MODEL_ZOO_TITLE_GRADIENT }}
          >
            {headingLines.map((line: string, i: number) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>
        <p
          className={`${interRegular.className} w-full max-w-[336px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic [overflow-wrap:anywhere]`}
        >
          {subtitle}
        </p>
      </div>

      {/* Stats — stacked with 1px dividers (Line 87 mobile adaptation) */}
      <div className="relative mt-[24px] flex w-full flex-col bg-[rgba(0,0,0,0.1)]">
        {stats.map((stat, i) => (
          <Fragment key={i}>
            <div className="flex w-full flex-col gap-[14px] px-[2px] py-[18px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" alt="" src={stat.icon} className="h-[42px] w-[42px] max-w-none" />
              <p
                className={`${interRegular.className} w-full text-[14px] leading-[21px] font-normal text-white opacity-90 not-italic [word-break:break-word]`}
              >
                {stat.text}
              </p>
            </div>
            {i < stats.length - 1 ? (
              <div className="h-px w-full bg-white/10" />
            ) : null}
          </Fragment>
        ))}
        <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      </div>

      {/* CTA — full width */}
      <a
        href={ctaHref}
        className={`${gilroyMedium.className} relative mt-[24px] flex h-[48px] w-full max-w-full items-center overflow-hidden px-[12px] py-[10px] shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
        />
        <span className="relative mx-auto truncate text-[clamp(12px,3.5vw,16px)] leading-[28px] font-medium uppercase text-white not-italic">
          {ctaLabel}
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
        />
        <GreenCtaCorners />
      </a>
    </section>
  );
}

function DeveloperComingSoonMobile({ data }: { data?: any }) {
  let heading = data?.heading || `${COMING_DEFAULT_HEADING_LINE_1}\n${COMING_DEFAULT_HEADING_LINE_2}`;
  if (!heading.includes("\n")) {
    heading = heading.replace(" to volume", "\nto volume").replace(", without", ",\nwithout");
  }
  const headingLines = heading.split("\n");
  const subtitle = data?.subtitle || COMING_DEFAULT_SUBTITLE;
  const subtitleLines = subtitle.split("\n");
  const cardTitle = data?.card_title || COMING_DEFAULT_CARD_TITLE;
  const cardDescription = data?.card_description || COMING_DEFAULT_CARD_DESC;
  const ctaLabel = data?.cta_label || COMING_DEFAULT_CTA;
  const ctaHref = data?.cta_href || "#";
  const imgSrc = mediaUrl(data?.image) || COMING_DEFAULT_IMG;
  const fitRef = useFitText<HTMLHeadingElement>({});
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden px-[19px] pt-[30px] pb-[40px]">
      {/* Background image — 4035:25440 (opacity-60, radial fade) */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        {/* Ellipse glow for mobile */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-[50%] top-[45%] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        >
          <div
            style={{
              width: "450px",
              height: "600px",
              transform: "rotate(90deg)",
              borderRadius: "600px",
              background: "var(--Colors-Neutral-1000, #000)",
              filter: "blur(60px)",
            }}
          />
        </div>

        <div className="absolute left-[calc(50%+24px)] top-0 h-full w-[min(639px,160%)] max-w-none -translate-x-1/2 opacity-60">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            alt=""
            src="/developer/image%20250.png"
            className="absolute inset-0 size-full object-cover object-bottom"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 50% 47.9%, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
            }}
          />
        </div>
      </div>

      {/* Content block — 4035:25441 (title + subtitle, gap 10px) */}
      <div className="flex w-full max-w-full flex-col items-center gap-[10px]">
        {/* Title — 4035:25443 */}
        <div className="relative flex w-fit max-w-full justify-center px-[10px]">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            ref={fitRef}
            className={`${gilroyMedium.className} max-w-full bg-clip-text text-center text-[clamp(28px,9vw,36px)] leading-[1.05] font-medium text-transparent not-italic [overflow-wrap:anywhere]`}
            style={{
              backgroundImage:
                "linear-gradient(107.45deg, rgb(255, 255, 255) 1.35%, rgb(212, 233, 188) 55.16%, rgb(255, 255, 255) 111.67%)",
            }}
          >
            {headingLines.map((line: string, i: number) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>
        {/* Subtitle — 4035:25448 */}
        <p
          className={`${interRegular.className} w-full max-w-[336px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic [overflow-wrap:anywhere]`}
        >
          {subtitleLines.map((line: string, i: number) => (
            <span key={i}>
              {i > 0 ? <br aria-hidden /> : null}
              {line}
            </span>
          ))}
        </p>
      </div>

      {/* Article card — glass + blur; no horizontal overflow */}
      <div className="relative mt-[20px] flex w-full max-w-full flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.04)] px-[16px] pt-[16px] pb-[24px] backdrop-blur-[12px]">
        {/* Image — 4035:25450 (140×140) */}
        <div className="relative size-[140px] max-w-full shrink-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            alt=""
            src={imgSrc}
            className="absolute left-[-3.1%] top-[-0.02%] h-[106.13%] w-[103.1%] max-w-none object-cover"
          />
        </div>
        {/* Text content — 4035:25451 (gap 10px) */}
        <div className="flex w-full max-w-full flex-col items-center gap-[10px] text-center">
          <p
            className={`${gilroyMedium.className} w-full max-w-full text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
          >
            {cardTitle}
          </p>
          <p
            className={`${interRegular.className} w-full max-w-full text-[14px] leading-[21px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}
          >
            {cardDescription}
          </p>
        </div>

        {/* CTA — full width; label can shrink instead of overflowing */}
        <a
          href={ctaHref}
          className={`${gilroyMedium.className} relative flex h-[48px] w-full max-w-full items-center overflow-hidden px-[12px] py-[10px] shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
          />
          <div className="relative mx-auto flex w-full min-w-0 max-w-[306px] items-center justify-between gap-[8px]">
            <span className="min-w-0 truncate text-[clamp(12px,3.5vw,16px)] leading-[28px] font-medium uppercase text-white not-italic">
              {ctaLabel}
            </span>
            <span className="size-[20px] shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async"
                alt=""
                src="/developer/waitlist-icon.svg"
                className="size-full max-w-none object-contain"
              />
            </span>
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
          />
          <GreenCtaCorners />
        </a>

        <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      </div>
    </section>
  );
}

/**
 * Figma 4035:26190 — Developer modules section (mobile, 393×1350 frame).
 * Layout: title+subtitle (gap 10px) → 2 article cards (gap 12px) with images.
 * Card 1 uses primary green CTA; card 2 uses secondary glass CTA.
 */
function DeveloperModulesMobile({ data }: { data?: any }) {
  let heading = data?.heading || "From bench validation\nto volume production.";
  if (!heading.includes("\n")) {
    heading = heading.replace(" to volume", "\nto volume").replace(", without", ",\nwithout");
  }
  const headingLines = heading.split("\n");
  const subtitle =
    data?.subtitle ||
    "A seamless toolchain is useless if hardware can't integrate. Move from software validation to deployment instantly with our modular edge ecosystem.";
  const modules =
    data?.modules && Array.isArray(data.modules) && data.modules.length > 0
      ? data.modules
      : DEVELOPER_MODULES;
  const fitRef = useFitText<HTMLHeadingElement>({});
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden px-[19px] pt-[30px]">
      {/* Content block — 4035:26193 (title + subtitle, gap 10px) */}
      <div className="flex w-full flex-col items-center gap-[10px]">
        {/* Title — 4035:26195 */}
        <div className="relative flex w-full justify-center">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            ref={fitRef}
            className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              backgroundImage:
                "linear-gradient(98.20deg, rgb(255, 255, 255) 1.35%, rgb(212, 233, 188) 55.16%, rgb(255, 255, 255) 111.67%)",
            }}
          >
            {headingLines.map((line: string, i: number) => (
              <span key={i} className="block leading-[36px]">
                {line}
              </span>
            ))}
          </h2>
        </div>
        {/* Subtitle — 4035:26200 */}
        <p
          className={`${interRegular.className} w-[336px] max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic [word-break:break-word]`}
        >
          {subtitle}
        </p>
      </div>

      {/* Cards — 4035:26201 (gap 30px from content, 12px between cards) */}
      <div className="mt-[30px] flex w-full flex-col gap-[12px]">
        {modules.map((module: any, i: number) => {
          const fallback = DEVELOPER_MODULES[i] || DEVELOPER_MODULES[0];
          const image = mediaUrl(module?.image) || fallback.image;
          const title = module?.title || fallback.title;
          const description = module?.description || fallback.description;
          const ctaLabel = module?.cta_label || fallback.ctaLabel;
          const ctaHref = module?.cta_href || "#";
          const isPrimary = !!fallback.ctaArrow;
          return (
            <div
              key={title || i}
              className="relative flex flex-col items-center gap-[12px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] px-[16px] pt-[12px] pb-[20px]"
            >
              {/* Image — 4035:26203 (h≈240) */}
              <div className="relative h-[240px] w-full shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async"
                  alt=""
                  src={image}
                  className="absolute inset-0 size-full object-contain"
                />
              </div>
              {/* NewsSection — 4035:26204 (gap 12px) */}
              <div className="flex w-full flex-col gap-[12px]">
                {/* Content — title + description (gap 6px) */}
                <div className="flex w-full flex-col gap-[6px]">
                  <p
                    className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
                  >
                    {title}
                  </p>
                  <p
                    className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}
                  >
                    {description}
                  </p>
                </div>
                {/* CTA — primary green or secondary glass */}
                {isPrimary ? (
                  <a
                    href={ctaHref}
                    className={`${gilroyMedium.className} relative flex h-[48px] w-full items-center justify-center overflow-hidden px-[16px] py-[10px] shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
                    />
                    <span className="relative text-[12px] leading-[16px] font-medium uppercase whitespace-nowrap text-white not-italic">
                      {ctaLabel}
                    </span>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
                    />
                    <GreenCtaCorners disableDots />
                  </a>
                ) : (
                  <a
                    href={ctaHref}
                    className={`${gilroyMedium.className} relative flex h-[48px] w-full items-center justify-center overflow-clip bg-[rgba(226,241,202,0.12)] px-[16px] py-[10px]`}
                  >
                    <span className="relative text-[12px] leading-[16px] font-medium uppercase whitespace-nowrap text-white not-italic">
                      {ctaLabel}
                    </span>
                    <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
                  </a>
                )}
              </div>
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

/**
 * Figma 4062:11954 — Developer copilots section (mobile, 393×1440 frame).
 * Layout: title+subtitle (gap 10px) → 3 copilot cards (gap 12px).
 * Cards 1–2 use secondary glass CTA; card 3 uses primary green CTA.
 */
function DeveloperCopilotsMobile({ data }: { data?: any }) {
  const heading = data?.heading || "Your deployment co-pilots.";
  const subtitle =
    data?.subtitle ||
    "A seamless toolchain is useless if hardware can't integrate. Move from software validation to deployment instantly with our modular edge ecosystem.";
  const copilots =
    data?.copilots && Array.isArray(data.copilots) && data.copilots.length > 0
      ? data.copilots
      : DEVELOPER_COPILOTS;
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 2 });
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden px-[19px] pt-[30px]">
      {/* Content block — 4062:11957 (title + subtitle, gap 10px) */}
      <div className="flex w-full flex-col items-center gap-[10px]">
        {/* Title — 4062:11959 */}
        <div className="relative flex w-full justify-center">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            ref={fitRef}
            className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              backgroundImage:
                "linear-gradient(106.23deg, rgb(255, 255, 255) 1.35%, rgb(212, 233, 188) 55.16%, rgb(255, 255, 255) 111.67%)",
            }}
          >
            {heading}
          </h2>
        </div>
        {/* Subtitle — 4062:11964 */}
        <p
          className={`${interRegular.className} w-[336px] max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic [word-break:break-word]`}
        >
          {subtitle}
        </p>
      </div>

      {/* Cards — 4062:11965 (gap 30px from content, 12px between cards) */}
      <div className="mt-[30px] flex w-full flex-col gap-[12px]">
        {copilots.map((copilot: any, i: number) => {
          const fallback = DEVELOPER_COPILOTS[i] || DEVELOPER_COPILOTS[0];
          const icon = mediaUrl(copilot?.icon) || fallback.icon;
          const title = copilot?.title || fallback.title;
          const description = copilot?.description || fallback.description;
          const ctaLabel = copilot?.cta_label || fallback.ctaLabel;
          const ctaHref = copilot?.cta_href || "#";
          const isPrimary = i === copilots.length - 1;
          return (
            <div
              key={title || i}
              className="relative flex flex-col gap-[16px] overflow-clip p-[24px]"
              style={{ backgroundImage: COPILOT_CARD_BG }}
            >
              {/* Icon — 72×72 rounded-12 with radial gradient bg */}
              <div
                className="relative size-[72px] shrink-0 rounded-[12px]"
                style={{ backgroundImage: COPILOT_ICON_BG }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async"
                  alt=""
                  src={icon}
                  aria-hidden
                  className="absolute left-1/2 top-1/2 size-[48px] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain"
                />
              </div>
              {/* Content — title, description, CTA (gap 11px) */}
              <div className="flex w-full flex-col gap-[11px]">
                <p
                  className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
                >
                  {title}
                </p>
                <p
                  className={`${interRegular.className} text-[14px] leading-[19.36px] font-normal text-white opacity-65 not-italic [word-break:break-word]`}
                >
                  {description}
                </p>
                {isPrimary ? (
                  <a
                    href={ctaHref}
                    className={`${gilroyMedium.className} relative flex h-[48px] w-full shrink-0 items-center justify-center overflow-hidden px-[16px] py-[10px] shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
                    />
                    <span className="relative text-[12px] leading-[16px] font-medium uppercase whitespace-nowrap text-white not-italic">
                      {ctaLabel}
                    </span>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
                    />
                    <GreenCtaCorners disableDots />
                  </a>
                ) : (
                  <a
                    href={ctaHref}
                    className={`${gilroyMedium.className} relative flex h-[48px] w-full shrink-0 items-center justify-center overflow-clip bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]`}
                  >
                    <span className="relative text-[12px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
                      {ctaLabel}
                    </span>
                    <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
                  </a>
                )}
              </div>
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
