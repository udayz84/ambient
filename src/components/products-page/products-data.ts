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
/* "Everything in one chip" architecture section — Figma 2903:2164 /  */
/* 2903:2163 / 2903:2204                                              */
/* ------------------------------------------------------------------ */

/** Figma 2903:2166 — section title text gradient. */
export const ARCH_TITLE_GRADIENT =
  "linear-gradient(107.715deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

export const ARCH_IMAGE = {
  width: 1205.5933837890625,
  height: 619.33056640625,
};

export const ARCH_STATS_FRAME = {
  width: 1204,
  height: 214,
};

export const ARCH_STAT = {
  width: 340,
  height: 214,
  iconWidth: 42.11072540283203,
  iconHeight: 42,
};

export type ArchStat = {
  nodeId: string;
  title: string;
  description: string;
};

export const ARCH_STATS: ArchStat[] = [
  {
    nodeId: "2903:2205",
    title: "A-Cube compute",
    description: "10 MX8 cores, 2,560 MACs/cycle, replaces a separate AI accelerator.",
  },
  {
    nodeId: "2903:2269",
    title: "Two power domains",
    description: "A 5-core island sips microwatts; the rest powers down.",
  },
  {
    nodeId: "2903:2276",
    title: "Integrated sensing",
    description: "Up to 10 sensor streams fused on-chip; no external sensor hub.",
  },
];

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
  title: string;
  description: string;
  cta: string;
  ctaWidth: number;
};

export const BENCH_CARDS: BenchCard[] = [
  {
    nodeId: "2918:1477",
    title: "Cranium DVK",
    description: "A dev kit with sensors, camera, mics, and demos. Measure power from day one.",
    cta: "View Dev Kit",
    ctaWidth: 157,
  },
  {
    nodeId: "2918:1518",
    title: "Sparsh SOM",
    description:
      "Use our System-on-Module in your carrier board. Avoid RF, power, and sensor issues.",
    cta: "View SOMs",
    ctaWidth: 158,
  },
  {
    nodeId: "2918:1497",
    title: "GPX10 Pro Silicon",
    description: "The raw SoC for high-volume production.",
    cta: "Talk to Sales",
    ctaWidth: 177,
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
