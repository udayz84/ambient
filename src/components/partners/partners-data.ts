/**
 * src/components/partners/partners-data.ts
 * ----------------------------------------------------------------------------
 * Content for the /partners page, sourced from "Copy & UI for Partners
 * Page.docx". Partner entries are PLACEHOLDERS (doc: "[PLACEHOLDER —
 * Partners 1–6]") with fictional names — swap in real partners here as
 * they are signed. Region nodes on the coverage map are only rendered for
 * regions that have at least one named partner behind them.
 * ----------------------------------------------------------------------------
 */

export const PARTNER_REGIONS = [
  "North America",
  "EMEA",
  "APAC / India",
] as const;

export type PartnerRegion = (typeof PARTNER_REGIONS)[number];

export const PARTNER_CAPABILITIES = [
  {
    id: "ai-algorithm",
    title: "AI & Algorithm Partners",
    short: "AI & Algorithms",
    description:
      "Specialized model development and power-optimized algorithms built for the A-Cube architecture — from custom CNNs, RNNs, and LSTMs to analog-aware quantization.",
    journeyIcon: "model",
  },
  {
    id: "firmware-software",
    title: "Firmware & Software Partners",
    short: "Firmware & Software",
    description:
      "Embedded firmware, RTOS integration, and application software tuned to extract maximum efficiency from GPX silicon.",
    journeyIcon: "firmware",
  },
  {
    id: "hardware-board",
    title: "Hardware & Board Design Partners",
    short: "Hardware & Boards",
    description:
      "Custom board and system design around GPX10 — power, layout, sensor integration, and signal integrity.",
    journeyIcon: "hardware",
  },
  {
    id: "design-odm",
    title: "Design Houses & ODMs",
    short: "Design Houses & ODMs",
    description:
      "End-to-end product design that takes a concept to a manufacturable product built around the GPX platform.",
    journeyIcon: "product",
  },
  {
    id: "ems-manufacturing",
    title: "EMS & Manufacturing Partners",
    short: "EMS & Manufacturing",
    description:
      "Volume manufacturing and assembly, ready to build GPX-based hardware at scale.",
    journeyIcon: "manufacturing",
  },
] as const;

export type PartnerCapabilityId =
  (typeof PARTNER_CAPABILITIES)[number]["id"];

export const GPX_BADGES = [
  "Published Reference Design",
  "Model Zoo Contributor",
  "Volume Manufacturing",
] as const;

export type GpxBadge = (typeof GPX_BADGES)[number];

export type Partner = {
  name: string;
  monogram: string;
  icon?: string;
  capability: PartnerCapabilityId;
  region: PartnerRegion;
  badges: GpxBadge[];
  oneLiner: string;
};

export const PARTNERS: Partner[] = [
  {
    name: "Axiom Neural Systems",
    monogram: "AN",
    icon: "/partners/icons_partners/1.svg",
    capability: "ai-algorithm",
    region: "North America",
    badges: ["Model Zoo Contributor"],
    oneLiner:
      "Custom CNNs and analog-aware quantization tuned for A-Cube.",
  },
  {
    name: "Forge Firmware Studio",
    monogram: "FF",
    icon: "/partners/icons_partners/2.svg",
    capability: "firmware-software",
    region: "EMEA",
    badges: [],
    oneLiner:
      "RTOS integration and power-tuned application firmware for GPX silicon.",
  },
  {
    name: "NorthBoard Design",
    monogram: "NB",
    icon: "/partners/icons_partners/3.svg",
    capability: "hardware-board",
    region: "North America",
    badges: ["Published Reference Design"],
    oneLiner:
      "Production board design around GPX10's exact power and space envelope.",
  },
  {
    name: "Momentum ODM",
    monogram: "MO",
    icon: "/partners/icons_partners/4.svg",
    capability: "design-odm",
    region: "APAC / India",
    badges: [],
    oneLiner:
      "End-to-end product design from concept to manufacturable GPX products.",
  },
  {
    name: "Vertex Assembly Group",
    monogram: "VA",
    icon: "/partners/icons_partners/5.svg",
    capability: "ems-manufacturing",
    region: "APAC / India",
    badges: ["Volume Manufacturing"],
    oneLiner:
      "Volume manufacturing and assembly for GPX-based hardware at scale.",
  },
  {
    name: "Lumen Edge Works",
    monogram: "LE",
    icon: "/partners/icons_partners/6.svg",
    capability: "ai-algorithm",
    region: "EMEA",
    badges: ["Model Zoo Contributor", "Published Reference Design"],
    oneLiner:
      "Deployable networks shipping in the Ambient Model Zoo, proven on A-Cube.",
  },
];

