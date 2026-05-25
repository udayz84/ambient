import Image from "next/image";
import { interMedium, interRegular } from "../hero/fonts";
import type { LeadershipMember } from "./company-leadership-data";

const cornerLeft = "/hero/corner-tag-1.svg";
const cornerRight = "/hero/corner-tag-2.svg";

/** Figma User Image — leadership instance (2379:2288), scaled from 292×365 advisory */
const LEADERSHIP_SPEC = {
  cardWidth: 377,
  cardHeight: 471.25,
  borderSrc: "/company/user-image-border-leadership.svg",
  footerLeft: 34.85034375,
  footerTop: 406.2197265625,
  footerWidth: 311.071075,
  footerHeight: 36.1411,
  linkedInMarginTop: 2.5815217391304346,
  nameSize: "text-[22px] leading-[28px]",
  showRole: true,
} as const;

/** Figma User Image — advisory (2379:2300) */
const ADVISORY_SPEC = {
  cardWidth: 292,
  cardHeight: 365,
  borderSrc: "/company/user-image-border-advisory.svg",
  footerLeft: 27,
  footerTop: 314.6376953125,
  footerWidth: 241,
  footerHeight: 28,
  linkedInMarginTop: 2,
  nameSize: "text-[18px] leading-[28px]",
  showRole: false,
} as const;

function UserImageCorners({
  width,
  cornerTop,
  cornerBottom,
}: {
  width: number;
  cornerTop: number;
  cornerBottom: number;
}) {
  return (
    <>
      <div
        className="pointer-events-none absolute left-0 flex size-[4px] items-center justify-center"
        style={{ top: cornerTop }}
      >
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
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
      <div
        className="pointer-events-none absolute flex size-[4px] items-center justify-center"
        style={{ top: cornerTop, left: width - 4 }}
      >
        <div className="rotate-180 flex-none">
          <div className="relative size-[4px]">
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
      <div
        className="pointer-events-none absolute left-0 flex size-[4px] items-center justify-center"
        style={{ top: cornerBottom }}
      >
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
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
      <div
        className="pointer-events-none absolute flex size-[4px] items-center justify-center"
        style={{ top: cornerBottom, left: width - 4 }}
      >
        <div className="-scale-y-100 rotate-180 flex-none">
          <div className="relative size-[4px]">
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
    </>
  );
}

function PersonFooter({
  name,
  role,
  linkedInHref,
  nameNodeId,
  spec,
  linkedInIconSrc,
}: {
  name: string;
  role: string;
  linkedInHref: string;
  nameNodeId: string;
  spec: typeof LEADERSHIP_SPEC | typeof ADVISORY_SPEC;
  linkedInIconSrc: string;
}) {
  return (
    <div
      className="absolute z-40 flex items-start justify-between"
      style={{
        top: spec.footerTop,
        left: spec.footerLeft,
        width: spec.footerWidth,
        minHeight: spec.footerHeight,
      }}
      data-name="Frame 1984079465"
    >
      <div
        className={`min-w-0 flex-1 ${spec.showRole && role ? "flex flex-col gap-[2px]" : ""}`}
      >
        <p
          className={`${interMedium.className} font-medium text-white not-italic [word-break:break-word] ${spec.nameSize}`}
          data-node-id={nameNodeId}
        >
          {name}
        </p>
        {spec.showRole && role ? (
          <p
            className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic [word-break:break-word]`}
          >
            {role}
          </p>
        ) : null}
      </div>
      <a
        href={linkedInHref}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-40 size-[24px] shrink-0"
        style={{ marginTop: spec.linkedInMarginTop }}
        aria-label={`${name} on LinkedIn`}
      >
        <Image
          src={linkedInIconSrc}
          alt=""
          width={24}
          height={24}
          className="block size-full max-w-none"
          aria-hidden
        />
      </a>
    </div>
  );
}

export function CompanyLeadershipCard({
  member,
  variant,
  left,
}: {
  member: LeadershipMember;
  variant: "leadership" | "advisory";
  left?: number;
}) {
  const spec = variant === "leadership" ? LEADERSHIP_SPEC : ADVISORY_SPEC;
  const cornerBottom =
    variant === "leadership" ? 465.307291875 : 360.5;
  const isAdvisory = variant === "advisory";
  const positionClass =
    left !== undefined
      ? "absolute top-0"
      : "relative shrink-0";

  return (
    <article
      className={`${positionClass} isolate z-[1] overflow-clip border-[0.5px] border-solid border-[rgba(255,255,255,0.15)] ${isAdvisory ? "bg-black" : "bg-[#191919]"}`}
      style={{
        left: left !== undefined ? left : undefined,
        width: spec.cardWidth,
        height: spec.cardHeight,
      }}
      data-node-id={member.nodeId}
      data-name="User Image"
    >
      <div
        className="absolute inset-0 z-0"
        data-node-id={member.imageNodeId}
        data-name="Image 1"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={member.imageSrc}
          className={
            member.imageClassName ??
            "absolute inset-0 size-full max-w-none object-cover object-top"
          }
        />
        <div
          className={`absolute inset-0 bg-gradient-to-b from-[rgba(25,25,25,0)] from-[55%] via-[rgba(0,0,0,0.45)] via-[75%] ${isAdvisory ? "to-black" : "to-[#191919]"}`}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-20" aria-hidden>
        <Image
          src={spec.borderSrc}
          alt=""
          fill
          className="object-fill"
          sizes={`${spec.cardWidth}px`}
        />
      </div>

      <div
        className="pointer-events-none absolute top-0 left-0 z-[25] w-full"
        style={{ height: spec.cardHeight }}
        data-name="Border Element"
        aria-hidden
      >
        <UserImageCorners
          width={spec.cardWidth}
          cornerTop={4}
          cornerBottom={cornerBottom}
        />
      </div>

      <PersonFooter
        name={member.name}
        role={member.role}
        linkedInHref={member.linkedInHref}
        nameNodeId={member.nameNodeId}
        spec={spec}
        linkedInIconSrc="/footer/social-linkedin.svg"
      />
    </article>
  );
}
