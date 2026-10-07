import type { Metadata } from "next";
import { Contact } from "@/components/contact/Contact";
import { getSingleType } from "@/lib/strapi";
import { buildMetadata, type SeoData } from "@/lib/seo";
import { NewsletterSignup } from "@/components/site-footer/NewsletterSignup";

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
      { section: "form", fields: ["tracks.icon"], nested: ["tracks.form"] },
    ]);
  } catch {
    data = null;
  }
  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <Contact data={data} />
      <div className="relative z-10 w-full flex justify-center pb-[100px] pt-[20px] min-[1024px]:pt-0">
        <NewsletterSignup />
      </div>
    </main>
  );
}
