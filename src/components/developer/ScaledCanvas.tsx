"use client";

import { useEffect, useState } from "react";

/**
 * Scales a fixed-width design canvas down to fit the viewport on screens
 * narrower than `width` (preserving exact proportions, no overflow).
 * At or above `width` it renders at scale 1, centered.
 *
 * The canvas height is reserved via the outer wrapper (height × scale) so the
 * following content (e.g. footer) flows correctly; the inner is absolutely
 * positioned so its unscaled layout size doesn't expand the page.
 */
export function ScaledCanvas({
  width,
  height,
  children,
}: {
  width: number;
  height: number;
  children: React.ReactNode;
}) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function update() {
      setScale(Math.min(1, window.innerWidth / width));
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [width]);

  const centered = scale === 1;

  return (
    <div className="relative w-full" style={{ height: height * scale }}>
      <div
        className={`absolute top-0 bg-black ${centered ? "left-1/2" : "left-0"}`}
        style={{
          width,
          height,
          transform: centered ? "translateX(-50%)" : `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
