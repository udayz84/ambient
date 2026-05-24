import Image from "next/image";
import { MeasuredProofCard } from "./MeasuredProofCard";
import { MeasuredProofCtas } from "./MeasuredProofCtas";
import { MeasuredProofHeader } from "./MeasuredProofHeader";

const CARDS = [
  {
    nodeId: "2379:1504",
    metric: "100x",
    label: "LOWER POWER CONSUMPTION",
    description:
      "Extend battery life at the edge and lower energy Opex in more compute-intensive environments",
    imageSrc: "/measured-proof/card-power.png",
    imageWidth: 270.353,
    imageHeight: 250,
    imageTop: 161,
    imageClassName:
      "absolute top-[-16.05%] left-0 h-[135.04%] w-full max-w-none",
    statWidth: 299,
    descriptionWidth: 290,
  },
  {
    nodeId: "2379:1524",
    metric: "25x",
    label: "AI PERFORMANCE",
    description:
      "Unlock richer models, faster local inference, and more capable intelligence in constrained systems",
    imageSrc: "/measured-proof/card-ai.png",
    imageWidth: 331.144,
    imageHeight: 260,
    imageTop: 169,
    statWidth: 187,
    descriptionWidth: 319,
    statJustifyEnd: true,
  },
  {
    nodeId: "2379:1539",
    metric: "10x",
    label: "COMPUTE DENSITY",
    description:
      "Pack more intelligence into the same footprint without scaling power and system complexity the old way",
    imageSrc: "/measured-proof/card-density.png",
    imageWidth: 305.672,
    imageHeight: 240,
    imageTop: 174.67,
    statWidth: 225,
    descriptionWidth: 317,
  },
  {
    nodeId: "2379:1554",
    metric: "100%",
    label: "PROGRAMMABLE DESIGN",
    description:
      "Preserve the freedom to build differentiated AI systems without locking into rigid fixed-function tradeoffs",
    imageSrc: "/measured-proof/card-programmable.png",
    imageWidth: 218.055,
    imageHeight: 260,
    imageTop: 151,
    imageClassName:
      "absolute top-[-11.4%] left-[-30.32%] h-[122.8%] w-[146.43%] max-w-none",
    statWidth: 271,
    descriptionWidth: 320,
    descriptionBottom: 137.5,
    statJustifyEnd: true,
  },
] as const;

export function MeasuredProof() {
  return (
    <section
      className="relative mx-auto h-[945px] w-full max-w-[1440px] overflow-hidden bg-black"
      data-node-id="2379:1464"
      data-name="Section 6"
      aria-label="Measured proof in silicon"
    >
      <div
        className="pointer-events-none absolute top-[calc(50%-15.5px)] left-1/2 h-[880px] w-[1440px] -translate-x-1/2 -translate-y-1/2"
        data-node-id="2379:1466"
        data-name="image 90"
      >
        <Image
          src="/measured-proof/bg-image-90.png"
          alt=""
          fill
          className="object-cover object-bottom opacity-75"
          sizes="1440px"
        />
      </div>

      <div
        className="pointer-events-none absolute top-0 left-[0.11328125px] h-[260px] w-[1441px]"
        data-node-id="2379:1467"
      >
        <Image
          src="/measured-proof/gradient-top.png"
          alt=""
          fill
          className="object-cover"
          sizes="1441px"
        />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 flex h-[341px] w-[1441px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative h-[341px] w-[1441px]" data-node-id="2379:1468">
            <Image
              src="/measured-proof/gradient-bottom.png"
              alt=""
              fill
              className="object-cover"
              sizes="1441px"
            />
          </div>
        </div>
      </div>

      <MeasuredProofHeader />

      <div
        className="absolute top-1/2 left-[120px] flex -translate-y-1/2 content-stretch items-center gap-[24px]"
        data-node-id="2379:1503"
        data-name="Measured proof in silicon"
      >
        {CARDS.map((card) => (
          <MeasuredProofCard key={card.nodeId} {...card} />
        ))}
      </div>

      <MeasuredProofCtas />
    </section>
  );
}
