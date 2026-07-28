import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
  PRODUCTS_FEATURE_CARDS,
  SECTION_TITLE_GRADIENT,
} from "./products-data";
import type { ProductsFeatureCardData } from "./products-data";
import { ProductsFeatureCard } from "./ProductsFeatureCard";
import { ProductsFeaturesCarousel } from "./ProductsFeaturesCarousel";

const FALLBACK_HEADING =
  "The chip that ends the \npower-vs-intelligence tradeoff.";
const FALLBACK_SUBTITLE =
  "For a decade, product makers chose: a dumb MCU that lasts months, or a smart NPU that dies by lunch. GPX10 Pro is the first that refuses to choose.";
const BADGE_TEXT = "What GPX10 Pro unlocks";
const CAPTION =
  "One chip replaces the MCU + AI accelerator + sensor hub + memory you’re juggling today — and it stays aware while it sleeps.";

/* Corner tick for the badge — Figma 3707:1626-1629 (Vector 42/43). */
function BadgeTick({
  className = "",
  flip = "",
}: {
  className?: string;
  flip?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute flex size-[4.133px] items-center justify-center ${className}`}
      aria-hidden
    >
      <div className={`flex-none ${flip}`}>
        <div className="relative size-[4.133px]">
          <svg
            className="absolute inset-[0_0_-12.5%_-12.5%] block size-full max-w-none"
            viewBox="0 0 4.6498 4.6498"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0.516645 0L0.516645 4.13316H4.6498"
              stroke="white"
              strokeWidth="1.03329"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* "What GPX10 Pro unlocks" badge — Figma 3707:1625. */
function UnlockBadge() {
  return (
    <div
      className="relative h-[27px] w-[214px] shrink-0 overflow-clip bg-[rgba(255,255,255,0.06)]"
      data-node-id="3707:1625"
      data-name="Menu"
    >
      <BadgeTick className="top-0 left-0" flip="-scale-y-100" />
      <BadgeTick className="top-0 right-[0.01px]" flip="rotate-180" />
      <BadgeTick className="bottom-[0.13px] left-0" />
      <BadgeTick
        className="right-[0.01px] bottom-[0.13px]"
        flip="-scale-y-100 rotate-180"
      />
      <p
        className={`${dmMono.className} absolute top-[calc(50%-4.5px)] left-[calc(50%-84.5px)] text-[13.433px] leading-[20.149px] font-normal tracking-[-0.403px] whitespace-nowrap text-[#ecfae5] uppercase not-italic`}
        data-node-id="3707:1630"
      >
        {BADGE_TEXT}
      </p>
      <div className="absolute top-1/2 left-[6.7px] h-[12.399px] w-[2.067px] -translate-y-1/2 bg-white opacity-60" />
      <div className="absolute top-1/2 right-[7px] h-[12.399px] w-[2.067px] -translate-y-1/2 bg-white opacity-60" />
    </div>
  );
}

/* Full-bleed section background — Figma 3286:1931 backdrop. */
function SectionBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-black" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src="/products/features-bg.png"
        className="absolute size-full max-w-none object-bottom opacity-75"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0)] from-[88.149%] to-black" />
    </div>
  );
}

/**
 * Figma 3286:1931 — "Section 6" (The chip that ends the
 * power-vs-intelligence tradeoff). Desktop uses the homepage MeasuredProof
 * carousel behaviour: a 300vh section with a sticky 100vh stage; vertical
 * scroll pans the card strip horizontally (see ProductsFeaturesCarousel).
 */
