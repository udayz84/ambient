import { gilroyMedium, interRegular, dmMono } from "../hero/fonts";
import { mediaUrl } from "@/lib/strapi";
import { Corners } from "../shared/Corners";
import {
  CORNER_LEFT,
  CORNER_RIGHT,
  MODELFORGE_TITLE_GRADIENT,
} from "./dvk-data";

const DEFAULT_HEADING = "Powered by ModelForge.";
const DEFAULT_SUBTITLE =
  "Don't let software be the bottleneck. The Cranium DVK is fully supported by our unified software toolchain, designed to take you from a standard TensorFlow model to on-silicon inference in under 15 minutes.";
const DEFAULT_TOOLCHAIN_TITLE = "ModelForge SDK";
const DEFAULT_TOOLCHAIN_SUBTITLE = "Pre-integrated RTOS & Eclipse-based Unified Build";
const DEFAULT_TOOLCHAIN_LABELS = "RTOS\nDRIVERS\nCOMPILER";
const DEFAULT_FLOATING_TAGS = "RTOS\nDSP\nDrivers\nBuild";

const DEFAULT_YOUR_MODEL_TITLE = "Your Model";
const DEFAULT_YOUR_MODEL_DESC = "Automated TFLite conversion & quantization";
const DEFAULT_DVK_BOARD_TITLE = "Cranium DVK";
const DEFAULT_DVK_BOARD_DESC = "15 minutes to on-silicon execution";

const ABSTRACT_IMG = "/dvk/modelforge-abstract.svg";
const CENTER_IMG = "/dvk/modelforge-center.webp";
const YOUR_MODEL_IMG = "/dvk/modelforge-your-model.webp";
const DVK_BOARD_IMG = "/dvk/board-blueprint.webp";
const LINE_LEFT = "/dvk/modelforge-line-left.svg";
const LINE_RIGHT = "/dvk/modelforge-line-right.svg";
const CONN_LT = "/dvk/modelforge-conn-lt.svg";
const CONN_LB = "/dvk/modelforge-conn-lb.svg";
const CONN_RT = "/dvk/modelforge-conn-rt.svg";
const CONN_RB = "/dvk/modelforge-conn-rb.svg";

const CARD_BG = "rgba(0,0,0,0.5)";
const CARD_BORDER = "rgba(255,255,255,0.3)";
const TAG_BG = "rgba(0,0,0,0.2)";
/** Figma 2761:3018 — media container radial fade. */
const MEDIA_RADIAL =
  "radial-gradient(ellipse 363.01px 135px at 146px 135px, rgba(26,26,26,1) 0%, rgba(13,13,13,1) 25%, rgba(7,7,7,1) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 100%)";

/**
 * Figma 3773:685 — "Powered by ModelForge." section.
 * Desktop canvas is 1440 wide / 873 tall; children are absolutely positioned
 * exactly as in Figma.
 */
