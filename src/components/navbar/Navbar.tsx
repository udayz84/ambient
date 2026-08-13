"use client";

import { interMedium, interRegular, gilroyMedium } from "../hero/fonts";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { mapStrapiNavItems } from "./nav-items";
import { MobileMenu } from "./MobileMenu";
import { NavbarCta } from "./NavbarCta";
import { mediaUrl } from "@/lib/strapi";

function NavChevron({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/navbar/chevron.svg"
      alt=""
      width={5}
      height={4}
      className={`h-[4px] w-[5px] shrink-0 ${className}`}
      aria-hidden
    />
  );
}

function ShoppingCartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  );
}

/** Figma 4625:8704 — Products mega-menu dropdown (800×210 panel). */
function ProductsMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div
      className="relative w-[800px] border-[0.5px] border-[rgba(255,255,255,0.1)] bg-[#0f0e0e]"
      data-node-id="4625:8704"
      data-name="Dropdown"
    >
      {/* Corner elements overlay */}
      <div className="pointer-events-none absolute left-[0.5px] top-[0.5px] h-[calc(100%-1px)] w-[calc(100%-1px)]">
        <Image src="/navbar/dropdown-corners.svg" alt="" fill className="block max-w-none" aria-hidden />
      </div>

      {/* Content — 3 columns, gap 32px, padding 30px */}
      <div className="relative flex items-start gap-[32px] p-[30px]">
        {/* Column 1 — Processors (200px) */}
        <div className="flex w-[200px] shrink-0 flex-col gap-[12px]">
          <div className="flex shrink-0 items-center gap-[6px]">
            <span className="relative size-[24px] shrink-0 overflow-clip">
              <Image src="/navbar/dropdown-icon-chip.svg" alt="" fill className="object-contain" aria-hidden />
            </span>
            <span className={`${interRegular.className} whitespace-nowrap text-[16px] leading-[24px] font-normal text-[#f0f0f0]`}>
              Processors
            </span>
          </div>
          <div className="flex flex-col gap-[6px]">
            <Link href="/products" onClick={onNavigate} className={`${interRegular.className} w-full text-[14px] leading-[21px] font-normal text-[#ccc] opacity-90 transition-opacity hover:opacity-100`}>
              GPX10PRO
            </Link>
            <Link href="/products" onClick={onNavigate} className={`${interRegular.className} w-full text-[14px] leading-[21px] font-normal text-[#ccc] opacity-90 transition-opacity hover:opacity-100`}>
              GPX64
            </Link>
          </div>
        </div>

        {/* Column 2 — System-on-Modules (flex-1) */}
        <div className="flex min-w-px flex-1 flex-col gap-[12px]">
          <div className="flex shrink-0 items-center gap-[6px]">
            <span className="relative size-[24px] shrink-0 overflow-clip">
              <Image src="/navbar/dropdown-icon-som.svg" alt="" fill className="object-contain" aria-hidden />
            </span>
            <span className={`${interRegular.className} whitespace-nowrap text-[16px] leading-[24px] font-normal text-[#f0f0f0]`}>
              System-on-Modules
            </span>
          </div>
          <p className={`${interRegular.className} w-full text-[12px] leading-[18px] font-normal text-[#ccc] opacity-90`}>
            Drop-in reference modules for rapid product development
          </p>
          <DropdownCta href="/SOM" label="View all SOMs" onNavigate={onNavigate} />
        </div>

        {/* Column 3 — Development Kits (flex-1) */}
        <div className="flex min-w-px flex-1 flex-col gap-[12px]">
          <div className="flex shrink-0 items-center gap-[6px]">
            <span className="relative size-[24px] shrink-0 overflow-clip">
              <Image src="/navbar/dropdown-icon-devkit.svg" alt="" fill className="object-contain" aria-hidden />
            </span>
            <span className={`${interRegular.className} whitespace-nowrap text-[16px] leading-[24px] font-normal text-[#f0f0f0]`}>
              Development Kits
            </span>
          </div>
          <p className={`${interRegular.className} w-full text-[12px] leading-[18px] font-normal text-[#ccc] opacity-90`}>
            Plug-and-play boards to test your models quickly
          </p>
          <DropdownCta href="/dvk" label="View all Dev Kits" onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}

