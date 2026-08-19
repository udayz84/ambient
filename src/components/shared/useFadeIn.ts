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
  return isVisible
    ? "min-[1024px]:animate-hero-text-fade-in min-[1024px]:opacity-0 max-[1023px]:opacity-100 max-[1023px]:translate-y-0"
    : "min-[1024px]:translate-y-[25px] min-[1024px]:opacity-0 max-[1023px]:opacity-100 max-[1023px]:translate-y-0";
}
