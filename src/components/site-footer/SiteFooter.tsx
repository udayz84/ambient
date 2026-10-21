import { gilroyMedium, gilroyBold, interRegular, interMedium, interLight } from "../hero/fonts";
import {
  FALLBACK_FOOTER_NAV_SECTIONS,
  FALLBACK_FOOTER_SOCIAL_LINKS,
  FALLBACK_FOOTER_LEGAL_LINKS,
  FALLBACK_FOOTER_COPYRIGHT,
  FALLBACK_FOOTER_CRAFTED_BY_TEXT,
  type FooterNavSection,
  type FooterSocialLink,
  type FooterLegalLink,
} from "./footer-data";
import { NewsletterSignup } from "./NewsletterSignup";
import { mediaUrl } from "@/lib/strapi";

function normalizeFooterUrl(rawHref: unknown, fallback: string = "#"): string {
  if (typeof rawHref !== "string") return fallback;
  let href = rawHref.trim();
  if (!href || href === "#") return fallback;

  // Strip hardcoded staging domain or localhost from redirection URLs
  href = href.replace(/^https?:\/\/slpgtae2b5emmhjak56tc7j6\.178\.236\.185\.20\.sslip\.io/i, "");
  href = href.replace(/^https?:\/\/localhost(:\d+)?/i, "");
  href = href.replace(/^https?:\/\/127\.0\.0\.1(:\d+)?/i, "");

  if (!href) return "/";

  // If it is a relative path without leading slash, ensure it starts with /
  if (!/^(https?:|\/\/|mailto:|tel:|#)/i.test(href) && !href.startsWith("/")) {
    href = `/${href}`;
  }

  return href;
}

export function SiteFooter({
  showNewsletter = false,
  isContactPage = false,
  isCareersPage = false,
  isResourcesPage = false,
  isOverlapPage = false,
  pathname = "",
  data,
  newsletterData,
}: {
  showNewsletter?: boolean;
  isContactPage?: boolean;
  isCareersPage?: boolean;
  isResourcesPage?: boolean;
  isOverlapPage?: boolean;
  pathname?: string;
  data?: Record<string, unknown>;
  brandData?: Record<string, unknown>;
  newsletterData?: Record<string, unknown>;
}) {
  const isPartnersPage = pathname === "/partners";

  // ---- Mobile layout system ----
  // Each overlap page's final section pulls the footer up behind itself with a
  // negative bottom margin. That hidden zone must contain NOTHING (pure black):
  // no art, no content. Everything visible starts below it.
  // Pull values (mobile): 700px = technology/products/applications/dvk,
  // 250px = som/partners.
  const mobileOverlapPx = !isOverlapPage
    ? 0
    : isPartnersPage || pathname === "/som"
      ? 250
      : 700;

  // Mobile content top padding, measured from the top of the VISIBLE zone
  // (i.e. below the hidden overlap zone handled by the spacer above).
  const mobileContentPadding = isOverlapPage
    ? isPartnersPage
      ? "pt-[50px]"
      : "pt-[0px]"
    : isResourcesPage
      ? "pt-[160px]"
      : isCareersPage || isContactPage
        ? "pt-[376px]"
        : showNewsletter
          ? "pt-[100px]"
          : "pt-[24px]";

  const rawNavSections = (data?.nav_sections as Record<string, unknown>[] | undefined) ?? [];
  const navSections: FooterNavSection[] =
    Array.isArray(rawNavSections) && rawNavSections.length > 0
      ? rawNavSections.map((section, index) => {
          const fallback = FALLBACK_FOOTER_NAV_SECTIONS[index];
          const rawLinks = (section?.links as Record<string, unknown>[] | undefined) ?? [];
          return {
            title: typeof section?.title === "string" ? section.title : fallback?.title || "",
            width: fallback?.width ?? 158,
            listWidth: fallback?.listWidth ?? 158,
            listAlign: fallback?.listAlign ?? "start",
            links: Array.isArray(rawLinks)
              ? rawLinks
                  .map((link) => ({
                    label: typeof link?.label === "string" ? link.label.trim() : "",
                    href: normalizeFooterUrl(link?.href),
                  }))
                  .filter((link) => link.label)
              : fallback?.links ?? [],
          };
        })
      : FALLBACK_FOOTER_NAV_SECTIONS;

  const rawSocialLinks = (data?.social_links as Record<string, unknown>[] | undefined) ?? [];
  const socialLinks: FooterSocialLink[] =
    Array.isArray(rawSocialLinks) && rawSocialLinks.length > 0
      ? rawSocialLinks
          .map((raw, index) => {
            const fallback = FALLBACK_FOOTER_SOCIAL_LINKS[index];
            const platform = String(raw?.platform || fallback?.platform || "social").toLowerCase();
            const match = FALLBACK_FOOTER_SOCIAL_LINKS.find((s) => s.platform === platform);
            return {
              platform,
              href: normalizeFooterUrl(raw?.href, fallback?.href || "#"),
              icon: mediaUrl(raw?.icon as Parameters<typeof mediaUrl>[0]) || match?.icon || fallback?.icon || "/footer/social-linkedin.svg",
              label: match?.label || fallback?.label || platform,
            };
          })
          .filter((s): s is FooterSocialLink => Boolean(s))
      : FALLBACK_FOOTER_SOCIAL_LINKS;

  const rawLegalLinks = (data?.legal_links as Record<string, unknown>[] | undefined) ?? [];
  const legalLinks: FooterLegalLink[] =
    Array.isArray(rawLegalLinks) && rawLegalLinks.length > 0
      ? rawLegalLinks
          .map((raw) => ({
            label: typeof raw?.label === "string" ? raw.label.trim() : "",
            href: normalizeFooterUrl(raw?.href),
          }))
          .filter((link): link is FooterLegalLink => Boolean(link.label))
      : FALLBACK_FOOTER_LEGAL_LINKS;

  const copyrightText = (typeof data?.copyright_text === "string" ? data.copyright_text : null) || FALLBACK_FOOTER_COPYRIGHT;
  const craftedByText = (typeof data?.crafted_by_text === "string" ? data.crafted_by_text : null) || FALLBACK_FOOTER_CRAFTED_BY_TEXT;
  const craftedByLogoSrc = mediaUrl(data?.crafted_by_logo as Parameters<typeof mediaUrl>[0]) || null;
  const siteName = "ambient";

  return (
    <footer
      className="relative flex h-auto w-full flex-col justify-start overflow-hidden bg-black lg:block lg:h-[1252px] lg:min-h-0 lg:justify-center"
      data-node-id="2379:784"
      data-name="footer"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 overflow-hidden">
          {/* Mobile Background (<600px) */}
          <div
            className="absolute inset-x-0 w-full min-[600px]:hidden"
            style={{
              top: mobileOverlapPx > 0 ? `${mobileOverlapPx}px` : "0px",
              bottom: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async"
              alt=""
              src="/footer/footer-mobile-bg.webp"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </div>
          {/* Tablet & Desktop Background (>=600px) */}
          <div className="hidden min-[600px]:block absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async"
              alt=""
              src="/footer/footer-bg.webp"
              className="absolute left-1/2 top-0 h-full min-h-[900px] w-full min-w-[1024px] -translate-x-1/2 object-cover object-top"
            />
          </div>
        </div>
        {/* Mobile overlay */}
        <div
          className="absolute inset-x-0 bg-gradient-to-b from-[rgba(0,0,0,0.2)] to-transparent min-[600px]:hidden"
          style={{
            top: mobileOverlapPx > 0 ? `${mobileOverlapPx}px` : "0px",
            bottom: 0,
          }}
        />
        {/* Tablet & Desktop top gradient overlay for smooth blend with overlap */}
        <div className="absolute inset-0 hidden min-[600px]:block bg-gradient-to-b from-black/90 via-black/20 to-black/40 pointer-events-none" />
      </div>

      {/* Hidden overlap spacer — sits behind the page's merged final section */}
      {mobileOverlapPx > 0 && (
        <div
          aria-hidden
          className={`w-full lg:hidden min-[600px]:h-[calc(600px*var(--tablet-zoom,0.5333))] ${
            isPartnersPage || pathname === "/som" ? "h-[250px]" : "h-[700px]"
          }`}
        />
      )}

      {/* Tablet spacer for CTA / card-hang pages (Careers, Contact, Resources) */}
      {(isCareersPage || isContactPage || isResourcesPage) && (
        <div
          aria-hidden
          className="w-full hidden min-[600px]:block lg:hidden min-[600px]:h-[calc(550px*var(--tablet-zoom,0.5333))]"
        />
      )}

      <div className={`relative mx-auto flex h-full w-full max-w-[1440px] flex-col items-center pb-0 pt-[24px] min-[600px]:pt-[40px] lg:block lg:pt-0 lg:pb-0 ${mobileContentPadding}`}>
        {showNewsletter && (
          <div className="relative z-[1] mb-[80px] flex flex-col items-center lg:mb-0 lg:pt-[120px]">
            <NewsletterSignup data={newsletterData} />
          </div>
        )}

      <nav
        className="relative z-[1] flex w-full max-w-[960px] flex-col px-[20px] text-white min-[600px]:grid min-[600px]:grid-cols-2 min-[600px]:gap-x-[56px] min-[600px]:gap-y-[36px] min-[600px]:px-[40px] min-[900px]:grid-cols-4 min-[900px]:gap-x-[32px] lg:absolute lg:top-[626px] lg:left-1/2 lg:-translate-x-1/2 lg:flex lg:flex-row lg:items-start lg:justify-between lg:px-0 lg:gap-0"
        aria-label="Footer"
        data-node-id="3572:7314"
      >
        {navSections.map((section, sectionIndex) => (
          <div
            key={section.title}
            className={`group flex w-full flex-col min-[600px]:mt-0 lg:w-[158px] lg:shrink-0 ${
              sectionIndex > 0 ? "mt-[10px] min-[600px]:mt-0" : ""
            } ${
              sectionIndex < navSections.length - 1
                ? "border-b border-white/20 pb-[10px] min-[600px]:border-none min-[600px]:pb-0"
                : ""
            }`}
          >
            <input
              type="checkbox"
              id={`footer-nav-${section.title}`}
              className="peer hidden"
              defaultChecked={section.title === "PRODUCTS"}
            />
            <label
              htmlFor={`footer-nav-${section.title}`}
              className="flex h-[25px] cursor-pointer items-center justify-between min-[600px]:h-auto min-[600px]:cursor-default min-[600px]:justify-start lg:justify-center peer-checked:[&_.footer-icon-plus]:hidden peer-checked:[&_.footer-icon-minus]:block"
            >
              <p
                className={`${interMedium.className} w-full text-[14px] leading-[1.4] font-medium tracking-[0.56px] whitespace-nowrap text-white/60 uppercase not-italic overflow-hidden text-ellipsis min-[600px]:text-[12px] min-[600px]:tracking-[0.48px] min-[600px]:text-left lg:text-[10px] lg:tracking-[0.4px] lg:text-center`}
              >
                {section.title}
              </p>
              <span className="flex h-[25px] items-center justify-center min-[600px]:hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async" src="/footer/accordion-plus.svg" alt="" className="footer-icon-plus block h-[25px] w-[24px]" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async" src="/footer/accordion-minus.svg" alt="" className="footer-icon-minus hidden h-[24px] w-[24px]" />
              </span>
            </label>
            <ul
              className={`hidden flex-col items-start gap-[12px] text-[16px] leading-[1.4] mt-[9px] peer-checked:flex min-[600px]:!flex min-[600px]:mt-[16px] min-[600px]:gap-[10px] lg:mt-[24px] lg:mb-0 lg:text-[14px] lg:${section.listAlign === "center" ? "items-center" : "items-start"} ${sectionIndex < navSections.length - 1 ? "peer-checked:mb-[-2px] min-[600px]:mb-0" : ""}`}
            >
              {section.links.map((link) => (
                <li key={link.label} className="w-full text-left lg:text-center">
                  <a
                    href={link.href}
                    className={`${interRegular.className} block max-w-full font-normal whitespace-nowrap text-white/90 hover:text-white not-italic overflow-hidden text-ellipsis transition-colors text-[14px]`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="relative z-[1] mt-[44px] flex w-full max-w-[1240px] flex-col items-start justify-center gap-[24px] px-[20px] min-[600px]:mt-[56px] min-[600px]:px-[40px] min-[900px]:flex-row min-[900px]:items-end min-[900px]:justify-between min-[900px]:gap-[32px] lg:absolute lg:top-[932px] lg:left-0 lg:mt-0 lg:px-[130px]">

        {/* Left Side */}
        <div className="flex w-full flex-col items-start gap-[20px] min-[600px]:flex-row min-[600px]:items-center min-[600px]:gap-[28px] min-[900px]:w-auto min-[900px]:items-end lg:gap-[22px]">
          {/* Socials Block */}
          <div className="flex w-full flex-row items-center justify-start gap-[14px] min-[600px]:w-auto min-[600px]:flex-col min-[600px]:items-start min-[600px]:gap-[12px] lg:gap-[22px]">
            {/* Mobile: Inter Medium 12px / Desktop: Gilroy Medium 10px (Figma 3572:7338) */}
            <p className={`${interMedium.className} text-[12px] leading-[1.4] font-medium tracking-[0.48px] uppercase text-white/60 not-italic min-[600px]:hidden`}>
              CONNECT WITH US
            </p>
            <p className={`${gilroyMedium.className} hidden text-[10px] leading-[1.4] font-medium tracking-[0.4px] uppercase text-white/60 not-italic min-[600px]:block`}>
              CONNECT WITH US
            </p>
            <div className="flex items-center justify-start gap-[20px] pt-px min-[600px]:gap-[24px] lg:gap-[32px] lg:pt-0">
              {socialLinks.map((social) => (
                <a key={social.platform} href={social.href} aria-label={social.label} className="block size-[24px] transition-opacity hover:opacity-80">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" src={social.icon} alt="" className="block size-full object-contain" />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile divider */}
          <div aria-hidden className="h-0 w-full border-t border-white/20 min-[600px]:hidden" />

          {/* Separator */}
          <div className="hidden h-[25px] w-px bg-white/20 min-[600px]:mb-[4px] min-[600px]:block" />

          {/* Legal Links Block */}
          <div className="flex w-full flex-col items-start min-[600px]:w-auto min-[600px]:gap-[12px] lg:gap-[22px]">
            {/* Mobile: Inter Medium 12px / Desktop: Gilroy Medium 10px (Figma 3572:7348) */}
            <p className={`${interMedium.className} text-[12px] leading-[1.4] font-medium tracking-[0.48px] uppercase text-white/60 not-italic min-[600px]:hidden`}>
              LEGAL PAGES
            </p>
            <p className={`${gilroyMedium.className} hidden text-[10px] leading-[1.4] font-medium tracking-[0.4px] uppercase text-white/60 not-italic min-[600px]:block`}>
              LEGAL PAGES
            </p>
            {/* Figma grid: links 27px below label top (label 16.8px tall) */}
            <div className="mt-[10.2px] flex flex-row flex-wrap items-center justify-start gap-[8px] min-[600px]:mt-0 lg:pb-[4px]">
              {legalLinks.map((link, idx) => (
                <span key={link.label} className="flex items-center gap-[8px]">
                  {idx > 0 && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img loading="lazy" decoding="async" src="/footer/dot-separator.svg" alt="" className="block h-[4px] w-[5px]" />
                  )}
                  <a href={link.href} className={`${interRegular.className} max-w-full text-[14px] leading-[1.4] text-white/90 hover:text-white lg:text-[#E4E4E4] transition-colors [word-break:break-word]`}>{link.label}</a>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex w-full flex-row items-center justify-between gap-[22px] min-[900px]:w-auto min-[900px]:justify-start min-[900px]:gap-[48px] lg:pb-[4px]">
          <p className={`${interRegular.className} text-[10px] leading-[1.3] text-[rgba(255,255,255,0.8)] overflow-hidden text-ellipsis whitespace-nowrap min-[600px]:text-[12px]`}>
            {copyrightText}
          </p>
          <CraftedByAttribution text={craftedByText} logoSrc={craftedByLogoSrc} />
        </div>
      </div>

      <div className="relative z-[1] mt-[20px] min-[600px]:mt-[36px] flex w-full justify-center pb-[24px] lg:hidden">
        <p
          aria-hidden
          data-node-id="3572:7371"
          className={`${gilroyBold.className} bg-clip-text text-[90px] min-[600px]:text-[160px] min-[900px]:text-[220px] leading-none font-bold tracking-[-2px] min-[600px]:tracking-[-4px] whitespace-nowrap text-transparent opacity-30 not-italic select-none pointer-events-none`}
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(46,76,38,0.4), #ddf5d3 50%, rgba(46,76,38,0.4))",
          }}
        >
          {siteName}
        </p>
      </div>

      <p
        aria-hidden
        className={`${gilroyBold.className} pointer-events-none absolute bottom-[-15px] left-1/2 -translate-x-1/2 bg-clip-text text-[110px] leading-none font-bold tracking-[-2px] whitespace-nowrap text-[transparent] opacity-[0.15] hidden lg:block lg:top-[1040px] lg:bottom-auto lg:left-[calc(50%-568px)] lg:translate-x-0 lg:text-[300px] lg:tracking-[-6px] lg:opacity-30 not-italic select-none`}
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(46,76,38,0.4), #ddf5d3 50%, rgba(46,76,38,0.4))",
        }}
        data-node-id="2379:785"
      >
        {siteName}
      </p>
      </div>
    </footer>
  );
}

function CraftedByAttribution({
  text,
}: {
  text: string;
  logoSrc: string | null;
}) {
  return (
    <div className="flex items-start gap-0 lg:items-center lg:gap-[4px]">
      {/* Mobile: Inter Regular 10px white (Figma 3572:7358) / Desktop: Inter Light 12px 80% */}
      <p
        className={`${interRegular.className} text-[10px] leading-[1.3] font-normal whitespace-nowrap text-white not-italic lg:hidden`}
        data-node-id="3572:7358"
      >
        {text}
      </p>
      <p
        className={`${interLight.className} hidden text-[12px] leading-[1.3] font-light whitespace-nowrap text-[rgba(255,255,255,0.8)] not-italic lg:block`}
        data-node-id="2379:817"
      >
        {text}
      </p>
      <ThreeMindsLogo />
    </div>
  );
}

/** Figma 2379:5058 — logo group (2379:5067 is the “minds” mark inside 2379:5063). */
function ThreeMindsLogo() {
  return (
    <div
      className="relative mt-[0.95px] flex h-[11.36px] w-[49.14px] items-center justify-center shrink-0 lg:mt-0 lg:h-[12px] lg:w-[54px]"
      data-node-id="3572:7359"
      data-name="Group"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy" decoding="async"
        alt="3minds"
        className="block h-full w-full object-contain max-w-none"
        src="/footer/3minds.png"
      />
    </div>
  );
}
