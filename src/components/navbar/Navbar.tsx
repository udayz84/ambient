import { gilroyMedium } from "../hero/fonts";
import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS } from "./nav-items";
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
      className={`${gilroyMedium.className} relative z-50 h-[78px] w-full overflow-hidden drop-shadow-[0px_6px_12px_rgba(83,216,36,0.12)]`}
      data-node-id="2379:1569"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-[0.158203125px] left-1/2 h-[77.5px] w-[1511px] -translate-x-1/2"
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
        className="pointer-events-none absolute top-[35.158203125px] left-1/2 h-[43px] w-[1511px] -translate-x-1/2"
        data-node-id="2379:1573"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/navbar/vector-36.svg"
          alt=""
          className="block size-full max-w-none"
        />
      </div>

      <div className="relative mx-auto h-[78px] w-full max-w-[1442px]">
        {/* Desktop (>=1024px): absolute positions from Figma, adapted for smaller viewports */}
        <Link
          href="/"
          className="absolute top-[19.158203125px] left-[40px] h-[38px] w-[135.443px] min-[1440px]:left-[110px]"
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
          className="absolute top-[19.158203125px] left-[200px] right-[200px] hidden h-[37px] items-center justify-center gap-[12px] p-[10px] min-[1024px]:flex min-[1440px]:left-[415px] min-[1440px]:right-auto min-[1440px]:w-[632px]"
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

        <div className="absolute top-[21.158203125px] right-[40px] hidden min-[1024px]:block min-[1440px]:right-auto min-[1440px]:left-[1191.5px]">
          <NavbarCta />
        </div>

        {/* Mobile (<1024px): flex row — logo + CTA only */}
        <div className="flex h-[78px] items-center justify-between px-[24px] max-[1023px]:flex min-[1024px]:hidden">
          <Link href="/" className="block h-[38px] w-[135.443px] shrink-0">
            <Image
              src="/navbar/logo.png"
              alt="Ambient Scientific"
              width={135}
              height={38}
              className="h-[38px] w-[135.443px] object-cover object-left"
              priority
            />
          </Link>
          <NavbarCta />
        </div>
      </div>
    </header>
  );
}
