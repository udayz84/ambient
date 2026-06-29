/* eslint-disable @next/next/no-img-element */
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { GradientTitle } from "../contact/contact-shared";

const TITLE_GRADIENT_DEG = "116.213deg";
const SUBTITLE =
  "Start building with the Sparsh module today, or secure your place in line for our upcoming vertical-specific SOMs.";
const HEADING_LINE_1 = "Get the Sparsh";
const HEADING_LINE_2 = "AI Module";
const DESCRIPTION =
  "Start testing motion and audio models on the metal immediately.";
const CTA_LABEL = "Request Sparsh Module";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

function RequestCta() {
  return (
    <a
      href="#"
      className={`relative flex h-[48px] w-[262px] shrink-0 items-center justify-center overflow-clip ${GREEN_CTA_SHADOW}`}
      data-name="Cta"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span
        className={`relative ${gilroyMedium.className} text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic`}
      >
        {CTA_LABEL}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
      />
      <Corners />
    </a>
  );
}

function ChipImage({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`} data-name="Chip Image">
      <img
        src="/Frame 1984079439.png"
        alt="Sparsh AI Module"
        className="absolute left-1/2 top-1/2 h-[500.691px] w-[482.876px] -translate-x-1/2 -translate-y-1/2 max-w-none object-cover"
      />
    </div>
  );
}

export function SomReadyToDeploy() {
  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      aria-label="Ready to deploy?"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden w-[1204px] flex-col items-center gap-[58px] pt-[80px] pb-[120px] min-[1024px]:flex">
        {/* Title */}
        <div className="flex flex-col items-center gap-[24px]" data-node-id="2438:5194">
          <div className="relative px-[10px]" data-name="Title">
            <GradientTitle
              gradientDeg={TITLE_GRADIENT_DEG}
              className="text-center whitespace-nowrap"
            >
              Ready to deploy?
            </GradientTitle>
            <Corners />
          </div>
          <p
            className={`${interRegular.className} w-[800px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
          >
            {SUBTITLE}
          </p>
        </div>

        {/* Body: two columns */}
        <div className="flex w-full items-center gap-[60px]">
          {/* Left: heading + description + CTA */}
          <div className="flex flex-1 flex-col items-start gap-[20px]">
            <h3
              className={`${gilroyMedium.className} text-[32px] leading-[38px] font-medium text-white not-italic [word-break:break-word]`}
            >
              {HEADING_LINE_1}
              <br />
              {HEADING_LINE_2}
            </h3>
            <p
              className={`${interRegular.className} max-w-[290px] text-[14px] leading-[24px] font-normal tracking-[-0.3125px] text-[rgba(255,255,255,0.6)] not-italic [word-break:break-word]`}
            >
              {DESCRIPTION}
            </p>
            <RequestCta />
          </div>

          {/* Right: chip image */}
          <ChipImage className="h-[446.196px] w-[430.321px] shrink-0" />
        </div>
      </div>

      {/* MOBILE (<1024px) */}
      <div className="relative flex w-full flex-col items-center gap-[40px] px-[24px] pt-[72px] pb-[80px] min-[1024px]:hidden">
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
              Ready to deploy?
            </div>
            <Corners />
          </div>
          <p
            className={`${interRegular.className} max-w-[332px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0]/80 not-italic`}
          >
            {SUBTITLE}
          </p>
        </div>

        <ChipImage className="h-[300px] w-[290px]" />

        <div className="flex w-full flex-col items-center gap-[20px]">
          <h3
            className={`${gilroyMedium.className} text-center text-[26px] leading-[32px] font-medium text-white not-italic [word-break:break-word]`}
          >
            {HEADING_LINE_1} {HEADING_LINE_2}
          </h3>
          <p
            className={`${interRegular.className} max-w-[290px] text-center text-[14px] leading-[24px] font-normal tracking-[-0.3125px] text-[rgba(255,255,255,0.6)] not-italic [word-break:break-word]`}
          >
            {DESCRIPTION}
          </p>
          <RequestCta />
        </div>
      </div>
    </section>
  );
}
