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

export function SiteFooter({
  showNewsletter = false,
  isContactPage = false,
  isCareersPage = false,
  isResourcesPage = false,
  isOverlapPage = false,
  pathname = "",
  data,
  brandData,
  newsletterData,
}: {
  showNewsletter?: boolean;
  isContactPage?: boolean;
  isCareersPage?: boolean;
  isResourcesPage?: boolean;
  isOverlapPage?: boolean;
  pathname?: string;
  data?: any;
  brandData?: any;
  newsletterData?: any;
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
    : isResourcesPage || isCareersPage || isContactPage
      ? "pt-[376px]"
      : showNewsletter
        ? "pt-[100px]"
        : "pt-[24px]";

  const navSections: FooterNavSection[] =
    Array.isArray(data?.nav_sections) && data.nav_sections.length > 0
      ? data.nav_sections.map((section: any, index: number) => {
          const fallback = FALLBACK_FOOTER_NAV_SECTIONS[index];
          return {
            title: section?.title || fallback?.title || "",
            width: fallback?.width ?? 158,
            listWidth: fallback?.listWidth ?? 158,
            listAlign: fallback?.listAlign ?? "start",
            links: Array.isArray(section?.links)
              ? section.links
                  .map((link: any) => ({
                    label: typeof link?.label === "string" ? link.label : "",
                    href: typeof link?.href === "string" && link.href ? link.href : "#",
                  }))
                  .filter((link: any) => link.label)
              : fallback?.links ?? [],
          };
        })
      : FALLBACK_FOOTER_NAV_SECTIONS;

  const socialLinks: FooterSocialLink[] =
    Array.isArray(data?.social_links) && data.social_links.length > 0
      ? data.social_links
          .map((raw: any, index: number) => {
            const fallback = FALLBACK_FOOTER_SOCIAL_LINKS[index];
            const platform = String(raw?.platform || fallback?.platform || "social").toLowerCase();
            const match = FALLBACK_FOOTER_SOCIAL_LINKS.find((s) => s.platform === platform);
            return {
              platform,
              href: typeof raw?.href === "string" && raw.href ? raw.href : fallback?.href || "#",
              icon: mediaUrl(raw?.icon) || match?.icon || fallback?.icon || "/footer/social-linkedin.svg",
              label: match?.label || fallback?.label || platform,
            };
          })
          .filter((s: any) => s)
      : FALLBACK_FOOTER_SOCIAL_LINKS;

  const legalLinks: FooterLegalLink[] =
    Array.isArray(data?.legal_links) && data.legal_links.length > 0
      ? data.legal_links
          .map((raw: any) => ({
            label: typeof raw?.label === "string" ? raw.label : "",
            href: typeof raw?.href === "string" && raw.href ? raw.href : "#",
          }))
          .filter((link: any) => link.label)
      : FALLBACK_FOOTER_LEGAL_LINKS;

  const copyrightText = data?.copyright_text || FALLBACK_FOOTER_COPYRIGHT;
  const craftedByText = data?.crafted_by_text || FALLBACK_FOOTER_CRAFTED_BY_TEXT;
  const craftedByLogoSrc = mediaUrl(data?.crafted_by_logo) || null;
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
          {/* Mobile Background — dedicated mobile export (393×973), horizontally
              centered, 300px below the top of the visible zone; image fills the
              box 1:1 with no crop. */}
          <div
            className="absolute left-1/2 w-[393px] -translate-x-1/2 lg:hidden"
            style={{ top: `${mobileOverlapPx + 300}px`, height: "973px" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async"
              alt=""
              src="/footer/footer-mobile-bg.webp"
              className="absolute inset-0 h-full w-full object-fill"
            />
          </div>
          {/* Desktop Background */}
          <img loading="lazy" decoding="async"
            alt=""
            src="/footer/footer-bg.webp"
            className="hidden lg:block absolute left-[-0.02%] top-[-5.03%] h-[97.04%] w-full min-w-0 translate-x-0 opacity-100 max-w-none object-cover"
          />
        </div>
        {/* Mobile overlay — spans only the background image box (300px below the
            hidden overlap area, 973px tall), top-only 20% fade per Figma 3572:7309 */}
        <div
          className="absolute inset-x-0 h-[973px] bg-gradient-to-b from-[rgba(0,0,0,0.2)] to-transparent lg:hidden"
          style={{ top: `${mobileOverlapPx + 300}px` }}
        />
        {/* Desktop overlay */}
        <div className="absolute inset-0 hidden bg-gradient-to-b from-black/80 via-black/10 to-black/10 lg:block" />
      </div>

      {/* Mobile hidden zone — sits behind the page's merged final section */}
      {mobileOverlapPx > 0 && (
        <div aria-hidden className="w-full lg:hidden" style={{ height: `${mobileOverlapPx}px` }} />
      )}

      <div className={`relative mx-auto flex h-full w-full max-w-[1440px] flex-col items-center pb-0 lg:block lg:pt-0 lg:pb-0 ${mobileContentPadding}`}>
        {showNewsletter && (
          <div className="relative z-[1] mb-[80px] flex flex-col items-center lg:mb-0 lg:pt-[120px]">
            <NewsletterSignup data={newsletterData} />
          </div>
        )}

      <nav
        className="relative z-[1] flex w-full max-w-[897px] flex-col px-[20px] text-white lg:absolute lg:top-[626px] lg:left-1/2 lg:-translate-x-1/2 lg:flex-row lg:items-start lg:justify-between lg:px-0 lg:gap-0"
        aria-label="Footer"
        data-node-id="3572:7314"
      >
        {navSections.map((section, sectionIndex) => (
          <div
            key={section.title}
            className={`group flex w-full flex-col lg:w-[158px] lg:shrink-0 lg:mt-0 ${
              sectionIndex > 0 ? "mt-[10px]" : ""
            } ${
              sectionIndex < navSections.length - 1
                ? "border-b border-white/20 pb-[10px] lg:border-none lg:pb-0"
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
              className="flex h-[25px] cursor-pointer items-center justify-between lg:h-auto lg:cursor-default lg:justify-center peer-checked:[&_.footer-icon-plus]:hidden peer-checked:[&_.footer-icon-minus]:block"
            >
              <p
                className={`${interMedium.className} w-full text-[14px] leading-[1.4] font-medium tracking-[0.56px] whitespace-nowrap text-white/60 uppercase not-italic overflow-hidden text-ellipsis lg:text-[10px] lg:tracking-[0.4px] lg:text-center`}
              >
                {section.title}
              </p>
              <span className="flex h-[25px] items-center justify-center lg:hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async" src="/footer/accordion-plus.svg" alt="" className="footer-icon-plus block h-[25px] w-[24px]" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async" src="/footer/accordion-minus.svg" alt="" className="footer-icon-minus hidden h-[24px] w-[24px]" />
              </span>
            </label>
            <ul
              className={`hidden flex-col items-start gap-[12px] text-[16px] leading-[1.4] mt-[9px] peer-checked:flex lg:!flex lg:mt-[24px] lg:mb-0 lg:text-[14px] lg:${section.listAlign === "center" ? "items-center" : "items-start"} ${sectionIndex < navSections.length - 1 ? "peer-checked:mb-[-2px]" : ""}`}
            >
              {section.links.map((link) => (
                <li key={link.label} className="w-full text-left lg:text-center">
                  <a
                    href={link.href}
                    className={`${interRegular.className} block max-w-full font-normal whitespace-nowrap text-white not-italic overflow-hidden text-ellipsis hover:opacity-80 lg:text-[14px]`}
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
      <div className="relative z-[1] mt-[50px] flex w-full flex-col items-start justify-center gap-[20px] px-[20px] lg:absolute lg:top-[932px] lg:left-0 lg:mt-0 lg:flex-row lg:items-end lg:justify-between lg:gap-0 lg:px-[130px]">

        {/* Left Side */}
        <div className="flex w-full flex-col items-start gap-[20px] lg:w-auto lg:flex-row lg:items-end lg:gap-[22px]">
          {/* Socials Block */}
          <div className="flex w-full flex-row items-center justify-start gap-[14px] lg:w-auto lg:flex-col lg:items-start lg:gap-[22px]">
            {/* Mobile: Inter Medium 12px / Desktop: Gilroy Medium 10px (Figma 3572:7338) */}
            <p className={`${interMedium.className} text-[12px] leading-[1.4] font-medium tracking-[0.48px] uppercase text-white/60 not-italic lg:hidden`}>
              CONNECT WITH US
            </p>
            <p className={`${gilroyMedium.className} hidden text-[10px] leading-[1.4] font-medium tracking-[0.4px] uppercase text-white/60 not-italic lg:block`}>
              CONNECT WITH US
            </p>
            <div className="flex items-center justify-start gap-[20px] pt-px lg:gap-[32px] lg:pt-0">
              {socialLinks.map((social) => (
                <a key={social.platform} href={social.href} aria-label={social.label} className="block size-[24px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" src={social.icon} alt="" className="block size-full object-contain" />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile divider */}
          <div aria-hidden className="h-0 w-full border-t border-white/20 lg:hidden" />

          {/* Separator */}
          <div className="hidden h-[25px] w-px bg-white/20 lg:mb-[4px] lg:block" />

          {/* Legal Links Block */}
          <div className="flex w-full flex-col items-start lg:w-auto lg:gap-[22px]">
            {/* Mobile: Inter Medium 12px / Desktop: Gilroy Medium 10px (Figma 3572:7348) */}
            <p className={`${interMedium.className} text-[12px] leading-[1.4] font-medium tracking-[0.48px] uppercase text-white/60 not-italic lg:hidden`}>
              LEGAL PAGES
            </p>
            <p className={`${gilroyMedium.className} hidden text-[10px] leading-[1.4] font-medium tracking-[0.4px] uppercase text-white/60 not-italic lg:block`}>
              LEGAL PAGES
            </p>
            {/* Figma grid: links 27px below label top (label 16.8px tall) */}
            <div className="mt-[10.2px] flex flex-row flex-wrap items-center justify-start gap-[8px] lg:mt-0 lg:pb-[4px]">
              {legalLinks.map((link, idx) => (
                <span key={link.label} className="flex items-center gap-[8px]">
                  {idx > 0 && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img loading="lazy" decoding="async" src="/footer/dot-separator.svg" alt="" className="block h-[4px] w-[5px]" />
                  )}
                  <a href={link.href} className={`${interRegular.className} max-w-full text-[14px] leading-[1.4] text-white hover:text-white lg:text-[#E4E4E4] [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] overflow-hidden`}>{link.label}</a>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex w-full flex-row items-start justify-start gap-[22.022px] lg:w-auto lg:items-center lg:justify-start lg:gap-[48px] lg:pb-[4px]">
          <p className={`${interRegular.className} max-w-full text-[10px] leading-[1.3] text-[rgba(255,255,255,0.8)] overflow-hidden text-ellipsis whitespace-nowrap lg:text-[12px]`}>
            {copyrightText}
          </p>
          <CraftedByAttribution text={craftedByText} logoSrc={craftedByLogoSrc} />
        </div>
      </div>

      <div className="relative z-[1] mt-[14px] flex w-full justify-center pb-0 lg:hidden">
        <p
          aria-hidden
          data-node-id="3572:7371"
          className={`${gilroyBold.className} bg-clip-text text-[100px] leading-none font-bold tracking-[-2px] whitespace-nowrap text-transparent opacity-30 not-italic`}
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
        className={`${gilroyBold.className} pointer-events-none absolute bottom-[-15px] left-1/2 -translate-x-1/2 bg-clip-text text-[110px] leading-none font-bold tracking-[-2px] whitespace-nowrap text-[transparent] opacity-[0.15] hidden lg:block lg:top-[1040px] lg:bottom-auto lg:left-[calc(50%-568px)] lg:translate-x-0 lg:text-[300px] lg:tracking-[-6px] lg:opacity-30 not-italic`}
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
