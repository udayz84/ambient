"use client";

import { useState } from "react";
import { dmMono, gilroyMedium, gilroySemiBold, interRegular } from "../hero/fonts";
import { mediaUrl } from "@/lib/strapi";
import { Corners } from "../shared/Corners";
import { CornerDecor, GradientTitle } from "./contact-shared";
import { ContactBookingPopup } from "./ContactBookingPopup";
import { ContactSuccessPopup } from "./ContactSuccessPopup";

const cards = [
  {
    nodeId: "2379:8448",
    newsNodeId: "2379:8449",
    tagNodeId: "2379:8450",
    titleNodeId: "2379:8459",
    descNodeId: "2379:8460",
    ctaNodeId: "2379:8461",
    imageNodeId: "2379:8470",
    descriptionWidth: "w-[366px]",
    ctaWidth: "w-[225px]",
    imageClassName:
      "absolute h-[151%] left-[-15.13%] top-[-23.38%] w-[110.37%] max-w-none",
  },
  {
    nodeId: "2379:8471",
    newsNodeId: "2379:8472",
    tagNodeId: "2379:8473",
    titleNodeId: "2379:8482",
    descNodeId: "2379:8483",
    ctaNodeId: "2379:8484",
    imageNodeId: "2379:8493",
    descriptionWidth: "w-[387px]",
    ctaWidth: "w-[291px]",
    imageClassName:
      "absolute h-[112.61%] left-[-45.12%] top-[-12.61%] w-[185%] max-w-none",
  },
] as const;

