import type { Metadata } from "next";
import { Resources } from "@/components/resources/Resources";
import { getSingleType } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Resources | Ambient Scientific",
  description:
    "Explore whitepapers, architectural deep-dives, case studies, and performance data from Ambient Scientific.",
};

export default async function ResourcesPage() {
  let data: any = null;
  try {
    data = await getSingleType<any>("resources-page", [
      "hero",
      { section: "featured", nested: ["cards"] },
      "building",
      "content",
      "news_cta",
      "seo",
    ]);
  } catch {
    data = null;
  }
  return <Resources data={data} />;
}
