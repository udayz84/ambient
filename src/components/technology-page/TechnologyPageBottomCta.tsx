"use client";

import { useState } from "react";
import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { ProductBriefModal } from "../products-page/ProductBriefModal";
import { GradientTitle, CornerDecor } from "../contact/contact-shared";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { MobileTitleCorners } from "./mobile-shared";

const CARD_OUTLINE = "/technology/cta-card-outline.svg";
const MOBILE_CARD_FRAME = "/technology/bottom-cta-card-frame.svg";

const SECTION_TITLE_DEG = "119.349deg";
const MOBILE_SECTION_TITLE_DEG = "122.163deg";
const CARD_TITLE_DEG = "107.367deg";
const FALLBACK_SECTION_TITLE = "Put A-Cube to Work";
const FALLBACK_SECTION_SUBTITLE =
  "A complete edge-AI SoC — AI engine, control, sensing, memory, and security — integrated so your board doesn't have to be.";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";
const MOBILE_CTA_SHADOW =
  "shadow-[0px_26.55px_67.639px_0px_rgba(69,196,24,0.2),0px_15.627px_20.391px_0px_rgba(83,216,36,0.15),0px_6.491px_8.469px_0px_rgba(83,216,36,0.15),0px_2.348px_3.063px_0px_rgba(83,216,36,0.1)]";

type CardData = {
  nodeId: string;
  titleLines: [string, string];
  body: string;
  cta: string;
  ctaHref: string;
  onClick?: () => void;
};

const FALLBACK_CARDS: CardData[] = [
  {
    nodeId: "2995:1298",
    titleLines: ["Get an", "Evaluation Kit."],
    body: "Explore how Ambient AI can unlock new capabilities in your wearable product. Strategic planning session with our applications team.",
    cta: "Request Eval Kit",
    ctaHref: "/dvk",
  },
  {
    nodeId: "2995:1275",
    titleLines: ["Scale to increase", "the volume."],
    body: "Be the first to access our upcoming Vision, Sound, and Industrial modules.",
    cta: "Talk to Sales",
    ctaHref: "/contact#sales-form",
  },
];

