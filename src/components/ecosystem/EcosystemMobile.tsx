import Image from "next/image";
import { gilroyMedium, gilroySemiBold, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";

function MobileGridLine() {
  return (
    <div className="relative flex flex-col justify-between h-[160px] w-[6px] shrink-0 opacity-50">
      <Image src="/ecosystem/grid-cap.svg" alt="" width={6} height={3} className="block w-[6px]" />
      <div className="w-[1px] h-full mx-auto bg-white/20" />
      <Image src="/ecosystem/grid-cap.svg" alt="" width={6} height={3} className="block w-[6px]" />
    </div>
  );
}

function LogoCell({ src, width, height }: { src: string; width: number; height: number }) {
  return (
    <div className="relative flex shrink-0 items-center justify-center">
      <Image src={src} alt="" width={width} height={height} className="block max-w-none object-contain" />
    </div>
  );
}

function PartnerRowMobile() {
  return (
    <div className="relative flex h-[160px] w-[1200px] shrink-0 items-center justify-between border-[0.5px] border-solid border-white/10 bg-[rgba(255,255,255,0.04)] px-[40px]">
      <Corners leftSrc="/ecosystem/corner-tl.svg" rightSrc="/ecosystem/corner-tr.svg" />
      
      <LogoCell src="/ecosystem/logo-partner-1.svg" width={172} height={46} />
      <MobileGridLine />
      <LogoCell src="/ecosystem/logo-partner-2.svg" width={240} height={44} />
      <MobileGridLine />
      <LogoCell src="/ecosystem/logo-partner-3.svg" width={162} height={38} />
      
      <MobileGridLine />
      <div className="relative flex shrink-0 items-center justify-center gap-[12px]">
        <Image src="/ecosystem/logo-partner-4.svg" alt="" width={60} height={60} className="block max-w-none" />
        <p className={`${gilroySemiBold.className} text-[28px] leading-[34px] font-semibold text-white`}>Tezos</p>
      </div>
      <MobileGridLine />
      <div className="relative flex shrink-0 items-center justify-center gap-[12px]">
        <p className={`${gilroySemiBold.className} text-[28px] leading-[34px] font-semibold text-white`}>Octane</p>
        <Image src="/ecosystem/logo-octane.svg" alt="" width={60} height={60} className="block max-w-none" />
      </div>
    </div>
  );
}

function PartnerSectionMobile({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-[16px] shrink-0 w-[1200px]">
      <p
        className={`${gilroySemiBold.className} bg-clip-text text-[28px] leading-[34px] font-semibold tracking-[-0.56px] text-transparent opacity-70 not-italic px-[24px]`}
        style={{
          backgroundImage:
            "linear-gradient(119.414deg, rgba(255,255,255,0.75) 9.0248%, rgba(255,255,255,0.45) 37.884%, rgba(255,255,255,0.65) 111.41%)",
        }}
      >
        {title}
      </p>
      <PartnerRowMobile />
    </div>
  );
}

export function EcosystemMobile() {
  return (
    <div className="relative flex flex-col items-center py-[48px]">
      <div className="relative inline-flex flex-col items-center justify-center w-fit max-w-[350px] px-[16px] py-[12px]">
        <div className="absolute top-0 right-0 flex size-[4px] items-center justify-center">
          <div className="rotate-180 flex-none">
            <div className="relative size-[4px]">
              <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 flex size-[4px] items-center justify-center">
          <div className="-scale-x-100 flex-none">
            <div className="relative size-[4px]">
              <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 flex size-[4px] items-center justify-center">
          <div className="flex-none">
            <div className="relative size-[4px]">
              <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 flex size-[4px] items-center justify-center">
          <div className="-scale-y-100 flex-none">
            <div className="relative size-[4px]">
              <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
            </div>
          </div>
        </div>

        <h2
          className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic pb-[10px] -mb-[10px]`}
          style={{
            backgroundImage:
              "linear-gradient(107.454deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
          }}
        >
          Supported by a growing ecosystem
        </h2>
      </div>
      
      <p
        className={`${interRegular.className} mt-[24px] w-[356px] max-w-[calc(100vw-48px)] text-center text-[14px] leading-[22px] font-normal text-white opacity-80 not-italic`}
      >
        Ambient works with partners across silicon, development, distribution,
        and system integration, helping teams move from evaluation to
        deployment with confidence
      </p>

      <a
        href="#"
        className="relative mt-[24px] flex h-[48px] w-[186px] max-w-[calc(100vw-48px)] items-center justify-center gap-[10px] shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
        />
        <p className={`${interRegular.className} relative z-10 shrink-0 whitespace-nowrap text-[14px] font-medium text-white uppercase not-italic tracking-wider`}>
          WORK WITH US
        </p>
        <Image
          src="/navbar/cta-dot.svg"
          alt=""
          width={6}
          height={6}
          className="relative z-10 size-[6px]"
          aria-hidden
        />
        <Corners />
      </a>

      <div className="mt-[48px] flex w-full overflow-hidden">
        <div className="flex w-max gap-[32px] animate-[ecosystem-scroll-mobile_25s_linear_infinite]">
          <PartnerSectionMobile title="SILICON PARTNERS" />
          <PartnerSectionMobile title="DEVELOPMENT PARTNERS" />
          <PartnerSectionMobile title="SILICON PARTNERS" />
          <PartnerSectionMobile title="DEVELOPMENT PARTNERS" />
        </div>
      </div>
    </div>
  );
}
