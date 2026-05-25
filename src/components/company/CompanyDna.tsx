import { CornerDecor, GradientTitle } from "../contact/contact-shared";
import { interRegular } from "../hero/fonts";
import { CompanyDnaBackground } from "./CompanyDnaBackground";
import { CompanyDnaValueCard } from "./CompanyDnaValueCard";

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

export function CompanyDna() {
  return (
    <section
      className="absolute top-[2511px] left-0 z-[6] h-[1729px] w-[1440px] overflow-hidden bg-black"
      data-node-id="2379:2090"
      data-name="Frame 1984079462"
      aria-label="Driven by physics. Defined by our DNA."
    >
      <CompanyDnaBackground />

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
            <p className="mb-0 leading-[49px]">Driven by physics.</p>
            <p className="leading-[49px]">Defined by our DNA.</p>
          </GradientTitle>
          <CornerDecor />
        </div>
        <p
          className={`${interRegular.className} w-full shrink-0 text-center text-[18px] leading-[27px] font-normal whitespace-nowrap text-[#f0f0f0] not-italic`}
          data-node-id="2379:2099"
        >
          We build from first principles and validate everything in silicon.
        </p>
      </div>

      <div
        className="absolute top-[548px] left-[115px] z-10 h-[448px] w-[1210px]"
        data-node-id="2379:2091"
        data-name="Group 1410085774"
      >
        <div className="absolute top-0 left-0">
          <CompanyDnaValueCard {...VALUE_CARDS[0]} />
        </div>
        <div className="absolute top-0 left-[820px]">
          <CompanyDnaValueCard {...VALUE_CARDS[1]} />
        </div>
        <div className="absolute top-[246px] left-0">
          <CompanyDnaValueCard {...VALUE_CARDS[2]} />
        </div>
        <div className="absolute top-[246px] left-[820px]">
          <CompanyDnaValueCard {...VALUE_CARDS[3]} />
        </div>
      </div>
    </section>
  );
}
