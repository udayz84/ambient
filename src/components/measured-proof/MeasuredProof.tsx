"use client";

import { mediaUrl } from "@/lib/strapi";
import Image from "next/image";
import { MeasuredProofCards } from "./MeasuredProofCards";
import { MeasuredProofCtas } from "./MeasuredProofCtas";
import { MeasuredProofHeader } from "./MeasuredProofHeader";
import { MeasuredProofMobile } from "./MeasuredProofMobile";
import bgImageFallback from "../../../public/measured-proof/bg-image-90.webp";
import gradientTopFallback from "../../../public/measured-proof/gradient-top.png";
import gradientBottomFallback from "../../../public/measured-proof/gradient-bottom.png";
import mobileBgFallback from "../../../public/mobile/image 90.png";

import { TabletScaleCanvas } from "../shared/TabletScaleCanvas";

export function MeasuredProof({ data }: { data?: any }) {
  const backgroundImage =
    mediaUrl(data?.background_image) || bgImageFallback;
  const gradientTop =
    mediaUrl(data?.gradient_top) || gradientTopFallback;
  const gradientBottom =
    mediaUrl(data?.gradient_bottom) || gradientBottomFallback;
  const mobileBackgroundImage =
    mediaUrl(data?.background_image) || mobileBgFallback;

  return (
    <section
      id="measured-proof"
      className="relative left-1/2 w-screen max-w-none -translate-x-1/2 bg-black min-[1200px]:h-[100vh]"
      data-node-id="2379:1464"
      data-name="Section 6"
      aria-label="Measured proof in silicon"
    >
      {/* DESKTOP & TABLET (>=600px) */}
      <div className="relative hidden w-full justify-center overflow-hidden min-[600px]:flex min-[1200px]:sticky min-[1200px]:top-0 min-[1200px]:h-[100vh]">
        <div
          className="pointer-events-none absolute top-[calc(50%-15.5px)] right-0 left-0 h-[880px] -translate-y-1/2"
          data-node-id="2379:1466"
          data-name="image 90"
        >
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover object-bottom opacity-75"
            sizes="100vw"
          />
        </div>

        <div
          className="pointer-events-none absolute top-0 right-0 left-0 h-[260px]"
          data-node-id="2379:1467"
        >
          <Image
            src={gradientTop}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="pointer-events-none absolute right-0 bottom-0 left-0 flex h-[341px] items-center justify-center">
          <div className="-scale-y-100 h-full w-full flex-none">
            <div className="relative h-full w-full" data-node-id="2379:1468">
              <Image
                src={gradientBottom}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>
        </div>

        <TabletScaleCanvas className="relative my-auto shrink-0 h-[945px] w-[1440px]">
          <MeasuredProofHeader data={data} />
          <MeasuredProofCards data={data} />
          <MeasuredProofCtas data={data} />
        </TabletScaleCanvas>
      </div>

      {/* MOBILE (<600px) */}
      <div className="relative w-full min-[600px]:hidden overflow-hidden">
        {/* Background elements for mobile (matching desktop) */}
        <div className="pointer-events-none absolute top-[45%] right-0 left-0 h-[600px] -translate-y-1/2">
          <Image
            src={mobileBackgroundImage}
            alt=""
            fill
            className="object-cover object-bottom opacity-75"
            sizes="100vw"
          />
        </div>

        <div className="pointer-events-none absolute top-0 right-0 left-0 h-[260px]">
          <Image
            src={gradientTop}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="pointer-events-none absolute right-0 bottom-[-200px] left-0 flex h-[341px] items-center justify-center">
          <div className="-scale-y-100 h-full w-full flex-none">
            <div className="relative h-full w-full">
              <Image
                src={gradientBottom}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>
        </div>

        <MeasuredProofMobile data={data} />
      </div>
    </section>
  );
}
