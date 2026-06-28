import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
  PRIMARY_CTA_INSET,
  PRIMARY_CTA_SHADOW,
  START_CARD,
  START_CARD_TITLE_GRADIENT,
  START_CARDS,
  START_TITLE_GRADIENT,
} from "./products-data";

/**
 * Figma 2903:2609 (title) + 2903:2578/2555 (two CTA cards).
 * "Start building with GPX10 Pro." — footer CTA section.
 */
export function ProductsStartBuilding() {
  return (
    <>
      {/* DESKTOP (>=1024px) */}
      <section
        className="relative mx-auto hidden w-full bg-black min-[1024px]:block"
        aria-label="Start building with GPX10 Pro"
      >
        <ProductsStartBuildingDesktop />
      </section>

      {/* MOBILE (<1024px) */}
      <ProductsStartBuildingMobile />
    </>
  );
}

function ProductsStartBuildingDesktop() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center pb-[120px] pt-[80px]">
      {/* Section title — 2903:2609 (centered, w=650) */}
      <div
        className="flex flex-col items-center gap-[24px]"
        style={{ width: 650 }}
        data-node-id="2903:2609"
        data-name="Section Title"
      >
        <div
          className="relative px-[10px]"
          style={{ width: 641, height: 49 }}
          data-node-id="2903:2610"
          data-name="Title"
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} absolute m-0 w-[621px] bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              left: 10,
              top: 0,
              backgroundImage: START_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2903:2611"
          >
            Start building with GPX10 Pro.
          </h2>
        </div>
        <p
          className={`${interRegular.className} w-[650px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
          data-node-id="2903:2616"
        >
          {`A complete edge-AI SoC — AI engine, control, sensing, memory, and security — integrated so your board doesn't have to be.`}
        </p>
      </div>

      {/* Cards row — gap 84, centered */}
      <div
        className="mt-[80px] flex items-start"
        style={{ gap: START_CARD.gap }}
      >
        {START_CARDS.map((card) => (
          <StartCardView key={card.nodeId} card={card} />
        ))}
      </div>
    </div>
  );
}

function StartCardView({ card }: { card: (typeof START_CARDS)[number] }) {
  return (
    <div
      className="relative shrink-0"
      style={{ width: START_CARD.width, height: START_CARD.height }}
      data-node-id={card.nodeId}
      data-name="Frame 1618875857"
    >
      {/* Card background shape — 2903:2556/2579 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src="/products/cta-card-bg.svg"
        className="pointer-events-none absolute inset-0 block size-full max-w-none"
        aria-hidden
      />

      {/* Content — vertically centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-[54px]">
        <div className="flex w-[450px] flex-col items-center gap-[36px]">
          {/* Card title with bracket frame */}
          <div
            className="relative"
            style={{ width: 450, height: 108 }}
            data-name="Frame 1618875832"
          >
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            <h3
              className={`${gilroyMedium.className} absolute left-1/2 m-0 w-[473.877px] -translate-x-1/2 bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                top: 7,
                backgroundImage: START_CARD_TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              <span className="block leading-[49px]">{card.titleLines[0]}{` `}</span>
              <span className="block leading-[49px]">{card.titleLines[1]}</span>
            </h3>
          </div>

          {/* Description + CTA */}
          <div className="flex w-[450px] flex-col items-center gap-[20px]">
            <p
              className={`${interRegular.className} h-[48px] w-full text-center text-[14px] leading-[24px] font-normal tracking-[-0.3125px] text-white not-italic [word-break:break-word]`}
            >
              {card.description}
            </p>
            <StartCta>{card.cta}</StartCta>
          </div>
        </div>
      </div>
    </div>
  );
}

function StartCta({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#"
      className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-full items-center justify-center overflow-hidden`}
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
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </a>
  );
}

function ProductsStartBuildingMobile() {
  return (
    <section
      className="relative w-full bg-black px-[24px] pt-[64px] pb-[80px] min-[1024px]:hidden"
      aria-label="Start building with GPX10 Pro"
    >
      {/* Title */}
      <div className="flex flex-col items-center gap-[16px]">
        <h2
          className={`${gilroyMedium.className} max-w-full bg-clip-text text-center text-[30px] leading-[34px] font-medium text-transparent not-italic [word-break:break-word]`}
          style={{
            backgroundImage: START_TITLE_GRADIENT,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          Start building with GPX10 Pro.
        </h2>
        <p
          className={`${interRegular.className} max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0]`}
        >
          {`A complete edge-AI SoC — AI engine, control, sensing, memory, and security — integrated so your board doesn't have to be.`}
        </p>
      </div>

      {/* Cards */}
      <div className="mt-[40px] flex flex-col gap-[24px]">
        {START_CARDS.map((card) => (
          <div key={card.nodeId} className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src="/products/cta-card-bg.svg"
              className="pointer-events-none absolute inset-0 block size-full max-w-none"
              aria-hidden
            />
            <div className="relative flex flex-col items-center gap-[24px] px-[28px] py-[36px]">
              <h3
                className={`${gilroyMedium.className} max-w-full bg-clip-text text-center text-[30px] leading-[34px] font-medium text-transparent not-italic [word-break:break-word]`}
                style={{
                  backgroundImage: START_CARD_TITLE_GRADIENT,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                {card.titleLines[0]} {card.titleLines[1]}
              </h3>
              <p
                className={`${interRegular.className} text-center text-[14px] leading-[21px] font-normal text-white opacity-90`}
              >
                {card.description}
              </p>
              <StartCta>{card.cta}</StartCta>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
