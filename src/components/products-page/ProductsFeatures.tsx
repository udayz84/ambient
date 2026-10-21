"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { mediaUrl } from "@/lib/strapi";
import { useFitText } from "../shared/FitText";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { TagBadge } from "../hero/TagBadge";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
  resolveFeatureCards,
  SECTION_TITLE_GRADIENT,
} from "./products-data";
import type { ProductsFeatureCardData } from "./products-data";
import { ProductsFeatureCard } from "./ProductsFeatureCard";
import { TabletScaleCanvas } from "../shared/TabletScaleCanvas";

const FALLBACK_HEADING =
  "The chip that ends the \npower-vs-intelligence tradeoff.";
const FALLBACK_SUBTITLE =
  "For a decade, product makers chose: a dumb MCU that lasts months, or a smart NPU that dies by lunch. GPX10 Pro is the first that refuses to choose.";
const BADGE_TEXT = "What GPX10 Pro unlocks";


/* Full-bleed section background — Figma 3286:1931 backdrop. */
function SectionBackdrop({ src }: { src: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-black" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy" decoding="async"
        alt=""
        src={src}
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
  const fitRef = useFitText<HTMLDivElement>({});
  const fitRef2 = useFitText<HTMLHeadingElement>({ maxLines: 2 });

  const heading = data?.heading || FALLBACK_HEADING;
  const bgImage = mediaUrl(data?.background_image) || "/products/features-bg.webp";
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

  // Resolve Strapi feature cards. The visual variant (brain/coin/bubble/
  // stack) and pixel layout (titleLeft/titleWidth/nodeId) have no Strapi
  // field, so they come from the Figma fallback — extras cycle variants.
  const rawFeatureCards: any[] = Array.isArray(data?.feature_cards)
    ? data.feature_cards
    : [];
  const featureCards: ProductsFeatureCardData[] =
    resolveFeatureCards(rawFeatureCards);

  return (
    <section
      id="products-features"
      className="relative flex w-full justify-center overflow-x-clip bg-black min-[600px]:pt-[120px] min-[600px]:pb-0"
      data-node-id="3286:1931"
      data-name="Section 6"
      aria-label="Product capabilities"
    >
      {/* DESKTOP (>=600px) */}
      <div className="hidden w-full justify-center min-[600px]:flex">
        <SectionBackdrop src={bgImage} />
        <TabletScaleCanvas className="relative hidden w-[1440px] shrink-0 flex-col items-center px-[64px] min-[600px]:flex">
          {/* 3286:2105 — Section Title */}
          <div
            className="flex flex-col items-center justify-center gap-[20px]"
            data-node-id="3286:2105"
            data-name="Section Title"
          >
            <TagBadge
              label={BADGE_TEXT}
              width={240}
              height={30}
              centerLabel
              labelOffsetX={0}
              leftBarLeft={10}
              rightBarLeft={230}
              labelClassName="text-[13px]"
            />
            <div
              className="relative flex shrink-0 flex-col items-center px-[10px]"
              data-node-id="3286:2106"
              data-name="Title"
            >
              <div
                ref={fitRef}
                className={`${gilroyMedium.className} relative shrink-0 bg-clip-text text-center text-[50px] leading-[0] font-medium whitespace-nowrap text-transparent not-italic [word-break:break-word]`}
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
                    className={`leading-[54px] whitespace-pre ${i === 0 ? "mb-0" : ""}`}
                  >
                    {line}
                  </p>
                ))}
              </div>
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            </div>
            <p
              className={`${interRegular.className} w-[900px] shrink-0 text-center text-[18px] leading-[26px] font-normal text-[#f0f0f0] not-italic [word-break:break-word] mt-[16px] mb-[32px]`}
              data-node-id="3286:2112"
            >
              {subtitle}
            </p>
          </div>

          {/* CARDS NATIVE SCROLL */}
          <div className="flex w-full justify-center transform scale-[0.8] origin-top -mb-[80px]">
            <div className="flex gap-[24px]">
              {featureCards.map((card, index) => (
                <div key={card.nodeId} className="shrink-0">
                  <ProductsFeatureCard card={card} isSpread={index === 1} />
                </div>
              ))}
            </div>
          </div>

          {/* 3710:1634 — caption (hidden per request) */}
          {/* <p
            className={`${interRegular.className} -mt-[60px] w-[800px] max-w-[90vw] text-center text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-80 not-italic [word-break:break-word]`}
            data-node-id="3710:1634"
          >
            {CAPTION}
          </p> */}
        </TabletScaleCanvas>
      </div>

      {/* MOBILE (<600px) — stacked header + swipeable card strip */}
      <div className="relative z-10 w-full min-[600px]:hidden">
        <SectionBackdrop src={bgImage} />
        <div className="relative flex flex-col items-center gap-[20px] px-[24px] pt-[40px]">
          <TagBadge
            label={BADGE_TEXT}
            width={220}
            centerLabel
            labelOffsetX={0}
            rightBarLeft={210}
          />
          <div className="relative px-[10px]" data-name="Title">
            <h2
              ref={fitRef2}
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
            className={`${interRegular.className} max-w-[800px] w-[90vw] text-center text-[18px] leading-[28px] font-normal text-[#f0f0f0] not-italic mt-[16px] mb-[24px]`}
          >
            {subtitle}
          </p>
        </div>

        <div className="relative mt-[40px] flex snap-x snap-mandatory gap-[16px] overflow-x-auto px-[24px] pb-[40px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {featureCards.map((card) => (
            <div key={`m-${card.nodeId}`} className="snap-center shrink-0">
              <div
                style={{
                  transform: "scale(0.68)",
                  transformOrigin: "top left",
                  width: `${388 * 0.68}px`,
                  height: `${600 * 0.68}px`,
                }}
              >
                <ProductsFeatureCard card={card} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
