import { useState } from "react";
import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { GreenCtaButton } from "../contact/contact-shared";
import type { ResourceFeaturedCard } from "./resources-data";
import { Corners } from "../shared/Corners";
import { ResourceDownloadModal } from "./ResourceDownloadModal";

const badgeCornerTl = "/resources/badge-corner-tl.svg";
const badgeCornerTr = "/resources/badge-corner-tr.svg";
const cardCornerLeft = "/hero/vector-57.svg";
const cardCornerRight = "/hero/vector-55.svg";

const FALLBACK_TITLE = "Re-architecting the Physics of AI Compute.";
const FALLBACK_DESCRIPTION =
  "Standard chips waste time translating AI workloads. Our architecture processes matrix math natively for high-density performance.";
const FALLBACK_CTA_LABEL = "Download PDF";

type ResourcesFeaturedCardProps = ResourceFeaturedCard & {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  pdfUrl?: string;
  enableDownloadPopup?: boolean;
};

export function ResourcesFeaturedCard({
  nodeId,
  imageNodeId,
  imageWidth,
  imageSrc,
  imageClassName,
  badgeNodeId,
  badgeLabel,
  badgeVariant,
  title = FALLBACK_TITLE,
  description = FALLBACK_DESCRIPTION,
  ctaLabel = FALLBACK_CTA_LABEL,
  ctaHref = "#",
  pdfUrl,
  enableDownloadPopup = false,
}: ResourcesFeaturedCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const targetUrl = pdfUrl || ctaHref;

  const handleCtaClick = (e: React.MouseEvent) => {
    if (enableDownloadPopup && targetUrl) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <article
        className="relative flex min-w-px flex-[1_0_0] flex-col gap-[8px] overflow-clip border-[0.5px] border-solid border-[rgba(255,255,255,0.3)] bg-[#191919] p-[10px]"
        data-node-id={nodeId}
      >
        <div
          className="relative flex h-[281px] shrink-0 flex-col items-end overflow-clip p-[12px]"
          style={{ width: imageWidth }}
          data-node-id={imageNodeId}
          data-name="Image"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className={imageClassName} src={imageSrc} />
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(25,25,25,0)] from-[79.181%] to-[#191919]" />
          </div>
          <WhitepaperBadge
            nodeId={badgeNodeId}
            label={badgeLabel}
            variant={badgeVariant}
          />
        </div>

        <div className="flex w-full flex-col gap-[24px] p-[16px]">
          <div className="flex flex-col gap-[12px]">
            <h3
              className={`${gilroyMedium.className} w-[290px] text-[22px] leading-[28px] font-medium text-white opacity-90 not-italic [word-break:break-word]`}
            >
              {title}
            </h3>
            <p
              className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-[#a4a4a4] opacity-90 not-italic [word-break:break-word]`}
            >
              {description}
            </p>
          </div>
          <div onClick={handleCtaClick}>
            <GreenCtaButton
              className="w-[231px]"
              href={targetUrl}
              download={!!pdfUrl && !enableDownloadPopup}
              textClassName={`${gilroyMedium.className} text-[16px] leading-[28px] font-medium`}
            >
              {ctaLabel}
            </GreenCtaButton>
          </div>
        </div>

        <Corners leftSrc={cardCornerLeft} rightSrc={cardCornerRight} />
      </article>

      {enableDownloadPopup && targetUrl && (
        <ResourceDownloadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          pdfUrl={targetUrl}
        />
      )}
    </>
  );
}

function WhitepaperBadge({
  nodeId,
  label,
  variant,
}: {
  nodeId: string;
  label: string;
  variant: "white" | "stacked";
}) {
  if (variant === "stacked") {
    return (
      <div
        className={`${dmMono.className} relative h-[26px] w-[140px] shrink-0 overflow-clip bg-[rgba(255,255,255,0.79)]`}
        data-node-id="2379:2025"
        data-name="Menu"
      >
        <Corners leftSrc={badgeCornerTl} rightSrc={badgeCornerTr} />
        <div
          className={`${dmMono.className} absolute top-1/2 left-1/2 h-[26px] w-[140px] -translate-x-1/2 -translate-y-1/2 overflow-clip bg-white`}
          data-node-id={nodeId}
          data-name="Menu"
        >
          <Corners leftSrc={badgeCornerTl} rightSrc={badgeCornerTr} />
          <p
            className="absolute top-[calc(50%-4.5px)] left-1/2 -translate-x-1/2 text-center text-[13px] leading-[19.5px] font-normal whitespace-nowrap text-black uppercase not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]"
            data-node-id="2379:2035"
          >
            {label}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${dmMono.className} relative h-[26px] w-[140px] shrink-0 overflow-clip bg-white`}
      data-node-id={nodeId}
      data-name="Menu"
    >
      <Corners leftSrc={badgeCornerTl} rightSrc={badgeCornerTr} />
      <p
        className="absolute top-[calc(50%-4.5px)] left-1/2 -translate-x-1/2 text-center text-[13px] leading-[19.5px] font-normal whitespace-nowrap text-black uppercase not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]"
        data-node-id="2379:1976"
      >
        {label}
      </p>
    </div>
  );
}
