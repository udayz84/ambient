import type { Metadata } from "next";
import { Partners } from "@/components/partners/Partners";
import { mapPartnersPage } from "@/components/partners/partners-content";
import { getSingleType } from "@/lib/strapi";
import { buildMetadata, type SeoData } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  let seo: SeoData | null = null;
  try {
    const data = await getSingleType<{ seo: SeoData | null }>(
      "partners-page",
      ["seo"]
    );
    seo = data?.seo ?? null;
  } catch {
    seo = null;
  }
  return buildMetadata(seo, {
    title: "Partners",
    description:
      "You bring the vision. Our partners help you build it. Find GPX-native partners across algorithms, firmware, hardware, design, and manufacturing — wherever you build.",
  });
}

export default async function PartnersPage() {
  let data: any = null;
  try {
    data = await getSingleType<any>("partners-page", [
      "hero",
      "why",
      "benefits",
      "capabilities",
      "proof",
      { section: "directory", nested: ["partners.badges"] },
      "match_form",
      "become",
      "footer_ctas",
      "seo",
    ]);
  } catch {
    // Strapi unavailable — the mapper falls back to the hardcoded copy.
  }
  return <Partners content={mapPartnersPage(data)} />;
}
