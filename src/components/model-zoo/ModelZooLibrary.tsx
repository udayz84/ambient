/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState } from "react";
import { dmMono, gilroyMedium, gilroySemiBold, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { getFadeInClass, useFadeIn } from "../shared/useFadeIn";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { CtaPrimary } from "./ModelZooCtas";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
  PRIMARY_CTA_INSET,
  PRIMARY_CTA_SHADOW,
  sectionTitleGradient,
} from "./model-zoo-data";

const TITLE_GRADIENT = sectionTitleGradient(123.948);

/* ------------------------------ model data ------------------------------ */

type Spec = { label: string; value: string };

type Model = {
  title: string;
  modality: string; // tag 1
  type: string; // tag 2
  img: string;
  specs: Spec[];
};

const DEFAULT_SPECS: Spec[] = [
  { label: "MEMORY", value: "64 KB" },
  { label: "LATENCY / GPX10", value: "14 ms" },
  { label: "ACTIVE POWER", value: "84 µW" },
  { label: "ENERGY / INF.", value: "1.2 µJ" },
];

const CARD_DESC = "Recognize predefined keywords and voice commands using an always-on...";

/** Figma 5131:9722 … 5422:6620 — six model cards. */
const MODELS: Model[] = [
  { title: "Anomaly Detection", modality: "audio", type: "open-source", img: "/model-zoo/grid-c1.webp", specs: DEFAULT_SPECS },
  {
    title: "Keyword Spotting",
    modality: "vision",
    type: "open-source",
    img: "/model-zoo/grid-c2.webp",
    specs: [
      { label: "MEMORY", value: "176 KB" },
      { label: "LATENCY / GPX10", value: "28 ms" },
      { label: "ACTIVE POWER", value: "210 µW" },
      { label: "ENERGY / INF.", value: "5.8 µJ" },
    ],
  },
  { title: "Person / No-Person", modality: "audio", type: "open-source", img: "/model-zoo/grid-c3.webp", specs: DEFAULT_SPECS },
  { title: "Voice Activity Detection", modality: "audio", type: "open-source", img: "/model-zoo/grid-c4.webp", specs: DEFAULT_SPECS },
  { title: "Presence Detection", modality: "audio", type: "open-source", img: "/model-zoo/grid-c5.webp", specs: DEFAULT_SPECS },
  { title: "Voice Signature Detection", modality: "audio", type: "open-source", img: "/model-zoo/grid-c6.webp", specs: DEFAULT_SPECS },
];

const MODALITIES = ["all", "audio", "vision", "motion"];
const TYPES = ["all", "open-source", "ambient-built"];

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
        className={`${dmMono.className} absolute top-[calc(50%-4.5px)] left-1/2 -translate-x-1/2 text-[13px] leading-[19.5px] font-normal tracking-[-0.39px] whitespace-nowrap text-[#ecfae5] uppercase not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]`}
      >
        {label}
      </p>
      <div className="absolute top-1/2 left-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
      <div className="absolute top-1/2 right-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
    </div>
  );
}

/** Figma 5131:9751 — spec cell (label + value in a bordered box). */
function SpecCell({ spec }: { spec: Spec }) {
  return (
    <div className="relative flex h-[70px] flex-1 flex-col overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.2)] p-[12px]" data-name="Article">
      <div className="flex w-full flex-col items-start gap-[10px]">
        <p className={`${interRegular.className} w-full text-[14px] leading-[17px] uppercase text-[#8e8e8e] not-italic`}>{spec.label}</p>
        <p className={`${interRegular.className} w-full text-[16px] leading-[19px] whitespace-nowrap text-white not-italic`}>{spec.value}</p>
      </div>
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </div>
  );
}

