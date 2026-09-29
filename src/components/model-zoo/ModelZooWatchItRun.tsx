/* eslint-disable @next/next/no-img-element */
"use client";

import { gilroyMedium, interRegular } from "../hero/fonts";
import { getFadeInClass, useFadeIn } from "../shared/useFadeIn";
import { Corners } from "../shared/Corners";
import { CORNER_LEFT, CORNER_RIGHT, sectionTitleGradient } from "./model-zoo-data";

/** Figma 5130:8367 bg image fade overlay. */
const BG_IMAGE_OVERLAY =
  "linear-gradient(180deg, rgba(0, 0, 0, 0.4) 48.412%, rgb(0, 0, 0) 88.067%), linear-gradient(180deg, rgba(0, 0, 0, 0.4) 37.886%, rgb(0, 0, 0) 88.067%), linear-gradient(180deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 69.056%)";

const TITLE_GRADIENT = sectionTitleGradient(109.783);

/** Small decorative dot/ring placed with exact Figma offsets (svg + inset %). */
function Dec({
  src,
  left,
  top,
  w,
  h,
  inset,
}: {
  src: string;
  left: number;
  top: number;
  w: number;
  h: number;
  inset: string;
}) {
  return (
    <div className="pointer-events-none absolute" style={{ left, top, width: w, height: h }} aria-hidden>
      <div className="absolute" style={{ inset }}>
        <img alt="" src={src} className="block size-full max-w-none" />
      </div>
    </div>
  );
}

type WatchCard = {
  nodeId: string;
  name: string;
  img: string;
  imgLeft?: number;
  imgRight?: number;
  imgTop: number;
  imgW: number;
  imgH: number;
  title: string;
  desc: string;
  textH: number;
  decor: React.ReactNode;
};

