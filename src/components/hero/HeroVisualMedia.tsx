"use client";

import { useEffect, useRef, useCallback, useSyncExternalStore } from "react";

function useMediaMatch(query: string) {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => true // Server snapshot matches to prevent hydration mismatch
  );
}

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
  const isVisibleRef = useRef<boolean>(true);
  const src = videoSrc || imageSrc;
  const isVideo = !!src && /\.(mp4|webm|mov|m4v|avi|wmv|flv|mkv|ogg|ogv)(\?.*)?$/i.test(src);

  // After hydration, only mount the video matching the active viewport breakpoint.
  // This prevents rendering and decoding duplicate heavy video streams simultaneously.
  const isBreakpointMatch = useMediaMatch(
    mobile ? "(max-width: 599.98px)" : "(min-width: 600px)"
  );

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
      if (!video || !isVisibleRef.current) return;
      video.defaultMuted = true;
      video.muted = true;
      if (video.paused) {
        void video.play().catch(() => {});
      }
    };

    if (video.readyState >= 2 && isVisibleRef.current) {
      start();
    }

    video.addEventListener("loadeddata", start);
    video.addEventListener("canplay", start);
    video.addEventListener("canplaythrough", start);

    // Reliable looping: if native loop stalls or stutters at boundary, rewind & play
    const handleEnded = () => {
      if (!video) return;
      video.currentTime = 0;
      start();
    };
    video.addEventListener("ended", handleEnded);

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
      if (video && video.paused && isVisibleRef.current) {
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

    // Retry loop until playback actually begins (only while in viewport)
    let tries = 0;
    const retryTimer = window.setInterval(() => {
      if (!video || !video.paused || !isVisibleRef.current || ++tries > 15) {
        if (!video || !video.paused || tries > 15) {
          window.clearInterval(retryTimer);
        }
        return;
      }
      start();
    }, 400);

    // Pause playback when scrolled out of view or hidden to free GPU/CPU decoding
    const io = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);
        isVisibleRef.current = isVisible;
        if (isVisible) {
          start();
        } else if (video && !video.paused) {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );
    io.observe(video);

    return () => {
      video.removeEventListener("loadeddata", start);
      video.removeEventListener("canplay", start);
      video.removeEventListener("canplaythrough", start);
      video.removeEventListener("ended", handleEnded);
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

  // Once hydrated, if this component belongs to the inactive breakpoint (e.g. mobile
  // video on desktop, or desktop video on mobile), do not mount the video element.
  if (!isBreakpointMatch) {
    return null;
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
          if (isVisibleRef.current) {
            void v.play().catch(() => {});
          }
        }}
        onCanPlay={(e) => {
          const v = e.currentTarget;
          v.muted = true;
          if (isVisibleRef.current) {
            void v.play().catch(() => {});
          }
        }}
      />
    </>
  );
}
