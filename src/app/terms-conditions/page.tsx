import type { Metadata } from "next";
import { TermsConditions } from "@/components/terms-conditions/TermsConditions";

export const metadata: Metadata = {
  title: "Terms & Conditions | Ambient Scientific",
  description: "Read Ambient Scientific's Terms & Conditions outlining the rules and guidelines for using our website and services.",
};

import { getSingleType } from "@/lib/strapi";

export default async function TermsConditionsPage() {
  let data: any = null;
  try {
    data = await getSingleType<any>("legal-page", []);
  } catch {}

  return (
    <main className="relative z-10 w-full overflow-x-clip bg-black">
      <TermsConditions data={data} />
    </main>
  );
}
