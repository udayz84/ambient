export type NavItem = {
  label: string;
  hasChevron: boolean;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Products", hasChevron: true, href: "#" },
  { label: "Technology", hasChevron: true, href: "#" },
  { label: "Applications", hasChevron: true, href: "#" },
  { label: "Company", hasChevron: true, href: "#" },
  { label: "News & Media", hasChevron: true, href: "/resources" },
  { label: "Blog", hasChevron: true, href: "#" },
  { label: "Career", hasChevron: false, href: "#" },
];
