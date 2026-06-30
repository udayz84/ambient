import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { CORNER_LEFT, CORNER_RIGHT, PRIMARY_CTA_INSET, PRIMARY_CTA_SHADOW } from "./dvk-data";

export function DvkIntegratedModules() {
  return (
    <div className="relative z-20 mb-[-409px] w-full bg-transparent">
      <section className="relative mx-auto hidden w-full bg-transparent min-[1024px]:block" aria-label="From Cranium to Integrated Modules">
        <DvkIntegratedModulesDesktop />
      </section>
      <DvkIntegratedModulesMobile />
    </div>
  );
}

const CARDS = [
  {
    title: "Cranium DVK",
    description: "Validate your logic on the Cranium kit today with full debug capabilities and rich I/O."
  },
  {
    title: "SOM Module",
    description: "Drop our high-density SOM directly into your product without rewriting your application software."
  }
];

const CARD_BG = "rgba(0,0,0,0.5)";
const CARD_BORDER = "rgba(240,240,240,0.2)";
const IMAGE_BORDER = "rgba(0,255,0,0.3)";
const IMAGE_VIGNETTE = "radial-gradient(ellipse 65% 100% at 50% 50%, rgba(26,26,26,1) 0%, rgba(13,13,13,1) 25%, rgba(7,7,7,1) 37.5%, rgba(0,0,0,1) 50%)";
const DEV_CHIP_BG = "rgba(115,190,91,0.12)";
const TITLE_GRADIENT = "linear-gradient(107.367deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

