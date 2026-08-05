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
  const type = mobile ? "video/mp4" : "video/webm";

  if (!src) {
    return null;
  }

  const isVideo = /\.(mp4|webm)$/i.test(src);

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
