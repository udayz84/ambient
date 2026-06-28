import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import {
  BENCH_CARD,
  BENCH_CARDS,
  BENCH_IMAGE_BOX,
  BENCH_IMAGE_VIGNETTE,
  BENCH_TITLE_GRADIENT,
  CORNER_LEFT,
  CORNER_RIGHT,
  DEV_CHIP_BG,
  PRIMARY_CTA_INSET,
  PRIMARY_CTA_SHADOW,
} from "./products-data";

/**
 * Figma 2918:1467 (title) + 2918:1476 (3 product cards).
 * "From bench to volume without rewriting a thing."
 */
export function ProductsBenchToVolume() {
  return (
    <>
      {/* DESKTOP (>=1024px) */}
      <section
        className="relative mx-auto hidden w-full bg-black min-[1024px]:block"
        aria-label="From bench to volume"
      >
        <ProductsBenchToVolumeDesktop />
      </section>

      {/* MOBILE (<1024px) */}
      <ProductsBenchToVolumeMobile />
    </>
  );
}

function ProductsBenchToVolumeDesktop() {
  return (
    <div className="mx-auto flex w-full max-w-[1204px] flex-col items-center pb-[120px]">
      {/* Section title — 2918:1467 (centered, w=800) */}
      <div
        className="flex flex-col items-center gap-[24px]"
        style={{ width: 800 }}
        data-node-id="2918:1467"
        data-name="Frame 1984079432"
      >
        <div
          className="relative px-[10px]"
          style={{ width: 558, height: 98 }}
          data-node-id="2918:1469"
          data-name="Title"
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} absolute m-0 w-[538px] bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              left: 10,
              top: 0,
              backgroundImage: BENCH_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2918:1470"
          >
            <span className="block leading-[49px]">From bench to volume</span>
            <span className="block leading-[49px]">{` without rewriting a thing.`}</span>
          </h2>
        </div>
        <p
          className={`${interRegular.className} w-[800px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
          data-node-id="2918:1475"
        >
          {`The C code, the build, the AI you validate on the kit ports straight to production silicon. This is the part competitors can't offer.`}
        </p>
      </div>

      {/* Cards row — 2918:1476 */}
      <div
        className="mt-[45px] flex items-stretch"
        style={{ gap: BENCH_CARD.gap, width: 1204 }}
        data-node-id="2918:1476"
        data-name="Frame 1984079440"
      >
        {BENCH_CARDS.map((card) => (
          <BenchCardView key={card.nodeId} card={card} />
        ))}
      </div>
    </div>
  );
}

function BenchCardView({ card }: { card: (typeof BENCH_CARDS)[number] }) {
  return (
    <article
      className="relative flex flex-1 flex-col overflow-clip border-[0.5px] border-solid px-[20px] pt-[20px] pb-[32px]"
      style={{
        backgroundColor: BENCH_CARD.bg,
        borderColor: BENCH_CARD.border,
      }}
      data-node-id={card.nodeId}
      data-name="Article"
    >
      {/* Image box (vignette placeholder) — 2918:1478 */}
      <div
        className="flex shrink-0 items-center justify-center rounded-[6px] border border-solid"
        style={{
          width: BENCH_IMAGE_BOX.width,
          height: BENCH_IMAGE_BOX.height,
          borderColor: BENCH_CARD.imageBorder,
          backgroundImage: BENCH_IMAGE_VIGNETTE,
        }}
        data-name="Container"
        aria-hidden
      >
        {/* Product logo/image placeholder — 2918:1479 (empty in source) */}
        <div
          style={{
            width: BENCH_IMAGE_BOX.placeholderWidth,
            height: BENCH_IMAGE_BOX.placeholderHeight,
          }}
        />
      </div>

      {/* Content — chip + title + description */}
      <div className="relative mt-[20px] flex flex-col items-start gap-[10px] not-italic">
        <DevChip />
        <h3
          className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium whitespace-nowrap text-white`}
        >
          {card.title}
        </h3>
        <p
          className={`${interRegular.className} w-full text-[16px] leading-[24px] font-normal text-[rgba(240,240,240,0.6)] [word-break:break-word]`}
        >
          {card.description}
        </p>
      </div>

      {/* CTA pinned to bottom */}
      <div className="mt-auto pt-[20px]">
        <GreenCta width={card.ctaWidth}>{card.cta}</GreenCta>
      </div>

      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </article>
  );
}

function DevChip() {
  return (
    <div
      className={`${dmMono.className} relative h-[26px] shrink-0 overflow-clip`}
      style={{ width: 153, backgroundColor: DEV_CHIP_BG }}
      data-name="Menu"
    >
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      <p className="absolute left-1/2 top-[calc(50%-4.5px)] -translate-x-1/2 text-[13px] leading-[19.5px] font-normal tracking-[-0.39px] whitespace-nowrap text-[#ecfae5] uppercase not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
        Development
      </p>
      <div className="absolute top-1/2 left-[7px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
      <div className="absolute top-1/2 right-[7px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
    </div>
  );
}

function GreenCta({
  children,
  width,
}: {
  children: React.ReactNode;
  width: number;
}) {
  return (
    <a
      href="#"
      className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] shrink-0 items-center justify-center overflow-hidden`}
      style={{ width }}
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

function ProductsBenchToVolumeMobile() {
  return (
    <section
      className="relative w-full bg-black px-[24px] pt-[64px] pb-[80px] min-[1024px]:hidden"
      aria-label="From bench to volume"
    >
      {/* Title */}
      <div className="flex flex-col items-center gap-[16px]">
        <h2
          className={`${gilroyMedium.className} max-w-full bg-clip-text text-center text-[30px] leading-[34px] font-medium text-transparent not-italic [word-break:break-word]`}
          style={{
            backgroundImage: BENCH_TITLE_GRADIENT,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {`From bench to volume without rewriting a thing.`}
        </h2>
        <p
          className={`${interRegular.className} max-w-full text-center text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-65`}
        >
          {`The C code, the build, the AI you validate on the kit ports straight to production silicon. This is the part competitors can't offer.`}
        </p>
      </div>

      {/* Cards */}
      <div className="mt-[32px] flex flex-col gap-[20px]">
        {BENCH_CARDS.map((card) => (
          <article
            key={card.nodeId}
            className="relative flex flex-col border-[0.5px] border-solid p-[20px]"
            style={{
              backgroundColor: BENCH_CARD.bg,
              borderColor: BENCH_CARD.border,
            }}
          >
            {/* Image box */}
            <div
              className="mb-[16px] flex h-[200px] w-full items-center justify-center rounded-[6px] border border-solid"
              style={{
                borderColor: BENCH_CARD.imageBorder,
                backgroundImage: BENCH_IMAGE_VIGNETTE,
              }}
              aria-hidden
            />
            <DevChip />
            <h3
              className={`${gilroyMedium.className} mt-[10px] text-[22px] leading-[28px] font-medium text-white not-italic`}
            >
              {card.title}
            </h3>
            <p
              className={`${interRegular.className} mt-[10px] text-[14px] leading-[21px] font-normal text-[rgba(240,240,240,0.6)]`}
            >
              {card.description}
            </p>
            <div className="mt-[20px]">
              <GreenCta width={card.ctaWidth}>{card.cta}</GreenCta>
            </div>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </article>
        ))}
      </div>
    </section>
  );
}
