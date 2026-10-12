import { useState } from "react";
import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { GreenCtaButton } from "../contact/contact-shared";
import type { ResourceFeaturedCard } from "./resources-data";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { ResourceDownloadModal } from "./ResourceDownloadModal";

const badgeCornerTl = "/resources/badge-corner-tl.svg";
const badgeCornerTr = "/resources/badge-corner-tr.svg";
const cardCornerLeft = "/hero/vector-57.svg";
const cardCornerRight = "/hero/vector-55.svg";

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
  title,
  description,
  ctaLabel,
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
        className="group relative flex min-w-px flex-[1_0_0] flex-col gap-[8px] overflow-clip border-[0.5px] border-solid border-[rgba(255,255,255,0.3)] bg-[#191919] p-[10px] hover:border-[#53d824]/40 transition-colors"
        data-node-id={nodeId}
      >
        <div
          className="relative flex h-[281px] shrink-0 flex-col items-end overflow-clip p-[12px]"
          style={{ width: imageWidth }}
          data-node-id={imageNodeId}
          data-name="Image"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                loading="lazy"
                decoding="async"
                alt=""
                className={`${imageClassName} grayscale brightness-[0.22] contrast-[175%] transition-all duration-700 group-hover:brightness-[0.4]`}
                src={imageSrc}
              />
            ) : null}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(25,25,25,0)] from-[70%] to-[#191919]" />
          </div>

          <WhitepaperBadge
            nodeId={badgeNodeId}
            label={badgeLabel}
            variant={badgeVariant}
          />

          {/* Center Silhouette "Revealing Soon" Badge */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="relative flex items-center justify-center border border-[#53d824]/40 bg-black/85 px-[16px] py-[8px] shadow-[0_0_24px_rgba(83,216,36,0.18)] backdrop-blur-md">
              <Corners leftSrc="/hero/vector-57.svg" rightSrc="/hero/vector-55.svg" />
              <span className={`${dmMono.className} flex items-center gap-[8px] text-[11px] uppercase tracking-[0.12em] text-[#53d824]`}>
                <span className="size-[6px] rounded-full bg-[#53d824] animate-pulse" />
                <span>REVEALING SOON</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-[24px] p-[16px]">
          <div className="flex flex-col gap-[12px]">
            <h3
              className={`${gilroyMedium.className} w-[290px] text-[22px] leading-[28px] font-medium text-white opacity-90 not-italic [word-break:break-word]`}
            >
              {title}
            </h3>
            <p
              className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-[#a4a4a4] opacity-75 not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
            >
              {description}
            </p>
          </div>
          <div onClick={handleCtaClick} className="cursor-pointer">
            <div className="relative flex h-[48px] w-[231px] items-center justify-center overflow-hidden border border-[#53d824]/30 bg-[#53d824]/10 shadow-[0_0_20px_rgba(83,216,36,0.12)] transition-colors group-hover:border-[#53d824]/50 group-hover:bg-[#53d824]/15">
              <GreenCtaCorners />
              <span className={`${gilroyMedium.className} flex items-center gap-[8px] text-[14px] font-medium uppercase tracking-[0.08em] text-[#53d824]`}>
                <span className="size-[6px] rounded-full bg-[#53d824] animate-pulse" />
                REVEALING SOON
              </span>
            </div>
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
