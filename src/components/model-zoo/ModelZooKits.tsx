/* eslint-disable @next/next/no-img-element */
"use client";

import { gilroyMedium, interRegular } from "../hero/fonts";
import { getFadeInClass, useFadeIn } from "../shared/useFadeIn";
import { Corners } from "../shared/Corners";
import { CtaPrimary } from "./ModelZooCtas";
import { CORNER_LEFT, CORNER_RIGHT, sectionTitleGradient } from "./model-zoo-data";

import { TabletScaleCanvas } from "../shared/TabletScaleCanvas";

const TITLE_GRADIENT = sectionTitleGradient(111.766);

/** Figma 5246:6364/6386/6416 — three closing cards (385.33×553, gap 24). */
const CARDS = [
  {
    nodeId: "5246:6364",
    img: "/model-zoo/kit-1.webp",
    alt: "Sparsh eval kit on a bench",
    title: "Try it on your bench.",
    desc: "Request an eval kit and run any model from day one.",
    cta: "Request Eval Kit",
    ctaWidth: 200,
    href: "/dvk",
    isComingSoon: false,
  },
  {
    nodeId: "5246:6386",
    img: "/model-zoo/kit-2.webp",
    alt: "NuraSync phone app",
    title: "Experience it now.",
    desc: "Download NuraSync and drive live demos from your phone.",
    cta: "Get NuraSync App",
    ctaWidth: 220,
    isComingSoon: true,
  },
  {
    nodeId: "5246:6416",
    img: "/model-zoo/kit-3.webp",
    alt: "Model cards and code on GitHub",
    title: "Go deeper.",
    desc: "Browse the code and model cards on GitHub.",
    cta: "GitHub",
    ctaWidth: 200,
    isComingSoon: true,
  },
];

/** Decorative green arcs (Figma page-root vectors 78/79/80), centered on
 *  their page coordinates relative to this section's top. */
const ARCS = [
  { src: "/model-zoo/arc-78.svg", cx: 1163, cy: -112.5 },
  { src: "/model-zoo/arc-79.svg", cx: 1015, cy: 3.5 },
  { src: "/model-zoo/arc-80.svg", cx: 323, cy: -102 },
];

