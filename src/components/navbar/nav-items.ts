export type NavItem = {
  label: string;
  hasChevron: boolean;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Products", hasChevron: true, href: "/products" },
  { label: "Technology", hasChevron: true, href: "/technology" },
  { label: "Applications", hasChevron: true, href: "/applications" },
  { label: "Company", hasChevron: true, href: "/company" },
  { label: "News & Resources", hasChevron: true, href: "/news-listing" },
  { label: "Blog", hasChevron: true, href: "/resources" },
  { label: "Career", hasChevron: false, href: "/careers" },
];
