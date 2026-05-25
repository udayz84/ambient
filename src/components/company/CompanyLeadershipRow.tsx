import { CompanyLeadershipCard } from "./CompanyLeadershipCard";
import { LEADERSHIP_TEAM } from "./company-leadership-data";

const CARD_LEFT = [0, 413, 826] as const;

export function CompanyLeadershipRow() {
  return (
    <div
      className="relative h-[471.25px] w-[1203px] shrink-0"
      data-node-id="2379:2287"
      data-name="Frame 1984079466"
    >
      {LEADERSHIP_TEAM.map((member, index) => (
        <CompanyLeadershipCard
          key={member.nodeId}
          member={member}
          variant="leadership"
          left={CARD_LEFT[index]}
        />
      ))}
    </div>
  );
}
