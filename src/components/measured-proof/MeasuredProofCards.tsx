"use client";

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
    descriptionBottom: 137.5,
    statJustifyEnd: true,
  },
];



export function MeasuredProofCards({ data }: { data?: any }) {
  const statCards: any[] = Array.isArray(data?.stat_cards) ? data.stat_cards : [];
  const cards = statCards.map((card: any, index: number) => {
    const fallback: FallbackCard = FALLBACK_CARDS[index] || ({} as FallbackCard);
    return {
      nodeId: `2379:1504-${index}`,
      metric: card?.metric ?? "",
      label: card?.label ?? "",
      description: card?.description ?? "",
      imageSrc: mediaUrl(card?.image) || "",
      imageWidth: fallback.imageWidth ?? 331,
      imageHeight: fallback.imageHeight ?? 260,
      imageTop: fallback.imageTop ?? 169,
      imageClassName: fallback.imageClassName,
      imageSizes: fallback.imageSizes ?? "332px",
      statWidth: fallback.statWidth ?? 200,
      descriptionWidth: fallback.descriptionWidth ?? 300,
      descriptionBottom: fallback.descriptionBottom,
      statJustifyEnd: fallback.statJustifyEnd,
    };
  });

  return (
    <div
      className="absolute top-[calc(50%+40px)] right-0 left-0 -translate-y-1/2 overflow-x-auto"
      data-node-id="2379:1503"
      data-name="Measured proof in silicon"
      aria-label="Measured proof cards"
    >
      <div className="flex w-max items-center justify-center gap-[24px] px-[24px] mx-auto pb-4">
        {cards.map((card: any) => (
          <div key={card.nodeId} className="shrink-0">
            <MeasuredProofCard {...card} />
          </div>
        ))}
      </div>
    </div>
  );
}