function DvkIntegratedModulesDesktop() {
  return (
    <div className="mx-auto flex w-full max-w-[1204px] flex-col items-center pb-[120px]">
      <div className="flex flex-col items-center gap-[24px]" style={{ width: 800 }}>
        <div className="relative px-[20px] py-[4px] w-fit">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} relative m-0 bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic whitespace-nowrap`}
            style={{
              backgroundImage: TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            From Cranium to Integrated Modules.
          </h2>
        </div>
        <p className={`${interRegular.className} w-[800px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}>
          The exact C-code, hardware configurations, and unified build you validate on the Cranium DVK ports directly to our production-ready System-on-Modules (SOMs).
        </p>
      </div>

      <div className="mt-[45px] flex items-stretch gap-[24px]" style={{ width: 1204 }}>
        {CARDS.map((card, i) => (
          <article
            key={i}
            className="relative flex flex-1 flex-col overflow-clip border-[0.5px] border-solid px-[20px] pt-[20px] pb-[32px]"
            style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}
          >
            <div
              className="flex shrink-0 items-center justify-center rounded-[6px] border border-solid"
              style={{ height: 270, borderColor: IMAGE_BORDER, backgroundImage: IMAGE_VIGNETTE }}
              aria-hidden
            />
            <div className="relative mt-[20px] flex items-center justify-between gap-[10px] not-italic">
              <h3 className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium whitespace-nowrap text-white`}>
                {card.title}
              </h3>
              <DevChip />
            </div>
            <p className={`${interRegular.className} mt-[10px] w-full text-[16px] leading-[24px] font-normal text-[rgba(240,240,240,0.6)] [word-break:break-word]`}>
              {card.description}
            </p>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </article>
        ))}
      </div>

      <p className={`${interRegular.className} mt-[45px] w-[650px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}>
        Validate your logic on the Cranium kit today. When you are ready for extreme space constraints, drop our high-density SOM directly into your product without rewriting your application software.
      </p>

      <div className="mt-[32px] flex items-center gap-[24px]">
        <GreenCta width={157}>Explore SOMs</GreenCta>
        <SecondaryCta width={276}>Schedule Technical Consultation</SecondaryCta>
      </div>
    </div>
  );
}

function DvkIntegratedModulesMobile() {
  return (
    <section className="relative w-full bg-black px-[24px] pt-[64px] pb-[80px] min-[1024px]:hidden" aria-label="From Cranium to Integrated Modules">
      <div className="flex flex-col items-center gap-[16px]">
        <h2
          className={`${gilroyMedium.className} max-w-full bg-clip-text text-center text-[30px] leading-[34px] font-medium text-transparent not-italic [word-break:break-word]`}
          style={{
            backgroundImage: TITLE_GRADIENT,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          From Cranium to Integrated Modules.
        </h2>
        <p className={`${interRegular.className} max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0]`}>
          The exact C-code, hardware configurations, and unified build you validate on the Cranium DVK ports directly to our production-ready System-on-Modules (SOMs).
        </p>
      </div>

      <div className="mt-[32px] flex flex-col gap-[20px]">
        {CARDS.map((card, i) => (
          <article
            key={i}
            className="relative flex flex-col border-[0.5px] border-solid p-[20px]"
            style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}
          >
            <div
              className="mb-[16px] flex h-[200px] w-full items-center justify-center rounded-[6px] border border-solid"
              style={{ borderColor: IMAGE_BORDER, backgroundImage: IMAGE_VIGNETTE }}
              aria-hidden
            />
            <div className="flex items-center justify-between gap-[10px] w-full">
              <h3 className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium text-white not-italic`}>
                {card.title}
              </h3>
              <DevChip />
            </div>
            <p className={`${interRegular.className} mt-[10px] text-[14px] leading-[21px] font-normal text-[rgba(240,240,240,0.6)]`}>
              {card.description}
            </p>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </article>
        ))}
      </div>

      <p className={`${interRegular.className} mt-[32px] max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0]`}>
        Validate your logic on the Cranium kit today. When you are ready for extreme space constraints, drop our high-density SOM directly into your product without rewriting your application software.
      </p>

      <div className="mt-[32px] flex flex-col items-stretch gap-[16px]">
        <GreenCta fullWidth width={157}>Explore SOMs</GreenCta>
        <SecondaryCta fullWidth width={276}>Schedule Technical Consultation</SecondaryCta>
      </div>
    </section>
  );
}

function DevChip() {
  return (
    <div
      className={`${dmMono.className} relative h-[26px] shrink-0 overflow-clip`}
      style={{ width: 104, backgroundColor: DEV_CHIP_BG }}
    >
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      <p className="absolute left-1/2 top-[calc(50%-4.5px)] -translate-x-1/2 text-[10px] leading-[19.5px] font-normal tracking-[-0.3px] whitespace-nowrap text-[#ecfae5] uppercase not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
        Development
      </p>
      <div className="absolute top-1/2 left-[7px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
      <div className="absolute top-1/2 right-[7px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
    </div>
  );
}

function GreenCta({ children, width, fullWidth = false }: { children: React.ReactNode; width: number; fullWidth?: boolean }) {
  return (
    <a
      href="#"
      className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[52px] ${fullWidth ? "w-full" : "shrink-0"} items-center justify-center overflow-hidden`}
      style={fullWidth ? undefined : { width }}
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
      <span className={`relative text-[16px] leading-normal font-medium uppercase ${fullWidth ? "text-center" : "whitespace-nowrap"} text-white not-italic py-[4px] mt-[2px]`}>
        {children}
      </span>
      <span aria-hidden className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`} />
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </a>
  );
}

function SecondaryCta({ children, width, fullWidth = false }: { children: React.ReactNode; width: number; fullWidth?: boolean }) {
  return (
    <a
      href="#"
      className={`${gilroyMedium.className} relative flex h-[52px] ${fullWidth ? "w-full" : "shrink-0"} items-center justify-center bg-[rgba(226,241,202,0.12)] px-[20px]`}
      style={fullWidth ? undefined : { width }}
    >
      <span className={`relative text-[16px] leading-normal font-medium uppercase ${fullWidth ? "text-center" : "whitespace-nowrap"} text-white not-italic py-[4px] mt-[2px]`}>
        {children}
      </span>
      <Corners leftSrc="/hero/vector-57.svg" rightSrc="/hero/vector-55.svg" />
    </a>
  );
}
