import { interSemiBold } from "../hero/fonts";
import {
  DEVELOPMENT_PARTNER_ROW,
  SILICON_PARTNER_ROW,
} from "./ecosystem-data";
import { DEV_LOGO_STAT_NODES, EcosystemPartnerRow } from "./EcosystemPartnerRow";

const TITLE_GRADIENT_SILICON =
  "linear-gradient(119.414deg, rgb(22, 22, 22) 9.0248%, rgb(39, 39, 39) 37.884%, rgb(18, 18, 18) 111.41%)";

const TITLE_GRADIENT_DEVELOPMENT =
  "linear-gradient(127.267deg, rgb(22, 22, 22) 9.0248%, rgb(39, 39, 39) 37.884%, rgb(18, 18, 18) 111.41%)";

function PartnerCategoryTitle({
  children,
  nodeId,
  className,
  gradient,
}: {
  children: string;
  nodeId: string;
  className: string;
  gradient: string;
}) {
  return (
    <p
      className={`${interSemiBold.className} ${className} bg-clip-text text-[56px] leading-[60px] font-semibold tracking-[-1.12px] whitespace-nowrap text-[transparent] opacity-90 not-italic [word-break:break-word]`}
      style={{ backgroundImage: gradient }}
      data-node-id={nodeId}
    >
      {children}
    </p>
  );
}

export function EcosystemPartners() {
  return (
    <div
      className="relative h-[285px] w-full overflow-hidden"
      data-node-id="2379:1047"
    >
      <PartnerCategoryTitle
        nodeId="2379:1048"
        className="absolute top-0 left-0"
        gradient={TITLE_GRADIENT_SILICON}
      >
        SILICON PARTNERS
      </PartnerCategoryTitle>

      <PartnerCategoryTitle
        nodeId="2379:1049"
        className="absolute top-0 left-[1216px]"
        gradient={TITLE_GRADIENT_DEVELOPMENT}
      >
        DEVELOPMENT PARTNERS
      </PartnerCategoryTitle>

      <div
        className="absolute top-[60px] left-0 flex items-center gap-[20px]"
        data-node-id="2379:1051"
      >
        <EcosystemPartnerRow config={SILICON_PARTNER_ROW} />
        <EcosystemPartnerRow
          config={DEVELOPMENT_PARTNER_ROW}
          logoStatNodeIds={DEV_LOGO_STAT_NODES}
        />
      </div>
    </div>
  );
}
