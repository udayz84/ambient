"use client";

import { useEffect } from "react";

/**
 * TabletScaleInit enables pixel-perfect proportional scaling for desktop layouts
 * on tablet and medium screens (600px <= width < 1440px).
 *
 * 1. An inline script runs synchronously before initial paint during SSR / page load,
 *    setting `--tablet-zoom` immediately to avoid any layout flash (FOUC).
 * 2. A reactive resize & orientation listener keeps `--tablet-zoom` updated dynamically.
 * 3. Mobile (< 600px) and Desktop (>= 1440px) remain 100% untouched.
 */
export function TabletScaleInit() {
  useEffect(() => {
    function updateTabletZoom() {
      const docEl = document.documentElement;
      const w = docEl.clientWidth || window.innerWidth;
      if (w >= 600 && w < 1440) {
        const zoom = (w / 1440).toFixed(5);
        docEl.style.setProperty("--tablet-zoom", zoom);
      } else {
        docEl.style.removeProperty("--tablet-zoom");
      }
    }

    updateTabletZoom();
    window.addEventListener("resize", updateTabletZoom, { passive: true });
    window.addEventListener("orientationchange", updateTabletZoom, { passive: true });

    return () => {
      window.removeEventListener("resize", updateTabletZoom);
      window.removeEventListener("orientationchange", updateTabletZoom);
      document.documentElement.style.removeProperty("--tablet-zoom");
    };
  }, []);

  return (
    <script
      id="tablet-scale-init"
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var d=document.documentElement,w=d.clientWidth||window.innerWidth;if(w>=600&&w<1440){d.style.setProperty('--tablet-zoom',(w/1440).toFixed(5));}}catch(e){}})();`,
      }}
    />
  );
}
