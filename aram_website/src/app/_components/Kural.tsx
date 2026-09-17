"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Highlight from "./Highlight";

const LINE = "கற்க கசடறக் கற்பவை கற்றபின் நிற்க அதற்குத் தக";

/** Lando's "Message from Lando" — here, Kural 391, scrubbed sideways by scroll. */
export default function Kural() {
  const root = useRef<HTMLElement>(null);
  const rowA = useRef<HTMLDivElement>(null);
  const rowB = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true };
      gsap.fromTo(rowA.current, { xPercent: 0 }, { xPercent: -35, ease: "none", scrollTrigger: st });
      gsap.fromTo(rowB.current, { xPercent: -35 }, { xPercent: 0, ease: "none", scrollTrigger: st });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative z-10 flex min-h-svh flex-col justify-between overflow-hidden rounded-t-[2rem] bg-ink py-6 text-paper shadow-[0_-1px_0_rgba(244,244,237,0.18)]"
    >
      <div className="flex items-start justify-between px-4 sm:px-6">
        <Highlight className="eyebrow text-blue">A word from Thiruvalluvar</Highlight>
        <p className="eyebrow text-paper/50">Kural 391</p>
      </div>

      <div lang="ta" aria-label={LINE} className="font-tamil leading-[1.05] font-extrabold whitespace-nowrap">
        <div ref={rowA} className="text-[clamp(4rem,14vw,13rem)] text-blue">
          {LINE} · {LINE}
        </div>
        <div ref={rowB} className="text-[clamp(4rem,14vw,13rem)] text-transparent [-webkit-text-stroke:1.5px_var(--color-paper)]">
          {LINE} · {LINE}
        </div>
      </div>

      <div className="grid gap-6 px-4 sm:grid-cols-2 sm:px-6">
        <p className="max-w-md text-2xl leading-tight font-bold uppercase sm:text-3xl">
          Learn thoroughly what should be learnt — then live by it.
        </p>
        <p className="max-w-sm self-end text-sm text-paper/60 sm:justify-self-end">
          {"Our name comes from "}
          <span lang="ta" className="font-tamil text-paper">அறம்</span>
          {" — virtue, the first of the Kural’s three books. Every Sunday we teach the language that carries it."}
        </p>
      </div>
    </section>
  );
}
