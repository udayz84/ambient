import { interRegular } from "../hero/fonts";

const cornerLeft = "/hero/corner-tag-1.svg";
const cornerRight = "/hero/corner-tag-2.svg";

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
      className={`${className} relative z-10 h-[60px] w-[201px] border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)]`}
      data-node-id={nodeId}
    >
      <div className="pointer-events-none absolute top-0 left-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={cornerLeft} aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute top-0 right-0 flex size-[4px] items-center justify-center">
        <div className="rotate-180 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={cornerRight} aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 size-[4px]">
        <div className="absolute inset-[0_0_-12.5%_-12.5%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={cornerLeft} aria-hidden />
        </div>
      </div>
      <div className="pointer-events-none absolute right-0 bottom-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 rotate-180 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={cornerRight} aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <p
        className={`${interRegular.className} absolute top-[16.431px] text-[18px] leading-[27px] font-normal whitespace-nowrap text-white not-italic ${textClassName}`}
        data-node-id={textNodeId}
      >
        {label}
      </p>
    </div>
  );
}
