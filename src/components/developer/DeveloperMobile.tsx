import { GreenCtaCorners } from "../shared/GreenCtaCorners";
import { dmMono, gilroyMedium, interRegular } from "../hero/fonts";
import { TagBadge } from "../hero/TagBadge";
import { Corners } from "../shared/Corners";
import { mediaUrl } from "@/lib/strapi";
import {
  ARTICLE_ICON_BG,
  CORNER_LEFT,
  CORNER_RIGHT,
  COPILOT_CARD_BG,
  COPILOT_ICON_BG,
  DeveloperArticle,
  DEVELOPER_ARTICLES,
  DEVELOPER_COPILOTS,
  DEVELOPER_MODULES,
  HERO_TITLE_GRADIENT,
  PRIMARY_CTA_SHADOW,
  SECTION_TITLE_GRADIENT,
} from "./developer-data";

/**
 * Mobile (<1024px) stacked adaptation of the Developer page.
 * Built responsive from the same Figma content (no dedicated mobile frame supplied).
 * Order: hero → code → pipeline → coming-soon → modules → copilots.
 */
export function DeveloperMobile({ data }: { data?: any }) {
  return (
    <div className="relative flex w-full flex-col overflow-hidden">
      <DeveloperHeroMobile data={data?.hero} />
      <DeveloperCodeSectionMobile data={data?.code} />
      <DeveloperPipelineMobile data={data?.pipeline} />
      <DeveloperComingSoonMobile data={data?.coming_soon} />
      <DeveloperModulesMobile data={data?.modules} />
      <DeveloperCopilotsMobile data={data?.copilots} />
    </div>
  );
}

/** Pipeline steps — derived from desktop labels 2900:677. */
const PIPELINE_STEPS = ["Train", "Optimize", "Integrate", "Deploy"] as const;

const HERO_DEFAULT_HEADING = "Model to deployment in 15 Minutes";
const HERO_DEFAULT_SUBTITLE =
  "ModelForge bridges training and deployment. Quantize, compile, and merge neural networks with your firmware.";
const HERO_DEFAULT_PRIMARY = "Download ModelForge SDK";
const HERO_DEFAULT_SECONDARY = "Read the Documentation";

