import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { GradientTitle } from "../contact/contact-shared";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

const TITLE_GRADIENT_DEG = "128.192deg";
const FALLBACK_SUBTITLE =
  "A seamless toolchain is useless if hardware can’t integrate. Move from software validation to deployment instantly with our modular edge ecosystem.";
const FALLBACK_HEADING = "Out-of-the-Box Intelligence";
const FALLBACK_CTA_LABEL = "Download Motion SOM Brief";

const CARD_BG =
  "linear-gradient(rgba(83, 216, 36, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%), linear-gradient(90deg, rgba(21, 21, 21, 0.3) 0%, rgba(21, 21, 21, 0.3) 100%)";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

const CARDS = [
  {
    title: "Motion & Fall Detection",
    description:
      "Leverage the 6-axis IMU for microwatt-level continuous activity recognition and instant fall detection.",
    image: null,
  },
  {
    title: "Voice Identity & Commands",
    description:
      "Run continuous wake-word and secure voice authentication locally via the Knowles digital mic.",
    image: null,
  },
  {
    title: "Acoustic Anomalies",
    description:
      "Deploy models for health monitoring (like asthma/cough detection) or security (assault detection) entirely on-device, preserving user privacy.",
    image: null,
  },
  {
    title: "Safety & Geofencing",
    description:
      "Utilize the onboard BLE and processing technology to trigger instant localized alerts when boundaries are breached.",
    image: null,
  },
] as const;

function IntelligenceCard({
  title,
  description,
  imageUrl,
}: {
  title: string;
  description: string;
  imageUrl?: string | null;
}) {
  return (
    <div
      className="relative flex w-full flex-col overflow-clip p-[32px] min-[1024px]:h-[336.418px] min-[1024px]:w-[320px] min-[1024px]:shrink-0 min-[1024px]:justify-end"
      style={{ backgroundImage: CARD_BG }}
      data-name="Content"
    >
      {imageUrl && (
        <div className="absolute right-[16px] top-[16px] h-[160px] w-[160px] mix-blend-screen pointer-events-none z-0">
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      )}
      <div className="relative z-10 flex w-full flex-col gap-[12px]">
        <h3
          className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
        >
          {title}
        </h3>
        <p
          className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-white opacity-65 not-italic [word-break:break-word]`}
        >
          {description}
        </p>
      </div>
      <Corners />
    </div>
  );
}

function DownloadCta({ label }: { label: string }) {
  return (
    <a
      href="#"
      className={`relative flex h-[48px] w-[281px] max-w-full shrink-0 items-center justify-center overflow-clip ${GREEN_CTA_SHADOW}`}
      data-name="Cta"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span
        className={`relative ${gilroyMedium.className} text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic`}
      >
        {label}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
      />
      <GreenCtaCorners />
    </a>
  );
}

export function SomIntelligence({ data }: { data?: any }) {
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const heading = data?.heading || FALLBACK_HEADING;
  const ctaLabel = data?.cta_label || FALLBACK_CTA_LABEL;
  const dataCards: any[] = Array.isArray(data?.cards) ? data.cards : [];
  const cards = CARDS.map((fb, i) => {
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
      data-node-id="2438:5118"
      aria-label="Out-of-the-Box Intelligence"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden flex-col items-center gap-[40px] pt-[80px] pb-[80px] min-[1024px]:flex">
        <div
          className="flex flex-col items-center gap-[24px]"
          data-node-id="2438:5119"
        >
          <div className="relative px-[10px]" data-name="Title">
            <GradientTitle
              gradientDeg={TITLE_GRADIENT_DEG}
              className="text-center whitespace-nowrap"
            >
              {heading}
            </GradientTitle>
            <GreenCtaCorners />
          </div>
          <p
            className={`${interRegular.className} w-[800px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
          >
            {subtitle}
          </p>
        </div>
        <div
          className="flex items-center gap-[24px]"
          data-name="Do the best work of your life"
        >
          {cards.map((card) => (
            <IntelligenceCard
              key={card.title}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
            />
          ))}
        </div>
        <DownloadCta label={ctaLabel} />
      </div>

      {/* MOBILE (<1024px) */}
      <div className="relative flex w-full flex-col items-center gap-[40px] px-[24px] pt-[64px] pb-[64px] min-[1024px]:hidden">
        <div className="flex w-full flex-col items-center gap-[20px]">
          <div className="relative px-[10px]">
            <div
              className={`${gilroyMedium.className} bg-clip-text text-center text-[34px] leading-[37px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: `linear-gradient(${TITLE_GRADIENT_DEG}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {heading}
            </div>
            <Corners />
          </div>
          <p
            className={`${interRegular.className} max-w-[332px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0]/80 not-italic`}
          >
            {subtitle}
          </p>
        </div>
        <div className="flex w-full flex-col gap-[24px]">
          {cards.map((card) => (
            <IntelligenceCard
              key={card.title}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
            />
          ))}
        </div>
        <DownloadCta label={ctaLabel} />
      </div>
    </section>
  );
}
