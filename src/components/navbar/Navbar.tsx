"use client";

import { interMedium } from "../hero/fonts";
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

  if (item.hasChevron || item.children?.length) {
    return (
      <div className="relative flex h-full items-center gap-[12px]">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="flex items-center gap-[12px] shrink-0 text-center text-[14px] leading-[normal] font-medium tracking-[-0.42px] whitespace-nowrap text-white transition-opacity hover:opacity-80"
        >
          {item.label}
          <NavChevron className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute top-full left-1/2 z-30 -translate-x-1/2 pt-[24px] transition-all duration-200 ${
            isOpen
              ? "visible opacity-100 translate-y-0"
              : "invisible opacity-0 -translate-y-2"
          }`}
        >
          <div className="min-w-[220px] rounded-2xl border border-white/10 bg-[#0A0A0A]/95 p-[8px] shadow-lg backdrop-blur-xl">
            {item.children && item.children.length > 0 ? (
              item.children.map((child: any) => (
                <Link
                  key={child.label}
                  href={child.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-[16px] py-[10px] text-[14px] leading-[normal] font-medium tracking-[-0.42px] whitespace-nowrap text-white/90 transition-all hover:bg-white/5"
                >
                  {child.label}
                </Link>
              ))
            ) : (
              <div className="px-[16px] py-[10px] text-[14px] text-white/50 italic">
                Coming soon
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <span className="contents">
      <Link
        href={item.href}
        className="shrink-0 text-center text-[14px] leading-[normal] font-medium tracking-[-0.42px] whitespace-nowrap text-white transition-opacity hover:opacity-80"
      >
        {item.label}
      </Link>
    </span>
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
          {navItems.map((item, index) => (
            <NavItem key={item.label} item={item} />
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