function DeveloperHeroMobile({ data }: { data?: any }) {
  const heading = data?.heading || HERO_DEFAULT_HEADING;
  const subtitle = data?.subtitle || HERO_DEFAULT_SUBTITLE;
  const primaryLabel = data?.primary_button?.label || HERO_DEFAULT_PRIMARY;
  const primaryHref = data?.primary_button?.href || "#";
  const secondaryLabel = data?.secondary_button?.label || HERO_DEFAULT_SECONDARY;
  const secondaryHref = data?.secondary_button?.href || "#";
  return (
    <section className="relative flex w-full flex-col items-center px-[24px] pt-[140px] pb-[56px]">
      <div className="relative w-full px-[10px]">
        <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
        <h2
          className={`${gilroyMedium.className} bg-clip-text text-center text-[32px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
          style={{ backgroundImage: HERO_TITLE_GRADIENT }}
        >
          {heading}
        </h2>
      </div>
      <p
        className={`${interRegular.className} mt-[24px] max-w-[327px] text-center text-[15px] leading-[24px] font-normal text-[#f0f0f0] not-italic`}
      >
        {subtitle}
      </p>
      <div className="mt-[32px] flex w-full flex-col gap-[12px]">
        <a
          href={primaryHref}
          className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-full items-center justify-center overflow-hidden px-[20px] py-[10px]`}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
          />
          <span className="relative text-[14px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
            {primaryLabel}
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
          />
          <GreenCtaCorners />
        </a>
        <a
          href={secondaryHref}
          className={`${gilroyMedium.className} relative flex h-[48px] w-full items-center justify-center bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]`}
        >
          <span className="relative text-[14px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
            {secondaryLabel}
          </span>
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
        </a>
      </div>
    </section>
  );
}

function DeveloperCodeSectionMobile({ data }: { data?: any }) {
  const heading = data?.heading || "Hello world in three lines";
  const subtitle =
    data?.subtitle ||
    "We invisibly map AI cores to your host drop your model straight into your existing application.";
  const rawArticles: any[] = Array.isArray(data?.articles) ? data.articles : [];
  const articles: DeveloperArticle[] =
    rawArticles.length > 0
      ? rawArticles.map((a: any, i: number) => ({
          icon: mediaUrl(a?.icon) || DEVELOPER_ARTICLES[i]?.icon || "",
          title: a?.title || DEVELOPER_ARTICLES[i]?.title || "",
          description:
            a?.description || DEVELOPER_ARTICLES[i]?.description || "",
        }))
      : DEVELOPER_ARTICLES;
  return (
    <section className="relative flex w-full flex-col items-center px-[24px] py-[48px]">
      <div className="relative w-full px-[10px]">
        <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
        <h2
          className={`${gilroyMedium.className} bg-clip-text text-center text-[28px] leading-[34px] font-medium text-transparent not-italic [word-break:break-word]`}
          style={{ backgroundImage: SECTION_TITLE_GRADIENT }}
        >
          {heading}
        </h2>
      </div>
      <p
        className={`${interRegular.className} mt-[16px] max-w-[327px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic opacity-65`}
      >
        {subtitle}
      </p>

      {/* Code editor */}
      <div className="mt-[32px] w-full overflow-clip rounded-[12px] border border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] backdrop-blur-[9.5px]">
        <div className="flex h-[44px] w-full items-center gap-[16px] border-b border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-[16px]">
          <div className="flex h-[10px] items-center gap-[6px]">
            <span className="size-[10px] rounded-full bg-[rgba(251,44,54,0.6)]" />
            <span className="size-[10px] rounded-full bg-[rgba(240,177,0,0.6)]" />
            <span className="size-[10px] rounded-full bg-[rgba(0,201,80,0.6)]" />
          </div>
          <span
            className={`${interRegular.className} text-[13px] leading-[24px] font-normal tracking-[-0.3125px] whitespace-nowrap text-[rgba(255,255,255,0.6)] not-italic`}
          >
            main.c
          </span>
        </div>
        <div className="overflow-x-auto px-[16px] py-[16px]">
          <pre
            className="whitespace-pre text-[12px] leading-[20px] text-[rgba(255,255,255,0.4)]"
            style={{ fontFamily: 'Menlo, Monaco, "Courier New", monospace' }}
          >
{`#include <ambient.h>
#include <sensor_drivers.h>

int main(void) {
    ambient_init();
    sensor_config_t sensor;
    model_t model_obj;
    ambient_load_model(&model_obj, "fall_detect.bin");

    while(1) {
        `}
            <span className="rounded-[2px] bg-[rgba(1,255,0,0.2)] px-[4px] text-[#0f0]">
              ambient_read_i2s_mic
            </span>
            {`(&sensor);
        `}
            <span className="rounded-[2px] bg-[rgba(1,255,0,0.2)] px-[4px] text-[#0f0]">
              ambient_run_fft
            </span>
            {`(&sensor);
        `}
            <span className="rounded-[2px] bg-[rgba(1,255,0,0.2)] px-[4px] text-[#0f0]">
              run_ai_inference
            </span>
            {`(&model_obj);
        if(model_obj.result > THRESHOLD) {
            trigger_alert();
        }
    }
}`}
          </pre>
        </div>
      </div>

      {/* Articles */}
      <div className="mt-[24px] flex w-full flex-col gap-[16px]">
        {articles.map((article) => (
          <div
            key={article.title}
            className="relative flex items-start gap-[16px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.2)] p-[16px]"
          >
            <div
              className="relative h-[44px] w-[44px] shrink-0 overflow-clip rounded-[10px]"
              style={{
                backgroundImage: ARTICLE_ICON_BG,
                backgroundColor: "#1d221c",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                aria-hidden
                src={article.icon}
                className="absolute left-1/2 top-1/2 size-[22px] -translate-x-1/2 -translate-y-1/2 object-contain"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
              <p
                className={`${gilroyMedium.className} text-[18px] leading-[24px] font-medium text-white not-italic [word-break:break-word]`}
              >
                {article.title}
              </p>
              <p
                className={`${interRegular.className} text-[13px] leading-[20px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}
              >
                {article.description}
              </p>
            </div>
            <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          </div>
        ))}
      </div>
    </section>
  );
}

