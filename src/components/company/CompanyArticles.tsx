import { mediaUrl } from "@/lib/strapi";
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
            (rawFeatured.metadata?.date as string) ||
            (rawFeatured.date as string) ||
            COMPANY_FEATURED_ARTICLE.metadata.date,
          totalFunding:
            (rawFeatured.metadata?.totalFunding as string) ||
            COMPANY_FEATURED_ARTICLE.metadata.totalFunding,
          fundingRounds:
            (rawFeatured.metadata?.fundingRounds as string) ||
            COMPANY_FEATURED_ARTICLE.metadata.fundingRounds,
        },
        imageSrc:
          mediaUrl(rawFeatured.image) || COMPANY_FEATURED_ARTICLE.imageSrc,
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
          };
        })
      : COMPANY_COMPACT_ARTICLES;

  return (
    <section
      className="absolute top-[5069px] left-[118px] z-[8] h-[692px] w-[1204px] bg-black"
      data-node-id="2379:4795"
      data-name="Frame 1984079460"
      aria-label="Company news articles"
    >
      <div className="flex h-full w-full gap-[24px]">
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
