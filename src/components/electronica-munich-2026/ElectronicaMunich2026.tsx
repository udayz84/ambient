"use client";

import { TabletScaleInit } from "@/components/shared/TabletScaleInit";
import { ElectronicaHero } from "./ElectronicaHero";
import { ElectronicaWhatChanges } from "./ElectronicaWhatChanges";
import { ElectronicaProof } from "./ElectronicaProof";
import { ElectronicaWhatCouldYouBuild } from "./ElectronicaWhatCouldYouBuild";
import { ElectronicaWaysToBuild } from "./ElectronicaWaysToBuild";
import { ElectronicaCenterEcosystem } from "./ElectronicaCenterEcosystem";
import { ElectronicaMeetInPerson } from "./ElectronicaMeetInPerson";
import { ElectronicaGiveaway } from "./ElectronicaGiveaway";
import { ElectronicaStayUpdated } from "./ElectronicaStayUpdated";
// import { ElectronicaClose } from "./ElectronicaClose";

export function ElectronicaMunich2026() {
  return (
    <main className="flex min-h-screen w-full flex-col overflow-x-clip bg-black text-white">
      <TabletScaleInit />
      {/* Section 1: Hero */}
      <div id="electronica-hero" className="scroll-mt-[90px]"><ElectronicaHero /></div>
      {/* Section 2: Put GPX10 Pro on Your Bench (Giveaway & Lead Capture) */}
      <div id="eval-kit-form">
        <ElectronicaGiveaway />
      </div>
      {/* Section 3: What GPX Changes */}
      <ElectronicaWhatChanges />
      {/* Section 4: Proof / Case Studies */}
      <ElectronicaProof />
      {/* Section 5: What Could You Build? */}
      <ElectronicaWhatCouldYouBuild />
      {/* Section 6: The Ambient Ecosystem */}
      <div id="electronica-ways-to-build" className="scroll-mt-[90px]"><ElectronicaWaysToBuild /></div>
      <ElectronicaCenterEcosystem />
      {/* Section 7: Electronica 2026 */}
      <div id="electronica-meet-in-person" className="scroll-mt-[90px]"><ElectronicaMeetInPerson /></div>
      <div id="electronica-stay-updated" className="scroll-mt-[90px]"><ElectronicaStayUpdated /></div>
      {/* Section 8: Close (hidden per request) */}
      {/* <ElectronicaClose /> */}
    </main>
  );
}

