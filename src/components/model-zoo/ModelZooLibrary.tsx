/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { dmMono, gilroyMedium, gilroySemiBold, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { getFadeInClass, useFadeIn } from "../shared/useFadeIn";
import { TagBadge } from "../hero/TagBadge";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { CtaPrimary } from "./ModelZooCtas";
import { ModelZooRequestForm } from "./ModelZooRequestForm";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
  PRIMARY_CTA_INSET,
  PRIMARY_CTA_SHADOW,
  sectionTitleGradient,
} from "./model-zoo-data";

const TITLE_GRADIENT = sectionTitleGradient(123.948);

/* ------------------------------ model data ------------------------------ */

type Model = {
  title: string;
  modality: string; // tag 1
  type: string; // tag 2
  img: string;
  desc: string;
  videoId?: string; // YouTube id for the demo popup
  comingSoon?: boolean;
};

/** Figma 5131:9722 — model cards. */
const MODELS: Model[] = [
  {
    title: "Fall Detection",
    modality: "motion",
    type: "in-house",
    img: "/model-zoo/fall-detection.webp",
    videoId: "9HM7szuyXOs",
    desc: "Detect falls and sudden posture changes from motion data for always-on safety monitoring and rapid incident detection.",
  },
  {
    title: "Gesture Glider",
    modality: "motion",
    type: "in-house",
    img: "/model-zoo/gesture-glider.webp",
    videoId: "6Pn0PM5een4",
    desc: "Control gameplay through natural wrist gestures, demonstrating responsive, real-time motion inference running entirely on-device.",
  },
  {
    title: "Voice Activity Detection and Transcription",
    modality: "audio",
    type: "in-house",
    img: "/model-zoo/voice-activity-detection.webp",
    videoId: "N7GbCh7WCMM",
    desc: "Detect when speech begins and transcribe spoken audio in real time for efficient, responsive voice applications.",
  },
  {
    title: "Glass Break Detection",
    modality: "audio",
    type: "in-house",
    img: "/model-zoo/glass-break-detection.webp",
    videoId: "HV1rKxovOug",
    desc: "Detect the distinctive acoustic signature of breaking glass for continuous, low-power home and security monitoring.",
  },
  {
    title: "Daily Activity Recognition",
    modality: "motion",
    type: "in-house",
    img: "/model-zoo/daily-activity-recognition.webp",
    desc: "Classify everyday activities such as walking, sitting, standing, and movement patterns from continuous motion data.",
    comingSoon: true,
  },
  {
    title: "Wake Word Detection",
    modality: "audio",
    type: "in-house",
    img: "/model-zoo/wake-word-detection.webp",
    desc: "Detect a predefined wake phrase continuously at ultra-low power to activate downstream voice experiences only when needed.",
    comingSoon: true,
  },
];

const MODALITIES = ["all", "audio", "motion"];
const TYPES = ["all", "in-house"];

/** Figma 5348:6508…6562 — "AI models" strip thumbnails (rendered as one row export). */

/* ------------------------------ subcomponents ------------------------------ */

