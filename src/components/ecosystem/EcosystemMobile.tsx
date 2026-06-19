import Image from "next/image";
import { gilroyMedium, gilroySemiBold, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";

const SILICON_LOGOS = [
  { src: "/ecosystem/logo-partner-1.svg", width: 86, height: 23 },
  { src: "/ecosystem/logo-partner-2.svg", width: 120, height: 22 },
  { src: "/ecosystem/logo-partner-3.svg", width: 81, height: 19 },
];

function LogoCell({
  src,
  width,
  height,
}: {
  src: string;
  width: number;
  height: number;
}) {
  return (
    <div className="relative flex h-[60px] w-[110px] shrink-0 snap-start items-center justify-center">
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        className="block max-w-none object-contain"
      />
    </div>
  );
}

function PartnerGroup({ title }: { title: string }) {
  return (
    <div className="relative w-full">
      <p
        className={`${gilroySemiBold.className} bg-clip-text text-[24px] leading-[30px] font-semibold tracking-[-0.48px] text-transparent opacity-70 not-italic`}
        style={{
          backgroundImage:
            "linear-gradient(119.414deg, rgba(255,255,255,0.75) 9.0248%, rgba(255,255,255,0.45) 37.884%, rgba(255,255,255,0.65) 111.41%)",
        }}
      >
        {title}
      </p>

      <div className="relative mt-[12px] overflow-hidden border-[0.5px] border-solid border-white/10 bg-[rgba(255,255,255,0.04)]">
        <Corners leftSrc="/ecosystem/corner-tl.svg" rightSrc="/ecosystem/corner-tr.svg" />
        <div className="flex items-center gap-[4px] overflow-x-auto px-[16px] py-[8px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SILICON_LOGOS.map((logo) => (
            <LogoCell key={logo.src} {...logo} />
          ))}

          <div className="relative flex h-[60px] w-[120px] shrink-0 snap-start items-center justify-center gap-[10px]">
            <Image
              src="/ecosystem/logo-partner-4.svg"
              alt=""
              width={35}
              height={35}
              className="block max-w-none"
            />
            <p
              className={`${gilroySemiBold.className} text-[17.1px] leading-[20.4px] font-semibold whitespace-nowrap text-white not-italic`}
            >
              Tezos
            </p>
          </div>

          <div className="relative flex h-[60px] w-[120px] shrink-0 snap-start items-center justify-center gap-[10px]">
            <p
              className={`${gilroySemiBold.className} text-[17.1px] leading-[20.4px] font-semibold whitespace-nowrap text-white not-italic`}
            >
              Octane
            </p>
            <Image
              src="/ecosystem/logo-octane.svg"
              alt=""
              width={35}
              height={35}
              className="block max-w-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function EcosystemMobile() {
  return (
    <div className="relative flex flex-col items-center px-[24px] py-[48px]">
      <h2
        className={`${gilroyMedium.className} max-w-[327px] bg-clip-text text-center text-[28px] leading-[34px] font-medium text-transparent [word-break:break-word] not-italic`}
        style={{
          backgroundImage:
            "linear-gradient(134.597deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
        }}
      >
        Supported by a growing ecosystem
      </h2>
      <p
        className={`${interRegular.className} mt-[16px] max-w-[327px] text-center text-[14px] leading-[22px] font-normal text-white opacity-80 not-italic`}
      >
        Ambient works with partners across silicon, development, distribution,
        and system integration, helping teams move from evaluation to
        deployment with confidence
      </p>

      <a
        href="#"
        className="relative flex h-[48px] w-full items-center justify-center gap-[10px] shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
        />
        <p className={`${interRegular.className} relative z-10 shrink-0 whitespace-nowrap text-[14px] font-normal text-white uppercase not-italic`}>
          Work with us
        </p>
        <Image
          src="/navbar/cta-dot.svg"
          alt=""
          width={6}
          height={6}
          className="relative size-[6px]"
          aria-hidden
        />
        <Corners />
      </a>

      <div className="mt-[36px] flex w-full flex-col gap-[24px]">
        <PartnerGroup title="SILICON PARTNERS" />
        <PartnerGroup title="DEVELOPMENT PARTNERS" />
      </div>
    </div>
  );
}
