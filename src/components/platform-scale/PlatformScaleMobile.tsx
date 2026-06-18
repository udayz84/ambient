import Image from "next/image";
import { gilroyMedium, interMedium, interRegular } from "../hero/fonts";
import { GPX_PRODUCTS } from "./platform-scale-data";
import { Corners } from "../shared/Corners";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

export function PlatformScaleMobile() {
  return (
    <div className="relative w-full">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <Image
          src="/platform-scale/bg-image-69.png"
          alt=""
          fill
          className="object-cover object-center opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
      </div>

      <div className="relative flex flex-col items-center px-[24px] py-[48px]">
        <h2
          className={`${gilroyMedium.className} max-w-[327px] bg-clip-text text-center text-[30px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic`}
          style={{
            backgroundImage:
              "linear-gradient(100.945deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
          }}
        >
          One platform, infinite scale
        </h2>
        <p
          className={`${interRegular.className} mt-[16px] max-w-[327px] text-center text-[14px] leading-[22px] font-normal text-[#f0f0f0] opacity-65 not-italic`}
        >
          A modular compute fabric for your entire product roadmap, from a
          microwatt edge array to a hyperscaler server grid, without ever
          changing your software
        </p>

        <div className="mt-[28px] flex w-full snap-x snap-mandatory gap-[14px] overflow-x-auto pb-[8px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {GPX_PRODUCTS.map((product) => (
            <article
              key={product.id}
              className="relative flex w-[268px] shrink-0 snap-start flex-col items-center overflow-clip border-[0.5px] border-solid border-white/10 bg-[rgba(255,255,255,0.05)] backdrop-blur-[12px]"
            >
              <div className="relative mt-[24px] h-[170px] w-[180px] shrink-0">
                <Image
                  src="/platform-scale/chip-hero.png"
                  alt=""
                  fill
                  className="object-contain object-center"
                  sizes="180px"
                />
              </div>
              <div className="mt-[16px] flex shrink-0 items-center justify-center border-[0.5px] border-solid border-white/15 bg-[rgba(0,0,0,0.4)] px-[16px] py-[6px]">
                <p
                  className={`${gilroyMedium.className} text-center text-[24px] leading-[28px] font-medium tracking-[-0.24px] whitespace-nowrap text-white not-italic`}
                >
                  {product.label}
                </p>
              </div>
              <p
                className={`${interRegular.className} mt-[18px] p-[22px] text-[13px] leading-[20px] font-normal text-[#f0f0f0] opacity-80 not-italic`}
              >
                {product.description}
              </p>
            </article>
          ))}
        </div>

        <a
          href="#"
          className={`${interMedium.className} relative mt-[28px] flex h-[48px] w-full items-center justify-center overflow-hidden ${GREEN_CTA_SHADOW}`}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
          />
          <p className="relative text-[14px] leading-[24px] font-medium whitespace-nowrap text-white uppercase not-italic [word-break:break-word]">
            Explore ambient silicon
          </p>
          <Corners />
        </a>
      </div>
    </div>
  );
}
