import { Applications } from "@/components/applications/Applications";
import { DeveloperPlatform } from "@/components/developer-platform/DeveloperPlatform";
import { Ecosystem } from "@/components/ecosystem/Ecosystem";
import { Hero } from "@/components/hero/Hero";
import { LatestNews } from "@/components/latest-news/LatestNews";
import { MeasuredProof } from "@/components/measured-proof/MeasuredProof";
import { PlatformScale } from "@/components/platform-scale/PlatformScale";
import { Technology } from "@/components/technology/Technology";
import { getSingleType } from "@/lib/strapi";

export default async function Home() {
  let data: any = null;
  try {
    data = await getSingleType<any>("home-page", [
      "hero",
      { section: "measured_proof", nested: ["stat_cards"] },
      { section: "technology", nested: ["features", "image"] },
      "platform_scale",
      { section: "applications", nested: ["tabs", "cta"] },
      { section: "developer_platform", nested: ["cards"] },
      { section: "ecosystem", nested: ["silicon_partners", "development_partners", "cta"] },
      { section: "latest_news", nested: ["cards"] },
      "seo",
    ]);
  } catch {
    data = null;
  }

  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      {data?.hero && <Hero data={data.hero} />}
      {data?.measured_proof && <MeasuredProof data={data.measured_proof} />}
      {data?.technology && <Technology data={data.technology} />}
      {data?.platform_scale && <PlatformScale data={data.platform_scale} />}
      {data?.applications && <Applications data={data.applications} />}
      {data?.developer_platform && (
        <DeveloperPlatform data={data.developer_platform} />
      )}
      {data?.ecosystem && <Ecosystem data={data.ecosystem} />}
      {data?.latest_news && <LatestNews data={data.latest_news} />}
    </main>
  );
}
