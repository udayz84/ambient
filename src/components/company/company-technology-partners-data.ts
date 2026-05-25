import type { PartnerRowConfig } from "../ecosystem/ecosystem-data";
import { SILICON_PARTNERS, SILICON_PARTNER_ROW } from "../ecosystem/ecosystem-data";

export const COMPANY_TECHNOLOGY_PARTNER_LOGO_NODES = [
  "2379:4677",
  "2379:4687",
  "2379:4706",
] as const;

export const COMPANY_TECHNOLOGY_PARTNER_ROW: PartnerRowConfig = {
  rowNodeId: "2379:4672",
  logos: SILICON_PARTNERS,
  gridLines: [
    { ...SILICON_PARTNER_ROW.gridLines[0], nodeId: "2379:4683" },
    { ...SILICON_PARTNER_ROW.gridLines[1], nodeId: "2379:4702" },
    { ...SILICON_PARTNER_ROW.gridLines[2], nodeId: "2379:4719" },
    { ...SILICON_PARTNER_ROW.gridLines[3], nodeId: "2379:4732" },
  ],
  tezos: { statNodeId: "2379:4723", textNodeId: "2379:4727" },
  octane: {
    statNodeId: "2379:4736",
    colNodeId: "2379:4738",
    textNodeId: "2379:4739",
  },
  corners: {
    topRight: "2379:4745",
    bottomRight: "2379:4746",
    topLeft: "2379:4747",
    bottomLeft: "2379:4748",
  },
};

export const TECHNOLOGY_PARTNERS_TITLE_GRADIENT =
  "linear-gradient(119.414deg, rgb(22, 22, 22) 9.0248%, rgb(39, 39, 39) 37.884%, rgb(18, 18, 18) 111.41%)";
