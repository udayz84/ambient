"use client";

import { useCallback, useEffect, useState } from "react";
import { Hero } from "./Hero";
import { TagBadge } from "./TagBadge";
import { Corners } from "../shared/Corners";
import { useFitText } from "../shared/FitText";
import { gilroyMedium, gilroySemiBold, interRegular } from "./fonts";
import { mediaUrl } from "@/lib/strapi";

/* ---------------------------------------------------------------------------
 * Hero carousel — slide 1 is the existing Hero; slides 2+ are announcement
 * slides (CES / event type, per client feedback) with a couple of CTAs.
 *
 * Announcement content below is the FALLBACK used when the CMS
 * hero.announcements component is empty (env not seeded yet). Editors manage
 * slides in Strapi: Home Page → Hero → Announcements.
 * ------------------------------------------------------------------------- */

const AUTOPLAY_MS = 7000;

type AnnouncementCta = { label: string; href: string; primary?: boolean };

type Announcement = {
  tag: string;
  title: string;
  subtitle: string;
  ctas: AnnouncementCta[];
  image: string;
  imageAlt: string;
};

const ANNOUNCEMENTS: Announcement[] = [
  {
    tag: "Announcement",
    title: "Meet us at CES 2026",
    subtitle:
      "See live demos of the GPX10 PRO running always-on AI at microwatt power. Las Vegas, January 6–9.",
    ctas: [
      { label: "Book a meeting", href: "/contact", primary: true },
      { label: "What we're showing", href: "/news-listing" },
    ],
    image: "/resources/article-image-base.webp",
    imageAlt: "Ambient Scientific circuit board close-up",
  },
  {
    tag: "New release",
    title: "GPX10 PRO DevKit is shipping",
    subtitle:
      "Plug-and-play evaluation kits to prototype always-on AI — from wake-word to sensor fusion — in days, not months.",
    ctas: [
      { label: "Shop the kit", href: "/dvk", primary: true },
      { label: "Explore the DVK", href: "/dvk" },
    ],
    image: "/resources/article-2-overlay.png",
    imageAlt: "Ambient Scientific chip industry artwork",
  },
];

/** Shape of a Strapi home.hero-announcement entry (media populated). */
type AnnouncementCms = {
  tag?: string | null;
  title?: string | null;
  subtitle?: string | null;
  image?: Parameters<typeof mediaUrl>[0];
  image_alt?: string | null;
  ctas?: { label?: string | null; href?: string | null; variant?: string | null }[] | null;
};

/** Map Strapi home.hero-announcement entries to the slide shape above. */
function cmsAnnouncements(
  data: { announcements?: AnnouncementCms[] | null } | null | undefined,
): Announcement[] {
  return (data?.announcements ?? [])
    .filter((a) => a?.title)
    .map((a, index) => ({
      tag: a.tag ?? "Announcement",
      title: a.title ?? "",
      subtitle: a.subtitle ?? "",
      ctas: (a.ctas ?? [])
        .filter((cta) => cta?.label)
        .map((cta) => ({
          label: cta.label ?? "",
          href: cta.href ?? "#",
          primary: (cta.variant ?? "primary") === "primary",
        })),
      // Static imagery by default — an uploaded Strapi image overrides it.
      image: mediaUrl(a.image) ?? ANNOUNCEMENTS[index % ANNOUNCEMENTS.length].image,
      imageAlt: a.image_alt || a.image?.alternativeText || "",
    }))
    .filter((a) => a.ctas.length > 0);
}

function AnnouncementCtaButton({ cta }: { cta: AnnouncementCta }) {
  return (
    <a
      href={cta.href}
      className={`${cta.primary ? gilroySemiBold.className : interRegular.className} relative flex h-[42px] shrink-0 items-center justify-center px-[24px] text-[14px] leading-[normal] font-medium uppercase tracking-[-0.42px] whitespace-nowrap transition-opacity hover:opacity-90 ${
        cta.primary
          ? "text-white shadow-[0px_42px_107px_0px_rgba(83,216,36,0.2),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15)]"
          : "border-[0.5px] border-solid border-[rgba(240,240,240,0.25)] bg-[rgba(255,255,255,0.06)] text-[#f0f0f0]"
      }`}
    >
      {cta.primary ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]"
        />
      ) : null}
      {cta.primary ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]"
        />
      ) : null}
      <span className="relative z-10">{cta.label}</span>
      <Corners className="z-20" />
    </a>
  );
}

