import Image from "next/image";
import { TechnologyFeatureStat } from "./TechnologyFeatureStat";
import { TechnologyGridLine } from "./TechnologyGridLine";
import { Corners } from "../shared/Corners";

export function TechnologyFeatures() {
  return (
    <div
      className="absolute top-[612.5px] z-10 flex min-h-[290px] w-[1204px] content-stretch items-start justify-center gap-[32px] border-[0.5px] border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.1)] px-[20px]"
      style={{ left: "calc(50% - 13.61px)", transform: "translateX(-50%)" }}
      data-node-id="2379:1432"
      data-name="Frame 1000003873"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/technology/feature-frame-border.svg"
          alt=""
          fill
          className="object-fill"
          sizes="1204px"
        />
      </div>
      <Corners />

      <TechnologyFeatureStat
        nodeId="2379:1433"
        iconSrc="/technology/icon-speak-ai.svg"
        iconWidth={42.111}
        title={
          <>
            <p className="mb-0 leading-[38px]">Speak AI</p>
            <p className="leading-[38px]">natively</p>
          </>
        }
        description="Standard chips waste time translating AI workloads. Our architecture processes matrix math natively for high-density performance."
      />

      <TechnologyGridLine />

      <TechnologyFeatureStat
        nodeId="2379:1443"
        iconSrc="/technology/icon-compute.svg"
        iconWidth={42.02}
        title="Compute where the data lives"
        description="We built our analog processing engine in memory. Processing in place eliminates data commute, saving battery life."
      />

      <TechnologyGridLine />

      <TechnologyFeatureStat
        nodeId="2379:1453"
        iconSrc="/technology/icon-tools.svg"
        iconWidth={42}
        title="Standard tools. zero friction"
        description="Our platform adapts to your software. Compile your PyTorch or TensorFlow models in minutes, no coding needed."
      />
    </div>
  );
}
