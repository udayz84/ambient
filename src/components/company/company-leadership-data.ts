export type LeadershipMember = {
  name: string;
  role: string;
  /** Expanded card — one or two body paragraphs (Figma open state) */
  bioParagraphs: string[];
  imageSrc: string;
  imageClassName?: string;
  linkedInHref: string;
  nodeId: string;
  imageNodeId: string;
  nameNodeId: string;
  readMoreNodeId?: string;
};

const PORTRAIT_CLASS =
  "absolute inset-0 size-full max-w-none object-cover object-top";

export const ADVISORY_PORTRAIT_CLASS = PORTRAIT_CLASS;

export const LEADERSHIP_TEAM: LeadershipMember[] = [
  {
    name: "GP Singh",
    role: "Founder, CEO",
    bioParagraphs: [
      "An engineer and semiconductor innovator with 50+ chip tape-outs and 50+ patents, with deep experience across hardware and software from executive leadership to hands-on engineering.",
      "He founded Ambient Scientific in 2017 to pioneer DigAn™ technology for ultra-low-power, programmable AI processors that scale from edge devices to high-performance systems.",
    ],
    imageSrc: "/company/leadership/gp-singh.png",
    imageClassName: PORTRAIT_CLASS,
    linkedInHref: "https://www.linkedin.com/in/gp-singh-340732/",
    nodeId: "2379:2288",
    imageNodeId: "2379:2288",
    nameNodeId: "2379:2288",
  },
  {
    name: "Madanjit Singh",
    role: "VP Software",
    bioParagraphs: [
      "Co-founder and VP of Software leading Ambient Scientific’s software stack, tools, and India R&D operations with a focus on production-ready edge-AI firmware.",
      "He drives development of programmable software that brings DigAn™ processors to customer products, from bring-up through deployment at scale.",
    ],
    imageSrc: "/company/leadership/madanjit-singh.jpg",
    imageClassName: PORTRAIT_CLASS,
    linkedInHref: "https://www.linkedin.com/in/madanjit-singh-ambient/",
    nodeId: "2379:2289",
    imageNodeId: "2379:2289",
    nameNodeId: "2379:2289",
  },
  {
    name: "Swapnil Sapre",
    role: "AVP Hardware",
    bioParagraphs: [
      "AVP of Hardware Engineering overseeing silicon design, validation, board engineering, mixed-signal integration, and systems bring-up for Ambient’s AI processors.",
      "His career spans Intel, AMD, NXP, and Western Digital—covering the full lifecycle from first power-on through high-volume manufacturing and deployed edge systems.",
    ],
    imageSrc: "/company/leadership/swapnil-sapre.jpg",
    imageClassName: PORTRAIT_CLASS,
    linkedInHref: "https://www.linkedin.com/in/swapnil-sapre/",
    nodeId: "2379:2290",
    imageNodeId: "2379:2290",
    nameNodeId: "2379:2290",
  },
];

const GP_SINGH_ADVISORY = {
  name: "GP Singh",
  role: "",
  bioParagraphs: [] as string[],
  imageSrc: "/company/leadership/gp-singh.png",
  imageClassName: ADVISORY_PORTRAIT_CLASS,
  linkedInHref: "https://www.linkedin.com/in/gp-singh-340732/",
} as const;

export const ADVISORY_BOARD: LeadershipMember[] = [
  {
    ...GP_SINGH_ADVISORY,
    nodeId: "2379:2300",
    imageNodeId: "2379:2304",
    nameNodeId: "2379:2311",
  },
  {
    ...GP_SINGH_ADVISORY,
    nodeId: "2379:2314",
    imageNodeId: "2379:2318",
    nameNodeId: "2379:2325",
  },
  {
    ...GP_SINGH_ADVISORY,
    nodeId: "2379:2328",
    imageNodeId: "2379:2332",
    nameNodeId: "2379:2339",
  },
  {
    ...GP_SINGH_ADVISORY,
    nodeId: "2379:2342",
    imageNodeId: "2379:2346",
    nameNodeId: "2379:2353",
  },
];
