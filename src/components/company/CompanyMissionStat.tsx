import { interRegular } from "../hero/fonts";
import { CompanyMissionStatValue } from "./CompanyMissionStatValue";

type CompanyMissionStatProps = {
  value: string;
  label: string;
  description: string;
  descriptionWidth?: string;
  valueNodeId: string;
  labelNodeId: string;
  descriptionNodeId: string;
  animationDelay?: number;
  digitSlots?: number;
  suffixAtTarget?: boolean;
};

export function CompanyMissionStat({
  value,
  label,
  description,
  descriptionWidth = "w-[310px]",
  valueNodeId,
  labelNodeId,
  descriptionNodeId,
  animationDelay = 0,
  digitSlots,
  suffixAtTarget,
}: CompanyMissionStatProps) {
  return (
    <div className="flex items-end gap-[30px]" data-name="Stat">
      <div
        className="w-px shrink-0 self-stretch bg-[rgba(255,255,255,0.15)]"
        aria-hidden
      />

      <div className="flex flex-col gap-[10px]">
        <div className="flex items-center gap-[20px]">
          <CompanyMissionStatValue
            value={value}
            valueNodeId={valueNodeId}
            animationDelay={animationDelay}
            digitSlots={digitSlots}
            suffixAtTarget={suffixAtTarget}
          />
          <p
            className={`${interRegular.className} shrink-0 text-[18px] leading-[27px] font-normal whitespace-nowrap text-[#53d824] not-italic`}
            data-node-id={labelNodeId}
          >
            {label}
          </p>
        </div>
        <p
          className={`${interRegular.className} ${descriptionWidth} text-[18px] leading-[27px] font-normal text-[rgba(255,255,255,0.6)] not-italic [word-break:break-word]`}
          data-node-id={descriptionNodeId}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
