"use client";

import { mediaUrl } from "@/lib/strapi";
import { useFitText } from "../shared/FitText";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";

const IMAGE_GRADIENT_DESKTOP =
  "radial-gradient(683.75px 163.5px at 50% 50%, rgba(26,26,26,1) 0%, rgba(13,13,13,1) 25%, rgba(7,7,7,1) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 100%)";

const PROTOTYPE_CARDS = [
  {
    title: "The Lab",
    description:
      "Use the integrated breakout board for rapid prototyping. It includes a USB-C port for charging, a 10-pin JTAG connector, programmable LEDs, and headers for easy signal probing and power analysis.",
    imageUrl: "/som/prototype-mobile-1.webp",
  },
  {
    title: "Production-Ready SOMs",
    description:
      "Once your software is validated, simply snap off the breakout half. The remaining 21×21mm core module embeds directly into your space-constrained product with zero hardware redesign required.",
    imageUrl: "/som/prototype-mobile-2.webp",
  },
] as const;

const FALLBACK_HEADING = "Prototype to Product in a Snap";

/* ----------------------------- Mobile (Figma 4046:8061) ----------------------------- */
const MOBILE_TITLE_GRADIENT_DEG = "119.172deg";
const MOBILE_PROTO_IMAGES = ["/som/prototype-mobile-1.webp", "/som/prototype-mobile-2.webp"];
const MOBILE_TITLE_STYLE = {
  backgroundImage: `linear-gradient(${MOBILE_TITLE_GRADIENT_DEG}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
} as const;

function MobilePrototypeCard({
  title,
  description,
  imageUrl,
}: {
  title: string;
  description: string;
  imageUrl?: string | null;
}) {
  return (
    <article
      className="relative flex h-[310px] w-[355px] shrink-0 flex-col items-center gap-[12px] overflow-clip border-[0.301px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] px-[12px] pt-[12px] pb-[18px]"
      data-name="Article"
    >
      <Corners />
      {/* Container (image) — 4059:9112 */}
      <div
        className="relative flex h-[198px] w-full items-center justify-center overflow-hidden rounded-[3.61px] bg-gradient-to-b from-[#0c160b] to-[rgba(12,22,11,0)]"
        data-name="Container"
      >
        {imageUrl && (
          <img loading="lazy" decoding="async"
            src={imageUrl}
            alt={title}
            className="size-full object-cover"
          />
        )}
      </div>
      {/* NewsSection — 4059:9114 */}
      <div
        className="flex w-full flex-col items-start gap-[6px]"
        data-name="NewsSection"
      >
        <h3
          className={`${gilroyMedium.className} w-full text-[14px] leading-[16.847px] font-medium text-white not-italic [word-break:break-word]`}
        >
          {title}
        </h3>
        <p
          className={`${interRegular.className} w-full text-[10px] leading-[14.441px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}
        >
          {description}
        </p>
      </div>
    </article>
  );
}

function PrototypeCard({
  title,
  description,
  widthClass,
  imageHeightClass,
  imageGradient,
  imageUrl,
}: {
  title: string;
  description: string;
  widthClass: string;
  imageHeightClass: string;
  imageGradient: string;
  imageUrl?: string | null;
}) {
  return (
    <div
      className={`relative flex flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] px-[20px] pt-[20px] pb-[32px] ${widthClass}`}
      data-name="Article"
    >
      <div
        className={`relative flex w-full items-center justify-center rounded-[6px] border border-solid border-[rgba(0,255,0,0.3)] overflow-hidden ${imageHeightClass}`}
        style={!imageUrl ? { background: imageGradient } : undefined}
        data-name="Container"
      >
        {imageUrl && (
          <img loading="lazy" decoding="async"
            src={imageUrl}
            alt={title}
            className="absolute inset-0 size-full object-cover"
          />
        )}
      </div>
      <div
        className="flex w-full flex-col items-start gap-[10px]"
        data-name="NewsSection"
      >
        <h3
          className={`${gilroyMedium.className} text-[20px] leading-[26px] font-medium text-white not-italic [word-break:break-word] min-[1024px]:text-[22px] min-[1024px]:leading-[28px]`}
        >
          {title}
        </h3>
        <p
          className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
        >
          {description}
        </p>
      </div>
      <Corners />
    </div>
  );
}

