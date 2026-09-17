"use client";

import Image from "next/image";
import { useState } from "react";
import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { WhiteTag } from "./WhiteTag";
import { GreenCta } from "./GreenCta";

const FALLBACK_HERO_IMAGE = "/news-listing/hero-bg.webp";

type NewsListingHeroProps = {
  data?: any;
};

export function NewsListingHero({ data }: NewsListingHeroProps = {}) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Fallback to array with single slide if `data.slides` doesn't exist yet
  const rawSlides = Array.isArray(data?.slides) && data.slides.length > 0 
    ? data.slides 
    : (data ? [data] : []);

  // Ensure there are at least 3 slides if only 1 is provided, so it is scrollable
  const slides = rawSlides.length === 1 
    ? [rawSlides[0], rawSlides[0], rawSlides[0]]
    : rawSlides;

  const currentSlide = slides[currentSlideIndex] || {};

  // Main banner uses currentSlide
  const mainBackgroundImage = mediaUrl(currentSlide?.background_image) || FALLBACK_HERO_IMAGE;
  const tagText = (currentSlide?.tag?.text as string) || (currentSlide?.tag as string) || "";
  const title = (currentSlide?.title as string) || "";
  const subtitle = (currentSlide?.subtitle as string) || "";
  const ctaLabel = (currentSlide?.cta_label as string) || "";  
  // Dynamic pagination text (e.g. 01/03)
  const paginationText = slides.length > 0 
    ? `0${currentSlideIndex + 1}/0${slides.length}` 
    : "01/01";

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };



  return (
    <section
      className="relative -mt-[78px] flex w-full justify-center overflow-hidden bg-[#040404]"
      data-node-id="2653:685"
      data-name="Desktop - 8"
      aria-label="News listing hero"
    >
      {/* DESKTOP (>=1024px) — exact Figma layout */}
      <div className="relative hidden h-[667px] w-full min-[1024px]:block">
        {/* Image frame: 1440x638 at top-[29px], horizontally centered */}
        <div
          className="absolute left-1/2 top-[29px] h-[638px] w-[1440px] -translate-x-1/2 overflow-clip transition-opacity duration-500"
          data-node-id="2653:686"
          data-name="Image"
        >
          {mainBackgroundImage ? (
            <Image
              src={mainBackgroundImage}
              alt={currentSlide?.alt || ""}
              fill
              sizes="1440px"
              className="object-cover animate-hero-text-fade-in"
              priority
            />
          ) : null}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(185.739deg, rgba(25, 25, 25, 0) 58.395%, rgb(4, 4, 4) 88.066%)",
            }}
          />

          {/* Side fades so the 1440px image blends into the dark page on wider screens */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgb(4, 4, 4) 0%, rgba(4, 4, 4, 0) 7%, rgba(4, 4, 4, 0) 93%, rgb(4, 4, 4) 100%)",
            }}
          />

          {/* Left caption overlay */}
          <div
            className="absolute left-[80px] top-[389px] flex w-[407px] flex-col gap-[12px] px-[16px] animate-hero-text-fade-in"
            data-node-id="2653:693"
          >
            <WhiteTag label={tagText} nodeId="2653:687" />
            <div className="flex w-full flex-col gap-[12px]">
              <h2
                className={`${gilroyMedium.className} w-full text-[22px] leading-[28px] font-medium text-white opacity-90 not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden`}
                data-node-id="2653:695"
              >
                {title}
              </h2>
              <p
                className={`${interRegular.className} w-full text-[14px] leading-[21px] font-normal text-[#d2d2d2] opacity-90 not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden`}
                data-node-id="2653:696"
              >
                {subtitle}
              </p>
            </div>
            <GreenCta label={ctaLabel} nodeId="2653:697" />
          </div>

          {/* Slider controls */}
          <div className="absolute right-[106px] bottom-[24px] z-10 flex items-center gap-[12px]">
            <button 
              onClick={handlePrev}
              className="relative flex h-[48px] w-[48px] items-center justify-center border border-white/30 bg-white/10 transition-colors hover:bg-white/20"
              aria-label="Previous slide"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              <Corners />
            </button>
            <span className={`${interRegular.className} text-[14px] leading-[18px] font-normal text-[#D2D2D2]`}>
              {paginationText}
            </span>
            <button 
              onClick={handleNext}
              className="relative flex h-[48px] w-[48px] items-center justify-center border border-white/30 bg-white/10 transition-colors hover:bg-white/20"
              aria-label="Next slide"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              <Corners />
            </button>
          </div>


        </div>
      </div>

      {/* MOBILE (<1024px) — exact Figma mobile layout (393×690 frame) */}
      <div className="relative w-full min-[1024px]:hidden">
        {/* Image area: full-bleed background with gradient overlay */}
        <div className="relative h-[487px] w-full overflow-hidden" data-name="Image">
          {mainBackgroundImage ? (
            <Image
              src={mainBackgroundImage}
              alt={currentSlide?.alt || ""}
              fill
              sizes="100vw"
              className="object-cover animate-hero-text-fade-in"
              priority
            />
          ) : null}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(179.96262284694768deg, rgba(25, 25, 25, 0) 42.734%, rgb(4, 4, 4) 72.236%)",
            }}
          />

          {/* Caption overlay — bottom of image area */}
          <div className="absolute bottom-[15px] left-[20px] right-[18px] flex flex-col gap-[15px] animate-hero-text-fade-in">
            <WhiteTag label={tagText} widthClass="w-[120px]" />
            <h2
              className={`${gilroyMedium.className} w-full text-[22px] leading-[28px] font-medium text-white opacity-90 not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden`}
              data-node-id="4153:8670"
            >
              {title}
            </h2>
            <p
              className={`${interRegular.className} w-full text-[14px] leading-[21px] font-normal text-[#d2d2d2] opacity-90 not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden`}
              data-node-id="4153:8674"
            >
              {subtitle}
            </p>
            <GreenCta
              label={ctaLabel}
              widthClass="w-full"
              textSizeClass="text-[14px]"
            />
          </div>
        </div>

        {/* Pagination indicator + Featured card */}
        <div className="flex flex-col-reverse gap-[16px] px-[19px] pt-[15px] pb-[30px]">
          <div className="flex justify-end">
            {/* Slider controls */}
            <div className="flex items-center gap-[12px] w-fit">
              <button 
                onClick={handlePrev}
                className="relative flex h-[40px] w-[40px] items-center justify-center border border-white/30 bg-white/10 transition-colors hover:bg-white/20"
                aria-label="Previous slide"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                <Corners />
              </button>
              <span className={`${interRegular.className} text-[13px] leading-[18px] font-normal text-[#D2D2D2]`}>
                {paginationText}
              </span>
              <button 
                onClick={handleNext}
                className="relative flex h-[40px] w-[40px] items-center justify-center border border-white/30 bg-white/10 transition-colors hover:bg-white/20"
                aria-label="Next slide"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                <Corners />
              </button>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
