import { DeveloperPlatformCard } from "./DeveloperPlatformCard";
import { DEVELOPER_PLATFORM_CARDS } from "./developer-platform-cards";

export function DeveloperPlatformBentoGrid() {
  return (
    <div
      className="absolute top-[198.98px] left-1/2 z-10 h-[600px] w-[1204px] -translate-x-1/2"
      data-node-id="2379:986"
    >
      {DEVELOPER_PLATFORM_CARDS.map((card) => (
        <DeveloperPlatformCard key={card.nodeId} {...card} />
      ))}
    </div>
  );
}
