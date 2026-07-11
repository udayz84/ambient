import Image from "next/image";
import { gilroySemiBold } from "../hero/fonts";
import {
  type PartnerRowConfig,
  type EcosystemPartner,
  resolveSiliconPartnerLogos,
  resolveDevelopmentPartners,
} from "./ecosystem-data";
import { EcosystemGridLine } from "./EcosystemGridLine";
import { Corners } from "../shared/Corners";

function PartnerLogoStat({
  nodeId,
  src,
  width,
  height,
}: {
  nodeId: string;
  src: string;
  width: number;
  height: number;
}) {
  return (
    <div
      className="relative flex w-[150px] shrink-0 flex-col items-center justify-center gap-[12px] py-[20px]"
      data-node-id={nodeId}
      data-name="Stat"
    >
      <div
        className="relative shrink-0 overflow-clip"
        style={{ width, height }}
        data-name="Icon"
      >
        <Image
          src={src}
          alt=""
          width={width}
          height={height}
          className="block size-full max-w-none object-contain"
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
  siliconPartners?: readonly EcosystemPartner[];
  developmentPartners?: readonly EcosystemPartner[];
};

export function EcosystemPartnerRow({
  config,
  logoStatNodeIds = LOGO_STAT_NODES,
  siliconPartners,
  developmentPartners,
}: EcosystemPartnerRowProps) {
  const logos = resolveSiliconPartnerLogos(siliconPartners);
  const [logo1, logo2, logo3] = [
    logos[0],
    logos[1],
    logos[2],
  ];
  const [stat1, stat2, stat3] = logoStatNodeIds;

  const devPartners = resolveDevelopmentPartners(developmentPartners);
  const tezos = devPartners[0];
  const octane = devPartners[1];

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

      <div
        className="relative flex w-[150px] shrink-0 flex-col items-center justify-center gap-[12px] py-[20px]"
        data-node-id={config.tezos.statNodeId}
        data-name="Stat"
      >
        <div
          className="relative h-[35px] w-[88.63px] shrink-0"
          data-name="Div [framer-pakwz]"
        >
          <div
            className="absolute top-[7.3px] left-[41px] h-[20.41px] w-[47.63px]"
            data-name="Div [framer-y1thm5]"
          >
            <p
              className={`${gilroySemiBold.className} absolute top-[10.3px] left-0 -translate-y-1/2 text-[17.1px] leading-[20.4px] font-semibold whitespace-nowrap text-white not-italic`}
              data-node-id={config.tezos.textNodeId}
            >
              {tezos?.name ?? "Tezos"}
            </p>
          </div>
          <div
            className="absolute top-0 left-0 size-[35px] overflow-clip"
            data-name="Icon"
          >
            <Image
              src={tezos?.src ?? "/ecosystem/logo-partner-4.svg"}
              alt=""
              width={35}
              height={35}
              className="block size-full max-w-none"
            />
          </div>
        </div>
      </div>

      <EcosystemGridLine {...config.gridLines[3]} />

      <div
        className="relative flex w-[150px] shrink-0 flex-col items-center justify-center gap-[12px] py-[20px]"
        data-node-id={config.octane.statNodeId}
        data-name="Stat"
      >
        <div
          className="flex h-[35px] w-full shrink-0 items-center justify-center gap-[10px]"
          data-node-id={config.octane.colNodeId}
          data-name="col"
        >
          <p
            className={`${gilroySemiBold.className} shrink-0 text-[17.1px] leading-[20.4px] font-semibold whitespace-nowrap text-white not-italic`}
            data-node-id={config.octane.textNodeId}
          >
            {octane?.name ?? "Octane"}
          </p>
          <div className="relative size-[35px] shrink-0" data-name="logo">
            <Image
              src={octane?.src ?? "/ecosystem/logo-octane.svg"}
              alt=""
              width={35}
              height={35}
              className="block size-full max-w-none"
            />
          </div>
        </div>
      </div>

      <Corners
        leftSrc="/ecosystem/corner-tl.svg"
        rightSrc="/ecosystem/corner-tr.svg"
        className="z-[3]"
      />
    </div>
  );
}

export { DEV_LOGO_STAT_NODES };
