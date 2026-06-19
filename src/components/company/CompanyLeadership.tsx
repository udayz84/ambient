import Image from "next/image";
import { GradientTitle } from "../contact/contact-shared";
import { interRegular } from "../hero/fonts";
import { CompanyAdvisoryBoard } from "./CompanyAdvisoryBoard";
import { CornerDecor } from "./company-corners";
import { CompanyLeadershipRow } from "./CompanyLeadershipRow";

const IMAGE_107_OVERLAY =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 810 1440' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-46.009 0.0000020111 -0.000003897 -89.152 363.86 720)'><stop stop-color='rgba(0,0,0,0.6)' offset='0'/><stop stop-color='rgba(0,0,0,1)' offset='1'/></radialGradient></defs></svg>\")";

function LeadershipBackground() {
  return (
    <div
      className="pointer-events-none absolute top-[350px] right-0 h-[810px] w-[1440px] overflow-hidden"
      data-node-id="2379:2275"
      data-name="image 107"
      aria-hidden
    >
      <Image
        src="/careers/image%20107.png"
        alt=""
        fill
        className="max-w-none object-cover brightness-150"
        sizes="1440px"
        unoptimized
      />
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: IMAGE_107_OVERLAY }}
      />
    </div>
  );
}

export function CompanyLeadership() {
  return (
    <section
      className="relative z-[8] mx-auto mt-[118px] h-[1208px] w-[1430px] shrink-0 overflow-visible bg-black"
      data-node-id="2379:2274"
      data-name="Frame 1618875878"
      aria-label="Our minds powering the revolution"
    >
      <LeadershipBackground />

      <div
        className="relative mx-auto mt-[1.1123046875px] flex w-[1204px] flex-col"
        data-node-id="2379:2276"
        data-name="Frame 1618875866"
      >
        <div
          className="flex w-full shrink-0 flex-col"
          data-node-id="2379:2277"
          data-name="Our minds powering the revolution "
        >
          <div
            className="flex w-[591px] shrink-0 flex-col"
            data-node-id="2379:2278"
            data-name="Section Title"
          >
            <div
              className="relative h-[98px] w-fit min-w-[444px] shrink-0"
              data-node-id="2379:2279"
              data-name="Title"
            >
              <div className="px-[10px]">
                <GradientTitle
                  nodeId="2379:2280"
                  gradientDeg="105.739deg"
                  className="w-max max-w-none break-normal"
                >
                  <span className="block h-[49px] shrink-0 pr-[2px] leading-[49px] whitespace-nowrap">
                    Our minds powering
                  </span>
                  <span className="block h-[49px] shrink-0 leading-[49px]">
                    the revolution
                  </span>
                </GradientTitle>
              </div>
              <CornerDecor />
            </div>
            <p
              className={`${interRegular.className} mt-[24px] w-[591px] text-[18px] leading-[27px] font-normal text-[#a1a1a1] not-italic [word-break:break-word]`}
              data-node-id="2379:2285"
            >
              We&apos;re building programmable AI processors that deliver
              <br />
              breakthrough performance and power efficiency from edge to cloud.
            </p>
          </div>

          <div
            className="relative mt-[60px] h-[471.25px] w-[1204px] shrink-0"
            data-node-id="2379:2286"
            data-name="Leadership"
          >
            <CompanyLeadershipRow />
          </div>
        </div>

        <CompanyAdvisoryBoard />
      </div>

      <button
        type="button"
        className="absolute top-[593px] left-[39px] z-20 flex size-[44px] cursor-pointer items-center justify-center transition-opacity hover:opacity-80"
        aria-label="Previous"
      >
        <Image src="/applications/nav-arrow-left.svg" alt="" width={44} height={44} className="block size-full max-w-none" />
      </button>

      <button
        type="button"
        className="absolute top-[593px] left-[1347px] z-20 flex size-[44px] cursor-pointer items-center justify-center transition-opacity hover:opacity-80"
        aria-label="Next"
      >
        <Image src="/applications/nav-arrow-right.svg" alt="" width={44} height={44} className="block size-full max-w-none" />
      </button>
    </section>
  );
}
