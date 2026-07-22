import Link from "next/link";
import { gilroyBold, gilroyMedium, interRegular } from "@/components/hero/fonts";
import { GreenCtaButton } from "@/components/contact/contact-shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
};

export default function NotFound() {
  return (
    <main className="relative flex w-full flex-col items-center z-[10] pt-[40px] lg:pt-[80px] mb-[-300px] lg:mb-[-470px]">
      <div className="relative flex flex-col items-center z-10 w-full max-w-[1440px] px-4">
        <h1 
          className={`${gilroyBold.className} bg-clip-text text-[150px] lg:text-[280px] leading-none text-transparent opacity-86 tracking-[-4.8px] mb-[0px]`}
          style={{
            backgroundImage: "linear-gradient(to right, rgba(46,76,38,0.61), #ddf5d3 50%, rgba(46,76,38,0.72))"
          }}
        >
          404
        </h1>
        
        <h2 className={`${gilroyMedium.className} text-[24px] lg:text-[32px] text-white text-center mb-[16px] max-w-[496px] leading-[38px] mt-[-10px]`}>
          You&apos;ve wandered off the circuit
        </h2>
        
        <p className={`${interRegular.className} text-[16px] lg:text-[18px] text-[#f0f0f0] opacity-80 text-center max-w-[370px] mb-[48px] leading-[27px]`}>
          Let&apos;s get you back to where true innovation starts again!
        </p>
        
        <GreenCtaButton 
          href="/" 
          width="223px" 
          textClassName="text-[16px] leading-[28px]"
        >
          BACK TO HOMEPAGE
        </GreenCtaButton>
      </div>
    </main>
  );
}
