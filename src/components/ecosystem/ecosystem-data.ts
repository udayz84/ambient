import { mediaUrl, type StrapiMedia } from "@/lib/strapi";

export type PartnerLogo = {
  src: string;
  width: number;
  height: number;
};

export type EcosystemPartner = {
  name: string | null;
  logo: StrapiMedia;
};

export type GridLineConfig = {
  nodeId: string;
  capTopNodeId: string;
  lineNodeId: string;
  capBottomNodeId: string;
};

export type PartnerRowConfig = {
  rowNodeId: string;
  /** @deprecated kept for backward compatibility with the Company page; not used by Home. */
  logos?: readonly PartnerLogo[];
  gridLines: readonly GridLineConfig[];
  tezos: { statNodeId: string; textNodeId: string };
  octane: {
    statNodeId: string;
    colNodeId: string;
    textNodeId: string;
  };
  corners: {
    topRight: string;
    bottomRight: string;
    topLeft: string;
    bottomLeft: string;
  };
};

export type PartnerItem = {
  name: string;
  src: string;
  width: number;
  height: number;
};

export type CarouselSlot = {
  isRevealed: boolean;
  name?: string;
  src?: string;
  width?: number;
  height?: number;
};

export const CAROUSEL_1_PARTNERS: readonly PartnerItem[] = [
  { name: "TSMC", src: "/ecosystem/partners/tsmc.svg", width: 500, height: 376 },
  { name: "CELUS", src: "/ecosystem/partners/celus.svg", width: 632, height: 316 },
  { name: "EdgeAI Foundation", src: "/ecosystem/partners/edgeai.svg", width: 225, height: 225 },
];

export const CAROUSEL_2_PARTNERS: readonly PartnerItem[] = [
  { name: "GRINN", src: "/ecosystem/partners/grinn.svg", width: 220, height: 124 },
  { name: "ZALMOTEK", src: "/ecosystem/partners/zalmotek.svg", width: 280, height: 280 },
];

export const CAROUSEL_1_SLOTS: readonly CarouselSlot[] = [
  { isRevealed: true, name: "TSMC", src: "/ecosystem/partners/tsmc.svg", width: 500, height: 376 },
  { isRevealed: true, name: "CELUS", src: "/ecosystem/partners/celus.svg", width: 632, height: 316 },
  { isRevealed: true, name: "EdgeAI Foundation", src: "/ecosystem/partners/edgeai.svg", width: 225, height: 225 },
  { isRevealed: true, name: "DTDS Technology", src: "/ecosystem/partners/dtds.jpg", width: 309, height: 309 },
  { isRevealed: true, name: "Astute Electronics", src: "/ecosystem/partners/astute.png", width: 1024, height: 602 },
];

export const CAROUSEL_2_SLOTS: readonly CarouselSlot[] = [
  { isRevealed: true, name: "FAE Technology", src: "/ecosystem/partners/fae.png", width: 515, height: 388 },
  { isRevealed: true, name: "GRINN", src: "/ecosystem/partners/grinn.svg", width: 220, height: 124 },
  { isRevealed: true, name: "ZALMOTEK", src: "/ecosystem/partners/zalmotek.svg", width: 280, height: 280 },
  { isRevealed: true, name: "Glyn Australia", src: "/ecosystem/partners/glyn.jpeg", width: 1000, height: 303 },
  { isRevealed: true, name: "Cidev Group", src: "/ecosystem/partners/cidev.jpeg", width: 200, height: 200 },
];

/** Single combined row — every revealed logo from both carousels, no hidden slots. */
export const CAROUSEL_ALL_SLOTS: readonly CarouselSlot[] = [
  ...CAROUSEL_1_SLOTS,
  ...CAROUSEL_2_SLOTS,
];

export const SILICON_PARTNERS: readonly PartnerLogo[] = CAROUSEL_1_PARTNERS;
export const SILICON_PARTNERS_FALLBACK: readonly PartnerLogo[] = CAROUSEL_1_PARTNERS;
export const DEVELOPMENT_PARTNERS_FALLBACK: readonly PartnerLogo[] = CAROUSEL_2_PARTNERS;

