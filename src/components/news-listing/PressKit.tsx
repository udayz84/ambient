"use client";

import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import {
  dmMono,
  gilroyMedium,
  interBold,
  interRegular,
} from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { useFitText } from "../shared/FitText";

const BADGE_GRADIENT =
  "linear-gradient(135deg, rgb(229, 231, 235) 0%, rgb(209, 213, 220) 100%)";

const GREEN_GLOW_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

const FALLBACK_ICON = "/news-listing/press-icon.svg";
const PRESS_TITLE_FRAME = "/news-listing/press-title-frame.svg";

type PressKitProps = {
  data?: any;
};

function PressTitle({ heading }: { heading: string }) {
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 2 });
  return (
    <div
      className="relative w-full min-[1024px]:h-[63px] min-[1024px]:w-[539px] min-[1024px]:shrink-0"
      data-node-id="2500:1663"
    >
      <h2
        ref={fitRef}
        className={`${gilroyMedium.className} relative w-full bg-clip-text bg-[linear-gradient(107.4537261117953deg,rgb(255,255,255)_1.3527%,rgb(212,233,188)_55.161%,rgb(255,255,255)_111.67%)] min-[1024px]:bg-[linear-gradient(123.792deg,rgb(255,255,255)_1.3527%,rgb(212,233,188)_55.161%,rgb(255,255,255)_111.67%)] text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word] mt-[7px] min-[1024px]:mt-0 min-[1024px]:absolute min-[1024px]:left-1/2 min-[1024px]:top-[7px] min-[1024px]:-translate-x-1/2 min-[1024px]:text-[46px] min-[1024px]:leading-[49px]`}
        style={{
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
        data-node-id="2500:1664"
      >
        {heading}
      </h2>
      <div
        className="pointer-events-none absolute inset-0 min-[1024px]:left-[1px] min-[1024px]:top-[0.73px] min-[1024px]:h-[61.475px] min-[1024px]:w-[537px]"
        data-node-id="2500:1665"
        data-name="Frame"
        aria-hidden
      >
        <div className="absolute inset-[-0.81%_0]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            src={PRESS_TITLE_FRAME}
            alt=""
            className="block size-full max-w-none"
          />
        </div>
      </div>
    </div>
  );
}

function PressMenu({ label }: { label: string }) {
  return (
    <div
      className="relative flex h-[26px] w-[150px] min-[1024px]:w-[180px] shrink-0 items-center justify-center overflow-clip min-[1024px]:border min-[1024px]:border-solid min-[1024px]:border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.06)]"
      data-name="Menu"
    >
      <Corners />

      {/* Vertical bars */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[6.48px] top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[141.48px] min-[1024px]:left-[170.48px] top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60"
      />

      <p
        className={`${dmMono.className} max-w-full text-[12px] min-[1024px]:text-[13px] leading-[19.5px] min-[1024px]:leading-[13px] font-normal tracking-[-0.36px] min-[1024px]:tracking-[-0.39px] whitespace-nowrap text-[#ecfae5] uppercase not-italic overflow-hidden text-ellipsis min-[1024px]:pt-px`}
      >
        {label}
      </p>
    </div>
  );
}

function PressCta({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      download
      aria-disabled={href === "#"}
      className={`${gilroyMedium.className} ${GREEN_GLOW_SHADOW} relative flex h-[48px] w-[231px] min-[1024px]:w-[267px] shrink-0 items-center justify-center`}
      data-node-id="2500:1671"
      data-name="Cta"
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-white" />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[length:307.2px_307.2px] bg-top-left opacity-40 mix-blend-plus-lighter"
        style={{ backgroundImage: "url(/resources/news-cta-texture.webp)" }}
      />
      <span className="relative z-10 text-[14px] min-[1024px]:text-[16px] leading-[28px] font-medium whitespace-nowrap text-[#151515] uppercase not-italic [word-break:break-word]">
        {label}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
      />
    </a>
  );
}



export function PressKit({ data }: PressKitProps = {}) {
  const heading = (data?.heading as string) || "";
  const subtitle = (data?.subtitle as string) || "";
  const ctaLabel = (data?.cta_label as string) || "";
  const ctaHref = mediaUrl(data?.cta_file) || "#";
  const fileInfo = (data?.file_info as string) || "";
  const menus: string[] = Array.isArray(data?.menus)
    ? data.menus
        .map((m: any) => m?.label)
        .filter((label: unknown): label is string => typeof label === "string")
    : [];

  return (
    <section
      className="relative z-10 flex w-full justify-center overflow-hidden bg-transparent"
      aria-label="Writing about Ambient"
      data-node-id="2500:1659"
      data-name="Building with Ambient"
    >
      {/* DESKTOP (>=1024px) — exact Figma layout */}
      <div className="relative hidden h-[489px] w-[1440px] min-[1024px]:block">
        <div
          className="pointer-events-none absolute left-0 top-0 h-[489px] w-[1440px]"
          aria-hidden
        >
          <Image
            src="/news-listing/press-kit-graphic.webp"
            alt=""
            fill
            className="object-contain object-right"
            sizes="1440px"
          />
        </div>

        <div
          className="absolute left-[97px] top-[101.5px] z-10 flex w-[576px] flex-col gap-[64px]"
          data-node-id="2590:1888"
        >
          <div
            className="flex w-full flex-col gap-[14px]"
            data-node-id="2590:1886"
          >
            <div
              className="relative h-[135px] w-[539px]"
              data-node-id="2500:1662"
              data-name="Content"
            >
              <PressTitle heading={heading} />
              <p
                className={`${interRegular.className} absolute left-[21px] top-[75px] h-[48px] w-[484px] text-[18px] leading-[27px] font-normal text-[rgba(255,255,255,0.6)] not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
                data-node-id="2500:1670"
              >
                {subtitle}
              </p>
            </div>

            <div
              className="flex w-full items-center gap-[18px]"
              data-node-id="2590:1885"
            >
              {menus.map((label) => (
                <PressMenu key={label} label={label} />
              ))}
            </div>
          </div>

          <div
            className="flex items-center gap-[19px]"
            data-node-id="2590:1887"
          >
            <PressCta label={ctaLabel} href={ctaHref} />
            <p
              className={`${interRegular.className} text-[14px] leading-[21px] font-normal whitespace-nowrap text-[#e8e8e8] not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
              data-node-id="2517:1675"
            >
              {fileInfo}
            </p>
          </div>
        </div>
      </div>

      {/* MOBILE (<1024px) — exact Figma mobile layout (396×351 frame) */}
      <div className="relative w-full min-[1024px]:hidden">
        {/* Background image — rotated press-kit-graphic with radial vignette */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute left-[calc(50%+225px)] top-[calc(50%+44px)] flex h-[500px] w-[888px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <div className="-rotate-90 -scale-y-100">
              <div className="relative h-[888px] w-[500px]">
                <Image
                  src="/news-listing/press-kit-graphic.webp"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="500px"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(284px 549.77px at 224.61px 444px, rgba(0,0,0,0.6) 0%, rgba(0,0,0,1) 100%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative flex w-full flex-col items-center px-[23px] pt-[30px] pb-[11.46px]">
          {/* Main content: title, subtitle, menus */}
          <div className="flex w-full flex-col items-center gap-[10px]">
            <PressTitle heading={heading} />
            <p
              className={`${interRegular.className} w-full text-center text-[14px] leading-[19px] font-normal text-[rgba(255,255,255,0.6)] not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
              data-node-id="4153:8321"
            >
              {subtitle}
            </p>

            {/* Menu tags: 2 in row 1, remaining centered in row 2 */}
            <div className="flex flex-col items-center gap-[10px]">
              <div className="flex gap-[10px]">
                {menus.slice(0, 2).map((label) => (
                  <PressMenu key={label} label={label} />
                ))}
              </div>
              {menus.length > 2 && (
                <div className="flex gap-[10px]">
                  {menus.slice(2).map((label) => (
                    <PressMenu key={label} label={label} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CTA + info */}
          <div className="mt-[28.54px] flex w-[231px] flex-col items-center gap-[6px]">
            <PressCta label={ctaLabel} href={ctaHref} />
            <p
              className={`${interRegular.className} w-full text-center text-[12px] leading-[18px] font-normal text-[#e8e8e8] not-italic [word-break:break-word]`}
              data-node-id="4153:8911"
            >
              {fileInfo}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
