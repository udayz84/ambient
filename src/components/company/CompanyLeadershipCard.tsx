import Image from "next/image";
import type { RefCallback } from "react";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { CompanyCardCorners } from "./company-corners";
import type { LeadershipMember } from "./company-leadership-data";

/** Figma User Image — leadership instance (2379:2288) */
const LEADERSHIP_SPEC = {
  cardWidth: 377,
  cardHeight: 471.25,
  borderSrc: "/company/user-image-border-leadership.svg",
  contentBoxLeft: 38.5,
  contentBoxTop: 342,
  contentBoxWidth: 300,
  contentPaddingX: 38.5,
  contentPaddingTop: 24,
  contentPaddingBottom: 24,
  contentGap: 17,
  nameRoleGap: 6,
  roleBioGap: 24,
  bioParagraphGap: 16,
  linkedInMarginTop: 0,
  nameSize: "text-[26px] leading-[29px]",
  nameColor: "text-[#ffffff]",
  roleColor: "text-[#39ff14]",
  bioColor: "text-[#d1d5db]",
  bioTypography: "text-[16px] leading-[24px]",
  showRole: true,
  showReadMore: true,
} as const;

const LEADERSHIP_EXPAND_TRANSITION_CLASS = "duration-500 ease-in-out";

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
  nameSize: "text-[22px] leading-[28px]",
  showRole: false,
  showReadMore: false,
} as const;

function LeadershipNameRow({
  name,
  role,
  linkedInHref,
  nameNodeId,
  spec,
  linkedInIconSrc,
  showRole,
}: {
  name: string;
  role: string;
  linkedInHref: string;
  nameNodeId: string;
  spec: typeof LEADERSHIP_SPEC;
  linkedInIconSrc: string;
  showRole: boolean;
}) {
  return (
    <div
      className="flex w-full flex-col items-start"
      style={{ gap: spec.nameRoleGap }}
      data-name="Name & Position"
    >
      <div className="flex w-full items-start justify-between">
        <p
          className={`${gilroyMedium.className} min-w-0 font-medium not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden ${spec.nameSize} ${spec.nameColor}`}
          data-node-id={nameNodeId}
        >
          {name}
        </p>
        <a
          href={linkedInHref}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-40 size-[24px] shrink-0 cursor-pointer"
          style={{ marginTop: spec.linkedInMarginTop }}
          aria-label={`${name} on LinkedIn`}
          data-name="Frame"
          onClick={(event) => event.stopPropagation()}
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
      {showRole && role ? (
        <p
          className={`${interRegular.className} text-[18px] leading-[27px] font-normal not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] overflow-hidden ${spec.roleColor}`}
          data-node-id="2280:12313"
        >
          {role}
        </p>
      ) : null}
    </div>
  );
}

