import type { Metadata } from "next";
import { Dvk } from "@/components/dvk/Dvk";
import { getSingleType } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Cranium Development Kit | Ambient Scientific",
  description:
    "Validate real-time AI at microwatt power levels out of the box. The Cranium Development Kit comes fully loaded with onboard sensors, rich I/O, and pre-integrated drivers.",
};

export default async function DvkPage() {
  let data: any = null;
  try {
    data = await getSingleType<any>("dvk-page", [
      "hero",
      "hardware_stack",
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
