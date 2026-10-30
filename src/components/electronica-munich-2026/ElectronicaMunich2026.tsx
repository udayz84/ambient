"use client";

import { TabletScaleInit } from "@/components/shared/TabletScaleInit";
import { ElectronicaHero } from "./ElectronicaHero";
import { ElectronicaWhatChanges } from "./ElectronicaWhatChanges";
import { ElectronicaProof } from "./ElectronicaProof";
import { ElectronicaWhatCouldYouBuild } from "./ElectronicaWhatCouldYouBuild";
import { ElectronicaWaysToBuild } from "./ElectronicaWaysToBuild";
import { ElectronicaCenterEcosystem } from "./ElectronicaCenterEcosystem";
import { ElectronicaSeeItRun } from "./ElectronicaSeeItRun";
import { ElectronicaMeetInPerson } from "./ElectronicaMeetInPerson";
import { ElectronicaGiveaway } from "./ElectronicaGiveaway";
import { ElectronicaStayUpdated } from "./ElectronicaStayUpdated";
import { ElectronicaClose } from "./ElectronicaClose";

export function ElectronicaMunich2026() {
  return (
    <main className="flex min-h-screen w-full flex-col overflow-x-clip bg-black text-white lg:-mb-[240px]">
      <TabletScaleInit />
      {/* Section 1: Hero */}
      <ElectronicaHero />
      {/* Section 2: What GPX Changes */}
      <ElectronicaWhatChanges />
      {/* Section 3: Proof / Case Studies */}
      <ElectronicaProof />
      {/* Section 4: What Could You Build? */}
      <ElectronicaWhatCouldYouBuild />
      {/* Section 5: The Ambient Ecosystem */}
      <ElectronicaWaysToBuild />
      <ElectronicaCenterEcosystem />
      {/* Live Hardware Demo */}
      <ElectronicaSeeItRun />
      {/* Section 6: Electronica 2026 */}
      <ElectronicaMeetInPerson />
      {/* Section 7: Put GPX10 Pro on Your Bench (Giveaway & Lead Capture) */}
      <div id="eval-kit-form">
        <ElectronicaGiveaway />
      </div>
      <ElectronicaStayUpdated />
      {/* Section 8: Close */}
      <ElectronicaClose />
    </main>
  );
}

