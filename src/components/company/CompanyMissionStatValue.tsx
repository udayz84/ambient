"use client";

import { useEffect, useRef, useState } from "react";
import { gilroyMedium } from "../hero/fonts";

const STAT_VALUE_GRADIENT =
  "linear-gradient(98.8336deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const SMOOTH_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const SUFFIX_TRANSITION_MS = 750;

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function parseStatValue(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { target: 0, suffix: value };
  return { target: Number(match[1]), suffix: match[2] };
}

type CompanyMissionStatValueProps = {
  value: string;
  valueNodeId: string;
  animationDelay?: number;
  digitSlots?: number;
  suffixAtTarget?: boolean;
};

export function CompanyMissionStatValue({
  value,
  valueNodeId,
  animationDelay = 0,
  digitSlots,
  suffixAtTarget,
}: CompanyMissionStatValueProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const displayRef = useRef<HTMLSpanElement>(null);
  const { target, suffix } = parseStatValue(value);
  const [hasStarted, setHasStarted] = useState(false);
  const [countingDone, setCountingDone] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    let delayId = 0;
    let rafId = 0;

    const runCount = () => {
      setHasStarted(true);
      if (target <= 0) {
        if (displayRef.current) displayRef.current.textContent = "0";
        setCountingDone(true);
        return;
      }

      if (displayRef.current) displayRef.current.textContent = "0";

      // To guarantee smoothness (no stuttering), we need it to count fast enough 
      // so it updates almost every frame. We scale duration with target.
      const durationMs = Math.min(1500, Math.max(800, target * 12));
      const startTime = performance.now();
      let lastValue = -1;

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        
        // We use easeOutExpo for a snappy start and elegant slowdown
        const eased = easeOutExpo(progress);
        const current = progress >= 1 ? target : Math.round(eased * target);

        if (current !== lastValue) {
          lastValue = current;
          if (displayRef.current) {
            displayRef.current.textContent = String(current);
          }
        }

        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          setCountingDone(true);
        }
      };

      rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        delayId = window.setTimeout(runCount, animationDelay);
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      window.clearTimeout(delayId);
      cancelAnimationFrame(rafId);
    };
  }, [target, animationDelay]);

  const valueTextClass = `${gilroyMedium.className} bg-clip-text text-[80px] leading-[72px] font-medium text-transparent not-italic tabular-nums`;

  const gradientStyle = {
    backgroundImage: STAT_VALUE_GRADIENT,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
  } as const;

  return (
    <p
      ref={containerRef}
      className={`${gilroyMedium.className} inline-flex shrink-0 items-baseline whitespace-nowrap not-italic`}
      data-node-id={valueNodeId}
      aria-label={`${target}${suffix}`}
    >
      <span className="relative inline-block shrink-0 text-left">
        {/* Invisible spacer to reserve width and avoid layout shift */}
        <span className={`${valueTextClass} invisible block`} aria-hidden>
          {target}
        </span>
        <span
          ref={displayRef}
          className={`${valueTextClass} absolute top-0 left-0 inline-block`}
          style={gradientStyle}
        >
          0
        </span>
      </span>
      {suffix ? (
        <span
          className={`${valueTextClass} inline-block transition-[opacity,transform] ${
            countingDone
              ? "translate-x-0 opacity-100"
              : "pointer-events-none translate-x-[-10px] opacity-0"
          }`}
          style={{
            ...gradientStyle,
            transitionDuration: `${SUFFIX_TRANSITION_MS}ms`,
            transitionTimingFunction: SMOOTH_EASE,
          }}
          aria-hidden={!countingDone}
        >
          {suffix}
        </span>
      ) : null}
    </p>
  );
}
