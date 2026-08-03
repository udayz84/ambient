/* eslint-disable @next/next/no-img-element */
import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { GradientTitle } from "../contact/contact-shared";

const TITLE_GRADIENT_DEG = "127.627deg";
const FALLBACK_SUBTITLE =
  "Bridge the lab and real world. The Sparsh module offers continuous, microwatt intelligence in a 21×21mm size, with a breakout board that snaps off for production.";
const FALLBACK_HEADING = "Inside the Sparsh AI Module";
const FALLBACK_LABEL = "The Hardware Blueprint";
const FALLBACK_IMAGE = "/som/module-photo.png";

const IMAGE_OVERLAY_GRADIENT =
  "linear-gradient(136.703deg, rgb(76, 147, 218) 2.1612%, rgb(175, 121, 45) 100%)";

const SPECS: { title: string; body: string }[] = [
  { title: "Footprint", body: "21×21mm (Core) | 42×21mm (With Breakout)" },
  { title: "Power", body: "Optimized for months of inference on a CR2032 coin-cell." },
  { title: "Sensors", body: "Integrated 6-axis IMU & Digital Mic" },
  { title: "Comms & I/O", body: "Onboard BLE, SPI, I2C, and UART interfaces" },
];

function SpecCard({ title, body }: { title: string; body: string }) {
  return (
    <div
      className="relative flex w-full flex-col items-center overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.2)] px-[16px] pt-[16px] pb-[20px] min-[1024px]:h-[102px] min-[1024px]:pb-[24px]"
      data-name="Article"
    >
      <div className="flex w-full flex-col items-start gap-[10px]">
        <h3
          className={`${gilroyMedium.className} text-[18px] leading-[24px] font-medium text-white not-italic min-[1024px]:text-[22px] min-[1024px]:leading-[28px]`}
        >
          {title}
        </h3>
        <p
          className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-[rgba(240,240,240,0.6)] not-italic min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
        >
          {body}
        </p>
      </div>
      <Corners />
    </div>
  );
}

export function SomInsideModule({ data }: { data?: any }) {
  const subtitle = data?.subtitle || FALLBACK_SUBTITLE;
  const heading = data?.heading || FALLBACK_HEADING;
  const label = data?.label || FALLBACK_LABEL;
  const image = mediaUrl(data?.image);
  const specs: { title: string; body: string }[] = Array.isArray(data?.specs) && data.specs.length > 0
    ? data.specs.map((s: any, i: number) => {
        const fb = SPECS[i] || SPECS[0];
        return {
          title: s?.label || fb.title,
          body: s?.value || fb.body,
        };
      })
    : SPECS;
  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="2438:4964"
      data-name="Inside the Sparsh AI Module"
      aria-label="Inside the Sparsh AI Module"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden w-[1192.509px] flex-col items-center gap-[48px] pt-[80px] pb-[40px] min-[1024px]:flex">
        {/* Header */}
        <div
          className="flex w-[800px] flex-col items-center gap-[24px]"
          data-node-id="2438:4965"
        >
          <div className="relative px-[10px]" data-node-id="2438:4967" data-name="Title">
            <GradientTitle gradientDeg={TITLE_GRADIENT_DEG} className="text-center">
              {heading}
            </GradientTitle>
            <Corners />
          </div>
          <p
            className={`${interRegular.className} w-[679.389px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
            data-node-id="2438:4973"
          >
            {subtitle}
          </p>
        </div>

        {/* Body */}
        <div className="flex w-full items-start gap-[24px]" data-node-id="2438:4974">
          {/* Left: module photo card */}
          <div
            className="relative flex h-[542.191px] w-[590.509px] shrink-0 flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] pt-[10px] px-[16px] pb-[20px]"
            data-node-id="2438:4975"
            data-name="Article"
          >
            <div
              className="relative h-[464.191px] w-[558.509px] shrink-0 overflow-hidden"
              data-node-id="2438:4976"
            >
              {image && (
                <img
                  src={image}
                  alt=""
                  className="absolute inset-0 size-full max-w-none object-contain"
                />
              )}
            </div>
            {/* Decorative overlays on the module photo */}
            <div
              aria-hidden
              className="absolute left-[163.479px] top-[236.232px] h-[121.389px] w-[132.8px] mix-blend-plus-lighter"
              style={{ backgroundImage: IMAGE_OVERLAY_GRADIENT }}
            />
            <p
              className={`${gilroyMedium.className} min-w-full w-full text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
              data-node-id="2438:4981"
            >
              {label}
            </p>
            <Corners />
          </div>

          {/* Right: spec cards column */}
          <div
            className="flex w-[578px] shrink-0 flex-col justify-between self-stretch"
            data-node-id="2438:4984"
          >
            {specs.map((spec) => (
              <SpecCard key={spec.title} {...spec} />
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE (<1024px) */}
      <div className="relative flex w-full flex-col items-center gap-[40px] px-[24px] pt-[64px] pb-[64px] min-[1024px]:hidden">
        {/* Header */}
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

        {/* Body */}
        <div className="flex w-full flex-col gap-[24px]">
          {/* Module photo card */}
          <div className="relative flex w-full flex-col items-center gap-[16px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] pt-[10px] px-[16px] pb-[20px]">
            <div className="relative h-[200px] w-full shrink-0 overflow-hidden">
              {image && (
                <img
                  src={image}
                  alt="Sparsh AI Module"
                  className="absolute inset-0 size-full object-cover"
                />
              )}
            </div>
            <p
              className={`${gilroyMedium.className} min-w-full w-full text-[20px] leading-[26px] font-medium text-white not-italic`}
            >
              {label}
            </p>
            <Corners />
          </div>

          {/* Spec cards */}
          <div className="flex w-full flex-col gap-[16px]">
            {specs.map((spec) => (
              <SpecCard key={spec.title} {...spec} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
