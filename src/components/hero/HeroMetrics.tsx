import Image from "next/image";
import { gilroySemiBold } from "./fonts";
import { HeroStat } from "./HeroStat";

const statValueGradient = (deg: number) =>
  `linear-gradient(${deg}deg, rgb(255, 255, 255) 29.352%, rgba(115, 115, 115, 0.5) 98.158%)`;

export function HeroMetrics() {
  return (
    <div
      className="absolute top-[554px] left-[120px] flex h-[244px] w-[468px] content-stretch items-center justify-center gap-[24px] py-[30px]"
      data-node-id="2379:742"
      data-name="Mesarable Proof Metrics"
    >
      <HeroStat
        tag="Real-time AI at edge"
        tagWidth={180}
        labelOffsetX={74.5}
        rightBarLeft={170.48}
        tagNodeId="2379:744"
        statNodeId="2379:743"
        width={195}
        contentClassName="w-[195px]"
        descriptionWidth="195.145px"
        value={
          <p
            className={`${gilroySemiBold.className} min-w-full w-[min-content] shrink-0 bg-clip-text text-[40px] leading-[1.2] text-transparent`}
            style={{
              backgroundImage: statValueGradient(152.329),
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2379:754"
          >
            100%
          </p>
        }
        title="Programmability"
        description="AI cores with 4 to 32 bit resolution for control in applications."
      />
      <div
        className="relative h-[112px] w-[8px] shrink-0"
        data-node-id="2379:758"
        data-name="Grid Line'"
      >
        <Image
          src="/hero/grid-line.svg"
          alt=""
          fill
          className="object-fill"
          aria-hidden
        />
      </div>
      <HeroStat
        tag="Scalable arch."
        tagWidth={129}
        labelOffsetX={49}
        rightBarLeft={121.48}
        tagNodeId="2379:763"
        statNodeId="2379:762"
        width={217}
        pl={5}
        value={
          <p
            className={`${gilroySemiBold.className} min-w-full w-[min-content] shrink-0 leading-[0] text-transparent`}
            style={{
              backgroundImage: statValueGradient(154.251),
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2379:773"
          >
            <span className="text-[40px] leading-[1.2]">512</span>
            <span className="text-[12px] leading-[1.2]">{` GOPs`}</span>
          </p>
        }
        title="Peak Performance"
        description="Unmatched AI throughput far exceeds typical low-power MCUs."
      />
    </div>
  );
}
