import { mediaUrl, type StrapiMedia } from "@/lib/strapi";

export type ResourceFeaturedCard = {
  nodeId: string;
  imageNodeId: string;
  imageWidth: number;
  imageSrc: string;
  imageClassName: string;
  badgeNodeId: string;
  badgeLabel: string;
  badgeVariant: "white" | "stacked";
};

export type ResourceArticle = {
  nodeId: string;
  category: string;
  categoryId?: string;
  categoryOffsetX: number;
  centerCategory?: boolean;
  title: string;
  titleFontSize?: 20 | 21 | 22;
  excerpt: string;
  imageOverlaySrc?: string;
  imageSrc?: string;
  href?: string;
};

export const ARTICLE_IMAGE_BASE = "/resources/article-image-base.png";

export const FEATURED_RESOURCES: ResourceFeaturedCard[] = [
  {
    nodeId: "2379:1969",
    imageNodeId: "2379:1970",
    imageWidth: 407,
    imageSrc: "/resources/featured-1.png",
    imageClassName: "absolute max-w-none object-cover size-full",
    badgeNodeId: "2379:1971",
    badgeLabel: "WHITEPAPER",
    badgeVariant: "white",
  },
  {
    nodeId: "2379:1996",
    imageNodeId: "2379:1997",
    imageWidth: 406,
    imageSrc: "/resources/featured-2.png",
    imageClassName:
      "absolute left-0 top-[-117.37%] h-[288.97%] w-full max-w-none object-cover",
    badgeNodeId: "2379:1998",
    badgeLabel: "WHITEPAPER",
    badgeVariant: "white",
  },
  {
    nodeId: "2379:2023",
    imageNodeId: "2379:2024",
    imageWidth: 407,
    imageSrc: "/resources/featured-3.png",
    imageClassName:
      "absolute left-0 top-[-20.96%] h-[257.19%] w-full max-w-none object-cover",
    badgeNodeId: "2379:2030",
    badgeLabel: "WHITEPAPER",
    badgeVariant: "stacked",
  },
];

export const RESOURCE_CATEGORIES = [
  { id: "case-studies", label: "CASE STUDIES", nodeId: "2379:1786" },
  { id: "videos", label: "VIDEOS", nodeId: "2379:1793" },
  { id: "webinar", label: "WEBINAR & PODCASTS", nodeId: "2379:1800", active: true },
  { id: "press", label: "PRESS RELEASES", nodeId: "2379:1811" },
  { id: "blogs", label: "BLOGS & ARTICLES", nodeId: "2379:1818" },
] as const;

export const RESOURCE_ARTICLES: ResourceArticle[] = [
  {
    nodeId: "2379:1834",
    category: "Podcast",
    categoryId: "webinar",
    categoryOffsetX: 0.5,
    centerCategory: true,
    title: "GP Singh interviewed by SemiWiki founder Daniel Nenni",
    excerpt:
      "Our CEO discusses Ambient Scientific’s ultra low power edge AI, DigAn archit.... ",
    imageOverlaySrc: "/resources/article-1-overlay.png",
  },
  {
    nodeId: "2379:1853",
    category: "PRODUCT UPDATE",
    categoryId: "product_update",
    categoryOffsetX: 0.5,
    centerCategory: true,
    title: "Beyond the Bit Episode 02 The Truth About India’s Chip Industry",
    excerpt:
      "Episode 02 of Beyond the Bit is now live, featuring Saharsh Singhania an... ",
    imageOverlaySrc: "/resources/article-2-overlay.png",
  },
  {
    nodeId: "2379:1872",
    category: "PRODUCT UPDATE",
    categoryId: "product_update",
    categoryOffsetX: 0.5,
    centerCategory: true,
    title: "PyTorch vs TensorFlow for Production and Edge AI Deployment",
    titleFontSize: 20,
    excerpt:
      "This article compares PyTorch and TensorFlow from a real-world de... ",
    imageOverlaySrc: "/resources/article-3-overlay.png",
  },
  {
    nodeId: "2379:1892",
    category: "EVENT",
    categoryId: "event",
    categoryOffsetX: 0.5,
    centerCategory: true,
    title: "Breaking the Von Neumann Bottleneck Coin Cell AI at the Edge",
    titleFontSize: 21,
    excerpt:
      "In this session, Ambient Scientific explores a new approach to edge AI by a... ",
    imageOverlaySrc: "/resources/article-4-overlay.png",
  },
  {
    nodeId: "2379:1911",
    category: "PRESS RELEASE",
    categoryId: "press",
    categoryOffsetX: 0.5,
    centerCategory: true,
    title: "Ambient Scientific and Dimension NXG Introduce MAI",
    excerpt:
      "Ambient Scientific, in collaboration with Dimension NXG, introduces MA... ",
    imageOverlaySrc: "/resources/article-5-overlay.png",
  },
  {
    nodeId: "2379:1930",
    category: "WEBINAR",
    categoryId: "webinar",
    categoryOffsetX: 0.5,
    centerCategory: true,
    title: "Boot Blink and Believe Edge AI from Prototype to Production",
    excerpt:
      "The recording of our webinar Boot Blink and Believe Edge AI from Prototy... ",
    imageOverlaySrc: "/resources/article-6-overlay.png",
  },
  {
    nodeId: "2379:1949",
    category: "CASE STUDY",
    categoryId: "case-studies",
    categoryOffsetX: 0.5,
    centerCategory: true,
    title: "Deploying Always-On Voice at Microwatt Power Budgets",
    titleFontSize: 21,
    excerpt:
      "How teams are shipping voice-first edge products with GPX silicon and Ambient tooling... ",
    imageOverlaySrc: "/resources/article-1-overlay.png",
  },
  {
    nodeId: "2379:1950",
    category: "BLOG",
    categoryId: "blogs",
    categoryOffsetX: 0.5,
    centerCategory: true,
    title: "Designing Sensor Fusion Pipelines for Battery-Powered Devices",
    titleFontSize: 21,
    excerpt:
      "A practical walkthrough of fusing vision, audio, and IMU signals on constrained edge hardware... ",
    imageOverlaySrc: "/resources/article-2-overlay.png",
  },
  {
    nodeId: "2379:1951",
    category: "VIDEO",
    categoryId: "videos",
    categoryOffsetX: 0.5,
    centerCategory: true,
    title: "Inside Ambient ModelForge: From Training to On-Device Inference",
    excerpt:
      "See how ModelForge compresses and deploys models tuned for Ambient GPX processors... ",
    imageOverlaySrc: "/resources/article-3-overlay.png",
  },
  {
    nodeId: "2379:1952",
    category: "PRESS RELEASE",
    categoryId: "press",
    categoryOffsetX: 0.5,
    centerCategory: true,
    title: "Ambient Scientific Expands Developer Ecosystem Partnerships",
    excerpt:
      "New collaborations bring reference designs, dev kits, and production support to edge AI builders... ",
    imageOverlaySrc: "/resources/article-4-overlay.png",
  },
  {
    nodeId: "2379:1953",
    category: "WEBINAR",
    categoryId: "webinar",
    categoryOffsetX: 0.5,
    centerCategory: true,
    title: "Scaling Edge AI from Prototype to Millions of Units",
    titleFontSize: 21,
    excerpt:
      "Engineering leaders share lessons on power, cost, and software continuity across product lines... ",
    imageOverlaySrc: "/resources/article-5-overlay.png",
  },
  {
    nodeId: "2379:1954",
    category: "PODCAST",
    categoryId: "webinar",
    categoryOffsetX: 0.5,
    centerCategory: true,
    title: "The Future of Programmable AI Silicon at the Edge",
    excerpt:
      "Ambient executives discuss programmable compute density and the roadmap for GPX platforms... ",
    imageOverlaySrc: "/resources/article-6-overlay.png",
  },
];

