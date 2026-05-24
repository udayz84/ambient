import {
  interLight,
  interMedium,
  interRegular,
} from "../hero/fonts";
import {
  CornerDecor,
  GradientTitle,
  GreenCtaButton,
} from "./contact-shared";

const cornerLeft = "/hero/corner-tag-1.svg";
const cornerRight = "/hero/corner-tag-2.svg";

const tracks = [
  {
    title: "Sales & Enterprise",
    description:
      "Request a quote, discuss volume licensing, or inquire about custom ASIC development.",
    icon: "/contact/track-sales.svg",
    selected: true,
    top: 66,
    height: 134,
    checkboxTop: 57,
    nodeId: "2379:8506",
    borderInset: "1.5px",
  },
  {
    title: "Developer Support",
    description:
      "Report a bug, request documentation, or get help compiling your model via the Nebula SDK.",
    icon: "/contact/track-developer.svg",
    selected: false,
    top: 212,
    height: 158,
    checkboxTop: 69,
    nodeId: "2379:8521",
    borderInset: "0.5px",
  },
  {
    title: "Media & Press",
    description:
      "Request an interview with our leadership team, access press materials, or coordinate coverage.",
    icon: "/contact/track-media.svg",
    selected: false,
    top: 382,
    height: 158,
    checkboxTop: 69,
    nodeId: "2379:8537",
    borderInset: "0.5px",
  },
] as const;

const formFields = [
  { label: "First Name", placeholder: "Enter Your First Name", left: 16, top: 83, nodeId: "2379:8555" },
  { label: "Last Name", placeholder: "Enter Your Last Name", left: 301, top: 83, nodeId: "2379:8556" },
  { label: "Company Name", placeholder: "Enter Your Company Name", left: 16, top: 172, nodeId: "2379:8557" },
  { label: "Job Title", placeholder: "Enter Your Job Title", left: 301, top: 172, nodeId: "2379:8558" },
  { label: "Corporate Email", placeholder: "Enter Your Corporate Email", left: 16, top: 261, nodeId: "2379:8559" },
  { label: "Phone Number", placeholder: "Enter Your Phone Number", left: 301, top: 261, nodeId: "2379:8560" },
] as const;

const connectors = [
  { top: 247, nodeId: "2379:8552", variant: "primary" as const },
  { top: 415, nodeId: "2388:296", variant: "secondary" as const },
  { top: 574, nodeId: "2388:297", variant: "secondary" as const },
] as const;

