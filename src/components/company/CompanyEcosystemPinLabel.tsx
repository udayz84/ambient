import { interRegular } from "../hero/fonts";
import { CompanyStandardCorners } from "./company-corners";

type CompanyEcosystemPinLabelProps = {
  label: string;
  className: string;
  nodeId: string;
  textNodeId: string;
  textClassName?: string;
};

export function CompanyEcosystemPinLabel({
  label,
  className,
  nodeId,
  textNodeId,
  textClassName = "left-1/2 -translate-x-1/2 text-center",
}: CompanyEcosystemPinLabelProps) {
  return (
    <div
      className={`${className} relative z-10 h-[60px] w-[201px] overflow-hidden border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)]`}
      data-node-id={nodeId}
    >
      <CompanyStandardCorners />
      <p
        className={`${interRegular.className} absolute top-[16.431px] max-w-[calc(100%-16px)] text-[18px] leading-[27px] font-normal whitespace-nowrap text-white not-italic overflow-hidden text-ellipsis ${textClassName}`}
        data-node-id={textNodeId}
      >
        {label}
      </p>
    </div>
  );
}
