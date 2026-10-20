"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { interMedium, interRegular } from "../hero/fonts";
import {
  mapStrapiNavItems,
  mergeApplicationNavItems,
  getProductsColumns,
  megaIconFor,
  navIconFor,
  DEFAULT_SHOP_ITEM,
  type ApplicationPageSummary,
} from "./nav-items";
import { NavbarCta } from "./NavbarCta";
import { ShopNavButton } from "./ShopNavButton";
import { DropdownCta } from "./DropdownCta";

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function MenuIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="text-white"
    >
      <path
        d="M3 8h18"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M3 16h18"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="text-white"
    >
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
      <path
        d="M1 1l4 4 4-4"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MobileMenu({
  data,
  applicationPages,
  shopItem: propShopItem,
}: {
  data?: { nav_items?: unknown[]; cta_label?: string; cta_href?: string };
  brandData?: unknown;
  applicationPages?: ApplicationPageSummary[];
  shopItem?: { label: string; href: string };
}) {
  const navItems = mergeApplicationNavItems(
    mapStrapiNavItems(data?.nav_items),
    applicationPages
  );
  const isShopItem = (item: { label?: string; href?: string }) => {
    const l = item.label?.trim().toLowerCase();
    const h = item.href?.trim().toLowerCase();
    return l === "shop" || h === "/shop" || (h ? h.includes("shop.ambient") : false);
  };

  const shopItem =
    propShopItem ??
    navItems.find(isShopItem) ??
    DEFAULT_SHOP_ITEM;

  const navLinks = navItems.filter((item) => !isShopItem(item));

  // Keep the menu header in sync with the high-resolution navbar logo.
  const logoSrc = "/navbar/logo.png";
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const isClient = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  );
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    // Lock <html> as well: iOS Safari ignores body-level overflow:hidden for
    // touch panning, letting the page scroll behind the open menu.
    const root = document.documentElement;
    const prevRoot = root.style.overflow;
    const prev = document.body.style.overflow;
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      root.style.overflow = prevRoot;
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    setExpanded(null);
  };

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="relative z-30 flex h-[36px] w-[36px] shrink-0 cursor-pointer items-center justify-center pointer-events-auto focus:outline-none"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {isClient &&
        createPortal(
          <div
            id="mobile-nav"
            className={`${interMedium.className} fixed inset-0 z-[9999] overflow-hidden ${
              open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            }`}
            style={{
              visibility: open ? "visible" : "hidden",
            }}
            aria-hidden={!open}
          >
            <div
              onClick={close}
              className={`absolute inset-0 bg-black/75 transition-opacity duration-300 ${
                open ? "pointer-events-auto opacity-100" : "opacity-0"
              }`}
            />

            {/* Header overlay for the menu */}
            <div
              className={`absolute top-0 inset-x-0 h-[78px] bg-black transition-opacity duration-300 flex items-center z-20 ${
                open
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              <Link
                href="/"
                onClick={close}
                className="absolute top-1/2 -translate-y-1/2 left-[16px] md:left-[32px] min-[1024px]:left-[40px] flex h-[46px] w-max items-center"
              >
                {logoSrc ? (
                  <Image
                    src={logoSrc}
                    alt="Ambient Scientific"
                    width={200}
                    height={46}
                    className="h-[46px] w-auto object-contain object-left"
                    unoptimized
                  />
                ) : null}
              </Link>

              <div className="absolute top-[21px] right-[16px] md:right-[32px] min-[1024px]:right-[40px] flex items-center gap-[12px]">
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={close}
                  className="flex h-[36px] w-[36px] shrink-0 cursor-pointer items-center justify-center"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            <div
              className={`absolute inset-x-0 bottom-0 top-[78px] overflow-hidden ${
                open ? "pointer-events-auto" : "pointer-events-none"
              }`}
            >
              <nav
                aria-label="Mobile"
                className={`absolute inset-x-0 top-0 max-h-full overflow-y-auto origin-top border-t border-white/10 bg-black transition-transform duration-300 ease-out ${
                  open
                    ? "pointer-events-auto translate-y-0"
                    : "-translate-y-full"
                }`}
              >
                <ul className="px-[24px] pt-[8px]">
                  {navLinks.map((item) => {
                    const active = item.href !== "#" && pathname === item.href;
                    const isExpanded = expanded === item.label;
                    const isProducts =
                      item.label?.toLowerCase() === "products";
                    const hasDropdown =
                      isProducts ||
                      Boolean(item.hasChevron || item.children?.length);

                    if (hasDropdown) {
                      return (
                        <li
                          key={item.label}
                          className="border-b border-white/[0.06]"
                        >
                          <div
                            onClick={() => {
                              if (
                                item.href === "#" ||
                                isProducts ||
                                item.hasChevron
                              ) {
                                setExpanded(isExpanded ? null : item.label);
                              }
                            }}
                            className="flex w-full items-center justify-between py-[16px] text-left cursor-pointer"
                          >
                            {item.href && item.href !== "#" && !isProducts ? (
                              <Link
                                href={item.href}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  close();
                                }}
                                className={`text-[16px] leading-[normal] tracking-[-0.42px] transition-colors hover:text-[#6ced3f] ${
                                  active ? "text-[#6ced3f]" : "text-white"
                                }`}
                              >
                                {item.label}
                              </Link>
                            ) : (
                              <span
                                className={`text-[16px] leading-[normal] tracking-[-0.42px] select-none ${
                                  active ? "text-[#6ced3f]" : "text-white"
                                }`}
                              >
                                {item.label}
                              </span>
                            )}
                            <button
                              type="button"
                              aria-label={`Toggle ${item.label} submenu`}
                              aria-expanded={isExpanded}
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpanded(isExpanded ? null : item.label);
                              }}
                              className={`flex h-[24px] w-[24px] items-center justify-center transition-transform duration-200 ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            >
                              <ChevronDown />
                            </button>
                          </div>

                          <div
                            className={`overflow-hidden transition-[max-height] duration-300 ease-out ${
                              isExpanded ? "max-h-[1600px]" : "max-h-0"
                            }`}
                          >
                            {isProducts ? (
                              /* Products mega menu dropdown content (exact match with desktop) */
                              <div className="flex flex-col gap-[16px] pb-[16px] pt-[8px] pl-[8px] pr-[8px]">
                                {getProductsColumns(item.megaColumns).map(
                                  (column) => (
                                    <div
                                      key={column.title}
                                      className="relative flex flex-col gap-[10px] rounded-[4px] border border-white/[0.08] bg-white/[0.02] p-[16px]"
                                    >
                                      <div className="flex shrink-0 items-center gap-[8px]">
                                        <span className="relative size-[20px] shrink-0 overflow-clip">
                                          <Image
                                            src={megaIconFor(column.title)}
                                            alt=""
                                            fill
                                            className="object-contain"
                                            aria-hidden
                                          />
                                        </span>
                                        <span
                                          className={`${interRegular.className} text-[15px] leading-[22px] font-normal text-[#f0f0f0]`}
                                        >
                                          {column.title}
                                        </span>
                                      </div>

                                      {column.links.length > 0 && (
                                        <div className="flex flex-col gap-[6px] pl-[28px]">
                                          {column.links.map((link) => {
                                            const isGPX40 =
                                              link.label === "GPX40" ||
                                              link.label === "GPX64";
                                            const labelToDisplay =
                                              link.label === "GPX64"
                                                ? "GPX40"
                                                : link.label;

                                            if (isGPX40) {
                                              return (
                                                <div
                                                  key={link.label}
                                                  className="flex items-center gap-[8px] w-fit opacity-50 cursor-not-allowed select-none py-[2px]"
                                                >
                                                  <span
                                                    className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-[#f0f0f0]`}
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
                                                onClick={close}
                                                className={`${interRegular.className} flex items-center gap-[6px] text-[14px] leading-[21px] font-normal text-[#ccc] opacity-90 transition-opacity hover:opacity-100 hover:text-white`}
                                              >
                                                {labelToDisplay}
                                              </Link>
                                            );
                                          })}
                                        </div>
                                      )}

                                      {column.description && (
                                        <p
                                          className={`${interRegular.className} pl-[28px] text-[12px] leading-[18px] font-normal text-[#ccc] opacity-90`}
                                        >
                                          {column.description}
                                        </p>
                                      )}

                                      {column.ctaLabel && column.ctaHref && (
                                        <div className="pl-[28px] pt-[4px]">
                                          <DropdownCta
                                            href={column.ctaHref}
                                            label={column.ctaLabel}
                                            onNavigate={close}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            ) : (
                              /* Standard icon dropdown content (Applications, Company, Resources) */
                              <div className="flex flex-col gap-[12px] pb-[16px] pt-[8px] pl-[12px] pr-[12px]">
                                {item.children && item.children.length > 0 ? (
                                  item.children.map((child) => {
                                    const isDisabled =
                                      child.disabled || child.comingSoon;

                                    if (isDisabled) {
                                      return (
                                        <div
                                          key={child.label}
                                          className="relative flex flex-col gap-[8px] cursor-not-allowed select-none opacity-50"
                                          aria-disabled="true"
                                        >
                                          <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center gap-[8px]">
                                              {/* eslint-disable-next-line @next/next/no-img-element */}
                                              <img
                                                src={navIconFor(
                                                  child.label,
                                                  child.href,
                                                  child.icon
                                                )}
                                                alt=""
                                                className="shrink-0 grayscale opacity-80"
                                                style={{ width: 18, height: 18 }}
                                                aria-hidden
                                              />
                                              <span
                                                className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-[#f0f0f0]`}
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

                                    const childActive =
                                      child.href !== "#" &&
                                      pathname === child.href;

                                    return (
                                      <Link
                                        key={child.label}
                                        href={child.href}
                                        onClick={close}
                                        className="group flex flex-col gap-[8px]"
                                      >
                                        <div className="flex items-center gap-[8px]">
                                          {/* eslint-disable-next-line @next/next/no-img-element */}
                                          <img
                                            src={navIconFor(
                                              child.label,
                                              child.href,
                                              child.icon
                                            )}
                                            alt=""
                                            className="shrink-0"
                                            style={{ width: 18, height: 18 }}
                                            aria-hidden
                                          />
                                          <span
                                            className={`${interRegular.className} text-[14px] leading-[21px] font-normal transition-colors ${
                                              childActive
                                                ? "text-[#6ced3f]"
                                                : "text-[#f0f0f0] group-hover:text-white"
                                            }`}
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
                                  <div className="text-[14px] text-white/50 italic py-[4px]">
                                    Coming soon
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </li>
                      );
                    }

                    return (
                      <li
                        key={item.label}
                        className="border-b border-white/[0.06]"
                      >
                        <Link
                          href={item.href}
                          onClick={close}
                          className="flex items-center justify-between py-[16px] text-[16px] leading-[normal] tracking-[-0.42px]"
                        >
                          <span
                            className={`flex items-center gap-[8px] ${
                              item.highlight || active
                                ? "text-[#6ced3f]"
                                : "text-white"
                            }`}
                          >
                            {item.label}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* Bottom CTA Area: Shop button + Get in touch CTA */}
                <div className="px-[24px] pb-[32px] pt-[24px] flex flex-wrap items-center gap-[12px]">
                  {shopItem ? (
                    <ShopNavButton item={shopItem} onClick={close} />
                  ) : null}
                  <NavbarCta data={data} />
                </div>
              </nav>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
