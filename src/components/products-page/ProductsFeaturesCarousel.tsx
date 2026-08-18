"use client";

/**
 * Card strip for the products features section — Figma 3286:1931,
 * strip 3742:931 ("Measured proof in silicon").
 *
 * Behaviour mirrors the homepage MeasuredProof strip: the section is 300vh
 * with a sticky 100vh container; vertical scroll pans the track
 * horizontally (direct translate3d updates for 60fps), and cards slide up
 * with a staggered entrance as the section enters the viewport.
 */
import { useEffect, useRef, useState } from "react";
import LocomotiveScroll from "locomotive-scroll";
import { ProductsFeatureCard } from "./ProductsFeatureCard";
import type { ProductsFeatureCardData } from "./products-data";

const SLIDE_DISTANCE = 60;
const STAGGER = 0.12;

type ScrollState = {
  maxScroll: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getScrollProgress(sectionTop: number, viewportHeight: number) {
  const triggerStart = viewportHeight;
  const triggerEnd = viewportHeight * 0.35;

  return Math.min(
    1,
    Math.max(0, (triggerStart - sectionTop) / (triggerStart - triggerEnd))
  );
}

function getCardMotion(progress: number, index: number) {
  const staggerOffset = index * STAGGER;
  const cardProgress = Math.min(
    1,
    Math.max(0, (progress - staggerOffset) / (1 - staggerOffset))
  );

  return {
    translateY: (1 - cardProgress) * SLIDE_DISTANCE,
  };
}

export function ProductsFeaturesCarousel({
  cards,
  onScrollChange,
}: {
  cards: ProductsFeatureCardData[];
  onScrollChange?: (needsScroll: boolean) => void;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollStateRef = useRef<ScrollState>({ maxScroll: 0 });

  const [scrollProgress, setScrollProgress] = useState(0);

  const updateMaxScroll = () => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const maxScroll = Math.max(
      0,
      track.scrollWidth - viewport.clientWidth
    );
    scrollStateRef.current.maxScroll = maxScroll;
    
    // Center the track if it fits in the viewport
    if (maxScroll === 0) {
      track.style.marginLeft = "auto";
      track.style.marginRight = "auto";
    } else {
      track.style.marginLeft = "0";
      track.style.marginRight = "0";
    }

    if (onScrollChange) {
      onScrollChange(maxScroll > 0);
    }
  };

  useEffect(() => {
    const section = document.getElementById("products-features");
    if (!section) return;

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Entrance animation progress (triggers when section enters viewport)
      setScrollProgress(getScrollProgress(rect.top, viewportHeight));

      // Horizontal pan progress (triggers while section is sticky):
      const maxScrollY = section.offsetHeight - viewportHeight;
      const currentScrollY = -rect.top;

      if (maxScrollY > 0) {
        const hProgress = clamp(currentScrollY / maxScrollY, 0, 1);
        const targetX = scrollStateRef.current.maxScroll * hProgress;
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${Math.round(-targetX)}px, 0, 0)`;
        }
      } else {
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(0px, 0, 0)`;
        }
      }
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    let locoScroll: LocomotiveScroll | null = null;

    const initLocoListener = () => {
      if (typeof window === "undefined") return;
      const ls = (window as unknown as Record<string, unknown>).locomotiveScroll;
      if (ls && ls instanceof LocomotiveScroll && ls.lenisInstance) {
        locoScroll = ls;
        ls.lenisInstance.on("scroll", updateProgress);
      }
    };

    initLocoListener();
    const interval = setInterval(() => {
      if (!locoScroll) initLocoListener();
      else clearInterval(interval);
    }, 500);
    if (locoScroll) clearInterval(interval);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      clearInterval(interval);
      if (locoScroll?.lenisInstance) {
        locoScroll.lenisInstance.off("scroll", updateProgress);
      }
    };
  }, []);

  useEffect(() => {
    updateMaxScroll();
    const onResize = () => updateMaxScroll();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      ref={viewportRef}
      className="absolute top-[278.75px] left-1/2 -translate-x-1/2 overflow-hidden touch-none select-none w-[100vw] [@media(max-height:1000px)]:w-[117.64vw] [@media(max-height:850px)]:w-[133.33vw] [@media(max-height:750px)]:w-[153.84vw]"
      data-node-id="3742:931"
      data-name="Measured proof in silicon"
      aria-label="Product capability cards"
    >
      <div
        ref={trackRef}
        className="flex w-max content-stretch gap-[24px] px-[100px] transition-transform duration-300 ease-out will-change-transform [backface-visibility:hidden]"
      >
        {cards.map((card, index) => {
          const { translateY } = getCardMotion(scrollProgress, index);

          return (
            <div key={card.nodeId}>
              <div
                className="shrink-0 will-change-transform"
                style={{
                  transform: `translateY(${translateY}px)`,
                  transition: "transform 1000ms ease-out",
                }}
              >
                <ProductsFeatureCard card={card} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
