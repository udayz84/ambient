import type { Metadata } from "next";
import { Careers } from "@/components/careers/Careers";
import { getSingleType } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Careers | Ambient Scientific",
  description:
    "Join Ambient Scientific to re-architect the physics of AI and build the fundamental compute substrate for the next generation of intelligence.",
};

export default async function CareersPage() {
  let data: any = null;
  try {
    data = await getSingleType<any>("careers-page", [
      "hero",
      { section: "best_work", nested: ["cards"] },
      "dna",
      "open_roles",
      { section: "benefits", fields: ["title_frame"], nested: ["cards"] },
      "bottom_cta",
      "seo",
    ]);
  } catch {
    data = null;
  }
  return <Careers data={data} />;
}
