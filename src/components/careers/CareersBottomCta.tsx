import { CornerDecor } from "../contact/contact-shared";
import { gilroyMedium } from "../hero/fonts";
import { CareersGreenCta, CareersWhiteCta } from "./careers-shared";

export function CareersBottomCta() {
  return (
    <section
      className="relative flex w-full flex-col items-center px-[24px] pt-[40px] pb-[40px] md:px-[80px] md:pt-[80px] md:pb-[60px] lg:pt-[120px] lg:pb-[80px]"
      data-node-id="2379:8821"
      aria-label="Ready to build the future of compute"
    >
      <div className="relative h-auto w-full max-w-[708px] shrink-0">
        <h2
          className={`${gilroyMedium.className} w-full bg-clip-text text-center text-[32px] leading-[40px] font-medium tracking-[-0.64px] text-transparent not-italic [word-break:break-word] md:text-[42px] md:leading-[52px] md:tracking-[-0.84px] lg:text-[49px] lg:leading-[60px] lg:tracking-[-0.98px]`}
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

      <div className="mt-[39px] flex flex-col items-center gap-[16px] sm:flex-row sm:gap-[30px]">
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
