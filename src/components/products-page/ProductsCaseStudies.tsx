"use client";

import { gilroyMedium, gilroyBold, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { useState } from "react";
import { mediaUrl } from "@/lib/strapi";

const CASE_STUDIES = [
  {
    id: "tower",
    tag: "Leading telco infrastructure provider",
    oversizedResult: "10x",
    context: "efficiency gain in tower deployment context.",
    image: "/latest-news/article-partnership.png",
    ctaLabel: "Read Full Study",
    ctaHref: "",
  },
  {
    id: "coffee",
    tag: "Global beverage brand",
    oversizedResult: "< 50µW",
    context: "always-on wake word detection during operations.",
    image: "/latest-news/article-physics.png",
    ctaLabel: "Read Full Study",
    ctaHref: "",
  },
  {
    id: "capital",
    tag: "Top-tier financial institution",
    oversizedResult: "Zero",
    context: "cloud dependency for extreme-edge financial models.",
    image: "/latest-news/article-gpx10.webp",
    ctaLabel: "Read Full Study",
    ctaHref: "",
  },
];

const TRUSTED_LOGOS: string[] = []; // Less than 6, so ticker won't render

export function ProductsCaseStudies({ data }: { data?: any }) {
  const [showForm, setShowForm] = useState(false);

  console.log("ProductsCaseStudies data:", JSON.stringify(data, null, 2));
  const strapiCards = Array.isArray(data?.cards) && data.cards.length > 0 ? data.cards : null;
  const cards = strapiCards
    ? strapiCards.map((c: any, idx: number) => ({
        id: c.id || String(idx),
        tag: c.tag || "",
        oversizedResult: c.oversizedResult || "",
        context: c.context || "",
        image: mediaUrl(c.image) || "/latest-news/article-partnership.png",
        ctaLabel: c.cta_label || "Read Full Study",
        ctaHref: c.cta_href || "",
      }))
    : CASE_STUDIES;

  const title = data?.title || "Case Studies";
  const subtitle = data?.subtitle || "";

  return (
    <section className="relative w-full bg-black pt-[48px] pb-[24px] px-[24px] min-[1024px]:pt-[96px] min-[1024px]:pb-[32px] overflow-hidden">
      
      <div className="relative z-10 mx-auto w-full max-w-[1192px] flex flex-col items-center">
        {/* Header */}
        <div className="relative mb-[48px] flex flex-col items-center justify-center px-[20px] min-[1024px]:mb-[64px]">
          <Corners leftSrc="/products/fp-title-corner-left.svg" rightSrc="/products/fp-title-corner-right.svg" />
          <h2
            className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] leading-[42px] font-medium text-transparent not-italic min-[1024px]:text-[46px] min-[1024px]:leading-[49px]`}
            style={{
              backgroundImage: "linear-gradient(to bottom, #ffffff 40%, rgba(255, 255, 255, 0.2) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className={`${interRegular.className} mt-[16px] max-w-[600px] text-center text-[16px] leading-[24px] text-[rgba(240,240,240,0.6)]`}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Grid / Carousel */}
        <div
          className={
            cards.length > 3
              ? "flex w-full snap-x snap-mandatory gap-[24px] overflow-x-auto pb-[24px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden items-stretch"
              : "grid w-full grid-cols-1 gap-[24px] md:grid-cols-3 items-stretch"
          }
        >
          {cards.map((study: any) => {
            const CardElement = study.ctaHref ? "a" : "button";
            const elementProps = study.ctaHref
              ? { href: study.ctaHref }
              : {
                  onClick: () => {
                    alert("Trigger lead capture form for case study download.");
                    setShowForm(true);
                  },
                };

            return (
              <div
                key={study.id}
                className={`group relative flex h-full min-h-[500px] flex-col border border-solid border-[rgba(255,255,255,0.15)] bg-[rgba(0,0,0,0.2)] backdrop-blur-[12px] text-left transition-all duration-300 hover:border-[#a8ed90] ${
                  cards.length > 3 ? "w-[320px] shrink-0 snap-center md:w-[380px]" : "w-full"
                }`}
              >
                <CardElement
                  {...elementProps}
                  className="absolute inset-0 z-20 block w-full h-full appearance-none border-none bg-transparent cursor-pointer outline-none"
                  aria-label={study.ctaLabel}
                >
                  <span className="sr-only">{study.ctaLabel}</span>
                </CardElement>
              {/* Thumbnail Background */}
              <div className="absolute inset-x-0 top-0 h-[220px] w-full border-b border-[rgba(255,255,255,0.05)] overflow-hidden bg-black">
                <img
                  src={study.image}
                  alt={study.tag}
                  className="size-full object-cover opacity-80"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col flex-1 p-[40px] pt-[200px]">
                {/* Tag */}
                <div className="mb-[24px] flex min-h-[32px] items-center">
                  <span className={`${interRegular.className} text-[13px] font-medium text-[#a8ed90] uppercase tracking-wider`}>
                    {study.tag}
                  </span>
                </div>

                {/* Oversized Result */}
                <h3 
                  className={`${gilroyMedium.className} mb-[8px] text-[48px] leading-[1.1] min-[1024px]:text-[56px] min-[1024px]:leading-[1.1]`}
                  style={{
                    backgroundImage: "linear-gradient(to bottom, #ffffff 40%, rgba(255, 255, 255, 0.2) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {study.oversizedResult}
                </h3>
                
                {/* Context */}
                <p className={`${interRegular.className} text-[16px] leading-[24px] text-[rgba(240,240,240,0.6)] flex-1`}>
                  {study.context}
                </p>

                {/* CTA */}
                <div className="mt-[32px] relative flex h-[48px] shrink-0 items-center justify-center shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)] transition-all duration-300 group-hover:scale-[1.02]">
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
                  <span className={`${gilroyMedium.className} relative text-[16px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic`}>
                    {study.ctaLabel}
                  </span>
                  <span className={`pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]`} />
                  <GreenCtaCorners />
                </div>
              </div>

              <Corners className="z-30" leftSrc="/products/fp-title-corner-left.svg" rightSrc="/products/fp-title-corner-right.svg" />
              </div>
          )})}
        </div>
      </div>
    </section>
  );
}
