"use client";

import { useEffect, useMemo, useState } from "react";
import { gilroyMedium } from "../hero/fonts";

type NavItem = { label: string; id: string };

/** Fallback when the sticky_nav component is empty/missing in Strapi. */
const FALLBACK_ITEMS: NavItem[] = [
  { label: "Power VS Intelligences", id: "features" },
  { label: "Always On. Never asleep", id: "always-on" },
  { label: "Built for all", id: "use-cases" },
  { label: "Metrics & Data", id: "metrics" },
  { label: "Architecture", id: "architecture" },
  { label: "Full Picture", id: "full-picture" },
];

export function ProductsStickyNav({ items }: { items?: any }) {
  const NAV_ITEMS = useMemo<NavItem[]>(() => {
    const fromPage = Array.isArray(items)
      ? items
          .filter((i: any) => typeof i?.label === "string" && typeof i?.id === "string" && i.label && i.id)
          .map((i: any) => ({ label: i.label, id: i.id }))
      : [];
    return fromPage.length > 0 ? fromPage : FALLBACK_ITEMS;
  }, [items]);
  const [activeId, setActiveId] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  // Hide this tab for now per user request
  return null;

  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = item.id;
          }
        }
      }
      
      if (!current) {
         for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
           const el = document.getElementById(NAV_ITEMS[i].id);
           if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= window.innerHeight / 2) {
                 current = NAV_ITEMS[i].id;
                 break;
              }
           }
          }
      }
      
       if (!current) {
          // Default to the first section if we are above it
          current = NAV_ITEMS[0].id;
       }

       setActiveId(current);

       // Determine visibility — hide on the last section (footer merge zone)
       if (window.scrollY > 300 && current !== NAV_ITEMS[NAV_ITEMS.length - 1].id) {
         setIsVisible(true);
      } else {
         setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [NAV_ITEMS]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 hidden min-[1024px]:flex w-full flex-col items-center justify-end px-4 pb-8 pt-24 transition-all duration-500 pointer-events-none ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000e6] via-[#00000080] to-transparent pointer-events-none" aria-hidden="true" />
      <div className="relative pointer-events-auto flex w-full max-w-7xl justify-center">
        <div className="flex items-center gap-[4px] rounded-[30px] bg-[#1a1a1a] p-[6px] shadow-2xl overflow-x-auto overflow-y-hidden no-scrollbar">
        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 120; // Offset for sticky nav
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className={`whitespace-nowrap rounded-[24px] px-5 py-2.5 transition-colors duration-300 text-[15px] tracking-wide leading-normal font-medium ${gilroyMedium.className} ${
                isActive
                  ? "bg-white text-black"
                  : "bg-transparent text-white hover:text-gray-300"
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </div>
      </div>
    </div>
  );
}
