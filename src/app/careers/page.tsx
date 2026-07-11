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
      { section: "open_roles", nested: ["job_categories.jobs"] },
      { section: "benefits", nested: ["cards"] },
      "bottom_cta",
      "seo",
    ]);

    if (data?.open_roles && data.open_roles.job_categories) {
      const categories = data.open_roles.job_categories;
      const allJobs: any[] = [];
      categories.forEach((cat: any) => {
        if (cat.jobs) {
          cat.jobs.forEach((job: any) => {
            allJobs.push({
              title: job.title,
              location: job.location,
              apply_url: job.apply_url,
              category: cat.category_name
            });
          });
        }
      });
      data.open_roles.fetchedJobs = allJobs;
      data.open_roles.fetchedCategories = categories.map((c: any) => ({ name: c.category_name }));
    }
  } catch (err) {
    console.error("Error fetching careers data:", err);
  }
  
  return <Careers data={data} />;
}
