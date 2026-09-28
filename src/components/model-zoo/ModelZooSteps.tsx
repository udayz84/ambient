/* eslint-disable @next/next/no-img-element */
"use client";

import { gilroyMedium, interRegular } from "../hero/fonts";
import { getFadeInClass, useFadeIn } from "../shared/useFadeIn";
import { Corners } from "../shared/Corners";
import { CtaPrimary, CtaSecondary } from "./ModelZooCtas";
import { CORNER_LEFT, CORNER_RIGHT, sectionTitleGradient } from "./model-zoo-data";

const TITLE_GRADIENT = sectionTitleGradient(111.766);

/** Figma 5131:10601/10612/10623 — three numbered step cards (400×469, gap 28).
 *  Images are @2x exports of the Figma image frames (fades baked in), placed
 *  at the frames' true card-relative coordinates from the file metadata. */
const STEPS = [
  {
    nodeId: "5131:10601",
    /* image 168 — frame at card-rel (-16.51, 16) */
    img: "/model-zoo/step-1f.webp",
    imgStyle: { left: -0.5, top: 16, width: 383, height: 231.5 },
    number: "01",
    numberLeft: 32,
    numberWidth: 68,
    title: "PICK",
    desc: "Choose a model from the zoo.",
  },
  {
    nodeId: "5131:10612",
    /* image 169 — frame at card-rel (2.82, 5.95) */
    img: "/model-zoo/step-2f.webp",
    imgStyle: { left: 4, top: 2, width: 395, height: 242 },
    number: "02",
    numberLeft: 29,
    numberWidth: 81,
    title: "COMPILE",
    desc: "One-click ModelForge compile — quantized and mapped onto A-Cube automatically.",
  },
  {
    nodeId: "5131:10623",
    /* image 170 — frame at card-rel (13, 13) */
    img: "/model-zoo/step-3f.webp",
    imgStyle: { left: 17.5, top: 13, width: 372.5, height: 228.45 },
    number: "03",
    numberLeft: 26,
    numberWidth: 80,
    title: "RUN",
    desc: "The model is flashed to your kit and running live. Measure the power yourself.",
  },
];

/** Figma 5131:10635/10645/10655 — small gradient feature panels (400×150).
 *  Icons are @4x exports of the 36px Figma icon boxes (exact scaling baked in). */
const FEATURE_PANELS = [
  {
    icon: "/model-zoo/icon-panel-1.png",
    text: "Works inside the standard Eclipse-based unified build.",
    tl: "/model-zoo/tick-tl.svg",
    tr: "/model-zoo/tick-tr.svg",
  },
  {
    icon: "/model-zoo/icon-panel-2.png",
    text: "Pre-integrated RTOS, drivers, and DSP libraries - no boilerplate.",
    tl: "/model-zoo/tick-tl.svg",
    tr: "/model-zoo/tick-tr.svg",
  },
  {
    icon: "/model-zoo/icon-panel-3.png",
    text: "Up to 90% of existing C code ports over.",
    tl: "/model-zoo/tick-tl2.svg",
    tr: "/model-zoo/tick-tr2.svg",
  },
];

const PANEL_BG =
  "linear-gradient(180deg, rgba(83, 216, 36, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%), linear-gradient(90deg, rgba(21, 21, 21, 0.3) 0%, rgba(21, 21, 21, 0.3) 100%)";

/** Step card wrapper — scroll fade-in + hover accent (site convention). */
function StepCard({ step }: { step: (typeof STEPS)[number] }) {
  const { fadeRef, isVisible } = useFadeIn<HTMLDivElement>();
  return (
    <div
      ref={fadeRef}
      className={`group relative snap-center flex h-[320px] w-[280px] shrink-0 flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.2)] px-[24px] pt-[16px] pb-[24px] transition-colors duration-300 hover:border-[#a8ed90] min-[1024px]:h-[469px] min-[1024px]:w-[400px] min-[1024px]:px-[32px] ${getFadeInClass(isVisible)}`}
      data-node-id={step.nodeId}
      data-name="Article"
    >
      {/* step image — frame export at its true card-relative position */}
      <img
        alt=""
        src={step.img}
        aria-hidden
        className="pointer-events-none absolute max-w-none origin-top scale-[0.75] min-[1024px]:scale-100"
        style={step.imgStyle}
        loading="lazy"
        decoding="async"
      />
      {/* green tint overlay — covers image and card bg on hover */}
      <div className="pointer-events-none absolute inset-0 bg-[rgba(68,120,7,0.2)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {/* text — at card-rel (32, 333) */}
      <div className="absolute top-[200px] left-[24px] flex w-[calc(100%-48px)] max-w-[333.99px] flex-col items-start gap-[8px] min-[1024px]:top-[333px] min-[1024px]:left-[32px] min-[1024px]:w-[calc(100%-64px)] min-[1024px]:gap-[12px]">
        <p className={`${gilroyMedium.className} w-full text-[32px] leading-[38px] text-white not-italic`}>
          {step.title}
        </p>
        <p className={`${interRegular.className} w-full text-[16px] leading-[26px] font-normal tracking-[-0.3125px] text-[#99a1af] not-italic [word-break:break-word]`}>
          {step.desc}
        </p>
      </div>
      {/* big number — 70px white→transparent gradient at the exact Figma slot */}
      <p
        className={`${gilroyMedium.className} absolute top-[150px] min-[1024px]:top-[257px] bg-gradient-to-b from-white to-[rgba(255,255,255,0)] bg-clip-text text-[60px] min-[1024px]:text-[70px] leading-[64px] font-medium text-transparent opacity-50 whitespace-nowrap text-center not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]`}
        style={{ left: step.numberLeft, width: step.numberWidth }}
        aria-hidden
      >
        {step.number}
      </p>
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </div>
  );
}

