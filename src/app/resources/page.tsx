import type { Metadata } from "next";
import { Resources } from "@/components/resources/Resources";

export const metadata: Metadata = {
  title: "Resources | Ambient Scientific",
  description:
    "Explore whitepapers, architectural deep-dives, case studies, and performance data from Ambient Scientific.",
};

export default function ResourcesPage() {
  return <Resources />;
}
