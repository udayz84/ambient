export type NavSubItem = {
  label: string;
  href: string;
  /** Optional icon URL (used by application pages uploaded in the CMS). */
  icon?: string;
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

/* ---------------------------------------------------------------------------
 * Auto-generated "Applications" dropdown children.
 *
 * Published entries of the Strapi `application-pages` collection are turned
 * into dropdown links automatically (label humanized from the slug, sorted
 * alphabetically). Each entry carries its CMS-uploaded `icon` when set; the
 * static keyword-matched icons (APPLICATION_ICON_RULES) are the fallback.
 * ------------------------------------------------------------------------- */

/** Summary of a published application page (slug + optional CMS icon URL). */
export type ApplicationPageSummary = {
  slug: string;
  icon: string | null;
};

/** Labels for known slugs where the raw slug would read poorly. */
const APPLICATION_LABEL_OVERRIDES: Record<string, string> = {
  smarthomes: "Smart Homes",
};

/** Humanize a slug: "smart-homes" -> "Smart Homes", "wearables" -> "Wearables". */
export function applicationLabelFor(slug: string): string {
  const override = APPLICATION_LABEL_OVERRIDES[slug.toLowerCase()];
  if (override) return override;
  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** Build dropdown children from application pages, sorted by label. */
export function buildApplicationChildren(
  pages: ApplicationPageSummary[]
): NavSubItem[] {
  return pages
    .map(({ slug, icon }) => ({
      slug,
      label: applicationLabelFor(slug),
      href: `/applications/${slug}`,
      icon: icon ?? undefined,
    }))
    .sort((a, b) => a.label.localeCompare(b.label))
    .map(({ label, href, icon }) => ({ label, href, icon }));
}

const APPLICATION_PARENT_LABELS = new Set(["application", "applications"]);

/**
 * Replace the children of the "Application(s)" nav item with the ones derived
 * from the collection. When no pages are available (fetch failed / empty), the
 * manually configured Strapi children are kept as-is.
 */
export function mergeApplicationNavItems(
  navItems: NavItem[],
  applicationPages: ApplicationPageSummary[] | undefined | null,
): NavItem[] {
  if (!Array.isArray(navItems)) return [];
  if (!Array.isArray(applicationPages) || applicationPages.length === 0) {
    return navItems;
  }
  const children = buildApplicationChildren(applicationPages);
  return navItems.map((item) =>
    APPLICATION_PARENT_LABELS.has(item.label.toLowerCase())
      ? { ...item, hasChevron: true, children }
      : item
  );
}

/** Keyword-matched icons for auto-generated application entries. */
const APPLICATION_ICON_RULES: { pattern: RegExp; icon: string }[] = [
  { pattern: /wearable|hearable|watch|ring|fitness|band/, icon: "/navbar/nav-icon-wearables.svg" },
  { pattern: /smart[-_]?home|smarthome|home/, icon: "/navbar/nav-icon-smart-homes.svg" },
  { pattern: /medical|health|clinic/, icon: "/navbar/nav-icon-medical.svg" },
];

/**
 * Resolve the nav icon for an application page slug (first keyword match wins,
 * null when no rule matches so callers can apply their fallback).
 */
export function applicationIconFor(slug: string): string | null {
  const key = (slug || "").toLowerCase();
  const rule = APPLICATION_ICON_RULES.find(({ pattern }) => pattern.test(key));
  return rule ? rule.icon : null;
}
