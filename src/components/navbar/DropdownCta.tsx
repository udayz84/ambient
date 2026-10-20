"use client";

import Image from "next/image";
import Link from "next/link";
import { gilroyMedium } from "../hero/fonts";

export function DropdownCta({
  href,
  label,
  onNavigate,
  className = "",
}: {
  href: string;
  label: string;
  onNavigate: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`relative flex h-[48px] shrink-0 items-center justify-center bg-[rgba(226,241,202,0.12)] px-[20px] transition-opacity hover:opacity-90 ${gilroyMedium.className} w-max max-w-full ${className}`}
    >
      <span className="relative max-w-full text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white overflow-hidden text-ellipsis">
        {label}
      </span>
      <div className="pointer-events-none absolute right-0 top-0 flex size-[4px] items-center justify-center">
        <div className="rotate-180 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src="/hero/corner-tag-2.svg" alt="" fill className="block max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute top-0 left-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src="/hero/corner-tag-1.svg" alt="" fill className="block max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute right-0 bottom-0 flex size-[4px] items-center justify-center">
        <div className="-scale-x-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src="/hero/corner-tag-2.svg" alt="" fill className="block max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 size-[4px]">
        <div className="absolute inset-[0_0_-12.5%_-12.5%]">
          <Image src="/hero/corner-tag-1.svg" alt="" fill className="block max-w-none" aria-hidden />
        </div>
      </div>
    </Link>
  );
}
