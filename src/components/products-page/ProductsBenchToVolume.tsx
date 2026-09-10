"use client";

import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { useFadeIn, getFadeInClass } from "../shared/useFadeIn";
import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { TagBadge } from "../hero/TagBadge";
import { AnimatedDotsBackground } from "../shared/AnimatedDotsBackground";
import {
  BENCH_CARD,
  BENCH_CARDS,
  BENCH_IMAGE_BOX,
  BENCH_IMAGE_VIGNETTE,
  BENCH_TITLE_GRADIENT,
  CORNER_LEFT,
  CORNER_RIGHT,
  DEV_CHIP_BG,
  PRIMARY_CTA_INSET,
  PRIMARY_CTA_SHADOW,
} from "./products-data";

const FALLBACK_HEADING = "From bench to volume\n without rewriting a thing.";
const FALLBACK_SUBTITLE =
  "The C code, the build, the AI you validate on the kit ports straight to production silicon. This is the part competitors can't offer.";
const FALLBACK_CHIP_LABEL = "Development";

function splitLines(value: string): string[] {
  return value.split("\n");
}

/**
 * Figma 2918:1467 (title) + 2918:1476 (3 product cards).
 * "From bench to volume without rewriting a thing."
 */
export function ProductsBenchToVolume({ data }: { data?: any }) {
  const heading = data?.heading || FALLBACK_HEADING;
  const headingLines = splitLines(heading);
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const chipLabel = data?.chip_label || FALLBACK_CHIP_LABEL;
  const cards =
    Array.isArray(data?.cards) && data.cards.length > 0
      ? data.cards.map((c: any, i: number) => {
          const fallback = BENCH_CARDS[i] || BENCH_CARDS[0];
          return {
            nodeId: `bench-card-${i}`,
            title: c?.title ?? fallback.title,
            description: c?.description ?? fallback.description,
            cta: c?.cta_label ?? fallback.cta,
            ctaHref: c?.cta_href ?? "#",
            ctaWidth: fallback.ctaWidth,
            image: c?.image ?? fallback.image,
            chipLabel: c?.chipLabel ?? fallback.chipLabel ?? chipLabel,
          };
        })
      : BENCH_CARDS.map(c => ({ ...c, chipLabel: c.chipLabel || chipLabel }));
  return (
    <>
      {/* DESKTOP (>=1024px) */}
      <section
        className="relative mx-auto hidden w-full bg-black min-[1024px]:block"
        aria-label="From bench to volume"
      >
        <ProductsBenchToVolumeDesktop
          headingLines={headingLines}
          subtitle={subtitle}
          chipLabel={chipLabel}
          cards={cards}
        />
      </section>

      {/* MOBILE (<1024px) */}
      <ProductsBenchToVolumeMobile
        headingLines={headingLines}
        subtitle={subtitle}
        chipLabel={chipLabel}
        cards={cards}
      />
    </>
  );
}

