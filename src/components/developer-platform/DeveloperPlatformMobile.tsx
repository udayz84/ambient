import Image from "next/image";
import { gilroyMedium, interRegular } from "../hero/fonts";

type MobileCard = {
  title: string;
  body: string;
  imageSrc?: string;
};

const MOBILE_CARDS: MobileCard[] = [
  {
    title: "Explore silicon",
    body: "Start with Ambient's AI-native compute products and see how platform advantages translate into real hardware",
  },
  {
    title: "Evaluate with development kits",
    body: "Get hands-on with the platform through development kits designed to accelerate validation and shorten time to first insight",
  },
  {
    title: "Develop with ModelForge",
    body: "Train, deploy, and optimize through a development workflow designed to help teams build with Ambient without starting from scratch",
    imageSrc: "/developer-platform/card-image-model-forge.png",
  },
  {
    title: "Prototype with application-focused modules",
    body: "Move faster with modules designed around real-world verticals and product categories",
    imageSrc: "/developer-platform/card-image-modules.png",
  },
];

export function DeveloperPlatformMobile() {
  return (
    <div className="relative w-full">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src="/contact/Fractal%20Glass.png"
          className="absolute inset-0 size-full object-cover opacity-40"
        />
        <div className="absolute inset-x-0 top-0 h-[160px] bg-gradient-to-b from-black/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[160px] bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="relative flex flex-col items-center px-[24px] py-[48px]">
        <h2
          className={`${gilroyMedium.className} max-w-[327px] bg-clip-text text-center text-[28px] leading-[34px] font-medium text-transparent [word-break:break-word] not-italic`}
          style={{
            backgroundImage:
              "linear-gradient(126.324deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
          }}
        >
          Build the impossible today
        </h2>
        <p
          className={`${interRegular.className} mt-[16px] max-w-[327px] text-center text-[14px] leading-[22px] font-normal text-white opacity-80 not-italic`}
        >
          Don&apos;t let legacy design limit your roadmap. Discover the
          market-differentiating features of the GPX10 and what&apos;s coming
          next.
        </p>

        <div className="mt-[28px] flex w-full flex-col gap-[14px]">
          {MOBILE_CARDS.map((card) => (
            <article
              key={card.title}
              className="relative flex flex-col gap-[12px] overflow-clip border-[1.5px] border-solid border-transparent bg-[#dbe8c8] p-[20px]"
            >
              <p
                className={`${interRegular.className} text-[14px] leading-[20px] font-normal text-[#0a3315] not-italic`}
              >
                {card.title}
              </p>
              <div className="relative h-0 w-[80px]">
                <div className="absolute inset-[-1px_0_0_0]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src="/developer-platform/line-88.svg"
                    className="block size-full max-w-none"
                    aria-hidden
                  />
                </div>
              </div>
              <p
                className={`${gilroyMedium.className} text-[16px] leading-[22px] font-medium text-[#0a3315] opacity-90 not-italic`}
              >
                {card.body}
              </p>
              {card.imageSrc ? (
                <div className="relative mt-[4px] h-[140px] w-full">
                  <Image
                    src={card.imageSrc}
                    alt=""
                    fill
                    className="object-contain object-center"
                    sizes="279px"
                  />
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
