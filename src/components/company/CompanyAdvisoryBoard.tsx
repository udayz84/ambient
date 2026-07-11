import { mediaUrl } from "@/lib/strapi";
import { CompanyAdvisoryBoardTitle } from "./CompanyAdvisoryBoardTitle";
import { CompanyLeadershipCard } from "./CompanyLeadershipCard";
import { ADVISORY_BOARD, type LeadershipMember } from "./company-leadership-data";

const PORTRAIT_CLASS =
  "absolute inset-0 size-full max-w-none object-cover object-top";

function toAdvisoryMember(raw: any, fallback: LeadershipMember, index: number): LeadershipMember {
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
    nodeId: raw?.id ? `advisor-${raw.id}` : `advisor-strapi-${index}`,
    imageNodeId: fallback.imageNodeId,
    nameNodeId: fallback.nameNodeId,
    readMoreNodeId: fallback.readMoreNodeId,
  };
}

type CompanyAdvisoryBoardProps = {
  data?: any;
};

export function CompanyAdvisoryBoard({ data }: CompanyAdvisoryBoardProps = {}) {
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

  return (
    <div
      className="relative mt-[60px] h-[438px] w-full shrink-0"
      data-node-id="2379:2291"
      data-name="Advisory Board"
    >
      <div className="relative flex h-full w-full flex-col items-start">
        <CompanyAdvisoryBoardTitle />

        <div
          className="relative mt-[24px] flex h-[365px] w-[1204px] shrink-0 items-start justify-center gap-[12px]"
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
    </div>
  );
}