function AnnouncementSlide({ announcement }: { announcement: Announcement }) {
  const fitRef = useFitText<HTMLHeadingElement>({});
  const fitRef2 = useFitText<HTMLHeadingElement>({});
  return (
    <div
      className="absolute inset-0 flex flex-col justify-center overflow-hidden bg-black"
      aria-hidden={false}
    >
      {/* Full-bleed background image — Strapi upload wins, static news-card
          imagery is the fallback */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        loading="lazy"
        decoding="async"
        src={announcement.image}
        alt={announcement.imageAlt}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Blackish gradient so the left-side content stays readable over the
          image (stronger under the text, slight on the image side) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden min-[1024px]:block"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 48%, rgba(0,0,0,0.12) 100%)",
        }}
      />
      {/* Mobile: content stacks over the image — scrim top and bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 min-[1024px]:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.80) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[118px] left-[95px] hidden w-[560px] border-t border-white/10 min-[1024px]:block"
      />

      {/* Desktop content — left column */}
      <div className="relative hidden h-full w-full max-w-[1442px] min-[1024px]:block">
        <div className="absolute top-[300px] left-[95px] flex w-[560px] flex-col items-start gap-[15px]">
          <TagBadge label={announcement.tag} width={150} centerLabel />
          <h1
            ref={fitRef}
            className={`${gilroyMedium.className} bg-clip-text text-[46px] leading-[49px] font-medium text-transparent [word-break:break-word] not-italic`}
            style={{
              backgroundImage:
                "linear-gradient(101.005deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            {announcement.title}
          </h1>
          <p className={`${interRegular.className} w-[419px] text-[16px] leading-[24px] font-normal text-[#f0f0f0] opacity-80 [word-break:break-word]`}>
            {announcement.subtitle}
          </p>
          <div className="mt-[15px] flex items-center gap-[16px]">
            {announcement.ctas.map((cta) => (
              <AnnouncementCtaButton key={cta.label} cta={cta} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile content */}
      <div className="relative flex w-full flex-col items-start gap-[15px] px-[24px] pt-[180px] pb-[120px] min-[1024px]:hidden">
        <TagBadge label={announcement.tag} width={150} centerLabel />
        <h1
          ref={fitRef2}
          className={`${gilroyMedium.className} w-[320px] max-w-full bg-clip-text text-[36px] leading-[36px] font-medium text-transparent [word-break:break-word] not-italic`}
          style={{
            backgroundImage:
              "linear-gradient(100.849deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {announcement.title}
        </h1>
        <p className={`${interRegular.className} w-[332px] max-w-full text-[14px] leading-[21px] font-normal text-[#f0f0f0] opacity-80 [word-break:break-word]`}>
          {announcement.subtitle}
        </p>
        <div className="mt-[15px] flex flex-col items-start gap-[12px]">
          {announcement.ctas.map((cta) => (
            <AnnouncementCtaButton key={cta.label} cta={cta} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HeroCarousel({ data }: { data?: any }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const cmsSlides = cmsAnnouncements(data);
  const announcements = cmsSlides.length > 0 ? cmsSlides : ANNOUNCEMENTS;
  const slideCount = 1 + announcements.length;

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // Auto-advance; timer resets on manual change (active dep) and pauses on hover.
  useEffect(() => {
    if (reducedMotion || paused) return;
    const timer = setInterval(
      () => setActive((current) => (current + 1) % slideCount),
      AUTOPLAY_MS,
    );
    return () => clearInterval(timer);
  }, [reducedMotion, paused, active, slideCount]);

  const goTo = useCallback((index: number) => setActive(index), []);

  const slideClass = (index: number) =>
    `absolute inset-0 transition-opacity duration-700 ease-out ${
      index === active
        ? "z-10 opacity-100"
        : "pointer-events-none z-0 opacity-0"
    }`;

  return (
    <section
      className="relative -mt-[78px] flex h-[876px] w-full justify-center overflow-hidden bg-black max-[1023px]:h-auto"
      aria-label="Featured"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      {/* Slide 1 — current hero (in flow so it sizes the container on mobile) */}
      <div className={`relative h-full w-full ${active === 0 ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"} transition-[opacity] duration-700`}>
        <Hero data={data} />
      </div>

      {/* Slides 2+ — announcements */}
      {announcements.map((announcement, index) => {
        const slideIndex = index + 1;
        return (
          <div
            key={announcement.title}
            className={slideClass(slideIndex)}
            aria-hidden={slideIndex !== active}
          >
            <AnnouncementSlide announcement={announcement} />
          </div>
        );
      })}

      {/* Slide indicators */}
      <div className="absolute bottom-[36px] left-1/2 z-20 flex -translate-x-1/2 items-center gap-[8px] max-[1023px]:bottom-[24px]">
        {Array.from({ length: slideCount }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === active}
            className={`h-[3px] w-[36px] cursor-pointer border-0 p-0 transition-colors ${
              index === active
                ? "bg-[#53d824]"
                : "bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
