import Image from "next/image";
import { gilroyMedium, gilroySemiBold, interRegular, interSemiBold } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { SILICON_PARTNERS } from "../ecosystem/ecosystem-data";
import {
  ADVISORY_BOARD,
  LEADERSHIP_TEAM,
} from "./company-leadership-data";
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
      <span className="relative text-[13px] leading-[normal] font-semibold uppercase whitespace-nowrap text-white not-italic">
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
function CompanyHeroMobile() {
  return (
    <section
      className="relative flex min-h-[90svh] w-full flex-col justify-end overflow-hidden px-[24px] pb-[56px] pt-[120px]"
      aria-label="Company hero"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/company/hero-bg.png"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black" />
      </div>

      <div className="relative flex flex-col items-start gap-[16px]">
        <h1
          className={`${gilroyMedium.className} max-w-[327px] bg-clip-text text-left text-[32px] leading-[38px] font-medium text-transparent [word-break:break-word] not-italic`}
          style={{ backgroundImage: gradient("100.689deg") }}
        >
          A new paradigm for efficient AI compute
        </h1>
        <p
          className={`${interRegular.className} max-w-[327px] text-left text-[15px] leading-[23px] font-normal text-[#f0f0f0] opacity-85 not-italic`}
        >
          We build energy-aware, programmable, mixed-signal AI processors that
          unlock orders-of-magnitude improvements in performance-per-watt,
          enabling scalable intelligence across edge, enterprise, and cloud.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------- MISSION --------------------------------- */
const MISSION_STATS = [
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

function CompanyMissionMobile() {
  return (
    <SectionWrap aria-label="A mission dictated by physics" className="!py-[40px]">
      <div
        className="relative flex w-full flex-col gap-[28px] overflow-hidden border-[0.5px] border-solid border-white/15 p-[28px]"
        style={{ backgroundImage: MISSION_BG }}
      >
        <SectionTitle deg="104.363deg" className="self-start text-left">
          A mission dictated by physics
        </SectionTitle>

        <div
          className={`${interRegular.className} flex flex-col gap-[16px] text-[14px] leading-[22px] font-normal text-[#f0f0f0] opacity-70 not-italic`}
        >
          <p>
            The era of patching legacy compute is over. Forcing next-generation AI
            through decades-old digital bottlenecks only guarantees massive power
            drain and wrecked economics. Ambient Scientific is confronting this
            physical wall by re-architecting compute from the metal up, reinventing
            analog circuits, native instruction sets, and developer frameworks.
          </p>
          <p>
            The result is an architecture that unlocks breakthrough AI performance
            while requiring a fraction of the power consumption and silicon area.
            We exist to make intelligence truly ambient: an invisible, ubiquitous
            foundation built to endure for as long as the era of AI lasts, from the
            smallest edge sensor to the largest hyperscale cloud server.
          </p>
        </div>

        <div className="flex flex-col gap-[20px]">
          {MISSION_STATS.map((stat) => (
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
function PortraitCard({
  imageSrc,
  name,
  role,
  href,
}: {
  imageSrc: string;
  name: string;
  role: string;
  href: string;
}) {
  return (
    <article className="relative flex w-[220px] shrink-0 snap-start flex-col gap-[12px]">
      <div className="relative h-[260px] w-full overflow-hidden border-[0.5px] border-solid border-white/15">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover object-top"
          sizes="220px"
        />
      </div>
      <div className="flex items-center justify-between gap-[8px]">
        <div className="flex flex-col">
          <p className={`${gilroyMedium.className} text-[16px] leading-[20px] font-medium text-white not-italic`}>
            {name}
          </p>
          {role ? (
            <p className={`${interRegular.className} text-[12px] leading-[16px] font-normal text-white opacity-60 not-italic`}>
              {role}
            </p>
          ) : null}
        </div>
        <Image
          src="/company/linkedin-icon.svg"
          alt=""
          width={18}
          height={18}
          className="size-[18px] shrink-0"
          aria-hidden
        />
        <a href={href} className="sr-only">
          {name} LinkedIn
        </a>
      </div>
    </article>
  );
}

function CompanyLeadershipMobile() {
  return (
    <SectionWrap aria-label="Our minds powering the revolution">
      <SectionTitle deg="105.739deg">Our minds powering the revolution</SectionTitle>
      <p
        className={`${interRegular.className} mt-[16px] max-w-[327px] text-center text-[14px] leading-[22px] font-normal text-[#a1a1a1] not-italic`}
      >
        We&apos;re building programmable AI processors that deliver breakthrough
        performance and power efficiency from edge to cloud.
      </p>

      <div className="mt-[28px] flex w-full snap-x snap-mandatory gap-[14px] overflow-x-auto pb-[8px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {LEADERSHIP_TEAM.map((member) => (
          <PortraitCard
            key={member.nodeId}
            imageSrc={member.imageSrc}
            name={member.name}
            role={member.role}
            href={member.linkedInHref}
          />
        ))}
      </div>

      <p
        className={`${gilroyMedium.className} mt-[32px] self-start text-[20px] leading-[26px] font-medium text-white not-italic`}
      >
        Advisory Board
      </p>
      <div className="mt-[16px] flex w-full snap-x snap-mandatory gap-[14px] overflow-x-auto pb-[8px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {ADVISORY_BOARD.map((member) => (
          <PortraitCard
            key={member.nodeId}
            imageSrc={member.imageSrc}
            name={member.name}
            role={member.role}
            href={member.linkedInHref}
          />
        ))}
      </div>
    </SectionWrap>
  );
}

/* ---------------------------------- DNA ----------------------------------- */
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

function CompanyDnaMobile() {
  return (
    <SectionWrap aria-label="Driven by physics. Defined by our DNA.">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/company/dna-section-bg.png"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative flex flex-col items-center gap-[10px]">
        <SectionTitle deg="105.739deg">
          Driven by physics. Defined by our DNA.
        </SectionTitle>
        <p className={`${interRegular.className} max-w-[327px] text-center text-[14px] leading-[22px] font-normal text-[#f0f0f0] opacity-70 not-italic`}>
          We build from first principles and validate everything in silicon.
        </p>
      </div>

      <div className="relative mt-[28px] flex w-full flex-col gap-[14px]">
        {DNA_CARDS.map((card) => (
          <article
            key={card.title}
            className="relative flex flex-col gap-[10px] border-[0.5px] border-solid border-white/12 bg-[rgba(21,21,21,0.45)] p-[22px]"
          >
            <p className={`${gilroyMedium.className} text-[18px] leading-[24px] font-medium text-white not-italic`}>
              {card.title}
            </p>
            <p className={`${interRegular.className} text-[13px] leading-[20px] font-normal text-white opacity-65 not-italic`}>
              {card.description}
            </p>
          </article>
        ))}
      </div>
    </SectionWrap>
  );
}

/* ------------------------------- ECOSYSTEM -------------------------------- */
const ECOSYSTEM_COLUMNS = [
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

function CompanyEcosystemMobile() {
  return (
    <SectionWrap aria-label="A globally resilient ecosystem">
      <SectionTitle deg="105.739deg">A globally resilient ecosystem</SectionTitle>
      <p className={`${interRegular.className} mt-[16px] max-w-[327px] text-center text-[14px] leading-[22px] font-normal text-[#f0f0f0] opacity-70 not-italic`}>
        Backed by Tier-1 foundries and integrated with the world&apos;s leading
        technology distributors and platforms.
      </p>

      <div className="mt-[28px] flex w-full flex-col gap-[14px]">
        {ECOSYSTEM_COLUMNS.map((col) => (
          <div
            key={col.title}
            className="flex flex-col gap-[10px] border-[0.5px] border-solid border-white/12 bg-[rgba(21,21,21,0.45)] p-[22px]"
          >
            <div className="flex items-center gap-[12px]">
              <Image src={col.icon} alt="" width={28} height={28} className="size-[28px] shrink-0" aria-hidden />
              <p className={`${gilroyMedium.className} text-[18px] leading-[24px] font-medium text-white not-italic`}>
                {col.title}
              </p>
            </div>
            <p className={`${interRegular.className} text-[13px] leading-[20px] font-normal text-white opacity-65 not-italic`}>
              {col.description}
            </p>
          </div>
        ))}
      </div>
    </SectionWrap>
  );
}

/* --------------------------- TECHNOLOGY PARTNERS -------------------------- */
function CompanyTechnologyPartnersMobile() {
  return (
    <SectionWrap aria-label="Technology partners">
      <p
        className={`${gilroySemiBold.className} max-w-[327px] bg-clip-text text-center text-[24px] leading-[30px] font-semibold tracking-[-0.48px] text-transparent opacity-80 not-italic`}
        style={{
          backgroundImage:
            "linear-gradient(119.414deg, rgba(255,255,255,0.8) 9.0248%, rgba(255,255,255,0.5) 37.884%, rgba(255,255,255,0.7) 111.41%)",
        }}
      >
        TECHNOLOGY PARTNERS
      </p>

      <div className="relative mt-[24px] w-full overflow-hidden border-[0.5px] border-solid border-white/12 bg-[rgba(255,255,255,0.04)]">
        <Corners leftSrc="/ecosystem/corner-tl.svg" rightSrc="/ecosystem/corner-tr.svg" />
        <div className="flex items-center gap-[4px] overflow-x-auto px-[16px] py-[10px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SILICON_PARTNERS.map((logo) => (
            <div
              key={logo.src}
              className="relative flex h-[56px] w-[110px] shrink-0 items-center justify-center"
            >
              <Image
                src={logo.src}
                alt=""
                width={logo.width}
                height={logo.height}
                className="block max-w-none object-contain"
              />
            </div>
          ))}
          <div className="relative flex h-[56px] w-[120px] shrink-0 items-center justify-center gap-[10px]">
            <Image src="/ecosystem/logo-partner-4.svg" alt="" width={32} height={32} className="block max-w-none" />
            <p className={`${gilroySemiBold.className} text-[16px] leading-[20px] font-semibold whitespace-nowrap text-white not-italic`}>
              Tezos
            </p>
          </div>
          <div className="relative flex h-[56px] w-[120px] shrink-0 items-center justify-center gap-[10px]">
            <p className={`${gilroySemiBold.className} text-[16px] leading-[20px] font-semibold whitespace-nowrap text-white not-italic`}>
              Octane
            </p>
            <Image src="/ecosystem/logo-octane.svg" alt="" width={32} height={32} className="block max-w-none" />
          </div>
        </div>
      </div>
    </SectionWrap>
  );
}

