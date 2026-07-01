import Image from "next/image";
import Link from "next/link";
import { interRegular } from "../hero/fonts";
import { GradientTitle, WhiteCtaButton } from "../contact/contact-shared";

const IMAGE_102_GRADIENT =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 825 1650' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-36.45 -0.0000015933 0.0000032605 -74.591 412.5 825)'><stop stop-color='rgba(0,0,0,0)' offset='0.3089'/><stop stop-color='rgba(0,0,0,1)' offset='1'/></radialGradient></defs></svg>\")";

const TEXT_FADE_IN_CLASS = "animate-hero-text-fade-in opacity-0";

export function ResourcesHero() {
  return (
    <>
      {/* 2388:421 — rotated image 102 underlay */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 z-0 h-[825px] w-[1442px] -translate-x-1/2 overflow-hidden"
        data-node-id="2388:421"
        data-name="Hero Image"
      >
        <div className="absolute top-0 left-[calc(50%-5px)] flex h-[825px] w-[1650px] -translate-x-1/2 items-center justify-center">
          <div className="-rotate-90 flex-none">
            <div
              className="relative h-[1650px] w-[825px]"
              data-node-id="2379:1603"
              data-name="image 102"
            >
              <Image
                src="/resources/image-102.png"
                alt=""
                fill
                className="max-w-none object-cover"
                sizes="825px"
                priority
                unoptimized
              />
              <div
                className="absolute inset-0"
                style={{ backgroundImage: IMAGE_102_GRADIENT }}
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hero text block — headline, search, contact */}
      <div
        className={`absolute top-[294px] left-0 z-10 h-[233.17px] w-full ${TEXT_FADE_IN_CLASS}`}
        style={{ animationDelay: '1s' }}
        data-name="Hero text"
      >
        <div
          className="absolute top-0 left-1/2 flex w-[810px] -translate-x-1/2 flex-col items-start gap-[15px]"
          data-node-id="2379:1627"
        >
          <div className="relative w-[810px] px-[10px]">
            <GradientTitle
              nodeId="2379:1628"
              gradientDeg="118.129deg"
              className="w-[810px] text-center"
            >
              Explore whitepapers, architectural deep-dives, and performance
              data
            </GradientTitle>
            <div
              className="pointer-events-none absolute top-[-4px] left-0 h-[106px] w-[810px]"
              data-node-id="2379:1629"
              aria-hidden
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/resources/hero-title-frame.svg"
                alt=""
                className="block size-full max-w-none"
              />
            </div>
          </div>
        </div>

        <div
          className="absolute top-[145.64px] left-[calc(16.67%+119px)] flex h-[48px] w-[722px] items-stretch border-[0.5px] border-solid border-[rgba(255,255,255,0.4)] bg-[rgba(0,0,0,0.3)]"
          data-node-id="2379:1621"
        >
          <div
            className="flex min-w-px flex-[1_0_0] items-center px-[20px]"
            data-node-id="2379:1622"
          >
            <label htmlFor="resources-hero-search" className="sr-only">
              Search resources
            </label>
            <input
              id="resources-hero-search"
              type="search"
              name="resources-hero-search"
              autoComplete="off"
              placeholder="Search architecture, case studies, or GPX metrics..."
              aria-label="Search resources"
              className={`${interRegular.className} h-full w-full border-0 bg-transparent p-0 text-[14px] leading-[21px] font-normal text-white not-italic outline-none placeholder:text-white/70 focus:outline-none`}
            />
          </div>
          <a
            href="#"
            className="relative flex w-[158px] shrink-0 items-center justify-center bg-white bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.15)_100%)] transition-opacity hover:opacity-90"
          >
            <span
              className={`${interRegular.className} text-[16px] leading-[normal] font-normal text-[#121212] not-italic`}
            >
              Search
            </span>
          </a>
        </div>

        <div
          className={`${interRegular.className} absolute top-[212.17px] left-[calc(16.67%+119px)] flex items-center gap-[6px] text-[14px] leading-[21px] font-normal whitespace-nowrap not-italic`}
          data-node-id="2379:1634"
        >
          <span className="text-white opacity-75" data-node-id="2379:1635">
            Can&apos;t find what you&apos;re looking for?
          </span>
          <Link
            href="/contact"
            className="text-[#53d824]"
            data-node-id="2379:1636"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}