export const PARTNERS_HERO = {
  tag: "Partner Ecosystem",
  title: "You bring the vision.\nOur partners help you\nbuild it.",
  subtitle:
    "Building an AI product takes more than a breakthrough chip — it takes specialized algorithms, tuned firmware, custom hardware, and manufacturing at scale. Ambient’s partner ecosystem brings world-class expertise across the entire stack, already fluent in the GPX platform, wherever you build.",
  primaryCta: { label: "Find a Partner", href: "#directory" },
  secondaryCta: { label: "Become a Partner", href: "#become-a-partner" },
};

export const PARTNERS_WHY = {
  tag: "The Why",
  heading: "A breakthrough processor is the start, not the finish.",
  subheading:
    "From algorithms to manufacturing, a great AI product spans the whole stack. Bring your strengths; our partners bring theirs — so every layer moves at full speed.",
  body: "The hard part of an AI product was never just the chip. It’s the specialized model that has to run inside a microwatt budget, the firmware tuned to squeeze out every last drop of efficiency, the board designed around tight power and space constraints, and the manufacturing partner who can build it at volume without surprises. A gap in any one of these can cost a roadmap months. You shouldn’t have to master all of them to ship.",
  journey: [
    {
      number: "01",
      title: "MODEL",
      description: "Specialized model development and power-optimized algorithms built for the A-Cube architecture — from custom CNNs, RNNs, and LSTMs to analog-aware quantization.",
      image: "/partners/svg 2/7.svg",
    },
    {
      number: "02",
      title: "FIRMWARE",
      description: "Embedded firmware, RTOS integration, and application software tuned to extract maximum efficiency from GPX silicon.",
      image: "/partners/svg 2/8.svg",
    },
    {
      number: "03",
      title: "HARDWARE / BOARD",
      description: "Custom board and system design around GPX10 — power, layout, sensor integration, and signal integrity.",
      image: "/partners/svg 2/9.svg",
    },
    {
      number: "04",
      title: "MANUFACTURING",
      description: "Volume manufacturing and assembly, ready to build GPX-based hardware at scale.",
      image: "/partners/svg 2/10.svg",
    },
    {
      number: "05",
      title: "PRODUCT",
      description: "End-to-end product design that takes a concept to a manufacturable product built around the GPX platform.",
      image: "/partners/svg 2/11.svg",
    },
  ],
  legendStrong: "Your in-house strengths",
  legendGap: "The gaps partners fill",
};

export const PARTNERS_BENEFITS = {
  tag: "The Payoff",
  heading: "Ship faster. De-risk everything. Stay focused on what makes you, you.",
  subheading:
    "A partner who already knows the GPX platform turns months of trial-and-error into a running start.",
  cards: [
    {
      title: "Faster to market",
      description:
        "Skip the slow ramp. With GPX-ready partners already in motion, you move from concept to production much faster.",
      icon: "/partners/icons_benefits/timer-02.svg" as const,
    },
    {
      title: "Higher success rate",
      description:
        "Cut the false starts. Proven designs and real platform experience help you avoid re-spins, delays, and expensive surprises.",
      icon: "/partners/icons_benefits/auto-conversations.svg" as const,
    },
    {
      title: "Lower development risk",
      description:
        "De-risk the hard parts. From analog-aware tuning to manufacturing realities, expert partners help keep your roadmap intact.",
      icon: "/partners/icons_benefits/chart-line-data-03.svg" as const,
    },
    {
      title: "Focus on your edge",
      description:
        "Own the part that matters. You build the differentiation. Our partners take care of the surrounding stack that gets you there.",
      icon: "/partners/icons_benefits/center-focus.svg" as const,
    },
  ],
  bridge: "One ecosystem, engineered to get you to market — not to slow you down.",
};

export const PARTNERS_ECOSYSTEM = {
  tag: "The Ecosystem",
  heading: "Expertise across the entire stack.",
  subheading:
    "Whatever piece you’re missing, there’s a partner who has already solved it on GPX.",
  bridge:
    "Enter the ecosystem at any layer — and get the collaborative support to accelerate your roadmap.",
};

