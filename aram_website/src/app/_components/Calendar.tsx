"use client";

import { useState } from "react";
import {
  events,
  SCHOOL_DESCRIPTION,
  type CalendarEvent,
} from "../_data/events";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type TintKey = CalendarEvent["type"] | "school" | "none";

const tints: Record<TintKey, string> = {
  school: "bg-emerald-50 border-emerald-300",
  special: "bg-sky-50 border-sky-300",
  leave: "bg-white border-slate-200",
  annual: "bg-violet-50 border-violet-300",
  graduation: "bg-violet-50 border-violet-300",
  none: "bg-white border-slate-200",
};

const legend: { color: string; label: string }[] = [
  { color: "bg-emerald-200 border-emerald-300", label: "School Day" },
  { color: "bg-sky-200 border-sky-300", label: "Special Event" },
  { color: "bg-white border-slate-300", label: "No Class" },
  {
    color: "bg-violet-200 border-violet-300",
    label: "Annual Day / Graduation",
  },
];

function fmt(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(
    2,
    "0",
  )}`;
}

export default function Calendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalCells =
    Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;
  const totalRows = totalCells / 7;

  const cells = Array.from({ length: totalCells }, (_, i) => {
    const dayNum = i - firstDayOfMonth + 1;
    if (dayNum < 1 || dayNum > daysInMonth) return null;
    const date = fmt(year, month, dayNum);
    const event = events.find((e) => e.date === date);
    const isSunday = new Date(year, month, dayNum).getDay() === 0;
    return { day: dayNum, date, event, isSunday };
  });

  const prev = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };
  const next = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  return (
    <section className="flex h-screen flex-col px-6 pt-24 pb-8 sm:px-10 md:px-14 lg:px-16">
      <div className="mx-auto flex w-full max-w-5xl min-h-0 flex-1 flex-col">
        <header className="mb-5 flex shrink-0 flex-col items-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {MONTHS[month]}
          </h1>
          <div className="mt-2 flex items-center gap-5">
            <button
              onClick={prev}
              aria-label="Previous month"
              className="text-2xl leading-none text-slate-500 transition-colors hover:text-sky-700"
            >
              <span aria-hidden>←</span>
            </button>
            <span className="text-xl font-semibold text-sky-700">
              {year}
            </span>
            <button
              onClick={next}
              aria-label="Next month"
              className="text-2xl leading-none text-slate-500 transition-colors hover:text-sky-700"
            >
              <span aria-hidden>→</span>
            </button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-5 md:flex-row md:items-stretch md:gap-6">
        <div
          className="grid min-h-0 flex-1 grid-cols-7 gap-2"
          style={{ gridTemplateRows: `auto repeat(${totalRows}, minmax(0, 1fr))` }}
        >
          {DAYS.map((d) => (
            <div
              key={d}
              className="pb-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
            >
              {d}
            </div>
          ))}

          {cells.map((c, i) => {
            const row = Math.floor(i / 7);
            const col = i % 7;
            const ox = col <= 1 ? "0%" : col >= 5 ? "100%" : "50%";
            const oy =
              row === 0 ? "0%" : row >= totalRows - 1 ? "100%" : "50%";

            if (!c) return <div key={i} />;

            const type: TintKey = c.event
              ? c.event.type
              : c.isSunday
                ? "school"
                : "none";
            const tint = tints[type];
            const hasContent = Boolean(c.event || c.isSunday);
            const title = c.event
              ? c.event.title
              : c.isSunday
                ? "School Day"
                : null;
            const desc = c.event
              ? c.event.description
              : c.isSunday
                ? SCHOOL_DESCRIPTION
                : null;

            return (
              <div key={i} className="relative min-h-0">
                <div
                  style={{ transformOrigin: `${ox} ${oy}` }}
                  className={`group absolute inset-0 overflow-hidden rounded-lg border-2 transition-all duration-300 ease-out ${tint} ${
                    hasContent ? "cursor-pointer hover:z-50 hover:scale-[2.1] hover:shadow-2xl" : ""
                  }`}
                >
                  <div
                    className={`absolute inset-0 flex flex-col p-1.5 transition-opacity duration-150 ${
                      hasContent ? "group-hover:opacity-0" : ""
                    }`}
                  >
                    <span className="text-xs font-semibold text-slate-700 sm:text-sm">
                      {c.day}
                    </span>
                    {hasContent && (
                      <p className="mt-auto line-clamp-2 text-[0.7rem] font-semibold leading-tight text-slate-800">
                        {title}
                      </p>
                    )}
                  </div>

                  {hasContent && (
                    <div className="absolute inset-0 flex flex-col gap-0.5 p-1.5 opacity-0 transition-opacity duration-200 delay-100 group-hover:opacity-100">
                      <span className="text-[0.45rem] font-semibold text-slate-700">
                        {c.day}
                      </span>
                      <p className="text-[0.5rem] font-bold leading-tight text-slate-900">
                        {title}
                      </p>
                      <p className="text-[0.32rem] leading-snug text-slate-600">
                        {desc}
                      </p>
                      <div className="mt-1 flex flex-1 items-center justify-center rounded bg-gradient-to-br from-slate-200 to-slate-300">
                        <span className="text-[0.3rem] uppercase tracking-widest text-slate-500">
                          {c.event ? "Image" : ""}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <aside className="flex w-full flex-row flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-sm text-slate-700 md:w-44 md:shrink-0 md:flex-col md:items-start md:gap-3.5 md:pt-7">
          {legend.map((l) => (
            <div key={l.label} className="flex items-center gap-2.5">
              <span
                className={`h-4 w-4 rounded-sm border ${l.color}`}
              />
              <span className="leading-tight">{l.label}</span>
            </div>
          ))}
        </aside>
        </div>
      </div>
    </section>
  );
}
