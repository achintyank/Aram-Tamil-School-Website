export const metadata = {
  title: "Syllabus | Aram Tamil School",
  description: "Course syllabus downloads for each level at Aram Tamil School.",
};

const hscpLevels: { n: number; sub: string }[] = [
  { n: 1, sub: "Entry level · 7th grade+" },
  { n: 2, sub: "After Tamil 1 or evaluation" },
  { n: 3, sub: "Continuing" },
  { n: 4, sub: "Final level" },
];

const gradeGroups: {
  label: string;
  range: string;
  grades: { label: string; file: string }[];
}[] = [
  {
    label: "Early",
    range: "TK – K",
    grades: [
      { label: "TK", file: "tk" },
      { label: "K", file: "k" },
    ],
  },
  {
    label: "Elementary",
    range: "Grades 1 – 5",
    grades: [
      { label: "Grade 1", file: "grade-1" },
      { label: "Grade 2", file: "grade-2" },
      { label: "Grade 3", file: "grade-3" },
      { label: "Grade 4", file: "grade-4" },
      { label: "Grade 5", file: "grade-5" },
    ],
  },
  {
    label: "Middle",
    range: "Grades 6 – 8",
    grades: [
      { label: "Grade 6", file: "grade-6" },
      { label: "Grade 7", file: "grade-7" },
      { label: "Grade 8", file: "grade-8" },
    ],
  },
];

const totalCount =
  hscpLevels.length +
  gradeGroups.reduce((sum, g) => sum + g.grades.length, 0);

function DownloadIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function HscpCard({ n, sub }: { n: number; sub: string }) {
  return (
    <a
      href={`/syllabus/hscp-${n}.pdf`}
      download
      className="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-3xl border-2 border-sky-300/70 bg-gradient-to-br from-sky-50 via-white to-sky-100/70 p-5 shadow-md ring-1 ring-white/60 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-sky-500 hover:shadow-xl"
    >
      <div className="flex items-start justify-between">
        <span className="rounded-full border border-sky-300 bg-white/80 px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-sky-700">
          HSCP
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/70 text-sky-700 ring-1 ring-sky-200 transition-colors group-hover:bg-sky-700 group-hover:text-white">
          <DownloadIcon />
        </span>
      </div>
      <div>
        <p className="bg-gradient-to-br from-sky-700 to-sky-900 bg-clip-text text-5xl font-bold leading-none tracking-tight text-transparent sm:text-6xl">
          {n}
        </p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-600 sm:text-sm">
          Tamil
        </p>
        <p className="mt-1 text-[0.65rem] text-slate-500 sm:text-xs">{sub}</p>
      </div>
    </a>
  );
}

function GradeCard({ label, file }: { label: string; file: string }) {
  return (
    <a
      href={`/syllabus/${file}.pdf`}
      download
      className="group flex items-center justify-between gap-3 rounded-2xl border-2 border-white/60 bg-white/70 px-4 py-3.5 shadow-sm ring-1 ring-slate-100 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-sky-400 hover:bg-white hover:shadow-md sm:px-5 sm:py-4"
    >
      <span className="flex items-center gap-2.5">
        <span className="text-sky-700 transition-colors group-hover:text-sky-900">
          <PdfIcon />
        </span>
        <span className="text-base font-semibold text-slate-900 sm:text-lg">
          {label}
        </span>
      </span>
      <span className="text-sky-600 transition-colors group-hover:text-sky-900">
        <DownloadIcon />
      </span>
    </a>
  );
}

export default function SyllabusPage() {
  return (
    <section className="flex w-full flex-col px-6 pt-28 pb-20 sm:px-12 sm:pt-32 md:px-20 md:pt-36 lg:px-28 lg:pt-40">
      {/* Hero */}
      <header className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-700/80 sm:text-sm">
          {totalCount} PDF downloads
        </p>
        <h1
          lang="ta"
          className="mt-3 font-[family-name:var(--font-tamil)] text-5xl font-bold leading-[1.3] tracking-tight text-slate-900 sm:text-6xl md:text-7xl"
        >
          பாடத்திட்டம்
        </h1>
        <p className="mt-2 text-xl font-medium tracking-wide sm:text-2xl md:text-3xl">
          <span className="bg-gradient-to-br from-sky-600 to-sky-900 bg-clip-text text-transparent">
            Syllabus
          </span>
        </p>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Click any card to download the syllabus PDF.
        </p>
      </header>

      {/* HSCP */}
      <div className="mx-auto mt-16 w-full max-w-5xl">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-700/80 sm:text-sm">
              High School
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              HSCP Tamil
            </h2>
          </div>
          <p className="text-xs text-slate-500 sm:text-sm">
            {hscpLevels.length} levels
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {hscpLevels.map((l) => (
            <HscpCard key={l.n} n={l.n} sub={l.sub} />
          ))}
        </div>
      </div>

      {/* Grades */}
      <div className="mx-auto mt-20 w-full max-w-5xl">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-700/80 sm:text-sm">
              Tamil School
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Grade Levels
            </h2>
          </div>
          <p className="text-xs text-slate-500 sm:text-sm">
            {gradeGroups.reduce((s, g) => s + g.grades.length, 0)} grades · TK – 8
          </p>
        </div>

        <div className="space-y-8">
          {gradeGroups.map((group) => (
            <div key={group.label}>
              <div className="mb-3 flex items-baseline gap-3">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-sky-700/80 sm:text-xs">
                  {group.label}
                </p>
                <span className="h-px flex-1 bg-slate-300/60" />
                <p className="text-[0.65rem] text-slate-500 sm:text-xs">
                  {group.range}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                {group.grades.map((g) => (
                  <GradeCard key={g.file} label={g.label} file={g.file} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
