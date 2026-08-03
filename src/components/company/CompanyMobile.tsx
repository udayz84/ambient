import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import { dmMono, gilroyMedium, gilroySemiBold, interRegular, interSemiBold } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { SILICON_PARTNERS } from "../ecosystem/ecosystem-data";
import {
  ADVISORY_BOARD,
  LEADERSHIP_TEAM,
  type LeadershipMember,
} from "./company-leadership-data";
import { LeadershipCarousel } from "./CompanyLeadershipCarousel";
import {
  COMPANY_COMPACT_ARTICLES,
  COMPANY_FEATURED_ARTICLE,
} from "./company-articles-data";
import {
  COMPANY_ENGAGEMENT_CARDS,
  COMPANY_JOIN_TEAM,
} from "./company-engagement-data";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

const MISSION_BG =
  "linear-gradient(rgba(83, 216, 36, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%), linear-gradient(90deg, rgba(21, 21, 21, 0.3) 0%, rgba(21, 21, 21, 0.3) 100%)";

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
      <span className="relative z-10 flex items-center justify-center gap-[8px] text-[13px] leading-[normal] font-semibold uppercase whitespace-nowrap text-white not-italic">
        {children}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/careers/cta-dot.svg"
          alt=""
          className="size-[6px] shrink-0"
          aria-hidden
        />
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
const FALLBACK_HERO_TITLE = "A new paradigm for efficient AI compute";
const FALLBACK_HERO_BODY =
  "We build energy-aware, programmable, mixed-signal AI processors that unlock orders-of-magnitude improvements in performance-per-watt, enabling scalable intelligence across edge, enterprise, and cloud.";
const FALLBACK_HERO_BG = "/mobile/company/hero.png";

function CompanyHeroMobile({ data }: { data?: any }) {
  const title = (data?.title as string) || FALLBACK_HERO_TITLE;
  const body = (data?.body as string) || FALLBACK_HERO_BODY;
  const bgSrc = FALLBACK_HERO_BG;
  return (
    <section
      className="relative w-full overflow-hidden bg-black pt-[108px]"
      aria-label="Company hero"
      data-node-id="3244:5532"
      data-name="Banner"
    >
      <div className="relative mx-auto h-[557px] w-full">
        {/* 3244:6106 — hero background image */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[189px] overflow-hidden"
          data-node-id="3244:6106"
          data-name="image 125"
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bgSrc}
            alt=""
            className="block w-full"
          />
        </div>

        {/* 3244:5535 — title corner brackets (Group 78 bounds: x20 y4 w352 h66) */}
        <div
          className="pointer-events-none absolute left-[20px] top-[4px] h-[66px] w-[352px]"
          data-node-id="3244:5535"
          data-name="Group 78"
          aria-hidden
        >
          <GreenCtaCorners />
        </div>

        {/* 3244:5536 — headline (x29 y7 w321) */}
        <h1
          className={`${gilroyMedium.className} absolute left-[29px] top-[7px] w-[321px] max-w-full bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic`}
          style={{ backgroundImage: gradient("100.882deg") }}
          data-node-id="3244:5536"
        >
          {title}
        </h1>

        {/* 3244:5541 — body (x28 y130 w336) */}
        <p
          className={`${interRegular.className} absolute left-[28px] top-[130px] w-[336px] max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic [word-break:break-word]`}
          data-node-id="3244:5541"
        >
          {body}
        </p>
      </div>
    </section>
  );
}

/* -------------------------------- MISSION --------------------------------- */
const FALLBACK_MISSION_HEADING = "A mission dictated by physics";
const FALLBACK_MISSION_BODY_1 =
  "The era of patching legacy compute is over. Forcing next-generation AI through decades-old digital bottlenecks only guarantees massive power drain and wrecked economics. Ambient Scientific is confronting this physical wall by re-architecting compute from the metal up, reinventing analog circuits, native instruction sets, and developer frameworks.";
const FALLBACK_MISSION_BODY_2 =
  "The result is an architecture that unlocks breakthrough AI performance while requiring a fraction of the power consumption and silicon area. We exist to make intelligence truly ambient: an invisible, ubiquitous foundation built to endure for as long as the era of AI lasts, from the smallest edge sensor to the largest hyperscale cloud server.";

const MISSION_STATS_FALLBACK = [
  {
    value: "100+",
    label: "Employees",
    description: "A passionate team of engineers, scientists and innovators.",
  },
  {
    value: "100+",
    label: "Patents",
    description: "Driving innovation with deep IP and proprietary breakthroughs.",
  },
  {
    value: "50+",
    label: "Active Customer Projects",
    description:
      "Partnering with industry leaders to build intelligent solutions at the edge.",
  },
];

