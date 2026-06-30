"use client";

import { useEffect, useRef } from "react";

const HERO_VISUAL_WEBM = "/hero/Ambient Hero Dummy Video.webm";
const HERO_VISUAL_MOBILE_MP4 = "/mobile/Keep_camera_angle_202604021718.mp4";

export function HeroVisualMedia({ mobile = false }: { mobile?: boolean }) {
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
      className={
        mobile
          ? "absolute inset-0 size-full max-w-none object-cover object-center pl-[164px]"
          : "absolute inset-0 size-full max-w-none object-cover object-center pl-[70px] pt-[102px]"
      }
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden
    >
      <source
        src={mobile ? HERO_VISUAL_MOBILE_MP4 : HERO_VISUAL_WEBM}
        type={mobile ? "video/mp4" : "video/webm"}
      />
    </video>
  );
}
