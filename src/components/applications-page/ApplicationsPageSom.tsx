"use client";

/* eslint-disable @next/next/no-img-element */
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { useFitText } from "../shared/FitText";
import { mediaUrl } from "@/lib/strapi";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

const TITLE_GRADIENT =
  "linear-gradient(123.792deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const SUBTITLE =
  "Start on an evaluation kit, scale on a production module — the same software carries across.";

const FALLBACK_HEADING = "From first board to full production.";
const FALLBACK_STATUS_PILL = "LAUNCHING SOON";

const FALLBACK_IMG_A = "/applications/som-img-a.webp";
const FALLBACK_IMG_B = "/applications/som-img-b.webp";

type SomCardData = {
  value: string;
  label: string;
  sublabel: string;
  is_upcoming: boolean;
  visual_style: "sharp" | "blurry" | "layered";
  ctaLabel: string;
  ctaHref: string;
};

const FALLBACK_CARDS: SomCardData[] = [
  {
    value: "Evaluate",
    label: "NuraSense Evaluation Kit",
    sublabel: "Run real models on real silicon, day one.",
    is_upcoming: false,
    visual_style: "sharp",
    ctaLabel: "View Evaluation Kits",
    ctaHref: "/evaluation-kits",
  },
  {
    value: "Scale",
    label: "Production SOMs",
    sublabel: "Drop a pre-engineered System-on-Module into your carrier board.",
    is_upcoming: false,
    visual_style: "layered",
    ctaLabel: "View SOMs",
    ctaHref: "/products#som",
  },
];

function Visual1({ src }: { src: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img loading="lazy" decoding="async"
        alt=""
        aria-hidden
        src={src}
        className="absolute inset-0 size-full max-w-none object-contain"
      />
    </div>
  );
}

function Visual2({ src }: { src: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden blur-[4px] opacity-50">
      <img loading="lazy" decoding="async"
        alt=""
        aria-hidden
        src={src}
        className="absolute inset-0 size-full max-w-none object-cover object-left"
      />
    </div>
  );
}

function Visual3({ srcA, srcB }: { srcA: string; srcB: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden blur-[4px] opacity-50">
      <img loading="lazy" decoding="async"
        alt=""
        aria-hidden
        src={srcB}
        className="absolute inset-0 size-full max-w-none object-cover object-left"
      />
      <div className="absolute inset-0 overflow-hidden">
        <img loading="lazy" decoding="async"
          alt=""
          aria-hidden
          src={srcA}
          className="absolute inset-0 size-full max-w-none object-contain"
        />
      </div>
    </div>
  );
}

