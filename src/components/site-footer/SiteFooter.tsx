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
          {/* Mobile Background — single asset for every page, exact Figma specs:
              fixed size 1138×973, horizontally centered, 300px below the top
              of the visible zone (below the hidden overlap area). */}
          <div
            className="absolute inset-x-0 bottom-0 bg-no-repeat lg:hidden"
            style={{
              top: `${mobileOverlapPx}px`,
              backgroundImage: "url(/footer.png)",
              backgroundPosition: "center 300px",
              backgroundSize: "1138px 973px",
            }}
          />
          {/* Desktop Background */}
          <img
            alt=""
            src="/footer/footer-bg.png"
            className="hidden lg:block absolute left-[-0.02%] top-[-5.03%] h-[97.04%] w-full min-w-0 translate-x-0 opacity-100 max-w-none object-cover"
          />
        </div>
        {/* Mobile overlay — spans only the visible zone */}
        <div
          className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-[rgba(0,0,0,0.4)] via-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.6)] lg:hidden"
          style={{ top: `${mobileOverlapPx}px` }}
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
        className="relative z-[1] flex w-full max-w-[897px] flex-col px-[24px] text-white lg:absolute lg:top-[626px] lg:left-1/2 lg:-translate-x-1/2 lg:flex-row lg:items-start lg:justify-between lg:px-0 lg:gap-0"
        aria-label="Footer"
        data-node-id="2379:786"
      >
        {navSections.map((section) => (
          <div
            key={section.title}
            className="group flex w-full flex-col border-b border-white/20 lg:w-[158px] lg:shrink-0 lg:border-none"
          >
            <input
              type="checkbox"
              id={`footer-nav-${section.title}`}
              className="peer hidden"
              defaultChecked={section.title === "PRODUCTS"}
            />
            <label
              htmlFor={`footer-nav-${section.title}`}
              className="flex cursor-pointer items-center justify-between py-[12px] lg:cursor-default lg:py-0 lg:justify-center"
            >
              <p
                className={`${interMedium.className} w-full text-[12px] leading-[1.4] font-medium tracking-[0.4px] whitespace-nowrap text-white/60 uppercase not-italic lg:text-[10px] lg:text-center`}
              >
                {section.title}
              </p>
              <span className="text-[20px] font-light text-white/60 lg:hidden">
                <span className="block peer-checked:hidden">+</span>
                <span className="hidden peer-checked:block">—</span>
              </span>
            </label>
            <ul
              className={`mb-[12px] hidden flex-col gap-[12px] text-[14px] leading-[1.4] items-start peer-checked:flex lg:!flex lg:mb-0 lg:mt-[24px] lg:${section.listAlign === "center" ? "items-center" : "items-start"}`}
            >
              {section.links.map((link) => (
                <li key={link.label} className="w-full text-left lg:text-center">
                  <a
                    href={link.href}
                    className={`${interRegular.className} font-normal whitespace-nowrap text-[#E4E4E4] not-italic hover:opacity-80 lg:text-white`}
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
      <div className="relative z-[1] mt-[48px] flex w-full flex-col items-start justify-center gap-[20px] px-[24px] lg:absolute lg:top-[932px] lg:left-0 lg:mt-0 lg:flex-row lg:items-end lg:justify-between lg:gap-0 lg:px-[130px]">
        
        {/* Left Side */}
        <div className="flex w-full flex-col items-start gap-[20px] lg:w-auto lg:flex-row lg:items-end lg:gap-[22px]">
          {/* Socials Block */}
          <div className="flex w-full flex-row items-center justify-start gap-[16px] border-t border-b border-white/20 py-[16px] lg:w-auto lg:flex-col lg:items-start lg:border-none lg:py-0">
            <p className={`${gilroyMedium.className} text-[10px] leading-[1.4] font-medium tracking-[0.4px] uppercase text-white/60 not-italic lg:text-[10px]`}>
              CONNECT WITH US
            </p>
            <div className="flex items-center justify-start gap-[24px] lg:gap-[32px] lg:justify-start">
              {socialLinks.map((social) => (
                <a key={social.platform} href={social.href} aria-label={social.label} className="block size-[20px] lg:size-[24px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={social.icon} alt="" className="block size-full object-contain" />
                </a>
              ))}
            </div>
          </div>

          {/* Separator */}
          <div className="hidden h-[25px] w-px bg-white/20 lg:mb-[4px] lg:block" />

          {/* Legal Links Block */}
          <div className="flex w-full flex-col items-start gap-[12px] lg:w-auto lg:gap-[22px]">
            <p className={`${gilroyMedium.className} text-[12px] leading-[1.4] font-medium tracking-[0.4px] uppercase text-white/60 not-italic lg:text-[10px]`}>
              LEGAL PAGES
            </p>
            <div className="flex flex-row flex-wrap items-center justify-start gap-[8px] pb-[4px]">
              {legalLinks.map((link, idx) => (
                <span key={link.label} className="flex items-center gap-[8px]">
                  {idx > 0 && (
                    <div className="relative flex h-[4px] w-[5px] items-center justify-center">
                      <div className="size-[3px] rounded-full bg-white/40" />
                    </div>
                  )}
                  <a href={link.href} className={`${interRegular.className} text-[14px] leading-[1.4] text-[#E4E4E4] hover:text-white`}>{link.label}</a>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex w-full flex-row items-center justify-between gap-[12px] pb-[4px] lg:w-auto lg:justify-start lg:gap-[48px]">
          <p className={`${interRegular.className} text-[12px] leading-[1.3] text-[rgba(255,255,255,0.8)]`}>
            {copyrightText}
          </p>
          <CraftedByAttribution text={craftedByText} logoSrc={craftedByLogoSrc} />
        </div>
      </div>

      <div className="relative z-[1] mt-[64px] flex w-full justify-center lg:hidden pb-[50px]">
        <p
          aria-hidden
          data-node-id="3174:49700"
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
    <div className="flex items-center gap-[4px]">
      <p
        className={`${interLight.className} text-[12px] leading-[1.3] font-light whitespace-nowrap text-[rgba(255,255,255,0.8)] not-italic`}
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
      className="relative flex h-[12px] w-[54px] items-center justify-center shrink-0"
      data-node-id="2379:5058"
      data-name="Group"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="3minds"
        className="block h-full w-full object-contain max-w-none"
        src="/footer/3minds.png"
      />
    </div>
  );
}
