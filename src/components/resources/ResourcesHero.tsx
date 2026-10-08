"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { mediaUrl } from "@/lib/strapi";
import { interRegular, gilroyMedium } from "../hero/fonts";
import { GradientTitle, WhiteCtaButton } from "../contact/contact-shared";
import type { ResourceArticle } from "./resources-data";

const IMAGE_102_GRADIENT =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 825 1650' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-36.45 -0.0000015933 0.0000032605 -74.591 412.5 825)'><stop stop-color='rgba(0,0,0,0)' offset='0.3089'/><stop stop-color='rgba(0,0,0,1)' offset='1'/></radialGradient></defs></svg>\")";

const TEXT_FADE_IN_CLASS = "animate-hero-text-fade-in opacity-0";

const HERO_TITLE_FRAME = "/resources/hero-title-frame.svg";

type ResourcesHeroProps = {
  data?: any;
  onSearch?: (query: string) => void;
  articles?: ResourceArticle[];
};

const INITIAL_RESULTS = 4;

export function ResourcesHero({ data, onSearch, articles = [] }: ResourcesHeroProps = {}) {
  const title = (data?.title as string) || "";
  const placeholder = (data?.search_placeholder as string) || "";
  const searchLabel = (data?.search_button_label as string) || "";
  const contactText = (data?.contact_link_text as string) || "";
  const contactHref = (data?.contact_link_href as string) || "";
  const bgSrc = mediaUrl(data?.background_image);
  const titleLines = title.split("\n");

  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const normalizedQuery = inputValue.trim().toLowerCase();
  const matchedResults = normalizedQuery.length > 0
    ? articles.filter((a) => {
        const haystack = [a.title, a.excerpt, a.category].join(" ").toLowerCase();
        return haystack.includes(normalizedQuery);
      })
    : [];

  const displayedResults = showAll ? matchedResults : matchedResults.slice(0, INITIAL_RESULTS);
  const hasMore = matchedResults.length > INITIAL_RESULTS && !showAll;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    setShowDropdown(true);
    setShowAll(false);
  }

  function handleSearch() {
    onSearch?.(inputValue.trim());
    setShowDropdown(false);
  }

  return (
    <>
      {/* 2388:421 — rotated image 102 underlay */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 z-0 h-[825px] w-[1442px] -translate-x-1/2 overflow-hidden"
        data-node-id="2388:421"
        data-name="Hero Image"
      >
        <div className="absolute top-0 left-[calc(50%-5px)] flex h-[825px] w-[1650px] -translate-x-1/2 items-center justify-center">
          <div className="-rotate-90 flex-none">
            <div
              className="relative h-[1650px] w-[825px]"
              data-node-id="2379:1603"
              data-name="image 102"
            >
              {bgSrc ? (
                <Image
                  src={bgSrc}
                  alt={data?.background_image_alt || ""}
                  fill
                  className="max-w-none object-cover"
                  sizes="825px"
                  priority
                  unoptimized
                />
              ) : null}
              <div
                className="absolute inset-0"
                style={{ backgroundImage: IMAGE_102_GRADIENT }}
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hero text block — headline, search, contact */}
      <div
        className={`absolute top-[294px] left-0 z-10 h-[233.17px] w-full ${TEXT_FADE_IN_CLASS}`}
        style={{ animationDelay: '0.3s' }}
        data-name="Hero text"
      >
        <div
          className="absolute top-0 left-1/2 flex w-[810px] -translate-x-1/2 flex-col items-start gap-[15px]"
          data-node-id="2379:1627"
        >
          <div className="relative w-[810px] px-[10px]">
            <GradientTitle
              nodeId="2379:1628"
              gradientDeg="118.129deg"
              className="w-[810px] text-center"
              maxLines={2}
            >
              {titleLines.map((line, i) => (
                <span key={i} className="block [word-break:break-word]">
                  {line}
                </span>
              ))}
            </GradientTitle>
            <div
              className="pointer-events-none absolute top-[-4px] left-0 h-[106px] w-[810px]"
              data-node-id="2379:1629"
              aria-hidden
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={HERO_TITLE_FRAME}
                alt=""
                className="block size-full max-w-none"
              />
            </div>
          </div>
        </div>

        <div
          ref={wrapperRef}
          className="absolute top-[145.64px] left-[calc(16.67%+119px)] flex h-[48px] w-[722px] items-stretch border-[0.5px] border-solid border-[rgba(255,255,255,0.4)] bg-[rgba(0,0,0,0.3)]"
          data-node-id="2379:1621"
          style={{ position: "relative" }}
        >
          {/* Search input inner wrapper */}
          <div className="flex min-w-px flex-[1_0_0] items-center px-[20px]" data-node-id="2379:1622">
            <label htmlFor="resources-hero-search" className="sr-only">
              Search resources
            </label>
            <input
              id="resources-hero-search"
              type="search"
              name="resources-hero-search"
              autoComplete="off"
              placeholder={placeholder}
              aria-label="Search resources"
              value={inputValue}
              onChange={handleInputChange}
              onFocus={() => normalizedQuery.length > 0 && setShowDropdown(true)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); if (e.key === "Escape") setShowDropdown(false); }}
              className={`${interRegular.className} h-full w-full border-0 bg-transparent p-0 text-[14px] leading-[21px] font-normal text-white not-italic outline-none placeholder:text-white/70 focus:outline-none min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
            />

            {/* Live results dropdown — aligned to full bar */}
            {showDropdown && normalizedQuery.length > 0 && (
              <div className="absolute left-0 top-full mt-[4px] z-50 w-[722px] border border-[rgba(255,255,255,0.15)] bg-[rgba(10,10,10,0.97)] backdrop-blur-[12px] shadow-[0px_24px_60px_rgba(0,0,0,0.8)]">
                {displayedResults.length === 0 ? (
                  <div className={`${interRegular.className} px-[20px] py-[20px] text-[14px] text-white/40`}>
                    No results for &ldquo;{inputValue}&rdquo;
                  </div>
                ) : (
                  <>
                    {displayedResults.map((article) => (
                      <a
                        key={article.nodeId}
                        href={article.href || "#"}
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-[14px] border-b border-[rgba(255,255,255,0.06)] px-[20px] py-[14px] transition-colors hover:bg-[rgba(83,216,36,0.06)] last:border-b-0"
                      >
                        {article.imageSrc && (
                          <div className="relative h-[44px] w-[66px] shrink-0 overflow-hidden rounded-[2px] bg-white/5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={article.imageSrc} alt="" className="h-full w-full object-cover" />
                          </div>
                        )}
                        <div className="flex min-w-0 flex-col gap-[3px]">
                          <span className={`${interRegular.className} block truncate text-[13px] leading-[18px] text-[rgba(83,216,36,0.8)] uppercase tracking-[0.08em]`}>
                            {article.category}
                          </span>
                          <span className={`${gilroyMedium.className} block truncate text-[14px] leading-[20px] text-white`}>
                            {article.title}
                          </span>
                        </div>
                        <svg className="ml-auto shrink-0 text-white/30" width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    ))}
                    {hasMore && (
                      <button
                        type="button"
                        onClick={() => setShowAll(true)}
                        className={`${interRegular.className} flex w-full items-center justify-center gap-[6px] border-t border-[rgba(255,255,255,0.08)] px-[20px] py-[12px] text-[13px] text-[#53d824] transition-colors hover:bg-[rgba(83,216,36,0.06)]`}
                      >
                        View {matchedResults.length - INITIAL_RESULTS} more results
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={handleSearch}
            className="relative flex w-[158px] shrink-0 items-center justify-center bg-white bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.15)_100%)] shadow-[0px_24.721px_16.129px_rgba(255,255,255,0.15),0px_10.268px_6.699px_rgba(255,255,255,0.15),0px_3.714px_2.423px_rgba(255,255,255,0.1)] transition-opacity hover:opacity-90 cursor-pointer"
          >
            <span
              className={`${interRegular.className} text-[16px] leading-[normal] font-normal text-[#121212] not-italic`}
            >
              {searchLabel}
            </span>
          </button>
        </div>

        <div
          className={`${interRegular.className} absolute top-[212.17px] left-[calc(16.67%+119px)] flex w-[722px] justify-center items-center gap-[6px] text-[14px] leading-[21px] font-normal whitespace-nowrap not-italic min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
          data-node-id="2379:1634"
        >
          <span className="text-white opacity-75" data-node-id="2379:1635">
            Can&apos;t find what you&apos;re looking for?
          </span>
          <Link
            href={contactHref}
            className="text-[#53d824]"
            data-node-id="2379:1636"
          >
            {contactText}
          </Link>
        </div>
      </div>
    </>
  );
}
