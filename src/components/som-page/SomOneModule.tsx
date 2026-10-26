/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { gilroyMedium, interRegular } from "../hero/fonts";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { TagBadge } from "../hero/TagBadge";
import { TabletScaleCanvas } from "../shared/TabletScaleCanvas";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

const APPLICATIONS = [
  {
    label: "SMART-HOME SENSOR",
    image: "/som/first.png",
  },
  {
    label: "HEARABLE",
    image: "/som/second.png",
  },
  {
    label: "WEARABLE",
    image: "/som/third.png",
  },
  {
    label: "INDUSTRIAL NODE",
    image: "/som/fourth.png",
  },
];

export function SomOneModule({ data }: { data?: any } = {}) {
  const subtitle = data?.subtitle || "ONE MODULE, MANY PRODUCTS";
  const description =
    data?.description ||
    "The same module drops into a wearable, a hearable, a smart-home sensor, or an industrial node you add only what each product needs. One qualification, one supply chain, many products.";
  const ctaLabel = data?.cta_label || "Explore Applications ->";
  const ctaHref = data?.cta_href || "/applications";

  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-black">
      {/* Desktop & Tablet scaled */}
      <div className="hidden min-[600px]:flex w-full justify-center overflow-x-clip py-[120px]">
        <TabletScaleCanvas className="relative z-10 flex w-[1440px] max-w-[1440px] shrink-0 flex-col items-center justify-center">
          <div className="flex w-full max-w-[1000px] flex-col items-center gap-[24px]">
            {/* Eyebrow */}
            <TagBadge label={subtitle} />

            {/* Title */}
            <div className="relative text-center">
              <h2 className={`${gilroyMedium.className} text-[48px] leading-[1.2] text-white`}>
                <span className="text-white">Buy it once. </span>
                <span className="bg-gradient-to-r from-[#d4e9bc] to-white bg-clip-text text-transparent">
                  Build your whole line on it.
                </span>
              </h2>
            </div>
          </div>

          {/* Applications row */}
          <div className="mx-auto mt-[60px] flex w-full max-w-[1440px] flex-row items-center justify-center gap-[40px]">
            {APPLICATIONS.map((app, i) => (
              <div key={i} className="flex flex-col items-center gap-[24px] shrink-0">
                <div className="relative h-[300px] w-[300px]">
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

          {/* Description & CTA placed under images */}
          <div className="mt-[60px] flex w-full max-w-[1000px] flex-col items-center gap-[20px]">
            <p className={`${interRegular.className} max-w-[800px] text-center text-[18px] leading-[28px] text-[#f0f0f0] opacity-80`}>
              {description}
            </p>

            <a
              href={ctaHref}
              className={`${GREEN_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-[263px] shrink-0 items-center justify-center overflow-hidden px-[20px] py-[10px] mt-[8px]`}
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
        </TabletScaleCanvas>
      </div>

      {/* Mobile (<600px) */}
      <div className="flex w-full flex-col items-center py-[60px] px-[20px] min-[600px]:hidden">
        <div className="relative z-10 flex w-full max-w-[1000px] flex-col items-center gap-[16px]">
          <TagBadge label={subtitle} />

          <div className="relative text-center">
            <h2 className={`${gilroyMedium.className} text-[36px] leading-[1.2] text-white`}>
              <span className="text-white">Buy it once. </span>
              <span className="bg-gradient-to-r from-[#d4e9bc] to-white bg-clip-text text-transparent">
                Build your whole line on it.
              </span>
            </h2>
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-[40px] flex w-full flex-col items-center justify-center gap-[32px]">
          {APPLICATIONS.map((app, i) => (
            <div key={i} className="flex flex-col items-center gap-[24px] shrink-0">
              <div className="relative h-[220px] w-[220px]">
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

        <div className="relative z-10 mt-[40px] flex w-full max-w-[1000px] flex-col items-center gap-[20px]">
          <p className={`${interRegular.className} max-w-[800px] text-center text-[16px] leading-[24px] text-[#f0f0f0] opacity-80`}>
            {description}
          </p>

          <a
            href={ctaHref}
            className={`${GREEN_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-[263px] shrink-0 items-center justify-center overflow-hidden px-[20px] py-[10px] mt-[8px]`}
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
      </div>

      {/* Background grid/dots */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20" style={{
        backgroundImage: "radial-gradient(circle at 50% 50%, rgba(56,166,18,0.2) 0%, transparent 70%)"
      }} />
    </section>
  );
}