/** Figma 4674:10315 / 4691:10527 / 4691:10636 — icon + label dropdown panel (212px wide).
 *  Items come from Strapi nav sub-items; icons are mapped by label (Strapi has no icon field). */
const NAV_ICON_BY_LABEL: Record<string, string> = {
  company: "/navbar/nav-icon-company.svg",
  careers: "/navbar/nav-icon-careers.svg",
  application: "/navbar/nav-icon-chip.svg",
  applications: "/navbar/nav-icon-chip.svg",
  wearables: "/navbar/nav-icon-wearables.svg",
  "smart homes": "/navbar/nav-icon-smart-homes.svg",
  "medical devices": "/navbar/nav-icon-medical.svg",
  "resources centre": "/navbar/nav-icon-chip.svg",
  "resources center": "/navbar/nav-icon-chip.svg",
  resources: "/navbar/nav-icon-chip.svg",
  blogs: "/navbar/nav-icon-blog.svg",
  "news & media": "/navbar/nav-icon-blog.svg",
  "news and media": "/navbar/nav-icon-blog.svg",
};

const NAV_ICON_FALLBACK = "/navbar/nav-icon-chip.svg";

function navIconFor(label?: string): string {
  const key = (label || "").toLowerCase().trim();
  return NAV_ICON_BY_LABEL[key] || NAV_ICON_FALLBACK;
}

function NavIconDropdown({
  item,
  onNavigate,
  compact = false,
}: {
  item: { label?: string; children?: { label: string; href: string }[] };
  onNavigate: () => void;
  compact?: boolean;
}) {
  const children = Array.isArray(item?.children) ? item.children : [];
  const width = compact ? 190 : 212;
  const pad = compact ? 24 : 30;
  const gap = compact ? 20 : 24;
  const iconSize = compact ? 20 : 24;
  const fontSize = compact ? 14 : 16;
  const leading = compact ? 21 : 24;
  const itemGap = compact ? 8 : 10;
  const dividerWidth = compact ? 142 : 151.832;

  return (
    <div
      className="relative border-[0.5px] border-[rgba(255,255,255,0.1)] bg-[rgba(15,14,14,0.75)]"
      style={{ width }}
    >
      <div className="pointer-events-none absolute inset-0">
        <Image src="/navbar/dropdown-corners.svg" alt="" fill className="block max-w-none" aria-hidden />
      </div>
      <div className="relative flex flex-col" style={{ padding: pad, gap }}>
        {children.length > 0 ? (
          children.map((child) => (
            <Link
              key={child.label}
              href={child.href}
              onClick={onNavigate}
              className="group flex flex-col"
              style={{ gap: itemGap }}
            >
              <div className="flex items-center gap-[6px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={navIconFor(child.label)}
                  alt=""
                  className="shrink-0"
                  style={{ width: iconSize, height: iconSize }}
                  aria-hidden
                />
                <span
                  className={`${interRegular.className} whitespace-nowrap font-normal text-[#f0f0f0] transition-colors group-hover:text-white`}
                  style={{ fontSize, lineHeight: `${leading}px` }}
                >
                  {child.label}
                </span>
              </div>
              <div style={{ width: dividerWidth }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/navbar/nav-divider.svg"
                  alt=""
                  className="block h-[1px] w-full"
                  aria-hidden
                />
              </div>
            </Link>
          ))
        ) : (
          <div className="text-[14px] text-white/50 italic">Coming soon</div>
        )}
      </div>
    </div>
  );
}

/** Figma 4625:8736 — dropdown CTA button with corner brackets. */
function DropdownCta({ href, label, onNavigate }: { href: string; label: string; onNavigate: () => void }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`relative flex h-[48px] shrink-0 items-center justify-center bg-[rgba(226,241,202,0.12)] px-[20px] transition-opacity hover:opacity-90 ${gilroyMedium.className}`}
      style={{ width: label.length > 18 ? 180 : 160 }}
    >
      <span className="relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white">
        {label}
      </span>
      <div className="pointer-events-none absolute right-0 top-0 flex size-[4px] items-center justify-center">
        <div className="rotate-180 flex-none"><div className="relative size-[4px]"><div className="absolute inset-[0_0_-12.5%_-12.5%]"><Image src="/hero/corner-tag-2.svg" alt="" fill className="block max-w-none" aria-hidden /></div></div></div>
      </div>
      <div className="pointer-events-none absolute top-0 left-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none"><div className="relative size-[4px]"><div className="absolute inset-[0_0_-12.5%_-12.5%]"><Image src="/hero/corner-tag-1.svg" alt="" fill className="block max-w-none" aria-hidden /></div></div></div>
      </div>
      <div className="pointer-events-none absolute right-0 bottom-0 flex size-[4px] items-center justify-center">
        <div className="-scale-x-100 flex-none"><div className="relative size-[4px]"><div className="absolute inset-[0_0_-12.5%_-12.5%]"><Image src="/hero/corner-tag-2.svg" alt="" fill className="block max-w-none" aria-hidden /></div></div></div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 size-[4px]">
        <div className="absolute inset-[0_0_-12.5%_-12.5%]"><Image src="/hero/corner-tag-1.svg" alt="" fill className="block max-w-none" aria-hidden /></div>
      </div>
    </Link>
  );
}

