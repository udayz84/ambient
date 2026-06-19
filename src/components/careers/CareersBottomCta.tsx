import { CornerDecor } from "../contact/contact-shared";
import { gilroyMedium } from "../hero/fonts";
import { CareersGreenCta, CareersWhiteCta } from "./careers-shared";

export function CareersBottomCta({ offsetY = 0 }: { offsetY?: number }) {
  return (
    <section
      className="absolute top-[5097px] left-1/2 z-20 flex w-[728px] flex-col items-center transition-transform duration-300 ease-out"
      style={{ transform: `translate(-50%, -${offsetY}px)` }}
      data-node-id="2379:8821"
      aria-label="Ready to build the future of compute"
    >
      <div className="relative h-[126px] w-[708px] shrink-0">
        <h2
          className={`${gilroyMedium.className} absolute top-[7.47px] left-1/2 w-[708px] -translate-x-1/2 bg-clip-text text-center text-[49px] leading-[60px] font-medium tracking-[-0.98px] text-transparent not-italic [word-break:break-word]`}
          style={{
            backgroundImage:
              "linear-gradient(110.887deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
          data-node-id="2379:8822"
        >
          Ready to build the future of compute?
        </h2>
        <CornerDecor />
      </div>

      <div className="mt-[39px] flex items-center gap-[30px]">
        <CareersGreenCta href="#" width="w-[170px]" textLeft="left-[38px]" dotLeft="left-[126px]">
          APPLY NOW
        </CareersGreenCta>
        <CareersWhiteCta href="#" width="w-[170px]">
          REFER A CANDIDATE
        </CareersWhiteCta>
      </div>
    </section>
  );
}
