"use client";

import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import { interRegular } from "../hero/fonts";
import { CornerDecor, GradientTitle } from "./contact-shared";

const HERO_FADE_IN_CLASS = "animate-hero-text-fade-in opacity-0";

const DEFAULT_TITLE = "Start building\nwith Ambient";
const DEFAULT_SUBTITLE =
  "Skip the generic sales inbox. Get direct access to our engineering team, technical documentation, and commercial partners.";

export function ContactHero({ data }: { data?: any }) {
  const bg = mediaUrl(data?.background_image) || "/contact/hand.png";
  let title = data?.title || DEFAULT_TITLE;
  if (title === "Start building with Ambient") {
    title = "Start building\nwith Ambient";
  }
  const titleLines = title.split("\n");
  const subtitle = data?.subtitle || DEFAULT_SUBTITLE;

  return (
    <>
      <div
        className={`pointer-events-none absolute top-0 left-1/2 z-0 h-[733px] w-[1440px] -translate-x-1/2 overflow-hidden ${HERO_FADE_IN_CLASS}`}
        data-node-id="2379:4951"
        data-name="hand"
      >
        <Image
          src={bg}
          alt=""
          fill
          className="object-cover object-bottom scale-[1.05] origin-bottom"
          sizes="(max-width: 1440px) 100vw, 2880px"
          quality={100}
          priority
          unoptimized
        />
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
          <GradientTitle nodeId="2379:4954" className="whitespace-nowrap">
            {titleLines[0] && <p className="mb-0 leading-[49px]">{titleLines[0]}</p>}
            {titleLines[1] && <p className="leading-[49px]">{titleLines[1]}</p>}
          </GradientTitle>
          <CornerDecor />
        </div>
      </div>

      <p
        className={`${interRegular.className} absolute top-[199px] left-[981px] z-10 w-[360px] text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic [word-break:break-word]`}
        data-node-id="2379:4959"
      >
        {subtitle}
      </p>
    </>
  );
}
