import RevealOnScroll from "./_components/RevealOnScroll";
import Slideshow from "./_components/Slideshow";
import {
  bottomSlides,
  rightSlides,
  topLeftSlides,
} from "./_data/landingSlides";

export default function Home() {
  return (
    <div className="relative flex w-full flex-col overflow-hidden bg-gradient-to-br from-white via-sky-50 to-sky-200">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-sky-300/40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-48 -left-32 h-[32rem] w-[32rem] rounded-full bg-blue-200/40 blur-3xl"
        />
      <section className="relative flex h-screen w-full overflow-hidden">
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

        <div className="absolute bottom-16 right-16 z-10 hidden md:block lg:bottom-24 lg:right-32 xl:bottom-32 xl:right-48">
          <div className="relative h-56 w-72 lg:h-72 lg:w-[26rem] xl:h-[22rem] xl:w-[32rem]">
            <div className="absolute left-25 -top-39 h-42 w-32 overflow-hidden rounded-2xl [clip-path:inset(0_round_1rem)] lg:-top-33 lg:h-52 lg:w-44 xl:-top-25 xl:h-60 xl:w-52">
              <Slideshow slides={topLeftSlides} variant="pan-zoom-y" />
            </div>
            <div className="absolute bottom-0 -left-4 right-50 h-32 overflow-hidden rounded-2xl [clip-path:inset(0_round_1rem)] lg:-left-6 lg:h-40 xl:-left-8 xl:h-48">
              <Slideshow slides={bottomSlides} variant="pan-zoom" />
            </div>
            <div className="absolute -right-15 bottom-8 h-48 w-44 overflow-hidden rounded-2xl [clip-path:inset(0_round_1rem)] lg:bottom-10 lg:h-60 lg:w-52 xl:bottom-12 xl:h-[21rem] xl:w-60">
              <Slideshow slides={rightSlides} variant="pan-zoom-y-down" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen w-full items-center px-6 py-20 sm:px-12 md:px-20 lg:px-28">
        <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
          <div className="flex flex-col">
            <RevealOnScroll className="flex flex-1 flex-col">
              <div className="flex flex-1 items-center md:-translate-y-10 lg:-translate-y-14">
                <div className="w-full space-y-5 text-center md:text-left">
                  <h2
                    lang="ta"
                    className="font-[family-name:var(--font-tamil)] text-2xl font-bold leading-[1.4] tracking-tight text-slate-900 sm:text-3xl md:text-4xl lg:text-5xl"
                  >
                    தன்னார்வலர்களால் நடத்தப்படுகிறது. தமிழுக்காக.
                  </h2>
                  <p className="text-lg font-medium tracking-wide text-sky-700 sm:text-xl md:text-2xl">
                    Run by volunteers. For Tamil.
                  </p>
                </div>
              </div>

              <div className="pt-8">
                <p className="text-xl font-medium text-slate-900 sm:text-2xl md:text-3xl">
                  Contact:
                </p>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-sky-700/80">
                      Principal
                    </p>
                    <p className="mt-1 text-base font-semibold text-slate-900">
                      Principal Name
                    </p>
                    <p className="mt-0.5 text-sm text-slate-600">
                      principal@aram.school
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-sky-700/80">
                      Vice Principal
                    </p>
                    <p className="mt-1 text-base font-semibold text-slate-900">
                      VP Name
                    </p>
                    <p className="mt-0.5 text-sm text-slate-600">
                      vp@aram.school
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={150} className="self-center">
            <div className="grid grid-cols-2 gap-4 md:gap-5">
              <div className="col-start-2 row-start-1 flex aspect-square flex-col gap-3 overflow-hidden rounded-2xl bg-gradient-to-br from-white/70 to-slate-200/60 p-4 shadow-xl ring-1 ring-white/60 backdrop-blur-sm">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-sky-700/80">
                  Location
                </p>
                <div className="flex flex-1 items-center justify-center">
                  <div className="aspect-[3/2] w-3/4 overflow-hidden rounded-lg bg-gradient-to-br from-slate-300 to-slate-500 ring-1 ring-white/40" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold leading-tight text-slate-900 sm:text-base">
                    Mountain House High School
                  </p>
                  <p className="text-xs text-slate-600 sm:text-sm">California</p>
                </div>
              </div>

              <div className="col-start-1 row-start-2 flex aspect-square flex-col gap-3 overflow-hidden rounded-2xl bg-gradient-to-br from-white/70 to-slate-200/60 p-4 shadow-xl ring-1 ring-white/60 backdrop-blur-sm">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-sky-700/80">
                  Statistics
                </p>
                <div className="grid flex-1 grid-cols-2 grid-rows-2 content-center gap-x-3 gap-y-3">
                  <div>
                    <p className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Grades
                    </p>
                    <p className="mt-0.5 text-base font-bold leading-tight text-slate-900 sm:text-lg">
                      TK – 12
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Ages
                    </p>
                    <p className="mt-0.5 text-base font-bold leading-tight text-slate-900 sm:text-lg">
                      5 – 18
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Est.
                    </p>
                    <p className="mt-0.5 text-base font-bold leading-tight text-slate-900 sm:text-lg">
                      2010
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Students
                    </p>
                    <p className="mt-0.5 text-base font-bold leading-tight text-slate-900 sm:text-lg">
                      200+
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-start-2 row-start-2 flex aspect-square flex-col gap-3 overflow-hidden rounded-2xl bg-gradient-to-br from-white/70 to-slate-200/60 p-4 shadow-xl ring-1 ring-white/60 backdrop-blur-sm">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-sky-700/80">
                  Timings
                </p>
                <div className="flex flex-1 flex-col justify-center gap-4">
                  <div>
                    <p className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      HSCP
                    </p>
                    <p className="mt-0.5 text-sm font-bold leading-tight text-slate-900 sm:text-base">
                      Sundays · 10 AM – 2 PM
                    </p>
                  </div>
                  <div className="h-px bg-slate-300/60" />
                  <div>
                    <p className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Non-HSCP
                    </p>
                    <p className="mt-0.5 text-sm font-bold leading-tight text-slate-900 sm:text-base">
                      Sundays · 10 – 11:30 AM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
        <p className="absolute bottom-3 right-6 text-[0.6rem] text-slate-400 sm:right-12 md:right-20 lg:right-28">
          © 2026 Aram Tamil School
        </p>
      </section>
    </div>
  );
}
