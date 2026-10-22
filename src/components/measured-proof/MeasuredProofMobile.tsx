"use client";

import Link from "next/link";
import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import { TagBadge } from "../hero/TagBadge";
import { gilroyMedium } from "../hero/fonts";
import { MeasuredProofCard } from "./MeasuredProofCard";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { useFitText } from "../shared/FitText";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

type FallbackCard = {
  imageWidth: number;
  imageHeight: number;
  imageTop: number;
  imageClassName?: string;
  imageSizes: string;
  statWidth: number;
  descriptionWidth: number;
  descriptionBottom?: number;
  statJustifyEnd?: boolean;
};

const DESKTOP_CARDS: FallbackCard[] = [
  {
    imageWidth: 380,
    imageHeight: 350,
    imageTop: 185,
    imageClassName:
      "absolute top-[-16.05%] left-0 h-[135.04%] w-full max-w-none max-[1023px]:scale-[0.75] max-[1023px]:origin-top",
    imageSizes: "380px",
    statWidth: 299,
    descriptionWidth: 290,
  },
  {
    imageWidth: 240,
    imageHeight: 200,
    imageTop: 240,
    imageClassName: "absolute inset-0 max-w-none object-contain max-[1023px]:scale-[1.5]",
    imageSizes: "240px",
    statWidth: 187,
    descriptionWidth: 319,
    statJustifyEnd: true,
  },
  {
    imageWidth: 430,
    imageHeight: 340,
    imageTop: 200,
    imageSizes: "430px",
    statWidth: 225,
    descriptionWidth: 317,
  },
  {
    imageWidth: 300,
    imageHeight: 360,
    imageTop: 175,
    imageClassName:
      "absolute top-[-11.4%] left-[-30.32%] h-[122.8%] w-[146.43%] max-w-none",
    imageSizes: "384px",
    statWidth: 271,
    descriptionWidth: 320,
    statJustifyEnd: true,
  },
];

export function MeasuredProofMobile({ data }: { data?: any }) {
  const tagText = data?.tag?.text || "";
  const headingLines = (data?.heading || "").split("\n");
  const headingLine1 = headingLines[0] || "";
  const headingLine2Rest = headingLines.slice(1).join("\n") || "";
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 2 });

  const ctas: any[] = Array.isArray(data?.ctas) ? data.ctas : [];
  const find = (variant: string) =>
    ctas.find((c) => (c?.variant || "").toLowerCase() === variant);
  const primary = find("primary") || { variant: "primary" };

  const cards = (Array.isArray(data?.stat_cards) ? data.stat_cards : []).map((card: any, index: number) => {
    const fallback: FallbackCard = DESKTOP_CARDS[index] || ({} as FallbackCard);
    return {
      nodeId: `mobile:1504-${index}`,
      metric: card?.metric ?? "",
      label: card?.label ?? "",
      description: card?.description ?? "",
      imageSrc: mediaUrl(card?.image) || "",
      imageWidth: fallback.imageWidth ?? 331,
      imageHeight: fallback.imageHeight ?? 260,
      imageTop: fallback.imageTop ?? 169,
      imageClassName: fallback.imageClassName,
      imageSizes: fallback.imageSizes ?? "332px",
      statWidth: fallback.statWidth ?? 200,
      descriptionWidth: fallback.descriptionWidth ?? 300,
      descriptionBottom: fallback.descriptionBottom,
      statJustifyEnd: fallback.statJustifyEnd,
    };
  });

  const scale = 0.68;
  const scaledWidth = 388 * scale;
  const scaledHeight = 600 * scale;

  return (
    <div className="relative flex flex-col items-center px-[24px] md:px-[40px] py-[40px] md:py-[64px]">
      <div className="flex flex-col items-center gap-[16px] md:gap-[20px]">
        <TagBadge
          label={tagText}
          width={230}
          labelOffsetX={0}
          rightBarLeft={221}
          centerLabel={true}
          height={32}
          labelClassName="text-[15px] leading-[22px] tracking-[-0.45px]"
        />

        <div className="relative flex w-[354px] md:w-[560px] max-w-full flex-col items-center justify-center py-[7px]">
          <h2
            ref={fitRef}
            className={`${gilroyMedium.className} relative z-10 w-[244px] md:w-[480px] bg-clip-text text-center text-[36px] leading-[36px] md:text-[44px] md:leading-[48px] font-medium text-transparent [word-break:break-word] not-italic`}
            style={{
              backgroundImage:
                "linear-gradient(102.363deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
            }}
          >
            {headingLine1}<br />{headingLine2Rest}
          </h2>

          <div className="absolute top-0 right-0 flex size-[6px] items-center justify-center scale-[0.6] origin-top-right">
            <div className="rotate-180 flex-none">
              <div className="relative size-[6px]">
                <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 flex size-[6px] items-center justify-center scale-[0.6] origin-bottom-right">
            <div className="-scale-x-100 flex-none">
              <div className="relative size-[6px]">
                <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 flex size-[6px] items-center justify-center scale-[0.6] origin-bottom-left">
            <div className="flex-none">
              <div className="relative size-[6px]">
                <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-0 flex size-[6px] items-center justify-center scale-[0.6] origin-top-left">
            <div className="-scale-y-100 flex-none">
              <div className="relative size-[6px]">
                <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[28px] md:mt-[44px] flex w-[calc(100%+48px)] md:w-full -mx-[24px] md:mx-0 px-[calc(50vw-132px)] md:px-[24px] snap-x snap-mandatory gap-[14px] md:gap-[24px] overflow-x-auto pb-[8px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {cards.map((card: any, index: number) => (
          <div
            key={card.nodeId}
            className="animate-hero-text-fade-in shrink-0 snap-center w-[264px] md:w-[326px] h-[408px] md:h-[504px]"
            style={{
              animationDelay: `${index * 100}ms`,
              animationDuration: "800ms",
            }}
          >
            <div
              className="origin-top-left scale-[0.68] md:scale-[0.84] w-[388px] h-[600px]"
            >
              <MeasuredProofCard {...card} className="w-[388px]" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-[28px] flex w-full flex-row justify-center gap-[9px]">
        <Link
          href={(primary.href || "#").trim()}
          className={`${gilroyMedium.className} relative flex h-[48px] min-w-[200px] w-auto px-[24px] items-center justify-center ${GREEN_CTA_SHADOW}`}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden z-[2] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)] rounded-[inherit]"
          />
          <span className="relative z-10 max-w-full text-[14px] leading-[24px] font-medium whitespace-nowrap text-white uppercase not-italic">
            {(primary.label || "").trim()}
          </span>
          
          <GreenCtaCorners />
        </Link>
      </div>
    </div>
  );
}
