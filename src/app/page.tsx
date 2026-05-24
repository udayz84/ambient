import { Hero } from "@/components/hero/Hero";
import { MeasuredProof } from "@/components/measured-proof/MeasuredProof";
import { Applications } from "@/components/applications/Applications";
import { DeveloperPlatform } from "@/components/developer-platform/DeveloperPlatform";
import { Ecosystem } from "@/components/ecosystem/Ecosystem";
import { LatestNews } from "@/components/latest-news/LatestNews";
import { PlatformScale } from "@/components/platform-scale/PlatformScale";
import { SiteFooter } from "@/components/site-footer/SiteFooter";
import { Technology } from "@/components/technology/Technology";

export default function Home() {
  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <Hero />
      <MeasuredProof />
      <Technology />
      <PlatformScale />
      <Applications />
      <DeveloperPlatform />
      <Ecosystem />
      <LatestNews />
      <SiteFooter />
    </main>
  );
}
