import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import { NAV_ITEMS } from "./nav-items";
import { NavbarCta } from "./NavbarCta";

const interMedium = Inter({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});

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
      className={`${interMedium.className} relative z-50 h-[78px] w-full overflow-hidden drop-shadow-[0px_6px_12px_rgba(83,216,36,0.12)]`}
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
        {/* Desktop (1440): absolute positions from Figma */}
        <Link
          href="/"
          className="absolute top-[19.158203125px] left-[110px] hidden h-[38px] w-[135.443px] min-[1440px]:block"
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
          className="absolute top-[19.158203125px] left-[415px] hidden h-[37px] w-[632px] items-center justify-center gap-[12px] p-[10px] min-[1440px]:flex"
          aria-label="Main"
          data-node-id="2379:1575"
        >
          {NAV_ITEMS.map((item) => (
            <span key={item.label} className="contents">
              <a
                href={item.href}
                className="shrink-0 text-center text-[14px] leading-[normal] font-medium tracking-[-0.42px] whitespace-nowrap text-white"
              >
                {item.label}
              </a>
              {item.hasChevron ? <NavChevron /> : null}
            </span>
          ))}
        </nav>

        <div className="absolute top-[21.158203125px] left-[1191.5px] hidden min-[1440px]:block">
          <NavbarCta />
        </div>

        {/* Tablet / mobile: flex row (no Figma frames — proportional layout) */}
        <div className="flex h-[78px] items-center justify-between px-[24px] min-[1440px]:hidden max-[767px]:px-[24px] min-[768px]:max-[1439px]:px-[48px]">
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