/** Figma 5131:9722 — model card (401.33×677). */
function ModelCard({ model }: { model: Model }) {
  const { fadeRef, isVisible } = useFadeIn<HTMLElement>();
  return (
    <article
      ref={fadeRef}
      className={`relative flex h-auto w-full flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(255,255,255,0.04)] px-[12px] pt-[12px] pb-[24px] transition-colors duration-300 hover:border-[#a8ed90] hover:bg-[rgba(68,120,7,0.2)] min-[1024px]:h-[677.161px] ${getFadeInClass(isVisible)}`}
      data-name="Article"
    >
      <div className="h-[259.161px] w-full shrink-0 overflow-clip">
        <img alt={model.title} src={model.img} className="pointer-events-none size-full object-cover" loading="lazy" decoding="async" />
      </div>

      <div className="flex w-full flex-col items-start gap-[12px]">
        <h3 className={`${gilroyMedium.className} h-[28px] w-[353.684px] max-w-full overflow-clip text-[22px] leading-[28px] text-white not-italic [word-break:break-word]`}>
          {model.title}
        </h3>
        <div className="flex w-full items-start gap-[20px]">
          <Tag label={model.modality} width={120} />
          <Tag label={model.type} width={150} />
        </div>
        <p className={`${interRegular.className} w-[346.611px] max-w-full text-[16px] leading-[24px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}>
          {CARD_DESC} <span className="text-[#53d824]">read more</span>
        </p>
      </div>

      {/* Specs — 2×2 */}
      <div className="flex w-full flex-col gap-[8px]">
        <div className="flex w-full gap-[8px]">
          <SpecCell spec={model.specs[0]} />
          <SpecCell spec={model.specs[1]} />
        </div>
        <div className="flex w-full gap-[8px]">
          <SpecCell spec={model.specs[2]} />
          <SpecCell spec={model.specs[3]} />
        </div>
      </div>

      {/* CTAs — 5131:9788 */}
      <div className="flex w-full flex-wrap items-center gap-[12px]">
        {/* watch — green, flex-1, play icon at left 88 */}
        <a
          href="#"
          className={`${PRIMARY_CTA_SHADOW} relative flex h-[48px] min-w-px flex-1 items-center justify-center`}
          data-name="Cta"
          aria-label={`Watch ${model.title} demo`}
        >
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
          <span className="relative flex items-center gap-[10px]">
            <span className={`${gilroyMedium.className} text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic`}>
              watch
            </span>
            <img alt="" src="/model-zoo/icon-play.svg" className="block h-[13.75px] w-[12.92px] shrink-0" />
          </span>
          <span aria-hidden className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`} />
          <GreenCtaCorners />
        </a>
        {/* download the doc — 5131:11246 (232×48) */}
        <a
          href="#"
          className="relative flex h-[48px] w-full max-w-[232px] shrink items-center justify-center gap-[10px] overflow-clip bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px] min-[1024px]:w-[232px] min-[1024px]:shrink-0"
          data-name="CTA - Primary"
        >
          <span className={`${gilroyMedium.className} text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic`}>
            download the doc
          </span>
          <img alt="" src="/model-zoo/icon-download.svg" className="size-[18px] shrink-0" />
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
        </a>
      </div>

      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </article>
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
  return (
    <div className="group relative h-[48px] w-[200px] shrink-0">
      <button
        type="button"
        className={`${interRegular.className} relative flex h-full w-full items-center gap-[10px] border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] px-[20px] text-left text-[14px] leading-[1.4] text-white not-italic hover:border-[rgba(240,240,240,0.4)]`}
      >
        {label}
        <img alt="" src="/model-zoo/filter-chevron.svg" className="absolute right-[20px] size-[24px]" aria-hidden />
      </button>
      <ul className="invisible absolute top-[52px] left-0 z-30 w-[200px] border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-black group-focus-within:visible group-hover:invisible">
        {options.map((opt) => (
          <li key={opt}>
            <button
              type="button"
              onClick={() => onChange(opt)}
              className={`${interRegular.className} block w-full px-[20px] py-[10px] text-left text-[14px] text-white not-italic hover:bg-[rgba(255,255,255,0.08)]`}
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
export function ModelZooLibrary() {
  const [modality, setModality] = useState("all");
  const [type, setType] = useState("all");
  const [query, setQuery] = useState("");

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
          <div className="relative px-[10px]" data-node-id="5130:8359" data-name="Title">
            <h2
              className={`${gilroyMedium.className} bg-clip-text text-center text-[46px] leading-[49px] font-medium whitespace-nowrap text-transparent not-italic`}
              style={{ backgroundImage: TITLE_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text" }}
              data-node-id="5130:8360"
            >
              A model for every sense.
            </h2>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </div>
          <p className={`${interRegular.className} w-full max-w-[800px] text-center text-[14px] leading-[21px] min-[1024px]:text-[18px] min-[1024px]:leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}>
            Explore open-source and Ambient-built models across Audio, Vision, and Motion.
          </p>
        </div>

        {/* Filter bar — 5286:7530 */}
        <div className="mt-[24px] flex w-full flex-wrap items-center justify-between gap-x-[20px] gap-y-[12px] min-[1024px]:mt-[48px] min-[1024px]:flex-nowrap" data-node-id="5286:7530">
          <div className="flex items-center gap-[20px]" data-node-id="5286:7503">
            <FilterSelect label="Filter By Modality" options={MODALITIES} onChange={setModality} />
            <FilterSelect label="Filter By Type" options={TYPES} onChange={setType} />
          </div>
          <div className="flex items-center gap-[20px]" data-node-id="5286:7521">
            <div className="flex w-full max-w-[400px] items-center min-[1024px]:w-[400px]" data-node-id="5286:7522">
              <div className="relative h-[48px] min-w-px flex-1 border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.3)] px-[20px]">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by model or use case…"
                  aria-label="Search by model or use case"
                  className={`${interRegular.className} h-full w-full border-0 bg-transparent text-[14px] leading-[21px] text-white not-italic outline-none placeholder:text-white`}
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
            <button
              type="button"
              onClick={() => {
                setModality("all");
                setType("all");
                setQuery("");
              }}
              className={`${interRegular.className} text-[14px] leading-[21px] font-normal whitespace-nowrap text-[#53d824] not-italic hover:underline`}
              data-node-id="5286:7528"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Card grid — 5131:11386 (2 rows × 3, gap 20) */}
        <div className="mt-[24px] min-[1024px]:mt-[40px]" data-node-id="5131:11386">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-[16px] min-[1024px]:grid-cols-3 min-[1024px]:gap-[20px]">
              {filtered.map((model) => (
                <ModelCard key={model.title} model={model} />
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
          <div className="mt-[20px]" data-node-id="5348:6505">
            <div className="relative h-[100px]">
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
          <CtaPrimary label="Request Model Zoo" width={225} />
        </div>
      </div>
    </section>
  );
}
