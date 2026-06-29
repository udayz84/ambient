import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import {
  ABSTRACT_DESIGN,
  CARD_BG,
  CARD_BORDER,
  CARD_DESC_COLOR,
  CORNER_LEFT,
  CORNER_RIGHT,
  FEATURE_CARDS,
  ICON_TILE_BG,
  SECTION_TITLE_GRADIENT,
} from "./products-data";

/**
 * Figma 2901:794 — "The chip that ends the power-vs-intelligence tradeoff".
 * Desktop section canvas is 1232 wide / 968 tall, centered below the hero.
 */
export function ProductsFeatures() {
  return (
    <>
      {/* DESKTOP (>=1024px) */}
      <section
        id="products-features"
        className="relative mx-auto hidden w-[1232px] bg-black min-[1024px]:block"
        aria-label="Product capabilities"
      >
        <ProductsFeaturesDesktop />
      </section>

      {/* MOBILE (<1024px) */}
      <ProductsFeaturesMobile />
    </>
  );
}

function ProductsFeaturesDesktop() {
  return (
    <div className="relative" style={{ height: 968 }} data-node-id="2901:794">
      {/* Abstract decorative header — 2901:987 (overflows above into hero) */}
      <div
        className="pointer-events-none absolute z-10"
        style={{
          left: ABSTRACT_DESIGN.left,
          top: ABSTRACT_DESIGN.top,
          width: ABSTRACT_DESIGN.width,
          height: ABSTRACT_DESIGN.height,
        }}
        data-node-id="2901:987"
        data-name="Abstract Design"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src="/products/abstract-design.svg"
          className="absolute inset-0 block size-full max-w-none"
        />
      </div>

      {/* Section title — 2901:795 (centered, top=0) */}
      <div
        className="absolute flex flex-col items-center gap-[24px] z-20"
        style={{ left: 279, top: 0, width: 674 }}
        data-node-id="2901:795"
        data-name="Section Title"
      >
        <div
          className="relative px-[10px]"
          style={{ width: 674, height: 98 }}
          data-node-id="2901:796"
          data-name="Title"
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} absolute m-0 w-[654px] bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              left: 10,
              top: 0,
              backgroundImage: SECTION_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2901:797"
          >
            <span className="block">{`The chip that ends the `}</span>
            <span className="block">power-vs-intelligence tradeoff.</span>
          </h2>
        </div>
        <p
          className={`${interRegular.className} w-[650px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
          data-node-id="2901:802"
        >
          For a decade, product makers chose: a dumb MCU that lasts months, or a
          smart NPU that dies by lunch. GPX10 Pro is the first that refuses to
          choose.
        </p>
      </div>

      {/* Row 1 — 2901:803 (top=212) */}
      <div
        className="absolute flex items-center gap-[36px]"
        style={{ left: 0, top: 212, width: 1232 }}
        data-node-id="2901:803"
      >
        <FeatureCard card={FEATURE_CARDS[0]} />
        <FeatureCard card={FEATURE_CARDS[1]} />
      </div>

      {/* Row 2 — 2901:926 (top=614) */}
      <div
        className="absolute flex items-center gap-[36px]"
        style={{ left: 0, top: 614, width: 1232 }}
        data-node-id="2901:926"
      >
        <FeatureCard card={FEATURE_CARDS[2]} />
        <FeatureCard card={FEATURE_CARDS[3]} />
      </div>
    </div>
  );
}

function FeatureCard({ card }: { card: (typeof FEATURE_CARDS)[number] }) {
  return (
    <article
      className="relative flex h-[354px] w-[598px] shrink-0 flex-col justify-end overflow-clip border-[0.5px] border-solid"
      style={{
        backgroundColor: CARD_BG,
        borderColor: CARD_BORDER,
        paddingLeft: 32,
        paddingRight: 32,
        paddingBottom: 24,
        paddingTop: card.paddingTop,
      }}
      data-node-id={card.nodeId}
      data-name="Article"
    >
      {/* Decorative card image — top-right */}
      <div
        className="pointer-events-none absolute overflow-hidden"
        style={{ right: 1.03, top: 0.36, width: 297.96875, height: 262.6378173828125 }}
        data-name="ChatGPT Image May 19, 2026, 01_09_18 PM 1"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src="/products/card-image.png"
          className="absolute left-0 max-w-none"
          style={{ top: "-23.63%", width: "116.47%", height: "132.14%" }}
        />
      </div>

      {/* Icon tile — top-left */}
      <div
        className="absolute overflow-clip"
        style={{
          left: 32,
          top: 24,
          width: 66.14035034179688,
          height: 65,
          borderRadius: 13.684,
          backgroundImage: ICON_TILE_BG,
        }}
        data-name="Icon"
        aria-hidden
      >
        <div className="absolute left-1/2 top-1/2 size-[45.614px] -translate-x-1/2 -translate-y-1/2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={card.icon}
            className="block size-full max-w-none"
          />
        </div>
      </div>

      {/* Content — title + description */}
      <div
        className="relative flex w-full flex-col gap-[12px] [word-break:break-word] not-italic"
        data-name="NewsSection"
      >
        <h3
          className={`${gilroyMedium.className} w-[489.220703125px] shrink-0 text-[32px] leading-[38px] font-medium whitespace-nowrap text-white`}
          data-name="Title"
        >
          {card.title}
        </h3>
        <p
          className={`${interRegular.className} w-[489.220703125px] shrink-0 text-[16px] leading-[24px] font-normal`}
          style={{ color: CARD_DESC_COLOR }}
          data-name="Description"
        >
          {card.description}
        </p>
      </div>

      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </article>
  );
}

function ProductsFeaturesMobile() {
  return (
    <section
      className="relative w-full bg-black px-[24px] pt-[64px] pb-[80px] min-[1024px]:hidden"
      aria-label="Product capabilities"
    >
      {/* Title */}
      <div className="flex flex-col items-center gap-[20px]">
        <h2
          className={`${gilroyMedium.className} max-w-full bg-clip-text text-center text-[30px] leading-[34px] font-medium text-transparent not-italic [word-break:break-word]`}
          style={{
            backgroundImage: SECTION_TITLE_GRADIENT,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {`The chip that ends the power-vs-intelligence tradeoff.`}
        </h2>
        <p
          className={`${interRegular.className} max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0]`}
        >
          For a decade, product makers chose: a dumb MCU that lasts months, or a
          smart NPU that dies by lunch. GPX10 Pro is the first that refuses to
          choose.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-[40px] flex flex-col gap-[20px]">
        {FEATURE_CARDS.map((card) => (
          <article
            key={card.nodeId}
            className="relative flex flex-col gap-[16px] overflow-clip border-[0.5px] border-solid p-[20px]"
            style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}
          >
            <div
              className="flex size-[48px] shrink-0 items-center justify-center overflow-clip"
              style={{ borderRadius: 12, backgroundImage: ICON_TILE_BG }}
              aria-hidden
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={card.icon} className="block size-[34px]" />
            </div>
            <div className="flex flex-col gap-[8px] not-italic">
              <h3
                className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium text-white`}
              >
                {card.title}
              </h3>
              <p
                className={`${interRegular.className} text-[14px] leading-[21px] font-normal`}
                style={{ color: CARD_DESC_COLOR }}
              >
                {card.description}
              </p>
            </div>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </article>
        ))}
      </div>
    </section>
  );
}
