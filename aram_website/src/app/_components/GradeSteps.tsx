"use client";

import { useEffect, useRef, useState } from "react";
import { regularLevels } from "../_data/school";
import SyllabusTag from "./SyllabusTag";

const GROUPS = [
  { name: "Early foundations", span: 2 },
  { name: "Elementary literacy", span: 5 },
  { name: "Middle-school fluency", span: 3 },
];

const caption = (label: string) => (label === "TK" ? "Pre-K" : label === "K" ? "Kinder" : "Grade");
const short = (label: string) => label.replace("Grade ", "");

/** TK → Grade 8 as a staircase: each step taller than the last, rising in when scrolled into view. */
export default function GradeSteps() {
  const root = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const n = regularLevels.length;

  return (
    <div ref={root} className="mt-10">
      {/* desktop / tablet: staircase */}
      <ol className="hidden h-[34rem] grid-cols-10 items-end gap-2 md:grid">
        {regularLevels.map((l, i) => (
          <li
            key={l.label}
            className="transition-[clip-path] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{
              height: `${24 + (i * 76) / (n - 1)}%`,
              clipPath: shown ? "inset(0 0 0 0 round 1rem 1rem 0 0)" : "inset(100% 0 0 0 round 1rem 1rem 0 0)",
              transitionDelay: `${i * 70}ms`,
            }}
          >
            <div className="group flex h-full flex-col justify-between rounded-t-2xl border-t-2 border-blue-soft bg-moss-2 p-3 transition-colors duration-300 hover:bg-blue lg:p-4">
              <div>
                <p className="font-impact text-5xl leading-[0.9] lg:text-6xl">
                  <span className="sr-only">{l.label}</span>
                  <span aria-hidden>{short(l.label)}</span>
                </p>
                <p className="eyebrow mt-2 text-paper/60 group-hover:text-paper">{caption(l.label)}</p>
              </div>
              <SyllabusTag file={l.file} compact />
            </div>
          </li>
        ))}
      </ol>
      <div className="hidden grid-cols-10 gap-2 md:grid">
        {GROUPS.map((g) => (
          <div key={g.name} className="mt-3 border-t border-paper/30 pt-3" style={{ gridColumn: `span ${g.span}` }}>
            <p className="eyebrow text-paper/60">{g.name}</p>
          </div>
        ))}
      </div>

      {/* phones: bars that lengthen with each grade */}
      <ol className="space-y-2 md:hidden">
        {regularLevels.map((l, i) => (
          <li key={l.label} className="flex items-center gap-3">
            <div
              className="flex h-14 shrink-0 items-center justify-between rounded-r-xl border-l-2 border-blue-soft bg-moss-2 pr-3 pl-3 transition-[width] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ width: shown ? `${34 + (i * 40) / (n - 1)}%` : "0%", transitionDelay: `${i * 60}ms` }}
            >
              <span className="font-impact text-3xl leading-none">{short(l.label)}</span>
              <span className="eyebrow truncate pl-2 text-paper/60">{caption(l.label)}</span>
            </div>
            <SyllabusTag file={l.file} compact />
          </li>
        ))}
      </ol>
    </div>
  );
}
