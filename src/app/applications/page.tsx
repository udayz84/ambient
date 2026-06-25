import type { Metadata } from "next";
import { ApplicationsPageHero } from "@/components/applications-page/ApplicationsPageHero";
import { ApplicationsPageDvk } from "@/components/applications-page/ApplicationsPageDvk";
import { ApplicationsPageContinuum } from "@/components/applications-page/ApplicationsPageContinuum";
import { ApplicationsPageArticles } from "@/components/applications-page/ApplicationsPageArticles";
import { ApplicationsPageWins } from "@/components/applications-page/ApplicationsPageWins";
import { ApplicationsPageSom } from "@/components/applications-page/ApplicationsPageSom";

export const metadata: Metadata = {
  title: "Applications | Ambient Scientific",
  description:
    "From microwatt edge sensors running on coin cells to air-cooled high-performance compute arrays, the GPX architecture scales seamlessly across the physical world.",
};

export default function ApplicationsPage() {
  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <ApplicationsPageHero />
      <ApplicationsPageDvk />
      <ApplicationsPageContinuum />
      <ApplicationsPageArticles />
      <ApplicationsPageWins />
      <ApplicationsPageSom />
    </main>
  );
}
