import {
  heritage,
  hscpFeatures,
  hscpLevels,
  programStats,
  regularFeatures,
} from "../_data/school";
import GradeSteps from "./GradeSteps";
import SectionTitle from "./SectionTitle";
import SyllabusTag, { SyllabusHint, SyllabusLink } from "./SyllabusTag";

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

/** Lando's helmet hall of fame → program structure, one card per class. */
export default function Structure() {
  return (
    <section id="structure" className="relative z-10 rounded-[2rem] bg-moss px-4 py-24 text-paper sm:px-6">
      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end">
        <div>
          <SectionTitle ta={["வகுப்புகள்"]} en="First letters to high school credit" enClassName="text-blue-soft" />
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
        <GradeSteps />
        <Features items={regularFeatures} />
      </div>

      <div className="mt-24">
        <TrackHeader
          tag="Track B · High School Credit Program"
          title="HSCP Tamil 1 – 4"
          body="A four-level world-language program starting at grade 7 that satisfies high-school world-language requirements and counts toward GPA on the public-school transcript."
        />
        <SyllabusHint noun="level" />
        <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {hscpLevels.map((l) => (
            <li key={l.n}>
              <SyllabusLink file={l.file} label={`HSCP Tamil ${l.n}`} className="group flex h-full min-h-72 flex-col justify-between rounded-2xl bg-paper p-5 text-ink transition-colors duration-300 hover:bg-blue hover:text-paper">
                <div className="flex items-start justify-between">
                  <p className="eyebrow">HSCP Tamil</p>
                  <SyllabusTag file={l.file} />
                </div>
                <p className="font-impact text-[9rem] leading-[0.8] transition-transform duration-500 group-hover:-translate-y-2">{l.n}</p>
                <p className="text-sm font-bold uppercase">{l.sub}</p>
              </SyllabusLink>
            </li>
          ))}
        </ol>
        <Features items={hscpFeatures} />
      </div>
    </section>
  );
}
