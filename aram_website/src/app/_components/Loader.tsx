"use client";

import { useEffect, useState } from "react";

/** Full-screen blue intro, like Lando's "LOAD NORRIS" — shown once per session. */
export default function Loader() {
  const [phase, setPhase] = useState<"draw" | "exit" | "done">("draw");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("ats-intro") === "1";
      sessionStorage.setItem("ats-intro", "1");
    } catch {}
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
    if (seen) {
      const skip = setTimeout(() => setPhase("done"), 0);
      return () => clearTimeout(skip);
    }
    lenis?.stop();
    const a = setTimeout(() => setPhase("exit"), 2100);
    const b = setTimeout(() => {
      setPhase("done");
      lenis?.start();
    }, 3000);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
      lenis?.start();
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[999] flex items-center justify-center bg-blue transition-[clip-path] duration-[900ms] ease-[cubic-bezier(0.77,0,0.18,1)]"
      style={{ clipPath: phase === "exit" ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)" }}
    >
      <svg viewBox="0 0 400 220" className="w-[min(70vw,520px)] overflow-visible">
        <text
          x="200"
          y="165"
          textAnchor="middle"
          className="loader-word font-tamil"
          style={{ fontSize: 170, fontWeight: 800 }}
        >
          அறம்
        </text>
      </svg>
      <p className="eyebrow absolute bottom-6 left-1/2 -translate-x-1/2 text-paper">Loading Aram</p>
      <style>{`
        .loader-word{fill:transparent;stroke:var(--color-paper);stroke-width:2.5;stroke-dasharray:900;stroke-dashoffset:900;
          animation:ld-stroke 1.4s cubic-bezier(.65,0,.35,1) forwards, ld-fill .5s ease 1.25s forwards}
        @keyframes ld-stroke{to{stroke-dashoffset:0}}
        @keyframes ld-fill{to{fill:var(--color-paper)}}
      `}</style>
    </div>
  );
}
