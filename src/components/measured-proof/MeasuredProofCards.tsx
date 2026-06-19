"use client";

import { useEffect, useRef, useState } from "react";
import LocomotiveScroll from "locomotive-scroll";
import { MeasuredProofCard } from "./MeasuredProofCard";

const CARDS = [
  {
    nodeId: "2379:1504",
    metric: "100x",
    label: "LOWER POWER CONSUMPTION",
    description:
      "Extend battery life at the edge and lower energy Opex in more compute-intensive environments",
    imageSrc: "/measured-proof/card-power.png",
    imageWidth: 270.353,
    imageHeight: 250,
    imageTop: 161,
    imageClassName:
      "absolute top-[-16.05%] left-0 h-[135.04%] w-full max-w-none",
    imageSizes: "271px",
    statWidth: 299,
    descriptionWidth: 290,
  },
  {
    nodeId: "2379:1524",
    metric: "25x",
    label: "AI PERFORMANCE",
    description:
      "Unlock richer models, faster local inference, and more capable intelligence in constrained systems",
    imageSrc: "/measured-proof/card-ai.png",
    imageWidth: 331.144,
    imageHeight: 260,
    imageTop: 169,
    imageSizes: "332px",
    statWidth: 187,
    descriptionWidth: 319,
    statJustifyEnd: true,
  },
  {
    nodeId: "2379:1539",
    metric: "10x",
    label: "COMPUTE DENSITY",
    description:
      "Pack more intelligence into the same footprint without scaling power and system complexity the old way",
    imageSrc: "/measured-proof/card-density.png",
    imageWidth: 305.672,
    imageHeight: 240,
    imageTop: 174.67,
    imageSizes: "306px",
    statWidth: 225,
    descriptionWidth: 317,
  },
  {
    nodeId: "2379:1554",
    metric: "100%",
    label: "PROGRAMMABLE DESIGN",
    description:
      "Preserve the freedom to build differentiated AI systems without locking into rigid fixed-function tradeoffs",
    imageSrc: "/measured-proof/card-programmable.png",
    imageWidth: 218.055,
    imageHeight: 260,
    imageTop: 151,
    imageClassName:
      "absolute top-[-11.4%] left-[-30.32%] h-[122.8%] w-[146.43%] max-w-none",
    imageSizes: "320px",
    statWidth: 271,
    descriptionWidth: 320,
    descriptionBottom: 137.5,
    statJustifyEnd: true,
  },
] as const;

const SLIDE_DISTANCE = 60;
const STAGGER = 0.12;
const SMOOTH_FACTOR = 0.08;
const WHEEL_FACTOR = 0.7;
const FRICTION = 0.92;
const MOMENTUM_SCALE = 0.95;

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
    opacity: cardProgress,
  };
}

export function MeasuredProofCards() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollStateRef = useRef<ScrollState>({
    maxScroll: 0,
  });

  const [scrollProgress, setScrollProgress] = useState(0);



  const updateMaxScroll = () => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    scrollStateRef.current.maxScroll = Math.max(
      0,
      track.scrollWidth - viewport.clientWidth
    );
  };

  useEffect(() => {
    const section = document.getElementById("measured-proof");
    if (!section) return;

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Entrance animation progress (triggers when section enters viewport)
      setScrollProgress(getScrollProgress(rect.top, viewportHeight));

      // Horizontal scroll progress (triggers while section is sticky)
      // The sticky container is 100vh, the section is 400vh.
      // So there is 300vh of scrolling to do.
      const maxScrollY = section.offsetHeight - viewportHeight;
      const currentScrollY = -rect.top;
      
      if (maxScrollY > 0) {
        let hProgress = currentScrollY / maxScrollY;
        hProgress = clamp(hProgress, 0, 1);
        
        // Directly update the horizontal transform for 60fps smooth tracking
        // We round the value to prevent subpixel rendering artifacts (blurring)
        const targetX = scrollStateRef.current.maxScroll * hProgress;
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${Math.round(-targetX)}px, 0, 0)`;
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
      className="absolute top-1/2 right-0 left-0 -translate-y-1/2 overflow-hidden touch-none select-none"
      data-node-id="2379:1503"
      data-name="Measured proof in silicon"
      aria-label="Measured proof cards"
    >
      <div
        ref={trackRef}
        className="flex w-max content-stretch items-center gap-[24px] px-[40px] min-[1440px]:px-[120px] will-change-transform [backface-visibility:hidden]"
      >
        {CARDS.map((card, index) => {
          const { translateY, opacity } = getCardMotion(scrollProgress, index);

          return (
            <div
              key={card.nodeId}
              className="animate-hero-text-fade-in opacity-0"
              style={{ animationDelay: '1s', animationDuration: '1000ms' }}
            >
              <div
                className="shrink-0 will-change-transform"
                style={{
                  transform: `translateY(${translateY}px)`,
                  opacity,
                  transition: "transform 1000ms ease-out, opacity 1000ms ease-out",
                }}
              >
                <MeasuredProofCard {...card} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
