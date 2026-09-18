"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Kural as KuralData } from "../_data/kural";
import Highlight from "./Highlight";


/**
 * Lando's "Message from Lando" — here, the kural of the day (a new one daily, see _data/kural.ts). The panel pins while both lines of the
 * couplet slide across from first word to last, so the whole kural is read as you scroll.
 */
export default function Kural({ kural }: { kural: KuralData }) {
  const root = useRef<HTMLElement>(null);
  const rowA = useRef<HTMLDivElement>(null);
  const rowB = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const a = rowA.current!, b = rowB.current!;
      const pad = () => window.innerWidth * 0.06;
      // how far each line must travel so its last word ends at the right edge
      const travel = (el: HTMLElement) => Math.max(0, el.scrollWidth - window.innerWidth + pad() * 2);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${Math.max(travel(a), travel(b)) * 1.1 + window.innerHeight * 0.3}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      tl.fromTo(a, { x: () => pad() }, { x: () => pad() - travel(a), ease: "none" }, 0);
      tl.fromTo(b, { x: () => pad() + window.innerWidth * 0.25 }, { x: () => pad() - travel(b), ease: "none" }, 0);
    });
    // Tamil webfont widths change the travel distance, so re-measure once fonts are in
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => mm.revert();
  }, [kural.number]);

  return (
    <section
      ref={root}
      className="relative z-10 flex h-svh min-h-[560px] flex-col justify-between overflow-hidden rounded-t-[2rem] bg-ink py-6 text-paper shadow-[0_-1px_0_rgba(244,244,237,0.18)]"
    >
      <div className="flex items-start justify-between px-4 sm:px-6">
        <Highlight className="eyebrow text-blue">A word from Thiruvalluvar</Highlight>
        <p className="eyebrow text-right text-paper/50">
          Kural {kural.number} · <span lang="ta" className="font-tamil normal-case">{kural.bookTa}</span>
        </p>
      </div>

      <div lang="ta" aria-label={`${kural.line1} ${kural.line2}`} className="font-tamil leading-[1.05] font-extrabold">
        <div ref={rowA} className="w-max text-[clamp(3rem,9vw,8.5rem)] whitespace-nowrap text-blue motion-reduce:w-auto motion-reduce:px-4 motion-reduce:text-[clamp(2.5rem,8vw,7rem)] motion-reduce:whitespace-normal">
          {kural.line1}
        </div>
        <div ref={rowB} className="w-max text-[clamp(3rem,9vw,8.5rem)] whitespace-nowrap text-transparent [-webkit-text-stroke:1.5px_var(--color-paper)] motion-reduce:w-auto motion-reduce:px-4 motion-reduce:text-[clamp(2.5rem,8vw,7rem)] motion-reduce:whitespace-normal">
          {kural.line2}
        </div>
      </div>

      <div className="grid gap-6 px-4 sm:grid-cols-2 sm:px-6">
        <p lang="en" className="max-w-xl text-xl leading-snug font-bold sm:text-2xl">{kural.english}.</p>
        <p className="max-w-sm self-end text-sm text-paper/60 sm:justify-self-end">
          {"Our name comes from "}
          <span lang="ta" className="font-tamil text-paper">அறம்</span>
          {" — virtue, the first of the Kural’s three books. Every Sunday we teach the language that carries it."}
        </p>
      </div>
    </section>
  );
}
