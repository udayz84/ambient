import { CAREERS_BENEFITS_CARDS } from "./careers-data";
import { CareersFramedTitle, CareersGradientCard } from "./careers-shared";

export function CareersBenefits() {
  return (
    <section
      className="relative mt-[40px] flex w-full flex-col items-center gap-[40px] px-[24px] md:px-[40px] lg:mt-[130px] lg:px-[60px]"
      data-node-id="2379:8953"
      aria-label="Benefits and Perks"
    >
      <CareersFramedTitle
        nodeId="2379:8954"
        frameSrc="/careers/title-frame-benefits.svg"
        frameClassName="top-[1.1px] left-[0.84px] h-[59px] w-[374.32px] hidden md:block"
        gradientDeg="112.176deg"
        textClassName="text-[36px] leading-[1.1] tracking-[-0.72px] md:text-[48px] md:tracking-[-0.96px]"
        textTop="top-[3.1px]"
        className="h-[61px] w-[376px] shrink-0"
      >
        Benefits &amp; Perks
      </CareersFramedTitle>

      <div
        className="grid w-full max-w-[1318px] shrink-0 grid-cols-1 gap-x-[20px] gap-y-[20px] sm:grid-cols-2 lg:grid-cols-3"
        data-node-id="2379:8961"
      >
        {CAREERS_BENEFITS_CARDS.map((card, index) => (
          <CareersGradientCard
            key={card.title}
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
