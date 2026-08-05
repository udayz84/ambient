import { mediaUrl } from "@/lib/strapi";
import { DeveloperPlatformCard } from "./DeveloperPlatformCard";
import { DEVELOPER_PLATFORM_CARDS } from "./developer-platform-cards";

const normalize = (value: unknown) =>
  typeof value === "string" ? value.trim().toLowerCase() : "";

export function DeveloperPlatformBentoGrid({ data }: { data?: any }) {
  const strapiCards: any[] = Array.isArray(data?.cards) ? data.cards : [];

  const cards = DEVELOPER_PLATFORM_CARDS.map((config, index) => {
    // Match CMS cards to their design slot by title so CMS ordering can't
    // break the Figma layout; fall back to positional matching.
    const strapiCard =
      strapiCards.find(
        (card) => normalize(card?.title) === normalize(config.title),
      ) ||
      strapiCards[index] ||
      {};
    const title = strapiCard.title ?? config.title;
    const body = strapiCard.body ?? config.body;
    const imageSrc = mediaUrl(strapiCard.image) || config.imageSrc;
    return { ...config, title, body, imageSrc };
  });

  return (
    <div
      className="absolute top-[198.98px] left-1/2 z-10 h-[600px] w-[1204px] -translate-x-1/2"
      data-node-id="2379:986"
    >
      {cards.map((card) => (
        <DeveloperPlatformCard key={card.nodeId} {...card} />
      ))}
    </div>
  );
}
