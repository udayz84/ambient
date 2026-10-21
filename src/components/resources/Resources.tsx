import { ResourcesPageClient } from "./ResourcesPageClient";
import type { ResourceArticle } from "./resources-data";
import { TabletScaleInit } from "../shared/TabletScaleInit";

type ResourcesProps = {
  data?: any;
  articles?: ResourceArticle[];
};

export function Resources({ data, articles }: ResourcesProps = {}) {
  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <TabletScaleInit />
      <ResourcesPageClient data={data} articles={articles} />
    </main>
  );
}