function DeveloperPipelineMobile({ data }: { data?: any }) {
  const tagText = data?.tag?.text || "Real-time AI at edge";
  const heading = data?.heading || "The ModelForge Pipeline";
  const rawTabs: any[] = Array.isArray(data?.tabs) ? data.tabs : [];
  const steps: string[] =
    rawTabs.length > 0
      ? rawTabs.map((t: any, i: number) => t?.label || PIPELINE_STEPS[i] || "")
      : ([...PIPELINE_STEPS] as string[]);
  return (
    <section className="relative flex w-full flex-col items-center px-[24px] py-[48px]">
      <TagBadge
        label={tagText}
        width={180}
        labelOffsetX={74.5}
        rightBarLeft={170.48046875}
      />

      <div className="relative mt-[24px] w-full px-[10px]">
        <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
        <h2
          className={`${gilroyMedium.className} bg-clip-text text-center text-[28px] leading-[34px] font-medium text-transparent not-italic [word-break:break-word]`}
          style={{ backgroundImage: SECTION_TITLE_GRADIENT }}
        >
          {heading}
        </h2>
      </div>

      {/* Step list — vertical adaptation of the horizontal diagram 2900:787 */}
      <div className="relative mt-[24px] flex w-full flex-col overflow-hidden border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.2)]">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`relative flex items-center gap-[16px] px-[16px] py-[16px] ${
              index !== 0 ? "border-t-[0.5px] border-solid border-[rgba(240,240,240,0.2)]" : ""
            }`}
          >
            <span
              className={`${dmMono.className} text-[14px] leading-[20px] font-normal tracking-[-0.3px] text-[#6ced3f] not-italic`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className={`${interRegular.className} text-[18px] leading-[24px] font-normal uppercase text-[#f0f0f0] not-italic [word-break:break-word]`}
            >
              {step}
            </span>
          </div>
        ))}
        <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      </div>
    </section>
  );
}

const COMING_DEFAULT_HEADING_LINE_1 = "Test on the metal,";
const COMING_DEFAULT_HEADING_LINE_2 = "without the metal.";
const COMING_DEFAULT_SUBTITLE =
  "Validate your build in a virtual sandbox, no need to wait for hardware.";
const COMING_DEFAULT_CARD_TITLE = "Virtual Sandbox Coming Soon";
const COMING_DEFAULT_CARD_DESC =
  "Complete virtual validation environment for testing your builds before hardware arrives.";
const COMING_DEFAULT_CTA = "Join the Virtual Sandbox Waitlist";
const COMING_DEFAULT_IMG = "/developer/sandbox-image.png";

