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

      <div className="relative flex flex-col items-center py-[48px]">
        <div className="relative inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start leading-[0]">
          <h2
            className={`${gilroyMedium.className} relative col-start-1 row-start-1 mt-[7px] ml-[3px] w-[350px] bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic whitespace-pre-wrap`}
            style={{
              backgroundImage:
                "linear-gradient(107.454deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
            }}
          >
            Build the <br />
            impossible today
          </h2>
          
          <div className="relative col-start-1 row-start-1 mt-0 ml-[353.65px] flex size-[4px] items-center justify-center">
            <div className="rotate-180 flex-none">
              <div className="relative size-[4px]">
                <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                  <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
                </div>
              </div>
            </div>
          </div>
          <div className="relative col-start-1 row-start-1 mt-[70px] ml-[353.65px] flex size-[4px] items-center justify-center">
            <div className="-scale-y-100 rotate-180 flex-none">
              <div className="relative size-[4px]">
                <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                  <Image src="/hero/corner-tag-2.svg" alt="" fill className="object-contain" aria-hidden />
                </div>
              </div>
            </div>
          </div>
          <div className="relative col-start-1 row-start-1 mt-[70px] ml-0 size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
            </div>
          </div>
          <div className="relative col-start-1 row-start-1 mt-0 ml-0 flex size-[4px] items-center justify-center">
            <div className="-scale-y-100 flex-none">
              <div className="relative size-[4px]">
                <div className="absolute inset-[0_0_-12.5%_-12.5%]">
                  <Image src="/hero/corner-tag-1.svg" alt="" fill className="object-contain" aria-hidden />
                </div>
              </div>
            </div>
          </div>
        </div>

        <p
          className={`${interRegular.className} mt-[10px] w-[350px] text-center text-[14px] leading-[16px] font-normal text-white not-italic [word-break:break-word] px-[12px]`}
        >
          Don&apos;t let legacy design limit your roadmap. Discover the
          market-differentiating features of the GPX10 and what&apos;s coming
          next.
        </p>

        <div className="mt-[28px] w-full px-[24px]">
          <Image
            src="/mobile/Frame-1984079478.png"
            alt=""
            width={353}
            height={493}
            className="w-full h-auto object-contain"
            sizes="100vw"
          />
        </div>
      </div>
    </div>
  );
}
