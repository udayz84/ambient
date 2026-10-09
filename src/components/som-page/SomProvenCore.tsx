"use client";

import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { useFadeIn, getFadeInClass } from "../shared/useFadeIn";
import { GradientTitle } from "../contact/contact-shared";

export function SomProvenCore() {
  const { fadeRef, isVisible } = useFadeIn();

  return (
    <section
      ref={fadeRef}
      className={`relative mx-auto flex w-full max-w-[1204px] flex-col items-center gap-[24px] px-[24px] py-[24px] min-[1024px]:py-[40px] ${getFadeInClass(isVisible)} transform-gpu`}
      aria-label="The same proven core in both."
    >
      <div className="flex w-full flex-col items-center gap-[24px] text-center mb-[20px]">
        <div className="relative px-[16px] py-[4px]">
          <GradientTitle gradientDeg="110.887deg" className="text-center text-[32px] leading-[40px] min-[1024px]:text-[46px] min-[1024px]:leading-[56px]">
            The same proven core in both.
          </GradientTitle>
          <Corners />
        </div>
        <p className={`${interRegular.className} max-w-[800px] text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-80 min-[1024px]:text-[18px] min-[1024px]:leading-[28px]`}>
          Everything the compute needs, pre-integrated for volume — miniature LGA modules built for mass production from the first revision.
        </p>
      </div>

      <div className="flex w-full flex-col gap-[32px] min-[1024px]:flex-row min-[1024px]:items-stretch min-[1024px]:gap-[40px]">
        
        {/* Left Side: Variants overview */}
        <div className="relative flex flex-1 flex-col justify-between gap-[24px] overflow-hidden border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] px-[32px] py-[32px] min-[1024px]:px-[40px] min-[1024px]:py-[40px] justify-center">
          <Corners />
          <div className="flex w-full flex-col gap-[32px] h-full justify-center items-center">
            
            {/* BLE Variant */}
            <div className="relative flex flex-col gap-[16px] w-full max-w-[320px]">
              <div className="flex h-[160px] w-full flex-col items-center justify-center border-[0.5px] border-[rgba(83,216,36,0.3)] bg-black/40 shadow-[0_0_30px_rgba(83,216,36,0.1)] relative overflow-hidden transition-all duration-300 hover:border-[rgba(83,216,36,0.6)]">
                <Corners />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(83,216,36,0.15)_0%,transparent_70%)] opacity-50" />
                <img src="/som/module-photo.png" alt="" className="h-[90%] w-auto object-contain opacity-90 z-10 filter drop-shadow-[0_0_8px_rgba(83,216,36,0.3)]" aria-hidden />
                <div className="absolute bottom-2 z-10 flex gap-[8px]">
                  <span className={`${dmMono.className} border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.2)] px-2 py-0.5 text-[10px] text-white/90 backdrop-blur-sm`}>GPX10</span>
                  <span className={`${dmMono.className} border border-[#53d824] bg-[rgba(83,216,36,0.2)] px-2 py-0.5 text-[10px] text-[#53d824] backdrop-blur-sm`}>nRF54</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.1)] pt-[16px]">
                <div className="flex items-center gap-[8px]">
                  <span className={`${gilroyMedium.className} text-[16px] text-white`}>BLE Variant</span>
                </div>
                <span className={`${dmMono.className} rounded-full border border-[#53d824] bg-[rgba(83,216,36,0.1)] px-[8px] py-[2px] text-[10px] text-[#53d824] uppercase`}>Coming Soon</span>
              </div>
            </div>

            {/* Connecting line */}
            <div className="flex flex-col items-center justify-center gap-[8px]">
              <div className="w-[1px] h-[20px] bg-gradient-to-b from-[rgba(83,216,36,0)] via-[rgba(83,216,36,0.5)] to-[rgba(83,216,36,0)]" />
              <span className={`${dmMono.className} text-[10px] text-white/50 text-center uppercase`}>Same Core<br/>Architecture</span>
              <div className="w-[1px] h-[20px] bg-gradient-to-b from-[rgba(83,216,36,0)] via-[rgba(83,216,36,0.5)] to-[rgba(83,216,36,0)]" />
            </div>

            {/* LTE Variant */}
            <div className="relative flex flex-col gap-[16px] w-full max-w-[320px]">
              <div className="flex h-[160px] w-full flex-col items-center justify-center border-[0.5px] border-[rgba(83,216,36,0.3)] bg-black/40 shadow-[0_0_30px_rgba(83,216,36,0.1)] relative overflow-hidden transition-all duration-300 hover:border-[rgba(83,216,36,0.6)]">
                <Corners />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(83,216,36,0.15)_0%,transparent_70%)] opacity-50" />
                <img src="/som/module-photo.png" alt="" className="h-[90%] w-auto object-contain opacity-90 z-10 filter drop-shadow-[0_0_8px_rgba(83,216,36,0.3)]" aria-hidden />
                <div className="absolute bottom-2 z-10 flex gap-[8px]">
                  <span className={`${dmMono.className} border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.2)] px-2 py-0.5 text-[10px] text-white/90 backdrop-blur-sm`}>GPX10</span>
                  <span className={`${dmMono.className} border border-[#53d824] bg-[rgba(83,216,36,0.2)] px-2 py-0.5 text-[10px] text-[#53d824] backdrop-blur-sm`}>LTE MODEM</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.1)] pt-[16px]">
                <div className="flex items-center gap-[8px]">
                  <span className={`${gilroyMedium.className} text-[16px] text-white`}>LTE Variant</span>
                </div>
                <span className={`${dmMono.className} rounded-full border border-[#53d824] bg-[rgba(83,216,36,0.1)] px-[8px] py-[2px] text-[10px] text-[#53d824] uppercase`}>Coming Soon</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Detail Tables */}
        <div className="flex w-full min-[1024px]:w-[520px] shrink-0 flex-col gap-[24px] justify-between">
          
          {/* Shared Core Table */}
          <div className="relative overflow-hidden border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] p-[24px] min-[1024px]:p-[32px]">
            <Corners />
            <div className="mb-[24px] flex items-center justify-between border-b border-[rgba(240,240,240,0.1)] pb-[16px]">
              <h3 className={`${gilroyMedium.className} text-[20px] text-white flex items-center gap-[12px]`}>
                <span className="flex size-[24px] items-center justify-center border border-[#53d824] bg-[rgba(83,216,36,0.1)] rounded-[4px]">
                  <span className="size-[8px] bg-[#53d824] rounded-[2px]" />
                </span>
                Shared Core
              </h3>
              <span className={`${dmMono.className} rounded-[4px] border border-[rgba(83,216,36,0.5)] bg-[rgba(83,216,36,0.1)] px-[8px] py-[4px] text-[11px] text-[#53d824] uppercase`}>
                Both Variants
              </span>
            </div>
            <div className="flex flex-col gap-[16px]">
              {[
                { label: "AI processor", value: "Ambient GPX10 Pro (CSP-50)" },
                { label: "Sensing", value: "Bosch BMI270 6-axis IMU" },
                { label: "Memory", value: "Macronix NOR flash for boot, application, and models; boots over SPI and executes from on-chip 2 MB SRAM" },
                { label: "Interfaces", value: "LGA I/O: UART, I²C, SPI, I²S, GPIO, ADC" },
                { label: "Microphone", value: "None on-module, by design; connect your own via I²S or the Audio ADC, so you control placement for directional audio and beamforming" }
              ].map((row, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-[8px] sm:gap-[24px]">
                  <span className={`${interRegular.className} w-[100px] shrink-0 text-[13px] text-[#f0f0f0] opacity-80`}>{row.label}</span>
                  <div className="hidden sm:block w-[1px] self-stretch bg-[rgba(240,240,240,0.1)]" />
                  <span className={`${interRegular.className} text-[13px] text-white opacity-90`}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Connectivity Table */}
          <div className="relative overflow-hidden border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] p-[24px] min-[1024px]:p-[32px]">
            <Corners />
            <div className="mb-[24px] border-b border-[rgba(240,240,240,0.1)] pb-[16px]">
              <h3 className={`${gilroyMedium.className} text-[20px] text-white flex items-center gap-[12px]`}>
                <span className="flex size-[24px] items-center justify-center text-[#53d824] text-[18px]">
                  ((•))
                </span>
                Connectivity
              </h3>
            </div>
            <div className="flex flex-col gap-[16px]">
              {[
                { label: "SOM (BLE)", value: "Nordic nRF54 Bluetooth LE; RF on a u.FL connector and an LGA RF pad" },
                { label: "SOM (LTE)", value: "LTE cellular modem for direct wide-area connectivity (module, SIM, and antenna interface)" }
              ].map((row, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-[8px] sm:gap-[24px]">
                  <span className={`${interRegular.className} w-[100px] shrink-0 text-[13px] text-[#f0f0f0] opacity-80`}>{row.label}</span>
                  <div className="hidden sm:block w-[1px] self-stretch bg-[rgba(240,240,240,0.1)]" />
                  <span className={`${interRegular.className} text-[13px] text-white opacity-90`}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>



        </div>
      </div>
    </section>
  );
}
