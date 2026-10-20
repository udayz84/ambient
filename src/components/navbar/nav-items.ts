export type NavSubItem = {
  label: string;
  href: string;
  /** Optional icon URL (used by application pages uploaded in the CMS). */
  icon?: string;
  disabled?: boolean;
  comingSoon?: boolean;
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

export const HARDCODED_COMING_SOON_APPLICATIONS: NavSubItem[] = [
  { label: "Drones", href: "#", disabled: true, comingSoon: true },
  { label: "Robotics", href: "#", disabled: true, comingSoon: true },
  { label: "Automotives", href: "#", disabled: true, comingSoon: true },
  { label: "Medical", href: "#", disabled: true, comingSoon: true },
];

const APPLICATION_PARENT_LABELS = new Set(["application", "applications"]);

/**
 * Replace the children of the "Application(s)" nav item with the ones derived
 * from the collection, and append hardcoded Coming Soon items under them.
 */
export function mergeApplicationNavItems(
  navItems: NavItem[],
  applicationPages: ApplicationPageSummary[] | undefined | null,
): NavItem[] {
  if (!Array.isArray(navItems)) return [];

  const baseChildren =
    Array.isArray(applicationPages) && applicationPages.length > 0
      ? buildApplicationChildren(applicationPages)
      : undefined;

  return navItems.map((item) => {
    if (!APPLICATION_PARENT_LABELS.has(item.label.toLowerCase().trim())) {
      return item;
    }
    const strapiChildren = baseChildren ?? item.children ?? [];
    const existingLabels = new Set(
      strapiChildren.map((c) => c.label.toLowerCase().trim())
    );
    const comingSoonToAdd = HARDCODED_COMING_SOON_APPLICATIONS.filter(
      (cs) => !existingLabels.has(cs.label.toLowerCase().trim())
    );

    const children = [...strapiChildren, ...comingSoonToAdd];

    return {
      ...item,
      hasChevron: true,
      children,
    };
  });
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

export const MEGA_ICON_BY_TITLE: Record<string, string> = {
  processors: "/navbar/dropdown-icon-chip.svg",
  "system-on-modules": "/navbar/dropdown-icon-som.svg",
  som: "/navbar/dropdown-icon-som.svg",
  "evaluation kits": "/navbar/dropdown-icon-devkit.svg",
  dvk: "/navbar/dropdown-icon-devkit.svg",
  "model zoo": "/navbar/dropdown-icon-chip.svg",
};

export const MEGA_ICON_FALLBACK = "/navbar/dropdown-icon-chip.svg";

export function megaIconFor(title?: string): string {
  const key = (title || "").toLowerCase().trim();
  return MEGA_ICON_BY_TITLE[key] || MEGA_ICON_FALLBACK;
}

export const DEFAULT_MEGA_COLUMNS: NavMegaColumn[] = [
  {
    title: "Processors",
    description: undefined,
    links: [
      { label: "GPX10PRO", href: "/products" },
      { label: "GPX40", href: "#", disabled: true, comingSoon: true },
    ],
    ctaLabel: undefined,
    ctaHref: undefined,
  },
  {
    title: "System-on-Modules",
    description: "Drop-in reference modules for rapid product development",
    links: [],
    ctaLabel: "View all SOMs",
    ctaHref: "/SOM",
  },
  {
    title: "Evaluation Kits",
    description: "Plug-and-play boards to test your models quickly",
    links: [],
    ctaLabel: "View Evaluation Kits",
    ctaHref: "/dvk",
  },
  {
    title: "Model Zoo",
    description: "Pre-trained models ready for deployment on Ambient AI processors.",
    links: [],
    ctaLabel: "View Model Zoo",
    ctaHref: "/model-zoo",
  },
];

export function getProductsColumns(columns?: NavMegaColumn[]): NavMegaColumn[] {
  const cols = columns?.length ? [...columns] : [...DEFAULT_MEGA_COLUMNS];
  if (!cols.some((c) => c.title.toLowerCase().includes("model"))) {
    cols.push({
      title: "Model Zoo",
      description: "Pre-trained models ready for deployment on Ambient AI processors.",
      links: [],
      ctaLabel: "View Model Zoo",
      ctaHref: "/model-zoo",
    });
  }
  return cols;
}

export const NAV_ICON_BY_LABEL: Record<string, string> = {
  company: "/navbar/nav-icon-company.svg",
  careers: "/navbar/nav-icon-careers.svg",
  application: "/navbar/nav-icon-chip.svg",
  applications: "/navbar/nav-icon-chip.svg",
  wearables: "/navbar/nav-icon-wearables.svg",
  "smart homes": "/navbar/nav-icon-smart-homes.svg",
  "medical devices": "/navbar/nav-icon-medical.svg",
  medical: "/navbar/nav-icon-medical.svg",
  drones: "/navbar/nav-icon-chip.svg",
  robotics: "/navbar/nav-icon-chip.svg",
  automotives: "/navbar/nav-icon-chip.svg",
  automotive: "/navbar/nav-icon-chip.svg",
  "resources centre": "/navbar/nav-icon-chip.svg",
  "resources center": "/navbar/nav-icon-chip.svg",
  resources: "/navbar/nav-icon-chip.svg",
  blogs: "/navbar/nav-icon-blog.svg",
  "news & media": "/navbar/nav-icon-blog.svg",
  "news and media": "/navbar/nav-icon-blog.svg",
  partners: "/navbar/nav-icon-company.svg",
  partner: "/navbar/nav-icon-company.svg",
};

export const NAV_ICON_FALLBACK = "/navbar/nav-icon-chip.svg";

export function navIconFor(
  label?: string,
  href?: string,
  icon?: string
): string {
  // 1. Icon uploaded in the CMS for this application page.
  if (icon) return icon;
  // 2. Application pages from the collection — static icon matched by slug.
  if (href?.startsWith("/applications/")) {
    return applicationIconFor(href.slice("/applications/".length)) || NAV_ICON_FALLBACK;
  }
  const key = (label || "").toLowerCase().trim();
  return NAV_ICON_BY_LABEL[key] || NAV_ICON_FALLBACK;
}

export const DEFAULT_SHOP_ITEM: NavSubItem = {
  label: "Shop",
  href: "https://www.digikey.com/en/supplier-centers/ambient-scientific",
};