/** Figma 5131:9728 — tag chip (120/150×26, DM Mono, side bars, corner ticks). */
function Tag({ label, width }: { label: string; width: number }) {
  return (
    <div
      className="relative h-[26px] shrink-0 overflow-clip bg-[rgba(255,255,255,0.06)]"
      style={{ width }}
      data-name="Menu"
    >
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      <p
        className={`${dmMono.className} absolute top-[calc(50%-4.5px)] left-1/2 -translate-x-1/2 text-[13px] leading-[19.5px] font-normal tracking-[-0.39px] whitespace-nowrap text-[#ecfae5] uppercase not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
      >
        {label}
      </p>
      <div className="absolute top-1/2 left-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
      <div className="absolute top-1/2 right-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
    </div>
  );
}

/** Figma 5131:9722 — model card. */
function ModelCard({ model, onWatch }: { model: Model; onWatch: () => void }) {
  const { fadeRef, isVisible } = useFadeIn<HTMLElement>();
  return (
    <article
      ref={fadeRef}
      className={`relative flex snap-center shrink-0 w-[280px] h-auto flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(255,255,255,0.04)] px-[12px] pt-[12px] pb-[24px] transition-colors duration-300 hover:border-[#a8ed90] hover:bg-[rgba(68,120,7,0.2)] min-[1024px]:w-full min-[1024px]:shrink ${getFadeInClass(isVisible)}`}
      data-name="Article"
    >
      <div className="relative h-[259.161px] w-full shrink-0 overflow-clip">
        <img
          alt={model.title}
          src={model.img}
          className="pointer-events-none size-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="flex w-full flex-col items-start gap-[12px]">
        <h3 className={`${gilroyMedium.className} w-[353.684px] max-w-full text-[22px] leading-[28px] text-white not-italic [word-break:break-word]`}>
          {model.title}
        </h3>
        <div className="flex w-full items-start gap-[20px]">
          <Tag label={model.modality} width={120} />
          <Tag label={model.type} width={160} />
        </div>
        <p className={`${interRegular.className} w-[346.611px] max-w-full text-[16px] leading-[24px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}>
          {model.desc}
        </p>
      </div>

      {/* CTA — 5131:9788 */}
      <div className="mt-auto flex w-full flex-row items-center justify-center gap-[8px] min-[1024px]:gap-[12px]">
        {model.comingSoon ? (
          <div
            className={`relative flex h-[48px] items-center justify-center border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] px-[24px] opacity-50`}
            aria-label={`${model.title} demo coming soon`}
          >
            <span className={`${gilroyMedium.className} text-[14px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic min-[1024px]:text-[16px]`}>
              Coming Soon
            </span>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </div>
        ) : (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onWatch();
            }}
            className={`${PRIMARY_CTA_SHADOW} relative flex h-[48px] items-center justify-center px-[24px]`}
            data-name="Cta"
            aria-label={`Watch ${model.title} demo`}
          >
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
            <span className="relative flex items-center gap-[6px] min-[1024px]:gap-[10px] overflow-hidden px-[8px]">
              <span className={`${gilroyMedium.className} truncate text-[14px] min-[1024px]:text-[16px] leading-[28px] font-medium uppercase text-white not-italic`}>
                watch demo
              </span>
              <img alt="" src="/model-zoo/icon-play.svg" className="block h-[13.75px] w-[12.92px] shrink-0" />
            </span>
            <span aria-hidden className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`} />
            <GreenCtaCorners />
          </a>
        )}
      </div>

      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </article>
  );
}

/** Placeholder demo video — swap for per-model demos when they arrive. */
const DEMO_VIDEO_ID = "aqz-KE-bpKQ";

