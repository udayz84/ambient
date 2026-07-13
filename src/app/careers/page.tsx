import type { Metadata } from "next";
import { Careers } from "@/components/careers/Careers";
import { getSingleType, getCollection } from "@/lib/strapi";

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
      { section: "open_roles" },
      { section: "benefits", nested: ["cards"] },
      "bottom_cta",
      "seo",
    ]);

    const jobs = await getCollection<any>("jobs", "populate=*");

    if (data?.open_roles) {
      data.open_roles.fetchedJobs = jobs.map((job: any) => ({
        title: job.title,
        location: job.location?.name || "Unknown",
        apply_url: job.apply_url,
        category: job.category?.name || "Unknown",
      }));

      const categories = Array.from(new Set(data.open_roles.fetchedJobs.map((j: any) => j.category)));
      data.open_roles.fetchedCategories = categories.map(c => ({ name: c as string }));
    }
  } catch (err) {
    console.error("Error fetching careers data:", err);
  }
  
  return <Careers data={data} />;
}
