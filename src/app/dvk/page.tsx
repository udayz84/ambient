import type { Metadata } from "next";
import { Dvk } from "@/components/dvk/Dvk";
import { getSingleType } from "@/lib/strapi";
import { buildMetadata, type SeoData } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  let seo: SeoData | null = null;
  try {
    const data = await getSingleType<{ seo: SeoData | null }>(
      "dvk-page",
      ["seo"]
    );
    seo = data?.seo ?? null;
  } catch {
    seo = null;
  }
  return buildMetadata(seo, {
    title: "Cranium Development Kit | Ambient Scientific",
    description:
      "Validate real-time AI at microwatt power levels out of the box. The Cranium Development Kit comes fully loaded with onboard sensors, rich I/O, and pre-integrated drivers.",
  });
}

export default async function DvkPage() {
  let data: any = null;
  try {
    data = await getSingleType<any>("dvk-page", [
      "hero",
      { section: "inside_module", fields: ["image"], nested: ["specs"] },
      { section: "demos", nested: ["demo_cards"] },
      "modelforge",
      { section: "integrated_modules", nested: ["cards"] },
      "seo",
    ]);
  } catch {
    data = null;
  }
  return <Dvk data={data} />;
}
