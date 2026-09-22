import Image from "next/image";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { TagBadge } from "../hero/TagBadge";
import { GradientTitle } from "../contact/contact-shared";
import { mediaUrl } from "@/lib/strapi";

const MOBILE_TITLE_GRADIENT =
  "linear-gradient(98.22145329235457deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const MOBILE_BG_OVERLAY =
  "linear-gradient(186.64286809298935deg, rgb(0, 0, 0) 2.1162%, rgba(0, 0, 0, 0) 41.147%), linear-gradient(174.65220349058134deg, rgba(0, 0, 0, 0) 50.755%, rgb(0, 0, 0) 94.082%)";

const SUBTITLE =
  "From microwatt edge sensors running on coin cells to air-cooled high-performance compute arrays, the GPX architecture scales seamlessly across the physical world.";

const FALLBACK_TITLE = "Intelligence in Every\nEnvironment";
const FALLBACK_TAG = "The Full Spectrum";

export function ApplicationsPageHero({ data }: { data?: any }) {
  const bgImg = mediaUrl(data?.background_image) || "/applications/hero-bg.webp";
  const titleFrame = "/applications/title-frame.svg";
  const titleText = data?.title || FALLBACK_TITLE;
  const titleLines = titleText.split("\n");
  const subtitle = data?.subtitle || SUBTITLE;
  const tagText = data?.tag?.text || FALLBACK_TAG;

  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="2438:3901"
      data-name="Desktop - 6"
      aria-label="Intelligence in Every Environment"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden h-[804px] w-full max-w-[1440px] min-[1024px]:block">
        {/* Background image 158 */}
        <div
          className="pointer-events-none absolute top-[86.27px] left-[-214.08px] h-[717.73px] w-[1828.16px]"
          data-node-id="3624:1253"
          data-name="image 158"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bgImg}
            alt=""
            className="absolute inset-0 size-full max-w-none object-contain"
            aria-hidden
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 73.028%, rgb(0, 0, 0) 83.379%), linear-gradient(180deg, rgb(0, 0, 0) 23.033%, rgba(0, 0, 0, 0) 34.001%)",
            }}
          />
        </div>

        {/* Fade the hero photo's left/right edges into the black background on
            ultrawide screens, where the 1440px image is centered with black
            side gaps (prevents a hard seam). */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 hidden w-[300px] bg-gradient-to-r from-black to-transparent min-[1441px]:block" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-[300px] bg-gradient-to-l from-black to-transparent min-[1441px]:block" />

        {/* Menu badge */}
        <div className="absolute top-[125.3125px] left-1/2 -translate-x-1/2">
          <TagBadge
            label={tagText}
            width={160}
            labelOffsetX={0}
            rightBarLeft={151.37}
            centerLabel
            nodeId="2438:3904"
          />
        </div>

        {/* Title */}
        <div
          className="absolute top-[161.3125px] left-1/2 h-[118px] w-[448px] -translate-x-1/2"
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
              src={titleFrame}
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
              {titleLines.map((line: string, i: number) => (
                <span key={i} className="block leading-[49px] [word-break:break-word]">
                  {line}
                </span>
              ))}
            </GradientTitle>
          </div>
        </div>

        {/* Subtitle */}
        <p
          className={`${interRegular.className} absolute top-[683px] left-1/2 w-[554px] -translate-x-1/2 text-center text-[18px] leading-[27px] font-normal text-[#bbb] not-italic [word-break:break-word]`}
          data-node-id="2438:3903"
        >
          {subtitle}
        </p>
      </div>

      {/* MOBILE (<1024px) — node 4032:5727, desktop above is untouched */}
      <div
        className="relative min-h-[800px] w-full overflow-hidden min-[1024px]:hidden pt-[78px] pb-[40px]"
        data-node-id="4032:5727"
        data-name="Banner"
      >
        {/* Background image 125 (offset to the right, clipped) */}
        <div
          className="pointer-events-none absolute top-[280px] right-[-143px] h-[608px] w-[1031px]"
          data-node-id="4032:5728"
          data-name="image 125"
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bgImg}
            alt=""
            className="absolute left-[15.69%] top-[4.91%] h-[88.53%] w-[104.44%] max-w-none object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ backgroundImage: MOBILE_BG_OVERLAY }}
          />
        </div>

        {/* Content frame (centered column) */}
        <div
          className="relative flex w-full flex-col items-center gap-[15px] pt-[0px]"
          data-node-id="4032:5729"
        >
          {/* Badge + Title group */}
          <div
            className="flex w-[350px] flex-col items-center gap-[10px]"
            data-node-id="4032:8617"
          >
            {/* Menu badge */}
            <div className="w-full flex justify-center">
              <TagBadge
                label={tagText}
                width={180}
                rightBarLeft={170.48}
                leftBarLeft={6.48}
                centerLabel
                nodeId="4032:8618"
              />
            </div>

            {/* Title with corner brackets */}
            <div
              className="relative h-[170px] w-[352px]"
              data-node-id="4032:8626"
              data-name="Group 78"
            >
              <div
                className={`${gilroyMedium.className} absolute left-[56px] top-[43px] w-[241px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
                style={{
                  backgroundImage: MOBILE_TITLE_GRADIENT,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
                data-node-id="4032:8627"
              >
                {titleLines.map((line: string, i: number) => (
                  <span key={i} className="block leading-[36px]">
                    {line}
                  </span>
                ))}
              </div>

              {/* Top-right bracket (Vector 55) */}
              <div className="absolute left-[351px] top-[40px] flex h-[4px] w-[2.32px] items-center justify-center">
                <div className="flex-none rotate-180">
                  <div className="relative h-[4px] w-[2.32px]">
                    <div className="absolute inset-[0_0_-12.5%_-21.56%]">
                      <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
                    </div>
                  </div>
                </div>
              </div>
              {/* Bottom-right bracket (Vector 56) */}
              <div className="absolute left-[351px] top-[147px] flex h-[4px] w-[2.32px] items-center justify-center">
                <div className="-scale-y-100 flex-none rotate-180">
                  <div className="relative h-[4px] w-[2.32px]">
                    <div className="absolute inset-[0_0_-12.5%_-21.56%]">
                      <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
                    </div>
                  </div>
                </div>
              </div>
              {/* Bottom-left bracket (Vector 57) */}
              <div className="absolute left-[-1px] top-[147px] h-[4px] w-[2.32px]">
                <div className="absolute inset-[0_0_-12.5%_-21.56%]">
                  <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
                </div>
              </div>
              {/* Top-left bracket (Vector 58) */}
              <div className="absolute left-[-1px] top-[40px] flex h-[4px] w-[2.32px] items-center justify-center">
                <div className="-scale-y-100 flex-none">
                  <div className="relative h-[4px] w-[2.32px]">
                    <div className="absolute inset-[0_0_-12.5%_-21.56%]">
                      <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <p
            className={`${interRegular.className} w-[336px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic [word-break:break-word]`}
            data-node-id="4032:5736"
          >
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