function CtaCard({
  card,
  outlineSrc,
}: {
  card: CardData;
  outlineSrc: string;
}) {
  return (
    <div
      className="relative h-[320px] w-[558px] shrink-0"
      data-node-id={card.nodeId}
    >
      {/* card background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy" decoding="async"
        src="/technology/cta-card-bg.png"
        alt=""
        aria-hidden
        className="absolute top-[0.12px] left-[0.5px] block h-[319.572px] w-[557.336px] max-w-none"
      />
      {/* card outline */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy" decoding="async"
        src={outlineSrc}
        alt=""
        aria-hidden
        className="absolute top-[0.12px] left-[0.5px] block h-[319.572px] w-[557.336px] max-w-none"
      />

      {/* content */}
      <div className="absolute top-[calc(50%-6px)] left-[52px] w-[450px] -translate-y-1/2">
        <div className="flex flex-col items-start gap-[16px]">
          {/* title */}
          <div className="relative w-full py-[5px]">
            <GradientTitle
              gradientDeg={CARD_TITLE_DEG}
              className="w-full text-center"
            >
              <span className="block leading-[49px] [word-break:break-word]">
                {card.titleLines[0]}
              </span>
              {card.titleLines[1] && card.titleLines[1].trim() !== "" && (
                <span className="block leading-[49px] [word-break:break-word]">
                  {card.titleLines[1]}
                </span>
              )}
            </GradientTitle>
            <CornerDecor />
          </div>

          {/* body + CTA */}
          <div className="flex w-full flex-col items-start gap-[20px]">
            <p
              className={`${interRegular.className} min-h-[72px] w-full text-center text-[14px] leading-[24px] font-normal tracking-[-0.3125px] text-white not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
            >
              {card.body}
            </p>
            <a
              href={card.ctaHref}
              onClick={(e) => {
                if (card.onClick) {
                  e.preventDefault();
                  card.onClick();
                }
              }}
              className={`${gilroyMedium.className} ${GREEN_CTA_SHADOW} relative block h-[48px] w-full shrink-0`}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
              />
              <span className="absolute top-[calc(50%-14px)] left-1/2 flex max-w-full -translate-x-1/2 justify-center overflow-hidden text-ellipsis text-[16px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic">
                {card.cta}
              </span>
              <GreenCtaCorners />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TechnologyPageBottomCta({ data }: { data?: any } = {}) {
  const [isEvalModalOpen, setIsEvalModalOpen] = useState(false);
  const sectionTitle = data?.heading || FALLBACK_SECTION_TITLE;
  const sectionSubtitle = data?.subtitle || FALLBACK_SECTION_SUBTITLE;
  const outlineSrc = mediaUrl(data?.card_outline) || CARD_OUTLINE;

  const strapiCards = Array.isArray(data?.cards) ? data.cards : null;
  const cards: CardData[] =
    strapiCards && strapiCards.length > 0
      ? strapiCards.map((c: any, i: number) => {
          const fb = FALLBACK_CARDS[i] ?? FALLBACK_CARDS[FALLBACK_CARDS.length - 1];
          const titleLinesRaw =
            (c?.title_lines as string) || fb.titleLines.join("\n");
          const titleSplit = titleLinesRaw.split("\n");
          return {
            nodeId: fb.nodeId,
            titleLines: [titleSplit[0] ?? "", titleSplit[1] ?? ""] as [
              string,
              string,
            ],
            body: (c?.description as string) || fb.body,
            cta: (c?.cta_label as string) || fb.cta,
            ctaHref: i === 0 ? "#" : (i === 1 ? "/contact#sales-form" : fb.ctaHref),
            onClick: i === 0 ? () => setIsEvalModalOpen(true) : undefined,
          };
        })
      : FALLBACK_CARDS.map((fb, i) => ({
          ...fb,
          onClick: i === 0 ? () => setIsEvalModalOpen(true) : undefined,
        }));

  return (
    <section
      className="relative z-20 mb-[-700px] min-[1024px]:mb-[-409px] w-full bg-transparent"
      aria-label="Put A-Cube to work"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="hidden flex-col items-center min-[1024px]:flex min-[1024px]:pt-[80px]">
        {/* section title */}
        <div
          className="flex w-[492.93px] flex-col items-center gap-[24px]"
          data-node-id="2995:1328"
          data-name="Section Title"
        >
          <div className="relative flex flex-col items-center px-[10px]">
            <GradientTitle gradientDeg={SECTION_TITLE_DEG} className="text-center">
              {sectionTitle}
            </GradientTitle>
            <GreenCtaCorners />
          </div>
          <p
            className={`${interRegular.className} w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
          >
            {sectionSubtitle}
          </p>
        </div>

        {/* cards */}
        <div className="mt-[86px] flex items-start justify-center gap-[84px]">
          {cards.map((card) => (
            <CtaCard key={card.nodeId} card={card} outlineSrc={outlineSrc} />
          ))}
        </div>
      </div>

      {/* MOBILE (<1024px) — Figma 3572:7372 */}
      <div className="flex flex-col items-center gap-[16px] px-[20px] pt-[41px] min-[1024px]:hidden">
        {/* Section heading */}
        <div className="flex w-full flex-col items-center gap-[10px]">
          <div className="relative w-[350px]">
            <p
              className={`${gilroyMedium.className} w-full bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: `linear-gradient(${MOBILE_SECTION_TITLE_DEG}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {sectionTitle}
            </p>
            <MobileTitleCorners />
          </div>
          <p
            className={`${interRegular.className} text-center text-[14px] leading-[16px] font-normal text-[#f0f0f0] not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
          >
            {sectionSubtitle}
          </p>
        </div>

        {/* CTA cards */}
        <div className="flex flex-col gap-[14.544px]">
          {cards.map((card) => (
            <div
              key={`m-${card.nodeId}`}
              className="relative h-[202.286px] w-[352.736px] shrink-0"
            >
              {/* card frame */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async"
                src={MOBILE_CARD_FRAME}
                alt=""
                aria-hidden
                className="absolute left-[0.32px] top-[0.08px] block h-[202.015px] w-[352.316px] max-w-none"
              />

              {/* content */}
              <div className="absolute left-[32.87px] top-1/2 flex w-[284.464px] -translate-y-1/2 flex-col gap-[11px]">
                {/* title */}
                <div className="relative w-full py-[3px]">
                  <p
                    className={`${gilroyMedium.className} mx-auto w-[299.558px] bg-clip-text text-center text-[30px] font-medium text-transparent not-italic [word-break:break-word]`}
                    style={{
                      backgroundImage: `linear-gradient(${CARD_TITLE_DEG}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  >
                    <span className="block leading-[30.975px]">{card.titleLines[0]}</span>
                    {card.titleLines[1] && card.titleLines[1].trim() !== "" && (
                      <span className="block leading-[30.975px]">{card.titleLines[1]}</span>
                    )}
                  </p>
                  <CornerDecor />
                </div>

                {/* body + CTA */}
                <div className="flex w-full flex-col gap-[14px]">
                  <p
                    className={`${interRegular.className} min-h-[44px] text-center text-[12px] leading-[15.171px] font-normal tracking-[-0.1975px] text-white not-italic [word-break:break-word]`}
                  >
                    {card.body}
                  </p>
                  <a
                    href={card.ctaHref}
                    onClick={(e) => {
                      if (card.onClick) {
                        e.preventDefault();
                        card.onClick();
                      }
                    }}
                    className={`${gilroyMedium.className} ${MOBILE_CTA_SHADOW} relative block h-[30.343px] w-full shrink-0`}
                  >
                    <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
                    <span aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0px_0.632px_11.379px_0px_rgba(217,255,240,0.6)]" />
                    <span className="absolute top-[calc(50%-8.85px)] left-1/2 flex max-w-full -translate-x-1/2 justify-center overflow-hidden text-ellipsis text-[10.114px] leading-[17.7px] font-medium whitespace-nowrap text-white uppercase not-italic">
                      {card.cta}
                    </span>
                    <GreenCtaCorners />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <ProductBriefModal
        isOpen={isEvalModalOpen}
        onClose={() => setIsEvalModalOpen(false)}
        title="Get an Evaluation Kit"
      />
    </section>
  );
}
