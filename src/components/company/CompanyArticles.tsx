import { CompanyArticleCardCompact } from "./CompanyArticleCardCompact";
import { CompanyArticleCardFeatured } from "./CompanyArticleCardFeatured";
import {
  COMPANY_COMPACT_ARTICLES,
  COMPANY_FEATURED_ARTICLE,
} from "./company-articles-data";

export function CompanyArticles() {
  return (
    <section
      className="absolute top-[5069px] left-[118px] z-[8] h-[692px] w-[1204px] bg-black"
      data-node-id="2379:4795"
      data-name="Frame 1984079460"
      aria-label="Company news articles"
    >
      <div className="flex h-full w-full gap-[24px]">
        <CompanyArticleCardFeatured {...COMPANY_FEATURED_ARTICLE} />

        <div
          className="flex w-[590px] shrink-0 flex-col gap-[29px]"
          data-node-id="2379:4797"
          data-name="Frame 1984079459"
        >
          {COMPANY_COMPACT_ARTICLES.map((article) => (
            <CompanyArticleCardCompact key={article.nodeId} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
}
