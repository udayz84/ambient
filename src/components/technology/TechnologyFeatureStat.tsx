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
      className="relative flex flex-1 min-w-0 max-w-[340px] flex-col items-start gap-[12px] py-[20px]"
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
        className={`${gilroyMedium.className} w-full max-w-[279px] text-[24px] leading-[30px] min-[1180px]:text-[28px] min-[1180px]:leading-[34px] xl:text-[32px] xl:leading-[38px] font-medium text-white [word-break:break-word] not-italic`}
      >
        {title}
      </div>
      <div className="flex w-full flex-col items-start" data-name="Content">
        <p
          className={`${interRegular.className} w-full text-[14px] leading-[21px] min-[1180px]:text-[15px] min-[1180px]:leading-[23px] xl:text-[16px] xl:leading-[24px] font-normal text-[#f0f0f0] opacity-65 [word-break:break-word] not-italic`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
