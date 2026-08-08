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

const HERO_DEFAULT_HEADING = "Model to deployment\nin 15 Minutes ";
const HERO_DEFAULT_SUBTITLE =
  "ModelForge bridges training and deployment. Quantize, compile, and merge neural networks with your firmware.";
const HERO_DEFAULT_PRIMARY = "Download ModelForge SDK";
const HERO_DEFAULT_SECONDARY = "Read the Documentation";

/**
 * Figma 4032:19041 — Developer hero (mobile, 393×700 frame).
 * Layout: title+subtitle content (gap 15px) → hero image (360px) → CTAs (gap 16px).
 */
function DeveloperHeroMobile({ data }: { data?: any }) {
  const heading = data?.heading || HERO_DEFAULT_HEADING;
  const headingLines = heading.split("\n");
  const subtitle = data?.subtitle || HERO_DEFAULT_SUBTITLE;
  const primaryLabel = data?.primary_button?.label || HERO_DEFAULT_PRIMARY;
  const primaryHref = data?.primary_button?.href || "#";
  const secondaryLabel = data?.secondary_button?.label || HERO_DEFAULT_SECONDARY;
  const secondaryHref = data?.secondary_button?.href || "#";
  const bgImg = mediaUrl(data?.background_image) || "/developer/hero-bg-3.png";
  return (
    <section className="relative flex w-full flex-col items-center pt-[20px]">
      {/* Content block — 4032:21985 (x20 y0 w352 h193) */}
      <div className="flex w-full flex-col items-center gap-[15px] px-[20px]">
        {/* Title group — 4032:21986 (w352 h115) */}
        <div className="relative flex w-full justify-center">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              backgroundImage:
                "linear-gradient(100.88deg, rgb(255, 255, 255) 1.35%, rgb(212, 233, 188) 55.16%, rgb(255, 255, 255) 111.67%)",
            }}
          >
            {headingLines.map((line: string, i: number) => (
              <span key={i} className="block leading-[36px]">
                {line}
              </span>
            ))}
          </h2>
        </div>
        {/* Subtitle — 4032:21992 (x8 y130 w336 h63) */}
        <p
          className={`${interRegular.className} w-[336px] max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic`}
        >
          {subtitle}
        </p>
      </div>

      {/* Background hero image — 4032:21994 (x-17 y208 w428 h360) */}
      <div className="relative mt-[15px] h-[360px] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={bgImg}
          className="absolute inset-0 size-full object-cover"
          aria-hidden
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgb(0, 0, 0) 1.53%, rgba(0, 0, 0, 0) 19.44%), linear-gradient(184.76deg, rgba(0, 0, 0, 0) 65.85%, rgb(0, 0, 0) 99.32%)",
          }}
        />
      </div>

      {/* CTA block — 4032:21996 (x65 y588 w263 h112) */}
      <div className="mt-[20px] flex w-[263px] flex-col gap-[16px] pb-[24px]">
        {/* Primary CTA — 4032:21997 (w263 h48) */}
        <a
          href={primaryHref}
          className={`${gilroyMedium.className} relative flex h-[48px] w-full items-center justify-center overflow-hidden px-[20px] py-[10px] shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
          />
          <span className="relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
            {primaryLabel}
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
          />
          <GreenCtaCorners />
        </a>
        {/* Secondary CTA — 4032:22008 (w263 h48) */}
        <a
          href={secondaryHref}
          className={`${gilroyMedium.className} relative flex h-[48px] w-full items-center justify-center overflow-clip bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]`}
        >
          <span className="relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
            {secondaryLabel}
          </span>
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
        </a>
      </div>
    </section>
  );
}

/**
 * Figma 4034:22268 — Developer code section (mobile, 393×1530 frame).
 * Layout: title+subtitle (gap 10px) → code editor (650px) → articles (gap 16px).
 */
function DeveloperCodeSectionMobile({ data }: { data?: any }) {
  const heading = data?.heading || "Hello world in\nthree lines";
  const headingLines = heading.split("\n");
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
    <section className="relative flex w-full flex-col items-center overflow-hidden px-[19px] pt-[30px] pb-[40px]">
      {/* Section background — circuit texture with Figma gradient overlays */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('/developer/Gemini_Generated_Image_6dyqpp6dyqpp6dyq 5.png')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 25.15%), linear-gradient(180deg, rgba(0, 0, 0, 0) 39.82%, rgb(4, 4, 4) 64.81%)",
          }}
        />
      </div>

      {/* Content block — 4034:22272 (title + subtitle, gap 10px) */}
      <div className="flex w-full flex-col items-center gap-[10px]">
        {/* Title group — 4034:22273 */}
        <div className="relative flex w-full justify-center">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              backgroundImage:
                "linear-gradient(107.45deg, rgb(255, 255, 255) 1.35%, rgb(212, 233, 188) 55.16%, rgb(255, 255, 255) 111.67%)",
            }}
          >
            {headingLines.map((line: string, i: number) => (
              <span key={i} className="block leading-[36px]">
                {line}
              </span>
            ))}
          </h2>
        </div>
        {/* Subtitle — 4034:22279 */}
        <p
          className={`${interRegular.className} w-[336px] max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic`}
        >
          {subtitle}
        </p>
      </div>

      {/* Code editor — 4034:22332 (w355 h650 rounded-16 border-1) */}
      <div className="mt-[21px] w-full overflow-clip rounded-[16px] border border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] backdrop-blur-[9.5px]">
        {/* Header — 4034:22333 (px24 pt8 pb9 border-b) */}
        <div className="flex w-full items-center gap-[24px] border-b border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-[24px] pt-[8px] pb-[9px]">
          <div className="flex items-center gap-[8px]">
            <span className="size-[12px] rounded-full bg-[rgba(251,44,54,0.6)]" />
            <span className="size-[12px] rounded-full bg-[rgba(240,177,0,0.6)]" />
            <span className="size-[12px] rounded-full bg-[rgba(0,201,80,0.6)]" />
          </div>
          <span
            className={`${interRegular.className} text-[16px] leading-[24px] font-normal tracking-[-0.3125px] whitespace-nowrap text-[rgba(255,255,255,0.6)] not-italic`}
          >
            main.c
          </span>
        </div>
        {/* Code body — 4034:22341 (DM Mono 11px/15px) */}
        <div className="overflow-x-auto px-[21px] pt-[11px] pb-[14px]">
          <pre
            className={`${dmMono.className} whitespace-pre text-[11px] leading-[15px] text-[rgba(255,255,255,0.4)]`}
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

      {/* Articles — gap 21px from code editor */}
      <div className="mt-[21px] flex w-full flex-col gap-[16px]">
        {articles.map((article) => (
          <div
            key={article.title}
            className="relative flex items-center gap-[16px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.2)] p-[14px]"
          >
            {/* Icon — 50×49 rounded-12 with radial gradient bg */}
            <div
              className="relative h-[49px] w-[50px] shrink-0 overflow-clip rounded-[12px]"
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
                className="absolute left-[13px] top-[13px] size-[24px] max-w-none object-contain"
              />
            </div>
            {/* Text content — gap 6px between title and description */}
            <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
              <p
                className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
              >
                {article.title}
              </p>
              <p
                className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}
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
  "Validate your build in a virtual sandbox,\nno need to wait for hardware.";
const COMING_DEFAULT_CARD_TITLE = "Virtual Sandbox Coming Soon";
const COMING_DEFAULT_CARD_DESC =
  "Complete virtual validation environment for testing your builds before hardware arrives.";
const COMING_DEFAULT_CTA = "Join the Virtual Sandbox Waitlist";
const COMING_DEFAULT_IMG = "/developer/sandbox-image.png";

/**
 * Figma 4035:25438 — Developer "Coming soon" section (mobile, 393×610 frame).
 * Layout: title+subtitle (gap 10px) → article card (image, text, CTA).
 */
function DeveloperComingSoonMobile({ data }: { data?: any }) {
  let heading = data?.heading || `${COMING_DEFAULT_HEADING_LINE_1}\n${COMING_DEFAULT_HEADING_LINE_2}`;
  if (!heading.includes("\n")) {
    heading = heading.replace(" to volume", "\nto volume").replace(", without", ",\nwithout");
  }
  const headingLines = heading.split("\n");
  const subtitle = data?.subtitle || COMING_DEFAULT_SUBTITLE;
  const subtitleLines = subtitle.split("\n");
  const cardTitle = data?.card_title || COMING_DEFAULT_CARD_TITLE;
  const cardDescription = data?.card_description || COMING_DEFAULT_CARD_DESC;
  const ctaLabel = data?.cta_label || COMING_DEFAULT_CTA;
  const ctaHref = data?.cta_href || "#";
  const imgSrc = mediaUrl(data?.image) || COMING_DEFAULT_IMG;
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden px-[19px] pt-[30px]">
      {/* Background image — 4035:25440 (opacity-60, radial fade) */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-full w-[639px] max-w-none -translate-x-1/2 opacity-60">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src="/developer/coming-bg.png"
            className="absolute inset-0 size-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
            }}
          />
        </div>
      </div>

      {/* Content block — 4035:25441 (title + subtitle, gap 10px) */}
      <div className="flex w-full flex-col items-center gap-[10px]">
        {/* Title — 4035:25443 */}
        <div className="relative flex w-full justify-center">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              backgroundImage:
                "linear-gradient(107.45deg, rgb(255, 255, 255) 1.35%, rgb(212, 233, 188) 55.16%, rgb(255, 255, 255) 111.67%)",
            }}
          >
            {headingLines.map((line: string, i: number) => (
              <span key={i} className="block leading-[36px]">
                {line}
              </span>
            ))}
          </h2>
        </div>
        {/* Subtitle — 4035:25448 */}
        <p
          className={`${interRegular.className} w-[336px] max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic`}
        >
          {subtitleLines.map((line: string, i: number) => (
            <span key={i}>
              {i > 0 ? <br aria-hidden /> : null}
              {line}
            </span>
          ))}
        </p>
      </div>

      {/* Article card — 4035:25449 (w355, px16 pt16 pb24, gap20) */}
      <div className="relative mt-[20px] flex w-full flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0)] px-[16px] pt-[16px] pb-[24px]">
        {/* Image — 4035:25450 (140×140) */}
        <div className="relative size-[140px] shrink-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={imgSrc}
            className="absolute inset-0 size-full object-contain"
          />
        </div>
        {/* Text content — 4035:25451 (gap 10px) */}
        <div className="flex w-full flex-col items-center gap-[10px] text-center">
          <p
            className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
          >
            {cardTitle}
          </p>
          <p
            className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}
          >
            {cardDescription}
          </p>
        </div>

        {/* CTA — 4035:25454 (w323 h48, justify-between) */}
        <a
          href={ctaHref}
          className={`${gilroyMedium.className} relative flex h-[48px] w-full items-center justify-between overflow-hidden px-[16px] py-[10px] shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
          />
          <span className="relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
            {ctaLabel}
          </span>
          <span className="relative size-[20px] shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src="/developer/waitlist-icon.svg"
              className="absolute inset-0 size-full max-w-none object-contain"
            />
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

