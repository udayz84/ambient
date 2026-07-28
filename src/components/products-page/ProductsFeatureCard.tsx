/**
 * Feature card for the products "Section 6" features strip — Figma 3286:1931,
 * cards 3742:932 / 951 / 970 / 989 (388x600 each).
 *
 * Client component (useFadeIn) rendering a single card; the card data lives in
 * ./products-data so server components can import it without pulling in a
 * client module.
 */
"use client";

import { gilroyMedium, interRegular } from "../hero/fonts";
import { useFadeIn, getFadeInClass } from "../shared/useFadeIn";
import type { ProductsFeatureCardData } from "./products-data";

const CARD_IMAGES: Record<ProductsFeatureCardData["image"], string> = {
  brain: "/products/features-card-brain.png",
  coin: "/products/features-card-coin.png",
  bubble: "/products/features-card-bubble.png",
  stack: "/products/features-card-stack-back.png",
};

/* Corner ticks — Figma 3742:934 "Cornor Elements" (388.605 x 599.994).
   Rendered as an <img> exactly like the Figma codegen: the rasterized
   image scales cleanly, while an inline squished SVG drops the bottom
   strokes that sit on its viewBox boundary. */
function CardCorners() {
  return (
    <div className="absolute inset-[0_-0.13%]" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src="/products/features-card-corners.svg"
        className="block size-full max-w-none"
      />
    </div>
  );
}

/* Gradient underline below the card title — Figma 3742:950 (Line 88). */
function CardTitleLine() {
  return (
    <div className="relative h-0 w-[151.832px] shrink-0" aria-hidden>
      <div
        className="absolute inset-[-1px_0_0_0] opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(270deg, rgba(255,255,255,0) 0%, #ffffff 100%)",
        }}
      />
    </div>
  );
}

function CardImage({ variant }: { variant: ProductsFeatureCardData["image"] }) {
  if (variant === "brain") {
    return (
      <div
        className="absolute top-[177.92px] left-[calc(50%-1.8px)] h-[292.147px] w-[383.605px] -translate-x-1/2"
        aria-hidden
      >
        <img
          alt=""
          src={CARD_IMAGES.brain}
          className="pointer-events-none absolute inset-0 size-full max-w-none object-contain"
        />
      </div>
    );
  }
  if (variant === "coin") {
    return (
      <div
        className="absolute top-[138.4px] left-[calc(50%-0.05px)] h-[321.949px] w-[386.268px] -translate-x-1/2"
        aria-hidden
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 overflow-hidden">
            <img
              alt=""
              src={CARD_IMAGES.coin}
              className="absolute top-[-12.59%] left-[-0.2%] h-[128.67%] w-[100.43%] max-w-none"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(184.715deg, rgb(11, 10, 10) 4.6657%, rgba(0, 0, 0, 0) 17.536%), linear-gradient(180deg, rgba(0, 0, 0, 0) 88.146%, rgb(11, 10, 10) 100%)",
            }}
          />
        </div>
      </div>
    );
  }
  if (variant === "bubble") {
    return (
      <div
        className="absolute top-[138.4px] left-[calc(50%-0.05px)] h-[321.949px] w-[386.268px] -translate-x-1/2"
        aria-hidden
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            alt=""
            src={CARD_IMAGES.bubble}
            className="absolute top-[-15.68%] left-0 h-[140.53%] w-[99.89%] max-w-none"
          />
        </div>
      </div>
    );
  }
  /* stack — radial-masked back image + front overlay (Figma 3743:1033-1037) */
  return (
    <div
      className="absolute top-[138.4px] left-[calc(50%-0.05px)] h-[321.949px] w-[386.268px] -translate-x-1/2"
      aria-hidden
    >
      <div
        className="absolute top-0 left-1/2 h-[321.949px] w-[386.268px] -translate-x-1/2 [mask-image:url(/products/features-card-mask.svg)] [mask-position:0_0] [mask-repeat:no-repeat] [mask-size:386.268px_321.949px]"
      >
        <img
          alt=""
          src={CARD_IMAGES.stack}
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
        />
      </div>
      <div className="absolute top-0 left-1/2 h-[321.949px] w-[386.268px] -translate-x-1/2">
        <img
          alt=""
          src="/products/features-card-stack-front.png"
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
        />
      </div>
    </div>
  );
}

export function ProductsFeatureCard({
  card,
}: {
  card: ProductsFeatureCardData;
}) {
  const { fadeRef, isVisible } = useFadeIn();

  return (
    <article
      ref={fadeRef}
      className={`relative h-[600px] w-[388px] shrink-0 overflow-clip ${getFadeInClass(isVisible)}`}
      data-node-id={card.nodeId}
      data-name="Lower power consumption"
    >
      <div className="absolute top-0 left-0 h-[600px] w-[388px] border-[0.5px] border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(15,14,14,0.75)]" />
      <div className="absolute top-[0.51px] left-[0.39px] h-[598.994px] w-[387.605px]">
        <CardCorners />
      </div>

      {/* title + underline */}
      <div
        className="absolute top-[30px] flex w-[299px] flex-col items-start gap-[12px]"
        style={{ left: `${card.titleLeft}px` }}
      >
        {card.titleLines ? (
          <div
            className={`${gilroyMedium.className} relative shrink-0 text-[38px] leading-[0] font-medium whitespace-nowrap text-white not-italic`}
          >
            <p className="mb-0 leading-[47px] whitespace-pre">
              {card.titleLines[0]}
            </p>
            <p className="leading-[47px] whitespace-pre">{card.titleLines[1]}</p>
          </div>
        ) : (
          <p
            className={`${gilroyMedium.className} relative shrink-0 text-[38px] leading-[47px] font-medium text-white not-italic [word-break:break-word]`}
            style={card.titleWidth ? { width: `${card.titleWidth}px` } : undefined}
          >
            {card.title}
          </p>
        )}
        <CardTitleLine />
      </div>

      <CardImage variant={card.image} />

      {/* description */}
      <p
        className={`${interRegular.className} absolute bottom-[126px] left-[calc(50%-164px)] w-[328px] translate-y-full text-[16px] leading-[24px] font-normal text-white not-italic opacity-90 [word-break:break-word]`}
      >
        {card.description}
      </p>
    </article>
  );
}
