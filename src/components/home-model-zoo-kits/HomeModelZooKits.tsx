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
    img: "/model-zoo/ModelF.png",
    alt: "ModelForge - Your model, compiled in minutes.",
    title: "ModelForge - Your model, compiled in minutes.",
    desc: "Bring TensorFlow, Keras, or ONNX. Push-button compile onto A-Cube no rewrites, no proprietary toolchain.",
    cta: "Explore the Developer Hub",
    href: "/developer",
    ctaWidth: 240,
  },
  {
    nodeId: "5246:6386",
    img: "/model-zoo/center.jpeg",
    alt: "The Model Zoo - Skip the blank page.",
    title: "The Model Zoo - Skip the blank page.",
    desc: "Deploy a pre-built, GPX-tuned model to your dev or eval kit in one click, and see it work in seconds.",
    cta: "Browse the Model Zoo",
    href: "/model-zoo",
    ctaWidth: 240,
  },
  {
    nodeId: "5246:6416",
    img: "/model-zoo/phone-mockup-new.png",
    alt: "ApplicationForge - See it live, from your phone.",
    title: "ApplicationForge - See it live, from your phone.",
    desc: "Pair with an eval kit over Bluetooth and watch AI run in real time.",
    cta: "Learn More",
    href: "/application-forge",
    ctaWidth: 220,
  },
];

const ARCS = [
  { src: "/model-zoo/arc-78.svg", cx: 1163, cy: -112.5 },
  { src: "/model-zoo/arc-79.svg", cx: 1015, cy: 3.5 },
  { src: "/model-zoo/arc-80.svg", cx: 323, cy: -102 },
];

import { mediaUrl } from "@/lib/strapi";

type KitCardData = {
  nodeId?: string;
  img: string;
  alt: string;
  title: string;
  desc: string;
  cta: string;
  href?: string;
  ctaWidth?: number;
};

function KitCard({ card }: { card: KitCardData }) {
  const { fadeRef, isVisible } = useFadeIn<HTMLDivElement>();
  const isModelF = card.img.includes("ModelF") || card.img.includes("modelf");
  return (
    <div
      ref={fadeRef}
      className={`relative flex h-full min-w-px w-full flex-col gap-[16px] min-[1024px]:gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.7)] px-[18px] pt-[18px] pb-[22px] min-[1024px]:px-[20px] min-[1024px]:pt-[20px] min-[1024px]:pb-[24px] transition-colors duration-300 hover:border-[#a8ed90] hover:bg-[rgba(68,120,7,0.2)] ${getFadeInClass(isVisible)}`}
      data-node-id={card.nodeId || "card"}
      data-name="Article"
    >
      <div className="relative h-[260px] sm:h-[300px] min-[1024px]:h-[327px] w-full shrink-0 overflow-clip rounded-[6px] flex items-center justify-center">
        <img
          alt={card.alt}
          src={card.img}
          className={`pointer-events-none size-full rounded-[6px] ${isModelF ? "object-contain" : "object-cover"}`}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="flex w-full flex-col items-start gap-[10px] flex-grow">
        <p className={`${gilroyMedium.className} w-full text-[20px] min-[1024px]:text-[22px] leading-[26px] min-[1024px]:leading-[28px] text-white not-italic`}>
          {card.title}
        </p>
        <p className={`${interRegular.className} w-full text-[14px] min-[1024px]:text-[16px] leading-[22px] min-[1024px]:leading-[24px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}>
          {card.desc}
        </p>
      </div>

      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </div>
  );
}

export function HomeModelZooKits({ data }: { data?: any }) {
  const heading = data?.heading || "The fastest path from model to running AI.";
  const subheading = data?.subheading || "Bring your own model or start from a pre-built one, compile in minutes with ModelForge, and watch it run live on real silicon - even from your phone.";
  const bottomSubheading = data?.bottom_subheading || "Open-source and Ambient-built models, all running at microwatts on GPX.";
  const bottomCta1Label = data?.bottom_cta_1_label || "Browse the Model Zoo";
  const bottomCta1Link = data?.bottom_cta_1_link || "#";
  const bottomCta2Label = data?.bottom_cta_2_label || "Explore the Developer Hub";
  const bottomCta2Link = data?.bottom_cta_2_link || "#";
  
  const cardsData: KitCardData[] = Array.isArray(data?.cards) && data.cards.length > 0
    ? data.cards.map((c: any, i: number) => ({
        nodeId: `strapi-${i}`,
        img: i === 0 ? "/model-zoo/ModelF.png" : (mediaUrl(c.image) || CARDS[i]?.img || ""),
        alt: c.alt || CARDS[i]?.alt || "",
        title: c.title || CARDS[i]?.title || "",
        desc: c.desc || CARDS[i]?.desc || "",
        cta: c.cta || CARDS[i]?.cta || "",
        href: c.cta_href || c.cta_link || c.href || CARDS[i]?.href || "#",
        ctaWidth: c.cta_width || CARDS[i]?.ctaWidth || 240,
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
        <div className="flex w-full flex-col items-center gap-[24px]" data-node-id="5131:11088" data-name="Section Title">
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
          {subheading && (
            <p className={`${interRegular.className} w-full max-w-[679.389px] text-center text-[14px] leading-[21px] min-[1024px]:text-[16px] min-[1024px]:leading-[24px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}>
              {subheading}
            </p>
          )}
        </div>

        <div
          className="mt-[24px] flex w-[calc(100%+32px)] -mx-[16px] snap-x snap-mandatory gap-[16px] overflow-x-auto px-[16px] pb-[8px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-[1024px]:mx-0 min-[1024px]:w-full min-[1024px]:mt-[60px] min-[1024px]:flex-row min-[1024px]:justify-center min-[1024px]:items-stretch min-[1024px]:gap-[24px] min-[1024px]:px-[26px] min-[1024px]:overflow-visible min-[1024px]:pb-0"
          data-node-id="5246:6363"
          data-name="Frame 1984079440"
        >
          {cardsData.map((card: KitCardData) => (
            <div
              key={card.nodeId}
              className="w-[320px] sm:w-[350px] max-w-[85vw] shrink-0 snap-center min-[1024px]:w-[385px] min-[1024px]:max-w-none min-[1024px]:shrink flex"
            >
              <KitCard card={card} />
            </div>
          ))}
        </div>

        <div className="mt-[60px] flex w-full flex-col items-center gap-[24px] px-[16px] min-[1024px]:px-0">
          <p className={`${interRegular.className} w-full max-w-[679.389px] text-center text-[14px] leading-[21px] min-[1024px]:text-[16px] min-[1024px]:leading-[24px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}>
            {bottomSubheading}
          </p>
          <div className="flex w-full flex-col items-center justify-center gap-[16px] sm:flex-row">
            <CtaPrimary label={bottomCta1Label} href={bottomCta1Link} width={240} />
            <CtaPrimary label={bottomCta2Label} href={bottomCta2Link} width={251} />
          </div>
        </div>
      </div>
    </section>
  );
}
