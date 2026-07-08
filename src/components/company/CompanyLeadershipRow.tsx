"use client";

import { mediaUrl } from "@/lib/strapi";
import { useEffect, useRef, useState } from "react";
import { CompanyLeadershipCard } from "./CompanyLeadershipCard";
import { LEADERSHIP_TEAM } from "./company-leadership-data";
import type { LeadershipMember } from "./company-leadership-data";

const CARD_LEFT = [0, 413, 826] as const;

const PORTRAIT_CLASS =
  "absolute inset-0 size-full max-w-none object-cover object-top";

function toMember(raw: any, fallback: LeadershipMember): LeadershipMember {
  const bioText = (raw?.bio_paragraphs as string) || "";
  const bioParagraphs = bioText
    ? bioText.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
    : fallback.bioParagraphs;
  return {
    name: (raw?.name as string) || fallback.name,
    role: (raw?.title as string) || fallback.role,
    bioParagraphs,
    imageSrc: mediaUrl(raw?.photo) || fallback.imageSrc,
    imageClassName: fallback.imageClassName ?? PORTRAIT_CLASS,
    linkedInHref: (raw?.linkedin_url as string) || fallback.linkedInHref,
    nodeId: fallback.nodeId,
    imageNodeId: fallback.imageNodeId,
    nameNodeId: fallback.nameNodeId,
    readMoreNodeId: fallback.readMoreNodeId,
  };
}

type CompanyLeadershipRowProps = {
  team?: any[] | null;
};

export function CompanyLeadershipRow({ team }: CompanyLeadershipRowProps = {}) {
  const [expandedNodeId, setExpandedNodeId] = useState<string | null>(null);
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map());

  const members: LeadershipMember[] =
    team && team.length > 0
      ? team.map((raw, i) =>
          toMember(raw, LEADERSHIP_TEAM[i] ?? LEADERSHIP_TEAM[LEADERSHIP_TEAM.length - 1]),
        )
      : LEADERSHIP_TEAM;

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
      {members.map((member, index) => (
        <CompanyLeadershipCard
          key={member.nodeId}
          member={member}
          variant="leadership"
          left={CARD_LEFT[index] ?? 0}
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