/** YouTube demo popup — same overlay pattern as the request form. */
function VideoModal({ title, videoId, onClose }: { title: string; videoId?: string; onClose: () => void }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    // Lock <html> as well: iOS Safari ignores body-level overflow:hidden for touch panning.
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => {
    // Safari doesn't propagate the modal-opening click into the cross-origin
    // YouTube iframe, so autoplay=1 alone leaves the player paused with a
    // play button. Command the player (muted, so autoplay policy allows it)
    // until it starts. Viewer unmutes via the player controls.
    let tries = 0;
    const timer = setInterval(() => {
      const win = iframeRef.current?.contentWindow;
      if (win) {
        win.postMessage(
          JSON.stringify({ event: "command", func: "playVideo", args: [] }),
          "*"
        );
      }
      if (++tries > 10) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex animate-popup-backdrop-in items-center justify-center overflow-y-auto bg-black/80 p-[16px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} demo video`}
    >
      <div
        className="relative my-auto flex max-h-full w-full max-w-[960px] flex-col gap-[16px] border-[0.5px] border-solid border-[rgba(240,240,240,0.25)] bg-[#141414] p-[16px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-[16px]">
          <h3 className={`${gilroyMedium.className} m-0 text-[22px] leading-[28px] text-white not-italic`}>{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className={`${interRegular.className} relative flex h-[36px] shrink-0 items-center border-[0.5px] border-solid border-[rgba(240,240,240,0.25)] bg-[rgba(226,241,202,0.12)] px-[16px] text-[13px] uppercase text-white hover:bg-[rgba(226,241,202,0.2)]`}
          >
            Close
          </button>
        </div>
        <div className="relative aspect-video w-full overflow-clip">
          <iframe
            ref={iframeRef}
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId || DEMO_VIDEO_ID}?autoplay=1&mute=1&playsinline=1&enablejsapi=1&rel=0`}
            title={`${title} demo`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      </div>
    </div>
  );
}

/** Figma 5286:7504 — filter dropdown button (200×48, text + chevron). */
function FilterSelect({
  label,
  options,
  onChange,
}: {
  label: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[48px] w-full flex-1 min-[1024px]:w-[200px] min-[1024px]:flex-none min-[1024px]:shrink-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`${interRegular.className} relative flex h-full w-full items-center gap-[10px] border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] px-[12px] text-left text-[14px] leading-[1.4] text-white not-italic hover:border-[rgba(240,240,240,0.4)] min-[1024px]:px-[20px]`}
      >
        <span className="truncate flex-1">{label}</span>
        <img alt="" src="/model-zoo/filter-chevron.svg" className={`size-[24px] shrink-0 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      <ul className={`${open ? "block" : "hidden"} absolute top-[52px] left-0 z-30 w-full border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-black`}>
        {options.map((opt) => (
          <li key={opt}>
            <button
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`${interRegular.className} block w-full px-[20px] py-[10px] text-left text-[14px] text-white not-italic hover:bg-[rgba(255,255,255,0.08)] min-[1024px]:text-[16px]`}
            >
              {opt === "all" ? "All" : opt.replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------ section ------------------------------ */

/**
 * Figma 5130:8356 — "A model for every sense." library section.
 * 1244-wide container at page x=98: header, filter bar, 3×2 card grid,
 * "AI models" thumbnail strip (bleeds right, clipped), Request CTA.
 */
export function ModelZooLibrary({ requestForm }: { requestForm?: any }) {
  const [modality, setModality] = useState("all");
  const [type, setType] = useState("all");
  const [query, setQuery] = useState("");
  const [requestOpen, setRequestOpen] = useState(false);
  const [video, setVideo] = useState<Model | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MODELS.filter(
      (m) =>
        (modality === "all" || m.modality === modality) &&
        (type === "all" || m.type === type) &&
        (!q || m.title.toLowerCase().includes(q))
    );
  }, [modality, type, query]);

  return (
    <section
      className="relative mt-[60px] w-full overflow-x-clip bg-black"
      data-node-id="5130:8356"
      aria-label="A model for every sense"
    >
      <div className="relative mx-auto w-full max-w-[1244px] px-[16px] min-[1024px]:px-0">
        {/* Header — 5130:8357 */}
        <div className="flex w-full flex-col items-center gap-[24px]" data-node-id="5130:8357">
          <TagBadge label="Demo Ready" />
          <div className="relative px-[10px]" data-node-id="5130:8359" data-name="Title">
            <h2
              className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic min-[1024px]:text-[46px] min-[1024px]:leading-[49px] min-[1024px]:whitespace-nowrap`}
              style={{ backgroundImage: TITLE_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text" }}
              data-node-id="5130:8360"
            >
              A model for every sense.
            </h2>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </div>
          <p className={`${interRegular.className} w-full max-w-[800px] text-center text-[14px] leading-[21px] min-[1024px]:text-[16px] min-[1024px]:leading-[24px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}>
            Explore open-source and Ambient-built models across Audio, Vision, and Motion.
          </p>
        </div>

        {/* Filter bar — 5286:7530 */}
        <div className="mt-[24px] flex w-full flex-col min-[1024px]:mt-[48px] min-[1024px]:flex-row min-[1024px]:items-center min-[1024px]:justify-between min-[1024px]:flex-nowrap" data-node-id="5286:7530">
          <div className="order-2 mt-[16px] flex w-full flex-row gap-[12px] min-[1024px]:mt-0 min-[1024px]:order-1 min-[1024px]:w-auto min-[1024px]:gap-[20px] min-[1024px]:items-center" data-node-id="5286:7503">
            <FilterSelect label="Filter By Modality" options={MODALITIES} onChange={setModality} />
            <FilterSelect label="Filter By Type" options={TYPES} onChange={setType} />
          </div>
          <div className="contents min-[1024px]:order-2 min-[1024px]:flex min-[1024px]:w-auto min-[1024px]:flex-row min-[1024px]:items-center min-[1024px]:gap-[20px]" data-node-id="5286:7521">
            <div className="order-1 flex w-full items-center min-[1024px]:order-none min-[1024px]:w-[400px]" data-node-id="5286:7522">
              <div className="relative h-[48px] min-w-px flex-1 border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.3)] px-[12px] min-[1024px]:px-[20px]">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by model or use case…"
                  aria-label="Search by model or use case"
                  className={`${interRegular.className} h-full w-full border-0 bg-transparent text-[14px] leading-[21px] text-white not-italic outline-none placeholder:text-[12px] placeholder:text-[#8e8e8e] min-[1024px]:text-[16px] min-[1024px]:leading-[24px] min-[1024px]:placeholder:text-[13px]`}
                />
              </div>
              <button
                type="button"
                className={`${interRegular.className} relative h-[48px] w-[158px] shrink-0 bg-white text-[14px] leading-[21px] font-normal whitespace-nowrap text-[#121212] not-italic shadow-[inset_0px_1px_18px_0px_rgba(45,45,45,0.6)]`}
                data-node-id="5286:7526"
                data-name="Cta"
              >
                Search
              </button>
            </div>
            <div className="order-3 mt-[16px] flex w-full justify-end min-[1024px]:order-none min-[1024px]:mt-0 min-[1024px]:w-auto min-[1024px]:justify-start">
              <button
                type="button"
                onClick={() => {
                  setModality("all");
                  setType("all");
                  setQuery("");
                }}
                className={`${interRegular.className} text-[14px] leading-[21px] font-normal whitespace-nowrap text-[#53d824] not-italic hover:underline min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
                data-node-id="5286:7528"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Card grid — 5131:11386 (2 rows × 3, gap 20) */}
        <div className="mt-[24px] min-[1024px]:mt-[40px]" data-node-id="5131:11386">
          {filtered.length > 0 ? (
            <div className="flex w-[calc(100%+32px)] snap-x snap-mandatory overflow-x-auto gap-[16px] mx-[-16px] px-[16px] pb-[16px] after:content-[''] after:w-[1px] after:shrink-0 min-[1024px]:w-full min-[1024px]:grid min-[1024px]:grid-cols-3 min-[1024px]:gap-[20px] min-[1024px]:overflow-visible min-[1024px]:mx-0 min-[1024px]:px-0 min-[1024px]:pb-0 min-[1024px]:after:hidden">
              {filtered.map((model) => (
                <ModelCard key={model.title} model={model} onWatch={() => setVideo(model)} />
              ))}
            </div>
          ) : (
            <p className={`${interRegular.className} py-[80px] text-center text-[16px] text-[#99a1af] not-italic`}>
              No models match your filters.
            </p>
          )}

          {/* AI models strip — 5348:6505. The Figma frame is a static snapshot of
              what is designed as a continuous edge-to-edge carousel (like the
              home page rows): the exported row runs in a seamless marquee. */}
          <div className="mt-[48px] min-[1024px]:mt-[64px]" data-node-id="5348:6505">
            {/* Whole Model Zoo — strip heading */}
            <div className="flex w-full flex-col items-center gap-[24px] pt-[32px] text-center mb-[20px] min-[1024px]:pt-[48px] min-[1024px]:mb-[28px]">
              <div className="relative px-[10px]">
                <h3
                  className={`${gilroyMedium.className} m-0 bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic min-[1024px]:text-[46px] min-[1024px]:leading-[49px]`}
                  style={{
                    backgroundImage: TITLE_GRADIENT,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  The whole Model Zoo
                </h3>
                <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
              </div>
              <p className={`${interRegular.className} w-full max-w-[800px] text-center text-[14px] leading-[21px] min-[1024px]:text-[16px] min-[1024px]:leading-[24px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}>
                Every open-source and Ambient-built model across audio, vision, and motion - 30+ and growing.
              </p>
            </div>

            <div className="relative h-[80px]">
              <p
                className={`${gilroySemiBold.className} absolute top-[20.32px] left-0 bg-clip-text text-[56px] leading-[60px] font-semibold tracking-[-1.12px] whitespace-nowrap text-transparent opacity-90 not-italic`}
                style={{
                  backgroundImage:
                    "linear-gradient(106.249deg, rgb(22, 22, 22) 9.025%, rgb(39, 39, 39) 37.884%, rgb(18, 18, 18) 111.41%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
                data-node-id="5348:6506"
              >
                AI models
              </p>
            </div>
            {/* Full-bleed marquee — viewport-wide clip. strip-loop.webp is the
                5-card period (Presence → Air Gestures) cropped with its trailing
                gap so two flush copies tile seamlessly under the -50% keyframe. */}
            <div
              className="relative left-[calc(50%-50vw)] w-screen max-w-none overflow-clip"
              data-node-id="5348:6507"
            >
              <div
                className="flex w-max animate-dvk-marquee-left items-start"
                style={{ animationDuration: "30s" }}
              >
                <img
                  alt="AI models: Presence Detection, Wake Word Detection, Face Locator, Fall Detection, Air Gestures"
                  src="/model-zoo/strip-loop.webp"
                  className="h-[200px] w-[1185px] max-w-none shrink-0 object-fill"
                  loading="lazy"
                  decoding="async"
                />
                <img
                  alt=""
                  aria-hidden
                  src="/model-zoo/strip-loop.webp"
                  className="h-[200px] w-[1185px] max-w-none shrink-0 object-fill"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Request CTA — 5131:5191 (225×48, centered) */}
        <div className="mt-[36px] flex justify-center pb-[40px] min-[1024px]:pb-[81px]">
          <CtaPrimary label="Request Model Zoo" width={225} onClick={() => setRequestOpen(true)} />
        </div>
      </div>

      {requestOpen ? <ModelZooRequestForm onClose={() => setRequestOpen(false)} config={requestForm} /> : null}
      {video ? <VideoModal title={video.title} videoId={video.videoId} onClose={() => setVideo(null)} /> : null}
    </section>
  );
}
