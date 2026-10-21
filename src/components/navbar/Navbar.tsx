"use client";

import { interMedium, interRegular } from "../hero/fonts";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState, useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  mapStrapiNavItems,
  mergeApplicationNavItems,
  getProductsColumns,
  megaIconFor,
  navIconFor,
  DEFAULT_SHOP_ITEM,
  type ApplicationPageSummary,
  type NavMegaColumn,
} from "./nav-items";
import { MobileMenu } from "./MobileMenu";
import { NavbarCta } from "./NavbarCta";
import { ShopNavButton } from "./ShopNavButton";
import { DropdownCta } from "./DropdownCta";

function ProductsMegaMenu({
  columns,
  onNavigate,
}: {
  columns?: NavMegaColumn[];
  onNavigate: () => void;
}) {
  const cols = getProductsColumns(columns);
  return (
    <div
      className="relative w-max min-w-[800px] max-w-[1200px] border-[0.5px] border-[rgba(255,255,255,0.1)] bg-[rgba(15,14,14,0.98)]"
      data-node-id="4625:8704"
      data-name="Dropdown"
    >
      {/* Corner elements overlay */}
      <div className="pointer-events-none absolute left-[0.5px] top-[0.5px] h-[calc(100%-1px)] w-[calc(100%-1px)]">
        <Image src="/navbar/dropdown-corners.svg" alt="" fill className="block max-w-none" aria-hidden />
      </div>

      {/* Content — columns, 2x2 grid, gap 32px, padding 30px. */}
      <div className="relative grid grid-cols-2 gap-[32px] p-[30px]">
        {cols.map((column) => (
          <div
            key={column.title}
            className="flex flex-col gap-[12px]"
          >
            <div className="flex shrink-0 items-center gap-[6px]">
              <span className="relative size-[24px] shrink-0 overflow-clip">
                <Image src={megaIconFor(column.title)} alt="" fill className="object-contain" aria-hidden />
              </span>
              <span className={`${interRegular.className} max-w-full whitespace-nowrap text-[16px] leading-[24px] font-normal text-[#f0f0f0] overflow-hidden text-ellipsis`}>
                {column.title}
              </span>
            </div>
            {column.links.length > 0 ? (
              <div className="flex flex-col gap-[6px]">
                {column.links.map((link) => {
                  const isGPX40 = link.label === "GPX40" || link.label === "GPX64"; // handle both for safety if Strapi sends GPX64
                  const labelToDisplay = link.label === "GPX64" ? "GPX40" : link.label;
                  
                  if (isGPX40) {
                    return (
                      <div
                        key={link.label}
                        className="flex items-center gap-[8px] w-fit opacity-50 cursor-not-allowed select-none py-[2px]"
                      >
                        <span
                          className={`${interRegular.className} text-[14px] leading-[21px] font-normal min-[1024px]:text-[16px] min-[1024px]:leading-[24px] text-[#f0f0f0]`}
                        >
                          {labelToDisplay}
                        </span>
                        <span className="text-[10px] leading-[14px] font-medium tracking-wide text-[#a8ed90] bg-[#a8ed90]/10 border border-[#a8ed90]/25 rounded-[3px] px-[6px] py-[1px] uppercase whitespace-nowrap">
                          Coming soon
                        </span>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={onNavigate}
                      className={`${interRegular.className} w-full flex items-center gap-[6px] text-[14px] leading-[21px] font-normal transition-opacity [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px] text-[#ccc] opacity-90 hover:opacity-100`}
                    >
                      {labelToDisplay}
                    </Link>
                  );
                })}
              </div>
            ) : null}
            {column.description ? (
              <p className={`${interRegular.className} w-full text-[12px] leading-[18px] font-normal text-[#ccc] opacity-90 [word-break:break-word]`}>
                {column.description}
              </p>
            ) : null}
            {column.ctaLabel && column.ctaHref ? (
              <div className="mt-auto pt-[4px]">
                <DropdownCta href={column.ctaHref} label={column.ctaLabel} onNavigate={onNavigate} />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function NavIconDropdown({
  item,
  onNavigate,
  compact = false,
}: {
  item: {
    label?: string;
    children?: { label: string; href: string; icon?: string; disabled?: boolean; comingSoon?: boolean }[];
  };
  onNavigate: () => void;
  compact?: boolean;
}) {
  const children = Array.isArray(item?.children) ? item.children : [];
  const width = compact ? 240 : 252;
  const pad = compact ? 24 : 30;
  const gap = compact ? 20 : 24;
  const iconSize = compact ? 20 : 24;
  const fontSize = compact ? 14 : 16;
  const leading = compact ? 21 : 24;
  const itemGap = compact ? 8 : 10;

  return (
    <div
      className="relative border-[0.5px] border-[rgba(255,255,255,0.1)] bg-[rgba(15,14,14,0.98)]"
      style={{ width }}
    >
      <div className="pointer-events-none absolute inset-0">
        <Image src="/navbar/dropdown-corners.svg" alt="" fill className="block max-w-none" aria-hidden />
      </div>
      <div className="relative flex flex-col" style={{ padding: pad, gap }}>
        {children.length > 0 ? (
          children.map((child) => {
            const isDisabled = child.disabled || child.comingSoon;

            if (isDisabled) {
              return (
                <div
                  key={child.label}
                  className="relative flex flex-col cursor-not-allowed select-none opacity-50"
                  style={{ gap: itemGap }}
                  aria-disabled="true"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-[6px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={navIconFor(child.label, child.href, child.icon)}
                        alt=""
                        className="shrink-0 grayscale opacity-80"
                        style={{ width: iconSize, height: iconSize }}
                        aria-hidden
                      />
                      <span
                        className={`${interRegular.className} max-w-full whitespace-nowrap font-normal text-[#f0f0f0]`}
                        style={{ fontSize, lineHeight: `${leading}px` }}
                      >
                        {child.label}
                      </span>
                    </div>
                    <span className="text-[10px] leading-[14px] font-medium tracking-wide text-[#a8ed90] bg-[#a8ed90]/10 border border-[#a8ed90]/25 rounded-[3px] px-[6px] py-[1px] uppercase whitespace-nowrap">
                      Coming soon
                    </span>
                  </div>
                  <div className="w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/navbar/nav-divider.svg"
                      alt=""
                      className="block h-[1px] w-full"
                      aria-hidden
                    />
                  </div>
                </div>
              );
            }

            return (
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
                    src={navIconFor(child.label, child.href, child.icon)}
                    alt=""
                    className="shrink-0"
                    style={{ width: iconSize, height: iconSize }}
                    aria-hidden
                  />
                  <span
                    className={`${interRegular.className} max-w-full whitespace-nowrap font-normal text-[#f0f0f0] overflow-hidden text-ellipsis transition-colors group-hover:text-white`}
                    style={{ fontSize, lineHeight: `${leading}px` }}
                  >
                    {child.label}
                  </span>
                </div>
                <div className="w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/navbar/nav-divider.svg"
                    alt=""
                    className="block h-[1px] w-full"
                    aria-hidden
                  />
                </div>
              </Link>
            );
          })
        ) : (
          <div className="text-[14px] text-white/50 italic">Coming soon</div>
        )}
      </div>
    </div>
  );
}


function NavItem({ item }: { item: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const isProducts = item.label?.toLowerCase() === "products";

  // Mega menu is left-anchored to the Products item; below ~1180px viewports
  // its fixed max-content width crosses the viewport edge and gets clipped.
  // Clamp it to the viewport so the columns narrow instead of being cut off.
  // Wide viewports are untouched (clamp only applies on overflow).
  useLayoutEffect(() => {
    const wrap = dropdownRef.current;
    const panel = wrap?.firstElementChild as HTMLElement | null;
    if (!wrap || !panel) return;
    panel.style.minWidth = "";
    panel.style.maxWidth = "";
    if (!isOpen) return;
    const overflow = panel.getBoundingClientRect().right - (window.innerWidth - 16);
    if (overflow > 0) {
      panel.style.minWidth = "0px";
      panel.style.maxWidth = `${Math.max(320, Math.round(panel.offsetWidth - overflow))}px`;
    }
  }, [isOpen]);

  if (item.hasChevron || item.children?.length) {
    return (
      <div 
        className="relative flex h-full items-center gap-[12px] group"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Link
          href={item.href !== "#" && !isProducts ? item.href : "#"}
          onClick={(e) => {
            if (item.href === "#" || isProducts) {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(!isOpen);
            }
          }}
          className="flex items-center gap-[6px] shrink-0 text-center text-[14px] leading-[normal] font-medium tracking-[-0.42px] whitespace-nowrap text-white transition-opacity hover:opacity-80"
        >
          <span className="max-w-full overflow-hidden text-ellipsis">{item.label}</span>
        </Link>
        <div
          ref={dropdownRef}
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
            <ProductsMegaMenu columns={item.megaColumns} onNavigate={() => setIsOpen(false)} />
          ) : (
            <NavIconDropdown
              item={item}
              onNavigate={() => setIsOpen(false)}
              compact={["company", "application", "applications", "resources"].includes(
                (item.label || "").toLowerCase()
              )}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <span className="contents">
      <Link
        href={item.href}
        className="flex items-center gap-[6px] shrink-0 text-center text-[14px] leading-[normal] font-medium tracking-[-0.42px] whitespace-nowrap text-white transition-opacity hover:opacity-80"
      >
        <span className="max-w-full overflow-hidden text-ellipsis">{item.label}</span>
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

export function Navbar({
  data,
  brandData,
  applicationPages,
}: {
  data?: any;
  brandData?: any;
  applicationPages?: ApplicationPageSummary[];
}) {
  const navItems = mergeApplicationNavItems(
    mapStrapiNavItems(data?.nav_items),
    applicationPages
  );
  // Shop is rendered as a button in the top-right CTA cluster (next to
  // "Get in touch"), not inside the centered nav.
  const shopItem =
    navItems.find((item) => item.label?.toLowerCase() === "shop") ??
    DEFAULT_SHOP_ITEM;
  const navLinks = navItems.filter(
    (item) => item.label?.toLowerCase() !== "shop"
  );
  // The CMS logo is a lower-quality asset. Use the high-resolution
  // brand asset so the 46px mobile mark remains crisp on high-DPR screens.
  const logoSrc = "/navbar/logo.png";
  return (
    <header
      className={`${interMedium.className} sticky top-0 z-50 h-[78px] w-full drop-shadow-[0px_6px_12px_rgba(83,216,36,0.12)]`}
      data-node-id="2379:1569"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-[0.158px] left-1/2 h-[77.5px] w-[calc((50%_-_16px)*2.42787)] md:w-full xl:min-w-[1511px] -translate-x-1/2"
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
        className="pointer-events-none absolute top-[35.158px] left-1/2 h-[43px] w-[calc((50%_-_16px)*2.42787)] md:w-full xl:min-w-[1511px] -translate-x-1/2"
        data-node-id="2379:1573"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/navbar/vector-36.svg"
          alt=""
          className="hidden xl:block size-full max-w-none"
        />
        <img
          src="/mobile/Vector 36.png"
          alt=""
          className="block xl:hidden size-full max-w-none"
        />
      </div>

      {/* Left Connecting Vector */}
      <div 
        className="absolute z-20 flex size-[5px] items-center justify-center md:hidden"
        style={{ left: "16px", bottom: "-2.5px", transform: "translateX(-50%)" }}
      >
        <img src="/hero/line-cap-left.svg" alt="" className="block size-full" />
      </div>
      {/* Right Connecting Vector */}
      <div 
        className="absolute z-20 flex size-[5px] items-center justify-center md:hidden"
        style={{ right: "16px", bottom: "-2.5px", transform: "translateX(50%)" }}
      >
        <img src="/hero/line-cap-right.svg" alt="" className="block size-full" />
      </div>

      <div className="relative z-10 mx-auto h-[78px] w-full max-w-[1442px]">
        {/* Desktop (>=1280px): absolute positions from Figma, adapted for smaller viewports */}
        <Link
          href="/"
          className="absolute z-20 top-1/2 -translate-y-1/2 left-[40px] hidden h-[52px] w-max min-[1440px]:left-[110px] xl:flex items-center"
          data-node-id="2379:1574"
        >
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt="Ambient Scientific"
              width={250}
              height={52}
              className="h-[52px] w-auto object-contain object-left"
              priority
              unoptimized
            />
          ) : null}
        </Link>

        <nav
          className="absolute top-[19.158px] left-[185px] right-[185px] hidden h-[37px] items-center justify-center gap-[10px] p-[10px] xl:flex min-[1440px]:left-[200px] min-[1440px]:right-[200px] min-[1440px]:gap-[12px]"
          aria-label="Main"
          data-node-id="2379:1575"
        >
          <NavVectorDivider />
          {navLinks.map((item, index) => (
            <Fragment key={item.label}>
              {index > 0 && <NavVectorDivider />}
              <NavItem item={item} />
            </Fragment>
          ))}
        </nav>

        {/* Right CTA cluster: Shop + Get in touch, compact 134px buttons.
         *  right-[101.5px] keeps the pair inside the navbar's angled right
         *  edge (same clearance the Figma CTA had). */}
        <div className="absolute top-[21.158px] right-[101.5px] hidden items-center gap-[10px] xl:flex z-20">
          {shopItem ? <ShopNavButton item={shopItem} /> : null}
          <NavbarCta data={data} />
        </div>

        {/* Mobile & Tablet (<1280px): Absolute positioning to guarantee placement */}
        <div className="absolute inset-0 block xl:hidden pointer-events-none">
          <Link
            href="/"
            className="absolute z-20 top-1/2 -translate-y-1/2 left-[16px] md:left-[32px] min-[1024px]:left-[40px] flex h-[46px] w-max items-center pointer-events-auto"
          >
            {logoSrc ? (
              <Image
                src={logoSrc}
                alt="Ambient Scientific"
                width={250}
                height={46}
                className="h-[46px] w-auto object-contain object-left"
                priority
                unoptimized
              />
            ) : null}
          </Link>

          <div className="absolute top-[21px] right-[16px] md:right-[32px] min-[1024px]:right-[40px] flex items-center gap-[12px] z-30 pointer-events-auto">
            {shopItem ? (
              <div className="hidden min-[600px]:block">
                <ShopNavButton item={shopItem} />
              </div>
            ) : null}
            <div className="flex h-[36px] w-[36px] items-center justify-center">
              <MobileMenu
                data={data}
                brandData={brandData}
                applicationPages={applicationPages}
                shopItem={shopItem}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
