"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gilroyMedium, interRegular } from "../hero/fonts";
import type { LeadershipMember } from "./company-leadership-data";
import { Corners } from "../shared/Corners";

function LeadershipCardMobile({
  member,
  variant,
}: {
  member: LeadershipMember;
  variant: "leadership" | "advisory";
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isAdvisory = variant === "advisory";
  const cardHeight = isAdvisory ? 366 : 425;
  const imgTop = isAdvisory ? 3 : 2;
  const imgHeight = isAdvisory ? 355 : 380;
  const boxTop = isAdvisory ? 276 : 310;
  const borderSrc = isAdvisory
    ? "/company/user-image-border-advisory.svg"
    : "/company/user-image-border-leadership.svg";
  const cardBg = isAdvisory ? "bg-black" : "bg-[#191919]";
  const fadeColor = isAdvisory ? "to-black" : "to-[#191919]";

  return (
    <article
      className={`relative w-[334px] shrink-0 snap-center overflow-clip border border-solid border-[#4a4a4a] ${cardBg}`}
      style={{ height: cardHeight }}
      data-name="User Image"
    >
      <Corners />
      {/* Portrait */}
      <div
        className="absolute left-[3px] w-[330px] overflow-hidden"
        style={{ top: imgTop, height: imgHeight }}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async"
          src={member.imageSrc}
          alt=""
          className="absolute inset-0 size-full object-cover object-top max-w-none"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-b from-[rgba(25,25,25,0)] from-[55%] via-[rgba(0,0,0,0.45)] via-[75%] ${fadeColor}`}
        />
      </div>

      {/* Dim overlay when expanded */}
      <div
        className={`pointer-events-none absolute inset-0 z-20 bg-black/85 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out ${
          isExpanded ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      />

      {/* Border element — corner marks */}
      <div className="pointer-events-none absolute inset-[-1px] z-20" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async" src={borderSrc} alt="" className="block size-full max-w-none" />
      </div>

      {/* Name and Content box */}
      <div
        className={`absolute inset-x-[18px] z-30 flex flex-col transition-all duration-300 ease-in-out ${
          isExpanded ? "top-[20px] bottom-[16px]" : ""
        }`}
        style={!isExpanded ? { top: boxTop } : undefined}
      >
        <div className="flex flex-col gap-[6px]">
          <div className="flex w-full items-start justify-between">
            <p
              className={`${gilroyMedium.className} max-w-full text-[24px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
            >
              {member.name}
            </p>
            <a
              href={member.linkedInHref}
              target="_blank"
              rel="noopener noreferrer"
              className="relative size-[24px] shrink-0"
              aria-label={`${member.name} on LinkedIn`}
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src="/company/linkedin-icon.svg"
                alt=""
                width={24}
                height={24}
                className="block size-full max-w-none"
                aria-hidden
              />
            </a>
          </div>
          {!isAdvisory && member.role ? (
            <p
              className={`${interRegular.className} text-[15px] leading-[22px] font-normal text-[#39ff14] not-italic [word-break:break-word]`}
            >
              {member.role}
            </p>
          ) : null}
        </div>

        {/* Bio text when expanded */}
        {isExpanded && member.bioParagraphs && member.bioParagraphs.length > 0 && (
          <div className="my-[10px] flex-1 overflow-y-auto pr-[4px] [scrollbar-width:thin] flex flex-col gap-[8px]">
            {member.bioParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`${interRegular.className} text-[13px] leading-[19px] font-normal text-[#d1d5db] not-italic [word-break:break-word]`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {/* Expand/Collapse button */}
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className={`${interRegular.className} ${isExpanded ? "mt-auto pt-[4px]" : "mt-[10px]"} flex cursor-pointer items-center text-left text-[15px] leading-[22px] font-normal text-white not-italic [word-break:break-word] transition-colors hover:text-[#39ff14]`}
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Read less -" : "Read more +"}
        </button>
      </div>
    </article>
  );
}

export function LeadershipCarousel({
  members,
  variant,
}: {
  members: LeadershipMember[];
  variant: "leadership" | "advisory";
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const centerCard = useCallback(
    (index: number) => {
      const container = scrollRef.current;
      if (!container) return;
      const clamped = Math.max(0, Math.min(index, members.length - 1));
      const card = container.children[clamped] as HTMLElement | undefined;
      if (!card) return;
      const target =
        card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2;
      container.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
    },
    [members.length],
  );

  // Center the first card on mount
  useEffect(() => {
    centerCard(0);
  }, [centerCard]);

  // Keep the active index in sync with the centered card
  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const center = container.scrollLeft + container.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    for (let i = 0; i < container.children.length; i++) {
      const el = container.children[i] as HTMLElement;
      const cardCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(cardCenter - center);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    }
    setActiveIndex(closest);
  }, []);

  return (
    <>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-[13px] overflow-x-auto px-[calc((100%_-_334px)_/_2)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {members.map((member) => (
          <LeadershipCardMobile
            key={member.nodeId}
            member={member}
            variant={variant}
          />
        ))}
      </div>

      <div className="mt-[34px] flex items-center justify-center gap-[20px]">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => centerCard(activeIndex - 1)}
          disabled={activeIndex <= 0}
          className="relative size-[44px] transition-opacity enabled:cursor-pointer enabled:hover:opacity-80 disabled:opacity-30"
        >
          <Image
            src="/applications/nav-arrow-left.svg"
            alt=""
            width={44}
            height={44}
            className="block size-full max-w-none"
            aria-hidden
          />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => centerCard(activeIndex + 1)}
          disabled={activeIndex >= members.length - 1}
          className="relative size-[44px] transition-opacity enabled:cursor-pointer enabled:hover:opacity-80 disabled:opacity-30"
        >
          <Image
            src="/applications/nav-arrow-right.svg"
            alt=""
            width={44}
            height={44}
            className="block size-full max-w-none"
            aria-hidden
          />
        </button>
      </div>
    </>
  );
}
