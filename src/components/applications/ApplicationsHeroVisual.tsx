"use client";

import { mediaUrl } from "@/lib/strapi";
import { gilroyExtraBold, gilroySemiBold } from "../hero/fonts";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedDotsBackground } from "../shared/AnimatedDotsBackground";
import { GreenCtaCorners } from "../shared/GreenCtaCorners";

const PRIMARY_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";
const PRIMARY_CTA_INSET =
  "shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]";

const watermarkGradient =
  "linear-gradient(259.734deg, rgba(255, 255, 255, 0.12) 0.12143%, rgba(255, 255, 255, 0.6) 44.084%, rgba(255, 255, 255, 0) 113.37%)";

const industrialWatermarkGradient =
  "linear-gradient(259.467deg, rgba(255, 255, 255, 0.12) 0.12143%, rgba(255, 255, 255, 0.6) 44.084%, rgba(255, 255, 255, 0) 113.37%)";

const smartHomeWatermarkGradient =
  "linear-gradient(259.588deg, rgba(255, 255, 255, 0.12) 0.12143%, rgba(255, 255, 255, 0.6) 44.084%, rgba(255, 255, 255, 0) 113.37%)";

const wearablesWatermarkGradient =
  "linear-gradient(260.505deg, rgba(255, 255, 255, 0.12) 0.12143%, rgba(255, 255, 255, 0.6) 44.084%, rgba(255, 255, 255, 0) 113.37%)";

const dronesWatermarkGradient =
  "linear-gradient(263.497deg, rgba(255, 255, 255, 0.12) 0.12143%, rgba(255, 255, 255, 0.6) 44.084%, rgba(255, 255, 255, 0) 113.37%)";

const agricultureWatermarkGradient =
  "linear-gradient(259.313deg, rgba(255, 255, 255, 0.12) 0.12143%, rgba(255, 255, 255, 0.6) 44.084%, rgba(255, 255, 255, 0) 113.37%)";

const hearablesWatermarkGradient =
  "linear-gradient(261.051deg, rgba(255, 255, 255, 0.12) 0.12143%, rgba(255, 255, 255, 0.6) 44.084%, rgba(255, 255, 255, 0) 113.37%)";

const HERO_IMAGES: Record<string, string> = {};

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

