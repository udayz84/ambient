import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import {
  dmMono,
  gilroyMedium,
  interBold,
  interRegular,
} from "../hero/fonts";
import { Corners } from "../shared/Corners";

const TITLE_GRADIENT =
  "linear-gradient(123.792deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

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
  return (
    <div
      className="relative w-full min-[1024px]:h-[63px] min-[1024px]:w-[539px] min-[1024px]:shrink-0"
      data-node-id="2500:1663"
    >
      <h2
        className={`${gilroyMedium.className} relative w-full bg-clip-text text-center text-[32px] leading-[38px] font-medium text-transparent not-italic [word-break:break-word] min-[1024px]:absolute min-[1024px]:left-1/2 min-[1024px]:top-[7px] min-[1024px]:-translate-x-1/2 min-[1024px]:text-[46px] min-[1024px]:leading-[49px] min-[1024px]:whitespace-nowrap`}
        style={{
          backgroundImage: TITLE_GRADIENT,
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
          <img
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
      className="relative flex h-[26px] w-[180px] shrink-0 items-center justify-center overflow-clip border border-solid border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.06)]"
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
        className="pointer-events-none absolute left-[170.48px] top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60"
      />

      <p
        className={`${dmMono.className} text-[13px] leading-[13px] font-normal tracking-[-0.39px] whitespace-nowrap text-[#ecfae5] uppercase not-italic pt-px`}
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
      className={`${gilroyMedium.className} ${GREEN_GLOW_SHADOW} relative flex h-[48px] w-[267px] shrink-0 items-center justify-center`}
      data-node-id="2500:1671"
      data-name="Cta"
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-white" />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[length:307.2px_307.2px] bg-top-left opacity-40 mix-blend-plus-lighter"
        style={{ backgroundImage: "url(/resources/news-cta-texture.png)" }}
      />
      <span className="relative z-10 text-[16px] leading-[28px] font-medium whitespace-nowrap text-[#151515] uppercase not-italic [word-break:break-word]">
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
          className="pointer-events-none absolute left-[700px] top-[15px] h-[460px] w-[720px]"
          aria-hidden
        >
          <Image
            src="/news-listing/press-kit-graphic.png"
            alt=""
            fill
            className="object-contain"
            sizes="633px"
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
                className={`${interRegular.className} absolute left-[21px] top-[75px] h-[48px] w-[484px] text-[18px] leading-[27px] font-normal text-[rgba(255,255,255,0.6)] not-italic [word-break:break-word]`}
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
              className={`${interRegular.className} text-[14px] leading-[21px] font-normal whitespace-nowrap text-[#e8e8e8] not-italic [word-break:break-word]`}
              data-node-id="2517:1675"
            >
              {fileInfo}
            </p>
          </div>
        </div>
      </div>

      {/* MOBILE (<1024px) — responsive adaptation */}
      <div className="relative w-full min-[1024px]:hidden">
        <div className="flex w-full flex-col gap-[40px] px-[24px] py-[56px]">
          <div className="flex w-full flex-col gap-[14px]">
            <PressTitle heading={heading} />
            <p
              className={`${interRegular.className} w-full text-[18px] leading-[27px] font-normal text-[rgba(255,255,255,0.6)] not-italic [word-break:break-word]`}
            >
              {subtitle}
            </p>
            <div className="mt-[8px] flex w-full flex-wrap gap-[18px]">
              {menus.map((label) => (
                <PressMenu key={label} label={label} />
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-[19px]">
            <PressCta label={ctaLabel} href={ctaHref} />
            <p
              className={`${interRegular.className} text-[14px] leading-[21px] font-normal whitespace-nowrap text-[#e8e8e8] not-italic [word-break:break-word]`}
            >
              {fileInfo}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
