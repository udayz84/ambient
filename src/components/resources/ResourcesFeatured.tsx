"use client";

import { useEffect, useRef, useState } from "react";
import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium } from "../hero/fonts";
import { FEATURED_RESOURCES } from "./resources-data";
import { ResourcesFeaturedCard } from "./ResourcesFeaturedCard";

const FADE_IN_CLASS = "animate-hero-text-fade-in opacity-0";

const FALLBACK_HEADING = "Featured Resources";

type ResourcesFeaturedProps = {
  data?: any;
};

type MergedCard = {
  nodeId: string;
  imageNodeId: string;
  imageWidth: number;
  imageSrc: string;
  imageClassName: string;
  badgeNodeId: string;
  badgeLabel: string;
  badgeVariant: "white" | "stacked";
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  pdfUrl?: string;
  enableDownloadPopup?: boolean;
};

function buildCards(data: any): MergedCard[] {
  const strapiCards = Array.isArray(data?.cards) ? data.cards : [];
  const layoutCount = FEATURED_RESOURCES.length;
  const totalCount = Math.max(layoutCount, strapiCards.length);

  return Array.from({ length: totalCount }, (_, i): MergedCard => {
    const layout = FEATURED_RESOURCES[i] ?? FEATURED_RESOURCES[0];
    const card = strapiCards[i] ?? {};
    return {
      nodeId: layout.nodeId,
      imageNodeId: layout.imageNodeId,
      imageWidth: layout.imageWidth,
      imageSrc: mediaUrl(card.image) || layout.imageSrc,
      imageClassName: layout.imageClassName,
      badgeNodeId: layout.badgeNodeId,
      badgeLabel: (card.badge_label as string) || layout.badgeLabel,
      badgeVariant:
        (card.badge_variant as "white" | "stacked") || layout.badgeVariant,
      title: (card.title as string) || undefined,
      description: (card.description as string) || undefined,
      ctaLabel: (card.cta_label as string) || undefined,
      ctaHref: (card.cta_href as string) || undefined,
      pdfUrl: mediaUrl(card.pdf_file) || undefined,
      enableDownloadPopup: Boolean(card.enable_download_popup),
    };
  });
}

export function ResourcesFeatured({ data }: ResourcesFeaturedProps = {}) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const heading = (data?.heading as string) || FALLBACK_HEADING;
  const cards = buildCards(data);

  return (
    <section
      ref={ref}
      style={{ animationDelay: '1s' }}
      className={`absolute top-[716px] left-1/2 flex w-[1432px] -translate-x-1/2 flex-col gap-[20px] bg-[#010101] px-[56px] py-[80px] ${
        isVisible ? FADE_IN_CLASS : "translate-y-[25px] opacity-0"
      }`}
      aria-label="Featured Resources"
      data-node-id="2379:1960"
    >
      <h2
        className={`${gilroyMedium.className} shrink-0 text-[46px] leading-[49px] font-medium whitespace-nowrap text-white not-italic`}
        data-node-id="2379:1967"
      >
        {heading}
      </h2>

      <div
        className="flex w-full shrink-0 items-center gap-[20px]"
        data-node-id="2379:1968"
      >
        {cards.map((card) => (
          <ResourcesFeaturedCard key={card.nodeId} {...card} />
        ))}
      </div>
    </section>
  );
}
