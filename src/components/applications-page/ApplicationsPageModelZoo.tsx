import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { mediaUrl } from "@/lib/strapi";

const TITLE_GRADIENT =
  "linear-gradient(123.792deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const EYEBROW = "READY TO RUN";
const HEADING = "Every application here runs on real, ready models.";
const SUBTITLE =
  "Browse a growing library of open-source and Ambient-built models — tuned for GPX, deployable in one click. Don't build from scratch; start from something that works.";

const PRIMARY_CTA = { label: "Explore the Model Zoo", href: "/model-zoo" };
const SECONDARY_CTA = { label: "See it live in ApplicationForge", href: "/application-forge" };

// Placeholders for looping thumbnails. You can swap these with real model screenshots later.
const PLACEHOLDER_MODELS = [
  "/applications/wearables/legacy-way-box.jpg",
  "/applications/wearables/ambient-way-box.jpg",
  "/applications/som-img-a.webp",
  "/applications/som-img-b.webp",
];

function PrimaryCta({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="relative flex h-[48px] w-full min-[1024px]:w-auto shrink-0 items-center justify-center gap-[10px] px-[24px] py-[10px] drop-shadow-[0px_42px_53.5px_rgba(69,196,24,0.2)]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span className="relative flex items-center gap-[10px]">
        <p
          className={`${gilroyMedium.className} text-[14px] min-[1024px]:text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic`}
        >
          {label}
        </p>
        <img loading="lazy" decoding="async" alt="" aria-hidden src="/applications/som-arrow.svg" className="size-[18px]" />
      </span>
      <GreenCtaCorners />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
      />
    </a>
  );
}

function SecondaryCta({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="relative flex h-[48px] w-full min-[1024px]:w-auto shrink-0 items-center justify-center bg-[rgba(226,241,202,0.12)] px-[24px] py-[10px]"
    >
      <p
        className={`${gilroyMedium.className} text-[14px] min-[1024px]:text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic`}
      >
        {label}
      </p>
      <GreenCtaCorners />
    </a>
  );
}

export function ApplicationsPageModelZoo({ data }: { data?: any }) {
  // Multiply items to allow seamless infinite CSS scroll
  const marqueeItems = [...PLACEHOLDER_MODELS, ...PLACEHOLDER_MODELS, ...PLACEHOLDER_MODELS];

  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-black pt-[100px] pb-[80px]">
      
      {/* Header Info */}
      <div className="flex w-full max-w-[1024px] flex-col items-center gap-[24px] px-[24px] z-10 text-center">
        
        <p className={`${gilroyMedium.className} text-[#cca839] uppercase tracking-[1px] text-[12px] font-mono border-[0.5px] border-[#cca839] px-[12px] py-[4px] bg-[rgba(0,0,0,0.8)]`}>
          {EYEBROW}
        </p>

        <div className="relative inline-block px-[14px]">
          <h2
            className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] min-[1024px]:text-[46px] leading-[1.2] font-medium text-transparent not-italic`}
            style={{ backgroundImage: TITLE_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text" }}
          >
            {HEADING}
          </h2>
          <Corners />
        </div>

        <p className={`${interRegular.className} max-w-[800px] text-[16px] min-[1024px]:text-[18px] leading-[24px] min-[1024px]:leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic`}>
          {SUBTITLE}
        </p>

        {/* CTA Row */}
        <div className="mt-[16px] flex w-full min-[1024px]:w-auto flex-col min-[1024px]:flex-row items-center justify-center gap-[16px]">
          <PrimaryCta label={PRIMARY_CTA.label} href={PRIMARY_CTA.href} />
          <SecondaryCta label={SECONDARY_CTA.label} href={SECONDARY_CTA.href} />
        </div>
      </div>

      {/* Lightweight CSS Marquee Band */}
      <div className="relative mt-[60px] flex w-full overflow-hidden whitespace-nowrap group">
        {/* Left/Right Fade Gradients for Marquee */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-[100px] bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-[100px] bg-gradient-to-l from-black to-transparent" />

        <div className="animate-technology-marquee flex items-center gap-[24px] will-change-transform group-hover:[animation-play-state:paused]">
          {marqueeItems.map((src, i) => (
            <div key={i} className="relative h-[200px] w-[350px] shrink-0 overflow-hidden rounded-[8px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)]">
              <img
                src={src}
                alt="Model demo"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover opacity-80 mix-blend-screen"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
