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
  current: number;
  target: number;
  velocity: number;
  maxScroll: number;
  isDragging: boolean;
  dragStartX: number;
  dragStartScroll: number;
  lastDragX: number;
  lastDragTime: number;
  dragVelocity: number;
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
    current: 0,
    target: 0,
    velocity: 0,
    maxScroll: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartScroll: 0,
    lastDragX: 0,
    lastDragTime: 0,
    dragVelocity: 0,
  });
  const rafRef = useRef<number | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const updateMaxScroll = () => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    scrollStateRef.current.maxScroll = Math.max(
      0,
      track.scrollWidth - viewport.clientWidth
    );
    scrollStateRef.current.target = clamp(
      scrollStateRef.current.target,
      0,
      scrollStateRef.current.maxScroll
    );
    scrollStateRef.current.current = clamp(
      scrollStateRef.current.current,
      0,
      scrollStateRef.current.maxScroll
    );
  };

  const startAnimationLoop = () => {
    if (rafRef.current !== null) return;

    const tick = () => {
      const state = scrollStateRef.current;

      if (!state.isDragging) {
        const distance = state.target - state.current;
        state.velocity += distance * SMOOTH_FACTOR;
        state.velocity *= FRICTION;
        state.current += state.velocity;

        if (state.maxScroll > 0) {
          state.current = clamp(state.current, 0, state.maxScroll);
          state.target = clamp(state.target, 0, state.maxScroll);
        }

        if (
          Math.abs(distance) < 0.25 &&
          Math.abs(state.velocity) < 0.25
        ) {
          state.current = state.target;
          state.velocity = 0;
        }
      }

      setTranslateX(-state.current);

      const isIdle =
        !state.isDragging &&
        Math.abs(state.target - state.current) < 0.25 &&
        Math.abs(state.velocity) < 0.25;

      if (isIdle) {
        rafRef.current = null;
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  const stopAnimationLoop = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  useEffect(() => {
    const section = document.getElementById("measured-proof");
    if (!section) return;

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      setScrollProgress(getScrollProgress(rect.top, window.innerHeight));
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

    const viewport = viewportRef.current;
    if (!viewport) {
      return () => stopAnimationLoop();
    }

    const onWheel = (event: WheelEvent) => {
      const HORIZONTAL_THRESHOLD = 30;
      const HORIZONTAL_RATIO = 1.5;
      
      const absDeltaX = Math.abs(event.deltaX);
      const absDeltaY = Math.abs(event.deltaY);
      
      if (absDeltaY > 0 && absDeltaX / absDeltaY < HORIZONTAL_RATIO) {
        return;
      }
      
      if (absDeltaX < HORIZONTAL_THRESHOLD) {
        return;
      }
      
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      const delta = event.deltaX * WHEEL_FACTOR;
      const state = scrollStateRef.current;
      state.target += delta;
      state.target = clamp(state.target, 0, state.maxScroll);
      startAnimationLoop();
    };

    const onMouseDown = (event: MouseEvent) => {
      if (event.button !== 0) return;

      const state = scrollStateRef.current;
      state.isDragging = true;
      state.dragStartX = event.clientX;
      state.dragStartScroll = state.current;
      state.lastDragX = event.clientX;
      state.lastDragTime = performance.now();
      state.dragVelocity = 0;
      state.velocity = 0;
      setIsDragging(true);
      startAnimationLoop();
    };

    const onMouseMove = (event: MouseEvent) => {
      const state = scrollStateRef.current;
      if (!state.isDragging) return;

      event.preventDefault();
      const now = performance.now();
      const deltaX = event.clientX - state.dragStartX;
      const frameDelta = event.clientX - state.lastDragX;
      const frameTime = Math.max(now - state.lastDragTime, 1);

      state.current = clamp(
        state.dragStartScroll - deltaX,
        0,
        state.maxScroll
      );
      state.target = state.current;
      state.dragVelocity = (frameDelta / frameTime) * 16;
      state.lastDragX = event.clientX;
      state.lastDragTime = now;
      startAnimationLoop();
    };

    const stopDragging = () => {
      const state = scrollStateRef.current;
      if (!state.isDragging) return;

      state.isDragging = false;
      state.velocity = -state.dragVelocity * MOMENTUM_SCALE;
      state.target = clamp(
        state.current + state.velocity * 8,
        0,
        state.maxScroll
      );
      setIsDragging(false);
      startAnimationLoop();
    };

    const onResize = () => updateMaxScroll();

    viewport.addEventListener("wheel", onWheel, { passive: false });
    viewport.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("resize", onResize);

    return () => {
      viewport.removeEventListener("wheel", onWheel);
      viewport.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("resize", onResize);
      stopAnimationLoop();
    };
  }, []);

  return (
    <div
      ref={viewportRef}
      className={`absolute top-1/2 right-0 left-0 -translate-y-1/2 overflow-hidden ${
        isDragging ? "cursor-grabbing select-none" : "cursor-grab"
      }`}
      data-node-id="2379:1503"
      data-name="Measured proof in silicon"
      aria-label="Measured proof cards"
    >
      <div
        ref={trackRef}
        className="flex w-max content-stretch items-center gap-[24px] px-[40px] min-[1440px]:px-[120px] will-change-transform [backface-visibility:hidden]"
        style={{
          transform: `translate3d(${translateX}px, 0, 0)`,
        }}
      >
        {CARDS.map((card, index) => {
          const { translateY, opacity } = getCardMotion(scrollProgress, index);

          return (
            <div
              key={card.nodeId}
              className="shrink-0 will-change-transform"
              style={{
                transform: `translateY(${translateY}px)`,
                opacity,
                transition: "transform 1000ms ease-out, opacity 1000ms ease-out",
              }}
            >
              <MeasuredProofCard {...card} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
