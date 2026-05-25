import type { Metadata } from "next";
import { Company } from "@/components/company/Company";

export const metadata: Metadata = {
  title: "Company | Ambient Scientific",
  description:
    "A new paradigm for efficient AI compute. We build energy-aware, programmable, mixed-signal AI processors that unlock orders-of-magnitude improvements in performance-per-watt.",
};

export default function CompanyPage() {
  return <Company />;
}
