/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { getFadeInClass, useFadeIn } from "../shared/useFadeIn";
import { Corners } from "../shared/Corners";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { CORNER_LEFT, CORNER_RIGHT, sectionTitleGradient } from "./model-zoo-data";

const TITLE_GRADIENT = sectionTitleGradient(111.766);

/** Figma 5241:5752…5751 — dimmed preview list buttons (84px, opacity 20). */
const FORGE_STEPS = ["Pair over BLE", "Flash a demo instantly", "See results live"];

/**
 * Figma 5131:10421 — "Your eval kit, controlled from your phone." section
 * (1440×1433 canvas; 1192.5-wide content at x=124). The two off-canvas
 * "footer" frames at x≈1477 in Figma are ignored (invisible).
 */
export function ModelZooAppForge() {
  const { fadeRef: articleRef, isVisible: articleVisible } = useFadeIn<HTMLDivElement>();
  const { fadeRef: forgeRef, isVisible: forgeVisible } = useFadeIn<HTMLDivElement>();
  const [magicOn, setMagicOn] = useState(false);
  return (
    <section
      className="relative w-full bg-black"
      data-node-id="5131:10421"
      aria-label="Your eval kit, controlled from your phone"
    >
      <div className="relative mx-auto w-full max-w-[1192.5px] px-[16px] min-[1024px]:px-0">
        {/* Header — 5131:10258 (title + sub, gap 24) */}
        <div className="flex w-full flex-col items-center gap-[24px] pt-[49px]" data-node-id="5131:10258">
          <div className="relative px-[10px]" data-node-id="5131:10260" data-name="Title">
            <h2
              className={`${gilroyMedium.className} w-full max-w-[605px] bg-clip-text text-center text-[36px] leading-[36px] min-[1024px]:text-[46px] min-[1024px]:leading-[49px] font-medium text-transparent not-italic`}
              style={{ backgroundImage: TITLE_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text" }}
              data-node-id="5131:10261"
            >
              Your eval kit, controlled from your phone.
            </h2>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </div>
          <p className={`${interRegular.className} w-full max-w-[679.389px] text-center text-[14px] leading-[21px] min-[1024px]:text-[18px] min-[1024px]:leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}>
            Download ApplicationForge, pair with your kit over Bluetooth, and flash live demos in seconds — no laptop, no code.
          </p>
        </div>

        {/* Application Forge showcase — 5241:5967 (gap 24, h 578).
            Entrance: the row fades in on scroll, inner elements stagger. */}
        <div
          ref={forgeRef}
          className={`mt-[24px] flex flex-col items-stretch gap-[24px] min-[1024px]:mt-[48px] min-[1024px]:h-[578px] min-[1024px]:flex-row min-[1024px]:items-center ${getFadeInClass(forgeVisible)}`}
          data-node-id="5241:5967"
        >
          {/* Left canvas card — 5241:5677 (empty bordered frame in the design) */}
          <div
            className={`relative hidden h-full w-[590.509px] shrink-0 overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] px-[16px] pt-[10px] pb-[20px] transition-colors duration-300 hover:border-[#a8ed90] min-[1024px]:block ${forgeVisible ? "motion-safe:animate-hero-text-fade-in" : "min-[1024px]:opacity-0"}`}
            style={{ animationDelay: "80ms", animationFillMode: "both" }}
            data-node-id="5241:5677"
            data-name="Article"
            aria-hidden
          >
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </div>

          {/* Right column — 5241:5702 */}
          <div className="relative flex min-w-px flex-1 flex-col items-center justify-center gap-[25px]" data-node-id="5241:5702">
            <p
              className={`${gilroyMedium.className} text-[22px] leading-[28px] text-white not-italic ${forgeVisible ? "motion-safe:animate-hero-text-fade-in" : "min-[1024px]:opacity-0"}`}
              style={{ animationDelay: "140ms", animationFillMode: "both" }}
              data-node-id="5241:5703"
            >
              Application Forge
            </p>

            {/* eval kit list — 5241:5728 */}
            <div className="flex w-full flex-col items-start gap-[10px] min-[1024px]:w-[578px]" data-node-id="5241:5728" data-name="eval kit">
              {FORGE_STEPS.map((step, i) => (
                <div
                  key={step}
                  className={`relative block h-[84px] w-full shrink-0 bg-[rgba(0,0,0,0.1)] opacity-20 transition-opacity duration-300 hover:opacity-50 ${forgeVisible ? "motion-safe:animate-hero-text-fade-in" : "min-[1024px]:opacity-0"}`}
                  style={{ animationDelay: `${200 + i * 90}ms`, animationFillMode: "both" }}
                  data-node-id={`5241:57${52 - i * 6}`}
                >
                  <p className={`${gilroyMedium.className} absolute top-[28px] left-[20px] text-[22px] leading-[28px] whitespace-nowrap text-left text-white not-italic`}>
                    {step}
                  </p>
                  <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
                </div>
              ))}
            </div>

            {/* Toggle — 5360:5004 (404×80). The arc glow deliberately overflows
                the frame (no clip) so it spills into the gap below, matching the
                reference canvas. Click flips the switch. */}
            <button
              type="button"
              role="switch"
              aria-checked={magicOn}
              onClick={() => setMagicOn((v) => !v)}
              className={`relative h-[80px] w-full max-w-[404px] shrink-0 cursor-pointer bg-[rgba(0,0,0,0.1)] text-left transition-colors duration-300 hover:bg-[rgba(50,80,40,0.25)] ${forgeVisible ? "motion-safe:animate-hero-text-fade-in" : "min-[1024px]:opacity-0"}`}
              style={{ animationDelay: "470ms", animationFillMode: "both" }}
              data-node-id="5360:5004"
              data-name="Toggle"
              aria-label="Experience the magic"
            >
              {/* decorative arc — 5360:5005 */}
              <div className="pointer-events-none absolute top-[-25.16px] left-[89.5px] h-[168.649px] w-[234.951px]" aria-hidden>
                <div className="absolute inset-[-119.54%_-85.81%]">
                  <img alt="" src="/model-zoo/af-arc.svg" className="block size-full max-w-none" />
                </div>
              </div>
              <div
                className="absolute top-[19px] left-[calc(50%+140.17px)] h-[40px] w-[73.333px] -translate-x-1/2 rounded-[100px] transition-colors duration-300"
                style={{ backgroundColor: magicOn ? "#8ce66c" : "#cecbc9" }}
                data-node-id="5360:5006"
                data-name="Switch"
              >
                <div
                  className="absolute top-[3.33px] size-[33.333px] rounded-[100px] bg-[#112f06] shadow-[0px_3.333px_6.667px_0px_rgba(39,39,39,0.1)] transition-transform duration-300"
                  style={{ left: 3.33, transform: magicOn ? "translateX(33.33px)" : "translateX(0)" }}
                />
              </div>
              <p className={`${gilroyMedium.className} absolute top-[calc(50%-14px)] left-[calc(50%-47px)] -translate-x-1/2 text-center text-[26px] leading-[29px] whitespace-nowrap text-white not-italic`} data-node-id="5360:5007">
                Experience the magic
              </p>
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            </button>
          </div>
        </div>

        {/* Wide article card — 5131:10513 (1192.5×391) */}
        <div
          ref={articleRef}
          className={`relative mt-[24px] flex h-auto flex-col items-stretch justify-center gap-[20px] border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] px-[20px] py-[32px] transition-colors duration-300 hover:border-[#a8ed90] min-[1024px]:mt-[41px] min-[1024px]:h-[391px] min-[1024px]:flex-row min-[1024px]:items-start ${getFadeInClass(articleVisible)}`}
          data-node-id="5131:10513"
          data-name="Article"
        >
          {/* Green haze above the card — full-bleed ambient glow. In the
              reference canvas this light runs edge-to-edge (x=0…1439) with a
              soft top ramp and gentle horizontal undulation, so it escapes the
              card box instead of stopping at the card edges. */}
          <div
            className="pointer-events-none absolute top-[-52px] left-1/2 h-[52px] w-screen max-w-none -translate-x-1/2"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 55% 100% at 43% 100%, rgba(116,175,84,0.25) 0%, rgba(116,175,84,0) 75%), linear-gradient(180deg, rgba(47,80,38,0) 0%, rgb(47,80,38) 14%, rgb(60,99,49) 100%)",
              maskImage: "linear-gradient(90deg, rgba(0,0,0,0.6) 0%, #000 9%, #000 91%, rgba(0,0,0,0.6) 100%)",
              WebkitMaskImage: "linear-gradient(90deg, rgba(0,0,0,0.6) 0%, #000 9%, #000 91%, rgba(0,0,0,0.6) 100%)",
            }}
            aria-hidden
          />

          {/* Surface — 5131:10580 */}
          <div
            className="absolute inset-0 border-[0.5px] border-solid border-[rgba(255,255,255,0.1)]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgba(15, 14, 14, 0.75) 0%, rgba(15, 14, 14, 0.75) 100%)",
            }}
            aria-hidden
          />

          {/* Phone showcase — 5131:10537 (baked @2x export incl. iPhone mockup) */}
          <div className="relative h-[327px] w-full min-w-px min-[1024px]:flex-1" data-node-id="5131:10537" data-name="Container">
            <img
              alt="ApplicationForge phone app preview on an eval kit"
              src="/model-zoo/af-container.webp"
              className="pointer-events-none size-full rounded-[6px] object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* NewsSection — 5131:10514 */}
          <div className="relative flex w-full min-w-px flex-1 flex-col items-start self-stretch gap-[40px]" data-node-id="5131:10514" data-name="NewsSection">
            <div className="relative h-[26px] w-[180px] shrink-0 overflow-clip bg-[rgba(255,255,255,0.06)]" data-node-id="5131:10515" data-name="Menu">
              <p className={`${dmMono.className} absolute top-[calc(50%-4.5px)] left-[calc(50%-0.26px)] -translate-x-1/2 text-[13px] leading-[19.5px] font-normal tracking-[-0.39px] whitespace-nowrap text-[#ecfae5] uppercase not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]`}>
                super easy process
              </p>
              <div className="absolute top-1/2 left-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
              <div className="absolute top-1/2 left-[173.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            </div>
            <p className={`${gilroyMedium.className} w-full text-[32px] leading-[38px] text-white not-italic [word-break:break-word]`} data-node-id="5131:10523">
              Download the app and get it working with Sparsh module
            </p>
            <div className="flex flex-wrap items-center gap-[19.667px]" data-node-id="5203:5767">
              <img alt="Download on the App Store" src="/model-zoo/af-badge-1.webp" className="h-[59px] w-[177px] shrink-0" loading="lazy" decoding="async" data-node-id="5203:5768" />
              <img alt="Get it on Google Play" src="/model-zoo/af-badge-2.webp" className="h-[59px] w-[177px] shrink-0" loading="lazy" decoding="async" data-node-id="5203:5769" />
            </div>
          </div>

          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
        </div>

        {/* Request CTA — 5131:10555 (293×48, centered). The reference's ambient
            glow is stronger than the standard CTA shadow, so it is boosted here. */}
        <div className="relative mt-[30px] flex justify-center pb-[63px]">
          {/* bright glow band just above the button (present in the reference) */}
          <div
            className="pointer-events-none absolute top-[-24px] left-1/2 hidden h-[96px] w-[700px] -translate-x-1/2 min-[1024px]:block"
            style={{
              background:
                "radial-gradient(ellipse 50% 50% at 50% 100%, rgba(83,216,36,0.5) 0%, rgba(83,216,36,0.25) 45%, rgba(83,216,36,0) 75%)",
            }}
            aria-hidden
          />
          <a
            href="#"
            className="shadow-[0px_42px_107px_0px_rgba(83,216,36,0.45),0px_24.721px_32.257px_0px_rgba(83,216,36,0.35),0px_10.268px_13.398px_0px_rgba(83,216,36,0.35),0px_3.714px_4.846px_0px_rgba(83,216,36,0.2)] relative flex h-[48px] w-[293px] shrink-0 items-center justify-center"
            data-node-id="5131:10556"
            data-name="Cta"
          >
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
            <span className={`${gilroyMedium.className} relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic`}>
              Request an Eval Kit
            </span>
            <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]" />
            <GreenCtaCorners />
          </a>
        </div>
      </div>
    </section>
  );
}
