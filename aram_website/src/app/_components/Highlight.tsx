"use client";

import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from "react";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Sweep colour; defaults to blue. */
  color?: string;
  from?: "left" | "right";
  delay?: number;
  lang?: string;
};

/** Lando-style reveal: a solid bar wipes across and leaves the text behind. */
export default function Highlight({ children, as: Tag = "span", className = "", color, from = "left", delay = 0, lang }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = {
    "--hl-color": color,
    "--hl-from": from,
    "--hl-to": from === "left" ? "right" : "left",
    "--hl-delay": `${delay}ms`,
  } as CSSProperties;

  return (
    <Tag ref={ref} lang={lang} className={`hl ${className}`} style={style}>
      <span className="hl-text">{children}</span>
    </Tag>
  );
}