export const SILICON_PARTNER_ROW: PartnerRowConfig = {
  rowNodeId: "2379:1052",
  gridLines: [
    { nodeId: "2379:1063", capTopNodeId: "2379:1064", lineNodeId: "2379:1065", capBottomNodeId: "2379:1066" },
    { nodeId: "2379:1082", capTopNodeId: "2379:1083", lineNodeId: "2379:1084", capBottomNodeId: "2379:1085" },
    { nodeId: "2379:1099", capTopNodeId: "2379:1100", lineNodeId: "2379:1101", capBottomNodeId: "2379:1102" },
    { nodeId: "2379:1112", capTopNodeId: "2379:1113", lineNodeId: "2379:1114", capBottomNodeId: "2379:1115" },
  ],
  tezos: { statNodeId: "2379:1103", textNodeId: "2379:1107" },
  octane: { statNodeId: "2379:1116", colNodeId: "2379:1118", textNodeId: "2379:1119" },
  corners: { topRight: "2379:1125", bottomRight: "2379:1126", topLeft: "2379:1127", bottomLeft: "2379:1128" },
};

export const DEVELOPMENT_PARTNER_ROW: PartnerRowConfig = {
  rowNodeId: "2379:1129",
  gridLines: [
    { nodeId: "2379:1140", capTopNodeId: "2379:1141", lineNodeId: "2379:1142", capBottomNodeId: "2379:1143" },
    { nodeId: "2379:1159", capTopNodeId: "2379:1160", lineNodeId: "2379:1161", capBottomNodeId: "2379:1162" },
    { nodeId: "2379:1176", capTopNodeId: "2379:1177", lineNodeId: "2379:1178", capBottomNodeId: "2379:1179" },
    { nodeId: "2379:1189", capTopNodeId: "2379:1190", lineNodeId: "2379:1191", capBottomNodeId: "2379:1192" },
  ],
  tezos: { statNodeId: "2379:1180", textNodeId: "2379:1184" },
  octane: { statNodeId: "2379:1193", colNodeId: "2379:1195", textNodeId: "2379:1196" },
  corners: { topRight: "2379:1202", bottomRight: "2379:1203", topLeft: "2379:1204", bottomLeft: "2379:1205" },
};

export type ResolvedPartner = PartnerLogo & { name: string | null };

// Slot index -> layout dimensions (sourced from Figma, not Strapi).
// Used as the per-slot dimension fallback when Strapi does not provide
// its own `logo.width`/`logo.height`, and as the empty-slot template
// when no partners are supplied.
const SLOT_DIMENSIONS: readonly PartnerLogo[] = [
  { src: "", width: 86, height: 23 },
  { src: "", width: 120, height: 22 },
  { src: "", width: 81, height: 19 },
  { src: "", width: 35, height: 35 },
  { src: "", width: 35, height: 35 },
];

const DEFAULT_SLOT: PartnerLogo = { src: "", width: 86, height: 23 };

/**
 * Resolve Strapi partners into the rendered shape. The rendered count is
 * no longer locked to 5 — when Strapi provides partners, every partner
 * gets its own slot. When Strapi provides none, we fall back to the 5
 * Figma slots so the empty row keeps its designed proportions.
 *
 * Per-slot dimensions come from `SLOT_DIMENSIONS` (cycling for indices
 * past the Figma list) so layout density stays consistent regardless of
 * how many partners the editor has configured.
 */
export function resolvePartners(
  partners: readonly EcosystemPartner[] | undefined | null,
  fallbackLogos?: readonly PartnerLogo[]
): ResolvedPartner[] {
  if (Array.isArray(partners) && partners.length > 0) {
    const result = partners.map((p, i) => {
      const slot = fallbackLogos?.[i % fallbackLogos.length] ?? SLOT_DIMENSIONS[i % SLOT_DIMENSIONS.length] ?? DEFAULT_SLOT;
      const url = mediaUrl(p?.logo);
      return {
        src: url || "",
        width: p?.logo?.width || slot.width,
        height: p?.logo?.height || slot.height,
        name: p?.name || null,
      };
    });
    return result;
  }

  if (fallbackLogos && fallbackLogos.length > 0) {
    return fallbackLogos.map((logo) => ({
      src: logo.src,
      width: logo.width,
      height: logo.height,
      name: null,
    }));
  }

  return SLOT_DIMENSIONS.map((slot) => ({
    src: slot.src,
    width: slot.width,
    height: slot.height,
    name: null,
  }));
}
