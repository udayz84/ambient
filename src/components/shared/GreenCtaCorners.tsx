import Image from "next/image";
import { AnimatedDotsBackground } from "./AnimatedDotsBackground";

export function GreenCtaCorners({ disableDots }: { disableDots?: boolean }) {
  return (
    <>
      {!disableDots && <AnimatedDotsBackground />}
      <div className="pointer-events-none absolute right-0 top-0 z-20 flex size-[4px] items-center justify-center">
        <div className="-scale-x-100 -scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src="/hero/corner-tag-1.svg" alt="" fill className="block max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute left-0 top-0 z-20 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src="/hero/corner-tag-1.svg" alt="" fill className="block max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 z-20 flex size-[4px] items-center justify-center">
        <div className="-scale-x-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              <Image src="/hero/corner-tag-1.svg" alt="" fill className="block max-w-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 z-20 size-[4px]">
        <div className="absolute inset-[0_0_-12.5%_-12.5%]">
          <Image src="/hero/corner-tag-1.svg" alt="" fill className="block max-w-none" aria-hidden />
        </div>
      </div>
    </>
  );
}
