import Image from "next/image";
import { interMedium, interRegular } from "../hero/fonts";
import { FOOTER_NAV_SECTIONS } from "./footer-data";
import { NewsletterSignup } from "./NewsletterSignup";

export function SiteFooter({ showNewsletter = false }: { showNewsletter?: boolean }) {
  return (
    <footer
      className="relative left-1/2 mt-[21px] h-[1252px] w-screen max-w-none -translate-x-1/2 overflow-hidden bg-black"
      data-node-id="2379:784"
      data-name="footer"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div
          className="absolute left-1/2 w-[1440px] origin-center overflow-hidden"
          style={{
            height: "97.04%",
            top: "-5.03%",
            transform:
              "translateX(-50%) scaleX(max(1, calc(100vw / 1440px)))",
          }}
        >
          <div className="relative h-full w-full">
            <Image
              src="/footer/footer-bg.png"
              alt=""
              fill
              className="object-cover object-top"
              sizes="100vw"
            />
          </div>
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
            className="flex w-[158px] shrink-0 flex-col items-center gap-[24px]"
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
                    className={`${interRegular.className} font-normal text-white not-italic hover:opacity-80`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <p
        className={`${interMedium.className} absolute top-[903px] left-[calc(12.5%-60px)] z-[1] text-[10px] leading-[1.4] font-medium tracking-[0.4px] whitespace-nowrap text-white uppercase opacity-60 not-italic`}
        data-node-id="2379:815"
      >
        CONNECT WITH US
      </p>

      <p
        className={`${interMedium.className} absolute top-[903px] left-[calc(20.83%+2px)] z-[1] text-[10px] leading-[1.4] font-medium tracking-[0.4px] whitespace-nowrap text-white uppercase opacity-60 not-italic`}
        data-node-id="2379:816"
      >
        Legal pages
      </p>

      <div
        className="absolute top-[935px] left-[calc(12.5%+8px)] z-[1] flex -translate-x-1/2 items-center gap-[32px] pt-px"
        data-node-id="2379:837"
        data-name="Social Media Icons"
      >
        <a href="#" aria-label="LinkedIn" className="relative size-[24px]">
          <Image
            src="/footer/social-linkedin.svg"
            alt=""
            width={24}
            height={24}
            className="block size-full max-w-none"
          />
        </a>
        <a href="#" aria-label="X" className="relative size-[24px]">
          <Image
            src="/footer/social-x.svg"
            alt=""
            width={24}
            height={24}
            className="block size-full max-w-none"
          />
        </a>
        <a href="#" aria-label="YouTube" className="relative size-[24px]">
          <Image
            src="/footer/social-youtube.svg"
            alt=""
            width={24}
            height={24}
            className="block size-full max-w-none"
          />
        </a>
      </div>

      <div className="absolute top-[935px] left-[calc(16.67%+40px)] z-[1] flex h-[25px] w-0 -translate-x-1/2 items-center justify-center">
        <div className="-rotate-90 flex-none">
          <div className="relative h-0 w-[25px]">
            <div className="absolute inset-[-1px_0_0_0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/footer/legal-separator.svg"
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute top-[939px] left-[calc(29.17%+29px)] z-[1] flex -translate-x-1/2 items-center gap-[8px]"
        data-node-id="2379:830"
      >
        {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
          (label, index) => (
            <span key={label} className="contents">
              {index > 0 && (
                <span className="flex items-center justify-center">
                  <span className="-scale-y-100 flex-none">
                    <span className="relative block h-[4px] w-[5px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/footer/dot-separator.svg"
                        alt=""
                        className="block size-full max-w-none"
                        aria-hidden
                      />
                    </span>
                  </span>
                </span>
              )}
              <a
                href="#"
                className={`${interRegular.className} text-[12px] leading-[1.4] font-normal whitespace-nowrap text-white not-italic hover:opacity-80`}
              >
                {label}
              </a>
            </span>
          ),
        )}
      </div>

      <div
        className="absolute top-[942px] left-0 z-[1] h-[12px] w-full"
        data-name="Footer bottom bar"
      >
        <p
          className={`${interRegular.className} absolute top-0 left-[calc(70.83%-138.11px)] text-[12px] leading-[1.3] font-normal whitespace-nowrap text-white/80 not-italic`}
          data-node-id="2379:1463"
        >
          © 2026 Ambient AI. All rights reserved.
        </p>

        <div className="absolute top-0 left-[calc(75%+69.81px)]">
          <CraftedByAttribution />
        </div>
      </div>

      <p
        aria-hidden
        className={`${interMedium.className} pointer-events-none absolute top-[1000px] left-[calc(50%-568px)] bg-clip-text text-[300px] leading-none font-bold tracking-[-6px] whitespace-nowrap text-[transparent] opacity-30 not-italic`}
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