/** Kit card wrapper — scroll fade-in + hover accent (site convention). */
function KitCard({ card }: { card: (typeof CARDS)[number] }) {
  const { fadeRef, isVisible } = useFadeIn<HTMLDivElement>();
  return (
    <div
      ref={fadeRef}
      className={`relative flex h-[553px] min-w-px flex-1 flex-col gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.7)] px-[20px] pt-[20px] pb-[32px] transition-colors duration-300 hover:border-[#a8ed90] hover:bg-[rgba(68,120,7,0.2)] ${getFadeInClass(isVisible)}`}
      data-node-id={card.nodeId}
      data-name="Article"
    >
      {/* image container — 345.33×327 baked export incl. border + radial bg */}
      <div className="relative h-[327px] w-full shrink-0 overflow-clip rounded-[6px]">
        <img alt={card.alt} src={card.img} className="pointer-events-none size-full rounded-[6px] object-cover" loading="lazy" decoding="async" />
      </div>

      {/* content */}
      <div className="flex w-full flex-1 flex-col items-start gap-[10px]">
        <p className={`${gilroyMedium.className} w-full text-[22px] leading-[28px] text-white not-italic whitespace-nowrap`}>
          {card.title}
        </p>
        <p className={`${interRegular.className} w-full text-[16px] leading-[24px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}>
          {card.desc}
        </p>
      </div>

      <div className="mt-auto">
        {card.isComingSoon ? (
          <div
            className="group/soon relative inline-flex cursor-not-allowed items-center justify-center overflow-hidden"
            aria-disabled="true"
          >
            <div className="pointer-events-none transition-all duration-300 group-hover/soon:blur-[3px] group-hover/soon:opacity-25">
              <CtaPrimary label={card.cta} width={card.ctaWidth} />
            </div>
            <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/soon:opacity-100">
              <span
                className={`${gilroyMedium.className} text-[15px] font-medium uppercase tracking-[0.05em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]`}
              >
                Coming Soon
              </span>
            </div>
          </div>
        ) : (
          <CtaPrimary href={card.href} label={card.cta} width={card.ctaWidth} />
        )}
      </div>

      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </div>
  );
}

/**
 * Figma 5131:10997 — "Start with a model that already works." section
 * (1256-wide content at page x=92; y=6848).
 */
export function ModelZooKits() {
  return (
    <section
      className="relative z-20 mt-[100px] mb-[-700px] min-[600px]:[margin-bottom:calc(-400px*var(--tablet-zoom,1))] w-full bg-transparent"
      data-node-id="5131:10997"
      aria-label="Stop reading. Start running."
    >
      {/* MOBILE (<600px) */}
      <div className="relative mx-auto flex w-full flex-col items-center min-[600px]:hidden px-[16px]">
        {/* Title */}
        <div className="flex w-full flex-col items-center gap-[24px]" data-node-id="5131:11088" data-name="Section Title">
          <div className="relative px-[10px]" data-node-id="5131:11089" data-name="Title">
            <h2
              className={`${gilroyMedium.className} w-full max-w-[605px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic`}
              style={{ backgroundImage: TITLE_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text" }}
              data-node-id="5131:11090"
            >
              Stop reading. Start running.
            </h2>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </div>
          <p className={`${interRegular.className} w-full max-w-[679.389px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}>
            Request a kit and run any model from day one — or try it free from your phone right now.
          </p>
        </div>

        {/* Cards mobile */}
        <div className="mt-[24px] flex w-full flex-col items-stretch gap-[16px] px-0" data-node-id="5246:6363" data-name="Frame 1984079440">
          {CARDS.map((card) => (
            <div
              key={`m-${card.nodeId}`}
              className="relative flex h-auto w-full flex-col gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.7)] px-[20px] pt-[20px] pb-[32px]"
              data-node-id={card.nodeId}
              data-name="Article"
            >
              <div className="relative h-[327px] w-full shrink-0 overflow-clip rounded-[6px]">
                <img alt={card.alt} src={card.img} className="pointer-events-none size-full rounded-[6px] object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="flex w-full flex-1 flex-col items-start gap-[10px]">
                <p className={`${gilroyMedium.className} w-full text-[22px] leading-[28px] text-white not-italic`}>
                  {card.title}
                </p>
                <p className={`${interRegular.className} w-full text-[16px] leading-[24px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}>
                  {card.desc}
                </p>
              </div>
              <div className="mt-auto">
                {card.isComingSoon ? (
                  <div
                    className="group/soon relative inline-flex cursor-not-allowed items-center justify-center overflow-hidden"
                    aria-disabled="true"
                  >
                    <div className="pointer-events-none transition-all duration-300 group-hover/soon:blur-[3px] group-hover/soon:opacity-25">
                      <CtaPrimary label={card.cta} width={card.ctaWidth} />
                    </div>
                    <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/soon:opacity-100">
                      <span
                        className={`${gilroyMedium.className} text-[15px] font-medium uppercase tracking-[0.05em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]`}
                      >
                        Coming Soon
                      </span>
                    </div>
                  </div>
                ) : (
                  <CtaPrimary href={card.href} label={card.cta} width={card.ctaWidth} />
                )}
              </div>
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP (>=600px) */}
      <TabletScaleCanvas className="relative mx-auto hidden w-[1440px] shrink-0 flex-col items-center min-[600px]:flex">
        {/* decorative arcs */}
        {ARCS.map((arc, i) => (
          <img
            key={i}
            alt=""
            src={arc.src}
            aria-hidden
            className="pointer-events-none absolute h-[379px] w-[520px]"
            style={{ left: arc.cx - 260, top: arc.cy - 189.5 }}
            loading="lazy"
            decoding="async"
          />
        ))}

        <div className="relative mx-auto w-[1256px] shrink-0 px-0">
          {/* Title — 5131:11088 */}
          <div className="flex w-full flex-col items-center gap-[24px]" data-node-id="5131:11088" data-name="Section Title">
            <div className="relative px-[10px]" data-node-id="5131:11089" data-name="Title">
              <h2
                className={`${gilroyMedium.className} w-full max-w-[605px] bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic`}
                style={{ backgroundImage: TITLE_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text" }}
                data-node-id="5131:11090"
              >
                Stop reading. Start running.
              </h2>
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            </div>
            <p className={`${interRegular.className} w-full max-w-[679.389px] text-center text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}>
              Request a kit and run any model from day one — or try it free from your phone right now.
            </p>
          </div>

          {/* Cards — 5246:6363 (26px inset, gap 24, h 553) */}
          <div className="mt-[60px] flex w-full flex-row items-center gap-[24px] px-[26px]" data-node-id="5246:6363" data-name="Frame 1984079440">
            {CARDS.map((card) => (
              <KitCard key={card.nodeId} card={card} />
            ))}
          </div>
        </div>
      </TabletScaleCanvas>
    </section>
  );
}
