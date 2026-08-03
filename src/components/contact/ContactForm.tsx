"use client";

import { useState } from "react";
import {
  interLight,
  gilroyMedium,
  interRegular,
} from "../hero/fonts";
import { mediaUrl } from "@/lib/strapi";
import {
  CornerDecor,
  GradientTitle,
  GreenCtaButton,
} from "./contact-shared";
import { Corners } from "../shared/Corners";

type TrackId = "sales" | "developer" | "media";

const tracks = [
  {
    id: "sales" as const,
    top: 66,
    height: 134,
    checkboxTop: 57,
    connectorTop: 247,
    nodeId: "2379:8506",
  },
  {
    id: "developer" as const,
    top: 212,
    height: 158,
    checkboxTop: 69,
    connectorTop: 415,
    nodeId: "2379:8521",
  },
  {
    id: "media" as const,
    top: 382,
    height: 158,
    checkboxTop: 69,
    connectorTop: 574,
    nodeId: "2379:8537",
  },
] as const;

const formFields = [
  { left: 16, top: 83, nodeId: "2379:8555" },
  { left: 301, top: 83, nodeId: "2379:8556" },
  { left: 16, top: 172, nodeId: "2379:8557" },
  { left: 301, top: 172, nodeId: "2379:8558" },
  { left: 16, top: 261, nodeId: "2379:8559" },
  { left: 301, top: 261, nodeId: "2379:8560" },
] as const;

function mapInputType(fieldType: string | undefined | null): string {
  switch (fieldType) {
    case "email":
      return "email";
    case "phone":
      return "tel";
    default:
      return "text";
  }
}