function ProductsBenchToVolumeDesktop({
  headingLines,
  subtitle,
  chipLabel,
  cards,
}: {
  headingLines: string[];
  subtitle: string;
  chipLabel: string;
  cards: any[];
}) {
  return (
    <div className="mx-auto flex w-full max-w-[1204px] flex-col items-center pb-0">
      {/* Section title — 2918:1467 (centered, w=800) */}
      <div
        className="flex flex-col items-center gap-[24px]"
        style={{ width: 800 }}
        data-node-id="2918:1467"
        data-name="Frame 1984079432"
      >
        <div
          className="relative px-[10px]"
          style={{ width: 558, height: 98 }}
          data-node-id="2918:1469"
          data-name="Title"
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} absolute m-0 w-[538px] bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              left: 10,
              top: 0,
              backgroundImage: BENCH_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2918:1470"
          >
            {headingLines.map((line, i) => (
              <span key={i} className="block leading-[49px]">{line}</span>
            ))}
          </h2>
        </div>
        <p
          className={`${interRegular.className} w-[800px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
          data-node-id="2918:1475"
        >
          {subtitle}
        </p>
      </div>

      {/* Cards row — 2918:1476 */}
      <div
        className="mt-[45px] flex items-stretch"
        style={{ gap: BENCH_CARD.gap, width: 1204 }}
        data-node-id="2918:1476"
        data-name="Frame 1984079440"
      >
        {cards.map((card) => (
          <BenchCardView key={card.nodeId} card={card} chipLabel={card.chipLabel || chipLabel} />
        ))}
      </div>
    </div>
  );
}

function BenchCardView({ card, chipLabel }: { card: any; chipLabel: string }) {
  const { fadeRef, isVisible } = useFadeIn();

  return (
    <article
      ref={fadeRef}
      className={`relative flex flex-1 flex-col overflow-clip border-[0.5px] border-solid px-[20px] pt-[20px] pb-[32px] ${getFadeInClass(isVisible)}`}
      style={{
        backgroundColor: BENCH_CARD.bg,
        borderColor: BENCH_CARD.border,
      }}
      data-node-id={card.nodeId}
      data-name="Article"
    >
      {/* Image box (vignette placeholder) — 2918:1478 */}
      <div
        className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-[6px] border border-solid"
        style={{
          width: BENCH_IMAGE_BOX.width,
          height: BENCH_IMAGE_BOX.height,
          borderColor: BENCH_CARD.imageBorder,
          backgroundImage: BENCH_IMAGE_VIGNETTE,
        }}
        data-name="Container"
        aria-hidden
      >
        {card.image ? (
          <img loading="lazy" decoding="async"
            src={card.image}
            alt=""
            className="absolute inset-0 size-full max-w-none rounded-[6px] object-contain"
          />
        ) : (
          <div
            style={{
              width: BENCH_IMAGE_BOX.placeholderWidth,
              height: BENCH_IMAGE_BOX.placeholderHeight,
            }}
          />
        )}
      </div>

      {/* Content — chip + title + description */}
      <div className="relative mt-[20px] flex flex-col items-start gap-[10px] not-italic">
        <DevChip chipLabel={chipLabel} />
        <h3
          className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium whitespace-nowrap text-white overflow-hidden text-ellipsis`}
        >
          {card.title}
        </h3>
        <p
          className={`${interRegular.className} w-full text-[16px] leading-[24px] font-normal text-[rgba(240,240,240,0.6)] [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden`}
        >
          {card.description}
        </p>
      </div>

      {/* CTA pinned to bottom */}
      <div className="mt-auto pt-[20px]">
        <GreenCta width={card.ctaWidth} href={card.ctaHref}>
          {card.cta}
        </GreenCta>
      </div>

      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </article>
  );
}

function DevChip({ chipLabel }: { chipLabel: string }) {
  return (
    <div
      className={`${dmMono.className} relative h-[26px] shrink-0 overflow-clip`}
      style={{ width: 153, backgroundColor: DEV_CHIP_BG }}
      data-name="Menu"
    >
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      <p className="absolute left-[calc(50%+0.5px)] top-[calc(50%-4.5px)] -translate-x-1/2 text-[13px] leading-[19.5px] font-normal tracking-[-0.39px] whitespace-nowrap text-[#ecfae5] uppercase not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
        {chipLabel}
      </p>
      <div className="absolute top-1/2 left-[7px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
      <div className="absolute top-1/2 right-[7px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
    </div>
  );
}