function DeveloperComingSoonMobile({ data }: { data?: any }) {
  const heading = data?.heading || `${COMING_DEFAULT_HEADING_LINE_1}\n${COMING_DEFAULT_HEADING_LINE_2}`;
  const headingLines = heading.split("\n");
  const subtitle = data?.subtitle || COMING_DEFAULT_SUBTITLE;
  const cardTitle = data?.card_title || COMING_DEFAULT_CARD_TITLE;
  const cardDescription = data?.card_description || COMING_DEFAULT_CARD_DESC;
  const ctaLabel = data?.cta_label || COMING_DEFAULT_CTA;
  const ctaHref = data?.cta_href || "#";
  const imgSrc = mediaUrl(data?.image) || COMING_DEFAULT_IMG;
  return (
    <section className="relative flex w-full flex-col items-center px-[24px] py-[48px]">
      <div className="relative w-full px-[10px]">
        <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
        <h2
          className={`${gilroyMedium.className} text-center text-[28px] leading-[34px] font-medium text-white not-italic [word-break:break-word]`}
        >
          {headingLines.map((line: string, i: number) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>
      </div>
      <p
        className={`${interRegular.className} mt-[16px] max-w-[327px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic opacity-85`}
      >
        {subtitle}
      </p>

      {/* Article card — 2438:4646 */}
      <div className="relative mt-[24px] flex w-full flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0)] px-[16px] pt-[24px] pb-[24px]">
        <div className="relative h-[173px] w-[175px] max-w-full shrink-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={imgSrc}
            className="absolute inset-0 size-full object-contain"
          />
        </div>
        <div className="flex w-full flex-col items-center gap-[10px] text-center">
          <p
            className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
          >
            {cardTitle}
          </p>
          <p
            className={`${interRegular.className} max-w-[327px] text-[16px] leading-[24px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}
          >
            {cardDescription}
          </p>
        </div>

        {/* CTA — 2438:4651 */}
        <a
          href={ctaHref}
          className={`${PRIMARY_CTA_SHADOW} ${gilroyMedium.className} relative flex h-[48px] w-full items-center justify-center gap-[10px] overflow-hidden px-[20px] py-[10px]`}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
          />
          <span className="relative flex items-center gap-[10px]">
            <span className="text-[13px] leading-[20px] font-medium uppercase whitespace-nowrap text-white not-italic">
              {ctaLabel}
            </span>
            <span className="relative size-[18px] shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src="/developer/waitlist-icon.svg"
                className="absolute inset-0 size-full max-w-none object-contain"
              />
            </span>
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
          />
          <GreenCtaCorners />
        </a>

        <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      </div>
    </section>
  );
}

/* ── Modules section (mobile) ─────────────────────────────────── */
function DeveloperModulesMobile({ data }: { data?: any }) {
  const heading = data?.heading || "From bench validation\nto volume production.";
  const headingLines = heading.split("\n");
  const subtitle =
    data?.subtitle ||
    "A seamless toolchain is useless if hardware can&rsquo;t integrate. Move from software validation to deployment instantly with our modular edge ecosystem.";
  const modules =
    data?.modules && Array.isArray(data.modules) && data.modules.length > 0
      ? data.modules
      : DEVELOPER_MODULES;
  return (
    <section className="relative flex w-full flex-col items-center px-[24px] py-[48px]">
      <div className="relative w-full px-[10px]">
        <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
        <h2
          className={`${gilroyMedium.className} text-center text-[28px] leading-[34px] font-medium text-white not-italic [word-break:break-word]`}
        >
          {headingLines.map((line: string, i: number) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>
      </div>
      <p
        className={`${interRegular.className} mt-[16px] max-w-[327px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic opacity-65`}
      >
        {subtitle}
      </p>

      <div className="mt-[24px] flex w-full flex-col gap-[20px]">
        {modules.map((module: any, i: number) => {
          const fallback = DEVELOPER_MODULES[i] || DEVELOPER_MODULES[0];
          const image = mediaUrl(module?.image) || fallback.image;
          const title = module?.title || fallback.title;
          const description = module?.description || fallback.description;
          const ctaLabel = module?.cta_label || fallback.ctaLabel;
          const ctaHref = module?.cta_href || "#";
          const ctaArrow = fallback.ctaArrow;
          return (
            <div
              key={title || i}
              className="relative flex flex-col items-center gap-[16px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] px-[16px] pt-[16px] pb-[20px]"
            >
              <div className="relative h-[200px] w-full shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={image}
                  className="absolute inset-0 size-full object-contain"
                />
              </div>
              <div className="flex w-full flex-col items-start gap-[16px]">
                <div className="flex w-full flex-col gap-[8px]">
                  <p
                    className={`${gilroyMedium.className} text-[20px] leading-[26px] font-medium text-white not-italic [word-break:break-word]`}
                  >
                    {title}
                  </p>
                  <p
                    className={`${interRegular.className} text-[13px] leading-[20px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}
                  >
                    {description}
                  </p>
                </div>
                <a
                  href={ctaHref}
                  className={`${gilroyMedium.className} relative flex h-[44px] w-full shrink-0 items-center justify-center gap-[8px] bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]`}
                >
                  <span className="relative text-[13px] leading-[20px] font-medium uppercase whitespace-nowrap text-white not-italic">
                    {ctaLabel}
                  </span>
                  {ctaArrow ? (
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
              </div>
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── Copilots section (mobile) ────────────────────────────────── */
function DeveloperCopilotsMobile({ data }: { data?: any }) {
  const heading = data?.heading || "Your deployment co-pilots.";
  const subtitle =
    data?.subtitle ||
    "A seamless toolchain is useless if hardware can&rsquo;t integrate. Move from software validation to deployment instantly with our modular edge ecosystem.";
  const copilots =
    data?.copilots && Array.isArray(data.copilots) && data.copilots.length > 0
      ? data.copilots
      : DEVELOPER_COPILOTS;
  return (
    <section className="relative flex w-full flex-col items-center px-[24px] py-[48px]">
      <div className="relative w-full px-[10px]">
        <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
        <h2
          className={`${gilroyMedium.className} bg-clip-text text-center text-[28px] leading-[34px] font-medium text-transparent not-italic [word-break:break-word]`}
          style={{ backgroundImage: SECTION_TITLE_GRADIENT }}
        >
          {heading}
        </h2>
      </div>
      <p
        className={`${interRegular.className} mt-[16px] max-w-[327px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic opacity-65`}
      >
        {subtitle}
      </p>

      <div className="mt-[24px] flex w-full flex-col gap-[20px]">
        {copilots.map((copilot: any, i: number) => {
          const fallback = DEVELOPER_COPILOTS[i] || DEVELOPER_COPILOTS[0];
          const icon = mediaUrl(copilot?.icon) || fallback.icon;
          const title = copilot?.title || fallback.title;
          const description = copilot?.description || fallback.description;
          const ctaLabel = copilot?.cta_label || fallback.ctaLabel;
          const ctaHref = copilot?.cta_href || "#";
          return (
            <div
              key={title || i}
              className="relative flex flex-col gap-[16px] overflow-clip p-[24px]"
              style={{ backgroundImage: COPILOT_CARD_BG }}
            >
              <div
                className="relative size-[56px] shrink-0 rounded-[12px]"
                style={{ backgroundImage: COPILOT_ICON_BG }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={icon}
                  aria-hidden
                  className="absolute left-1/2 top-1/2 size-[36px] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain"
                />
              </div>
              <div className="flex w-full flex-col gap-[10px]">
                <p
                  className={`${gilroyMedium.className} text-[20px] leading-[26px] font-medium text-white not-italic [word-break:break-word]`}
                >
                  {title}
                </p>
                <p
                  className={`${interRegular.className} text-[13px] leading-[20px] font-normal text-white not-italic opacity-65 [word-break:break-word]`}
                >
                  {description}
                </p>
              </div>
              <a
                href={ctaHref}
                className={`${gilroyMedium.className} relative flex h-[44px] w-full shrink-0 items-center justify-center bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]`}
              >
                <span className="relative text-center text-[13px] leading-[20px] font-medium uppercase whitespace-nowrap text-white not-italic">
                  {ctaLabel}
                </span>
                <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
              </a>
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
