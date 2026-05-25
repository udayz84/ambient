import { CAREERS_WORK_CARDS } from "./careers-data";
import { CareersFramedTitle, CareersGradientCard } from "./careers-shared";

export function CareersBestWork() {
  return (
    <section
      className="absolute top-[827px] left-[60.01px] z-10 flex w-[1319.98px] flex-col items-center gap-[40px]"
      data-node-id="2379:8710"
      aria-label="Do the best work of your life"
    >
      <CareersFramedTitle
        nodeId="2379:8711"
        frameSrc="/careers/title-frame-616.svg"
        frameClassName="top-[1.03px] left-[0.84px] h-[59px] w-[614.32px]"
        gradientDeg="127.769deg"
        className="h-[61px] w-[616px] shrink-0"
      >
        Do the best work of your life
      </CareersFramedTitle>

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
