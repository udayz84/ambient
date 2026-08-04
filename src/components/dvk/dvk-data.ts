/** Figma 2761:2984 — hero title text gradient. */
export const HERO_TITLE_GRADIENT =
  "linear-gradient(109.15deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

/** Figma 4059:10009 — mobile hero title text gradient. */
export const HERO_TITLE_GRADIENT_MOBILE =
  "linear-gradient(100.882deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

/** Figma 4059:10015 — mobile hero board image fade overlays (top + bottom). */
export const HERO_IMAGE_OVERLAY_MOBILE =
  "linear-gradient(180deg, rgb(0, 0, 0) 1.5278%, rgba(0, 0, 0, 0) 19.444%), linear-gradient(185.179deg, rgba(0, 0, 0, 0) 65.85%, rgb(0, 0, 0) 99.321%)";

/** Figma 2761:2909 — hardware stack section title gradient. */
export const SECTION_TITLE_GRADIENT =
  "linear-gradient(115.097deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

/** Figma 2761:2793 — demos section title gradient. */
export const DEMOS_TITLE_GRADIENT =
  "linear-gradient(138.357deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

/** Figma 4059:10216 — mobile demos section title gradient. */
export const DEMOS_TITLE_GRADIENT_MOBILE =
  "linear-gradient(99.118deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

/** Figma 4062:10909 — mobile ModelForge section title gradient. */
export const MODELFORGE_TITLE_GRADIENT_MOBILE =
  "linear-gradient(103.536deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

/** Figma 2761:3011 — ModelForge section title gradient. */
export const MODELFORGE_TITLE_GRADIENT =
  "linear-gradient(124.465deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

/** Figma 2761:2944 — accent (Sensors) card surface + border. */
export const ACCENT_CARD_BG = "rgba(68,120,7,0.2)";
export const ACCENT_CARD_BORDER = "#a8ed90";

/** Figma 2761:2926 — default card surface + border. */
export const CARD_BG = "rgba(0,0,0,0.2)";
export const CARD_BORDER = "rgba(240,240,240,0.2)";

/** Figma 2761:2916 — large feature card surface. */
export const FEATURE_CARD_BG = "rgba(0,0,0,0.5)";

/** Figma 2761:2972 — background image fade overlay (bottom + left darkening). */
export const HERO_IMAGE_OVERLAY =
  "linear-gradient(178.362deg, rgba(0, 0, 0, 0) 70.835%, rgb(0, 0, 0) 94.902%), linear-gradient(270deg, rgba(0, 0, 0, 0) 39.957%, rgb(0, 0, 0) 70.739%)";

/** Figma 2761:2988 — primary CTA outer glow shadow. */
export const PRIMARY_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

/** Figma 2761:2988 — primary CTA inner top highlight. */
export const PRIMARY_CTA_INSET =
  "shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]";

export const CORNER_LEFT = "/hero/corner-tag-1.svg";
export const CORNER_RIGHT = "/hero/corner-tag-2.svg";

export type SpecCardType = {
  title: string;
  items: string[];
  accent?: boolean;
};

/** Figma 2761:2925 — hardware stack spec cards (7 cards, 3 rows). */
export const SPEC_CARDS: SpecCardType[] = [
  {
    title: "Memory",
    items: ["64Mb Flash", "External Flash connection via SPI, QPI"],
  },
  {
    title: "Wireless",
    items: ["UART-Based: Micro chip BLE"],
  },
  {
    title: "Sensors",
    accent: true,
    items: [
      "I²C-Based: MC3419, MXC6655",
      "ADC-Based: Optical, Humidity, and Temperature Sensors",
      "I²S-Based: Microphone (Audio Pipeline)",
      "ADC-Based: Microphone (Audio Pipeline)",
      "DVP-Based: Camera",
    ],
  },
  {
    title: "Debug Ports",
    items: [
      "20 Pin JTAG for debug",
      "UART-Based: TTL for debug prints",
      "GPIO-Based: LEDs",
    ],
  },
  {
    title: "Interfaces",
    items: [
      "SPI0",
      "SPI1",
      "I2C Master",
      "I2C Slave",
      "DVP Interface",
      "I2S",
      "ADC",
      "UART",
      "QPI",
    ],
  },
  {
    title: "MCU",
    items: ["GPX10PRO"],
  },
  {
    title: "Booting",
    items: ["Chip_ID Switches"],
  },
];
