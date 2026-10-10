import type { Metadata } from "next";
import { PrivacyPolicy } from "@/components/privacy-policy/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Privacy Policy | Ambient Scientific",
  description: "Learn how Ambient Scientific collects, uses, and protects your data in compliance with privacy regulations.",
};

import { getSingleType } from "@/lib/strapi";

export default async function PrivacyPolicyPage() {
  let data: any = null;
  try {
    data = await getSingleType<any>("legal-page", []);
  } catch {}

  return (
    <main className="relative z-10 w-full overflow-x-clip bg-black">
      <PrivacyPolicy data={data} />
    </main>
  );
}
