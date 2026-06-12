"use client";

import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const scroll = new LocomotiveScroll();
    (window as unknown as Record<string, unknown>).locomotiveScroll = scroll;

    return () => {
      scroll.destroy();
      delete (window as unknown as Record<string, unknown>).locomotiveScroll;
    };
  }, []);

  return <div className="min-w-0 overflow-x-clip" ref={scrollRef}>{children}</div>;
}
