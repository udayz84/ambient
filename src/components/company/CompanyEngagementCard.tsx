import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import { interRegular } from "../hero/fonts";
import { CompanyArticleCorners } from "./CompanyArticleCorners";
import { CompanyEngagementCta } from "./CompanyEngagementCta";
import { CompanySectionTitle } from "./CompanySectionTitle";
import type { CompanyEngagementCardData } from "./company-engagement-data";

const CARD_BORDER =
  "border-[0.5px] border-solid border-[rgba(240,240,240,0.2)]";

type CompanyEngagementCardProps = CompanyEngagementCardData & {
  strapi?: any;
};

export function CompanyEngagementCard({
  nodeId,
  titleLines,
  titleWidth,
  titleHeight,
  description,
  descriptionWidth,
  ctaLabel,
  ctaHref,
  ctaWidth,
  imageSrc,
  imageWidth,
  imageHeight,
  imageLeft,
  imageTop,
  strapi,
}: CompanyEngagementCardProps) {
  const strapiTitle = (strapi?.title as string) || "";
  const finalTitleLines: readonly [string, string] = strapiTitle
    ? (strapiTitle.split("\n") as [string, string])
    : titleLines;
  const finalDescription = (strapi?.description as string) || description;
  const finalCtaLabel = (strapi?.cta_label as string) || ctaLabel;
  const finalCtaHref = (strapi?.cta_href as string) || ctaHref;
  const finalImageSrc = mediaUrl(strapi?.image) || imageSrc;

  return (
    <article
      className={`relative isolate z-[1] box-border h-[386px] flex-1 shrink-0 bg-black overflow-hidden ${CARD_BORDER}`}
      data-node-id={nodeId}
      data-name="Article"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-[inherit]">
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-[60%]"
          aria-hidden
        >
          <Image
            src={finalImageSrc}
            alt=""
            fill
            className="pointer-events-none object-cover opacity-60"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        </div>
      </div>

      <div
        className="absolute top-[32px] left-[32px] z-[1] w-[calc(100%-64px)]"
        data-name="NewsSection"
      >
        <h3
          className={`relative m-0 bg-clip-text p-0 font-medium text-transparent not-italic text-balance`}
          style={{
            fontFamily: "Gilroy, sans-serif",
            fontSize: "32px",
            lineHeight: "38px",
            backgroundImage: "linear-gradient(122.573deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {strapiTitle || titleLines.join(" ")}
        </h3>

        <p
          className={`${interRegular.className} mt-[12px] text-[18px] leading-[27px] font-normal text-[rgba(255,255,255,0.6)] not-italic [word-break:break-word] w-full max-w-[90%] line-clamp-4`}
        >
          {finalDescription}
        </p>
      </div>

      <div
        className="absolute bottom-[32px] left-[32px] z-[1]"
        data-name="Cta"
      >
        <CompanyEngagementCta href={finalCtaHref} className="w-auto px-6">
          {finalCtaLabel}
        </CompanyEngagementCta>
      </div>

      <CompanyArticleCorners />
    </article>
  );
}
