export type DeveloperArticle = {
  icon: string;
  title: string;
  description: string;
};

/** Figma 2640:1259 / 2640:1250 / 2640:1268 — three article cards. */
export const DEVELOPER_ARTICLES: DeveloperArticle[] = [
  {
    icon: "/developer/article-icon-1.svg",
    title: "No Proprietary IDEs",
    description:
      "Everything happens within the standard Eclipse IDE you already know with easy-to-use APIs.",
  },
  {
    icon: "/developer/article-icon-2.svg",
    title: "A Single Line of Inference",
    description:
      "Your heavy, quantized neural network is distilled into a highly optimized object file. You call it just like any other standard C function.",
  },
  {
    icon: "/developer/article-icon-3.svg",
    title: "The End of Glue Code",
    description:
      "ModelForge's dual-compiler architecture natively links your embedded DSP/sensor code with the AI execution in one seamless build.",
  },
];

/** Dark-green radial icon tile background (Figma 2684:1050). */
export const ARTICLE_ICON_BG =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 50 49' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(2.8435e-14 1.7764 -3.6711 -2.3212e-15 25 -2.9436)'><stop stop-color='rgba(57,74,54,1)' offset='0'/><stop stop-color='rgba(43,54,41,1)' offset='0.5'/><stop stop-color='rgba(29,34,28,1)' offset='1'/></radialGradient></defs></svg>\")";

export const HERO_TITLE_GRADIENT =
  "linear-gradient(106.645deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

export const SECTION_TITLE_GRADIENT =
  "linear-gradient(123.896deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

export const PRIMARY_CTA_SHADOW =
  "drop-shadow-[0px_42px_53.5px_rgba(69,196,24,0.2)]";

export const CORNER_LEFT = "/developer/corner-58.svg";
export const CORNER_RIGHT = "/developer/corner-55.svg";
