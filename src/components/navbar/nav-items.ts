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

type RawNavItem = {
  label?: unknown;
  href?: unknown;
  has_dropdown?: unknown;
  highlight?: unknown;
  children?: unknown;
  sub_items?: unknown;
};

function mapStrapiSubItems(items: unknown, parentLabel?: string): NavSubItem[] | undefined {
  if (!Array.isArray(items)) return undefined;
  const mapped = (items as RawNavItem[])
    .map((raw) => {
      let href = typeof raw?.href === "string" && raw.href ? raw.href : "#";
      
      if (href !== "#" && !href.startsWith("/") && !href.startsWith("http")) {
        const pLabel = parentLabel?.toLowerCase() || "";
        if (pLabel === "application" || pLabel === "applications") {
          href = `/applications/${href}`;
        } else {
          href = `/${href}`;
        }
      }

      return {
        label: typeof raw?.label === "string" ? raw.label : "",
        href,
      };
    })
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
      const children = mapStrapiSubItems(raw?.children, label) ?? mapStrapiSubItems(raw?.sub_items, label);
      let href = typeof raw?.href === "string" && raw.href ? raw.href : "#";

      if (href !== "#" && !href.startsWith("/") && !href.startsWith("http")) {
        href = `/${href}`;
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
