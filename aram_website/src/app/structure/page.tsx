export const metadata = {
  title: "Structure | Aram Tamil School",
  description:
    "Tamil school structure and the High School Credit Program (HSCP).",
};

const stats: { value: string; label: string }[] = [
  { value: "4", label: "Levels of HSCP Tamil" },
  { value: "40+", label: "Years at UC Berkeley" },
  { value: "All", label: "US Universities accept it" },
  { value: "GPA", label: "Counts toward final GPA" },
];

const features: { title: string; body: string }[] = [
  {
    title: "World Language Credit",
    body: "Approved as a world language course (like French or Spanish) by Bay Area school districts.",
  },
  {
    title: "On Your Transcript",
    body: "Like any other course at regular school, Tamil is recorded on the school transcript.",
  },
  {
    title: "Meets University Requirements",
    body: "Satisfies the minimum world-language credit requirement for US university applications.",
  },
  {
    title: "Choose Tamil",
    body: "Students can choose to study Tamil in place of another world language at school.",
  },
];

const pathwaySteps: { label: string; sub: string }[] = [
  { label: "HSCP Tamil 1", sub: "Entry level" },
  { label: "HSCP Tamil 2", sub: "Tamil 1 cleared or evaluation passed" },
  { label: "HSCP Tamil 3", sub: "Continuing" },
  { label: "HSCP Tamil 4", sub: "Final level → Graduate" },
];

export default function StructurePage() {
  return (
    <section className="flex w-full flex-col px-6 pt-28 pb-20 sm:px-12 sm:pt-32 md:px-20 md:pt-36 lg:px-28 lg:pt-40">
      {/* Hero */}
      <header className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-700/80 sm:text-sm">
          Program Structure
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
          High School{" "}
          <span className="bg-gradient-to-br from-sky-600 to-sky-900 bg-clip-text text-transparent">
            Credit Program
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Tamil counts. Four progressing levels of high-school Tamil that
          satisfy world-language credit requirements at US universities.
        </p>
      </header>

      {/* Stats */}
      <div className="mx-auto mt-14 grid w-full max-w-5xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="overflow-hidden rounded-2xl border-2 border-white/60 bg-white/60 p-5 text-center shadow-md ring-1 ring-sky-100 backdrop-blur-sm"
          >
            <p className="bg-gradient-to-br from-sky-600 to-sky-900 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
              {s.value}
            </p>
            <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-600 sm:text-xs">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Intro story */}
      <div className="mx-auto mt-20 grid w-full max-w-5xl gap-6 md:grid-cols-3 md:gap-5">
        <article className="rounded-3xl border-2 border-sky-200/70 bg-white/70 p-6 shadow-md backdrop-blur-sm">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-sky-700/80 sm:text-xs">
            01 · Heritage
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-[0.95rem]">
            Tamil, a South Indian language, is one of the most ancient
            languages of the world — its literature dates back to{" "}
            <strong className="text-slate-900">300 BC</strong>. Spoken across
            India, Singapore, Sri Lanka, Malaysia, and by significant
            minorities in England, Canada, and the United States.
          </p>
        </article>
        <article className="rounded-3xl border-2 border-sky-200/70 bg-white/70 p-6 shadow-md backdrop-blur-sm">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-sky-700/80 sm:text-xs">
            02 · Academia
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-[0.95rem]">
            Tamil has been taught at{" "}
            <strong className="text-slate-900">UC Berkeley</strong> for over 40
            years, with dedicated departments at the University of Chicago,
            University of Pennsylvania, and University of Texas – Austin.
          </p>
        </article>
        <article className="rounded-3xl border-2 border-sky-200/70 bg-white/70 p-6 shadow-md backdrop-blur-sm">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-sky-700/80 sm:text-xs">
            03 · ITA Today
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-[0.95rem]">
            <strong className="text-slate-900">International Tamil Academy</strong>{" "}
            (formerly California Tamil Academy) now offers four levels of
            high-school Tamil — approved as world-language courses by various
            Bay Area school districts.
          </p>
        </article>
      </div>

      {/* Features */}
      <div className="mx-auto mt-20 w-full max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-700/80 sm:text-sm">
            Why HSCP
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            What it means for students
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-3xl border-2 border-white/60 bg-gradient-to-br from-white/80 to-sky-50/60 p-6 shadow-md ring-1 ring-sky-100 backdrop-blur-sm"
            >
              <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-[0.95rem]">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pathway */}
      <div className="mx-auto mt-20 w-full max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-700/80 sm:text-sm">
            Learning Pathway
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            HSCP Tamil progression
          </h2>
        </div>

        {/* Step pills */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {pathwaySteps.map((s, i) => (
            <div
              key={s.label}
              className="relative rounded-2xl border-2 border-sky-300 bg-gradient-to-br from-sky-100/80 to-white p-5 shadow-md backdrop-blur-sm"
            >
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-sky-700/80">
                Step {i + 1}
              </p>
              <p className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                {s.label}
              </p>
              <p className="mt-1 text-xs text-slate-600 sm:text-sm">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Diagram placeholder */}
        <div className="mt-6 flex aspect-[16/7] w-full items-center justify-center rounded-3xl border-2 border-dashed border-sky-300/70 bg-white/40 p-6 text-center backdrop-blur-sm sm:aspect-[16/6]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 sm:text-sm">
              Full pathway diagram
            </p>
            <p className="mt-1 text-[0.65rem] text-slate-400 sm:text-xs">
              ITA Graduate · Grade 7+ entry · Placement evaluation · HSCP 1→4
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
