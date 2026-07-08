import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import { interRegular } from "../hero/fonts";
import { CompanyArticleCorners } from "./CompanyArticleCorners";
import { CompanyEngagementCta } from "./CompanyEngagementCta";
import { CompanySectionTitle } from "./CompanySectionTitle";
import { COMPANY_JOIN_TEAM } from "./company-engagement-data";

const CARD_BORDER =
  "border-[0.5px] border-solid border-[rgba(240,240,240,0.2)]";

type CompanyJoinTeamProps = {
  data?: any;
};

export function CompanyJoinTeam({ data }: CompanyJoinTeamProps = {}) {
  const title = (data?.title as string) || COMPANY_JOIN_TEAM.title;
  const description = (data?.description as string) || COMPANY_JOIN_TEAM.description;
  const ctaLabel = (data?.cta_label as string) || COMPANY_JOIN_TEAM.ctaLabel;
  const ctaHref = (data?.cta_href as string) || COMPANY_JOIN_TEAM.ctaHref;
  const imageSrc = mediaUrl(data?.image) || COMPANY_JOIN_TEAM.imageSrc;
  const titleLines = title.split("\n");

  return (
    <div
      className={`relative isolate z-[1] h-[340px] w-[1200px] shrink-0 overflow-visible bg-black ${CARD_BORDER}`}
      data-node-id={COMPANY_JOIN_TEAM.nodeId}
      data-name="Frame 1618875876"
    >
      <div
        className="absolute top-0 left-0 h-[340px] w-[780px] overflow-hidden"
        data-node-id={COMPANY_JOIN_TEAM.imageNodeId}
        data-name="image 105"
      >
        <Image
          src={imageSrc}
          alt=""
          width={780}
          height={340}
          className="absolute inset-0 size-full max-w-none object-cover"
          unoptimized
        />
      </div>

      <div
        className="absolute top-0 right-0 z-[2] h-full w-[390px] bg-black"
        aria-hidden
      />

      <div
        className="absolute top-[32px] left-[810px] z-[3]"
        data-node-id="2379:4836"
        data-name="Section Title"
      >
        <CompanySectionTitle
          width={233}
          height={44}
          fontSize={32}
          lineHeight={39}
          nodeId={COMPANY_JOIN_TEAM.titleNodeId}
          lines={titleLines}
        />
      </div>

      <p
        className={`${interRegular.className} absolute top-[100px] left-[810px] z-[3] w-[358px] text-[18px] leading-[27px] font-normal text-[rgba(255,255,255,0.6)] not-italic [word-break:break-word]`}
        data-node-id={COMPANY_JOIN_TEAM.bodyNodeId}
      >
        {description}
      </p>

      <div
        className="absolute top-[260px] left-[810px] z-[3]"
        data-node-id={COMPANY_JOIN_TEAM.ctaNodeId}
      >
        <CompanyEngagementCta
          href={ctaHref}
          className={COMPANY_JOIN_TEAM.ctaWidth}
        >
          {ctaLabel}
        </CompanyEngagementCta>
      </div>

      <CompanyArticleCorners />
    </div>
  );
}
