"use client";

import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

import { mediaUrl } from "@/lib/strapi";

const FALLBACK_TAG = "THE GPX10 PRO SOM FAMILY";
const FALLBACK_TITLE = "One core.\nTwo ways to connect.";
const FALLBACK_SUBTITLE = "Both modules share the same GPX10 Pro compute core and software.\nThe difference is the radio — short-range Bluetooth LE or wide-area LTE.";

const CARD_BLE = {
  tag: "COMING SOON",
  title: "SOM (BLE)",
  description: "For products that connect over short range — to a phone, hub, or gateway.",
  imageUrl: "/som/som-chip.webp",
  features: [
    { icon: "/partners/icons_proof/chip.svg", text: "GPX10 Pro\ncompute core" },
    { icon: "/partners/icons_proof/cube.svg", text: "6-axis\nIMU" },
    { icon: "/technology/icon-compute.svg", text: "NOR\nflash" },
    { icon: "/partners/icons_become/rss.svg", text: "Bluetooth LE\n(Nordic nRF54)" },
  ],
  footerText: "RF is available on a u.FL connector and on an LGA RF pad, so you can use an external antenna or design one into your PCB.",
};

const CARD_LTE = {
  tag: "COMING SOON",
  title: "SOM (LTE)",
  description: "For products that need to connect anywhere, with no local gateway — remote, mobile, or wide-area deployments.",
  imageUrl: "/som/sparsh-chip.webp",
  features: [
    { icon: "/partners/icons_proof/chip.svg", text: "GPX10 Pro\ncompute core" },
    { icon: "/partners/icons_proof/cube.svg", text: "6-axis\nIMU" },
    { icon: "/technology/icon-compute.svg", text: "NOR\nflash" },
    { icon: "/partners/icons_proof/global.svg", text: "LTE\ncellular modem" },
  ],
  footerText: "",
};

const FALLBACK_CARDS = [CARD_BLE, CARD_LTE];

function PrimaryButton({ label }: { label: string }) {
  return (
    <a
      href="#"
      className="relative flex h-[48px] w-full min-[1024px]:w-auto items-center justify-center px-[24px] shadow-[0px_42px_107px_0px_rgba(83,216,36,0.15),0px_24.721px_32.257px_0px_rgba(83,216,36,0.10),0px_10.268px_13.398px_0px_rgba(83,216,36,0.10),0px_3.714px_4.846px_0px_rgba(83,216,36,0.05)] transition-transform hover:-translate-y-1"
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
      <span className={`${gilroyMedium.className} relative flex items-center gap-[8px] text-[15px] leading-[28px] font-medium uppercase text-white whitespace-nowrap not-italic`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
        {label}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
      </span>
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]" />
      <GreenCtaCorners />
    </a>
  );
}

