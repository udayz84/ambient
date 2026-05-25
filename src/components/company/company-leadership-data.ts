export type LeadershipMember = {
  name: string;
  role: string;
  imageSrc: string;
  imageClassName?: string;
  linkedInHref: string;
  nodeId: string;
  imageNodeId: string;
  nameNodeId: string;
};

const PORTRAIT_CLASS =
  "absolute inset-0 size-full max-w-none object-cover object-top";

export const ADVISORY_PORTRAIT_CLASS = PORTRAIT_CLASS;

export const LEADERSHIP_TEAM: LeadershipMember[] = [
  {
    name: "GP Singh",
    role: "Founder, CEO",
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
    imageSrc: "/company/leadership/swapnil-sapre.jpg",
    imageClassName: PORTRAIT_CLASS,
    linkedInHref: "https://www.linkedin.com/in/swapnil-sapre/",
    nodeId: "2379:2290",
    imageNodeId: "2379:2290",
    nameNodeId: "2379:2290",
  },
];

export const ADVISORY_BOARD: LeadershipMember[] = [
  {
    name: "Greg Maturi",
    role: "",
    imageSrc: "/company/leadership/greg-maturi.png",
    imageClassName: ADVISORY_PORTRAIT_CLASS,
    linkedInHref: "https://www.linkedin.com/in/greg-maturi-966b84/",
    nodeId: "2379:2300",
    imageNodeId: "2379:2304",
    nameNodeId: "2379:2311",
  },
  {
    name: "Yuqing Niu",
    role: "",
    imageSrc: "/company/leadership/yuqing-niu.png",
    imageClassName: ADVISORY_PORTRAIT_CLASS,
    linkedInHref: "https://www.linkedin.com/in/yuqing-niu-55200b1a/",
    nodeId: "2379:2314",
    imageNodeId: "2379:2318",
    nameNodeId: "2379:2325",
  },
  {
    name: "Ron Melanson",
    role: "",
    imageSrc: "/company/leadership/ron-melanson.png",
    imageClassName: ADVISORY_PORTRAIT_CLASS,
    linkedInHref: "https://www.linkedin.com/in/ronmelanson/",
    nodeId: "2379:2328",
    imageNodeId: "2379:2332",
    nameNodeId: "2379:2339",
  },
  {
    name: "Pete Foley",
    role: "",
    imageSrc: "/company/leadership/pete-foley.png",
    imageClassName: ADVISORY_PORTRAIT_CLASS,
    linkedInHref: "https://www.linkedin.com/in/foleypete/",
    nodeId: "2379:2342",
    imageNodeId: "2379:2346",
    nameNodeId: "2379:2353",
  },
];
