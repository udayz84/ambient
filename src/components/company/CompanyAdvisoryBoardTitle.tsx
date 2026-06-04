import { GradientTitle } from "../contact/contact-shared";
import { CornerDecor } from "./company-corners";

type CompanyAdvisoryBoardTitleProps = {
  nodeId?: string;
};

/** Figma 2379:2292–2294 — gradient H-3 title with corner brackets */
export function CompanyAdvisoryBoardTitle({
  nodeId = "2379:2294",
}: CompanyAdvisoryBoardTitleProps) {
  return (
    <div
      className="flex shrink-0 flex-col items-center justify-center"
      data-node-id="2379:2292"
      data-name="Section Title"
    >
      <div
        className="relative flex w-fit flex-col items-center px-[10px]"
        data-node-id="2379:2293"
        data-name="Title"
      >
        <GradientTitle
          nodeId={nodeId}
          gradientDeg="112.899deg"
          className="text-center whitespace-nowrap"
        >
          Advisory Board
        </GradientTitle>
        <CornerDecor />
      </div>
    </div>
  );
}
