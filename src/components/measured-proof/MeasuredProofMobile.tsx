import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import { TagBadge } from "../hero/TagBadge";
import { gilroyMedium } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { MeasuredProofCard } from "./MeasuredProofCard";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

type FallbackCard = {
  nodeId: string;
  metric: string;
  label: string;
  description: string;
  imageSrc: string;
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
    nodeId: "mobile:1504",
    metric: "100x",
    label: "LOWER POWER CONSUMPTION",
    description:
      "Extend battery life at the edge and lower energy Opex in more compute-intensive environments",
    imageSrc: "/measured-proof/card-power.png",
    imageWidth: 270.353,
    imageHeight: 250,
    imageTop: 161,
    imageClassName:
      "absolute top-[-16.05%] left-0 h-[135.04%] w-full max-w-none",
    imageSizes: "271px",
    statWidth: 299,
    descriptionWidth: 290,
  },
  {
    nodeId: "mobile:1524",
    metric: "25x",
    label: "AI PERFORMANCE",
    description:
      "Unlock richer models, faster local inference, and more capable intelligence in constrained systems",
    imageSrc: "/measured-proof/card-ai.png",
    imageWidth: 331.144,
    imageHeight: 260,
    imageTop: 169,
    imageSizes: "332px",
    statWidth: 187,
    descriptionWidth: 319,
    statJustifyEnd: true,
  },
  {
    nodeId: "mobile:1539",
    metric: "10x",
    label: "COMPUTE DENSITY",
    description:
      "Pack more intelligence into the same footprint without scaling power and system complexity the old way",
    imageSrc: "/measured-proof/card-density.png",
    imageWidth: 305.672,
    imageHeight: 240,
    imageTop: 174.67,
    imageSizes: "306px",
    statWidth: 225,
    descriptionWidth: 317,
  },
  {
    nodeId: "mobile:1554",
    metric: "100%",
    label: "PROGRAMMABLE DESIGN",
    description:
      "Preserve the freedom to build differentiated AI systems without locking into rigid fixed-function tradeoffs",
    imageSrc: "/measured-proof/card-programmable.png",
    imageWidth: 218.055,
    imageHeight: 260,
    imageTop: 151,
    imageClassName:
      "absolute top-[-11.4%] left-[-30.32%] h-[122.8%] w-[146.43%] max-w-none",
    imageSizes: "320px",
    statWidth: 271,
    descriptionWidth: 320,
    descriptionBottom: 137.5,
    statJustifyEnd: true,
  },
];

export function MeasuredProofMobile({ data }: { data?: any }) {
  const tagText = data?.tag?.text || "Real-time AI at edge";
  const headingLines = (data?.heading || "Measured\nproof in silicon").split("\n");
  const headingLine1 = headingLines[0] || "Measured";
  const headingLine2Rest = headingLines.slice(1).join("\n") || "proof in silicon";

  const ctas: any[] = Array.isArray(data?.ctas) ? data.ctas : [];
  const find = (variant: string) =>
    ctas.find((c) => (c?.variant || "").toLowerCase() === variant);
  const primary =
    find("primary") ||
    { label: "See what we can do", href: "/technology", variant: "primary" };
  const secondary =
    find("secondary") ||
    { label: "Explore ambient store", href: "/products", variant: "secondary" };

  const cards = (Array.isArray(data?.stat_cards) && data.stat_cards.length
    ? data.stat_cards
    : DESKTOP_CARDS
  ).map((card: any, index: number) => {
    const fallback: FallbackCard = DESKTOP_CARDS[index] || ({} as FallbackCard);
    const imageSrc =
      mediaUrl(card?.image) || fallback.imageSrc || "/measured-proof/card-power.png";
    return {
      nodeId: `mobile:1504-${index}`,
      metric: card?.metric ?? fallback.metric ?? "",
      label: card?.label ?? fallback.label ?? "",
      description: card?.description ?? fallback.description ?? "",
      imageSrc,
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
    <div className="relative flex flex-col items-center px-[24px] py-[40px]">
      <div className="flex flex-col items-center gap-[16px]">
        <TagBadge
          label={tagText}
          width={210}
          labelOffsetX={89.5}
          rightBarLeft={200.48}
          centerLabel={true}
        />

        <div className="relative flex w-[354px] max-w-full flex-col items-center justify-center py-[7px]">
          <h2
            className={`${gilroyMedium.className} relative z-10 w-[244px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic`}
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

      <div className="mt-[28px] flex w-[calc(100%+48px)] -mx-[24px] px-[calc(50vw-132px)] snap-x snap-mandatory gap-[14px] overflow-x-auto pb-[8px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {DESKTOP_CARDS.map((card, index) => (
          <div
            key={card.nodeId}
            className="animate-hero-text-fade-in shrink-0 snap-center"
            style={{
              animationDelay: `${index * 100}ms`,
              animationDuration: "800ms",
              width: scaledWidth,
              height: scaledHeight,
            }}
          >
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                width: 388,
                height: 600,
              }}
            >
              <MeasuredProofCard {...(cards[index] || card)} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-[28px] flex w-full flex-row justify-center gap-[9px]">
        <a
          href={primary.href || "/technology"}
          className={`${gilroyMedium.className} relative flex h-[48px] w-[171px] items-center justify-center ${GREEN_CTA_SHADOW}`}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden z-[2] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)] rounded-[inherit]"
          />
          <p className="relative z-10 text-[13px] leading-[24px] font-medium whitespace-nowrap text-white uppercase not-italic [word-break:break-word]">
            {primary.label || "See what we can do"}
          </p>
          
          {/* Custom Corners that pop out slightly to avoid the inset shadow */}
          <div className="pointer-events-none absolute -top-[0.5px] right-0 z-20 flex size-[4px] items-center justify-center">
            <div className="rotate-180 flex-none">
              <div className="relative size-[4px]">
                <img src="/hero/corner-tag-2.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute -top-[0.5px] left-0 z-20 flex size-[4px] items-center justify-center">
            <div className="-scale-y-100 flex-none">
              <div className="relative size-[4px]">
                <img src="/hero/corner-tag-1.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute right-0 bottom-0 z-20 flex size-[4px] items-center justify-center">
            <div className="-scale-x-100 flex-none">
              <div className="relative size-[4px]">
                <img src="/hero/corner-tag-2.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 z-20 flex size-[4px] items-center justify-center">
            <div className="flex-none">
              <div className="relative size-[4px]">
                <img src="/hero/corner-tag-1.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
              </div>
            </div>
          </div>
        </a>
        <a
          href={secondary.href || "/products"}
          className={`${gilroyMedium.className} relative flex h-[48px] w-[171px] items-center justify-center overflow-clip bg-[rgba(226,241,202,0.12)]`}
        >
          <p className="relative text-[13px] leading-[24px] font-medium whitespace-nowrap text-white uppercase not-italic [word-break:break-word]">
            {secondary.label || "Explore ambient store"}
          </p>
          <Corners />
        </a>
      </div>
    </div>
  );
}
