import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import { Corners } from "../shared/Corners";
import { TechnologyFeatureStat } from "./TechnologyFeatureStat";
import { TechnologyGridLine } from "./TechnologyGridLine";

const FALLBACK_FEATURE_WIDTHS = [42.111, 42.02, 42] as const;

export function TechnologyFeatures({ data }: { data?: any }) {
  const features = (Array.isArray(data?.features) ? data.features : []).map((feature: any, index: number) => {
    const iconWidth = FALLBACK_FEATURE_WIDTHS[index] ?? 42;
    const iconSrc = mediaUrl(feature?.icon) || "";
    let titleParts: string[];
    if (index === 0) {
      const rawTitle = (feature?.title || "").replace(/\\n/g, "\n");
      titleParts = rawTitle.split("\n");
    } else {
      titleParts = [feature?.title || ""];
    }
    return {
      iconSrc,
      iconWidth,
      titleParts,
      description: feature?.description ?? "",
    };
  });

  return (
    <div
      className="absolute top-[612.5px] left-1/2 z-10 flex min-h-[290px] w-[1204px] -translate-x-1/2 content-stretch items-start justify-center gap-[32px] border-[0.5px] border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.1)] px-[20px]"
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
