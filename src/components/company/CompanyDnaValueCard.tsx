import Image from "next/image";
import { interMedium, interRegular } from "../hero/fonts";

const cornerBl = "/careers/corner-card-bl.svg";
const cornerTlGlass = "/careers/corner-tl-glass.svg";
const cornerTrGlass = "/careers/corner-tr-glass.svg";
const cornerBrGlass = "/hero/vector-55.svg";

function GlassPanelCorners() {
  return (
    <>
      <div className="pointer-events-none absolute bottom-0 left-0 flex size-[4px] items-center justify-center">
        <div className="-rotate-90 -scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src={cornerBl} alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute top-[-0.49px] right-[0.19px] flex h-[4px] w-[3.81px] items-center justify-center">
        <div className="-scale-y-100 rotate-90 flex-none">
          <div className="relative h-[3.81px] w-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src={cornerTrGlass} alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute top-0 left-0 flex h-[4px] w-[3.81px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative h-[4px] w-[3.81px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src={cornerTlGlass} alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute right-0 bottom-[0.49px] flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 rotate-180 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src={cornerBrGlass} alt="" width={4} height={4} className="block size-full max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function CompanyDnaValueCard({
  title,
  description,
  nodeId,
}: {
  title: string;
  description: string;
  nodeId: string;
}) {
  return (
    <div className="relative w-[390px] shrink-0" data-node-id={nodeId}>
      <div className="relative flex h-[202px] w-full items-start border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(21,21,21,0.3)]">
        <div className="flex min-w-px flex-[1_0_0] flex-col gap-[10px] p-[32px]">
          <p
            className={`${interMedium.className} w-full text-[28px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
          >
            {title}
          </p>
          <p
            className={`${interRegular.className} w-full text-[16px] leading-[20px] font-normal text-white opacity-65 not-italic [word-break:break-word]`}
          >
            {description}
          </p>
        </div>
        <GlassPanelCorners />
      </div>
    </div>
  );
}
