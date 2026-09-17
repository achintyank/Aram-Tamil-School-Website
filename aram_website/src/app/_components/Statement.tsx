"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { school } from "../_data/school";

const TEXT =
  "Run by volunteers, for Tamil. Teaching language, culture and confidence to students from TK through twelfth grade — every Sunday since 2010.";

/** Big uppercase statement whose words light up as you scroll through it. */
export default function Statement() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".st-word",
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 60%", scrub: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative z-10 bg-paper px-4 py-32 sm:px-6 sm:py-44">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-blue ring-1 ring-ink" />
          <p className="eyebrow">{school.parent} · Since {school.established}</p>
        </div>
        <p className="text-[clamp(2rem,5.4vw,5.2rem)] leading-[0.98] font-extrabold tracking-tight uppercase">
          {TEXT.split(" ").map((w, i) => (
            <span key={i} className="st-word">
              {w}{" "}
            </span>
          ))}
        </p>
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink/15 sm:grid-cols-4">
          {[
            ["Students", school.students],
            ["Grades", school.grades],
            ["Ages", school.ages],
            ["Est.", String(school.established)],
          ].map(([k, v]) => (
            <div key={k} className="bg-paper p-5">
              <p className="eyebrow text-graphite">{k}</p>
              <p className="mt-6 font-impact text-5xl sm:text-6xl">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
