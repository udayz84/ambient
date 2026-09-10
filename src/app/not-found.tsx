import Link from "next/link";
import { gilroyBold, gilroyMedium, interRegular } from "@/components/hero/fonts";
import { GreenCtaButton } from "@/components/contact/contact-shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
};

export default function NotFound() {
  return (
    <main className="relative flex w-full flex-col items-center pt-[40px] lg:pt-[80px] mb-[-300px] lg:mb-[-470px]">
      {/* Top gradient to fill empty space below navbar */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-black via-black/50 to-transparent pointer-events-none" />
      
      <div className="relative flex flex-col items-center w-full max-w-[1440px] px-4 min-h-[500px]">
        {/* Left cable */}
        <div className="hidden lg:block -translate-x-1/2 absolute h-[317px] left-[calc(50%-420px)] mix-blend-screen top-[40px] w-[336px] overflow-hidden pointer-events-none z-10">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[139.65%] left-0 max-w-none top-[-19.82%] w-[180.37%]" src="/404-cable.webp" />
        </div>
        
        {/* Right cable */}
        <div className="hidden lg:block -translate-x-1/2 absolute h-[317px] left-[calc(50%+450px)] mix-blend-screen top-[40px] w-[336px] overflow-hidden pointer-events-none z-10">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[139.65%] left-[-108.43%] max-w-none top-[-19.82%] w-[180.37%]" src="/404-cable.webp" />
        </div>

        <h1 
          className={`${gilroyBold.className} relative z-10 bg-clip-text text-[150px] lg:text-[280px] leading-none text-transparent opacity-86 tracking-[-4.8px] mb-[0px]`}
          style={{
            backgroundImage: "linear-gradient(to right, rgba(46,76,38,0.61), #ddf5d3 50%, rgba(46,76,38,0.72))"
          }}
        >
          404
        </h1>
        
        <h2 className={`${gilroyMedium.className} relative z-10 text-[24px] lg:text-[32px] text-white text-center mb-[16px] max-w-[496px] leading-[38px] mt-[-10px]`}>
          You&apos;ve wandered off the circuit
        </h2>
        
        <p className={`${interRegular.className} relative z-10 text-[16px] lg:text-[18px] text-[#f0f0f0] opacity-80 text-center max-w-[370px] mb-[48px] leading-[27px]`}>
          Let&apos;s get you back to where true innovation starts again!
        </p>
        
        <div className="relative z-10">
          <GreenCtaButton 
            href="/" 
            width="223px" 
            textClassName="text-[16px] leading-[28px]"
          >
            BACK TO HOMEPAGE
          </GreenCtaButton>
        </div>
      </div>
    </main>
  );
}
