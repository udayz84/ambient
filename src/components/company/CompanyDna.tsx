import { GradientTitle } from "../contact/contact-shared";
import { CornerDecor } from "./company-corners";
import { interRegular } from "../hero/fonts";
import { CompanyDnaBackground } from "./CompanyDnaBackground";
import { CompanyDnaValueCard } from "./CompanyDnaValueCard";
import { mediaUrl } from "@/lib/strapi";

const VALUE_CARDS = [
  {
    title: "Grounded in Science",
    description:
      "Our work is based on physics, not assumption. Every decision, from design to architecture, follows measurable truth and validation. Our technology extends beyond niche applications, enabling accessible and adaptable intelligence.",
    nodeId: "2379:2100",
  },
  {
    title: "Stay Curious. Stay Skeptical.",
    description:
      "We question assumptions, challenge conventions, and continuously refine our understanding. Progress comes from disciplined curiosity grounded in first principles.",
    nodeId: "2379:2108",
  },
  {
    title: "Chase the Impossible",
    description:
      "We focus on constraints others accept as permanent. Limits in power, performance, and scalability are not trade-offs to manage, but problems to fundamentally solve.",
    nodeId: "2379:2117",
  },
  {
    title: "Protect What Powers Us",
    description:
      "Energy is the defining constraint of AI. We design systems that deliver exponentially higher performance while consuming a fraction of the power, making intelligence sustainable at scale.",
    nodeId: "2379:2125",
  },
] as const;

const FALLBACK_HEADING = "Driven by physics.\nDefined by our DNA.";
const FALLBACK_SUBTITLE =
  "We build from first principles and validate everything in silicon.";

type CompanyDnaProps = {
  data?: any;
};

export function CompanyDna({ data }: CompanyDnaProps = {}) {
  const heading = (data?.heading as string) || FALLBACK_HEADING;
  const subtitle = (data?.subtitle as string) || FALLBACK_SUBTITLE;
  const headingLines = heading.split("\n");

  const strapiCards = Array.isArray(data?.value_cards) ? data.value_cards : null;
  const cards: { title: string; description: string; nodeId: string }[] =
    strapiCards && strapiCards.length > 0
      ? strapiCards.map((c: any, i: number) => {
          const fallback = VALUE_CARDS[i] ?? VALUE_CARDS[VALUE_CARDS.length - 1];
          return {
            title: (c?.title as string) || fallback.title,
            description: (c?.description as string) || fallback.description,
            nodeId: fallback.nodeId,
          };
        })
      : (VALUE_CARDS as readonly {
          title: string;
          description: string;
          nodeId: string;
        }[]);

  return (
    <section
      className="absolute top-[2511px] left-0 z-[6] h-[1729px] w-[1440px] overflow-hidden bg-black"
      data-node-id="2379:2090"
      data-name="Frame 1984079462"
      aria-label="Driven by physics. Defined by our DNA."
    >
      <CompanyDnaBackground bgImage={mediaUrl(data?.background_image)} />

      <div
        className="pointer-events-none absolute top-0 left-0 z-[5] h-[468px] w-full bg-black"
        aria-hidden
      />

      <div
        className="absolute top-[319px] left-1/2 z-10 flex w-[531px] -translate-x-1/2 flex-col items-center gap-[24px]"
        data-node-id="2379:2092"
        data-name="Section Title"
      >
        <div
          className="relative flex w-fit flex-col items-center px-[10px]"
          data-node-id="2379:2093"
          data-name="Title"
        >
          <GradientTitle
            nodeId="2379:2094"
            gradientDeg="105.739deg"
            className="w-fit text-center whitespace-nowrap"
          >
            {headingLines.map((line, i) => (
              <p
                key={i}
                className={
                  i === headingLines.length - 1
                    ? "leading-[49px]"
                    : "mb-0 leading-[49px]"
                }
              >
                {line}
              </p>
            ))}
          </GradientTitle>
          <CornerDecor />
        </div>
        <p
          className={`${interRegular.className} w-full shrink-0 text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
          data-node-id="2379:2099"
        >
          {subtitle}
        </p>
      </div>

      <div
        className="absolute top-[548px] left-[115px] z-10 flex w-[1210px] items-start gap-[430px]"
        data-node-id="2379:2091"
        data-name="Group 1410085774"
      >
        <div className="flex w-[390px] flex-col gap-[44px]">
          <CompanyDnaValueCard {...cards[0]} />
          <CompanyDnaValueCard {...cards[2]} />
        </div>
        <div className="flex w-[390px] flex-col gap-[44px]">
          <CompanyDnaValueCard {...cards[1]} />
          <CompanyDnaValueCard {...cards[3]} />
        </div>
      </div>
    </section>
  );
}