function NavItem({ item }: { item: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const isShop = item.label?.toLowerCase() === "shop";
  const isProducts = item.label?.toLowerCase() === "products";

  if (item.hasChevron || item.children?.length) {
    return (
      <div 
        className="relative flex h-full items-center gap-[12px] group"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="flex items-center gap-[6px] shrink-0 text-center text-[14px] leading-[normal] font-medium tracking-[-0.42px] whitespace-nowrap text-white transition-opacity hover:opacity-80"
        >
          {item.label}
        </button>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute top-full z-30 pt-[24px] transition-all duration-200 ${
            isProducts ? "left-0" : "left-1/2 -translate-x-1/2"
          } ${
            isOpen
              ? "visible opacity-100 translate-y-0"
              : "invisible opacity-0 -translate-y-2"
          }`}
        >
          {isProducts ? (
            <ProductsMegaMenu onNavigate={() => setIsOpen(false)} />
          ) : (
            <NavIconDropdown
              item={item}
              onNavigate={() => setIsOpen(false)}
              compact={["company", "application", "applications"].includes(
                (item.label || "").toLowerCase()
              )}
            />
          )}
        </div>
      </div>
    );
  }

  if (isShop) {
    return (
      <span className="contents">
        <Link
          href={item.href}
          className="relative flex h-[36px] items-center gap-[6px] shrink-0 justify-center px-[20px] shadow-[0px_42px_107px_0px_rgba(0,196,255,0.2),0px_24.721px_32.257px_0px_rgba(0,196,255,0.15),0px_10.268px_13.398px_0px_rgba(0,196,255,0.15)] transition-opacity hover:opacity-90"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#00d0ff] to-[#0055ff]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,255,0.6)]"
          />
          <span className="relative z-10 flex items-center gap-[6px] text-white">
            <ShoppingCartIcon />
            <span className="text-[14px] leading-[normal] font-bold uppercase tracking-[-0.42px] whitespace-nowrap">
              {item.label}
            </span>
          </span>
          <div className="pointer-events-none absolute right-0 top-0 z-20 flex size-[4px] items-center justify-center">
            <div className="-scale-x-100 -scale-y-100 flex-none">
              <div className="relative size-[4px]">
                <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                  <Image src="/hero/corner-tag-1.svg" alt="" fill className="block max-w-none" aria-hidden />
                </div>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute left-0 top-0 z-20 flex size-[4px] items-center justify-center">
            <div className="-scale-y-100 flex-none">
              <div className="relative size-[4px]">
                <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                  <Image src="/hero/corner-tag-1.svg" alt="" fill className="block max-w-none" aria-hidden />
                </div>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-0 right-0 z-20 flex size-[4px] items-center justify-center">
            <div className="-scale-x-100 flex-none">
              <div className="relative size-[4px]">
                <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                  <Image src="/hero/corner-tag-1.svg" alt="" fill className="block max-w-none" aria-hidden />
                </div>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 z-20 size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src="/hero/corner-tag-1.svg" alt="" fill className="block max-w-none" aria-hidden />
            </div>
          </div>
        </Link>
      </span>
    );
  }

  return (
    <span className="contents">
      <Link
        href={item.href}
        className="flex items-center gap-[6px] shrink-0 text-center text-[14px] leading-[normal] font-medium tracking-[-0.42px] whitespace-nowrap text-white transition-opacity hover:opacity-80"
      >
        {item.label}
      </Link>
    </span>
  );
}

function NavVectorDivider() {
  return (
    <div className="flex items-center justify-center mx-[2px] opacity-50" aria-hidden="true">
      <Image
        src="/hero/line-cap-left.svg"
        alt=""
        width={5}
        height={4}
        className="block"
      />
    </div>
  );
}

export function Navbar({ data, brandData }: { data?: any; brandData?: any }) {
  const navItems = mapStrapiNavItems(data?.nav_items);
  const logoSrc = mediaUrl(brandData?.logo);
  return (
    <header
      className={`${interMedium.className} sticky top-0 z-50 h-[78px] w-full overflow-x-clip drop-shadow-[0px_6px_12px_rgba(83,216,36,0.12)]`}
      data-node-id="2379:1569"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-[0.158px] left-1/2 h-[77.5px] w-[calc((50%_-_16px)*2.42787)] lg:w-full lg:min-w-[1511px] -translate-x-1/2"
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
        className="pointer-events-none absolute top-[35.158px] left-1/2 h-[43px] w-[calc((50%_-_16px)*2.42787)] lg:w-full lg:min-w-[1511px] -translate-x-1/2"
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
      </div>

      {/* Left Connecting Vector */}
      <div 
        className="absolute z-20 flex size-[5px] items-center justify-center lg:hidden"
        style={{ left: "16px", bottom: "-2.5px", transform: "translateX(-50%)" }}
      >
        <img src="/hero/line-cap-left.svg" alt="" className="block size-full" />
      </div>
      {/* Right Connecting Vector */}
      <div 
        className="absolute z-20 flex size-[5px] items-center justify-center lg:hidden"
        style={{ right: "16px", bottom: "-2.5px", transform: "translateX(50%)" }}
      >
        <img src="/hero/line-cap-right.svg" alt="" className="block size-full" />
      </div>

      <div className="relative z-10 mx-auto h-[78px] w-full max-w-[1442px]">
        {/* Desktop (>=1024px): absolute positions from Figma, adapted for smaller viewports */}
        <Link
          href="/"
          className="absolute top-[19.158px] left-[40px] hidden h-[38px] w-[135.443px] min-[1440px]:left-[110px] lg:block"
          data-node-id="2379:1574"
        >
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt="Ambient Scientific"
              width={135}
              height={38}
              className="h-[38px] w-[135.443px] object-cover object-left"
              priority
              unoptimized
            />
          ) : null}
        </Link>

        <nav
          className="absolute top-[19.158px] left-[185px] right-[185px] hidden h-[37px] items-center justify-center gap-[10px] p-[10px] lg:flex min-[1440px]:left-[200px] min-[1440px]:right-[200px] min-[1440px]:gap-[12px]"
          aria-label="Main"
          data-node-id="2379:1575"
        >
          <NavVectorDivider />
          {navItems.map((item, index) => (
            <Fragment key={item.label}>
              {index > 0 && <NavVectorDivider />}
              <NavItem item={item} />
            </Fragment>
          ))}
        </nav>

        <div className="absolute top-[21.158px] right-[40px] hidden lg:block min-[1440px]:right-auto min-[1440px]:left-[1191.5px]">
          <NavbarCta data={data} />
        </div>

        {/* Mobile (<1024px): Absolute positioning to guarantee placement */}
        <div className="absolute inset-0 block lg:hidden">
          <Link
            href="/"
            className="absolute top-[20px] left-[16px] flex h-[38px] w-[135px] items-center overflow-hidden"
          >
            {logoSrc ? (
              <Image
                src={logoSrc}
                alt="Ambient Scientific"
                width={135}
                height={38}
                className="h-[38px] w-auto object-contain object-left"
                priority
                unoptimized
              />
            ) : null}
          </Link>

          <div className="absolute top-[21px] right-[16px] flex h-[36px] w-[36px] items-center justify-center">
            <MobileMenu data={data} brandData={brandData} />
          </div>
        </div>
      </div>
    </header>
  );
}