export function DvkModelForge({ data }: { data?: any }) {
  const heading = data?.heading || DEFAULT_HEADING;
  const subtitle = data?.subtitle || DEFAULT_SUBTITLE;
  const centerImage = mediaUrl(data?.center_image);
  
  const yourModelTitle = data?.your_model_title || DEFAULT_YOUR_MODEL_TITLE;
  const yourModelDesc = data?.your_model_description || DEFAULT_YOUR_MODEL_DESC;
  const yourModelImage = mediaUrl(data?.your_model_image);
  
  const dvkBoardTitle = data?.dvk_board_title || DEFAULT_DVK_BOARD_TITLE;
  const dvkBoardDesc = data?.dvk_board_description || DEFAULT_DVK_BOARD_DESC;
  const dvkBoardImage = mediaUrl(data?.dvk_board_image);
  
  const toolchainTitle = data?.toolchain_title || DEFAULT_TOOLCHAIN_TITLE;
  const toolchainSubtitle = data?.toolchain_subtitle || DEFAULT_TOOLCHAIN_SUBTITLE;
  
  const toolchainLabels = Array.isArray(data?.toolchain_labels) && data.toolchain_labels.length > 0
    ? data.toolchain_labels.map((t: any) => t?.text).filter(Boolean)
    : DEFAULT_TOOLCHAIN_LABELS.split("\n");
    
  const floatingTags = Array.isArray(data?.floating_tags) && data.floating_tags.length > 0
    ? data.floating_tags.map((t: any) => t?.text).filter(Boolean)
    : DEFAULT_FLOATING_TAGS.split("\n");

  return (
    <div className="relative h-[873px] w-[1440px]" data-node-id="3773:685">
      {/* Abstract design (2761:2645) */}
      <div className="pointer-events-none absolute top-[32px] left-1/2 h-[320px] w-[881.616px] -translate-x-1/2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ABSTRACT_IMG}
          alt=""
          aria-hidden
          className="absolute inset-0 block size-full max-w-none"
        />
      </div>

      {/* Center visual (2761:3008) */}
      <div className="absolute top-[330px] left-[calc(50%+3.5px)] h-[350px] w-[345px] -translate-x-1/2">
        {centerImage && (
          <img
            src={centerImage}
            alt=""
            className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
          />
        )}
      </div>

      {/* Section title (2761:3009) */}
      <div className="absolute top-[127px] left-1/2 flex w-[650px] -translate-x-1/2 flex-col items-center justify-center gap-[24px]">
        <div className="relative flex w-[540px] flex-col items-center px-[10px]">
          <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
          <h2
            className={`${gilroyMedium.className} m-0 w-[520px] bg-clip-text text-center text-[46px] leading-[49px] font-medium whitespace-nowrap text-transparent not-italic [word-break:break-word]`}
            style={{
              backgroundImage: MODELFORGE_TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            {heading}
          </h2>
        </div>
        <p
          className={`${interRegular.className} w-[650px] text-center text-[14px] leading-[21px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
        >
          {subtitle}
        </p>
      </div>

      {/* Left article — Your Model (2761:3030) */}
      <ModelCard
        className="top-[363.4px] left-[88px]"
        image={yourModelImage}
        imagePadding="px-[21px] py-px"
        title={yourModelTitle}
        description={yourModelDesc}
      />

      {/* Right article — Cranium DVK (2761:3017) */}
      <ModelCard
        className="top-[363.4px] left-[1028px] h-[386px]"
        image={dvkBoardImage}
        imagePadding="p-[21px]"
        imageRounded
        title={dvkBoardTitle}
        description={dvkBoardDesc}
      />

      {/* Arrow — left (2761:3048) */}
      <div className="absolute top-[533.84px] left-[420.89px] h-0 w-[109.992px]">
        <div className="absolute inset-[-2.89px_-3.36%_-2.89px_-3.1%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LINE_LEFT} alt="" aria-hidden className="block size-full max-w-none" />
        </div>
      </div>

      {/* Arrow — right (2761:3049) */}
      <div className="absolute top-[533.84px] left-[916.27px] flex h-0 w-[109.992px] items-center justify-center">
        <div className="flex-none -scale-y-100 rotate-180">
          <div className="relative h-0 w-[109.992px]">
            <div className="absolute inset-[-2.89px_-3.36%_-2.89px_-3.1%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={LINE_RIGHT} alt="" aria-hidden className="block size-full max-w-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Center bottom block (2761:3050) */}
      <div className="absolute top-[698.46px] left-1/2 flex w-[650px] -translate-x-1/2 flex-col items-center gap-[12px]">
        <p
          className={`${gilroyMedium.className} w-[min-content] min-w-full text-center text-[32px] leading-[38px] text-white not-italic [word-break:break-word]`}
        >
          {toolchainTitle}
        </p>
        <p
          className={`${interRegular.className} w-[min-content] min-w-full text-center text-[14px] leading-[21px] font-normal text-[#bbbbbb] not-italic [word-break:break-word]`}
        >
          {toolchainSubtitle}
        </p>
        <div className="flex items-center gap-[10px]">
          {toolchainLabels.map((tag: string, i: number) => (
            <ToolchainChip key={tag} label={tag} last={i === toolchainLabels.length - 1} />
          ))}
        </div>
      </div>

      {/* Connector — left top (3768:481) */}
      <Connector className="top-[403.5px] left-[517.5px]" src={CONN_LT} />
      {/* Connector — left bottom (3768:506), flipped vertically */}
      <Connector className="top-[641.5px] left-[517.5px] -scale-y-100" src={CONN_LB} />
      {/* Connector — right bottom (3768:517), rotated 180° */}
      <Connector className="top-[636.5px] left-[864.5px] rotate-180" src={CONN_RB} />
      {/* Connector — right top (3768:495), rotated 180° + flipped vertically */}
      <Connector className="top-[423.5px] left-[870.5px] -scale-y-100 rotate-180" src={CONN_RT} />

      {/* Floating tags */}
      {floatingTags.length > 0 && <Tag label={floatingTags[0]} className="top-[383px] right-[926px]" />}
      {floatingTags.length > 1 && <Tag label={floatingTags[1]} className="top-[403px] left-[948px]" />}
      {floatingTags.length > 2 && <Tag label={floatingTags[2]} className="top-[661px] right-[926px]" />}
      {floatingTags.length > 3 && <Tag label={floatingTags[3]} className="top-[658px] left-[948px]" />}
    </div>
  );
}

function ModelCard({
  className = "",
  image,
  imagePadding,
  imageRounded = false,
  title,
  description,
}: {
  className?: string;
  image?: string | null;
  imagePadding: string;
  imageRounded?: boolean;
  title: string;
  description: string;
}) {
  return (
    <div
      className={`absolute flex w-[332px] flex-col items-center gap-[20px] overflow-clip border-[0.5px] border-solid px-[20px] pt-[20px] pb-[32px] ${className}`}
      style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}
    >
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      <div
        className={`relative flex h-[270px] w-full shrink-0 items-center justify-center rounded-[6px] border border-solid ${imagePadding}`}
        style={{ borderColor: "rgba(0,255,0,0.3)", backgroundImage: MEDIA_RADIAL }}
      >
        <div className={`relative h-full min-w-px flex-1 ${imageRounded ? "rounded-[6px]" : ""}`}>
          {image && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={image}
              alt=""
              className={`pointer-events-none absolute inset-0 size-full max-w-none border-0 border-solid border-transparent bg-clip-padding object-contain ${imageRounded ? "rounded-[6px]" : ""}`}
            />
          )}
        </div>
      </div>
      <div className="flex w-full flex-col items-start">
        <div className="flex w-full flex-col items-start gap-[10px]">
          <div className="flex w-full items-center justify-center">
            <p
              className={`${gilroyMedium.className} text-[22px] leading-[28px] whitespace-nowrap text-white not-italic [word-break:break-word]`}
            >
              {title}
            </p>
          </div>
          <p
            className={`${interRegular.className} w-full text-center text-[16px] leading-[24px] font-normal text-[rgba(240,240,240,0.6)] not-italic [word-break:break-word]`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function ToolchainChip({ label, last }: { label: string; last?: boolean }) {
  return (
    <div 
      className="relative h-[26px] w-[103px] shrink-0 overflow-clip bg-[rgba(115,190,91,0.12)] border-[0.5px] border-solid"
      style={{ borderColor: CARD_BORDER }}
    >
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      <p
        className={`${dmMono.className} absolute top-[calc(50%-4.5px)] -translate-x-1/2 text-center text-[13px] leading-[19.5px] tracking-[-0.39px] whitespace-nowrap text-[#ecfae5] uppercase not-italic [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] ${
          last ? "left-[calc(50%+0.5px)]" : "left-[calc(50%+1px)]"
        }`}
      >
        {label}
      </p>
      <div className="absolute top-1/2 left-[7px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
      <div className="absolute top-1/2 right-[7px] h-[12px] w-[2px] -translate-y-1/2 bg-white opacity-60" />
    </div>
  );
}

function Connector({ className = "", src }: { className?: string; src: string }) {
  return (
    <div className={`absolute h-[40.784px] w-[75.784px] ${className}`}>
      <div className="absolute inset-[-1.84%_-5.28%_-9.81%_0]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" aria-hidden className="block size-full max-w-none" />
      </div>
    </div>
  );
}

function Tag({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`absolute flex flex-col items-start gap-[20px] overflow-clip border-[0.5px] border-solid p-[10px] ${className}`}
      style={{ backgroundColor: TAG_BG, borderColor: CARD_BORDER }}
    >
      <Corners leftSrc={CORNER_LEFT} rightSrc={CORNER_RIGHT} />
      <div className="flex flex-col items-start">
        <p
          className={`${interRegular.className} text-[14px] leading-[21px] font-normal whitespace-nowrap text-white not-italic [word-break:break-word]`}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