/* -------------------------------- ARTICLES -------------------------------- */
function CompanyArticlesMobile() {
  return (
    <SectionWrap aria-label="Company news articles">
      {/* Featured */}
      <article className="relative flex w-full flex-col overflow-clip border-[0.5px] border-solid border-white/12 bg-[rgba(21,21,21,0.45)]">
        <div className="relative h-[180px] w-full shrink-0 overflow-hidden">
          <Image
            src={COMPANY_FEATURED_ARTICLE.imageSrc}
            alt=""
            fill
            className="object-cover"
            sizes="327px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" aria-hidden />
        </div>
        <div className="flex flex-col gap-[12px] p-[20px]">
          <span className={`${interRegular.className} w-fit border-[0.5px] border-solid border-white/20 bg-[rgba(255,255,255,0.06)] px-[10px] py-[3px] text-[11px] uppercase tracking-[0.06em] text-[#ecfae5] not-italic`}>
            {COMPANY_FEATURED_ARTICLE.category}
          </span>
          <h3 className={`${gilroyMedium.className} text-[20px] leading-[26px] font-medium text-white not-italic`}>
            {COMPANY_FEATURED_ARTICLE.title}
          </h3>
          <p className={`${interRegular.className} text-[13px] leading-[20px] font-normal text-white opacity-70 not-italic`}>
            {COMPANY_FEATURED_ARTICLE.excerpt}
          </p>
          <div className="mt-[4px] flex flex-wrap gap-x-[16px] gap-y-[4px]">
            <span className={`${interRegular.className} text-[12px] leading-[16px] font-normal text-[#99a1af] not-italic`}>
              {COMPANY_FEATURED_ARTICLE.metadata.date}
            </span>
            <span className={`${interRegular.className} text-[12px] leading-[16px] font-normal text-[#99a1af] not-italic`}>
              {COMPANY_FEATURED_ARTICLE.metadata.totalFunding}
            </span>
            <span className={`${interRegular.className} text-[12px] leading-[16px] font-normal text-[#99a1af] not-italic`}>
              {COMPANY_FEATURED_ARTICLE.metadata.fundingRounds}
            </span>
          </div>
        </div>
      </article>

      {/* Compact */}
      <div className="mt-[16px] flex w-full flex-col gap-[14px]">
        {COMPANY_COMPACT_ARTICLES.map((article) => (
          <article
            key={article.nodeId}
            className="relative flex w-full overflow-clip border-[0.5px] border-solid border-white/12 bg-[rgba(21,21,21,0.45)]"
          >
            <div className="relative h-[110px] w-[110px] shrink-0 overflow-hidden">
              <Image
                src={article.imageSrc}
                alt=""
                fill
                className="object-cover"
                sizes="110px"
              />
            </div>
            <div className="flex flex-1 flex-col gap-[8px] p-[16px]">
              <span className={`${interRegular.className} w-fit border-[0.5px] border-solid border-white/20 bg-[rgba(255,255,255,0.06)] px-[8px] py-[2px] text-[10px] uppercase tracking-[0.06em] text-[#ecfae5] not-italic`}>
                {article.category}
              </span>
              <h3 className={`${gilroyMedium.className} text-[15px] leading-[20px] font-medium text-white not-italic`}>
                {article.title}
              </h3>
              <p className={`${interRegular.className} text-[12px] leading-[17px] font-normal text-white opacity-65 not-italic`}>
                {article.excerpt}
              </p>
            </div>
          </article>
        ))}
      </div>
    </SectionWrap>
  );
}

