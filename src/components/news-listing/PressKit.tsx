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

const FALLBACK_MENUS = ["Logos & Marks", "Executive Photos", "Product Renders"];
const FALLBACK_HEADING = "Writing about Ambient?";
const FALLBACK_SUBTITLE =
  "Download official brand assets, executive bios, and high-resolution hardware photography.";
const FALLBACK_CTA = "Download Press Kit (.ZIP)";
const FALLBACK_FILE_INFO = "2.3 MB • Last updated May 2026";
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
      className="relative h-[26px] w-[180px] shrink-0 bg-[rgba(255,255,255,0.06)]"
      data-name="Menu"
    >
      {/* Corner borders */}
      <div className="absolute left-0 top-[4px] h-[4px] w-[4px] border-l border-t border-white opacity-60" />
      <div className="absolute right-0 top-[4px] h-[4px] w-[4px] border-r border-t border-white opacity-60" />
      <div className="absolute bottom-[4px] left-0 h-[4px] w-[4px] border-b border-l border-white opacity-60" />
      <div className="absolute bottom-[4px] right-0 h-[4px] w-[4px] border-b border-r border-white opacity-60" />
      
      {/* Vertical bars */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[6.48px] top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60 rounded-full"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[7.52px] top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60 rounded-full"
      />
      
      <p
        className={`${dmMono.className} absolute left-1/2 top-[calc(50%-4.5px)] -translate-x-1/2 text-[13px] leading-[19.5px] font-normal tracking-[-0.39px] whitespace-nowrap text-[#ecfae5] uppercase not-italic`}
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

function PressCluster({ iconSrc }: { iconSrc: string }) {
  return (
    <div
      className="pointer-events-none absolute left-[744.25px] top-[44.79px] h-[400px] w-[632.5px] drop-shadow-[0px_4px_12px_rgba(0,0,0,0.25)]"
      data-node-id="2526:2468"
      data-name="Container"
      aria-hidden
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15)_1.5px,_transparent_1.5px)] bg-[length:16px_16px]" />
      {/* White logo card */}
      <div
        className="absolute left-[31.625px] top-[34.91px] flex h-[192px] w-[192px] items-center justify-center overflow-clip rounded-[16px] border border-solid border-[#e5e7eb] bg-white p-px shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]"
        data-node-id="2526:2469"
        data-name="Container"
      >
        <div
          className="flex flex-col items-center justify-center gap-[8px]"
          data-node-id="2526:2470"
        >
          <p
            className={`${interBold.className} text-center text-[36px] leading-[40px] tracking-[0.3691px] text-[#0a0a0a] not-italic whitespace-nowrap`}
            data-node-id="2526:2472"
          >
            Ambient
          </p>
          <p
            className={`${interRegular.className} text-center text-[14px] leading-[20px] tracking-[-0.1504px] text-[#99a1af] not-italic whitespace-nowrap`}
            data-node-id="2526:2474"
          >
            SCIENTIFIC
          </p>
        </div>
      </div>

      {/* Black card with green chip */}
      <div
        className="absolute left-[126.5px] top-[187.31px] h-[160px] w-[224px] overflow-clip rounded-[14px] border border-solid border-[#d1d5dc] bg-black shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]"
        data-node-id="2526:2479"
        data-name="Container"
      >
        <div
          className="absolute left-[80px] top-[48px] flex h-[64px] w-[64px] flex-col items-start rounded-[4px] bg-[#0f0f] p-[12px] drop-shadow-[0px_0px_10.051px_rgba(0,255,0,0.5)]"
          data-node-id="2526:2480"
          data-name="Container"
        >
          <div
            className="relative h-[40px] w-full"
            data-node-id="2526:2481"
            data-name="Container"
          >
            <div className="absolute left-0 top-0 h-[18px] w-[18px] rounded-[4px] bg-[rgba(0,0,0,0.4)]" />
            <div className="absolute left-[22px] top-0 h-[18px] w-[18px] rounded-[4px] bg-[rgba(0,0,0,0.4)]" />
            <div className="absolute left-0 top-[22px] h-[18px] w-[18px] rounded-[4px] bg-[rgba(0,0,0,0.4)]" />
            <div className="absolute left-[22px] top-[22px] h-[18px] w-[18px] rounded-[4px] bg-[rgba(0,0,0,0.4)]" />
          </div>
        </div>
      </div>

      {/* Circular gradient badge with icon */}
      <div
        className="absolute left-[409.25px] top-[169.97px] flex h-[160px] w-[160px] items-center justify-center overflow-clip rounded-full border-4 border-solid border-white shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]"
        style={{ backgroundImage: BADGE_GRADIENT }}
        data-node-id="2526:2475"
        data-name="Container"
      >
        <div className="relative h-[64px] w-[64px]" data-node-id="2526:2476" data-name="Icon">
          <Image
            src={iconSrc}
            alt=""
            width={64}
            height={64}
            className="block h-full w-full max-w-none"
          />
        </div>
      </div>
    </div>
  );
}

export function PressKit({ data }: PressKitProps = {}) {
  const heading = (data?.heading as string) || FALLBACK_HEADING;
  const subtitle = (data?.subtitle as string) || FALLBACK_SUBTITLE;
  const ctaLabel = (data?.cta_label as string) || FALLBACK_CTA;
  const ctaHref = mediaUrl(data?.cta_file) || "#";
  const fileInfo = (data?.file_info as string) || FALLBACK_FILE_INFO;
  const iconSrc = mediaUrl(data?.icon) || FALLBACK_ICON;
  const menus: string[] =
    Array.isArray(data?.menus) && data.menus.length > 0
      ? data.menus
          .map((m: any) => m?.label)
          .filter((label: unknown): label is string => typeof label === "string")
      : FALLBACK_MENUS;

  return (
    <section
      className="relative z-10 flex w-full justify-center overflow-hidden"
      aria-label="Writing about Ambient"
      data-node-id="2500:1659"
      data-name="Building with Ambient"
    >
      {/* DESKTOP (>=1024px) — exact Figma layout */}
      <div className="relative hidden h-[489px] w-[1440px] min-[1024px]:block">
        <PressCluster iconSrc={iconSrc} />

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
              className="flex w-full gap-[18px]"
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
