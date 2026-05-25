import { CompanyEngagementCard } from "./CompanyEngagementCard";
import { CompanyJoinTeam } from "./CompanyJoinTeam";
import { COMPANY_ENGAGEMENT_CARDS } from "./company-engagement-data";

export function CompanyEngagement() {
  return (
    <div
      className="absolute top-[5991px] left-[120px] z-[9] flex h-[746px] w-[1200px] flex-col gap-[20px]"
      data-node-id="2379:4834"
      data-name="Frame 1984079463"
      role="region"
      aria-label="Join our team and partnerships"
    >
      <CompanyJoinTeam />

      <div
        className="flex h-[386px] w-full shrink-0 gap-[20px]"
        data-node-id="2379:4861"
        data-name="Frame 1984079468"
      >
        {COMPANY_ENGAGEMENT_CARDS.map((card) => (
          <CompanyEngagementCard key={card.nodeId} {...card} />
        ))}
      </div>
    </div>
  );
}
