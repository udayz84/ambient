import { interMedium } from "../hero/fonts";
import { FEATURED_RESOURCES } from "./resources-data";
import { ResourcesFeaturedCard } from "./ResourcesFeaturedCard";

export function ResourcesFeatured() {
  return (
    <section
      className="absolute top-[716px] left-[4px] flex w-[1432px] flex-col gap-[20px] bg-[#010101] px-[56px] py-[80px]"
      aria-label="Featured Resources"
      data-node-id="2379:1960"
    >
      <h2
        className={`${interMedium.className} shrink-0 text-[46px] leading-[49px] font-medium whitespace-nowrap text-white not-italic`}
        data-node-id="2379:1967"
      >
        Featured Resources
      </h2>

      <div
        className="flex w-full shrink-0 items-center gap-[20px]"
        data-node-id="2379:1968"
      >
        {FEATURED_RESOURCES.map((card) => (
          <ResourcesFeaturedCard key={card.nodeId} {...card} />
        ))}
      </div>
    </section>
  );
}
