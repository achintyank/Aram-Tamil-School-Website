"use client";

import { Fragment, useEffect, useMemo, useRef } from "react";
import {
  annualDay,
  celebrations,
  graduation,
  holidays,
  onlineDays,
  SCHOOL_DESCRIPTION,
  SCHOOL_YEAR_END,
  SCHOOL_YEAR_START,
  type CalendarEvent,
  type EventType,
} from "../_data/events";

const SCHOOL_YEAR = new Date(`${SCHOOL_YEAR_START}T00:00:00`).getFullYear();

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function fmt(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const tints: Record<EventType, { card: string; dot: string; accent: string }> = {
  school: {
    card: "border-emerald-300 bg-emerald-50/85",
    dot: "border-emerald-500",
    accent: "text-emerald-700",
  },
  special: {
    card: "border-sky-300 bg-sky-50/85",
    dot: "border-sky-500",
    accent: "text-sky-700",
  },
  annual: {
    card: "border-violet-300 bg-violet-50/85",
    dot: "border-violet-500",
    accent: "text-violet-700",
  },
  graduation: {
    card: "border-violet-300 bg-violet-50/85",
    dot: "border-violet-500",
    accent: "text-violet-700",
  },
  leave: {
    card: "border-slate-200 bg-white/85",
    dot: "border-slate-400",
    accent: "text-slate-500",
  },
};

const legend: { label: string; type: EventType }[] = [
  { label: "School Day", type: "school" },
  { label: "Special Event", type: "special" },
  { label: "Annual / Graduation", type: "annual" },
  { label: "Leave / Holiday", type: "leave" },
];

export default function Calendar() {
  const timeline = useMemo(() => buildTimeline(), []);
  const scrollRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLDivElement>(null);

  const todayKey = fmt(new Date());
  const todayInsertAt = useMemo(() => {
    const idx = timeline.findIndex((e) => e.date > todayKey);
    return idx === -1 ? timeline.length : idx;
  }, [timeline, todayKey]);

  const todayIsAbove = useMemo(() => {
    const refIdx =
      todayInsertAt < timeline.length ? todayInsertAt : timeline.length - 1;
    return refIdx % 2 === 1;
  }, [todayInsertAt, timeline.length]);

  useEffect(() => {
    const center = () => {
      if (!todayRef.current || !scrollRef.current) return;
      const container = scrollRef.current;
      const todayEl = todayRef.current;
      const containerRect = container.getBoundingClientRect();
      const todayRect = todayEl.getBoundingClientRect();
      const offset =
        todayRect.left -
        containerRect.left +
        container.scrollLeft -
        container.clientWidth / 2 +
        todayEl.clientWidth / 2;
      container.scrollLeft = Math.max(0, offset);
    };
    requestAnimationFrame(center);
  }, []);

  return (
    <section className="flex min-h-screen w-full flex-col px-6 pt-20 pb-8 sm:px-10 md:px-14 lg:px-16">
      <header className="mx-auto mb-1 flex w-full max-w-6xl shrink-0 flex-col items-center text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Annual Calendar
        </h1>
        <p className="mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
          Sundays are dedicated to Tamil School. Special events, leaves/holidays, and exceptions are marked below.
        </p>

        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-700 sm:text-sm">
          {legend.map((l) => (
            <li key={l.label} className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full border-2 bg-white ${tints[l.type].dot}`}
              />
              <span>{l.label}</span>
            </li>
          ))}
        </ul>
      </header>

      <div className="mt-8 -mb-3 text-center">
        <p className="text-xl font-bold uppercase tracking-[0.35em] text-sky-700 sm:text-2xl md:text-3xl">
          {SCHOOL_YEAR}
        </p>
      </div>

      <div
        ref={scrollRef}
        className="relative w-full flex-1 overflow-x-auto overflow-y-hidden"
      >
        <div className="relative h-[36rem] min-w-max sm:h-[30rem]">
          <div className="absolute inset-x-0 top-1/2 h-px bg-slate-300/70" />
          <div className="relative flex h-full items-center pr-8">
            {timeline.map((event, i) => {
              const date = new Date(`${event.date}T00:00:00`);
              const prevMonth =
                i > 0
                  ? new Date(`${timeline[i - 1].date}T00:00:00`).getMonth()
                  : -1;
              const isNewMonth = date.getMonth() !== prevMonth;
              const todayDateLabel = formatTodayLabel(new Date());
              return (
                <Fragment key={event.date}>
                  {isNewMonth && (
                    <MonthMarker
                      month={date.toLocaleString("en", { month: "long" })}
                    />
                  )}
                  {i === todayInsertAt && (
                    <TodayMarker
                      ref={todayRef}
                      label={todayDateLabel}
                      isAbove={todayIsAbove}
                    />
                  )}
                  <TimelineItem event={event} isAbove={i % 2 === 0} />
                </Fragment>
              );
            })}
            {todayInsertAt === timeline.length && (
              <TodayMarker
                ref={todayRef}
                label={formatTodayLabel(new Date())}
                isAbove={todayIsAbove}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  event,
  isAbove,
}: {
  event: CalendarEvent;
  isAbove: boolean;
}) {
  const date = new Date(`${event.date}T00:00:00`);
  const weekday = date.toLocaleString("en", { weekday: "long" });
  const month = date.toLocaleString("en", { month: "short" });
  const day = date.getDate();
  const t = tints[event.type];

  return (
    <div className="relative flex h-full w-40 shrink-0 flex-col items-center justify-center sm:w-48">
      <div
        className={`absolute inset-x-2 ${
          isAbove ? "bottom-1/2 mb-10" : "top-1/2 mt-10"
        }`}
      >
        <div
          className={`rounded-2xl border-2 p-3.5 shadow-md backdrop-blur-sm ${t.card}`}
        >
          <p
            className={`text-[0.6rem] font-semibold uppercase tracking-[0.2em] ${t.accent}`}
          >
            {weekday} · {month} {day}
          </p>
          <p className="mt-1.5 text-sm font-semibold leading-tight text-slate-900 sm:text-base">
            {event.title}
          </p>
          <p className="mt-1 text-xs leading-snug text-slate-600 sm:text-sm">
            {event.description}
          </p>
          {event.mode && (
            <p className="mt-2 inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white/80 px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.15em] text-slate-600">
              {event.mode === "online" ? "Online" : "In-Person"}
            </p>
          )}
        </div>
      </div>

      <div
        className={`absolute left-1/2 h-8 w-px -translate-x-1/2 bg-slate-300 ${
          isAbove ? "bottom-1/2 mb-2" : "top-1/2 mt-2"
        }`}
      />
      <div
        className={`absolute left-1/2 top-1/2 z-10 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-white ${t.dot}`}
      />
    </div>
  );
}

function MonthMarker({ month }: { month: string }) {
  return (
    <div className="flex h-full w-28 shrink-0 items-center justify-center">
      <p className="relative z-10 whitespace-nowrap rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-slate-600 shadow-sm ring-1 ring-slate-200">
        {month}
      </p>
    </div>
  );
}

const TodayMarker = ({
  ref,
  label,
  isAbove,
}: {
  ref?: React.Ref<HTMLDivElement>;
  label: string;
  isAbove: boolean;
}) => {
  return (
    <div
      ref={ref}
      className="relative flex h-full w-24 shrink-0 items-center justify-center"
    >
      <span
        className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border-2 border-red-500 bg-white px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.25em] text-red-600 shadow-md ${
          isAbove ? "bottom-1/2 mb-4" : "top-1/2 mt-4"
        }`}
      >
        {label}
      </span>
      <span className="absolute left-1/2 top-1/2 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-red-500 bg-white shadow-lg" />
    </div>
  );
};
TodayMarker.displayName = "TodayMarker";

function formatTodayLabel(d: Date) {
  const month = d.toLocaleString("en", { month: "short" });
  return `Today · ${month} ${d.getDate()}`;
}

function buildTimeline(): CalendarEvent[] {
  const result: CalendarEvent[] = [];

  // Lookup tables for fast date checks
  const holidayMap = new Map<string, { title: string; description: string }>();
  for (const h of holidays) {
    for (const date of h.dates) {
      holidayMap.set(date, { title: h.title, description: h.description });
    }
  }

  const celebrationMap = new Map<
    string,
    { title: string; description: string }
  >();
  for (const c of celebrations) {
    celebrationMap.set(c.date, { title: c.title, description: c.description });
  }

  const onlineSet = new Set(onlineDays);

  // Walk every Sunday in the school year
  const start = new Date(`${SCHOOL_YEAR_START}T00:00:00`);
  const end = new Date(`${SCHOOL_YEAR_END}T00:00:00`);
  const d = new Date(start);
  while (d <= end) {
    if (d.getDay() === 0) {
      const key = fmt(d);
      const holiday = holidayMap.get(key);
      const celebration = celebrationMap.get(key);
      const isOnline = onlineSet.has(key);

      if (holiday) {
        result.push({
          date: key,
          type: "leave",
          title: holiday.title,
          description: holiday.description,
        });
      } else if (celebration) {
        result.push({
          date: key,
          type: "special",
          title: celebration.title,
          description: celebration.description,
          mode: isOnline ? "online" : "in-person",
        });
      } else {
        result.push({
          date: key,
          type: "school",
          title: "Class",
          description: SCHOOL_DESCRIPTION,
          mode: isOnline ? "online" : "in-person",
        });
      }
    }
    d.setDate(d.getDate() + 1);
  }

  // Standalone events (any day of week)
  result.push({
    date: annualDay.date,
    type: "annual",
    title: "Annual Day",
    description: annualDay.description,
  });
  result.push({
    date: graduation.date,
    type: "graduation",
    title: "Graduation",
    description: graduation.description,
  });

  result.sort((a, b) => a.date.localeCompare(b.date));
  return result;
}
