"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ApplicationsPageWins } from "@/components/applications-page/ApplicationsPageWins";

export function ElectronicaProof({ data }: { data?: any }) {
  return (
    <div id="proof" className="scroll-mt-[90px]">
      <ApplicationsPageWins data={data} />
    </div>
  );
}
