"use client";

import { useEffect, useRef, useCallback } from "react";

export function HeroVisualMedia({
  mobile = false,
  imageSrc,
  videoSrc,
  alt = "",
}: {
  mobile?: boolean;
  imageSrc?: string;
  videoSrc?: string;
  alt?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const initVideo = useCallback((video: HTMLVideoElement | null) => {
    if (!video) return;
    videoRef.current = video;

    // Critical for WebKit / Safari: set muted and playsinline on raw DOM node
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");

    const play = () => {
      video.defaultMuted = true;
      video.muted = true;
      void video.play().catch(() => {});
    };

    play();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const start = () => {
      if (video) {
        video.defaultMuted = true;
        video.muted = true;
        void video.play().catch(() => {});
      }
    };

    start();

    video.addEventListener("loadedmetadata", start);
    video.addEventListener("canplay", start);
    video.addEventListener("canplaythrough", start);
    video.addEventListener("loadeddata", start);

    // Global triggers: if Safari or battery saver initially halts autoplay,
    // resume immediately on the very first user interaction or scroll
    const onUserInteraction = () => {
      if (video && video.paused) {
        video.muted = true;
        void video.play().catch(() => {});
      }
    };

    window.addEventListener("scroll", onUserInteraction, { passive: true });
    window.addEventListener("touchstart", onUserInteraction, { passive: true });
    window.addEventListener("touchend", onUserInteraction, { passive: true });
    window.addEventListener("pointerdown", onUserInteraction, { passive: true });
    window.addEventListener("click", onUserInteraction, { passive: true });
    window.addEventListener("wheel", onUserInteraction, { passive: true });
    document.addEventListener("visibilitychange", onUserInteraction);

    // WebKit can reject every early play() (autoplay policy / readiness
    // timing) while a later call succeeds — keep retrying briefly until
    // playback actually starts. Capped so a hard block (e.g. Low Power Mode)
    // doesn't retry forever.
    let tries = 0;
    const retryTimer = window.setInterval(() => {
      if (!video.paused || ++tries > 10) {
        window.clearInterval(retryTimer);
        return;
      }
      start();
    }, 1000);

    // Safari pauses autoplay when the element leaves the viewport; resume as
    // soon as the hero is back in view.
    const io = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) start();
    });
    io.observe(video);

    return () => {
      video.removeEventListener("loadedmetadata", start);
      video.removeEventListener("canplay", start);
      video.removeEventListener("canplaythrough", start);
      video.removeEventListener("loadeddata", start);

      window.removeEventListener("scroll", onUserInteraction);
      window.removeEventListener("touchstart", onUserInteraction);
      window.removeEventListener("touchend", onUserInteraction);
      window.removeEventListener("pointerdown", onUserInteraction);
      window.removeEventListener("click", onUserInteraction);
      window.removeEventListener("wheel", onUserInteraction);
      document.removeEventListener("visibilitychange", onUserInteraction);
      window.clearInterval(retryTimer);
      io.disconnect();
    };
  }, [videoSrc]);

  const src = imageSrc || videoSrc;

  if (!src) {
    return null;
  }

  // Check for common video extensions, ignoring any query parameters
  const isVideo = /\.(mp4|webm|mov|m4v|avi|wmv|flv|mkv|ogg|ogv)(\?.*)?$/i.test(src);

  if (!isVideo) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 size-full max-w-none object-cover object-center"
        aria-hidden={!alt}
      />
    );
  }

  return (
    <>
      <style>{`
        video::-webkit-media-controls,
        video::-webkit-media-controls-start-playback-button,
        video::-webkit-media-controls-play-button,
        video::-webkit-media-controls-panel,
        video::-webkit-media-controls-overlay-play-button {
          display: none !important;
          -webkit-appearance: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }
      `}</style>
      <video
        ref={initVideo}
        src={src}
        className={`${
          mobile
            ? "absolute inset-0 size-full max-w-none object-cover object-center"
            : "absolute inset-0 size-full max-w-none object-cover object-center"
        } pointer-events-none`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
        aria-hidden
      />
    </>
  );
}
