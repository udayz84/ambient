import { gilroyMedium, interRegular } from "../hero/fonts";

type TechnologyFeatureStatProps = {
  iconSrc: string;
  iconWidth: number;
  iconHeight?: number;
  title: React.ReactNode;
  description: string;
  nodeId: string;
};

export function TechnologyFeatureStat({
  iconSrc,
  iconWidth,
  iconHeight = 42,
  title,
  description,
  nodeId,
}: TechnologyFeatureStatProps) {
  return (
    <div
      className="relative flex w-[340px] shrink-0 flex-col items-start gap-[12px] py-[20px]"
      data-node-id={nodeId}
      data-name="Stat"
    >
      <div
        className="relative shrink-0"
        style={{ width: iconWidth, height: iconHeight }}
        data-name="Vector"
      >
        {iconSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img loading="lazy" decoding="async"
            src={iconSrc}
            alt=""
            className="absolute inset-0 block size-full max-w-none"
            aria-hidden
          />
        ) : null}
      </div>
      <div
        className={`${gilroyMedium.className} w-[279px] shrink-0 text-[32px] leading-[38px] font-medium text-white [word-break:break-word] not-italic`}
      >
        {title}
      </div>
      <div className="flex w-full flex-col items-start" data-name="Content">
        <p
          className={`${interRegular.className} w-full shrink-0 text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
