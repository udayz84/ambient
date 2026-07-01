export type CompanyEngagementCardData = {
  nodeId: string;
  titleLines: readonly [string, string];
  titleWidth: number;
  titleHeight: number;
  description: string;
  descriptionWidth: number;
  ctaLabel: string;
  ctaHref: string;
  ctaWidth: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  imageLeft: number;
  imageTop: number;
  /** Mobile: top offset (px) of the content block within the card. */
  contentTop: number;
};

export const COMPANY_JOIN_TEAM = {
  nodeId: "2379:4835",
  titleNodeId: "2379:4838",
  imageNodeId: "2379:4843",
  bodyNodeId: "2379:4844",
  ctaNodeId: "2379:4845",
  title: "Join Our Team",
  description:
    "Help us build the physical foundation of AI. Work alongside researchers who invented AIMC to design analog arrays, write physics-aware compilers, and ship silicon that rewrites compute economics.",
  ctaLabel: "VIEW OPEN ROLES",
  ctaHref: "/careers#open-roles",
  ctaWidth: "w-[231px]",
  imageSrc: "/company/image%20105.png",
} as const;

export const COMPANY_ENGAGEMENT_CARDS: CompanyEngagementCardData[] = [
  {
    nodeId: "2379:4862",
    titleLines: ["Partner with", "Ambient."],
    titleWidth: 220,
    titleHeight: 76,
    description:
      "Co-engineer the next generation of intelligent edge devices. Integrate GPX processors into your hardware with full design support, reference implementations, and production backing.",
    descriptionWidth: 300,
    ctaLabel: "CONTACT BUSINESS DEV",
    ctaHref: "/contact",
    ctaWidth: "w-[231px]",
    imageSrc: "/company/98410%201.png",
    imageWidth: 375,
    imageHeight: 369,
    imageLeft: 220,
    imageTop: 15,
    contentTop: 209,
  },
  {
    nodeId: "2379:4890",
    titleLines: ["Validate your", "architecture."],
    titleWidth: 250,
    titleHeight: 76,
    description:
      "Book a technical deep-dive with our Field Application Engineers. Get evaluation boards, characterization data, and measure real power on your workload — not simulations.",
    descriptionWidth: 280,
    ctaLabel: "SCHEDULE CONSULTATION",
    ctaHref: "/contact",
    ctaWidth: "w-[231px]",
    imageSrc: "/company/98410%202.png",
    imageWidth: 336,
    imageHeight: 331,
    imageLeft: 230,
    imageTop: 33,
    contentTop: 224,
  },
];
