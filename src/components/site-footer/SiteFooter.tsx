import Image from "next/image";
import { gilroyMedium, gilroyBold, interRegular, interMedium } from "../hero/fonts";
import { FOOTER_NAV_SECTIONS } from "./footer-data";
import { NewsletterSignup } from "./NewsletterSignup";

export function SiteFooter({ showNewsletter = false }: { showNewsletter?: boolean }) {
  return (
    <footer
      className="relative flex h-[1252px] w-full justify-center overflow-hidden bg-black"
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
            className="absolute left-[-0.02%] top-[-5.03%] h-[97.04%] w-full max-w-none"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0)]" />
      </div>

      <div className="relative mx-auto h-full w-full max-w-[1440px]">
      {showNewsletter ? (
        <div className="relative z-[1] flex flex-col items-center pt-[120px]">
          <NewsletterSignup />
        </div>
      ) : null}

      <nav
        className="absolute top-[626px] left-1/2 z-[1] flex w-[897px] -translate-x-1/2 items-center justify-between text-center text-white"
        aria-label="Footer"
        data-node-id="2379:786"
      >
        {FOOTER_NAV_SECTIONS.map((section) => (
          <div
            key={section.title}
            className="flex w-[158px] shrink-0 flex-col items-center justify-center gap-[24px]"
          >
            <p
              className={`${interMedium.className} w-full text-[10px] leading-[1.4] font-medium tracking-[0.4px] whitespace-nowrap text-white uppercase opacity-60 not-italic`}
            >
              {section.title}
            </p>
            <ul
              className={`flex flex-col gap-[12px] text-[16px] leading-[1.4] ${
                section.listAlign === "center" ? "items-center" : "items-start"
              }`}
              style={{ width: section.listWidth }}
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
      <div className="absolute top-[940px] left-0 z-[1] flex w-full items-end justify-between px-[120px]">
        
        {/* Left Side */}
        <div className="flex items-end gap-[22px]">
          {/* Socials Block */}
          <div className="flex flex-col gap-[18px]">
            <p className={`${gilroyMedium.className} text-[10px] leading-[1.4] font-medium tracking-[0.4px] uppercase text-white opacity-60 not-italic`}>
              CONNECT WITH US
            </p>
            <div className="flex items-center gap-[32px]">
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
          <div className="mb-[4px] h-[25px] w-px bg-white/20" />

          {/* Legal Links Block */}
          <div className="flex flex-col gap-[22px]">
            <p className={`${gilroyMedium.className} text-[10px] leading-[1.4] font-medium tracking-[0.4px] uppercase text-white opacity-60 not-italic`}>
              Legal pages
            </p>
            <div className="flex items-center gap-[8px] pb-[4px]">
              <a href="#" className={`${interRegular.className} text-[12px] leading-[1.4] text-white hover:opacity-80`}>Privacy Policy</a>
              <div className="relative h-[4px] w-[5px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/footer/dot-separator.svg" alt="" className="block size-full max-w-none" aria-hidden />
              </div>
              <a href="#" className={`${interRegular.className} text-[12px] leading-[1.4] text-white hover:opacity-80`}>Terms of Service</a>
              <div className="relative h-[4px] w-[5px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/footer/dot-separator.svg" alt="" className="block size-full max-w-none" aria-hidden />
              </div>
              <a href="#" className={`${interRegular.className} text-[12px] leading-[1.4] text-white hover:opacity-80`}>Cookie Policy</a>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-[48px] pb-[4px]">
          <p className={`${interRegular.className} text-[12px] leading-[1.3] text-white/80`}>
            © 2026 Ambient AI. All rights reserved.
          </p>
          <CraftedByAttribution />
        </div>
      </div>

      <p
        aria-hidden
        className={`${gilroyBold.className} pointer-events-none absolute top-[1000px] left-[calc(50%-568px)] bg-clip-text text-[300px] leading-none font-bold tracking-[-6px] whitespace-nowrap text-[transparent] opacity-30 not-italic`}
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
