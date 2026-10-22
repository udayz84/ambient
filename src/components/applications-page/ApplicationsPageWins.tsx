"use client";

/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useFadeIn, getFadeInClass } from "../shared/useFadeIn";
import { UpcomingProductsModal } from "../hero/UpcomingProductsModal";
import { gilroyBold, gilroyMedium, interRegular, dmMono } from "../hero/fonts";
import { Corners } from "../shared/Corners";
import { useFitText } from "../shared/FitText";
import { mediaUrl } from "@/lib/strapi";
import { TabletScaleCanvas } from "../shared/TabletScaleCanvas";

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
const FALLBACK_SUBHEADING =
  "Real products, real numbers, with the AI running the whole time.";

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

function WinCard({ label, stat, statLabel, visual, body, buttons, muted }: WinCardProps & { muted?: boolean }) {
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
          className={`${interRegular.className} text-[16px] leading-[24px] font-normal text-[#f0f0f0] [word-break:break-word]`}
        >
          {label}
        </p>
      </div>

      {/* Stat + body + features */}
      <div className="absolute left-[20px] top-[317px] flex w-[calc(100%-40px)] flex-col gap-[15px]">
        <div className="flex flex-col">
          <p
            className={`${gilroyBold.className} bg-clip-text text-[60px] leading-[68px] min-[1180px]:text-[72px] min-[1180px]:leading-[84px] xl:text-[82px] xl:leading-[100px] tracking-[-1.64px] text-transparent`}
            style={{
              backgroundImage: STAT_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            {stat}
          </p>
          <p
            className={`${gilroyMedium.className} text-[20px] min-[1180px]:text-[22px] leading-[26px] min-[1180px]:leading-[28px] uppercase text-[#c5f3b5] [word-break:break-word]`}
          >
            {statLabel}
          </p>
        </div>
        <p
          className={`${interRegular.className} text-[15px] xl:text-[16px] leading-[22px] xl:leading-[24px] font-normal ${muted ? "text-[#8a8a8a]" : "text-[rgba(240,240,240,0.6)]"} [word-break:break-word]`}
        >
          {body}
        </p>
        {buttons && buttons.length > 0 && (
          <div className="flex flex-wrap gap-[8px] mt-[10px]">
            {buttons.map((btn: any, i: number) => {
              const soon = (btn.label ?? "").trim().toLowerCase() === "coming soon";
              return (
                <a
                  key={i}
                  href={btn.href || "#"}
                  className={`${gilroyMedium.className} flex items-center justify-center border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(226,241,202,0.12)] px-[12px] py-[6px] text-[12px] uppercase transition-colors ${soon ? "text-[#a4a4a4]" : "text-white hover:bg-[rgba(226,241,202,0.2)]"}`}
                >
                  {btn.label}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function SecondaryCta({ label, href, onClick }: { label: string; href?: string; onClick?: (e: React.MouseEvent) => void }) {
  return (
    <a
      href={href || "#"}
      onClick={onClick}
      className={`${gilroyMedium.className} relative flex h-[48px] w-auto min-w-[223px] shrink-0 cursor-pointer items-center justify-center overflow-clip border-[0.5px] border-solid border-[rgba(240,240,240,0.25)] bg-[rgba(226,241,202,0.12)] px-[24px] transition-colors duration-300 hover:bg-[#45c418] hover:border-[#45c418] hover:shadow-[0px_0px_15px_rgba(69,196,24,0.4)]`}
    >
      <span className="relative text-[16px] leading-[28px] font-medium whitespace-nowrap text-white uppercase not-italic">
        {label}
      </span>
      <Corners />
    </a>
  );
}

function WinCardMobile({ label, stat, statLabel, mobileImg, body, buttons, muted }: { label: string; stat: string; statLabel: string; mobileImg: string; body: string; buttons?: any[]; muted?: boolean }) {
  const { fadeRef, isVisible } = useFadeIn();

  return (
    <div
      ref={fadeRef}
      className={`relative h-[550px] w-full max-w-[355px] shrink-0 overflow-clip border-[0.417px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.5)] ${getFadeInClass(isVisible)}`}
      data-name="Container"
    >
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <img loading="lazy" decoding="async" alt="" aria-hidden src={mobileImg} className="absolute inset-0 size-full object-contain p-[40px] -translate-y-[90px]" />
        <div className="absolute inset-0" style={{ backgroundImage: OVERLAY_2 }} />
      </div>

      {/* Label */}
      <div className="absolute left-[17.58px] top-[17.58px] z-10 flex items-center gap-[12px]">
        <LabelTile />
        <p className={`${interRegular.className} text-[16px] leading-[24px] font-normal text-[#f0f0f0] [word-break:break-word]`}>{label}</p>
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
          <p className={`${interRegular.className} text-[16px] leading-[24px] font-normal ${muted ? "text-[#8a8a8a]" : "text-[rgba(240,240,240,0.6)]"} [word-break:break-word]`}>{body}</p>
        </div>
        {buttons && buttons.length > 0 && (
          <div className="flex flex-wrap gap-[8px] mt-[6px]">
            {buttons.map((btn: any, i: number) => {
              const soon = (btn.label ?? "").trim().toLowerCase() === "coming soon";
              return (
                <a
                  key={i}
                  href={btn.href || "#"}
                  className={`${gilroyMedium.className} flex items-center justify-center border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(226,241,202,0.12)] px-[12px] py-[6px] text-[12px] uppercase transition-colors ${soon ? "text-[#a4a4a4]" : "text-white hover:bg-[rgba(226,241,202,0.2)]"}`}
                >
                  {btn.label}
                </a>
              );
            })}
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
    label: "The Safety Win",
    stat: "90 Days",
    statLabel: "on a single charge",
    body: "A pendant that watches over you, running fall detection and SOS voice recognition continuously, on-device, for 90 days on a single charge. No phone to carry, no cloud to depend on. Protection that never goes dark.",
    visual: WIN_VISUALS[0],
    mobileImg: "/applications/wins-img-1.webp",
    buttons: [{ label: "Coming Soon", href: "#" }],
  },
  {
    label: "The Women’s-Health Win",
    stat: ">98%",
    statLabel: "fall & assault recognition",
    body: "In DimensionNXG’s MAI wearable, GPX10 Pro recognizes falls and assault patterns on-device at >98% accuracy and still runs 14 days on a 200 mAh cell. Detection stays local and private; the radio fires only when there’s a real event to report.",
    visual: WIN_VISUALS[1],
    mobileImg: "/applications/wins-img-2.webp",
    buttons: [{ label: "READ CASE STUDY", href: "#" }],
  },
  {
    label: "The Industrial Win",
    stat: "2+ Years",
    statLabel: "on one cell",
    body: "Predictive maintenance that lives on the machine, continuously analyzing vibration and sound to catch anomalies before it breaks, entirely at the edge. A retrofittable, battery-powered node that runs 2+ years on a single cell, sending alerts, not raw data.",
    visual: WIN_VISUALS[2],
    mobileImg: "/applications/wins-img-3.webp",
    buttons: [{ label: "Coming Soon", href: "#" }],
  },
];

export function ApplicationsPageWins({ data }: { data?: any; slug?: string }) {
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  const eyebrow = data?.eyebrow || "Proven in production";
  const fitRef = useFitText<HTMLHeadingElement>({ maxLines: 2 });
  const heading = data?.heading || FALLBACK_HEADING;
  const subheading = (data?.subheading as string) || FALLBACK_SUBHEADING;
  const body = data?.body || BODY;
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
            buttons: (Array.isArray(c?.buttons) && c.buttons.length > 0) ? c.buttons : (CARDS[i]?.buttons || []),
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

      {/* DESKTOP & LARGE TABLET (>=600px) */}
      <TabletScaleCanvas className="relative hidden w-[1440px] shrink-0 flex-col items-center min-[600px]:flex pt-[64px] pb-[64px]">
        <div className="flex flex-col items-center gap-[20px]">
          <div className="relative flex items-center justify-center h-[26px] shrink-0 overflow-clip bg-[rgba(255,255,255,0.06)] border-[0.5px] border-[rgba(255,255,255,0.2)] px-[18px]">
            <Corners
              leftSrc="/applications/wearables/vector-47.svg"
              rightSrc="/applications/wearables/vector-46.svg"
            />
            <p className={`${dmMono.className} text-[13px] leading-none font-normal tracking-[-0.39px] text-[#ecfae5] uppercase whitespace-nowrap not-italic`}>
              {eyebrow}
            </p>
            <div className="absolute top-1/2 left-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
            <div className="absolute top-1/2 right-[7.52px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
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
          {subheading ? (
            <p
              className={`${interRegular.className} max-w-[679px] text-center text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
            >
              {subheading}
            </p>
          ) : null}
        </div>

        <div className="flex gap-[14px] mt-[80px] justify-center">
          {cards.map((card: any) => (
            <div key={card.label} className="flex flex-col items-center gap-[24px]">
              <WinCard
                label={card.label}
                stat={card.stat}
                statLabel={card.statLabel}
                visual={card.visual}
                body={card.body || body}
                muted={(card.buttons ?? []).some((b: any) => (b.label ?? "").trim().toLowerCase() === "coming soon")}
              />
              {card.buttons && card.buttons.length > 0 && (
                <div className="flex flex-col gap-[8px] items-center">
                  {card.buttons.map((btn: any, i: number) => (
                    <SecondaryCta
                      key={i}
                      label={btn.label}
                      href={btn.href}
                      onClick={
                        (btn.label ?? "").trim().toLowerCase() === "coming soon"
                          ? undefined
                          : (e) => {
                              e.preventDefault();
                              setCaseStudyOpen(true);
                            }
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </TabletScaleCanvas>

      {/* MOBILE & SMALL TABLET (<600px) — node 4032:5947 */}
      <div
        className="relative flex w-full flex-col items-center px-[19px] md:px-[32px] pt-[30px] md:pt-[60px] pb-[32px] md:pb-[60px] min-[600px]:hidden"
        data-node-id="4032:5947"
        data-name="4th Fold"
      >
        {/* Header: tag badge + title (node 4032:14671) */}
        <div className="relative z-10 flex w-[350px] md:w-[600px] flex-col items-center gap-[10px] md:gap-[16px]">
          <div className="relative flex items-center justify-center h-[26px] shrink-0 overflow-clip bg-[rgba(255,255,255,0.06)] border-[0.5px] border-[rgba(255,255,255,0.2)] px-[18px]">
            <Corners
              leftSrc="/applications/wearables/vector-47.svg"
              rightSrc="/applications/wearables/vector-46.svg"
            />
            <p className={`${dmMono.className} text-[13px] leading-none font-normal tracking-[-0.39px] text-[#ecfae5] uppercase whitespace-nowrap not-italic`}>
              {eyebrow}
            </p>
            <div className="absolute top-1/2 left-[6.48px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
            <div className="absolute top-1/2 right-[7.52px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
          </div>

          {/* Title with corner brackets (node 4032:14681) */}
          <div className="relative h-[81px] w-[356px]" data-name="Group 78">
            <h2
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
          {subheading ? (
            <p
              className={`${interRegular.className} w-full max-w-[324px] md:max-w-[560px] text-center text-[14px] leading-[21px] md:text-[16px] md:leading-[24px] font-normal text-[#f0f0f0] opacity-65 not-italic [word-break:break-word]`}
            >
              {subheading}
            </p>
          ) : null}
        </div>

        {/* Cards Carousel (node 4032:5958) */}
        <div
          className="relative z-10 mt-[35px] md:mt-[48px] flex w-[calc(100%+38px)] md:w-full -mx-[19px] md:mx-0 snap-x snap-mandatory gap-[16px] md:gap-[24px] overflow-x-auto px-[19px] md:px-[24px] pb-[8px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {cards.map((card: any) => (
            <div key={card.label} className="flex w-[355px] md:w-[380px] max-w-[85vw] shrink-0 snap-center flex-col items-center gap-[20px]">
              <WinCardMobile
                label={card.label}
                stat={card.stat}
                statLabel={card.statLabel}
                mobileImg={card.mobileImg}
                body={card.body || body}
                muted={(card.buttons ?? []).some((b: any) => (b.label ?? "").trim().toLowerCase() === "coming soon")}
              />
              {card.buttons && card.buttons.length > 0 && (
                <div className="flex flex-col gap-[8px] items-center w-full px-[8px]">
                  {card.buttons.map((btn: any, i: number) => (
                    <SecondaryCta
                      key={i}
                      label={btn.label}
                      href={btn.href}
                      onClick={
                        (btn.label ?? "").trim().toLowerCase() === "coming soon"
                          ? undefined
                          : (e) => {
                              e.preventDefault();
                              setCaseStudyOpen(true);
                            }
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>


      </div>

      <UpcomingProductsModal
        isOpen={caseStudyOpen}
        onClose={() => setCaseStudyOpen(false)}
        formContext="case-study"
        pdfUrl="/case-studies/MAI-case-study.pdf"
        pdfName="MAI-case-study.pdf"
        closeLabel="Back to Page"
      />
    </section>
  );
}
