import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { GradientTitle, GreenCtaButton } from "../contact/contact-shared";

const TITLE_GRADIENT_DEG = "116.213deg";
const HEADING = "Validate on NuraSense. Deploy on a SOM.";
const SUBHEADING =
  "Prove your application on the NuraSense Evaluation Kit today; when the SOMs ship, your validated software drops straight in.";
const IMAGE_EVK = "/som/sparsh-chip.webp";
const IMAGE_SOM = "/som/som-chip.webp";

function SomTag({ label, available, widthClass }: { label: string; available: boolean; widthClass: string }) {
  return (
    <div
      className={`relative flex items-center justify-center h-[26px] shrink-0 overflow-clip ${available ? "bg-[rgba(115,190,91,0.8)]" : "bg-[rgba(115,190,91,0.12)] border-[0.5px] border-solid border-[rgba(240,240,240,0.4)]"} ${widthClass}`}
    >
      <Corners />
      <p className={`${dmMono.className} relative z-10 max-w-full text-[13px] leading-none font-normal tracking-[-0.39px] text-[#ecfae5] uppercase whitespace-nowrap not-italic overflow-hidden text-ellipsis mt-[1px]`}>
        {label}
      </p>
      <div className="absolute top-1/2 left-[7px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60 z-10" />
      <div className="absolute top-1/2 right-[7px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60 z-10" />
    </div>
  );
}

import { mediaUrl } from "@/lib/strapi";

export function SomDeployPath({ data }: { data?: any }) {
  const heading = data?.heading || HEADING;
  const subheading = data?.subheading || SUBHEADING;
  
  const cardsData = Array.isArray(data?.cards) && data.cards.length > 0 ? data.cards : [
    {
      title: "NuraSense EVK",
      description: "1:1 Code Portability: Prove your application on the EVK today.",
      badge_label: "Available",
      is_available: true,
      image: IMAGE_EVK
    },
    {
      title: "GPX10 Pro SOM",
      description: "1:1 Code Portability: When the SOMs ship, your software drops straight in.",
      badge_label: "Coming Soon",
      is_available: false,
      image: IMAGE_SOM
    }
  ];

  const primaryLabel = data?.primary_button?.label || "Explore Evaluation Kits ->";
  const primaryHref = data?.primary_button?.href || "#";
  const secondaryLabel = data?.secondary_button_label || "Register SOM Interest";
  const secondaryHref = data?.secondary_button_link || "#";

  return (
    <section className="relative flex w-full justify-center overflow-hidden bg-black pb-[80px] pt-[40px]">
      <div className="flex w-full max-w-[1204px] flex-col items-center gap-[48px] px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-[24px] text-center">
          <div className="relative px-[10px]">
            <GradientTitle gradientDeg={TITLE_GRADIENT_DEG} className="text-center text-[32px] md:text-[46px] leading-tight">
              {heading}
            </GradientTitle>
            <Corners />
          </div>
          <p className={`${interRegular.className} max-w-[800px] text-[16px] md:text-[18px] text-[#f0f0f0]/65 [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden`}>
            {subheading}
          </p>
        </div>

        {/* Path UI */}
        <div className="relative flex w-full flex-col lg:flex-row items-center lg:items-stretch justify-center gap-[40px] lg:gap-[24px] mt-[20px]">
          
          {cardsData.map((card: any, i: number) => {
            const fallbackImage = i === 0 ? IMAGE_EVK : IMAGE_SOM;
            const imageUrl = mediaUrl(card.image) || (typeof card.image === 'string' ? card.image : fallbackImage);
            return (
              <div key={i} className="relative flex flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] px-[20px] pt-[20px] pb-[32px] w-[590px] max-w-full z-10 flex-1">
                <div className="relative flex w-full shrink-0 items-center justify-center rounded-[6px] border border-solid border-[rgba(0,255,0,0.3)] overflow-hidden h-[327px] bg-[rgba(12,22,11,0.5)]">
                  <img loading="lazy" decoding="async" src={imageUrl} alt={card.title} className="max-w-[90%] max-h-[90%] object-contain opacity-90 blur-[1px]" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center border border-[#E2A740] bg-black/90 px-[16px] py-[12px] shadow-lg">
                    <span className={`${dmMono?.className || "font-mono"} flex items-center gap-[16px] whitespace-nowrap text-[14px] uppercase tracking-[0.1em] text-[#E2A740]`}>
                      <span>|</span>
                      <span>{card.image_overlay_label?.toUpperCase() || (card.is_available ? "AVAILABLE" : "COMING SOON")}</span>
                      <span>|</span>
                    </span>
                  </div>
                </div>
                <div className="flex w-full flex-col items-start gap-[10px] flex-grow">
                  <SomTag label={card.badge_label || "Available"} available={card.is_available ?? true} widthClass={card.is_available ? "w-[134px]" : "w-[150px]"} />
                  <h3 className={`${gilroyMedium.className} text-[20px] leading-[26px] font-medium text-white min-[1024px]:text-[22px] min-[1024px]:leading-[28px] mt-[4px] [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden`}>
                    {card.title}
                  </h3>
                  <p className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-[rgba(240,240,240,0.6)] min-[1024px]:text-[16px] min-[1024px]:leading-[24px] [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden`}>
                    {card.description}
                  </p>
                </div>
                <Corners />
                
                {/* Desktop Connector for first element only */}
                {i === 0 && (
                  <div className="absolute left-full top-1/2 flex h-[2px] w-[24px] -translate-y-1/2 items-center justify-center bg-[rgba(0,255,0,0.3)] max-[1023px]:hidden z-0">
                  </div>
                )}
              </div>
            );
          })}
          
          {/* Mobile Connector */}
          <div className="absolute left-1/2 top-[50%] flex h-[80px] w-[2px] shrink-0 items-center justify-center bg-[rgba(0,255,0,0.3)] min-[1024px]:hidden z-0 -translate-x-1/2">
          </div>
        </div>

        {/* CTA Row */}
        <div className="flex w-full flex-col sm:flex-row items-center justify-center gap-[20px] mt-[20px]">
          <GreenCtaButton width="280px" href={primaryHref}>{primaryLabel}</GreenCtaButton>
          <a
            href={secondaryHref}
            className="relative flex h-[48px] w-full sm:w-[280px] shrink-0 items-center justify-center border border-white/20 bg-black/50 hover:bg-white/5 transition-colors"
          >
            <span className={`${gilroyMedium.className} text-[14px] font-medium uppercase whitespace-nowrap text-white`}>
              {secondaryLabel}
            </span>
            <Corners />
          </a>
        </div>

      </div>
    </section>
  );
}
