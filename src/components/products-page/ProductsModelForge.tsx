import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
  MODELFORGE_CARD,
  MODELFORGE_CARD_BG,
  MODELFORGE_CARD_BORDER,
  MODELFORGE_IMAGE_BOX,
  MODELFORGE_STEPS,
  MODELFORGE_TITLE_GRADIENT,
  STEP_NUMBER_GRADIENT,
} from "./products-data";

/**
 * Figma 2917:1333 (title) + 2917:1341/1359/1377 (Train/Compile/Deploy cards).
 * "Your models. Your IDE. No rewrites."
 */
export function ProductsModelForge() {
  return (
    <>
      {/* DESKTOP (>=1024px) */}
      <section
        className="relative mx-auto hidden w-full bg-black min-[1024px]:block"
        aria-label="ModelForge workflow"
      >
        <ProductsModelForgeDesktop />
      </section>

      {/* MOBILE (<1024px) */}
      <ProductsModelForgeMobile />
    </>
  );
}

function ProductsModelForgeDesktop() {
  return (
    <div className="mx-auto flex w-full max-w-[1256px] flex-col items-center pb-[120px]">
      {/* Section title — 2917:1333 (centered, w=739) */}
      <div
        className="flex flex-col items-center gap-[24px]"
        style={{ width: 739 }}
        data-node-id="2917:1333"
        data-name="Section Title"
      >
        <div
          className="relative px-[10px]"
          style={{ width: 739, height: 49 }}
          data-node-id="2917:1334"
          data-name="Title"
        >
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} absolute m-0 w-[719px] bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              left: 10,
              top: 0,
              backgroundImage: MODELFORGE_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2917:1335"
          >
            Your models. Your IDE. No rewrites.
          </h2>
        </div>
        <p
          className={`${interRegular.className} w-[650px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
          data-node-id="2917:1340"
        >
          {`A new architecture shouldn't mean a new way of working. With ModelForge, it doesn't.`}
        </p>
      </div>

      {/* Cards row — 2917:1341 / 1359 / 1377 */}
      <div
        className="mt-[46px] flex items-start"
        style={{ gap: MODELFORGE_CARD.gap }}
      >
        {MODELFORGE_STEPS.map((step) => (
          <ModelForgeCard key={step.nodeId} step={step} />
        ))}
      </div>
    </div>
  );
}

function ModelForgeCard({ step }: { step: (typeof MODELFORGE_STEPS)[number] }) {
  return (
    <article
      className="relative flex flex-col border-[0.5px] border-solid px-[32px] pt-[16px] pb-[24px]"
      style={{
        width: MODELFORGE_CARD.width,
        height: MODELFORGE_CARD.height,
        backgroundColor: MODELFORGE_CARD_BG,
        borderColor: MODELFORGE_CARD_BORDER,
      }}
      data-node-id={step.nodeId}
      data-name="Article"
    >
      {/* NewsSection (content area) */}
      <div className="relative w-full flex-1" data-name="NewsSection">
        {/* Image box */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: MODELFORGE_IMAGE_BOX.left,
            top: MODELFORGE_IMAGE_BOX.top,
            width: MODELFORGE_IMAGE_BOX.width,
            height: MODELFORGE_IMAGE_BOX.height,
          }}
          data-name="image 168"
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src="/products/modelforge-image.png"
            className="absolute max-w-none"
            style={{
              width: "225.52%",
              height: "312.6%",
              left: `${step.imgLeft}%`,
              top: `${step.imgTop}%`,
            }}
          />
          {/* Fade overlay — transparent until 88%, then to black */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0) 88.146%, #000000 100%)",
            }}
          />
        </div>

        {/* Title + description */}
        <div
          className="absolute left-0 flex flex-col items-start gap-[12px] not-italic [word-break:break-word]"
          style={{ top: 317 }}
          data-name="Frame 1618875841"
        >
          <h3
            className={`${gilroyMedium.className} w-[333.991px] shrink-0 text-[32px] leading-[38px] font-medium text-white`}
          >
            {step.title}
          </h3>
          <p
            className={`${interRegular.className} w-[333.99px] shrink-0 text-[16px] leading-[26px] font-normal text-[#99a1af] tracking-[-0.3125px]`}
          >
            {step.description}
          </p>
        </div>
      </div>

      {/* Step number — card-relative, left-aligned with content */}
      <span
        className={`${gilroyMedium.className} pointer-events-none absolute bg-clip-text text-[70px] leading-[64px] font-medium text-transparent opacity-50 not-italic`}
        style={{
          left: 32,
          top: 257,
          backgroundImage: STEP_NUMBER_GRADIENT,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
        aria-hidden
      >
        {step.number}
      </span>

      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </article>
  );
}

function ProductsModelForgeMobile() {
  return (
    <section
      className="relative w-full bg-black px-[24px] pt-[64px] pb-[80px] min-[1024px]:hidden"
      aria-label="ModelForge workflow"
    >
      {/* Title */}
      <div className="flex flex-col items-center gap-[16px]">
        <h2
          className={`${gilroyMedium.className} max-w-full bg-clip-text text-center text-[30px] leading-[34px] font-medium text-transparent not-italic [word-break:break-word]`}
          style={{
            backgroundImage: MODELFORGE_TITLE_GRADIENT,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          Your models. Your IDE. No rewrites.
        </h2>
        <p
          className={`${interRegular.className} max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0]`}
        >
          {`A new architecture shouldn't mean a new way of working. With ModelForge, it doesn't.`}
        </p>
      </div>

      {/* Cards */}
      <div className="mt-[32px] flex flex-col gap-[20px]">
        {MODELFORGE_STEPS.map((step) => (
          <article
            key={step.nodeId}
            className="relative flex flex-col border-[0.5px] border-solid p-[20px]"
            style={{
              backgroundColor: MODELFORGE_CARD_BG,
              borderColor: MODELFORGE_CARD_BORDER,
            }}
          >
            {/* Image */}
            <div
              className="relative mb-[16px] h-[180px] w-full overflow-hidden"
              aria-hidden
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src="/products/modelforge-image.png"
                className="absolute max-w-none"
                style={{
                  width: "225.52%",
                  height: "312.6%",
                  left: `${step.imgLeft}%`,
                  top: `${step.imgTop}%`,
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 80%, #000000 100%)",
                }}
              />
            </div>

            <div className="flex items-center gap-[12px]">
              <span
                className={`${gilroyMedium.className} bg-clip-text text-[44px] leading-[44px] font-medium text-transparent opacity-50 not-italic`}
                style={{
                  backgroundImage: STEP_NUMBER_GRADIENT,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
                aria-hidden
              >
                {step.number}
              </span>
              <h3
                className={`${gilroyMedium.className} text-[24px] leading-[30px] font-medium text-white not-italic`}
              >
                {step.title}
              </h3>
            </div>
            <p
              className={`${interRegular.className} mt-[8px] text-[14px] leading-[21px] font-normal text-[#99a1af] not-italic`}
            >
              {step.description}
            </p>

            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </article>
        ))}
      </div>
    </section>
  );
}
