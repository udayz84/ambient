import Image from "next/image";
import { interMedium } from "../hero/fonts";

const cornerLeft = "/hero/corner-tag-1.svg";
const cornerRight = "/hero/corner-tag-2.svg";

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
      <TitleCorners />
    </div>
  );
}

function TitleCorners() {
  return (
    <>
      <div className="pointer-events-none absolute top-[4px] left-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <Corner src={cornerLeft} />
        </div>
      </div>
      <div className="pointer-events-none absolute top-[4px] right-0 flex size-[4px] items-center justify-center">
        <div className="rotate-180 flex-none">
          <Corner src={cornerRight} />
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-[4px] left-0 size-[4px]">
        <Corner src={cornerLeft} />
      </div>
      <div className="pointer-events-none absolute right-0 bottom-[4px] flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 rotate-180 flex-none">
          <Corner src={cornerRight} />
        </div>
      </div>
    </>
  );
}

function Corner({ src }: { src: string }) {
  return (
    <div className="relative size-[4px]">
      <div className="absolute inset-[0_0_-12.5%_-12.5%]">
        <Image src={src} alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
      </div>
    </div>
  );
}
