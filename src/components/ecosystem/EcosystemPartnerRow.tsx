import Image from "next/image";
import { gilroySemiBold } from "../hero/fonts";
import {
  type PartnerRowConfig,
  type EcosystemPartner,
  resolvePartners,
  SILICON_PARTNERS_FALLBACK,
  DEVELOPMENT_PARTNERS_FALLBACK,
} from "./ecosystem-data";
import { EcosystemGridLine } from "./EcosystemGridLine";
import { Corners } from "../shared/Corners";

function PartnerLogoStat({
  nodeId,
  src,
  width,
  height,
  name,
  textNodeId,
}: {
  nodeId: string;
  src: string;
  width: number;
  height: number;
  name?: string | null;
  textNodeId?: string;
}) {
  return (
    <div
      className="relative flex w-[150px] shrink-0 flex-col items-center justify-center gap-[12px] py-[20px]"
      data-node-id={nodeId}
      data-name="Stat"
    >
      <div
        className="relative shrink-0 overflow-clip flex flex-row items-center gap-[10px]"
        data-name="Icon"
      >
        <Image
          src={src}
          alt=""
          width={width}
          height={height}
          className="block max-w-none object-contain"
          style={{ width: `${width}px`, height: `${height}px` }}
        />
      </div>
    </div>
  );
}

const LOGO_STAT_NODES = ["2379:1057", "2379:1067", "2379:1086"] as const;
const DEV_LOGO_STAT_NODES = ["2379:1134", "2379:1144", "2379:1163"] as const;

type EcosystemPartnerRowProps = {
  config: PartnerRowConfig;
  logoStatNodeIds?: readonly [string, string, string];
  partners?: readonly EcosystemPartner[];
  isDevelopment?: boolean;
};

export function EcosystemPartnerRow({
  config,
  logoStatNodeIds = LOGO_STAT_NODES,
  partners,
  isDevelopment,
}: EcosystemPartnerRowProps) {
  const resolved = resolvePartners(
    partners,
    isDevelopment ? DEVELOPMENT_PARTNERS_FALLBACK : SILICON_PARTNERS_FALLBACK
  );
  
  const [logo1, logo2, logo3, logo4, logo5] = resolved;
  const [stat1, stat2, stat3] = logoStatNodeIds;

  return (
    <div
      className="relative flex h-[225px] w-[1204px] shrink-0 items-center justify-between bg-[rgba(255,255,255,0.04)] px-[40px]"
      data-node-id={config.rowNodeId}
    >
      <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden>
        <Image
          src="/ecosystem/partner-frame-border.svg"
          alt=""
          fill
          className="object-fill"
          sizes="1204px"
        />
      </div>

      <PartnerLogoStat nodeId={stat1} {...logo1} />
      <EcosystemGridLine {...config.gridLines[0]} />

      <PartnerLogoStat nodeId={stat2} {...logo2} />
      <EcosystemGridLine {...config.gridLines[1]} />

      <PartnerLogoStat nodeId={stat3} {...logo3} />
      <EcosystemGridLine {...config.gridLines[2]} />

      <PartnerLogoStat 
        nodeId={config.tezos.statNodeId} 
        textNodeId={config.tezos.textNodeId}
        {...logo4} 
      />
      <EcosystemGridLine {...config.gridLines[3]} />

      <PartnerLogoStat 
        nodeId={config.octane.statNodeId} 
        textNodeId={config.octane.textNodeId}
        {...logo5} 
      />

      <Corners
        leftSrc="/ecosystem/corner-tl.svg"
        rightSrc="/ecosystem/corner-tr.svg"
        className="z-[3]"
      />
    </div>
  );
}

export { DEV_LOGO_STAT_NODES };
