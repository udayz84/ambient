import Image from "next/image";
import { TagBadge } from "../hero/TagBadge";
import { gilroyMedium, interRegular } from "../hero/fonts";

const FEATURES = [
  {
    iconSrc: "/technology/icon-speak-ai.svg",
    title: "Speak AI natively",
    description:
      "Standard chips waste time translating AI workloads. Our architecture processes matrix math natively for high-density performance.",
  },
  {
    iconSrc: "/technology/icon-compute.svg",
    title: "Compute where the data lives",
    description:
      "We built our analog processing engine in memory. Processing in place eliminates data commute, saving battery life.",
  },
  {
    iconSrc: "/technology/icon-tools.svg",
    title: "Standard tools. zero friction",
    description:
      "Our platform adapts to your software. Compile your PyTorch or TensorFlow models in minutes, no coding needed.",
  },
] as const;

export function TechnologyMobile() {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-black"
        aria-hidden
      />

      <div className="relative flex flex-col items-center pt-[48px] pb-[48px] z-10 w-full">
        
        {/* Top Content with Padding */}
        <div className="flex flex-col items-center px-[24px] w-full">
          <TagBadge
            label="Real-time AI at edge"
            width={180}
            labelOffsetX={74.5}
            rightBarLeft={170.48046875}
          />

          <div className="relative inline-flex flex-col items-center justify-center px-[20px] py-[10px] mt-[16px]">
            <h2
              className={`${gilroyMedium.className} relative z-10 bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic`}
              style={{
                backgroundImage:
                  "linear-gradient(106.923deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
              }}
            >
              Re-architecting<br />the physics of<br />AI compute
            </h2>

            <div className="absolute top-0 right-0 flex size-[6px] items-center justify-center">
              <div className="rotate-180 flex-none">
                <div className="relative size-[6px]">
                  <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 flex size-[6px] items-center justify-center">
              <div className="-scale-x-100 flex-none">
                <div className="relative size-[6px]">
                  <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 flex size-[6px] items-center justify-center">
              <div className="flex-none">
                <div className="relative size-[6px]">
                  <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
                </div>
              </div>
            </div>
            <div className="absolute top-0 left-0 flex size-[6px] items-center justify-center">
              <div className="-scale-y-100 flex-none">
                <div className="relative size-[6px]">
                  <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edge-to-Edge Image */}
        <div className="relative mt-[32px] w-full">
          <Image
            src="/mobile/Image-re-arch.png"
            alt=""
            width={389}
            height={184}
            className="w-full h-auto object-cover"
            sizes="100vw"
          />
        </div>

        {/* Features Content with Padding */}
        <div className="flex flex-col items-center px-[24px] w-full">
          <div className="relative mt-[32px] flex w-full flex-col max-w-[350px]">
            {FEATURES.map((feature, index) => (
              <div key={feature.title} className="relative w-full flex flex-col items-start px-[20px] border-[0.5px] border-solid border-white/20 bg-[rgba(0,0,0,0.1)] backdrop-blur-[12px] mb-[-0.5px]">
                {/* Top Right Bracket */}
                <div className="absolute -top-[0.5px] -right-[0.5px] z-10 flex size-[6px] items-center justify-center">
                  <div className="rotate-180 flex-none">
                    <div className="relative size-[6px]">
                      <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
                    </div>
                  </div>
                </div>
                {/* Top Left Bracket */}
                <div className="absolute -top-[0.5px] -left-[0.5px] z-10 flex size-[6px] items-center justify-center">
                  <div className="-scale-y-100 flex-none">
                    <div className="relative size-[6px]">
                      <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
                    </div>
                  </div>
                </div>

                {/* Bottom Right Bracket for the last item to complete the box */}
                {index === FEATURES.length - 1 && (
                  <div className="absolute -bottom-[0.5px] -right-[0.5px] z-10 flex size-[6px] items-center justify-center">
                    <div className="-scale-x-100 flex-none">
                      <div className="relative size-[6px]">
                        <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
                      </div>
                    </div>
                  </div>
                )}
                {/* Bottom Left Bracket for the last item to complete the box */}
                {index === FEATURES.length - 1 && (
                  <div className="absolute -bottom-[0.5px] -left-[0.5px] z-10 flex size-[6px] items-center justify-center">
                    <div className="flex-none">
                      <div className="relative size-[6px]">
                        <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-[3px] items-start py-[20px] relative w-full">
                  <div className="relative size-[33px] shrink-0">
                    <img
                      src={feature.iconSrc}
                      alt=""
                      className="absolute inset-0 size-full object-contain"
                      aria-hidden
                    />
                  </div>
                  <p
                    className={`${gilroyMedium.className} [word-break:break-word] text-[22px] leading-[38px] whitespace-nowrap text-white not-italic shrink-0 relative`}
                  >
                    {feature.title}
                  </p>
                  <div className="flex flex-col items-start w-full relative shrink-0">
                    <p
                      className={`${interRegular.className} [word-break:break-word] text-[14px] leading-[22px] text-[#f0f0f0] opacity-65 not-italic w-[310px] max-w-full shrink-0 relative`}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
