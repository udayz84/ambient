import { dmMono } from "./fonts";
import { Corners } from "../shared/Corners";

type TagBadgeProps = {
  label: string;
  width?: number | string;
  labelOffsetX?: number;
  rightBarLeft?: number;
  nodeId?: string;
  centerLabel?: boolean;
  height?: number;
  leftBarLeft?: number;
  labelClassName?: string;
};

export function TagBadge({
  label,
  width,
  labelOffsetX = 0,
  rightBarLeft = 0,
  nodeId,
  centerLabel = false,
  height = 26,
  leftBarLeft = 6.48,
  labelClassName = "text-[13px] leading-[19.5px] tracking-[-0.39px]",
}: TagBadgeProps) {
  // We force all tags to automatically size to their content length
  const isAuto = true;
  const finalWidth = "max-content";

  return (
    <div
      className={`${dmMono.className} relative shrink-0 overflow-hidden border-[0.5px] border-solid border-[rgba(240,240,240,0.25)] bg-[rgba(255,255,255,0.06)]`}
      style={{ 
        width: finalWidth, 
        height, 
        padding: `0 ${leftBarLeft + 8}px`
      }}
      data-node-id={nodeId}
      data-name="Menu"
    >
      <Corners leftSrc="/hero/vector-57.svg" rightSrc="/hero/vector-55.svg" />
      <div className="flex h-full items-center justify-center">
        <p
          className={`font-normal whitespace-nowrap text-[#ecfae5] uppercase not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] ${labelClassName}`}
        >
          {label}
        </p>
      </div>
      
      <div
        className="absolute top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60"
        style={{ left: `${leftBarLeft}px` }}
      />
      <div
        className="absolute top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60"
        style={{ right: `${leftBarLeft}px` }}
      />
    </div>
  );
}
