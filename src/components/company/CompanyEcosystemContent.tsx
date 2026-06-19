import Image from "next/image";
import { GradientTitle } from "../contact/contact-shared";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { CompanyStandardCorners, CornerDecor } from "./company-corners";

function EcosystemColumnIcon({
  src,
  nodeId,
}: {
  src: string;
  nodeId: string;
}) {
  return (
    <Image
      src={src}
      alt=""
      width={32}
      height={32}
      className="absolute top-0 left-0 size-[32px] shrink-0"
      data-node-id={nodeId}
      aria-hidden
    />
  );
}

export function CompanyEcosystemContent() {
  return (
    <div
      className="absolute top-[0.708px] left-[118px] z-10 h-[390px] w-[1204px] border-[0.5px] border-b-0 border-solid border-[rgba(255,255,255,0.15)]"
      style={{
        background: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.5) 100%)",
      }}
      data-node-id="2379:4637"
      data-name="Content Section"
    >
      <CompanyStandardCorners />

      <div
        className="absolute top-[40px] left-[40px] h-[310px] w-[1124px]"
        data-node-id="2379:4638"
      >
        <div
          className="absolute top-0 left-0 h-[98px] w-[1124px]"
          data-node-id="2379:4639"
        >
          <div
            className="absolute top-0 left-0 h-[98px] w-[485px]"
            data-node-id="2379:4640"
          >
            <div
              className="absolute top-0 left-[1px] h-[98px] w-[483px]"
              data-node-id="2379:4641"
            >
              <div className="relative h-[98px] w-[483px] px-[10px]">
                <GradientTitle
                  nodeId="2379:4642"
                  gradientDeg="105.739deg"
                  className="w-[463px]"
                >
                  <p className="mb-0 leading-[49px]">A globally resilient</p>
                  <p className="leading-[49px]">ecosystem</p>
                </GradientTitle>
                <CornerDecor />
              </div>
            </div>
          </div>
          <p
            className={`${interRegular.className} absolute top-[8.5px] left-[680px] h-[81px] w-[444px] text-[18px] leading-[27px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
            data-node-id="2379:4647"
          >
            Backed by Tier-1 foundries and integrated with the world&apos;s
            leading technology distributors and platforms.
          </p>
        </div>

        <div
          className="absolute top-[146px] left-0 h-px w-[1124px] bg-[#224A10]"
          data-node-id="2379:4648"
          aria-hidden
        />

        <div
          className="absolute top-[194px] left-0 h-[116px] w-[1068.999px]"
          data-node-id="2379:4649"
        >
          <div
            className="absolute top-0 left-0 h-[116px] w-[361.999px]"
            data-node-id="2379:4650"
          >
            <div
              className="absolute top-0 left-0 h-[32px] w-[361.999px]"
              data-node-id="2379:4651"
            >
              <EcosystemColumnIcon
                src="/company/ecosystem-icon-footprint.svg"
                nodeId="2379:4652"
              />
              <p
                className={`${gilroyMedium.className} absolute top-[1.5px] left-[42px] h-[29px] w-[197px] text-[26px] leading-[28px] font-medium whitespace-nowrap text-white not-italic`}
                data-node-id="2379:4654"
              >
                Global Footprint
              </p>
            </div>
            <p
              className={`${interRegular.className} absolute top-[44px] left-0 h-[72px] w-[361.999px] text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
              data-node-id="2379:4655"
            >
              Headquartered in Santa Clara, CA with dedicated R&amp;D and hardware
              labs in Bangalore and Singapore.
            </p>
          </div>

          <div
            className="absolute top-0 left-[679.999px] h-[116px] w-[389px]"
            data-node-id="2379:4656"
          >
            <div
              className="absolute top-0 left-0 h-[32px] w-[389px]"
              data-node-id="2379:4657"
            >
              <EcosystemColumnIcon
                src="/company/ecosystem-icon-distribution.svg"
                nodeId="2379:4658"
              />
              <p
                className={`${gilroyMedium.className} absolute top-0 left-[42px] h-[29px] w-[326px] text-[26px] leading-[28px] font-medium whitespace-nowrap text-white not-italic`}
                data-node-id="2379:4662"
              >
                Distribution &amp; Supply Chain
              </p>
            </div>
            <p
              className={`${interRegular.className} absolute top-[44px] left-0 h-[72px] w-[389px] text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
              data-node-id="2379:4663"
            >
              Authorized global distribution through trusted enterprise partners
              ensuring secure, high-volume silicon delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
