import Image from "next/image";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { CornerDecor, FramedBox, GradientTitle, LocationIcon } from "./contact-shared";

const locations = [
  {
    title: "USA Headquarters",
    address:
      "Ambient Scientific Inc. 4633 Old Ironsides Drive Santa Clara California 95054. USA",
    indicator: "/contact/map-indicator-us.svg",
    indicatorClass: "absolute left-[100px] top-[107px] h-[102.632px] w-[28.284px]",
    indicatorInset: "inset-[-3.9%_-14.14%_0_-14.14%]",
    indicatorGroupNodeId: "2379:8346",
    indicatorNodeId: "2379:8347",
    cardClass:
      "absolute left-[calc(50%-321.5px)] top-[calc(50%+77.5px)] -translate-x-1/2 -translate-y-1/2",
    nodeId: "2379:8362",
  },
  {
    title: "Singapore Headquarters",
    address: "137 Telok Ayer Street, #05-02, Singapore 068602",
    indicator: "/contact/map-indicator-sg.svg",
    indicatorLayout: "rotated",
    indicatorClass:
      "absolute left-[757px] top-[164px] flex h-[164px] w-[28.284px] items-center justify-center",
    indicatorGroupNodeId: "2379:8352",
    indicatorNodeId: "2379:8353",
    cardClass:
      "absolute left-[calc(50%+486.5px)] top-[calc(50%-137.5px)] -translate-x-1/2 -translate-y-1/2",
    nodeId: "2379:8376",
  },
  {
    title: "India Headquarters",
    address: (
      <>
        <span className="block leading-[24px]">Ramky House, 1st Cross,</span>
        <span className="block leading-[24px]">
          Raghavendra Nagar, Kalyan Nagar, Bengaluru Karnataka, 560043, India
        </span>
      </>
    ),
    indicator: "/contact/map-indicator-in.svg",
    indicatorClass: "absolute left-[961px] top-[56px] h-[165.284px] w-[28.284px]",
    indicatorInset: "inset-[0_-14.14%_-2.42%_-14.14%]",
    indicatorGroupNodeId: "2379:8358",
    cardClass:
      "absolute left-[calc(50%+276.5px)] top-[calc(50%+131.5px)] -translate-x-1/2 -translate-y-1/2",
    nodeId: "2379:8390",
  },
] as const;

const CONTACT_VIEWPORT_SCALE =
  "translateX(-50%) scaleX(max(1, calc(100vw / 1440px)))";

export function ContactMap() {
  return (
    <section
      className="absolute top-[1215px] left-1/2 z-10 h-[1001px] w-[100vw] max-w-none -translate-x-1/2"
      data-node-id="2379:5086"
      aria-label="Global offices"
    >
      <div className="relative mx-auto h-full w-full max-w-[1440px]">
      <div
        className="absolute top-0 left-1/2 flex h-[1002px] w-[1440px] origin-center items-center justify-center -translate-x-1/2"
      >
        <div className="flex-none">
          <div className="relative h-[1002px] w-[1440px]" data-node-id="2379:5087">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <Image
                src="/contact/Globe image.png"
                alt=""
                fill
                className="object-cover object-center"
                sizes="1440px"
                priority
              />
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-[250px] bg-gradient-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[250px] bg-gradient-to-l from-black to-transparent" />
          </div>
        </div>
      </div>

      <div
        className="absolute top-[250px] left-1/2 flex -translate-x-1/2 flex-col items-center gap-[24px]"
        data-node-id="2379:8404"
      >
        <div className="relative flex flex-col items-center px-[10px]" data-node-id="2379:8406">
          <GradientTitle
            nodeId="2379:8407"
            gradientDeg="101.272deg"
            className="text-center whitespace-nowrap"
          >
            <p className="mb-0 leading-[49px]">Global scale.</p>
            <p className="leading-[49px]">Local support.</p>
          </GradientTitle>
          <CornerDecor />
        </div>
        <p
          className={`${interRegular.className} w-[720px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
          data-node-id="2379:8412"
        >
          From our research labs to your production line, we maintain direct
          engineering presence across three continents to ensure rapid deployment
          and ongoing support.
        </p>
      </div>

      <div
        className="pointer-events-none absolute top-[609px] left-[38px] h-[392px] w-[1204px] origin-center overflow-clip opacity-20"
        data-node-id="2379:5089"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="absolute inset-0 block size-full max-w-none object-cover object-center"
          src="/contact/map-base.svg"
        />
      </div>

      <div
        className="absolute top-[609px] left-[38px] h-[393px] w-[1204px]"
        data-node-id="2379:5088"
      >
        {locations.map((loc) => (
          <LocationBlock key={loc.nodeId} {...loc} />
        ))}
      </div>
      </div>
    </section>
  );
}

function LocationBlock({
  title,
  address,
  indicator,
  indicatorClass,
  indicatorLayout,
  indicatorInset,
  indicatorGroupNodeId,
  indicatorNodeId,
  cardClass,
  nodeId,
}: {
  title: string;
  address: React.ReactNode;
  indicator: string;
  indicatorClass: string;
  indicatorLayout?: "rotated";
  indicatorInset?: string;
  indicatorGroupNodeId?: string;
  indicatorNodeId?: string;
  cardClass: string;
  nodeId: string;
}) {
  return (
    <>
      <div
        className={`${indicatorClass} z-[1]`}
        data-node-id={indicatorGroupNodeId}
        data-name={
          indicatorLayout === "rotated"
            ? "Group 94"
            : indicatorGroupNodeId === "2379:8358"
              ? "Group 93"
              : undefined
        }
      >
        {indicatorLayout === "rotated" ? (
          <div className="flex-none rotate-90">
            <div
              className="relative h-[28.284px] w-[164px]"
              data-node-id={indicatorNodeId}
              data-name="Indicator"
            >
              <div className="absolute inset-[-14.14%_0_-14.14%_-2.44%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="block size-full max-w-none" src={indicator} />
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`absolute ${indicatorInset ?? "inset-[-3.9%_-14.14%_0_-14.14%]"}`}
            data-node-id={indicatorNodeId}
            data-name="Indicator"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="block size-full max-w-none" src={indicator} />
          </div>
        )}
      </div>
      <div className={`${cardClass} z-10`} data-node-id={nodeId}>
      <FramedBox
        className="relative flex h-[130px] w-fit max-w-none items-center gap-[20px] overflow-clip bg-black pr-[20px]"
      >
        <div className="relative size-[130px] shrink-0">
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-[#53d824] to-[#2c7213]"
          />
          <div className="absolute top-1/2 left-1/2 flex size-[32px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <LocationIcon />
          </div>
        </div>
        <div className="flex w-[295px] shrink-0 flex-col items-start gap-[10px] not-italic [word-break:break-word]">
          <p
            className={`${gilroyMedium.className} w-full text-[22px] leading-[28px] font-medium text-white`}
          >
            {title}
          </p>
          <div
            className={`${interRegular.className} w-[295px] text-[16px] leading-[24px] font-normal text-[#a4a4a4]`}
          >
            {address}
          </div>
        </div>
      </FramedBox>
      </div>
    </>
  );
}