/* ------------------------------- ENGAGEMENT ------------------------------- */
function CompanyEngagementMobile() {
  return (
    <SectionWrap aria-label="Join our team and partnerships" className="!pb-[80px]">
      {/* Join team */}
      <div className="relative flex w-full flex-col gap-[16px] overflow-hidden border-[0.5px] border-solid border-white/15">
        <div className="relative h-[160px] w-full overflow-hidden">
          <Image
            src={COMPANY_JOIN_TEAM.imageSrc}
            alt=""
            fill
            className="object-cover"
            sizes="327px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" aria-hidden />
        </div>
        <div className="flex flex-col gap-[12px] p-[22px] pt-0">
          <h3 className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium text-white not-italic`}>
            {COMPANY_JOIN_TEAM.title}
          </h3>
          <p className={`${interRegular.className} text-[13px] leading-[20px] font-normal text-white opacity-70 not-italic`}>
            {COMPANY_JOIN_TEAM.description}
          </p>
          <div className="mt-[4px]">
            <GreenCta href={COMPANY_JOIN_TEAM.ctaHref}>{COMPANY_JOIN_TEAM.ctaLabel}</GreenCta>
          </div>
        </div>
      </div>

      {/* Engagement cards */}
      <div className="mt-[16px] flex w-full flex-col gap-[14px]">
        {COMPANY_ENGAGEMENT_CARDS.map((card) => (
          <article
            key={card.nodeId}
            className="relative flex w-full flex-col gap-[12px] overflow-hidden border-[0.5px] border-solid border-white/15 p-[22px]"
          >
            <div className="pointer-events-none absolute -right-[40px] -bottom-[40px] h-[180px] w-[180px] opacity-30" aria-hidden>
              <Image
                src={card.imageSrc}
                alt=""
                width={180}
                height={180}
                className="size-full object-contain"
              />
            </div>
            <h3 className={`${gilroyMedium.className} relative text-[20px] leading-[26px] font-medium text-white not-italic`}>
              {card.titleLines.join(" ")}
            </h3>
            <p className={`${interRegular.className} relative max-w-[260px] text-[13px] leading-[20px] font-normal text-white opacity-70 not-italic`}>
              {card.description}
            </p>
            <div className="relative mt-[4px]">
              <GreenCta href={card.ctaHref}>{card.ctaLabel}</GreenCta>
            </div>
          </article>
        ))}
      </div>
    </SectionWrap>
  );
}

/* --------------------------------- PAGE ----------------------------------- */
export function CompanyMobile() {
  return (
    <div className="flex w-full flex-col">
      <CompanyHeroMobile />
      <CompanyMissionMobile />
      <CompanyLeadershipMobile />
      <CompanyDnaMobile />
      <CompanyEcosystemMobile />
      <CompanyTechnologyPartnersMobile />
      <CompanyArticlesMobile />
      <CompanyEngagementMobile />
    </div>
  );
}
