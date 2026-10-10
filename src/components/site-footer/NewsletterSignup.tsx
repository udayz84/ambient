import Image from "next/image";
import { gilroyMedium, interRegular, gilroySemiBold } from "../hero/fonts";
import {
  FALLBACK_NEWSLETTER_HEADING_TOP,
  FALLBACK_NEWSLETTER_HEADING_BOTTOM,
  FALLBACK_NEWSLETTER_SUBTITLE,
  FALLBACK_NEWSLETTER_PLACEHOLDER,
  FALLBACK_NEWSLETTER_BUTTON_LABEL,
} from "./footer-data";
import { NewsletterForm } from "./NewsletterForm";

const cornerLeft = "/hero/corner-tag-1.svg";
const cornerRight = "/hero/corner-tag-2.svg";

export function NewsletterSignup({
  isCompact = false,
  data,
}: {
  isCompact?: boolean;
  data?: any;
}) {
  const headingTop = data?.heading_top || FALLBACK_NEWSLETTER_HEADING_TOP;
  const headingBottom = data?.heading_bottom || FALLBACK_NEWSLETTER_HEADING_BOTTOM;
  const headingStr = typeof data?.heading === "string" ? data.heading : null;
  const subtitle = data?.subtitle || FALLBACK_NEWSLETTER_SUBTITLE;
  const placeholder = data?.input_placeholder || FALLBACK_NEWSLETTER_PLACEHOLDER;
  const buttonLabel = data?.button_label || FALLBACK_NEWSLETTER_BUTTON_LABEL;
  const [topLine, bottomLine] = headingStr
    ? splitHeading(headingStr)
    : [headingTop, headingBottom];
  return (
    <div
      className="relative flex w-full max-w-[700px] flex-col items-center px-[24px] py-[40px] sm:px-[40px]"
      data-node-id="2379:1393"
      data-name="Group 90"
    >
      <div className="absolute inset-0 -z-10 w-full h-full">
        <img loading="lazy" decoding="async" src="/home1618873545.png" alt="" className="absolute inset-0 h-full w-full object-fill" />
      </div>
      <div className="relative inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-center leading-[0]">
        <Corner className="absolute top-0 right-0" src={cornerRight} rotate={true} />
        <Corner className="absolute bottom-0 right-0" src={cornerRight} rotate={true} flipY={true} />
        <Corner className="absolute bottom-0 left-0" src={cornerLeft} />
        <Corner className="absolute top-0 left-0" src={cornerLeft} flipY={true} />

        <h2
          className={`${gilroyMedium.className} relative bg-clip-text text-center ${isCompact ? "text-[26px] sm:text-[32px] leading-[1.2]" : "text-[32px] sm:text-[46px] leading-[36px] sm:leading-[1.1]"} font-medium text-[transparent] not-italic px-[16px] py-[8px]`}
          style={{
            backgroundImage:
              "linear-gradient(104.93deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
          }}
        >
          <span className="block bg-clip-text">{topLine}</span>
          <span className="block bg-clip-text">{bottomLine}</span>
        </h2>
      </div>

      <p
        className={`${interRegular.className} relative ${isCompact ? "mt-[8px]" : "mt-[16px] md:mt-[24px]"} w-full text-center ${isCompact ? "text-[14px] sm:text-[16px]" : "text-[16px] sm:text-[18px]"} leading-[1.5] font-normal text-white not-italic [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
      >
        {subtitle}
      </p>

      <NewsletterForm isCompact={isCompact} placeholder={placeholder} buttonLabel={buttonLabel} />
    </div>
  );
}

function splitHeading(heading: string): [string, string] {
  const words = heading.trim().split(/\s+/);
  if (words.length < 2) return [heading, ""];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

function Corner({
  className,
  src,
  rotate,
  flipY,
}: {
  className: string;
  src: string;
  rotate?: boolean;
  flipY?: boolean;
}) {
  return (
    <div className={`flex size-[4px] items-center justify-center ${className}`}>
      <div
        className={`flex-none ${rotate ? "rotate-180" : ""} ${flipY ? "-scale-y-100" : ""}`}
      >
        <div className="relative size-[4px]">
          <div className="absolute inset-[0_0_-12.5%_-12.5%]">
            <Image
              src={src}
              alt=""
              width={4}
              height={4}
              className="block size-full max-w-none"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </div>
  );
}
