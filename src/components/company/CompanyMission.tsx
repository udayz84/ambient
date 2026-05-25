import Image from "next/image";
import { CornerDecor, GradientTitle } from "../contact/contact-shared";
import { interRegular } from "../hero/fonts";
import { CompanyMissionStat } from "./CompanyMissionStat";

const cornerLeft = "/hero/corner-tag-1.svg";
const cornerRight = "/hero/corner-tag-2.svg";

/** Soft atmospheric green — upper-right (stats) + upper-left (title), per Figma */
const MISSION_GREEN_GLOW =
  "radial-gradient(ellipse 90% 72% at 86% 8%, rgba(83, 216, 36, 0.13) 0%, rgba(46, 76, 38, 0.08) 30%, rgba(0, 0, 0, 0) 62%), radial-gradient(ellipse 75% 58% at 14% 12%, rgba(83, 216, 36, 0.09) 0%, rgba(46, 76, 38, 0.05) 34%, rgba(0, 0, 0, 0) 65%), radial-gradient(ellipse 120% 90% at 50% 40%, rgba(30, 58, 28, 0.05) 0%, rgba(0, 0, 0, 0) 58%), linear-gradient(180deg, rgba(46, 76, 38, 0.03) 0%, rgba(0, 0, 0, 0) 42%, rgba(0, 0, 0, 0.4) 100%)";

const MISSION_GRID_PATTERN =
  "radial-gradient(circle, rgba(255, 255, 255, 0.035) 1px, transparent 1px)";

const STATS = [
  {
    value: "100+",
    label: "Employees",
    description:
      "A Passionate teams of engineers, scientist and innovators",
    valueNodeId: "2379:4753",
    labelNodeId: "2379:4754",
    descriptionNodeId: "2379:4755",
  },
  {
    value: "100+",
    label: "Patents",
    description:
      "Driving innovation with deep IP and proprietary break throughs",
    valueNodeId: "2379:4756",
    labelNodeId: "2379:4757",
    descriptionNodeId: "2379:4758",
  },
  {
    value: "50+",
    label: "Active Cutsomer Projects",
    description:
      "Partnering with industry leaders to build intelligent solutions at the edge.",
    valueNodeId: "2379:4759",
    labelNodeId: "2379:4760",
    descriptionNodeId: "2379:4761",
  },
] as const;

function MissionFrameCorners() {
  return (
    <>
      <div className="pointer-events-none absolute top-[0.49px] right-[0.52px] flex size-[4px] items-center justify-center">
        <div className="rotate-180 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image
                src={cornerRight}
                alt=""
                width={4}
                height={4}
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute right-[0.52px] bottom-[0.53px] flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 rotate-180 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image
                src={cornerRight}
                alt=""
                width={4}
                height={4}
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute top-[0.51px] left-[0.51px] flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image
                src={cornerLeft}
                alt=""
                width={4}
                height={4}
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-[0.5px] left-[0.51px] size-[4px]">
        <div className="absolute inset-[0_0_-12.5%_-12.5%]">
          <Image
            src={cornerLeft}
            alt=""
            width={4}
            height={4}
            className="block size-full max-w-none"
            aria-hidden
          />
        </div>
      </div>
    </>
  );
}

export function CompanyMission() {
  return (
    <section
      className="relative mx-auto w-full max-w-[1440px] min-w-[1440px] shrink-0 bg-black"
      data-node-id="2379:4750"
      data-name="Frame 1984079419"
      aria-label="A mission dictated by physics"
    >
      <div
        className="relative mx-auto h-[608px] w-[1204px] overflow-hidden border-[0.5px] border-solid border-[rgba(255,255,255,0.15)] bg-[#050505]"
        data-node-id="2379:4752"
        data-name="Content"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div
            className="absolute inset-0"
            style={{ backgroundImage: MISSION_GREEN_GLOW }}
          />
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
        <MissionFrameCorners />

        <div className="relative flex h-full px-[40px] py-[40px]">
          <div className="flex w-[686px] shrink-0 flex-col">
            <div className="relative w-[480px] px-[10px]">
              <GradientTitle
                nodeId="2379:4762"
                gradientDeg="105.739deg"
                className="w-[460px]"
              >
                <p className="mb-0 leading-[49px]">A mission dictated</p>
                <p className="leading-[49px]">by physics</p>
              </GradientTitle>
              <CornerDecor />
            </div>

            <div className="mt-[24px] flex w-[600px] flex-col gap-[20px] pl-[10px]">
              <p
                className={`${interRegular.className} text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-75 not-italic [word-break:break-word]`}
                data-node-id="2379:4763"
              >
                The era of patching legacy compute is over. Forcing
                next-generation AI through decades-old digital bottlenecks only
                guarantees massive power drain and wrecked economics. Ambient
                Scientific is confronting this physical wall by re-architecting
                compute from the metal up, reinventing analog circuits, native
                instruction sets, and developer frameworks.
              </p>
              <p
                className={`${interRegular.className} text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-75 not-italic [word-break:break-word]`}
                data-node-id="2379:4764"
              >
                The result is an architecture that unlocks breakthrough AI
                performance while requiring a fraction of the power consumption
                and silicon area. We exist to make intelligence truly ambient:
                an invisible, ubiquitous foundation built to endure for as long
                as the era of AI lasts, from the smallest edge sensor to the
                largest hyperscale cloud server.
              </p>
            </div>
          </div>

          <div
            className="mx-[40px] my-[40px] w-px shrink-0 self-stretch bg-[rgba(255,255,255,0.15)]"
            aria-hidden
          />

          <div className="flex min-w-0 flex-1 flex-col justify-center">
            {STATS.map((stat, index) => (
              <div
                key={stat.labelNodeId}
                className={index > 0 ? "border-t border-solid border-[rgba(255,255,255,0.15)]" : ""}
              >
                <CompanyMissionStat {...stat} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
