"use client";

import { useEffect, useRef, useState } from "react";
import { interMedium } from "../hero/fonts";
import { FEATURED_RESOURCES } from "./resources-data";
import { ResourcesFeaturedCard } from "./ResourcesFeaturedCard";

const FADE_IN_CLASS = "animate-hero-text-fade-in opacity-0";

export function ResourcesFeatured() {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`absolute top-[716px] left-[4px] flex w-[1432px] flex-col gap-[20px] bg-[#010101] px-[56px] py-[80px] ${
        isVisible ? FADE_IN_CLASS : "translate-y-[25px] opacity-0"
      }`}
      aria-label="Featured Resources"
      data-node-id="2379:1960"
    >
      <h2
        className={`${interMedium.className} shrink-0 text-[46px] leading-[49px] font-medium whitespace-nowrap text-white not-italic`}
        data-node-id="2379:1967"
      >
        Featured Resources
      </h2>

      <div
        className="flex w-full shrink-0 items-center gap-[20px]"
        data-node-id="2379:1968"
      >
        {FEATURED_RESOURCES.map((card) => (
          <ResourcesFeaturedCard key={card.nodeId} {...card} />
        ))}
      </div>
    </section>
  );
}
