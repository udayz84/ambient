import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import { CompanySectionTitle } from "./CompanySectionTitle";
import { interRegular } from "../hero/fonts";
import { CompanyArticleCardCompact } from "./CompanyArticleCardCompact";
import { CompanyArticleCardFeatured } from "./CompanyArticleCardFeatured";
import {
  COMPANY_COMPACT_ARTICLES,
  COMPANY_FEATURED_ARTICLE,
} from "./company-articles-data";

type CompanyArticlesProps = {
  data?: any;
};

export function CompanyArticles({ data }: CompanyArticlesProps = {}) {
  const rawFeatured = data?.featured_article;
  const featured = rawFeatured
    ? {
        ...COMPANY_FEATURED_ARTICLE,
        nodeId: COMPANY_FEATURED_ARTICLE.nodeId,
        category: (rawFeatured.category as string) || COMPANY_FEATURED_ARTICLE.category,
        title: (rawFeatured.title as string) || COMPANY_FEATURED_ARTICLE.title,
        excerpt: (rawFeatured.excerpt as string) || COMPANY_FEATURED_ARTICLE.excerpt,
        metadata: {
          date:
            (rawFeatured.date as string) ||
            COMPANY_FEATURED_ARTICLE.metadata.date,
          totalFunding: COMPANY_FEATURED_ARTICLE.metadata.totalFunding,
          fundingRounds: COMPANY_FEATURED_ARTICLE.metadata.fundingRounds,
        },
        imageSrc:
          mediaUrl(rawFeatured.image) || COMPANY_FEATURED_ARTICLE.imageSrc,
        link: (rawFeatured.link as string) || "",
      }
    : COMPANY_FEATURED_ARTICLE;

  const strapiCompact = Array.isArray(data?.compact_articles) ? data.compact_articles : null;
  const compact =
    strapiCompact && strapiCompact.length > 0
      ? strapiCompact.map((c: any, i: number) => {
          const fallback =
            COMPANY_COMPACT_ARTICLES[i] ??
            COMPANY_COMPACT_ARTICLES[COMPANY_COMPACT_ARTICLES.length - 1];
          return {
            ...fallback,
            title: (c?.title as string) || fallback.title,
            imageSrc: mediaUrl(c?.image) || fallback.imageSrc,
            link: (c?.link as string) || "",
          };
        })
      : COMPANY_COMPACT_ARTICLES;

  return (
    <section
      className="absolute top-[5069px] left-[118px] z-[8] h-auto w-[1204px] bg-transparent flex flex-col gap-[48px]"
      data-node-id="2379:4795"
      data-name="Frame 1984079460"
      aria-label="Company news articles"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1440px] h-[1379px] pointer-events-none z-[-1] opacity-70">
        <Image src="/company/articles-bg.png" alt="" fill className="object-contain" unoptimized />
      </div>

      <div className="flex flex-col items-center text-center gap-[16px] max-w-[800px] mx-auto">
        <CompanySectionTitle width="max-content" height={50} fontSize={46} lineHeight={50} textCenter={true}>
          Updates & Announcements
        </CompanySectionTitle>
        <p className={`${interRegular.className} text-[18px] text-white/70 leading-[27px] px-[10px]`}>
          Stay informed with the latest breakthroughs, strategic partnerships, and resources from Ambient as we redefine edge intelligence.
        </p>
      </div>

      <div className="flex w-full gap-[24px]">
        <CompanyArticleCardFeatured {...featured} />

        <div
          className="flex w-[590px] shrink-0 flex-col gap-[29px]"
          data-node-id="2379:4797"
          data-name="Frame 1984079459"
        >
          {compact.map((article: any) => (
            <CompanyArticleCardCompact key={article.nodeId} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
}
