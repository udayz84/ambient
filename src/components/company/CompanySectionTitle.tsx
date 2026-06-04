import { interMedium } from "../hero/fonts";
import { CornerDecor } from "./company-corners";

const TITLE_GRADIENT =
  "linear-gradient(122.573deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

type CompanySectionTitleProps = {
  children?: string;
  lines?: readonly string[];
  width: number;
  height: number;
  nodeId?: string;
  fontSize?: number;
  lineHeight?: number;
};

export function CompanySectionTitle({
  children,
  lines,
  width,
  height,
  nodeId,
  fontSize = 32,
  lineHeight = 38,
}: CompanySectionTitleProps) {
  const titleLines = lines ?? (children ? [children] : []);

  return (
    <div
      className="relative shrink-0 px-[10px]"
      style={{ width, height, minHeight: height }}
      data-name="Title"
    >
      <h3
        className={`${interMedium.className} relative m-0 bg-clip-text p-0 font-medium text-transparent not-italic`}
        style={{
          fontSize,
          lineHeight: `${lineHeight}px`,
          backgroundImage: TITLE_GRADIENT,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
        data-node-id={nodeId}
      >
        {titleLines.map((line) => (
          <span
            key={line}
            className="block whitespace-nowrap"
            style={{ lineHeight: `${lineHeight}px` }}
          >
            {line}
          </span>
        ))}
      </h3>
      <CornerDecor />
    </div>
  );
}
