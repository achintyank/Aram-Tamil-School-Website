"use client";

import { useEffect, useRef } from "react";
import { KOLAM_DOTS, KOLAM_LOOPS } from "../_data/kolam";

const CREAM = "#f1e4c8";
const DRAW_DELAY = 1000;
const LOOP_STAGGER = 260;
const LOOP_DRAW = 1600;
const READY = DRAW_DELAY + KOLAM_LOOPS.length * LOOP_STAGGER + LOOP_DRAW;

const BREATH_MS = 7000; // one full lap of the breath around the kolam
const SWELL = 9; // how far a side moves outward at its fullest (viewBox units, kolam is ~940 wide)

/** Outward push + delay for something sitting at (x, y): the breath travels round clockwise. */
function breath(x: number, y: number): React.CSSProperties & Record<string, string> {
  const dist = Math.hypot(x, y);
  const angle = Math.atan2(y, x); // -π..π, 0 = right
  const k = Math.min(1, dist / 400);
  return {
    "--dx": `${dist ? (x / dist) * SWELL * k : 0}px`,
    "--dy": `${dist ? (y / dist) * SWELL * k : 0}px`,
    "--s": dist < 60 ? "1.04" : "1",
    animationDelay: `${READY + ((angle + Math.PI) / (2 * Math.PI)) * BREATH_MS}ms`,
  } as React.CSSProperties & Record<string, string>;
}

/**
 * Hero kolam: an elegant sikku kolam in cream. The dots are laid first, then each
 * loop is drawn from the centre outward. Afterwards it breathes: each side of the
 * kolam swells outward a little and settles back, one after the other around the circle.
 */
export default function Kolam({ className = "" }: { className?: string }) {
  const svg = useRef<SVGSVGElement>(null);

  // Draw-in uses each loop's real length; dashes are removed afterwards because
  // dashed strokes render fuzzy at large sizes in Chrome. Loops also get their breath
  // offsets from their real centres.
  useEffect(() => {
    const loops = [...(svg.current?.querySelectorAll<SVGPathElement>(".kolam-loop") ?? [])];
    for (const p of loops) {
      p.style.setProperty("--len", String(Math.ceil(p.getTotalLength()) + 2));
      const b = p.getBBox();
      const g = p.parentElement as unknown as SVGGElement;
      const vars = breath(b.x + b.width / 2, b.y + b.height / 2);
      // loops centred on the middle can't swell in one direction: grow them evenly instead,
      // so their outer edge moves about as far as the sides do
      if (vars["--s"] !== "1") vars["--s"] = String(1 + ((SWELL * 0.6) / Math.max(b.width, b.height, 1)) * 2);
      for (const [k, v] of Object.entries(vars)) {
        if (k === "animationDelay") g.style.animationDelay = v as string;
        else g.style.setProperty(k, v as string);
      }
      g.classList.add("kolam-breathe");
    }
    const done = setTimeout(() => {
      for (const p of loops) {
        p.style.animation = "none";
        p.style.strokeDasharray = "none";
      }
    }, READY + 200);
    return () => clearTimeout(done);
  }, []);

  return (
    <div aria-hidden className={`pointer-events-none ${className}`}>
      <svg ref={svg} viewBox="-470 -470 940 940" className="h-full w-full overflow-visible">
        {KOLAM_DOTS.map(([x, y], i) => (
          <g key={`${x},${y}`} className="kolam-breathe" style={breath(x, y)}>
            <circle cx={x} cy={y} r={7} fill={CREAM} className="kolam-dot" style={{ animationDelay: `${i * 25}ms` }} />
          </g>
        ))}

        {KOLAM_LOOPS.map((d, i) => (
          <g key={i}>
            <path
              d={d}
              fill="none"
              stroke={CREAM}
              strokeWidth={13}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="kolam-loop"
              style={{ animationDelay: `${DRAW_DELAY + i * LOOP_STAGGER}ms` }}
            />
          </g>
        ))}
      </svg>

      <style>{`
        .kolam-dot { opacity: 0; animation: kolam-in .5s ease forwards; }
        @keyframes kolam-in { to { opacity: 1; } }
        .kolam-loop { stroke-dasharray: var(--len, 6000); stroke-dashoffset: var(--len, 6000); animation: kolam-draw ${LOOP_DRAW}ms cubic-bezier(.65,0,.35,1) forwards; }
        @keyframes kolam-draw { to { stroke-dashoffset: 0; } }
        /* breathing: swell outward and settle, each side in turn */
        .kolam-breathe { transform-box: view-box; transform-origin: 0 0; animation: kolam-breathe ${BREATH_MS}ms ease-in-out infinite; }
        @keyframes kolam-breathe {
          0%, 100% { transform: translate(0, 0) scale(1); }
          30% { transform: translate(var(--dx), var(--dy)) scale(var(--s)); }
          60% { transform: translate(0, 0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .kolam-dot { animation: none; opacity: 1; }
          .kolam-loop { animation: none; stroke-dasharray: none; }
          .kolam-breathe { animation: none; }
        }
      `}</style>
    </div>
  );
}
