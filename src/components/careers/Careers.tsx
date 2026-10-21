"use client";

import { useState } from "react";
import { CareersBenefits } from "./CareersBenefits";
import { CareersBestWork } from "./CareersBestWork";
import { CareersBottomCta } from "./CareersBottomCta";
import { CareersDna } from "./CareersDna";
import { CareersFooterBackdrop } from "./CareersFooterBackdrop";
import { CareersHero } from "./CareersHero";
import { CareersMobile } from "./CareersMobile";
import { CareersOpenRoles } from "./CareersOpenRoles";
import { TabletScaleInit } from "../shared/TabletScaleInit";
import { TabletScaleCanvas } from "../shared/TabletScaleCanvas";

const CAREERS_PAGE_HEIGHT_PX = 4977;

export function Careers({ data, applicationForm }: { data?: any; applicationForm?: any }) {
  const [rolesHeightDiff, setRolesHeightDiff] = useState(0);

  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <TabletScaleInit />
      {/* DESKTOP & TABLET (>=600px) */}
      <div
        className="relative mx-auto -mt-[78px] hidden w-full justify-center overflow-x-clip bg-black min-[600px]:flex"
        data-node-id="2379:8612"
        data-name="Careers - 02"
      >
        <TabletScaleCanvas
          className="relative w-[1440px] shrink-0 min-[600px]:block"
          style={{ height: CAREERS_PAGE_HEIGHT_PX - rolesHeightDiff }}
        >
          <CareersHero data={data?.hero} />
          <CareersBestWork data={data?.best_work} />
          <CareersDna data={data?.dna} />
          <CareersOpenRoles
            data={data?.open_roles}
            applicationForm={applicationForm}
            onHeightDiffChange={setRolesHeightDiff}
          />
          <CareersBenefits data={data?.benefits} offsetY={rolesHeightDiff} />
          <CareersFooterBackdrop offsetY={rolesHeightDiff} />
          <CareersBottomCta data={data?.bottom_cta} offsetY={rolesHeightDiff} />
        </TabletScaleCanvas>
      </div>

      {/* MOBILE (<600px) — dedicated stacked layout */}
      <div className="relative -mt-[78px] w-full bg-black min-[600px]:hidden">
        <CareersMobile data={data} />
      </div>
    </main>
  );
}

