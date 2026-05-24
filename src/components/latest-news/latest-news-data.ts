export type LatestNewsArticle = {
  nodeId: string;
  category: string;
  categoryOffsetX: number;
  title: string;
  excerpt: string;
  date: string;
  imageSrc: string;
  imageClassName?: string;
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
  },
  {
    nodeId: "2379:1351",
    category: "PRODUCT LAUNCH",
    categoryOffsetX: 50.5,
    title: "Introducing GPX10: Ultra-Low Power AI at the Edge",
    excerpt:
      "Our first-generation AI chip brings unprecedented efficiency to edge computing, enabling advanced ML models t... ",
    date: "April 02, 2026",
    imageSrc: "/latest-news/article-gpx10.png",
    imageClassName: "absolute inset-0 size-full max-w-none object-cover",
  },
];
