/** Figma 2900:464 — hero title text gradient. */
export const HERO_TITLE_GRADIENT =
  "linear-gradient(106.263deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

/** Figma 2900:508 — background image fade overlay (darkens left for text legibility). */
export const HERO_IMAGE_OVERLAY =
  "linear-gradient(-37.3423deg, rgb(0, 0, 0) 13.003%, rgba(0, 0, 0, 0) 38.846%), radial-gradient(82.726% 82.726% at 100% 100%, rgba(0,0,0,0) 0%, rgb(0, 0, 0) 100%)";

/** Figma 2900:573 — primary CTA outer glow shadow. */
export const PRIMARY_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

/** Figma 2900:573 — primary CTA inner top highlight. */
export const PRIMARY_CTA_INSET =
  "shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]";

/** Figma 2900:584 — secondary CTA surface. */
export const SECONDARY_CTA_BG = "rgba(226,241,202,0.12)";

export const CORNER_LEFT = "/hero/corner-tag-1.svg";
export const CORNER_RIGHT = "/hero/corner-tag-2.svg";

/** Figma 2900:507 — coin & chipset image group, within the 1442-wide hero canvas. */
export const COIN_GROUP = {
  left: 300.9921875,
  top: -109.03706359863281,
  width: 1420.4515380859375,
  height: 936.0740356445312,
};

/** Figma 2900:508 — background coin+chipset image (relative to the group). */
export const COIN_BG = {
  left: 0.453125,
  top: 2.3343505859375,
  width: 1419.997802734375,
  height: 933.73974609375,
};

/** Figma 2900:509 — foreground chip image (relative to the group). */
export const COIN_FG = {
  right: 263.62158203125,
  top: 0.00006103515625,
  width: 1156.3759765625,
  height: 933.73974609375,
};

/* ------------------------------------------------------------------ */
/* Features section — Figma 2901:794                                   */
/* ------------------------------------------------------------------ */

/** Figma 2901:797 — section title text gradient. */
export const SECTION_TITLE_GRADIENT =
  "linear-gradient(113.347deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

/** Figma 3566:3698 — mobile features/architecture title text gradient (393 frame). */
export const FEATURES_TITLE_GRADIENT_MOBILE =
  "linear-gradient(101.838deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

/** Figma 2901:901 — article card surface + border. */
export const CARD_BG = "rgba(0,0,0,0.2)";
export const CARD_BORDER = "rgba(240,240,240,0.2)";

/** Figma 2901:906 — article description text color. */
export const CARD_DESC_COLOR = "#99a1af";

/** Figma 2901:980 — icon tile radial background. */
export const ICON_TILE_BG =
  "radial-gradient(60% 75% at 50% 0%, rgba(57,74,54,1) 0%, rgba(43,54,41,1) 50%, rgba(29,34,28,1) 100%)";

/** Figma 2901:987 — abstract decorative header (relative to the 1232 section). */
export const ABSTRACT_DESIGN = {
  left: 175.19140625,
  top: -88,
  width: 881.6161499023438,
  height: 320,
};

export type FeatureCard = {
  nodeId: string;
  title: string;
  description: string;
  icon: string;
  cardImage: string;
  /** Top padding: card 1 uses 24, the rest use 16 (per Figma). */
  paddingTop: number;
};

const FEATURE_DESCRIPTION =
  "Utilize the onboard I2S and analog microphones to instantly test offline wake-word detection and continuous voice commands in physically noisy environments.";

export const FEATURE_CARDS: FeatureCard[] = [
  {
    nodeId: "2901:901",
    title: "AI features in a new form.",
    description: FEATURE_DESCRIPTION,
    icon: "/products/icon-frame-1.svg",
    cardImage: "/products/card-image.png",
    paddingTop: 24,
  },
  {
    nodeId: "2901:969",
    title: "Months on a coin cell.",
    description: FEATURE_DESCRIPTION,
    icon: "/products/icon-frame-2.svg",
    cardImage: "/products/card-image.png",
    paddingTop: 16,
  },
  {
    nodeId: "2901:958",
    title: "Private by default.",
    description: FEATURE_DESCRIPTION,
    icon: "/products/icon-frame-2.svg",
    cardImage: "/products/card-image.png",
    paddingTop: 16,
  },
  {
    nodeId: "2901:947",
    title: "One chip replaces the stack.",
    description: FEATURE_DESCRIPTION,
    icon: "/products/icon-frame-2.svg",
    cardImage: "/products/card-image.png",
    paddingTop: 16,
  },
];

