import Image from "next/image";
import type { DeveloperPlatformCardConfig } from "./developer-platform-cards";
import { gilroyMedium, interRegular } from "../hero/fonts";

export function DeveloperPlatformCard({
  nodeId,
  left,
  top,
  width,
  height,
  title,
  titleLeft,
  titleWidth,
  body,
  bodyLeft,
  bodyWidth,
  bodyBottomOffset,
  lineLeft,
  lineTop,
  lineWidth,
  patternGradient,
  overlayGradient,
  imageSrc,
  imageVariant,
}: DeveloperPlatformCardConfig) {
  return (
    <div
      className="absolute overflow-clip"
      style={{ left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px` }}
      data-node-id={nodeId}
    >
      <div
        className="absolute top-0 left-0 border-[1.5px] border-solid border-[rgba(255,255,255,0)] bg-[#dbe8c8]"
        style={{ width: `${width}px`, height: `${height}px` }}
      />

      {overlayGradient ? (
        <div
          className={`absolute -translate-x-1/2 left-1/2 top-[-0.15px] ${height === 600 ? "h-[600.147px] w-[388px]" : "h-[290.295px] w-[796px]"}`}
          style={{ backgroundImage: overlayGradient }}
          aria-hidden
        />
      ) : null}

      <div
        className={`absolute -translate-y-1/2 top-1/2 right-0 opacity-[0.24] ${height === 600 ? "h-[600px] w-[388px]" : height === 290 && width === 796 ? "h-[290.295px] w-[796px]" : "h-[290.295px] w-[388px]"}`}
        style={{ backgroundImage: patternGradient }}
        data-name="Pattern"
        aria-hidden
      />

      {imageSrc && imageVariant === "chipset" ? (
        <div
          className="absolute top-[-25.98px] left-[calc(50%+138.68px)] size-[153px] -translate-x-1/2"
          data-node-id="3818:500"
          data-name="Chipset 1"
        >
          <Image
            src={imageSrc}
            alt=""
            fill
            className="pointer-events-none object-cover"
            sizes="153px"
          />
        </div>
      ) : null}

      {imageSrc && imageVariant === "devkit" ? (
        <div
          className="absolute top-[calc(50%-61.48px)] left-[calc(50%+70.18px)] h-[315px] w-[388px] -translate-x-1/2 -translate-y-1/2"
          data-node-id="4054:8291"
          data-name="image 249"
        >
          <Image
            src={imageSrc}
            alt=""
            fill
            className="pointer-events-none object-cover"
            sizes="388px"
          />
        </div>
      ) : null}

      {imageSrc && imageVariant === "modules" ? (
        <div
          className="absolute top-[calc(50%+12.5px)] left-[336px] h-[187px] w-[436px] -translate-y-1/2"
          data-node-id="2379:1008"
          data-name="image 76"
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt=""
              className="absolute top-[-27.04%] left-[-29.37%] h-[156.76%] w-[129.56%] max-w-none"
            />
          </div>
        </div>
      ) : null}

      <p
        className={`${gilroyMedium.className} absolute translate-y-full font-medium text-[#0a3315] opacity-90 not-italic [word-break:break-word]`}
        style={{
          left: `${bodyLeft}px`,
          bottom: `${bodyBottomOffset}px`,
          width: `${bodyWidth}px`,
          fontSize: "22px",
          lineHeight: "28px",
        }}
      >
        {body}
      </p>

      <p
        className={`${interRegular.className} absolute top-[30px] font-normal text-[18px] leading-[27px] text-[#0a3315] not-italic [word-break:break-word] ${titleWidth ? "" : "whitespace-nowrap"}`}
        style={{ left: `${titleLeft}px`, width: titleWidth ? `${titleWidth}px` : undefined }}
      >
        {title}
      </p>

      <div
        className="absolute h-0"
        style={{ left: `${lineLeft}px`, top: `${lineTop}px`, width: `${lineWidth}px` }}
      >
        <div className="absolute inset-[-1px_0_0_0]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src="/developer-platform/line-88.svg"
            className="block size-full max-w-none"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
