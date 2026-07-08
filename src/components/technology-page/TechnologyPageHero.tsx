import { mediaUrl } from "@/lib/strapi";
import { gilroyMedium, interRegular } from "../hero/fonts";
import { TagBadge } from "../hero/TagBadge";
import { GradientTitle, CornerDecor } from "../contact/contact-shared";

const HERO_BG = "/technology/hero-bg.png";
const HERO_OBJECT = "/technology/hero-object.png";

const TITLE_GRADIENT_DEG = "109.122deg";

const FALLBACK_TAG = "Architecture · A-Cube";
const FALLBACK_TITLE = "Meet A-Cube. AI-native, from the metal up.";
const FALLBACK_DESCRIPTION =
  "A new architecture for AI, energy-aware at every layer, scaling from coin cell to cloud.";
const FALLBACK_PRIMARY_LABEL = "Read the Whitepaper";
const FALLBACK_SECONDARY_LABEL = "Watch the 3-min Explainer";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

function ReadWhitepaperCta({
  fullWidth = false,
  label,
  href = "#",
}: {
  fullWidth?: boolean;
  label: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className={`${gilroyMedium.className} ${GREEN_CTA_SHADOW} relative block h-[48px] ${fullWidth ? "w-full" : "w-[223px]"} shrink-0`}
      data-node-id="2931:1448"
      data-name="Cta"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
      />
      <span className="absolute top-[calc(50%-14px)] left-1/2 flex -translate-x-1/2 items-center text-[16px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic">
        {label}
      </span>
      <CornerDecor />
    </a>
  );
}

function WatchExplainerCta({
  fullWidth = false,
  label,
  href = "#",
}: {
  fullWidth?: boolean;
  label: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className={`${gilroyMedium.className} relative block h-[48px] ${fullWidth ? "w-full" : "w-[263px]"} shrink-0 overflow-clip bg-[rgba(226,241,202,0.12)] px-[20px] py-[10px]`}
      data-node-id="2931:1459"
      data-name="CTA - Secondary"
    >
      <span className="relative flex h-full items-center text-[16px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic">
        {label}
      </span>
      <CornerDecor />
    </a>
  );
}

export function TechnologyPageHero({ data }: { data?: any } = {}) {
  const tagText = data?.tag?.text || FALLBACK_TAG;
  const titleText = data?.title || FALLBACK_TITLE;
  const descText = data?.subtitle || FALLBACK_DESCRIPTION;
  const primaryLabel = data?.primary_button?.label || FALLBACK_PRIMARY_LABEL;
  const primaryHref = data?.primary_button?.href || "#";
  const secondaryLabel =
    data?.secondary_button?.label || FALLBACK_SECONDARY_LABEL;
  const secondaryHref = data?.secondary_button?.href || "#";
  const bgSrc = mediaUrl(data?.background_image) || HERO_BG;
  const objectSrc = mediaUrl(data?.hero_object) || HERO_OBJECT;

  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      data-node-id="2921:2682"
      aria-label="Technology hero"
    >
      {/* DESKTOP (>=1024px) — pixel-perfect from Figma node 2921:2682 (hero region) */}
      <div className="relative hidden h-[687px] w-full max-w-[1440px] min-[1024px]:block">
        {/* 2971:1200 — full-bleed hero background image (bleeds up behind navbar) */}
        <div
          className="pointer-events-none absolute top-[-92.16px] left-0 h-[779.11px] w-[1440px] overflow-hidden"
          data-node-id="2971:1200"
          data-name="image - hero bg"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bgSrc}
            alt=""
            className="absolute top-0 left-0 h-[119.16%] w-full max-w-none"
            aria-hidden
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-[43.649%] from-[rgba(0,0,0,0)] to-black"
          />
          {/* Fade left/right edges into the black background on ultrawide screens */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 hidden w-[300px] bg-gradient-to-r from-black to-transparent min-[1441px]:block"
          />
          <div
            aria-hidden
            className="absolute inset-y-0 right-0 hidden w-[300px] bg-gradient-to-l from-black to-transparent min-[1441px]:block"
          />
        </div>

        {/* 2971:1206 — hero chip object */}
        <div
          className="pointer-events-none absolute top-[130.13px] left-[568px] h-[352.11px] w-[325px]"
          data-node-id="2971:1206"
          data-name="Object"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={objectSrc}
            alt=""
            className="absolute inset-0 size-full max-w-none object-contain object-bottom"
            aria-hidden
          />
        </div>

        {/* 2931:1430 — eyebrow tag */}
        <div
          className="absolute top-[463.87px] left-[115.78px] h-[27px] w-[192px]"
          data-node-id="2931:1430"
          data-name="Menu Container"
        >
          <TagBadge
            label={tagText}
            width={192}
            labelOffsetX={0}
            rightBarLeft={182.15}
            centerLabel
            nodeId="2931:1431"
          />
        </div>

        {/* 2931:1428 — title */}
        <div
          className="absolute top-[518.46px] left-[115.78px] h-[98px] w-[525.32px]"
          data-node-id="2931:1428"
          data-name="Title"
        >
          <GradientTitle
            gradientDeg={TITLE_GRADIENT_DEG}
            nodeId="2931:1428"
            className="h-[98px] w-[525.32px]"
          >
            {titleText}
          </GradientTitle>
        </div>

        {/* 2931:1429 — description (right-aligned) */}
        <p
          className={`${interRegular.className} absolute top-[500.46px] left-[882.64px] h-[48px] w-[486px] text-right text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-80 not-italic [word-break:break-word]`}
          data-node-id="2931:1429"
          data-name="Description"
        >
          {descText}
        </p>

        {/* 2931:1447 — CTAs */}
        <div
          className="absolute top-[568.46px] left-[858.64px] flex h-[48px] w-[510px] items-start gap-[24px]"
          data-node-id="2931:1447"
          data-name="Frame 1984079464"
        >
          <ReadWhitepaperCta label={primaryLabel} href={primaryHref} />
          <WatchExplainerCta label={secondaryLabel} href={secondaryHref} />
        </div>
      </div>

      {/* MOBILE (<1024px) — basic responsive version */}
      <div className="relative flex min-h-[560px] w-full flex-col items-center overflow-hidden min-[1024px]:hidden">
        {/* Background image */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bgSrc}
            alt=""
            className="size-full max-w-none object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 flex w-full flex-col items-center gap-[20px] px-[24px] pt-[72px] pb-[64px]">
          <TagBadge
            label={tagText}
            width={192}
            labelOffsetX={0}
            rightBarLeft={182.15}
            centerLabel
            nodeId="2931:1431"
          />

          <div
            className={`${gilroyMedium.className} w-full max-w-[327px] bg-clip-text text-center text-[34px] leading-[39px] font-medium text-transparent not-italic [word-break:break-word]`}
            style={{
              backgroundImage: `linear-gradient(${TITLE_GRADIENT_DEG}, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            data-node-id="2931:1428"
          >
            {titleText}
          </div>

          <p
            className={`${interRegular.className} w-full max-w-[327px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-80 not-italic`}
          >
            {descText}
          </p>

          <div className="mt-[8px] flex w-full max-w-[327px] flex-col items-stretch gap-[12px]">
            <ReadWhitepaperCta
              fullWidth
              label={primaryLabel}
              href={primaryHref}
            />
            <WatchExplainerCta
              fullWidth
              label={secondaryLabel}
              href={secondaryHref}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
