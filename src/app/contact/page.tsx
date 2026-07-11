import type { Metadata } from "next";
import { Contact } from "@/components/contact/Contact";
import { getSingleType } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Contact | Ambient Scientific",
  description:
    "Get in touch with Ambient Scientific engineering, commercial, and support teams.",
};

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
  return <Contact data={data} />;
}
