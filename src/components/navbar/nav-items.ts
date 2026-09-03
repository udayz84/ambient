export type NavSubItem = {
  label: string;
  href: string;
};

export type NavMegaColumn = {
  title: string;
  description?: string;
  links: NavSubItem[];
  ctaLabel?: string;
  ctaHref?: string;
};

export type NavItem = {
  label: string;
  hasChevron: boolean;
  href: string;
  highlight?: boolean;
  children?: NavSubItem[];
  megaColumns?: NavMegaColumn[];
};

type RawNavItem = {
  label?: unknown;
  href?: unknown;
  has_dropdown?: unknown;
  highlight?: unknown;
  children?: unknown;
  sub_items?: unknown;
  mega_columns?: unknown;
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

function normalizeHref(href: unknown): string {
  let value = typeof href === "string" && href ? href : "#";
  if (value !== "#" && !value.startsWith("/") && !value.startsWith("http")) {
    value = `/${value}`;
  }
  return value;
}

function mapStrapiMegaColumns(columns: unknown): NavMegaColumn[] | undefined {
  if (!Array.isArray(columns)) return undefined;
  const mapped = (columns as Record<string, unknown>[])
    .map((raw) => {
      const title = typeof raw?.title === "string" ? raw.title : "";
      const links = mapStrapiSubItems(raw?.links, title);
      return {
        title,
        description: typeof raw?.description === "string" && raw.description ? raw.description : undefined,
        links: links ?? [],
        ctaLabel: typeof raw?.cta_label === "string" && raw.cta_label ? raw.cta_label : undefined,
        ctaHref: typeof raw?.cta_href === "string" && raw.cta_href ? normalizeHref(raw.cta_href) : undefined,
      };
    })
    .filter((column) => column.title.length > 0);
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
      const megaColumns = mapStrapiMegaColumns(raw?.mega_columns);

      return {
        label,
        hasChevron: Boolean(raw?.has_dropdown) || Boolean(children?.length),
        href: normalizeHref(raw?.href),
        highlight: Boolean(raw?.highlight),
        ...(children?.length ? { children } : {}),
        ...(megaColumns?.length ? { megaColumns } : {}),
      };
    })
    .filter((item) => item.label.length > 0);
  return mapped;
}
