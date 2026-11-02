"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ProductsUseCases } from "@/components/products-page/ProductsUseCases";

export function ElectronicaWhatCouldYouBuild({
  data,
  formConfig,
}: {
  data?: any;
  formConfig?: any;
}) {
  return (
    <div id="applications" className="scroll-mt-[90px]">
      <ProductsUseCases data={data} formConfig={formConfig} />
    </div>
  );
}
