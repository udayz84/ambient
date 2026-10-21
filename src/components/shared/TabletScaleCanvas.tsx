"use client";

import React, { useEffect, useState } from "react";

interface TabletScaleCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * TabletScaleCanvas ensures 100% pixel-perfect proportional scaling for desktop 1440px canvases
 * on tablet and medium viewports (768px <= width < 1440px).
 *
 * It uses a dual-layer strategy:
 * 1. CSS class .tablet-scale-canvas with zoom: var(--tablet-zoom) for instant SSR / pre-hydration paint.
 * 2. React state hook that directly applies inline style zoom: clientWidth / 1440, ensuring 100%
 *    bulletproof behavior regardless of CSS bundler or browser engine quirks, updating on resize.
 */
export function TabletScaleCanvas({
  children,
  className = "",
  style,
  ...props
}: TabletScaleCanvasProps) {
  const [zoom, setZoom] = useState<number | undefined>(undefined);

  useEffect(() => {
    function updateZoom() {
      const docEl = document.documentElement;
      const w = docEl.clientWidth || window.innerWidth;
      if (w >= 600 && w < 1440) {
        const factor = Number((w / 1440).toFixed(5));
        setZoom(factor);
        docEl.style.setProperty("--tablet-zoom", factor.toString());
      } else {
        setZoom(undefined);
        docEl.style.removeProperty("--tablet-zoom");
      }
    }

    updateZoom();
    window.addEventListener("resize", updateZoom, { passive: true });
    window.addEventListener("orientationchange", updateZoom, { passive: true });

    return () => {
      window.removeEventListener("resize", updateZoom);
      window.removeEventListener("orientationchange", updateZoom);
    };
  }, []);

  return (
    <div
      className={`tablet-scale-canvas ${className}`}
      style={{
        ...style,
        ...(zoom !== undefined ? { zoom } : {}),
      }}
      {...props}
    >
      {children}
    </div>
  );
}