/**
 * Figma 5131:10582 — "Pick a model. Push a button. It's running." section
 * (1256-wide content at page x=92; y=5203, h=943).
 */
export function ModelZooSteps() {
  return (
    <section
      className="relative mt-[84px] w-full"
      data-node-id="5131:10582"
      aria-label="Pick a model. Push a button. It's running."
    >
      {/* No bg-black here on purpose: the AppForge section's second glow strip
          (5131:10575) bleeds down through this section's upper area behind the
          title and cards; the page's black comes from the <main> wrapper. */}
      <div className="relative mx-auto w-full max-w-[1256px] px-[16px] min-[1024px]:px-0">
        {/* Header — 5131:10583 */}
        <div className="flex w-full flex-col items-center justify-center gap-[24px]" data-node-id="5131:10583" data-name="Section Title">
          <div className="relative px-[10px]" data-node-id="5131:10703" data-name="Title">
            <h2
              className={`${gilroyMedium.className} w-full max-w-[605px] bg-clip-text text-center text-[36px] leading-[36px] min-[1024px]:text-[46px] min-[1024px]:leading-[49px] font-medium text-transparent not-italic`}
              style={{ backgroundImage: TITLE_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text" }}
              data-node-id="5131:10704"
            >
              Pick a model. Push a button. It’s running.
            </h2>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </div>
          <p className={`${interRegular.className} w-full max-w-[552px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`} data-node-id="5131:10598">
            No manual porting, no glue code. ModelForge compiles any zoo model onto GPX and flashes your kit in a single step.
          </p>
        </div>

        {/* Cards — 5131:10599 (gap 42 outer, 28 between rows) */}
        <div className="mt-[24px] flex w-full flex-col items-start gap-[28px] min-[1024px]:mt-[42px]" data-node-id="5131:10599">
          {/* Step cards row — 5131:10600 */}
          <div className="flex w-[calc(100%+32px)] snap-x snap-mandatory overflow-x-auto pb-[16px] gap-[16px] min-[1024px]:overflow-x-visible min-[1024px]:pb-0 min-[1024px]:flex-row min-[1024px]:items-center min-[1024px]:gap-[28px] mx-[-16px] px-[16px] min-[1024px]:mx-0 min-[1024px]:px-0 min-[1024px]:w-full after:content-[''] after:w-[1px] after:shrink-0 after:min-[1024px]:hidden" data-node-id="5131:10600">
            {STEPS.map((step) => (
              <StepCard key={step.nodeId} step={step} />
            ))}
          </div>

          {/* Feature panels row — 5131:10634 */}
          <div className="flex w-full flex-col items-stretch gap-[16px] min-[1024px]:w-[1256px] min-[1024px]:flex-row min-[1024px]:items-center min-[1024px]:gap-[28px]" data-node-id="5131:10634" data-name="Do the best work of your life">
            {FEATURE_PANELS.map((panel, i) => (
              <div
                key={i}
                className="relative flex h-[150px] min-w-px flex-1 flex-col items-start p-[20px]"
                style={{ backgroundImage: PANEL_BG }}
                data-node-id={`5131:106${35 + i * 10}`}
                data-name="Content"
              >
                <div className="flex flex-col items-start gap-[20px]">
                  <img alt="" src={panel.icon} className="size-[36px] shrink-0" loading="lazy" decoding="async" />
                  <p className={`${interRegular.className} w-full text-[18px] leading-[27px] font-normal text-white not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}>
                    {panel.text}
                  </p>
                </div>
                {/* corner marks: small ticks top, standard bottom */}
                <img alt="" src={panel.tl} className="absolute top-0 left-0 h-[2.858px] w-[3.81px]" aria-hidden />
                <img alt="" src={panel.tr} className="absolute top-0 right-0 h-[2.858px] w-[3.81px]" aria-hidden />
                <img alt="" src="/model-zoo/tick-bl.svg" className="absolute bottom-0 left-0 size-[4px]" aria-hidden />
                <img alt="" src={CORNER_RIGHT} className="absolute right-0 bottom-0 size-[4px] -scale-x-100" aria-hidden />
              </div>
            ))}
          </div>
        </div>

        {/* CTAs — 5131:10665 (centered: 251+24+174 = 449 wide in the 1256 container) */}
        <div className="mt-[24px] flex flex-wrap items-start justify-center gap-[24px] min-[1024px]:mt-[42px]" data-node-id="5131:10665">
          <CtaPrimary label="Explore the Developer Hub" width={251} />
          <CtaSecondary label="Request the SDK" width={174} />
        </div>
      </div>
    </section>
  );
}
