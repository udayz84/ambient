"use client";

import { useEffect, useRef } from "react";

const HERO_VISUAL_WEBM = "/hero/Ambient Hero Dummy Video.webm";

export function HeroVisualMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      void video.play().catch(() => undefined);
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      play();
    } else {
      video.addEventListener("loadeddata", play, { once: true });
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 size-full max-w-none object-cover object-center"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden
    >
      <source src={HERO_VISUAL_WEBM} type="video/webm" />
    </video>
  );
}
