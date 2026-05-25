import { SiteFooter } from "../site-footer/SiteFooter";
import { ResourcesBuilding } from "./ResourcesBuilding";
import { ResourcesContent } from "./ResourcesContent";
import { ResourcesFeatured } from "./ResourcesFeatured";
import { ResourcesHero } from "./ResourcesHero";
import { ResourcesNewsCta } from "./ResourcesNewsCta";

export function Resources() {
  return (
    <main className="flex w-full flex-col overflow-x-clip bg-black">
      <div
        className="relative -mt-[78px] mx-auto h-[4525px] w-full max-w-[1440px] min-w-[1440px] overflow-hidden bg-black"
        data-node-id="2379:1601"
        data-name="Resources - Option 8"
      >
        <ResourcesHero />
        <ResourcesFeatured />
        <ResourcesBuilding />
        <ResourcesContent />
        <ResourcesNewsCta />

        <div className="absolute top-[3273px] left-0 w-full [&_footer]:mt-0">
          <SiteFooter />
        </div>
      </div>
    </main>
  );
}
