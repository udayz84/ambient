import { CareersFramedTitle, CareersGradientCard } from "./careers-shared";
import { mediaUrl } from "@/lib/strapi";
import type { CareersValueCard } from "./careers-data";

export function CareersBenefits({
  data,
  offsetY = 0,
}: {
  data?: any;
  offsetY?: number;
}) {
  const heading = data?.heading || "";
  const titleFrame = "/careers/title-frame-benefits.svg";
  const cards: CareersValueCard[] = (
    Array.isArray(data?.cards) ? data.cards : []
  ).map((c: any) => ({
    icon: mediaUrl(c?.icon) || "",
    title: c?.title || "",
    description: c?.description || "",
    titleSize: "lg" as const,
  }));

  return (
    <section
      className="absolute top-[4252px] left-1/2 z-10 flex w-[1318px] flex-col items-center gap-[40px] transition-transform duration-300 ease-out"
      style={{ transform: `translate(-50%, ${-offsetY}px)` }}
      data-node-id="2379:8953"
      aria-label="Benefits and Perks"
    >
      <CareersFramedTitle
        nodeId="2379:8954"
        frameSrc={titleFrame}
        frameClassName="top-[1.1px] left-[0.84px] h-[59px] w-[374.32px]"
        gradientDeg="112.176deg"
        textClassName="text-[48px] leading-[1.1] tracking-[-0.96px]"
        textTop="top-[3.1px]"
        className="h-[61px] w-[376px] shrink-0"
      >
        {heading}
      </CareersFramedTitle>

      <div
        className="grid shrink-0 grid-cols-3 gap-x-[20px] gap-y-[20px]"
        data-node-id="2379:8961"
      >
        {cards.map((card, index) => (
          <CareersGradientCard
            key={`benefit-card-${index}`}
            card={card}
            className="cursor-pointer"
            nodeId={
              index === 0
                ? "2379:8962"
                : index === 1
                  ? "2379:8989"
                  : index === 2
                    ? "2379:9018"
                    : index === 3
                      ? "2379:8974"
                      : index === 4
                        ? "2379:9005"
                        : "2379:9030"
            }
          />
        ))}
      </div>
    </section>
  );
}