/* ------------------------------------------------------------------ */
/* Features strip "Section 6" — Figma 3286:1931,                      */
/* cards 3742:932 / 951 / 970 / 989 (data shared by the server-        */
/* rendered mobile stack and the client carousel).                     */
/* ------------------------------------------------------------------ */

export type ProductsFeatureCardData = {
  nodeId: string;
  /** Single-paragraph title (wraps) OR explicit pre-broken lines. */
  title: string;
  titleLines: [string, string] | null;
  titleLeft: number;
  titleWidth: number | null;
  description: string;
  image: "brain" | "coin" | "bubble" | "stack";
};

export const PRODUCTS_FEATURE_CARDS: ProductsFeatureCardData[] = [
  {
    nodeId: "3742:932",
    title: "Premium AI features in a new form.",
    titleLines: null,
    titleLeft: 23,
    titleWidth: 354.275,
    description:
      "Run complex models in a hearing aid, a ring, a patch — no bulky battery, no redesign.",
    image: "brain",
  },
  {
    nodeId: "3742:951",
    title: "Months on a coin cell.",
    titleLines: ["Months on a ", "coin cell."],
    titleLeft: 30,
    titleWidth: null,
    description:
      "Always-on AI at ~80 µW. Ship the battery life your reviews live or die on.",
    image: "coin",
  },
  {
    nodeId: "3742:970",
    title: "Private by default.",
    titleLines: ["Private by ", "default."],
    titleLeft: 30,
    titleWidth: null,
    description:
      "Data never leaves the device. No cloud round-trip, no latency, no privacy liability.",
    image: "bubble",
  },
  {
    nodeId: "3742:989",
    title: "One chip replaces the stack.",
    titleLines: null,
    titleLeft: 30,
    titleWidth: 358.127,
    description:
      "MCU + AI accelerator + sensor hub + memory you’re juggling today — and it stays aware while it sleeps.",
    image: "stack",
  },
];

/**
 * Visual variants cycled for Strapi-provided cards past the Figma design
 * count (4). The `image` field on `ProductsFeatureCardData` has no Strapi
 * counterpart — it selects which Figma raster asset the card renders — so
 * extras cycle through the four designed variants.
 */
export const FEATURE_IMAGE_VARIANTS = [
  "brain",
  "coin",
  "bubble",
  "stack",
] as const;

/**
 * Resolve the visible feature cards. When Strapi provides cards, the
 * rendered count equals `rawCards.length` (no longer locked to the 4
 * hardcoded Figma slots). Per-card layout fields (`titleLeft`, `titleWidth`,
 * `nodeId`) and the visual variant (`image`) come from the Figma fallback
 * for the first 4 cards; extras cycle through `FEATURE_IMAGE_VARIANTS` and
 * reuse the most common layout values. When Strapi provides no cards, the
 * designed fallback array is returned unchanged.
 */
export function resolveFeatureCards(
  rawCards: readonly any[] | null | undefined,
): ProductsFeatureCardData[] {
  if (!rawCards || rawCards.length === 0) {
    return [...PRODUCTS_FEATURE_CARDS];
  }
  return rawCards.map((c: any, i: number) => {
    const withinDesign = i < PRODUCTS_FEATURE_CARDS.length;
    const fb = withinDesign
      ? PRODUCTS_FEATURE_CARDS[i]
      : PRODUCTS_FEATURE_CARDS[0];
    const strapiTitle = typeof c?.title === "string" ? c.title.trim() : "";
    const strapiDescription =
      typeof c?.description === "string" ? c.description.trim() : "";
    const image = withinDesign
      ? fb.image
      : (FEATURE_IMAGE_VARIANTS[i % FEATURE_IMAGE_VARIANTS.length] as ProductsFeatureCardData["image"]);
    return {
      nodeId:
        c?.documentId ?? c?.id ?? `feature-card-strapi-${i}`,
      title: strapiTitle || fb.title,
      titleLines: strapiTitle ? null : fb.titleLines,
      titleLeft: fb.titleLeft,
      titleWidth: fb.titleWidth,
      description: strapiDescription || fb.description,
      image,
    };
  });
}

