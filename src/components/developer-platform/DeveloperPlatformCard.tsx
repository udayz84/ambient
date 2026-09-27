import Image from "next/image";
import Link from "next/link";
import type { DeveloperPlatformCardConfig } from "./developer-platform-cards";
import { gilroyMedium, interRegular } from "../hero/fonts";

export function DeveloperPlatformCard({
  nodeId,
  left,
  top,
  width,
  height,
  title,
  href,
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
  patternClass,
  overlayGradient,
  buttonLabel,
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
          className="absolute -translate-x-1/2 left-1/2 top-[-0.15px] h-[290.295px] w-[796px]"
          style={{ backgroundImage: overlayGradient }}
          aria-hidden
        />
      ) : null}

      <div
        className={`absolute -translate-y-1/2 top-1/2 opacity-[0.24] ${patternClass ?? (width === 796 ? "right-0 h-[290.295px] w-[796px]" : "right-0 h-[290.295px] w-[388px]")}`}
        style={{ backgroundImage: patternGradient }}
        data-name="Pattern"
        aria-hidden
      />

      {imageSrc && imageVariant === "chipset" ? (
        <div
          className="absolute top-[-4px] right-0 size-[128px]"
          data-node-id="3818:500"
          data-name="Chipset 1"
        >
          <Image
            src={imageSrc}
            alt=""
            fill
            className="pointer-events-none object-contain"
            sizes="128px"
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
            <img loading="lazy" decoding="async"
              src={imageSrc}
              alt=""
              className="absolute top-[-27.04%] left-[-29.37%] h-[156.76%] w-[129.56%] max-w-none"
            />
          </div>
        </div>
      ) : null}

      <p
        className={`${interRegular.className} absolute translate-y-full font-normal text-[#0a3315] opacity-90 not-italic [word-break:break-word]`}
        style={{
          left: `${bodyLeft}px`,
          bottom: `${bodyBottomOffset}px`,
          width: `${bodyWidth}px`,
          fontSize: "18px",
          lineHeight: "27px",
        }}
      >
        {body}
      </p>

      <Link
        href={href}
        className={`group ${gilroyMedium.className} absolute top-[30px] max-w-full font-medium text-[22px] leading-[28px] text-[#0a3315] not-italic underline-offset-[6px] hover:underline [word-break:break-word] ${titleWidth ? "" : "whitespace-nowrap"}`}
        style={{ left: `${titleLeft}px`, width: titleWidth ? `${titleWidth}px` : undefined }}
      >
        {title}
        <span
          aria-hidden
          className="ml-[8px] inline-block transition-transform duration-200 group-hover:translate-x-[3px]"
        >
          →
        </span>
      </Link>

      <div
        className="absolute h-0"
        style={{ left: `${lineLeft}px`, top: `${lineTop}px`, width: `${lineWidth}px` }}
      >
        <div className="absolute inset-[-1px_0_0_0]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            alt=""
            src="/developer-platform/line-88.svg"
            className="block size-full max-w-none"
            aria-hidden
          />
        </div>
      </div>

      {buttonLabel ? (
        <Link
          href={href}
          className="group absolute top-[226px] left-[24px] h-[48px] w-[280px] overflow-clip bg-[rgba(0,0,0,0.2)]"
          data-node-id="5212:9597"
          data-name="Menu"
        >
          <span
            className={`${gilroyMedium.className} absolute top-[10.5px] left-[12px] w-[255px] text-[16px] leading-[28px] font-medium text-black uppercase whitespace-nowrap not-italic`}
          >
            {buttonLabel}
          </span>
          <span className="absolute top-0 left-0 flex size-[4px] items-center justify-center" aria-hidden>
            <span className="-scale-y-100 flex-none">
              <span className="relative block size-[4px]">
                <span className="absolute inset-[0_0_-12.5%_-12.5%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src="/developer-platform/corner-tag-black.svg"
                    className="block size-full max-w-none"
                  />
                </span>
              </span>
            </span>
          </span>
          <span className="absolute top-0 right-0 flex size-[4px] items-center justify-center" aria-hidden>
            <span className="flex-none rotate-180">
              <span className="relative block size-[4px]">
                <span className="absolute inset-[0_0_-12.5%_-12.5%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src="/developer-platform/corner-tag-black.svg"
                    className="block size-full max-w-none"
                  />
                </span>
              </span>
            </span>
          </span>
          <span className="absolute bottom-0 left-0 block size-[4px]" aria-hidden>
            <span className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src="/developer-platform/corner-tag-black.svg"
                className="block size-full max-w-none"
              />
            </span>
          </span>
          <span className="absolute right-0 bottom-0 flex size-[4px] items-center justify-center" aria-hidden>
            <span className="-scale-y-100 flex-none rotate-180">
              <span className="relative block size-[4px]">
                <span className="absolute inset-[0_0_-12.5%_-12.5%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src="/developer-platform/corner-tag-black.svg"
                    className="block size-full max-w-none"
                  />
                </span>
              </span>
            </span>
          </span>
        </Link>
      ) : null}
    </div>
  );
}
