import type { Metadata } from "next";
import { Contact } from "@/components/contact/Contact";
import { getSingleType, mediaUrl } from "@/lib/strapi";
import { buildMetadata, type SeoData } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  let seo: SeoData | null = null;
  try {
    const data = await getSingleType<{ seo: SeoData | null }>(
      "contact-page",
      ["seo"]
    );
    seo = data?.seo ?? null;
  } catch {
    seo = null;
  }
  return buildMetadata(seo, {
    title: "Contact",
    description:
      "Get in touch with Ambient Scientific engineering, commercial, and support teams.",
  });
}

export default async function ContactPage() {
  let data: any = null;
  try {
    data = await getSingleType<any>("contact-page", [
      "hero",
      { section: "resources", nested: ["ctas"] },
      { section: "map", fields: ["globe_image", "map_base"], nested: ["locations"] },
      { section: "schedule", fields: ["icon"], nested: ["cards"] },
      { section: "form", fields: ["tracks.icon", "tracks.track_form"], nested: ["tracks.form"] },
      "booking_form",
    ]);
  } catch {
    data = null;
  }

  // Fetch news-listing press kit file so the "Download Press Kit" CTA stays unified
  let pressKitHref: string | null = null;
  try {
    const newsData = await getSingleType<any>("news-listing-page", ["press_kit"]);
    pressKitHref = mediaUrl(newsData?.press_kit?.cta_file) || null;
  } catch {
    pressKitHref = null;
  }

  return (
    <Contact
      data={data}
      bookingForm={data?.booking_form ?? null}
      pressKitHref={pressKitHref}
    />
  );
}
