import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ElectronicaMunich2026 } from "@/components/electronica-munich-2026/ElectronicaMunich2026";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(null, {
    title: "Electronica Munich 2026 | Ambient Scientific",
    description:
      "Join Ambient Scientific at Electronica Munich 2026 to experience breakthroughs in ultra-low-power edge AI processors and solutions.",
  });
}

export default function ElectronicaMunich2026Page() {
  return <ElectronicaMunich2026 />;
}

