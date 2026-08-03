import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { WhiteTag } from "./WhiteTag";
import { GreenCta } from "./GreenCta";

const FALLBACK_HERO_IMAGE = "/news-listing/hero-bg.png";

type NewsListingHeroProps = {
  data?: any;
};

export function NewsListingHero({ data }: NewsListingHeroProps = {}) {
  const mainBackgroundImage = mediaUrl(data?.background_image) || "";
  const featuredImage = FALLBACK_HERO_IMAGE;
  const tagText = (data?.tag?.text as string) || "";
  const title = (data?.title as string) || "";
  const subtitle = (data?.subtitle as string) || "";
  const paginationText = (data?.pagination_text as string) || "";
  const ctaLabel = (data?.cta_label as string) || "";

  return (
    <section
      className="relative -mt-[78px] flex w-full justify-center overflow-hidden bg-[#040404]"
      data-node-id="2653:685"
      data-name="Desktop - 8"
      aria-label="News listing hero"
    >
      {/* DESKTOP (>=1024px) — exact Figma layout */}
      <div className="relative hidden h-[667px] w-full min-[1024px]:block">
        {/* Image frame: 1440x638 at top-[29px], horizontally centered */}
        <div
          className="absolute left-1/2 top-[29px] h-[638px] w-[1440px] -translate-x-1/2 overflow-clip"
          data-node-id="2653:686"
          data-name="Image"
        >
          {mainBackgroundImage ? (
            <Image
              src={mainBackgroundImage}
              alt={data?.alt || ""}
              fill
              sizes="1440px"
              className="object-cover"
              priority
            />
          ) : null}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(185.739deg, rgba(25, 25, 25, 0) 58.395%, rgb(4, 4, 4) 88.066%)",
            }}
          />

          {/* Side fades so the 1440px image blends into the dark page on wider screens */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgb(4, 4, 4) 0%, rgba(4, 4, 4, 0) 7%, rgba(4, 4, 4, 0) 93%, rgb(4, 4, 4) 100%)",
            }}
          />

          {/* Left caption overlay */}
          <div
            className="absolute left-[80px] top-[389px] flex w-[407px] flex-col gap-[12px] px-[16px]"
            data-node-id="2653:693"
          >
            <WhiteTag label={tagText} nodeId="2653:687" />
            <div className="flex w-full flex-col gap-[12px]">
              <h2
                className={`${gilroyMedium.className} w-full text-[22px] leading-[28px] font-medium text-white opacity-90 not-italic [word-break:break-word]`}
                data-node-id="2653:695"
              >
                {title}
              </h2>
              <p
                className={`${interRegular.className} w-full text-[14px] leading-[21px] font-normal text-[#d2d2d2] opacity-90 not-italic [word-break:break-word]`}
                data-node-id="2653:696"
              >
                {subtitle}
              </p>
            </div>
            <GreenCta label={ctaLabel} nodeId="2653:697" />
          </div>

          {/* Pagination indicator */}
          <p
            className={`${interRegular.className} absolute left-[1292px] top-[420px] text-[12px] leading-[18px] font-normal whitespace-nowrap text-white not-italic`}
            data-node-id="2653:708"
          >
            {paginationText}
          </p>

          {/* Right featured card */}
          <div
            className="absolute left-[894px] top-[445px] flex gap-[8px] border border-solid border-white bg-[#191919] p-[10px]"
            data-node-id="2653:709"
            data-name="Re-architecting the Physics of AI Compute."
          >
            <div
              className="relative flex h-[132px] w-[164px] shrink-0 flex-col items-end overflow-clip p-[12px]"
              data-node-id="2653:710"
              data-name="Image"
            >
              <Image
                src={featuredImage}
                alt=""
                fill
                sizes="164px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(88.8266deg, rgba(25, 25, 25, 0) 60.881%, rgb(25, 25, 25) 99.17%)",
                }}
              />
              <WhiteTag label={tagText} nodeId="2653:711" />
            </div>
            <div
              className="flex flex-col gap-[24px] px-[16px]"
              data-node-id="2653:717"
            >
              <h3
                className={`${gilroyMedium.className} w-[242px] text-[22px] leading-[28px] font-medium text-white opacity-90 not-italic [word-break:break-word]`}
                data-node-id="2653:719"
              >
                {title}
              </h3>
              <GreenCta label={ctaLabel} nodeId="2653:720" />
            </div>
            <Corners className="z-[3]" />
          </div>
        </div>
      </div>

      {/* MOBILE (<1024px) — dedicated responsive layout */}
      <div className="relative w-full min-[1024px]:hidden">
        <div className="relative h-[440px] w-full overflow-hidden">
          {mainBackgroundImage ? (
            <Image
              src={mainBackgroundImage}
              alt={data?.alt || ""}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          ) : null}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(185.739deg, rgba(25, 25, 25, 0) 40%, rgb(4, 4, 4) 92%)",
            }}
          />

          <p
            className={`${interRegular.className} absolute right-[16px] top-[96px] text-[11px] leading-[18px] font-normal whitespace-nowrap text-white not-italic`}
          >
            {paginationText}
          </p>

          <div className="absolute bottom-[24px] left-0 flex w-full flex-col gap-[12px] px-[24px]">
            <WhiteTag label={tagText} />
            <h2
              className={`${gilroyMedium.className} w-full text-[20px] leading-[26px] font-medium text-white opacity-90 not-italic [word-break:break-word]`}
            >
              {title}
            </h2>
            <p
              className={`${interRegular.className} w-full text-[13px] leading-[20px] font-normal text-[#d2d2d2] opacity-90 not-italic [word-break:break-word]`}
            >
              {subtitle}
            </p>
            <GreenCta label={ctaLabel} />
          </div>
        </div>
      </div>
    </section>
  );
}
