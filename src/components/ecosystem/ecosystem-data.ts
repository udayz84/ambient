export type PartnerLogo = {
  src: string;
  width: number;
  height: number;
};

export type GridLineConfig = {
  nodeId: string;
  capTopNodeId: string;
  lineNodeId: string;
  capBottomNodeId: string;
};

export type PartnerRowConfig = {
  rowNodeId: string;
  logos: readonly PartnerLogo[];
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

export const SILICON_PARTNERS: readonly PartnerLogo[] = [
  { src: "/ecosystem/logo-partner-1.svg", width: 86, height: 23 },
  { src: "/ecosystem/logo-partner-2.svg", width: 120, height: 22 },
  { src: "/ecosystem/logo-partner-3.svg", width: 81, height: 19 },
] as const;

export const SILICON_PARTNER_ROW: PartnerRowConfig = {
  rowNodeId: "2379:1052",
  logos: SILICON_PARTNERS,
  gridLines: [
    {
      nodeId: "2379:1063",
      capTopNodeId: "2379:1064",
      lineNodeId: "2379:1065",
      capBottomNodeId: "2379:1066",
    },
    {
      nodeId: "2379:1082",
      capTopNodeId: "2379:1083",
      lineNodeId: "2379:1084",
      capBottomNodeId: "2379:1085",
    },
    {
      nodeId: "2379:1099",
      capTopNodeId: "2379:1100",
      lineNodeId: "2379:1101",
      capBottomNodeId: "2379:1102",
    },
    {
      nodeId: "2379:1112",
      capTopNodeId: "2379:1113",
      lineNodeId: "2379:1114",
      capBottomNodeId: "2379:1115",
    },
  ],
  tezos: { statNodeId: "2379:1103", textNodeId: "2379:1107" },
  octane: {
    statNodeId: "2379:1116",
    colNodeId: "2379:1118",
    textNodeId: "2379:1119",
  },
  corners: {
    topRight: "2379:1125",
    bottomRight: "2379:1126",
    topLeft: "2379:1127",
    bottomLeft: "2379:1128",
  },
};

export const DEVELOPMENT_PARTNER_ROW: PartnerRowConfig = {
  rowNodeId: "2379:1129",
  logos: SILICON_PARTNERS,
  gridLines: [
    {
      nodeId: "2379:1140",
      capTopNodeId: "2379:1141",
      lineNodeId: "2379:1142",
      capBottomNodeId: "2379:1143",
    },
    {
      nodeId: "2379:1159",
      capTopNodeId: "2379:1160",
      lineNodeId: "2379:1161",
      capBottomNodeId: "2379:1162",
    },
    {
      nodeId: "2379:1176",
      capTopNodeId: "2379:1177",
      lineNodeId: "2379:1178",
      capBottomNodeId: "2379:1179",
    },
    {
      nodeId: "2379:1189",
      capTopNodeId: "2379:1190",
      lineNodeId: "2379:1191",
      capBottomNodeId: "2379:1192",
    },
  ],
  tezos: { statNodeId: "2379:1180", textNodeId: "2379:1184" },
  octane: {
    statNodeId: "2379:1193",
    colNodeId: "2379:1195",
    textNodeId: "2379:1196",
  },
  corners: {
    topRight: "2379:1202",
    bottomRight: "2379:1203",
    topLeft: "2379:1204",
    bottomLeft: "2379:1205",
  },
};
