export type NavItem = {
  label: string;
  hasChevron: boolean;
  href: string;
};

export const FALLBACK_NAV_ITEMS: NavItem[] = [
  { label: "Products", hasChevron: true, href: "/products" },
  { label: "Technology", hasChevron: true, href: "/technology" },
  { label: "Applications", hasChevron: true, href: "/applications" },
  { label: "Company", hasChevron: true, href: "/company" },
  { label: "News & Resources", hasChevron: true, href: "/news-listing" },
  { label: "Blog", hasChevron: true, href: "/resources" },
  { label: "Career", hasChevron: false, href: "/careers" },
];

export function mapStrapiNavItems(
  items: unknown[] | null | undefined,
): NavItem[] {
  if (!Array.isArray(items)) return FALLBACK_NAV_ITEMS;
  const mapped = items
    .map((raw: any) => ({
      label: typeof raw?.label === "string" ? raw.label : "",
      hasChevron: Boolean(raw?.has_dropdown),
      href: typeof raw?.href === "string" && raw.href ? raw.href : "#",
    }))
    .filter((item) => item.label.length > 0);
  return mapped.length > 0 ? mapped : FALLBACK_NAV_ITEMS;
}
