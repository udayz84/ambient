import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { mediaUrl } from "@/lib/strapi";
import { humanizeArticleCategory } from "../resources/resources-data";

export function ArticleDetail({ data }: { data: any }) {
  const title = data?.title || "";
  const category = data?.category
    ? humanizeArticleCategory(data.category).toUpperCase()
    : "";
  const body = data?.body || "";
  const imageUrl = mediaUrl(data?.featured_image);

  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black min-h-screen">
      {/* Banner */}
      <section className="relative flex w-full flex-col items-center justify-center bg-black pt-[120px] pb-[60px] min-[1024px]:pt-[180px] min-[1024px]:pb-[80px]">
        {imageUrl && (
          <div className="absolute inset-0 pointer-events-none opacity-40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" src={imageUrl} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          </div>
        )}
        <div className="relative z-10 flex w-full max-w-[800px] flex-col items-center px-[20px] text-center">
          {category && (
            <span
              className={`${interRegular.className} mb-[24px] rounded-full border border-white/20 bg-white/5 px-[16px] py-[6px] text-[12px] font-medium tracking-widest text-[#53d824] backdrop-blur-md uppercase`}
            >
              {category}
            </span>
          )}
          <div className="relative px-[20px] py-[10px]">
            <Corners />
            <h1
              className={`${gilroyMedium.className} text-[32px] leading-[40px] min-[1024px]:text-[56px] min-[1024px]:leading-[64px] font-medium text-white`}
            >
              {title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative flex w-full justify-center px-[20px] pb-[120px]">
        <div className="w-full max-w-[800px] text-white">
          <div
            className="text-[18px] leading-[32px] font-normal text-[#f0f0f0] [&>h1]:text-white [&>h1]:text-[32px] [&>h1]:font-medium [&>h1]:mb-[16px] [&>h2]:text-white [&>h2]:text-[24px] [&>h2]:font-medium [&>h2]:mb-[16px] [&>h2]:mt-[32px] [&>h3]:text-white [&>h3]:text-[20px] [&>h3]:font-medium [&>h3]:mb-[12px] [&>h3]:mt-[24px] [&>p]:mb-[16px] [&>ul]:mb-[16px] [&>ul]:list-disc [&>ul]:pl-[24px] [&>ol]:mb-[16px] [&>ol]:list-decimal [&>ol]:pl-[24px] [&>li]:mb-[8px] [&_a]:text-[#53d824] hover:[&_a]:opacity-80 [&_a]:underline [&_img]:rounded-[16px] [&_img]:w-full [&_img]:object-cover [&_img]:my-[32px] [&>blockquote]:border-l-[4px] [&>blockquote]:border-[#53d824] [&>blockquote]:pl-[16px] [&>blockquote]:italic [&>blockquote]:text-white/80 [&>blockquote]:my-[24px]"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>
      </section>
    </main>
  );
}
