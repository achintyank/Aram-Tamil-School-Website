export const metadata = {
  title: "Structure | Aram Tamil School",
  description:
    "Tamil school structure — from early Tamil foundations through the High School Credit Program (HSCP).",
};

const stats: { value: string; label: string }[] = [
  { value: "TK – 8", label: "Regular grade levels" },
  { value: "4", label: "Levels of HSCP Tamil" },
  { value: "40+", label: "Years at UC Berkeley" },
  { value: "All", label: "US Universities accept it" },
];

const regularFeatures: { title: string; body: string }[] = [
  {
    title: "Reading & Writing",
    body: "Letters, words, sentences — children build literacy from the ground up in age-appropriate steps.",
  },
  {
    title: "Speaking & Listening",
    body: "Songs, conversations, stories — practical fluency through everyday use, not just textbook recall.",
  },
  {
    title: "Culture & Tradition",
    body: "Festivals, stories, values — Tamil isn't just a language, it's a cultural inheritance.",
  },
  {
    title: "Bridge to HSCP",
    body: "Graduates of the regular program can enroll directly in HSCP Tamil 2 — no placement test needed.",
  },
];

const hscpFeatures: { title: string; body: string }[] = [
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

const regularSteps: { label: string; sub: string }[] = [
  { label: "TK & K", sub: "Early foundations" },
  { label: "Grades 1 – 5", sub: "Elementary literacy" },
  { label: "Grades 6 – 8", sub: "Middle-school fluency" },
];

const hscpSteps: { label: string; sub: string }[] = [
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
          From foundations to{" "}
          <span className="bg-gradient-to-br from-sky-600 to-sky-900 bg-clip-text text-transparent">
            high school credit
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Two tracks under one school. Young children build Tamil fundamentals in
          regular grade-level classes; high schoolers earn world-language credit
          through HSCP — both rooted in the same heritage.
        </p>
      </header>

      {/* Stats */}
      <div className="mx-auto mt-10 sm:mt-12 md:mt-14 grid w-full max-w-5xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="overflow-hidden rounded-2xl border-2 border-white/60 bg-white/60 p-5 text-center shadow-md ring-1 ring-sky-100 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:ring-sky-200"
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
      <div className="mx-auto mt-12 sm:mt-16 md:mt-20 grid w-full max-w-5xl gap-6 md:grid-cols-3 md:gap-5">
        <article className="rounded-3xl border-2 border-sky-200/70 bg-white/70 p-6 shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-sky-400 hover:shadow-lg">
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
        <article className="rounded-3xl border-2 border-sky-200/70 bg-white/70 p-6 shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-sky-400 hover:shadow-lg">
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
        <article className="rounded-3xl border-2 border-sky-200/70 bg-white/70 p-6 shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-sky-400 hover:shadow-lg">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-sky-700/80 sm:text-xs">
            03 · ITA Today
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-[0.95rem]">
            <strong className="text-slate-900">International Tamil Academy</strong>{" "}
            (formerly California Tamil Academy) runs two parallel programs —
            regular grade-level classes for young children, and HSCP for high
            school students.
          </p>
        </article>
      </div>

      {/* Two tracks overview */}
      <div className="mx-auto mt-12 sm:mt-16 md:mt-20 w-full max-w-5xl">
        <div className="mb-6 sm:mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-700/80 sm:text-sm">
            Two Tracks
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            One school, two paths
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-3xl border-2 border-emerald-300/70 bg-gradient-to-br from-emerald-50/90 to-white/80 p-5 shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500 hover:shadow-xl sm:p-7">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-emerald-700/80 sm:text-xs">
              Track A · Regular Tamil School
            </p>
            <h3 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              TK – Grade 8
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-[0.95rem]">
              Foundation-building for young children. Reading, writing,
              speaking, listening — plus stories, songs, and cultural roots.
            </p>
          </div>
          <div className="rounded-3xl border-2 border-sky-300/70 bg-gradient-to-br from-sky-50/90 to-white/80 p-5 shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-sky-500 hover:shadow-xl sm:p-7">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-sky-700/80 sm:text-xs">
              Track B · HSCP
            </p>
            <h3 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              High School Credit
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-[0.95rem]">
              Four-level world-language program for students, starting at grade 7 that satisfies
              high school world-language credit requirements and counts toward
              the GPA on the public-school transcript.
            </p>
          </div>
        </div>
      </div>

      {/* Regular program details */}
      <div className="mx-auto mt-12 sm:mt-16 md:mt-20 w-full max-w-5xl">
        <div className="mb-6 sm:mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700/80 sm:text-sm">
            Track A · Regular Tamil School
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Building Tamil from the ground up
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            From transitional kindergarten through eighth grade, children
            progress through carefully sequenced classes that grow with them —
            starting with the alphabet and arriving at conversational fluency by
            the end of middle school.
          </p>
        </div>

        <div className="mb-6 sm:mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {regularSteps.map((s, i) => (
            <div
              key={s.label}
              className="rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-100/80 to-white p-5 shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500 hover:shadow-lg"
            >
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-emerald-700/80">
                Step {i + 1}
              </p>
              <p className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                {s.label}
              </p>
              <p className="mt-1 text-xs text-slate-600 sm:text-sm">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {regularFeatures.map((f) => (
            <div
              key={f.title}
              className="rounded-3xl border-2 border-white/60 bg-gradient-to-br from-white/80 to-emerald-50/60 p-6 shadow-md ring-1 ring-emerald-100 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg hover:ring-emerald-200"
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

      {/* HSCP details */}
      <div className="mx-auto mt-12 sm:mt-16 md:mt-20 w-full max-w-5xl">
        <div className="mb-6 sm:mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-700/80 sm:text-sm">
            Track B · HSCP
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            What HSCP means for students
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {hscpFeatures.map((f) => (
            <div
              key={f.title}
              className="rounded-3xl border-2 border-white/60 bg-gradient-to-br from-white/80 to-sky-50/60 p-6 shadow-md ring-1 ring-sky-100 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg hover:ring-sky-200"
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

      {/* HSCP Pathway */}
      <div className="mx-auto mt-12 sm:mt-16 md:mt-20 w-full max-w-5xl">
        <div className="mb-6 sm:mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-700/80 sm:text-sm">
            Learning Pathway
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            HSCP Tamil progression
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {hscpSteps.map((s, i) => (
            <div
              key={s.label}
              className="relative rounded-2xl border-2 border-sky-300 bg-gradient-to-br from-sky-100/80 to-white p-5 shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg"
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
