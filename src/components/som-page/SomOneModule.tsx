import { gilroyMedium, interRegular } from "../hero/fonts";
import { GradientTitle, CornerDecor } from "../contact/contact-shared";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { TagBadge } from "../hero/TagBadge";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

const APPLICATIONS = [
  {
    label: "WEARABLE",
    image: "/applications/app-wearables.png",
  },
  {
    label: "HEARABLE",
    image: "/applications/app-hearables.png",
  },
  {
    label: "SMART-HOME SENSOR",
    image: "/applications/app-smart-home.png",
  },
  {
    label: "INDUSTRIAL NODE",
    image: "/applications/app-industrial.png",
  },
];

export function SomOneModule({ data }: { data?: any } = {}) {
  const subtitle = data?.subtitle || "ONE MODULE, MANY PRODUCTS";
  const title = data?.title || "Buy it once. Build your whole line on it.";
  const description =
    data?.description ||
    "The same module drops into a wearable, a hearable, a smart-home sensor, or an industrial node — you add only what each product needs. One qualification, one supply chain, many products.";
  const ctaLabel = data?.cta_label || "Explore Applications ->";
  const ctaHref = data?.cta_href || "/applications";

  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-black py-[60px] px-[20px] min-[1024px]:py-[120px]">
      <div className="relative z-10 flex w-full max-w-[1000px] flex-col items-center gap-[16px] min-[1024px]:gap-[24px]">
        {/* Eyebrow */}
        <TagBadge label={subtitle} />

        {/* Title */}
        <div className="relative text-center">
          <h2 className={`${gilroyMedium.className} text-[36px] leading-[1.2] text-white min-[1024px]:text-[48px]`}>
            <span className="text-white">Buy it once. </span>
            <span className="bg-gradient-to-r from-[#d4e9bc] to-white bg-clip-text text-transparent">
              Build your whole line on it.
            </span>
          </h2>
        </div>

        {/* Description */}
        <p className={`${interRegular.className} max-w-[800px] text-center text-[16px] leading-[24px] text-[#f0f0f0] opacity-80 min-[1024px]:text-[18px] min-[1024px]:leading-[28px]`}>
          {description}
        </p>

        {/* CTA */}
        <a
          href={ctaHref}
          className={`${GREEN_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-[263px] shrink-0 items-center justify-center overflow-hidden px-[20px] py-[10px] mt-[16px]`}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
          />
          <span className="relative not-italic text-[16px] font-medium uppercase whitespace-nowrap leading-[28px] text-white">
            {ctaLabel}
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
          />
          <GreenCtaCorners />
        </a>
      </div>

      {/* Carousel / Grid of Applications */}
      <div className="relative z-10 mx-auto mt-[40px] flex w-full max-w-[1440px] flex-col items-center justify-center gap-[32px] min-[1024px]:mt-[80px] min-[1024px]:flex-row min-[1024px]:gap-[40px]">
        {APPLICATIONS.map((app, i) => (
          <div key={i} className="flex flex-col items-center gap-[24px] shrink-0">
              <div className="relative h-[220px] w-[220px] min-[1024px]:h-[300px] min-[1024px]:w-[300px]">
                {/* Green glow behind image */}
                <div className="absolute left-1/2 top-1/2 h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#38a612] opacity-20 blur-[40px]" />
                <img
                  src={app.image}
                  alt={app.label}
                  className="relative h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col items-center gap-[8px]">
                <p className={`${gilroyMedium.className} text-[14px] uppercase tracking-[0.1em] text-white`}>
                  {app.label}
                </p>
                <div className="h-[2px] w-[24px] bg-[#38a612]" />
              </div>
            </div>
          ))}
      </div>
      
      {/* Background grid/dots similar to the image */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20" style={{
        backgroundImage: "radial-gradient(circle at 50% 50%, rgba(56,166,18,0.2) 0%, transparent 70%)"
      }} />
    </section>
  );
}