/* ------------------------------------------------------------------ */
/* "Always On" section — Figma 2915:1219 / 2908:487 / 2915:1234        */
/* ------------------------------------------------------------------ */

/** Figma 2915:1221 — section title text gradient. */
export const ALWAYSON_TITLE_GRADIENT =
  "linear-gradient(124.465deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

/** Figma 2908:487 — hand background image edge-fade overlays. */
export const HAND_OVERLAY =
  "linear-gradient(268.412deg, rgb(0, 0, 0) 0.87581%, rgba(0, 0, 0, 0) 20.764%), linear-gradient(269.657deg, rgba(0, 0, 0, 0) 71.226%, rgb(0, 0, 0) 97.836%), linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 34.493%), linear-gradient(rgba(0, 0, 0, 0) 81.798%, rgba(0, 0, 0, 0.8) 100%)";

/** Figma 2908:487 — hand background (relative to the 1442 canvas). */
export const HAND_BG = {
  left: 94.486328125,
  top: 0,
  width: 1251.0284423828125,
  height: 704.165283203125,
};

/** Figma 2915:1219 — section title block (relative to the 1442 canvas). */
export const ALWAYSON_TITLE = {
  left: 395,
  top: 42.89111328125,
  width: 650,
};

/** Figma 2915:1234 — stats frame (relative to the 1442 canvas). */
export const ALWAYSON_STATS = {
  left: 118,
  top: 748.499267578125,
  width: 1204,
  height: 181,
};

export const ALWAYSON_SECTION_HEIGHT = 929.499267578125;

export type StatBadge = { label: string; width: number; rightBarLeft: number };

export type AlwaysOnStat = {
  nodeId: string;
  titleLines: [string, string];
  badge: StatBadge;
};

export const ALWAYSON_STATS_DATA: AlwaysOnStat[] = [
  {
    nodeId: "2916:1308",
    titleLines: ["ReflexSurge", "Mode"],
    badge: { label: "Mode", width: 107, rightBarLeft: 97.48046875 },
  },
  {
    nodeId: "2915:1245",
    titleLines: ["512 GOPS ·", "instant"],
    badge: { label: "Performance", width: 137, rightBarLeft: 127.48046875 },
  },
  {
    nodeId: "2916:1286",
    titleLines: ["Full power.", "No reset."],
    badge: { label: "Status", width: 98, rightBarLeft: 88.48046875 },
  },
];

/* ------------------------------------------------------------------ */
/* "Built for always-on" use-cases section — Figma 2901:2033          */
/* ------------------------------------------------------------------ */

/** Figma 2901:2136 — section title text gradient. */
export const USECASES_TITLE_GRADIENT =
  "linear-gradient(107.989deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

/** Figma 2901:2103 — giant watermark text gradient. */
export const WATERMARK_GRADIENT =
  "linear-gradient(261.051deg, rgba(255, 255, 255, 0.12) 0.12143%, rgba(255, 255, 255, 0.6) 44.084%, rgba(255, 255, 255, 0) 113.37%)";

export const USECASES_SECTION_HEIGHT = 941;
export const USECASES_CANVAS_WIDTH = 1448;

export type UseCaseTab = { label: string; active?: boolean };

export const USECASE_TABS: UseCaseTab[] = [
  { label: "HEARABLES", active: true },
  { label: "SMART HOMES" },
  { label: "INDUSTRIAL" },
  { label: "AUTOMOTIVE" },
  { label: "MEDICAL" },
  { label: "AGRICULTURE" },
];

/**
 * Tick ruler segments between bar items. Standard segments are five 8px ticks.
 * The segments adjacent to AUTOMOTIVE taper (4-8 then 8-4) per Figma.
 */
