import { interMedium, interRegular } from "../hero/fonts";
import { CompanyGlassCardCorners } from "./company-corners";

export function CompanyDnaValueCard({
  title,
  description,
  nodeId,
}: {
  title: string;
  description: string;
  nodeId: string;
}) {
  return (
    <div className="relative w-[390px] shrink-0" data-node-id={nodeId}>
      <div className="relative flex h-[202px] w-full items-start bg-[rgba(0,0,0,0.8)]">
        <div className="relative flex min-h-px min-w-px flex-1 flex-col gap-[10px] p-[32px]">
          <p
            className={`${interMedium.className} w-full text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
          >
            {title}
          </p>
          <p
            className={`${interRegular.className} w-full text-[14px] leading-[1.4] font-normal text-white opacity-65 not-italic [word-break:break-word]`}
          >
            {description}
          </p>
        </div>
        <CompanyGlassCardCorners />
      </div>
    </div>
  );
}