export function ProductsFeatures({ data }: { data?: any }) {
  const heading = data?.heading || FALLBACK_HEADING;
  // The design mandates a two-line title. Strapi stores the same copy as a
  // single line, so when the text matches (whitespace-insensitive) fall back
  // to the design's canonical line break.
  const rawLines: string[] = heading.split("\n");
  const normalize = (s: string) => s.replace(/\s+/g, " ").trim();
  const headingLines =
    rawLines.length === 1 &&
    normalize(rawLines[0]) === normalize(FALLBACK_HEADING.replace("\n", " "))
      ? FALLBACK_HEADING.split("\n")
      : rawLines;
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;

  // Merge Strapi feature cards over the design's fallback cards by index.
  // Only title + description are CMS-editable; the per-card visual variant
  // (brain/coin/bubble/stack) and pixel layout (titleLeft/titleWidth/nodeId)
  // are design-specific and have no Strapi field, so they stay from fallback.
  const rawFeatureCards: any[] = Array.isArray(data?.feature_cards)
    ? data.feature_cards
    : [];
  const featureCards: ProductsFeatureCardData[] = PRODUCTS_FEATURE_CARDS.map(
    (fb, i) => {
      const c = rawFeatureCards[i] || {};
      const strapiTitle = c.title?.trim();
      return {
        ...fb,
        title: strapiTitle || fb.title,
        description: c.description?.trim() || fb.description,
        // When CMS overrides the title, drop the design's explicit two-line
        // break so the new copy renders (it auto-wraps via word-break).
        titleLines: strapiTitle ? null : fb.titleLines,
      };
    }
  );

  return (
    <section
      id="products-features"
      className="relative left-1/2 w-screen max-w-none -translate-x-1/2 bg-black max-[1023px]:h-auto min-[1024px]:h-[300vh]"
      data-node-id="3286:1931"
      data-name="Section 6"
      aria-label="Product capabilities"
    >
      {/* DESKTOP (>=1024px) — sticky stage */}
      <div className="sticky top-0 hidden h-[100vh] min-h-[945px] w-full overflow-hidden min-[1024px]:block">
        <SectionBackdrop />

        <div className="relative mx-auto h-full w-full max-w-[1440px]">
          {/* 3286:2105 — Section Title */}
          <div
            className="absolute top-[22.5px] left-1/2 flex -translate-x-1/2 flex-col items-center justify-center gap-[24px]"
            data-node-id="3286:2105"
            data-name="Section Title"
          >
            <UnlockBadge />
            <div
              className="relative flex shrink-0 flex-col items-center px-[10px]"
              data-node-id="3286:2106"
              data-name="Title"
            >
              <div
                className={`${gilroyMedium.className} relative shrink-0 bg-clip-text text-center text-[46px] leading-[0] font-medium whitespace-nowrap text-transparent not-italic [word-break:break-word]`}
                style={{
                  backgroundImage: SECTION_TITLE_GRADIENT,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
                data-node-id="3286:2107"
              >
                {headingLines.map((line, i) => (
                  <p
                    key={`title-${i}`}
                    className={`leading-[49px] whitespace-pre ${i === 0 ? "mb-0" : ""}`}
                  >
                    {line}
                  </p>
                ))}
              </div>
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            </div>
            <p
              className={`${interRegular.className} w-[650px] shrink-0 text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
              data-node-id="3286:2112"
            >
              {subtitle}
            </p>
          </div>

          <ProductsFeaturesCarousel cards={featureCards} />

          {/* 3710:1634 — caption (Figma top 917 of the 1057 canvas; rises on
              shorter stages so it never overlaps the 600px cards) */}
          <p
            className={`${interRegular.className} absolute bottom-[clamp(12px,calc(100vh-957px),98px)] left-1/2 w-[603.549px] -translate-x-1/2 text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
            data-node-id="3710:1634"
          >
            {CAPTION}
          </p>
        </div>
      </div>

      {/* MOBILE (<1024px) — stacked header + swipeable card strip */}
      <div className="relative z-10 w-full min-[1024px]:hidden">
        <SectionBackdrop />
        <div className="relative flex flex-col items-center gap-[20px] px-[24px] pt-[56px]">
          <UnlockBadge />
          <div className="relative px-[10px]" data-name="Title">
            <h2
              className={`${gilroyMedium.className} bg-clip-text text-center text-[30px] leading-[34px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: SECTION_TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {headingLines.join(" ")}
            </h2>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </div>
          <p
            className={`${interRegular.className} max-w-[650px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic`}
          >
            {subtitle}
          </p>
        </div>

        <div className="relative mt-[40px] flex snap-x snap-mandatory gap-[24px] overflow-x-auto px-[24px] pb-[8px]">
          {featureCards.map((card) => (
            <div key={`m-${card.nodeId}`} className="snap-center">
              <ProductsFeatureCard card={card} />
            </div>
          ))}
        </div>

        <p
          className={`${interRegular.className} relative mx-auto mt-[32px] max-w-[603.549px] px-[24px] pb-[56px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic`}
        >
          {CAPTION}
        </p>
      </div>
    </section>
  );
}
