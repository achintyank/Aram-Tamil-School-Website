import { contacts, school, socials, timings } from "../_data/school";
import Highlight from "./Highlight";
import Roll from "./Roll";

/** Location, timings and who to reach — Lando's socials callout as a contact wall. */
export default function Contact() {
  return (
    <section id="contact" className="relative z-10 bg-paper px-4 py-28 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p lang="ta" className="font-tamil text-2xl font-extrabold">தொடர்பு</p>
          <h2 className="mt-2 text-[clamp(3rem,7vw,6.5rem)] leading-[0.88] font-black tracking-tight uppercase">
            <Highlight className="block">Come say</Highlight>
            <Highlight delay={120} lang="ta" className="block font-tamil text-blue normal-case" color="var(--color-ink)">
              வணக்கம்
            </Highlight>
          </h2>
          <p className="mt-6 max-w-sm text-lg text-graphite">
            Questions about classes, enrollment or volunteering? Reach out, or just stop by on a Sunday.
          </p>
          <ul className="mt-10 flex flex-wrap gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="group inline-flex rounded-full border border-ink px-5 py-3 text-sm font-bold uppercase transition-colors hover:border-blue hover:bg-blue hover:text-paper">
                  <Roll text={s.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href={school.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-[1.5rem] bg-ink p-6 text-paper sm:col-span-2"
          >
            {/* pulli grid as a stand-in map texture */}
            <div aria-hidden className="absolute inset-0 opacity-30 [background-image:radial-gradient(var(--color-paper)_1.2px,transparent_1.2px)] [background-size:22px_22px] transition-transform duration-700 group-hover:scale-110" />
            <span aria-hidden className="absolute top-8 right-8 h-5 w-5 rounded-full bg-blue ring-8 ring-blue/30" />
            <p className="eyebrow relative text-paper/60">Where</p>
            <div className="relative">
              <p className="text-3xl font-extrabold uppercase sm:text-4xl">{school.location}</p>
              <p className="mt-1 text-paper/70">{school.region}</p>
              <p className="eyebrow mt-4 inline-flex items-center gap-2 text-blue-soft">
                Get directions
                <svg width="12" height="12" viewBox="0 0 18 18" aria-hidden className="transition-transform duration-500 group-hover:rotate-45">
                  <path d="M3 15 15 3M6 3h9v9" fill="none" stroke="currentColor" strokeWidth="2.2" />
                </svg>
              </p>
            </div>
          </a>

          <div className="flex min-h-48 flex-col justify-between rounded-[1.5rem] bg-blue p-6 text-paper sm:col-span-2">
            <p className="eyebrow text-paper/70">When</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {timings.map((t) => {
                const [day, time] = t.value.split(" · ");
                return (
                  <div key={t.label}>
                    <p className="eyebrow text-paper/70">{t.label}</p>
                    <p className="mt-1 text-3xl font-extrabold uppercase">{time}</p>
                    <p className="text-paper/80">{day}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {contacts.map((c) => (
            <a key={c.role} href={`mailto:${c.email}`} className="group flex min-h-48 flex-col justify-between rounded-[1.5rem] bg-paper-2 p-6 transition-colors hover:bg-ink hover:text-paper">
              <div>
                <p className="eyebrow text-graphite group-hover:text-paper/60">{c.role}</p>
                <p lang="ta" className="mt-1 font-tamil text-sm font-bold text-graphite group-hover:text-paper/60">{c.roleTa}</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold uppercase">{c.name}</p>
                <p className="mt-1 text-sm underline decoration-blue decoration-2 underline-offset-4">{c.email}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
