import { gilroyMedium, gilroyBold, interRegular, interMedium } from "../hero/fonts";
import { FOOTER_NAV_SECTIONS } from "./footer-data";
import { NewsletterSignup } from "./NewsletterSignup";

export function SiteFooter({
  showNewsletter = false,
  isContactPage = false,
  isCareersPage = false,
  isResourcesPage = false,
}: {
  showNewsletter?: boolean;
  isContactPage?: boolean;
  isCareersPage?: boolean;
  isResourcesPage?: boolean;
}) {
  const showFullBackground = showNewsletter || isCareersPage || isResourcesPage || isContactPage;

  return (
    <footer
      className="relative flex h-auto w-full flex-col justify-start overflow-hidden bg-black lg:block lg:h-[1252px] lg:min-h-0 lg:justify-center"
      data-node-id="2379:784"
      data-name="footer"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 overflow-hidden">
          {/* Mobile Background */}
          {showFullBackground ? (
            <img
              alt=""
              src="/mobile/footer.png"
              className="absolute inset-0 h-full w-full object-cover object-top opacity-100 lg:hidden"
            />
          ) : (
            <div
              className="absolute inset-0 h-full w-full lg:hidden bg-no-repeat"
              style={{
                backgroundImage: "url(/mobile/footer.png)",
                backgroundPosition: "center top -250px",
                backgroundSize: "cover",
              }}
            />
          )}
          {/* Desktop Background */}
          <img
            alt=""
            src="/footer/footer-bg.png"
            className="hidden lg:block absolute left-[-0.02%] top-[-5.03%] h-[97.04%] w-full min-w-0 translate-x-0 opacity-100 max-w-none object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.4)] via-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.6)] lg:from-black/80 lg:via-black/10 lg:to-black/10" />
      </div>

      <div className={`relative mx-auto flex h-full w-full max-w-[1440px] flex-col items-center pb-0 lg:block lg:pt-0 lg:pb-0 ${(isResourcesPage || isCareersPage || isContactPage) ? "pt-[376px]" : showNewsletter ? "pt-[100px]" : "pt-[24px]"}`}>
        {showNewsletter && (
          <div className="relative z-[1] mb-[80px] flex flex-col items-center lg:mb-0 lg:pt-[120px]">
            <NewsletterSignup />
          </div>
        )}

      <nav
        className="relative z-[1] flex w-full max-w-[897px] flex-col px-[24px] text-white lg:absolute lg:top-[626px] lg:left-1/2 lg:-translate-x-1/2 lg:flex-row lg:items-start lg:justify-between lg:px-0 lg:gap-0"
        aria-label="Footer"
        data-node-id="2379:786"
      >
        {FOOTER_NAV_SECTIONS.map((section) => (
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
                <li key={link} className="w-full text-left lg:text-center">
                  <a
                    href="#"
                    className={`${interRegular.className} font-normal whitespace-nowrap text-[#E4E4E4] not-italic hover:opacity-80 lg:text-white`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="relative z-[1] mt-[48px] flex w-full flex-col items-start justify-center gap-[20px] px-[24px] lg:absolute lg:top-[940px] lg:left-0 lg:mt-0 lg:flex-row lg:items-end lg:justify-between lg:gap-0 lg:px-[120px]">
        
        {/* Left Side */}
        <div className="flex w-full flex-col items-start gap-[20px] lg:w-auto lg:flex-row lg:items-end lg:gap-[22px]">
          {/* Socials Block */}
          <div className="flex w-full flex-row items-center justify-start gap-[16px] border-t border-b border-white/20 py-[16px] lg:w-auto lg:flex-col lg:items-start lg:border-none lg:py-0">
            <p className={`${gilroyMedium.className} text-[10px] leading-[1.4] font-medium tracking-[0.4px] uppercase text-white/60 not-italic lg:text-[10px]`}>
              CONNECT WITH US
            </p>
            <div className="flex items-center justify-start gap-[16px] lg:justify-start">
              <a href="#" aria-label="LinkedIn" className="block size-[20px] lg:size-[24px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/footer/social-linkedin.svg" alt="" className="block size-full object-contain" />
              </a>
              <a href="#" aria-label="X" className="block size-[20px] lg:size-[24px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/footer/social-x.svg" alt="" className="block size-full object-contain" />
              </a>
              <a href="#" aria-label="YouTube" className="block size-[20px] lg:size-[24px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/footer/social-youtube.svg" alt="" className="block size-full object-contain" />
              </a>
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
              <a href="#" className={`${interRegular.className} text-[14px] leading-[1.4] text-[#E4E4E4] hover:text-white`}>Privacy Policy</a>
              <div className="relative flex h-[4px] w-[5px] items-center justify-center">
                <div className="size-[3px] rounded-full bg-white/40" />
              </div>
              <a href="#" className={`${interRegular.className} text-[14px] leading-[1.4] text-[#E4E4E4] hover:text-white`}>Terms of Service</a>
              <div className="relative flex h-[4px] w-[5px] items-center justify-center">
                <div className="size-[3px] rounded-full bg-white/40" />
              </div>
              <a href="#" className={`${interRegular.className} text-[14px] leading-[1.4] text-[#E4E4E4] hover:text-white`}>Cookie Policy</a>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex w-full flex-row items-center justify-between gap-[12px] pb-[4px] lg:w-auto lg:justify-start lg:gap-[48px]">
          <p className={`${interRegular.className} text-[10px] leading-[1.3] text-[rgba(255,255,255,0.8)]`}>
            © 2026 Ambient AI. All rights reserved.
          </p>
          <CraftedByAttribution />
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
          ambient
        </p>
      </div>

      <p
        aria-hidden
        className={`${gilroyBold.className} pointer-events-none absolute bottom-[-15px] left-1/2 -translate-x-1/2 bg-clip-text text-[110px] leading-none font-bold tracking-[-2px] whitespace-nowrap text-[transparent] opacity-[0.15] hidden lg:block lg:top-[1000px] lg:bottom-auto lg:left-[calc(50%-568px)] lg:translate-x-0 lg:text-[300px] lg:tracking-[-6px] lg:opacity-30 not-italic`}
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(46,76,38,0.4), #ddf5d3 50%, rgba(46,76,38,0.4))",
        }}
        data-node-id="2379:785"
      >
        ambient
      </p>
      </div>
    </footer>
  );
}

function CraftedByAttribution() {
  return (
    <div className="flex items-center gap-[4px]">
      <p
        className={`${interRegular.className} text-[12px] leading-[1.3] font-normal whitespace-nowrap text-white not-italic`}
        data-node-id="2379:817"
      >
        Carefully crafted by
      </p>
      <ThreeMindsLogo />
    </div>
  );
}

/** Figma 2379:5058 — logo group (2379:5067 is the “minds” mark inside 2379:5063). */
function ThreeMindsLogo() {
  return (
    <div
      className="relative h-[11.999px] w-[53.193px] shrink-0"
      data-node-id="2379:5058"
      data-name="Group"
    >
      <div
        className="absolute top-[0.861px] left-0 h-[11.138px] w-[7.911px]"
        data-node-id="2379:5060"
        data-name="Group"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="block size-full max-w-none"
          src="/footer/crafted-by-3.svg"
          aria-hidden
        />
      </div>
      <div
        className="absolute top-0 left-[10px] h-[11.984px] w-[43.197px]"
        data-node-id="2379:5063"
        data-name="Group"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="3minds"
          className="block size-full max-w-none"
          src="/footer/crafted-by-minds.svg"
        />
      </div>
      <div
        className="absolute top-[0.011px] left-[24.086px] h-[2.607px] w-[2.379px]"
        data-node-id="2379:5069"
        data-name="Vector"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="block size-full max-w-none"
          src="/footer/crafted-by-connector.svg"
          aria-hidden
        />
      </div>
    </div>
  );
}
