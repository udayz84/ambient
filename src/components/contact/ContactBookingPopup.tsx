"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { gilroyMedium, gilroySemiBold, interBold, interRegular, interSemiBold } from "../hero/fonts";
import { ContactSuccessPopup } from "./ContactSuccessPopup";

const GREEN_CTA_SHADOW =
  "shadow-[0px_42px_107px_0px_rgba(69,196,24,0.2),0px_24.721px_32.257px_0px_rgba(83,216,36,0.15),0px_10.268px_13.398px_0px_rgba(83,216,36,0.15),0px_3.714px_4.846px_0px_rgba(83,216,36,0.1)]";

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const TIME_SLOTS = [
  "11:00 - 11:30",
  "12:00 - 12:30",
  "13:00 - 13:30",
];

function CtaCorners() {
  return (
    <>
      <div className="pointer-events-none absolute top-0 right-0 flex size-[4px] items-center justify-center">
        <div className="flex-none rotate-180">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" alt="" className="block size-full max-w-none" src="/contact/success-cta-corner-tr.svg" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute top-0 left-0 flex size-[4px] items-center justify-center">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" alt="" className="block size-full max-w-none" src="/contact/success-cta-corner-tl.svg" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute right-0 bottom-0 flex size-[4px] items-center justify-center">
        <div className="-scale-x-100 flex-none rotate-180">
          <div className="relative size-[4px]">
            <div className="absolute inset-[0_0_-12.5%_-12.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" alt="" className="block size-full max-w-none" src="/contact/success-cta-corner-tr.svg" aria-hidden />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 size-[4px]">
        <div className="absolute inset-[0_0_-12.5%_-12.5%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async" alt="" className="block size-full max-w-none" src="/contact/success-cta-corner-tl.svg" aria-hidden />
        </div>
      </div>
    </>
  );
}

