import { interRegular } from "../hero/fonts";
import { ACTIVE_TAB, APPLICATION_TABS } from "./applications-data";
import {
  NavDivider4,
  NavDivider5,
  NavDivider6,
  NavDivider7,
  NavDivider8,
} from "./NavDivider";

const line9 = "/applications/lines/line-9.svg";
const line14 = "/applications/lines/line-14.svg";
const line34 = "/applications/lines/line-34.svg";
const line35 = "/applications/lines/line-35.svg";
const line36 = "/applications/lines/line-36.svg";
const line37 = "/applications/lines/line-37.svg";
const line38 = "/applications/lines/line-38.svg";
const line40 = "/applications/lines/line-40.svg";
const tabCornerTl = "/applications/corners/tab-corner-tl.svg";
const tabCornerTr = "/applications/corners/tab-corner-tr.svg";

function InactiveTab({ label, nodeId }: { label: string; nodeId: string }) {
  return (
    <div
      className="relative flex shrink-0 items-center justify-center px-[20px] py-[14px]"
      data-node-id={nodeId}
    >
      <p
        className={`${interRegular.className} relative shrink-0 text-[16px] leading-[24px] font-normal whitespace-nowrap text-[#666] not-italic [word-break:break-word]`}
      >
        {label}
      </p>
    </div>
  );
}

function ActiveTab() {
  return (
    <div
      className="relative h-[44px] w-[126px] shrink-0 overflow-clip bg-[#f0f0f0]"
      data-node-id="2379:885"
      data-name="Cta"
    >
      <p
        className={`${interRegular.className} absolute top-[calc(50%-11.78px)] left-[calc(50%-53.03px)] text-[16px] leading-[24px] font-normal whitespace-nowrap text-[#0e1a0e] not-italic [word-break:break-word]`}
        data-node-id="2379:886"
      >
        {ACTIVE_TAB}
      </p>
      <div className="absolute top-0 left-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]" data-node-id="2379:887">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={tabCornerTl} alt="" className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 flex size-[4px] items-center justify-center">
        <div className="rotate-180 flex-none">
          <div className="relative size-[4px]" data-node-id="2379:888">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={tabCornerTr} alt="" className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-0 bottom-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 rotate-180 flex-none">
          <div className="relative size-[4px]" data-node-id="2379:889">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={tabCornerTr} alt="" className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 size-[4px]" data-node-id="2379:890">
        <div className="absolute inset-[0_0_-12.5%_-12.5%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={tabCornerTl} alt="" className="block size-full max-w-none" aria-hidden />
        </div>
      </div>
    </div>
  );
}

function FiveDividers({ line }: { line: string }) {
  return (
    <>
      <NavDivider8 src={line} />
      <NavDivider8 src={line} />
      <NavDivider8 src={line} />
      <NavDivider8 src={line} />
      <NavDivider8 src={line} />
    </>
  );
}

export function ApplicationsCategoryNav() {
  const [wearables, smartHomes, industrial, , medical, agriculture] =
    APPLICATION_TABS;

  return (
    <div
      className="absolute top-[199.7783203125px] left-1/2 flex h-[52px] w-[1320px] -translate-x-1/2 items-center justify-between"
      data-node-id="2379:851"
      data-name="Options"
    >
      <button
        type="button"
        className="relative size-[44px] shrink-0"
        data-node-id="2379:852"
        data-name="Menu"
        aria-label="Scroll categories left"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src="/applications/nav-arrow-left.svg"
          className="absolute inset-0 block size-full max-w-none"
        />
      </button>

      <FiveDividers line={line9} />
      <InactiveTab label={wearables} nodeId="2379:864" />
      <FiveDividers line={line14} />
      <InactiveTab label={smartHomes} nodeId="2379:871" />
      <FiveDividers line={line14} />
      <InactiveTab label={industrial} nodeId="2379:878" />

      <NavDivider4 src={line34} />
      <NavDivider5 src={line35} />
      <NavDivider6 src={line36} />
      <NavDivider7 src={line37} />
      <NavDivider8 src={line38} />
      <ActiveTab />
      <NavDivider8 src={line38} />
      <NavDivider7 src={line40} />
      <NavDivider6 src={line36} />
      <NavDivider5 src={line35} />
      <NavDivider4 src={line34} />

      <InactiveTab label={medical} nodeId="2379:896" />
      <FiveDividers line={line14} />
      <InactiveTab label={agriculture} nodeId="2379:903" />
      <FiveDividers line={line14} />

      <button
        type="button"
        className="relative size-[44px] shrink-0"
        data-node-id="2379:910"
        data-name="Menu"
        aria-label="Scroll categories right"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src="/applications/nav-arrow-right.svg"
          className="absolute inset-0 block size-full max-w-none"
        />
      </button>
    </div>
  );
}
