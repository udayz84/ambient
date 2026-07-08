import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import { Corners } from "../shared/Corners";
import { TechnologyFeatureStat } from "./TechnologyFeatureStat";
import { TechnologyGridLine } from "./TechnologyGridLine";

const FALLBACK_FEATURES = [
  {
    iconSrc: "/technology/icon-speak-ai.svg",
    iconWidth: 42.111,
    titleParts: ["Speak AI", "natively"],
    description:
      "Standard chips waste time translating AI workloads. Our architecture processes matrix math natively for high-density performance.",
  },
  {
    iconSrc: "/technology/icon-compute.svg",
    iconWidth: 42.02,
    titleParts: ["Compute where the data lives"],
    description:
      "We built our analog processing engine in memory. Processing in place eliminates data commute, saving battery life.",
  },
  {
    iconSrc: "/technology/icon-tools.svg",
    iconWidth: 42,
    titleParts: ["Standard tools. zero friction"],
    description:
      "Our platform adapts to your software. Compile your PyTorch or TensorFlow models in minutes, no coding needed.",
  },
] as const;

export function TechnologyFeatures({ data }: { data?: any }) {
  const features = (Array.isArray(data?.features) && data.features.length
    ? data.features
    : FALLBACK_FEATURES
  ).map((feature: any, index: number) => {
    const fallback = FALLBACK_FEATURES[index] || {};
    const iconSrc =
      mediaUrl(feature?.icon) || fallback.iconSrc || "/technology/icon-tools.svg";
    let titleParts: string[];
    if (index === 0) {
      const split = (feature?.title || "").split("\n");
      titleParts =
        split.length > 1
          ? split
          : [split[0] || "Speak AI", "natively"];
    } else {
      const rawTitle = feature?.title || fallback.titleParts?.[0] || "";
      titleParts = [rawTitle];
    }
    return {
      iconSrc,
      iconWidth: fallback.iconWidth ?? 42,
      titleParts,
      description: feature?.description ?? fallback.description ?? "",
    };
  });

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
      <Corners className="-m-[0.5px]" />

      {features.map((feature: any, index: number) => (
        <FeatureSlot key={index} index={index} feature={feature} />
      ))}
    </div>
  );
}

function FeatureSlot({
  index,
  feature,
}: {
  index: number;
  feature: any;
}) {
  const title =
    feature.titleParts.length > 1 ? (
      <>
        {feature.titleParts.map((part: string, i: number) => (
          <p
            key={i}
            className={i === 0 ? "mb-0 leading-[38px]" : "leading-[38px]"}
          >
            {part}
          </p>
        ))}
      </>
    ) : (
      feature.titleParts[0]
    );

  return (
    <>
      {index > 0 && <TechnologyGridLine />}
      <TechnologyFeatureStat
        nodeId={`2379:1433-${index}`}
        iconSrc={feature.iconSrc}
        iconWidth={feature.iconWidth}
        title={title}
        description={feature.description}
      />
    </>
  );
}
