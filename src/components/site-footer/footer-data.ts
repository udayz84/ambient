export type FooterNavSection = {
  title: string;
  links: { label: string; href: string }[];
  width: number;
  listWidth: number;
  listAlign: "start" | "center";
};

export const FALLBACK_FOOTER_NAV_SECTIONS: FooterNavSection[] = [
  {
    title: "PRODUCTS",
    width: 158,
    listWidth: 134,
    listAlign: "start",
    links: [
      { label: "GPX10", href: "#" },
      { label: "GPX64", href: "#" },
      { label: "Development Kits", href: "#" },
      { label: "ModelForge", href: "#" },
    ],
  },
  {
    title: "SOLUTIONS",
    width: 158,
    listWidth: 158,
    listAlign: "center",
    links: [
      { label: "Medical & Wearables", href: "#" },
      { label: "Smart Home", href: "#" },
      { label: "Industrial IoT", href: "#" },
      { label: "Robotics", href: "#" },
    ],
  },
  {
    title: "Resources",
    width: 158,
    listWidth: 129,
    listAlign: "start",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Case Studies", href: "#" },
      { label: "Technical Papers", href: "#" },
      { label: "News", href: "/news-listing" },
    ],
  },
  {
    title: "Company",
    width: 158,
    listWidth: 98,
    listAlign: "start",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Industrial IoT", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

export type FooterSocialLink = {
  platform: string;
  href: string;
  icon: string;
  label: string;
};

export const FALLBACK_FOOTER_SOCIAL_LINKS: FooterSocialLink[] = [
  { platform: "linkedin", href: "#", icon: "/footer/social-linkedin.svg", label: "LinkedIn" },
  { platform: "x", href: "#", icon: "/footer/social-x.svg", label: "X" },
  { platform: "youtube", href: "#", icon: "/footer/social-youtube.svg", label: "YouTube" },
];

export type FooterLegalLink = { label: string; href: string };

export const FALLBACK_FOOTER_LEGAL_LINKS: FooterLegalLink[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

export const FALLBACK_FOOTER_COPYRIGHT = "© 2026 Ambient AI. All rights reserved.";

export const FALLBACK_FOOTER_CRAFTED_BY_TEXT = "Carefully crafted by";

export const FALLBACK_NEWSLETTER_HEADING_TOP = "Want to stay in the";
export const FALLBACK_NEWSLETTER_HEADING_BOTTOM = "forefront of AI tech.";
export const FALLBACK_NEWSLETTER_SUBTITLE = "Sign up to receive regular updates.";
export const FALLBACK_NEWSLETTER_PLACEHOLDER = "Your Email ID";
export const FALLBACK_NEWSLETTER_BUTTON_LABEL = "SUBSCRIBE";
