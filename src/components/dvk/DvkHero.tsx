import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { DvkScrollIndicator } from "./DvkScrollIndicator";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
  HERO_IMAGE_OVERLAY,
  HERO_TITLE_GRADIENT,
  PRIMARY_CTA_INSET,
  PRIMARY_CTA_SHADOW,
} from "./dvk-data";
import { mediaUrl } from "@/lib/strapi";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

const DEFAULT_TITLE = "The physical launchpad for microwatt Edge AI.";
const DEFAULT_SUBTITLE =
  "Validate real-time AI at microwatt power levels out of the box. The Cranium Development Kit comes fully loaded with onboard sensors, rich I/O, and pre-integrated drivers so you can stop breadboarding and start testing inferences in minutes.";
const DEFAULT_CTA_LABEL = "Request Evaluation Kit";
const DEFAULT_BG = "/dvk/hero-bg-2.png";

/**
 * Figma 2761:2971 — Cranium Development Kit (DVK) hero.
 * Desktop canvas is 1442 wide. All children are absolutely positioned.
 *
 * Background image group 2761:2972 (329.625, 10.184 / 1120.375×610.35)
 * Vertical guide lines 2761:2973 / 2761:2975 (shared design-system chrome)
 * Content frame 2761:2977 (100, 192 / 576×318)
 * Scroll indicator 2761:3005 (1335.387, 616.033 / 18×75)
 */
export function DvkHero({ data }: { data?: any }) {
  const title = data?.title || DEFAULT_TITLE;
  const subtitle = data?.subtitle || DEFAULT_SUBTITLE;
  const ctaLabel = data?.cta_label || DEFAULT_CTA_LABEL;
  const bg = mediaUrl(data?.background_image) || DEFAULT_BG;
  return (
    <>
      {/* Hero background — image group 2761:2972 */}
      <div
        className="pointer-events-none absolute overflow-hidden"
        style={{
          left: 329.625,
          top: 10.18359375,
          width: 1120.3746337890625,
          height: 610.349609375,
        }}
        data-node-id="2761:2972"
        data-name="image 105"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={bg}
          className="absolute inset-0 size-full max-w-none object-bottom"
        />
      </div>

      {/* Right-side blend into black for screens wider than the 1442 canvas.
          The hero overlay only darkens the left (for text legibility), so the
          image's bright right edge would hard-cut against the black side margin
          on larger displays. This fade is hidden at/below the design width. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 hidden h-full w-[360px] min-[1442px]:block"
        style={{
          background:
            "linear-gradient(270deg, #000000 6%, rgba(0,0,0,0.86) 22%, rgba(0,0,0,0.4) 52%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Left vertical guide line — 2761:2973 (94.887, 79.033 / h-821) */}
      <div className="pointer-events-none absolute top-[79.033203125px] left-[94.88671875px] flex h-[821px] w-0 items-center justify-center">
        <div className="flex-none rotate-90">
          <div
            className="relative h-0 w-[821px]"
            data-node-id="2761:2973"
            data-name="Line 82"
          >
            <div className="absolute inset-[-1px_0_0_0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero/line-82.svg"
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      {/* Left line cap — 2761:2974 (92.887, 77.033 / 5×4) */}
      <div
        className="pointer-events-none absolute top-[77.033203125px] left-[92.88671875px] h-[4px] w-[5px]"
        data-node-id="2761:2974"
        data-name="Vector"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero/line-cap-left.svg"
          alt=""
          className="absolute inset-0 block size-full max-w-none"
          aria-hidden
        />
      </div>

      {/* Right vertical guide line — 2761:2975 (1346.887, 79.033 / h-597) */}
      <div className="pointer-events-none absolute top-[79.033203125px] right-[95.11328125px] flex h-[597px] w-0 items-center justify-center">
        <div className="flex-none rotate-90">
          <div
            className="relative h-0 w-[597px]"
            data-node-id="2761:2975"
            data-name="Line 83"
          >
            <div className="absolute inset-[-0.5px_0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero/line-83.svg"
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      {/* Right line cap — 2761:2976 (1344.387, 77.668 / 5×4) */}
      <div
        className="pointer-events-none absolute top-[77.66796875px] left-[1344.38671875px] h-[4px] w-[5px]"
        data-node-id="2761:2976"
        data-name="Vector"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero/line-cap-right.svg"
          alt=""
          className="absolute inset-0 block size-full max-w-none"
          aria-hidden
        />
      </div>

      {/* Content — 2761:2977 (100, 192 / 576×318) */}
      <div
        className="absolute flex flex-col items-start gap-[20px]"
        style={{ left: 100, top: 192, width: 576 }}
        data-node-id="2761:2977"
        data-name="Content"
      >
        {/* Title — 2761:2978. Corners frame 2761:2979 (544.194×116) */}
        <div
          className="relative"
          style={{ width: 544.1943359375, height: 116 }}
          data-node-id="2761:2979"
          data-name="Frame"
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h1
            className={`${gilroyMedium.className} absolute m-0 bg-clip-text text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              left: 19.227,
              top: 9.192,
              width: 526.1708984375,
              backgroundImage: HERO_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2761:2984"
          >
            {title}
          </h1>
        </div>

        {/* Sub — 2761:2985 (pl-22, gap-24) */}
        <div
          className="relative flex flex-col items-start gap-[24px] pl-[22px]"
          data-node-id="2761:2985"
          data-name="Sub"
        >
          <p
            className={`${interRegular.className} w-[554px] text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
            data-node-id="2761:2986"
          >
            {subtitle}
          </p>

          <div
            className="flex items-start gap-[24px]"
            data-node-id="2761:2987"
            data-name="Frame 1984079464"
          >
            <PrimaryCta>{ctaLabel}</PrimaryCta>
          </div>
        </div>
      </div>

      <DvkScrollIndicator />
    </>
  );
}

function PrimaryCta({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#"
      className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-[229px] shrink-0 items-center justify-center overflow-hidden`}
      data-node-id="2761:2988"
      data-name="Cta"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span className="relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
        {children}
      </span>
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`}
      />
      <GreenCtaCorners />
    </a>
  );
}