function LeadershipInteractivePanel({
  name,
  role,
  bioParagraphs,
  linkedInHref,
  nameNodeId,
  readMoreNodeId,
  spec,
  linkedInIconSrc,
  isExpanded,
  onReadMoreToggle,
}: {
  name: string;
  role: string;
  bioParagraphs: string[];
  linkedInHref: string;
  nameNodeId: string;
  readMoreNodeId?: string;
  spec: typeof LEADERSHIP_SPEC;
  linkedInIconSrc: string;
  isExpanded: boolean;
  onReadMoreToggle?: () => void;
}) {
  const transition = LEADERSHIP_EXPAND_TRANSITION_CLASS;

  return (
    <div
      className={`absolute z-40 flex flex-col items-start transition-[top,bottom,height] ${transition}`}
      style={{
        left: spec.contentBoxLeft,
        width: spec.contentBoxWidth,
        top: isExpanded ? spec.contentPaddingTop : spec.contentBoxTop,
        bottom: isExpanded ? spec.contentPaddingBottom : undefined,
        gap: isExpanded ? undefined : spec.contentGap,
      }}
      data-name={isExpanded ? "box-expanded" : "box"}
      data-node-id="2282:12494"
    >
      <div
        className={`flex w-full flex-col items-start ${isExpanded ? "min-h-0 flex-1" : ""}`}
      >
        <LeadershipNameRow
          name={name}
          role={role}
          linkedInHref={linkedInHref}
          nameNodeId={nameNodeId}
          spec={spec}
          linkedInIconSrc={linkedInIconSrc}
          showRole
        />

        <div
          className={`grid w-full transition-[grid-template-rows,margin-top,opacity] ${transition}`}
          style={{
            gridTemplateRows: isExpanded ? "1fr" : "0fr",
            marginTop: isExpanded ? spec.roleBioGap : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          aria-hidden={!isExpanded}
        >
          <div className="overflow-hidden">
            <div
              className={`flex w-full flex-col items-start text-left transition-[transform,opacity] ${transition} ${
                isExpanded
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-[8px] opacity-0"
              }`}
              style={{ gap: spec.bioParagraphGap }}
            >
              {bioParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`${interRegular.className} w-full text-left font-normal not-italic [word-break:break-word] ${spec.bioTypography} ${spec.bioColor}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-expanded={isExpanded}
          onClick={onReadMoreToggle}
          className={`${interRegular.className} w-full cursor-pointer text-left text-[14px] leading-[21px] font-normal text-[#ffffff] not-italic [word-break:break-word] transition-[margin-top,padding-top] hover:opacity-80 ${transition} ${
            isExpanded ? "mt-auto pt-[17px]" : "mt-[16px]"
          }`}
          data-node-id={readMoreNodeId ?? "2280:12314"}
        >
          {isExpanded ? "Read less -" : "Read more +"}
        </button>
      </div>
    </div>
  );
}

function PersonFooter({
  name,
  role,
  bioParagraphs,
  linkedInHref,
  nameNodeId,
  readMoreNodeId,
  spec,
  linkedInIconSrc,
  isExpanded,
  onReadMoreToggle,
}: {
  name: string;
  role: string;
  bioParagraphs: string[];
  linkedInHref: string;
  nameNodeId: string;
  readMoreNodeId?: string;
  spec: typeof LEADERSHIP_SPEC | typeof ADVISORY_SPEC;
  linkedInIconSrc: string;
  isExpanded?: boolean;
  onReadMoreToggle?: () => void;
}) {
  if (spec.showReadMore) {
    return (
      <LeadershipInteractivePanel
        name={name}
        role={role}
        bioParagraphs={bioParagraphs}
        linkedInHref={linkedInHref}
        nameNodeId={nameNodeId}
        readMoreNodeId={readMoreNodeId}
        spec={spec as typeof LEADERSHIP_SPEC}
        linkedInIconSrc={linkedInIconSrc}
        isExpanded={Boolean(isExpanded)}
        onReadMoreToggle={onReadMoreToggle}
      />
    );
  }

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
          className={`${gilroyMedium.className} font-medium text-white not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden ${spec.nameSize}`}
          data-node-id={nameNodeId}
        >
          {name}
        </p>
        {spec.showRole && role ? (
          <p
            className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] overflow-hidden`}
          >
            {role}
          </p>
        ) : null}
      </div>
      <a
        href={linkedInHref}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-40 size-[24px] shrink-0 cursor-pointer"
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
  isExpanded = false,
  onReadMoreToggle,
  cardRef,
}: {
  member: LeadershipMember;
  variant: "leadership" | "advisory";
  left?: number;
  isExpanded?: boolean;
  onReadMoreToggle?: () => void;
  cardRef?: RefCallback<HTMLElement>;
}) {
  const spec = variant === "leadership" ? LEADERSHIP_SPEC : ADVISORY_SPEC;
  const isAdvisory = variant === "advisory";
  const positionClass =
    left !== undefined
      ? "absolute top-0"
      : "relative shrink-0";

  return (
    <article
      ref={cardRef}
      className={`${positionClass} isolate overflow-clip border-[0.5px] border-solid border-[rgba(255,255,255,0.3)] transition-[z-index] ${LEADERSHIP_EXPAND_TRANSITION_CLASS} ${isAdvisory ? "z-[1] bg-black" : isExpanded ? "z-[15] bg-[#191919]" : "z-[1] bg-[#191919]"}`}
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
          className={`${
            member.imageClassName ??
            "absolute inset-0 size-full max-w-none object-cover object-top"
          } ${!isAdvisory ? `transition-[filter] ${LEADERSHIP_EXPAND_TRANSITION_CLASS} ${isExpanded ? "brightness-[0.35]" : "brightness-90"}` : "brightness-90"}`}
        />
        {!isAdvisory ? (
          <>
            <div
              className={`absolute inset-0 bg-gradient-to-b transition-opacity ${LEADERSHIP_EXPAND_TRANSITION_CLASS} ${
                isExpanded ? "opacity-0" : "opacity-100"
              } from-[rgba(25,25,25,0)] from-[55%] via-[rgba(0,0,0,0.45)] via-[75%] to-[#191919]`}
              aria-hidden
            />
            <div
              className={`absolute inset-0 bg-[rgba(0,0,0,0.72)] transition-opacity ${LEADERSHIP_EXPAND_TRANSITION_CLASS} ${
                isExpanded ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden
            />
          </>
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-b from-[rgba(25,25,25,0)] from-[55%] via-[rgba(0,0,0,0.45)] via-[75%] to-black"
          />
        )}
      </div>

      <div className="pointer-events-none absolute inset-[-1px] z-20" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={spec.borderSrc}
          alt=""
          className="block size-full max-w-none"
        />
      </div>

      <PersonFooter
        name={member.name}
        role={member.role}
        bioParagraphs={member.bioParagraphs}
        linkedInHref={member.linkedInHref}
        nameNodeId={member.nameNodeId}
        readMoreNodeId={member.readMoreNodeId}
        spec={spec}
        linkedInIconSrc="/footer/social-linkedin.svg"
        isExpanded={isExpanded}
        onReadMoreToggle={onReadMoreToggle}
      />

      <CompanyCardCorners cornerBottom={spec.cardHeight - 4} />
    </article>
  );
}
