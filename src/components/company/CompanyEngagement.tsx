import { CompanyEngagementCard } from "./CompanyEngagementCard";
import { CompanyJoinTeam } from "./CompanyJoinTeam";
import { COMPANY_ENGAGEMENT_CARDS } from "./company-engagement-data";

type CompanyEngagementProps = {
  data?: any;
  joinTeam?: any;
};

export function CompanyEngagement({ data, joinTeam }: CompanyEngagementProps) {
  const strapiCards = Array.isArray(data?.cards) ? data.cards : null;

  let joinTeamData = joinTeam;
  let cardEntries: any[] = strapiCards ? [...strapiCards] : [];
  if (!joinTeamData && cardEntries.length > 0) {
    joinTeamData = cardEntries[0];
    cardEntries = cardEntries.slice(1);
  }

  const cards =
    cardEntries.length > 0
      ? cardEntries.map((c: any, i: number) => {
          const fallback =
            COMPANY_ENGAGEMENT_CARDS[i] ??
            COMPANY_ENGAGEMENT_CARDS[COMPANY_ENGAGEMENT_CARDS.length - 1];
          return { ...fallback, strapi: c };
        })
      : COMPANY_ENGAGEMENT_CARDS.map((c) => ({ ...c, strapi: null }));

  return (
    <div
      className="absolute top-[5991px] left-[120px] z-[9] flex h-[746px] w-[1200px] flex-col gap-[20px]"
      data-node-id="2379:4834"
      data-name="Frame 1984079463"
      role="region"
      aria-label="Join our team and partnerships"
    >
      <CompanyJoinTeam data={joinTeamData} />

      <div
        className="flex h-[386px] w-full shrink-0 gap-[20px]"
        data-node-id="2379:4861"
        data-name="Frame 1984079468"
      >
        {cards.map((card: any) => (
          <CompanyEngagementCard
            key={card.nodeId}
            nodeId={card.nodeId}
            titleLines={card.titleLines}
            titleWidth={card.titleWidth}
            titleHeight={card.titleHeight}
            description={card.description}
            descriptionWidth={card.descriptionWidth}
            ctaLabel={card.ctaLabel}
            ctaHref={card.ctaHref}
            ctaWidth={card.ctaWidth}
            imageSrc={card.imageSrc}
            imageWidth={card.imageWidth}
            imageHeight={card.imageHeight}
            imageLeft={card.imageLeft}
            imageTop={card.imageTop}
            contentTop={card.contentTop}
            strapi={card.strapi}
          />
        ))}
      </div>
    </div>
  );
}
