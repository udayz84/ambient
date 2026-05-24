import Image from "next/image";
import { dmMono } from "./fonts";

const cornerLeft = "/hero/vector-57.svg";
const cornerRight = "/hero/vector-55.svg";

type TagBadgeProps = {
  label: string;
  width: number;
  labelOffsetX: number;
  rightBarLeft: number;
  nodeId?: string;
  centerLabel?: boolean;
};

export function TagBadge({
  label,
  width,
  labelOffsetX,
  rightBarLeft,
  nodeId,
  centerLabel = false,
}: TagBadgeProps) {
  return (
    <div
      className={`${dmMono.className} relative h-[26px] shrink-0 overflow-clip bg-[rgba(255,255,255,0.06)]`}
      style={{ width }}
      data-node-id={nodeId}
      data-name="Menu"
    >
      <div className="absolute top-0 left-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image
                src={cornerLeft}
                alt=""
                width={4}
                height={4}
                className="block size-[4px] max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 flex size-[4px] items-center justify-center">
        <div className="flex-none rotate-180">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image
                src={cornerRight}
                alt=""
                width={4}
                height={4}
                className="block size-[4px] max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 size-[4px]">
        <div className="absolute inset-[0_0_-12.5%_-12.5%]">
          <Image
            src={cornerLeft}
            alt=""
            width={4}
            height={4}
            className="block size-[4px] max-w-none"
            aria-hidden
          />
        </div>
      </div>
      <div className="absolute right-0 bottom-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image
                src={cornerRight}
                alt=""
                width={4}
                height={4}
                className="block size-[4px] max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      <p
        className={`absolute top-[calc(50%-4.5px)] text-[13px] leading-[19.5px] font-normal tracking-[-0.39px] whitespace-nowrap text-[#ecfae5] uppercase not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] ${centerLabel ? "left-1/2 -translate-x-1/2" : ""}`}
        style={centerLabel ? undefined : { left: `calc(50% - ${labelOffsetX}px)` }}
      >
        {label}
      </p>
      <div className="absolute top-1/2 left-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
      <div
        className="absolute top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60"
        style={{ left: rightBarLeft }}
      />
    </div>
  );
}
