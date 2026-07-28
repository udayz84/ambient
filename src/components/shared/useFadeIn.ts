"use client";

import { useEffect, useRef, useState } from "react";

export function useFadeIn<T extends HTMLElement = any>(threshold = 0.12) {
  const ref = useRef<T>(null);
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
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { fadeRef: ref, isVisible };
}

export function getFadeInClass(isVisible: boolean) {
  return isVisible ? "animate-hero-text-fade-in opacity-0" : "translate-y-[25px] opacity-0";
}
