import type { Metadata } from "next";
import { WearablesHero } from "@/components/wearables/WearablesHero";
import { WearablesParadigm } from "@/components/wearables/WearablesParadigm";
import { WearablesEmpiricalProof } from "@/components/wearables/WearablesEmpiricalProof";
import { WearablesLabToProduct } from "@/components/wearables/WearablesLabToProduct";
import { WearablesSubconscious } from "@/components/wearables/WearablesSubconscious";
import { WearablesFooterAccent } from "@/components/wearables/WearablesFooterAccent";

export const metadata: Metadata = {
  title: "Wearables | Ambient Scientific",
  description:
    "Hospital-grade biometric tracking and voice processing directly to the ring, wrist, or lens. No cloud latency or battery compromise.",
};

export default function WearablesPage() {
  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <WearablesHero />
      <WearablesParadigm />
      <WearablesEmpiricalProof />
      <WearablesSubconscious />
      <WearablesLabToProduct />
      <WearablesFooterAccent />
    </main>
  );
}
