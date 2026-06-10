import { dmMono, gilroyMedium, gilroySemiBold, interRegular } from "../hero/fonts";
import { CornerDecor, GradientTitle } from "./contact-shared";

const cornerMenuLeft = "/hero/corner-tag-1.svg";
const cornerMenuRight = "/hero/corner-tag-2.svg";

const cards = [
  {
    nodeId: "2379:8448",
    newsNodeId: "2379:8449",
    tagNodeId: "2379:8450",
    titleNodeId: "2379:8459",
    descNodeId: "2379:8460",
    ctaNodeId: "2379:8461",
    imageNodeId: "2379:8470",
    tag: "Technical",
    title: "Talk to an FAE (Field Application Engineer)",
    description:
      "Book a 30-minute session with our engineers. Discuss power profiling, model quantization, or deployment architecture for your use case.",
    descriptionWidth: "w-[366px]",
    ctaLabel: "View FAE Calendar",
    ctaWidth: "w-[225px]",
    imageSrc: "/contact/schedule-fae.png",
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
    tag: "Commercial",
    title: "Commercial Scaling & Enterprise",
    description:
      "Connect with Business Development to discuss pricing, ASIC development, timelines, licensing, or supply partnerships.",
    descriptionWidth: "w-[387px]",
    ctaLabel: "View Commercial Calendar",
    ctaWidth: "w-[291px]",
    imageSrc: "/contact/schedule-commercial.png",
    imageClassName:
      "absolute h-[112.61%] left-[-45.12%] top-[-12.61%] w-[185%] max-w-none",
  },
] as const;

export function ContactSchedule() {
  return (
    <div
      className="absolute top-[807px] left-1/2 z-20 flex h-[468px] w-[1204px] -translate-x-1/2 flex-col items-center"
      data-node-id="2379:8437"
    >
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
            Schedule a Consultation
          </GradientTitle>
          <CornerDecor />
        </div>
        <p
          className={`${interRegular.className} w-[568px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
          data-node-id="2379:8446"
        >
          Book a direct meeting with our engineering or commercial teams.
        </p>
      </div>

      <div
        className="relative mt-[48px] h-[320px] w-[1204px] shrink-0"
        data-node-id="2379:8447"
      >
        {cards.map((card, index) => (
          <ScheduleCard
            key={card.nodeId}
            {...card}
            className={index === 0 ? "left-0" : "left-[614px]"}
          />
        ))}
      </div>
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
  ctaWidth,
  imageSrc,
  imageClassName,
  className,
}: (typeof cards)[number] & { className: string }) {
  return (
    <div
      className={`absolute top-0 ${className} h-[320px] w-[590px] overflow-visible border-[0.5px] border-solid border-[rgba(240,240,240,0.45)] bg-[rgba(0,0,0,0.2)] shadow-[inset_0_0_0_0.5px_rgba(240,240,240,0.25)]`}
      data-node-id={nodeId}
      data-name="Schedule"
    >
      <CornerDecor />

      <div
        className="absolute top-[16px] left-[16px] z-10 w-[558px]"
        data-node-id={newsNodeId}
        data-name="NewsSection"
      >
        <TagBadge label={tag} nodeId={tagNodeId} />
        <div className="mt-[20px] flex flex-col gap-[10px] items-start not-italic [word-break:break-word]">
          <p
            className={`${gilroyMedium.className} w-full text-[22px] leading-[28px] font-medium text-white`}
            data-node-id={titleNodeId}
          >
            {title}
          </p>
          <p
            className={`${interRegular.className} ${descriptionWidth} text-[18px] leading-[27px] font-normal text-[rgba(240,240,240,0.6)]`}
            data-node-id={descNodeId}
          >
            {description}
          </p>
        </div>
      </div>

      <ScheduleCta label={ctaLabel} nodeId={ctaNodeId} widthClass={ctaWidth} />

      <div
        className="pointer-events-none absolute top-[90px] left-[380px] z-[1] h-[230px] w-[210px] overflow-hidden"
        data-node-id={imageNodeId}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className={imageClassName} src={imageSrc} />
      </div>
    </div>
  );
}

function ScheduleCta({
  label,
  nodeId,
  widthClass,
}: {
  label: string;
  nodeId: string;
  widthClass: string;
}) {
  return (
    <a
      href="#"
      className={`${gilroySemiBold.className} absolute top-[248px] left-[16px] z-20 block h-[48px] ${widthClass} shadow-[0px_24.721px_16.129px_rgba(255,255,255,0.15),0px_10.268px_6.699px_rgba(255,255,255,0.15),0px_3.714px_2.423px_rgba(255,255,255,0.1)]`}
      data-node-id={nodeId}
      data-name="Cta"
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-white" />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[length:307.2px_307.2px] bg-top-left opacity-[0.35]"
        style={{ backgroundImage: "url(/contact/cta-texture.png)" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(255,255,255,0.6)]"
      />
      <span className="absolute top-1/2 left-[31px] flex -translate-y-1/2 items-center gap-[8px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/contact/calendar-icon.svg"
          alt=""
          width={20}
          height={20}
          className="size-[20px] shrink-0"
          aria-hidden
        />
        <span className="text-[14px] leading-[normal] whitespace-nowrap text-[#151515] uppercase not-italic">
          {label}
        </span>
      </span>
    </a>
  );
}

function TagBadge({ label, nodeId }: { label: string; nodeId: string }) {
  return (
    <div
      className="relative h-[26px] w-[180px] shrink-0 overflow-clip bg-[rgba(255,255,255,0.06)]"
      data-node-id={nodeId}
      data-name="Menu"
    >
      <p
        className={`${dmMono.className} absolute top-[calc(50%-4.5px)] left-1/2 -translate-x-1/2 text-[13px] leading-[19.5px] font-normal tracking-[-0.39px] whitespace-nowrap text-[#ecfae5] uppercase`}
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
      <div className="absolute top-0 left-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={cornerMenuLeft} aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 flex size-[4px] items-center justify-center">
        <div className="rotate-180 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={cornerMenuRight} aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 size-[4px]">
        <div className="absolute inset-[0_0_-12.5%_-12.5%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={cornerMenuLeft} aria-hidden />
        </div>
      </div>
      <div className="absolute right-0 bottom-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 rotate-180 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={cornerMenuRight} aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
