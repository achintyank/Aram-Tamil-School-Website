import {
  heritage,
  hscpFeatures,
  hscpLevels,
  programStats,
  regularFeatures,
  regularLevels,
  SYLLABUS_READY,
} from "../_data/school";
import Highlight from "./Highlight";

function SyllabusTag({ file }: { file: string }) {
  if (!SYLLABUS_READY) return <span className="eyebrow opacity-50">Syllabus soon</span>;
  return (
    <a href={`/syllabus/${file}.pdf`} download className="eyebrow inline-flex items-center gap-1.5 underline decoration-2 underline-offset-4">
      <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 3v12m-5-5 5 5 5-5M4 21h16" />
      </svg>
      Syllabus
    </a>
  );
}

function Features({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((f) => (
        <li key={f.title} className="bg-moss p-5">
          <h4 className="text-lg font-extrabold uppercase">{f.title}</h4>
          <p className="mt-2 text-sm leading-relaxed text-paper/65">{f.body}</p>
        </li>
      ))}
    </ul>
  );
}

function TrackHeader({ tag, title, body }: { tag: string; title: string; body: string }) {
  return (
    <div className="grid gap-4 border-t border-paper/20 pt-6 md:grid-cols-[1fr_1fr] md:items-end">
      <div>
        <p className="eyebrow text-blue-soft">{tag}</p>
        <h3 className="mt-3 text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.9] font-black tracking-tight uppercase">{title}</h3>
      </div>
      <p className="max-w-md text-lg text-paper/70 md:justify-self-end">{body}</p>
    </div>
  );
}

/** Lando's helmet hall of fame → program structure, one letter card per class. */
export default function Structure() {
  return (
    <section id="structure" className="relative z-10 rounded-[2rem] bg-moss px-4 py-24 text-paper sm:px-6">
      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end">
        <div>
          <p lang="ta" className="font-tamil text-2xl font-extrabold text-blue-soft">வகுப்புகள்</p>
          <h2 className="mt-2 text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.9] font-black tracking-tight uppercase">
            <Highlight className="block">First letters</Highlight>
            <Highlight delay={120} className="block text-blue-soft" color="var(--color-paper)">
              to high school credit
            </Highlight>
          </h2>
        </div>
        <p className="max-w-md text-lg text-paper/70 md:justify-self-end">
          Two tracks under one school. Young children build Tamil fundamentals in grade-level classes; high
          schoolers earn world-language credit through HSCP — both rooted in the same heritage.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-paper/10 lg:grid-cols-4">
        {programStats.map((s) => (
          <div key={s.label} className="bg-moss p-5">
            <p className="eyebrow text-paper/50">{s.label}</p>
            <p className="mt-6 font-impact text-5xl text-blue-soft sm:text-6xl">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {heritage.map((h, i) => (
          <article key={h.tag} className="rounded-2xl border border-paper/15 p-5">
            <p className="eyebrow text-paper/50">
              {String(i + 1).padStart(2, "0")} · {h.tag}
            </p>
            <p className="mt-4 leading-relaxed text-paper/80 [&_strong]:text-paper">{h.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-24">
        <TrackHeader
          tag="Track A · Regular Tamil school"
          title="TK – Grade 8"
          body="Carefully sequenced classes that grow with the child — from the alphabet in TK to conversational fluency by the end of middle school."
        />
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {regularLevels.map((l, i) => (
            <li key={l.label}>
              <div className="group flex h-full min-h-52 flex-col justify-between rounded-2xl bg-moss-2 p-4 transition-colors duration-300 hover:bg-blue">
                <div className="flex justify-between gap-2">
                  <p className="eyebrow text-paper/60">{l.group}</p>
                  <p className="eyebrow opacity-60">{String(i + 1).padStart(2, "0")}</p>
                </div>
                <p
                  lang="ta"
                  aria-hidden
                  className="self-center font-tamil text-7xl leading-none font-extrabold transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-rotate-6"
                >
                  {l.letter}
                </p>
                <div className="flex items-end justify-between gap-2">
                  <p className="text-xl font-extrabold uppercase">{l.label}</p>
                  <SyllabusTag file={l.file} />
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Features items={regularFeatures} />
      </div>

      <div className="mt-24">
        <TrackHeader
          tag="Track B · High School Credit Program"
          title="HSCP Tamil 1 – 4"
          body="A four-level world-language program starting at grade 7 that satisfies high-school world-language requirements and counts toward GPA on the public-school transcript."
        />
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {hscpLevels.map((l) => (
            <li key={l.n} className="group flex min-h-72 flex-col justify-between rounded-2xl bg-paper p-5 text-ink transition-colors duration-300 hover:bg-blue hover:text-paper">
              <div className="flex items-start justify-between">
                <p className="eyebrow">HSCP Tamil</p>
                <SyllabusTag file={l.file} />
              </div>
              <p className="font-impact text-[9rem] leading-[0.8] transition-transform duration-500 group-hover:-translate-y-2">{l.n}</p>
              <p className="text-sm font-bold uppercase">{l.sub}</p>
            </li>
          ))}
        </ol>
        <Features items={hscpFeatures} />
      </div>
    </section>
  );
}
