import Link from "next/link";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { mediaUrl } from "@/lib/strapi";
import { humanizeArticleCategory } from "../resources/resources-data";
import { LatestNewsCard } from "../latest-news/LatestNewsCard";
import { LATEST_NEWS_ARTICLES } from "../latest-news/latest-news-data";

export function ArticleDetail({ data }: { data: any }) {
  const title = data?.title || "";
  const category = data?.category
    ? humanizeArticleCategory(data.category).toUpperCase()
    : "";
  const body = data?.body || "";
  const imageUrl = mediaUrl(data?.slug_hero_image) || mediaUrl(data?.hero_image) || mediaUrl(data?.featured_image);

  const hasContent = body && body.trim().length > 0;

  const dateStr = data?.date;
  const formattedDate = dateStr
    ? new Date(dateStr).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC"
      })
    : null;

  return (
    <main className="relative z-10 flex w-full flex-col overflow-x-clip min-h-screen lg:-mb-[409px] border-none">
      <div className="w-full bg-black">
        {/* Breadcrumbs */}
        <section className="w-full flex justify-start px-[20px] pt-[24px] pb-[16px] min-[1024px]:pt-[32px] min-[1024px]:pb-[24px] max-w-[1200px] mx-auto">
          <nav aria-label="Breadcrumb">
            <ol className={`${interRegular.className} flex flex-wrap items-center gap-[8px] text-[12px] text-white/50 tracking-wider uppercase`}>
              <li>
                <Link href="/" className="hover:text-white transition-colors">HOME</Link>
              </li>
              <li>
                <span className="text-white/30">/</span>
              </li>
              <li>
                <Link href={data?.type === "resource" ? "/resources" : "/news-listing"} className="hover:text-white transition-colors">
                  {data?.type === "resource" ? "RESOURCES" : "NEWS"}
                </Link>
              </li>
              <li>
                <span className="text-white/30">/</span>
              </li>
              <li className="text-[#53d824] line-clamp-1 max-w-[150px] min-[1024px]:max-w-[400px]">
                {title}
              </li>
            </ol>
          </nav>
        </section>

        {/* Hero Image */}
        {imageUrl && (
          <section className="relative w-full mb-[40px] min-[1024px]:mb-[60px] px-[20px] max-w-[1240px] mx-auto">
            <div className="relative w-full aspect-[16/9] min-[1024px]:aspect-[21/9] overflow-hidden rounded-[16px] border border-white/10 bg-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" src={imageUrl} alt="" className="w-full h-full object-cover" />
              {/* Optional subtle gradient at the bottom of the image to blend it into the page */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
            </div>
          </section>
        )}

        {/* Header Container */}
        <section className="relative flex w-full flex-col items-center pt-[20px] pb-[40px] min-[1024px]:pt-[40px] min-[1024px]:pb-[60px] px-[20px]">
          <div className="w-full flex flex-col items-center text-center">
            <div className="flex items-center gap-[16px] mb-[32px] flex-wrap justify-center">
              {category && (
                <span
                  className={`${interRegular.className} rounded-full border border-[#53d824]/30 bg-[#53d824]/10 px-[16px] py-[6px] text-[13px] font-medium tracking-[0.1em] text-[#53d824] uppercase`}
                >
                  {category}
                </span>
              )}
              {category && formattedDate && (
                <span className="w-[4px] h-[4px] rounded-full bg-[#53d824]/50" />
              )}
              {formattedDate && (
                <span className={`${interRegular.className} text-[14px] text-white/60 tracking-widest uppercase min-[1024px]:text-[16px]`}>
                  {formattedDate}
                </span>
              )}
            </div>
            
            <h1
              className={`${gilroyMedium.className} text-[32px] leading-[1.2] min-[1024px]:text-[64px] min-[1024px]:leading-[1.1] font-medium text-white tracking-[-0.02em] w-full max-w-[1200px] px-[20px]`}
            >
              {title}
            </h1>
          </div>
        </section>

        {/* Content */}
        <section className="relative flex w-full justify-center px-[20px] pb-[40px] min-[1024px]:pb-[60px]">
          <div className="w-full max-w-[900px] text-white">
            {hasContent ? (
              <article
                className={`${interRegular.className} text-[16px] min-[1024px]:text-[16px] leading-[1.8] font-light text-[#d4d4d4] 
                [&>h1]:text-white [&>h1]:text-[28px] min-[1024px]:[&>h1]:text-[36px] [&>h1]:leading-[1.2] [&>h1]:font-medium [&>h1]:mb-[24px] [&>h1]:mt-[48px] [&>h1]:tracking-tight 
                [&>h2]:text-white [&>h2]:text-[24px] min-[1024px]:[&>h2]:text-[28px] [&>h2]:leading-[1.3] [&>h2]:font-medium [&>h2]:mb-[20px] [&>h2]:mt-[40px] [&>h2]:tracking-tight 
                [&>h3]:text-white [&>h3]:text-[20px] min-[1024px]:[&>h3]:text-[22px] [&>h3]:leading-[1.4] [&>h3]:font-medium [&>h3]:mb-[16px] [&>h3]:mt-[32px] 
                [&>p]:mb-[24px] 
                [&>ul]:mb-[24px] [&>ul]:list-disc [&>ul]:pl-[28px] [&>ul>li]:mb-[10px] [&>ul>li]:pl-[8px] 
                [&>ol]:mb-[24px] [&>ol]:list-decimal [&>ol]:pl-[28px] [&>ol>li]:mb-[10px] [&>ol>li]:pl-[8px] 
                [&_a]:text-[#53d824] [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-white hover:[&_a]:decoration-[#53d824] transition-all 
                [&_img]:rounded-[12px] [&_img]:w-full [&_img]:h-auto [&_img]:object-cover [&_img]:my-[32px] min-[1024px]:[&_img]:my-[40px] [&_img]:border [&_img]:border-white/10 [&_img]:shadow-xl 
                [&>blockquote]:border-l-[4px] [&>blockquote]:border-[#53d824] [&>blockquote]:bg-white/5 [&>blockquote]:rounded-r-[8px] [&>blockquote]:py-[16px] min-[1024px]:[&>blockquote]:py-[24px] [&>blockquote]:px-[20px] min-[1024px]:[&>blockquote]:px-[32px] [&>blockquote]:italic [&>blockquote]:text-white/90 [&>blockquote]:my-[32px] min-[1024px]:[&>blockquote]:my-[40px] [&>blockquote>p]:mb-0
                [&>hr]:border-white/10 [&>hr]:my-[48px]`}
                dangerouslySetInnerHTML={{ __html: body }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-[80px] text-center border border-white/10 rounded-[16px] bg-white/[0.02]">
                <div className="w-[48px] h-[48px] rounded-full bg-white/5 flex items-center justify-center mb-[16px]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <h3 className={`${gilroyMedium.className} text-[20px] text-white mb-[8px]`}>Content Coming Soon</h3>
                <p className={`${interRegular.className} text-[16px] text-white/50 max-w-[400px]`}>
                  This article is currently being written. Please check back later for updates.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Related Articles (Static) */}
      <section className="relative flex w-full flex-col items-center justify-center bg-transparent px-[20px] pb-[20px] pt-[20px]">
        <div className="w-full max-w-[1200px] flex flex-col gap-[32px]">
          <div className="w-full flex items-center">
            <h2 className={`${gilroyMedium.className} text-[28px] min-[1024px]:text-[32px] text-white font-medium`}>Related Articles</h2>
          </div>
          <div className="flex w-full flex-col min-[1024px]:flex-row items-center justify-center min-[1024px]:justify-between gap-[24px]">
            {LATEST_NEWS_ARTICLES.slice(0, 3).map((article) => (
              <LatestNewsCard key={article.nodeId} {...article} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
