import type { SlideEntry } from "../_components/Slideshow";

// Replace { kind: "color", ... } entries with { kind: "image", src: "/path/to.jpg", alt: "..." }
// when real photos are ready. Add more entries to enable cycling — a single entry plays
// the reveal animation once on mount and sits static after.

export const topLeftSlides: SlideEntry[] = [
  { kind: "image", src: "/landing_page/surya_violin.jpeg", alt: "" },
];

export const bottomSlides: SlideEntry[] = [
  { kind: "image", src: "/landing_page/second_paatu_ppl.jpeg", alt: "" },
  { kind: "image", src: "/landing_page/hscp4_co25.jpeg", alt: "" },
  { kind: "image", src: "/landing_page/hscp4_co25_onstage_after_performance.jpeg", alt: "" },
];

export const rightSlides: SlideEntry[] = [
  { kind: "color", gradient: "from-emerald-200 to-teal-300" },
];
