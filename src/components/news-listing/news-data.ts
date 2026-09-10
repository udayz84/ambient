export type NewsArticle = {
  nodeId: string;
  category: string;
  title: string;
  titleFontSize?: number;
  excerpt: string;
  imageOverlaySrc?: string;
  href?: string;
};

export const NEWS_ARTICLE_IMAGE_BASE = "/resources/article-image-base.webp";

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    nodeId: "2500:1887",
    category: "Blog",
    title: "GP Singh interviewed by SemiWiki founder Daniel Nenni",
    titleFontSize: 22,
    excerpt:
      "Our CEO discusses Ambient Scientific’s ultra low power edge AI, DigAn archi.... ",
    imageOverlaySrc: "/resources/article-1-overlay.webp",
  },
  {
    nodeId: "2500:1906",
    category: "PRODUCT UPDATE",
    title: "Beyond the Bit Episode 02 The Truth About India’s Chip Industry",
    titleFontSize: 22,
    excerpt:
      "Episode 02 of Beyond the Bit is now live, featuring Saharsh Singhania an... ",
    imageOverlaySrc: "/resources/article-2-overlay.png",
  },
  {
    nodeId: "2500:1925",
    category: "Press Release",
    title: "PyTorch vs TensorFlow for Production and Edge AI Deployment",
    titleFontSize: 21,
    excerpt:
      "This article compares PyTorch and TensorFlow from a real-world de... ",
    imageOverlaySrc: "/resources/article-3-overlay.webp",
  },
  {
    nodeId: "2500:1945",
    category: "EVENT",
    title: "Breaking the Von Neumann Bottleneck Coin Cell AI at the Edge",
    titleFontSize: 21,
    excerpt:
      "In this session, Ambient Scientific explores a new approach to edge AI by a... ",
    imageOverlaySrc: "/resources/article-4-overlay.webp",
  },
  {
    nodeId: "2500:1964",
    category: "Blog",
    title: "Ambient Scientific and Dimension NXG Introduce MAI",
    titleFontSize: 22,
    excerpt:
      "Ambient Scientific, in collaboration with Dimension NXG, introduces MA... ",
    imageOverlaySrc: "/resources/article-5-overlay.webp",
  },
  {
    nodeId: "2500:1983",
    category: "WEBINAR",
    title: "Boot Blink and Believe Edge AI from Prototype to Production",
    titleFontSize: 22,
    excerpt:
      "The recording of our webinar Boot Blink and Believe Edge AI from Prototy... ",
    imageOverlaySrc: "/resources/article-6-overlay.webp",
  },
];
