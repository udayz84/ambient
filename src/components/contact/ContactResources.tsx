import { interMedium } from "../hero/fonts";
import { CornerDecor, GreenCtaButton, WhiteCtaButton } from "./contact-shared";

export function ContactResources() {
  return (
    <div
      className="absolute top-[547px] left-1/2 z-10 flex w-[898px] -translate-x-1/2 flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.5)] bg-[rgba(0,0,0,0.2)] p-[24px]"
      data-node-id="2379:8413"
      data-name="Article"
    >
      <CornerDecor />
      <p
        className={`${interMedium.className} w-full shrink-0 text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
        data-node-id="2379:8416"
      >
        Looking for immediate resources?
      </p>
      <div className="flex shrink-0 gap-[20px] items-start" data-node-id="2379:8421">
        <GreenCtaButton width="270px" href="#">
          Download Datasheets & SDK
        </GreenCtaButton>
        <WhiteResourceCta>Download Press Kit</WhiteResourceCta>
        <WhiteResourceCta>Case Studies & Whitepapers</WhiteResourceCta>
      </div>
    </div>
  );
}

function WhiteResourceCta({ children }: { children: React.ReactNode }) {
  return (
    <WhiteCtaButton href="#" className="w-[270px]">
      {children}
    </WhiteCtaButton>
  );
}