export const PARTNERS_PROOF = {
  tag: "GPX-Native Proof",
  heading: "Not generalists. GPX-native.",
  subheading:
    "These aren’t firms we found in a directory. They’ve already built on the Ambient platform — and the proof is live.",
  points: [
    {
      title: "Reference designs, not blank pages.",
      description:
        "GPX10 reference designs from partners your team can rely on instead of starting from scratch.",
      icon: "/partners/icons_proof/web-design-02.svg",
    },
    {
      title: "Models proven on A-Cube.",
      description:
        "Partner-built models ship in the Ambient Model Zoo — real, deployable networks, already running on the architecture.",
      icon: "/partners/icons_proof/cube.svg",
    },
    {
      title: "Hardware built for the silicon.",
      description:
        "Partners have designed production hardware around GPX10 — boards engineered for its exact power and space envelope.",
      icon: "/partners/icons_proof/chip.svg",
    },
    {
      title: "Proven at volume.",
      description:
        "That hardware has gone into volume manufacturing — GPX-based products built at scale, not just prototyped.",
      icon: "/partners/icons_proof/global.svg",
    },
  ],
  links: [
    { label: "Explore Partner Reference Designs", href: "/resources" },
    { label: "Browse the Model Zoo", href: "/developer" },
  ],
};

export const PARTNERS_DIRECTORY = {
  tag: "Partner Directory",
  heading: "Find your partner.",
  subheading:
    "World-class teams, experienced on GPX, across every region you build in.",
  filters: {
    capability: "Filter by Capability",
    region: "Filter by Region",
    all: "All",
  },
  expanding: {
    title: "Expanding — more partners joining",
    description:
      "New capability areas and regions are being added as the ecosystem grows.",
  },
  noMatch: {
    message: "Don’t see the right fit yet? Tell us what you need — we’ll connect you.",
    cta: { label: "Get Matched", href: "#get-matched" },
  },
  connect: "Connect",
  bridge: "One ecosystem. Global reach. Local support.",
};

export const PARTNERS_MATCH = {
  tag: "Get Matched",
  heading: "Not sure who you need? We’ll connect you.",
  subheading:
    "Tell us where you need help, and we’ll introduce you to the right partner on the GPX platform.",
  submitLabel: "Request an Introduction",
  confirmation: "Got it. We’ll connect you with the right partner shortly.",
  fields: {
    firstName: "First name",
    lastName: "Last name",
    company: "Company",
    email: "Corporate email",
    region: "Region",
    helpAreas: "Where do you need help?",
    message: "Tell us about your project",
  },
  emailHint: "Personal email domains (gmail, outlook, …) are blocked — please use your work address.",
};

export const PARTNERS_BECOME = {
  tag: "Become a Partner",
  heading: "Build with us. Grow with the platform.",
  subheading:
    "Join a growing ecosystem building the future of AI on Ambient — and get in front of customers actively looking for your expertise.",
  benefits: [
    {
      title: "Reach the right customers.",
      description:
        "Get discovered by teams building on GPX who need exactly what you do.",
      icon: "/partners/icons_become/internet.svg" as const,
    },
    {
      title: "Early access & enablement.",
      description:
        "Get early access to Ambient silicon, tools, and hands-on technical enablement.",
      icon: "/partners/icons_become/access.svg" as const,
    },
    {
      title: "Showcase your work.",
      description:
        "Co-develop reference designs and Model Zoo contributions that put your expertise on display.",
      icon: "/partners/icons_become/rss.svg" as const,
    },
  ],
  lookingFor: {
    title: "Who we’re looking for",
    description:
      "AI and algorithm teams, firmware and software houses, hardware and board designers, ODMs, EMS providers, and system integrators ready to build on the Ambient platform.",
    chips: [
      "AI & Algorithm Teams",
      "Firmware & Software Houses",
      "Hardware & Board Designers",
      "ODMs",
      "EMS Providers",
      "System Integrators",
    ],
  },
  form: {
    title: "Apply to the ecosystem",
    name: "Your name",
    company: "Company",
    website: "Website",
    email: "Work email",
    region: "Region",
    capabilities: "Capability area(s)",
    experience: "What you’d bring / relevant experience",
    submit: "Apply to Become a Partner",
    confirmation: "Application received. Our partnerships team will be in touch.",
  },
  secondaryCta: { label: "Talk to Our Partnerships Team", href: "/contact" },
};

export const PARTNERS_FOOTER_CTAS = {
  heading: "The vision is yours. The ecosystem is here.",
  primary: { label: "Find a Partner", href: "#directory" },
  secondary: { label: "Become a Partner", href: "#become-a-partner" },
};

/** Casual email domains blocked on partner forms (corporate email required). */
export const BLOCKED_EMAIL_DOMAINS = [
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "ymail.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "msn.com",
  "icloud.com",
  "me.com",
  "aol.com",
  "protonmail.com",
  "proton.me",
  "mail.com",
  "gmx.com",
  "zoho.com",
  "yandex.com",
  "qq.com",
  "163.com",
];

export function isCasualEmailDomain(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  if (!domain) return false;
  return BLOCKED_EMAIL_DOMAINS.includes(domain);
}
