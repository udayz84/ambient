"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { gilroyMedium, gilroySemiBold, interLight, interRegular } from "../hero/fonts";
import { BOX_BORDER } from "./careers-shared";
import { Corners } from "../shared/Corners";

const PANEL_BG = "/form.png";
const SUCCESS_IMG = "/careers/apply-success.png";
const INDIA_FLAG = "/careers/india-flag.png";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

type Step = "description" | "form" | "confirmation";

export function CareersApplicationModal({
  isOpen,
  onClose,
  jobTitle,
  roles,
  jobDescription,
}: {
  isOpen: boolean;
  onClose: () => void;
  jobTitle?: string;
  roles?: string[];
  jobDescription?: {
    about_role?: string;
    responsibilities?: string;
    perks_benefits?: string;
  };
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>("description");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isOpen) {
      setStep("description");
      setShouldRender(true);
      timeoutId = setTimeout(() => setIsAnimating(true), 50);
    } else {
      setIsAnimating(false);
      timeoutId = setTimeout(() => setShouldRender(false), 300);
    }

    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!mounted || !shouldRender) return null;

  const handleClose = () => {
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-end overflow-hidden">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${isAnimating ? "opacity-100" : "opacity-0"}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Panel — 700 x 800 shaped container (form.png defines the silhouette via its alpha channel); shared across all steps, slides in from the right */}
      <div
        ref={modalRef}
        className={`relative h-[800px] w-[700px] shrink-0 overflow-hidden transition-all duration-300 ease-out ${isAnimating ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
      >
        {/* Background — Rectangle 1618873545 */}
        <Image
          src={PANEL_BG}
          alt=""
          fill
          priority
          sizes="700px"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />

        {step === "description" && (
          <DescriptionStep
            jobTitle={jobTitle}
            onApply={() => setStep("form")}
            onClose={handleClose}
            jobDescription={jobDescription}
          />
        )}

        {step === "form" && (
          <FormStep
            jobTitle={jobTitle}
            roles={roles}
            onClose={handleClose}
            onSubmit={() => setStep("confirmation")}
          />
        )}

        {step === "confirmation" && <ConfirmationStep onClose={handleClose} />}
      </div>
    </div>,
    document.body
  );
}

/* ----------------------------- Description ----------------------------- */

function DescriptionStep({
  jobTitle,
  onApply,
  onClose,
  jobDescription,
}: {
  jobTitle?: string;
  onApply: () => void;
  onClose: () => void;
  jobDescription?: {
    about_role?: string;
    responsibilities?: string;
    perks_benefits?: string;
  };
}) {
  const aboutRole = jobDescription?.about_role || "Lead the strategy, roadmap, and execution of next-generation Edge AI semiconductor products, collaborating with engineering, AI, software, and business teams to deliver innovative solutions. Define product requirements, prioritize features, analyze market trends, and drive successful product launches. Work closely with customers and stakeholders to ensure Ambient Scientific's ultra-low-power AI processors meet evolving industry needs while accelerating the adoption of intelligent edge computing technologies.";
  
  const responsibilities = jobDescription?.responsibilities
    ? jobDescription.responsibilities.split("\n").filter((l) => l.trim())
    : [
        "Define and execute the product vision, strategy, and roadmap for Ambient Scientific's Edge AI and semiconductor solutions.",
        "Gather customer, partner, and market insights to identify product opportunities and drive innovation.",
        "Collaborate with hardware, AI, firmware, and software engineering teams throughout the product lifecycle.",
        "Translate business goals into clear product requirements, user stories, and technical specifications.",
        "Prioritize features, manage product backlogs, and ensure timely delivery of high-impact releases.",
        "Work closely with sales, marketing, and business development teams to support product positioning, launches, and customer engagements.",
        "Monitor industry trends, competitive landscape, and emerging AI technologies to maintain product leadership.",
        "Define and track product KPIs, analyze performance metrics, and continuously optimize product success.",
      ];

  const perks = jobDescription?.perks_benefits
    ? jobDescription.perks_benefits.split("\n").filter((l) => l.trim())
    : [
        "Competitive salary with performance-based incentives and long-term career growth opportunities.",
        "Work on cutting-edge Edge AI and semiconductor technologies alongside industry experts.",
        "Collaborative, innovation-driven culture with opportunities to influence product strategy and business decisions.",
        "Comprehensive health benefits, paid time off, and flexible work arrangements to support work-life balance.",
        "Access to continuous learning, technical training, conferences, and professional development programs.",
      ];

  return (
    <>
      <PanelHeader
        jobTitle={jobTitle}
        onClose={onClose}
        cta={
          <GreenCta label="Apply Now" width="w-[140px]" onClick={onApply} />
        }
      />
      <Divider />

      <div
        className={`${interRegular.className} custom-scrollbar absolute bottom-[80px] left-[40px] right-[40px] top-[143px] flex flex-col gap-[24px] overflow-y-auto pb-[20px] pr-[8px] font-normal text-[#a4a4a4] not-italic`}
      >
        <section className="flex flex-col gap-[10px]">
          <h3 className="text-[20px] leading-[27px] font-normal text-white">About the Role</h3>
          <p className="text-[12px] leading-[18px]">{aboutRole}</p>
        </section>

        <section className="flex flex-col gap-[10px]">
          <h3 className="text-[20px] leading-[27px] font-normal text-white">Key Responsibilities</h3>
          <ul className="block list-disc text-[12px] leading-[18px]">
            {responsibilities.map((item, i) => (
              <li key={i} className="ms-[18px] leading-[18px]">{item}</li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-[10px]">
          <h3 className="text-[20px] leading-[27px] font-normal text-white">Perks and Benefits</h3>
          <ul className="block list-disc text-[12px] leading-[18px]">
            {perks.map((item, i) => (
              <li key={i} className="ms-[18px] leading-[18px]">{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

/* -------------------------------- Form --------------------------------- */

const FIELD_BOX =
  "h-[42px] w-full border-[0.5px] border-solid border-[#4a4a4a] bg-transparent px-[12px] text-[14px] leading-[21px] text-white outline-none placeholder:text-[#4a4a4a] focus:border-[rgba(255,255,255,0.5)]";

function Field({
  label,
  children,
  className = "w-full",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-[5px] ${className}`}>
      <span className={`${interRegular.className} text-[12px] leading-[18px] font-normal text-white not-italic`}>
        {label}
      </span>
      {children}
    </div>
  );
}

function FormStep({
  jobTitle,
  roles,
  onClose,
  onSubmit,
}: {
  jobTitle?: string;
  roles?: string[];
  onClose: () => void;
  onSubmit: () => void;
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(jobTitle || "Senior Product Manager");
  const [otherRole, setOtherRole] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const roleOptions = Array.from(new Set([jobTitle || "Senior Product Manager", ...(roles ?? [])]));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("role", role);
    formData.append("otherRole", otherRole);
    formData.append("coverLetter", coverLetter);
    formData.append("consent", String(consent));
    if (resumeFile) formData.append("resume", resumeFile);

    try {
      const res = await fetch("/api/job-applicants", { method: "POST", body: formData });
      const payload = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        throw new Error(payload.error || "Could not submit your application.");
      }
      onSubmit();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const submitting = status === "submitting";

  return (
    <>
      <PanelHeader jobTitle={jobTitle} onClose={onClose} />
      <Divider />

      <form
        onSubmit={handleSubmit}
        className={`${interRegular.className} absolute bottom-[40px] left-[40px] right-[40px] top-[138px] flex flex-col gap-[24px] overflow-y-auto pr-[8px] font-normal not-italic`}
      >
        {/* Full name */}
        <Field label="Full name*">
          <input
            className={FIELD_BOX}
            placeholder="Enter Your Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </Field>

        {/* Email + Phone */}
        <div className="flex gap-[18px]">
          <Field label="Email ID*" className="min-w-0 flex-1">
            <input
              type="email"
              className={FIELD_BOX}
              placeholder="Enter Your Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>
          <Field label="Phone Number*" className="min-w-0 flex-1">
            <div className="flex h-[42px] w-full items-center gap-[6px] border-[0.5px] border-solid border-[#4a4a4a] bg-transparent px-[12px] focus-within:border-[rgba(255,255,255,0.5)]">
              <div className="flex shrink-0 items-center gap-[2px]">
                <Image
                  src="/careers/chevron-down.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="size-[24px] shrink-0"
                  aria-hidden
                />
                <Image
                  src={INDIA_FLAG}
                  alt=""
                  width={23}
                  height={16}
                  className="h-[16px] w-[23px] shrink-0 object-cover"
                  aria-hidden
                />
                <span className="text-[14px] leading-[21px] text-white">+91</span>
              </div>
              <span className="h-[18px] w-px shrink-0 bg-[#4a4a4a]" aria-hidden />
              <input
                className="min-w-0 flex-1 bg-transparent text-[14px] leading-[21px] text-white outline-none placeholder:text-[#4a4a4a]"
                placeholder="Enter Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </Field>
        </div>

        {/* Role applying for + Didn't find a role */}
        <div className="flex gap-[18px]">
          <Field label="Role applying for*" className="min-w-0 flex-1">
            <div className="relative h-[42px] w-full border-[0.5px] border-solid border-[#4a4a4a] bg-transparent focus-within:border-[rgba(255,255,255,0.5)]">
              <select
                className={`${interRegular.className} h-full w-full appearance-none bg-transparent px-[12px] pr-[40px] text-[14px] leading-[21px] font-normal text-white outline-none not-italic`}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {roleOptions.map((r) => (
                  <option key={r} value={r} className="bg-[#121212] text-white">
                    {r}
                  </option>
                ))}
              </select>
              <Image
                src="/careers/chevron-down.svg"
                alt=""
                width={24}
                height={24}
                className="pointer-events-none absolute right-[9px] top-1/2 size-[24px] -translate-y-1/2"
                aria-hidden
              />
            </div>
          </Field>
          <Field label="Didn’t find a role" className="min-w-0 flex-1">
            <input
              className={FIELD_BOX}
              placeholder="Enter Role"
              value={otherRole}
              onChange={(e) => setOtherRole(e.target.value)}
            />
          </Field>
        </div>

        {/* Upload Resume */}
        <Field label="Upload Resume*" className="w-[301px]">
          <label className="relative flex h-[42px] w-full cursor-pointer items-center justify-between border-[0.5px] border-solid border-[#4a4a4a] bg-transparent px-[12px] focus-within:border-[rgba(255,255,255,0.5)]">
            <span
              className={`truncate text-[14px] leading-[21px] ${resumeFile ? "text-white" : "text-[#4a4a4a]"}`}
            >
              {resumeFile?.name || "Upload File here"}
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a4a4a4"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-[24px] shrink-0"
              aria-hidden
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <input
              type="file"
              className="hidden"
              disabled={submitting}
              onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
            />
          </label>
        </Field>

        {/* Cover Letter */}
        <Field label="Cover Letter">
          <textarea
            className="h-[90px] w-full resize-none border-[0.5px] border-solid border-[#4a4a4a] bg-transparent px-[12px] py-[12px] text-[14px] leading-[21px] text-white outline-none placeholder:text-[#4a4a4a] focus:border-[rgba(255,255,255,0.5)]"
            placeholder="Enter your letter (if any)"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
        </Field>

        {/* Consent + Submit */}
        <div className="flex items-center justify-between gap-[18px]">
          <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-[12px]">
            <span
              className={`relative flex size-[20px] shrink-0 items-center justify-center border-[0.5px] border-solid ${
                consent ? "border-[#6ced3f] bg-[#6ced3f]" : "border-[#4a4a4a] bg-transparent"
              }`}
            >
              {consent && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              <input
                type="checkbox"
                className="absolute inset-0 cursor-pointer opacity-0"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
            </span>
            <span className="text-[12px] leading-[18px] text-white">
              By submitting the above form, you consent to our{" "}
              <span className="underline underline-offset-2">Terms and Conditions</span>.
            </span>
          </label>

          <GreenCta
            label={submitting ? "Submitting…" : "Submit"}
            width="w-[140px]"
            type="submit"
            disabled={submitting}
          />
        </div>

        {status === "error" && (
          <p className="text-[12px] leading-[18px] font-normal text-[#ff6b6b] not-italic">
            {errorMessage}
          </p>
        )}
      </form>
    </>
  );
}

/* ----------------------------- Confirmation ---------------------------- */

function ConfirmationStep({ onClose }: { onClose: () => void }) {
  return (
    <>
      {/* Close (X) — top right */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-[40px] top-[40px] flex size-[40px] shrink-0 cursor-pointer items-center justify-center"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>

      <div className="absolute left-1/2 top-[calc(50%-27.5px)] flex w-[620px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[24px]">
        {/* Success illustration */}
        <div className="relative size-[250px] shrink-0">
          <Image
            src={SUCCESS_IMG}
            alt=""
            fill
            sizes="250px"
            className="pointer-events-none object-cover"
            aria-hidden
          />
        </div>

        <h2 className={`${gilroyMedium.className} text-center text-[38px] leading-[47px] font-medium whitespace-nowrap text-white not-italic`}>
          Thank you for applying!
        </h2>

        <p className={`${interRegular.className} w-[540px] text-center text-[12px] leading-[18px] font-normal text-[#a4a4a4] not-italic`}>
          We&apos;ve received your application and truly appreciate your interest in this opportunity. Our team will review your profile and get in touch if your experience aligns with our requirements.
        </p>

        <p className={`${gilroyMedium.className} w-[540px] text-center text-[22px] leading-[28px] font-medium text-white not-italic`}>
          Stay tuned—and best of luck!
        </p>

        <GreenCta
          label="Back to Homepage"
          width="w-[200px]"
          href="/"
          onClick={onClose}
        />
      </div>
    </>
  );
}

/* ------------------------------ Shared bits ----------------------------- */

function PanelHeader({
  jobTitle,
  onClose,
  cta,
}: {
  jobTitle?: string;
  onClose: () => void;
  cta?: React.ReactNode;
}) {
  return (
    <div
      className={`absolute left-[40px] top-[30px] flex h-[48px] items-center ${cta ? "w-[620px] justify-between" : "gap-[25px]"}`}
    >
      <div className="flex h-full items-center gap-[25px]">
        <MenuButton onClick={onClose} />
        <div className="flex h-full flex-col justify-between">
          <h2
            className={`${gilroyMedium.className} text-[22px] leading-[28px] font-medium text-white not-italic [word-break:break-word]`}
          >
            {jobTitle || "Senior Product Manager"}
          </h2>
          <div
            className={`${interLight.className} flex gap-[20px] text-[10px] leading-[15px] font-light text-white not-italic`}
          >
            <span>10+ Years Experience</span>
            <span>Mumbai</span>
          </div>
        </div>
      </div>
      {cta}
    </div>
  );
}

function Divider() {
  return <div className="absolute left-0 top-[108px] h-px w-full bg-[rgba(255,255,255,0.1)]" />;
}

function MenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back"
      className={`relative flex size-[44px] shrink-0 cursor-pointer items-center justify-center ${BOX_BORDER}`}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
      </svg>
      <Corners leftSrc="/careers/corner-menu-tl.svg" rightSrc="/careers/corner-menu-tr.svg" />
    </button>
  );
}

function GreenCta({
  label,
  width = "w-[140px]",
  onClick,
  href,
  type = "button",
  disabled = false,
}: {
  label: string;
  width?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const className = `${gilroySemiBold.className} ${GREEN_CTA_SHADOW} relative flex h-[48px] ${width} shrink-0 cursor-pointer items-center justify-center overflow-hidden ${disabled ? "pointer-events-none opacity-60" : ""}`;

  const inner = (
    <>
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
      <span className="relative z-10 text-[14px] font-semibold leading-[normal] whitespace-nowrap text-white uppercase not-italic">
        {label}
      </span>
      <span aria-hidden className="pointer-events-none absolute inset-0 z-[2] shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]" />
      <CtaCorners />
    </>
  );

  if (href) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} className={className} onClick={onClick}>
      {inner}
    </button>
  );
}

function CtaCorners() {
  return (
    <>
      <div className="pointer-events-none absolute -top-[0.5px] right-0 z-20 flex size-[4px] items-center justify-center">
        <div className="rotate-180 flex-none">
          <div className="relative size-[4px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/careers/corner-apply-tr.svg" alt="" className="block size-full max-w-none" aria-hidden />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute -top-[0.5px] left-0 z-20 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/careers/corner-apply-tl.svg" alt="" className="block size-full max-w-none" aria-hidden />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 z-20 flex size-[4px] items-center justify-center">
        <div className="-scale-x-100 flex-none">
          <div className="relative size-[4px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/careers/corner-apply-tr.svg" alt="" className="block size-full max-w-none" aria-hidden />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 z-20 flex size-[4px] items-center justify-center">
        <div className="flex-none">
          <div className="relative size-[4px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/careers/corner-apply-tl.svg" alt="" className="block size-full max-w-none" aria-hidden />
          </div>
        </div>
      </div>
    </>
  );
}
