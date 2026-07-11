import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { DEVELOPER_PLATFORM_CARDS } from "./developer-platform-cards";

export function DeveloperPlatformMobile({ data }: { data?: any }) {
  const heading = data?.heading || "Build the impossible today";
  const headingLines = heading.split("\n");
  const headingLine1 = headingLines[0] || "Build the";
  const headingLine2 = headingLines.slice(1).join("\n") || "impossible today";
  const subtitle =
    data?.subtitle ||
    "Don't let legacy design limit your roadmap. Discover the market-differentiating features of the GPX10 and what's coming next.";

  // Render the same Strapi cards as desktop, falling back to the hardcoded
  // config defaults when CMS data is unavailable. Images come from Strapi via
  // mediaUrl() when present.
  const strapiCards: any[] = Array.isArray(data?.cards) ? data.cards : [];
  const cards = DEVELOPER_PLATFORM_CARDS.map((config, index) => {
    const strapiCard = strapiCards[index] || {};
    return {
      key: config.nodeId,
      title: strapiCard.title ?? config.title,
      body: strapiCard.body ?? config.body,
      imageSrc: mediaUrl(strapiCard.image) || config.imageSrc,
    };
  });
  return (
    <div className="relative w-full">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
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
            className={`${gilroyMedium.className} relative col-start-1 row-start-1 mt-[7px] ml-[3px] w-[350px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic whitespace-pre-wrap`}
            style={{
              backgroundImage:
                "linear-gradient(107.454deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
            }}
          >
            {headingLine1} <br />
            {headingLine2}
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
          className={`${interRegular.className} mt-[10px] w-[350px] text-center text-[14px] leading-[16px] font-normal text-white not-italic [word-break:break-word] px-[12px]`}
        >
          {subtitle}
        </p>

        <div className="mt-[28px] w-full flex flex-col gap-[16px] px-[24px]">
          {cards.map((card) => (
            <div
              key={card.key}
              className="relative flex flex-col border-[0.5px] border-solid border-white/20 bg-[rgba(0,0,0,0.4)] p-[20px] backdrop-blur-[12px]"
            >
              <div className="absolute -top-[0.5px] -right-[0.5px] z-10 flex size-[6px] items-center justify-center">
                <div className="rotate-180 flex-none">
                  <div className="relative size-[6px]">
                    <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
                  </div>
                </div>
              </div>
              <div className="absolute -top-[0.5px] -left-[0.5px] z-10 flex size-[6px] items-center justify-center">
                <div className="-scale-y-100 flex-none">
                  <div className="relative size-[6px]">
                    <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-[0.5px] -right-[0.5px] z-10 flex size-[6px] items-center justify-center">
                <div className="-scale-x-100 flex-none">
                  <div className="relative size-[6px]">
                    <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-[0.5px] -left-[0.5px] z-10 flex size-[6px] items-center justify-center">
                <div className="flex-none">
                  <div className="relative size-[6px]">
                    <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
                  </div>
                </div>
              </div>

              <p className={`${gilroyMedium.className} text-[18px] leading-[24px] font-medium text-white not-italic [word-break:break-word]`}>
                {card.title}
              </p>
              <p className={`${interRegular.className} mt-[8px] text-[14px] leading-[20px] font-normal text-[#f0f0f0] opacity-80 not-italic [word-break:break-word]`}>
                {card.body}
              </p>
              {card.imageSrc ? (
                <div className="relative mt-[16px] h-[180px] w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src={card.imageSrc}
                    className="absolute inset-0 size-full object-contain"
                    aria-hidden
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
