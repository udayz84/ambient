import Image from "next/image";
import { interMedium } from "../hero/fonts";

const cornerLeft = "/hero/corner-tag-1.svg";
const cornerRight = "/hero/corner-tag-2.svg";

type CompanyAdvisoryBoardTitleProps = {
  nodeId?: string;
};

/** Figma 2379:2292 — 340×49, white single-line title with corner brackets */
export function CompanyAdvisoryBoardTitle({
  nodeId = "2379:2294",
}: CompanyAdvisoryBoardTitleProps) {
  return (
    <div
      className="relative z-[2] h-[49px] w-[340px] shrink-0 px-[10px]"
      data-node-id="2379:2293"
      data-name="Title"
    >
      <h2
        className={`${interMedium.className} relative m-0 p-0 text-[46px] leading-[49px] font-medium whitespace-nowrap text-white not-italic`}
        data-node-id={nodeId}
      >
        Advisory Board
      </h2>
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
        <Image
          src={src}
          alt=""
          width={4}
          height={4}
          className="block size-full max-w-none"
          aria-hidden
        />
      </div>
    </div>
  );
}
