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
      className={`relative isolate z-[1] box-border h-[386px] w-[590px] shrink-0 bg-black ${CARD_BORDER}`}
      data-node-id={nodeId}
      data-name="Article"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-[inherit]">
        <div
          className="pointer-events-none absolute overflow-hidden"
          style={{ left: imageLeft, top: imageTop, width: imageWidth, height: imageHeight }}
          aria-hidden
        >
          <Image
            src={finalImageSrc}
            alt=""
            fill
            className="pointer-events-none object-cover"
            sizes={`${imageWidth}px`}
            unoptimized
          />
        </div>
      </div>

      <div
        className="absolute top-[32px] left-[32px] z-[1] w-[526px]"
        data-name="NewsSection"
      >
        <CompanySectionTitle
          width={titleWidth}
          height={titleHeight}
          lines={finalTitleLines}
        />

        <p
          className={`${interRegular.className} mt-[12px] text-[18px] leading-[27px] font-normal text-[rgba(255,255,255,0.6)] not-italic [word-break:break-word]`}
          style={{ width: descriptionWidth }}
        >
          {finalDescription}
        </p>
      </div>

      <div
        className="absolute top-[306px] left-[32px] z-[1]"
        data-name="Cta"
      >
        <CompanyEngagementCta href={finalCtaHref} className={ctaWidth}>
          {finalCtaLabel}
        </CompanyEngagementCta>
      </div>

      <CompanyArticleCorners />
    </article>
  );
}
