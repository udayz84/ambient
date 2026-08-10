"use client";

import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import { useEffect, useRef, useState } from "react";
import { CompanyLeadershipCard } from "./CompanyLeadershipCard";
import { LEADERSHIP_TEAM } from "./company-leadership-data";
import type { LeadershipMember } from "./company-leadership-data";

const CARD_LEFT = [0, 413, 826] as const;

const PORTRAIT_CLASS =
  "absolute inset-0 size-full max-w-none object-cover object-top";

function toMember(raw: any, fallback: LeadershipMember, index: number): LeadershipMember {
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
    nodeId: raw?.id ? `leader-${raw.id}` : `${fallback.nodeId}-${index}`,
    imageNodeId: `${fallback.imageNodeId}-${index}`,
    nameNodeId: `${fallback.nameNodeId}-${index}`,
    readMoreNodeId: fallback.readMoreNodeId ? `${fallback.readMoreNodeId}-${index}` : undefined,
  };
}

type CompanyLeadershipRowProps = {
  team?: any[] | null;
};

export function CompanyLeadershipRow({ team }: CompanyLeadershipRowProps = {}) {
  const [expandedNodeId, setExpandedNodeId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map());

  const members: LeadershipMember[] =
    team && team.length > 0
      ? team.map((raw, i) =>
          toMember(raw, LEADERSHIP_TEAM[i] ?? LEADERSHIP_TEAM[LEADERSHIP_TEAM.length - 1], i),
        )
      : LEADERSHIP_TEAM;

  const showArrows = members.length > 3;

  const handlePrev = () => setActiveIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () => setActiveIndex((prev) => Math.min(members.length - 3, prev + 1));

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
      <div className="absolute -inset-x-[97px] top-0 bottom-0 overflow-hidden">
        <div className="absolute inset-y-0 left-[97px] w-[1203px]">
          <div
            className="relative h-full w-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 413}px)` }}
          >
          {members.map((member, index) => (
            <CompanyLeadershipCard
              key={member.nodeId}
              member={member}
              variant="leadership"
              left={CARD_LEFT[index] ?? index * 413}
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
        </div>
      </div>

      {showArrows && (
        <>
          <button
            type="button"
            className="absolute top-1/2 -left-[74px] z-20 flex size-[44px] -translate-y-1/2 cursor-pointer items-center justify-center transition-opacity hover:opacity-80 disabled:cursor-default disabled:opacity-30"
            aria-label="Previous"
            onClick={handlePrev}
            disabled={activeIndex === 0}
          >
            <Image src="/applications/nav-arrow-left.svg" alt="" width={44} height={44} className="block size-full max-w-none" />
          </button>
          <button
            type="button"
            className="absolute top-1/2 -right-[74px] z-20 flex size-[44px] -translate-y-1/2 cursor-pointer items-center justify-center transition-opacity hover:opacity-80 disabled:cursor-default disabled:opacity-30"
            aria-label="Next"
            onClick={handleNext}
            disabled={activeIndex >= members.length - 3}
          >
            <Image src="/applications/nav-arrow-right.svg" alt="" width={44} height={44} className="block size-full max-w-none" />
          </button>
        </>
      )}
    </div>
  );
}
