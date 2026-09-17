"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Announcement } from "../_data/announcements";
import { isoDate } from "../_data/calendar";
import Highlight from "./Highlight";

const REFRESH_SECONDS = 60;

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function range(a: Announcement) {
  if (!a.startDate) return "";
  return a.endDate && a.endDate !== a.startDate ? `${formatDate(a.startDate)} – ${formatDate(a.endDate)}` : formatDate(a.startDate);
}

/** Lando's "What's up on socials", repurposed as the live announcements board. */
export default function AnnouncementsBoard({ items }: { items: Announcement[] }) {
  const router = useRouter();
  const [today, setToday] = useState<string | null>(null);
  const [left, setLeft] = useState(REFRESH_SECONDS);
  const [showPast, setShowPast] = useState(false);

  useEffect(() => {
    let next = Date.now() + REFRESH_SECONDS * 1000;
    const tick = () => {
      const now = Date.now();
      setToday(isoDate(new Date()));
      if (now >= next) {
        next = now + REFRESH_SECONDS * 1000;
        router.refresh();
      }
      setLeft(Math.max(0, Math.ceil((next - now) / 1000)));
    };
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [router]);

  // Until the client knows today's date, treat everything as active.
  const active = items
    .filter((a) => !today || ((!a.startDate || a.startDate <= today) && (!a.endDate || today <= a.endDate)))
    .sort((a, b) => (a.urgent !== b.urgent ? (a.urgent ? -1 : 1) : b.startDate.localeCompare(a.startDate)));
  const past = today
    ? items.filter((a) => a.endDate && a.endDate < today).sort((a, b) => b.endDate.localeCompare(a.endDate))
    : [];

  const C = 2 * Math.PI * 15.5;

  return (
    <section id="announcements" className="relative z-10 scroll-mt-4 bg-paper px-4 py-28 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p lang="ta" className="font-tamil text-2xl font-extrabold">அறிவிப்புகள்</p>
          <h2 className="mt-2 text-[clamp(3rem,7vw,6.5rem)] leading-[0.88] font-black tracking-tight uppercase">
            <Highlight className="block">What&apos;s</Highlight>
            <Highlight delay={120} className="block text-blue" color="var(--color-ink)">
              happening
            </Highlight>
          </h2>
          <p className="mt-6 max-w-sm text-lg text-graphite">
            Celebrations, schedule changes and reminders from the school.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-ink/15 py-2 pr-4 pl-2">
            <span className="relative grid h-7 w-7 place-items-center">
              <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90" aria-hidden>
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeOpacity=".12" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke="var(--color-blue)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={C}
                  strokeDashoffset={C * (1 - left / REFRESH_SECONDS)}
                  style={{ transition: "stroke-dashoffset 1s linear" }}
                />
              </svg>
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue" />
            </span>
            <p className="eyebrow">
              Live · refreshing in <span className="tabular-nums">0:{String(left).padStart(2, "0")}</span>
            </p>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between border-b border-ink pb-3">
            <p className="eyebrow">{active.length === 0 ? "Nothing right now" : `${active.length} active`}</p>
            {past.length > 0 && (
              <button type="button" onClick={() => setShowPast((s) => !s)} className="eyebrow underline decoration-blue decoration-2 underline-offset-4">
                {showPast ? "Hide past" : `Show past (${past.length})`}
              </button>
            )}
          </div>

          {active.length === 0 ? (
            <div className="grid min-h-72 place-items-center rounded-[1.5rem] border border-dashed border-ink/30 p-10 text-center">
              <div>
                <p className="font-impact text-[clamp(3.5rem,8vw,6rem)] leading-none text-transparent uppercase [-webkit-text-stroke:1.5px_var(--color-ink)]">
                  All quiet
                </p>
                <p className="mt-3 text-graphite">No active announcements — check back soon.</p>
              </div>
            </div>
          ) : (
            <ul className="space-y-3">
              {active.map((a, i) => (
                <li
                  key={`${a.title}-${a.startDate}-${i}`}
                  className={`group grid gap-3 rounded-[1.5rem] p-6 sm:grid-cols-[8rem_1fr] ${
                    a.urgent ? "animate-[urgent-pulse_2.4s_ease-in-out_infinite] bg-urgent text-paper" : "bg-paper-2 transition-colors hover:bg-blue hover:text-paper"
                  }`}
                >
                  <div className="flex items-start gap-2 sm:flex-col">
                    {a.urgent && <span className="eyebrow rounded-full bg-paper px-2.5 py-1 text-urgent">Urgent</span>}
                    <p className="eyebrow pt-1 opacity-70">{range(a)}</p>
                  </div>
                  <div>
                    <h3 className={`font-extrabold tracking-tight uppercase ${a.urgent ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}>{a.title}</h3>
                    {a.body && <p className="mt-2 max-w-2xl leading-relaxed whitespace-pre-line opacity-85">{a.body}</p>}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {showPast && past.length > 0 && (
            <ul className="mt-10 divide-y divide-ink/15 border-t border-ink/15">
              {past.map((a, i) => (
                <li key={`past-${a.title}-${i}`} className="grid gap-2 py-5 text-graphite sm:grid-cols-[8rem_1fr]">
                  <p className="eyebrow pt-1">{range(a)}</p>
                  <div>
                    <h3 className="text-lg font-bold uppercase">{a.title}</h3>
                    {a.body && <p className="mt-1 text-sm whitespace-pre-line">{a.body}</p>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
