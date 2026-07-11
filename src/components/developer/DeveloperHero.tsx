/* eslint-disable @next/next/no-img-element */
import { mediaUrl } from "@/lib/strapi";
import { DeveloperHeroContent } from "./DeveloperHeroContent";

/**
 * Figma 2438:4365 (hero region) — Developer page hero section.
 * Background image + content frame, all at exact Figma coordinates
 * (coords are page-absolute, so the canvas is pulled up under the navbar
 * with -mt-[78px] in the page).
 *
 *  - Image 2438:4562 @ (724.277, 78.033 / 687.038×577.687) — hero-bg-3 (live from Strapi)
 *    · 247.952° gradient overlay
 *  - Content 2438:4563 @ (100, 240 / 549×248)
 */
export function DeveloperHero({ data }: { data?: any }) {
  const bgImg = mediaUrl(data?.background_image) || "/developer/hero-bg-3.png";
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
          {/* Background image (live from Strapi) */}
          <img
            alt=""
            src={bgImg}
            className="absolute inset-0 size-full max-w-none object-cover"
          />
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
        <DeveloperHeroContent data={data} />
      </div>
    </>
  );
}
