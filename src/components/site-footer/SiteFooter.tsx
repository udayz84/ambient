import Image from "next/image";
import { gilroyMedium, gilroyBold, interRegular, interMedium } from "../hero/fonts";
import { FOOTER_NAV_SECTIONS } from "./footer-data";
import { NewsletterSignup } from "./NewsletterSignup";

export function SiteFooter({ showNewsletter = false }: { showNewsletter?: boolean }) {
  return (
    <footer
      className="relative flex min-h-[1252px] h-auto w-full flex-col justify-start overflow-hidden bg-black lg:block lg:h-[1252px] lg:min-h-0 lg:justify-center"
      data-node-id="2379:784"
      data-name="footer"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src="/footer/footer-bg.png"
            className="absolute left-[50%] top-[0%] h-full w-auto min-w-[150%] -translate-x-1/2 object-cover opacity-60 lg:left-[-0.02%] lg:top-[-5.03%] lg:h-[97.04%] lg:w-full lg:min-w-0 lg:translate-x-0 lg:opacity-100 lg:max-w-none"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.6)] via-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.8)] lg:from-[rgba(0,0,0,0.2)] lg:to-[rgba(0,0,0,0)]" />
      </div>

      <div className="relative mx-auto flex h-full w-full max-w-[1440px] flex-col items-center pt-[100px] pb-[160px] lg:block lg:pt-0 lg:pb-0">
      {showNewsletter ? (
        <div className="relative z-[1] mb-[80px] flex flex-col items-center lg:mb-0 lg:pt-[120px]">
          <NewsletterSignup />
        </div>
      ) : null}

      <nav
        className="relative z-[1] grid w-full max-w-[897px] grid-cols-2 gap-x-[16px] gap-y-[48px] px-[20px] text-center text-white lg:absolute lg:top-[626px] lg:left-1/2 lg:-translate-x-1/2 lg:flex lg:flex-row lg:items-center lg:justify-between lg:px-0 lg:gap-0"
        aria-label="Footer"
        data-node-id="2379:786"
      >
        {FOOTER_NAV_SECTIONS.map((section) => (
          <div
            key={section.title}
            className="flex w-full flex-col items-center justify-start gap-[24px] lg:w-[158px] lg:shrink-0 lg:justify-center"
          >
            <p
              className={`${interMedium.className} w-full text-[10px] leading-[1.4] font-medium tracking-[0.4px] whitespace-nowrap text-white uppercase opacity-60 not-italic`}
            >
              {section.title}
            </p>
            <ul
              className={`flex flex-col gap-[12px] text-[16px] leading-[1.4] items-center lg:${section.listAlign === "center" ? "items-center" : "items-start"}`}
            >
              {section.links.map((link) => (
                <li key={link} className="w-full">
                  <a
                    href="#"
                    className={`${interRegular.className} font-normal whitespace-nowrap text-white not-italic hover:opacity-80`}
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
      <div className="relative z-[1] mt-[80px] flex w-full flex-col items-center justify-center gap-[48px] px-[20px] lg:absolute lg:top-[940px] lg:left-0 lg:mt-0 lg:flex-row lg:items-end lg:justify-between lg:gap-0 lg:px-[120px]">
        
        {/* Left Side */}
        <div className="flex flex-col items-center gap-[32px] lg:flex-row lg:items-end lg:gap-[22px]">
          {/* Socials Block */}
          <div className="flex flex-col items-center gap-[18px] lg:items-start">
            <p className={`${gilroyMedium.className} text-[10px] leading-[1.4] font-medium tracking-[0.4px] uppercase text-white opacity-60 not-italic`}>
              CONNECT WITH US
            </p>
            <div className="flex items-center justify-center gap-[32px] lg:justify-start">
              <a href="#" aria-label="LinkedIn" className="relative size-[24px]">
                <Image src="/footer/social-linkedin.svg" alt="" fill className="block object-contain" />
              </a>
              <a href="#" aria-label="X" className="relative size-[24px]">
                <Image src="/footer/social-x.svg" alt="" fill className="block object-contain" />
              </a>
              <a href="#" aria-label="YouTube" className="relative size-[24px]">
                <Image src="/footer/social-youtube.svg" alt="" fill className="block object-contain" />
              </a>
            </div>
          </div>

          {/* Separator */}
          <div className="hidden h-[25px] w-px bg-white/20 lg:mb-[4px] lg:block" />

          {/* Legal Links Block */}
          <div className="flex flex-col items-center gap-[22px] lg:items-start">
            <p className={`${gilroyMedium.className} text-[10px] leading-[1.4] font-medium tracking-[0.4px] uppercase text-white opacity-60 not-italic`}>
              Legal pages
            </p>
            <div className="flex flex-wrap items-center justify-center gap-[12px] pb-[4px] lg:gap-[8px] lg:justify-start">
              <a href="#" className={`${interRegular.className} text-[12px] leading-[1.4] text-white hover:opacity-80`}>Privacy Policy</a>
              <div className="relative hidden h-[4px] w-[5px] lg:block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/footer/dot-separator.svg" alt="" className="block size-full max-w-none" aria-hidden />
              </div>
              <a href="#" className={`${interRegular.className} text-[12px] leading-[1.4] text-white hover:opacity-80`}>Terms of Service</a>
              <div className="relative hidden h-[4px] w-[5px] lg:block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/footer/dot-separator.svg" alt="" className="block size-full max-w-none" aria-hidden />
              </div>
              <a href="#" className={`${interRegular.className} text-[12px] leading-[1.4] text-white hover:opacity-80`}>Cookie Policy</a>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col-reverse items-center gap-[24px] pb-[4px] lg:flex-row lg:gap-[48px]">
          <p className={`${interRegular.className} text-[12px] leading-[1.3] text-white/80`}>
            © 2026 Ambient AI. All rights reserved.
          </p>
          <CraftedByAttribution />
        </div>
      </div>

      <p
        aria-hidden
        className={`${gilroyBold.className} pointer-events-none absolute bottom-[-15px] left-1/2 -translate-x-1/2 bg-clip-text text-[110px] leading-none font-bold tracking-[-2px] whitespace-nowrap text-[transparent] opacity-[0.15] lg:top-[1000px] lg:bottom-auto lg:left-[calc(50%-568px)] lg:translate-x-0 lg:text-[300px] lg:tracking-[-6px] lg:opacity-30 not-italic`}
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