/** Figma 5130:8726 / 8738 / 8749 / 8771 — four proof cards (315×407, gap 20). */
const CARDS: WatchCard[] = [
  {
    nodeId: "5130:8726",
    name: "Voice Based",
    img: "/model-zoo/watch-card-1.webp",
    imgLeft: 81.04,
    imgTop: -39.38,
    imgW: 290,
    imgH: 268,
    title: "Ready to run.",
    desc: "Pre-trained models deploy to your kit as-is — no data collection or training run required to get started.",
    textH: 345,
    decor: (
      <>
        <Dec src="/model-zoo/dec-ellipse-6a.svg" left={192} top={73} w={6} h={6} inset="-66.67%" />
        <Dec src="/model-zoo/dec-ellipse-6a.svg" left={192} top={60} w={6} h={6} inset="-66.67%" />
        <Dec src="/model-zoo/dec-ellipse-6a.svg" left={210} top={67} w={6} h={6} inset="-66.67%" />
        <Dec src="/model-zoo/dec-ring-13.svg" left={255.5} top={118} w={13} h={17.81} inset="-22.46% -30.76%" />
        <Dec src="/model-zoo/dec-ellipse-6a.svg" left={210} top={79.5} w={6} h={6} inset="-66.67%" />
        <Dec src="/model-zoo/dec-ellipse-6a.svg" left={192} top={85} w={6} h={6} inset="-66.67%" />
        <Dec src="/model-zoo/dec-ellipse-6a.svg" left={174.5} top={79.5} w={6} h={6} inset="-66.67%" />
        <Dec src="/model-zoo/dec-ellipse-6a.svg" left={175} top={67} w={6} h={6} inset="-66.67%" />
      </>
    ),
  },
  {
    nodeId: "5130:8738",
    name: "Fall Detection",
    img: "/model-zoo/watch-card-2.webp",
    imgRight: -60.37,
    imgTop: -52.38,
    imgW: 290,
    imgH: 268,
    title: "One click to hardware.",
    desc: "Flash a model to your board in a single click and see live results immediately.",
    textH: 345,
    decor: <Dec src="/model-zoo/dec-ring-22.svg" left={211.49} top={110.29} w={22} h={12} inset="-33.33% -18.18%" />,
  },
  {
    nodeId: "5130:8749",
    name: "Vision Based",
    img: "/model-zoo/watch-card-3.webp",
    imgRight: -46.37,
    imgTop: -30.38,
    imgW: 290,
    imgH: 268,
    title: "Runs at microwatts.",
    desc: "Every model is tuned for the A-Cube architecture — full inference inside a coin-cell power budget.",
    textH: 345,
    decor: (
      <>
        <Dec src="/model-zoo/dec-ellipse-5.svg" left={215} top={50} w={5} h={5} inset="-40%" />
        <Dec src="/model-zoo/dec-ellipse-5.svg" left={181} top={68} w={5} h={5} inset="-40%" />
        <Dec src="/model-zoo/dec-ellipse-5.svg" left={247} top={67} w={5} h={5} inset="-40%" />
        <Dec src="/model-zoo/dec-ellipse-5.svg" left={281} top={49} w={5} h={5} inset="-40%" />
        <Dec src="/model-zoo/dec-ellipse-5.svg" left={247} top={32} w={5} h={5} inset="-40%" />
        <Dec src="/model-zoo/dec-ellipse-5.svg" left={215} top={15} w={5} h={5} inset="-40%" />
        <Dec src="/model-zoo/dec-ellipse-5.svg" left={182} top={32} w={5} h={5} inset="-40%" />
        <Dec src="/model-zoo/dec-ellipse-5.svg" left={149} top={49} w={5} h={5} inset="-40%" />
        <Dec src="/model-zoo/dec-vector-115.svg" left={194.5} top={68} w={46} h={25.5} inset="-62.75% -34.78%" />
        <Dec src="/model-zoo/dec-vector-116.svg" left={180.28} top={74.5} w={46.44} h={54.89} inset="-57.66% -33.72%" />
        <Dec src="/model-zoo/dec-vector-117.svg" left={207.26} top={76.39} w={46.49} h={54.78} inset="-57.34% -33.87%" />
      </>
    ),
  },
  {
    nodeId: "5130:8771",
    name: "Vision Based 2",
    img: "/model-zoo/watch-card-4.webp",
    imgRight: -41,
    imgTop: -21,
    imgW: 275,
    imgH: 254,
    title: "Yours to shape.",
    desc: "Retrain any model using your own data, or bring your own model. The zoo is a starting point, not a limitation.",
    textH: 367,
    decor: (
      <>
        <Dec src="/model-zoo/dec-ellipse-4.svg" left={190} top={185} w={4} h={4} inset="-25%" />
        <Dec src="/model-zoo/dec-ellipse-4.svg" left={184} top={182} w={4} h={4} inset="-25%" />
        <Dec src="/model-zoo/dec-ellipse-4.svg" left={179} top={179} w={4} h={4} inset="-25%" />
        <Dec src="/model-zoo/dec-ellipse-6c.svg" left={219} top={93} w={6} h={6} inset="0" />
        <Dec src="/model-zoo/dec-ellipse-6c.svg" left={233} top={89} w={6} h={6} inset="0" />
        <Dec src="/model-zoo/dec-ellipse-6c.svg" left={219} top={77.5} w={6} h={6} inset="0" />
        <Dec src="/model-zoo/dec-ellipse-6c.svg" left={206} top={88.5} w={6} h={6} inset="0" />
        <Dec src="/model-zoo/dec-ellipse-6c.svg" left={206} top={102} w={6} h={6} inset="0" />
        <Dec src="/model-zoo/dec-ellipse-6c.svg" left={219} top={111.5} w={6} h={6} inset="0" />
        <Dec src="/model-zoo/dec-ellipse-6c.svg" left={233} top={102} w={6} h={6} inset="0" />
        <Dec src="/model-zoo/dec-ellipse-4b.svg" left={229.5} top={97} w={4} h={4} inset="0" />
        <Dec src="/model-zoo/dec-ellipse-6d.svg" left={229} top={97} w={5} h={5} inset="-80%" />
        <Dec src="/model-zoo/dec-ellipse-5b.svg" left={218.5} top={111} w={7} h={7} inset="-57.14%" />
        <Dec src="/model-zoo/dec-ellipse-5b.svg" left={205} top={101.5} w={7} h={7} inset="-57.14%" />
        <Dec src="/model-zoo/dec-ellipse-65.svg" left={205.5} top={88.5} w={6.5} h={6} inset="-66.67% -61.54%" />
      </>
    ),
  },
];

