export type CompanyFeaturedMetadata = {
  date: string;
  totalFunding: string;
  fundingRounds: string;
};

export type CompanyFeaturedArticle = {
  nodeId: string;
  category: string;
  categoryOffsetX: number;
  title: string;
  excerpt: string;
  metadata: CompanyFeaturedMetadata;
  imageSrc: string;
  imageHeight: number;
  imageClassName?: string;
};

export type CompanyCompactArticle = {
  nodeId: string;
  height: number;
  imageHeight: number;
  newsSectionTop: number;
  cornerBottom: number;
  category: string;
  categoryOffsetX: number;
  centerCategory?: boolean;
  title: string;
  excerpt: string;
  excerptWidth: number;
  imageSrc: string;
  imageClassName?: string;
};

export const COMPANY_FEATURED_ARTICLE: CompanyFeaturedArticle = {
  nodeId: "2379:4796",
  category: "RECOGNITION",
  categoryOffsetX: 49,
  title: "$45M Series B led by Khosla Ventures",
  excerpt:
    "Funding announcement following successful deployment of GPX-1 silicon in production devices. Participation from Founders Fund, Andreessen Horowitz, and In-Q-Tel. Capital allocated to scale manufacturing and expand developer ecosystem.",
  metadata: {
    date: "March 2026",
    totalFunding: "Total funding: $72M",
    fundingRounds: "4 funding rounds",
  },
  imageSrc: "/company/Image%202.png",
  imageHeight: 408,
  imageClassName: "absolute inset-0 size-full max-w-none object-cover",
};

export const COMPANY_COMPACT_ARTICLES: CompanyCompactArticle[] = [
  {
    nodeId: "2379:4798",
    height: 327.5,
    imageHeight: 151.5,
    newsSectionTop: 183.5,
    cornerBottom: 324,
    category: "RECOGNITION",
    categoryOffsetX: 49,
    centerCategory: true,
    title: "Best Paper Award at ISSCC 2026",
    excerpt:
      "Sub-threshold AIMC achieving 0.8mW continuous inference at the premier silicon conference.",
    excerptWidth: 383,
    imageSrc: "/company/image%203.png",
    imageClassName: "absolute inset-0 size-full max-w-none object-cover",
  },
  {
    nodeId: "2379:4816",
    height: 335.5,
    imageHeight: 159.5,
    newsSectionTop: 191.5,
    cornerBottom: 332,
    category: "DEPLOYMENT",
    categoryOffsetX: 53,
    centerCategory: true,
    title: "10,000+ Devices in Production",
    excerpt:
      "Real-world validation across wearables and edge devices at scale.",
    excerptWidth: 350,
    imageSrc: "/company/Image%204.png",
    imageClassName: "absolute inset-0 size-full max-w-none object-cover",
  },
];
