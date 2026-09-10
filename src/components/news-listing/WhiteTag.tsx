import { dmMono } from "../hero/fonts";
import { Corners } from "../shared/Corners";

type WhiteTagProps = {
  label: string;
  nodeId?: string;
  widthClass?: string;
};

export function WhiteTag({ label, nodeId, widthClass = "w-[140px]" }: WhiteTagProps) {
  return (
    <div
      className={`${dmMono.className} relative h-[26px] ${widthClass} shrink-0 bg-white`}
      data-node-id={nodeId}
      data-name="Menu"
    >
      <Corners
        leftSrc="/news-listing/corner-black.svg"
        rightSrc="/news-listing/corner-black.svg"
      />
      <p className="absolute left-1/2 top-[calc(50%-4.5px)] max-w-full -translate-x-1/2 text-[13px] leading-[19.5px] font-normal whitespace-nowrap text-black uppercase not-italic overflow-hidden text-ellipsis [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word]">
        {label}
      </p>
    </div>
  );
}
