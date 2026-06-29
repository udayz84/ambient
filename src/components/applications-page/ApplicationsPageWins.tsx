/* eslint-disable @next/next/no-img-element */
import { gilroyBold, gilroyMedium, interRegular } from "../hero/fonts";
import { Corners } from "../shared/Corners";

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
};

function WinCard({ label, stat, statLabel, visual }: WinCardProps) {
  return (
    <div
      className="relative h-[640px] w-[426px] shrink-0 overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)]"
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
          {BODY}
        </p>
        <FeatureRow />
      </div>
    </div>
  );
}

function VisualWearable() {
  return (
    <div className="absolute left-[111.3px] top-[55.5px] flex size-[342.201px] items-center justify-center mix-blend-lighten">
      <div className="-scale-y-100 rotate-180">
        <div className="relative size-[342.201px]">
          <img
            alt=""
            aria-hidden
            src="/applications/wins-img-1.png"
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

function VisualMedical() {
  return (
    <div className="absolute left-[26.82px] top-[-31.2px] size-[389.396px] mix-blend-lighten">
      <div className="absolute inset-0 overflow-hidden">
        <img
          alt=""
          aria-hidden
          src="/applications/wins-img-2.png"
          className="absolute left-[-31.7%] top-[33.25%] h-[70.15%] w-[124.71%] max-w-none object-cover"
        />
      </div>
      <div className="absolute inset-0" style={{ backgroundImage: OVERLAY_2 }} />
    </div>
  );
}

function VisualAr() {
  return (
    <div className="absolute left-[26.82px] top-[-31.2px] flex size-[389.396px] items-center justify-center mix-blend-lighten">
      <div className="-scale-y-100 rotate-180">
        <div className="relative size-[389.396px]">
          <div className="absolute inset-0 overflow-hidden">
            <img
              alt=""
              aria-hidden
              src="/applications/wins-img-2.png"
              className="absolute left-[-31.7%] top-[33.25%] h-[70.15%] w-[124.71%] max-w-none object-cover"
            />
          </div>
          <div className="absolute inset-0 overflow-hidden">
            <img
              alt=""
              aria-hidden
              src="/applications/wins-img-3.png"
              className="absolute left-[-18.3%] top-[19.38%] h-[68.65%] w-[131.65%] max-w-none object-cover"
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

const CARDS = [
  {
    label: "The Wearable Wins",
    stat: "99%",
    statLabel: "Accurate",
    visual: <VisualWearable />,
  },
  {
    label: "The Medical/Safety Wins",
    stat: "6months",
    statLabel: "Battery",
    visual: <VisualMedical />,
  },
  {
    label: "The AR/Vision Wins",
    stat: "Zero",
    statLabel: "Latency",
    visual: <VisualAr />,
  },
];

export function ApplicationsPageWins({ heading, description }: { heading?: string; description?: string }) {
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
          src="/applications/wins-bg.png"
          className="absolute inset-0 size-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: BG_OVERLAY }}
        />
      </div>

      {/* DESKTOP (>=1024px) */}
      <div className="relative hidden w-full max-w-[1440px] flex-col items-center min-[1024px]:flex pt-[120px] pb-[120px]">
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
              The empirical advantage.
            </h2>
            <Corners />
          </div>
        </div>

        <div className="flex gap-[14px] mt-[80px]">
          {CARDS.map((card) => (
            <WinCard
              key={card.label}
              label={card.label}
              stat={card.stat}
              statLabel={card.statLabel}
              visual={card.visual}
            />
          ))}
        </div>
      </div>

      {/* MOBILE (<1024px) */}
      <div className="relative flex w-full flex-col items-center gap-[40px] px-[24px] pt-[72px] pb-[72px] min-[1024px]:hidden">
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
              The empirical advantage.
            </h2>
            <Corners />
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-[24px]">
          {CARDS.map((card) => (
            <div key={card.label} className="w-full max-w-[426px]">
              <WinCard
                label={card.label}
                stat={card.stat}
                statLabel={card.statLabel}
                visual={card.visual}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
