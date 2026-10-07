"use client";

/* eslint-disable @next/next/no-img-element */
import { useFadeIn, getFadeInClass } from "../shared/useFadeIn";
import { gilroyBold, gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { useFitText } from "../shared/FitText";
import { TagBadge } from "../hero/TagBadge";
import { mediaUrl } from "@/lib/strapi";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

const TILE_BG =
  "radial-gradient(circle at 50% 50%, #394a36, #2b3629 50%, #1d221c)";

const BODY =
  "On-device assault and anomaly detection for women's health without battery drain. This innovative approach ensures safety while maintaining device efficiency.";

const OVERLAY_1 =
  "linear-gradient(185.768deg, rgb(0, 0, 0) 6.3744%, rgba(0, 0, 0, 0) 20.894%)";

const OVERLAY_2 =
  "linear-gradient(173.914deg, rgba(0, 0, 0, 0) 55.152%, rgb(0, 0, 0) 87.582%), linear-gradient(166.954deg, rgb(0, 0, 0) 20.261%, rgba(0, 0, 0, 0) 39.737%)";

const BG_OVERLAY =
  "linear-gradient(180deg, rgba(0, 0, 0, 0.4) 50%, rgb(0, 0, 0) 94.479%), linear-gradient(180deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 52.917%)";

const STAT_GRADIENT =
  "linear-gradient(to bottom, rgb(255, 255, 255) 37.312%, rgba(255, 255, 255, 0))";

const FALLBACK_HEADING = "The empirical advantage.";

function FeatureRow() {
  const tile = (
    <div className="flex flex-col items-center justify-center gap-[8px]">
      <div
        className="relative h-[39.31px] w-[40px] shrink-0 overflow-clip rounded-[8.276px]"
        style={{ background: TILE_BG }}
      >
        <img loading="lazy" decoding="async"
          alt=""
          aria-hidden
          src="/applications/wins-icon-small.svg"
          className="absolute left-1/2 top-1/2 size-[27.586px] -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div
        className={`${interRegular.className} text-center text-[14px] leading-[18px] text-[rgba(240,240,240,0.6)] whitespace-nowrap min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
      >
        <p className="leading-[18px]">Always on</p>
        <p className="leading-[18px]">protection</p>
      </div>
    </div>
  );
  const line = (
    <img loading="lazy" decoding="async"
      alt=""
      aria-hidden
      src="/applications/wins-grid-line.svg"
      className="h-[39px] w-[8px] shrink-0"
    />
  );
  return (
    <div className="flex w-full items-center justify-between">
      {tile}
      {line}
      {tile}
      {line}
      {tile}
    </div>
  );
}

function LabelTile() {
  return (
    <div
      className="relative flex size-[46px] shrink-0 items-start overflow-clip rounded-[12px] p-[7px]"
      style={{ background: TILE_BG }}
    >
      <img loading="lazy" decoding="async"
        alt=""
        aria-hidden
        src="/applications/wins-icon.svg"
        className="size-[32px]"
      />
    </div>
  );
}

type WinCardProps = {
  label: string;
  stat: string;
  statLabel: string;
  visual: React.ReactNode;
  body: string;
  buttons?: { label: string; href: string }[];
};

function WinCard({ label, stat, statLabel, visual, body, buttons }: WinCardProps) {
  const { fadeRef, isVisible } = useFadeIn();

  return (
    <div
      ref={fadeRef}
      className={`relative h-[640px] w-[426px] shrink-0 overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-black ${getFadeInClass(isVisible)}`}
      data-name="Container"
    >
      {visual}

      {/* Label */}
      <div className="absolute left-[20.5px] top-[22.5px] flex items-center gap-[12px]">
        <LabelTile />
        <p
          className={`${interRegular.className} text-[18px] leading-[27px] font-normal text-[#f0f0f0] [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}
        >
          {label}
        </p>
      </div>

      {/* Stat + body + features */}
      <div className="absolute left-[20px] top-[317px] flex w-[386px] flex-col gap-[15px]">
        <div className="flex flex-col">
          <p
            className={`${gilroyBold.className} bg-clip-text text-[82px] leading-[100px] tracking-[-1.64px] text-transparent`}
            style={{
              backgroundImage: STAT_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            {stat}
          </p>
          <p
            className={`${gilroyMedium.className} text-[22px] leading-[28px] uppercase text-[#c5f3b5] [word-break:break-word]`}
          >
            {statLabel}
          </p>
        </div>
        <p
          className={`${interRegular.className} text-[16px] leading-[24px] font-normal text-[rgba(240,240,240,0.6)] [word-break:break-word]`}
        >
          {body}
        </p>
        {buttons && buttons.length > 0 && (
          <div className="flex flex-wrap gap-[8px] mt-[10px]">
            {buttons.map((btn: any, i: number) => (
              <a
                key={i}
                href={btn.href || "#"}
                className={`${gilroyMedium.className} flex items-center justify-center border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(226,241,202,0.12)] px-[12px] py-[6px] text-[12px] uppercase text-white hover:bg-[rgba(226,241,202,0.2)] transition-colors`}
              >
                {btn.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function WinCardMobile({ label, stat, statLabel, mobileImg, body, buttons }: { label: string; stat: string; statLabel: string; mobileImg: string; body: string; buttons?: any[] }) {
  const { fadeRef, isVisible } = useFadeIn();

  return (
    <div
      ref={fadeRef}
      className={`relative h-[550px] w-[355px] shrink-0 overflow-clip border-[0.417px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] ${getFadeInClass(isVisible)}`}
      data-name="Container"
    >
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <img loading="lazy" decoding="async" alt="" aria-hidden src={mobileImg} className="absolute inset-0 size-full object-contain p-[40px]" />
        <div className="absolute inset-0" style={{ backgroundImage: OVERLAY_2 }} />
      </div>

      {/* Label */}
      <div className="absolute left-[17.58px] top-[17.58px] z-10 flex items-center gap-[12px]">
        <LabelTile />
        <p className={`${interRegular.className} text-[18px] leading-[27px] font-normal text-[#f0f0f0] [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}>{label}</p>
      </div>

      {/* Stats */}
      <div className="absolute left-[16px] top-[265px] z-10 flex w-[319px] flex-col gap-[12.5px]">
        <div className="flex flex-col">
          <p
            className={`${gilroyBold.className} bg-clip-text text-[52px] leading-[83.333px] tracking-[-1.04px] text-transparent`}
            style={{ backgroundImage: STAT_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text" }}
          >
            {stat}
          </p>
          <p className={`${gilroyMedium.className} text-[22px] leading-[24.167px] uppercase text-[#c5f3b5] [word-break:break-word]`}>{statLabel}</p>
        </div>
        <div className="flex flex-col gap-[11.667px]">
          <p className={`${interRegular.className} text-[14px] leading-[20px] font-normal text-[rgba(240,240,240,0.6)] [word-break:break-word] min-[1024px]:text-[16px] min-[1024px]:leading-[24px]`}>{body}</p>
        </div>
        {buttons && buttons.length > 0 && (
          <div className="flex flex-wrap gap-[8px] mt-[5px]">
            {buttons.map((btn: any, i: number) => (
              <a
                key={i}
                href={btn.href || "#"}
                className={`${gilroyMedium.className} flex items-center justify-center border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(226,241,202,0.12)] px-[12px] py-[6px] text-[12px] uppercase text-white hover:bg-[rgba(226,241,202,0.2)] transition-colors`}
              >
                {btn.label}
              </a>
            ))}
          </div>
        )}
      </div>

      <Corners />
    </div>
  );
}

function VisualWearable({ img = "/applications/wins-img-1.webp" }: { img?: string }) {
  return (
    <div className="absolute left-[111.3px] top-[55.5px] flex size-[342.201px] items-center justify-center mix-blend-lighten">
      <div className="-scale-y-100 rotate-180">
        <div className="relative size-[342.201px]">
          <img loading="lazy" decoding="async"
            alt=""
            aria-hidden
            src={img}
            className="absolute inset-0 size-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundImage: OVERLAY_1 }}
          />
        </div>
      </div>
    </div>
  );
}

function VisualMedical({ img = "/applications/wins-img-2.webp" }: { img?: string }) {
  return (
    <div className="absolute left-[26.82px] top-[-31.2px] size-[389.396px] mix-blend-lighten">
      <div className="absolute inset-0 overflow-hidden">
        <img loading="lazy" decoding="async"
          alt=""
          aria-hidden
          src={img}
          className="absolute inset-0 size-full object-contain px-[40px] pt-[80px] pb-[20px]"
        />
      </div>
      <div className="absolute inset-0" style={{ backgroundImage: OVERLAY_2 }} />
    </div>
  );
}

function VisualAr({ img = "/applications/wins-img-3.webp" }: { img?: string }) {
  return (
    <div className="absolute left-[26.82px] top-[-31.2px] flex size-[389.396px] items-center justify-center mix-blend-lighten">
      <div className="-scale-y-100 rotate-180">
        <div className="relative size-[389.396px]">
          <div className="absolute inset-0 overflow-hidden">
            <img loading="lazy" decoding="async"
              alt=""
              aria-hidden
              src={img}
              className="absolute inset-0 size-full object-contain scale-[0.85]"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{ backgroundImage: OVERLAY_2 }}
          />
        </div>
      </div>
    </div>
  );
}

const WIN_VISUALS = [
  <VisualWearable key="wearable" />,
  <VisualMedical key="medical" />,
  <VisualAr key="ar" />,
];

const CARDS = [
  {
    label: "The Wearable Wins",
    stat: "99%",
    statLabel: "Accurate",
    visual: WIN_VISUALS[0],
    mobileImg: "/applications/wins-img-1.webp",
  },
  {
    label: "The Medical/Safety Wins",
    stat: "6months",
    statLabel: "Battery",
    visual: WIN_VISUALS[1],
    mobileImg: "/applications/wins-img-2.webp",
  },
  {
    label: "The AR/Vision Wins",
    stat: "Zero",
    statLabel: "Latency",
    visual: WIN_VISUALS[2],
    mobileImg: "/applications/wins-img-3.webp",
  },
];

export function ApplicationsPageWins({ data }: { data?: any }) {
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 2 });
  const fitRef2 = useFitText<HTMLHeadingElement>({ maxLines: 2 });
  const heading = data?.heading || FALLBACK_HEADING;
  const body = data?.body || BODY;
  const ctaLabel = data?.cta?.label || "Explore Applications";
  const ctaHref = data?.cta?.href || "#";
  const bgImg = "/applications/wins-bg.webp";

  const rawCards = Array.isArray(data?.cards) ? data.cards : [];
  const cards =
    rawCards.length > 0
      ? rawCards.map((c: any, i: number) => {
          const mobileImg = mediaUrl(c?.image) || CARDS[i]?.mobileImg || "/applications/wins-img-1.webp";
          
          let visual;
          if (i === 0) visual = <VisualWearable img={mobileImg} key="wearable" />;
          else if (i === 1) visual = <VisualMedical img={mobileImg} key="medical" />;
          else if (i === 2) visual = <VisualAr img={mobileImg} key="ar" />;
          else visual = <VisualWearable img={mobileImg} key={`extra-${i}`} />;

          return {
            label: c?.label || CARDS[i]?.label || "",
            stat: c?.stat || CARDS[i]?.stat || "",
            statLabel: c?.stat_label || CARDS[i]?.statLabel || "",
            visual,
            mobileImg,
            body: c?.body || body,
            buttons: Array.isArray(c?.buttons) ? c.buttons : [],
          };
        })
      : CARDS;

  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      aria-label="Wins"
    >
      {/* Full-bleed background image 124 */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <img loading="lazy" decoding="async"
          alt=""
          aria-hidden
          src={bgImg}
          className="absolute inset-0 size-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: BG_OVERLAY }}
        />
      </div>

      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden w-full max-w-[1440px] flex-col items-center min-[1024px]:flex pt-[64px] pb-[64px]">
        <div className="flex flex-col items-center gap-[20px]">
          <div className="relative flex items-center justify-center bg-[rgba(255,255,255,0.06)] px-[20px] py-[8px]">
            <div className="absolute left-[6px] top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
            <span className="font-mono text-[13px] uppercase tracking-[-0.39px] text-[#ecfae5]">
              Real-time AI at edge
            </span>
            <div className="absolute right-[6px] top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
            <Corners />
          </div>

          <div className="relative inline-block px-[14px]">
            <h2
              ref={fitRef}
              className={`${gilroyMedium.className} bg-clip-text text-center text-[46px] leading-[49px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage:
                  "linear-gradient(125.581deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {heading}
            </h2>
            <Corners />
          </div>
        </div>

        <div className="flex gap-[14px] mt-[80px]">
          {cards.map((card: any) => (
            <WinCard
              key={card.label}
              label={card.label}
              stat={card.stat}
              statLabel={card.statLabel}
              visual={card.visual}
              body={card.body || body}
              buttons={card.buttons}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="relative mt-[50px] flex justify-center">
          <a
            href={ctaHref}
            className="shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)] relative flex h-[48px] px-[24px] shrink-0 items-center justify-center"
          >
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
            <span className={`${gilroyMedium.className} relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic`}>
              {ctaLabel}
            </span>
            <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]" />
            <GreenCtaCorners />
          </a>
        </div>
      </div>

      {/* MOBILE (<1024px) — node 4032:5947 */}
      <div
        className="relative flex w-full flex-col items-center px-[19px] pt-[30px] pb-[73px] min-[1024px]:hidden"
        data-node-id="4032:5947"
        data-name="4th Fold"
      >
        {/* Header: tag badge + title (node 4032:14671) */}
        <div className="relative z-10 flex w-[350px] flex-col items-center gap-[10px]">
          <TagBadge
            label="Real-time AI at edge"
            width={190}
            rightBarLeft={181.48}
            leftBarLeft={6.48}
            centerLabel
            nodeId="4032:14673"
            labelClassName="text-[13px] leading-[19.5px] tracking-[-0.39px]"
          />

          {/* Title with corner brackets (node 4032:14681) */}
          <div className="relative h-[81px] w-[356px]" data-name="Group 78">
            <h2
              ref={fitRef2}
              className={`${gilroyMedium.className} absolute inset-0 flex items-center justify-center bg-clip-text text-center text-[36px] leading-[36px] font-medium text-transparent not-italic [word-break:break-word]`}
              style={{
                backgroundImage:
                  "linear-gradient(107.28587521021382deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              data-node-id="4032:14682"
            >
              <span className="w-full [word-break:break-word]">
                {heading}
              </span>
            </h2>

            <div className="absolute left-[353px] top-[4px] flex h-[2.817px] w-[2.346px] items-center justify-center">
              <div className="flex-none rotate-180">
                <div className="relative h-[2.817px] w-[2.346px]">
                  <div className="absolute inset-[0_0_-17.75%_-21.31%]">
                    <img loading="lazy" decoding="async" alt="" aria-hidden src="/hero/corner-tag-2.svg" className="block size-full max-w-none" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute left-[353px] top-[75px] flex h-[2.817px] w-[2.346px] items-center justify-center">
              <div className="-scale-y-100 flex-none rotate-180">
                <div className="relative h-[2.817px] w-[2.346px]">
                  <div className="absolute inset-[0_0_-17.75%_-21.31%]">
                    <img loading="lazy" decoding="async" alt="" aria-hidden src="/hero/corner-tag-2.svg" className="block size-full max-w-none" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute left-[-3px] top-[75px] h-[2.817px] w-[2.346px]">
              <div className="absolute inset-[0_0_-17.75%_-21.31%]">
                <img loading="lazy" decoding="async" alt="" aria-hidden src="/hero/corner-tag-1.svg" className="block size-full max-w-none" />
              </div>
            </div>
            <div className="absolute left-[-3px] top-[4px] flex h-[2.817px] w-[2.346px] items-center justify-center">
              <div className="-scale-y-100 flex-none">
                <div className="relative h-[2.817px] w-[2.346px]">
                  <div className="absolute inset-[0_0_-17.75%_-21.31%]">
                    <img loading="lazy" decoding="async" alt="" aria-hidden src="/hero/corner-tag-1.svg" className="block size-full max-w-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cards (node 4032:5958) */}
        <div className="relative z-10 mt-[35px] flex w-full flex-col items-center gap-[14px]">
          {cards.map((card: any) => (
            <WinCardMobile
              key={card.label}
              label={card.label}
              stat={card.stat}
              statLabel={card.statLabel}
              mobileImg={card.mobileImg}
              body={card.body || body}
              buttons={card.buttons}
            />
          ))}
        </div>

        {/* CTA Mobile */}
        <div className="relative z-10 mt-[40px] flex w-full justify-center">
          <a
            href={ctaHref}
            className="shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)] relative flex h-[48px] px-[24px] w-full shrink-0 items-center justify-center"
          >
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
            <span className={`${gilroyMedium.className} relative text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic`}>
              {ctaLabel}
            </span>
            <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]" />
            <GreenCtaCorners />
          </a>
        </div>
      </div>
    </section>
  );
}
