import { gilroyMedium, interRegular } from "./fonts";
import { TagBadge } from "./TagBadge";

type HeroStatProps = {
  tag: string;
  tagWidth: number;
  labelOffsetX: number;
  rightBarLeft: number;
  tagNodeId: string;
  statNodeId: string;
  value: React.ReactNode;
  title: string;
  description: string;
  width: number;
  contentClassName?: string;
  descriptionWidth?: string;
  pl?: number;
};

export function HeroStat({
  tag,
  tagWidth,
  labelOffsetX,
  rightBarLeft,
  tagNodeId,
  statNodeId,
  value,
  title,
  description,
  width,
  contentClassName = "w-full",
  descriptionWidth,
  pl = 0,
}: HeroStatProps) {
  return (
    <div
      className="relative flex shrink-0 flex-col content-stretch items-start gap-[12px]"
      style={{ width, paddingLeft: pl }}
      data-node-id={statNodeId}
      data-name="Stat"
    >
      <TagBadge
        label={tag}
        width={tagWidth}
        labelOffsetX={labelOffsetX}
        rightBarLeft={rightBarLeft}
        nodeId={tagNodeId}
      />
      <div className="flex w-full flex-col content-stretch items-start gap-[24px] not-italic">
        {value}
        <div
          className={`flex flex-col content-stretch items-start gap-[10px] ${contentClassName}`}
          data-name="Content"
        >
          <p
            className={`${gilroyMedium.className} min-w-full w-[min-content] shrink-0 text-[22px] leading-[28px] font-medium text-white`}
          >
            {title}
          </p>
          <p
            className={`${interRegular.className} shrink-0 text-[12px] leading-[18px] font-normal text-[#f0f0f0] opacity-65`}
            style={descriptionWidth ? { width: descriptionWidth } : undefined}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
