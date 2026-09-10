import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import { TagBadge } from "../hero/TagBadge";
import { gilroyMedium, interRegular } from "../hero/fonts";

export function TechnologyMobile({ data }: { data?: any }) {
  const tagText = data?.tag?.text || "";
  let heading = data?.heading || "";
  const headingLines = heading.split("\n");
  while (headingLines.length < 3) headingLines.push("");

  const features = (Array.isArray(data?.features) ? data.features : []).map((feature: any) => {
    const iconSrc = mediaUrl(feature?.icon) || "";
    return {
      iconSrc,
      title: feature?.title || "",
      description: feature?.description || "",
    };
  });

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-black"
        aria-hidden
      />

      <div className="relative flex flex-col items-center pt-[48px] pb-[48px] z-10 w-full">

        {/* Top Content with Padding */}
        <div className="flex flex-col items-center px-[24px] w-full">
          <TagBadge
            label={tagText}
            width={180}
            labelOffsetX={74.5}
            rightBarLeft={170.48046875}
          />

          <div className="relative flex w-[354px] max-w-full flex-col items-center justify-center py-[10px] mt-[16px]">
            <h2
              className={`${gilroyMedium.className} relative z-10 bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden not-italic`}
              style={{
                backgroundImage:
                  "linear-gradient(106.923deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
              }}
            >
              {headingLines[0] && <>{headingLines[0]}<br /></>}
              {headingLines[1] && <>{headingLines[1]}<br /></>}
              {headingLines[2]}
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

        {/* Edge-to-Edge Image */}
        <div 
          className="relative mt-[32px] w-full h-[184px]"
          style={{
            maskImage: "radial-gradient(ellipse at center, black 70%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 70%, transparent 100%)",
          }}
        >
          {mediaUrl(data?.image) ? (
            <Image
              src={mediaUrl(data?.image) as string}
              alt={data?.image_alt || ""}
              fill
              className="object-contain"
              sizes="100vw"
            />
          ) : null}
        </div>

        {/* Features Content with Padding */}
        <div className="flex flex-col items-center px-[24px] w-full">
          <div className="relative mt-[32px] flex w-full flex-col max-w-[350px]">
            {features.map((feature: any, index: number) => (
              <div key={index} className="relative w-full flex flex-col items-start px-[20px] border-[0.5px] border-solid border-white/20 bg-[rgba(0,0,0,0.1)] backdrop-blur-[12px] mb-[-0.5px]">
                {/* Top Right Bracket */}
                <div className="absolute -top-[0.5px] -right-[0.5px] z-10 flex size-[6px] items-center justify-center">
                  <div className="rotate-180 flex-none">
                    <div className="relative size-[6px]">
                      <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
                    </div>
                  </div>
                </div>
                {/* Top Left Bracket */}
                <div className="absolute -top-[0.5px] -left-[0.5px] z-10 flex size-[6px] items-center justify-center">
                  <div className="-scale-y-100 flex-none">
                    <div className="relative size-[6px]">
                      <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
                    </div>
                  </div>
                </div>

                {/* Bottom Right Bracket to complete the box intersections */}
                <div className="absolute -bottom-[0.5px] -right-[0.5px] z-10 flex size-[6px] items-center justify-center">
                  <div className="-scale-x-100 flex-none">
                    <div className="relative size-[6px]">
                      <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
                    </div>
                  </div>
                </div>

                {/* Bottom Left Bracket to complete the box intersections */}
                <div className="absolute -bottom-[0.5px] -left-[0.5px] z-10 flex size-[6px] items-center justify-center">
                  <div className="flex-none">
                    <div className="relative size-[6px]">
                      <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[3px] items-start py-[20px] relative w-full">
                  <div className="relative size-[33px] shrink-0">
                    {feature.iconSrc ? (
                      <img loading="lazy" decoding="async"
                        src={feature.iconSrc}
                        alt=""
                        className="absolute inset-0 size-full object-contain"
                        aria-hidden
                      />
                    ) : null}
                  </div>
                  <p
                    className={`${gilroyMedium.className} [word-break:break-word] text-[22px] leading-[38px] whitespace-nowrap text-white not-italic shrink-0 relative max-w-full overflow-hidden text-ellipsis`}
                  >
                    {feature.title}
                  </p>
                  <div className="flex flex-col items-start w-full relative shrink-0">
                    <p
                      className={`${interRegular.className} [word-break:break-word] text-[14px] leading-[22px] text-[#f0f0f0] opacity-65 not-italic w-[310px] max-w-full shrink-0 relative [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden`}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