export function ContactForm() {
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
              Prefer to write to us?
            </GradientTitle>
            <CornerDecor />
          </div>
        </div>
        <p
          className={`${interRegular.className} w-[458px] shrink-0 text-[18px] leading-[27px] font-normal text-[#f0f0f0] not-italic [word-break:break-word]`}
          data-node-id="2379:8503"
        >
          Select your track below to ensure your message reaches the right desk
          immediately.
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
          Choose the right team to ensure your message reaches the right experts.
        </p>

        {tracks.map((track) => (
          <TrackCard key={track.nodeId} {...track} />
        ))}
      </div>

      {connectors.map((line) => (
        <ConnectorLine key={line.nodeId} {...line} />
      ))}

      <div
        className="absolute top-[114px] left-[604px] h-[630px] w-[590px] overflow-clip border-[1.5px] border-solid border-[rgba(83,216,36,0.2)] bg-[rgba(46,119,20,0.2)] shadow-[0px_0px_20px_0px_rgba(83,216,36,0.25)]"
        data-node-id="2379:8553"
        data-name="Right Section"
      >
        <FormPanelCorners />

        <p
          className={`${interMedium.className} absolute top-[31px] left-[16px] w-[558px] text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
          data-node-id="2379:8554"
        >
          Drop Us a Message
        </p>

        {formFields.map((field) => (
          <FormField key={field.nodeId} {...field} />
        ))}

        <FormField
          label="How can we help?"
          placeholder="Describe your use case, technical requirements, or business needs..."
          left={16}
          top={350}
          width={560}
          height={132}
          nodeId="2379:8561"
        />

        <label
          className="absolute top-[506px] left-[16px] flex w-[558px] cursor-pointer items-center gap-[12px]"
          data-node-id="2379:8562"
          data-name="Check Box"
        >
          <span
            className="relative size-[20px] shrink-0"
            data-node-id="2379:8563"
          />
          <span
            className={`${interRegular.className} text-[14px] leading-[21px] font-normal whitespace-nowrap text-white not-italic`}
            data-node-id="2379:8564"
          >
            Sign up for news & updates
          </span>
        </label>

        <GreenCtaButton
          className="absolute top-[551px] left-[16px]"
          width="558px"
          href="#"
        >
          Send Message
        </GreenCtaButton>
      </div>
    </div>
  );
}

function TrackCard({
  title,
  description,
  icon,
  selected,
  top,
  height,
  checkboxTop,
  nodeId,
  borderInset,
}: (typeof tracks)[number]) {
  return (
    <div
      className={`absolute left-0 flex w-[550px] items-center gap-[36px] overflow-clip py-[24px] pr-[48px] pl-[36px] ${
        selected
          ? "border-[1.5px] border-solid border-[rgba(83,216,36,0.2)] bg-[rgba(46,119,20,0.2)] shadow-[0px_0px_20px_0px_rgba(83,216,36,0.25)]"
          : "border-[0.5px] border-solid border-[rgba(240,240,240,0.2)] bg-[rgba(0,0,0,0.2)]"
      }`}
      style={{ top, height }}
      data-node-id={nodeId}
    >
      <TrackCorners inset={borderInset} />

      <div className="relative size-[32px] shrink-0" data-name="Frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={icon} aria-hidden />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-[10px] not-italic [word-break:break-word]" data-name="NewsSection">
        <p className={`${interMedium.className} w-full text-[22px] leading-[28px] font-medium text-white`}>
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
    </div>
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

function ConnectorLine({
  top,
  nodeId,
  variant,
}: {
  top: number;
  nodeId: string;
  variant: "primary" | "secondary";
}) {
  return (
    <div
      className="pointer-events-none absolute left-[550px] h-0 w-[54px]"
      style={{ top }}
      data-node-id={nodeId}
    >
      {variant === "primary" ? (
        <div className="absolute inset-[-1px_0_0_0]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src="/contact/line-connector.svg" aria-hidden />
        </div>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          alt=""
          className="absolute inset-0 block size-full max-w-none"
          src="/contact/line-connector-short.svg"
          aria-hidden
        />
      )}
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
  nodeId,
}: {
  label: string;
  placeholder: string;
  left: number;
  top: number;
  width?: number;
  height?: number;
  nodeId: string;
}) {
  return (
    <div
      className="absolute flex flex-col gap-[5px]"
      style={{ left, top, width, height }}
      data-node-id={nodeId}
      data-name="Input Field"
    >
      <label
        className={`${interLight.className} w-full shrink-0 text-[10px] leading-[15px] font-light text-white not-italic`}
      >
        {label}
      </label>
      <div className="flex min-h-0 flex-1 items-start border-[0.5px] border-solid border-[#4a4a4a] p-[12px]">
        <span
          className={`${interRegular.className} text-[14px] leading-[21px] font-normal text-[#4a4a4a] not-italic`}
        >
          {placeholder}
        </span>
      </div>
    </div>
  );
}

function TrackCorners({ inset }: { inset: "1.5px" | "0.5px" }) {
  const o = inset === "1.5px" ? "1.5px" : "0.5px";
  return <InsetCorners inset={o} />;
}

function FormPanelCorners() {
  return <InsetCorners inset="1.5px" />;
}

function InsetCorners({ inset }: { inset: string }) {
  return (
    <>
      <div
        className="pointer-events-none absolute flex size-[4px] items-center justify-center"
        style={{ left: `-${inset}`, top: `-${inset}` }}
      >
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={cornerLeft} aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute flex size-[4px] items-center justify-center"
        style={{ right: `-${inset}`, top: `-${inset}` }}
      >
        <div className="rotate-180 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={cornerRight} aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute size-[4px]"
        style={{ left: `-${inset}`, bottom: `-${inset}` }}
      >
        <div className="absolute inset-[0_0_-12.5%_-12.5%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={cornerLeft} aria-hidden />
        </div>
      </div>
      <div
        className={`pointer-events-none absolute flex size-[4px] items-center justify-center`}
        style={{ right: `-${inset}`, bottom: `-${inset}` }}
      >
        <div className="-scale-y-100 rotate-180 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={cornerRight} aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
