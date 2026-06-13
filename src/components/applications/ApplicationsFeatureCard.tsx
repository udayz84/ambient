import Image from "next/image";
import { gilroyMedium, interRegular } from "../hero/fonts";

type ApplicationsFeatureCardProps = {
  wrapperNodeId: string;
  contentNodeId: string;
  title: string;
  description: string;
  background: string;
  height: number;
  position: "left" | "right";
};

const bottomBr = "/applications/corners/card-br.svg";
const bottomBl = "/applications/corners/card-bl.svg";

export function ApplicationsFeatureCard({
  wrapperNodeId,
  contentNodeId,
  title,
  description,
  background,
  height,
  position,
}: ApplicationsFeatureCardProps) {
  const isLeft = position === "left";
  const borderSrc = isLeft
    ? "/applications/card-border-left.svg"
    : "/applications/card-border-right.svg";
  const topTrSrc = isLeft
    ? "/applications/corners/card-tr-left.svg"
    : "/applications/corners/card-tr-right.svg";
  const topTlSrc = isLeft
    ? "/applications/corners/card-tl-left.svg"
    : "/applications/corners/card-tl-right.svg";

  return (
    <div className="contents" data-node-id={wrapperNodeId} data-name="Content">
      <div
        className="absolute top-[601.22119140625px] flex w-[449.9994201660156px] flex-col items-start gap-[10px] p-[32px]"
        style={{
          left: isLeft ? "40.88720703125px" : undefined,
          right: isLeft ? undefined : "40.11279296875px",
          height: `${height}px`,
          background,
        }}
        data-node-id={contentNodeId}
        data-name="Content"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image src={borderSrc} alt="" fill className="object-fill" sizes="450px" />
        </div>

        <p
          className={`${gilroyMedium.className} relative z-[1] w-full min-w-full shrink-0 text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
        >
          {title}
        </p>
        <p
          className={`${interRegular.className} relative z-[1] w-full min-w-full shrink-0 text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
        >
          {description}
        </p>

        <div className="absolute right-0 bottom-0 z-[2] flex size-[4px] items-center justify-center">
          <div className="-scale-y-100 rotate-180 flex-none">
            <div className="relative size-[4px]">
              <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                <Image
                  src={bottomBr}
                  alt=""
                  width={4}
                  height={4}
                  className="block size-full max-w-none"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 z-[2] flex size-[4px] items-center justify-center">
          <div className="-rotate-90 -scale-y-100 flex-none">
            <div className="relative size-[4px]">
              <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                <Image
                  src={bottomBl}
                  alt=""
                  width={4}
                  height={4}
                  className="block size-full max-w-none"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute top-[601.22119140625px] flex h-[4px] items-center justify-center"
        style={{
          right: isLeft ? "830.11279296875px" : "40.11279296875px",
          width: "4.285708427429199px",
        }}
      >
        <div className="-scale-y-100 flex-none rotate-90">
          <div className="relative h-[4.285708427429199px] w-[4px]">
            <div className="absolute inset-[0_0_-11.67%_-12.5%]">
              <Image
                src={topTrSrc}
                alt=""
                fill
                className="block object-fill max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute top-[605.22119140625px] flex h-[4px] items-center justify-center"
        style={{
          left: isLeft ? "40.88720703125px" : "830.88720703125px",
          width: "4.285708427429199px",
        }}
      >
        <div className="-scale-y-100 flex-none">
          <div className="relative h-[4px] w-[4.285708427429199px]">
            <div className="absolute inset-[0_0_-12.5%_-11.67%]">
              <Image
                src={topTlSrc}
                alt=""
                fill
                className="block object-fill max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