function CompanyMissionMobile({ data }: { data?: any }) {
  const heading = (data?.heading as string) || FALLBACK_MISSION_HEADING;
  const body1 = (data?.body_paragraph_1 as string) || FALLBACK_MISSION_BODY_1;
  const body2 = (data?.body_paragraph_2 as string) || FALLBACK_MISSION_BODY_2;

  const strapiStats = Array.isArray(data?.stats) ? data.stats : null;
  const stats =
    strapiStats && strapiStats.length > 0
      ? strapiStats.map((s: any, i: number) => {
          const fallback = MISSION_STATS_FALLBACK[i] ?? MISSION_STATS_FALLBACK[MISSION_STATS_FALLBACK.length - 1];
          return {
            value: (s?.value as string) || fallback.value,
            label: (s?.label as string) || fallback.label,
            description: (s?.description as string) || fallback.description,
          };
        })
      : MISSION_STATS_FALLBACK;

  return (
    <SectionWrap aria-label="A mission dictated by physics" className="!py-[40px]">
      <div
        className="relative flex w-full flex-col gap-[28px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] p-[28px]"
        style={{ backgroundImage: MISSION_BG }}
      >
        <Corners />
        <SectionTitle deg="104.363deg" className="self-start text-left">
          {heading}
        </SectionTitle>

        <div
          className={`${interRegular.className} flex flex-col gap-[16px] text-[14px] leading-[22px] font-normal text-[#f0f0f0] opacity-70 not-italic`}
        >
          <p>{body1}</p>
          <p>{body2}</p>
        </div>

        <div className="flex flex-col gap-[20px]">
          {stats.map((stat: any) => (
            <div key={stat.label} className="flex flex-col gap-[6px] border-l border-white/15 pl-[16px]">
              <div className="flex items-baseline gap-[12px]">
                <span className={`${gilroySemiBold.className} text-[30px] leading-[34px] font-semibold text-white not-italic`}>
                  {stat.value}
                </span>
                <span className={`${interRegular.className} text-[15px] leading-[20px] font-normal whitespace-nowrap text-[#53d824] not-italic`}>
                  {stat.label}
                </span>
              </div>
              <p className={`${interRegular.className} text-[13px] leading-[19px] font-normal text-white opacity-60 not-italic`}>
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrap>
  );
}

/* ------------------------------- LEADERSHIP ------------------------------- */
const FALLBACK_LEADERSHIP_HEADING = "Our minds powering the revolution";
const FALLBACK_LEADERSHIP_SUBTITLE =
  "We're building programmable AI processors that deliver breakthrough performance and power efficiency from edge to cloud.";

const MOBILE_PORTRAIT_CLASS =
  "absolute inset-0 size-full max-w-none object-cover object-top";

function toMemberMobile(raw: any, fallback: LeadershipMember, index: number): LeadershipMember {
  const bioText = (raw?.bio_paragraphs as string) || "";
  const bioParagraphs = bioText
    ? bioText.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
    : fallback.bioParagraphs;
  return {
    name: (raw?.name as string) || fallback.name,
    role: (raw?.title as string) || fallback.role,
    bioParagraphs,
    imageSrc: mediaUrl(raw?.photo) || fallback.imageSrc,
    imageClassName: fallback.imageClassName ?? MOBILE_PORTRAIT_CLASS,
    linkedInHref: (raw?.linkedin_url as string) || fallback.linkedInHref,
    nodeId: raw?.id ? `leader-${raw.id}` : `leader-strapi-${index}`,
    imageNodeId: fallback.imageNodeId,
    nameNodeId: fallback.nameNodeId,
    readMoreNodeId: fallback.readMoreNodeId,
  };
}

function CompanyLeadershipMobile({ data }: { data?: any }) {
  const heading = (data?.heading as string) || FALLBACK_LEADERSHIP_HEADING;
  const subtitle = (data?.subtitle as string) || FALLBACK_LEADERSHIP_SUBTITLE;
  const team = Array.isArray(data?.team) ? data.team : null;

  const teamMembers =
    team && team.length > 0
      ? team.map((raw: any, i: number) =>
          toMemberMobile(
            raw,
            LEADERSHIP_TEAM[i] ?? LEADERSHIP_TEAM[LEADERSHIP_TEAM.length - 1],
            i,
          ),
        )
      : null;

  const advisoryData = Array.isArray(data?.advisory_board) ? data.advisory_board : null;
  const advisoryMembers =
    advisoryData && advisoryData.length > 0
      ? advisoryData.map((raw: any, i: number) =>
          toMemberMobile(
            raw,
            ADVISORY_BOARD[i] ?? ADVISORY_BOARD[ADVISORY_BOARD.length - 1],
            i,
          ),
        )
      : null;

  return (
    <section
      className="relative w-full overflow-hidden bg-black pb-[56px]"
      aria-label="Our minds powering the revolution"
      data-node-id="3244:6233"
      data-name="3rd Fold"
    >
      {/* ===== Leadership team ===== */}
      <div className="px-[21px] pt-[29px]">
        <div className="relative mx-auto h-[79px] w-[350px]">
          <div
            className="pointer-events-none absolute left-1/2 top-[4px] h-[66px] w-[353px] -translate-x-1/2"
            aria-hidden
          >
            <Corners />
          </div>
          <h2
            className={`${gilroyMedium.className} absolute inset-x-0 top-[7px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic`}
            style={{ backgroundImage: gradient("107.454deg") }}
          >
            {heading}
          </h2>
        </div>
        <p
          className={`${interRegular.className} mx-auto mt-[10px] w-[350px] text-center text-[14px] leading-[16px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
        >
          {subtitle}
        </p>
      </div>

      <div className="mt-[34px]">
        <LeadershipCarousel
          members={teamMembers ?? LEADERSHIP_TEAM}
          variant="leadership"
        />
      </div>

      {/* ===== Advisory board ===== */}
      {(advisoryMembers ?? ADVISORY_BOARD).length > 0 ? (
        <>
          <div className="mt-[47px] px-[21px] pt-[30px]">
            <div className="relative mx-auto h-[62px] w-[350px]">
              <div
                className="pointer-events-none absolute left-1/2 top-[4px] h-[54px] w-[353px] -translate-x-1/2"
                aria-hidden
              >
                <Corners />
              </div>
              <h2
                className={`${gilroyMedium.className} absolute inset-x-0 top-[13px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic`}
                style={{ backgroundImage: gradient("114.188deg") }}
              >
                Advisory Board
              </h2>
            </div>
          </div>

          <div className="mt-[34px]">
            <LeadershipCarousel members={advisoryMembers ?? ADVISORY_BOARD} variant="advisory" />
          </div>
        </>
      ) : null}
    </section>
  );
}

/* ---------------------------------- DNA ----------------------------------- */
const FALLBACK_DNA_HEADING = "Driven by physics. Defined by our DNA.";
const FALLBACK_DNA_SUBTITLE =
  "We build from first principles and validate everything in silicon.";

const DNA_CARDS = [
  {
    title: "Grounded in Science",
    description:
      "Our work is based on physics, not assumption. Every decision, from design to architecture, follows measurable truth and validation.",
  },
  {
    title: "Stay Curious. Stay Skeptical.",
    description:
      "We question assumptions, challenge conventions, and continuously refine our understanding. Progress comes from disciplined curiosity grounded in first principles.",
  },
  {
    title: "Chase the Impossible",
    description:
      "We focus on constraints others accept as permanent. Limits in power, performance, and scalability are not trade-offs to manage, but problems to fundamentally solve.",
  },
  {
    title: "Protect What Powers Us",
    description:
      "Energy is the defining constraint of AI. We design systems that deliver exponentially higher performance while consuming a fraction of the power, making intelligence sustainable at scale.",
  },
];

function DnaCard({
  card,
  className = "",
}: {
  card: { title: string; description: string };
  className?: string;
}) {
  return (
    <article className={`relative w-full ${className}`}>
      <div className="flex flex-col gap-[10px] px-[20px] pt-[18px] pb-[18px]">
        <p
          className={`${gilroyMedium.className} text-[20px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
        >
          {card.title}
        </p>
        <p
          className={`${interRegular.className} text-[14px] leading-[20px] font-normal text-white opacity-65 not-italic [word-break:break-word]`}
        >
          {card.description}
        </p>
      </div>
      <Corners />
    </article>
  );
}

const FALLBACK_DNA_BG = "/company/image 137.png";

function CompanyDnaMobile({ data }: { data?: any }) {
  const heading = (data?.heading as string) || FALLBACK_DNA_HEADING;
  const subtitle = (data?.subtitle as string) || FALLBACK_DNA_SUBTITLE;
  const bgSrc = mediaUrl(data?.background_image) || FALLBACK_DNA_BG;

  const strapiCards = Array.isArray(data?.value_cards) ? data.value_cards : null;
  const cards =
    strapiCards && strapiCards.length > 0
      ? strapiCards.map((c: any, i: number) => {
          const fallback = DNA_CARDS[i] ?? DNA_CARDS[DNA_CARDS.length - 1];
          return {
            title: (c?.title as string) || fallback.title,
            description: (c?.description as string) || fallback.description,
          };
        })
      : DNA_CARDS;

  return (
    <section
      className="relative w-full overflow-hidden bg-black pb-[64px]"
      aria-label="Driven by physics. Defined by our DNA."
      data-node-id="3244:7009"
      data-name="4th Fold"
    >
      {/* Title block */}
      <div className="px-[19px] pt-[30px]">
        <div className="relative mx-auto h-[79px] w-[350px]">
          <div
            className="pointer-events-none absolute left-1/2 top-[4px] h-[66px] w-[356px] -translate-x-1/2"
            aria-hidden
          >
            <Corners />
          </div>
          <h2
            className={`${gilroyMedium.className} absolute inset-x-0 top-[7px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic`}
            style={{ backgroundImage: gradient("107.454deg") }}
          >
            {heading}
          </h2>
        </div>
        <p
          className={`${interRegular.className} mx-auto mt-[10px] w-[334px] text-center text-[14px] leading-[16px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
        >
          {subtitle}
        </p>
      </div>

      {/* Cards + background image between pairs */}
      <div className="relative mt-[31px] px-[19px]">
        <DnaCard card={cards[0]} />
        <DnaCard card={cards[1]} className="mt-[29px]" />

        <div className="relative">
          {/* Background image 137 — bleeds, sits between the two card pairs */}
          <div
            className="pointer-events-none absolute top-[1px] left-1/2 z-0 h-[425px] w-[803px] max-w-none -translate-x-1/2 overflow-hidden"
            aria-hidden
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bgSrc}
              alt=""
              className="size-full object-cover object-bottom"
            />
          </div>
          <div className="relative z-10">
            <div className="h-[392px]" aria-hidden />
            <DnaCard card={cards[2]} />
            <DnaCard card={cards[3]} className="mt-[29px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- ECOSYSTEM -------------------------------- */
const FALLBACK_ECOSYSTEM_HEADING_LINE_1 = "A globally resilient";
const FALLBACK_ECOSYSTEM_HEADING_LINE_2 = "ecosystem";
const FALLBACK_ECOSYSTEM_SUBTITLE =
  "Backed by Tier-1 foundries and integrated with the world's leading technology distributors and platforms.";

const ECOSYSTEM_COLUMNS_FALLBACK = [
  {
    icon: "/company/ecosystem-icon-footprint.svg",
    title: "Global Footprint",
    description:
      "Headquartered in Santa Clara, CA with dedicated R&D and hardware labs in Bangalore and Singapore.",
  },
  {
    icon: "/company/ecosystem-icon-distribution.svg",
    title: "Distribution & Supply Chain",
    description:
      "Authorized global distribution through trusted enterprise partners ensuring secure, high-volume silicon delivery.",
  },
];

function CompanyEcosystemMobile({ data }: { data?: any }) {
  const rawHeading = (data?.heading as string) || "A globally resilient\necosystem";
  const subtitle = (data?.subtitle as string) || FALLBACK_ECOSYSTEM_SUBTITLE;
  const headingLines = rawHeading.includes("\n") 
    ? rawHeading.split("\n") 
    : rawHeading === "A globally resilient ecosystem"
      ? ["A globally resilient", "ecosystem"]
      : [rawHeading];

  const strapiColumns = Array.isArray(data?.columns) ? data.columns : null;
  const columns =
    strapiColumns && strapiColumns.length > 0
      ? strapiColumns.map((c: any, i: number) => {
          const fallback = ECOSYSTEM_COLUMNS_FALLBACK[i] ?? ECOSYSTEM_COLUMNS_FALLBACK[ECOSYSTEM_COLUMNS_FALLBACK.length - 1];
          return {
            icon: mediaUrl(c?.icon) || fallback.icon,
            title: (c?.title as string) || fallback.title,
            description: (c?.description as string) || fallback.description,
          };
        })
      : ECOSYSTEM_COLUMNS_FALLBACK;
  const mapSrc = mediaUrl(data?.map_image) || "/company/Map.png";

  return (
    <section
      className="relative w-full bg-black px-[16px] py-[32px] overflow-hidden"
      aria-label="A globally resilient ecosystem"
    >


      <div className="relative z-10 border-[0.5px] border-solid border-[rgba(255,255,255,0.15)] px-[10px] py-[32px] overflow-clip">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Corners />
        </div>

        {/* Title */}
        <div className="relative mx-auto w-fit px-[12px] py-[4px] mb-[25px]">
          <Corners />
          <h2
            className={`${gilroyMedium.className} bg-clip-text text-center text-[32px] min-[390px]:text-[36px] leading-[36px] font-medium text-transparent not-italic`}
            style={{ backgroundImage: gradient("105.083deg") }}
          >
            {headingLines.map((line, i) => (
              <span key={i} className="whitespace-nowrap block">
                {line}
              </span>
            ))}
          </h2>
        </div>

        {/* Subtitle */}
        <p
          className={`${interRegular.className} text-[14px] leading-[20px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
        >
          {subtitle}
        </p>

        {/* Divider (Line 91) */}
        <div className="mt-[24px] h-px w-full bg-white/15" aria-hidden />

        {/* Columns */}
        <div className="mt-[24px] flex flex-col gap-[34px]">
          {columns.map((col: any) => (
            <div key={col.title} className="flex flex-col gap-[12px]">
              <div className="flex items-center gap-[10px]">
                <Image
                  src={col.icon}
                  alt=""
                  width={32}
                  height={32}
                  className="size-[32px] shrink-0"
                  aria-hidden
                />
                <p
                  className={`${gilroyMedium.className} text-[22px] leading-[29px] font-medium text-white not-italic whitespace-nowrap`}
                >
                  {col.title}
                </p>
              </div>
              <p
                className={`${interRegular.className} max-w-[309px] text-[14px] leading-[20px] font-normal text-white opacity-65 not-italic [word-break:break-word]`}
              >
                {col.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Map Image (below boxes) */}
      <div className="relative mt-[-10px] -mx-[16px] h-[300px] w-[calc(100%+32px)] overflow-hidden">
        <Image
          src={mapSrc}
          alt="Global footprint map"
          fill
          className="object-cover object-top mix-blend-screen"
        />
        {/* Very slight top gradient to smooth the transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent h-4" />
      </div>
    </section>
  );
}

/* --------------------------- TECHNOLOGY PARTNERS -------------------------- */
const FALLBACK_TECH_PARTNERS_TITLE = "TECHNOLOGY PARTNERS";

function buildMobilePartnerLogo(p: any) {
  const logoUrl = mediaUrl(p?.logo);
  if (!logoUrl) return null;
  const naturalW = p?.logo?.width ?? 80;
  const naturalH = p?.logo?.height ?? 24;
  const maxW = 80;
  const maxH = 24;
  const scale = Math.min(maxW / naturalW, maxH / naturalH, 1);
  return {
    src: logoUrl,
    width: Math.max(1, Math.round(naturalW * scale)),
    height: Math.max(1, Math.round(naturalH * scale)),
  };
}

function CompanyTechnologyPartnersMobile({ data }: { data?: any }) {
  const title = (data?.title as string) || FALLBACK_TECH_PARTNERS_TITLE;

  const strapiPartners = Array.isArray(data?.partners) ? data.partners : null;
  const partnerLogos = strapiPartners
    ? (strapiPartners
        .map(buildMobilePartnerLogo)
        .filter(Boolean) as { src: string; width: number; height: number }[])
    : null;
  const hasStrapiLogos = partnerLogos !== null && partnerLogos.length > 0;

  return (
    <section
      className="relative w-full bg-black"
      aria-label="Technology partners"
      data-node-id="3245:312"
      data-name="6th fold"
    >
      <div className="px-[20px] pt-[10px] pb-[64px]">
        {/* Title — 48px, ghosted dark gradient, opacity 90%, left aligned */}
        <p
          className={`${gilroySemiBold.className} bg-clip-text text-left text-[48px] leading-[42px] font-semibold tracking-[-0.96px] text-transparent opacity-90 not-italic [word-break:break-word]`}
          style={{
            backgroundImage:
              "linear-gradient(107.119deg, rgb(22, 22, 22) 9.0248%, rgb(39, 39, 39) 37.884%, rgb(18, 18, 18) 111.41%)",
          }}
          data-node-id="3244:19801"
        >
          {title}
        </p>

        {/* Partner grid */}
        <div className="relative mt-[5px] bg-[rgba(255,255,255,0.04)] border-[0.5px] border-solid border-white/10">
          <Corners
            leftSrc="/ecosystem/corner-tl.svg"
            rightSrc="/ecosystem/corner-tr.svg"
          />
          {hasStrapiLogos ? (
            <div className="relative grid grid-cols-2">
              {partnerLogos.map((logo, i) => {
                const isLastOdd =
                  i === partnerLogos.length - 1 && i % 2 === 0;
                const colSpan = isLastOdd ? "col-span-2" : "";
                const borderL = i % 2 === 1 ? "border-l" : "";
                const borderT = i >= 2 ? "border-t" : "";
                return (
                  <div
                    key={i}
                    className={`flex h-[106px] items-center justify-center ${colSpan} ${borderL} ${borderT} border-white/10`}
                  >
                    <Image
                      src={logo.src}
                      alt=""
                      width={logo.width}
                      height={logo.height}
                      className="max-w-none object-contain"
                      unoptimized
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="relative grid grid-cols-2">
              {/* Row 1 */}
              <div className="flex h-[106px] items-center justify-center">
                <Image
                  src={SILICON_PARTNERS[0].src}
                  alt=""
                  width={SILICON_PARTNERS[0].width}
                  height={SILICON_PARTNERS[0].height}
                  className="max-w-none object-contain"
                />
              </div>
              <div className="flex h-[106px] items-center justify-center border-l border-white/10">
                <Image
                  src={SILICON_PARTNERS[1].src}
                  alt=""
                  width={SILICON_PARTNERS[1].width}
                  height={SILICON_PARTNERS[1].height}
                  className="max-w-none object-contain"
                />
              </div>
              {/* Row 2 */}
              <div className="flex h-[107px] items-center justify-center border-t border-white/10">
                <Image
                  src={SILICON_PARTNERS[2].src}
                  alt=""
                  width={SILICON_PARTNERS[2].width}
                  height={SILICON_PARTNERS[2].height}
                  className="max-w-none object-contain"
                />
              </div>
              <div className="flex h-[107px] items-center justify-center gap-[5px] border-l border-t border-white/10">
                <Image
                  src="/ecosystem/logo-partner-4.svg"
                  alt=""
                  width={26}
                  height={26}
                  className="max-w-none"
                />
                <p
                  className={`${gilroySemiBold.className} text-[13px] leading-[15px] font-semibold whitespace-nowrap text-white not-italic`}
                >
                  Tezos
                </p>
              </div>
              {/* Row 3 — Octane centered, spans both columns */}
              <div className="col-span-2 flex h-[105px] items-center justify-center gap-[10px] border-t border-white/10">
                <p
                  className={`${gilroySemiBold.className} text-[17px] leading-[20px] font-semibold whitespace-nowrap text-white not-italic`}
                >
                  Octane
                </p>
                <Image
                  src="/ecosystem/logo-octane.svg"
                  alt=""
                  width={35}
                  height={35}
                  className="max-w-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- ARTICLES -------------------------------- */
const COMPACT_IMAGE_CROPS = [
  "absolute h-[197.35%] left-[-11.88%] max-w-none top-[-55.43%] w-[123.76%]",
  "absolute h-[233.41%] left-0 max-w-none top-[-105.26%] w-full",
];

function ArticleChip({
  label,
  tone = "green",
}: {
  label: string;
  tone?: "green" | "white";
}) {
  const textColor = tone === "green" ? "#53d824" : "#ecfae5";
  const barColor = tone === "green" ? "#53d824" : "#ffffff";
  return (
    <div
      className={`${dmMono.className} relative flex h-[26px] w-[180px] shrink-0 items-center justify-center border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(255,255,255,0.06)]`}
      data-name="Chip"
    >
      <Corners />
      <p
        className="text-[13px] leading-[19.5px] font-normal tracking-[-0.39px] uppercase whitespace-nowrap not-italic"
        style={{ color: textColor }}
      >
        {label}
      </p>
      <div
        className="absolute left-[6px] top-1/2 h-[12px] w-[2px] -translate-y-1/2 opacity-60"
        style={{ backgroundColor: barColor }}
        aria-hidden
      />
      <div
        className="absolute right-[6px] top-1/2 h-[12px] w-[2px] -translate-y-1/2 opacity-60"
        style={{ backgroundColor: barColor }}
        aria-hidden
      />
    </div>
  );
}

function ArticleMetaItem({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-[6px]">
      <span
        className="h-[12px] w-[2px] shrink-0 bg-[#53d824] opacity-60"
        aria-hidden
      />
      <span
        className={`${interRegular.className} text-[14px] leading-[24px] font-normal whitespace-nowrap text-[rgba(255,255,255,0.5)] not-italic`}
      >
        {children}
      </span>
    </div>
  );
}

function CompanyArticlesMobile({ data }: { data?: any }) {
  const rawFeatured = data?.featured_article;
  const featured = rawFeatured
    ? {
        category: (rawFeatured.category as string) || COMPANY_FEATURED_ARTICLE.category,
        title: (rawFeatured.title as string) || COMPANY_FEATURED_ARTICLE.title,
        excerpt: (rawFeatured.excerpt as string) || COMPANY_FEATURED_ARTICLE.excerpt,
        date:
          (rawFeatured.date as string) ||
          COMPANY_FEATURED_ARTICLE.metadata.date,
        totalFunding: COMPANY_FEATURED_ARTICLE.metadata.totalFunding,
        fundingRounds: COMPANY_FEATURED_ARTICLE.metadata.fundingRounds,
        imageSrc:
          mediaUrl(rawFeatured.image) || COMPANY_FEATURED_ARTICLE.imageSrc,
      }
    : {
        category: COMPANY_FEATURED_ARTICLE.category,
        title: COMPANY_FEATURED_ARTICLE.title,
        excerpt: COMPANY_FEATURED_ARTICLE.excerpt,
        date: COMPANY_FEATURED_ARTICLE.metadata.date,
        totalFunding: COMPANY_FEATURED_ARTICLE.metadata.totalFunding,
        fundingRounds: COMPANY_FEATURED_ARTICLE.metadata.fundingRounds,
        imageSrc: COMPANY_FEATURED_ARTICLE.imageSrc,
      };

  const strapiCompact = Array.isArray(data?.compact_articles) ? data.compact_articles : null;
  const compact =
    strapiCompact && strapiCompact.length > 0
      ? strapiCompact.map((c: any, i: number) => {
          const fallback = COMPANY_COMPACT_ARTICLES[i] ?? COMPANY_COMPACT_ARTICLES[COMPANY_COMPACT_ARTICLES.length - 1];
          return {
            nodeId: fallback.nodeId,
            category: fallback.category,
            title: (c?.title as string) || fallback.title,
            excerpt: fallback.excerpt,
            imageSrc: mediaUrl(c?.image) || fallback.imageSrc,
          };
        })
      : COMPANY_COMPACT_ARTICLES.map((a) => ({
          nodeId: a.nodeId,
          category: a.category,
          title: a.title,
          excerpt: a.excerpt,
          imageSrc: a.imageSrc,
        }));

  return (
    <section
      className="relative w-full bg-black"
      aria-label="Company news articles"
      data-node-id="3244:19803"
      data-name="7th Fold"
    >
      <div className="px-[20px] pt-[16px] pb-[16px]">
        {/* Featured article */}
        <article className="relative flex w-full flex-col gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.3)] bg-[rgba(0,0,0,0.5)] px-[9px] pt-[12px] pb-[12px]">
          <Corners />
          <div className="relative h-[197px] w-full shrink-0 overflow-hidden">
            <Image
              src={featured.imageSrc}
              alt=""
              fill
              className="object-cover"
              sizes="335px"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent"
              aria-hidden
            />
          </div>
          <div className="flex w-full flex-col gap-[14px]">
            <ArticleChip
              label={featured.category}
              tone="green"
            />
            <div className="flex flex-col gap-[10px]">
              <h3
                className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
              >
                {featured.title}
              </h3>
              <p
                className={`${interRegular.className} text-[14px] leading-[18px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}
              >
                {featured.excerpt}
              </p>
            </div>
            <div className="flex flex-col gap-[4px]">
              <ArticleMetaItem>{featured.date}</ArticleMetaItem>
              <ArticleMetaItem>{featured.totalFunding}</ArticleMetaItem>
              <ArticleMetaItem>{featured.fundingRounds}</ArticleMetaItem>
            </div>
          </div>
        </article>

        {/* Compact articles */}
        <div className="mt-[24px] flex flex-col gap-[29px]">
          {compact.map((article: any, index: number) => (
            <article
              key={article.nodeId}
              className="relative flex w-full flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.3)] bg-[rgba(0,0,0,0.5)] px-[24px] pt-[12px] pb-[12px]"
            >
              <Corners />
              {/* Image — 570px wide, centered, bleeds beyond card (clipped). Per-article Figma crop. */}
              <div className="relative h-[152px] w-[570px] max-w-none shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.imageSrc}
                  alt=""
                  className={COMPACT_IMAGE_CROPS[index] ?? COMPACT_IMAGE_CROPS[COMPACT_IMAGE_CROPS.length - 1]}
                />
              </div>
              {/* News — 335px wide, centered */}
              <div className="flex w-[335px] flex-col items-start gap-[20px]">
                <ArticleChip label={article.category} tone="white" />
                <div className="flex w-full flex-col gap-[10px]">
                  <h3
                    className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
                  >
                    {article.title}
                  </h3>
                  <p
                    className={`${interRegular.className} text-[14px] leading-[24px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}
                  >
                    {article.excerpt}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- ENGAGEMENT ------------------------------- */
function CompanyEngagementMobile({
  engagement,
  joinTeam,
}: {
  engagement?: any;
  joinTeam?: any;
}) {
  const strapiCards = Array.isArray(engagement?.cards) ? engagement.cards : null;

  let joinTeamData = joinTeam;
  let cardEntries: any[] = strapiCards ? [...strapiCards] : [];
  if (!joinTeamData && cardEntries.length > 0) {
    joinTeamData = cardEntries[0];
    cardEntries = cardEntries.slice(1);
  }

  const joinTitleFinal = (joinTeamData?.title as string) || COMPANY_JOIN_TEAM.title;
  const joinDescriptionFinal = (joinTeamData?.description as string) || COMPANY_JOIN_TEAM.description;
  const joinCtaLabelFinal = (joinTeamData?.cta_label as string) || COMPANY_JOIN_TEAM.ctaLabel;
  const joinCtaHrefFinal = (joinTeamData?.cta_href as string) || COMPANY_JOIN_TEAM.ctaHref;
  const joinImageSrcFinal = mediaUrl(joinTeamData?.image) || COMPANY_JOIN_TEAM.imageSrc;

  const cards =
    cardEntries.length > 0
      ? cardEntries.map((c: any, i: number) => {
          const fallback = COMPANY_ENGAGEMENT_CARDS[i] ?? COMPANY_ENGAGEMENT_CARDS[COMPANY_ENGAGEMENT_CARDS.length - 1];
          return {
            nodeId: fallback.nodeId,
            titleLines: ((c?.title as string) || fallback.titleLines.join(" ")).split("\n"),
            description: (c?.description as string) || fallback.description,
            ctaLabel: (c?.cta_label as string) || fallback.ctaLabel,
            ctaHref: (c?.cta_href as string) || fallback.ctaHref,
            imageSrc: mediaUrl(c?.image) || fallback.imageSrc,
            contentTop: fallback.contentTop,
          };
        })
      : COMPANY_ENGAGEMENT_CARDS.map((c) => ({
          nodeId: c.nodeId,
          titleLines: [...c.titleLines],
          description: c.description,
          ctaLabel: c.ctaLabel,
          ctaHref: c.ctaHref,
          imageSrc: c.imageSrc,
          contentTop: c.contentTop,
        }));

  return (
    <SectionWrap aria-label="Join our team and partnerships" className="!pb-[80px]">
      {/* Join team */}
      <div className="relative flex w-full flex-col gap-[16px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)]">
        <Corners />
        <div className="relative h-[160px] w-full overflow-hidden">
          <Image
            src={joinImageSrcFinal}
            alt=""
            fill
            className="object-cover"
            sizes="327px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" aria-hidden />
        </div>
        <div className="flex flex-col gap-[12px] p-[22px] pt-0">
          <h3 className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium text-white not-italic`}>
            {joinTitleFinal}
          </h3>
          <p className={`${interRegular.className} text-[13px] leading-[20px] font-normal text-white opacity-70 not-italic`}>
            {joinDescriptionFinal}
          </p>
          <div className="mt-[4px]">
            <GreenCta href={joinCtaHrefFinal}>{joinCtaLabelFinal}</GreenCta>
          </div>
        </div>
      </div>

      {/* Engagement cards — 353 wide (break out of px-24 to 20px page margins per Figma) */}
      <div className="relative -mx-[4px] mt-[16px] flex w-[calc(100%+8px)] flex-col gap-[14px]">
        {cards.map((card: any) => (
          <article
            key={card.nodeId}
            className="relative w-full border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)]"
          >
            <Corners />
            {/* Image — 335x289 at (9,1), Figma zoom crop */}
            <div
              className="pointer-events-none absolute left-[9px] top-[1px] h-[289px] w-[335px] overflow-hidden"
              aria-hidden
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.imageSrc}
                alt=""
                className="absolute h-[121.8%] left-[-2.54%] max-w-none top-[-21.8%] w-[105.07%]"
              />
            </div>
            {/* Content — title overlaps image bottom; card auto-sizes per Figma contentTop */}
            <div
              className="relative flex flex-col px-[21.25px]"
              style={{ paddingTop: card.contentTop, paddingBottom: 28 }}
            >
              <div className="flex flex-col gap-[15px]">
                <div className="relative w-fit px-[10px]">
                  <Corners />
                  <h3
                    className={`${gilroyMedium.className} bg-clip-text text-[24px] leading-[38px] font-medium text-transparent [word-break:break-word] not-italic`}
                    style={{ backgroundImage: gradient("116.349deg") }}
                  >
                    {card.titleLines.join(" ")}
                  </h3>
                </div>
                <p
                  className={`${interRegular.className} text-[14px] leading-[22px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}
                >
                  {card.description}
                </p>
              </div>
              <div className="relative mt-[28px] w-[231px]">
                <GreenCta href={card.ctaHref}>{card.ctaLabel}</GreenCta>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionWrap>
  );
}

/* --------------------------------- PAGE ----------------------------------- */
type CompanyMobileProps = {
  data?: any;
};

export function CompanyMobile({ data }: CompanyMobileProps = {}) {
  return (
    <div className="flex w-full flex-col">
      {data?.hero ? <CompanyHeroMobile data={data.hero} /> : null}
      {data?.mission ? <CompanyMissionMobile data={data.mission} /> : null}
      {data?.leadership ? <CompanyLeadershipMobile data={data.leadership} /> : null}
      {data?.dna ? <CompanyDnaMobile data={data.dna} /> : null}
      {data?.ecosystem ? <CompanyEcosystemMobile data={data.ecosystem} /> : null}
      {data?.tech_partners ? (
        <CompanyTechnologyPartnersMobile data={data.tech_partners} />
      ) : null}
      {data?.articles ? <CompanyArticlesMobile data={data.articles} /> : null}
      {data?.engagement ? (
        <CompanyEngagementMobile
          engagement={data?.engagement}
          joinTeam={data?.engagement?.join_team}
        />
      ) : null}
    </div>
  );
}
