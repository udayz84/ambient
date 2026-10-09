import Image from "next/image";
import { Fragment } from "react";
import { gilroySemiBold } from "../hero/fonts";
import {
  type PartnerRowConfig,
  type EcosystemPartner,
  resolvePartners,
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
      {src ? (
        <div
          className="relative shrink-0 overflow-visible flex flex-row items-center justify-center gap-[10px]"
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
      ) : null}
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
  void isDevelopment;
  const resolved = resolvePartners(partners);

  // Build (logo, gridLine) pairs by interleaving. The last logo has no
  // trailing grid line. Grid-line configs cycle for counts beyond the 4
  // hardcoded Figma entries.
  const gridLines = config.gridLines;

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

      {resolved.map((logo, i) => {
        // Pick a stable nodeId — prefer the configured Figma ids for the
        // first three slots, then the tezos/octane ids for slots 4/5, then
        // a synthesised id beyond that.
        const configuredNodeId =
          (i < 3 && logoStatNodeIds[i]) ||
          (i === 3 && config.tezos.statNodeId) ||
          (i === 4 && config.octane.statNodeId) ||
          null;
        const nodeId = configuredNodeId ?? `${config.rowNodeId}-slot-${i}`;
        const textNodeId =
          i === 3
            ? config.tezos.textNodeId
            : i === 4
              ? config.octane.textNodeId
              : undefined;
        const gridLine = gridLines[i % gridLines.length];

        return (
          <Fragment key={nodeId}>
            <PartnerLogoStat
              nodeId={nodeId}
              textNodeId={textNodeId}
              src={logo.src}
              width={logo.width}
              height={logo.height}
              name={logo.name}
            />
            {i < resolved.length - 1 ? (
              <EcosystemGridLine {...gridLine} />
            ) : null}
          </Fragment>
        );
      })}

      <Corners
        leftSrc="/ecosystem/corner-tl.svg"
        rightSrc="/ecosystem/corner-tr.svg"
        className="z-[3]"
      />
    </div>
  );
}

export { DEV_LOGO_STAT_NODES };
