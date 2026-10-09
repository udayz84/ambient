"use client";

import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { useFitText } from "../shared/FitText";
import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { AnimatedDotsBackground } from "../shared/AnimatedDotsBackground";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
  PRIMARY_CTA_INSET,
  PRIMARY_CTA_SHADOW,
  START_CARD,
  START_CARD_TITLE_GRADIENT,
  START_CARDS,
  START_TITLE_GRADIENT,
} from "./products-data";

const FALLBACK_HEADING = "Start building with GPX10 Pro.";
const FALLBACK_SUBTITLE =
  "A complete edge-AI SoC — AI engine, control, sensing, memory, and security — integrated so your board doesn't have to be.";

function splitLines(value: string): string[] {
  return value.split("\n");
}

/**
 * Figma 2903:2609 (title) + 2903:2578/2555 (two CTA cards).
 * "Start building with GPX10 Pro." — footer CTA section.
 */
export function ProductsStartBuilding({ data }: { data?: any }) {
  const heading = data?.heading || FALLBACK_HEADING;
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const cardBackground = mediaUrl(data?.background_image) || "/Rectangle 1618873545.png";
  const cards =
    Array.isArray(data?.cards) && data.cards.length > 0
      ? data.cards.map((c: any, i: number) => {
          const fallback = START_CARDS[i] || START_CARDS[0];
          const titleLines = splitLines(c?.title_lines || fallback.titleLines.join("\n"));
          return {
            nodeId: `start-card-${i}`,
            titleLines: [titleLines[0] || "", titleLines[1] || ""],
            description: c?.description ?? fallback.description,
            cta: c?.cta_label ?? fallback.cta,
            ctaHref: c?.cta_href ?? "#",
          };
        })
      : START_CARDS;
  return (
    <section className="relative z-20 mb-[-700px] min-[1024px]:mb-[-520px] w-full bg-transparent">
      {/* DESKTOP (>=1024px) */}
      <div
        className="relative mx-auto hidden w-full min-[1024px]:block"
        aria-label="Start building with GPX10 Pro"
      >
        <ProductsStartBuildingDesktop
          heading={heading}
          subtitle={subtitle}
          cardBackground={cardBackground}
          cards={cards}
        />
      </div>

      {/* MOBILE (<1024px) */}
      <div className="relative w-full min-[1024px]:hidden">
        <ProductsStartBuildingMobile
          heading={heading}
          subtitle={subtitle}
          cardBackground={cardBackground}
          cards={cards}
        />
      </div>
    </section>
  );
}

function ProductsStartBuildingDesktop({
  heading,
  subtitle,
  cardBackground,
  cards,
}: {
  heading: string;
  subtitle: string;
  cardBackground: string;
  cards: any[];
}) {
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 2 });
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center pb-[120px] pt-0 mt-[-60px]">
      {/* Section title — 2903:2609 (centered, w=650) */}
      <div
        className="flex flex-col items-center gap-[24px]"
        style={{ width: 650 }}
        data-node-id="2903:2609"
        data-name="Section Title"
      >
        <div
          className="relative px-[10px]"
          style={{ width: 641, height: 49 }}
          data-node-id="2903:2610"
          data-name="Title"
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            ref={fitRef}
            className={`${gilroyMedium.className} absolute m-0 w-[621px] bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              left: 10,
              top: 0,
              backgroundImage: START_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2903:2611"
          >
            {heading}
          </h2>
        </div>
        <p
          className={`${interRegular.className} w-[650px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
          data-node-id="2903:2616"
        >
          {subtitle}
        </p>
      </div>

      {/* Cards row — gap 84, centered */}
      <div
        className="mt-[80px] flex items-start"
        style={{ gap: START_CARD.gap }}
      >
        {cards.map((card) => (
          <StartCardView
            key={card.nodeId}
            card={card}
            cardBackground={cardBackground}
          />
        ))}
      </div>
    </div>
  );
}