/**
 * Canonical id for an article given its Strapi `category` enum value.
 * Maps the article collection's category enum onto the resources-page
 * content filter `category_id` values. Unknown enum values fall through
 * unchanged so editors can wire custom filters by matching the enum.
 */
export function articleCategoryId(enumCategory: string): string {
  const c = String(enumCategory || "").toLowerCase();
  switch (c) {
    case "case_study":
      return "case-studies";
    case "video":
      return "videos";
    case "webinar":
    case "podcast":
      return "webinar";
    case "press_release":
      return "press";
    case "blog":
    case "technical_insight":
      return "blogs";
    default:
      return c;
  }
}

/** Human-readable label for an article `category` enum value (badge text). */
export function humanizeArticleCategory(enumCategory: string): string {
  const c = String(enumCategory || "").toLowerCase();
  const map: Record<string, string> = {
    blog: "Blog",
    press_release: "Press Release",
    product_update: "Product Update",
    event: "Event",
    webinar: "Webinar",
    whitepaper: "Whitepaper",
    case_study: "Case Study",
    video: "Video",
    podcast: "Podcast",
    technical_insight: "Technical Insight",
    partnership: "Partnership",
  };
  return (
    map[c] ||
    c
      .replace(/_/g, " ")
      .replace(/\b\w/g, (m) => m.toUpperCase())
  );
}

/**
 * Canonical id for a content filter `category_id` value. Produces the same
 * canonical space as `articleCategoryId` so an article matches its filter.
 */
export function filterCategoryId(filterId: string): string {
  const c = String(filterId || "").toLowerCase();
  switch (c) {
    case "case-studies":
    case "case_studies":
    case "casestudies":
      return "case-studies";
    case "videos":
    case "video":
      return "videos";
    case "webinar":
    case "webinars":
      return "webinar";
    case "press":
    case "press_release":
    case "press_releases":
      return "press";
    case "blogs":
    case "blog":
      return "blogs";
    default:
      return c;
  }
}

/**
 * Map Strapi `article` collection rows into the shape the article cards
 * render. Returns the hardcoded fallback list when the collection is empty
 * or unavailable so the page always renders.
 */
type StrapiArticleRow = {
  id?: number;
  documentId?: string;
  title?: string;
  category?: string;
  excerpt?: string;
  external_url?: string;
  featured_image?: StrapiMedia;
};

export function buildArticles(strapiArticles: unknown): ResourceArticle[] {
  if (!Array.isArray(strapiArticles) || strapiArticles.length === 0) {
    return RESOURCE_ARTICLES;
  }
  return (strapiArticles as StrapiArticleRow[]).map(
    (a, i): ResourceArticle => {
      const cat = String(a?.category || "");
      return {
        nodeId:
          (a?.documentId as string) ||
          (a?.id != null ? String(a.id) : `article-${i}`),
        category: humanizeArticleCategory(cat).toUpperCase(),
        categoryId: articleCategoryId(cat),
        categoryOffsetX: 0.5,
        centerCategory: true,
        title: (a?.title as string) || "",
        excerpt: (a?.excerpt as string) || "",
        imageSrc: mediaUrl(a?.featured_image) || undefined,
        imageOverlaySrc: undefined,
        href: (a?.external_url as string) || "#",
      };
    }
  );
}
