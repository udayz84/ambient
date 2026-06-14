import { CornerDecor, GradientTitle } from "../contact/contact-shared";
import { CAREERS_WORK_CARDS } from "./careers-data";
import { CareersGradientCard } from "./careers-shared";

export function CareersBestWork() {
  return (
    <section
      className="absolute top-[827px] left-1/2 z-10 flex w-[1319.98px] -translate-x-1/2 flex-col items-center gap-[40px]"
      data-node-id="2379:8710"
      aria-label="Do the best work of your life"
    >
      <div
        className="relative flex flex-col items-center px-[10px]"
        data-node-id="2379:8711"
      >
        <GradientTitle
          nodeId="2379:8712"
          gradientDeg="127.769deg"
          className="text-center whitespace-nowrap"
        >
          Do the best work of your life
        </GradientTitle>
        <CornerDecor />
      </div>

      <div
        className="flex w-[1318px] shrink-0 items-center gap-[20px]"
        data-node-id="2379:8718"
      >
        {CAREERS_WORK_CARDS.map((card, index) => (
          <CareersGradientCard
            key={card.title}
            card={card}
            nodeId={index === 0 ? "2379:8719" : index === 1 ? "2379:8730" : "2379:8743"}
          />
        ))}
      </div>
    </section>
  );
}
