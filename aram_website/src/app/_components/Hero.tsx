"use client";

import { useEffect, useState } from "react";
import { nextClass, nextHighlight } from "../_data/calendar";
import { school, timings } from "../_data/school";
import Highlight from "./Highlight";
import Kolam from "./Kolam";

function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  return now;
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function Hero() {
  const now = useNow();
  const next = now ? nextClass(now) : null;
  const diff = now && next ? Math.max(0, next.getTime() - now.getTime()) : 0;
  const dd = Math.floor(diff / 864e5);
  const hh = Math.floor(diff / 36e5) % 24;
  const mm = Math.floor(diff / 6e4) % 60;
  const ss = Math.floor(diff / 1e3) % 60;
  const upcoming = now ? nextHighlight(now) : undefined;

  return (
    <section id="top" className="sticky top-0 h-svh min-h-[600px] overflow-hidden bg-ink text-paper">
      {/* oversized so it spills off the edges */}
      <Kolam className="absolute top-[6svh] left-[-14vw] aspect-square w-[128vw] opacity-75 md:top-[-9svh] md:right-[-6vw] md:left-auto md:w-auto md:h-[118svh] md:opacity-100" />

      {/* next class card, notched like Lando's "next race" tile */}
      <div className="absolute top-24 right-4 w-[150px] sm:right-6 sm:w-[170px]">
        <svg viewBox="0 0 119 244" preserveAspectRatio="none" aria-hidden className="absolute inset-0 h-full w-full text-paper/60">
          <path
            d="M118.5 6v232a5.5 5.5 0 0 1-5.5 5.5H6A5.5 5.5 0 0 1 .5 238V25A5.5 5.5 0 0 1 6 19.5h46.346c4.695 0 9.167-2 12.297-5.498l7.46-8.337A15.5 15.5 0 0 1 83.653.5H113a5.5 5.5 0 0 1 5.5 5.5Z"
            fill="rgba(17,17,18,.8)"
            stroke="currentColor"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="relative flex flex-col gap-3 px-3 pt-9 pb-3">
          <Highlight className="eyebrow self-start" color="#ffb000">Next class</Highlight>
          <div>
            <p className="text-2xl leading-none font-extrabold uppercase">
              {next ? next.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) : "Sunday"}
            </p>
            <p className="mt-2 font-mono text-sm tabular-nums">
              {now ? `${dd}d ${pad(hh)}:${pad(mm)}:${pad(ss)}` : "—"}
            </p>
          </div>
          <div className="h-px bg-paper/25" />
          {upcoming && (
            <div>
              <p className="eyebrow text-paper/50">Coming up</p>
              <p lang="ta" className="mt-1 font-tamil text-lg leading-tight font-extrabold">{upcoming.titleTa}</p>
              <p className="eyebrow mt-1">
                {upcoming.title.replace(" Celebration", "")} ·{" "}
                {new Date(upcoming.date + "T12:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-4 bottom-5 sm:inset-x-6">
        <div className="mb-4 flex flex-wrap gap-x-6 gap-y-1 [text-shadow:0_0_10px_#111112,0_0_4px_#111112,0_0_2px_#111112]">
          {timings.map((t) => (
            <p key={t.label} className="eyebrow">
              <span className="text-paper/50">{t.label}</span> {t.value}
            </p>
          ))}
        </div>
        <h1 className="sr-only">
          {school.nameEn} — {school.nameTa}
        </h1>
        <p
          lang="ta"
          aria-hidden
          className="font-tamil text-[min(26vw,38svh)] leading-[0.95] font-extrabold tracking-tight text-paper"
        >
          அறம்
        </p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-2 border-t border-paper/60 pt-3">
          <Highlight as="p" color="#ff2bd6" className="text-xl font-extrabold uppercase sm:text-3xl">
            {school.nameEn}
          </Highlight>
          <Highlight as="p" from="right" delay={150} color="#00e5ff" className="text-base font-bold uppercase sm:text-2xl">
            {school.grades} · since {school.established}
          </Highlight>
        </div>
      </div>
    </section>
  );
}
