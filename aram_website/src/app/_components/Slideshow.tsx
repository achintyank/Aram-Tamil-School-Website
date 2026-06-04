"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type SlideEntry =
  | { kind: "image"; src: string; alt?: string }
  | { kind: "color"; gradient: string };

type Variant = "wipe-x" | "wipe-y" | "zoom" | "pan-zoom";

const animations: Record<Variant, string> = {
  "wipe-x": "animate-[wipe-x_2200ms_ease-out_forwards]",
  "wipe-y": "animate-[wipe-y_2200ms_ease-out_forwards]",
  zoom: "animate-[zoom-out_2500ms_ease-out_forwards]",
  "pan-zoom": "animate-[pan-zoom_5500ms_ease-in-out_forwards]",
};

type Props = {
  slides: SlideEntry[];
  variant: Variant;
  pauseMs?: number;
  sizes?: string;
};

export default function Slideshow({
  slides,
  variant,
  pauseMs = 5000,
  sizes,
}: Props) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleAnimationEnd = () => {
    if (slides.length <= 1) return;
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, pauseMs);
  };

  const slide = slides[index];
  if (!slide) return null;

  return (
    <div
      key={index}
      onAnimationEnd={handleAnimationEnd}
      className={`absolute inset-0 ${animations[variant]}`}
    >
      {slide.kind === "image" ? (
        <Image
          src={slide.src}
          alt={slide.alt ?? ""}
          fill
          className="object-cover"
          sizes={sizes ?? "(min-width: 1280px) 30vw, (min-width: 768px) 40vw, 50vw"}
        />
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
        />
      )}
    </div>
  );
}
