import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";

const IMAGE_GRADIENT_DESKTOP =
  "radial-gradient(683.75px 163.5px at 50% 50%, rgba(26,26,26,1) 0%, rgba(13,13,13,1) 25%, rgba(7,7,7,1) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 100%)";
const IMAGE_GRADIENT_MOBILE =
  "radial-gradient(ellipse at center, rgba(26,26,26,1) 0%, rgba(13,13,13,1) 25%, rgba(7,7,7,1) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 100%)";

const PROTOTYPE_CARDS = [
  {
    title: "The Lab",
    description:
      "Use the integrated breakout board for rapid prototyping. It includes a USB-C port for charging, a 10-pin JTAG connector, programmable LEDs, and headers for easy signal probing and power analysis.",
    image: null,
  },
  {
    title: "Production-Ready SOMs",
    description:
      "Once your software is validated, simply snap off the breakout half. The remaining 21×21mm core module embeds directly into your space-constrained product with zero hardware redesign required.",
    image: null,
  },
] as const;

const FALLBACK_HEADING = "Prototype to Product in a Snap";

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
          <img
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

export function SomPrototypeTitle({ data }: { data?: any }) {
  const heading = data?.heading || FALLBACK_HEADING;
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
  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="2438:5082"
      aria-label="Prototype to Product in a Snap"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden w-[1204px] flex-col items-center gap-[36px] pt-[100px] pb-[60px] min-[1024px]:flex">
        <div className="relative px-[10px]" data-name="Title">
          <h2
            className={`${gilroyMedium.className} text-center text-[46px] leading-[49px] font-medium text-white whitespace-nowrap not-italic [word-break:break-word]`}
          >
            {heading}
          </h2>
          <Corners />
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
      </div>

      {/* MOBILE (<1024px) */}
      <div className="relative flex w-full flex-col items-center gap-[40px] px-[24px] pt-[72px] pb-[48px] min-[1024px]:hidden">
        <div className="relative px-[10px]" data-name="Title">
          <h2
            className={`${gilroyMedium.className} text-center text-[34px] leading-[38px] font-medium text-white not-italic [word-break:break-word]`}
          >
            {heading}
          </h2>
          <Corners />
        </div>
        <div className="flex w-full flex-col gap-[24px]">
          {cards.map((card) => (
            <PrototypeCard
              key={card.title}
              title={card.title}
              description={card.description}
              widthClass="w-full"
              imageHeightClass="h-[200px]"
              imageGradient={IMAGE_GRADIENT_MOBILE}
              imageUrl={card.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
