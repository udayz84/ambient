"use client";

import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import Link from "next/link";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { DEVELOPER_PLATFORM_CARDS } from "./developer-platform-cards";
import { useFitText } from "../shared/FitText";

const normalize = (value: unknown) =>
  typeof value === "string" ? value.trim().toLowerCase() : "";

const PATTERN_WIDE =
  "linear-gradient(10.9638deg, rgba(255, 255, 255, 0) 13.463%, rgb(255, 255, 255) 71.165%)";
const PATTERN_SMALL =
  "linear-gradient(24.1549deg, rgba(255, 255, 255, 0) 13.463%, rgb(255, 255, 255) 71.165%)";
const OVERLAY_WIDE =
  "linear-gradient(149.536deg, rgba(188, 229, 174, 0) 30.174%, rgb(188, 229, 174) 76.687%)";

function WideCard({
  nodeId,
  title,
  href,
  body,
  bodyWidth,
  imageSrc,
  imageVariant,
}: {
  nodeId: string;
  title: string;
  href: string;
  body: string;
  bodyWidth: number;
  imageSrc?: string;
  imageVariant?: "chipset" | "devkit";
}) {
  return (
    <div
      className="relative h-[146px] w-full shrink-0 overflow-clip"
      data-node-id={nodeId}
    >
      <div className="absolute top-0 left-0 h-[160px] w-[calc(100%+20px)] border-[0.658px] border-solid border-[rgba(255,255,255,0)] bg-[#dbe8c8]" />
      <div
        className="absolute top-[6px] left-[calc(50%-2.5px)] h-[157px] w-full -translate-x-1/2"
        style={{ backgroundImage: OVERLAY_WIDE }}
        aria-hidden
      />
      <div
        className="absolute top-[calc(50%+8.5px)] right-0 h-[163px] w-full -translate-y-1/2 opacity-[0.24]"
        style={{ backgroundImage: PATTERN_WIDE }}
        data-name="Pattern"
        aria-hidden
      />

      {imageSrc && imageVariant === "chipset" ? (
        <div
          className="absolute top-[-4px] right-0 size-[115px]"
          data-name="Chipset 1"
        >
          <Image
            src={imageSrc}
            alt=""
            fill
            className="pointer-events-none object-contain"
            sizes="115px"
          />
        </div>
      ) : null}

      {imageSrc && imageVariant === "devkit" ? (
        <div
          className="absolute top-[calc(50%+5px)] right-[-83px] h-[156px] w-[192px] -translate-y-1/2"
          data-name="image 249"
        >
          <Image
            src={imageSrc}
            alt=""
            fill
            className="pointer-events-none object-cover"
            sizes="192px"
          />
        </div>
      ) : null}

      <div
        className={`${interRegular.className} absolute bottom-[12px] left-[12px] flex flex-col justify-end text-[12px] leading-[0] font-normal text-[#0a3315] opacity-90 not-italic [word-break:break-word]`}
        style={{ width: `${bodyWidth}px` }}
      >
        <p className="leading-[15px]">{body}</p>
      </div>

      <Link
        href={href}
        className={`group ${gilroyMedium.className} absolute top-[12.15px] left-[12px] max-w-[calc(100%-24px)] text-[14px] leading-[16px] font-medium whitespace-nowrap text-[#0a3315] not-italic underline-offset-[4px] hover:underline overflow-hidden text-ellipsis [word-break:break-word]`}
      >
        {title}
        <span
          aria-hidden
          className="ml-[5px] inline-block transition-transform duration-200 group-hover:translate-x-[2px]"
        >
          →
        </span>
      </Link>

      <div className="absolute top-[32.75px] left-[12px] h-0 w-[66.553px]">
        <div className="absolute inset-[-1px_0_0_0]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            alt=""
            src="/developer-platform/line-88-mobile.svg"
            className="block size-full max-w-none"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}

function SmallCard({
  nodeId,
  title,
  href,
  titleWraps,
  body,
  bodyWidth,
}: {
  nodeId: string;
  title: string;
  href: string;
  titleWraps?: boolean;
  body: string;
  bodyWidth: number;
}) {
  return (
    <div
      className="relative h-[191px] w-[calc(50%-2.5px)] shrink-0 overflow-clip"
      data-node-id={nodeId}
    >
      <div className="absolute top-[-6px] left-[-8px] h-[192px] w-[calc(100%+16px)] border-[0.658px] border-solid border-[rgba(255,255,255,0)] bg-[#dbe8c8]" />
      <div
        className="absolute top-[calc(50%-2.5px)] right-0 h-[186px] w-[calc(100%+16px)] -translate-y-1/2 opacity-[0.24]"
        style={{ backgroundImage: PATTERN_SMALL }}
        data-name="Pattern"
        aria-hidden
      />

      <div
        className={`${interRegular.className} absolute bottom-[17px] left-[12px] flex flex-col justify-end text-[12px] leading-[0] font-normal text-[#0a3315] opacity-90 not-italic [word-break:break-word]`}
        style={{ width: `${bodyWidth}px` }}
      >
        <p className="leading-[15px]">{body}</p>
      </div>

      <div className="absolute top-[12px] left-[12px] flex w-[82px] flex-col items-start gap-[9px]">
        <Link
           href={href}
           className={`group ${gilroyMedium.className} relative shrink-0 text-[14px] leading-[16px] font-medium text-[#0a3315] not-italic underline-offset-[4px] hover:underline [word-break:break-word] ${titleWraps ? "w-[155px]" : "whitespace-nowrap"}`}
        >
        {title}
        <span
          aria-hidden
          className="ml-[5px] inline-block transition-transform duration-200 group-hover:translate-x-[2px]"
        >
          →
        </span>
        </Link>
        <div className="relative h-0 w-full shrink-0">
          <div className="absolute inset-[-1px_0_0_0]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async"
              alt=""
              src="/developer-platform/line-89.svg"
              className="block size-full max-w-none"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DeveloperPlatformMobile({ data }: { data?: any }) {
  const heading = data?.heading || "";
  const subtitle = data?.subtitle || "";

  // Match CMS cards to their design slot by title so CMS ordering can't
  // break the Figma layout; fall back to the local config defaults.
  const strapiCards: any[] = Array.isArray(data?.cards) ? data.cards : [];
  const cards = DEVELOPER_PLATFORM_CARDS.map((config, index) => {
    const strapiCard =
      strapiCards.find(
        (card) => normalize(card?.title) === normalize(config.title),
      ) ||
      strapiCards[index] ||
      {};
    return {
      key: config.nodeId,
      title: strapiCard.title ?? config.title,
      body: strapiCard.body ?? config.body,
      imageSrc: mediaUrl(strapiCard.image) || config.imageSrc,
      imageVariant: config.imageVariant,
      href: strapiCard?.cta?.href || config.href,
    };
  });
  const [explore, modelForge, evaluate, prototype, modelZoo] = cards;
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 2 });

  return (
    <div className="relative w-full">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async"
          alt=""
          src="/contact/Fractal%20Glass.png"
          className="absolute inset-0 size-full object-cover opacity-40"
        />
        <div className="absolute inset-x-0 top-0 h-[160px] bg-gradient-to-b from-black/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[160px] bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="relative flex flex-col items-center py-[48px]">
        <div className="relative inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start leading-[0]">
          <h2
            ref={fitRef}
            className={`${gilroyMedium.className} relative col-start-1 row-start-1 mt-[7px] ml-[3px] w-[350px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic`}
            style={{
              backgroundImage:
                "linear-gradient(107.454deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
            }}
          >
            {heading}
          </h2>

          <div className="relative col-start-1 row-start-1 mt-0 ml-[353.65px] flex size-[4px] items-center justify-center">
            <div className="rotate-180 flex-none">
              <div className="relative size-[4px]">
                <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                  <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
                </div>
              </div>
            </div>
          </div>
          <div className="relative col-start-1 row-start-1 mt-[70px] ml-[353.65px] flex size-[4px] items-center justify-center">
            <div className="-scale-y-100 rotate-180 flex-none">
              <div className="relative size-[4px]">
                <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                  <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
                </div>
              </div>
            </div>
          </div>
          <div className="relative col-start-1 row-start-1 mt-[70px] ml-0 size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
            </div>
          </div>
          <div className="relative col-start-1 row-start-1 mt-0 ml-0 flex size-[4px] items-center justify-center">
            <div className="-scale-y-100 flex-none">
              <div className="relative size-[4px]">
                <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                  <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
                </div>
              </div>
            </div>
          </div>
        </div>

        <p
           className={`${interRegular.className} mt-[10px] w-[350px] px-[12px] text-center text-[14px] leading-[16px] font-normal text-white not-italic [word-break:break-word]`}
        >
          {subtitle}
        </p>

        {/* Bento cards — Figma 3174:49214 (replaces the old static photo) */}
        <div className="mt-[28px] flex w-[calc(100%-24px)] max-w-[400px] flex-wrap content-start items-start gap-[5px]">
          <WideCard
            nodeId="4164:13360"
            title={explore.title}
            href={explore.href}
            body={explore.body}
            bodyWidth={220}
            imageSrc={explore.imageSrc}
            imageVariant="chipset"
          />
          <SmallCard
            nodeId="4164:13372"
            title={modelForge.title}
            href={modelForge.href}
            body={modelForge.body}
            bodyWidth={153}
          />
          <SmallCard
            nodeId="3174:49224"
            title={prototype.title}
            href={prototype.href}
            titleWraps
            body={prototype.body}
            bodyWidth={147}
          />
          <WideCard
            nodeId="3174:49240"
            title={evaluate.title}
            href={evaluate.href}
            body={evaluate.body}
            bodyWidth={229}
            imageSrc={evaluate.imageSrc}
            imageVariant="devkit"
          />
          {/* New bottom-right desktop card (Figma 5212:9564), stacked last here */}
          <SmallCard
            nodeId="5212:9564"
            title={modelZoo.title}
            href={modelZoo.href}
            titleWraps
            body={modelZoo.body}
            bodyWidth={155}
          />
        </div>
      </div>
    </div>
  );
}
