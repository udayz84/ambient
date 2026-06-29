import type { Metadata } from "next";
import { DeveloperHero } from "@/components/developer/DeveloperHero";
import { DeveloperCodeSection } from "@/components/developer/DeveloperCodeSection";
import { DeveloperPipeline } from "@/components/developer/DeveloperPipeline";
import { DeveloperComingSoon } from "@/components/developer/DeveloperComingSoon";
import { DeveloperModulesSection } from "@/components/developer/DeveloperModulesSection";
import { DeveloperCopilotsSection } from "@/components/developer/DeveloperCopilotsSection";
import { ScaledCanvas } from "@/components/developer/ScaledCanvas";

export const metadata: Metadata = {
  title: "Developer | Ambient Scientific",
  description:
    "ModelForge bridges training and deployment. Quantize, compile, and merge neural networks with your firmware — model to deployment in 15 minutes.",
};

/**
 * Desktop canvas ends at 4421 (where the global SiteFooter begins); the
 * co-pilots section overflows to 4785, merging into the footer. The
 * ScaledCanvas shrinks the whole 1440 design to fit narrower viewports.
 * Figma 2438:4365.
 */
const CANVAS_HEIGHT = 4421;

export default function DeveloperPage() {
  return (
    <main className="relative z-10 w-full overflow-x-clip bg-black">
      <div className="-mt-[78px]">
        <ScaledCanvas width={1440} height={CANVAS_HEIGHT}>
          <DeveloperHero />
          <DeveloperCodeSection />
          <DeveloperPipeline />
          <DeveloperComingSoon />
          <DeveloperModulesSection />
          <DeveloperCopilotsSection />
        </ScaledCanvas>
      </div>
    </main>
  );
}
