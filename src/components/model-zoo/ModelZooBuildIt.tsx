/* eslint-disable @next/next/no-img-element */
"use client";

import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { getFadeInClass, useFadeIn } from "../shared/useFadeIn";
import { CtaPrimary, CtaSecondary } from "./ModelZooCtas";
import { CORNER_LEFT, CORNER_RIGHT, sectionTitleGradient } from "./model-zoo-data";

const TITLE_GRADIENT = sectionTitleGradient(119.522);

/** Icon tile background — radial gradient copied from the Figma node fill. */
const ICON_TILE_BG = `url("data:image/svg+xml;utf8,<svg viewBox='0 0 66.14 65' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(3.7614e-14 2.3564 -4.8562 -3.0791e-15 33.07 -3.9048)'><stop stop-color='rgba(57,74,54,1)' offset='0'/><stop stop-color='rgba(43,54,41,1)' offset='0.5'/><stop stop-color='rgba(29,34,28,1)' offset='1'/></radialGradient></defs></svg>")`;

/** Figma 5203:5855/5866/5879 — three feature cards (400×245, gap 28). */
const CARDS = [
  {
    icon: "/model-zoo/icon-ai-brain.svg",
    iconInset: "8.33% 16.67% 8.33% 8.33%",
    title: "Native model import",
    desc: "Native TFLite import and automatic quantization to A-Cube precision.",
  },
  {
    icon: "/model-zoo/icon-ai-learning.svg",
    iconInset: "12.5% 8.33%",
    title: "Transfer learning",
    desc: "Transfer-learn from any Model Zoo model using your own data.",
  },
  {
    icon: "/model-zoo/icon-ai-smartwatch.svg",
    iconInset: "8.33% 12.5%",
    title: "Architecture flexibility",
    desc: "If you can train it — CNN, RNN, LSTM, or GRU — you can run it.",
  },
];

/** Feature card wrapper — scroll fade-in + hover accent (site convention). */
function BuildItCard({ card }: { card: (typeof CARDS)[number] }) {
  const { fadeRef, isVisible } = useFadeIn<HTMLDivElement>();
  return (
    <div
      ref={fadeRef}
      className={`relative flex h-auto w-full max-w-[400px] shrink flex-col items-start gap-[36px] border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] p-[32px] transition-colors duration-300 hover:border-[#a8ed90] hover:bg-[rgba(68,120,7,0.2)] min-[1024px]:h-[245px] min-[1024px]:w-[400px] min-[1024px]:shrink-0 ${getFadeInClass(isVisible)}`}
      data-name="Content"
    >
      {/* Icon tile — 66.14×65, rounded, radial gradient + glyph */}
      <div
        className="relative h-[65px] w-[66.14px] shrink-0 overflow-clip rounded-[13.684px]"
        style={{ backgroundImage: ICON_TILE_BG }}
        aria-hidden
      >
        <div className="absolute top-1/2 left-[calc(50%+0.43px)] size-[45px] -translate-x-1/2 -translate-y-1/2 overflow-clip">
          <div className="absolute" style={{ inset: card.iconInset }}>
            <img alt="" src={card.icon} className="block size-[110%] max-w-none" />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-[10px] text-white">
        <p className={`${gilroyMedium.className} w-full text-[22px] leading-[28px] not-italic [word-break:break-word]`}>
          {card.title}
        </p>
        <p className={`${interRegular.className} w-full text-[14px] leading-[21px] font-normal opacity-65 not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}>
          {card.desc}
        </p>
      </div>

      {/* corner marks: small top ticks + standard bottom */}
      <img alt="" src="/model-zoo/tick-tl.svg" className="absolute top-0 left-0 h-[3.639px] w-[3.81px]" aria-hidden />
      <img alt="" src="/model-zoo/tick-tr.svg" className="absolute top-0 right-0 h-[3.639px] w-[3.81px]" aria-hidden />
      <img alt="" src="/model-zoo/tick-bl.svg" className="absolute bottom-0 left-0 size-[4px]" aria-hidden />
      <img alt="" src={CORNER_RIGHT} className="absolute right-0 bottom-0 size-[4px] -scale-x-100" aria-hidden />
    </div>
  );
}

/**
 * Figma 5131:10720 — "Don't see it? Build it." section
 * (1256-wide content at page x=92; y=6246, h=502).
 */
export function ModelZooBuildIt() {
  return (
    <section
      className="relative mt-[100px] w-full bg-black"
      data-node-id="5131:10720"
      aria-label="Don't see it? Build it."
    >
      <div className="relative mx-auto w-full max-w-[1256px] px-[16px] min-[1024px]:px-0">
        <div className="flex w-full flex-col items-center justify-center gap-[40px] min-[1024px]:gap-[48px]">
          {/* Title — 5131:10841 */}
          <div className="flex w-full flex-col items-center gap-[10px]" data-node-id="5131:10841" data-name="Title Section">
            <div className="flex flex-col items-center justify-center gap-[24px]" data-node-id="5131:10842" data-name="Section Title">
              <div className="relative px-[10px]" data-node-id="5131:10843" data-name="Title">
                <h2
                  className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] leading-[36px] min-[1024px]:text-[46px] min-[1024px]:leading-[49px] font-medium text-transparent not-italic min-[1024px]:whitespace-nowrap`}
                  style={{ backgroundImage: TITLE_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text" }}
                  data-node-id="5131:10844"
                >
                  Don’t see it? Build it.
                </h2>
                <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
              </div>
            </div>
            <p className={`${interRegular.className} w-full max-w-[583px] text-center text-[14px] leading-[21px] min-[1024px]:text-[16px] min-[1024px]:leading-[24px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`} data-node-id="5131:10849">
              The zoo is a starting point, not a ceiling. Bring your own TensorFlow, Keras, or ONNX model and compile it to GPX with ModelForge.
            </p>
          </div>

          {/* Cards — 5203:5853 */}
          <div className="flex w-full flex-col items-stretch gap-[16px] min-[1024px]:flex-row min-[1024px]:items-center min-[1024px]:gap-[28px]" data-node-id="5203:5853" data-name="Do the best work of your life">
            {CARDS.map((card) => (
              <BuildItCard key={card.title} card={card} />
            ))}
          </div>

          {/* CTAs — 5131:10820 (437 wide, centered) */}
          <div className="flex flex-wrap items-start justify-center gap-[24px]" data-node-id="5131:10820">
            <CtaPrimary label="Explore the Developer Hub" width={251} />
            <CtaSecondary label="Read the Docs" width={162} />
          </div>
        </div>
      </div>
    </section>
  );
}
