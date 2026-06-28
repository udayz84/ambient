import { gilroyExtraBold, gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
  PRIMARY_CTA_INSET,
  PRIMARY_CTA_SHADOW,
  SECONDARY_CTA_BG,
  TICK_SEGMENTS,
  USECASE_CARDS,
  USECASE_TABS,
  USECASES_CANVAS_WIDTH,
  USECASES_SECTION_HEIGHT,
  USECASES_TITLE_GRADIENT,
  WATERMARK_GRADIENT,
} from "./products-data";

/**
 * Figma 2901:2033 — "Built for always-on. Proven across markets."
 * Tabbed use-case showcase. Desktop canvas is 1448 wide / 941 tall.
 */
export function ProductsUseCases() {
  return (
    <>
      {/* DESKTOP (>=1024px) */}
      <section
        className="relative mx-auto hidden w-full bg-black min-[1024px]:block"
        aria-label="Use cases"
      >
        <div
          className="relative mx-auto"
          style={{
            height: USECASES_SECTION_HEIGHT,
            width: USECASES_CANVAS_WIDTH,
          }}
          data-node-id="2901:2033"
          data-name="Desktop - 14"
        >
          <ProductsUseCasesDesktop />
        </div>
      </section>

      {/* MOBILE (<1024px) */}
      <ProductsUseCasesMobile />
    </>
  );
}

