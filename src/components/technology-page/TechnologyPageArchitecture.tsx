import { gilroyMedium, interRegular } from "../hero/fonts";
import { TagBadge } from "../hero/TagBadge";
import { GradientTitle, CornerDecor } from "../contact/contact-shared";

const OBJECT_IMG = "/technology/hero-object.png";
const BG_IMG = "/technology/architecture-bg.png";

const TITLE_GRADIENT_DEG = "113.506deg";
const SUBTITLE_OPACITY = 0.65;

const VIGNETTE =
  "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)";

const SUBTITLE_TEXT =
  "Three breakthroughs working as one system - a brain that runs on physics, a nervous system that knows when (and how hard) to think, and a language you already speak. Server-class AI in a coin-cell power budget.";

export function TechnologyPageArchitecture() {
  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="3060:1241"
      data-name="Frame 1984079541"
      aria-label="One architecture that thinks, senses, & speaks"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden h-[861px] w-full max-w-[1440px] min-[1024px]:block">
        {/* 3041:484 — background image (page-level, bottom of stack) */}
        <div
          className="pointer-events-none absolute left-[24px] top-[261px] z-0 h-[642px] w-[1440px] overflow-hidden"
          data-node-id="3041:484"
          data-name="image 29"
        >
          <div aria-hidden className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={BG_IMG}
              alt=""
              className="absolute inset-0 size-full max-w-none object-bottom"
            />
            <div
              className="absolute inset-0"
              style={{ backgroundImage: VIGNETTE }}
            />
          </div>
        </div>

        {/* 2992:1201 — header (tag + title + subtitle) */}
        <div
          className="absolute left-[320px] top-[60px] z-10 flex w-[800px] flex-col items-center justify-start gap-[24px]"
          data-node-id="2992:1201"
          data-name="Frame 1984079465"
        >
          <TagBadge
            label="A-Cube"
            width={110}
            labelOffsetX={0}
            rightBarLeft={102.66}
            centerLabel
            nodeId="2992:1203"
          />

          <div
            className="relative flex flex-col items-center px-[10px]"
            data-node-id="2992:1212"
            data-name="Title"
          >
            <GradientTitle gradientDeg={TITLE_GRADIENT_DEG} className="text-center">
              <span className="block h-[49px] leading-[49px] whitespace-nowrap">
                One architecture that thinks
              </span>
              <span className="block h-[49px] leading-[49px] whitespace-nowrap">
                {"senses, & speaks you language"}
              </span>
            </GradientTitle>
            <CornerDecor />
          </div>

          <p
            className={`${interRegular.className} w-[679.39px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
            style={{ opacity: SUBTITLE_OPACITY }}
            data-node-id="2992:1218"
          >
            {SUBTITLE_TEXT}
          </p>
        </div>

        {/* 2992:1219 — object (chip visual, reuses hero asset) */}
        <div
          className="pointer-events-none absolute left-[504.85px] top-[361px] z-[1] h-[468px] w-[431.97px]"
          data-node-id="2992:1219"
          data-name="Object"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={OBJECT_IMG}
            alt=""
            className="absolute inset-0 size-full max-w-none object-bottom"
            aria-hidden
          />
        </div>
      </div>

      {/* MOBILE (<1024px) — basic responsive version */}
      <div className="relative flex w-full flex-col items-center gap-[24px] px-[24px] py-[56px] min-[1024px]:hidden">
        <TagBadge
          label="A-Cube"
          width={110}
          labelOffsetX={0}
          rightBarLeft={102.66}
          centerLabel
          nodeId="2992:1203"
        />

        <div
          className={`${gilroyMedium.className} bg-clip-text text-center text-[32px] leading-[37px] font-medium text-transparent not-italic`}
          style={{
            backgroundImage: `linear-gradient(${TITLE_GRADIENT_DEG}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          <span className="block">One architecture that thinks</span>
          <span className="block">{"senses, & speaks you language"}</span>
        </div>

        <p
          className={`${interRegular.className} max-w-[327px] text-center text-[15px] leading-[22px] font-normal text-[#f0f0f0] not-italic`}
          style={{ opacity: SUBTITLE_OPACITY }}
        >
          {SUBTITLE_TEXT}
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={OBJECT_IMG}
          alt=""
          className="mt-[8px] h-auto w-full max-w-[327px] object-contain"
          aria-hidden
        />
      </div>
    </section>
  );
}