function SomLabel({ value, label, sublabel }: { value: string; label: string; sublabel: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-[12px] text-center">
      <p
        className={`${gilroyMedium.className} max-w-full text-[36px] min-[1024px]:text-[38px] leading-[45.386px] min-[1024px]:leading-[47px] font-medium text-white not-italic overflow-hidden`}
      >
        {value}
      </p>
      <p
        className={`${interRegular.className} max-w-full text-[18px] leading-[26.073px] font-normal uppercase text-[#f0f0f0] not-italic overflow-hidden min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
      >
        {label}
      </p>
      <div className="flex items-center justify-center">
        <div className="rotate-180">
          <img loading="lazy" decoding="async"
            alt=""
            aria-hidden
            src="/applications/som-line.svg"
            className="block h-[1px] w-[185.209px] min-[1024px]:w-[191.796px] max-w-none"
          />
        </div>
      </div>
      <p
        className={`${interRegular.className} max-w-[280px] min-[1024px]:max-w-[320px] text-[16px] leading-[23.176px] min-[1024px]:leading-[24px] font-normal tracking-[-0.3018px] min-[1024px]:tracking-[-0.3125px] text-[rgba(255,255,255,0.6)] not-italic`}
      >
        {sublabel}
      </p>
    </div>
  );
}

function ViewSomsCta({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="relative flex h-[48px] flex-1 min-[1024px]:w-[240px] min-[1024px]:shrink-0 items-center justify-center gap-[9px] min-[1024px]:gap-[10px] px-[20px] py-[10px] drop-shadow-[0px_42px_53.5px_rgba(69,196,24,0.2)]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span className="relative flex items-center gap-[9px] min-[1024px]:gap-[10px]">
        <p
          className={`${gilroyMedium.className} max-w-full text-[12px] min-[1024px]:text-[16px] leading-[16px] min-[1024px]:leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic overflow-hidden text-ellipsis`}
        >
          {label}
        </p>
        <img loading="lazy" decoding="async"
          alt=""
          aria-hidden
          src="/applications/som-arrow.svg"
          className="size-[18px]"
        />
      </span>
      <GreenCtaCorners />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
      />
    </a>
  );
}

function DiscussCta({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="relative flex h-[48px] flex-1 min-[1024px]:h-auto min-[1024px]:shrink-0 items-center justify-center bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]"
    >
      <p
        className={`${gilroyMedium.className} max-w-full text-[12px] min-[1024px]:text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic overflow-hidden text-ellipsis`}
      >
        {label}
      </p>
      <GreenCtaCorners />
    </a>
  );
}

function SomCard({ visual, isUpcoming, statusPill, value, label, sublabel, ctaLabel, ctaHref }: { visual: React.ReactNode; isUpcoming?: boolean; statusPill: string; value: string; label: string; sublabel: string; ctaLabel: string; ctaHref: string }) {
  return (
    <div className="flex w-[355px] min-[1024px]:w-[450px] shrink-0 flex-col items-center gap-[16px] min-[1024px]:gap-[32px]">
      <div className="flex h-[290px] min-[1024px]:h-[320px] w-full min-[1024px]:px-[30px] items-center justify-center">
        <div
          className={`relative flex items-center justify-center overflow-clip transition-transform ${isUpcoming ? 'h-[260px] w-full min-[1024px]:w-[80%] scale-100 min-[1024px]:scale-95' : 'h-[320px] w-full'}`}
        >
          {visual}
          {isUpcoming && (
            <div className="absolute z-10 flex items-center justify-center border-[0.5px] border-[#cca839] bg-[rgba(0,0,0,0.8)] px-[16px] py-[6px]">
              <span className="text-[#cca839] opacity-70">|</span>
              <span className="mx-[12px] max-w-full overflow-hidden text-ellipsis font-mono text-[10px] uppercase tracking-[1px] text-[#cca839] whitespace-nowrap">
                {statusPill}
              </span>
              <span className="text-[#cca839] opacity-70">|</span>
            </div>
          )}
        </div>
      </div>
      <SomLabel value={value} label={label} sublabel={sublabel} />
      <div className="mt-4">
        <ViewSomsCta label={ctaLabel} href={ctaHref} />
      </div>
    </div>
  );
}

export function ApplicationsPageSom({ data }: { data?: any }) {
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 2 });
  const fitRef2 = useFitText<HTMLHeadingElement>({ maxLines: 2 });
  const heading = data?.heading || FALLBACK_HEADING;
  const subtitle = data?.subtitle || SUBTITLE;

  const secondary = {
    label: data?.secondary_button?.label || "Discuss Your Use Case",
    href: data?.secondary_button?.href || "#",
  };
  const statusPill = data?.status_pill || FALLBACK_STATUS_PILL;

  const rawCards: any[] = Array.isArray(data?.cards) ? data.cards : [];
  const cards = [0, 1].map((i) => {
    const c = rawCards[i] || {};
    const fb = FALLBACK_CARDS[i];
    const value = c.value || fb.value;
    const label = c.label || fb.label;
    const sublabel = c.sublabel || fb.sublabel;
    const isUpcoming = c.is_upcoming ?? fb.is_upcoming;
    const visualStyle = c.visual_style || fb.visual_style;
    const ctaLabel = c.primary_button?.label || fb.ctaLabel;
    const ctaHref = c.primary_button?.href || fb.ctaHref;
    const imgA = mediaUrl(c.image_a) || FALLBACK_IMG_A;
    const imgB = mediaUrl(c.image_b) || FALLBACK_IMG_B;
    let visual: React.ReactNode;
    if (visualStyle === "blurry") {
      visual = <Visual2 src={imgB} />;
    } else if (visualStyle === "layered") {
      visual = <Visual3 srcA={imgA} srcB={imgB} />;
    } else {
      visual = <Visual1 src={imgA} />;
    }
    return {
      key: `som-${i + 1}`,
      visual,
      isUpcoming,
      value,
      label,
      sublabel,
      ctaLabel,
      ctaHref
    };
  });

  return (
    <section
      className="relative z-20 mb-[-700px] min-[1024px]:mb-[-409px] flex w-full justify-center overflow-hidden bg-transparent"
      aria-label="Don't start from scratch"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="hidden w-full max-w-[1440px] flex-col items-center gap-[72px] pt-[64px] pb-[64px] min-[1024px]:flex">
        {/* Header */}
        <div className="flex w-full flex-col items-center gap-[24px]">
          <div className="relative inline-block px-[14px]">
            <h2
              ref={fitRef}
              className={`${gilroyMedium.className} bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              data-node-id="2438:4151"
            >
              {heading}
            </h2>
            <Corners />
          </div>
          <p
            className={`${interRegular.className} w-[800px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
            data-node-id="2438:4157"
          >
            {subtitle}
          </p>
        </div>

        {/* 2 SOM cards */}
        <div className="flex w-full items-start justify-center gap-[60px] overflow-visible">
          {cards.map((card) => (
            <SomCard
              key={card.key}
              visual={card.visual}
              isUpcoming={card.isUpcoming}
              statusPill={statusPill}
              value={card.value}
              label={card.label}
              sublabel={card.sublabel}
              ctaLabel={card.ctaLabel}
              ctaHref={card.ctaHref}
            />
          ))}
        </div>

        {/* Secondary CTA row */}
        <div className="flex items-center justify-center gap-[24px]">
          <DiscussCta label={secondary.label} href={secondary.href} />
        </div>
      </div>

      {/* MOBILE (<1024px) — node 4062:11663 */}
      <div
        className="flex w-full flex-col items-center px-[19px] pt-[30px] pb-[32px] min-[1024px]:hidden"
        data-node-id="4062:11663"
        data-name="5th Fold"
      >
        {/* Header: title + subtitle */}
        <div className="flex w-[350px] flex-col items-center gap-[10px]">
          {/* Title with corner brackets */}
          <div className="relative h-[79px] w-[356px]" data-name="Group 78">
            <h2
              ref={fitRef2}
              className={`${gilroyMedium.className} absolute inset-0 flex items-center justify-center bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage:
                  "linear-gradient(107.4537261117953deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              data-node-id="4062:11668"
            >
              <span className="w-full [word-break:break-word]">
                {heading}
              </span>
            </h2>

            <div className="absolute left-[353px] top-[4px] flex h-[4px] w-[2.346px] items-center justify-center">
              <div className="flex-none rotate-180">
                <div className="relative h-[4px] w-[2.346px]">
                  <div className="absolute inset-[0_0_-12.5%_-21.31%]">
                    <img loading="lazy" decoding="async" alt="" aria-hidden src="/hero/corner-tag-2.svg" className="block size-full max-w-none" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute left-[353px] top-[75px] flex h-[4px] w-[2.346px] items-center justify-center">
              <div className="-scale-y-100 flex-none rotate-180">
                <div className="relative h-[4px] w-[2.346px]">
                  <div className="absolute inset-[0_0_-12.5%_-21.31%]">
                    <img loading="lazy" decoding="async" alt="" aria-hidden src="/hero/corner-tag-2.svg" className="block size-full max-w-none" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute left-[-3px] top-[75px] h-[4px] w-[2.346px]">
              <div className="absolute inset-[0_0_-12.5%_-21.31%]">
                <img loading="lazy" decoding="async" alt="" aria-hidden src="/hero/corner-tag-1.svg" className="block size-full max-w-none" />
              </div>
            </div>
            <div className="absolute left-[-3px] top-[4px] flex h-[4px] w-[2.346px] items-center justify-center">
              <div className="-scale-y-100 flex-none">
                <div className="relative h-[4px] w-[2.346px]">
                  <div className="absolute inset-[0_0_-12.5%_-21.31%]">
                    <img loading="lazy" decoding="async" alt="" aria-hidden src="/hero/corner-tag-1.svg" className="block size-full max-w-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <p
            className={`${interRegular.className} w-[336px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
          >
            {subtitle}
          </p>
        </div>

        {/* 2 SOM cards */}
        <div className="mt-[30px] flex w-full flex-col items-center gap-[48px]">
          {cards.map((card) => (
            <SomCard
              key={card.key}
              visual={card.visual}
              isUpcoming={card.isUpcoming}
              statusPill={statusPill}
              value={card.value}
              label={card.label}
              sublabel={card.sublabel}
              ctaLabel={card.ctaLabel}
              ctaHref={card.ctaHref}
            />
          ))}
        </div>

        {/* Secondary CTA row */}
        <div className="mt-[47px] flex w-full items-center justify-center gap-[14px]">
          <DiscussCta label={secondary.label} href={secondary.href} />
        </div>
      </div>
    </section>
  );
}
