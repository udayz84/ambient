import Image from "next/image";
import { interMedium, interRegular } from "../hero/fonts";
import { dmMono } from "../hero/fonts";
import { CAREERS_JOBS } from "./careers-data";
import { CareersRolesProfileCta } from "./careers-shared";

const cornerTitleTl = "/careers/corner-menu-tl.svg";
const cornerTitleTr = "/careers/corner-menu-tr.svg";
const cornerApplyTl = "/careers/corner-apply-tl.svg";
const cornerApplyTr = "/careers/corner-apply-tr.svg";

const OPEN_ROLES_GRADIENT =
  "linear-gradient(107.715deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const CTA_TITLE_GRADIENT =
  "linear-gradient(125.631deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

export function CareersOpenRoles() {
  return (
    <section
      id="open-roles"
      className="absolute top-[2426px] left-[118px] z-10 flex h-[1696px] w-[1204px] flex-col gap-[40px]"
      data-node-id="2379:8901"
      aria-label="Open Roles"
    >
      {/* 2379:8902 — header row */}
      <div
        className="flex h-[60px] w-[1204px] shrink-0 items-end justify-between"
        data-node-id="2379:8902"
      >
        <OpenRolesTitle />
        <div className="flex shrink-0 items-center gap-[20px]" data-node-id="2379:8909">
          <FilterField label="Job Type" nodeId="2379:8910" innerNodeId="2379:8911" />
          <FilterField label="Location" nodeId="2379:8915" innerNodeId="2379:8916" />
        </div>
      </div>

      {/* 2379:8920 — job list */}
      <div
        className="flex h-[1294px] w-[1204px] shrink-0 flex-col gap-[10px]"
        data-node-id="2379:8920"
      >
        {CAREERS_JOBS.map((job, index) => (
          <JobRow
            key={job.title}
            title={job.title}
            category={job.category}
            location={job.location}
            nodeId={
              index === 0
                ? "2379:8921"
                : index === 1
                  ? "2379:8922"
                  : index === 2
                    ? "2379:8923"
                    : index === 3
                      ? "2379:8924"
                      : index === 4
                        ? "2379:8925"
                        : index === 5
                          ? "2379:8926"
                          : index === 6
                            ? "2379:8927"
                            : "2379:8928"
            }
          />
        ))}
      </div>

      {/* 2379:8929 — bottom CTA */}
      <div
        className="relative h-[262px] w-[1203px] shrink-0"
        data-node-id="2379:8929"
      >
        <RolesCtaBackground />
        <div
          className="absolute top-[calc(50%+0.5px)] left-[79.5px] flex w-[1042.932px] -translate-y-1/2 items-center justify-between overflow-visible"
          data-node-id="2379:8931"
        >
          <div
            className="relative h-[108px] w-[587px] shrink-0"
            data-node-id="2379:8932"
          >
            <p
              className={`${interMedium.className} absolute top-[26.03px] left-[292.35px] -translate-x-1/2 bg-clip-text text-center text-[46px] leading-[49px] font-medium whitespace-nowrap text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage: CTA_TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              data-node-id="2379:8933"
            >
              Don&apos;t See The Right Role?
            </p>
            <div
              className="pointer-events-none absolute top-[1.03px] left-px h-[106px] w-[584.848px]"
              data-node-id="2379:8934"
            >
              <div className="absolute inset-[-0.47%_0]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/careers/title-frame-roles-cta.svg"
                  alt=""
                  className="block size-full max-w-none"
                  aria-hidden
                />
              </div>
            </div>
          </div>

          <div
            className="relative h-[116px] w-[290.931px] shrink-0 overflow-visible"
            data-node-id="2379:8939"
          >
            <p
              className={`${interRegular.className} absolute top-0 left-0 h-[48px] w-[290.931px] text-right text-[14px] leading-[24px] font-normal tracking-[-0.3125px] text-[rgba(255,255,255,0.6)] not-italic [word-break:break-word]`}
              data-node-id="2379:8940"
            >
              Submit a general application and we&apos;ll reach out when a matching
              position opens.
            </p>
            <CareersRolesProfileCta href="#" />
          </div>
        </div>
      </div>
    </section>
  );
}

const ROLES_CTA_MASK_STYLE = {
  maskImage: "url(/careers/roles-cta-mask.svg)",
  WebkitMaskImage: "url(/careers/roles-cta-mask.svg)",
  maskSize: "100% 100%",
  WebkitMaskSize: "100% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
} as const;

function RolesCtaBackground() {
  return (
    <div
      className="pointer-events-none absolute top-0 left-0 h-[261.215px] w-[1203px]"
      data-node-id="2379:8930"
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/careers/roles-cta-bg.svg"
        alt=""
        className="absolute inset-0 block size-full max-w-none"
      />
      <div className="absolute inset-0" style={ROLES_CTA_MASK_STYLE}>
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255, 255, 255, 0.5) 0.4px, transparent 0.4px)",
            backgroundSize: "8px 8px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 90% at 78% 50%, rgba(83, 216, 36, 0.14) 0%, rgba(83, 216, 36, 0.04) 40%, transparent 68%)",
          }}
        />
      </div>
    </div>
  );
}

function OpenRolesTitle() {
  return (
    <div
      className="relative h-[60px] w-[289px] shrink-0"
      data-node-id="2379:8903"
    >
      <p
        className={`${interMedium.className} absolute top-0 left-[20px] bg-clip-text text-[46px] leading-[49px] font-medium whitespace-nowrap text-transparent not-italic [word-break:break-word]`}
        style={{
          backgroundImage: OPEN_ROLES_GRADIENT,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
        data-node-id="2379:8904"
      >
        Open Roles
      </p>
      <TitleCorner className="top-0 left-0" src={cornerTitleTl} flipY />
      <TitleCorner className="top-0 left-[285px]" src={cornerTitleTr} rotate180 />
      <TitleCorner className="top-[56px] left-0" src={cornerTitleTl} />
      <TitleCorner className="top-[56px] left-[285px]" src={cornerTitleTr} flipY rotate180 />
    </div>
  );
}

function TitleCorner({
  className,
  src,
  flipY,
  rotate180,
}: {
  className: string;
  src: string;
  flipY?: boolean;
  rotate180?: boolean;
}) {
  return (
    <div className={`pointer-events-none absolute flex size-[4px] items-center justify-center ${className}`}>
      <div
        className={`flex-none ${flipY ? "-scale-y-100" : ""} ${rotate180 ? "rotate-180" : ""}`}
      >
        <div className="relative size-[4px]">
          <div className="absolute inset-[0_0_-12.5%_-12.5%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="block size-full max-w-none" src={src} aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterField({
  label,
  nodeId,
  innerNodeId,
}: {
  label: string;
  nodeId: string;
  innerNodeId: string;
}) {
  return (
    <div className="flex w-[200px] shrink-0 items-center" data-node-id={nodeId}>
      <div
        className="flex h-[48px] min-w-px flex-[1_0_0] items-center gap-[10px] bg-transparent px-[20px]"
        data-node-id={innerNodeId}
      >
        <p
          className={`${interRegular.className} min-w-px flex-[1_0_0] text-[14px] leading-[1.4] font-normal text-white not-italic [word-break:break-word]`}
        >
          {label}
        </p>
        <Image
          src="/careers/chevron-down.svg"
          alt=""
          width={24}
          height={24}
          className="size-[24px] shrink-0"
          aria-hidden
        />
      </div>
    </div>
  );
}

function JobRow({
  title,
  category,
  location,
  nodeId,
}: {
  title: string;
  category: string;
  location: string;
  nodeId: string;
}) {
  return (
    <article
      className="relative h-[153px] w-[1204px] shrink-0 border border-solid border-[rgba(240,240,240,0.2)] bg-black"
      data-node-id={nodeId}
      data-name="Job Details"
    >
      <CategoryBadge label={category} />
      <p
        className={`${interMedium.className} absolute top-[75px] left-[19px] text-[22px] leading-[28px] font-medium whitespace-nowrap text-white not-italic [word-break:break-word]`}
      >
        {title}
      </p>
      <p
        className={`${interRegular.className} absolute top-[105px] left-[19px] w-[350px] text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
      >
        {location}
      </p>
      <ApplyButton />
    </article>
  );
}

function CategoryBadge({ label }: { label: string }) {
  return (
    <div
      className={`${dmMono.className} absolute top-[19.34px] left-[calc(50%-492px)] h-[26px] w-[180px] -translate-x-1/2 overflow-clip bg-[rgba(255,255,255,0.06)]`}
      data-name="Menu"
    >
      <div className="absolute top-0 left-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={cornerTitleTl} aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 flex size-[4px] items-center justify-center">
        <div className="rotate-180 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={cornerTitleTr} aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 size-[4px]">
        <div className="absolute inset-[0_0_-12.5%_-12.5%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={cornerTitleTl} aria-hidden />
        </div>
      </div>
      <div className="absolute right-0 bottom-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 rotate-180 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={cornerTitleTr} aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <p
        className={`absolute top-[calc(50%-4.5px)] left-1/2 -translate-x-1/2 text-[13px] leading-[19.5px] font-normal tracking-[-0.39px] whitespace-nowrap text-[#ecfae5] uppercase not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word]`}
      >
        {label}
      </p>
      <div className="absolute top-1/2 left-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
      <div className="absolute top-1/2 left-[170.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
    </div>
  );
}

function ApplyButton() {
  return (
    <a
      href="#"
      className={`${interMedium.className} absolute top-[51px] right-[49px] flex items-center gap-[20px] overflow-clip bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px] text-[16px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic`}
    >
      APPLY NOW
      <Image
        src="/careers/chevron-apply.svg"
        alt=""
        width={12}
        height={6}
        className="h-[6px] w-[12px] shrink-0"
        aria-hidden
      />
      <div className="pointer-events-none absolute top-0 left-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={cornerApplyTl} aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute top-0 right-0 flex size-[4px] items-center justify-center">
        <div className="rotate-180 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={cornerApplyTr} aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 size-[4px]">
        <div className="absolute inset-[0_0_-12.5%_-12.5%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={cornerApplyTl} aria-hidden />
        </div>
      </div>
      <div className="pointer-events-none absolute right-0 bottom-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 rotate-180 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={cornerApplyTr} aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
