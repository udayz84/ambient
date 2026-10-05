export type DeveloperPlatformCardConfig = {
  nodeId: string;
  left: number;
  top: number;
  width: number;
  height: number;
  title: string;
  titleLeft: number;
  titleWidth?: number;
  body: string;
  bodyLeft: number;
  bodyWidth: number;
  bodyBottomOffset: number;
  lineLeft: number;
  lineTop: number;
  lineWidth: number;
  patternGradient: string;
  patternClass?: string;
  overlayGradient?: string;
  buttonLabel?: string;
  imageSrc?: string;
  imageVariant?: "chipset" | "devkit" | "modules";
  href: string;
};

export const DEVELOPER_PLATFORM_CARDS: DeveloperPlatformCardConfig[] = [
  {
    nodeId: "2379:1012",
    left: 0,
    top: 0,
    width: 388,
    height: 290,
    title: "Explore silicon",
    href: "/products",
    titleLeft: 20.11279296875,
    body:
      "Start with Ambient's AI-native compute products and see how platform advantages translate into real hardware",
    bodyLeft: 24,
    bodyWidth: 290,
    bodyBottomOffset: 163.98,
    lineLeft: 21.39013671875,
    lineTop: 77,
    lineWidth: 151.83203125,
    patternGradient:
      "linear-gradient(17.4266deg, rgba(255, 255, 255, 0) 13.463%, rgb(255, 255, 255) 71.165%)",
    imageSrc: "/developer-platform/chipset-1.webp",
    imageVariant: "chipset",
  },
  {
    // Figma 5212:9613 — moved to the right column, top half.
    nodeId: "5212:9613",
    left: 816.177,
    top: 0.02,
    width: 388,
    height: 290,
    title: "Develop with ModelForge",
    href: "/developer",
    titleLeft: 30,
    body:
      "Train, deploy, and optimize through a development workflow designed to help teams build with Ambient without starting from scratch",
    bodyLeft: 23.56,
    bodyWidth: 340.886,
    bodyBottomOffset: 157,
    lineLeft: 31.27734375,
    lineTop: 77.34765625,
    lineWidth: 151.83203125,
    patternGradient:
      "linear-gradient(17.4266deg, rgba(255, 255, 255, 0) 13.463%, rgb(255, 255, 255) 71.165%)",
  },
  {
    // Figma 5212:9621 — halved from 600px to 290px and moved to the middle
    // column; the dev-kit photo is hidden in the updated design (mobile only).
    nodeId: "5212:9621",
    left: 408,
    top: 0,
    width: 388,
    height: 290,
    title: "Evaluate with evaluation kits",
    href: "/dvk",
    titleLeft: 19.822998046875,
    body:
      "Get hands-on with the platform through evaluation kits designed to accelerate validation and shorten time to first insight",
    bodyLeft: 19.822998046875,
    bodyWidth: 290,
    bodyBottomOffset: 157,
    lineLeft: 21.100341796875,
    lineTop: 77.326171875,
    lineWidth: 151.83203125,
    patternGradient:
      "linear-gradient(8.69891deg, rgba(255, 255, 255, 0) 13.463%, rgb(255, 255, 255) 71.165%)",
    patternClass: "left-1/2 -translate-x-1/2 h-[290.295px] w-[796px]",
    imageSrc: "/developer-platform/card-image-devkits.webp",
    imageVariant: "devkit",
  },
  {
    nodeId: "2379:1003",
    left: 0,
    top: 310,
    width: 796,
    height: 290,
    title: "Prototype with application-focused modules",
    href: "/SOM",
    titleLeft: 20,
    body:
      "Move faster with modules designed around real-world verticals and product categories",
    bodyLeft: 20,
    bodyWidth: 290,
    bodyBottomOffset: 132,
    lineLeft: 21.27734375,
    lineTop: 77,
    lineWidth: 151.83203125,
    patternGradient:
      "linear-gradient(8.69891deg, rgba(255, 255, 255, 0) 13.463%, rgb(255, 255, 255) 71.165%)",
    overlayGradient:
      "linear-gradient(154.062deg, rgba(188, 229, 174, 0) 30.174%, rgb(188, 229, 174) 76.687%)",
    imageSrc: "/developer-platform/card-image-modules-figma.webp",
    imageVariant: "modules",
  },
  {
    // Figma 5212:9564 — new card filling the bottom-right slot created by
    // halving the right column. "Menu" annotation reads "Routes to the
    // Model Zoo page" → href /model-zoo.
    nodeId: "5212:9564",
    left: 816.177,
    top: 310.02,
    width: 388,
    height: 290,
    title: "Deploy from the Model Zoo",
    href: "/model-zoo",
    titleLeft: 30,
    body:
      "Skip the blank page. Flash a ready-made, GPX-tuned model to your kit and see it run in one click.",
    bodyLeft: 23.5570068359375,
    bodyWidth: 340.88604736328125,
    bodyBottomOffset: 157,
    lineLeft: 31.27734375,
    lineTop: 77.34765625,
    lineWidth: 151.83203125,
    patternGradient:
      "linear-gradient(17.4266deg, rgba(255, 255, 255, 0) 13.463%, rgb(255, 255, 255) 71.165%)",
  },
];
