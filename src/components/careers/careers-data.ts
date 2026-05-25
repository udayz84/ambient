export type CareersValueCard = {
  icon: string;
  title: string;
  description: string;
  titleSize?: "sm" | "lg";
};

export type CareersJob = {
  title: string;
  category: string;
  location: string;
};

export const CAREERS_WORK_CARDS: CareersValueCard[] = [
  {
    icon: "/careers/icon-impact.svg",
    title: "Unprecedented Impact",
    description:
      "Ship silicon that rewrites the power-performance frontier. Your work enables AI capabilities that were physically impossible yesterday.",
  },
  {
    icon: "/careers/icon-depth.svg",
    title: "Pure Technology Depth",
    description:
      "Operate at the intersection of analog circuit design, machine learning architectures, and condensed matter physics. No abstraction layers.",
  },
  {
    icon: "/careers/icon-cocreation.svg",
    title: "Unconstrained Co-Creation",
    description:
      "Build alongside the researchers who invented AIMC. Direct access to founders, zero bureaucracy, full technical autonomy.",
  },
];

export const CAREERS_BENEFITS_CARDS: CareersValueCard[] = [
  {
    icon: "/careers/icon-health.svg",
    title: "Comprehensive Health Coverage",
    description:
      "Medical, dental, and vision insurance for you and your family. Mental health support included.",
    titleSize: "lg",
  },
  {
    icon: "/careers/icon-compensation.svg",
    title: "Competitive Compensation",
    description:
      "Top-of-market salary and significant equity grants. Annual performance reviews with real upside.",
    titleSize: "lg",
  },
  {
    icon: "/careers/icon-equipment.svg",
    title: "Equipment And Tools",
    description:
      "Latest MacBook Pro, external displays, and any specialized hardware or software you need.",
    titleSize: "lg",
  },
  {
    icon: "/careers/icon-office.svg",
    title: "Office Perks",
    description:
      "Daily catered lunch, premium coffee setup, and fully stocked kitchen. Relocation assistance available.",
    titleSize: "lg",
  },
  {
    icon: "/careers/icon-learning.svg",
    title: "Learning Budget",
    description:
      "$5,000 annual budget for conferences, courses, books, and professional development.",
    titleSize: "lg",
  },
  {
    icon: "/careers/icon-pto.svg",
    title: "Unlimited PTO",
    description:
      "Take the time you need. We trust you to manage your work and recharge when necessary.",
    titleSize: "lg",
  },
];

export const CAREERS_JOBS: CareersJob[] = [
  {
    title: "Analog Circuit Design Engineer",
    category: "HARDWARE",
    location: "San Francisco",
  },
  {
    title: "Machine Learning Engineer",
    category: "SOFTWARE",
    location: "San Francisco",
  },
  {
    title: "Mixed-Signal Verification Engineer",
    category: "HARDWARE",
    location: "Remote",
  },
  {
    title: "Physics-Aware ML Researcher",
    category: "RESEARCH",
    location: "San Francisco",
  },
  {
    title: "Silicon Characterization Engineer",
    category: "HARDWARE",
    location: "San Francisco",
  },
  {
    title: "Embedded Systems Engineer",
    category: "SOFTWARE",
    location: "San Francisco",
  },
  {
    title: "Quantization Algorithm Researcher",
    category: "RESEARCH",
    location: "San Francisco",
  },
  {
    title: "ASIC Physical Design Engineer",
    category: "HARDWARE",
    location: "San Francisco",
  },
];
