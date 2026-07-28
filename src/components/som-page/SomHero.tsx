/* eslint-disable @next/next/no-img-element */
import { gilroyMedium, interRegular } from "../hero/fonts";
import { RepelDots } from "../shared/RepelDots";
import { Corners } from "../shared/Corners";
import { GradientTitle } from "../contact/contact-shared";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

const TITLE_GRADIENT_DEG = "106.158deg";
const FALLBACK_SUBTITLE =
  "Avoid custom RF and power management. Use our pre-engineered System-on-Modules (SOMs) for your edge AI deployments.";
const FALLBACK_TITLE = "The shortest path to\nvolume production.";
const FALLBACK_BG = "/som/hero-bg.png";
const FALLBACK_PRIMARY_LABEL = "Pre-Order / Register Interest";
const FALLBACK_SECONDARY_LABEL = "Talk to the Sales Team";
const TITLE_FRAME = "/som/title-frame.svg";

const PRIMARY_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

function PrimaryCtaCorners() {
  const wrap = "pointer-events-none absolute z-20 flex size-[4px] items-center justify-center";
  return (
    <>
      <div className={`${wrap} -top-[0.5px] left-0`}>
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <img src="/hero/corner-tag-1.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
          </div>
        </div>
      </div>
      <div className={`${wrap} -top-[0.5px] right-0`}>
        <div className="rotate-180 flex-none">
          <div className="relative size-[4px]">
            <img src="/hero/corner-tag-2.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
          </div>
        </div>
      </div>
      <div className={`${wrap} bottom-0 left-0`}>
        <div className="flex-none">
          <div className="relative size-[4px]">
            <img src="/hero/corner-tag-1.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
          </div>
        </div>
      </div>
      <div className={`${wrap} bottom-0 right-0`}>
        <div className="-scale-x-100 flex-none">
          <div className="relative size-[4px]">
            <img src="/hero/corner-tag-2.svg" alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
          </div>
        </div>
      </div>
    </>
  );
}

