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

const MISSION_GRID_PATTERN =
  "radial-gradient(circle, rgba(255, 255, 255, 0.035) 1px, transparent 1px)";

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
    label: "Active Cutsomer Projects",
    description:
      "Partnering with industry leaders to build intelligent solutions at the edge.",
    descriptionWidth: "w-[356px]",
    valueNodeId: "2379:4791",
    labelNodeId: "2379:4792",
    descriptionNodeId: "2379:4794",
    digitSlots: 2,
    suffixAtTarget: true,
  },
] as const;

export function CompanyMission() {
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
        <div className="pointer-events-none absolute inset-0" aria-hidden>
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
        <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden>
          <CompanyMissionFrameCorners />
        </div>

        <div className="relative z-[1] flex h-full flex-col gap-[36px] px-[56px] py-[76px]">
          <div
            className="relative w-fit px-[10px]"
            data-node-id="2379:4754"
            data-name="Title"
          >
            <GradientTitle
              nodeId="2379:4755"
              gradientDeg="104.363deg"
              className="whitespace-nowrap"
            >
              <p className="mb-0 leading-[49px]">A mission dictated</p>
              <p className="leading-[49px]">by physics</p>
            </GradientTitle>
            <CornerDecor />
          </div>

          <div
            className={`${interRegular.className} w-[555px] text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
            data-node-id="2379:4760"
          >
            <p className="mb-0 leading-[27px]">
              The era of patching legacy compute is over. Forcing
              next-generation AI through decades-old digital bottlenecks only
              guarantees massive power drain and wrecked economics. Ambient
              Scientific is confronting this physical wall by re-architecting
              compute from the metal up, reinventing analog circuits, native
              instruction sets, and developer frameworks.
            </p>
            <p className="leading-[27px]">
              The result is an architecture that unlocks breakthrough AI
              performance while requiring a fraction of the power consumption
              and silicon area. We exist to make intelligence truly ambient: an
              invisible, ubiquitous foundation built to endure for as long as the
              era of AI lasts, from the smallest edge sensor to the largest
              hyperscale cloud server.
            </p>
          </div>
        </div>

        <div
          className="absolute top-1/2 left-[756px] flex -translate-y-1/2 flex-col gap-[58px]"
          data-node-id="2379:4765"
        >
          {STATS.map((stat) => (
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