export function ContactBookingPopup({
  open,
  meetingTitle,
  meetingDescription,
  onClose,
  onBooked,
}: {
  open: boolean;
  meetingTitle: string;
  meetingDescription: string;
  onClose: () => void;
  onBooked: (dateLabel: string) => void;
}) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onEsc);
    // Lock page scroll while the popup is open so it stays fixed/centered.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const daysGrid = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1);
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const startOffset = first.getDay(); // SUN = 0
    const cells: Array<{ date: Date | null; key: string }> = [];
    for (let i = 0; i < startOffset; i++) cells.push({ date: null, key: `pad-${i}` });
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ date: new Date(viewYear, viewMonth, d), key: `d-${d}` });
    }
    return cells;
  }, [viewYear, viewMonth]);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const isPast = (d: Date) => d < today;

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).replace(/ (\d+)/, ", $1")
    : "";

  const timeZone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return "Local time";
    }
  }, []);
  const timeZoneLabel = useMemo(() => {
    const off = -today.getTimezoneOffset();
    const sign = off >= 0 ? "+" : "-";
    const abs = Math.abs(off);
    const hh = String(Math.floor(abs / 60)).padStart(2, "0");
    const mm = String(abs % 60).padStart(2, "0");
    return `${timeZone} (GMT${sign}${hh}:${mm})`;
  }, [today, timeZone]);

  const submit = async () => {
    if (!selectedDate || !selectedTime) return;
    setConfirming(true);
    try {
      await fetch("/api/calendar-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meetingTitle,
          meetingDescription,
          bookingDate: `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`,
          timeSlot: selectedTime,
          timeZone: timeZoneLabel,
        }),
      }).catch(() => null);
    } finally {
      setConfirming(false);
      onBooked(`${formattedDate}, ${selectedTime}`);
    }
  };

  if (!open) return null;
  if (typeof document === "undefined") return null;

  // Portal to document.body (same as ContactSuccessPopup) — the contact page
  // renders inside transformed/scaled ancestors which would otherwise capture
  // position:fixed and make this popup slide with the page.
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex animate-popup-backdrop-in items-center justify-center bg-[rgba(0,0,0,0.7)] p-[16px]"
      role="dialog"
      aria-modal="true"
      aria-label={`Book ${meetingTitle}`}
      onClick={onClose}
    >
      <div
        className="relative max-h-[calc(100dvh-32px)] w-[800px] max-w-full animate-popup-rise-in overflow-y-auto border-[0.5px] border-solid border-[rgba(240,240,240,0.3)] bg-[#141414]"
        data-node-id="4789:4398"
        data-name="card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col min-[768px]:flex-row">
          {/* close X — top right corner (matches thank-you popup) */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-[16px] right-[16px] z-30 block size-[40px] cursor-pointer overflow-clip"
            data-node-id="4751:4400"
            data-name="cancel-01"
          >
            <div className="absolute inset-[20.83%]" data-node-id="I4751:4400;2:3240" data-name="elements">
              <div className="absolute inset-[-5.36%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async"
                  alt=""
                  className="block size-full max-w-none"
                  src="/contact/success-cancel-icon.svg"
                  aria-hidden
                />
              </div>
            </div>
          </button>
          {/* ------------------------------ LEFT ------------------------------ */}
          <div className="flex min-[768px]:h-[591px] min-[768px]:w-[377px] shrink-0 flex-col justify-between p-[24px] min-[768px]:pl-[24px] min-[768px]:pt-[36px]" data-node-id="4789:4506" data-name="left">
            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-col gap-[8px]">
                <div className="relative size-[64px] shrink-0" data-node-id="4789:4510" data-name="logo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" alt="" className="absolute inset-0 block size-full max-w-none" src="/contact/booking-logo.png" width={64} height={64} />
                </div>
                <div className="flex flex-col" data-node-id="4789:4511" data-name="title">
                  <p className={`${interBold.className} text-[16px] leading-[1.5] text-[#94a3b8]`} data-node-id="4789:4512">
                    Ambient Scientific
                  </p>
                  <p className={`${gilroySemiBold.className} text-[28px] leading-[1.5] text-white`} data-node-id="4789:4513">
                    {meetingTitle}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-[12px]" data-node-id="4789:4514" data-name="details">
                <div className="flex items-center gap-[8px]" data-node-id="4789:4515" data-name="time">
                  <span className="relative size-[20px] shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img loading="lazy" decoding="async" alt="" className="absolute inset-0 block size-full max-w-none" src="/contact/booking-icon-clock.svg" aria-hidden />
                  </span>
                  <p className={`${interBold.className} flex-1 text-[16px] leading-[1.5] text-[#94a3b8]`} data-node-id="4789:4519">
                    30 min
                  </p>
                </div>
                <div className="flex items-center gap-[8px]" data-name="reservation-type">
                  <span className="relative size-[20px] shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img loading="lazy" decoding="async" alt="" className="absolute inset-0 block size-full max-w-none" src="/contact/booking-icon-phone.svg" aria-hidden />
                  </span>
                  <p className={`${interRegular.className} flex-1 text-[16px] leading-[1.5] text-[#94a3b8]`}>
                    Phone call
                  </p>
                </div>
              </div>
              <p className={`${interRegular.className} w-full text-[16px] leading-[1.5] text-[#cbd5e1]`} data-node-id="4789:4521" data-name="description">
                {meetingDescription}
              </p>
            </div>
            <div className="mt-[24px] flex flex-col gap-[6px] min-[768px]:mt-0" data-node-id="4789:4529" data-name="time zone">
              <p className={`${interBold.className} text-[16px] leading-[1.5] text-white`} data-node-id="4789:4530">
                Time zone
              </p>
              <div className="flex items-center gap-[4px]" data-node-id="4789:4531" data-name="select">
                <div className="flex items-center gap-[12px]">
                  <span className="-scale-y-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img loading="lazy" decoding="async" alt="" src="/contact/booking-icon-globe.svg" width={14} height={14} className="block size-[14px]" aria-hidden />
                  </span>
                  <p className={`${interRegular.className} max-w-full text-[14px] leading-[1.5] truncate text-[#cbd5e1]`}>
                    {timeZoneLabel}
                  </p>
                </div>
                <span className="-scale-y-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" alt="" src="/contact/booking-icon-chevron.svg" width={8} height={8} className="block size-[8px]" aria-hidden />
                </span>
              </div>
            </div>
          </div>

          {/* divider */}
          <div className="hidden w-[1px] shrink-0 bg-[rgba(240,240,240,0.15)] min-[768px]:block" data-node-id="4789:4505" data-name="divider" />

          {/* ------------------------------ RIGHT ------------------------------ */}
          <div className="flex flex-1 flex-col gap-[24px] p-[24px] min-[768px]:min-h-[591px] min-[768px]:w-[399px] min-[768px]:pt-[24px]" data-node-id="4789:4399" data-name="right">
            <div className="flex flex-col gap-[20px]" data-node-id="4789:4400" data-name="title + calendar">
              <p className={`${gilroySemiBold.className} text-[20px] leading-[1.5] text-white`} data-node-id="4789:4401">
                Select a Date &amp; Time
              </p>
              <div className="flex flex-col gap-[16px]" data-node-id="4789:4402" data-name="calendar">
                <div className="flex items-center justify-between" data-node-id="4789:4403" data-name="month">
                  <button
                    type="button"
                    onClick={prevMonth}
                    aria-label="Previous month"
                    className="relative size-[38px] shrink-0 cursor-pointer"
                    data-node-id="4789:4404"
                    data-name="previous"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img loading="lazy" decoding="async" alt="" className="absolute inset-0 block size-full max-w-none" src="/contact/booking-cal-prev.svg" aria-hidden />
                  </button>
                  <p className={`${interRegular.className} text-[16px] leading-[1.5] whitespace-nowrap text-white`} data-node-id="4789:4406">
                    {monthLabel}
                  </p>
                  <button
                    type="button"
                    onClick={nextMonth}
                    aria-label="Next month"
                    className="relative size-[38px] shrink-0 cursor-pointer"
                    data-node-id="4789:4407"
                    data-name="next"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img loading="lazy" decoding="async" alt="" className="absolute inset-0 block size-full max-w-none" src="/contact/booking-cal-next.svg" aria-hidden />
                  </button>
                </div>

                <div className="grid grid-cols-7 justify-items-center gap-x-[4px] gap-y-[8px] min-[480px]:gap-x-[8px]" data-node-id="4789:4409" data-name="days">
                  {WEEKDAYS.map((d) => (
                    <p key={d} className={`${interRegular.className} py-[2px] text-center text-[12px] leading-[12px] uppercase text-[#94a3b8]`}>
                      {d}
                    </p>
                  ))}
                  {daysGrid.map(({ date, key }) => {
                    if (!date) return <div key={key} className="size-[40px] justify-self-center min-[480px]:size-[44px]" />;
                    const past = isPast(date);
                    const isSelected = selectedDate?.getTime() === date.getTime();
                    const isToday = date.getTime() === today.getTime();
                    return (
                      <button
                        key={key}
                        type="button"
                        disabled={past}
                        onClick={() => {
                          setSelectedDate(date);
                          setSelectedTime(null);
                        }}
                        aria-pressed={isSelected}
                        aria-label={date.toDateString()}
                        className={`relative mx-auto flex size-[40px] shrink-0 cursor-pointer items-center justify-center rounded-[999px] min-[480px]:size-[44px] ${
                          isSelected
                            ? "bg-[#3a9719]"
                            : past
                              ? "cursor-not-allowed"
                              : date.getTime() === today.getTime()
                                ? "bg-[rgba(83,216,36,0.1)]"
                                : "hover:bg-[rgba(83,216,36,0.1)]"
                        }`}
                        data-node-id="4789:4413"
                        data-name="button"
                      >
                        <span
                          className={`${isSelected ? `${interBold.className} text-[#e2f9da]` : past ? `${interRegular.className} text-[#64748b]` : isToday || date.getTime() === today.getTime() ? `${interBold.className} text-[#a8ed90]` : `${interRegular.className} text-[#64748b] hover:text-[#a8ed90]`} text-[16px] leading-[1.5]`}
                        >
                          {date.getDate()}
                        </span>
                        {isToday && !isSelected ? (
                          <span className="absolute top-[28px] left-[18px] size-[4px] rounded-[2px] bg-[#64748b] min-[480px]:top-[31.5px] min-[480px]:left-[20px]" aria-hidden />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* time slots */}
            <div className="flex flex-col gap-[8px]" data-node-id="4791:8697" data-name="Timers">
              <p className={`${interSemiBold.className} text-[12px] leading-[1.5] whitespace-nowrap text-[#bbb]`} data-node-id="4791:8700">
                Time
              </p>
              <div className="flex flex-wrap gap-[7.331px]">
                {TIME_SLOTS.map((slot) => {
                  const isSlotSelected = selectedTime === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={!selectedDate}
                      onClick={() => setSelectedTime(slot)}
                      aria-pressed={isSlotSelected}
                      className={`relative flex cursor-pointer items-center rounded-[7.331px] p-[10.997px] transition-colors duration-150 ${
                        isSlotSelected
                          ? "border-[0.687px] border-solid border-[#e2f9da] bg-[#21570e]"
                          : selectedDate
                            ? "bg-[#292b38] hover:bg-[#31334a]"
                            : "cursor-not-allowed bg-[#292b38] opacity-50"
                      }`}
                      data-node-id="4791:8718"
                      data-name="Time Selector"
                    >
                      <span className={`${interSemiBold.className} text-[10.997px] leading-[14.662px] whitespace-nowrap ${isSlotSelected ? "text-[#e2f9da]" : "text-[#b2b8c7]"}`}>
                        {slot}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-auto">
              <button
                type="button"
                onClick={submit}
                disabled={!selectedDate || !selectedTime || confirming}
                className={`relative block h-[48px] w-full shrink-0 overflow-hidden ${GREEN_CTA_SHADOW} ${selectedDate && selectedTime && !confirming ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}
                data-node-id="4789:4539"
                data-name="Cta"
              >
                <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ced3f] to-[#38a612]" />
                <span className={`${gilroyMedium.className} absolute top-[calc(50%-9px)] left-1/2 -translate-x-1/2 text-[14px] leading-[normal] whitespace-nowrap text-white uppercase not-italic`} data-node-id="4789:4540">
                  {confirming ? "Confirming..." : "Confirm Your Slot"}
                </span>
                <CtaCorners />
                <span aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_18px_0px_rgba(217,255,240,0.6)]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export { ContactSuccessPopup };
