import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { GradientTitle, CornerDecor } from "../contact/contact-shared";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

const CARD_OUTLINE = "/technology/cta-card-outline.svg";

const SECTION_TITLE_DEG = "119.349deg";
const CARD_TITLE_DEG = "107.367deg";
const FALLBACK_SECTION_TITLE = "Put A-Cube to Work";
const FALLBACK_SECTION_SUBTITLE =
  "A complete edge-AI SoC — AI engine, control, sensing, memory, and security — integrated so your board doesn't have to be.";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

type CardData = {
  nodeId: string;
  titleLines: [string, string];
  body: string;
  cta: string;
  ctaHref: string;
};

const FALLBACK_CARDS: CardData[] = [
  {
    nodeId: "2995:1298",
    titleLines: ["Get an", "Evaluation Kit."],
    body: "Explore how Ambient AI can unlock new capabilities in your wearable product. Strategic planning session with our applications team.",
    cta: "Request Eval Kit",
    ctaHref: "/contact",
  },
  {
    nodeId: "2995:1275",
    titleLines: ["Scale to increase", "the volume."],
    body: "Be the first to access our upcoming Vision, Sound, and Industrial modules.",
    cta: "Talk to Sales",
    ctaHref: "/contact",
  },
];

function CtaCard({
  card,
  outlineSrc,
}: {
  card: CardData;
  outlineSrc: string;
}) {
  return (
    <div
      className="relative h-[320px] w-[558px] shrink-0"
      data-node-id={card.nodeId}
    >
      {/* card outline */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={outlineSrc}
        alt=""
        aria-hidden
        className="absolute top-[0.12px] left-[0.5px] block h-[319.572px] w-[557.336px] max-w-none"
      />

      {/* content */}
      <div className="absolute top-[calc(50%-6px)] left-[52px] w-[450px] -translate-y-1/2">
        <div className="flex flex-col items-start gap-[36px]">
          {/* title */}
          <div className="relative h-[108px] w-full">
            <GradientTitle
              gradientDeg={CARD_TITLE_DEG}
              className="w-full text-center"
            >
              <span className="block h-[49px] leading-[49px] whitespace-nowrap">
                {card.titleLines[0]}
              </span>
              <span className="block h-[49px] leading-[49px] whitespace-nowrap">
                {card.titleLines[1]}
              </span>
            </GradientTitle>
            <CornerDecor />
          </div>

          {/* body + CTA */}
          <div className="flex w-full flex-col items-start gap-[20px]">
            <p
              className={`${interRegular.className} h-[48px] w-full text-center text-[14px] leading-[24px] font-normal tracking-[-0.3125px] text-white not-italic [word-break:break-word]`}
            >
              {card.body}
            </p>
            <a
              href={card.ctaHref}
              className={`${gilroyMedium.className} ${GREEN_CTA_SHADOW} relative block h-[48px] w-full shrink-0`}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
              />
              <span className="absolute top-[calc(50%-14px)] left-1/2 -translate-x-1/2 text-[16px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic">
                {card.cta}
              </span>
              <GreenCtaCorners />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TechnologyPageBottomCta({ data }: { data?: any } = {}) {
  const sectionTitle = data?.heading || FALLBACK_SECTION_TITLE;
  const sectionSubtitle = data?.subtitle || FALLBACK_SECTION_SUBTITLE;
  const outlineSrc = mediaUrl(data?.card_outline) || CARD_OUTLINE;

  const strapiCards = Array.isArray(data?.cards) ? data.cards : null;
  const cards: CardData[] =
    strapiCards && strapiCards.length > 0
      ? strapiCards.map((c: any, i: number) => {
          const fb = FALLBACK_CARDS[i] ?? FALLBACK_CARDS[FALLBACK_CARDS.length - 1];
          const titleLinesRaw =
            (c?.title_lines as string) || fb.titleLines.join("\n");
          const titleSplit = titleLinesRaw.split("\n");
          return {
            nodeId: fb.nodeId,
            titleLines: [titleSplit[0] ?? "", titleSplit[1] ?? ""] as [
              string,
              string,
            ],
            body: (c?.description as string) || fb.body,
            cta: (c?.cta_label as string) || fb.cta,
            ctaHref: (c?.cta_href as string) || fb.ctaHref,
          };
        })
      : FALLBACK_CARDS;

  return (
    <section
      className="relative z-20 mb-0 min-[1024px]:mb-[-409px] w-full bg-transparent"
      aria-label="Put A-Cube to work"
    >
      {/* DESKTOP (>=1024px) */}
      <div className="hidden flex-col items-center min-[1024px]:flex">
        {/* section title */}
        <div
          className="flex w-[492.93px] flex-col items-center gap-[24px]"
          data-node-id="2995:1328"
          data-name="Section Title"
        >
          <div className="relative flex flex-col items-center px-[10px]">
            <GradientTitle gradientDeg={SECTION_TITLE_DEG} className="text-center">
              {sectionTitle}
            </GradientTitle>
            <GreenCtaCorners />
          </div>
          <p
            className={`${interRegular.className} w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
          >
            {sectionSubtitle}
          </p>
        </div>

        {/* cards */}
        <div className="mt-[86px] flex items-start justify-center gap-[84px]">
          {cards.map((card) => (
            <CtaCard key={card.nodeId} card={card} outlineSrc={outlineSrc} />
          ))}
        </div>
      </div>

      {/* MOBILE (<1024px) */}
      <div className="flex flex-col items-center gap-[32px] px-[24px] py-[56px] min-[1024px]:hidden">
        <div
          className={`${gilroyMedium.className} bg-clip-text text-center text-[30px] leading-[35px] font-medium text-transparent not-italic`}
          style={{
            backgroundImage: `linear-gradient(${SECTION_TITLE_DEG}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {sectionTitle}
        </div>
        <p
          className={`${interRegular.className} max-w-[327px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic`}
        >
          {sectionSubtitle}
        </p>

        {cards.map((card) => (
          <div
            key={`m-${card.nodeId}`}
            className="flex w-full max-w-[327px] flex-col gap-[20px] rounded-[8px] border-[0.5px] border-solid border-[rgba(255,255,255,0.15)] p-[20px]"
          >
            <div
              className={`${gilroyMedium.className} bg-clip-text text-center text-[24px] leading-[28px] font-medium text-transparent not-italic`}
              style={{
                backgroundImage: `linear-gradient(${CARD_TITLE_DEG}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              <span className="block">{card.titleLines[0]}</span>
              <span className="block">{card.titleLines[1]}</span>
            </div>
            <p
              className={`${interRegular.className} text-center text-[13px] leading-[19px] font-normal text-white not-italic`}
            >
              {card.body}
            </p>
            <a
              href={card.ctaHref}
              className={`${gilroyMedium.className} relative block h-[48px] w-full ${GREEN_CTA_SHADOW}`}
            >
              <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
              <span className="absolute top-[calc(50%-14px)] left-1/2 -translate-x-1/2 text-[14px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic">
                {card.cta}
              </span>
              <GreenCtaCorners />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