/**
 * Figma 4035:26190 — Developer modules section (mobile, 393×1350 frame).
 * Layout: title+subtitle (gap 10px) → 2 article cards (gap 12px) with images.
 * Card 1 uses primary green CTA; card 2 uses secondary glass CTA.
 */
function DeveloperModulesMobile({ data }: { data?: any }) {
  let heading = data?.heading || "From bench validation\nto volume production.";
  if (!heading.includes("\n")) {
    heading = heading.replace(" to volume", "\nto volume").replace(", without", ",\nwithout");
  }
  const headingLines = heading.split("\n");
  const subtitle =
    data?.subtitle ||
    "A seamless toolchain is useless if hardware can't integrate. Move from software validation to deployment instantly with our modular edge ecosystem.";
  const modules =
    data?.modules && Array.isArray(data.modules) && data.modules.length > 0
      ? data.modules
      : DEVELOPER_MODULES;
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden px-[19px] pt-[30px]">
      {/* Content block — 4035:26193 (title + subtitle, gap 10px) */}
      <div className="flex w-full flex-col items-center gap-[10px]">
        {/* Title — 4035:26195 */}
        <div className="relative flex w-full justify-center">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              backgroundImage:
                "linear-gradient(98.20deg, rgb(255, 255, 255) 1.35%, rgb(212, 233, 188) 55.16%, rgb(255, 255, 255) 111.67%)",
            }}
          >
            {headingLines.map((line: string, i: number) => (
              <span key={i} className="block leading-[36px]">
                {line}
              </span>
            ))}
          </h2>
        </div>
        {/* Subtitle — 4035:26200 */}
        <p
          className={`${interRegular.className} w-[336px] max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic`}
        >
          {subtitle}
        </p>
      </div>

      {/* Cards — 4035:26201 (gap 30px from content, 12px between cards) */}
      <div className="mt-[30px] flex w-full flex-col gap-[12px]">
        {modules.map((module: any, i: number) => {
          const fallback = DEVELOPER_MODULES[i] || DEVELOPER_MODULES[0];
          const image = mediaUrl(module?.image) || fallback.image;
          const title = module?.title || fallback.title;
          const description = module?.description || fallback.description;
          const ctaLabel = module?.cta_label || fallback.ctaLabel;
          const ctaHref = module?.cta_href || "#";
          const isPrimary = !!fallback.ctaArrow;
          return (
            <div
              key={title || i}
              className="relative flex flex-col items-center gap-[12px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] px-[16px] pt-[12px] pb-[20px]"
            >
              {/* Image — 4035:26203 (h≈240) */}
              <div className="relative h-[240px] w-full shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={image}
                  className="absolute inset-0 size-full object-contain"
                />
              </div>
              {/* NewsSection — 4035:26204 (gap 12px) */}
              <div className="flex w-full flex-col gap-[12px]">
                {/* Content — title + description (gap 6px) */}
                <div className="flex w-full flex-col gap-[6px]">
                  <p
                    className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
                  >
                    {title}
                  </p>
                  <p
                    className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}
                  >
                    {description}
                  </p>
                </div>
                {/* CTA — primary green or secondary glass */}
                {isPrimary ? (
                  <a
                    href={ctaHref}
                    className={`${gilroyMedium.className} relative flex h-[48px] w-full items-center justify-center overflow-hidden px-[16px] py-[10px] shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
                    />
                    <span className="relative text-[12px] leading-[16px] font-medium uppercase whitespace-nowrap text-white not-italic">
                      {ctaLabel}
                    </span>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
                    />
                    <GreenCtaCorners />
                  </a>
                ) : (
                  <a
                    href={ctaHref}
                    className={`${gilroyMedium.className} relative flex h-[48px] w-full items-center justify-center overflow-clip bg-[rgba(226,241,202,0.12)] px-[16px] py-[10px]`}
                  >
                    <span className="relative text-[12px] leading-[16px] font-medium uppercase whitespace-nowrap text-white not-italic">
                      {ctaLabel}
                    </span>
                    <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
                  </a>
                )}
              </div>
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

/**
 * Figma 4062:11954 — Developer copilots section (mobile, 393×1440 frame).
 * Layout: title+subtitle (gap 10px) → 3 copilot cards (gap 12px).
 * Cards 1–2 use secondary glass CTA; card 3 uses primary green CTA.
 */
function DeveloperCopilotsMobile({ data }: { data?: any }) {
  const heading = data?.heading || "Your deployment co-pilots.";
  const subtitle =
    data?.subtitle ||
    "A seamless toolchain is useless if hardware can't integrate. Move from software validation to deployment instantly with our modular edge ecosystem.";
  const copilots =
    data?.copilots && Array.isArray(data.copilots) && data.copilots.length > 0
      ? data.copilots
      : DEVELOPER_COPILOTS;
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden px-[19px] pt-[30px]">
      {/* Content block — 4062:11957 (title + subtitle, gap 10px) */}
      <div className="flex w-full flex-col items-center gap-[10px]">
        {/* Title — 4062:11959 */}
        <div className="relative flex w-full justify-center">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              backgroundImage:
                "linear-gradient(106.23deg, rgb(255, 255, 255) 1.35%, rgb(212, 233, 188) 55.16%, rgb(255, 255, 255) 111.67%)",
            }}
          >
            {heading}
          </h2>
        </div>
        {/* Subtitle — 4062:11964 */}
        <p
          className={`${interRegular.className} w-[336px] max-w-full text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-75 not-italic`}
        >
          {subtitle}
        </p>
      </div>

      {/* Cards — 4062:11965 (gap 30px from content, 12px between cards) */}
      <div className="mt-[30px] flex w-full flex-col gap-[12px]">
        {copilots.map((copilot: any, i: number) => {
          const fallback = DEVELOPER_COPILOTS[i] || DEVELOPER_COPILOTS[0];
          const icon = mediaUrl(copilot?.icon) || fallback.icon;
          const title = copilot?.title || fallback.title;
          const description = copilot?.description || fallback.description;
          const ctaLabel = copilot?.cta_label || fallback.ctaLabel;
          const ctaHref = copilot?.cta_href || "#";
          const isPrimary = i === copilots.length - 1;
          return (
            <div
              key={title || i}
              className="relative flex flex-col gap-[16px] overflow-clip p-[24px]"
              style={{ backgroundImage: COPILOT_CARD_BG }}
            >
              {/* Icon — 72×72 rounded-12 with radial gradient bg */}
              <div
                className="relative size-[72px] shrink-0 rounded-[12px]"
                style={{ backgroundImage: COPILOT_ICON_BG }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={icon}
                  aria-hidden
                  className="absolute left-1/2 top-1/2 size-[48px] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain"
                />
              </div>
              {/* Content — title, description, CTA (gap 11px) */}
              <div className="flex w-full flex-col gap-[11px]">
                <p
                  className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
                >
                  {title}
                </p>
                <p
                  className={`${interRegular.className} text-[14px] leading-[19.36px] font-normal text-white opacity-65 not-italic [word-break:break-word]`}
                >
                  {description}
                </p>
                {isPrimary ? (
                  <a
                    href={ctaHref}
                    className={`${gilroyMedium.className} relative flex h-[48px] w-full shrink-0 items-center justify-center overflow-hidden px-[16px] py-[10px] shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]`}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
                    />
                    <span className="relative text-[12px] leading-[16px] font-medium uppercase whitespace-nowrap text-white not-italic">
                      {ctaLabel}
                    </span>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
                    />
                    <GreenCtaCorners />
                  </a>
                ) : (
                  <a
                    href={ctaHref}
                    className={`${gilroyMedium.className} relative flex h-[48px] w-full shrink-0 items-center justify-center overflow-clip bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]`}
                  >
                    <span className="relative text-[12px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
                      {ctaLabel}
                    </span>
                    <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
                  </a>
                )}
              </div>
              <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
