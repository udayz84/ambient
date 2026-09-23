/**
 * Shared constants for the Model Zoo page (Figma 5130:8060).
 * Mirrors the dvk-data.ts conventions: gradients, card surfaces, CTA shadows.
 */

/** Figma 5387:7840 — hero title text gradient. */
export const HERO_TITLE_GRADIENT =
  "linear-gradient(99.222deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

/** Figma 5422:6884 — hero background image fade overlay. */
export const HERO_IMAGE_OVERLAY =
  "linear-gradient(267.196deg, rgb(0, 0, 0) 5.937%, rgba(0, 0, 0, 0) 34.364%), linear-gradient(176.064deg, rgba(0, 0, 0, 0) 66.948%, rgb(0, 0, 0) 91.64%), linear-gradient(54.317deg, rgb(0, 0, 0) 42.553%, rgba(0, 0, 0, 0) 59.806%)";

/** Section title gradient factory — same stops as every page title, angle from Figma. */
export const sectionTitleGradient = (deg: number) =>
  `linear-gradient(${deg}deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`;

/** Figma 5387:7844 — primary CTA outer glow shadow. */
export const PRIMARY_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

/** Figma 5387:7844 — primary CTA inner top highlight. */
export const PRIMARY_CTA_INSET =
  "shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]";

export const CORNER_LEFT = "/hero/corner-tag-1.svg";
export const CORNER_RIGHT = "/hero/corner-tag-2.svg";

/** Figma 5428:8403 — left fade over the hero collage rows. */
export const COLLAGE_LEFT_FADE =
  "linear-gradient(262.733deg, rgba(0, 0, 0, 0) 15.711%, rgb(0, 0, 0) 72.391%)";
