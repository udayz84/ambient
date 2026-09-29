import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import { TechnologyVisualFadeIn } from "./TechnologyVisualFadeIn";
import bgImageFallback from "../../../../public/technology/bg-image-29.webp";

const edgeFadeMaskStyle = {
  maskImage: "radial-gradient(ellipse at center, black 60%, transparent 100%)",
  WebkitMaskImage: "radial-gradient(ellipse at center, black 60%, transparent 100%)",
} as const;

const radialOverlayStyle = {
  backgroundImage: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 1440 642" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><rect x="0" y="0" height="100%" width="100%" fill="url(%23grad)" opacity="1"/><defs><radialGradient id="grad" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="10" gradientTransform="matrix(4.4087e-15 32.1 -72 1.9656e-15 720 321)"><stop stop-color="rgba(0,0,0,0)" offset="0"/><stop stop-color="rgba(0,0,0,1)" offset="1"/></radialGradient></defs></svg>')`,
} as const;

export function TechnologyVisualBackground({ data }: { data?: any }) {
  const bgSrc =
    mediaUrl(data?.background_visual) || bgImageFallback;
  return (
    <div
      className="pointer-events-none absolute top-[60px] right-0 left-0 z-0 h-[642px] overflow-hidden"
      data-node-id="2388:318"
      data-name="Image"
    >
      <div
        className="absolute top-0 left-1/2 h-[642px] w-[1440px] origin-center"
        style={{
          transform: "translateX(-50%) scaleX(max(1, calc(100vw / 1440px)))",
        }}
      >
        <div
          className="absolute top-0 left-1/2 h-[642px] w-[1440px] -translate-x-1/2"
          data-node-id="2379:1408"
          data-name="image 29"
        >
          <div className="absolute inset-0">
            <Image
              src={bgSrc}
              alt=""
              fill
              className="object-bottom"
              sizes="1440px"
            />
            <div
              className="absolute inset-0"
              style={radialOverlayStyle}
              aria-hidden
            />
          </div>
        </div>

        <div
          className="absolute top-0 left-1/2 contents -translate-x-1/2"
          style={{ left: "calc(50% - 13.61px)" }}
          data-node-id="2379:1407"
          data-name="No Rewrite. No Friction."
        >
          <div
            className="absolute top-[64.26px] left-[31.89px] h-[567.484px] w-[1310px]"
            data-node-id="2379:1409"
          >
            <div className="absolute inset-[-35.24%_-15.27%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async"
                src="/technology/ellipse-177.svg"
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>

          <div
            className="absolute top-[54px] left-[-73.11px] h-[588px] w-[1560px]"
            data-node-id="2379:1410"
          >
            <div className="absolute inset-[-17.01%_-6.41%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async"
                src="/technology/group-47.svg"
                alt=""
                className="block size-full max-w-none"
                aria-hidden
              />
            </div>
          </div>
        </div>

        <div
          className="absolute top-[83.5px] left-[215.564px] h-[528px] w-[1007px]"
          data-node-id="3699:1323"
          data-name="Ellipse 16209"
        >
          <div className="absolute inset-[-23.6%_-12.37%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async"
              src="/technology/ellipse-16209.svg"
              alt=""
              className="block size-full max-w-none"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TechnologyVisual({ data }: { data?: any } = {}) {
  void data;
  return (
    <TechnologyVisualFadeIn
      className="pointer-events-none absolute top-[60px] left-0 z-[1] h-[642px] w-full"
      style={{ animationDelay: '0.3s' }}
      data-node-id="2388:318"
      data-name="Image"
    >
      <div
        className="absolute top-[46.8px] left-1/2 contents -translate-x-1/2"
        style={{ left: "calc(50% - 11.61px)" }}
        data-node-id="2379:1422"
        data-name="Mask group"
      >
        <div
          className="absolute top-[161.1px] left-1/2 h-[340.581px] w-[731.602px] -translate-x-1/2 overflow-hidden"
          style={edgeFadeMaskStyle}
          data-node-id="2379:1424"
          data-name="image 37"
        >
          {mediaUrl(data?.image) ? (
            <Image
              src={mediaUrl(data?.image) as string}
              alt={data?.image_alt || ""}
              fill
              className="object-contain object-bottom"
              sizes="732px"
            />
          ) : null}
        </div>
      </div>
    </TechnologyVisualFadeIn>
  );
}
