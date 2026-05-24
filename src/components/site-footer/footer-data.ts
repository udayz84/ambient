export type FooterNavSection = {
  title: string;
  links: string[];
  width: number;
  listWidth: number;
  listAlign: "start" | "center";
};

export const FOOTER_NAV_SECTIONS: FooterNavSection[] = [
  {
    title: "PRODUCTS",
    width: 158,
    listWidth: 134,
    listAlign: "start",
    links: ["GPX10", "GPX64", "Development Kits", "ModelForge"],
  },
  {
    title: "SOLUTIONS",
    width: 158,
    listWidth: 158,
    listAlign: "center",
    links: [
      "Medical & Wearables",
      "Smart Home",
      "Industrial IoT",
      "Robotics",
    ],
  },
  {
    title: "Resources",
    width: 158,
    listWidth: 129,
    listAlign: "start",
    links: ["Documentation", "Case Studies", "Technical Papers", "Blog"],
  },
  {
    title: "Company",
    width: 158,
    listWidth: 98,
    listAlign: "start",
    links: ["About", "Careers", "Industrial IoT", "Contact"],
  },
];
