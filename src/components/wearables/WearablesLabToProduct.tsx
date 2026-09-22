"use client";

/* eslint-disable @next/next/no-img-element */
import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { useFitText } from "../shared/FitText";

const TITLE_GRADIENT =
  "linear-gradient(138.787deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const FALLBACK_SUBTITLE =
  "Don't spend your first day writing sensor configuration code. The Cranium board comes ready to run out of the box, allowing you to instantly test physical AI models and validate performance on the metal with zero setup required.";
const FALLBACK_HEADING = "From lab to product in months, not years.";
const FALLBACK_IMAGE = "/applications/wearables/img-168.webp";

const IMG_OVERLAY =
  "linear-gradient(to bottom, rgba(0,0,0,0) 88.146%, rgb(0,0,0) 100%)";

type CardData = {
  number: string;
  title: string;
  body: string;
  cta: string;
  ctaHref: string;
  imgLeft: string;
  imgTop: string;
  image?: string;
};

const CARDS: CardData[] = [
  {
    number: "01",
    title: "VALIDATE",
    body: "Test your TensorFlow/PyTorch models on our GPX Evaluation Kits using standard I2S, I2C, SPI sensor inputs.",
    cta: "View Evaluation Kits",
    ctaHref: "#",
    imgLeft: "-9.04%",
    imgTop: "-49.04%",
  },
  {
    number: "02",
    title: "COMPILE",
    body: "Use the ModelForge SDK to seamlessly quantize and compile your models for ultra-low-power analog execution.",
    cta: "Visit Developer Hub",
    ctaHref: "#",
    imgLeft: "-114.69%",
    imgTop: "-45.83%",
  },
  {
    number: "03",
    title: "INTEGRATE",
    body: "Drop our integrated System-on-Modules (SOMs) directly into your most constrained custom carrier boards.",
    cta: "View SoMs",
    ctaHref: "#",
    imgLeft: "-116.48%",
    imgTop: "-162.44%",
  },
];

function LabCard({ data }: { data: CardData }) {
  const fitRef = useFitText<HTMLParagraphElement>({ maxLines: 2 });
  const image = data.image || FALLBACK_IMAGE;
  return (
    <div
      className="relative flex h-[549px] flex-1 flex-col border border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.2)] pt-[16px] pb-[24px] px-[32px]"
      data-name="Article"
    >
      <Corners
        leftSrc="/applications/wearables/vector-42.svg"
        rightSrc="/applications/wearables/vector-43.svg"
      />

      {/* NewsSection */}
      <div className="relative w-full min-h-0 flex-1" data-name="NewsSection">
        {/* Image */}
        <div
          className="absolute top-[-3.05px] left-0 h-[231.502px] w-full overflow-hidden"
          data-name="image 168"
          aria-hidden
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 overflow-hidden">
              <img loading="lazy" decoding="async"
                alt=""
                src={image}
                className="absolute inset-0 size-full object-contain"
              />
            </div>
            <div
              className="absolute inset-0"
              style={{ backgroundImage: IMG_OVERLAY }}
            />
          </div>
        </div>

        {/* Large faded number */}
        <p
          className={`${gilroyMedium.className} absolute left-0 top-[256.5px] whitespace-nowrap bg-gradient-to-b from-white to-[rgba(255,255,255,0)] bg-clip-text text-[70px] leading-[64px] text-transparent opacity-50 not-italic`}
        >
          {data.number}
        </p>

        {/* Content */}
        <div className="absolute left-0 top-[317px] flex w-[333.99px] flex-col gap-[12px] items-start not-italic">
          <p
            ref={fitRef}
            className={`${gilroyMedium.className} w-[333.991px] shrink-0 text-[32px] leading-[38px] text-white`}
          >
            {data.title}
          </p>
          <p
            className={`${interRegular.className} w-[333.99px] shrink-0 text-[16px] leading-[26px] tracking-[-0.3125px] text-[#99a1af] [word-break:break-word]`}
          >
            {data.body}
          </p>
        </div>

        {/* CTA */}
        <a
          href={data.ctaHref}
          className={`${gilroyMedium.className} absolute left-0 top-[461px] flex cursor-pointer items-center border border-white/20 bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]`}
          data-name="CTA - Secondary"
        >
          <span className="max-w-full whitespace-nowrap text-[16px] leading-[28px] font-medium text-white uppercase not-italic overflow-hidden text-ellipsis">
            {data.cta}
          </span>
          <Corners
            leftSrc="/applications/wearables/vector-42.svg"
            rightSrc="/applications/wearables/vector-43.svg"
          />
        </a>
      </div>
    </div>
  );
}

