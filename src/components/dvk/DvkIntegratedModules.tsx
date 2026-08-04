import { mediaUrl } from "@/lib/strapi";
import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { CORNER_LEFT, CORNER_RIGHT, PRIMARY_CTA_INSET, PRIMARY_CTA_SHADOW } from "./dvk-data";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

const DEFAULT_HEADING = "From Cranium to Integrated Modules.";
const DEFAULT_SUBTITLE =
  "The exact C-code, hardware configurations, and unified build you validate on the Cranium DVK ports directly to our production-ready System-on-Modules (SOMs).";
const DEFAULT_FOOTER =
  "Validate your logic on the Cranium kit today. When you are ready for extreme space constraints, drop our high-density SOM directly into your product without rewriting your application software.";
const DEFAULT_PRIMARY_LABEL = "Explore SOMs";
const DEFAULT_SECONDARY_LABEL = "Schedule Technical Consultation";

export function DvkIntegratedModules({ data }: { data?: any }) {
  const heading = data?.heading || DEFAULT_HEADING;
  const subtitle = data?.subtitle || DEFAULT_SUBTITLE;
  const footer = DEFAULT_FOOTER;
  const primaryLabel =
    data?.primary_button?.label || DEFAULT_PRIMARY_LABEL;
  const primaryHref = data?.primary_button?.href || "#";
  const secondaryLabel =
    data?.secondary_button?.label || DEFAULT_SECONDARY_LABEL;
  const secondaryHref = data?.secondary_button?.href || "#";
  const cards =
    data?.cards && Array.isArray(data.cards) && data.cards.length > 0
      ? data.cards.map((c: any, i: number) => ({
          title: c?.title || CARDS[i]?.title || "",
          description: c?.description || CARDS[i]?.description || "",
          imageUrl: mediaUrl(c?.image) || null,
        }))
      : CARDS;
  return (
    <div className="relative z-20 mb-0 min-[1024px]:mb-[-409px] w-full bg-transparent">
      <section className="relative mx-auto hidden w-full bg-transparent min-[1024px]:block" aria-label="From Cranium to Integrated Modules">
        <DvkIntegratedModulesDesktop
          heading={heading}
          subtitle={subtitle}
          footer={footer}
          cards={cards}
          primaryLabel={primaryLabel}
          primaryHref={primaryHref}
          secondaryLabel={secondaryLabel}
          secondaryHref={secondaryHref}
        />
      </section>
      <DvkIntegratedModulesMobile
        heading={heading}
        subtitle={subtitle}
        footer={footer}
        cards={cards}
        primaryLabel={primaryLabel}
        primaryHref={primaryHref}
        secondaryLabel={secondaryLabel}
        secondaryHref={secondaryHref}
      />
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
/** Figma 2761:2847 — media container radial fade (683.75×163.5 ellipse). */
const IMAGE_VIGNETTE = "radial-gradient(ellipse 683.75px 163.5px at 50% 50%, rgba(26,26,26,1) 0%, rgba(13,13,13,1) 25%, rgba(7,7,7,1) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 100%)";
const DEV_CHIP_BG = "rgba(115,190,91,0.12)";
const TITLE_GRADIENT = "linear-gradient(107.367deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";
/** Figma 4062:12365 — mobile section title gradient. */
const TITLE_GRADIENT_MOBILE = "linear-gradient(106.607deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";
/** Figma 4062:12393 — mobile media container radial fade (411.49×100 ellipse). */
const MOBILE_IMAGE_VIGNETTE = "radial-gradient(ellipse 411.49px 100px at 165.5px 100px, rgba(26,26,26,1) 0%, rgba(13,13,13,1) 25%, rgba(7,7,7,1) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 100%)";

function DvkIntegratedModulesDesktop({
  heading,
  subtitle,
  footer,
  cards,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  heading: string;
  subtitle: string;
  footer: string;
  cards: { title: string; description: string; imageUrl?: string | null }[];
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[1204px] flex-col items-center pb-[40px]">
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
            {heading}
          </h2>
        </div>
        <p className={`${interRegular.className} w-[800px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}>
          {subtitle}
        </p>
      </div>

      <div className="mt-[45px] flex items-stretch gap-[24px]" style={{ width: 1204 }}>
        {cards.map((card, i) => (
          <article
            key={i}
            className="relative flex flex-1 flex-col overflow-clip border-[0.5px] border-solid px-[20px] pt-[20px] pb-[32px]"
            style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}
          >
            <div
              className="relative flex h-[327px] shrink-0 items-center justify-center rounded-[6px] border border-solid overflow-hidden"
              style={{ borderColor: IMAGE_BORDER, backgroundImage: IMAGE_VIGNETTE }}
              aria-hidden
            >
              {card.imageUrl && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={card.imageUrl} alt="" className="absolute inset-0 size-full max-w-none" />
              )}
            </div>
            <div className="relative mt-[20px] flex items-center justify-between gap-[10px] not-italic">
              <h3 className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium whitespace-nowrap text-white overflow-hidden text-ellipsis`}>
                {card.title}
              </h3>
              <DevChip />
            </div>
            <p className={`${interRegular.className} mt-[10px] w-full text-[16px] leading-[24px] font-normal text-[rgba(240,240,240,0.6)] [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden`}>
              {card.description}
            </p>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </article>
        ))}
      </div>

      <p className={`${interRegular.className} mt-[45px] w-[650px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}>
        {footer}
      </p>

      <div className="mt-[32px] flex items-center gap-[24px]">
        <GreenCta width={157} href={primaryHref}>{primaryLabel}</GreenCta>
        <SecondaryCta width="auto" href={secondaryHref}>{secondaryLabel}</SecondaryCta>
      </div>
    </div>
  );
}

/**
 * Figma 4062:12362 — mobile integrated modules ("5th Fold", 393×1123 canvas).
 * Header 4062:12363 (19, 30), cards 4062:12391 (19.5, 227 / 355 wide, gap 12,
 * two 355×314 cards), footer 4062:12371 (29, 897), CTA stack 4062:12372
 * (42, 1011 / 310 wide, gap 16).
 */
function DvkIntegratedModulesMobile({
  heading,
  subtitle,
  footer,
  cards,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  heading: string;
  subtitle: string;
  footer: string;
  cards: { title: string; description: string; imageUrl?: string | null }[];
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}) {
  return (
    <section
      className="relative w-full bg-black min-[1024px]:hidden"
      aria-label="From Cranium to Integrated Modules"
      data-node-id="4062:12362"
      data-name="5th Fold"
    >
      <div className="relative mx-auto h-[1123px] w-full max-w-[393px]">
        {/* Header — 4062:12363 (19, 30 / 350 wide, gap 10) */}
        <div
          className="absolute top-[30px] left-[19px] flex w-[350px] max-w-[calc(100%-38px)] flex-col items-center gap-[10px]"
          data-node-id="4062:12363"
        >
          {/* Title group — 4062:12364 (356×76.43, corner ticks) */}
          <div className="relative h-[76.43px] w-full" data-node-id="4062:12364">
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            <h2
              className={`${gilroyMedium.className} absolute top-[4px] left-1/2 m-0 w-[332px] max-w-full -translate-x-1/2 bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: TITLE_GRADIENT_MOBILE,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              data-node-id="4062:12365"
            >
              {heading}
            </h2>
          </div>
          <p
            className={`${interRegular.className} w-[336px] max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic [word-break:break-word]`}
            data-node-id="4062:12370"
          >
            {subtitle}
          </p>
        </div>

        {/* Cards — 4062:12391 (19.5, 227 / 355 wide, gap 12) */}
        <div
          className="absolute top-[227px] left-[calc(50%+0.5px)] flex w-[355px] max-w-[calc(100%-38px)] -translate-x-1/2 flex-col gap-[12px]"
          data-node-id="4062:12391"
        >
          {cards.slice(0, 2).map((card, i) => (
            <article
              key={i}
              className="relative flex w-full flex-col gap-[12px] overflow-clip border-[0.301px] border-solid px-[12px] pt-[12px] pb-[20px]"
              style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}
              data-node-id={i === 0 ? "4062:12392" : "4062:12412"}
              data-name="Article"
            >
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
              {/* Media container — 4062:12393 / 12413 (331×200) */}
              <div
                className="relative flex h-[200px] w-full shrink-0 items-center justify-center overflow-hidden rounded-[3.61px] border-[0.602px] border-solid"
                style={{
                  borderColor: IMAGE_BORDER,
                  backgroundImage: MOBILE_IMAGE_VIGNETTE,
                }}
                aria-hidden
              >
                {i === 0 ? (
                  <div className="absolute top-[1.72px] left-[58.998px] h-[196.562px] w-[213px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      src="/dvk/integrated-dvk-mobile.png"
                      className="absolute inset-0 size-full max-w-none object-bottom"
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 overflow-hidden rounded-[3.61px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      src="/dvk/integrated-som-mobile.png"
                      className="absolute top-[-2.75%] left-[11.26%] h-[107.65%] w-[77.47%] max-w-none"
                    />
                  </div>
                )}
              </div>
              {/* NewsSection — 4062:12395 / 12415 */}
              <div className="flex w-full flex-col gap-[6px]">
                <div className="flex w-full items-center justify-between">
                  <h3
                    className={`${gilroyMedium.className} m-0 text-[18px] leading-[28px] font-medium whitespace-nowrap text-white not-italic`}
                  >
                    {card.title}
                  </h3>
                  <DevChipMobile />
                </div>
                <p
                  className={`${interRegular.className} m-0 w-full text-[12px] leading-[18px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}
                >
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Footer — 4062:12371 (29, 897 / 336 wide) */}
        <p
          className={`${interRegular.className} absolute top-[897px] left-[calc(50%+0.5px)] m-0 w-[336px] max-w-[calc(100%-56px)] -translate-x-1/2 text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic [word-break:break-word]`}
          data-node-id="4062:12371"
        >
          {footer}
        </p>

        {/* CTA stack — 4062:12372 (42, 1011 / 310 wide, gap 16) */}
        <div
          className="absolute bottom-0 left-[calc(50%+0.5px)] flex w-[310px] max-w-[calc(100%-82px)] -translate-x-1/2 flex-col gap-[16px]"
          data-node-id="4062:12372"
        >
          <a
            href={primaryHref}
            className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-full shrink-0 items-center justify-center`}
            data-node-id="4062:12373"
            data-name="Cta"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
            />
            <span className="relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
              {primaryLabel}
            </span>
            <span
              aria-hidden
              className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`}
            />
            <GreenCtaCorners />
          </a>
          <a
            href={secondaryHref}
            className={`${gilroyMedium.className} relative flex h-[48px] w-full shrink-0 items-center justify-center overflow-clip bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]`}
            data-node-id="4062:12384"
            data-name="CTA - Secondary"
          >
            <span className="relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
              {secondaryLabel}
            </span>
            <Corners leftSrc="/hero/vector-57.svg" rightSrc="/hero/vector-55.svg" />
          </a>
        </div>
      </div>
    </section>
  );
}

/** Figma 4062:12399 — mobile Development chip (115×24, corner ticks, side bars). */
function DevChipMobile() {
  return (
    <div
      className="relative h-[24px] w-[115px] shrink-0 overflow-clip"
      style={{ backgroundColor: DEV_CHIP_BG }}
      data-node-id="4062:12399"
      data-name="Menu"
    >
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      <p
        className={`${dmMono.className} absolute top-[calc(50%-4px)] left-[calc(50%+0.5px)] -translate-x-1/2 text-[12px] leading-[19.5px] font-normal tracking-[-0.36px] whitespace-nowrap text-[#ecfae5] uppercase not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]`}
      >
        Development
      </p>
      <div className="absolute top-1/2 left-[7px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
      <div className="absolute top-1/2 right-[7px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
    </div>
  );
}

function DevChip() {
  return (
    <div
      className={`${dmMono.className} relative h-[26px] w-[153px] shrink-0 overflow-clip border-[0.5px] border-solid`}
      style={{ backgroundColor: DEV_CHIP_BG, borderColor: "rgba(255,255,255,0.3)" }}
    >
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      <p className="absolute left-[calc(50%+0.5px)] top-[calc(50%-4.5px)] -translate-x-1/2 text-[13px] leading-[19.5px] font-normal tracking-[-0.39px] whitespace-nowrap text-[#ecfae5] uppercase not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
        Development
      </p>
      <div className="absolute top-1/2 left-[7px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
      <div className="absolute top-1/2 right-[7px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
    </div>
  );
}

function GreenCta({ children, width, fullWidth = false, href = "#" }: { children: React.ReactNode; width: number; fullWidth?: boolean; href?: string }) {
  return (
    <a
      href={href}
      className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[52px] ${fullWidth ? "w-full" : "shrink-0"} items-center justify-center`}
      style={fullWidth ? undefined : { width }}
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
      <span className={`relative text-[16px] leading-normal font-medium uppercase ${fullWidth ? "text-center" : "whitespace-nowrap"} text-white not-italic py-[4px] mt-[2px]`}>
        {children}
      </span>
      <span aria-hidden className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`} />
      <GreenCtaCorners />
    </a>
  );
}

function SecondaryCta({ children, width, fullWidth = false, href = "#" }: { children: React.ReactNode; width?: number | string; fullWidth?: boolean; href?: string }) {
  return (
    <a
      href={href}
      className={`${gilroyMedium.className} relative flex h-[52px] ${fullWidth ? "w-full" : "shrink-0"} items-center justify-center bg-[rgba(226,241,202,0.12)] px-[24px]`}
      style={fullWidth ? undefined : { width: width || "max-content" }}
    >
      <span className={`relative text-[16px] leading-normal font-medium uppercase ${fullWidth ? "text-center" : "whitespace-nowrap"} text-white not-italic py-[4px] mt-[2px]`}>
        {children}
      </span>
      <Corners leftSrc="/hero/vector-57.svg" rightSrc="/hero/vector-55.svg" />
    </a>
  );
}