/**
 * Figma 5130:8367 — "SOM Ecosystem" section (1440×752 canvas, full-bleed).
 * Abstract arc at the top, dimmed full-bleed bg image, centered title,
 * four proof cards in a 1320-wide row, caption at the bottom.
 */
export function ModelZooWatchItRun() {
  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      data-node-id="5130:8367"
      data-name="SOM Ecosystem"
      aria-label="Don't take our word for it. Watch it run."
    >
      {/* MOBILE (<1024px) — stacked cards */}
      <div className="relative mx-auto flex w-full max-w-[393px] flex-col items-center gap-[24px] px-[19px] py-[30px] min-[1024px]:hidden">
        <div className="relative w-full max-w-[350px]">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{ backgroundImage: TITLE_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text" }}
          >
            Don’t take our word for it. Watch it run.
          </h2>
        </div>
        <p className={`${interRegular.className} w-full max-w-[352px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0]/75 not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}>
          Purpose-built edge modules. Validate your software on our evaluation kits today, and drop our SOMs directly into your final product tomorrow.
        </p>
        <div className="flex w-[calc(100%+38px)] snap-x snap-mandatory overflow-x-auto pb-[16px] gap-[16px] mx-[-19px] px-[19px] after:content-[''] after:w-[1px] after:shrink-0">
          {CARDS.map((card) => (
            <div
              key={`m-${card.nodeId}`}
              className="relative flex snap-center shrink-0 min-h-[356px] w-[280px] flex-col justify-end overflow-clip border-[0.444px] border-solid border-[rgba(240,240,240,0.2)] bg-black p-[20px]"
            >
              <img alt="" src={card.img} className="pointer-events-none absolute top-[-40px] right-[-40px] h-[268px] w-[290px] max-w-none object-cover origin-top-right scale-[0.8]" />
              <div className="relative flex flex-col items-start gap-[12px]">
                <p className={`${gilroyMedium.className} text-[22px] leading-[28px] text-white not-italic`}>{card.title}</p>
                <p className={`${interRegular.className} text-[14px] leading-[21.3px] font-normal text-[#99a1af] not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}>{card.desc}</p>
              </div>
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            </div>
          ))}
        </div>
        <p className={`${interRegular.className} w-full max-w-[352px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}>
          Proof you can hold in your hand, in the time it takes to read this page.
        </p>
      </div>

      {/* DESKTOP (>=1024px) */}
      <div className="relative mx-auto hidden h-[752px] w-[1440px] min-[1024px]:block">
        {/* Abstract design — 5130:8368 (881.6×320, top -38) */}
        <div className="absolute top-[-38px] left-1/2 h-[320px] w-[881.616px] -translate-x-1/2" aria-hidden>
          <img
            alt=""
            src="/model-zoo/watch-abstract.svg"
            className="absolute inset-0 block size-full max-w-none"
          />
        </div>

        {/* Background image — 5130:8453 (1440×774 at top 223, opacity 40) */}
        <div className="absolute top-[223px] left-1/2 h-[774px] w-[1440px] -translate-x-1/2 opacity-40" aria-hidden>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 overflow-hidden">
              <img
                alt=""
                src="/model-zoo/watch-bg.webp"
                className="absolute top-[0.03%] left-0 h-[142.31%] w-[99.99%] max-w-none"
              />
            </div>
            <div className="absolute inset-0" style={{ backgroundImage: BG_IMAGE_OVERLAY }} />
          </div>
        </div>

        {/* Section title — 5130:8454 (top 40, centered) */}
        <div
          className="absolute top-[40px] left-1/2 z-10 flex w-[650px] -translate-x-1/2 flex-col items-center justify-center gap-[24px]"
          data-node-id="5130:8454"
          data-name="Section Title"
        >
          <div className="relative px-[10px]" data-node-id="5130:8455" data-name="Title">
            <h2
              className={`${gilroyMedium.className} bg-clip-text text-center text-[46px] leading-[49px] font-medium whitespace-nowrap text-transparent not-italic`}
              style={{
                backgroundImage: TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              data-node-id="5130:8456"
            >
              Don’t take our word for it. <br /> Watch it run.
            </h2>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </div>
          <p
            className={`${interRegular.className} w-[650px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
            data-node-id="5130:8461"
          >
            Purpose-built edge modules. Validate your software on our evaluation
            kits today, and drop our SOMs directly into your final product
            tomorrow.
          </p>
        </div>

        {/* Cards — 5130:8725 (60, 244 / 1320 wide, gap 20) */}
        <div
          className="absolute top-[244px] left-[60px] z-10 flex w-[1320px] items-start gap-[20px]"
          data-node-id="5130:8725"
        >
          {CARDS.map((card) => (
            <WatchCardItem key={card.nodeId} card={card} />
          ))}
        </div>

        {/* Decorative arrow — 5203:5206 (664.5, 293 / 32×18) */}
        <Dec src="/model-zoo/dec-vector-118.svg" left={664.5} top={293} w={32} h={18} inset="-22.22% -12.5%" />

        {/* Caption — 5343:5017 (top 691, centered) */}
        <p
          className={`${interRegular.className} absolute top-[691px] left-[calc(50%+0.5px)] w-[591px] -translate-x-1/2 text-center text-[18px] leading-[27px] font-normal whitespace-nowrap text-[#f0f0f0] not-italic min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
          data-node-id="5343:5017"
        >
          Proof you can hold in your hand, in the time it takes to read this page.
        </p>
      </div>
    </section>
  );
}

function WatchCardItem({ card }: { card: WatchCard }) {
  const { fadeRef, isVisible } = useFadeIn<HTMLDivElement>();
  return (
    <div
      ref={fadeRef}
      className={`relative flex w-[315px] shrink-0 flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-black px-[24px] pt-[16px] pb-[24px] ${getFadeInClass(isVisible)}`}
      data-node-id={card.nodeId}
      data-name={card.name}
    >
      {/* Decorative header image (clipped to card bounds) */}
      <div
        className="pointer-events-none absolute overflow-hidden"
        style={{
          left: card.imgLeft,
          right: card.imgRight,
          top: card.imgTop,
          width: card.imgW,
          height: card.imgH,
        }}
      >
        <img alt="" src={card.img} className="absolute inset-0 size-full max-w-none object-cover" />
      </div>

      {/* NewsSection — text pinned to the bottom, paints above the image */}
      <div
        className="relative flex w-full flex-col items-start justify-end"
        style={{ height: card.textH }}
        data-name="NewsSection"
      >
        <div className="flex w-full flex-col items-start gap-[12px]">
          <p className={`${gilroyMedium.className} w-full text-[22px] leading-[28px] text-white not-italic [word-break:break-word]`}>
            {card.title}
          </p>
          <p className={`${interRegular.className} w-full text-[16px] leading-[24px] font-normal whitespace-pre-wrap text-[#99a1af] not-italic [word-break:break-word]`}>
            {card.desc}
          </p>
        </div>
      </div>

      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      {card.decor}
    </div>
  );
}
