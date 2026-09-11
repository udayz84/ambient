import { mediaUrl } from "@/lib/strapi";

export type LatestNewsArticle = {
  nodeId: string;
  category: string;
  categoryOffsetX: number;
  title: string;
  excerpt: string;
  date: string;
  imageSrc: string;
  imageClassName?: string;
  imageSizes?: string;
  href: string;
};

export const LATEST_NEWS_ARTICLES: LatestNewsArticle[] = [
  {
    nodeId: "2379:1292",
    category: "PARTNERSHIP",
    categoryOffsetX: 41,
    title: "Ambient Partners with Leading Medical Device Manufacturers",
    excerpt:
      "Strategic partnerships accelerate the deployment of always-on AI monitoring in next-generation wearable health d... ",
    date: "April 02, 2026",
    imageSrc: "/latest-news/article-partnership.png",
    imageClassName: "absolute top-0 left-0 h-[105.35%] w-full max-w-none",
    href: "/resources",
  },
  {
    nodeId: "2379:1321",
    category: "TECHNICAL INSIGHT",
    categoryOffsetX: 50.5,
    title: "The Physics of Compute-in-Memory Architecture",
    excerpt:
      "Deep dive into how Ambient's analog processing eliminates the memory bottleneck that has plagued digital AI accele... ",
    date: "April 02, 2026",
    imageSrc: "/latest-news/article-physics.png",
    imageClassName: "absolute inset-0 size-full max-w-none object-cover",
    href: "/resources",
  },
  {
    nodeId: "2379:1351",
    category: "PRODUCT LAUNCH",
    categoryOffsetX: 50.5,
    title: "Introducing GPX10: Ultra-Low Power AI at the Edge",
    excerpt:
      "Our first-generation AI chip brings unprecedented efficiency to edge computing, enabling advanced ML models t... ",
    date: "April 02, 2026",
    imageSrc: "/latest-news/article-gpx10.webp",
    imageClassName: "absolute inset-0 size-full max-w-none object-cover",
    href: "/resources",
  },
];

/**
 * Format an ISO date string (e.g. "2026-04-02") as "Month DD, YYYY".
 * Returns the raw input on failure so we never render an invalid date.
 */
function formatDisplayDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const trimmed = iso.trim();
  if (!trimmed) return "";
  // Already formatted (e.g. "April 02, 2026") — pass through.
  if (!/^\d{4}-\d{2}-\d{2}/.test(trimmed)) return trimmed;
  const d = new Date(`${trimmed}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return trimmed;
  const month = d.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${month} ${day}, ${d.getUTCFullYear()}`;
}

/**
 * Convert an `article.category` enum value (e.g. "press_release") into the
 * uppercase display label used on cards (e.g. "PRESS RELEASE").
 */
function formatCategory(category: string | null | undefined): string {
  const value = (category ?? "").trim();
  if (!value) return "";
  return value.replace(/_/g, " ").toUpperCase();
}

/**
 * Map an article from the Strapi `articles` collection into the card shape
 * used by LatestNews. Replaces the previous fallback-derived fields
 * (`category`, `date`, `href`) with real values from the article collection.
 */
export function mapArticleToNewsCard(
  article: any,
  index: number,
  opts: { nodeIdPrefix?: string } = {},
): LatestNewsArticle {
  const fallback =
    LATEST_NEWS_ARTICLES[index % LATEST_NEWS_ARTICLES.length];
  const prefix = opts.nodeIdPrefix ?? "cms-news-card";
  const image = mediaUrl(article?.featured_image);
  const imageSrc = image ? image : "";
  return {
    nodeId: `${prefix}-${article?.documentId ?? article?.id ?? index}`,
    title: (article?.title as string) || "",
    excerpt: (article?.excerpt as string) || "",
    category: formatCategory(article?.category),
    // Center the label when articles come from the collection so the
    // pixel-tuned offset (which assumes a specific hardcoded label width)
    // is not needed.
    categoryOffsetX: 0,
    date: formatDisplayDate(article?.date),
    href:
      (article?.external_url as string) ||
      (article?.slug ? `/article/${article.slug}` : "/resources"),
    imageSrc,
  };
}