export function usePrototypeData(data?: any) {
  console.log("Prototype data received:", JSON.stringify(data, null, 2));
  const heading = data?.heading || FALLBACK_HEADING;
  const subtitle = data?.subheading || data?.subtitle || "";
  const dataCards: any[] = Array.isArray(data?.cards) ? data.cards : [];
  const cards = PROTOTYPE_CARDS.map((fb, i) => {
    const c = dataCards[i];
    if (!c) return fb;
    return {
      title: c.title || fb.title,
      description: c.description || fb.description,
      imageUrl: mediaUrl(c.image) || null,
    };
  });
  return { heading, subtitle, cards };
}

export function SomPrototypeTitleDesktop({ data }: { data?: any }) {
  const { heading, subtitle, cards } = usePrototypeData(data);
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 1 });
  return (
    <section
      className="relative hidden w-full justify-center overflow-hidden bg-black min-[1024px]:flex"
      data-node-id="2438:5082"
      aria-label="Prototype to Product in a Snap"
    >
      <div className="relative flex w-[1204px] flex-col items-center gap-[36px] pt-[40px] pb-[60px]">
        <div className="flex flex-col items-center gap-[24px] text-center">
          <div className="relative px-[10px]" data-name="Title">
            <h2
              ref={fitRef}
              className={`${gilroyMedium.className} text-center text-[46px] leading-[49px] font-medium text-white whitespace-nowrap not-italic [word-break:break-word]`}
            >
              {heading}
            </h2>
            <Corners />
          </div>
          {subtitle && (
            <p className={`${interRegular.className} max-w-[800px] text-[16px] md:text-[16px] text-[#f0f0f0]/65 [word-break:break-word] px-4`}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex w-full items-center gap-[24px]">
          {cards.map((card) => (
            <PrototypeCard
              key={card.title}
              title={card.title}
              description={card.description}
              widthClass="w-[590px]"
              imageHeightClass="h-[327px]"
              imageGradient={IMAGE_GRADIENT_DESKTOP}
              imageUrl={card.imageUrl}
            />
          ))}
        </div>
        <p className={`${interRegular.className} max-w-[800px] text-center text-[16px] md:text-[18px] text-[#f0f0f0]/65 [word-break:break-word] px-4`}>
          When you're ready for volume, the software you validate here ports 1:1 to the GPX10 Pro SOMs.
        </p>
      </div>
    </section>
  );
}

export function SomPrototypeTitleMobile({ data }: { data?: any }) {
  const { heading, subtitle, cards } = usePrototypeData(data);
  const fitRef = useFitText<HTMLHeadingElement>({});
  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black min-[1024px]:hidden pt-[30px] pb-[40px]"
      data-node-id="4046:8061"
      aria-label="Prototype to Product in a Snap"
    >
      <div
        className="relative mx-auto flex w-[393px] max-w-full flex-col items-center gap-[30px] overflow-hidden bg-black px-[19px]"
        data-name="4th Fold"
      >
        {/* Title block */}
        <div
          className="flex w-full max-w-[350px] flex-col items-center justify-center gap-[15px]"
          data-node-id="4046:8064"
        >
          <div className="relative flex w-full justify-center py-[3px]" data-name="Title">
            <Corners />
            <h2
              ref={fitRef}
              className={`${gilroyMedium.className} w-[321px] max-w-full bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={MOBILE_TITLE_STYLE}
            >
              {heading}
            </h2>
          </div>
          {subtitle && (
            <p className={`${interRegular.className} w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Cards container */}
        <div
          className="flex w-full max-w-[355px] flex-col gap-[12px]"
          data-node-id="4059:9110"
        >
          {cards.map((card, i) => (
            <MobilePrototypeCard
              key={card.title}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl || MOBILE_PROTO_IMAGES[i] || null}
            />
          ))}
        </div>
        <p className={`${interRegular.className} w-full max-w-[355px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic [word-break:break-word]`}>
          When you're ready for volume, the software you validate here ports 1:1 to the GPX10 Pro SOMs.
        </p>
      </div>
    </section>
  );
}
