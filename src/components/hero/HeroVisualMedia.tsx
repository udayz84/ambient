"use client";

import { useEffect, useRef } from "react";

export function HeroVisualMedia({
  mobile = false,
  videoSrc,
}: {
  mobile?: boolean;
  videoSrc?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    const play = () => {
      void video.play().catch(() => undefined);
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      play();
    } else {
      video.addEventListener("loadeddata", play, { once: true });
    }
  }, [videoSrc]);

  const src = videoSrc;

  if (!src) {
    return null;
  }

  // Check for common video extensions, ignoring any query parameters
  const isVideo = /\.(mp4|webm|mov|m4v|avi|wmv|flv|mkv|ogg|ogv)(\?.*)?$/i.test(src);
  const isWebM = /\.webm(\?.*)?$/i.test(src);
  const isMov = /\.mov(\?.*)?$/i.test(src);
  const type = isWebM ? "video/webm" : isMov ? "video/quicktime" : "video/mp4";

  if (!isVideo) {
    return (
      <img
        src={src}
        alt=""
        className={
          mobile
            ? "absolute inset-0 size-full max-w-none object-cover object-center"
            : "absolute inset-0 size-full max-w-none object-cover object-center"
        }
        aria-hidden
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className={
        mobile
          ? "absolute inset-0 size-full max-w-none object-cover object-center"
          : "absolute inset-0 size-full max-w-none object-cover object-center"
      }
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden
    >
      <source src={src} type={type} />
    </video>
  );
}
