import type { Metadata } from "next";
import { Company } from "@/components/company/Company";
import { getSingleType } from "@/lib/strapi";
import { buildMetadata, type SeoData } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  let seo: SeoData | null = null;
  try {
    const data = await getSingleType<{ seo: SeoData | null }>(
      "company-page",
      ["seo"]
    );
    seo = data?.seo ?? null;
  } catch {
    seo = null;
  }
  return buildMetadata(seo, {
    title: "Company",
    description:
      "A new paradigm for efficient AI compute. We build energy-aware, programmable, mixed-signal AI processors that unlock orders-of-magnitude improvements in performance-per-watt.",
  });
}

export default async function CompanyPage() {
  let data: any = null;
  try {
    data = await getSingleType<any>("company-page", [
      "hero",
      "mission",
      { section: "leadership", nested: ["team", "advisory_board"] },
      "dna",
      { section: "ecosystem", fields: ["map_image"], nested: ["columns"] },
      { section: "tech_partners", nested: ["partners"] },
      { section: "articles", nested: ["featured_article", "compact_articles"] },
      { section: "engagement", fields: ["background_image"], nested: ["cards", "join_team"] },
      "seo",
    ]);
  } catch {
    // Strapi unavailable — render with no data; sections will be skipped
  }
  return <Company data={data} />;
}
