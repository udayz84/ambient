"use client";

import { useState } from "react";
import { CompanyLeadershipCard } from "./CompanyLeadershipCard";
import { LEADERSHIP_TEAM } from "./company-leadership-data";

const CARD_LEFT = [0, 413, 826] as const;

export function CompanyLeadershipRow() {
  const [expandedNodeId, setExpandedNodeId] = useState<string | null>(null);

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
          isExpanded={expandedNodeId === member.nodeId}
          onReadMoreToggle={() =>
            setExpandedNodeId((current) =>
              current === member.nodeId ? null : member.nodeId,
            )
          }
        />
      ))}
    </div>
  );
}
