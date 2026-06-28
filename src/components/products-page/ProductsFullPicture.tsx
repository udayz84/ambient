import { gilroyMedium, gilroySemiBold, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import {
  CALLOUT_HEADER_COLOR,
  CALLOUT_PLUS_COLOR,
  CORNER_LEFT,
  CORNER_RIGHT,
  FULLPICTURE_CALLOUT_WIDTH,
  FULLPICTURE_CANVAS_WIDTH,
  FULLPICTURE_IMAGE,
  FULLPICTURE_IMAGE_VIGNETTE,
  FULLPICTURE_SECTION_HEIGHT,
  FULLPICTURE_TITLE_GRADIENT,
  ICON_TILE_BG,
  SPEC_CALLOUTS,
} from "./products-data";

/**
 * Figma 2940:1244 — "The full picture".
 * Central product image with 8 floating spec callout cards.
 */
export function ProductsFullPicture() {
  return (
    <>
      {/* DESKTOP (>=1024px) */}
      <section
        className="relative mx-auto hidden w-full bg-black min-[1024px]:block"
        aria-label="The full picture"
      >
        <div
          className="relative mx-auto"
          style={{
            width: FULLPICTURE_CANVAS_WIDTH,
            height: FULLPICTURE_SECTION_HEIGHT,
          }}
          data-node-id="2940:1244"
          data-name="The full picture"
        >
          <ProductsFullPictureDesktop />
        </div>
      </section>

      {/* MOBILE (<1024px) */}
      <ProductsFullPictureMobile />
    </>
  );
}

function ProductsFullPictureDesktop() {
  return (
    <>
      {/* Section title — 2940:1331 (centered, w=800) */}
      <div
        className="absolute flex flex-col items-center gap-[24px]"
        style={{ left: 319.5, top: 52.5, width: 800 }}
        data-node-id="2940:1331"
        data-name="Frame 1984079432"
      >
        <div
          className="relative px-[10px]"
          style={{ width: 331, height: 49 }}
          data-node-id="2940:1333"
          data-name="Title"
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} absolute m-0 w-[311px] bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              left: 10,
              top: 0,
              backgroundImage: FULLPICTURE_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2940:1334"
          >
            The full picture
          </h2>
        </div>
        <p
          className={`${interRegular.className} w-[800px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
          data-node-id="2940:1339"
        >
          Bridge the lab and real world. The Sparsh module offers continuous,
          microwatt intelligence in a 21×21mm size, with a breakout board that
          snaps off for production.
        </p>
      </div>

      {/* Central image — 2940:1245 */}
      <div
        className="pointer-events-none absolute overflow-hidden"
        style={{
          left: FULLPICTURE_IMAGE.left,
          top: FULLPICTURE_IMAGE.top,
          width: FULLPICTURE_IMAGE.width,
          height: FULLPICTURE_IMAGE.height,
        }}
        data-node-id="2940:1245"
        data-name="ChatGPT Image Jun 11, 2026, 07_07_16 PM 1"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Sparsh module"
          src="/products/full-picture.png"
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: FULLPICTURE_IMAGE_VIGNETTE,
            opacity: 0.7,
          }}
        />
      </div>

      {/* Spec callout cards */}
      {SPEC_CALLOUTS.map((callout) => (
        <SpecCalloutCard key={callout.nodeId} callout={callout} />
      ))}
    </>
  );
}

function SpecCalloutCard({ callout }: { callout: (typeof SPEC_CALLOUTS)[number] }) {
  return (
    <div
      className="absolute flex flex-col items-start gap-[8px] px-[12px] pb-[16px] pt-[8px]"
      style={{
        left: callout.left,
        top: callout.top,
        width: FULLPICTURE_CALLOUT_WIDTH,
        backgroundColor: "rgba(21,21,21,0.1)",
      }}
      data-node-id={callout.nodeId}
      data-name="Content"
    >
      {/* Header (title + icon) */}
      <div className="flex w-full items-center justify-between border-b border-[rgba(255,255,255,0.1)] pb-[6px]">
        <p
          className={`${gilroySemiBold.className} text-[16px] leading-[16px] font-semibold tracking-[0.6px] whitespace-nowrap uppercase not-italic`}
          style={{ color: CALLOUT_HEADER_COLOR }}
        >
          {callout.header}
        </p>
        <div
          className="relative flex size-[27.649px] shrink-0 items-center justify-center overflow-clip rounded-[5.895px]"
          style={{ backgroundImage: ICON_TILE_BG }}
          aria-hidden
        >
          <div className="size-[19.649px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src="/products/spec-icon.svg"
              className="block size-full max-w-none"
            />
          </div>
        </div>
      </div>

      {/* Items with dividers between */}
      {callout.items.map((item, i) => (
        <div key={i} className="contents">
          {i > 0 && (
            <div className="flex w-full items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src="/products/spec-line.svg"
                className="block w-full max-w-none"
                aria-hidden
              />
            </div>
          )}
          <div className="flex w-full items-center gap-[5.078px]">
            <span
              className={`${interRegular.className} text-[14px] font-normal leading-[normal] tracking-[-0.1504px] not-italic`}
              style={{ color: CALLOUT_PLUS_COLOR }}
            >
              +
            </span>
            <span
              className={`${interRegular.className} text-[13px] font-normal leading-[normal] whitespace-nowrap not-italic`}
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              {item}
            </span>
          </div>
        </div>
      ))}

      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </div>
  );
}

function ProductsFullPictureMobile() {
  return (
    <section
      className="relative w-full overflow-hidden bg-black px-[24px] pt-[64px] pb-[80px] min-[1024px]:hidden"
      aria-label="The full picture"
    >
      {/* Title */}
      <div className="flex flex-col items-center gap-[16px]">
        <h2
          className={`${gilroyMedium.className} max-w-full bg-clip-text text-center text-[30px] leading-[34px] font-medium text-transparent not-italic [word-break:break-word]`}
          style={{
            backgroundImage: FULLPICTURE_TITLE_GRADIENT,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          The full picture
        </h2>
        <p
          className={`${interRegular.className} max-w-full text-center text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-65`}
        >
          Bridge the lab and real world. The Sparsh module offers continuous,
          microwatt intelligence in a 21×21mm size, with a breakout board that
          snaps off for production.
        </p>
      </div>

      {/* Central image */}
      <div className="relative mt-[24px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Sparsh module"
          src="/products/full-picture.png"
          className="h-auto w-full rounded-[8px]"
        />
      </div>

      {/* Callouts as stacked grid */}
      <div className="mt-[32px] grid grid-cols-1 gap-[16px] sm:grid-cols-2">
        {SPEC_CALLOUTS.map((callout) => (
          <div
            key={callout.nodeId}
            className="relative flex flex-col gap-[8px] px-[12px] pb-[12px] pt-[8px]"
            style={{ backgroundColor: "rgba(21,21,21,0.1)" }}
          >
            <div className="flex w-full items-center justify-between border-b border-[rgba(255,255,255,0.1)] pb-[6px]">
              <p
                className={`${gilroySemiBold.className} text-[14px] font-semibold tracking-[0.6px] uppercase not-italic`}
                style={{ color: CALLOUT_HEADER_COLOR }}
              >
                {callout.header}
              </p>
              <div
                className="flex size-[24px] items-center justify-center rounded-[5px]"
                style={{ backgroundImage: ICON_TILE_BG }}
                aria-hidden
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src="/products/spec-icon.svg"
                  className="block size-[16px]"
                />
              </div>
            </div>
            {callout.items.map((item, i) => (
              <div key={i} className="flex items-center gap-[6px]">
                <span
                  className={`${interRegular.className} text-[13px] not-italic`}
                  style={{ color: CALLOUT_PLUS_COLOR }}
                >
                  +
                </span>
                <span
                  className={`${interRegular.className} text-[13px] not-italic`}
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  {item}
                </span>
              </div>
            ))}
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </div>
        ))}
      </div>
    </section>
  );
}
