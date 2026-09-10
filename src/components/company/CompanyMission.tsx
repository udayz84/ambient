import Image from "next/image";
import { GradientTitle } from "../contact/contact-shared";
import { interRegular } from "../hero/fonts";
import {
  CompanyMissionFrameCorners,
  CornerDecor,
} from "./company-corners";
import { CompanyMissionStat } from "./CompanyMissionStat";

const MISSION_BG =
  "linear-gradient(rgba(83, 216, 36, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%), linear-gradient(90deg, rgba(21, 21, 21, 0.3) 0%, rgba(21, 21, 21, 0.3) 100%)";

const IMAGE_107_GRADIENT =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 810 1440' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-46.009 0.0000020111 -0.000003897 -89.152 363.86 720)'><stop stop-color='rgba(0,0,0,0.6)' offset='0'/><stop stop-color='rgba(0,0,0,1)' offset='1'/></radialGradient></defs></svg>\")";

const MISSION_GRID_PATTERN =
  "radial-gradient(circle, rgba(255, 255, 255, 0.035) 1px, transparent 1px)";

const FALLBACK_HEADING = "A mission dictated\nby physics";
const FALLBACK_BODY_1 =
  "The era of patching legacy compute is over. Forcing next-generation AI through decades-old digital bottlenecks only guarantees massive power drain and wrecked economics. Ambient Scientific is confronting this physical wall by re-architecting compute from the metal up, reinventing analog circuits, native instruction sets, and developer frameworks.";
const FALLBACK_BODY_2 =
  "The result is an architecture that unlocks breakthrough AI performance while requiring a fraction of the power consumption and silicon area. We exist to make intelligence truly ambient: an invisible, ubiquitous foundation built to endure for as long as the era of AI lasts, from the smallest edge sensor to the largest hyperscale cloud server.";

const STATS = [
  {
    value: "100+",
    label: "Employees",
    description:
      "A Passionate teams of engineers, scientist and innovators",
    valueNodeId: "2379:4771",
    labelNodeId: "2379:4773",
    descriptionNodeId: "2379:4775",
    digitSlots: 3,
    suffixAtTarget: true,
  },
  {
    value: "100+",
    label: "Patents",
    description:
      "Driving innovation with deep IP and proprietary break throughs",
    valueNodeId: "2379:4781",
    labelNodeId: "2379:4783",
    descriptionNodeId: "2379:4785",
    digitSlots: 3,
    suffixAtTarget: true,
  },
  {
    value: "50+",
    label: (
      <>
        Active Cutsomer<br />Projects
      </>
    ),
    description:
      "Partnering with industry leaders to build intelligent solutions at the edge.",
    descriptionWidth: "w-[356px]",
    valueNodeId: "2379:4791",
    labelNodeId: "2379:4792",
    descriptionNodeId: "2379:4794",
    digitSlots: 2,
    suffixAtTarget: true,
  },
] as readonly any[];

type CompanyMissionProps = {
  data?: any;
};

export function CompanyMission({ data }: CompanyMissionProps = {}) {
  const heading = (data?.heading as string) || FALLBACK_HEADING;
  const body1 = (data?.body_paragraph_1 as string) || FALLBACK_BODY_1;
  const body2 = (data?.body_paragraph_2 as string) || FALLBACK_BODY_2;
  const headingLines = heading.split("\n");

  const strapiStats = Array.isArray(data?.stats) ? data.stats : null;
  const stats: any[] = strapiStats && strapiStats.length > 0
    ? strapiStats.map((s: any, i: number) => {
        const fallback = STATS[i] ?? STATS[STATS.length - 1];
        return {
          value: (s?.value as string) || fallback.value,
          label: (s?.label as string) || fallback.label,
          description: (s?.description as string) || fallback.description,
          descriptionWidth: fallback.descriptionWidth,
          valueNodeId: fallback.valueNodeId,
          labelNodeId: fallback.labelNodeId,
          descriptionNodeId: fallback.descriptionNodeId,
          digitSlots: fallback.digitSlots,
          suffixAtTarget: fallback.suffixAtTarget,
        };
      })
    : (STATS as any[]);

  return (
    <section
      className="relative flex w-full justify-center shrink-0 bg-black"
      data-node-id="2379:4750"
      data-name="Frame 1984079419"
      aria-label="A mission dictated by physics"
    >
      <div className="relative mx-auto flex w-full max-w-[1440px] justify-center">
      <div
        className="relative mx-auto h-[608px] w-[1204px] overflow-hidden border-[0.5px] border-solid border-[rgba(255,255,255,0.15)]"
        data-node-id="2379:4752"
        data-name="Content"
        style={{ backgroundImage: MISSION_BG }}
      >
        {/* image 107 background glow - moved inside to clip to the container and make the footprint smaller */}
        <div 
          className="pointer-events-none absolute top-1/2 left-1/2 z-[1] h-[810px] w-[1440px] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden mix-blend-screen"
          data-name="image 107"
        >
          <div className="rotate-90 flex-none">
            <div className="relative h-[1440px] w-[810px]">
              <Image
                src="/resources/image-107.webp"
                alt=""
                fill
                className="max-w-none object-cover opacity-15"
                sizes="810px"
                unoptimized
              />
              <div
                className="absolute inset-0"
                style={{ backgroundImage: IMAGE_107_GRADIENT }}
                aria-hidden
              />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: MISSION_GRID_PATTERN,
              backgroundSize: "20px 20px",
            }}
          />
          <Image
            src="/company/mission-frame-border.svg"
            alt=""
            fill
            className="object-fill"
            sizes="1204px"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 z-[3]" aria-hidden>
          <CompanyMissionFrameCorners />
        </div>

        <div className="relative z-[2] flex h-full flex-col gap-[36px] px-[56px] py-[76px]">
          <div
            className="relative w-fit px-[10px]"
            data-node-id="2379:4754"
            data-name="Title"
          >
            <GradientTitle
              nodeId="2379:4755"
              gradientDeg="104.363deg"
              className="max-w-[555px]"
            >
              {headingLines.map((line, i) => (
                <p
                  key={i}
                  className={`${i === headingLines.length - 1 ? "leading-[49px]" : "mb-0 leading-[49px]"} [word-break:break-word] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] overflow-hidden`}
                >
                  {line}
                </p>
              ))}
            </GradientTitle>
            <CornerDecor />
          </div>

          <div
            className={`${interRegular.className} w-[555px] flex flex-col gap-[24px] text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
            data-node-id="2379:4760"
          >
            <p className="leading-[27px] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4] overflow-hidden">{body1}</p>
            <p className="leading-[27px] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4] overflow-hidden">{body2}</p>
          </div>
        </div>

        <div
          className="absolute top-1/2 left-[756px] flex -translate-y-1/2 flex-col gap-[58px]"
          data-node-id="2379:4765"
        >
          {stats.map((stat) => (
            <CompanyMissionStat
              key={stat.labelNodeId}
              {...stat}
            />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
