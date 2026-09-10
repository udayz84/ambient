import { mediaUrl } from "@/lib/strapi";
import { COMPANY_FULL_BLEED_BG_CLASS } from "./company-full-bleed-bg";

/** Figma 2379:2136 — page-level image 124 at y=5800, 1440×1102 */
const IMAGE_124_OVERLAY =
  "linear-gradient(180deg, rgba(0, 0, 0, 0.4) 48.412%, rgb(0, 0, 0) 88.067%), linear-gradient(180deg, rgba(0, 0, 0, 0.4) 37.886%, rgb(0, 0, 0) 88.067%), linear-gradient(180deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 69.056%)";

const FALLBACK_IMAGE = "/company/image-124.webp";

type CompanyImage124BackgroundProps = {
  data?: any;
};

export function CompanyImage124Background({ data }: CompanyImage124BackgroundProps = {}) {
  const src = mediaUrl(data?.background_image) || FALLBACK_IMAGE;
  return (
    <div
      className={`pointer-events-none absolute top-[5800px] z-[8] h-[1102px] overflow-hidden ${COMPANY_FULL_BLEED_BG_CLASS} mix-blend-screen`}
      data-node-id="2379:2136"
      data-name="image 124"
      aria-hidden
    >
      <div className="relative size-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async"
          src={src}
          alt=""
          className="absolute top-[0.02%] left-0 h-[99.95%] w-[99.99%] max-w-none object-cover object-left-top"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: IMAGE_124_OVERLAY }}
        />
      </div>
    </div>
  );
}
