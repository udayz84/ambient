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
  const src = videoSrc || imageSrc;
  const isVideo = !!src && /\.(mp4|webm|mov|m4v|avi|wmv|flv|mkv|ogg|ogv)(\?.*)?$/i.test(src);

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
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src || !isVideo) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const start = () => {
      if (!video) return;
      video.defaultMuted = true;
      video.muted = true;
      if (video.paused) {
        void video.play().catch(() => {});
      }
    };

    if (video.readyState >= 2) {
      start();
    }

    video.addEventListener("loadeddata", start);
    video.addEventListener("canplay", start);
    video.addEventListener("canplaythrough", start);

    // Global triggers: if Safari or battery saver initially halts autoplay,
    // resume on first user interaction or scroll, then disconnect.
    const removeInteractionListeners = () => {
      window.removeEventListener("scroll", onUserInteraction);
      window.removeEventListener("touchstart", onUserInteraction);
      window.removeEventListener("touchend", onUserInteraction);
      window.removeEventListener("pointerdown", onUserInteraction);
      window.removeEventListener("click", onUserInteraction);
      document.removeEventListener("visibilitychange", onUserInteraction);
    };

    const onUserInteraction = () => {
      if (video && video.paused) {
        video.muted = true;
        void video.play().then(() => {
          removeInteractionListeners();
        }).catch(() => {});
      } else if (video && !video.paused) {
        removeInteractionListeners();
      }
    };

    video.addEventListener("playing", removeInteractionListeners, { once: true });

    window.addEventListener("scroll", onUserInteraction, { passive: true });
    window.addEventListener("touchstart", onUserInteraction, { passive: true });
    window.addEventListener("touchend", onUserInteraction, { passive: true });
    window.addEventListener("pointerdown", onUserInteraction, { passive: true });
    window.addEventListener("click", onUserInteraction, { passive: true });
    document.addEventListener("visibilitychange", onUserInteraction);

    // Retry loop until playback actually begins
    let tries = 0;
    const retryTimer = window.setInterval(() => {
      if (!video.paused || ++tries > 20) {
        window.clearInterval(retryTimer);
        return;
      }
      start();
    }, 250);

    const io = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) start();
    });
    io.observe(video);

    return () => {
      video.removeEventListener("loadeddata", start);
      video.removeEventListener("canplay", start);
      video.removeEventListener("canplaythrough", start);
      video.removeEventListener("playing", removeInteractionListeners);
      removeInteractionListeners();
      window.clearInterval(retryTimer);
      io.disconnect();
    };
  }, [src, isVideo]);

  if (!src) {
    return null;
  }

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
        } pointer-events-none [&::-webkit-media-controls-start-playback-button]:!hidden [&::-webkit-media-controls]:!hidden`}
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
        onLoadedData={(e) => {
          const v = e.currentTarget;
          v.muted = true;
          void v.play().catch(() => {});
        }}
        onCanPlay={(e) => {
          const v = e.currentTarget;
          v.muted = true;
          void v.play().catch(() => {});
        }}
      />
    </>
  );
}
