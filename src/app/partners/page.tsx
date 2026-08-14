import type { Metadata } from "next";
import { Partners } from "@/components/partners/Partners";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "You bring the vision. Our partners help you build it. Find GPX-native partners across algorithms, firmware, hardware, design, and manufacturing — wherever you build.",
};

export default function PartnersPage() {
  return <Partners />;
}