export function ContactSchedule({ data }: { data?: any }) {
  const [bookingCard, setBookingCard] = useState<number | null>(null);
  const [bookedLabel, setBookedLabel] = useState("");
  const heading = data?.heading || "";
  const subtitle = data?.subtitle || "";
  const sectionIcon = mediaUrl(data?.icon);
  const strapiCards: ReadonlyArray<any> = Array.isArray(data?.cards)
    ? data.cards
    : [];
  // Render every CMS card. Layout metadata (widths, image scaling, node ids)
  // cycles through the designed 2-card templates so any count is supported.
  const mergedCards = strapiCards.map((remote: any, index: number) => {
    const layout = cards[index] || cards[index % cards.length];
    return {
      ...layout,
      tag: remote.tag || "",
      title: remote.title || "",
      description: remote.description || "",
      ctaLabel: remote.cta_label || "",
      // schedule-card schema has no url field; read cta_href forward-compat.
      ctaHref: remote.cta_href || "",
      remoteImage: mediaUrl(remote.image),
    };
  });

  return (
    <div
      className="absolute top-[807px] left-1/2 z-20 flex h-[468px] w-[1204px] -translate-x-1/2 flex-col items-center"
      data-node-id="2379:8437"
    >
      {sectionIcon ? (
        <div className="pointer-events-none absolute -top-[40px] left-1/2 -translate-x-1/2" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async" src={sectionIcon} alt="" className="size-[32px] object-contain" />
        </div>
      ) : null}
      <div
        className="flex h-[100px] shrink-0 flex-col items-center gap-[24px]"
        data-node-id="2379:8438"
        data-name="Title Section"
      >
        <div className="relative flex flex-col items-center px-[10px]" data-node-id="2379:8440">
          <GradientTitle
            nodeId="2379:8441"
            gradientDeg="124.465deg"
            className="whitespace-nowrap leading-[49px]"
          >
            {heading}
          </GradientTitle>
          <CornerDecor />
        </div>
        <p
          className={`${interRegular.className} w-[568px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
          data-node-id="2379:8446"
        >
          {subtitle}
        </p>
      </div>

      <div
        className="relative mt-[48px] h-[320px] w-[1204px] shrink-0"
        data-node-id="2379:8447"
      >
        {mergedCards.map((card, index) => {
          const col = index % 2;
          const row = Math.floor(index / 2);
          const leftClass = col === 0 ? "left-0" : "left-[614px]";
          const topStyle = row > 0 ? { top: `${row * 344}px` } : undefined;
          return (
            <ScheduleCard
              key={card.nodeId}
              {...card}
              className={leftClass}
              style={topStyle}
              onBook={() => setBookingCard(index)}
            />
          );
        })}
      </div>

      <ContactBookingPopup
        key={bookingCard === null ? "closed" : `booking-${bookingCard}`}
        open={bookingCard !== null}
        meetingTitle={bookingCard !== null ? mergedCards[bookingCard]?.title || "Product Demo" : "Product Demo"}
        meetingDescription={
          bookingCard !== null
            ? mergedCards[bookingCard]?.description ||
              "This is an example of a meeting you would have with a potential customer to demonstrate your product."
            : ""
        }
        onClose={() => setBookingCard(null)}
        onBooked={(label) => {
          setBookedLabel(label);
          setBookingCard(null);
        }}
      />

      <ContactSuccessPopup
        open={Boolean(bookedLabel)}
        dateLabel={bookedLabel}
        onClose={() => setBookedLabel("")}
      />
    </div>
  );
}

function ScheduleCard({
  nodeId,
  newsNodeId,
  tagNodeId,
  titleNodeId,
  descNodeId,
  ctaNodeId,
  imageNodeId,
  tag,
  title,
  description,
  descriptionWidth,
  ctaLabel,
  ctaHref,
  ctaWidth,
  remoteImage,
  imageClassName,
  className,
  style,
  onBook,
}: Omit<(typeof cards)[number], "imageSrc"> & {
  tag: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  remoteImage: string | null;
  className: string;
  style?: React.CSSProperties;
  onBook: () => void;
}) {
  const imageFinal = remoteImage;
  return (
    <div
      className={`absolute top-0 ${className} h-[320px] w-[590px] overflow-visible bg-[rgba(0,0,0,0.2)]`}
      style={style}
      data-node-id={nodeId}
      data-name="Schedule"
    >
      <div
        className="absolute top-[16px] left-[16px] z-10 w-[558px]"
        data-node-id={newsNodeId}
        data-name="NewsSection"
      >
        <TagBadge label={tag} nodeId={tagNodeId} />
        <div className="mt-[20px] flex flex-col gap-[10px] items-start not-italic [word-break:break-word]">
          <p
            className={`${gilroyMedium.className} w-full text-[22px] leading-[28px] font-medium text-white [word-break:break-word]`}
            data-node-id={titleNodeId}
          >
            {title}
          </p>
          <p
            className={`${interRegular.className} ${descriptionWidth} text-[18px] leading-[27px] font-normal text-[rgba(240,240,240,0.6)] [word-break:break-word]`}
            data-node-id={descNodeId}
          >
            {description}
          </p>
        </div>
      </div>

      <ScheduleCta label={ctaLabel} href={ctaHref} nodeId={ctaNodeId} widthClass={ctaWidth} onBook={onBook} />

      <div
        className="pointer-events-none absolute top-[90px] left-[380px] z-[1] h-[230px] w-[210px] overflow-hidden"
        data-node-id={imageNodeId}
      >
        {imageFinal ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img loading="lazy" decoding="async" alt="" className={imageClassName} src={imageFinal} />
        ) : null}
      </div>

      <div className="pointer-events-none absolute inset-0 z-[30] border-[0.5px] border-solid border-[rgba(240,240,240,0.45)]">
        <CornerDecor />
      </div>
    </div>
  );
}

function ScheduleCta({
  label,
  nodeId,
  widthClass,
  onBook,
}: {
  label: string;
  href: string;
  nodeId: string;
  widthClass: string;
  onBook: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onBook}
      className={`${gilroySemiBold.className} absolute top-[248px] left-[16px] z-20 block h-[48px] ${widthClass} cursor-pointer shadow-[0px_24.721px_16.129px_rgba(255,255,255,0.15),0px_10.268px_6.699px_rgba(255,255,255,0.15),0px_3.714px_2.423px_rgba(255,255,255,0.1)]`}
      data-node-id={nodeId}
      data-name="Cta"
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-white" />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[length:307.2px_307.2px] bg-top-left opacity-[0.35]"
        style={{ backgroundImage: "url(/contact/cta-texture.webp)" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(255,255,255,0.6)]"
      />
      <span className="absolute top-1/2 left-[31px] flex -translate-y-1/2 items-center gap-[8px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async"
          src="/contact/calendar-icon.svg"
          alt=""
          width={20}
          height={20}
          className="size-[20px] shrink-0"
          aria-hidden
        />
        <span className="max-w-full overflow-hidden text-ellipsis text-[14px] leading-[normal] whitespace-nowrap text-[#151515] uppercase not-italic">
          {label}
        </span>
      </span>
    </button>
  );
}

function TagBadge({ label, nodeId }: { label: string; nodeId: string }) {
  return (
    <div
      className="relative h-[26px] w-[180px] shrink-0 border-[0.5px] border-solid border-[rgba(240,240,240,0.5)] bg-[rgba(255,255,255,0.06)]"
      data-node-id={nodeId}
      data-name="Menu"
    >
      <p
        className={`${dmMono.className} absolute top-[calc(50%-4.5px)] left-1/2 max-w-full -translate-x-1/2 text-[13px] leading-[19.5px] font-normal tracking-[-0.39px] whitespace-nowrap text-[#ecfae5] uppercase overflow-hidden text-ellipsis [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]`}
      >
        {label}
      </p>
      <span
        aria-hidden
        className="absolute top-1/2 left-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60"
      />
      <span
        aria-hidden
        className="absolute top-1/2 left-[170.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60"
      />
      <Corners />
    </div>
  );
}
