import Image from "next/image";
import { photos } from "../_data/school";
import Highlight from "./Highlight";

function Arrow({ flip = false }: { flip?: boolean }) {
  return (
    <span className="grid h-14 w-14 place-items-center rounded-full border border-ink transition-colors duration-300 group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden className={`transition-transform duration-500 group-hover:rotate-45 ${flip ? "-scale-x-100" : ""}`}>
        <path d="M3 15 15 3M6 3h9v9" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    </span>
  );
}

const cols = [
  { top: "In", bottom: "Class", ta: "வகுப்பில்", body: <>Weekly <strong>lessons</strong>, grade-level syllabus, homework and the path to HSCP credit.</>, href: "#structure", img: photos[2], from: "left" as const },
  { top: "On", bottom: "Stage", ta: "மேடையில்", body: <><strong>Celebrations</strong>, Annual Day performances and photos from the year.</>, href: "#photos", img: photos[1], from: "right" as const },
];

/** Lando's ON TRACK / OFF TRACK split. */
export default function ClassStage() {
  return (
    <section className="relative z-10 bg-paper px-4 py-24 sm:px-6">
      <div className="grid gap-4 md:grid-cols-2">
        {cols.map((c) => (
          <a key={c.top} href={c.href} className="group relative flex min-h-[70svh] flex-col justify-between overflow-hidden rounded-[1.5rem] bg-paper-2 p-6 text-ink transition-colors duration-500 hover:text-paper">
            <Image
              src={c.img.src}
              alt=""
              fill
              sizes="50vw"
              className="scale-110 object-cover opacity-0 grayscale transition-[opacity,transform] duration-700 group-hover:scale-100 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-blue opacity-0 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-100" />
            {/* darken top and bottom on hover so the white text stays readable over the photo */}
            <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/10 to-ink/65 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            <div className="relative">
              <h2 lang="ta" className="font-tamil text-[clamp(3.2rem,7.5vw,7rem)] leading-[1.1] font-extrabold tracking-tight">
                <Highlight from={c.from} color="var(--color-moss)" className="block">
                  {c.ta}
                </Highlight>
              </h2>
              <p lang="en" className="mt-2 text-[clamp(1.8rem,3.5vw,3rem)] leading-none font-black tracking-tighter uppercase opacity-70">
                {c.top} {c.bottom}
              </p>
            </div>
            <div className="relative flex items-end justify-between gap-6">
              <p className="max-w-xs text-lg leading-snug">{c.body}</p>
              <Arrow flip={c.from === "right"} />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
