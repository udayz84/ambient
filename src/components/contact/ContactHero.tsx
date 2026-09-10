"use client";

import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import { interRegular } from "../hero/fonts";
import { CornerDecor, GradientTitle } from "./contact-shared";

const HERO_FADE_IN_CLASS = "animate-hero-text-fade-in [animation-duration:300ms] opacity-0";

export function ContactHero({ data }: { data?: any }) {
  const bg = mediaUrl(data?.background_image);
  const title = data?.title || "";
  const titleLines = title.split("\n");
  const subtitle = data?.subtitle || "";

  return (
    <>
      <div
        className={`pointer-events-none absolute top-0 left-1/2 z-0 h-[733px] w-[1440px] -translate-x-1/2 overflow-hidden ${HERO_FADE_IN_CLASS}`}
        data-node-id="2379:4951"
        data-name="hand"
      >
        {bg ? (
          <Image
            src={bg}
            alt={data?.background_image_alt || ""}
            fill
            className="object-cover object-bottom scale-[1.05] origin-bottom"
            sizes="(max-width: 1440px) 100vw, 2880px"
            quality={100}
            priority
            unoptimized
          />
        ) : null}
      </div>

      <div
        className="absolute top-[171px] left-[118px] z-10 flex w-[306px] flex-col items-center"
        data-node-id="2379:4952"
        data-name="Section Title"
      >
        <div
          className="relative flex flex-col items-center px-[10px]"
          data-node-id="2379:4953"
          data-name="Title"
        >
          <GradientTitle nodeId="2379:4954" className="text-center">
            {titleLines[0] && <p className="mb-0 leading-[49px] [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] overflow-hidden">{titleLines[0]}</p>}
            {titleLines[1] && <p className="leading-[49px] [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] overflow-hidden">{titleLines[1]}</p>}
          </GradientTitle>
          <CornerDecor />
        </div>
      </div>

      <p
        className={`${interRegular.className} absolute top-[199px] left-[981px] z-10 w-[360px] text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden`}
        data-node-id="2379:4959"
      >
        {subtitle}
      </p>
    </>
  );
}
