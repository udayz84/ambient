import Image from "next/image";
import { TechnologyFeatureStat } from "./TechnologyFeatureStat";
import { TechnologyGridLine } from "./TechnologyGridLine";

const cornerLeft = "/hero/corner-tag-1.svg";
const cornerRight = "/hero/corner-tag-2.svg";

function FeatureFrameCorners() {
  return (
    <>
      <div className="absolute top-[0.49px] right-[0.52px] flex size-[4px] items-center justify-center">
        <div className="rotate-180 flex-none">
          <div className="relative size-[4px]" data-node-id="2379:1459">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image
                src={cornerRight}
                alt=""
                width={4}
                height={4}
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-[0.52px] bottom-[0.53px] flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 rotate-180 flex-none">
          <div className="relative size-[4px]" data-node-id="2379:1460">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image
                src={cornerRight}
                alt=""
                width={4}
                height={4}
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-[0.51px] left-[0.51px] flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]" data-node-id="2379:1461">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image
                src={cornerLeft}
                alt=""
                width={4}
                height={4}
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[0.5px] left-[0.51px] size-[4px]" data-node-id="2379:1462">
        <div className="absolute inset-[0_0_-12.5%_-12.5%]">
          <Image
            src={cornerLeft}
            alt=""
            width={4}
            height={4}
            className="block size-full max-w-none"
            aria-hidden
          />
        </div>
      </div>
    </>
  );
}

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
      <FeatureFrameCorners />

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
