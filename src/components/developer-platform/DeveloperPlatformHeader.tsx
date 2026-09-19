import Image from "next/image";
import { gilroyMedium, interRegular } from "../hero/fonts";

const cornerLeft = "/hero/corner-tag-1.svg";
const cornerRight = "/hero/corner-tag-2.svg";

function CornerTick({ src, placement, className = "" }: { src: string; placement: "tl"|"tr"|"bl"|"br"; className?: string; }) {
  const flipClass =
    placement === "tl" ? "-scale-y-100" :
    placement === "tr" ? "rotate-180" :
    placement === "br" ? "-scale-y-100 rotate-180" : "";
    
  return (
    <div className={`pointer-events-none absolute flex size-[4px] items-center justify-center ${className}`} aria-hidden>
      {flipClass ? (
        <div className={`${flipClass} flex-none`}>
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src={src} alt="" width={4} height={4} className="block size-full max-w-none" />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative size-[4px]">
          <div className="absolute inset-[0_0_-12.5%_-12.5%]">
            <Image src={src} alt="" width={4} height={4} className="block size-full max-w-none" />
          </div>
        </div>
      )}
    </div>
  );
}

export function DeveloperPlatformHeader({ data }: { data?: any }) {
  const heading = data?.heading || "";
  const subtitle = data?.subtitle || "";
  return (
    <div className="absolute top-0 left-1/2 z-10 flex w-[604px] -translate-x-1/2 flex-col items-center justify-start gap-[24px]">
      <div className="relative flex w-fit max-w-full shrink-0 flex-col items-center px-[20px] py-[4px]">
        <h2
          className={`${gilroyMedium.className} max-w-full text-center text-[46px] leading-[49px] font-medium text-[transparent] not-italic [word-break:break-word]`}
          style={{
            backgroundImage: "linear-gradient(126.324deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {heading}
        </h2>
        <CornerTick src={cornerLeft} placement="tl" className="left-[4px] top-0" />
        <CornerTick src={cornerRight} placement="tr" className="right-[4px] top-0" />
        <CornerTick src={cornerLeft} placement="bl" className="bottom-0 left-[4px]" />
        <CornerTick src={cornerRight} placement="br" className="right-[4px] bottom-0" />
      </div>

      <p className={`${interRegular.className} w-full text-center text-[18px] leading-[27px] font-normal text-white not-italic opacity-85`}>
        {subtitle}
      </p>
    </div>
  );
}
