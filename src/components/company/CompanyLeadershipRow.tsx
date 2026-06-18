"use client";

import { useEffect, useRef, useState } from "react";
import { CompanyLeadershipCard } from "./CompanyLeadershipCard";
import { LEADERSHIP_TEAM } from "./company-leadership-data";

const CARD_LEFT = [0, 413, 826] as const;

export function CompanyLeadershipRow() {
  const [expandedNodeId, setExpandedNodeId] = useState<string | null>(null);
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    if (expandedNodeId === null) return;
    const activeNodeId = expandedNodeId;
    function handleOutsideClick(event: MouseEvent) {
      const expandedCard = cardRefs.current.get(activeNodeId);
      if (!expandedCard) return;
      if (event.target instanceof Node && !expandedCard.contains(event.target)) {
        setExpandedNodeId(null);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [expandedNodeId]);

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
          cardRef={(node) => {
            if (node) {
              cardRefs.current.set(member.nodeId, node);
            } else {
              cardRefs.current.delete(member.nodeId);
            }
          }}
        />
      ))}
    </div>
  );
}
