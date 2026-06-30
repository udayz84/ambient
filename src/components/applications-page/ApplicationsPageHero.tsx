import { gilroyMedium, interRegular } from "../hero/fonts";
import { TagBadge } from "../hero/TagBadge";
import { GradientTitle } from "../contact/contact-shared";

const TITLE_GRADIENT =
  "linear-gradient(105.388deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const SUBTITLE =
  "From microwatt edge sensors running on coin cells to air-cooled high-performance compute arrays, the GPX architecture scales seamlessly across the physical world.";

export function ApplicationsPageHero() {
  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="2438:3901"
      data-name="Desktop - 6"
      aria-label="Intelligence in Every Environment"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden h-[804px] w-full max-w-[1440px] min-[1024px]:block">
        {/* Background image 157 */}
        <div
          className="pointer-events-none absolute top-[124.3125px] left-0 h-[720px] w-[1440px]"
          data-node-id="2438:3902"
          data-name="image 157"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/applications/hero-bg.png"
            alt=""
            className="absolute inset-0 size-full max-w-none object-cover"
            aria-hidden
          />
        </div>

        {/* Fade the hero photo's left/right edges into the black background on
            ultrawide screens, where the 1440px image is centered with black
            side gaps (prevents a hard seam). */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 hidden w-[300px] bg-gradient-to-r from-black to-transparent min-[1441px]:block" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-[300px] bg-gradient-to-l from-black to-transparent min-[1441px]:block" />

        {/* Menu badge */}
        <div className="absolute top-[145.3125px] left-1/2 -translate-x-1/2">
          <TagBadge
            label="The Full Spectrum"
            width={160}
            labelOffsetX={0}
            rightBarLeft={151.37}
            centerLabel
            nodeId="2438:3904"
          />
        </div>

        {/* Title */}
        <div
          className="absolute top-[191.3125px] left-1/2 h-[118px] w-[448px] -translate-x-1/2"
          data-node-id="2438:3912"
          data-name="Title"
        >
          <div
            className="absolute left-[0.82px] top-[0.81px] h-[116px] w-[447.0625px]"
            data-node-id="2438:3913"
            data-name="Frame"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/applications/title-frame.svg"
              alt=""
              className="block size-full max-w-none"
              aria-hidden
            />
          </div>
          <div
            className="absolute top-[10px] left-1/2 h-[98px] w-[417px] -translate-x-1/2 text-center"
            data-node-id="2438:3918"
          >
            <GradientTitle gradientDeg="105.388deg" className="text-center">
              <span className="block h-[49px] leading-[49px] whitespace-nowrap">
                Intelligence in Every
              </span>
              <span className="block h-[49px] leading-[49px] whitespace-nowrap">
                Environment
              </span>
            </GradientTitle>
          </div>
        </div>

        {/* Subtitle */}
        <p
          className={`${interRegular.className} absolute top-[643px] left-1/2 w-[554px] -translate-x-1/2 text-center text-[18px] leading-[27px] font-normal text-[#bbb] not-italic [word-break:break-word]`}
          data-node-id="2438:3903"
        >
          {SUBTITLE}
        </p>
      </div>

      {/* MOBILE (<1024px) */}
      <div className="relative flex min-h-[560px] w-full flex-col items-center overflow-hidden min-[1024px]:hidden">
        {/* Background image */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/applications/hero-bg.png"
            alt=""
            className="size-full max-w-none object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative z-10 flex w-full flex-col items-center gap-[24px] px-[24px] pt-[72px] pb-[72px]">
          <TagBadge
            label="The Full Spectrum"
            width={160}
            labelOffsetX={0}
            rightBarLeft={151.37}
            centerLabel
            nodeId="2438:3904"
          />

          <div
            className={`${gilroyMedium.className} w-full bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              backgroundImage: TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            <span className="block whitespace-nowrap">Intelligence in Every</span>
            <span className="block whitespace-nowrap">Environment</span>
          </div>

          <p
            className={`${interRegular.className} w-full max-w-[332px] text-center text-[14px] leading-[21px] font-normal text-[#bbb] not-italic`}
          >
            {SUBTITLE}
          </p>
        </div>
      </div>
    </section>
  );
}
