import { COMPANY_FULL_BLEED_BG_CLASS } from "./company-full-bleed-bg";

export function CompanyFooterBackdrop() {
  return (
    <div
      className={`pointer-events-none absolute top-0 z-0 h-[720px] overflow-hidden opacity-60 ${COMPANY_FULL_BLEED_BG_CLASS} relative`}
      data-name="image 106"
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/careers/footer-bg.png"
        alt=""
        className="absolute inset-0 size-full object-cover object-top"
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(-90deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 59.236%), linear-gradient(-90deg, rgba(0, 0, 0, 0.2) 50%, rgb(0, 0, 0) 99.999%)",
        }}
      />
    </div>
  );
}
