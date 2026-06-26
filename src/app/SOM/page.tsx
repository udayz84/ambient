import type { Metadata } from "next";
import { SomHero } from "@/components/som-page/SomHero";
import { SomFeatures } from "@/components/som-page/SomFeatures";
import { SomInsideModule } from "@/components/som-page/SomInsideModule";
import { SomEcosystem } from "@/components/som-page/SomEcosystem";
import { SomPrototypeTitle } from "@/components/som-page/SomPrototypeTitle";

export const metadata: Metadata = {
  title: "SOM | Ambient Scientific",
  description:
    "Avoid custom RF and power management. Use our pre-engineered System-on-Modules (SOMs) for your edge AI deployments.",
};

export default function SomPage() {
  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <SomHero />
      <SomFeatures />
      <SomInsideModule />
      <SomEcosystem />
      <SomPrototypeTitle />
    </main>
  );
}
