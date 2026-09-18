"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { navLinks, photos, school, socials } from "../_data/school";
import Roll from "./Roll";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const goTo = (hash: string) => {
    setOpen(false);
    const lenis = (window as unknown as { __lenis?: { start(): void; scrollTo(t: string, o?: object): void } }).__lenis;
    if (lenis) {
      lenis.start();
      lenis.scrollTo(hash, { duration: 1.4 });
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 200 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
    if (open) lenis?.stop();
    else lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[120] px-4 pt-4 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] sm:px-6 ${
          hidden && !open ? "-translate-y-[120%]" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              goTo("#top");
            }}
            aria-label={`${school.nameEn} home`}
            className="group grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ink p-1.5 shadow-[0_6px_24px_rgba(0,0,0,0.35)] sm:h-16 sm:w-16"
          >
            <Image src="/landing_page/atslogo.png" alt="" width={128} height={128} priority className="h-full w-full object-contain transition-transform duration-500 group-hover:rotate-[-8deg]" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className={`group flex h-14 items-center gap-3 rounded-full pr-2 pl-6 text-sm font-extrabold tracking-wide uppercase shadow-[0_6px_24px_rgba(0,0,0,0.35)] ring-1 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue ${
              open ? "bg-paper text-ink ring-ink/10" : "bg-blue text-paper ring-paper/25 hover:bg-ink"
            }`}
          >
            <Roll text={open ? "Close" : "Menu"} />
            <span className={`relative grid h-10 w-10 place-items-center rounded-full transition-colors duration-300 ${open ? "bg-ink text-paper" : "bg-paper text-ink"}`}>
              <span className={`absolute h-0.5 w-4 rounded bg-current transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[5px]"}`} />
              <span className={`absolute h-0.5 w-4 rounded bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
              <span className={`absolute h-0.5 w-4 rounded bg-current transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[5px]"}`} />
            </span>
          </button>
        </div>
      </header>

      <div
        className="fixed inset-0 z-[110] bg-moss text-paper transition-[clip-path] duration-700 ease-[cubic-bezier(0.77,0,0.18,1)]"
        style={{ clipPath: open ? "inset(0 0 0 0 round 0)" : "inset(0 0 100% 0 round 0 0 40px 40px)" }}
        aria-hidden={!open}
      >
        <div className="grid h-full grid-cols-1 gap-8 px-4 pt-24 pb-6 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative hidden overflow-hidden rounded-2xl lg:block">
            <Image src={photos[0].src} alt="" fill sizes="45vw" className="object-cover grayscale-[40%]" />
            <div className="absolute inset-0 bg-blue mix-blend-multiply" />
          </div>
          <div className="flex flex-col justify-between">
            <nav>
              <ul>
                {navLinks.map((l, i) => (
                  <li
                    key={l.href}
                    className="border-b border-paper/15 transition-[opacity,transform] duration-700"
                    style={{
                      transitionDelay: open ? `${200 + i * 50}ms` : "0ms",
                      opacity: open ? 1 : 0,
                      transform: open ? "none" : "translateY(30px)",
                    }}
                  >
                    <a
                      href={l.href}
                      onClick={(e) => {
                        e.preventDefault();
                        goTo(l.href);
                      }}
                      tabIndex={open ? 0 : -1}
                      className="group flex items-baseline justify-between py-3 hover:text-blue"
                    >
                      <span lang="ta" className="font-tamil text-4xl leading-[1.25] font-extrabold transition-transform duration-500 group-hover:translate-x-2 sm:text-6xl">
                        {l.ta}
                      </span>
                      <span className="text-sm font-bold tracking-wide text-paper/50 uppercase group-hover:text-blue sm:text-lg">
                        {l.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-4 text-sm">
              <div className="flex gap-5">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} tabIndex={open ? 0 : -1} className="group eyebrow hover:text-blue">
                    <Roll text={s.label} />
                  </a>
                ))}
              </div>
              <p className="eyebrow text-paper/50">{school.region}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