export function SomHero({ data }: { data?: any }) {
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const backgroundImage = FALLBACK_BG;
  const rawTitle = data?.title || FALLBACK_TITLE;
  const titleLines = (rawTitle === "The shortest path to volume production." ? "The shortest path to\nvolume production." : rawTitle).split("\n");
  const primaryLabel =
    data?.primary_button?.label || FALLBACK_PRIMARY_LABEL;
  const primaryHref = data?.primary_button?.href || "#";
  const secondaryLabel =
    data?.secondary_button?.label || FALLBACK_SECONDARY_LABEL;
  const secondaryHref = data?.secondary_button?.href || "#";
  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="3210:1545"
      data-name="Hero Section"
      aria-label="The shortest path to volume production"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden h-[703px] w-full max-w-[1442px] min-[1024px]:block">
        {/* Background image "DVK 1" */}
        <div
          className="pointer-events-none absolute top-0 left-[-23.4717px] h-[710.5659px] w-[1465.4717px]"
          data-node-id="3210:1546"
          data-name="DVK 1"
          aria-hidden
        >
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 size-full max-w-none object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(179.893deg, rgba(0, 0, 0, 0) 50%, rgb(0, 0, 0) 103.83%)",
            }}
          />
          {/* Fade left/right edges into the black background on ultrawide screens */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 hidden w-[300px] bg-gradient-to-r from-black to-transparent min-[1443px]:block"
          />
          <div
            aria-hidden
            className="absolute inset-y-0 right-0 hidden w-[300px] bg-gradient-to-l from-black to-transparent min-[1443px]:block"
          />
        </div>

        {/* Content */}
        <div
          className="absolute top-[219px] left-[80px] flex flex-col items-start gap-[20px]"
          data-node-id="3210:1547"
          data-name="Content"
        >
          {/* Title */}
          <div
            className="relative h-[118px] w-[382px] shrink-0"
            data-node-id="3210:1548"
            data-name="Title"
          >
            <div
              className="absolute top-[0.81px] left-[0.93px] h-[116px] w-[454.1943px]"
              data-node-id="3210:1549"
              data-name="Frame"
            >
              <img
                src={TITLE_FRAME}
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
            <div
              className="absolute top-[10px] left-[20.16px] not-italic"
              data-node-id="3210:1554"
            >
              <GradientTitle gradientDeg={TITLE_GRADIENT_DEG}>
                {titleLines.map((line: string, i: number) => (
                  <span
                    key={i}
                    className="block h-[49px] leading-[49px] whitespace-nowrap"
                  >
                    {line}
                  </span>
                ))}
              </GradientTitle>
            </div>
          </div>

          {/* Sub */}
          <div
            className="relative flex shrink-0 flex-col items-start gap-[24px] pl-[22px]"
            data-node-id="3210:1555"
            data-name="Sub"
          >
            <p
              className={`${interRegular.className} w-[554px] shrink-0 text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
              data-node-id="3210:1556"
            >
              {subtitle}
            </p>

            <div
              className="flex shrink-0 items-start gap-[24px]"
              data-node-id="3210:1557"
            >
              {/* Primary CTA */}
              <a
                href={primaryHref}
                className={`${gilroyMedium.className} relative h-[48px] w-[281px] shrink-0 ${PRIMARY_CTA_SHADOW}`}
                data-node-id="3210:1558"
                data-name="Cta"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
                />
                <span className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
                  <RepelDots />
                </span>
                <p
                  className="absolute left-1/2 top-[calc(50%-14px)] z-10 -translate-x-1/2 text-[16px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic [word-break:break-word]"
                  data-node-id="3210:1559"
                >
                  {primaryLabel}
                </p>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-[2] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
                />
                <PrimaryCtaCorners />
              </a>

              {/* Secondary CTA */}
              <a
                href={secondaryHref}
                className={`${gilroyMedium.className} relative h-[48px] w-[226px] shrink-0 bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]`}
                data-node-id="3210:1569"
                data-name="CTA - Secondary"
              >
                <p
                  className="absolute left-1/2 top-[calc(50%-14px)] -translate-x-1/2 text-[16px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic [word-break:break-word]"
                  data-node-id="3210:1571"
                >
                  {secondaryLabel}
                </p>
                <GreenCtaCorners />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE (<1024px) */}
      <div className="relative flex w-full flex-col min-[1024px]:hidden">
        {/* Background */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img
            src={backgroundImage}
            alt=""
            className="size-full max-w-none object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative z-10 flex w-full flex-col gap-[20px] px-[24px] pt-[100px] pb-[72px]">
          {/* Title */}
          <div
            className={`${gilroyMedium.className} bg-clip-text text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              backgroundImage: `linear-gradient(${TITLE_GRADIENT_DEG}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            {titleLines.map((line: string, i: number) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </div>

          <p
            className={`${interRegular.className} max-w-[332px] text-[14px] leading-[21px] font-normal text-[#f0f0f0]/80 not-italic`}
          >
            {subtitle}
          </p>

          <div className="mt-[8px] flex w-full flex-col gap-[16px]">
            {/* Primary CTA */}
            <a
              href={primaryHref}
              className={`${gilroyMedium.className} relative block h-[48px] w-full ${PRIMARY_CTA_SHADOW}`}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
              />
              <span className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
                <RepelDots />
              </span>
              <p className="absolute left-1/2 top-[calc(50%-14px)] z-10 -translate-x-1/2 text-[14px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic">
                {primaryLabel}
              </p>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[2] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
              />
              <PrimaryCtaCorners />
            </a>

            {/* Secondary CTA */}
            <a
              href={secondaryHref}
              className={`${gilroyMedium.className} relative block h-[48px] w-full bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]`}
            >
              <p className="absolute left-1/2 top-[calc(50%-14px)] -translate-x-1/2 text-[14px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic">
                {secondaryLabel}
              </p>
              <GreenCtaCorners />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
