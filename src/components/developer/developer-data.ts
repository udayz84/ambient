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

/** Green glow applied to glass CTAs on card hover (matches careers ApplyButton). */
export const CTA_HOVER_GLOW =
  "group-hover:shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

export const CORNER_LEFT = "/developer/corner-58.svg";
export const CORNER_RIGHT = "/developer/corner-55.svg";

/** Figma 2438:4587 — "From bench validation" section: two module cards. */
export type DeveloperModule = {
  image: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaArrow?: boolean;
};

export const DEVELOPER_MODULES: DeveloperModule[] = [
  {
    image: "/developer/image-2.png",
    title: "GPX Evaluation Kits (DVKs)",
    description:
      "Stop fighting with breakout boards. Our fully integrated Evaluation Kits come equipped with standard interfaces, allowing you to plug in your cameras, microphones, and industrial sensors out-of-the-box for immediate physical validation.",
    ctaLabel: "View Evaluation Kits",
    ctaArrow: true,
  },
  {
    image: "/developer/image-3.png",
    title: "Production-Ready SOMs",
    description:
      "Skip the nightmare of custom RF and power routing. Drop our high-density System-on-Modules (SOMs) directly into your custom carrier boards. They're engineered for extreme space-constrained environments, radically accelerating your time-to-market.",
    ctaLabel: "View System-on-Modules",
  },
];

/** Module card image darkening overlay (Figma 2438:4599). */
export const MODULE_IMAGE_OVERLAY =
  "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 50%, rgb(0,0,0) 100%)";

/** Figma 2438:4666 — "Your deployment co-pilots." section: three cards. */
export type DeveloperCopilot = {
  icon: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaVariant: "primary" | "secondary";
  ctaFullWidth?: boolean;
};

export const DEVELOPER_COPILOTS: DeveloperCopilot[] = [
  {
    icon: "/developer/copilot-icon-1.svg",
    title: "Exhaustive Documentation",
    description:
      "No disorganized wikis. Access the fully searchable ModelForge deployment guide, comprehensive DSP/Pre-processing C-libraries, and lower-level hardware API references.",
    ctaLabel: "Browse Developer Docs",
    ctaVariant: "secondary",
  },
  {
    icon: "/developer/copilot-icon-2.svg",
    title: "10 Minutes to Mastery",
    description:
      "Get up and running visually. Access our self-serve library of YouTube masterclasses walking you step-by-step through everything from model porting to integrated compilation.",
    ctaLabel: "View Training Playlist",
    ctaVariant: "secondary",
  },
  {
    icon: "/developer/copilot-icon-3.svg",
    title: "Your Technical Copilots",
    description:
      "Skip the generic help desk. Get direct, architectural-level support from our Field Application Engineers. We will handhold your team to help optimize your specific neural network and heterogeneous build.",
    ctaLabel: "Schedule Technical Consultation",
    ctaVariant: "secondary",
    ctaFullWidth: true,
  },
];

/** Copilot card background (Figma 2438:4678). */
export const COPILOT_CARD_BG =
  "linear-gradient(rgba(83, 216, 36, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%), linear-gradient(90deg, rgba(21, 21, 21, 0.3) 0%, rgba(21, 21, 21, 0.3) 100%)";

/** Copilot icon tile radial background (72×72, Figma 2684:1164). */
export const COPILOT_ICON_BG =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 72 72' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(4.0947e-14 2.6102 -5.2864 -3.4107e-15 36 -4.3253)'><stop stop-color='rgba(57,74,54,1)' offset='0'/><stop stop-color='rgba(43,54,41,1)' offset='0.5'/><stop stop-color='rgba(29,34,28,1)' offset='1'/></radialGradient></defs></svg>\")";

/** Copilot section title gradient (127.006°, Figma 2438:4669). */
export const COPILOT_TITLE_GRADIENT =
  "linear-gradient(127.006deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";
