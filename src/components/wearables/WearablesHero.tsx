"use client";

/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFadeIn, getFadeInClass } from "../shared/useFadeIn";
import { useFitText, splitTitleIntoTwoLines } from "../shared/FitText";
import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, interRegular, gilroyExtraBold } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { TabletScaleCanvas } from "../shared/TabletScaleCanvas";

const WEARABLES_BG_GRADIENT =
  "linear-gradient(260.505deg, rgba(255, 255, 255, 0.12) 0.12143%, rgba(255, 255, 255, 0.6) 44.084%, rgba(255, 255, 255, 0) 113.37%)";

const TITLE_GRADIENT =
  "linear-gradient(104.008deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const FALLBACK_TITLE = "Clinical precision.\nCoin-cell power.";

function PrimaryCta({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className={`${gilroyMedium.className} relative flex h-[48px] min-w-[251px] w-auto shrink-0 cursor-pointer items-center justify-center px-[24px] overflow-hidden shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
      data-node-id="2509:389"
      data-name="Cta"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <GreenCtaCorners />
      <span className="relative z-10 whitespace-nowrap text-[16px] leading-[28px] font-medium text-white uppercase not-italic">
        {label}
      </span>
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
      className={`${gilroyMedium.className} relative flex h-[48px] shrink-0 cursor-pointer items-center border border-white/20 bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]`}
      data-node-id="2509:400"
      data-name="CTA - Secondary"
    >
      <span className="whitespace-nowrap text-[16px] leading-[28px] font-medium text-white uppercase not-italic">
        {label}
      </span>
      <Corners
        leftSrc="/applications/wearables/vector-42.svg"
        rightSrc="/applications/wearables/vector-43.svg"
      />
    </a>
  );
}

export function WearablesHero({
  data,
}: {
  data?: any;
}) {
  const subtitle = data?.subtitle || "";
  const watermark = data?.watermark || "";
  const rawTitle = data?.title || FALLBACK_TITLE;
  const titleLines = splitTitleIntoTwoLines(rawTitle);
  const bg1 = mediaUrl(data?.background_image_1) || "";
  const bg2 = mediaUrl(data?.background_image_2) || "";
  const primaryLabel = data?.primary_button?.label || "";
  const primaryHref = data?.primary_button?.href || "#";
  const secondaryLabel = data?.secondary_button?.label || "";
  const secondaryHref = data?.secondary_button?.href || "#";
  
  const { fadeRef: desktopRef, isVisible: desktopVisible } = useFadeIn();
  useFadeIn();

  const fitRef = useFitText<HTMLDivElement>({ maxLines: 2, floor: 32 });
  const fitRef2 = useFitText<HTMLDivElement>({ maxLines: 2, floor: 22 });
  const fitRef3 = useFitText<HTMLParagraphElement>({ maxLines: 1 });
  const fitRef4 = useFitText<HTMLParagraphElement>({ maxLines: 1 });

  return (
    <section
      className="relative -mt-[78px] flex w-full justify-center overflow-hidden bg-black"
      data-node-id="2509:372"
      data-name="Hero Section"
      aria-label="Wearables hero"
    >
      {/* DESKTOP (>=600px) */}
      <TabletScaleCanvas className="relative hidden h-[878px] w-[1440px] shrink-0 min-[600px]:block">
        {/* Background image 162 */}
        <div
          className="pointer-events-none absolute top-[-37px] left-0 h-[824.693px] w-[1440px]"
          data-node-id="2509:373"
          data-name="image 162"
        >
          {bg1 && <img
            src={bg1}
            alt=""
            className="absolute inset-0 size-full max-w-none object-cover"
            aria-hidden
          />}
        </div>

        {/* "Wearables" oversized background text */}
        <div
          className="pointer-events-none absolute top-[122.92px] left-1/2 -translate-x-1/2"
          data-node-id="2509:374"
          data-name="BG"
        >
          <p
            ref={fitRef3}
            className={`${gilroyExtraBold.className} whitespace-nowrap bg-clip-text text-center text-[200px] leading-[210px] tracking-[0.5px] font-extrabold text-transparent uppercase not-italic [word-break:break-word]`}
            style={{
              backgroundImage: WEARABLES_BG_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2509:376"
          >
            {watermark}
          </p>
        </div>

        {/* Foreground image 163 with gradient overlay — 2509:377 (top=-62.65) */}
        <div
          ref={desktopRef}
          className={`pointer-events-none absolute top-[-62.65px] left-0 h-[876px] w-[1440px] ${getFadeInClass(desktopVisible)}`}
          data-node-id="2509:377"
          data-name="image 163"
          aria-hidden
        >
          {bg2 && <img
            src={bg2}
            alt=""
            className="absolute inset-0 size-full max-w-none object-cover"
          />}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-60% to-black/90" />
        </div>

        {/* Subtle edge blending */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-0 w-[60px] bg-gradient-to-r from-black/40 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[60px] bg-gradient-to-l from-black/40 to-transparent" />

        {/* Foreground Content Wrapper */}
        <div className="relative mt-[78px] h-[800px] w-full">

        {/* Title — "Clinical precision. Coin-cell power." */}
        <div
          className="absolute bottom-[158px] left-[98px] flex flex-col items-start"
          data-node-id="2509:378"
          data-name="Content"
        >
          <div
            className="relative flex min-h-[118px] w-fit min-w-[411px] max-w-[620px] shrink-0 items-center justify-center px-[28px] py-[10px]"
            data-node-id="2509:379"
            data-name="Title"
          >
            <div
              className="pointer-events-none absolute inset-0 size-full"
              data-node-id="2509:380"
              data-name="Frame"
            >
              <img
                src="/applications/wearables/title-frame.svg"
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
            <div
              ref={fitRef}
              className={`${gilroyMedium.className} relative w-full text-center text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              data-node-id="2509:385"
            >
              {titleLines.map((line: string, i: number) => (
                <span
                  key={i}
                  className="block leading-[49px] whitespace-nowrap"
                >
                  {line}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Subtitle + CTAs */}
        <div
          className="absolute top-[569px] left-[790px] flex w-[590px] flex-col items-start gap-[12px] pl-[22px]"
          data-node-id="2509:386"
          data-name="Sub"
        >
          <p
            className={`${interRegular.className} w-[591.92px] shrink-0 text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
            data-node-id="2509:387"
          >
            {subtitle}
          </p>
          <div
            className="flex shrink-0 items-start gap-[24px]"
            data-node-id="2509:388"
          >
            <PrimaryCta label={primaryLabel} href={primaryHref} />
            <SecondaryCta label={secondaryLabel} href={secondaryHref} />
          </div>
          </div>
        </div>
      </TabletScaleCanvas>

      {/* MOBILE (<600px) — node 4153:9901, frame 393×630 */}
      <div
        className="relative h-[630px] w-full overflow-hidden min-[600px]:hidden"
        data-node-id="4153:9901"
        data-name="Banner"
      >
        {/* Header: title + subtitle (node 4153:10651 at top-5) */}
        <div className="absolute left-1/2 top-[5px] z-10 flex w-[352px] -translate-x-1/2 flex-col items-center gap-[15px]">
          {/* Title with corner brackets */}
          <div className="relative h-[80px] w-[352px]" data-name="Group 78">
            <div
              ref={fitRef2}
              className={`${gilroyMedium.className} absolute inset-0 flex flex-col items-center justify-center bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage:
                  "linear-gradient(112.51485485760136deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              data-node-id="4153:10653"
            >
              {titleLines.map((line: string, i: number) => (
                <span key={i} className="block leading-[36px] whitespace-nowrap">{line}</span>
              ))}
            </div>

            <div className="absolute left-[349.68px] top-0 flex h-[2.783px] w-[2.32px] items-center justify-center">
              <div className="flex-none rotate-180">
                <div className="relative h-[2.783px] w-[2.32px]">
                  <div className="absolute inset-[0_0_-17.97%_-21.56%]">
                    <img alt="" aria-hidden src="/hero/corner-tag-2.svg" className="block size-full max-w-none" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute left-[349.68px] top-[77.22px] flex h-[2.783px] w-[2.32px] items-center justify-center">
              <div className="-scale-y-100 flex-none rotate-180">
                <div className="relative h-[2.783px] w-[2.32px]">
                  <div className="absolute inset-[0_0_-17.97%_-21.56%]">
                    <img alt="" aria-hidden src="/hero/corner-tag-2.svg" className="block size-full max-w-none" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute left-0 top-[77.22px] h-[2.783px] w-[2.32px]">
              <div className="absolute inset-[0_0_-17.97%_-21.56%]">
                <img alt="" aria-hidden src="/hero/corner-tag-1.svg" className="block size-full max-w-none" />
              </div>
            </div>
            <div className="absolute left-0 top-0 flex h-[2.783px] w-[2.32px] items-center justify-center">
              <div className="-scale-y-100 flex-none">
                <div className="relative h-[2.783px] w-[2.32px]">
                  <div className="absolute inset-[0_0_-17.97%_-21.56%]">
                    <img alt="" aria-hidden src="/hero/corner-tag-1.svg" className="block size-full max-w-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <p
            className={`${interRegular.className} w-[336px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
            data-node-id="4153:10658"
          >
            {subtitle}
          </p>
        </div>

        {/* Product image with watermark (node 4153:10666 at top-168) */}
        <div
          className="absolute left-1/2 top-[168px] h-[300px] w-[508px] -translate-x-1/2 overflow-hidden"
          data-node-id="4153:10666"
        >
          {/* Image 162 — base product photo */}
          {bg1 && <img
            src={bg1}
            alt=""
            className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
            aria-hidden
          />}

          {/* Watermark text */}
          <div
            className="pointer-events-none absolute left-1/2 top-[56.42px] -translate-x-1/2"
            data-name="BG"
          >
            <p
              ref={fitRef4}
              className={`${gilroyExtraBold.className} whitespace-nowrap bg-clip-text text-center text-[70.559px] leading-[74.087px] tracking-[0.1764px] font-extrabold text-transparent uppercase not-italic`}
              style={{
                backgroundImage: WEARABLES_BG_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              data-node-id="4153:10670"
            >
              {watermark}
            </p>
          </div>

          {/* Image 163 overlay with gradient fades */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0)] from-[69.488%] to-black to-[96.665%]" />
            <div className="absolute inset-0 overflow-hidden">
              {bg2 && <img
                src={bg2}
                alt=""
                className="absolute left-0 top-[-6.07%] h-[109.08%] w-full max-w-none object-cover"
              />}
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black from-[4.128%] to-[rgba(0,0,0,0)] to-[24.636%]" />
          </div>
        </div>

        {/* CTAs (node 4153:9915 at top-508) */}
        <div className="absolute left-1/2 top-[508px] z-10 flex -translate-x-1/2 flex-col items-center gap-[16px]">
          {/* Primary CTA */}
          <a
            href={primaryHref}
            className={`${gilroyMedium.className} relative flex h-[48px] min-w-[263px] w-auto max-w-[calc(100vw-32px)] px-[20px] shrink-0 cursor-pointer items-center justify-center overflow-hidden shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
            data-node-id="4153:9916"
            data-name="Cta"
          >
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
            <GreenCtaCorners />
            <span className="relative z-10 whitespace-nowrap text-[16px] leading-[28px] font-medium text-white uppercase not-italic">
              {primaryLabel}
            </span>
            <span aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]" />
          </a>

          {/* Secondary CTA */}
          <a
            href={secondaryHref}
            className={`${gilroyMedium.className} relative flex h-[48px] shrink-0 cursor-pointer items-center justify-center bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]`}
            data-node-id="4153:9927"
            data-name="CTA - Secondary"
          >
            <span className="relative whitespace-nowrap text-[16px] leading-[28px] font-medium text-white uppercase not-italic">
              {secondaryLabel}
            </span>
            <Corners
              leftSrc="/applications/wearables/vector-42.svg"
              rightSrc="/applications/wearables/vector-43.svg"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
