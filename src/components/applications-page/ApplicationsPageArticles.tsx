"use client";

/* eslint-disable @next/next/no-img-element */
import { useFadeIn, getFadeInClass } from "../shared/useFadeIn";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { mediaUrl } from "@/lib/strapi";

const TITLE_GRADIENT =
  "linear-gradient(131.785deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const FALLBACK_HEADING = "Intelligence without boundaries.";
const FALLBACK_CTA = "Learn More";

type Article = {
  title: string;
  body: string;
  image: string;
  imageW: number;
  imageH: number;
  objectBottom?: boolean;
  ctaLabel: string;
};

const ARTICLES: Article[] = [
  {
    title: "Wearables",
    body: "Always-on biometric tracking and complex activity recognition running continuously on standard wearable batteries.",
    image: "/applications/card-center.png",
    imageW: 205,
    imageH: 162,
    ctaLabel: FALLBACK_CTA,
  },
  {
    title: "Hearables",
    body: "Always-on wake-word detection and real-time audio enhancement running continuously on microscopic power budgets.",
    image: "/applications/card-right-mid.png",
    imageW: 205,
    imageH: 162,
    ctaLabel: FALLBACK_CTA,
  },
  {
    title: "Smart Home",
    body: "True on-device voice processing and presence detection without sacrificing consumer privacy to the cloud.",
    image: "/applications/card-left-far.png",
    imageW: 179,
    imageH: 162,
    ctaLabel: FALLBACK_CTA,
  },
  {
    title: "Industry 4.0",
    body: "High-frequency predictive maintenance and visual defect detection directly on the factory floor.",
    image: "/applications/card-left-mid.png",
    imageW: 205,
    imageH: 162,
    ctaLabel: FALLBACK_CTA,
  },
  {
    title: "Medical Devices",
    body: "Clinical-grade monitoring and real-time anomaly detection deployed in miniaturized form factors.",
    image: "/applications/app-medical.png",
    imageW: 205,
    imageH: 162,
    ctaLabel: FALLBACK_CTA,
  },
  {
    title: "Agriculture & Livestock",
    body: "Complex visual monitoring and behavioral tracking deployed in remote environments where cloud connectivity is impossible.",
    image: "/applications/card-right-far.png",
    imageW: 179,
    imageH: 162,
    ctaLabel: FALLBACK_CTA,
  },
  {
    title: "Drones",
    body: "High-speed object detection and autonomous navigation processed natively without sacrificing critical flight time.",
    image: "/applications/app-drones.png",
    imageW: 205,
    imageH: 162,
    ctaLabel: FALLBACK_CTA,
  },
  {
    title: "Robotics",
    body: "Instantaneous multi-sensor fusion and complex kinematic control operating completely untethered from the cloud.",
    image: "/applications/app-robotics.png",
    imageW: 205,
    imageH: 162,
    ctaLabel: FALLBACK_CTA,
  },
  {
    title: "Automotive",
    body: "Ultra-low latency sensor fusion and continuous in-cabin monitoring executing natively for next-generation safety.",
    image: "/applications/app-automotive.png",
    imageW: 285,
    imageH: 258,
    objectBottom: true,
    ctaLabel: FALLBACK_CTA,
  },
];

function SectionTitle({ heading }: { heading: string }) {
  return (
    <div className="relative inline-block px-[14px]">
      <h2
        className={`${gilroyMedium.className} bg-clip-text text-center text-[46px] leading-[49px] font-medium whitespace-nowrap text-transparent not-italic`}
        style={{
          backgroundImage: TITLE_GRADIENT,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
        data-node-id="2438:3982"
      >
        {heading}
      </h2>
      <Corners />
    </div>
  );
}

function ArticleCard({ article }: { article: Article }) {
  const { fadeRef, isVisible } = useFadeIn();

  return (
    <div
      ref={fadeRef}
      className={`relative flex h-[400px] w-full flex-col items-center gap-[16px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] px-[16px] pt-[16px] pb-[24px] ${getFadeInClass(isVisible)}`}
      data-name="Article"
    >
      {/* Image */}
      <div className="relative h-[162px] w-full shrink-0">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: article.imageW, height: article.imageH }}
        >
          <img
            alt=""
            aria-hidden
            src={article.image}
            className={`pointer-events-none absolute inset-0 size-full max-w-none ${
              article.objectBottom ? "object-bottom" : "object-cover"
            }`}
          />
        </div>
      </div>

      {/* News section */}
      <div className="flex w-full flex-col items-center gap-[10px] text-center">
        <p
          className={`${gilroyMedium.className} text-[20.211px] leading-[28.295px] tracking-[-0.4539px] whitespace-nowrap text-white`}
        >
          {article.title}
        </p>
        <p
          className={`${interRegular.className} w-full text-[14px] leading-[21px] font-normal text-[rgba(240,240,240,0.6)]`}
        >
          {article.body}
        </p>
      </div>

      {/* CTA - Secondary */}
      <div className="relative mt-auto flex shrink-0 items-center border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] px-[20px] py-[10px]">
        <p
          className={`${gilroyMedium.className} text-[16px] leading-[28px] uppercase whitespace-nowrap text-white`}
        >
          {article.ctaLabel}
        </p>
        <Corners />
      </div>

      {/* Card corners */}
      <Corners />
    </div>
  );
}

export function ApplicationsPageArticles({ data }: { data?: any }) {
  const heading = data?.heading || FALLBACK_HEADING;

  const rawArticles = Array.isArray(data?.articles) ? data.articles : [];
  const articles: Article[] =
    rawArticles.length > 0
      ? rawArticles.map((a: any, i: number) => ({
          title: a?.title || ARTICLES[i]?.title || "",
          body: a?.body || ARTICLES[i]?.body || "",
          image: mediaUrl(a?.image) || ARTICLES[i]?.image || "",
          imageW: ARTICLES[i]?.imageW ?? 205,
          imageH: ARTICLES[i]?.imageH ?? 162,
          objectBottom: ARTICLES[i]?.objectBottom,
          ctaLabel: a?.cta_label || ARTICLES[i]?.ctaLabel || FALLBACK_CTA,
        }))
      : ARTICLES;

  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="2438:3980"
      data-name="Frame 1618875840"
      aria-label="Intelligence without boundaries"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="hidden w-full max-w-[1440px] flex-col items-center gap-[40px] pt-[96px] pb-[64px] min-[1024px]:flex">
        <SectionTitle heading={heading} />
        <div className="grid grid-cols-[repeat(3,377px)] gap-[36px]">
          {articles.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </div>
      </div>

      {/* MOBILE (<1024px) */}
      <div className="flex w-full flex-col items-center gap-[40px] px-[24px] pt-[64px] pb-[40px] min-[1024px]:hidden">
        <div className="relative inline-block px-[10px]">
          <h2
            className={`${gilroyMedium.className} bg-clip-text text-center text-[32px] leading-[38px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              backgroundImage: TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            {heading}
          </h2>
          <Corners />
        </div>
        <div className="flex w-full flex-col items-center gap-[24px]">
          {articles.map((article) => (
            <div key={article.title} className="w-full max-w-[377px]">
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
