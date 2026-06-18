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
    <div className="relative w-full">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <Image
          src="/technology/bg-image-29.png"
          alt=""
          fill
          className="object-cover object-center opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
      </div>

      <div className="relative flex flex-col items-center px-[24px] py-[48px]">
        <TagBadge
          label="Real-time AI at edge"
          width={180}
          labelOffsetX={74.5}
          rightBarLeft={170.48046875}
        />

        <h2
          className={`${gilroyMedium.className} mt-[16px] max-w-[327px] bg-clip-text text-center text-[28px] leading-[34px] font-medium text-transparent [word-break:break-word] not-italic`}
          style={{
            backgroundImage:
              "linear-gradient(106.923deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
          }}
        >
          Re-architecting the physics of AI compute
        </h2>

        <div className="relative mt-[24px] h-[170px] w-full max-w-[327px]">
          <Image
            src="/technology/chip-visual.png"
            alt=""
            fill
            className="object-contain object-center"
            sizes="327px"
          />
        </div>

        <div className="mt-[32px] flex w-full flex-col">
          {FEATURES.map((feature, index) => (
            <div key={feature.title}>
              {index > 0 && (
                <div className="my-[20px] h-px w-full bg-white/10" />
              )}
              <div className="flex flex-col items-start gap-[12px]">
                <div className="relative h-[42px] w-[42px] shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={feature.iconSrc}
                    alt=""
                    className="absolute inset-0 size-full object-contain"
                    aria-hidden
                  />
                </div>
                <p
                  className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium text-white not-italic`}
                >
                  {feature.title}
                </p>
                <p
                  className={`${interRegular.className} text-[14px] leading-[22px] font-normal text-[#f0f0f0] opacity-65 not-italic`}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