export function ContactForm({ data }: { data?: any }) {
  const [activeTrackId, setActiveTrackId] = useState<TrackId>("sales");
  const [subscribed, setSubscribed] = useState(false);

  const heading = data?.heading || "";
  const subtitle = data?.subtitle || "";
  const messageHeading = data?.message_heading || "";
  const checkboxLabel = data?.checkbox_label || "";
  const submitLabel = data?.submit_label || "";
  const submitHref = data?.submit_href || "";

  const strapiTracks: ReadonlyArray<any> = Array.isArray(data?.tracks)
    ? data.tracks
    : [];
  const mergedTracks = tracks.map((track, index) => {
    const remote = strapiTracks[index];
    if (!remote) return { ...track, title: "", description: "", remoteIcon: null, strapiFields: [] };
    return {
      ...track,
      title: remote.label || "",
      description: remote.description || "",
      remoteIcon: mediaUrl(remote.icon),
      strapiFields: Array.isArray(remote.form) ? remote.form : [],
    };
  });

  const activeMergedTrack = mergedTracks.find((t) => t.id === activeTrackId);
  const currentStrapiFields: ReadonlyArray<any> =
    activeMergedTrack?.strapiFields || [];

  // Separate Strapi fields: textarea fields go to the bottom section, others to the grid
  const strapiInputFields = currentStrapiFields.filter(
    (f: any) => f.field_type !== "textarea",
  );
  const strapiTextareaField = currentStrapiFields.find(
    (f: any) => f.field_type === "textarea",
  );

  // Build 6 grid-position fields from Strapi data where available
  const mergedFields = formFields.map((fallback, index) => {
    const remote = strapiInputFields[index];
    if (!remote) return { ...fallback, label: "", placeholder: "", inputType: "text" };
    return {
      ...fallback,
      label: remote.label || "",
      placeholder: remote.placeholder || "",
      inputType: mapInputType(remote.field_type),
      nodeId: `${fallback.nodeId}-${index}`,
    };
  });

  // Bottom textarea from Strapi data
  const textareaLabel = strapiTextareaField?.label || "";
  const textareaPlaceholder = strapiTextareaField?.placeholder || "";

  const activeConnectorTop =
    mergedTracks.find((track) => track.id === activeTrackId)?.connectorTop ??
    mergedTracks[0].connectorTop;

  return (
    <div
      className="absolute top-[2376px] left-1/2 z-20 h-[744px] w-[1204px] -translate-x-1/2"
      data-node-id="2379:8494"
    >
      <div
        className="absolute top-0 left-0 flex h-[54px] w-[1071px] items-center justify-between"
        data-node-id="2379:8495"
        data-name="Title Section"
      >
        <div
          className="flex h-[49px] shrink-0 flex-col items-center justify-center"
          data-node-id="2379:8496"
          data-name="Section Title"
        >
          <div className="relative flex flex-col items-center px-[10px]" data-node-id="2379:8497">
            <GradientTitle
              nodeId="2379:8498"
              gradientDeg="119.522deg"
              className="whitespace-nowrap leading-[49px]"
            >
              {heading}
            </GradientTitle>
            <CornerDecor />
          </div>
        </div>
        <p
          className={`${interRegular.className} w-[458px] shrink-0 text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
          data-node-id="2379:8503"
        >
          {subtitle}
        </p>
      </div>

      <div
        className="absolute top-[114px] left-0 h-[630px] w-[550px]"
        data-node-id="2379:8504"
        data-name="Left Section"
      >
        <p
          className={`${interRegular.className} absolute top-0 left-0 w-[550px] text-[18px] leading-[27px] font-normal text-white opacity-65 not-italic [word-break:break-word]`}
          data-node-id="2379:8505"
        >
          {subtitle}
        </p>

        {mergedTracks.map((track) => (
          <TrackCard
            key={track.nodeId}
            {...track}
            selected={activeTrackId === track.id}
            onSelect={() => setActiveTrackId(track.id)}
          />
        ))}
      </div>

      <ConnectorLine top={activeConnectorTop} nodeId="2379:8552" />

      <div
        className="absolute top-[114px] left-[604px] h-[630px] w-[590px] overflow-clip border-[1.5px] border-solid border-[rgba(83,216,36,0.2)] bg-[rgba(46,119,20,0.2)]"
        data-node-id="2379:8553"
        data-name="Right Section"
      >
        <Corners />

        <p
          className={`${gilroyMedium.className} absolute top-[31px] left-[16px] w-[558px] text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
          data-node-id="2379:8554"
        >
          {messageHeading}
        </p>

        {mergedFields.map((field) => (
          <FormField key={field.nodeId} {...field} />
        ))}

        <FormField
          label={textareaLabel}
          placeholder={textareaPlaceholder}
          left={16}
          top={350}
          width={560}
          height={132}
          multiline
          nodeId="2379:8561"
        />

        <label
          className="absolute top-[506px] left-[16px] flex w-[558px] cursor-pointer items-center gap-[12px]"
          data-node-id="2379:8562"
          data-name="Check Box"
        >
          <input
            type="checkbox"
            checked={subscribed}
            onChange={(event) => setSubscribed(event.target.checked)}
            className="sr-only"
          />
          <span
            className={`relative size-[20px] shrink-0 border border-solid ${
              subscribed ? "border-[#53d824] bg-[#53d824]" : "border-[rgba(240,240,240,0.3)]"
            }`}
            data-node-id="2379:8563"
          >
            {subscribed ? (
              <svg
                className="absolute inset-0 size-full p-[2px] text-[#091804]"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : null}
          </span>
          <span
            className={`${interRegular.className} text-[14px] leading-[21px] font-normal whitespace-nowrap text-white not-italic`}
            data-node-id="2379:8564"
          >
            {checkboxLabel}
          </span>
        </label>

        <GreenCtaButton
          className="absolute top-[551px] left-[16px]"
          width="558px"
          href={submitHref}
        >
          {submitLabel}
        </GreenCtaButton>
      </div>
    </div>
  );
}

function TrackCard({
  title,
  description,
  remoteIcon,
  selected,
  top,
  height,
  checkboxTop,
  nodeId,
  onSelect,
}: Omit<(typeof tracks)[number], "icon"> & {
  title: string;
  description: string;
  remoteIcon: string | null;
  selected: boolean;
  onSelect: () => void;
}) {
  const iconSrc = remoteIcon;
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`absolute left-0 flex w-[550px] cursor-pointer items-center gap-[36px] py-[24px] pr-[48px] pl-[36px] text-left transition-[border-color,background-color] duration-200 ${
        selected
          ? "border-[1.5px] border-solid border-[rgba(83,216,36,0.2)] bg-[rgba(46,119,20,0.2)]"
          : "border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.2)]"
      }`}
      style={{ top, height }}
      data-node-id={nodeId}
    >
      <Corners />

      <div className="relative size-[32px] shrink-0" data-name="Frame">
        {iconSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt=""
            className={`absolute inset-0 block size-full max-w-none transition-[filter,opacity] duration-200 ${
              selected ? "opacity-100" : "opacity-70 brightness-0 invert"
            }`}
            src={iconSrc}
            aria-hidden
          />
        ) : null}
      </div>

      <div
        className="flex min-w-0 flex-1 flex-col gap-[10px] pr-[28px] not-italic [word-break:break-word]"
        data-name="NewsSection"
      >
        <p
          className={`${gilroyMedium.className} w-full text-[22px] leading-[28px] font-medium text-white`}
        >
          {title}
        </p>
        <p
          className={`${interRegular.className} w-full text-[16px] leading-[24px] font-normal text-[#a4a4a4]`}
        >
          {description}
        </p>
      </div>

      <div
        className="absolute right-[48px] shrink-0"
        style={{ top: `${checkboxTop}px` }}
        data-name="Checkbox"
      >
        <TrackRadio selected={selected} />
      </div>
    </button>
  );
}

