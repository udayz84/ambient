/* eslint-disable @next/next/no-img-element */
import { DeveloperHeroContent } from "./DeveloperHeroContent";

/**
 * Figma 2438:4365 (hero region) — Developer page hero section.
 * Background layers + content frame, all at exact Figma coordinates
 * (coords are page-absolute, so the canvas is pulled up under the navbar
 * with -mt-[78px] in the page).
 *
 *  - Image group 2438:4562 @ (724.277, 78.033 / 687.038×577.687)
 *    · hero-bg-1 (base), hero-bg-2 (object-cover), hero-bg-3 (oversized overlay)
 *    · 247.952° gradient overlay
 *  - Content 2438:4563 @ (100, 240 / 549×248)
 */
export function DeveloperHero() {
  return (
    <>
      {/* Hero background — 2438:4562 (724.277, 78.033 / 687.038×577.687) */}
      <div
        className="pointer-events-none absolute z-0"
        style={{ left: 724.277, top: 78.033, width: 687.038, height: 577.687 }}
        data-node-id="2438:4562"
        data-name="Gemini_Generated_Image_9x8w339x8w339x8w 1"
        aria-hidden
      >
        <div aria-hidden className="absolute inset-0">
          {/* Layer 1 (base) */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              alt=""
              src="/developer/hero-bg-1.png"
              className="absolute left-0 top-[0.03%] h-[99.97%] w-full max-w-none"
            />
          </div>
          {/* Layer 2 (mid, object-cover) */}
          <img
            alt=""
            src="/developer/hero-bg-2.png"
            className="absolute size-full max-w-none object-cover"
          />
          {/* Layer 3 (overlay, oversized) */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              alt=""
              src="/developer/hero-bg-3.png"
              className="absolute left-[-5.54%] top-[-7%] h-[107.81%] w-[105.54%] max-w-none"
            />
          </div>
          {/* Bottom-darker gradient overlay (247.952°) */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(247.952deg, rgba(0, 0, 0, 0) 62.969%, rgb(0, 0, 0) 95.031%)",
            }}
          />
        </div>
      </div>

      {/* Hero content — 2438:4563 (100, 240 / 549×248) */}
      <div
        className="absolute z-10"
        style={{ left: 100, top: 240, width: 549, height: 248 }}
        data-node-id="2438:4563"
      >
        <DeveloperHeroContent />
      </div>
    </>
  );
}
