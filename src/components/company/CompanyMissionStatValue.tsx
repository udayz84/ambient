"use client";

import { useEffect, useRef, useState } from "react";
import { interMedium } from "../hero/fonts";

const STAT_VALUE_GRADIENT =
  "linear-gradient(98.8336deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const SMOOTH_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const SUFFIX_REVEAL_DELAY_MS = 200;
const SUFFIX_TRANSITION_MS = 750;

const MS_PER_COUNT_UNIT = 26;
const MIN_COUNT_DURATION_MS = 2000;
const MAX_COUNT_DURATION_MS = 3200;

function easeOutQuart(t: number) {
  return 1 - (1 - t) ** 4;
}

function easeOutQuint(t: number) {
  return 1 - (1 - t) ** 5;
}

/** Bulk of the count in the first ~62% of time; last digits ease in slowly */
function countProgress(t: number) {
  if (t < 0.62) {
    return easeOutQuart(t / 0.62) * 0.8;
  }
  const tail = (t - 0.62) / 0.38;
  return 0.8 + easeOutQuint(tail) * 0.2;
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
  const ref = useRef<HTMLParagraphElement>(null);
  const [display, setDisplay] = useState(0);
  const [revealSuffix, setRevealSuffix] = useState(!suffixAtTarget);
  const { target, suffix } = parseStatValue(value);

  const durationMs = countDurationMs(target);
  const showSuffix = !suffixAtTarget || revealSuffix;

  useEffect(() => {
    if (!suffix || !suffixAtTarget) {
      setRevealSuffix(!suffixAtTarget);
      return;
    }

    if (display < target) {
      setRevealSuffix(false);
      return;
    }

    const delayId = window.setTimeout(() => {
      setRevealSuffix(true);
    }, SUFFIX_REVEAL_DELAY_MS);

    return () => window.clearTimeout(delayId);
  }, [display, target, suffix, suffixAtTarget]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let delayId = 0;
    let rafId = 0;
    let hasStarted = false;

    const finish = (value: number) => {
      setDisplay(value);
    };

    const runCount = () => {
      if (target <= 0) {
        finish(0);
        return;
      }

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) {
        finish(target);
        if (suffixAtTarget) setRevealSuffix(true);
        return;
      }

      setDisplay(0);
      setRevealSuffix(false);
      const startTime = performance.now();
      let lastDisplayed = -1;

      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / durationMs, 1);
        const mapped = countProgress(progress);
        const next =
          progress >= 1 ? target : Math.min(Math.floor(mapped * target), target);

        if (next !== lastDisplayed) {
          lastDisplayed = next;
          setDisplay(next);
        }

        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          finish(target);
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
  }, [target, animationDelay, durationMs, suffixAtTarget]);

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
      ref={ref}
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
          className={`${valueTextClass} ${digitSizer != null ? "absolute top-0 left-0" : "inline-block"}`}
          style={gradientStyle}
        >
          {display}
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