function TrackRadio({ selected }: { selected: boolean }) {
  if (selected) {
    return (
      <div className="relative size-[20px] overflow-clip rounded-full bg-[#53d824]">
        <span className="absolute top-1/2 left-1/2 size-[18px] -translate-x-1/2 -translate-y-1/2 rounded-[50px] bg-[#091804]" />
        <span className="absolute top-1/2 left-1/2 size-[12px] -translate-x-1/2 -translate-y-1/2 rounded-[30px] bg-[#53d824]" />
      </div>
    );
  }
  return (
    <div className="relative size-[20px] overflow-clip rounded-full bg-[#e2f9da] opacity-50">
      <span className="absolute top-1/2 left-1/2 size-[18px] -translate-x-1/2 -translate-y-1/2 rounded-[30px] bg-[#091804]" />
    </div>
  );
}

function ConnectorLine({ top, nodeId }: { top: number; nodeId: string }) {
  return (
    <div
      className="pointer-events-none absolute left-[550px] h-0 w-[54px] transition-[top] duration-300 ease-out"
      style={{ top }}
      data-node-id={nodeId}
    >
      <div className="absolute inset-[-1px_0_0_0]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="block size-full max-w-none"
          src="/contact/line-connector.svg"
          aria-hidden
        />
      </div>
    </div>
  );
}

function FormField({
  label,
  placeholder,
  left,
  top,
  width = 273,
  height = 65,
  multiline = false,
  inputType = "text",
  nodeId,
}: {
  label: string;
  placeholder: string;
  left: number;
  top: number;
  width?: number;
  height?: number;
  multiline?: boolean;
  inputType?: string;
  nodeId: string;
}) {
  const fieldId = `field-${nodeId.replace(/:/g, "-")}`;
  const inputClassName = `${interRegular.className} w-full border-0 bg-transparent p-0 text-[14px] leading-[21px] font-normal text-white not-italic placeholder:text-[#4a4a4a] outline-none`;
  return (
    <div
      className="absolute flex flex-col gap-[5px]"
      style={{ left, top, width, height }}
      data-node-id={nodeId}
      data-name="Input Field"
    >
      <label
        htmlFor={fieldId}
        className={`${interLight.className} w-full shrink-0 text-[10px] leading-[15px] font-light text-white not-italic`}
      >
        {label}
      </label>
      <div className="flex min-h-0 flex-1 items-start border-[0.5px] border-solid border-[#4a4a4a] p-[12px]">
        {multiline ? (
          <textarea
            id={fieldId}
            name={fieldId}
            placeholder={placeholder}
            className={`${inputClassName} h-full resize-none`}
          />
        ) : (
          <input
            id={fieldId}
            name={fieldId}
            type={inputType}
            placeholder={placeholder}
            className={inputClassName}
          />
        )}
      </div>
    </div>
  );
}