export function ApplicationsHeroVisual({
  tabs = [],
  activeTab,
  direction = 1,
}: {
  tabs?: any[];
  activeTab: string;
  direction?: number;
}) {
  const strapiHeroImage = (label: string) => {
    const tab = tabs.find(
      (t) => (t?.label || "").toUpperCase() === label.toUpperCase()
    );
    return tab ? mediaUrl(tab?.hero_image) : null;
  };
  const strapiWatermark = (label: string) => {
    const tab = tabs.find(
      (t) => (t?.label || "").toUpperCase() === label.toUpperCase()
    );
    return tab?.watermark_text;
  };

  const renderContent = () => {
    const imgSrc =
      strapiHeroImage(activeTab) ||
      HERO_IMAGES[activeTab] ||
      "";

    if (activeTab === "INDUSTRIAL") {
      return (
        <>
          <p
            className={`${gilroyExtraBold.className} absolute left-[calc(50%-0.3px)] top-[calc(50%-105px)] -translate-x-1/2 bg-clip-text text-center text-[200px] leading-[210px] font-extrabold tracking-[0.5px] whitespace-nowrap text-[transparent] uppercase not-italic [word-break:break-word]`}
            style={{ backgroundImage: industrialWatermarkGradient }}
            data-node-id="2901:1272"
          >
            {strapiWatermark("INDUSTRIAL") || ""}
          </p>

          <div
            className="absolute left-[calc(50%-32.8px)] top-[calc(50%+105.03px)] h-[500px] w-[632.88px] -translate-x-1/2 -translate-y-1/2"
            data-node-id="2901:1273"
            data-name="Image"
          >
            {imgSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt=""
                src={imgSrc}
                className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
                aria-hidden
              />
            ) : null}
          </div>

          <div
            className="contents"
            data-node-id="2901:1290"
            data-name="Indicator"
          >
            <div className="absolute left-[843.23px] top-[618.8px] flex h-[76.623px] w-[87.661px] items-center justify-center">
              <div className="-rotate-90 flex-none">
                <div
                  className="relative h-[87.661px] w-[76.623px]"
                  data-node-id="2901:1291"
                  data-name="Indicator"
                >
                  <div className="absolute inset-[-4.56%_-5.22%_0_-0.33%]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      src="/applications/indicator-angled.svg"
                      className="block size-full max-w-none"
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="contents"
            data-node-id="2901:1296"
            data-name="Indicator"
          >
            <div className="absolute left-[486.23px] top-[594.8px] flex h-[76.623px] w-[87.661px] items-center justify-center">
              <div className="-rotate-90 -scale-y-100 flex-none">
                <div
                  className="relative h-[87.661px] w-[76.623px]"
                  data-node-id="2901:1297"
                  data-name="Indicator"
                >
                  <div className="absolute inset-[-4.56%_-5.22%_0_-0.33%]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      src="/applications/indicator-angled.svg"
                      className="block size-full max-w-none"
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    if (activeTab === "SMART HOMES") {
      return (
        <>
          <p
            className={`${gilroyExtraBold.className} absolute left-[calc(50%+0.2px)] top-[calc(50%-105px)] -translate-x-1/2 bg-clip-text text-center text-[200px] leading-[210px] font-extrabold tracking-[0.5px] whitespace-nowrap text-[transparent] uppercase not-italic [word-break:break-word]`}
            style={{ backgroundImage: smartHomeWatermarkGradient }}
            data-node-id="2901:1480"
          >
            {strapiWatermark("SMART HOMES") || ""}
          </p>

          <div
            className="absolute left-[calc(50%+12.55px)] top-[calc(50%+113.78px)] size-[661.006px] -translate-x-1/2 -translate-y-1/2"
            data-node-id="3202:465"
            data-name="Product image"
          >
            {imgSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt=""
                src={imgSrc}
                className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
                aria-hidden
              />
            ) : null}
          </div>

          <div
            className="contents"
            data-node-id="2901:1498"
            data-name="Indicator"
          >
            <div className="absolute left-[490.05px] top-[653.06px] flex h-[14.142px] w-[88.181px] items-center justify-center">
              <div className="-rotate-90 -scale-y-100 flex-none">
                <div
                  className="relative h-[88.181px] w-[14.142px]"
                  data-node-id="2901:1499"
                  data-name="Indicator"
                >
                  <div className="absolute inset-[-4.54%_-28.28%_0_-28.28%]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      src="/applications/indicator-vertical.svg"
                      className="block size-full max-w-none"
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="contents"
            data-node-id="2901:1504"
            data-name="Indicator"
          >
            <div className="absolute left-[843.23px] top-[618.8px] flex h-[76.622px] w-[87.661px] items-center justify-center">
              <div className="-rotate-90 flex-none">
                <div
                  className="relative h-[87.661px] w-[76.622px]"
                  data-node-id="2901:1505"
                  data-name="Indicator"
                >
                  <div className="absolute inset-[-4.56%_-5.22%_0_-0.33%]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      src="/applications/indicator-angled.svg"
                      className="block size-full max-w-none"
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    if (activeTab === "WEARABLES") {
      return (
        <>
          <p
            className={`${gilroyExtraBold.className} absolute left-[calc(50%-0.3px)] top-[calc(50%-105px)] -translate-x-1/2 bg-clip-text text-center text-[200px] leading-[210px] font-extrabold tracking-[0.5px] whitespace-nowrap text-[transparent] uppercase not-italic [word-break:break-word]`}
            style={{ backgroundImage: wearablesWatermarkGradient }}
            data-node-id="2901:1580"
          >
            {strapiWatermark("WEARABLES") || ""}
          </p>

          <div
            className="absolute left-[calc(50%+0.2px)] top-[calc(50%+113.19px)] h-[603.374px] w-[763.727px] -translate-x-1/2 -translate-y-1/2"
            data-node-id="2901:1581"
            data-name="Image"
          >
            {imgSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt=""
                src={imgSrc}
                className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
                aria-hidden
              />
            ) : null}
          </div>

          <div
            className="contents"
            data-node-id="2901:1598"
            data-name="Indicator"
          >
            <div className="absolute left-[490.05px] top-[653.06px] flex h-[14.142px] w-[88.181px] items-center justify-center">
              <div className="-rotate-90 -scale-y-100 flex-none">
                <div
                  className="relative h-[88.181px] w-[14.142px]"
                  data-node-id="2901:1599"
                  data-name="Indicator"
                >
                  <div className="absolute inset-[-4.54%_-28.28%_0_-28.28%]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      src="/applications/indicator-vertical.svg"
                      className="block size-full max-w-none"
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="contents"
            data-node-id="2901:1604"
            data-name="Indicator"
          >
            <div className="absolute left-[843.23px] top-[618.8px] flex h-[76.622px] w-[87.661px] items-center justify-center">
              <div className="-rotate-90 flex-none">
                <div
                  className="relative h-[87.661px] w-[76.622px]"
                  data-node-id="2901:1605"
                  data-name="Indicator"
                >
                  <div className="absolute inset-[-4.56%_-5.22%_0_-0.33%]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      src="/applications/indicator-angled.svg"
                      className="block size-full max-w-none"
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    if (activeTab === "DRONES") {
      return (
        <>
          <p
            className={`${gilroyExtraBold.className} absolute left-[calc(50%+0.2px)] top-[calc(50%-105px)] -translate-x-1/2 bg-clip-text text-center text-[200px] leading-[210px] font-extrabold tracking-[0.5px] whitespace-nowrap text-[transparent] uppercase not-italic [word-break:break-word]`}
            style={{ backgroundImage: dronesWatermarkGradient }}
            data-node-id="2901:1895"
          >
            {strapiWatermark("DRONES") || ""}
          </p>

          <div
            className="absolute left-[calc(50%+0.2px)] top-[calc(50%+87.96px)] h-[544.309px] w-[632.88px] -translate-x-1/2 -translate-y-1/2"
            data-node-id="2901:1896"
            data-name="Image"
          >
            {imgSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt=""
                src={imgSrc}
                className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
                aria-hidden
              />
            ) : null}
          </div>

          <div
            className="contents"
            data-node-id="2901:1913"
            data-name="Indicator"
          >
            <div className="absolute left-[843.23px] top-[578.8px] flex h-[76.622px] w-[87.661px] items-center justify-center">
              <div className="-rotate-90 flex-none">
                <div
                  className="relative h-[87.661px] w-[76.622px]"
                  data-node-id="2901:1914"
                  data-name="Indicator"
                >
                  <div className="absolute inset-[-4.56%_-5.22%_0_-0.33%]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      src="/applications/indicator-angled.svg"
                      className="block size-full max-w-none"
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="contents"
            data-node-id="2901:1919"
            data-name="Indicator"
          >
            <div className="absolute left-[486.23px] top-[594.8px] flex h-[76.622px] w-[87.661px] items-center justify-center">
              <div className="-rotate-90 -scale-y-100 flex-none">
                <div
                  className="relative h-[87.661px] w-[76.622px]"
                  data-node-id="2901:1920"
                  data-name="Indicator"
                >
                  <div className="absolute inset-[-4.56%_-5.22%_0_-0.33%]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      src="/applications/indicator-angled.svg"
                      className="block size-full max-w-none"
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    if (activeTab === "AGRICULTURE") {
      return (
        <>
          <p
            className={`${gilroyExtraBold.className} absolute left-[calc(50%+0.2px)] top-[calc(50%-105px)] -translate-x-1/2 bg-clip-text text-center text-[200px] leading-[210px] font-extrabold tracking-[0.5px] whitespace-nowrap text-[transparent] uppercase not-italic [word-break:break-word]`}
            style={{ backgroundImage: agricultureWatermarkGradient }}
            data-node-id="2901:1999"
          >
            {strapiWatermark("AGRICULTURE") || ""}
          </p>

          <div
            className="absolute left-[calc(50%+0.2px)] top-[calc(50%+87.96px)] h-[544.309px] w-[632.88px] -translate-x-1/2 -translate-y-1/2"
            data-node-id="2901:2000"
            data-name="Image"
          >
            {imgSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt=""
                src={imgSrc}
                className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
                aria-hidden
              />
            ) : null}
          </div>

          <div
            className="contents"
            data-node-id="2901:2017"
            data-name="Indicator"
          >
            <div className="absolute left-[843.23px] top-[578.8px] flex h-[76.622px] w-[87.661px] items-center justify-center">
              <div className="-rotate-90 flex-none">
                <div
                  className="relative h-[87.661px] w-[76.622px]"
                  data-node-id="2901:2018"
                  data-name="Indicator"
                >
                  <div className="absolute inset-[-4.56%_-5.22%_0_-0.33%]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      src="/applications/indicator-angled.svg"
                      className="block size-full max-w-none"
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="contents"
            data-node-id="2901:2023"
            data-name="Indicator"
          >
            <div className="absolute left-[486.23px] top-[594.8px] flex h-[76.622px] w-[87.661px] items-center justify-center">
              <div className="-rotate-90 -scale-y-100 flex-none">
                <div
                  className="relative h-[87.661px] w-[76.622px]"
                  data-node-id="2901:2024"
                  data-name="Indicator"
                >
                  <div className="absolute inset-[-4.56%_-5.22%_0_-0.33%]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      src="/applications/indicator-angled.svg"
                      className="block size-full max-w-none"
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    if (activeTab === "HEARABLES") {
      return (
        <>
          <p
            className={`${gilroyExtraBold.className} absolute left-[calc(50%+0.2px)] top-[calc(50%-125.5px)] -translate-x-1/2 bg-clip-text text-center text-[200px] leading-[210px] font-extrabold tracking-[0.5px] whitespace-nowrap text-[transparent] uppercase not-italic [word-break:break-word]`}
            style={{ backgroundImage: hearablesWatermarkGradient }}
            data-node-id="3206:935"
          >
            {strapiWatermark("HEARABLES") || ""}
          </p>

          <div
            className="absolute left-[calc(50%+0.2px)] top-[calc(50%+84.53px)] h-[500px] w-[632.88px] -translate-x-1/2 -translate-y-1/2"
            data-node-id="3206:936"
            data-name="image 145"
          >
            {imgSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt=""
                src={imgSrc}
                className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
                aria-hidden
              />
            ) : null}
          </div>

          <div className="contents" data-node-id="3206:953">
            <div className="absolute left-[490.24px] top-[653.06px] flex h-[14.142px] w-[88.181px] items-center justify-center">
              <div className="-rotate-90 -scale-y-100 flex-none">
                <div
                  className="relative h-[88.181px] w-[14.142px]"
                  data-node-id="3206:954"
                  data-name="Indicator"
                >
                  <div className="absolute inset-[-4.54%_-28.28%_0_-28.28%]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      src="/applications/indicator-vertical.svg"
                      className="block size-full max-w-none"
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contents" data-node-id="3206:959">
            <div className="absolute left-[843.43px] top-[618.8px] flex h-[76.623px] w-[87.659px] items-center justify-center">
              <div className="-rotate-90 flex-none">
                <div
                  className="relative h-[87.659px] w-[76.623px]"
                  data-node-id="3206:960"
                  data-name="Indicator"
                >
                  <div className="absolute inset-[-4.56%_-5.22%_0_-0.33%]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      src="/applications/indicator-angled.svg"
                      className="block size-full max-w-none"
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    if (activeTab === "BUILD") {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-start pt-[200px] pointer-events-none z-10 w-full h-full">
          <h3
            className={`${gilroySemiBold.className} m-0 flex flex-col justify-center text-center uppercase tracking-[0.5px] bg-clip-text text-[transparent] [word-break:break-word] not-italic text-[120px] leading-[110px] whitespace-normal`}
            style={{ backgroundImage: watermarkGradient, WebkitBackgroundClip: "text", backgroundClip: "text" }}
            aria-hidden
          >
            BUILD YOUR
          </h3>
          
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            alt="Build Custom Application"
            src="/products/build-custom-cube.jpg"
            className="my-[10px] h-auto max-h-[220px] w-auto object-contain pointer-events-none drop-shadow-2xl mix-blend-screen"
          />

          <h3
            className={`${gilroySemiBold.className} m-0 flex flex-col justify-center text-center uppercase tracking-[0.5px] bg-clip-text text-[transparent] [word-break:break-word] not-italic text-[120px] leading-[110px] whitespace-normal`}
            style={{ backgroundImage: watermarkGradient, WebkitBackgroundClip: "text", backgroundClip: "text" }}
            aria-hidden
          >
            APPLICATION
          </h3>
          
          <div className="mt-[24px] pointer-events-auto">
            <a
              href="/model-zoo"
              className={`${PRIMARY_CTA_SHADOW} ${gilroySemiBold.className} pointer-events-auto relative flex h-[48px] w-[223px] shrink-0 items-center justify-center overflow-hidden`}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
              />
              <AnimatedDotsBackground />
              <span className="relative max-w-full overflow-hidden text-ellipsis text-[16px] leading-[28px] font-medium uppercase whitespace-nowrap text-white not-italic">
                Explore Model Zoo
              </span>
              <span
                aria-hidden
                className={`pointer-events-none absolute inset-0 rounded-[inherit] ${PRIMARY_CTA_INSET}`}
              />
              <GreenCtaCorners />
            </a>
          </div>
        </div>
      );
    }

    return (
      <>
        <p
          className={`${gilroySemiBold.className} absolute top-[291.2783203125px] left-1/2 -translate-x-1/2 bg-clip-text text-center text-[200px] leading-[210px] font-semibold tracking-[0.5px] whitespace-nowrap text-[transparent] uppercase not-italic [word-break:break-word]`}
          style={{ backgroundImage: watermarkGradient }}
          data-node-id="2379:848"
        >
          {activeTab}
        </p>

        <div
          className={`absolute top-[301.22119140625px] left-[calc(50%+26.3896484375px)] flex h-[435.28900146484375px] -translate-x-1/2 items-center justify-center ${
            activeTab === "AUTOMOTIVE" ? "w-[1200px] min-[1440px]:w-[1440px]" : "w-[984.82421875px]"
          }`}
          data-node-id="2379:850"
          data-name="unnamed-(1) 1"
        >
          <div className={activeTab === "AUTOMOTIVE" ? "w-full h-full -scale-y-100 rotate-180 flex-none flex items-center justify-center" : "flex-none w-full h-full flex items-center justify-center"}>
            {imgSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt=""
                src={imgSrc}
                className={
                  activeTab === "AUTOMOTIVE"
                    ? "pointer-events-none h-full w-auto max-w-none object-contain"
                    : "pointer-events-none max-h-[435px] max-w-full w-auto h-auto object-contain"
                }
                aria-hidden
              />
            ) : null}
          </div>
        </div>

        {activeTab === "AUTOMOTIVE" && (
          <>
            <div
              className="absolute top-[516.041015625px] left-[372.0654296875px] z-[10] h-[88.18115234375px] w-[14.142134666442871px]"
              data-node-id="2379:940"
              data-name="Group 57"
            >
              <div className="absolute inset-[-4.54%_-28.28%_0_-28.28%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src="/applications/indicator-vertical.svg"
                  className="block size-full max-w-none"
                  aria-hidden
                />
              </div>
            </div>

            <div className="contents" data-node-id="2379:946" data-name="Group 58">
              <div className="absolute top-[618.8037109375px] left-[743.226318359375px] z-[10] flex h-[76.62291822064526px] w-[87.66146941957857px] items-center justify-center">
                <div className="-rotate-90 flex-none">
                  <div
                    className="relative h-[87.66146941957857px] w-[76.62291822064526px]"
                    data-node-id="2379:947"
                    data-name="Indicator"
                  >
                    <div className="absolute inset-[-4.56%_-5.22%_0_-0.33%]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt=""
                        src="/applications/indicator-angled.svg"
                        className="block size-full max-w-none"
                        aria-hidden
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <>
      <AnimatePresence custom={direction}>
        <motion.div
          key={activeTab}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
          }}
          className="absolute inset-0"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
      <div className="hidden" aria-hidden="true">
        {tabs.map((t) => {
          const img = strapiHeroImage(t?.label) || HERO_IMAGES[t?.label] || "";
          return img ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img key={t.label} src={img} alt="" />
          ) : null;
        })}
      </div>
    </>
  );
}
