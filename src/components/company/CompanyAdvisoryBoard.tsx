"use client";

import Image from "next/image";
import { useState } from "react";
import { mediaUrl } from "@/lib/strapi";
import { CompanyAdvisoryBoardTitle } from "./CompanyAdvisoryBoardTitle";
import { CompanyLeadershipCard } from "./CompanyLeadershipCard";
import { ADVISORY_BOARD, type LeadershipMember } from "./company-leadership-data";

const PORTRAIT_CLASS =
  "absolute inset-0 size-full max-w-none object-cover object-top";

function toAdvisoryMember(raw: any, fallback: LeadershipMember | undefined, index: number): LeadershipMember {
  const bioText = (raw?.bio_paragraphs as string) || "";
  const bioParagraphs = bioText
    ? bioText.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
    : (fallback?.bioParagraphs ?? []);
  return {
    name: (raw?.name as string) || fallback?.name || "",
    role: (raw?.title as string) || fallback?.role || "",
    bioParagraphs,
    imageSrc: mediaUrl(raw?.photo) || fallback?.imageSrc || "",
    imageClassName: fallback?.imageClassName ?? PORTRAIT_CLASS,
    linkedInHref: (raw?.linkedin_url as string) || fallback?.linkedInHref || "",
    nodeId: raw?.id ? `advisor-${raw.id}` : fallback?.nodeId || `advisor-strapi-${index}`,
    imageNodeId: fallback?.imageNodeId || `advisor-image-${index}`,
    nameNodeId: fallback?.nameNodeId || `advisor-name-${index}`,
    readMoreNodeId: fallback?.readMoreNodeId || `advisor-readmore-${index}`,
  };
}

type CompanyAdvisoryBoardProps = {
  data?: any;
};

export function CompanyAdvisoryBoard({ data }: CompanyAdvisoryBoardProps = {}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const strapiAdvisors = Array.isArray(data) ? data : null;
  const members: LeadershipMember[] =
    strapiAdvisors && strapiAdvisors.length > 0
      ? strapiAdvisors.map((raw: any, i: number) =>
          toAdvisoryMember(
            raw,
            ADVISORY_BOARD[i] ?? ADVISORY_BOARD[ADVISORY_BOARD.length - 1],
            i,
          ),
        )
      : ADVISORY_BOARD;

  if (members.length === 0) {
    return null;
  }

  const showArrows = members.length > 4;

  const handlePrev = () => setActiveIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () => setActiveIndex((prev) => Math.min(members.length - 4, prev + 1));

  return (
    <div
      className="relative mt-[60px] h-[438px] w-full shrink-0"
      data-node-id="2379:2291"
      data-name="Advisory Board"
    >
      <div className="relative flex h-full w-full flex-col items-start">
        <CompanyAdvisoryBoardTitle />

        <div className="relative mt-[24px] h-[365px] w-[1204px] shrink-0">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={`relative h-full w-full transition-transform duration-500 ease-in-out flex items-start ${!showArrows ? "justify-center" : ""}`}
              style={{
                gap: "12px",
                transform: showArrows ? `translateX(-${activeIndex * 304}px)` : "none",
              }}
              data-node-id="2379:2299"
              data-name="User Images"
            >
              {members.map((member) => (
                <CompanyLeadershipCard
                  key={member.nodeId}
                  member={member}
                  variant="advisory"
                />
              ))}
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
                disabled={activeIndex >= members.length - 4}
              >
                <Image src="/applications/nav-arrow-right.svg" alt="" width={44} height={44} className="block size-full max-w-none" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
