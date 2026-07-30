export type NavSubItem = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  hasChevron: boolean;
  href: string;
  highlight?: boolean;
  children?: NavSubItem[];
};

export const FALLBACK_NAV_ITEMS: NavItem[] = [
  { label: "Home", hasChevron: false, href: "/" },
  {
    label: "Products",
    hasChevron: true,
    href: "/products",
    children: [
      { label: "Product", href: "/products" },
      { label: "SOM", href: "/SOM" },
      { label: "DVK", href: "/dvk" },
    ],
  },
  {
    label: "Company",
    hasChevron: true,
    href: "/company",
    children: [
      { label: "Company", href: "/company" },
      { label: "Careers", href: "/careers" },
    ],
  },
  { label: "Technology", hasChevron: false, href: "/technology" },
  { label: "Developers Hub", hasChevron: false, href: "/developer" },
  {
    label: "Application",
    hasChevron: true,
    href: "/applications",
    children: [
      { label: "Application", href: "/applications" },
      { label: "Wearables", href: "/applications/wearables" },
      { label: "Smart Homes", href: "/applications/smart-homes" },
      { label: "Medical Devices", href: "/applications/medical-devices" },
    ],
  },
  {
    label: "Resources",
    hasChevron: true,
    href: "/resources",
    children: [
      { label: "Resources Centre", href: "/resources" },
      { label: "Blogs", href: "/resources" },
      { label: "News & Media", href: "/news-listing" },
    ],
  },
  { label: "Shop", hasChevron: false, href: "https://www.digikey.com/en/supplier-centers/ambient-scientific", highlight: true },
];

type RawNavItem = {
  label?: unknown;
  href?: unknown;
  has_dropdown?: unknown;
  highlight?: unknown;
  children?: unknown;
  sub_items?: unknown;
};

function mapStrapiSubItems(items: unknown): NavSubItem[] | undefined {
  if (!Array.isArray(items)) return undefined;
  const mapped = (items as RawNavItem[])
    .map((raw) => ({
      label: typeof raw?.label === "string" ? raw.label : "",
      href: typeof raw?.href === "string" && raw.href ? raw.href : "#",
    }))
    .filter((item) => item.label.length > 0);
  return mapped.length > 0 ? mapped : undefined;
}

export function mapStrapiNavItems(
  items: unknown[] | null | undefined,
): NavItem[] {
  if (!Array.isArray(items)) return [];
  const mapped = (items as RawNavItem[])
    .map((raw) => {
      const label = typeof raw?.label === "string" ? raw.label : "";
      const children = mapStrapiSubItems(raw?.children) ?? mapStrapiSubItems(raw?.sub_items);
      let href = typeof raw?.href === "string" && raw.href ? raw.href : "#";
      
      if (label.toLowerCase() === "shop") {
        href = "https://www.digikey.com/en/supplier-centers/ambient-scientific";
      }

      return {
        label,
        hasChevron: Boolean(raw?.has_dropdown) || Boolean(children?.length),
        href,
        highlight: Boolean(raw?.highlight),
        ...(children?.length ? { children } : {}),
      };
    })
    .filter((item) => item.label.length > 0);
  return mapped;
}