export const TICK_SEGMENTS: number[][] = [
  [8, 8, 8, 8, 8],
  [8, 8, 8, 8, 8],
  [8, 8, 8, 8, 8],
  [4, 5, 6, 7, 8],
  [8, 7, 6, 5, 4],
  [8, 8, 8, 8, 8],
  [8, 8, 8, 8, 8],
];

export type UseCaseCard = {
  nodeId: string;
  title: string;
  description: string;
  bg: string;
  left: number;
  top: number;
  width: number;
  height: number;
};

export const USECASE_CARDS: UseCaseCard[] = [
  {
    nodeId: "2901:2114",
    title: "Tire Pressure Monitoring",
    description:
      "On-device air pressure and temperature sensors provide real-time alerts for tire health to prevent accidents and optimize maintenance and fuel expenses",
    bg: "rgba(0,0,0,0.1)",
    left: 49.0859375,
    top: 541.22119140625,
    width: 449.9994812011719,
    height: 198,
  },
  {
    nodeId: "2901:2106",
    title: "Battery Management",
    description:
      "Monitoring of cell utiization, charging patterns, heat generation, etc. in electric vehicle batteries to prevent mishaps and optimize battery life",
    bg: "rgba(21,21,21,0.1)",
    left: 939.0859375,
    top: 601.22119140625,
    width: 449.9994201660156,
    height: 174,
  },
];

/* ------------------------------------------------------------------ */
/* "Measured in silicon" comparison section — Figma 2906:3290 / 3186   */
/* ------------------------------------------------------------------ */

/** Figma 2906:3292 — section title text gradient. */
export const MEASURED_TITLE_GRADIENT =
  "linear-gradient(105.141deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

/** Figma 2906:3186 — comparison table surface + highlighted column. */
export const TABLE_BG = "#0d100f";
export const HIGHLIGHT_COL_BG = "#091704";
export const HIGHLIGHT_COL_BORDER = "rgba(83,216,36,0.5)";

/** Zebra row backgrounds (rows 0, 2, 4). */
export const ROW_MARKER_BG = "rgba(255,255,255,0.05)";
export const HIGHLIGHT_ROW_MARKER_BG = "rgba(83,216,36,0.1)";

/** Figma 2906:3193 — GPX10 Pro tag. */
export const GPX_TAG_BG = "#a8ed90";
export const GPX_TAG_TEXT = "#21570e";

export const COMPARISON_METRICS = [
  "Peak compute",
  "Always-on power",
  "Efficiency (TOPS/W)",
  "AI model support",
  "Cloud dependency",
  "Sensor streams",
];

export type ComparisonColumn = {
  header: string;
  values: string[];
  highlight?: boolean;
};

