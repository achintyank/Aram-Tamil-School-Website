export default function Home() {
  return (
    <div className="relative flex flex-1 w-full overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-sky-300/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -left-32 h-[32rem] w-[32rem] rounded-full bg-blue-200/40 blur-3xl"
      />

      <main className="relative z-10 flex flex-1 flex-col px-6 pt-28 sm:px-12 sm:pt-32 md:px-20 md:pt-36 lg:px-28 lg:pt-40">
        <div className="max-w-4xl">
          <p className="text-xl font-medium tracking-wide text-sky-700 sm:text-2xl md:text-3xl">
            Aram Tamil School
          </p>
          <h1
            lang="ta"
            className="mt-1 font-[family-name:var(--font-tamil)] text-5xl font-bold leading-[1.5] tracking-tight text-slate-900 sm:text-6xl md:text-7xl lg:text-8xl"
          >
            அரம் தமிழ் பள்ளி
          </h1>
        </div>
      </main>
    </div>
  );
}
