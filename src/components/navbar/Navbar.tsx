import { interMedium } from "../hero/fonts";
import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS } from "./nav-items";
import { MobileMenu } from "./MobileMenu";
import { NavbarCta } from "./NavbarCta";

function NavChevron() {
  return (
    <Image
      src="/navbar/chevron.svg"
      alt=""
      width={5}
      height={4}
      className="h-[4px] w-[5px] shrink-0"
      aria-hidden
    />
  );
}

export function Navbar() {
  return (
    <header
      className={`${interMedium.className} sticky top-0 z-50 h-[78px] w-full overflow-x-clip drop-shadow-[0px_6px_12px_rgba(83,216,36,0.12)]`}
      data-node-id="2379:1569"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-[0.158203125px] left-1/2 h-[77.5px] w-[calc((50%_-_26px)*2.42787)] lg:w-full lg:min-w-[1511px] -translate-x-1/2"
        data-node-id="2379:1570"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/navbar/subtract.svg"
          alt=""
          className="block size-full max-w-none"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute top-[35.158203125px] left-1/2 h-[43px] w-[calc((50%_-_26px)*2.42787)] lg:w-full lg:min-w-[1511px] -translate-x-1/2"
        data-node-id="2379:1573"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/navbar/vector-36.svg"
          alt=""
          className="hidden lg:block size-full max-w-none"
        />
        <img
          src="/mobile/Vector 36.png"
          alt=""
          className="block lg:hidden size-full max-w-none"
        />
        {/* Left Connecting Vector */}
        <div 
          className="absolute z-20 flex size-[5px] items-center justify-center lg:hidden"
          style={{ left: "26px", bottom: "-2.5px", transform: "translateX(-50%)" }}
        >
          <img src="/hero/line-cap-left.svg" alt="" className="block size-full" />
        </div>
        {/* Right Connecting Vector */}
        <div 
          className="absolute z-20 flex size-[5px] items-center justify-center lg:hidden"
          style={{ right: "26px", bottom: "-2.5px", transform: "translateX(50%)" }}
        >
          <img src="/hero/line-cap-right.svg" alt="" className="block size-full" />
        </div>
      </div>

      <div className="relative z-10 mx-auto h-[78px] w-full max-w-[1442px]">
        {/* Desktop (>=1024px): absolute positions from Figma, adapted for smaller viewports */}
        <Link
          href="/"
          className="absolute top-[19.158203125px] left-[40px] hidden h-[38px] w-[135.443px] min-[1440px]:left-[110px] lg:block"
          data-node-id="2379:1574"
        >
          <Image
            src="/navbar/logo.png"
            alt="Ambient Scientific"
            width={135}
            height={38}
            className="h-[38px] w-[135.443px] object-cover object-left"
            priority
          />
        </Link>

        <nav
          className="absolute top-[19.158203125px] left-[200px] right-[200px] hidden h-[37px] items-center justify-center gap-[12px] p-[10px] lg:flex min-[1440px]:left-[415px] min-[1440px]:right-auto min-[1440px]:w-[632px]"
          aria-label="Main"
          data-node-id="2379:1575"
        >
          {NAV_ITEMS.map((item) => (
            <span key={item.label} className="contents">
              <Link
                href={item.href}
                className="shrink-0 text-center text-[14px] leading-[normal] font-medium tracking-[-0.42px] whitespace-nowrap text-white"
              >
                {item.label}
              </Link>
              {item.hasChevron ? <NavChevron /> : null}
            </span>
          ))}
        </nav>

        <div className="absolute top-[21.158203125px] right-[40px] hidden lg:block min-[1440px]:right-auto min-[1440px]:left-[1191.5px]">
          <NavbarCta />
        </div>

        {/* Mobile (<1024px): Absolute positioning to guarantee placement */}
        <div className="absolute inset-0 block lg:hidden">
          <Link
            href="/"
            className="absolute top-[20px] left-[16px] flex h-[38px] w-[135px] items-center overflow-hidden"
          >
            <Image
              src="/navbar/logo.png"
              alt="Ambient Scientific"
              width={135}
              height={38}
              className="h-[38px] w-auto object-contain object-left"
              priority
              unoptimized
            />
          </Link>

          <div className="absolute top-[21px] right-[16px] flex h-[36px] w-[36px] items-center justify-center">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
