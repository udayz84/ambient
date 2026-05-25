import Image from "next/image";
import { CornerDecor, GradientTitle } from "../contact/contact-shared";
import { interRegular } from "../hero/fonts";
import { CompanyAdvisoryBoard } from "./CompanyAdvisoryBoard";
import { CompanyLeadershipRow } from "./CompanyLeadershipRow";

const cornerLeft = "/hero/corner-tag-1.svg";
const cornerRight = "/hero/corner-tag-2.svg";

const IMAGE_107_OVERLAY =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 810 1440' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-46.009 0.0000020111 -0.000003897 -89.152 363.86 720)'><stop stop-color='rgba(0,0,0,0.6)' offset='0'/><stop stop-color='rgba(0,0,0,1)' offset='1'/></radialGradient></defs></svg>\")";

function LeadershipSectionTitleCorners() {
  return (
    <>
      <div className="pointer-events-none absolute top-[4px] left-0 flex size-[4px] items-center justify-center">
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
      <div className="pointer-events-none absolute top-[4px] right-0 flex size-[4px] items-center justify-center">
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
      <div className="pointer-events-none absolute bottom-[4px] left-0 size-[4px]">
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
      <div className="pointer-events-none absolute right-0 bottom-[4px] flex size-[4px] items-center justify-center">
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
    </>
  );
}

function LeadershipBackground() {
  return (
    <div
      className="pointer-events-none absolute top-[399px] right-0 flex h-[810px] w-[1440px] items-center justify-center"
      data-node-id="2379:2275"
      data-name="image 107"
      aria-hidden
    >
      <div className="flex-none rotate-90">
        <div className="relative h-[1440px] w-[810px] overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(83, 216, 36, 0.18) 0%, rgba(46, 76, 38, 0.08) 35%, rgba(0, 0, 0, 0) 70%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{ backgroundImage: IMAGE_107_OVERLAY }}
          />
        </div>
      </div>
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
              <LeadershipSectionTitleCorners />
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
    </section>
  );
}
