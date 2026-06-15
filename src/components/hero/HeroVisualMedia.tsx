"use client";

import { useEffect, useRef, useState } from "react";

const HERO_VISUAL_WEBM = "/hero/Ambient Hero Dummy Video.webm";
const HERO_VISUAL_POSTER = "/hero/test-2379-737.png";

export function HeroVisualMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => setHasVideo(true);
    const onError = () => setHasVideo(false);
    const play = () => {
      void video.play().catch(() => undefined);
    };

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", onError);

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      play();
    } else {
      video.addEventListener("loadeddata", play, { once: true });
    }

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onError);
    };
  }, []);

  return (
    <>
      {/* Poster: chip + trails only (export from Figma 2379:737 — not the full hero frame). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HERO_VISUAL_POSTER}
        alt=""
        className={`absolute inset-0 size-full max-w-none object-cover object-center ${
          hasVideo ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <video
        ref={videoRef}
        className={`absolute inset-0 size-full max-w-none object-cover object-center ${
          hasVideo ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={HERO_VISUAL_POSTER}
        aria-hidden
      >
        <source src={HERO_VISUAL_WEBM} type="video/webm" />
      </video>
    </>
  );
}
