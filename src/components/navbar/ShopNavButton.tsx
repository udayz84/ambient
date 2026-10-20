"use client";

import Image from "next/image";
import Link from "next/link";

export function ShoppingCartIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  );
}

export function ShopNavButton({
  item,
  onClick,
  className = "",
}: {
  item: { label: string; href: string };
  onClick?: () => void;
  className?: string;
}) {
  const isExternal = item.href.startsWith("http");

  return (
    <Link
      href={item.href}
      onClick={onClick}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`relative flex h-[36px] w-[134px] items-center justify-center gap-[6px] shrink-0 shadow-[0px_42px_107px_0px_rgba(0,196,255,0.2),0px_24.721px_32.257px_0px_rgba(0,196,255,0.15),0px_10.268px_13.398px_0px_rgba(0,196,255,0.15)] transition-opacity hover:opacity-90 ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#00d0ff] to-[#0055ff]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,255,0.6)]"
      />
      <span className="relative z-10 flex items-center gap-[6px] text-white">
        <ShoppingCartIcon />
        <span className="max-w-full overflow-hidden text-ellipsis text-[14px] leading-[normal] font-bold uppercase tracking-[-0.42px] whitespace-nowrap">
          {item.label}
        </span>
      </span>
      {/* Corner tags */}
      <div className="pointer-events-none absolute right-0 top-0 z-20 flex size-[4px] items-center justify-center">
        <div className="-scale-x-100 -scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src="/hero/corner-tag-1.svg" alt="" fill className="block max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute left-0 top-0 z-20 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src="/hero/corner-tag-1.svg" alt="" fill className="block max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 z-20 flex size-[4px] items-center justify-center">
        <div className="-scale-x-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src="/hero/corner-tag-1.svg" alt="" fill className="block max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 z-20 size-[4px]">
        <div className="absolute inset-[0_0_-12.5%_-12.5%]">
          <Image src="/hero/corner-tag-1.svg" alt="" fill className="block max-w-none" aria-hidden />
        </div>
      </div>
    </Link>
  );
}
