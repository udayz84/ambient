"use client";

import { useEffect, useRef, useState } from "react";
import { interMedium } from "../hero/fonts";

const STAT_VALUE_GRADIENT =
  "linear-gradient(98.8336deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const SMOOTH_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const SUFFIX_TRANSITION_MS = 750;
const MS_PER_COUNT_UNIT = 50;
const MIN_COUNT_DURATION_MS = 3000;
const MAX_COUNT_DURATION_MS = 5000;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function countDurationMs(target: number) {
  const scaled = target * MS_PER_COUNT_UNIT;
  return Math.min(MAX_COUNT_DURATION_MS, Math.max(MIN_COUNT_DURATION_MS, scaled));
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
  suffixAtTarget = false,
}: CompanyMissionStatValueProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const displayRef = useRef<HTMLSpanElement>(null);
  const { target, suffix } = parseStatValue(value);
  const shouldLazySuffix = !!(suffix && suffixAtTarget);
  const [revealSuffix, setRevealSuffix] = useState(!shouldLazySuffix);
  const [countingDone, setCountingDone] = useState(false);

  const durationMs = countDurationMs(target);
  const showSuffix = !shouldLazySuffix || revealSuffix;

  useEffect(() => {
    if (!shouldLazySuffix || !countingDone) return;
    const id = window.setTimeout(() => setRevealSuffix(true), 0);
    return () => window.clearTimeout(id);
  }, [countingDone, shouldLazySuffix]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    let delayId = 0;
    let rafId = 0;
    let hasStarted = false;

    const runCount = () => {
      if (target <= 0) {
        if (displayRef.current) displayRef.current.textContent = "0";
        setCountingDone(true);
        return;
      }

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) {
        if (displayRef.current) displayRef.current.textContent = String(target);
        setCountingDone(true);
        if (shouldLazySuffix) setRevealSuffix(true);
        return;
      }

      if (displayRef.current) displayRef.current.textContent = "0";

      const startTime = performance.now();
      let lastValue = -1;

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const eased = easeOutCubic(progress);
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
        if (!entry.isIntersecting || hasStarted) return;
        hasStarted = true;
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
  }, [target, animationDelay, durationMs, shouldLazySuffix]);

  const digitSizer =
    digitSlots != null ? String(target).padStart(digitSlots, "0") : null;

  const valueTextClass = `${interMedium.className} bg-clip-text text-[80px] leading-[72px] font-medium text-transparent not-italic tabular-nums`;

  const gradientStyle = {
    backgroundImage: STAT_VALUE_GRADIENT,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
  } as const;

  return (
    <p
      ref={containerRef}
      className={`${interMedium.className} inline-flex shrink-0 items-baseline whitespace-nowrap not-italic`}
      data-node-id={valueNodeId}
      aria-label={`${target}${suffix}`}
    >
      <span className="relative inline-block shrink-0 text-left">
        {digitSizer != null ? (
          <span className={`${valueTextClass} invisible block`} aria-hidden>
            {digitSizer}
          </span>
        ) : null}
        <span
          ref={displayRef}
          className={`${valueTextClass} ${digitSizer != null ? "absolute top-0 left-0" : "inline-block"}`}
          style={gradientStyle}
        >
          0
        </span>
      </span>
      {suffix ? (
        <span
          className={`${valueTextClass} inline-block transition-[opacity,transform] ${
            showSuffix
              ? "translate-x-0 opacity-100"
              : "pointer-events-none translate-x-[-5px] opacity-0"
          }`}
          style={{
            ...gradientStyle,
            transitionDuration: `${SUFFIX_TRANSITION_MS}ms`,
            transitionTimingFunction: SMOOTH_EASE,
          }}
          aria-hidden={!showSuffix}
        >
          {suffix}
        </span>
      ) : null}
    </p>
  );
}
