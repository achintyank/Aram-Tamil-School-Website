"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import {
  annualDay,
  celebrations,
  graduation,
  holidays,
  onlineDays,
  SCHOOL_DESCRIPTION,
  SCHOOL_YEAR_END,
  SCHOOL_YEAR_START,
  summerBreak,
  type CalendarEvent,
  type EventType,
} from "../_data/events";

const SCHOOL_YEAR = (() => {
  const startYear = new Date(`${SCHOOL_YEAR_START}T00:00:00`).getFullYear();
  const endYear = new Date(`${SCHOOL_YEAR_END}T00:00:00`).getFullYear();
  return startYear === endYear ? String(startYear) : `${startYear} – ${endYear}`;
})();

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function fmt(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const tints: Record<
  EventType,
  {
    card: string;
    dot: string;
    accent: string;
    cardBorderActive: string;
    dotFilled: string;
    connectorActive: string;
    ringActive: string;
  }
> = {
  school: {
    card: "border-emerald-300 bg-emerald-50/85",
    dot: "border-emerald-500",
    accent: "text-emerald-700",
    cardBorderActive: "border-emerald-500",
    dotFilled: "bg-emerald-500",
    connectorActive: "bg-emerald-500",
    ringActive: "ring-emerald-300",
  },
  special: {
    card: "border-sky-300 bg-sky-50/85",
    dot: "border-sky-500",
    accent: "text-sky-700",
    cardBorderActive: "border-sky-500",
    dotFilled: "bg-sky-500",
    connectorActive: "bg-sky-500",
    ringActive: "ring-sky-300",
  },
  annual: {
    card: "border-violet-300 bg-violet-50/85",
    dot: "border-violet-500",
    accent: "text-violet-700",
    cardBorderActive: "border-violet-500",
    dotFilled: "bg-violet-500",
    connectorActive: "bg-violet-500",
    ringActive: "ring-violet-300",
  },
  graduation: {
    card: "border-violet-300 bg-violet-50/85",
    dot: "border-violet-500",
    accent: "text-violet-700",
    cardBorderActive: "border-violet-500",
    dotFilled: "bg-violet-500",
    connectorActive: "bg-violet-500",
    ringActive: "ring-violet-300",
  },
  leave: {
    card: "border-slate-200 bg-white/85",
    dot: "border-slate-400",
    accent: "text-slate-500",
    cardBorderActive: "border-slate-400",
    dotFilled: "bg-slate-500",
    connectorActive: "bg-slate-500",
    ringActive: "ring-slate-300",
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
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

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
    <section className="flex h-screen w-full flex-col px-6 pt-24 pb-4 sm:px-10 md:px-14 lg:px-16">
      <header className="mx-auto mb-1 flex w-full max-w-6xl shrink-0 animate-[page-fade-up_700ms_ease-out_both] flex-col items-center text-center">
        <h1
          lang="ta"
          className="font-[family-name:var(--font-tamil)] text-3xl font-bold leading-[1.2] tracking-tight text-slate-900 sm:text-4xl md:text-5xl"
        >
          ஆண்டு நாட்காட்டி
        </h1>
        <p className="mt-1 text-lg font-medium tracking-wide text-sky-700 sm:text-xl md:text-2xl">
          Annual Calendar
        </p>
        <p className="mt-2 max-w-xl text-xs text-slate-600 sm:text-sm">
          Sundays are dedicated to Tamil School. Special events, leaves/holidays, and exceptions are marked below.
        </p>

        <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[0.65rem] text-slate-700 sm:text-xs">
          {legend.map((l) => (
            <li key={l.label} className="flex items-center gap-1.5">
              <span
                className={`h-2 w-2 rounded-full border-2 bg-white ${tints[l.type].dot}`}
              />
              <span>{l.label}</span>
            </li>
          ))}
        </ul>
      </header>

      <div className="mt-4 -mb-2 animate-[page-fade-up_700ms_ease-out_200ms_both] text-center">
        <p className="text-base font-bold uppercase tracking-[0.35em] text-sky-700 sm:text-lg md:text-xl">
          {SCHOOL_YEAR}
        </p>
      </div>

      <div
        ref={scrollRef}
        className="relative w-full flex-1 animate-[page-fade-up_900ms_ease-out_400ms_both] overflow-x-auto overflow-y-hidden"
      >
        <div className="relative h-full min-w-max">
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
                  <TimelineItem
                    event={event}
                    isAbove={i % 2 === 0}
                    index={i}
                    hoveredIdx={hoveredIdx}
                    setHoveredIdx={setHoveredIdx}
                  />
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
  index,
  hoveredIdx,
  setHoveredIdx,
}: {
  event: CalendarEvent;
  isAbove: boolean;
  index: number;
  hoveredIdx: number | null;
  setHoveredIdx: (n: number | null) => void;
}) {
  const date = new Date(`${event.date}T00:00:00`);
  const month = date.toLocaleString("en", { month: "short" });
  const weekday = date.toLocaleString("en", { weekday: "long" });
  const day = date.getDate();
  const t = tints[event.type];

  const isHovered = hoveredIdx === index;
  const isDimmed = hoveredIdx !== null && !isHovered;

  const countdownLabel = formatCountdown(date);

  return (
    <div
      className={`group relative flex h-full w-40 shrink-0 flex-col items-center justify-center transition-all duration-300 ease-out sm:w-48 ${
        isDimmed ? "opacity-40 blur-[1px]" : "opacity-100 blur-0"
      } ${isHovered ? "z-30" : "z-0"}`}
    >
      {/* Main card — only this triggers hover */}
      <div
        className={`absolute inset-x-2 transition-all duration-300 ease-out ${
          isAbove ? "bottom-1/2 mb-10" : "top-1/2 mt-10"
        } ${isHovered ? "-translate-y-1" : "translate-y-0"} ${
          !isAbove && isHovered ? "translate-y-1" : ""
        }`}
      >
        <div
          onMouseEnter={() => setHoveredIdx(index)}
          onMouseLeave={() => setHoveredIdx(null)}
          className={`relative cursor-pointer rounded-2xl border-2 p-3.5 shadow-md backdrop-blur-sm transition-all duration-300 ease-out ${t.card} ${
            isHovered ? `${t.cardBorderActive} shadow-xl` : ""
          }`}
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

      {/* Drawer on opposite side of line */}
      <div
        className={`pointer-events-none absolute inset-x-1 z-40 transition-all duration-300 ease-out ${
          isAbove
            ? `top-1/2 mt-10 ${isHovered ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`
            : `bottom-1/2 mb-10 ${isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`
        }`}
      >
        <div
          className={`rounded-2xl border-2 bg-white/95 p-3 shadow-xl backdrop-blur-sm ${t.cardBorderActive}`}
        >
          <div className="flex items-center justify-between gap-2">
            <span
              className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white ring-2 ${t.ringActive} ${
                isHovered ? "animate-[icon-burst_700ms_ease-out]" : ""
              } ${t.accent}`}
            >
              <EventIcon type={event.type} />
            </span>
            <span
              className={`text-[0.6rem] font-bold uppercase tracking-[0.15em] ${t.accent}`}
            >
              {countdownLabel}
            </span>
          </div>
          <div className="mt-2.5">
            <MiniCalendar date={date} accentClass={t.dotFilled} />
          </div>
        </div>
      </div>

      {/* Connector from card to dot */}
      <div
        className={`absolute left-1/2 w-px -translate-x-1/2 bg-slate-300 transition-all duration-300 ease-out ${
          isAbove ? "bottom-1/2 mb-2 h-8" : "top-1/2 mt-2 h-8"
        } ${isHovered ? `w-0.5 ${t.connectorActive}` : ""}`}
      />

      {/* Connector from dot to drawer (only on hover) */}
      <div
        className={`absolute left-1/2 w-0.5 -translate-x-1/2 transition-all duration-300 ease-out ${
          isAbove ? "top-1/2 mt-2" : "bottom-1/2 mb-2"
        } ${isHovered ? `h-8 ${t.connectorActive}` : "h-0"}`}
      />

      {/* Dot */}
      <div
        className={`absolute left-1/2 top-1/2 z-10 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-white transition-all duration-300 ease-out ${t.dot} ${
          isHovered ? `${t.dotFilled} scale-125` : ""
        }`}
      />
    </div>
  );
}

function MiniCalendar({
  date,
  accentClass,
}: {
  date: Date;
  accentClass: string;
}) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const targetDay = date.getDate();
  const today = new Date();
  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === month;
  const todayDay = today.getDate();

  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="grid grid-cols-7 gap-[2px]">
      {cells.map((d, i) => {
        if (d === null)
          return <span key={`e-${i}`} className="h-2.5 w-2.5" />;
        const isTarget = d === targetDay;
        const isTodayCell = isCurrentMonth && d === todayDay;
        return (
          <span
            key={d}
            className={`h-2.5 w-2.5 rounded-full ${
              isTarget
                ? accentClass
                : isTodayCell
                  ? "bg-white ring-[1.5px] ring-red-500"
                  : "bg-slate-200"
            }`}
          />
        );
      })}
    </div>
  );
}

function EventIcon({ type }: { type: EventType }) {
  const common = "h-3.5 w-3.5";
  if (type === "school")
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={common}
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    );
  if (type === "special")
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={common}
      >
        <path d="M12 2l1.8 5.5L19 9l-5.2 1.5L12 16l-1.8-5.5L5 9l5.2-1.5z" />
        <circle cx="19" cy="4" r="1.3" />
        <circle cx="5" cy="20" r="1.3" />
      </svg>
    );
  if (type === "annual")
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={common}
      >
        <path d="M12 2l2.9 6 6.6.5-5 4.5 1.5 6.5L12 16l-6 3.5L7.5 13 2.5 8.5 9.1 8z" />
      </svg>
    );
  if (type === "graduation")
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={common}
      >
        <path d="M12 3 1 9l11 6 9-4.9V17h2V9z" />
        <path d="M5 13.2V17c0 1.5 3.1 3 7 3s7-1.5 7-3v-3.8L12 17z" />
      </svg>
    );
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={common}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function formatCountdown(date: Date): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  const diff = Math.round(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff === -1) return "Yesterday";
  if (diff > 0) return `in ${diff} days`;
  return `${Math.abs(diff)} days ago`;
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
  result.push({
    date: summerBreak.date,
    type: "leave",
    title: "Summer Break!",
    description: summerBreak.description,
  });

  result.sort((a, b) => a.date.localeCompare(b.date));
  return result;
}
