"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { WhiteTag } from "./WhiteTag";
import { GreenCta } from "./GreenCta";

const FALLBACK_HERO_IMAGE = "/news-listing/hero-bg.png";

type NewsListingHeroProps = {
  data?: any;
};

export function NewsListingHero({ data }: NewsListingHeroProps = {}) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const [direction, setDirection] = useState(0);

  // Fallback to array with single slide if `data.slides` doesn't exist yet
  const rawSlides = Array.isArray(data?.slides) && data.slides.length > 0 
    ? data.slides 
    : (data ? [data] : []);

  // Ensure there are at least 3 slides if only 1 is provided, so it is scrollable
  const slides = rawSlides.length === 1 
    ? [rawSlides[0], rawSlides[0], rawSlides[0]]
    : rawSlides;

  const currentSlide = slides[currentSlideIndex] || {};

  // Main banner uses slides[0] so it stays static
  const mainBackgroundImage = mediaUrl(slides[0]?.background_image) || FALLBACK_HERO_IMAGE;
  const tagText = (slides[0]?.tag?.text as string) || (slides[0]?.tag as string) || "";
  const title = (slides[0]?.title as string) || "";
  const subtitle = (slides[0]?.subtitle as string) || "";
  const ctaLabel = (slides[0]?.cta_label as string) || "";

  // Featured card uses currentSlide
  const featuredImage = mediaUrl(currentSlide?.featured_image) || FALLBACK_HERO_IMAGE;
  const cardTag = (currentSlide?.tag?.text as string) || (currentSlide?.tag as string) || "";
  const cardTitle = (currentSlide?.title as string) || "";
  const cardCta = (currentSlide?.cta_label as string) || "";
  
  // Dynamic pagination text (e.g. 01/03)
  const paginationText = slides.length > 0 
    ? `0${currentSlideIndex + 1}/0${slides.length}` 
    : "01/01";

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const cardVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 50 : -50,
      opacity: 0,
    }),
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
                className={`${gilroyMedium.className} w-full text-[22px] leading-[28px] font-medium text-white opacity-90 not-italic [word-break:break-word]`}
                data-node-id="2653:695"
              >
                {title}
              </h2>
              <p
                className={`${interRegular.className} w-full text-[14px] leading-[21px] font-normal text-[#d2d2d2] opacity-90 not-italic [word-break:break-word]`}
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

          {/* Right featured card */}
          <div className="absolute left-[894px] top-[389px] h-[152px] w-[450px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`featured-${currentSlideIndex}`}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 flex gap-[8px] border border-solid border-white/20 bg-[#191919] p-[10px]"
                data-node-id="2653:709"
                data-name="Featured Card"
              >
                <div
                  className="relative flex h-[132px] w-[164px] shrink-0 flex-col items-end overflow-clip p-[12px]"
                  data-node-id="2653:710"
                  data-name="Image"
                >
                  <Image
                    src={featuredImage}
                    alt=""
                    fill
                    sizes="164px"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(88.8266deg, rgba(25, 25, 25, 0) 60.881%, rgb(25, 25, 25) 99.17%)",
                    }}
                  />
                  <WhiteTag label={cardTag} nodeId="2653:711" />
                </div>
                <div
                  className="flex flex-col gap-[24px] px-[16px]"
                  data-node-id="2653:717"
                >
                  <h3
                    className={`${gilroyMedium.className} w-[242px] text-[22px] leading-[28px] font-medium text-white opacity-90 not-italic [word-break:break-word] line-clamp-2`}
                    data-node-id="2653:719"
                  >
                    {cardTitle}
                  </h3>
                  <GreenCta label={cardCta} nodeId="2653:720" disableDots={true} />
                </div>
                <Corners className="z-[3]" />
              </motion.div>
            </AnimatePresence>
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
              className={`${gilroyMedium.className} w-full text-[22px] leading-[28px] font-medium text-white opacity-90 not-italic [word-break:break-word]`}
              data-node-id="4153:8670"
            >
              {title}
            </h2>
            <p
              className={`${interRegular.className} w-full text-[14px] leading-[21px] font-normal text-[#d2d2d2] opacity-90 not-italic [word-break:break-word]`}
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

          {/* Featured card */}
          <div className="relative h-[130px] w-full overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                className="absolute inset-0 flex gap-[6px] border border-solid border-white/20 bg-[#191919] p-[8px]"
                key={`featured-mobile-${currentSlideIndex}`}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                data-node-id="4153:8855"
                data-name="Featured Card"
              >
                {/* Card image */}
                <div className="relative flex h-[114px] w-[130px] shrink-0 flex-col items-center overflow-clip p-[8px]">
                  <Image
                    src={featuredImage}
                    alt=""
                    fill
                    sizes="130px"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(88.92301976638984deg, rgba(25, 25, 25, 0) 60.881%, rgb(25, 25, 25) 99.17%)",
                    }}
                  />
                  <WhiteTag label={cardTag} widthClass="w-[120px]" />
                </div>

                {/* Card content */}
                <div className="flex h-[114px] flex-1 flex-col justify-between">
                  <h3
                    className={`${interRegular.className} w-full text-[16px] leading-[24px] font-normal text-white opacity-90 not-italic [word-break:break-word] line-clamp-2`}
                    data-node-id="4153:8865"
                  >
                    {cardTitle}
                  </h3>
                  <GreenCta
                    label={cardCta}
                    widthClass="w-full"
                    textSizeClass="text-[14px]"
                    disableDots={true}
                  />
                </div>

                <Corners className="z-[3]" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
