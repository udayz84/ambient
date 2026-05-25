import { interMedium, interRegular } from "../hero/fonts";

type CompanyMissionStatProps = {
  value: string;
  label: string;
  description: string;
  valueNodeId: string;
  labelNodeId: string;
  descriptionNodeId: string;
};

export function CompanyMissionStat({
  value,
  label,
  description,
  valueNodeId,
  labelNodeId,
  descriptionNodeId,
}: CompanyMissionStatProps) {
  return (
    <div className="flex flex-col py-[32px] first:pt-0 last:pb-0">
      <div className="flex items-start gap-[12px]">
        <p
          className={`${interMedium.className} shrink-0 text-[64px] leading-[68px] font-medium tracking-[-0.64px] whitespace-nowrap text-white not-italic`}
          data-node-id={valueNodeId}
        >
          {value}
        </p>
        <p
          className={`${interMedium.className} shrink-0 pt-[14px] text-[18px] leading-[27px] font-medium whitespace-nowrap text-[#53d824] not-italic`}
          data-node-id={labelNodeId}
        >
          {label}
        </p>
      </div>
      <p
        className={`${interRegular.className} mt-[10px] text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
        data-node-id={descriptionNodeId}
      >
        {description}
      </p>
    </div>
  );
}
