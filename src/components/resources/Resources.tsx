import { ResourcesPageClient } from "./ResourcesPageClient";

type ResourcesProps = {
  data?: any;
};

export function Resources({ data }: ResourcesProps = {}) {
  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <ResourcesPageClient data={data} />
    </main>
  );
}