export function WearablesLabToProduct({ data }: { data?: any }) {
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 1 });
  const fitRef2 = useFitText<HTMLHeadingElement>({ maxLines: 2 });

  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const heading = data?.heading || FALLBACK_HEADING;
  const dataCards: any[] = Array.isArray(data?.cards) ? data.cards : [];
  const cards = CARDS.map((fb, i) => {
    const c = dataCards[i];
    if (!c) return { ...fb, image: FALLBACK_IMAGE };
    return {
      ...fb,
      number: c.step || fb.number,
      title: c.title || fb.title,
      body: c.description || fb.body,
      cta: c.cta_label || fb.cta,
      ctaHref: c.cta_href || fb.ctaHref,
      image: mediaUrl(c.image) || FALLBACK_IMAGE,
    };
  });
  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="2509:485"
      data-name="From lab to product"
      aria-label="From lab to product in months, not years"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden w-full max-w-[1440px] flex-col items-center gap-[48px] pt-[40px] pb-[60px] px-[24px] min-[1024px]:flex">
        {/* Title */}
        <div className="flex flex-col items-center gap-[24px]">
          <div className="relative flex flex-col items-center px-[10px]">
            <h2
              ref={fitRef}
              className={`${gilroyMedium.className} bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent whitespace-nowrap not-italic [word-break:break-word]`}
              style={{
                backgroundImage: TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {heading}
            </h2>
            <Corners
              leftSrc="/applications/wearables/vector-42.svg"
              rightSrc="/applications/wearables/vector-43.svg"
            />
          </div>
          <p
            className={`${interRegular.className} w-[650px] text-center text-[14px] leading-[21px] text-[#f0f0f0] not-italic [word-break:break-word]`}
          >
            {subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="flex w-[1222px] items-start gap-[24px]">
          {cards.map((c) => (
            <LabCard key={c.number} data={c} />
          ))}
        </div>
      </div>

      {/* MOBILE (<1024px) */}
      <div className="relative flex w-full flex-col items-center gap-[24px] px-[23px] pt-[30px] pb-[48px] min-[1024px]:hidden">

        {/* Title */}
        <div className="relative z-10 flex w-[350px] flex-col items-center gap-[10px]">
          <div className="relative h-[79px] w-[356px]">
            <h2
              ref={fitRef2}
              className={`${gilroyMedium.className} absolute inset-0 flex items-center justify-center bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: "linear-gradient(107.4537261117953deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {heading}
            </h2>
            <Corners
              leftSrc="/applications/wearables/vector-42.svg"
              rightSrc="/applications/wearables/vector-43.svg"
            />
          </div>
          <p
            className={`${interRegular.className} w-[350px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic`}
          >
            {subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="flex w-full flex-col gap-[20px]">
          {cards.map((card) => (
            <div
              key={card.number}
              className="relative flex w-full flex-col border border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.2)] pt-[16px] pb-[24px] px-[24px]"
            >
              <Corners
                leftSrc="/applications/wearables/vector-42.svg"
                rightSrc="/applications/wearables/vector-43.svg"
              />
              {/* Image */}
              <div
                className="relative mb-[16px] h-[200px] w-full overflow-hidden"
                aria-hidden
              >
                <img loading="lazy" decoding="async"
                  alt=""
                  src={card.image || FALLBACK_IMAGE}
                  className="absolute inset-0 size-full object-contain"
                />
                <div
                  className="absolute inset-0"
                  style={{ backgroundImage: IMG_OVERLAY }}
                />
              </div>
              {/* Number */}
              <p
                className={`${gilroyMedium.className} absolute right-[24px] top-[200px] bg-gradient-to-b from-white to-[rgba(255,255,255,0)] bg-clip-text text-[48px] leading-[48px] text-transparent opacity-50 not-italic`}
              >
                {card.number}
              </p>
              {/* Content */}
              <div className="flex flex-col gap-[10px]">
                <p
                  className={`${gilroyMedium.className} text-[24px] leading-[30px] text-white not-italic`}
                >
                  {card.title}
                </p>
                <p
                  className={`${interRegular.className} text-[14px] leading-[22px] tracking-[-0.3125px] text-[#99a1af] not-italic`}
                >
                  {card.body}
                </p>
              </div>
              {/* CTA */}
              <a
                href={card.ctaHref}
                className={`${gilroyMedium.className} mt-[16px] flex h-[44px] w-full cursor-pointer items-center justify-center border border-white/20 bg-[rgba(226,241,202,0.12)]`}
              >
                <span className="relative max-w-full whitespace-nowrap text-[13px] leading-[28px] font-medium text-white uppercase not-italic overflow-hidden text-ellipsis">
                  {card.cta}
                </span>
                <Corners
                  leftSrc="/applications/wearables/vector-42.svg"
                  rightSrc="/applications/wearables/vector-43.svg"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
