import { CompanyAdvisoryBoardTitle } from "./CompanyAdvisoryBoardTitle";
import { CompanyLeadershipCard } from "./CompanyLeadershipCard";
import { ADVISORY_BOARD } from "./company-leadership-data";

export function CompanyAdvisoryBoard() {
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
          {ADVISORY_BOARD.map((member) => (
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