function ProductsUseCasesDesktop() {
  return (
    <>
      {/* Section title — 2901:2134 */}
      <div
        className="absolute flex flex-col items-center gap-[24px]"
        style={{ left: 399, top: 0, width: 650 }}
        data-node-id="2901:2134"
        data-name="Section Title"
      >
        <div
          className="relative px-[10px]"
          style={{ width: 512, height: 98 }}
          data-node-id="2901:2135"
          data-name="Title"
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} absolute m-0 w-[492px] bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              left: 10,
              top: 0,
              backgroundImage: USECASES_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2901:2136"
          >
            <span className="block leading-[49px]">Built for always-on.</span>
            <span className="block leading-[49px]">{` Proven across markets.`}</span>
          </h2>
        </div>
        <p
          className={`${interRegular.className} w-[650px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
          data-node-id="2901:2141"
        >
          The same chip, tuned to the job — from a wrist to a factory floor.
        </p>
      </div>

      {/* Options / tab ruler — 2901:2034 */}
      <TabRuler />

      {/* Giant watermark — 2901:2103 */}
      <h3
        className={`${gilroyExtraBold.className} absolute m-0 text-center text-[200px] uppercase whitespace-nowrap tracking-[0.5px] leading-[210px] bg-clip-text text-transparent [word-break:break-word] not-italic`}
        style={{
          left: 184.69921875,
          top: 345,
          width: 1079,
          height: 210,
          backgroundImage: WATERMARK_GRADIENT,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
        data-node-id="2901:2103"
        aria-hidden
      >
        Hearables
      </h3>

      {/* Central image — 2901:2104 */}
      <div
        className="absolute overflow-hidden"
        style={{ left: 407.759765625, top: 305.032958984375, width: 632.8800659179688, height: 500 }}
        data-node-id="2901:2104"
        data-name="image 145"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src="/products/use-case-image.png"
          className="absolute inset-0 size-full max-w-none object-cover"
        />
      </div>

      {/* Connector indicators — 2901:2121 / 2901:2127 */}
      <Indicator
        src="/products/indicator-1.svg"
        left={490.24}
        top={653.06}
        width={88.18}
        height={14.14}
        flipY
      />
      <Indicator
        src="/products/indicator-2.svg"
        left={843.43}
        top={618.8}
        width={87.659}
        height={76.623}
      />

      {/* Content cards */}
      <UseCaseCardView card={USECASE_CARDS[0]} />
      <UseCaseCardView card={USECASE_CARDS[1]} />

      {/* CTA row — 2901:2143 */}
      <div
        className="absolute flex items-start gap-[24px]"
        style={{ left: 487, top: 873 }}
        data-node-id="2901:2143"
        data-name="Frame 1984079464"
      >
        <PrimaryCta>Explore Applications</PrimaryCta>
        <SecondaryCta>Discuss Your Use Case</SecondaryCta>
      </div>
    </>
  );
}

function TabRuler() {
  return (
    <div
      className="absolute flex items-center justify-between"
      style={{ left: 64.19921875, top: 212.2783203125, width: 1320, height: 52 }}
      data-node-id="2901:2034"
      data-name="Options"
    >
      {/* Left arrow */}
      <ArrowButton src="/products/tab-arrow-left.svg" nodeId="2901:2035" />

      {/* Interleave tick segments and tabs */}
      {USECASE_TABS.map((tab, i) => (
        <div key={tab.label} className="contents">
          <TickSegment heights={TICK_SEGMENTS[i]} />
          <TabButton tab={tab} />
        </div>
      ))}
      <TickSegment heights={TICK_SEGMENTS[TICK_SEGMENTS.length - 1]} />

      {/* Right arrow */}
      <ArrowButton src="/products/tab-arrow-right.svg" nodeId="2901:2089" flip />
    </div>
  );
}

function ArrowButton({
  src,
  nodeId,
  flip = false,
}: {
  src: string;
  nodeId: string;
  flip?: boolean;
}) {
  return (
    <button
      type="button"
      className={`relative size-[44px] shrink-0 cursor-pointer border-0 bg-transparent p-0 ${flip ? "-scale-x-100" : ""}`}
      data-node-id={nodeId}
      data-name="Menu"
      aria-label="Scroll tabs"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={src} className="block size-full max-w-none" />
    </button>
  );
}

function TickSegment({ heights }: { heights: number[] }) {
  return (
    <div className="contents">
      {heights.map((h, i) => (
        <div
          key={i}
          className="relative w-0 shrink-0 self-center"
          style={{ height: h }}
          aria-hidden
        >
          <div className="absolute left-1/2 top-1/2 w-px -translate-x-1/2 -translate-y-1/2 bg-[#333333]" style={{ height: h }} />
        </div>
      ))}
    </div>
  );
}

function TabButton({ tab }: { tab: (typeof USECASE_TABS)[number] }) {
  const active = !!tab.active;
  return (
    <button
      type="button"
      className={`${interRegular.className} flex shrink-0 cursor-pointer items-center justify-center border-0 whitespace-nowrap not-italic ${
        active
          ? "bg-[#f0f0f0] px-[12px] py-[14px] text-[16px] text-black"
          : "bg-transparent px-[20px] py-[14px] text-[16px] text-[#666]"
      }`}
      data-node-id={active ? "2901:2047" : undefined}
    >
      {tab.label}
    </button>
  );
}

function Indicator({
  src,
  left,
  top,
  width,
  height,
  flipY = false,
}: {
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  flipY?: boolean;
}) {
  return (
    <div
      className="pointer-events-none absolute flex items-center justify-center"
      style={{ left, top, width, height }}
      aria-hidden
    >
      <div
        className={`flex-none -rotate-90 ${flipY ? "-scale-y-100" : ""}`}
        style={{ width: height, height: width }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={src} className="block size-full max-w-none" />
      </div>
    </div>
  );
}

function UseCaseCardView({ card }: { card: (typeof USECASE_CARDS)[number] }) {
  return (
    <div
      className="absolute flex flex-col items-start gap-[10px] p-[32px]"
      style={{
        left: card.left,
        top: card.top,
        width: card.width,
        height: card.height,
        backgroundColor: card.bg,
      }}
      data-node-id={card.nodeId}
      data-name="Content"
    >
      <h4
        className={`${gilroyMedium.className} min-w-full w-[min-content] text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
      >
        {card.title}
      </h4>
      <p
        className={`${interRegular.className} min-w-full w-[min-content] text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
      >
        {card.description}
      </p>
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </div>
  );
}

function PrimaryCta({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#"
      className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-[223px] shrink-0 items-center justify-center overflow-hidden`}
      data-node-id="2901:2144"
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

function SecondaryCta({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#"
      className={`${gilroyMedium.className} relative flex h-[48px] shrink-0 items-center justify-center overflow-clip`}
      style={{ backgroundColor: SECONDARY_CTA_BG, width: 227 }}
      data-node-id="2901:2155"
      data-name="CTA - Secondary"
    >
      <span className="relative px-[20px] py-[10px] text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
        {children}
      </span>
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </a>
  );
}

function ProductsUseCasesMobile() {
  return (
    <section
      className="relative w-full overflow-hidden bg-black px-[24px] pt-[64px] pb-[80px] min-[1024px]:hidden"
      aria-label="Use cases"
    >
      {/* Title */}
      <div className="flex flex-col items-center gap-[16px]">
        <h2
          className={`${gilroyMedium.className} max-w-full bg-clip-text text-center text-[30px] leading-[34px] font-medium text-transparent not-italic [word-break:break-word]`}
          style={{
            backgroundImage: USECASES_TITLE_GRADIENT,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {`Built for always-on. Proven across markets.`}
        </h2>
        <p
          className={`${interRegular.className} max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0]`}
        >
          The same chip, tuned to the job — from a wrist to a factory floor.
        </p>
      </div>

      {/* Tabs (scrollable row) */}
      <div className="mt-[32px] -mx-[24px] flex items-center gap-[16px] overflow-x-auto px-[24px] pb-[8px]">
        {USECASE_TABS.map((tab) => (
          <span
            key={tab.label}
            className={`${interRegular.className} shrink-0 whitespace-nowrap text-[13px] tracking-[0.02em] not-italic ${
              tab.active
                ? "bg-[#f0f0f0] px-[12px] py-[8px] text-black"
                : "px-[8px] py-[8px] text-[#666]"
            }`}
          >
            {tab.label}
          </span>
        ))}
      </div>

      {/* Image */}
      <div className="relative mt-[24px] flex justify-center">
        <h3
          className={`${gilroyExtraBold.className} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[64px] uppercase tracking-[0.5px] leading-[64px] bg-clip-text text-transparent not-italic`}
          style={{
            backgroundImage: WATERMARK_GRADIENT,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
          aria-hidden
        >
          Hearables
        </h3>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src="/products/use-case-image.png"
          className="relative z-10 h-auto w-full max-w-[360px] object-cover"
        />
      </div>

      {/* Cards */}
      <div className="mt-[32px] flex flex-col gap-[16px]">
        {USECASE_CARDS.map((card) => (
          <div
            key={card.nodeId}
            className="relative flex flex-col gap-[8px] p-[20px]"
            style={{ backgroundColor: card.bg }}
          >
            <h4
              className={`${gilroyMedium.className} text-[20px] leading-[26px] font-medium text-white not-italic`}
            >
              {card.title}
            </h4>
            <p
              className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-65 not-italic`}
            >
              {card.description}
            </p>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="mt-[32px] flex flex-col gap-[16px]">
        <a
          href="#"
          className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-full items-center justify-center overflow-hidden`}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
          />
          <span className="relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
            Explore Applications
          </span>
          <span
            aria-hidden
            className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`}
          />
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
        </a>
        <a
          href="#"
          className={`${gilroyMedium.className} relative flex h-[48px] w-full items-center justify-center overflow-clip`}
          style={{ backgroundColor: SECONDARY_CTA_BG }}
        >
          <span className="relative px-[20px] py-[10px] text-[14px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
            Discuss Your Use Case
          </span>
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
        </a>
      </div>
    </section>
  );
}
