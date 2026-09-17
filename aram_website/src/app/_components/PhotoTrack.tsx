"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { photos, school } from "../_data/school";

type Item =
  | { kind: "photo"; src: string; caption: string; w: number; h: number; tall?: boolean }
  | { kind: "quote"; ta: string; en: string }
  | { kind: "stat"; value: string; label: string }
  | { kind: "empty"; caption: string };

const items: Item[] = [
  { kind: "photo", ...photos[0] },
  { kind: "quote", ta: "யாதும் ஊரே யாவரும் கேளிர்", en: "Every place is home, everyone is kin." },
  { kind: "photo", ...photos[1], tall: true },
  { kind: "stat", value: school.students, label: "students this year" },
  { kind: "photo", ...photos[2] },
  { kind: "empty", caption: "Pongal, 2026 — photo coming soon" },
  { kind: "quote", ta: "தமிழுக்கும் அமுதென்று பேர்", en: "Tamil — its other name is nectar." },
  { kind: "photo", ...photos[3] },
];

/** Pinned section that scrolls sideways, like Lando's trackside gallery. */
export default function PhotoTrack() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current!;
      const dist = () => el.scrollWidth - window.innerWidth;
      const tween = gsap.to(el, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      gsap.utils.toArray<HTMLElement>(".pt-img").forEach((img) => {
        gsap.fromTo(img, { xPercent: -8 }, {
          xPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="photos" ref={root} className="relative z-10 overflow-hidden bg-paper md:h-svh">
      <div className="flex items-center justify-between px-4 pt-6 sm:px-6">
        <p className="eyebrow">From the stage & the classroom</p>
        <p className="eyebrow hidden text-graphite md:block">Scroll →</p>
      </div>
      <div
        ref={track}
        className="flex flex-col gap-4 px-4 py-6 sm:px-6 md:h-[calc(100svh-3rem)] md:w-max md:flex-row md:items-center md:gap-6"
      >
        {items.map((it, i) => {
          if (it.kind === "photo")
            return (
              <figure key={i} className={`shrink-0 ${it.tall ? "md:h-[78%]" : "md:h-[62%]"} ${i % 2 ? "md:self-end" : "md:self-start md:mt-[6vh]"}`}>
                <div
                  className="relative overflow-hidden rounded-2xl md:h-[calc(100%-2rem)]"
                  style={{ aspectRatio: it.tall ? "3 / 4" : `${it.w} / ${it.h}` }}
                >
                  <Image src={it.src} alt={it.caption} fill sizes="(min-width:768px) 60vw, 100vw" className="pt-img scale-[1.18] object-cover" />
                </div>
                <figcaption className="eyebrow mt-3">{it.caption}</figcaption>
              </figure>
            );
          if (it.kind === "quote")
            return (
              <blockquote key={i} className="shrink-0 py-10 md:w-[34vw] md:py-0">
                <p lang="ta" className="font-tamil text-4xl leading-tight font-extrabold md:text-5xl">“{it.ta}”</p>
                <p className="mt-4 text-lg text-graphite">{it.en}</p>
              </blockquote>
            );
          if (it.kind === "stat")
            return (
              <div key={i} className="flex shrink-0 flex-col justify-end rounded-2xl bg-blue p-6 text-paper md:h-[50%] md:w-[26vw]">
                <p className="font-impact text-[clamp(5rem,11vw,10rem)] leading-none">{it.value}</p>
                <p className="eyebrow mt-2">{it.label}</p>
              </div>
            );
          return (
            <figure key={i} className="shrink-0 md:h-[48%] md:self-end">
              <div className="grid aspect-[4/5] place-items-center rounded-2xl border border-dashed border-ink/40 bg-paper-2 md:aspect-auto md:h-[calc(100%-2rem)] md:w-[22vw]">
                <span lang="ta" className="font-tamil text-7xl font-extrabold text-ink/15">பொ</span>
              </div>
              <figcaption className="eyebrow mt-3 text-graphite">{it.caption}</figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
