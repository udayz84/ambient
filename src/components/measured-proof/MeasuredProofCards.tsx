"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { mediaUrl } from "@/lib/strapi";
import { MeasuredProofCard } from "./MeasuredProofCard";

type FallbackCard = {
  imageWidth: number;
  imageHeight: number;
  imageTop: number;
  imageClassName?: string;
  imageSizes: string;
  statWidth: number;
  descriptionWidth: number;
  descriptionBottom?: number;
  statJustifyEnd?: boolean;
};

const FALLBACK_CARDS: FallbackCard[] = [
  {
    imageWidth: 285,
    imageHeight: 362,
    imageTop: 175,
    imageClassName: "absolute inset-0 max-w-none object-contain",
    imageSizes: "285px",
    statWidth: 299,
    descriptionWidth: 290,
  },
  {
    imageWidth: 285,
    imageHeight: 362,
    imageTop: 175,
    imageClassName: "absolute inset-0 max-w-none object-contain",
    imageSizes: "285px",
    statWidth: 187,
    descriptionWidth: 319,
    statJustifyEnd: true,
  },
  {
    imageWidth: 285,
    imageHeight: 362,
    imageTop: 175,
    imageClassName: "absolute inset-0 max-w-none object-contain",
    imageSizes: "285px",
    statWidth: 225,
    descriptionWidth: 317,
  },
  {
    imageWidth: 285,
    imageHeight: 362,
    imageTop: 175,
    imageClassName: "absolute inset-0 max-w-none object-contain",
    imageSizes: "285px",
    statWidth: 271,
    descriptionWidth: 320,
    statJustifyEnd: true,
  },
];



const DEFAULT_CARD_DATA = [
  {
    metric: "25x",
    label: "AI PERFORMANCE",
    description:
      "Unlock richer models, faster local inference, and more capable intelligence in constrained systems",
    image: "/measured-proof/card-ai.png",
  },
  {
    metric: "100x",
    label: "LOWER POWER CONSUMPTION",
    description:
      "Extend battery life at the edge and slash the power budget of always-on devices.",
    image: "/measured-proof/card-power.png",
  },
  {
    metric: "10x",
    label: "COMPUTE DENSITY",
    description:
      "Pack more intelligence into the same footprint without scaling power and system complexity the old way",
    image: "/measured-proof/card-density.png",
  },
  {
    metric: "100%",
    label: "PROGRAMMABLE DESIGN",
    description:
      "Preserve the freedom to build differentiated AI systems without locking into rigid fixed-function tradeoffs",
    image: "/measured-proof/card-programmable.png",
  },
];

export function MeasuredProofCards({ data }: { data?: any }) {
  const statCards: any[] =
    Array.isArray(data?.stat_cards) && data.stat_cards.length > 0
      ? data.stat_cards
      : DEFAULT_CARD_DATA;

  const cards = statCards.map((card: any, index: number) => {
    const fallback: FallbackCard = FALLBACK_CARDS[index] || ({} as FallbackCard);
    const defaultData = DEFAULT_CARD_DATA[index];
    return {
      nodeId: `2379:1504-${index}`,
      metric: card?.metric ?? defaultData?.metric ?? "",
      label: card?.label ?? defaultData?.label ?? "",
      description: card?.description ?? defaultData?.description ?? "",
      imageSrc: mediaUrl(card?.image) || defaultData?.image || "",
      imageWidth: fallback.imageWidth ?? 285,
      imageHeight: fallback.imageHeight ?? 362,
      imageTop: fallback.imageTop ?? 175,
      imageClassName: fallback.imageClassName ?? "absolute inset-0 max-w-none object-contain",
      imageSizes: fallback.imageSizes ?? "285px",
      statWidth: fallback.statWidth ?? 270,
      descriptionWidth: fallback.descriptionWidth ?? 270,
      descriptionBottom: fallback.descriptionBottom,
      statJustifyEnd: fallback.statJustifyEnd,
    };
  });

  return (
    <div
      className="absolute top-[calc(50%+40px)] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-[24px]"
      data-node-id="2379:1503"
      data-name="Measured proof in silicon"
      aria-label="Measured proof cards"
    >
      {cards.map((card: any) => (
        <div key={card.nodeId} className="shrink-0">
          <MeasuredProofCard {...card} />
        </div>
      ))}
    </div>
  );
}
