/* eslint-disable @next/next/no-img-element */
"use client";

import { gilroyMedium, interRegular } from "../hero/fonts";
import { getFadeInClass, useFadeIn } from "../shared/useFadeIn";
import { Corners } from "../shared/Corners";
import { CtaPrimary } from "../model-zoo/ModelZooCtas";
import { CORNER_LEFT, CORNER_RIGHT, sectionTitleGradient } from "../model-zoo/model-zoo-data";

const TITLE_GRADIENT = sectionTitleGradient(111.766);

const CARDS = [
  {
    nodeId: "5246:6364",
    img: "/model-zoo/kit-1.webp",
    alt: "Sparsh eval kit on a bench",
    title: "Try it on your bench.",
    desc: "Request an eval kit and run any model from day one.",
    cta: "Request Eval Kit",
    ctaWidth: 200,
  },
  {
    nodeId: "5246:6386",
    img: "/model-zoo/kit-2.webp",
    alt: "ApplicationForge phone app",
    title: "Experience it now.",
    desc: "Download ApplicationForge and drive live demos from your phone.",
    cta: "Get the ApplicationForge App",
    ctaWidth: 290,
  },
  {
    nodeId: "5246:6416",
    img: "/model-zoo/kit-3.webp",
    alt: "Model cards and code on GitHub",
    title: "Go deeper.",
    desc: "Browse the code and model cards on GitHub.",
    cta: "Browse the Model Zoo",
    ctaWidth: 240,
  },
];

const ARCS = [
  { src: "/model-zoo/arc-78.svg", cx: 1163, cy: -112.5 },
  { src: "/model-zoo/arc-79.svg", cx: 1015, cy: 3.5 },
  { src: "/model-zoo/arc-80.svg", cx: 323, cy: -102 },
];

import { mediaUrl } from "@/lib/strapi";

function KitCard({ card }: { card: (typeof CARDS)[number] }) {
  const { fadeRef, isVisible } = useFadeIn<HTMLDivElement>();
  return (
    <div
      ref={fadeRef}
      className={`relative flex h-auto min-w-px w-full min-[1024px]:w-[385px] flex-col gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.7)] px-[20px] pt-[20px] pb-[32px] transition-colors duration-300 hover:border-[#a8ed90] hover:bg-[rgba(68,120,7,0.2)] min-[1024px]:h-[553px] ${getFadeInClass(isVisible)}`}
      data-node-id={card.nodeId || "card"}
      data-name="Article"
    >
      <div className="relative h-[327px] w-full shrink-0 overflow-clip rounded-[6px]">
        <img alt={card.alt} src={card.img} className="pointer-events-none size-full rounded-[6px] object-cover" loading="lazy" decoding="async" />
      </div>

      <div className="flex w-full flex-col items-start gap-[10px]">
        <p className={`${gilroyMedium.className} w-full text-[22px] leading-[28px] text-white not-italic min-[1024px]:whitespace-nowrap`}>
          {card.title}
        </p>
        <p className={`${interRegular.className} w-full text-[16px] leading-[24px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}>
          {card.desc}
        </p>
      </div>

      <CtaPrimary label={card.cta} width={card.ctaWidth || 240} />

      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </div>
  );
}

export function HomeModelZooKits({ data }: { data?: any }) {
  const heading = data?.heading || "Start with a model that already works.";
  
  const cardsData = Array.isArray(data?.cards) && data.cards.length > 0
    ? data.cards.map((c: any, i: number) => ({
        nodeId: `strapi-${i}`,
        img: mediaUrl(c.image) || CARDS[i]?.img || "",
        alt: c.alt || CARDS[i]?.alt || "",
        title: c.title || "",
        desc: c.desc || "",
        cta: c.cta || "",
        ctaWidth: CARDS[i]?.ctaWidth || 240,
      }))
    : CARDS;

  return (
    <section
      className="relative z-20 w-full bg-transparent pb-[100px] pt-[60px] min-[1024px]:pt-[120px]"
      data-node-id="5131:10997"
      aria-label="Start with a model that already works"
    >
      {ARCS.map((arc, i) => (
        <img
          key={i}
          alt=""
          src={arc.src}
          aria-hidden
          className="pointer-events-none absolute hidden h-[379px] w-[520px] min-[1024px]:block"
          style={{ left: arc.cx - 260, top: arc.cy - 189.5 }}
          loading="lazy"
          decoding="async"
        />
      ))}

      <div className="relative mx-auto w-full max-w-[1256px] px-[16px] min-[1024px]:px-0">
        <div className="flex justify-center" data-node-id="5131:11088" data-name="Section Title">
          <div className="relative px-[10px]" data-node-id="5131:11089" data-name="Title">
            <h2
              className={`${gilroyMedium.className} w-full max-w-[605px] bg-clip-text text-center text-[36px] leading-[36px] min-[1024px]:text-[46px] min-[1024px]:leading-[49px] font-medium text-transparent not-italic`}
              style={{ backgroundImage: TITLE_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text" }}
              data-node-id="5131:11090"
            >
              {heading}
            </h2>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </div>
        </div>

        <div className="mt-[24px] flex flex-col items-stretch gap-[16px] px-0 min-[1024px]:mt-[60px] min-[1024px]:flex-row min-[1024px]:justify-center min-[1024px]:items-center min-[1024px]:gap-[24px] min-[1024px]:px-[26px]" data-node-id="5246:6363" data-name="Frame 1984079440">
          {cardsData.map((card: any) => (
            <KitCard key={card.nodeId} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
