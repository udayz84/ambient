"use client";

import { useEffect, useState } from "react";
import { gilroyMedium } from "../hero/fonts";

const NAV_ITEMS = [
  { label: "Power VS Intelligences", id: "features" },
  { label: "Always On. Never asleep", id: "always-on" },
  { label: "Built for all", id: "use-cases" },
  { label: "Metrics & Data", id: "metrics" },
  { label: "Architecture", id: "architecture" },
  { label: "Full Picture", id: "full-picture" },
];

export function ProductsStickyNav() {
  const [activeId, setActiveId] = useState<string>("");

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
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-[100px] z-50 mx-auto -mt-8 mb-8 flex w-full max-w-7xl justify-center px-4 animate-in slide-in-from-top-8 fade-in duration-700">
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
  );
}
