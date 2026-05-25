import { CornerDecor } from "../contact/contact-shared";
import { interMedium } from "../hero/fonts";

const NEWS_CTA_TITLE_GRADIENT =
  "linear-gradient(115.045deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";

const titleLineStyle = {
  backgroundImage: NEWS_CTA_TITLE_GRADIENT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
} as const;

export function ResourcesNewsCta() {
  return (
    <section
      className="absolute top-[3393px] left-[350.89px] z-10 flex w-[728px] flex-col items-center"
      aria-label="Latest news"
      data-node-id="2379:1762"
    >
      <div className="relative h-[126px] w-[728px] shrink-0">
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          data-node-id="2379:1763"
        >
          <span
            className={`${interMedium.className} block bg-clip-text text-[46px] leading-[49px] font-medium text-transparent not-italic`}
            style={titleLineStyle}
          >
            Looking for latest developments,
          </span>
          <span
            className={`${interMedium.className} block bg-clip-text text-[46px] leading-[49px] font-medium text-transparent not-italic`}
            style={titleLineStyle}
          >
            events, and announcements?
          </span>
        </div>
        <CornerDecor />
      </div>

      <div className="mt-[49.47px]" data-node-id="2379:1769">
        <a
          href="#"
          className={`${interMedium.className} relative flex h-[48px] w-[158px] items-center justify-center shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
        >
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-white" />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[length:307.2px_307.2px] bg-top-left opacity-40 mix-blend-plus-lighter"
            style={{ backgroundImage: "url(/resources/news-cta-texture.png)" }}
          />
          <span
            className="relative z-10 text-[16px] leading-[28px] font-medium whitespace-nowrap text-[#121212] uppercase not-italic [word-break:break-word]"
            data-node-id="2379:1770"
          >
            Visit News Page
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
          />
        </a>
      </div>
    </section>
  );
}
