import { mediaUrl } from "@/lib/strapi";
import React from "react";

export function WearablesCarousel({ data }: { data?: any }) {
  // data should be an object with an `images` array (from Strapi)
  const images: any[] = Array.isArray(data?.images) ? data.images : [];
  
  if (images.length === 0) return null;

  // Double the images to create the seamless scrolling effect
  const marqueeItems = [...images, ...images];

  return (
    <section className="relative w-full overflow-hidden bg-black py-[40px] z-10 flex items-center border-t border-[rgba(240,240,240,0.1)]">
      {/* 
        The animate-dvk-marquee-left translates from 0 to -50% to create a seamless loop.
      */}
      <div className="flex w-max animate-dvk-marquee-left items-center gap-[12px] px-[6px]">
        {marqueeItems.map((img, i) => {
          const url = mediaUrl(img);
          if (!url) return null;
          return (
            <div
              key={`${img.id}-${i}`}
              className="relative flex h-[240px] md:h-[460px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-[rgba(240,240,240,0.1)] bg-black/40 shadow-lg p-[10px]"
            >
              <img
                src={url}
                alt={img.alternativeText || "Wearables Carousel Image"}
                className="h-full w-auto object-contain"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
