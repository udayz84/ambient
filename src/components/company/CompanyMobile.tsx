import Image from "next/image";
import { dmMono, gilroyMedium, gilroySemiBold, interRegular, interSemiBold } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { SILICON_PARTNERS } from "../ecosystem/ecosystem-data";
import {
  ADVISORY_BOARD,
  LEADERSHIP_TEAM,
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
            src="/mobile/company/hero.png"
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
          <Corners />
        </div>

        {/* 3244:5536 — headline (x29 y7 w321) */}
        <h1
          className={`${gilroyMedium.className} absolute left-[29px] top-[7px] w-[321px] max-w-full bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic`}
          style={{ backgroundImage: gradient("100.882deg") }}
          data-node-id="3244:5536"
        >
          A new paradigm for efficient AI compute
        </h1>

        {/* 3244:5541 — body (x28 y130 w336) */}
        <p
          className={`${interRegular.className} absolute left-[28px] top-[130px] w-[336px] max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic [word-break:break-word]`}
          data-node-id="3244:5541"
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
function CompanyLeadershipMobile() {
  return (
    <section
      className="relative w-full overflow-hidden bg-black"
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
            Our minds powering the revolution
          </h2>
        </div>
        <p
          className={`${interRegular.className} mx-auto mt-[10px] w-[350px] text-center text-[14px] leading-[16px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
        >
          We&apos;re building programmable AI processors that deliver
          breakthrough performance and power efficiency from edge to cloud.
        </p>
      </div>

      <div className="mt-[34px]">
        <LeadershipCarousel members={LEADERSHIP_TEAM} variant="leadership" />
      </div>

      {/* ===== Advisory board ===== */}
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
        <LeadershipCarousel members={ADVISORY_BOARD} variant="advisory" />
      </div>
    </section>
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

function CompanyDnaMobile() {
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
            Driven by physics. Defined by our DNA.
          </h2>
        </div>
        <p
          className={`${interRegular.className} mx-auto mt-[10px] w-[334px] text-center text-[14px] leading-[16px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
        >
          We build from first principles and validate everything in silicon.
        </p>
      </div>

      {/* Cards + background image between pairs */}
      <div className="relative mt-[31px] px-[19px]">
        <DnaCard card={DNA_CARDS[0]} />
        <DnaCard card={DNA_CARDS[1]} className="mt-[29px]" />

        <div className="relative">
          {/* Background image 137 — bleeds, sits between the two card pairs */}
          <div
            className="pointer-events-none absolute top-[1px] left-1/2 z-0 h-[425px] w-[803px] max-w-none -translate-x-1/2 overflow-hidden"
            aria-hidden
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/company/image 137.png"
              alt=""
              className="size-full object-cover object-bottom"
            />
          </div>
          <div className="relative z-10">
            <div className="h-[392px]" aria-hidden />
            <DnaCard card={DNA_CARDS[2]} />
            <DnaCard card={DNA_CARDS[3]} className="mt-[29px]" />
          </div>
        </div>
      </div>
    </section>
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
    <section
      className="relative w-full bg-black px-[16px] py-[32px]"
      aria-label="A globally resilient ecosystem"
    >
      <div className="relative border-[0.5px] border-solid border-[rgba(255,255,255,0.15)] px-[14px] py-[32px]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Corners />
        </div>

        {/* Title */}
        <div className="relative mx-auto w-[320px] mb-[25px]">
          <h2
            className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic`}
            style={{ backgroundImage: gradient("105.083deg") }}
          >
            A globally resilient<br />ecosystem
          </h2>
        </div>

        {/* Subtitle */}
        <p
          className={`${interRegular.className} text-[14px] leading-[20px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
        >
          Backed by Tier-1 foundries and integrated with the world&apos;s leading
          technology distributors and platforms.
        </p>

        {/* Divider (Line 91) */}
        <div className="mt-[24px] h-px w-full bg-white/15" aria-hidden />

        {/* Columns */}
        <div className="mt-[24px] flex flex-col gap-[34px]">
          {ECOSYSTEM_COLUMNS.map((col) => (
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
    </section>
  );
}

/* --------------------------- TECHNOLOGY PARTNERS -------------------------- */
function CompanyTechnologyPartnersMobile() {
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
          TECHNOLOGY PARTNERS
        </p>

        {/* Partner grid — 2x2 logos + Octane centered below, grid lines */}
        <div className="relative mt-[5px] bg-[rgba(255,255,255,0.04)]">
          <Corners
            leftSrc="/ecosystem/corner-tl.svg"
            rightSrc="/ecosystem/corner-tr.svg"
          />
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

function CompanyArticlesMobile() {
  return (
    <section
      className="relative w-full bg-black"
      aria-label="Company news articles"
      data-node-id="3244:19803"
      data-name="7th Fold"
    >
      <div className="px-[20px] pt-[16px] pb-[16px]">
        {/* Featured article */}
        <article className="relative flex w-full flex-col gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] px-[9px] pt-[12px] pb-[12px]">
          <Corners />
          <div className="relative h-[197px] w-full shrink-0 overflow-hidden">
            <Image
              src={COMPANY_FEATURED_ARTICLE.imageSrc}
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
              label={COMPANY_FEATURED_ARTICLE.category}
              tone="green"
            />
            <div className="flex flex-col gap-[10px]">
              <h3
                className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
              >
                {COMPANY_FEATURED_ARTICLE.title}
              </h3>
              <p
                className={`${interRegular.className} text-[14px] leading-[18px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}
              >
                {COMPANY_FEATURED_ARTICLE.excerpt}
              </p>
            </div>
            <div className="flex flex-col gap-[4px]">
              <ArticleMetaItem>
                {COMPANY_FEATURED_ARTICLE.metadata.date}
              </ArticleMetaItem>
              <ArticleMetaItem>
                {COMPANY_FEATURED_ARTICLE.metadata.totalFunding}
              </ArticleMetaItem>
              <ArticleMetaItem>
                {COMPANY_FEATURED_ARTICLE.metadata.fundingRounds}
              </ArticleMetaItem>
            </div>
          </div>
        </article>

        {/* Compact articles */}
        <div className="mt-[24px] flex flex-col gap-[29px]">
          {COMPANY_COMPACT_ARTICLES.map((article, index) => (
            <article
              key={article.nodeId}
              className="relative flex w-full flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] px-[24px] pt-[12px] pb-[12px]"
            >
              <Corners />
              {/* Image — 570px wide, centered, bleeds beyond card (clipped). Per-article Figma crop. */}
              <div className="relative h-[152px] w-[570px] max-w-none shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.imageSrc}
                  alt=""
                  className={COMPACT_IMAGE_CROPS[index]}
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
            className="relative w-full overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)]"
          >
            <Corners />
            {/* Image — 335x363, content overlaid on its lower portion */}
            <div className="relative h-[363px] w-full overflow-hidden">
              <div className="absolute top-[15px] left-1/2 h-[240px] w-[240px] -translate-x-1/2">
                <Image
                  src={card.imageSrc}
                  alt=""
                  fill
                  className="pointer-events-none object-contain"
                  sizes="240px"
                />
              </div>
              <div
                className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
                aria-hidden
              />
            </div>
            {/* Content — pulled up over the image bottom (Figma content top y=209) */}
            <div className="relative -mt-[155px] flex flex-col px-[21px] pb-[21px]">
              <div className="relative mb-[15px] w-fit px-[10px]">
                <Corners />
                <h3
                  className={`${gilroyMedium.className} bg-clip-text text-[24px] leading-[38px] font-medium text-transparent [word-break:break-word] not-italic`}
                  style={{ backgroundImage: gradient("112.136deg") }}
                >
                  {card.titleLines.join(" ")}
                </h3>
              </div>
              <p
                className={`${interRegular.className} text-[14px] leading-[22px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}
              >
                {card.description}
              </p>
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
