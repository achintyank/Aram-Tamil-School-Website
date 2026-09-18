"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { buildTimeline, isoDate, SCHOOL_YEAR_END, SCHOOL_YEAR_START, type CalendarEvent } from "../_data/calendar";
import { timings } from "../_data/school";
import SectionTitle from "./SectionTitle";

const legend = [
  { label: "Class day", cls: "bg-paper/25" },
  { label: "Celebration", cls: "bg-blue" },
  { label: "Annual Day / Graduation", cls: "bg-paper" },
  { label: "No class", cls: "border border-paper/50" },
];

const yearLabel = `${SCHOOL_YEAR_START.slice(0, 4)} – ${SCHOOL_YEAR_END.slice(2, 4)}`;

function EventCard({ e, past }: { e: CalendarEvent; past: boolean }) {
  const d = new Date(`${e.date}T00:00:00`);
  const tone =
    e.type === "special"
      ? "bg-blue text-paper"
      : e.type === "annual" || e.type === "graduation"
        ? "bg-paper text-ink"
        : "border border-dashed border-paper/40 text-paper";
  return (
    <div className={`flex h-[19rem] w-60 shrink-0 flex-col justify-between rounded-[1.25rem] p-5 ${tone} ${past ? "opacity-40" : ""}`}>
      <div className="flex items-start justify-between">
        <p className="font-impact text-6xl leading-none">{d.getDate()}</p>
        <p className="eyebrow text-right opacity-70">
          {d.toLocaleDateString("en-US", { weekday: "short" })}
          <br />
          {e.mode === "online" ? "Online" : e.type === "leave" || e.type === "summer" ? "No class" : ""}
        </p>
      </div>
      <div>
        {e.titleTa && (
          <p lang="ta" className="font-tamil text-2xl leading-tight font-extrabold">
            {e.titleTa}
          </p>
        )}
        <p className="mt-1 text-lg leading-tight font-extrabold uppercase">{e.title}</p>
        <p className="mt-2 text-sm leading-snug opacity-75">{e.description}</p>
      </div>
    </div>
  );
}

function ClassTick({ e, past }: { e: CalendarEvent; past: boolean }) {
  const d = new Date(`${e.date}T00:00:00`);
  return (
    <div className={`flex h-[19rem] w-16 shrink-0 flex-col items-center justify-between py-5 ${past ? "opacity-35" : ""}`}>
      <p className="eyebrow text-paper/50">Sun</p>
      <div className="flex flex-col items-center gap-3">
        <span className="h-24 w-px bg-paper/25" />
        <span className={`h-2.5 w-2.5 rounded-full ${e.mode === "online" ? "border border-paper" : "bg-paper/60"}`} />
      </div>
      <p className="font-impact text-3xl leading-none">{d.getDate()}</p>
    </div>
  );
}

export default function CalendarSection() {
  const timeline = useMemo(() => buildTimeline(), []);
  const scroller = useRef<HTMLDivElement>(null);
  const todayEl = useRef<HTMLDivElement>(null);
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setToday(isoDate(new Date())), 0);
    return () => clearTimeout(t);
  }, []);

  // center today once we know it
  useEffect(() => {
    const box = scroller.current;
    const mark = todayEl.current;
    if (!box || !mark) return;
    box.scrollLeft = Math.max(0, mark.offsetLeft - box.clientWidth / 2);
  }, [today]);

  // click-and-drag to scroll on desktop
  useEffect(() => {
    const box = scroller.current!;
    let down = false, startX = 0, startLeft = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      startX = e.clientX;
      startLeft = box.scrollLeft;
      box.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (down) box.scrollLeft = startLeft - (e.clientX - startX);
    };
    const onUp = () => {
      down = false;
      box.style.cursor = "";
    };
    box.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      box.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  const nudge = (dir: number) => scroller.current?.scrollBy({ left: dir * scroller.current.clientWidth * 0.7, behavior: "smooth" });
  const todayIdx = today ? timeline.findIndex((e) => e.date >= today) : -1;
  const upcoming = today ? timeline.filter((e) => e.type !== "school" && e.date >= today).length : null;

  return (
    <section id="calendar" className="relative z-10 overflow-hidden rounded-[2rem] bg-ink py-24 text-paper">
      <div className="grid gap-8 px-4 sm:px-6 md:grid-cols-[1.2fr_1fr] md:items-end">
        <div>
          <SectionTitle
            ta={["ஆண்டு நாட்காட்டி", { text: yearLabel, className: "font-sans font-black text-blue" }]}
            en="The year"
            enClassName="text-paper/60"
            wipe="var(--color-blue)"
          />
        </div>
        <div className="md:justify-self-end">
          <p className="max-w-sm text-lg text-paper/70">
            Sundays are for Tamil school. Celebrations, breaks and the big days are marked below.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
            {timings.map((t) => (
              <p key={t.label} className="eyebrow">
                <span className="text-paper/50">{t.label}</span> {t.value}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 px-4 sm:px-6">
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {legend.map((l) => (
            <li key={l.label} className="eyebrow flex items-center gap-2 text-paper/70">
              <span className={`h-3 w-3 rounded-full ${l.cls}`} />
              {l.label}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          {upcoming !== null && <p className="eyebrow mr-3 text-paper/50">{upcoming} dates ahead</p>}
          {[-1, 1].map((dir) => (
            <button
              key={dir}
              type="button"
              aria-label={dir < 0 ? "Earlier" : "Later"}
              onClick={() => nudge(dir)}
              className="grid h-11 w-11 place-items-center rounded-full border border-paper/30 transition-colors hover:border-blue hover:bg-blue"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className={dir < 0 ? "rotate-180" : ""}>
                <path d="M1 7h12M8 2l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div ref={scroller} className="mt-6 cursor-grab overflow-x-auto overscroll-x-contain px-4 pb-4 select-none [scrollbar-width:none] sm:px-6">
        <div className="relative flex w-max items-end gap-2">
          {timeline.map((e, i) => {
            const d = new Date(`${e.date}T00:00:00`);
            const prev = i > 0 ? new Date(`${timeline[i - 1].date}T00:00:00`) : null;
            const newMonth = !prev || prev.getMonth() !== d.getMonth();
            const past = today !== null && e.date < today;
            return (
              <Fragment key={e.date}>
                {i === todayIdx && (
                  <div ref={todayEl} className="flex h-[19rem] w-10 shrink-0 flex-col items-center">
                    <p className="eyebrow rounded-full bg-blue px-2 py-1 text-paper">Today</p>
                    <span className="w-0.5 flex-1 bg-blue" />
                  </div>
                )}
                {newMonth && (
                  <div className="flex h-[19rem] shrink-0 items-start border-l border-paper/20 pr-3 pl-3">
                    <p className="font-impact text-5xl leading-none uppercase [writing-mode:vertical-rl] rotate-180">
                      {d.toLocaleDateString("en-US", { month: "long" })}
                      <span className="text-paper/30"> {d.getFullYear()}</span>
                    </p>
                  </div>
                )}
                {e.type === "school" ? <ClassTick e={e} past={past} /> : <EventCard e={e} past={past} />}
              </Fragment>
            );
          })}
          {today !== null && todayIdx === -1 && (
            <div ref={todayEl} className="flex h-[19rem] w-10 shrink-0 flex-col items-center">
              <p className="eyebrow rounded-full bg-blue px-2 py-1 text-paper">Today</p>
              <span className="w-0.5 flex-1 bg-blue" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
