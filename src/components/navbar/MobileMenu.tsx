"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { interMedium } from "../hero/fonts";
import { mapStrapiNavItems } from "./nav-items";
import { NavbarCta } from "./NavbarCta";
import { mediaUrl } from "@/lib/strapi";

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

export function MobileMenu({ data, brandData }: { data?: any; brandData?: any }) {
  const navItems = mapStrapiNavItems(data?.nav_items);
  const logoSrc = mediaUrl(brandData?.logo);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const isClient = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
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
        className="flex h-[36px] w-[36px] shrink-0 items-center justify-center"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {isClient && isMobile && createPortal(
          <div
            id="mobile-nav"
            className={`${interMedium.className} pointer-events-none fixed inset-x-0 bottom-0 top-0 z-[55] overflow-hidden`}
            aria-hidden={!open}
          >
            <div
              onClick={close}
              className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
                open ? "pointer-events-auto opacity-100" : "opacity-0"
              }`}
            />
            
            {/* Header overlay for the menu */}
            <div 
              className={`absolute top-0 inset-x-0 h-[78px] bg-black transition-opacity duration-300 flex items-center ${
                open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <Link
                href="/"
                onClick={close}
                className="absolute top-[20px] left-[16px] flex h-[38px] w-[135px] items-center overflow-hidden"
              >
                {logoSrc ? (
                  <Image
                    src={logoSrc}
                    alt="Ambient Scientific"
                    width={135}
                    height={38}
                    className="h-[38px] w-auto object-contain object-left"
                    unoptimized
                  />
                ) : null}
              </Link>

              <div className="absolute top-[21px] right-[16px] flex h-[36px] w-[36px] items-center justify-center">
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={close}
                  className="flex h-[36px] w-[36px] shrink-0 items-center justify-center"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 top-[78px] overflow-hidden pointer-events-none">
              <nav
                aria-label="Mobile"
                className={`absolute inset-x-0 top-0 origin-top border-t border-white/10 bg-black transition-transform duration-300 ease-out ${
                  open
                    ? "pointer-events-auto translate-y-0"
                    : "-translate-y-full"
                }`}
              >
              <ul className="px-[24px] pt-[8px]">
                {navItems.map((item) => {
                  const active = item.href !== "#" && pathname === item.href;
                  const isExpanded = expanded === item.label;
                  if (item.children?.length) {
                    return (
                      <li
                        key={item.label}
                        className="border-b border-white/[0.06]"
                      >
                        <div className="flex items-center justify-between py-[16px]">
                          <Link
                            href={item.href}
                            onClick={close}
                            className="text-[16px] leading-[normal] tracking-[-0.42px]"
                          >
                            <span className={active ? "text-[#6ced3f]" : "text-white"}>
                              {item.label}
                            </span>
                          </Link>
                          <button
                            type="button"
                            aria-label={`Toggle ${item.label} submenu`}
                            aria-expanded={isExpanded}
                            onClick={() =>
                              setExpanded(isExpanded ? null : item.label)
                            }
                            className="flex h-[24px] w-[24px] items-center justify-center"
                          >
                            <span
                              className={`transition-transform duration-200 ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            >
                              <ChevronDown />
                            </span>
                          </button>
                        </div>
                        <div
                          className={`overflow-hidden transition-[max-height] duration-300 ease-out ${
                            isExpanded ? "max-h-[400px]" : "max-h-0"
                          }`}
                        >
                          <ul className="pb-[8px] pl-[16px]">
                            {item.children.map((child) => {
                              const childActive =
                                child.href !== "#" && pathname === child.href;
                              return (
                                <li key={child.label}>
                                  <Link
                                    href={child.href}
                                    onClick={close}
                                    className="block py-[10px] text-[14px] leading-[normal] tracking-[-0.42px]"
                                  >
                                    <span
                                      className={
                                        childActive
                                          ? "text-[#6ced3f]"
                                          : "text-white/70"
                                      }
                                    >
                                      {child.label}
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
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
                          {item.label?.toLowerCase() === "shop" && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                              <circle cx="9" cy="21" r="1"></circle>
                              <circle cx="20" cy="21" r="1"></circle>
                              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                          )}
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="px-[24px] pb-[28px] pt-[24px]">
                <NavbarCta data={data} />
              </div>
            </nav>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