export const COMPARISON_COLUMNS: ComparisonColumn[] = [
  {
    header: "METRICS",
    values: COMPARISON_METRICS,
  },
  {
    header: "RISC MCU",
    values: ["0.02 GOPS", "600 mW", "0.02", "Rule-based only", "Yes", "1–2"],
  },
  {
    header: "MCU + NPU",
    // NOTE: source frame left placeholder text (metric labels) here — awaiting real values.
    values: COMPARISON_METRICS,
  },
  {
    header: "GPX10 Pro",
    highlight: true,
    values: [
      "512 GOPS",
      "< 100 µW",
      "7.3",
      "CNN, RNN, LSTM, GRU",
      "None — fully on-device",
      "Up to 10 fused on-chip",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* "Everything in one chip" architecture section — Figma 3713:1965    */
/* (title 2903:2164 + menu chip 3712:1942 + content row 3529:615:     */
/* article 3529:616 + stats column 3529:623)                          */
/* ------------------------------------------------------------------ */

/** Figma 2903:2166 — section title text gradient. */
export const ARCH_TITLE_GRADIENT =
  "linear-gradient(107.715deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

/** Figma 3713:1965 — root content width. */
export const ARCH_FRAME_WIDTH = 1235;

/** Figma 3529:616 — "Article" image card (matches variant Article 831×632). */
export const ARCH_ARTICLE = {
  width: 831,
  height: 632,
};

/**
 * Figma 4443:7622 — the "Architecture" frame holding the layered chip
 * diagram. Rendered at native 821×556 so the per-stat highlight rects land
 * at exact pixel coordinates from the hover variants.
 */
export const ARCH_FRAME = {
  left: -0.5,
  top: -0.5,
  width: 821,
  height: 556,
};

/** Kept for compatibility (no longer the diagram container). */
export const ARCH_IMAGE = {
  left: 9.5,
  top: 9.5,
  width: 811,
  height: 492,
};

/** Figma 4443:7621 — caption inside the article card. */
export const ARCH_CAPTION = {
  left: 25.5,
  top: 574.5,
};

/** Figma 3529:623 — stats column (height is content-driven). */
export const ARCH_STATS_FRAME = {
  width: 380,
};

export const ARCH_STAT = {
  width: 340,
  iconWidth: 32.0843620300293,
  iconHeight: 32,
};

export type ArchStat = {
  nodeId: string;
  title: string;
  description: string;
  /** Figma text width of the 32/38 Gilroy title. */
  titleWidth: number;
};

export const ARCH_STATS: ArchStat[] = [
  {
    nodeId: "3529:624",
    title: "A-Cube compute",
    description: "10 MX8 cores, 2,560 MACs/cycle, replaces a separate AI accelerator.",
    titleWidth: 279,
  },
  {
    nodeId: "3529:634",
    title: "Two power domains",
    description: "A 5-core island sips microwatts; the rest powers down.",
    titleWidth: 327.1,
  },
  {
    nodeId: "3529:644",
    title: "Integrated sensing",
    description: "Up to 10 sensor streams fused on-chip; no external sensor hub.",
    titleWidth: 279,
  },
];

/* ------------------------------------------------------------------ */
/* Architecture diagram layers — Figma Default (4443:7622) + hover     */
/* variants (4444:8011 / 8009 / 8010). Rendered at native 821×556.     */
/* ------------------------------------------------------------------ */

export const ARCH_ASSETS = {
  baseDefault: "/products/arch/base-default.png",
  baseHover: "/products/arch/base-hover.png",
  blockDefault: "/products/arch/block-default.png",
  block3Hover: "/products/arch/block3-hover.png",
  block1Hover: "/products/arch/block1-hover.png",
  block2Hover: "/products/arch/block2-hover.png",
};

/** Figma 4443:7624 / 7645 / 7646 — small chip blocks (positions stable). */
export const ARCH_BLOCKS = [
  {
    left: 202,
    top: 283,
    width: 38,
    height: 27,
    defaultInsetImg: { height: "2129.18%", left: "-573.56%", top: "-969.92%", width: "2269.26%" },
    hoverSrc: ARCH_ASSETS.block3Hover,
  },
  {
    left: 211,
    top: 414,
    width: 22,
    height: 50,
    defaultInsetImg: { height: "1149.76%", left: "-1022.52%", top: "-691.76%", width: "3919.63%" },
    hoverSrc: ARCH_ASSETS.block1Hover,
  },
  {
    left: 203,
    top: 242,
    width: 22,
    height: 45,
    defaultInsetImg: { height: "1277.51%", left: "-1022.52%", top: "-775.29%", width: "3919.63%" },
    hoverSrc: ARCH_ASSETS.block2Hover,
  },
];

/**
 * Figma 4443:7629–7644 — connection line vectors. `rotate` lines wrap the
 * SVG in a flex-centered rotation box; plain lines place the inset image
 * directly. Default + hover SVGs share identical geometry.
 */
export type ArchLine = {
  left: number;
  top: number;
  width: number;
  height: number;
  rotate?: string;
  innerWidth?: number;
  innerHeight?: number;
  inset: string;
  defaultSrc: string;
  hoverSrc: string;
};

const L = "/products/arch";
export const ARCH_LINES: ArchLine[] = [
  { left: 205.5, top: 88, width: 0, height: 40.648, rotate: "rotate-90", innerWidth: 40.648, inset: "inset-[-4.5px_-9.84%]", defaultSrc: `${L}/line-default-921.svg`, hoverSrc: `${L}/line-hover-926.svg` },
  { left: 207, top: 143.5, width: 0, height: 23.887, rotate: "rotate-90", innerWidth: 23.887, inset: "inset-[-4.5px_-16.75%]", defaultSrc: `${L}/line-default-922.svg`, hoverSrc: `${L}/line-hover-927.svg` },
  { left: 203, top: 443, width: 7.887, height: 0, inset: "inset-[-8.62px_-50.72%_-8.62px_-52.15%]", defaultSrc: `${L}/line-default-934.svg`, hoverSrc: `${L}/line-hover-939.svg` },
  { left: 195, top: 265, width: 7.887, height: 0, inset: "inset-[-8.62px_-50.72%_-8.62px_-52.15%]", defaultSrc: `${L}/line-default-935.svg`, hoverSrc: `${L}/line-hover-940.svg` },
  { left: 206, top: 196.5, width: 0, height: 9.066, rotate: "rotate-90", innerWidth: 9.066, inset: "inset-[-4.5px_-44.12%]", defaultSrc: `${L}/line-default-924.svg`, hoverSrc: `${L}/line-hover-941.svg` },
  { left: 160.76, top: 196, width: 45.738, height: 0, inset: "inset-[-4.5px_-8.75%]", defaultSrc: `${L}/line-default-925.svg`, hoverSrc: `${L}/line-hover-942.svg` },
  { left: 160.77, top: 144, width: 45.735, height: 0, inset: "inset-[-4.5px_-8.75%]", defaultSrc: `${L}/line-default-923.svg`, hoverSrc: `${L}/line-hover-943.svg` },
  { left: 556.76, top: 264.63, width: 26.695, height: 0, rotate: "rotate-180", innerWidth: 26.695, inset: "inset-[-4.62px_0]", defaultSrc: `${L}/line-default-936.svg`, hoverSrc: `${L}/line-hover-944.svg` },
  { left: 557.51, top: 264.62, width: 0.168, height: 21.687, rotate: "rotate-[90.21deg]", innerWidth: 21.687, innerHeight: 0.088, inset: "inset-[-904.29%_0]", defaultSrc: `${L}/line-default-937.svg`, hoverSrc: `${L}/line-hover-945.svg` },
  { left: 557.59, top: 295.98, width: 0, height: 88.165, rotate: "-rotate-90", innerWidth: 88.165, inset: "inset-[-4.62px_-0.91%_-4.62px_0]", defaultSrc: `${L}/line-default-938.svg`, hoverSrc: `${L}/line-hover-946.svg` },
  { left: 482.5, top: 291, width: 182.301, height: 4, inset: "inset-[-20%_0_-115.47%_0]", defaultSrc: `${L}/line-default-928.svg`, hoverSrc: `${L}/line-hover-947.svg` },
  { left: 664, top: 295.5, width: 0, height: 76.5, rotate: "rotate-90", innerWidth: 76.5, inset: "inset-[-0.8px_0]", defaultSrc: `${L}/line-default-929.svg`, hoverSrc: `${L}/line-hover-948.svg` },
  { left: 340, top: 498, width: 13.559, height: 0, inset: "inset-[-4.8px_-29.5%]", defaultSrc: `${L}/line-default-930.svg`, hoverSrc: `${L}/line-hover-949.svg` },
  { left: 182.2, top: 498, width: 42.297, height: 0, inset: "inset-[-4.8px_-9.46%]", defaultSrc: `${L}/line-default-933.svg`, hoverSrc: `${L}/line-hover-950.svg` },
  { left: 353, top: 464.37, width: 0, height: 34.426, rotate: "rotate-90", innerWidth: 34.426, inset: "inset-[-4.8px_-11.62%]", defaultSrc: `${L}/line-default-931.svg`, hoverSrc: `${L}/line-hover-951.svg` },
  { left: 183, top: 443.59, width: 0, height: 55.199, rotate: "rotate-90", innerWidth: 55.199, inset: "inset-[-4.8px_-7.25%]", defaultSrc: `${L}/line-default-932.svg`, hoverSrc: `${L}/line-hover-952.svg` },
];

/**
 * Per-stat highlight rectangles (Figma 4444:7896/7897, 7920/7921,
 * 8006/8007). Raw px inside the 821×556 frame; `fillImg` is the green
 * texture (block-default) positioned per the variant.
 */
export type ArchHighlightRect = {
  left: number;
  top: number;
  width: number;
  height: number;
  fillImg: { height: string; left: string; top: string; width: string };
};

export const ARCH_HIGHLIGHTS: ArchHighlightRect[][] = [
  // A-Cube compute
  [
    { left: 570, top: 193, width: 174, height: 98, fillImg: { height: "658.85%", left: "-386.42%", top: "-214.87%", width: "558.31%" } },
    { left: 618, top: 370, width: 133, height: 84, fillImg: { height: "677.75%", left: "-469.95%", top: "-419.67%", width: "642.08%" } },
  ],
  // Two power domains — Figma 4444:7920 / 7921
  [
    { left: 195, top: 35, width: 583, height: 282, fillImg: { height: "207.84%", left: "-37.25%", top: "-8.87%", width: "150.8%" } },
    { left: 195, top: 330, width: 583, height: 217, fillImg: { height: "271.57%", left: "-37.36%", top: "-149.59%", width: "151.62%" } },
  ],
  // Integrated sensing
  [
    { left: 22, top: 62, width: 145, height: 419, fillImg: { height: "136.75%", left: "-24.12%", top: "-11.29%", width: "592.76%" } },
    { left: 434, top: 350, width: 49, height: 140, fillImg: { height: "412.91%", left: "-919.21%", top: "-241.36%", width: "1769.62%" } },
  ],
];

/** Figma 4444:7896 — highlight rect border + glow. */
export const ARCH_HIGHLIGHT_RECT =
  "border-[1.09px] border-[#47b81f] border-solid rounded-[6px] shadow-[0px_7px_7.1px_0px_rgba(111,224,71,0.3)]";

/** Figma 4444:7780 — active stat card surface + border. */
export const ARCH_STAT_ACTIVE_BG = "rgba(68,120,7,0.2)";
export const ARCH_STAT_ACTIVE_BORDER = "rgba(83,216,36,0.5)";

/* ------------------------------------------------------------------ */
/* ModelForge "Train / Compile / Deploy" section — Figma 2917:1333 /  */
/* 2917:1341 / 2917:1359 / 2917:1377                                  */
/* ------------------------------------------------------------------ */

/** Figma 2917:1335 — section title text gradient. */
export const MODELFORGE_TITLE_GRADIENT =
  "linear-gradient(133.503deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

/** Figma 2917:1358 — step number text gradient (vertical fade). */
export const STEP_NUMBER_GRADIENT =
  "linear-gradient(to bottom, rgb(255, 255, 255), rgba(255, 255, 255, 0))";

/** Figma 2917:1341 — article card surface + border (shared with features). */
export const MODELFORGE_CARD_BG = "rgba(0,0,0,0.2)";
export const MODELFORGE_CARD_BORDER = "rgba(240,240,240,0.2)";

export const MODELFORGE_CARD = {
  width: 400,
  height: 469,
  gap: 28,
};

/** Image box (Figma 2917:1343) — relative to the NewsSection. */
export const MODELFORGE_IMAGE_BOX = {
  left: -50.451171875,
  top: -3.0537109375,
  width: 427.8506774902344,
  height: 231.5015869140625,
};

export type ModelForgeStep = {
  nodeId: string;
  number: string;
  title: string;
  description: string;
  /** Image crop offset (percent of the image box). */
  imgLeft: number;
  imgTop: number;
};

export const MODELFORGE_STEPS: ModelForgeStep[] = [
  {
    nodeId: "2917:1341",
    number: "01",
    title: "TRAIN",
    description: "Bring your TensorFlow, Keras, or ONNX model. Or start from our pre-trained library.",
    imgLeft: -9.04,
    imgTop: -49.04,
  },
  {
    nodeId: "2917:1359",
    number: "02",
    title: "COMPILE",
    description: "Push-button: ModelForge quantizes and maps it onto A-Cube. No manual translation.",
    imgLeft: -114.69,
    imgTop: -45.83,
  },
  {
    nodeId: "2917:1377",
    number: "03",
    title: "DEPLOY",
    description: "One unified build in standard Eclipse. Up to 90% of your existing C code ports over.",
    imgLeft: -116.48,
    imgTop: -162.44,
  },
];

/* ------------------------------------------------------------------ */
/* "From bench to volume" section — Figma 2918:1467 / 2918:1476        */
/* ------------------------------------------------------------------ */

/** Figma 2918:1470 — section title text gradient. */
export const BENCH_TITLE_GRADIENT =
  "linear-gradient(109.549deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

/** Figma 2918:1478 — card image-box radial vignette (spotlight). */
export const BENCH_IMAGE_VIGNETTE =
  "radial-gradient(ellipse 65% 100% at 50% 50%, rgba(26,26,26,1) 0%, rgba(13,13,13,1) 25%, rgba(7,7,7,1) 37.5%, rgba(0,0,0,1) 50%)";

/** Figma 2918:1553 — "Development" chip surface. */
export const DEV_CHIP_BG = "rgba(115,190,91,0.12)";

export const BENCH_CARD = {
  width: 385.3333435058594,
  height: 589,
  gap: 24,
  bg: "rgba(0,0,0,0.5)",
  border: "rgba(240,240,240,0.2)",
  imageBorder: "rgba(0,255,0,0.3)",
};

export const BENCH_IMAGE_BOX = {
  width: 345.3333435058594,
  height: 327,
  placeholderWidth: 156.8515625,
  placeholderHeight: 64,
};

export type BenchCard = {
  nodeId: string;
  chipLabel?: string;
  title: string;
  description: string;
  cta: string;
  ctaWidth: number;
  image?: string;
};

export const BENCH_CARDS: BenchCard[] = [
  {
    nodeId: "2918:1477",
    chipLabel: "Evaluate",
    title: "Cranium DVK",
    description: "A complete dev kit with onboard sensors, camera, mics, and pre-loaded demos. Measure the power yourself, day one.",
    cta: "View Dev Kit",
    ctaWidth: 157,
    image: "/products page/Container1.png",
  },
  {
    nodeId: "2918:1518",
    chipLabel: "Integrate",
    title: "Sparsh SOM",
    description: "Drop our pre-engineered System-on-Module into your carrier board. Skip the RF, power, and sensor-routing nightmare.",
    cta: "View SOMs",
    ctaWidth: 158,
    image: "/products page/Container2.png",
  },
  {
    nodeId: "2918:1497",
    chipLabel: "Scale",
    title: "GPX10 Pro Silicon",
    description: "The raw SoC for high-volume production.",
    cta: "Talk to Sales",
    ctaWidth: 177,
    image: "/products page/3.png",
  },
];

/* ------------------------------------------------------------------ */
/* "Start building with GPX10 Pro" footer CTA — Figma 2903:2609 /     */
/* 2903:2555 / 2903:2578                                              */
/* ------------------------------------------------------------------ */

/** Figma 2903:2611 — section title text gradient. */
export const START_TITLE_GRADIENT =
  "linear-gradient(129.342deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

/** Figma 2903:2559 / 2903:2582 — card title text gradient. */
export const START_CARD_TITLE_GRADIENT =
  "linear-gradient(107.367deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

export const START_CARD = {
  width: 558,
  height: 320,
  gap: 84,
  contentWidth: 450,
};

export type StartCard = {
  nodeId: string;
  titleLines: [string, string];
  description: string;
  cta: string;
};

export const START_CARDS: StartCard[] = [
  {
    nodeId: "2903:2578",
    titleLines: ["Get an", "Evaluation Kit."],
    description:
      "Explore how Ambient AI can unlock new capabilities in your wearable product. Strategic planning session with our applications team.",
    cta: "Request Eval Kit",
  },
  {
    nodeId: "2903:2555",
    titleLines: ["Scale to increase", "the volume."],
    description:
      "Be the first to access our upcoming Vision, Sound, and Industrial modules.",
    cta: "Talk to Sales",
  },
];