function SecondaryButton({ label }: { label: string }) {
  return (
    <a
      href="#"
      className="relative flex h-[48px] w-full min-[1024px]:w-auto items-center justify-center overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(226,241,202,0.12)] px-[24px] py-[10px] transition-colors hover:bg-[rgba(226,241,202,0.2)]"
    >
      <span className={`${gilroyMedium.className} relative flex items-center gap-[8px] text-[15px] leading-[28px] font-medium uppercase text-white whitespace-nowrap not-italic`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        {label}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
      </span>
      <Corners />
    </a>
  );
}

function FamilyCard({ data }: { data: typeof CARD_BLE }) {
  return (
    <div className="flex flex-col gap-4 w-full min-[1024px]:max-w-[580px] flex-1">
      {/* The main card */}
      <div className="relative flex w-full flex-col flex-1 overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.4)]">
        <Corners />
        
        {/* Top section with content and image */}
        <div className="relative p-6 min-[1024px]:p-8 flex flex-col min-[1024px]:block flex-1">
          <div className="flex w-full flex-col gap-6 relative z-10">
            <div className="flex flex-col gap-2">
              {data.tag && (
                <span className={`${interRegular.className} text-[12px] uppercase tracking-widest text-[#a8ed90]`}>
                  [ {data.tag} ]
                </span>
              )}
              <h3 className={`${gilroyMedium.className} text-[28px] min-[1024px]:text-[32px] text-white`}>{data.title}</h3>
              <p className={`${interRegular.className} text-[14px] min-[1024px]:text-[16px] leading-[22px] min-[1024px]:leading-[24px] text-[rgba(255,255,255,0.7)] max-w-[280px]`}>
                {data.description}
              </p>
            </div>
          </div>
          
          {/* The image is absolutely positioned to the right on desktop, static below on mobile */}
          <div className="relative mt-8 min-[1024px]:mt-0 min-[1024px]:absolute min-[1024px]:right-[-20px] min-[1024px]:top-[40px] w-full min-[1024px]:w-[280px] h-[180px] min-[1024px]:h-[200px] pointer-events-none z-0">
            <img 
              src={data.imageUrl} 
              alt={data.title} 
              className={`w-full h-full object-contain opacity-90 ${data.tag?.toUpperCase() === "COMING SOON" || data.tag?.toUpperCase() === "UNDER-DEVELOPMENT" ? "blur-[2px] brightness-[0.3]" : ""}`} 
            />
          </div>
        </div>

        {/* The "What's inside" table inside the card */}
        <div className="flex flex-col gap-4 px-6 min-[1024px]:px-8 pb-6 min-[1024px]:pb-8 pt-6 border-t border-[rgba(240,240,240,0.1)] relative z-10 bg-black/20">
          {data.footerText && (
            <p className={`${interRegular.className} text-[12px] text-[rgba(255,255,255,0.6)] leading-[18px] mb-2`}>
              {data.footerText}
            </p>
          )}
          <h4 className={`${gilroyMedium.className} text-[14px] text-white min-[1024px]:text-[16px]`}>What&apos;s inside</h4>
          <div className="grid grid-cols-2 min-[1024px]:flex min-[1024px]:items-start gap-y-4 gap-x-2 min-[1024px]:gap-0">
            {data.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-2 min-[1024px]:gap-3 min-[1024px]:px-4 pl-0 min-[1024px]:border-l border-[rgba(240,240,240,0.15)] first:border-0 min-[1024px]:h-full">
                <span className="text-[18px] min-[1024px]:text-[20px] opacity-70 grayscale shrink-0">
                  {feat.icon.startsWith("http") || feat.icon.startsWith("/") ? (
                    <img src={feat.icon} alt="" className="w-[20px] h-[20px] object-contain" />
                  ) : (
                    feat.icon
                  )}
                </span>
                <span className={`${interRegular.className} text-[11px] min-[1024px]:text-[12px] text-[rgba(255,255,255,0.7)] leading-[14px] min-[1024px]:leading-[16px] whitespace-pre-line`}>
                  {feat.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Buttons outside the card */}
      <div className="flex flex-col min-[1024px]:flex-row items-stretch min-[1024px]:items-center min-[1024px]:justify-center gap-4 mt-2">
        <PrimaryButton label="Notify Me When Available" />
        <SecondaryButton label="Talk to Sales" />
      </div>
    </div>
  );
}

export function SomFamily({ data }: { data?: any }) {
  const tag = data?.tag || FALLBACK_TAG;
  const title = data?.title || FALLBACK_TITLE;
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  
  const dataCards: any[] = Array.isArray(data?.cards) ? data.cards : [];
  const cards = FALLBACK_CARDS.map((fb, i) => {
    const c = dataCards[i];
    if (!c) return fb;
    
    const cFeatures = Array.isArray(c.features) ? c.features : [];
    const mappedFeatures = fb.features.map((fbf, fi) => {
      const cf = cFeatures[fi];
      if (!cf) return fbf;
      return {
        icon: mediaUrl(cf.icon) || cf.icon || fbf.icon,
        text: cf.text || fbf.text,
      };
    });

    return {
      tag: c.tag !== undefined ? c.tag : fb.tag,
      title: c.title || fb.title,
      description: c.description || fb.description,
      imageUrl: mediaUrl(c.image) || fb.imageUrl,
      features: mappedFeatures,
      footerText: c.footerText !== undefined ? c.footerText : fb.footerText,
    };
  });

  return (
    <section className="relative flex w-full justify-center overflow-hidden bg-black py-[40px] min-[1024px]:py-[80px]">
      <div className="flex w-full max-w-[1200px] flex-col gap-[40px] min-[1024px]:gap-[60px] px-[16px] min-[1024px]:px-0">
        
        {/* Header Section */}
        <div className="flex flex-col items-center gap-[24px] text-center px-[10px] min-[1024px]:px-0 mb-[16px] min-[1024px]:mb-[24px]">
          <div className="relative inline-block px-[24px]">
            <h2 className={`${gilroyMedium.className} text-[36px] min-[1024px]:text-[48px] leading-[1.1] text-[#ecfae5] whitespace-pre-line`}>
              {title.replace(/\n/g, ' ')}
            </h2>
            <Corners />
          </div>
          <p className={`${interRegular.className} max-w-[700px] text-[14px] min-[1024px]:text-[16px] leading-[22px] min-[1024px]:leading-[26px] text-[rgba(255,255,255,0.6)] whitespace-pre-line`}>
            {subtitle.replace(/\n/g, ' ')}
          </p>
        </div>

        {/* Cards Row */}
        <div className="flex flex-col min-[1024px]:flex-row gap-[24px] min-[1024px]:gap-[40px] justify-between items-stretch">
          {cards.map((cardData, idx) => (
            <FamilyCard key={idx} data={cardData} />
          ))}
        </div>
      </div>
    </section>
  );
}
