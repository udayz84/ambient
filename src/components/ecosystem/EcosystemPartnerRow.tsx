import Image from "next/image";
import { Fragment } from "react";
import {
  type PartnerRowConfig,
  type EcosystemPartner,
  type CarouselSlot,
  CAROUSEL_1_SLOTS,
  CAROUSEL_2_SLOTS,
} from "./ecosystem-data";
import { mediaUrl } from "@/lib/strapi";
import { EcosystemGridLine } from "./EcosystemGridLine";
import { Corners } from "../shared/Corners";

function PartnerLogoStat({
  nodeId,
  slot,
}: {
  nodeId: string;
  slot: CarouselSlot;
}) {
  if (!slot.isRevealed || !slot.src) {
    return (
      <div
        className="relative flex w-full shrink-0 flex-col items-center justify-center gap-[12px] py-[20px]"
        data-node-id={nodeId}
        data-name="Stat"
      >
        <div className="flex items-center justify-center border border-[#E2A740] bg-black/90 px-[14px] py-[7px] shadow-lg pointer-events-none">
          <span className="font-mono flex items-center gap-[6px] whitespace-nowrap text-[11px] uppercase tracking-[0.06em] text-[#E2A740]">
            <span>|</span>
            <span>REVEALING SOON</span>
            <span>|</span>
          </span>
        </div>
      </div>
    );
  }

  const isEdgeAi = slot.src.includes("edgeai");

  return (
    <div
      className="relative flex w-full shrink-0 flex-col items-center justify-center gap-[12px] py-[20px]"
      data-node-id={nodeId}
      data-name="Stat"
    >
      <div
        className="relative flex h-full w-full shrink-0 flex-row items-center justify-center"
        data-name="Icon"
      >
        <div
          className={`relative flex h-[82px] w-[198px] max-w-[92%] items-center justify-center rounded-[8px] p-[8px] shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-transform duration-200 hover:scale-105 ${
            isEdgeAi ? "bg-[#014C52]" : "bg-white"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slot.src}
            alt={slot.name || "Partner"}
            className="block max-h-full max-w-full object-contain"
          />
        </div>
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
  slotsOverride?: readonly CarouselSlot[];
  isDevelopment?: boolean;
};

export function EcosystemPartnerRow({
  config,
  logoStatNodeIds = LOGO_STAT_NODES,
  partners,
  slotsOverride,
  isDevelopment = false,
}: EcosystemPartnerRowProps) {
  const fallback = slotsOverride ?? (isDevelopment ? CAROUSEL_2_SLOTS : CAROUSEL_1_SLOTS);
  // Strapi partners drive the row; entries whose logo is missing fall back
  // to the designed slot for that position so no card renders empty.
  const slots = partners?.length
    ? partners.map((p, i) => {
        const url = mediaUrl(p?.logo);
        if (url) {
          return {
            isRevealed: true,
            name: p?.name ?? undefined,
            src: url,
            width: p?.logo?.width,
            height: p?.logo?.height,
          };
        }
        return fallback[i % fallback.length];
      })
    : fallback;
  const gridLines = config.gridLines;

  return (
    <div
      className="relative flex h-[225px] w-[1204px] shrink-0 items-center justify-between bg-[rgba(255,255,255,0.04)] px-[36px]"
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

      {slots.map((slot, i) => {
        const configuredNodeId =
          (i < 3 && logoStatNodeIds[i]) ||
          (i === 3 && config.tezos.statNodeId) ||
          (i === 4 && config.octane.statNodeId) ||
          null;
        const nodeId = configuredNodeId ?? `${config.rowNodeId}-slot-${i}`;
        const gridLine = gridLines[i % gridLines.length];

        return (
          <Fragment key={nodeId}>
            <div className="flex flex-1 h-full items-center justify-center">
              <PartnerLogoStat
                nodeId={nodeId}
                slot={slot}
              />
            </div>
            {i < slots.length - 1 ? (
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