function StartCardView({
  card,
  cardBackground,
}: {
  card: any;
  cardBackground: string;
}) {
  const fitRef = useFitText<HTMLHeadingElement>({});
  return (
    <div
      className="relative shrink-0"
      style={{ width: START_CARD.width, height: START_CARD.height }}
      data-node-id={card.nodeId}
      data-name="Frame 1618875857"
    >
      {/* Card background shape — 2903:2556/2579 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy" decoding="async"
        alt=""
        src={cardBackground}
        className="pointer-events-none absolute inset-0 block size-full max-w-none"
        aria-hidden
      />

      {/* Content — vertically centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-[54px]">
        <div className="flex w-[450px] flex-col items-center gap-[16px]">
          {/* Card title with bracket frame */}
          <div
            className="relative py-[7px]"
            style={{ width: 450 }}
            data-name="Frame 1618875832"
          >
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            <h3
              ref={fitRef}
              className={`${gilroyMedium.className} relative mx-auto m-0 w-[473.877px] bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: START_CARD_TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              <span className="block overflow-hidden text-ellipsis leading-[49px]">{card.titleLines[0]}</span>
              {card.titleLines[1] && card.titleLines[1].trim() !== "" && (
                <span className="block overflow-hidden text-ellipsis leading-[49px]">{card.titleLines[1]}</span>
              )}
            </h3>
          </div>

          {/* Description + CTA */}
          <div className="flex w-[450px] flex-col items-center gap-[20px]">
            <p
              className={`min-h-[72px] ${interRegular.className} w-full text-center text-[14px] leading-[24px] font-normal tracking-[-0.3125px] text-white not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
            >
              {card.description}
            </p>
            <StartCta href={card.ctaHref}>{card.cta}</StartCta>
          </div>
        </div>
      </div>
    </div>
  );
}

function StartCta({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-full items-center justify-center overflow-hidden`}
      data-name="Cta"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <AnimatedDotsBackground />
      <span className="relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
        {children}
      </span>
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`}
      />
    </a>
  );
}

function ProductsStartBuildingMobile({
  heading,
  subtitle,
  cardBackground,
  cards,
}: {
  heading: string;
  subtitle: string;
  cardBackground: string;
  cards: any[];
}) {
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 2 });
  return (
    <div
      className="relative w-full px-[24px] pt-[40px] pb-[40px]"
      aria-label="Start building with GPX10 Pro"
    >
      {/* Title */}
      <div className="flex flex-col items-center gap-[16px]">
        <h2
          ref={fitRef}
          className={`${gilroyMedium.className} max-w-full bg-clip-text text-center text-[30px] leading-[34px] font-medium text-transparent not-italic [word-break:break-word]`}
          style={{
            backgroundImage: START_TITLE_GRADIENT,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {heading}
        </h2>
        <p
          className={`${interRegular.className} max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
        >
          {subtitle}
        </p>
      </div>

      {/* Cards */}
      <div className="mt-[40px] flex flex-col gap-[24px]">
        {cards.map((card) => (
          <div key={card.nodeId} className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async"
              alt=""
              src={cardBackground}
              className="pointer-events-none absolute inset-0 block size-full max-w-none"
              aria-hidden
            />
            <div className="relative flex flex-col items-center gap-[24px] px-[28px] py-[36px]">
              <h3
                className={`${gilroyMedium.className} max-w-full bg-clip-text text-center text-[30px] leading-[34px] font-medium text-transparent not-italic [word-break:break-word]`}
                style={{
                  backgroundImage: START_CARD_TITLE_GRADIENT,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                {card.titleLines[0]} {card.titleLines[1]}
              </h3>
              <p
                className={`${interRegular.className} text-center text-[14px] leading-[21px] font-normal text-white opacity-90 min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
              >
                {card.description}
              </p>
              <StartCta href={card.ctaHref}>{card.cta}</StartCta>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
