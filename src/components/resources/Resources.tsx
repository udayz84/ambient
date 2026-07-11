import { ResourcesPageClient } from "./ResourcesPageClient";
import type { ResourceArticle } from "./resources-data";

type ResourcesProps = {
  data?: any;
  articles?: ResourceArticle[];
};

export function Resources({ data, articles }: ResourcesProps = {}) {
  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <ResourcesPageClient data={data} articles={articles} />
    </main>
  );
}
