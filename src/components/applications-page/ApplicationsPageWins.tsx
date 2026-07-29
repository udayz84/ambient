"use client";

/* eslint-disable @next/next/no-img-element */
import { useFadeIn, getFadeInClass } from "../shared/useFadeIn";
import { gilroyBold, gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { mediaUrl } from "@/lib/strapi";

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
        <img
          alt=""
          aria-hidden
          src="/applications/wins-icon-small.svg"
          className="absolute left-1/2 top-1/2 size-[27.586px] -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div
        className={`${interRegular.className} text-center text-[14px] leading-[18px] text-[rgba(240,240,240,0.6)] whitespace-nowrap`}
      >
        <p className="leading-[18px]">Always on</p>
        <p className="leading-[18px]">protection</p>
      </div>
    </div>
  );
  const line = (
    <img
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
      <img
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
};

function WinCard({ label, stat, statLabel, visual, body }: WinCardProps) {
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
          className={`${interRegular.className} text-[18px] leading-[27px] font-normal text-[#f0f0f0] whitespace-nowrap`}
        >
          {label}
        </p>
      </div>

      {/* Stat + body + features */}
      <div className="absolute left-[20px] top-[279.5px] flex w-[386px] flex-col gap-[15px]">
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
            className={`${gilroyMedium.className} text-[26px] leading-[29px] uppercase text-[#c5f3b5]`}
          >
            {statLabel}
          </p>
        </div>
        <p
          className={`${interRegular.className} text-[16px] leading-[24px] font-normal text-[rgba(240,240,240,0.6)]`}
        >
          {body}
        </p>
        <FeatureRow />
      </div>
    </div>
  );
}

function WinCardMobile({ label, stat, statLabel, mobileImg, body }: { label: string; stat: string; statLabel: string; mobileImg: string; body: string }) {
  const { fadeRef, isVisible } = useFadeIn();

  return (
    <div ref={fadeRef} className={`relative w-full max-w-[426px] overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-black ${getFadeInClass(isVisible)}`}>
      <div className="relative h-[240px] w-full overflow-hidden">
        <img alt="" aria-hidden src={mobileImg} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0" style={{ backgroundImage: OVERLAY_2 }} />
      </div>
      <div className="flex flex-col gap-[16px] p-[20px]">
        <div className="flex items-center gap-[12px]">
          <LabelTile />
          <p className={`${interRegular.className} text-[16px] leading-[24px] font-normal text-[#f0f0f0]`}>{label}</p>
        </div>
        <div className="flex flex-col">
          <p
            className={`${gilroyBold.className} bg-clip-text text-[48px] leading-[54px] tracking-[-0.96px] text-transparent`}
            style={{ backgroundImage: STAT_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text" }}
          >
            {stat}
          </p>
          <p className={`${gilroyMedium.className} text-[18px] leading-[22px] uppercase text-[#c5f3b5]`}>{statLabel}</p>
        </div>
        <p className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-[rgba(240,240,240,0.6)]`}>{body}</p>
        <FeatureRow />
      </div>
      <Corners />
    </div>
  );
}

function VisualWearable({ img = "/applications/wins-img-1.png" }: { img?: string }) {
  return (
    <div className="absolute left-[111.3px] top-[55.5px] flex size-[342.201px] items-center justify-center mix-blend-lighten">
      <div className="-scale-y-100 rotate-180">
        <div className="relative size-[342.201px]">
          <img
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

function VisualMedical({ img = "/applications/wins-img-2.png" }: { img?: string }) {
  return (
    <div className="absolute left-[26.82px] top-[-31.2px] size-[389.396px] mix-blend-lighten">
      <div className="absolute inset-0 overflow-hidden">
        <img
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

function VisualAr({ img = "/applications/wins-img-3.png" }: { img?: string }) {
  return (
    <div className="absolute left-[26.82px] top-[-31.2px] flex size-[389.396px] items-center justify-center mix-blend-lighten">
      <div className="-scale-y-100 rotate-180">
        <div className="relative size-[389.396px]">
          <div className="absolute inset-0 overflow-hidden">
            <img
              alt=""
              aria-hidden
              src={img}
              className="absolute inset-0 size-full object-contain scale-[1.35]"
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
    mobileImg: "/applications/wins-img-1.png",
  },
  {
    label: "The Medical/Safety Wins",
    stat: "6months",
    statLabel: "Battery",
    visual: WIN_VISUALS[1],
    mobileImg: "/applications/wins-img-2.png",
  },
  {
    label: "The AR/Vision Wins",
    stat: "Zero",
    statLabel: "Latency",
    visual: WIN_VISUALS[2],
    mobileImg: "/applications/wins-img-3.png",
  },
];

export function ApplicationsPageWins({ data }: { data?: any }) {
  const heading = data?.heading || FALLBACK_HEADING;
  const body = data?.body || BODY;
  const bgImg = "/applications/wins-bg.png";

  const rawCards = Array.isArray(data?.cards) ? data.cards : [];
  const cards =
    rawCards.length > 0
      ? rawCards.map((c: any, i: number) => {
          const mobileImg = mediaUrl(c?.image) || CARDS[i]?.mobileImg || "/applications/wins-img-1.png";
          
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
          };
        })
      : CARDS;

  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-black"
      aria-label="Wins"
    >
      {/* Full-bleed background image 124 */}
      <div className="pointer-events-none absolute inset-0 hidden opacity-50 min-[1024px]:block">
        <img
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
              className={`${gilroyMedium.className} bg-clip-text text-center text-[46px] leading-[49px] font-medium whitespace-nowrap text-transparent not-italic`}
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
              body={body}
            />
          ))}
        </div>
      </div>

      {/* MOBILE (<1024px) */}
      <div className="relative flex w-full flex-col items-center gap-[40px] px-[24px] pt-[40px] pb-[40px] min-[1024px]:hidden">
        <div className="flex flex-col items-center gap-[16px]">
          <div className="relative flex items-center justify-center bg-[rgba(255,255,255,0.06)] px-[20px] py-[8px]">
            <div className="absolute left-[6px] top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
            <span className="font-mono text-[11px] uppercase tracking-[-0.33px] text-[#ecfae5]">
              Real-time AI at edge
            </span>
            <div className="absolute right-[6px] top-1/2 h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
            <Corners />
          </div>

          <div className="relative inline-block px-[10px]">
            <h2
              className={`${gilroyMedium.className} bg-clip-text text-center text-[32px] leading-[38px] font-medium text-transparent not-italic`}
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
        <div className="flex w-full flex-col items-center gap-[24px]">
          {cards.map((card: any) => (
            <WinCardMobile
              key={card.label}
              label={card.label}
              stat={card.stat}
              statLabel={card.statLabel}
              mobileImg={card.mobileImg}
              body={body}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