function GreenCta({
  children,
  width,
  href,
}: {
  children: React.ReactNode;
  width: number;
  href: string;
}) {
  return (
    <a
      href={href}
      className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] shrink-0 items-center justify-center overflow-hidden`}
      style={{ width }}
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
      <GreenCtaCorners />
    </a>
  );
}

function ProductsBenchToVolumeMobile({
  headingLines,
  subtitle,
  chipLabel,
  cards,
}: {
  headingLines: string[];
  subtitle: string;
  chipLabel: string;
  cards: any[];
}) {
  return (
    <section
      className="relative w-full overflow-hidden bg-black min-[1024px]:hidden"
      aria-label="From bench to volume"
      data-node-id="4105:7391"
    >
      <div className="relative mx-auto w-full" style={{ maxWidth: 393 }}>

        {/* ── Header — 4105:7396 (top=30, centred, 350 wide, gap=10) ── */}
        <div className="flex flex-col items-center gap-[10px] px-[21px] pt-[40px]">
          <TagBadge
            label="From eval to production"
            width={190}
            height={27}
            centerLabel
            leftBarLeft={5.7}
            rightBarLeft={182.16}
            labelClassName="text-[12px] leading-[20.149px] tracking-[-0.36px]"
          />
          {/* Title */}
          <div className="relative">
            <h2
              className={`${gilroyMedium.className} w-[350px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage:
                  "linear-gradient(98.934deg, rgb(255,255,255) 1.3527%, rgb(212,233,188) 55.161%, rgb(255,255,255) 111.67%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {headingLines.map((line, i) => (
                <span key={i} className="block leading-[36px]">{line.trim()}</span>
              ))}
            </h2>
            <Corners leftSrc="/hero/vector-57.svg" rightSrc="/hero/vector-55.svg" />
          </div>
          {/* Description */}
          <p
            className={`${interRegular.className} w-[350px] text-center text-[14px] leading-[16px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
          >
            {subtitle}
          </p>
        </div>

        {/* ── Cards — 4105:7737 (355 wide, gap=12) ── */}
        <div className="mx-auto mt-[24px] flex w-[355px] flex-col gap-[12px] pb-[40px]">
          {cards.map((card) => (
            <MobileBenchCard key={card.nodeId} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Mobile bench card — Figma 4105:7738 (355 wide) ── */
function MobileBenchCard({ card }: { card: any }) {
  return (
    <article
      className="relative flex w-[355px] flex-col gap-[16px] overflow-clip border-[0.461px] border-solid border-[rgba(240,240,240,0.2)] bg-black px-[18px] pb-[30px] pt-[18px]"
      data-node-id={card.nodeId}
      data-name="Article"
    >
      {/* Image container — 319×300, rounded, green border */}
      <div
        className="relative flex h-[300px] w-full shrink-0 items-center justify-center overflow-hidden rounded-[5.528px] border-[0.921px] border-solid border-[rgba(0,255,0,0.3)]"
        style={{ backgroundImage: BENCH_IMAGE_VIGNETTE }}
        aria-hidden
      >
        {card.image && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img loading="lazy" decoding="async"
            src={card.image}
            alt=""
            className="absolute inset-0 size-full max-w-none rounded-[5.528px] object-contain"
          />
        )}
      </div>

      {/* Content — chip + title + description */}
      <div className="flex flex-col gap-[8px]">
        <div className="flex flex-col gap-[8px]">
          {/* Chip badge */}
          <div
            className={`${dmMono.className} relative h-[27px] w-[140px] shrink-0 overflow-clip bg-[rgba(115,190,91,0.12)]`}
          >
            <Corners leftSrc="/hero/vector-57.svg" rightSrc="/hero/vector-55.svg" />
            <p className="absolute left-1/2 top-[calc(50%-3.72px)] -translate-x-1/2 text-[12px] leading-[20.149px] tracking-[-0.36px] uppercase whitespace-nowrap text-[#ecfae5] not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
              {card.chipLabel}
            </p>
            <div className="absolute left-[5.7px] top-1/2 h-[12.399px] w-[2.067px] -translate-y-1/2 bg-white opacity-60" />
            <div className="absolute right-[5.7px] top-1/2 h-[12.399px] w-[2.067px] -translate-y-1/2 bg-white opacity-60" />
          </div>
          {/* Title */}
          <p
            className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium whitespace-nowrap text-white not-italic [word-break:break-word]`}
          >
            {card.title}
          </p>
        </div>
        {/* Description */}
        <p
          className={`${interRegular.className} w-full text-[14px] leading-[21px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}
        >
          {card.description}
        </p>
      </div>

      {/* CTA — 140×48 */}
      <a
        href={card.ctaHref || "#"}
        className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-[140px] shrink-0 items-center justify-center overflow-hidden`}
      >
        <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
        <AnimatedDotsBackground />
        <span className="relative text-[12px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
          {card.cta}
        </span>
        <span aria-hidden className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`} />
        <GreenCtaCorners />
      </a>
    </article>
  );
}
