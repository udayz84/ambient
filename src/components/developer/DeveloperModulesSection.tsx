import { gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
  CTA_HOVER_GLOW,
  DEVELOPER_MODULES,
  MODULE_IMAGE_OVERLAY,
} from "./developer-data";
import { mediaUrl } from "@/lib/strapi";

const DEFAULT_HEADING = "From bench validation\nto volume production.";
const DEFAULT_SUBTITLE =
  "A seamless toolchain is useless if hardware can&rsquo;t integrate. Move from software validation to deployment instantly with our modular edge ecosystem.";

/**
 * Figma 2438:4587 — "From bench validation to volume production." section.
 * Positioned at 118.305,3183 / 1204×864 within the Developer canvas.
 */
export function DeveloperModulesSection({ data }: { data?: any }) {
  const heading = data?.heading || DEFAULT_HEADING;
  const headingLines = heading.split("\n");
  const subtitle = data?.subtitle || DEFAULT_SUBTITLE;
  const modules =
    data?.modules && Array.isArray(data.modules) && data.modules.length > 0
      ? data.modules
      : DEVELOPER_MODULES;
  return (
    <div
      className="absolute flex flex-col items-center gap-[36px]"
      style={{ left: 118.3046875, top: 3183, width: 1204 }}
      data-node-id="2438:4587"
    >
      {/* Header — 2438:4588 (800 wide, centered) */}
      <div
        className="flex w-[800px] flex-col items-center gap-[24px]"
        data-node-id="2438:4588"
      >
        <div className="relative px-[10px]" data-node-id="2438:4590">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} text-center text-[46px] leading-[49px] font-medium text-white not-italic`}
          >
            {headingLines.map((line: string, i: number) => (
              <span key={i} className="block whitespace-nowrap">
                {line}
              </span>
            ))}
          </h2>
        </div>
        <p
          className={`${interRegular.className} w-[800px] text-center text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic opacity-65`}
        >
          {subtitle}
        </p>
      </div>

      {/* Content row — 2438:4597 (1204 wide, gap 24) */}
      <div
        className="relative flex w-full items-center gap-[24px]"
        data-node-id="2438:4597"
      >
        {modules.map((module: any, i: number) => (
          <ModuleCard
            key={module.title || i}
            module={module}
            fallback={DEVELOPER_MODULES[i] || DEVELOPER_MODULES[0]}
          />
        ))}
      </div>
    </div>
  );
}

function ModuleCard({
  module,
  fallback,
}: {
  module: any;
  fallback: (typeof DEVELOPER_MODULES)[number];
}) {
  const image = mediaUrl(module?.image) || fallback.image;
  const title = module?.title || fallback.title;
  const description = fallback.description;
  const ctaLabel = module?.cta_label || fallback.ctaLabel;
  const ctaHref = module?.cta_href || "#";
  const ctaArrow = fallback.ctaArrow;
  return (
    <div
      className="group relative flex w-[590px] shrink-0 flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] px-[16px] pt-[10px] pb-[20px]"
      data-node-id="2438:4598"
    >
      {/* Image — 2438:4599 (570×400, object-cover + darkening overlay) */}
      <div className="relative h-[400px] w-[570px] shrink-0" data-node-id="2438:4599">
        <div className="pointer-events-none absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={image}
            className="absolute inset-0 size-full max-w-none object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundImage: MODULE_IMAGE_OVERLAY }}
          />
        </div>
      </div>

      {/* News section — 2438:4600 */}
      <div className="flex w-full flex-col items-start gap-[20px]">
        <div className="flex w-full flex-col gap-[10px]">
          <p
            className={`${gilroyMedium.className} w-full text-[22px] leading-[28px] font-medium text-white not-italic`}
          >
            {title}
          </p>
          <p
            className={`${interRegular.className} w-full text-[16px] leading-[24px] font-normal text-[rgba(240,240,240,0.6)] not-italic`}
          >
            {description}
          </p>
        </div>

        <ModuleCta arrow={ctaArrow} href={ctaHref}>{ctaLabel}</ModuleCta>
      </div>

      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </div>
  );
}

/** CTA - glass that transitions to green gradient when the CARD is hovered. */
function ModuleCta({
  children,
  arrow = false,
  href,
}: {
  children: React.ReactNode;
  arrow?: boolean;
  href: string;
}) {
  return (
    <a
      href={href}
      className={`${gilroyMedium.className} ${CTA_HOVER_GLOW} relative flex h-[48px] shrink-0 items-center justify-center gap-[10px] overflow-clip bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px] not-italic transition-[box-shadow,background-color] duration-200 group-hover:bg-transparent`}
      data-node-id="2438:4622"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)] transition-opacity duration-200 group-hover:opacity-100"
      />
      <span className="relative not-italic text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white">
        {children}
      </span>
      {arrow ? (
        <span className="relative size-[6px] shrink-0" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src="/developer/cta-arrow.svg"
            className="absolute inset-0 size-full max-w-none"
          />
        </span>
      ) : null}
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
    </a>
  );
}
