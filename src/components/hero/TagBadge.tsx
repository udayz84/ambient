import { dmMono } from "./fonts";
import { Corners } from "../shared/Corners";

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
      className={`${dmMono.className} relative h-[26px] shrink-0 border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(255,255,255,0.06)]`}
      style={{ width }}
      data-node-id={nodeId}
      data-name="Menu"
    >
      <Corners leftSrc="/hero/vector-57.svg" rightSrc="/hero/vector-55.svg" />
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
